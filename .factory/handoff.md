# Loudness Lens polish round 1 handoff

## Result

**PASS.** Findings F-1-1 through F-1-17 from `.factory/review-1.md` are
implemented, tested, deployed, and rechecked cold on
`https://loudness-lens.sociobot.in`. No earlier review or polish report exists
in repository history, and no finding is deferred.

The product remains a WXT + TypeScript Manifest V3 browser extension with a
Vite static site. Its botanical field-guide visual system and original art are
unchanged.

## What changed

- Added the direct isolated `/?demo=1` route with persistent demo banner,
  reset, separate storage, download-and-exit behavior, and honest paused state.
- Made the landing specimen a functional, clearly labelled example. Peak
  limit, marker, readout, mute, restore, and text state now move together.
- Rewrote the first screen and every flagged README phrase in plain words.
- Added five complete installation steps and verified the live ZIP has a root
  Manifest V3 package.
- Fixed 195 px accessibility and overflow on every route. The compact
  wordmark keeps its accessible name, long legal text wraps, and mobile keeps
  all four navigation actions.
- Added route-specific title, description, Open Graph, Twitter, canonical,
  focus, announcement, history, and designed 404 behavior.
- Added the visible external-site label and retained Privacy and Terms links
  on every page.
- Added `peak-limit-marker` to `.factory/claims.json`; the suite now enforces
  unique claim IDs and exactly one tagged test for each claim.
- Updated `.factory/catalog-description.txt`, `.factory/demo.md`,
  `.factory/copy-audit.md`, and the complete mapping in
  `.factory/polish-1.md`.

## Exact verification

- Repair code commit: `3f14fbd` (`fix: resolve cumulative review findings`),
  pushed to `origin/main` before deployment.
- Production deployment ID:
  `e64b16ea-4293-4ba7-aca1-b26d82f14e87`; deployed to the existing Central US
  Static Web App and confirmed HTTPS 200 on the custom domain.
- `npm test`: PASS. Build, TypeScript, ESLint, 15 Vitest tests, and 50
  Playwright tests across desktop Chromium and 390 px mobile all passed.
- Clean clone `/tmp/tmp.4dEHB8ODYh/clone`: `npm ci` passed, then all 16 exact
  commands from `.factory/claims.json` passed independently.
- Browser coverage includes same-origin privacy requests, real/demo storage
  separation, reset/discard, sample playback and timing, live preview state,
  installation copy, ZIP download, offline post-load controls, keyboard,
  focus/announcement/history, touch targets, dark/reduced-motion mode, exact
  metadata, popup reflow, and site reflow.
- Axe integration: zero serious or critical findings for `/`, `/demo`,
  `/privacy`, `/terms`, and `/missing` at both 390 and 195 CSS px.
- Live cold route audit: PASS in
  `.factory/qa-artifacts/polish-1-live/review.json`. All real routes returned
  200; the designed missing route returned 404; no route overflowed. The only
  console network diagnostic on the missing page is its intentional document
  404.
- Live `/opt/fleet/lib/verify-url.sh`: PASS, 962 ms cold load, correct title,
  `lang=en`, one h1/main, complete alt text, labelled buttons, and no root page
  errors. See `.factory/qa-artifacts/polish-1-live/verify.json`.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices
  100, SEO 100; LCP 1.2 s, CLS 0, total blocking time 10 ms. See
  `.factory/qa-artifacts/polish-1-live/lighthouse.json`.
- Production site payload: 15,397-byte main JS and 11,541-byte CSS. The mobile
  hero WebP is 21,338 bytes. All are below the product budgets.
- Live link crawl: every product link returned 200–399, the ZIP returned 200
  at 50,455 bytes, and the Param Factory external link returned 200.
- Live security headers include the self-only CSP, `nosniff`, strict-origin
  referrer policy, and disabled camera, microphone, and geolocation.
- Live screenshots:
  `.factory/qa-artifacts/polish-1-live/home-desktop-cold.png`,
  `.factory/qa-artifacts/polish-1-live/home-mobile-cold.png`,
  `.factory/qa-artifacts/polish-1-live/demo-mobile-cold.png`, and
  `.factory/qa-artifacts/polish-1-live/privacy-195-cold.png`.

## Run and deploy

```sh
npm ci
npm test
npm run build
/opt/fleet/lib/deploy-static.sh loudness-lens dist/site
```

`npm run build` produces `dist/extension/chrome-mv3`, the extension ZIP, and
`dist/site` with its versioned public download.

## Known gaps and next steps

None for the reviewed scope. No TODOs, stubs, deferred minor findings, paid
services, analytics, or AI runtime were added.
