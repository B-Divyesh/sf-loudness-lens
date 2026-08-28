# Loudness Lens repair handoff

## Result

Repaired the release-blocking findings from independent verification of
candidate `2498293ac6af324b244842013128267a5195eac9`. The artifact remains a
Chrome MV3 extension plus static landing/demo site. The static deploy root is
`dist/site`; the downloadable package is
`dist/site/downloads/loudness-lens-chrome.zip`.

## Repairs

- Demo exit now clears `demo:loudness-lens:v1` before a browser-history exit
  and on page unload. Returning with Forward opens a fresh default demo.
- Added claim entries and tagged browser regressions for isolated demo
  storage, reset, discard on exit, and the shipped 12-second/two-jump sample.
- Made every visible site control at least 44 by 44 CSS px at 390 px, including
  the banner actions, wordmark, footer/email links, and extension sliders.
- Added immutable one-year caching for `/assets/*` and `/downloads/*`, while
  keeping route documents under deployment control.
- Added a styled, noindex `404.html`; known SPA routes are rewritten explicitly
  and unknown routes use a real 404 response override with no self-canonical.
- Upgraded the build/test chain (WXT 0.21.4, Vite 6.4.3, Vitest 3.2.7), added
  ESLint, and resolved all audit advisories.

## Verification

Run from a clean checkout:

```sh
npm ci
npm test
npm audit
```

Evidence from this repair:

- `npm ci`: installed 293 packages; audit reported zero vulnerabilities.
- `npm test`: production extension/site build, TypeScript, ESLint, 13 Vitest
  tests, and 34 Playwright checks across desktop Chromium and 390 × 844 mobile
  passed.
- Every command listed in `.factory/claims.json` was run separately; all 15
  claim commands passed. Each claim has exactly one `@claim:<id>` test.
- The packaged ZIP passed `unzip -t` with no errors. `npm run build` produces
  both `dist/extension` and `dist/site`.
- `/opt/fleet/lib/verify-url.sh` against a local production preview passed:
  title, `lang=en`, one main/h1, image alt checks, and zero console/page errors
  (578 ms network-idle load). Playwright Axe checks remain part of the browser
  suite for every route, desktop/mobile, dark, and reduced-motion modes.
- The mobile keyboard smoke check reached the skip link first. The 390 px
  regression measures every visible link, button, and input at 44 px or more.
- Lighthouse 13 mobile on the local production build: Performance 100,
  Accessibility 100, Best Practices 100, SEO 100; LCP 1.748 s, TBT 43 ms,
  CLS 0. (The report was emitted successfully before Chromium's shutdown
  warning.)
- The product is not a PWA and makes no offline claim. Its shipped extension
  and demo assets are local; cache/update policy is covered by the static
  deployment config regression test. Runtime demo traffic is asserted
  same-origin only.

## Deployment and known gaps

Deployed `dist/site/` through the factory static deployment configuration to
`https://loudness-lens.sociobot.in` (Azure Static Web Apps deployment id
`eff83fef-d07e-4f39-aa0d-76f1a5c6395b`). Live verification confirms the
deployed bundle contains the `pagehide` demo cleanup, fingerprinted assets send
`Cache-Control: public, max-age=31536000, immutable`, `/demo` returns 200,
and an unknown path returns HTTP 404 with **Page not found — Loudness Lens**.
The live host also sends CSP, HSTS, nosniff, referrer, and permissions-policy
headers.

There is no application backend, payment flow, sign-in, AI feature, or
third-party runtime dependency to configure. No known gaps remain from the
verifier report.
