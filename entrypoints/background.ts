import { DEFAULT_SETTINGS, clampSettings, type GuardSettings } from '../lib/audio';

type TabState = {
  enabled: boolean;
  status: 'off' | 'starting' | 'on' | 'error';
  settings: GuardSettings;
  peakDb: number;
  reductionDb: number;
  error?: string;
};

const states = new Map<number, TabState>();
const restored = chrome.storage.session.get(null).then((items) => {
  for (const [key, value] of Object.entries(items)) {
    if (key.startsWith('tab:')) states.set(Number(key.slice(4)), value as TabState);
  }
});

function save(tabId: number) {
  void chrome.storage.session.set({ [`tab:${tabId}`]: states.get(tabId) });
}

function stateFor(tabId: number): TabState {
  return states.get(tabId) ?? {
    enabled: false,
    status: 'off',
    settings: { ...DEFAULT_SETTINGS },
    peakDb: -60,
    reductionDb: 0,
  };
}

async function ensureOffscreen() {
  const url = chrome.runtime.getURL('offscreen.html');
  const contexts = await chrome.runtime.getContexts({
    contextTypes: [chrome.runtime.ContextType.OFFSCREEN_DOCUMENT],
    documentUrls: [url],
  });
  if (!contexts.length) {
    await chrome.offscreen.createDocument({
      url: 'offscreen.html',
      reasons: [chrome.offscreen.Reason.USER_MEDIA],
      justification: 'Process audio from tabs the user explicitly enables.',
    });
  }
}

async function broadcast(tabId: number) {
  const state = stateFor(tabId);
  save(tabId);
  await chrome.runtime.sendMessage({ type: 'state', tabId, state }).catch(() => undefined);
}

async function enable(tabId: number) {
  await restored;
  const state = stateFor(tabId);
  states.set(tabId, { ...state, enabled: true, status: 'starting', error: undefined });
  await broadcast(tabId);
  try {
    await ensureOffscreen();
    const streamId = await new Promise<string>((resolve, reject) => {
      chrome.tabCapture.getMediaStreamId({ targetTabId: tabId }, (id) => {
        const failure = chrome.runtime.lastError;
        if (failure) reject(new Error(failure.message));
        else resolve(id);
      });
    });
    const result = await chrome.runtime.sendMessage({
      target: 'offscreen', type: 'start', tabId, streamId, settings: state.settings,
    });
    if (!result?.ok) throw new Error(result?.error ?? 'Audio capture failed.');
    states.set(tabId, { ...stateFor(tabId), enabled: true, status: 'on' });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    states.set(tabId, {
      ...stateFor(tabId), enabled: false, status: 'error',
      error: message.includes('captur')
        ? 'This tab cannot share audio. Try a normal video or music tab.'
        : 'The guard could not start. Reload the tab, then try again.',
    });
  }
  await broadcast(tabId);
}

async function disable(tabId: number) {
  await restored;
  await chrome.runtime.sendMessage({ target: 'offscreen', type: 'stop', tabId }).catch(() => undefined);
  states.set(tabId, { ...stateFor(tabId), enabled: false, status: 'off', peakDb: -60, reductionDb: 0 });
  await broadcast(tabId);
}

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.target === 'background' && message.type === 'get-state') {
      void restored.then(() => sendResponse(stateFor(message.tabId)));
      return true;
    }
    if (message.target === 'background' && message.type === 'set-enabled') {
      void (message.enabled ? enable(message.tabId) : disable(message.tabId));
      return;
    }
    if (message.target === 'background' && message.type === 'settings') {
      const state = stateFor(message.tabId);
      const settings = clampSettings({ ...state.settings, ...message.settings });
      states.set(message.tabId, { ...state, settings });
      save(message.tabId);
      void chrome.runtime.sendMessage({ target: 'offscreen', type: 'settings', tabId: message.tabId, settings });
      void broadcast(message.tabId);
      return;
    }
    if (message.target === 'background' && message.type === 'meter') {
      const state = stateFor(message.tabId);
      if (state.enabled) {
        states.set(message.tabId, { ...state, peakDb: message.peakDb, reductionDb: message.reductionDb });
        void broadcast(message.tabId);
      }
    }
  });

  chrome.tabs.onRemoved.addListener((tabId) => {
    states.delete(tabId);
    void chrome.storage.session.remove(`tab:${tabId}`);
    void chrome.runtime.sendMessage({ target: 'offscreen', type: 'stop', tabId }).catch(() => undefined);
  });
  chrome.tabs.onUpdated.addListener((tabId, change) => {
    if (change.status === 'loading' && stateFor(tabId).enabled) void disable(tabId);
  });
});
