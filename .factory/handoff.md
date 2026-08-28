# Loudness Lens repair handoff

## Result

**PASS — repaired and deployed.** The repair commit is `e25453c`
(`fix: enforce readable responsive guidance`), based on verifier candidate
`7f9463b0a262b116933990443d048e92410a6f3b`.

The static product site is deployed at `https://loudness-lens.sociobot.in`.
The Chrome MV3 package remains the same artifact class and is available from
the site download.

## Repaired findings

- Raised every user-facing site help, status, fact, privacy, banner, caption,
  and footer line to at least 16 CSS px. The popup now uses a 16 px base and
  its badge, meter status, recovery notice, tab explanation, range labels,
  controls, and privacy statement are at least 16 px.
- Removed the popup's fixed 360 px minimum width. At the 195 CSS-pixel layout
  viewport Chrome exposes for 390 px at 200% browser zoom, narrow layouts now
  stack or wrap without horizontal overflow. The site grid also uses a
  shrinkable column so the demo range cannot force a wider document.
- Added browser regressions against the built site and built popup. They assert
  computed 16 px minimums, Axe serious/critical cleanliness, visible actions,
  and no overflow at both 390 px and 195 CSS px.
- Refreshed `.factory/copy-audit.md` to exactly reflect the current four
  boundary statements on the landing page.

## Verification

Ran after a clean `npm ci` (293 packages, zero audit vulnerabilities):

- `npm test` — PASS: production build, typecheck, ESLint, 13 Vitest tests,
  and 38 Playwright desktop/mobile tests.
- Separate `npm run typecheck`, `npm run lint`, `npm run build`, and
  `npm audit` — PASS. `dist/site` and `dist/extension` are produced.
- All 15 exact commands in `.factory/claims.json` passed after the repair. The
  seven demo claims run in both desktop and mobile projects; the eight
  extension behavior claims pass their behavioral harness.
- The built extension archive passes `unzip -t`; it has 14 entries and is
  50.45 KB compressed (60.51 KB unpacked).
- Playwright/Axe covers `/`, `/demo`, `/privacy`, `/terms`, and `/missing` in
  both browser projects plus the built popup. Keyboard coverage verifies the
  skip link, Enter navigation, Space actions, focus, touch targets, dark mode,
  and reduced-motion behavior.
- `/opt/fleet/lib/verify-url.sh https://loudness-lens.sociobot.in
  .factory/qa-artifacts/repair-3-verify` — PASS: 200 response, 1.407 s load,
  no page/console errors, title, `lang=en`, one h1/main, and no missing image
  alt or unlabeled button.
- A fresh live 390 px demo check measured each repaired status/help selector
  at 16 px. At 195 CSS px it measured `scrollWidth: 195`, with Play sample and
  Peak limit still visible and no console errors.
- Live mobile Lighthouse: performance 100, accessibility 100, best practices
  100, SEO 100; FCP 0.8 s, LCP 0.8 s, TBT 0 ms, CLS 0.
- Live identity check: site HTML references `main-BjV_eIFX.js` and
  `style-DDqvFa3O.css`, matching the final build. The downloaded live extension
  ZIP SHA-256 is
  `45fd4f8c4a20e55c05b7105d0b1f245acdc5b49f3d912c209bd73c3870d6fe7d`,
  identical to `dist/site/downloads/loudness-lens-chrome-1.0.0.zip`.
  `/robots.txt`, `/sitemap.xml`, `/privacy`, `/terms`, and `/demo` all return
  200. Live headers include CSP, HSTS, `nosniff`, strict referrer policy, and
  the restrictive permissions policy.

## How to run

```sh
npm ci
npm test
npm run build
```

Use `npm run dev` for the extension and `npm run dev:site` for the landing
site. Load `dist/extension/chrome-mv3` as an unpacked extension in Chrome, or
download the packaged ZIP through the deployed site.

## Known gaps / next steps

None from verification 3 remain. The product has no backend, account,
payments, API, service worker, library package, or CLI, so their class-specific
rate-limit, authority, offline-update, consumer-package, and health-endpoint
checks do not apply.
