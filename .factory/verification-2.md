# Independent product verification 2 — FAIL

Verified on 28 August 2026 for work order `loudness-lens-verify-2`.

- Candidate: `7885872f2569f6dc46510fb13303a12fc3d0e49a`
- Live URL: `https://loudness-lens.sociobot.in`
- Artifact: Chrome MV3 extension plus static product/demo site
- Verdict: **FAIL — do not release this candidate**

The prior deployment-only failure is not present: the live site is available,
its product files match this candidate, the demo works, and the packaged
extension works when invoked through Chrome's real toolbar. The candidate still
fails the acceptance contract because claim-like promises remain outside the
claims manifest, several extension claim tests inspect source strings instead
of observable outcomes, and the deployed robots and sitemap resources return
HTTP 404. Stable, non-versioned assets are also cached as immutable for one
year.

## Fresh continuation check after the interrupted attempt

The repository already contained the completed independent report at commit
`d82ce9d`. Following the work-order instruction not to repeat finished work, I
preserved its full toolbar, Lighthouse, keyboard, and policy evidence and
rechecked the release gates most likely to change. Between 15:01 and 15:05 UTC
on 28 August 2026:

- all 15 exact commands in `.factory/claims.json` passed again; individual
  output is under `.factory/qa-artifacts/claims/`;
- a cold live load passed the mandatory first-read gate with no console or page
  errors (`first-read-desktop.json` and the desktop/mobile screenshots);
- `npm ci`, `npm test`, a separate `npm run build`, and `npm audit` passed again
  (`npm-*.log`); the suite passed 13 Vitest and 34 Playwright tests;
- fresh desktop and 390 px live smoke tests found no serious/critical Axe
  findings, cross-origin traffic, reduced-motion transitions, or horizontal
  overflow (`live-smoke.json`);
- `/robots.txt` and `/sitemap.xml` still returned 404, and the stable extension
  ZIP, SVG, and WAV still returned one-year immutable caching; and
- fresh SHA-256 comparisons matched the deployed root, JS, CSS, SVG, WAV,
  robots body, and sitemap body to the production build. All 14 extracted
  extension files matched (`identity/hashes.txt` and
  `identity/extension-diff.txt`).

These fresh results confirm the existing **FAIL** verdict; this is not a stale
deployment-only failure.

## Release-blocking findings

### High — the claims contract is incomplete

The landing page, privacy page, terms, and README contain behavior promises
that do not have corresponding entries in `.factory/claims.json`:

- “It cannot process protected media that Chrome blocks.”
- “It does not change your system volume.”
- “Turn off the guard to stop capture.”
- “Remove the extension to delete its settings.”
- “The extension will show an error when capture cannot start.”

These are material limits and recovery behaviors that a user may rely on. The
attached claims contract says an unlisted claim fails review until it is
removed or listed and tested.

In addition, seven declared extension claims are not tested as observable
outcomes. `tab-consent`, `panic-mute`, `live-meter`, `level-trim`,
`capture-lifecycle`, and `local-settings` are primarily `toContain` or regex
checks against source text; `no-recording` is also a limited source scan. These
checks can pass when code is dead, disconnected, or behaviorally broken. The
claim contract explicitly requires an observable sandbox outcome, not merely
the presence of an element or implementation string.

Fresh independent toolbar testing showed that the current extension does
perform the core behaviors, but independent QA cannot substitute for required
repeatable claim tests in the repository.

Required remediation: add manifest entries for the listed promises (or remove
the copy), and replace structural claim checks with automated loaded-extension
tests or behavioral unit tests that prove the message flow and audio outcome.

### Medium — deployed robots and sitemap files return HTTP 404

Fresh requests returned:

- `GET /robots.txt` → **404**, `Content-Type: text/plain`, 78-byte robots body
- `GET /sitemap.xml` → **404**, `Content-Type: text/xml`, 362-byte sitemap body

The bodies exactly match the candidate files, but their status codes tell
crawlers the resources do not exist. The cause is the final
`{"route":"/*","statusCode":404}` rule in
`site/public/staticwebapp.config.json`, which also catches these root files.
This violates the mandatory site-structure contract.

Required remediation: add explicit successful routes for `/robots.txt` and
`/sitemap.xml` before the catch-all, deploy, and verify both return 200.

## Other finding

### Medium — stable asset and download URLs are cached as immutable

The live host sends `Cache-Control: public, max-age=31536000, immutable` for
all `/assets/*` and `/downloads/*` resources. That is correct for hashed JS and
CSS, but it also applies to stable names such as:

- `/assets/mark.svg`
- `/assets/sample-lesson.wav`
- `/assets/loudness-botanical-640.webp`
- `/downloads/loudness-lens-chrome.zip`

