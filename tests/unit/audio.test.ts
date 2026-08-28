import { describe, expect, it } from 'vitest';
import { clampSettings, dbToGain, gainToDb, meterLabel } from '../../lib/audio';

describe('audio values', () => {
  it('converts between decibels and linear gain', () => expect(gainToDb(dbToGain(-6))).toBeCloseTo(-6, 5));
  it('keeps user settings inside safe control ranges', () => {
    expect(clampSettings({ inputGainDb: 80, ceilingDb: -80, muted: true })).toEqual({ inputGainDb: 6, ceilingDb: -18, muted: true });
  });
  it('gives a text alternative for meter state', () => {
    expect(meterLabel(-7, 2.1)).toContain('Limiter reduced 2.1 dB');
    expect(meterLabel(-60, 0)).toBe('No sound detected.');
  });
});
