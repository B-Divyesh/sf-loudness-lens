export const DEFAULT_SETTINGS = {
  inputGainDb: 0,
  ceilingDb: -6,
  muted: false,
};

export type GuardSettings = typeof DEFAULT_SETTINGS;

export function dbToGain(db: number): number {
  return 10 ** (db / 20);
}

export function gainToDb(gain: number): number {
  if (gain <= 0) return -60;
  return Math.max(-60, 20 * Math.log10(gain));
}

export function clampSettings(value: Partial<GuardSettings>): GuardSettings {
  return {
    inputGainDb: Math.min(6, Math.max(-12, Number(value.inputGainDb ?? 0))),
    ceilingDb: Math.min(-1, Math.max(-18, Number(value.ceilingDb ?? -6))),
    muted: Boolean(value.muted),
  };
}

export function meterLabel(db: number, reduction: number): string {
  if (reduction > 0.5) return `Peak ${Math.round(db)} dB. Limiter reduced ${reduction.toFixed(1)} dB.`;
  if (db < -50) return 'No sound detected.';
  return `Peak ${Math.round(db)} dB. No limiting.`;
}