Future deployments can therefore leave returning users with year-old art,
sample audio, or extension packages. Use content-hashed/versioned URLs for
immutable files, especially the extension ZIP, or use revalidation for stable
names.

## Mandatory first-read gate

**PASS** on a cold live load at 1440 × 900 and 390 × 844.

- What it does: “Keep every tab at a steady volume.”
- For whom: people switching among videos, lessons, and music who want fewer
  sudden volume jumps.
- First click: **Try it with sample data**.
- The adjacent text explains that a local sample passes through the limiter.
- Privacy, account/setup, and price facts appear on the first screen.
- One click opens `/demo` with realistic sample audio, a persistent demo
  banner, **Reset demo**, and **Start for real**.

The cold root load returned 200, made only same-origin requests, and produced
no console or page errors.

## Mandatory claims command results

`.factory/claims.json` exists. Every declared ID appears exactly once as a test
tag. Each listed command was run separately from the initially clean candidate
checkout after `npm ci`; every command exited 0.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-only` | `npm run test:e2e -- --grep @claim:local-only` | PASS — desktop + mobile |
| `sample-limiter` | `npm run test:e2e -- --grep @claim:sample-limiter` | PASS — desktop + mobile |
| `sample-timing` | `npm run test:e2e -- --grep @claim:sample-timing` | PASS — desktop + mobile |
| `demo-isolation` | `npm run test:e2e -- --grep @claim:demo-isolation` | PASS — desktop + mobile |
| `demo-reset` | `npm run test:e2e -- --grep @claim:demo-reset` | PASS — desktop + mobile |
| `demo-discard` | `npm run test:e2e -- --grep @claim:demo-discard` | PASS — desktop + mobile |
| `free-download` | `npm run test:e2e -- --grep @claim:free-download` | PASS — desktop + mobile |
| `tab-consent` | `npm run test:unit -- --testNamePattern @claim:tab-consent` | PASS — structural check |
| `no-recording` | `npm run test:unit -- --testNamePattern @claim:no-recording` | PASS — structural check |
| `panic-mute` | `npm run test:unit -- --testNamePattern @claim:panic-mute` | PASS — structural check |
| `look-ahead-limiter` | `npm run test:unit -- --testNamePattern @claim:look-ahead-limiter` | PASS — worklet executed |
| `live-meter` | `npm run test:unit -- --testNamePattern @claim:live-meter` | PASS — structural check |
| `level-trim` | `npm run test:unit -- --testNamePattern @claim:level-trim` | PASS — structural check |
| `capture-lifecycle` | `npm run test:unit -- --testNamePattern @claim:capture-lifecycle` | PASS — structural check |
| `local-settings` | `npm run test:unit -- --testNamePattern @claim:local-settings` | PASS — structural check |

The command results pass; the semantic claims-audit failure is documented
above.

## Clean install, complete test suite, and build

| Gate | Result |
| --- | --- |
| Initial checkout | Clean; HEAD exactly `7885872f2569f6dc46510fb13303a12fc3d0e49a` |
| `npm ci` | PASS; 293 packages; zero audit findings |
| `npm test` | PASS; build, typecheck, ESLint, 13 Vitest tests, 34 Playwright checks |
| `npm run typecheck` | PASS as part of `npm test` |
| `npm run lint` | PASS as part of `npm test` |
| `npm run build` (separate exact run) | PASS; `dist/site` and `dist/extension` produced |
| `npm audit` | PASS; zero vulnerabilities |
| Download ZIP | PASS; 14 files, `unzip -t` reports no errors |

Production sizes:

- Site JavaScript loaded by the landing page: 13.42 KB raw, 5.25 KB gzip.
- Site CSS: 10.23 KB raw, 3.12 KB gzip.
- Mobile hero: 21.34 KB; desktop hero: 86.26 KB.
- Extension: 59.75 KB unpacked; 50.20 KB ZIP.
- No font files or third-party runtime libraries are loaded.

## Functional verification

### Live demo

The live `/demo` route passed normal, boundary, invalid-state, keyboard, and
recovery checks in fresh browser contexts:

- Sample playback advanced to 0.92 seconds, showed “Playing through the local
  limiter,” and reported limiter reduction; pause returned “Paused.”
- Level trim accepted the boundaries `-12 dB` and `+6 dB`.
- Peak limit accepted the boundaries `-18 dB` and `-1 dB`.
- **Mute now** stored muted state and changed to **Restore sound**.
- Malformed demo JSON recovered to `0 dB`, `-6 dB`, and unmuted defaults.
- Browser Back removed `demo:loudness-lens:v1`; Forward reopened a fresh demo.
- The demo wrote only `localStorage["demo:loudness-lens:v1"]` and made no
  cross-origin requests.
- At 200% text size, the demo retained its heading and banner with no horizontal
  overflow.

### Real packaged extension

The freshly built unpacked extension was loaded in Chromium 145 and invoked
through Chrome's real Extensions toolbar on the live sample tab.

- Chrome granted the action to one active tab; `getCapturedTabs()` reported
  only that tab with status `active`.
- The popup moved from **Guard off** to **Guard on** and reported a live peak
  near `-17 dB`.
- At `-18 dB` peak limit and `+6 dB` trim, observed limiter reduction peaked at
  22.25 dB; the latest loud sample was held near `-18 dB` with 3.49 dB
  reduction.
- **Mute now** changed to **Restore sound** and the meter reported no sound;
  session storage recorded `muted: true`.
- Explicitly turning the guard off changed capture status to `stopped`.
- Reloading a guarded tab also changed state to Guard off and capture to
  `stopped` while preserving the selected limit and trim.
- The page and extension service worker produced no errors.

The manifest requests only `activeTab`, `storage`, `tabCapture`, and
`offscreen`, with no host permissions. The package has no recording, analytics,
or network implementation.

## Accessibility and responsive verification

- Axe 4.10.2: zero violations of any impact on `/`, `/demo`, `/privacy`,
  `/terms`, and a real 404 at desktop and 390 px mobile.
- Dark mode plus `prefers-reduced-motion: reduce`: zero Axe violations and
  zero-duration transitions.
- Extension popup in dark/reduced-motion mode: zero Axe violations, one h1,
  one main, and no console/page errors.
- `/opt/fleet/lib/verify-url.sh`: PASS; 881 ms network-idle load, title,
  `lang=en`, one h1/main, alt text, and labels present, with zero errors.
- Keyboard order begins with the skip link. It and the primary action show a
  visible 3 px focus outline. Enter opens the demo and focuses its h1. Space
  operates sample playback and panic mute.
- Every visible site control measured at least 44 × 44 CSS px at 390 px. The
  popup's two ranges are 44 px high; the visually hidden switch input is inside
  a 56 × 44 px clickable label.
- No tested route had horizontal overflow at 1440 px or 390 px.
- The expected browser console network message appears only when deliberately
  loading a URL that correctly responds 404; normal routes have no errors.

## Deployment identity, links, privacy, and policies

The live root document, 404 document, JS, CSS, SVG, images, WAV, robots body,
and sitemap body have the same SHA-256 values as the fresh candidate build.
Every extracted file in the live extension ZIP matches the locally built ZIP.
ZIP container bytes may vary because build timestamps are regenerated.

All actual product links return 200; the external factory link returns 200 and
the privacy mail address has valid `mailto:` syntax. Unknown routes return a
designed HTTP 404 with no canonical tag.

Live responses include CSP, HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
Permissions Policy. Hashed JS/CSS revalidate to 304 and have immutable caching.
Root documents use a 30-second revalidating cache.

The product has no backend, server-side product-unlock call, payment, API,
account, or sign-in. Rate-limit and Entra-tenant checks are therefore not
applicable. It is not a PWA, library, CLI, or backend, so offline service-worker,
consumer-install, concurrency, persistence, and health/build endpoint checks
are not applicable.

## Performance

Fresh Lighthouse 13.0.1 mobile run against the live root:

| Measure | Result |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 0.8 s |
| LCP | 1.2 s |
| Speed Index | 0.8 s |
| Total Blocking Time | 100 ms |
| CLS | 0 |
| Initial transfer | 94 KiB across 7 requests |

INP is not available from a cold synthetic navigation. All JavaScript, CSS,
font, image, LCP, TBT, and CLS budgets pass.

## Design, documentation, and scope

The botanical field-guide visual system is product-specific and consistent
across the site, demo, extension, and 404. Light and dark palettes, type,
spacing, interaction grammar, and reduced-motion behavior are documented.
Original generated artwork has source files, prompts, model/date provenance,
and disclosure. No generic gradient hero or external font/script is present.

`README.md`, MIT `LICENSE`, `/privacy`, `/terms`, `.factory/demo.md`, and the
landing copy audit exist and are useful. The core brief is represented: explicit
per-tab enable, 10 ms look-ahead limiting, level trim, live peak/reduction meter,
panic mute, local processing, and honest protected-media limits. AI would not
improve this local audio safety job, so no missed-AI-leverage finding applies.

## Required next steps

1. Inventory every claim-like sentence and either list it in
   `.factory/claims.json` with one observable test or remove it.
2. Replace source-string claim checks with real loaded-extension or behavioral
   tests, especially for mute, meter, level trim, consent, and capture stop.
3. Add successful routes for `/robots.txt` and `/sitemap.xml`; verify live 200s.
4. Version/hash every immutable asset and extension download, or give stable
   names a revalidating cache policy.
