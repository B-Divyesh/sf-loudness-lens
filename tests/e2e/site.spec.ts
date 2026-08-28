import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectFontSizeAtLeast(page: import('@playwright/test').Page, selectors: string[]) {
  const sizes = await page.locator(selectors.join(', ')).evaluateAll((nodes) => nodes.map((node) => ({
    selector: node.className || node.tagName,
    size: Number.parseFloat(getComputedStyle(node).fontSize),
  })));
  expect(sizes).not.toEqual([]);
  expect(sizes.every((item) => item.size >= 16), JSON.stringify(sizes)).toBeTruthy();
}

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
    const response = await fetch('/assets/sample-lesson-v1.wav');
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
  await page.goto('/?demo=1');
  await page.getByLabel('Level trim').fill('2');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download the extension ZIP' }).click();
  await downloadPromise;
  await expect(page).toHaveURL(/\/$/);
  expect(await page.evaluate(() => localStorage.getItem('demo:loudness-lens:v1'))).toBeNull();
});

test('@claim:free-download provides the extension package without an account', async ({ page }) => {
  await page.goto('/');
  const response = await page.request.get('/downloads/loudness-lens-chrome-1.0.0.zip');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).byteLength).toBeGreaterThan(20_000);
  await expect(page.getByRole('link', { name: 'Download Loudness Lens' })).toHaveAttribute('download', '');
  await expect(page.locator('form')).toHaveCount(0);
});

test('@claim:peak-limit-marker updates the landing marker and mute state', async ({ page }) => {
  await page.goto('/');
  const preview = page.locator('.product-preview');
  await expect(preview.locator('#preview-peak')).toHaveText('−18 dB');
  await expect(preview.locator('.meter-note')).toContainText('Example reading: −18 dB');
  await preview.getByRole('slider', { name: 'Peak limit' }).fill('-12');
  await expect(preview.locator('.ceiling-readout')).toHaveText('−12 dB');
  await expect(preview.locator('.meter-limit')).toHaveClass(/limit-12/);
  await expect(preview.locator('.meter-note')).toContainText('−12 dB limit');
  await preview.getByRole('button', { name: 'Mute now' }).click();
  await expect(preview.getByRole('button', { name: 'Restore preview sound' })).toHaveAttribute('aria-pressed', 'true');
  await expect(preview.locator('.meter-note')).toHaveText('Preview muted. The example reading is paused.');
  await preview.getByRole('button', { name: 'Restore preview sound' }).click();
  await expect(preview.getByRole('button', { name: 'Mute now' })).toHaveAttribute('aria-pressed', 'false');
});

test('the first screen describes a selected-tab peak limiter without a normalization promise', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero .kicker')).toHaveText('A per-tab peak limiter');
  await expect(page.locator('.hero h1')).toHaveText('Limit sudden peaks in the tab you enable');
  await expect(page.locator('.hero-actions span')).toHaveText('Keep sudden peaks below your chosen limit.');
  await expect(page.locator('footer > div > p')).toHaveText('Limit sudden peaks in the tab you enable.');
  await expect(page).toHaveTitle('Loudness Lens — limit sudden tab peaks');
  await expect(page.locator('body')).not.toContainText(/steady volume|predictable listening level/i);
});

test('landing section labels describe the content in plain words', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.product-preview > .section-intro > .kicker')).toHaveText('Peak-limit preview');
  await expect(page.locator('#how > .kicker')).toHaveText('Three steps');
  await expect(page.locator('.limits .kicker')).toHaveText('Limits and browser constraints');
  await expect(page.getByText('The control in one glance')).toHaveCount(0);
  await expect(page.getByText('Three field notes')).toHaveCount(0);
  await expect(page.getByText('Clear boundaries')).toHaveCount(0);
});

