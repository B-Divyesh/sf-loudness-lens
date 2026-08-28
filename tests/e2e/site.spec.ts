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

test('demo uses separate storage and reset removes it', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Level trim').fill('3');
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toContain('"trim":3');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toContain('"trim":0');
});

test('keyboard navigation exposes the skip link and main action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/demo$/);
  await expect(page.locator('h1')).toBeFocused();
});

test('leaving the demo discards its separate settings', async ({ page }) => {
  await page.goto('/demo');
  await page.getByLabel('Level trim').fill('3');
  await page.getByLabel('Footer navigation').getByRole('link', { name: 'Privacy' }).click();
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toBeNull();
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
