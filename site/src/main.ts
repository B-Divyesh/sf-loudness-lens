import './style.css';

type DemoState = { ceiling: number; trim: number; muted: boolean };
const DEMO_KEY = 'demo:loudness-lens:v1';
const defaultDemo: DemoState = { ceiling: -6, trim: 0, muted: false };
let audioSession: { context: AudioContext; analyser: AnalyserNode; gain: GainNode; limiter: DynamicsCompressorNode; audio: HTMLAudioElement; frame: number } | undefined;
let activePath = location.pathname;

const app = document.querySelector<HTMLElement>('#app')!;
const announcer = document.querySelector<HTMLElement>('#announcer')!;

function header() {
  return `<header class="site-header"><a class="wordmark" href="/" data-link><img src="/assets/mark.svg" alt="" width="36" height="36"><span>Loudness Lens</span></a><nav aria-label="Main navigation"><a href="/demo" data-link>Demo</a><a href="/#how">How it works</a><a href="/privacy" data-link>Privacy</a><a class="download-small" href="/downloads/loudness-lens-chrome.zip" download>Download</a></nav></header>`;
}

function footer() {
  return `<footer><div><strong>Loudness Lens</strong><p>Keep each browser tab at a predictable listening level.</p></div><nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a><a href="https://sociobot.in" rel="noreferrer">Built by Param Factory <span class="sr-only">(external site)</span></a></nav><p class="build">v1.0.0 · Original generated botanical artwork</p></footer>`;
}

