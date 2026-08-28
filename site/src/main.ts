import './style.css';

type DemoState = { ceiling: number; trim: number; muted: boolean };
const DEMO_KEY = 'demo:loudness-lens:v1';
const defaultDemo: DemoState = { ceiling: -6, trim: 0, muted: false };
let audioSession: { context: AudioContext; analyser: AnalyserNode; gain: GainNode; limiter: DynamicsCompressorNode; audio: HTMLAudioElement; frame: number } | undefined;
let activePath = routePath(location.pathname, location.search);

const app = document.querySelector<HTMLElement>('#app')!;
const announcer = document.querySelector<HTMLElement>('#announcer')!;

function header() {
  return `<header class="site-header"><a class="wordmark" href="/" data-link aria-label="Loudness Lens home"><img src="/assets/mark-v1.svg" alt="" width="36" height="36"><span>Loudness Lens</span></a><nav aria-label="Main navigation"><a href="/?demo=1" data-link>Demo</a><a href="/#how" data-link>How it works</a><a href="/privacy" data-link>Privacy</a><a class="download-small" href="/downloads/loudness-lens-chrome-1.0.0.zip" download>Download</a></nav></header>`;
}

function footer() {
  return `<footer><div><strong>Loudness Lens</strong><p>Keep each browser tab at a predictable listening level.</p></div><nav aria-label="Footer navigation"><a href="/privacy" data-link>Privacy</a><a href="/terms" data-link>Terms</a><a href="https://sociobot.in" rel="noreferrer">Built by Param Factory <span aria-hidden="true">↗</span><span class="external-label">external site</span></a></nav><p class="build">v1.0.0 · Original generated botanical artwork</p></footer>`;
}

function shell(content: string, demo = false) {
  return `${demo ? `<aside class="demo-banner" aria-label="Demo mode"><strong>Demo — sample data, nothing is saved</strong><span><button id="reset-demo" type="button">Reset demo</button><a id="start-real" href="/downloads/loudness-lens-chrome-1.0.0.zip" download>Download the extension ZIP</a></span></aside>` : ''}${header()}${content}${footer()}`;
}

function meterMarkup(prefix = 'preview', note = 'Example reading: −18 dB, below the −6 dB limit.') {
  return `<section class="lens-panel" aria-labelledby="${prefix}-meter-title">
    <div class="panel-heading"><div><span class="specimen-no">SPECIMEN 01 · ACTIVE TAB</span><h2 id="${prefix}-meter-title">Live peak</h2></div><output id="${prefix}-peak">−18 dB</output></div>
    <div class="meter"><meter class="meter-gauge" aria-label="Sample audio peak" min="-60" max="0" value="-18">−18 dB</meter><i class="meter-limit limit-6"></i></div>
    <p class="meter-note" aria-live="polite">${note}</p>
    <div class="control-line"><span>Peak limit</span><strong class="ceiling-readout">−6 dB</strong></div>
    <input class="ceiling-control" aria-label="Peak limit" type="range" min="-18" max="-1" value="-6">
    <button class="mute-control" type="button" aria-pressed="false"><span aria-hidden="true">×</span> Mute now</button>
  </section>`;
}

function home() {
  return shell(`<main id="main">
    <section class="hero"><div class="hero-copy"><p class="kicker">A per-tab volume guard</p><h1 tabindex="-1">Keep every tab at a steady volume</h1><p class="dek">For people switching between videos, lessons, and music who want fewer sudden volume jumps.</p><div class="hero-actions"><a class="button primary" href="/?demo=1" data-link>Try it with sample data</a><span>Hear a sample stay below your chosen volume limit.</span></div><ul class="plain-facts"><li>Audio never leaves your browser.</li><li>No account or server setup.</li><li>Free to use.</li></ul></div>
    <figure class="hero-art"><picture><source srcset="/assets/loudness-botanical-640-v1.webp 640w, /assets/loudness-botanical-1200-v1.webp 1200w" sizes="(max-width: 800px) 92vw, 48vw" type="image/webp"><img src="/assets/loudness-botanical-1200-v1.webp" width="1200" height="800" alt="A pressed fern waveform sits beneath a protective glass bell." fetchpriority="high" decoding="async"></picture><figcaption>Plate I · peaks kept below the bell</figcaption></figure></section>
    <section class="product-preview" aria-labelledby="preview-title"><div class="section-intro"><p class="kicker">Peak-limit preview</p><h2 id="preview-title">See the peak before it surprises you</h2><p>This preview starts with an example reading. Move the peak limit to place the red marker.</p></div>${meterMarkup()}</section>
    <section id="how" class="how" aria-labelledby="how-title"><p class="kicker">Three steps</p><h2 id="how-title">How it works</h2><ol><li><span>01</span><div><h3>Open the tab</h3><p>Play the video, lesson, or song you want to guard.</p></div></li><li><span>02</span><div><h3>Turn on the guard</h3><p>The extension asks Chrome for that tab’s audio only.</p></div></li><li><span>03</span><div><h3>Set the peak limit</h3><p>Watch the meter. Use Mute now if sound feels unsafe.</p></div></li></ol></section>
    <section class="limits" aria-labelledby="limits-title"><div><p class="kicker">Limits and browser constraints</p><h2 id="limits-title">What the guard does not do</h2></div><ul><li>It starts only when you turn it on for a tab.</li><li>It does not capture background tabs by itself.</li><li>Some tabs cannot provide audio to Chrome extensions.</li><li>It cannot guarantee a safe listening level.</li></ul></section>
    <section class="install"><p class="kicker">Chrome extension · v1</p><h2>Put the guard beside your address bar</h2><ol class="install-steps"><li>Download the ZIP.</li><li>Extract the ZIP.</li><li>Open <code>chrome://extensions</code>.</li><li>Turn on <strong>Developer mode</strong>.</li><li>Choose <strong>Load unpacked</strong> and select the extracted folder.</li></ol><a class="button primary" href="/downloads/loudness-lens-chrome-1.0.0.zip" download>Download Loudness Lens</a></section>
  </main>`);
}

