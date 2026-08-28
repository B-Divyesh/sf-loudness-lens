import { meterLabel } from '../../lib/audio';

const enabled = document.querySelector<HTMLInputElement>('#enabled')!;
const ceiling = document.querySelector<HTMLInputElement>('#ceiling')!;
const gain = document.querySelector<HTMLInputElement>('#gain')!;
const panic = document.querySelector<HTMLButtonElement>('#panic')!;
const badge = document.querySelector<HTMLElement>('#status-badge')!;
const error = document.querySelector<HTMLElement>('#error')!;
const peakMeter = document.querySelector<HTMLMeterElement>('#peak-meter')!;
const mark = document.querySelector<HTMLElement>('#ceiling-mark')!;
const peakValue = document.querySelector<HTMLOutputElement>('#peak-value')!;
const meterDetail = document.querySelector<HTMLElement>('#meter-detail')!;
const ceilingValue = document.querySelector<HTMLOutputElement>('#ceiling-value')!;
const gainValue = document.querySelector<HTMLOutputElement>('#gain-value')!;

let tabId = -1;

function formatDb(value: number) {
  return `${value < 0 ? '−' : value > 0 ? '+' : ''}${Math.abs(value)} dB`;
}

function sendSettings() {
  void chrome.runtime.sendMessage({
    target: 'background', type: 'settings', tabId,
    settings: { ceilingDb: Number(ceiling.value), inputGainDb: Number(gain.value), muted: panic.dataset.muted === 'true' },
  });
}

function render(state: any) {
  enabled.checked = state.enabled;
  enabled.disabled = state.status === 'starting';
  badge.textContent = state.status === 'starting' ? 'Starting…' : state.enabled ? 'Guard on' : 'Guard off';
  badge.dataset.on = String(state.enabled);
  ceiling.value = String(state.settings.ceilingDb);
  gain.value = String(state.settings.inputGainDb);
  ceilingValue.textContent = formatDb(state.settings.ceilingDb);
  gainValue.textContent = formatDb(state.settings.inputGainDb);
  panic.dataset.muted = String(state.settings.muted);
  panic.classList.toggle('active', state.settings.muted);
  panic.innerHTML = state.settings.muted ? '<span aria-hidden="true">↗</span> Restore sound' : '<span aria-hidden="true">×</span> Mute now';
  mark.className = `limit-${Math.abs(state.settings.ceilingDb)}`;
  const peak = Math.max(-60, Math.min(0, state.peakDb));
  peakMeter.value = peak;
  peakValue.textContent = formatDb(Math.round(peak));
  meterDetail.textContent = state.enabled ? meterLabel(peak, state.reductionDb) : 'Turn on the guard to see this tab’s sound.';
  error.hidden = !state.error;
  error.textContent = state.error ?? '';
}

enabled.addEventListener('change', () => {
  void chrome.runtime.sendMessage({ target: 'background', type: 'set-enabled', tabId, enabled: enabled.checked });
});
ceiling.addEventListener('input', () => { ceilingValue.textContent = formatDb(Number(ceiling.value)); sendSettings(); });
gain.addEventListener('input', () => { gainValue.textContent = formatDb(Number(gain.value)); sendSettings(); });
panic.addEventListener('click', () => { panic.dataset.muted = String(panic.dataset.muted !== 'true'); sendSettings(); });

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === 'state' && message.tabId === tabId) render(message.state);
});

async function init() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error('No active tab');
    tabId = tab.id;
    const state = await chrome.runtime.sendMessage({ target: 'background', type: 'get-state', tabId });
    render(state);
  } catch {
    error.hidden = false;
    error.textContent = 'This tab is unavailable. Open a normal web page, then try again.';
    enabled.disabled = true;
  }
}

void init();
