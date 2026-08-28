import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { DEFAULT_SETTINGS, dbToGain, meterLabel } from '../../lib/audio';
import { applyAudioSettings, closeAudioSession, readPeakDb } from '../../lib/audio-session';
import {
  captureStartError,
  defaultGuardState,
  persistGuardState,
  requestTabStream,
  shouldStopForTabUpdate,
  stoppedGuardState,
  tabStorageKey,
  withMeter,
  withSettings,
} from '../../lib/extension-behavior';

describe('extension behavior', () => {
  it('@claim:tab-consent requests a stream only for the tab the user enabled', async () => {
    const requested: number[] = [];
    const stream = await requestTabStream({ getMediaStreamId: ({ targetTabId }, callback) => { requested.push(targetTabId); callback('stream-for-enabled-tab'); } }, 42, () => undefined);
    expect(stream).toBe('stream-for-enabled-tab');
    expect(requested).toEqual([42]);
  });

  it('@claim:panic-mute applies zero gain to the captured output immediately', () => {
    const calls: number[] = [];
    const ceilings: number[] = [];
    applyAudioSettings({ ...DEFAULT_SETTINGS, muted: true }, 2.5, { setTargetAtTime: (value) => calls.push(value) }, { postMessage: ({ ceiling }) => ceilings.push(ceiling) });
    expect(calls).toEqual([0]);
    expect(ceilings).toEqual([dbToGain(-6)]);
  });

  it('@claim:look-ahead-limiter delays audio by 10 ms before applying gain reduction', () => {
    const worklet = readFileSync('public/limiter-worklet.js', 'utf8');
    let Processor: any;
    class MockAudioWorkletProcessor { port = { onmessage: null, postMessage: () => undefined }; }
    runInNewContext(worklet, { sampleRate: 48_000, AudioWorkletProcessor: MockAudioWorkletProcessor, registerProcessor: (_name: string, constructor: unknown) => { Processor = constructor; }, Float32Array, Math });
    const processor = new Processor({ processorOptions: { ceiling: 0.5 } });
    const rendered: number[] = [];
    for (let block = 0; block < 5; block += 1) {
      const input = new Float32Array(128);
      if (block === 0) input[0] = 1;
      const output = new Float32Array(128);
      processor.process([[input]], [[output]]);
      rendered.push(...output);
    }
    expect(rendered.slice(0, 480).every((sample) => sample === 0)).toBe(true);
    expect(Math.max(...rendered.map(Math.abs))).toBeLessThanOrEqual(0.500_001);
  });

  it('@claim:live-meter measures a captured peak and reports limiter reduction', () => {
    const peak = readPeakDb({ getFloatTimeDomainData: (samples) => { samples[0] = 0.5; } }, 8);
    expect(peak).toBeCloseTo(-6.02, 1);
    expect(meterLabel(peak, 2.1)).toContain('Limiter reduced 2.1 dB');
  });

  it('@claim:level-trim applies the selected -12 dB to +6 dB gain range', () => {
    const calls: number[] = [];
    const gain = { setTargetAtTime: (value: number) => calls.push(value) };
    const limiter = { postMessage: () => undefined };
    applyAudioSettings({ ...DEFAULT_SETTINGS, inputGainDb: -12 }, 0, gain, limiter);
    applyAudioSettings({ ...DEFAULT_SETTINGS, inputGainDb: 6 }, 0, gain, limiter);
    expect(calls).toEqual([dbToGain(-12), dbToGain(6)]);
  });

  it('@claim:capture-lifecycle stops tracks and closes audio when a guarded tab closes or reloads', async () => {
    const stopped: string[] = [];
    let closed = 0;
    await closeAudioSession({ timer: 7, stream: { getTracks: () => [{ stop: () => stopped.push('track') }] }, context: { close: async () => { closed += 1; } } }, (timer) => stopped.push(`timer:${timer}`));
    expect(stopped).toEqual(['timer:7', 'track']);
    expect(closed).toBe(1);
    const guarded = { ...defaultGuardState(), enabled: true, status: 'on' as const };
    expect(shouldStopForTabUpdate({ status: 'loading' }, guarded)).toBe(true);
    expect(stoppedGuardState(guarded)).toMatchObject({ enabled: false, status: 'off', peakDb: -60 });
  });

  it('@claim:local-settings persists settings in the scoped Chrome session key', async () => {
    const writes: Record<string, unknown>[] = [];
    const state = withSettings(defaultGuardState(), { ceilingDb: -12, inputGainDb: 3 });
    await persistGuardState({ set: async (items) => { writes.push(items); } }, 42, state);
    expect(tabStorageKey(42)).toBe('tab:42');
    expect(writes).toEqual([{ 'tab:42': expect.objectContaining({ settings: { ceilingDb: -12, inputGainDb: 3, muted: false } }) }]);
  });

  it('@claim:capture-error reports a recovery step when Chrome cannot provide tab audio', async () => {
    await expect(requestTabStream({ getMediaStreamId: (_options, callback) => callback() }, 9, () => 'Capture is blocked')).rejects.toThrow('Capture is blocked');
    expect(captureStartError('Capture is blocked')).toContain('Try a normal video or music tab');
  });

  it('does not update the live meter after the guard has been stopped', () => {
    expect(withMeter(defaultGuardState(), -4, 2)).toEqual(defaultGuardState());
  });
});
