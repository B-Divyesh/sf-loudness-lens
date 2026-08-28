import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('@claim:local-only keeps the complete demo flow on the same origin', async ({ page }) => {
  const foreign: string[] = [];
  page.on('request', (request) => { if (new URL(request.url()).origin !== 'http://127.0.0.1:4173') foreign.push(request.url()); });
  await page.goto('/demo');
  await page.getByRole('button', { name: 'Play sample' }).click();
  await expect(page.locator('#sample-status')).toContainText('Playing');
  await page.getByRole('slider', { name: 'Peak limit' }).fill('-12');
  expect(foreign).toEqual([]);
});

test('@claim:sample-limiter plays the shipped sample through the limiter', async ({ page }) => {
  await page.goto('/demo');
  await page.getByRole('slider', { name: 'Peak limit' }).fill('-18');
  await page.getByRole('button', { name: 'Play sample' }).click();
  await expect.poll(() => page.locator('#sample-audio').evaluate((node: HTMLAudioElement) => node.currentTime)).toBeGreaterThan(0.2);
  await expect(page.locator('.meter-note')).toContainText('Limiter reduced', { timeout: 10_000 });
  await expect(page.getByRole('button', { name: 'Pause sample' })).toBeVisible();
});

test('@claim:sample-timing ships a 12-second lesson with two loud intervals', async ({ page }) => {
  await page.goto('/demo');
  const sample = await page.evaluate(async () => {
    const response = await fetch('/assets/sample-lesson.wav');
    const context = new AudioContext();
    const buffer = await context.decodeAudioData(await response.arrayBuffer());
    const channel = buffer.getChannelData(0);
    const rms = (start: number, end: number) => {
      let total = 0;
      for (let index = Math.floor(start * buffer.sampleRate); index < Math.floor(end * buffer.sampleRate); index += 1) total += (channel[index] ?? 0) ** 2;
      return Math.sqrt(total / ((end - start) * buffer.sampleRate));
    };
    const result = { duration: buffer.duration, quiet: rms(1, 3), firstJump: rms(4, 6), secondJump: rms(8, 10) };
    await context.close();
    return result;
  });
  expect(sample.duration).toBeCloseTo(12, 3);
  expect(sample.firstJump).toBeGreaterThan(sample.quiet * 2);
  expect(sample.secondJump).toBeGreaterThan(sample.quiet * 2);
});

test('@claim:demo-isolation writes controls only to the demo storage namespace', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Level trim').fill('3');
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual(['demo:loudness-lens:v1']);
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toContain('"trim":3');
});

test('@claim:demo-reset restores every sample setting to its defaults', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Level trim').fill('3');
  await page.getByRole('slider', { name: 'Peak limit' }).fill('-12');
  await page.getByRole('button', { name: 'Mute now' }).click();
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByLabel('Level trim')).toHaveValue('0');
  await expect(page.getByRole('slider', { name: 'Peak limit' })).toHaveValue('-6');
  await expect(page.getByRole('button', { name: 'Mute now' })).toBeVisible();
});

test('@claim:demo-discard clears settings on browser history and direct navigation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Try it with sample data' }).click();
  await page.getByLabel('Level trim').fill('3');
  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toBeNull();
  await page.goForward();
  await expect(page.getByLabel('Level trim')).toHaveValue('0');
  await page.getByLabel('Level trim').fill('2');
  await page.goto('/privacy');
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toBeNull();
});

test('@claim:free-download provides the extension package without an account', async ({ page }) => {
  await page.goto('/');
  const response = await page.request.get('/downloads/loudness-lens-chrome.zip');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).byteLength).toBeGreaterThan(20_000);
  await expect(page.getByRole('link', { name: 'Download Loudness Lens' })).toHaveAttribute('download', '');
  await expect(page.locator('form')).toHaveCount(0);
});

for (const route of ['/', '/demo', '/privacy', '/terms', '/missing']) {
  test(`page structure and accessibility: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main')).toHaveCount(1);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Loudness Lens/);
    const results = await new AxeBuilder({ page: page as never }).analyze();
    expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
    expect(errors).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  });
}

test('keyboard navigation exposes the skip link and main action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator('h1')).toBeFocused();
});

test('link navigation away from the demo discards its separate settings', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Level trim').fill('3');
  await page.getByLabel('Footer navigation').getByRole('link', { name: 'Privacy' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toBeNull();
});

test('every visible site control has a 44 px touch target', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ['/', '/demo', '/privacy', '/terms']) {
    await page.goto(route);
    const undersized = await page.locator('a, button, input').evaluateAll((nodes) => nodes
      .filter((node) => {
        const style = getComputedStyle(node);
        const box = node.getBoundingClientRect();
        return style.visibility !== 'hidden' && style.display !== 'none' && box.width > 0 && box.height > 0;
      })
      .map((node) => {
        const box = node.getBoundingClientRect();
        return { label: (node.textContent || node.getAttribute('aria-label') || node.tagName).trim(), width: box.width, height: box.height };
      })
      .filter((item) => item.width < 44 || item.height < 44));
    expect(undersized, route).toEqual([]);
  }
});

test('each route updates its canonical URL', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Footer navigation').getByRole('link', { name: 'Privacy' }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://loudness-lens.sociobot.in/privacy');
  await expect(page).toHaveTitle('Privacy — Loudness Lens');
});

test('dark theme keeps serious accessibility findings at zero', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  const results = await new AxeBuilder({ page: page as never }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});
