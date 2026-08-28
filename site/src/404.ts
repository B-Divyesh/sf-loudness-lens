import './style.css';

const app = document.querySelector<HTMLElement>('#app')!;
const announcer = document.querySelector<HTMLElement>('#announcer')!;

app.innerHTML = `<header class="site-header"><a class="wordmark" href="/" aria-label="Loudness Lens home"><img src="/assets/mark-v1.svg" alt="" width="36" height="36"><span>Loudness Lens</span></a><nav aria-label="Main navigation"><a href="/?demo=1">Demo</a><a href="/#how">How it works</a><a href="/privacy">Privacy</a><a class="download-small" href="/downloads/loudness-lens-chrome-1.0.0.zip" download>Download</a></nav></header><main id="main" class="not-found"><div class="lost-plant" aria-hidden="true">⌇</div><p class="kicker">Field note 404</p><h1 tabindex="-1">This specimen is not in the guide</h1><p>The address may be old or mistyped.</p><a class="button primary" href="/">Return to Loudness Lens</a></main><footer><div><strong>Loudness Lens</strong><p>Limit sudden peaks in the tab you enable.</p></div><nav aria-label="Footer navigation"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="https://sociobot.in" rel="noreferrer">Built by Param Factory <span aria-hidden="true">↗</span><span class="external-label">external site</span></a></nav><p class="build">v1.0.0 · Original generated botanical artwork</p></footer>`;

announcer.textContent = document.querySelector('h1')?.textContent ?? '';
