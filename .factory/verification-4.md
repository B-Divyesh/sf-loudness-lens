# Independent product verification 4 — PASS

Verified 28 August 2026 for work order `loudness-lens-verify-4`.

- Candidate: `b9ba0a544fc699a62ee1e9d05f6fd6ec2e467231`
- Live URL: `https://loudness-lens.sociobot.in`
- Product: Chrome MV3 browser extension with static landing and isolated demo
- Verdict: **PASS — release candidate accepted**

No release-blocking defects were found. The earlier deployment-only concern is
not present: the current live product is available and matches this candidate.

## Mandatory claims gate

`.factory/claims.json` exists and declares 15 claims. After a clean `npm ci`,
I ran every exact command specified there through the shipped demo entry point
or extension behavioural harness. All exited successfully.

| Claim IDs | Exact command | Result |
| --- | --- | --- |
| `local-only`, `sample-limiter`, `sample-timing`, `demo-isolation`, `demo-reset`, `demo-discard`, `free-download` | `npm run test:e2e -- --grep @claim:<id>` | PASS for every ID, in Chromium and 390 px mobile projects |
| `tab-consent`, `panic-mute`, `look-ahead-limiter`, `live-meter`, `level-trim`, `capture-lifecycle`, `local-settings`, `capture-error` | `npm run test:unit -- --testNamePattern @claim:<id>` | PASS for every ID |

The tests prove the local-only request boundary, local limiter playback,
12-second/two-jump sample, separate demo storage, reset/discard behaviour,
free accountless download, explicit-tab capture, panic mute, 10 ms look-ahead
worklet, live meter, both trim limits, capture lifecycle, Chrome session
storage, and the user-facing capture recovery error.

## Cold first-read gate

**PASS** on fresh desktop (1440 × 900) and mobile (390 × 844) live contexts.

- It does: “Keep every tab at a steady volume.”
- It is for: people switching among videos, lessons, and music who want fewer
  sudden volume jumps.
- First action: **Try it with sample data**. Its adjacent text says it will
  play a local sample through the limiter.

The required three short facts are visible: audio stays in the browser, no
account/server setup, and free use. The one-click action opens `/demo`, where
the persistent “Demo — sample data, nothing is saved” banner, **Reset demo**,
and **Start for real** are present.

## Clean checkout quality gates

The checkout began at the candidate commit with no product changes. Results:

| Gate | Evidence |
| --- | --- |
| Install | `npm ci` PASS; 293 audited packages, 0 vulnerabilities |
| Complete suite | `npm test` PASS: production build, TypeScript, ESLint, 13 Vitest tests and 38 Playwright tests (`test-results/.last-run.json` reports `passed`) |
| Production build | `npm run build` is the exercised build step and produces `dist/site` and `dist/extension` |
| Dependency audit | `npm audit --omit=dev` PASS; 0 vulnerabilities |
| Package integrity | `unzip -t` PASS for the 14-member extension ZIP (50,455 bytes) |

The first-load main JavaScript is 12,645 bytes raw / 4,800 bytes gzip and CSS
is 10,793 bytes raw / 3,190 bytes gzip, comfortably within the static budget.
No external fonts, scripts, analytics, or runtime libraries are requested.

## End-to-end product checks

Fresh live demo checks covered normal use, boundaries, invalid persisted input,
and recovery:

- The sample began playback and advanced to 0.72 seconds; its status was
  “Playing through the local limiter” and the meter reported 1.9 dB limiter
  reduction.
- Level trim accepted both `-12 dB` and `+6 dB`; peak limit accepted `-18 dB`.
  **Mute now** became **Restore sound**.
- **Reset demo** returned trim to `0`, limit to `-6`, and mute to off. A
  malformed demo storage value recovered to those same safe defaults.
- Demo storage is only `localStorage["demo:loudness-lens:v1"]`; the dedicated
  claim test also verifies it is discarded when navigating away.
- Space paused the sample. The first Tab focuses the visible 44.8 px skip link;
  Enter on the demo action navigates and focuses the destination `h1`.

The built MV3 artifact was loaded into Chromium under Xvfb. Its actual
extension service worker and popup loaded without console/page errors; the
popup exposes the Guard switch, peak limit, level trim, panic mute, and local
audio statement. The full claim suite supplies the deterministic capture,
limiter, meter, error, and cleanup behavioural coverage. The manifest requests
only `activeTab`, `storage`, `tabCapture`, and `offscreen`, with no host
permissions.

## Accessibility, responsive design, and privacy

- Axe 4.10.2 reported zero serious or critical findings on live `/`, `/demo`,
  `/privacy`, `/terms`, and the designed 404 at 390 px. The loaded extension
  popup also has zero serious/critical findings.
- Every checked route has one `main`, one `h1`, `lang="en"`, an appropriate
  route title, and no horizontal overflow at 390 px. At the required 195 CSS
  px 200%-zoom equivalent, the demo and popup still fit with their key controls
  visible. User-facing instructional text in the site and popup is 16 px or
  more.
- Focus is a designed 3 px outline. With reduced motion, scroll behaviour is
  `auto` and transitions are disabled.
- The full live demo flow emitted only same-origin requests. The root cold load
  requested only first-party HTML, JavaScript, CSS, SVG, and original WebP art;
  it had no console or page errors.
- Live root headers include a self-only CSP, HSTS, `X-Content-Type-Options:
  nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a
  camera/microphone/geolocation-denying Permissions Policy. Documents use
  short revalidation; hashed assets and the download use one-year immutable
  caching. `/demo`, `/privacy`, `/terms`, robots, sitemap, download, and
  designed 404 were all checked live.

## Deployment identity and applicability

The live root SHA-256 is
`49fb039f3acc8f1039b0f5fe2fb1dfaa335b59b410b4db324be56cb6ce3aa945`, exactly
matching `dist/site/index.html`. The live downloadable ZIP SHA-256 is
`45fd4f8c4a20e55c05b7105d0b1f245acdc5b49f3d912c209bd73c3870d6fe7d`, exactly
matching `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` and passing
archive integrity validation.

This is a local-only extension/static site: it has no server-side endpoint,
sign-in, payment, product-unlock call, PWA service worker, library/CLI, or
backend persistence/health surface. Rate-limit, Entra authority, server
concurrency, consumer-package, and service-worker update checks therefore do
not apply.

## Defects by severity

None.