function demo() {
  return shell(`<main id="main"><section class="demo-page"><div class="demo-copy"><p class="kicker">Sample cooking lesson · 12 seconds</p><h1 tabindex="-1">Control a sample tab</h1><p>This sample has quiet instruction and two sudden peaks. Set a limit, then listen.</p><div class="demo-actions"><button class="button primary" id="play-sample" type="button">Play sample</button><span id="sample-status">Ready.</span></div><label for="demo-trim">Level trim <output id="trim-value">0 dB</output></label><input id="demo-trim" type="range" min="-12" max="6" step="1" value="0"><p class="demo-help">Tip: try a −12 dB peak limit, then replay the sample.</p></div>${meterMarkup('demo', 'The sample is ready. Play it to see the peak.')}</section><section class="demo-data" aria-labelledby="sample-notes"><h2 id="sample-notes">What is in the sample</h2><ol><li><strong>0–4 seconds</strong><span>Quiet lesson bed</span></li><li><strong>4–6 seconds</strong><span>First volume jump</span></li><li><strong>8–10 seconds</strong><span>Second volume jump</span></li></ol></section><audio id="sample-audio" src="/assets/sample-lesson-v1.wav" preload="auto"></audio></main>`, true);
}

function privacy() {
  return shell(`<main id="main" class="prose"><p class="kicker">Policy · effective 28 August 2026</p><h1 tabindex="-1">Your audio stays on your device</h1><p>Loudness Lens processes captured tab audio inside Chrome.</p><h2>What the extension stores</h2><p>The extension keeps your limit and trim settings in Chrome storage. It does not need your name or email.</p><h2>What the demo stores</h2><p>Demo settings use a separate <code>demo:</code> browser storage key. Reset demo restores the default settings.</p><h2>Network use</h2><p>This site serves its own files. Audio stays in your browser.</p><h2>Your control</h2><p>Turning off, closing, or reloading a guarded tab ends its capture.</p><h2>Questions</h2><p>Email <a href="mailto:privacy@sociobot.in">privacy@sociobot.in</a>.</p></main>`);
}

function terms() {
  return shell(`<main id="main" class="prose"><p class="kicker">Terms · effective 28 August 2026</p><h1 tabindex="-1">Use Loudness Lens as a listening aid</h1><p>Loudness Lens is free software provided under the MIT License.</p><h2>No medical or hearing guarantee</h2><p>The extension can reduce digital peaks in a captured tab. It cannot guarantee a safe listening level. Set your system volume to a comfortable level first.</p><h2>Browser limits</h2><p>Chrome may block capture on protected pages. Loudness Lens shows a recovery error when capture cannot start.</p><h2>Your responsibility</h2><p>Use the extension lawfully. Do not try to bypass protected media or other browser controls.</p><h2>Changes</h2><p>New terms will appear on this page with a new effective date.</p></main>`);
}

function notFound() {
  return shell(`<main id="main" class="not-found"><div class="lost-plant" aria-hidden="true">⌇</div><p class="kicker">Field note 404</p><h1 tabindex="-1">This specimen is not in the guide</h1><p>The address may be old or mistyped.</p><a class="button primary" href="/" data-link>Return to Loudness Lens</a></main>`);
}

const routes: Record<string, { title: string; description: string; render: () => string }> = {
  '/': { title: 'Loudness Lens — keep browser volume steady', description: 'Keep one browser tab at a steady level with a visible peak limit and a quick mute control.', render: home },
  '/demo': { title: 'Demo — Loudness Lens', description: 'Try Loudness Lens with a 12-second local lesson sample. Change the peak limit, hear two volume jumps, mute, and reset.', render: demo },
  '/privacy': { title: 'Privacy — Loudness Lens', description: 'Read what Loudness Lens stores, how tab audio stays on your device, and how demo data is separated and discarded.', render: privacy },
  '/terms': { title: 'Terms — Loudness Lens', description: 'Read the terms, browser limits, and listening-safety boundaries for the free Loudness Lens Chrome extension.', render: terms },
};

