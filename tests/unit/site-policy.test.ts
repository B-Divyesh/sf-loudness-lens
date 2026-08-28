import { expect, it } from 'vitest';
import { readdirSync, readFileSync } from 'node:fs';

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
