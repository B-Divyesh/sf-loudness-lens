import { dbToGain, gainToDb, type GuardSettings } from '../../lib/audio';

type Session = {
  context: AudioContext;
  stream: MediaStream;
  gain: GainNode;
  limiter: AudioWorkletNode;
  analyser: AnalyserNode;
  settings: GuardSettings;
  reductionDb: number;
  timer: number;
};

const sessions = new Map<number, Session>();

function apply(session: Session, settings: GuardSettings) {
  session.settings = settings;
  session.gain.gain.setTargetAtTime(settings.muted ? 0 : dbToGain(settings.inputGainDb), session.context.currentTime, 0.01);
  session.limiter.port.postMessage({ ceiling: dbToGain(settings.ceilingDb) });
}

async function stop(tabId: number) {
  const session = sessions.get(tabId);
  if (!session) return;
  window.clearInterval(session.timer);
  session.stream.getTracks().forEach((track) => track.stop());
  await session.context.close();
  sessions.delete(tabId);
}

async function start(tabId: number, streamId: string, settings: GuardSettings) {
  await stop(tabId);
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      mandatory: {
        chromeMediaSource: 'tab',
        chromeMediaSourceId: streamId,
      },
    } as MediaTrackConstraints,
    video: false,
  });
  const context = new AudioContext({ latencyHint: 'interactive' });
  await context.audioWorklet.addModule(chrome.runtime.getURL('limiter-worklet.js'));
  const source = context.createMediaStreamSource(stream);
  const gain = context.createGain();
  const limiter = new AudioWorkletNode(context, 'look-ahead-limiter', {
    outputChannelCount: [2],
    processorOptions: { ceiling: dbToGain(settings.ceilingDb) },
  });
  const analyser = context.createAnalyser();
  analyser.fftSize = 1024;
  analyser.smoothingTimeConstant = 0.55;
  source.connect(gain).connect(limiter).connect(analyser).connect(context.destination);

  const session: Session = { context, stream, gain, limiter, analyser, settings, reductionDb: 0, timer: 0 };
  limiter.port.onmessage = (event) => {
    session.reductionDb = Math.max(0, -gainToDb(1 - event.data.reduction));
  };
  const samples = new Float32Array(analyser.fftSize);
  session.timer = window.setInterval(() => {
    analyser.getFloatTimeDomainData(samples);
    let peak = 0;
    for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
    void chrome.runtime.sendMessage({
      target: 'background', type: 'meter', tabId,
      peakDb: gainToDb(peak), reductionDb: session.reductionDb,
    });
  }, 100);
  apply(session, settings);
  sessions.set(tabId, session);
  stream.getAudioTracks()[0]?.addEventListener('ended', () => void stop(tabId));
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.target !== 'offscreen') return;
  if (message.type === 'start') {
    void start(message.tabId, message.streamId, message.settings)
      .then(() => sendResponse({ ok: true }))
      .catch((error) => sendResponse({ ok: false, error: error instanceof Error ? error.message : String(error) }));
    return true;
  }
  if (message.type === 'stop') {
    void stop(message.tabId).then(() => sendResponse({ ok: true }));
    return true;
  }
  if (message.type === 'settings') {
    const session = sessions.get(message.tabId);
    if (session) apply(session, message.settings);
  }
});
