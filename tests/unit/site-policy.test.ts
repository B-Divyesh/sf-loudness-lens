import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

it('ships immutable asset cache policy and a real static 404 response', () => {
  const config = JSON.parse(readFileSync('site/public/staticwebapp.config.json', 'utf8'));
  expect(config.navigationFallback).toEqual(expect.objectContaining({ rewrite: '/index.html' }));
  expect(config.routes).toEqual(expect.arrayContaining([
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
});
