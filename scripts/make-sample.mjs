import { writeFileSync } from 'node:fs';

const rate = 22050;
const duration = 12;
const samples = rate * duration;
const bytes = Buffer.alloc(44 + samples * 2);
bytes.write('RIFF', 0); bytes.writeUInt32LE(36 + samples * 2, 4); bytes.write('WAVEfmt ', 8);
bytes.writeUInt32LE(16, 16); bytes.writeUInt16LE(1, 20); bytes.writeUInt16LE(1, 22);
bytes.writeUInt32LE(rate, 24); bytes.writeUInt32LE(rate * 2, 28); bytes.writeUInt16LE(2, 32); bytes.writeUInt16LE(16, 34);
bytes.write('data', 36); bytes.writeUInt32LE(samples * 2, 40);
for (let i = 0; i < samples; i += 1) {
  const t = i / rate;
  const phrase = Math.sin(2 * Math.PI * (180 + 24 * Math.sin(t * 1.3)) * t) * 0.07 + Math.sin(2 * Math.PI * 270 * t) * 0.025;
  const peak = ((t > 4 && t < 5.8) || (t > 8.1 && t < 9.8)) ? Math.sin(2 * Math.PI * 150 * t) * 0.78 : 0;
  const envelope = Math.min(1, t * 4, (duration - t) * 4);
  bytes.writeInt16LE(Math.max(-32767, Math.min(32767, (phrase + peak) * envelope * 32767)), 44 + i * 2);
}
writeFileSync(new URL('../site/public/assets/sample-lesson.wav', import.meta.url), bytes);