function shell(content: string, demo = false) {
  return `${demo ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span><button id="reset-demo" type="button">Reset demo</button><a id="start-real" href="/downloads/loudness-lens-chrome.zip" download>Start for real</a></span></aside>` : ''}${header()}${content}${footer()}`;
}

function meterMarkup(prefix = 'preview') {
  return `<section class="lens-panel" aria-labelledby="${prefix}-meter-title">
    <div class="panel-heading"><div><span class="specimen-no">SPECIMEN 01 · ACTIVE TAB</span><h2 id="${prefix}-meter-title">Live peak</h2></div><output id="${prefix}-peak">−18 dB</output></div>
    <div class="meter"><meter class="meter-gauge" aria-label="Sample audio peak" min="-60" max="0" value="-18">−18 dB</meter><i class="meter-limit limit-6"></i></div>
    <p class="meter-note" aria-live="polite">A loud moment is approaching the −6 dB limit.</p>
    <div class="control-line"><span>Peak limit</span><strong class="ceiling-readout">−6 dB</strong></div>
    <input class="ceiling-control" aria-label="Peak limit" type="range" min="-18" max="-1" value="-6">
    <button class="mute-control" type="button"><span aria-hidden="true">×</span> Mute now</button>
  </section>`;
}

function home() {
  return shell(`<main id="main">
    <section class="hero"><div class="hero-copy"><p class="kicker">A field control for browser sound</p><h1 tabindex="-1">Keep every tab at a steady volume</h1><p class="dek">For people switching between videos, lessons, and music who want fewer sudden volume jumps.</p><div class="hero-actions"><a class="button primary" href="/demo" data-link>Try it with sample data</a><span>Hear a local sample pass through the limiter.</span></div><ul class="plain-facts"><li>Audio never leaves your browser.</li><li>No account or setup server.</li><li>Free to use.</li></ul></div>
    <figure class="hero-art"><picture><source srcset="/assets/loudness-botanical-640.webp 640w, /assets/loudness-botanical-1200.webp 1200w" sizes="(max-width: 800px) 92vw, 48vw" type="image/webp"><img src="/assets/loudness-botanical-1200.webp" width="1200" height="800" alt="A pressed fern waveform sits beneath a protective glass bell." fetchpriority="high" decoding="async"></picture><figcaption>Plate I · peaks kept below the bell</figcaption></figure></section>
    <section class="product-preview" aria-labelledby="preview-title"><div class="section-intro"><p class="kicker">The control in one glance</p><h2 id="preview-title">See the peak before it surprises you</h2><p>The meter shows this tab’s level. The red mark shows your chosen limit.</p></div>${meterMarkup()}</section>
    <section id="how" class="how" aria-labelledby="how-title"><p class="kicker">Three field notes</p><h2 id="how-title">How it works</h2><ol><li><span>01</span><div><h3>Open the tab</h3><p>Play the video, lesson, or song you want to guard.</p></div></li><li><span>02</span><div><h3>Turn on the guard</h3><p>The extension asks Chrome for that tab’s audio only.</p></div></li><li><span>03</span><div><h3>Set the peak limit</h3><p>Watch the meter. Use Mute now if sound feels unsafe.</p></div></li></ol></section>
    <section class="limits" aria-labelledby="limits-title"><div><p class="kicker">Clear boundaries</p><h2 id="limits-title">What the guard does not do</h2></div><ul><li>It does not record sound.</li><li>It does not capture background tabs by itself.</li><li>It cannot process protected media that Chrome blocks.</li><li>It does not change your system volume.</li></ul></section>
    <section class="install"><p class="kicker">Chrome extension · v1</p><h2>Put the guard beside your address bar</h2><p>Download the package, open Chrome extensions, and load the unpacked folder.</p><a class="button primary" href="/downloads/loudness-lens-chrome.zip" download>Download Loudness Lens</a></section>
  </main>`);
}

function demo() {
  return shell(`<main id="main"><section class="demo-page"><div class="demo-copy"><p class="kicker">Sample cooking lesson · 12 seconds</p><h1 tabindex="-1">Control a sample tab</h1><p>This sample has quiet instruction and two sudden peaks. Set a limit, then listen.</p><div class="demo-actions"><button class="button primary" id="play-sample" type="button">Play sample</button><span id="sample-status">Ready at the quiet section.</span></div><label for="demo-trim">Level trim <output id="trim-value">0 dB</output></label><input id="demo-trim" type="range" min="-12" max="6" step="1" value="0"><p class="demo-help">Tip: try a −12 dB peak limit, then replay the sample.</p></div>${meterMarkup('demo')}</section><section class="demo-data" aria-labelledby="sample-notes"><h2 id="sample-notes">What is in the sample</h2><ol><li><strong>0–4 seconds</strong><span>Quiet lesson bed</span></li><li><strong>4–6 seconds</strong><span>First volume jump</span></li><li><strong>8–10 seconds</strong><span>Second volume jump</span></li></ol></section><audio id="sample-audio" src="/assets/sample-lesson.wav" preload="auto"></audio></main>`, true);
}

function privacy() {
  return shell(`<main id="main" class="prose"><p class="kicker">Policy · effective 28 August 2026</p><h1 tabindex="-1">Your audio stays on your device</h1><p>Loudness Lens processes captured tab audio inside Chrome. It does not record, upload, or sell audio.</p><h2>What the extension stores</h2><p>The extension keeps your limit and trim settings in Chrome storage. It does not need your name or email.</p><h2>What the demo stores</h2><p>Demo settings use a separate <code>demo:</code> browser storage key. Reset demo restores the default settings.</p><h2>Network use</h2><p>The extension does not contact a backend. This site serves its own files and uses no analytics.</p><h2>Your control</h2><p>Turn off the guard to stop capture. Closing the tab also ends capture. Remove the extension to delete its settings.</p><h2>Questions</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a>.</p></main>`);
}

function terms() {
  return shell(`<main id="main" class="prose"><p class="kicker">Terms · effective 28 August 2026</p><h1 tabindex="-1">Use Loudness Lens as a listening aid</h1><p>Loudness Lens is free software provided under the MIT License.</p><h2>No medical or hearing guarantee</h2><p>The extension can reduce digital peaks in a captured tab. It cannot guarantee a safe listening level. Set your system volume to a comfortable level first.</p><h2>Browser limits</h2><p>Chrome may block capture on protected pages. The extension will show an error when capture cannot start.</p><h2>Your responsibility</h2><p>Use the extension lawfully. Do not try to bypass protected media or other browser controls.</p><h2>Changes</h2><p>New terms will appear on this page with a new effective date.</p></main>`);
}

function notFound() {
  return shell(`<main id="main" class="not-found"><div class="lost-plant" aria-hidden="true">⌇</div><p class="kicker">Field note 404</p><h1 tabindex="-1">This specimen is not in the guide</h1><p>The address may be old or mistyped.</p><a class="button primary" href="/" data-link>Return to Loudness Lens</a></main>`);
}

const routes: Record<string, { title: string; render: () => string }> = {
  '/': { title: 'Loudness Lens — keep browser volume steady', render: home },
  '/demo': { title: 'Demo — Loudness Lens', render: demo },
  '/privacy': { title: 'Privacy — Loudness Lens', render: privacy },
  '/terms': { title: 'Terms — Loudness Lens', render: terms },
};

function loadDemoState(): DemoState {
  try { return { ...defaultDemo, ...JSON.parse(localStorage.getItem(DEMO_KEY) ?? '{}') }; } catch { return { ...defaultDemo }; }
}

function saveDemoState(state: DemoState) { localStorage.setItem(DEMO_KEY, JSON.stringify(state)); }

function discardDemoState() { localStorage.removeItem(DEMO_KEY); }

function stopAudio() {
  if (!audioSession) return;
  cancelAnimationFrame(audioSession.frame);
  audioSession.audio.pause();
  void audioSession.context.close();
  audioSession = undefined;
}

async function setupDemo() {
  const state = loadDemoState();
  const audio = document.querySelector<HTMLAudioElement>('#sample-audio')!;
  const play = document.querySelector<HTMLButtonElement>('#play-sample')!;
  const trim = document.querySelector<HTMLInputElement>('#demo-trim')!;
  const ceiling = document.querySelector<HTMLInputElement>('.ceiling-control')!;
  const mute = document.querySelector<HTMLButtonElement>('.mute-control')!;
  const trimValue = document.querySelector<HTMLOutputElement>('#trim-value')!;
  const ceilingValue = document.querySelector<HTMLElement>('.ceiling-readout')!;
  trim.value = String(state.trim); ceiling.value = String(state.ceiling);
  trimValue.value = `${state.trim} dB`; ceilingValue.textContent = `−${Math.abs(state.ceiling)} dB`;
  mute.classList.toggle('active', state.muted);
  mute.innerHTML = state.muted ? '<span aria-hidden="true">↗</span> Restore sound' : '<span aria-hidden="true">×</span> Mute now';

  async function ensureAudio() {
    if (audioSession) return audioSession;
    const context = new AudioContext();
    const source = context.createMediaElementSource(audio);
    const gain = context.createGain();
    const limiter = context.createDynamicsCompressor();
    limiter.knee.value = 0; limiter.ratio.value = 20; limiter.attack.value = 0.003; limiter.release.value = 0.2;
    const analyser = context.createAnalyser(); analyser.fftSize = 1024;
    source.connect(gain).connect(limiter).connect(analyser).connect(context.destination);
    audioSession = { context, analyser, gain, limiter, audio, frame: 0 };
    return audioSession;
  }

  function apply() {
    const next = { ceiling: Number(ceiling.value), trim: Number(trim.value), muted: mute.classList.contains('active') };
    saveDemoState(next);
    trimValue.value = `${next.trim > 0 ? '+' : ''}${next.trim} dB`;
    ceilingValue.textContent = `−${Math.abs(next.ceiling)} dB`;
    if (audioSession) {
      audioSession.gain.gain.setTargetAtTime(next.muted ? 0 : 10 ** (next.trim / 20), audioSession.context.currentTime, 0.01);
      audioSession.limiter.threshold.setTargetAtTime(next.ceiling, audioSession.context.currentTime, 0.01);
    }
    const limit = document.querySelector<HTMLElement>('.meter-limit')!;
    limit.className = `meter-limit limit-${Math.abs(next.ceiling)}`;
  }

  function draw() {
    if (!audioSession) return;
    const samples = new Float32Array(audioSession.analyser.fftSize);
    audioSession.analyser.getFloatTimeDomainData(samples);
    let peak = 0; for (const sample of samples) peak = Math.max(peak, Math.abs(sample));
    const db = peak ? Math.max(-60, 20 * Math.log10(peak)) : -60;
    const gauge = document.querySelector<HTMLMeterElement>('.meter-gauge')!;
    gauge.value = db;
    document.querySelector<HTMLOutputElement>('#demo-peak')!.value = `${Math.round(db)} dB`;
    const reducing = audioSession.limiter.reduction < -0.5;
    document.querySelector<HTMLElement>('.meter-note')!.textContent = reducing ? `Limiter reduced ${Math.abs(audioSession.limiter.reduction).toFixed(1)} dB.` : 'The sample is below the peak limit.';
    audioSession.frame = requestAnimationFrame(draw);
  }

  play.addEventListener('click', async () => {
    const session = await ensureAudio(); apply();
    if (audio.paused) {
      if (audio.ended) audio.currentTime = 0;
      await session.context.resume(); await audio.play(); draw();
      play.textContent = 'Pause sample';
      document.querySelector('#sample-status')!.textContent = 'Playing through the local limiter.';
    } else { audio.pause(); play.textContent = 'Play sample'; document.querySelector('#sample-status')!.textContent = 'Paused.'; }
  });
  audio.addEventListener('ended', () => { play.textContent = 'Replay sample'; document.querySelector('#sample-status')!.textContent = 'Sample finished.'; });
  trim.addEventListener('input', apply); ceiling.addEventListener('input', apply);
  mute.addEventListener('click', () => { mute.classList.toggle('active'); mute.innerHTML = mute.classList.contains('active') ? '<span aria-hidden="true">↗</span> Restore sound' : '<span aria-hidden="true">×</span> Mute now'; apply(); });
  document.querySelector('#reset-demo')?.addEventListener('click', () => { discardDemoState(); stopAudio(); render('/demo', true); });
  document.querySelector('#start-real')?.addEventListener('click', discardDemoState);
  apply();
}

function wireLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-link]').forEach((link) => link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || link.target) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    event.preventDefault();
    if (location.pathname === '/demo' && url.pathname !== '/demo') discardDemoState();
    history.pushState({}, '', url.pathname + url.hash);
    render(url.pathname, true);
    if (url.hash) setTimeout(() => document.querySelector(url.hash)?.scrollIntoView(), 0);
  }));
}

function setRouteMetadata(path: string, title: string) {
  const url = `https://loudness-lens.sociobot.in${path === '/' ? '/' : path}`;
  document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', url);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
}

function render(path = location.pathname, focusHeading = false) {
  stopAudio();
  const route = routes[path] ?? { title: 'Page not found — Loudness Lens', render: notFound };
  document.title = route.title;
  setRouteMetadata(path, route.title);
  app.innerHTML = route.render();
  wireLinks();
  if (path === '/demo') void setupDemo();
  const heading = document.querySelector<HTMLElement>('h1');
  announcer.textContent = heading?.textContent ?? '';
  if (focusHeading) requestAnimationFrame(() => heading?.focus({ preventScroll: true }));
  scrollTo({ top: 0, behavior: 'instant' });
  activePath = path;
}

addEventListener('popstate', () => {
  if (activePath === '/demo' && location.pathname !== '/demo') discardDemoState();
  render(location.pathname, true);
});
addEventListener('pagehide', () => {
  if (activePath === '/demo') discardDemoState();
});
render();