function routePath(pathname: string, search: string) {
  return pathname === '/' && new URLSearchParams(search).get('demo') === '1' ? '/demo' : pathname;
}

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

function setupPreview() {
  const preview = document.querySelector<HTMLElement>('.product-preview');
  if (!preview) return;
  const ceiling = preview.querySelector<HTMLInputElement>('.ceiling-control')!;
  const ceilingValue = preview.querySelector<HTMLElement>('.ceiling-readout')!;
  const marker = preview.querySelector<HTMLElement>('.meter-limit')!;
  const mute = preview.querySelector<HTMLButtonElement>('.mute-control')!;
  const note = preview.querySelector<HTMLElement>('.meter-note')!;
  const updateLimit = () => {
    const value = Number(ceiling.value);
    ceilingValue.textContent = `−${Math.abs(value)} dB`;
    marker.className = `meter-limit limit-${Math.abs(value)}`;
    if (mute.getAttribute('aria-pressed') !== 'true') note.textContent = `Example reading: −18 dB, below the −${Math.abs(value)} dB limit.`;
  };
  ceiling.addEventListener('input', updateLimit);
  mute.addEventListener('click', () => {
    const muted = mute.getAttribute('aria-pressed') !== 'true';
    mute.setAttribute('aria-pressed', String(muted));
    mute.classList.toggle('active', muted);
    mute.innerHTML = muted ? '<span aria-hidden="true">↗</span> Restore preview sound' : '<span aria-hidden="true">×</span> Mute now';
    note.textContent = muted ? 'Preview muted. The example reading is paused.' : `Example reading: −18 dB, below the −${Math.abs(Number(ceiling.value))} dB limit.`;
  });
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
  mute.setAttribute('aria-pressed', String(state.muted));
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
  mute.addEventListener('click', () => { mute.classList.toggle('active'); mute.setAttribute('aria-pressed', String(mute.classList.contains('active'))); mute.innerHTML = mute.classList.contains('active') ? '<span aria-hidden="true">↗</span> Restore sound' : '<span aria-hidden="true">×</span> Mute now'; apply(); });
  document.querySelector('#reset-demo')?.addEventListener('click', () => { discardDemoState(); stopAudio(); render('/demo', true); });
  document.querySelector('#start-real')?.addEventListener('click', () => {
    discardDemoState();
    requestAnimationFrame(() => {
      history.pushState({}, '', '/');
      render('/', true);
    });
  });
  apply();
}

function wireLinks() {
  document.querySelectorAll<HTMLAnchorElement>('a[data-link]').forEach((link) => link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || link.target) return;
    const url = new URL(link.href);
    if (url.origin !== location.origin) return;
    event.preventDefault();
    if (activePath === '/demo' && routePath(url.pathname, url.search) !== '/demo') discardDemoState();
    history.pushState({}, '', url.pathname + url.search + url.hash);
    render(routePath(url.pathname, url.search), true);
    if (url.hash) setTimeout(() => document.querySelector(url.hash)?.scrollIntoView(), 0);
  }));
}

function setRouteMetadata(path: string, title: string, description: string, found: boolean) {
  const url = `https://loudness-lens.sociobot.in${path === '/' ? '/' : path}`;
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (found) {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = url;
  } else canonical?.remove();
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
  document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
  if (!found) {
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.append(robots);
    }
    robots.content = 'noindex';
  } else robots?.remove();
}

function render(path = location.pathname, focusHeading = false) {
  stopAudio();
  const found = Boolean(routes[path]);
  const route = routes[path] ?? { title: 'Page not found — Loudness Lens', description: 'The requested Loudness Lens page was not found.', render: notFound };
  document.title = route.title;
  setRouteMetadata(path, route.title, route.description, found);
  app.innerHTML = route.render();
  wireLinks();
  if (path === '/demo') void setupDemo();
  if (path === '/') setupPreview();
  const heading = document.querySelector<HTMLElement>('h1');
  announcer.textContent = heading?.textContent ?? '';
  if (focusHeading) requestAnimationFrame(() => heading?.focus({ preventScroll: true }));
  scrollTo({ top: 0, behavior: 'instant' });
  activePath = path;
}

addEventListener('popstate', () => {
  const nextPath = routePath(location.pathname, location.search);
  if (activePath === '/demo' && nextPath !== '/demo') discardDemoState();
  render(nextPath, true);
});
addEventListener('pagehide', () => {
  if (activePath === '/demo') discardDemoState();
});
render(routePath(location.pathname, location.search));