for (const route of ['/', '/demo', '/privacy', '/terms', '/missing']) {
  test(`page structure and accessibility: ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('pageerror', (error) => errors.push(error.message));
    for (const width of [390, 195]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('lang', 'en');
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/Loudness Lens/);
      const results = await new AxeBuilder({ page: page as never }).analyze();
      expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? '')), `${route} at ${width}px`).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `${route} at ${width}px`).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}

test('keyboard navigation exposes the skip link and main action', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await page.getByRole('link', { name: 'Try it with sample data' }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/?demo=1$/);
  await expect(page.locator('h1')).toBeFocused();
});

test('link navigation away from the demo discards its separate settings', async ({ page }) => {
  await page.goto('/?demo=1');
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

test('each route sets exact page and sharing metadata', async ({ page }) => {
  const routes: Array<[string, string, string, string]> = [
    ['/', 'Loudness Lens — limit sudden tab peaks', 'Limit sudden peaks in the tab you enable. Set a peak limit, then mute it when needed.', 'https://loudness-lens.sociobot.in/'],
    ['/demo', 'Demo — Loudness Lens', 'Try Loudness Lens with a 12-second local lesson sample. Change the peak limit, hear two volume jumps, mute, and reset.', 'https://loudness-lens.sociobot.in/demo'],
    ['/?demo=1', 'Demo — Loudness Lens', 'Try Loudness Lens with a 12-second local lesson sample. Change the peak limit, hear two volume jumps, mute, and reset.', 'https://loudness-lens.sociobot.in/demo'],
    ['/privacy', 'Privacy — Loudness Lens', 'Read what Loudness Lens stores, how tab audio stays on your device, and how demo data is separated and discarded.', 'https://loudness-lens.sociobot.in/privacy'],
    ['/terms', 'Terms — Loudness Lens', 'Read the terms, browser limits, and listening-safety boundaries for the free Loudness Lens Chrome extension.', 'https://loudness-lens.sociobot.in/terms'],
  ];
  for (const [path, title, description, canonical] of routes) {
    await page.goto(path);
    await expect(page).toHaveTitle(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute('content', description);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', canonical);
  }
  await page.goto('/missing');
  await expect(page).toHaveTitle('Page not found — Loudness Lens');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'The requested Loudness Lens page was not found.');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
});

test('How it works navigation focuses, announces, and scrolls to the home content', async ({ page }) => {
  await page.goto('/?demo=1');
  await page.getByLabel('Main navigation').getByRole('link', { name: 'How it works' }).click();
  await expect(page).toHaveURL(/\/#how$/);
  await expect(page.locator('h1')).toBeFocused();
  await expect(page.locator('#announcer')).toHaveText('Limit sudden peaks in the tab you enable');
  await expect.poll(() => page.locator('#how').evaluate((node) => Math.abs(node.getBoundingClientRect().top))).toBeLessThan(2);
});

test('direct demo entry is isolated, resettable, and honest before playback', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('loudness-lens:real', 'keep'));
  await page.goto('/?demo=1');
  await expect(page.getByLabel('Demo mode')).toContainText('Demo — sample data, nothing is saved');
  await expect(page.locator('.meter-note')).toHaveText('The sample is ready. Play it to see the peak.');
  await page.getByLabel('Level trim').fill('4');
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByLabel('Level trim')).toHaveValue('0');
  expect(await page.evaluate(() => localStorage.getItem('loudness-lens:real'))).toBe('keep');
});

test('the live download is paired with complete Chrome installation and pinning steps', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.install h2')).toHaveText('Install the extension in Chrome');
  await expect(page.locator('.install-steps li')).toHaveText([
    'Download the ZIP.', 'Extract the ZIP.', 'Open chrome://extensions.',
    'Turn on Developer mode.', 'Choose Load unpacked and select the extracted folder.',
    'Open the Extensions menu, then pin Loudness Lens to the toolbar.',
  ]);
  const response = await page.request.get('/downloads/loudness-lens-chrome-1.0.0.zip');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).byteLength).toBeGreaterThan(20_000);
});

test('loaded demo controls remain usable when the network goes offline', async ({ page, context }) => {
  await page.goto('/?demo=1');
  await context.setOffline(true);
  await page.getByRole('slider', { name: 'Peak limit' }).fill('-14');
  await expect(page.locator('.ceiling-readout')).toHaveText('−14 dB');
  await page.getByRole('button', { name: 'Mute now' }).click();
  await expect(page.getByRole('button', { name: 'Restore sound' })).toBeVisible();
});

test('dark theme keeps serious accessibility findings at zero', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  const results = await new AxeBuilder({ page: page as never }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);
});

test('readability baseline keeps site instructions at 16 px and reflows at 200% mobile zoom', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expectFontSizeAtLeast(page, ['.hero-actions span', '.plain-facts li', '.meter-note']);
  await page.goto('/demo');
  await expectFontSizeAtLeast(page, ['.demo-banner', '#sample-status', '.demo-help', '.meter-note']);

  // A 195 CSS-pixel viewport is the layout viewport Chrome exposes at 200%
  // browser zoom on the required 390 px mobile check.
  await page.setViewportSize({ width: 195, height: 844 });
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await expect(page.getByRole('button', { name: 'Play sample' })).toBeVisible();
  await expect(page.getByRole('slider', { name: 'Peak limit' })).toBeVisible();
});

test('readability baseline keeps popup guidance at 16 px and reflows at 200% mobile zoom', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4174/popup.html');
  await expectFontSizeAtLeast(page, ['.meter-detail', '.notice', '.switch-row p', '.badge', '.controls > label', '.range-labels', '.privacy']);
  const results = await new AxeBuilder({ page: page as never }).analyze();
  expect(results.violations.filter((item) => ['serious', 'critical'].includes(item.impact ?? ''))).toEqual([]);

  await page.setViewportSize({ width: 195, height: 844 });
  await page.reload();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await expect(page.getByRole('checkbox', { name: 'Guard' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Mute now' })).toBeVisible();
});
