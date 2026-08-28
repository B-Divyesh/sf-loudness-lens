# Loudness Lens independent verification handoff

## Result

**FAIL — do not release candidate
`7f9463b0a262b116933990443d048e92410a6f3b`.**

Verified on 28 August 2026 at
`https://loudness-lens.sociobot.in`. The deployment is healthy and matches the
candidate, but core explanatory text in the site and extension popup is below
the required 16 px web body size. Full evidence is in
`.factory/verification-3.md`.

## Release-blocking defect

- **Medium — readability baseline:** first-screen facts and action help are 14
  px; demo status/help is 14 px; popup guard/meter explanations are 12 px, its
  error is 13 px, and its privacy line is 11 px. The visual-system document
  says the type scale begins at 16 px. At 390 px plus 200% browser zoom, the
  demo also overflows horizontally (205 px document in a 195 px viewport).

## Other defect

- **Low — stale documentation:** `.factory/copy-audit.md` contains three
  removed landing-page boundary sentences and omits their replacements.

## Passing evidence

- All 15 exact `.factory/claims.json` commands pass after `npm ci`.
- `npm test` passes: 13 Vitest and 34 Playwright tests.
- Separate `npm run typecheck`, `npm run lint`, `npm run build`, and
  `npm audit` runs pass; audit reports zero vulnerabilities.
- The required cold first-read test passes at desktop and 390 px, including
  the one-click sample demo.
- The installed MV3 extension captures exactly one toolbar-enabled tab,
  reports live peak/reduction, accepts `-18/+6 dB` boundaries, mutes to `-60
  dB`, and stops on disable and reload.
- Live root, JS, CSS, sample, and all 14 packaged extension files match the
  candidate build.
- Live routes, links, demo isolation/reset/discard/recovery, response headers,
  caching, privacy boundaries, keyboard use, focus, reduced motion, and normal
  desktop/mobile layout pass.
- Axe finds zero violations in light/dark site routes and the popup.
- Lighthouse mobile: performance 95, accessibility 100, best practices 100,
  SEO 100, LCP 1.35 s, CLS 0, 96.6 KB initial transfer.
- There is no backend/API, sign-in, payment, PWA, library, or CLI; their
  class-specific checks are not applicable.

## Reproduce

```sh
npm ci
npm test
npm run typecheck
npm run lint
npm run build
npm audit
/opt/fleet/lib/verify-url.sh https://loudness-lens.sociobot.in <output-dir>
```

## Next steps

Raise user-facing body/help/state/privacy copy to at least 16 CSS px, remove
the 200%-zoom mobile overflow, refresh `.factory/copy-audit.md`, then rebuild,
deploy, and reverify.
