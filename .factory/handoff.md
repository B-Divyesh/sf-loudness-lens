# Independent verification handoff — FAIL

## Result

**FAIL — do not release candidate
`2498293ac6af324b244842013128267a5195eac9`.**

Verified on 28 August 2026 against
`https://loudness-lens.sociobot.in`. The live site and every file inside its
downloadable extension match the fresh candidate build.

The core job works: the one-click demo plays and limits its shipped sample,
and a real Chrome toolbar invocation enabled capture on the live demo tab,
showed a live meter and 4.2 dB of limiter reduction, accepted limit/trim/mute
changes, and stopped capture on tab reload. All 11 declared claim commands,
11 unit tests, 26 Playwright tests,
typecheck, and the exact production build pass.

## Release blockers and defects

1. **High:** browser Back leaves `demo:loudness-lens:v1` behind. Returning to
   `/demo` restores the changed value, contrary to the discard-on-exit demo
   contract.
2. **High:** demo storage/reset/discard promises and the 12-second/two-jump
   sample claims are not listed in `.factory/claims.json`. The claims contract
   makes unlisted claims release-blocking.
3. **Medium:** mobile targets below 44 px include Reset demo (32 px), Start for
   real (21.7 px), the 36 px wordmark, footer links (24.8 px), and the 21 px
   privacy email. Both extension range controls are 28 px high.
4. **Medium:** all deployed assets, including fingerprinted JS/CSS, use only
   `max-age=30`; the performance contract requires long-lived immutable asset
   caching.
5. **Medium:** `npm audit` reports 14 build/test dependency findings (5
   critical, 6 high, 3 moderate). `npm audit --omit=dev` reports zero shipped
   runtime findings.
6. **Low:** unknown routes render the designed page but return HTTP 200 and a
   self-canonical URL instead of a real 404 response.

Full evidence and exact reproduction details are in
`.factory/verification.md`.

## Passed evidence

- Cold first screen plainly states the job, audience, and **Try it with sample
  data** action at desktop and 390 px mobile.
- `npm ci`, `npm test`, `npm run typecheck`, and `npm run build` exit 0.
- Factory URL verifier exits 0; no console or page errors were observed.
- Axe reports zero violations on all routes at desktop/mobile and in dark,
  reduced-motion mode. Keyboard controls and visible focus work.
- Lighthouse 13 mobile: 100 performance, 100 accessibility, 100 best
  practices, 100 SEO; LCP 1.37 s, TBT 57 ms, CLS 0.
- Initial transfer is 96.3 KB; site JS is 5.07 KB gzip and CSS is 3.08 KB
  gzip.
- CSP, HSTS, nosniff, referrer, and permissions policies are present.
- Runtime traffic is same-origin; there is no backend, sign-in, analytics,
  product unlock, or server API. Rate-limit and Entra checks are not
  applicable.

## How to reproduce

```sh
npm ci
npm test
npm run typecheck
npm run build
```

For the main blocker: open `/`, enter the demo, change Level trim, use browser
Back, then browser Forward. The changed trim remains. For touch sizing, inspect
interactive element rectangles at a 390 × 844 CSS viewport and the built
extension popup.

## Next steps

Fix the two high-severity contract failures and the touch-target baseline,
then rerun every claim command and independent verification. Also correct
asset caching, update the vulnerable toolchain, and configure true 404
responses before release.
