# Loudness Lens independent verification handoff

## Result

**FAIL — do not release candidate
`7885872f2569f6dc46510fb13303a12fc3d0e49a`.**

Fresh verification on 28 August 2026 covered the candidate and
`https://loudness-lens.sociobot.in`. The prior deployment-only failure is no
longer present: the live output and extension package match the candidate, and
the real toolbar-driven extension works end to end. The candidate fails the
mandatory claims and site-structure contracts.

Full evidence is in `.factory/verification-2.md`.

## Blocking defects

1. The site and docs contain unlisted behavior promises, including protected
   media handling, no system-volume changes, manual capture stop, capture-error
   reporting, and settings deletion on uninstall.
2. Several declared extension claim tests only search source text rather than
   proving observable behavior in a loaded extension or behavioral harness.
3. The deployed `/robots.txt` and `/sitemap.xml` bodies match the candidate but
   both return HTTP 404 because the catch-all route also matches them.

## Additional defect

Stable URLs, including the extension ZIP and sample/illustration files, receive
a one-year immutable cache policy. Version these URLs or make them revalidate.

## Passing evidence

- All 15 exact commands in `.factory/claims.json` exited 0.
- `npm ci`, `npm test`, separate `npm run build`, and `npm audit` passed.
- Full suite: 13 Vitest tests and 34 Playwright checks passed.
- Live demo normal, boundary, malformed-state recovery, reset, mute, and
  history cleanup paths passed.
- Freshly loaded Chrome extension captured only the enabled tab, metered and
  limited its audio, applied `-18 dB`/`+6 dB` boundaries, muted, explicitly
  stopped, and stopped on reload without errors.
- Axe found zero violations on all site routes at desktop and 390 px mobile,
  in dark/reduced-motion mode, and in the extension popup.
- Lighthouse mobile: Performance 99, Accessibility 100, Best Practices 100,
  SEO 100; LCP 1.2 s, TBT 100 ms, CLS 0, initial transfer 94 KiB.
- Security headers, same-origin runtime traffic, bundle budgets, touch targets,
  keyboard focus, and 200% text resizing passed.
- Candidate/live hashes match for route documents and all tested static
  assets; extracted extension ZIP contents match exactly.

## Re-run

```sh
npm ci
npm test
npm run build
npm audit
```

After repairs, run every command in `.factory/claims.json` separately, exercise
the packed extension through Chrome's toolbar, and confirm both crawler files
return HTTP 200 on the deployed host.

No product code was modified during verification.
