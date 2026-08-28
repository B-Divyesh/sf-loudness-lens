# Loudness Lens review 3 handoff

## Result

**FAIL.** This review changed no product source. It recorded one blocking
copy/claims issue and one major incomplete-installation issue in
`.factory/review-3.md`.

The earlier polish-round evidence below is retained as historical context.

## What changed

- Added the `minimum-chrome-version` claim and a focused production-manifest
  test for the documented Chrome 116 minimum.
- Replaced three botanical mood labels with “Peak-limit preview,” “Three
  steps,” and “Limits and browser constraints.” The product-specific field
  guide artwork, palette, typography, specimen frames, and motion remain.
- Added a browser regression test for all three new labels and the absence of
  the old wording.
- Updated `.factory/catalog-description.txt` to the 55-character, verb-first
  sentence “Keep each Chrome tab at a predictable listening level.”
- Updated the copy audit and recorded every cumulative finding in
  `.factory/polish-2.md`.

## Exact verification

- Repair commit: `6f70d404c7c392b621c9fed74d9c864957713c6a`.
- Fresh clone: `/tmp/loudness-lens-polish-2-clean.n9F7P4/repo` at that exact
  commit. `npm ci` installed 292 packages with 0 vulnerabilities.
- Every command in `.factory/claims.json` ran separately: 17/17 passed.
  Evidence: `.factory/qa-artifacts/polish-2-local/claims-clean.txt`.
- Fresh-clone `npm test`: production build, TypeScript, ESLint, 16/16 Vitest
  tests, and 52/52 Playwright tests passed. Evidence:
  `.factory/qa-artifacts/polish-2-local/npm-test-clean.txt`.
- Work-order build command `npm ci && npm test && npm run build:site` passed.
  `dist/site/` and `dist/extension/` were produced. Evidence:
  `.factory/qa-artifacts/polish-2-local/deploy-build.txt`.
- Built initial site JavaScript is 15.40 KB raw / 5.50 KB gzip; CSS is 11.54
  KB raw / 3.39 KB gzip. The mobile hero image is 21.34 KB. All are below the
  static performance budgets.
- Live route review covered `/`, `/demo`, `/privacy`, `/terms`, and a missing
  route in fresh Chromium contexts at 390 × 844 and 195 × 844. Normal routes
  returned 200; the missing route returned 404. All had one h1, one main,
  `lang=en`, exact metadata, no overflow, no unexpected console errors, and
  zero serious/critical Axe findings. Evidence:
  `.factory/qa-artifacts/polish-2-live/review.json`.
- Live demo `/?demo=1` showed the persistent sandbox banner, used only
  `demo:loudness-lens:v1`, preserved a real-data sentinel, reset to 0 dB trim
  and −6 dB limit, played the sample, and requested only the product origin.
  Evidence: the `demo` object in the live review and
  `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`.
- `/opt/fleet/lib/verify-url.sh` passed with a cold load of 883 ms and no page
  or console errors. Evidence: `.factory/qa-artifacts/polish-2-live/verify.json`.
- Live Lighthouse: performance 100, accessibility 100, best practices 100,
  SEO 100; LCP 0.4 s, CLS 0, total blocking time 0 ms. Evidence:
  `.factory/qa-artifacts/polish-2-live/lighthouse.json`.
- Live ZIP: 50,455 bytes, files at the archive root, Manifest V3,
  `minimum_chrome_version` 116, version 1.0.0.

## Deployment

- Command: `/opt/fleet/lib/deploy-static.sh loudness-lens dist/site`
- Azure Static Web Apps deployment ID:
  `a457ee7e-c3dc-4ad5-8dc1-da0b544a2919`
- Live URL: `https://loudness-lens.sociobot.in`
- Custom domain status: Ready; cold HTTPS root returned 200.

## Run and verify

```sh
npm ci
npm test
npm run build:site
```

The static deployment root is `dist/site/`. Load
`dist/extension/chrome-mv3/` as an unpacked extension for local Chrome testing.

## Review 3 verification

- Fresh live first reads at 390 × 844 and 1440 × 900.
- Direct live demo: one-click entry, realistic 12-second sample playback,
  persistent banner, reset, separate demo storage, real-data sentinel,
  download/exit discard behavior, and same-origin-only requests.
- Fresh Axe checks on live `/`, `/demo`, `/privacy`, `/terms`, and 404: zero
  serious/critical findings.
- Live route/status checks for root, demo, Privacy, Terms, 404, robots,
  sitemap, navigation links, and the downloadable ZIP. The ZIP passed archive
  integrity verification.
- In fresh clone `/tmp/loudness-lens-review-3.E0dekW/repo`: `npm ci`, all 17
  exact commands from `.factory/claims.json`, and `npm test` passed. The full
  suite reported 52 passing Playwright tests.

## Known gaps and next steps

1. Resolve F-3-1: describe and test per-tab peak limiting rather than universal
   steady-volume normalisation.
2. Resolve F-3-2: add Chrome’s Extensions-menu pin instruction or change the
   install heading so it does not promise toolbar placement.
