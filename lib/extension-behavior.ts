import { DEFAULT_SETTINGS, clampSettings, type GuardSettings } from './audio';

export type GuardState = {
  enabled: boolean;
  status: 'off' | 'starting' | 'on' | 'error';
  settings: GuardSettings;
  peakDb: number;
  reductionDb: number;
  error?: string;
};

type SessionStorageLike = { set: (items: Record<string, unknown>) => Promise<void> | void };
type TabCaptureLike = {
  getMediaStreamId: (options: { targetTabId: number }, callback: (streamId?: string) => void) => void;
};

export function tabStorageKey(tabId: number) {
  return `tab:${tabId}`;
}

export function defaultGuardState(): GuardState {
  return {
    enabled: false,
    status: 'off',
    settings: { ...DEFAULT_SETTINGS },
    peakDb: -60,
    reductionDb: 0,
  };
}

export function withSettings(state: GuardState, settings: Partial<GuardSettings>): GuardState {
  return { ...state, settings: clampSettings({ ...state.settings, ...settings }) };
}

export function withMeter(state: GuardState, peakDb: number, reductionDb: number): GuardState {
  return state.enabled ? { ...state, peakDb, reductionDb } : state;
}

export function stoppedGuardState(state: GuardState): GuardState {
  return { ...state, enabled: false, status: 'off', peakDb: -60, reductionDb: 0, error: undefined };
}

export function captureStartError(message: string): string {
  return message.toLowerCase().includes('captur')
    ? 'This tab cannot share audio. Try a normal video or music tab.'
    : 'The guard could not start. Reload the tab, then try again.';
}

export function shouldStopForTabUpdate(change: { status?: string }, state: GuardState): boolean {
  return change.status === 'loading' && state.enabled;
}

export async function persistGuardState(storage: SessionStorageLike, tabId: number, state: GuardState) {
  await storage.set({ [tabStorageKey(tabId)]: state });
}

export function requestTabStream(tabCapture: TabCaptureLike, tabId: number, lastError: () => string | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    tabCapture.getMediaStreamId({ targetTabId: tabId }, (streamId) => {
      const error = lastError();
      if (error) reject(new Error(error));
      else if (streamId) resolve(streamId);
      else reject(new Error('Chrome did not provide a tab audio stream.'));
    });
  });
}
