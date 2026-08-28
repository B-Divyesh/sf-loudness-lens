# Independent product verification 3 — FAIL

Verified on 28 August 2026 for work order `loudness-lens-verify-3`.

- Candidate: `7f9463b0a262b116933990443d048e92410a6f3b`
- Live URL: `https://loudness-lens.sociobot.in`
- Artifact: Chrome MV3 extension plus static product/demo site
- Verdict: **FAIL — do not release this candidate**

The earlier deployment problems are fixed. The live site is available, its
files match this candidate, all 15 declared claim tests pass, and the packaged
extension completes the real tab-capture job. The candidate still misses the
non-negotiable readability baseline: important explanatory text is rendered
below 16 CSS px, including text in the core extension popup. The mandatory copy
audit is also stale.

## Release-blocking finding

### Medium — core explanatory text is smaller than the required body size

The attached accessibility/design contract requires body text of at least 16
px on the web. Computed-style checks on the deployed product found:

- the first-screen action explanation and all three privacy/account/price
  facts are 14 px;
- the demo banner, playback status, meter status, and usage tip are 14 px;
- the installed extension popup renders its meter status and tab-guard
  explanation at 12 px, its recovery notice at 13 px, and its privacy
  statement at 11 px.

These are instructions, state, and privacy information rather than decorative
captions. The popup is the product's primary working surface. The implementation
also conflicts with `.factory/design.md`, which records a type scale beginning
at 16 px.

At a 390 px viewport with browser zoom set to 200%, the demo reported a 195 px
layout viewport and a 205 px document width; a range control extended to 203.7
px. The page therefore requires horizontal panning in this required combined
mobile/text-resize check.

Axe reports no violations because minimum readable font size is not an Axe
rule. This remains an explicit acceptance-contract failure.

Required remediation: raise user-facing body, help, state, recovery, and
privacy text to at least 16 CSS px, then verify the site and popup at 390 px and
200% browser zoom without horizontal overflow or clipped actions.

## Other finding

### Low — the mandatory landing copy audit is stale

`.factory/copy-audit.md` still lists three sentences removed from the landing
page: “It does not record sound,” “It cannot process protected media that
Chrome blocks,” and “It does not change your system volume.” It omits their
current replacements: “It starts only when you turn it on for a tab,” “Some
tabs cannot provide audio to Chrome extensions,” and “It cannot guarantee a
safe listening level.” The live sentences are themselves short and use no
banned terms, but the required extraction is not an accurate record of the
candidate.

## Mandatory claims gate

