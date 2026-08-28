# Loudness Lens polish 4 handoff

## Result

**PASS — all 24 cumulative adversarial-review findings are closed.** Product
repair commit `774d2e7f5ea9e722d813e3cfac5ed685f5b86a39` is pushed to `main`.
Deployment `ead0b159-b9bc-4885-9c60-47f4c7bc292d` is live at
`https://loudness-lens.sociobot.in`.

## What changed

- The preview h2 now names its job: **Preview the selected peak limit**.
- The meter label is **Active tab**; the decorative specimen number is gone.
- Both the client-routed and static 404 use **Page not found** and no themed
  error kicker.
- Browser and source regressions reject all three retired phrases.
- `.factory/copy-audit.md` now reflects the released copy and 404.
- `.factory/catalog-description.txt` is a 41-character verb-first sentence.
- All earlier demo, claims, routing, metadata, legal, mobile, accessibility,
  privacy, extension, and installation repairs were rechecked without regressions.

The product remains a WXT Manifest V3 Chrome extension plus a Vite static site.
The botanical field-guide visual system and original art are unchanged.

## Verification

- Clean clone: `/tmp/loudness-lens-polish-4-clean.73rwT6/repo` at
  `774d2e7f5ea9e722d813e3cfac5ed685f5b86a39`.
- Every one of the 18 exact `.factory/claims.json` commands passed independently.
- `npm test` passed: build, typecheck, lint, 19 Vitest tests, and 56 Playwright
  tests across desktop and 390 px mobile.
- Browser checks cover demo isolation/reset/discard, same-origin privacy,
  offline interaction after load, keyboard operation, focus/history, metadata,
  legal routes, 404, 44 px targets, dark/reduced-motion modes, Axe, and 195 px
  reflow for the site and extension popup.
- The exact work-order build command passed before deployment:
  `npm ci && npm test && npm run build:site`.
- `/opt/fleet/lib/verify-url.sh` passed on the cold live root with zero console
  or page errors.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices
  100, SEO 100; FCP 0.8 s, LCP 1.4 s, TBT 20 ms, CLS 0, 95 KiB transfer.
- Cold live `/`, `/demo`, `/privacy`, `/terms`, and `/missing` have correct
  titles, descriptions, canonical/noindex behavior, one h1/main, no overflow,
  and zero serious/critical Axe findings at 390 and 195 CSS px.
- The live demo starts in one click at `/?demo=1`, plays the shipped sample,
  writes only `demo:loudness-lens:v1`, preserves a real-data sentinel, resets
  all settings, and removes its key on exit. Its request log has no foreign
  origin.
- Live root and packaged ZIP hashes match `dist/site`; the ZIP passes archive
  integrity checks and all crawled product/legal/download links resolve as
  expected.

Evidence is in `.factory/qa-artifacts/polish-4-local/` and
`.factory/qa-artifacts/polish-4-live/`. The per-finding map is
`.factory/polish-4.md`.

## Run and verify

```sh
npm ci
npm test
npm run build:site
```

Deploy `dist/site/` as the static root. Load `dist/extension/chrome-mv3/` from
`chrome://extensions` for an unpacked extension check.

## Known gaps and next steps

None. No finding, severity, claim, or required acceptance check remains open.
