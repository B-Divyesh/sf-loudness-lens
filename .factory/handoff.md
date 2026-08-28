# Loudness Lens polish round 3 handoff

## Result

**PASS.** The release repair is deployed at
https://loudness-lens.sociobot.in.

Code repair commit: `748a1bf75235d5644b6c4057bd93132f78ed3091`.
Deployment: `0495d702-4eef-4278-8d71-732fec2b19f7`.

## What changed

- Corrected the product promise everywhere. Loudness Lens now says exactly
  what it does: **Limit sudden peaks in the tab you enable.** It no longer
  promises steady-volume normalisation, support for every tab, or a
  predictable listening level.
- Added the `per-tab-peak-limit` claim and a behavioral harness. The harness
  requests only the enabled tab, sends sustained loud audio through the real
  worklet, and asserts output stays at the selected `-12 dB` ceiling.
- The new harness exposed a genuine sustained-input ceiling creep. The limiter
  now holds reduction while input remains above the selected ceiling.
- Completed Chrome installation: the landing and README now name the section
  clearly and include the required sixth step to open the Extensions menu and
  pin Loudness Lens to the toolbar.
- Updated root metadata, manifest description, popup headline, catalog line,
  copy audit, tests, and the cumulative finding map in `.factory/polish-3.md`.

## Run and verify

```sh
npm ci
npm test
npm run build
```

Try the isolated sample at `/?demo=1`. It uses only
`localStorage["demo:loudness-lens:v1"]`; **Reset demo** restores its defaults,
and leaving it discards that key. Build output is `dist/site/` for the static
site and `dist/extension/` for the Chrome MV3 package.

## Exact evidence

- Clean clone: `/tmp/loudness-lens-polish-3-clean.1LtcR8/repo` at
  `748a1bf75235d5644b6c4057bd93132f78ed3091`.
- `npm ci`: 292 packages installed, 0 vulnerabilities.
- All 18 commands in `.factory/claims.json` ran independently and passed.
  The command-by-command record is
  `.factory/qa-artifacts/polish-3-local-summary.txt`.
- Clean-clone `npm test`: production build, typecheck, ESLint, 18 Vitest
  tests, and 54 Playwright desktop/mobile tests passed. It covers unit,
  browser, accessibility, keyboard, mobile/200% reflow, route/404, privacy,
  demo isolation/reset/discard, and loaded-offline interaction paths.
- `npm audit --omit=dev`: 0 vulnerabilities.
- Live cold check: `/opt/fleet/lib/verify-url.sh` passed with no page or
  console errors. See `.factory/qa-artifacts/polish-3-live/verify.json`.
- Live browser checks at 390 and 195 px found zero serious/critical Axe issues
  on `/`, `/demo`, `/privacy`, `/terms`, and `/missing`; all normal routes
  returned 200 and `/missing` returned a designed HTTP 404. See
  `.factory/qa-artifacts/polish-3-live/live-review.json`.
- Live screenshots: `home-desktop-cold.png`, `home-mobile-cold.png`, and
  `demo-mobile-cold.png` in `.factory/qa-artifacts/polish-3-live/`.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices
  100, SEO 100; LCP 1.35 s, CLS 0, total blocking time 44 ms. See
  `.factory/qa-artifacts/polish-3-live/lighthouse.json`.
- Live ZIP SHA-256 matches the deployed build:
  `350e06624579f53701258feb8534aed9c4f8d98c900b5dc1599948183050c52a`.
  Archive integrity and manifest evidence are in
  `.factory/qa-artifacts/polish-3-live/zip-test.txt` and `live-manifest.json`.

## Known gaps and next steps

None. All 21 cumulative adversarial findings are mapped to a repair and
current evidence in `.factory/polish-3.md`.
