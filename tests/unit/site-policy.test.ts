import { expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

it('ships crawlable metadata, versioned immutable assets, and a real static 404 response', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8'));
  expect(config.routes).toEqual(expect.arrayContaining([
    expect.objectContaining({ route: '/robots.txt', headers: { 'Cache-Control': 'public, max-age=300, must-revalidate' } }),
    expect.objectContaining({ route: '/sitemap.xml', headers: { 'Cache-Control': 'public, max-age=300, must-revalidate' } }),
    expect.objectContaining({ route: '/assets/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }),
    expect.objectContaining({ route: '/downloads/*', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' } }),
    expect.objectContaining({ route: '/demo', rewrite: '/index.html' }),
    expect.objectContaining({ route: '/privacy', rewrite: '/index.html' }),
    expect.objectContaining({ route: '/terms', rewrite: '/index.html' }),
    expect.objectContaining({ route: '/*', statusCode: 404 }),
  ]));
  expect(config.responseOverrides['404']).toEqual({ rewrite: '/404.html', statusCode: 404 });
  const page = readFileSync('dist/site/404.html', 'utf8');
  expect(page).toContain('<meta name="robots" content="noindex">');
  expect(page).not.toContain('rel="canonical"');
  expect(readdirSync('site/public/assets')).toEqual(expect.arrayContaining([
    'apple-touch-icon-v1.png', 'loudness-botanical-1200-v1.webp',
    'loudness-botanical-640-v1.webp', 'loudness-lens-og-v1.webp',
    'mark-v1.svg', 'sample-lesson-v1.wav',
  ]));
  expect(readFileSync('site/src/main.ts', 'utf8')).toContain('/downloads/loudness-lens-chrome-1.0.0.zip');
});

it('packages an installable extension folder at the ZIP root', () => {
  const archive = 'dist/site/downloads/loudness-lens-chrome-1.0.0.zip';
  const entries = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n');
  expect(entries).toContain('manifest.json');
  expect(entries).toContain('popup.html');
  expect(entries.some((entry) => entry.startsWith('assets/'))).toBe(true);
  const manifest = JSON.parse(execFileSync('unzip', ['-p', archive, 'manifest.json'], { encoding: 'utf8' }));
  expect(manifest.manifest_version).toBe(3);
  expect(manifest.name).toBe('Loudness Lens');
});

it('keeps the public promise and Chrome install instructions aligned with peak limiting', () => {
  const landing = readFileSync('site/src/main.ts', 'utf8');
  const readme = readFileSync('README.md', 'utf8');
  const manifest = readFileSync('wxt.config.ts', 'utf8');
  expect(landing).toContain('Limit sudden peaks in the tab you enable');
  expect(landing).toContain('Open the Extensions menu, then pin Loudness Lens to the toolbar.');
  expect(landing).not.toMatch(/steady volume|predictable listening level/i);
  expect(readme).toContain('Limit sudden peaks in the tab you enable.');
  expect(readme).toContain('Open the Extensions menu, then pin Loudness Lens to the toolbar.');
  expect(manifest).toContain("description: 'Limit sudden peaks in the tab you enable.'");
});

it('lists every claim once and connects it to exactly one tagged test', () => {
  const claims = JSON.parse(readFileSync('.factory/claims.json', 'utf8')) as Array<{ id: string; test: string }>;
  const sources = [
    readFileSync('tests/e2e/site.spec.ts', 'utf8'),
    readFileSync('tests/unit/audio.test.ts', 'utf8'),
    readFileSync('tests/unit/extension.test.ts', 'utf8'),
  ].join('\n');
  expect(new Set(claims.map(({ id }) => id)).size).toBe(claims.length);
  for (const claim of claims) {
    expect(claim.test).toContain(`@claim:${claim.id}`);
    expect(sources.split(`@claim:${claim.id}`).length - 1, claim.id).toBe(1);
  }
});
