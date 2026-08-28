# Independent product verification — FAIL

Verified on 28 August 2026 for work order `loudness-lens-verify-1`.

- Candidate: `2498293ac6af324b244842013128267a5195eac9`
- Live URL: `https://loudness-lens.sociobot.in`
- Artifact: Chrome MV3 browser extension plus static product/demo site
- Verdict: **FAIL — do not release this candidate**

The core extension works when installed and invoked through Chrome's real
toolbar, and every declared claim test passes. The candidate still fails the
acceptance contract because demo state survives a browser-history exit,
claim-like demo promises are absent from `.factory/claims.json`, and several
mobile and extension controls miss the required 44 px target size.

## Release-blocking findings

### High — leaving the demo with browser Back keeps demo state

The demo contract says leaving demo mode discards demo data. From a fresh
390 × 844 Chromium context I opened `/`, selected **Try it with sample data**,
set Level trim to `+3 dB`, then used browser Back.

- On `/`, `localStorage["demo:loudness-lens:v1"]` still contained
  `{"ceiling":-6,"trim":3,"muted":false}`.
- Browser Forward returned to `/demo` with Level trim still at `3`.
- Link navigation from `/demo` does clear the key, so the defect is specific
  to `popstate` and direct navigation/unload paths.

This violates the required discard-on-exit behavior and the documented
promise in `.factory/demo.md`.

### High — user-facing demo claims are not listed in claims.json

The live demo and documentation make claim-like statements which have no
entry in `.factory/claims.json`:

- The persistent banner says “Demo — sample data, nothing is saved.”
- `.factory/demo.md` promises a separate storage namespace, reset behavior,
  and discard on exit.
- `/demo`, `.factory/demo.md`, and `README.md` promise a 12-second sample with
  two volume jumps.

There are untagged tests for some storage behavior, and the WAV is exactly
12.0 seconds, but the claims contract requires every user-facing claim to be
listed and tagged. The discard promise also fails through browser history.

### Medium — touch targets are smaller than 44 px

Measured at a 390 × 844 CSS viewport:

- Demo banner: **Reset demo** is 32 px high; **Start for real** is 21.7 px.
- Header wordmark is 36 px high.
- Footer Privacy, Terms, and factory links are 24.8 px high.
- Privacy email link is 21 px high.
- Extension Peak limit and Level trim inputs are 28 px high.

Axe reports no violations, but these measurements fail the attached
accessibility and design baseline of at least 44 × 44 CSS px.

## Other findings

### Medium — hashed assets are not cached immutably

The live HTML, hashed JS/CSS, images, sample WAV, and extension ZIP all return
`Cache-Control: public, must-revalidate, max-age=30`. The performance contract
requires long-lived immutable caching for hashed assets.

### Medium — build/test dependencies have known advisories

`npm audit` reports 14 development dependency findings: 5 critical, 6 high,
and 3 moderate. Direct affected tools include WXT, Vitest, and Vite. The
shipped runtime has no npm dependencies and `npm audit --omit=dev` reports
zero findings, so this is a build-chain issue rather than a browser runtime
exposure.

### Low — unknown routes return a soft 404

`GET /missing` returns HTTP 200 and gives itself the canonical URL
`https://loudness-lens.sociobot.in/missing`. The rendered 404 screen is clear,
but crawlers receive a successful response rather than a real 404 status.

## Mandatory claims gate

