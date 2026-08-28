import { dbToGain, gainToDb, type GuardSettings } from './audio';

export type GainParamLike = { setTargetAtTime: (value: number, startTime: number, timeConstant: number) => void };
export type LimiterPortLike = { postMessage: (message: { ceiling: number }) => void };
export type AnalyserLike = { getFloatTimeDomainData: (samples: Float32Array) => void };
export type ClosableAudioSession = {
  timer: number;
  stream: { getTracks: () => Array<{ stop: () => void }> };
  context: { close: () => Promise<void> };
};

export function applyAudioSettings(
  settings: GuardSettings,
  currentTime: number,
  gain: GainParamLike,
  limiterPort: LimiterPortLike,
) {
  gain.setTargetAtTime(settings.muted ? 0 : dbToGain(settings.inputGainDb), currentTime, 0.01);
  limiterPort.postMessage({ ceiling: dbToGain(settings.ceilingDb) });
}

export function readPeakDb(analyser: AnalyserLike, size: number): number {
  const samples = new Float32Array(size);
  analyser.getFloatTimeDomainData(samples);
  let peak = 0;
  for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
  return gainToDb(peak);
}

export async function closeAudioSession(session: ClosableAudioSession, clearTimer: (timer: number) => void) {
  clearTimer(session.timer);
  session.stream.getTracks().forEach((track) => track.stop());
  await session.context.close();
}