`.factory/claims.json` exists. Every declared ID occurs exactly once as a test
tag. Each exact command was run independently after `npm ci`; all exited 0.
The initial pre-install invocation in the dependency-free clone stopped at
`wxt: not found` before any assertion ran; the valid installed rerun below is
the claim result.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-only` | `npm run test:e2e -- --grep @claim:local-only` | PASS — desktop + mobile |
| `sample-limiter` | `npm run test:e2e -- --grep @claim:sample-limiter` | PASS — desktop + mobile |
| `sample-timing` | `npm run test:e2e -- --grep @claim:sample-timing` | PASS — desktop + mobile |
| `demo-isolation` | `npm run test:e2e -- --grep @claim:demo-isolation` | PASS — desktop + mobile |
| `demo-reset` | `npm run test:e2e -- --grep @claim:demo-reset` | PASS — desktop + mobile |
| `demo-discard` | `npm run test:e2e -- --grep @claim:demo-discard` | PASS — desktop + mobile |
| `free-download` | `npm run test:e2e -- --grep @claim:free-download` | PASS — desktop + mobile |
| `tab-consent` | `npm run test:unit -- --testNamePattern @claim:tab-consent` | PASS — 1 behavioral test |
| `panic-mute` | `npm run test:unit -- --testNamePattern @claim:panic-mute` | PASS — 1 behavioral test |
| `look-ahead-limiter` | `npm run test:unit -- --testNamePattern @claim:look-ahead-limiter` | PASS — 1 worklet test |
| `live-meter` | `npm run test:unit -- --testNamePattern @claim:live-meter` | PASS — 1 behavioral test |
| `level-trim` | `npm run test:unit -- --testNamePattern @claim:level-trim` | PASS — 1 behavioral test |
| `capture-lifecycle` | `npm run test:unit -- --testNamePattern @claim:capture-lifecycle` | PASS — 1 behavioral test |
| `local-settings` | `npm run test:unit -- --testNamePattern @claim:local-settings` | PASS — 1 behavioral test |
| `capture-error` | `npm run test:unit -- --testNamePattern @claim:capture-error` | PASS — 1 behavioral test |

## Cold first-read gate

**PASS** on fresh live loads at 1440 × 900 and 390 × 844.

- What it does: “Keep every tab at a steady volume.”
- For whom: people switching among videos, lessons, and music who want fewer
  sudden volume jumps.
- First click: **Try it with sample data**.
- The adjacent line explains that the click plays a local sample through the
  limiter; the three privacy/account/price facts are visible.
- One click opens `/demo` with the sample ready, the persistent demo banner,
  **Reset demo**, and **Start for real**.

The cold root returned 200, made only same-origin requests, and logged no
console or page errors.

## Clean install, tests, and production build

| Gate | Result |
| --- | --- |
| Initial checkout | Clean; HEAD exactly `7f9463b0a262b116933990443d048e92410a6f3b` |
| `npm ci` | PASS; 293 packages audited, zero vulnerabilities |
| `npm test` | PASS; build, typecheck, ESLint, 13 Vitest tests, 34 Playwright tests |
| `npm run typecheck` | PASS in a separate run |
| `npm run lint` | PASS in a separate run |
| `npm run build` | PASS in a separate run; `dist/site` and `dist/extension` produced |
| `npm audit` | PASS; zero vulnerabilities |
| Extension ZIP | PASS; 14 entries, 60.31 KB unpacked / 50.41 KB ZIP |

The landing page loads 12.65 KB raw / 4.81 KB gzip JavaScript and 10.23 KB
raw / 3.11 KB gzip CSS. The responsive hero files are 21.34 KB and 86.26 KB.
There are no font downloads or third-party runtime libraries.

## End-to-end functional evidence

### Live demo

Fresh 390 px and desktop contexts covered normal, boundary, invalid-state, and
recovery paths:

- malformed demo storage recovered to trim `0`, limit `-6`, and unmuted;
- sample playback advanced to 0.63 seconds and reported “Playing through the
  local limiter”; Space paused it and restored **Play sample**;
- trim accepted `-12` and `+6 dB`; peak limit accepted `-18` and `-1 dB`;
- panic mute changed to **Restore sound**;
- only `localStorage["demo:loudness-lens:v1"]` was written;
- Reset restored all defaults; browser Back removed the demo key and Forward
  reopened trim at `0`; and
- the complete flow made no cross-origin request.

### Installed extension

The unpacked candidate from `dist/extension/chrome-mv3` was loaded into the
supplied Chromium 145. A real toolbar action granted `activeTab`; a local
PulseAudio null sink allowed the live sample tab to be captured.

- exactly one tab entered Chrome capture status `active`;
- the initial captured peak was `-17.34 dB`;
- at the boundary settings `-18 dB` peak limit and `+6 dB` trim, the captured
  output measured `-17.97 dB` and reported 6.31 dB limiter reduction;
- panic mute stored `muted: true` and the measured output fell to `-60 dB`;
- explicit disable changed Chrome capture status to `stopped`; and
- re-enabling then reloading the guarded tab also changed capture to `stopped`
  and state to Guard off.

A separate no-audio-sink run produced the visible recovery message, “The guard
could not start. Reload the tab, then try again.” No page, popup, or service
worker error was observed during the successful flow. The manifest requests
only `activeTab`, `storage`, `tabCapture`, and `offscreen`, with no host
permissions.

## Accessibility and responsive checks

- Axe 4.10.2 found zero violations of any impact on `/`, `/demo`, `/privacy`,
  and `/terms` in light and dark modes. It also found zero violations in the
  extension popup.
- Desktop and 390 px route sweeps found one h1, one main, `lang=en`, no missing
  image alt text, no undersized interactive targets, and no horizontal
  overflow at normal zoom. The designed 404 has the same results and returns
  HTTP 404; its expected failed-document console message is not a product
  script error.
- Keyboard navigation begins on the 44.8 px-high skip link with a 3 px,
  3.65:1 focus outline. Enter opens the demo and focuses its h1. Space operates
  playback and mute. The popup switch and ranges are keyboard-focusable.
- All popup controls are at least 44 px high. Reduced motion yields
  `scroll-behavior: auto` and zero-second transitions.
- `/opt/fleet/lib/verify-url.sh` passed the live root in 656 ms with zero
  errors, one h1/main, title, language, alt, and button-label checks.
- The font-size and 200% mobile resize failures are documented above.

## Deployment identity, privacy, and response policy

Fresh SHA-256 values match between the candidate build and the live root HTML,
hashed JavaScript, hashed CSS, and sample WAV. Extracted comparisons found all
14 live ZIP members byte-identical to the candidate package.

All product links return 200. `/robots.txt` and `/sitemap.xml` return 200 with
five-minute revalidation; versioned JS, CSS, SVG, WAV, and ZIP resources use
one-year immutable caching. Unknown paths return a designed HTTP 404.

Live documents send CSP, HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
Permissions Policy. Runtime inspection found no analytics, recording API,
external font/script, product-unlock call, or other outbound service.

The product has no backend or server-side API endpoint, account, payment, or
sign-in, so API rate limiting and Entra authority checks are not applicable. It
is not a PWA, library, CLI, or backend; service-worker update/offline, consumer
package, concurrency, persistence-boundary, and health/build-endpoint checks
are therefore not applicable. No service worker is registered on the site.

## Performance

Fresh Lighthouse 13.0.1 mobile results for the live root:

| Measure | Result |
| --- | ---: |
| Performance | 95 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 0.77 s |
| LCP | 1.35 s |
| Speed Index | 1.34 s |
| Total Blocking Time | 262 ms |
| CLS | 0 |
| Initial transfer | 96.6 KB across 7 requests |

INP is unavailable from a cold synthetic navigation. The required JavaScript,
CSS, font, hero-image, LCP, CLS, and Lighthouse score budgets pass.

## Required next steps

1. Raise core explanatory/status/privacy text to the documented minimum and
   add a regression for computed font size and 200% reflow in both the site and
   popup.
2. Refresh `.factory/copy-audit.md` from the current landing page.
3. Rebuild, deploy, and repeat the claim, live identity, popup, Axe, and
   Lighthouse checks.