`.factory/claims.json` exists. Each declared ID occurs exactly once as a test
tag. Every listed command was run separately after confirming the checkout
was clean; all exited 0.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-only` | `npm run test:e2e -- --grep @claim:local-only` | PASS — 2 projects |
| `sample-limiter` | `npm run test:e2e -- --grep @claim:sample-limiter` | PASS — 2 projects |
| `free-download` | `npm run test:e2e -- --grep @claim:free-download` | PASS — 2 projects |
| `tab-consent` | `npm run test:unit -- --testNamePattern @claim:tab-consent` | PASS — 1 test |
| `no-recording` | `npm run test:unit -- --testNamePattern @claim:no-recording` | PASS — 1 test |
| `panic-mute` | `npm run test:unit -- --testNamePattern @claim:panic-mute` | PASS — 1 test |
| `look-ahead-limiter` | `npm run test:unit -- --testNamePattern @claim:look-ahead-limiter` | PASS — 1 test |
| `live-meter` | `npm run test:unit -- --testNamePattern @claim:live-meter` | PASS — 1 test |
| `level-trim` | `npm run test:unit -- --testNamePattern @claim:level-trim` | PASS — 1 test |
| `capture-lifecycle` | `npm run test:unit -- --testNamePattern @claim:capture-lifecycle` | PASS — 1 test |
| `local-settings` | `npm run test:unit -- --testNamePattern @claim:local-settings` | PASS — 1 test |

## Cold first-read test

PASS at both 1440 × 900 and 390 × 844, before interaction.

- What it does: “Keep every tab at a steady volume.”
- For whom: people switching among videos, lessons, and music who want fewer
  sudden volume jumps.
- First click: **Try it with sample data**.
- The action and all three privacy/account/price facts are above the fold.
- The click opens `/demo` in one action with a ready sample, persistent demo
  banner, Reset demo, and Start for real.

The cold loads returned HTTP 200, made only same-origin requests, and produced
no console or page errors.

## Clean install, tests, and build

| Gate | Result |
| --- | --- |
| `npm ci` | PASS; 440 packages installed |
| `npm test` | PASS; 11 unit tests and 26 Playwright tests |
| `npm run typecheck` | PASS |
| Lint | Not available; no lint script is defined |
| `npm run build` | PASS; `dist/site` and `dist/extension` produced |
| `npm audit --omit=dev` | PASS; zero runtime findings |

Production build sizes:

- Site JavaScript: 13.25 KB raw / 5.07 KB gzip.
- Site CSS: 10.01 KB raw / 3.08 KB gzip.
- Mobile hero: 21.34 KB; desktop hero: 86.26 KB.
- Extension: 69.3 KB unpacked / 53.11 KB ZIP.
- No external fonts or runtime libraries are loaded.

## Functional evidence

### Demo

The live demo passed normal, boundary, and recovery checks:

- Shipped audio advanced to 0.64 seconds and the status changed to “Playing
  through the local limiter”; pause restored **Play sample**.
- Level trim accepted `-12` and `+6 dB`; peak limit accepted `-18` and
  `-1 dB` with matching readouts.
- Mute changed to **Restore sound** and persisted only in the demo namespace.
- Reset restored `0 dB`, `-6 dB`, and unmuted state.
- Malformed JSON in the demo key recovered to defaults without an error.
- All observed demo requests stayed on the product origin.

The browser-history cleanup failure is documented above.

### Installed extension

The freshly built unpacked extension was loaded in Chrome 145 from
`dist/extension/chrome-mv3`. It was invoked through Chrome's real toolbar on
the live sample tab in headed Chromium with a virtual audio sink.

- Initial state: Guard off, `-6 dB` peak limit, `0 dB` trim.
- Enabling changed to Guard on; Chrome reported the tab capture `active`.
- The live meter first reported a `-17 dB` peak. At a `-18 dB` limit with
  `+6 dB` trim it reported a `-18 dB` peak and **4.2 dB limiter reduction**.
- Mute now produced “No sound detected”; restore and explicit disable worked.
- `-18 dB` limit, `+6 dB` trim, and mute state reached session storage.
- Reloading the guarded tab changed state to Guard off and Chrome reported the
  capture `stopped`.
- The popup, service worker, and page produced no console/page errors.
- A no-audio-device run showed the documented recoverable start error.

Source and unit checks additionally exercised the 10 ms worklet delay,
ceiling enforcement, numeric clamping, tab-close lifecycle, and absence of
recording/network APIs or host permissions.

## Accessibility and responsive checks

- Axe 4.10.2: zero violations of any impact on `/`, `/demo`, `/privacy`,
  `/terms`, and `/missing` at desktop and 390 px mobile.
- The same routes have zero Axe violations in dark mode with reduced motion.
- Factory `verify-url.sh`: exit 0; title, `lang=en`, one h1, one main, alt text,
  labels, and console checks passed; cold network-idle load was 797 ms.
- All routes have one h1, ordered headings, header/main/footer landmarks, no
  missing image alt text, and no horizontal overflow.
- Keyboard order begins with the skip link. Every tested focus state uses a
  visible 3 px focus outline. Enter follows the demo link, Home/End move the
  peak slider to `-18`/`-1`, and Space activates Mute now.
- Reduced motion computes `scroll-behavior: auto` and zero-second transitions.
- Touch-size failures are listed above.

## Deployment, privacy, and response policies

The live root HTML, hashed JS, hashed CSS, and sample WAV SHA-256 values match
the fresh candidate build exactly. The local and live ZIP container hashes
differ because ZIP timestamps are regenerated, but all 14 packaged file names
and file bytes match, including the manifest and extension scripts.

All crawled product links return 200; the mail link is valid syntax. Robots
and sitemap files are present and list `/`, `/demo`, `/privacy`, and `/terms`.
The live site sends CSP, HSTS, `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`, and a restrictive
Permissions Policy. No CSP, console, or page errors were observed.

The product has no analytics, backend, sign-in, product-unlock call, or API
endpoint. Rate-limit and Entra tenant checks are therefore not applicable.
It is not a PWA, library, CLI, or backend, so those class-specific checks are
also not applicable.

## Design and documentation

The botanical field-guide visual thesis is distinctive and consistently
implemented in the landing page, demo, popup, and 404 screen. Light and dark
palettes are explicit. The generated botanical artwork has its prompt,
generation date, source, and license recorded in `.factory/design.md`; the
source and prompt sidecars are present. The shipped social image is 1200 × 630
and the Apple icon is 180 × 180. No third-party font, script, or image request
was observed.

`README.md` documents the audience, demo, installation, development, testing,
build outputs, browser limits, privacy, deployment, and MIT license. `LICENSE`,
`/privacy`, `/terms`, `.factory/demo.md`, and `.factory/copy-audit.md` are
present. The landing-page copy audit has no sentence over 22 words and no
banned marketing term. AI is not useful to this local audio-control job, so
the missed-AI-leverage check is not applicable.

## Performance

Fresh Lighthouse 13.0.1 mobile run against the live root:

| Measure | Result |
| --- | ---: |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| FCP | 0.82 s |
| LCP | 1.37 s |
| Speed Index | 0.82 s |
| Total Blocking Time | 57 ms |
| CLS | 0 |
| Initial transfer | 96.3 KB across 6 requests |

INP is not available from a cold synthetic Lighthouse navigation. All static
bundle, CSS, font, and hero-image budgets pass. Immutable caching does not.

## Required remediation

1. Clear the demo namespace on every exit path, including `popstate`, direct
   navigation, and unload as appropriate; add a regression claim test.
2. List and tag every demo storage/reset/discard and quantitative sample claim,
   or remove those promises from user-facing copy.
3. Make every site and popup interaction target at least 44 × 44 CSS px.
4. Add immutable long-lived caching for fingerprinted assets while keeping
   HTML short-lived.
5. Upgrade or mitigate vulnerable build/test dependencies.
6. Return a real 404 status for unknown paths and avoid self-canonicalizing
   missing URLs.
