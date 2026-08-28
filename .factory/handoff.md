# Loudness Lens v1 handoff

## What shipped

- A WXT/TypeScript Chrome MV3 extension with explicit per-tab consent.
- A 10 ms look-ahead limiter, −18 to −1 dB peak limit, −12 to +6 dB
  level trim, live peak/reduction feedback, and immediate mute.
- Per-tab lifecycle handling for start, stop, reload, closed tabs, unsupported
  pages, and extension service-worker restarts.
- A responsive botanical field-guide site with `/`, `/demo`, `/privacy`,
  `/terms`, and a designed 404 state.
- A one-click sandbox with a shipped 12-second audio sample, isolated
  `demo:loudness-lens:v1` storage, reset, and discard-on-exit behavior.
- A packaged extension at
  `dist/site/downloads/loudness-lens-chrome.zip` after building.
- Original generated botanical art, responsive WebP exports, product icons,
  a 1200 × 630 social image, and documented provenance.

## How to run and verify

```sh
npm install
npm test
npm run build
npm run dev:site
```

`npm test` completed on 28 August 2026 with 11 unit tests and 26 Playwright
checks passing. The browser checks cover desktop Chromium, a 390 px mobile
viewport, all routes, dark mode, keyboard focus, Axe, console errors, demo
storage, local-only requests, the downloadable package, and observed limiter
gain reduction. TypeScript also passes with no errors.

The production extension was loaded as an unpacked MV3 extension in Chromium.
Its service worker and popup started with no console or page errors. The popup
reported `Guard off` for an uncaptured tab.

The factory URL verifier reported HTTP 200, one h1, one main landmark, English
language metadata, complete image alt text, labeled buttons, and no console
errors at desktop and mobile sizes.

Lighthouse mobile results from the production build:

| Category or metric | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | 1.66 s |
| Total Blocking Time | 5 ms |
| Cumulative Layout Shift | 0 |

Budget results: site JavaScript is 5.07 KB gzip, CSS is 3.08 KB gzip, the
mobile hero is 21.3 KB, the unpacked production extension is 69.3 KB, and the
extension zip is 53.1 KB.

## Known limits

- Chrome blocks tab capture on internal pages and some protected media. The
  popup explains this and leaves the guard off.
- This build is an unsigned zip for unpacked installation. Store signing and
  publication remain factory deployment tasks.
- Listening safety still depends on system volume, headphones, and hardware.
  The terms page states that the extension is not a medical safety guarantee.

## Next steps

- Run the planned 30-person, two-week beta and measure prevented volume-jump
  incidents against the 70% success target.
- Use beta reports to tune the default −6 dB ceiling and limiter release.
- Publish the exact built package through the Chrome Web Store when the factory
  is ready; no infrastructure or billing work is needed.
