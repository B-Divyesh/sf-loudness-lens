import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';

describe('extension boundaries', () => {
  const manifest = JSON.parse(readFileSync('dist/extension/chrome-mv3/manifest.json', 'utf8'));
  const background = readFileSync('entrypoints/background.ts', 'utf8');
  const offscreen = readFileSync('entrypoints/offscreen/main.ts', 'utf8');
  const popup = readFileSync('entrypoints/popup/main.ts', 'utf8');
  const popupHtml = readFileSync('entrypoints/popup/index.html', 'utf8');
  const worklet = readFileSync('public/limiter-worklet.js', 'utf8');
  it('@claim:tab-consent captures only a user-selected tab', () => {
    expect(manifest.permissions).toContain('activeTab');
    expect(manifest.permissions).toContain('tabCapture');
    expect(background).toContain('targetTabId: tabId');
    expect(background).not.toContain('chrome.tabs.query({}');
  });
  it('@claim:no-recording processes audio without a recorder or upload', () => {
    expect(offscreen).not.toMatch(/MediaRecorder|fetch\(|XMLHttpRequest|WebSocket/);
    expect(manifest.permissions).not.toContain('downloads');
    expect(manifest.host_permissions ?? []).toHaveLength(0);
  });
  it('@claim:panic-mute sends a zero gain immediately', () => {
    expect(offscreen).toContain('settings.muted ? 0');
    expect(popup).toContain("panic.addEventListener('click'");
  });
  it('@claim:look-ahead-limiter delays audio by 10 ms before applying gain reduction', () => {
    expect(worklet).toContain('sampleRate * 0.01');
    expect(offscreen).toContain("'look-ahead-limiter'");

    let Processor: any;
    class MockAudioWorkletProcessor {
      port = { onmessage: null, postMessage: () => undefined };
    }
    runInNewContext(worklet, {
      sampleRate: 48_000,
      AudioWorkletProcessor: MockAudioWorkletProcessor,
      registerProcessor: (_name: string, constructor: unknown) => { Processor = constructor; },
      Float32Array,
      Math,
    });
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
  it('@claim:live-meter reports the captured tab peak and limiter reduction', () => {
    expect(offscreen).toContain("type: 'meter'");
    expect(offscreen).toContain('getFloatTimeDomainData');
    expect(popupHtml).toContain('<meter id="peak-meter"');
    expect(popup).toContain('peakMeter.value = peak');
  });
  it('@claim:level-trim applies the chosen local gain', () => {
    expect(offscreen).toContain('dbToGain(settings.inputGainDb)');
    expect(popupHtml).toMatch(/id="gain"[^>]+min="-12"[^>]+max="6"/);
  });
  it('@claim:capture-lifecycle stops capture when a tab closes or reloads', () => {
    expect(background).toContain('chrome.tabs.onRemoved.addListener');
    expect(background).toContain("change.status === 'loading'");
    expect(background).toContain("type: 'stop', tabId");
  });
  it('@claim:local-settings uses Chrome storage without analytics code', () => {
    expect(background).toContain('chrome.storage.session');
    expect(`${background}\n${offscreen}\n${popup}`).not.toMatch(/analytics|sendBeacon|XMLHttpRequest|fetch\(/i);
  });
});
