# Polish round 3 — complete cumulative finding closure

Reviewed source findings: `.factory/review-1.md`, `.factory/polish-1.md`,
`.factory/review-2.md`, `.factory/polish-2.md`, and
`.factory/review-3.md`. The product repair commit is
`748a1bf75235d5644b6c4057bd93132f78ed3091`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the named home link, wrapping legal link, 44 px controls, and 195 px reflow treatment. | Browser test `page structure and accessibility: <route>`; live `.factory/qa-artifacts/polish-3-live/live-review.json` reports zero overflow and zero serious/critical Axe findings at 390 and 195 px for every route; screenshot `.factory/qa-artifacts/polish-3-live/home-mobile-cold.png`; live `https://loudness-lens.sociobot.in/privacy`. |
| F-1-2 | Retained the functional preview slider, marker, mute state, and labelled example reading. | `@claim:peak-limit-marker updates the landing marker and mute state`; clean claim summary `.factory/qa-artifacts/polish-3-local-summary.txt`; screenshot `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png`; live `/`. |
| F-1-3 | Retained ZIP extraction and Load unpacked instructions, then completed the path with toolbar pinning. | `the live download is paired with complete Chrome installation and pinning steps`; live ZIP integrity `.factory/qa-artifacts/polish-3-live/zip-test.txt`; screenshot `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png`; live `/`. |
| F-1-4 | Retained History API navigation, heading focus, live announcement, and requested-section scroll. | `How it works navigation focuses, announces, and scrolls to the home content`; clean suite log; live `/?demo=1` navigation exercised in `.factory/qa-artifacts/polish-3-live/live-review.json`. |
| F-1-5 | Retained route-specific description, Open Graph, Twitter, title, and canonical updates. | `each route sets exact page and sharing metadata`; live route matrix `.factory/qa-artifacts/polish-3-live/live-review.json`; live `/demo`, `/privacy`, and `/terms`. |
| F-1-6 | Retained the result-naming demo exit action and its discard behavior. | `@claim:demo-discard clears settings on browser history and direct navigation`; live demo screenshot `.factory/qa-artifacts/polish-3-live/demo-mobile-cold.png`; live `/?demo=1`. |
| F-1-7 | Retained the concrete first-screen account fact. | `@claim:free-download provides the extension package without an account`; copy audit; screenshot `.factory/qa-artifacts/polish-3-live/home-mobile-cold.png`; live `/`. |
| F-1-8 | Replaced the less precise volume-guard kicker with **A per-tab peak limiter**. | `the first screen describes a selected-tab peak limiter without a normalization promise`; screenshot `.factory/qa-artifacts/polish-3-live/home-mobile-cold.png`; live `/`. |
| F-1-9 | Replaced the action result with **Keep sudden peaks below your chosen limit.** | `the first screen describes a selected-tab peak limiter without a normalization promise` and `@claim:per-tab-peak-limit`; live `/`. |
| F-1-10 | Retained the truthful paused demo message and only shows reduction after playback starts. | `direct demo entry is isolated, resettable, and honest before playback`; live demo check and screenshot `.factory/qa-artifacts/polish-3-live/demo-mobile-cold.png`; live `/?demo=1`. |
| F-1-11 | Retained the direct `/?demo=1` README path and consistent **demo** wording. | `direct demo entry is isolated, resettable, and honest before playback`; one-click live URL in `.factory/qa-artifacts/polish-3-live/live-review.json`; live `/?demo=1`. |
| F-1-12 | Retained the short README mechanism sentences and separately tested the 10 ms implementation detail. | `@claim:look-ahead-limiter delays audio by 10 ms before applying gain reduction`; `@claim:live-meter measures a captured peak and reports limiter reduction`; clean claim summary. |
| F-1-13 | Retained **Manifest V3** expansion and the installable archive. | `packages an installable extension folder at the ZIP root`; live `.factory/qa-artifacts/polish-3-live/live-manifest.json`; live ZIP URL. |
| F-1-14 | Retained the plain image-source wording and recorded generated-art source in the design file. | `.factory/copy-audit.md`, `.factory/design.md`, and footer screenshot `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png`; live `/`. |
| F-1-15 | Retained real app routes, security headers, and an HTTP 404 with no canonical. | `ships crawlable metadata, versioned immutable assets, and a real static 404 response`; live status and metadata matrix `.factory/qa-artifacts/polish-3-live/live-review.json`; live `/missing`. |
| F-1-16 | Retained concrete local-processing and no-account wording. | `@claim:local-only keeps the complete demo flow on the same origin`; live demo `foreignRequests: []` in `.factory/qa-artifacts/polish-3-live/live-review.json`; live `/?demo=1`. |
| F-1-17 | Retained the visible external-site label and full-size footer target. | `every visible site control has a 44 px touch target`; screenshot `.factory/qa-artifacts/polish-3-live/home-mobile-cold.png`; live `/`. |
| F-2-1 | Retained the `minimum-chrome-version` claim and build-manifest proof. | `@claim:minimum-chrome-version declares Chrome 116 in the built extension manifest`; `.factory/qa-artifacts/polish-3-live/live-manifest.json`; live ZIP URL. |
| F-2-2 | Retained the concrete labels **Peak-limit preview**, **Three steps**, and **Limits and browser constraints**. | `landing section labels describe the content in plain words`; screenshot `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png`; live `/`. |
| F-3-1 | Rewrote hero, footer, title, metadata, README, catalog, extension manifest, and popup around selected-tab peak limiting. Added `per-tab-peak-limit`; its harness found and fixed sustained-input ceiling creep in `limiter-worklet.js`. | `@claim:per-tab-peak-limit reduces a loud enabled tab to its selected peak limit`; clean claim summary; live exact-copy and metadata check `.factory/qa-artifacts/polish-3-live/live-review.json`; screenshots `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png` and `home-mobile-cold.png`; live `/`. |
| F-3-2 | Renamed the install section **Install the extension in Chrome** and added the sixth visible toolbar-pinning step in the landing page and README. | `the live download is paired with complete Chrome installation and pinning steps`; live exact-step check `.factory/qa-artifacts/polish-3-live/live-review.json`; screenshot `.factory/qa-artifacts/polish-3-live/home-desktop-cold.png`; live `/`. |

## Acceptance evidence

- Clean clone: `/tmp/loudness-lens-polish-3-clean.1LtcR8/repo` at
  `748a1bf75235d5644b6c4057bd93132f78ed3091`. `npm ci` installed 292
  packages and reported zero vulnerabilities.
- Every exact command in `.factory/claims.json` ran independently in that
  clone: all 18 claims passed. The per-claim commands and statuses are in
  `.factory/qa-artifacts/polish-3-local-summary.txt`.
- Clean-clone `npm test` passed production build, typecheck, ESLint, 18 Vitest
  tests, and 54 Playwright tests across desktop and mobile. The suite includes
  demo isolation, privacy request logging, offline interaction, keyboard,
  routing/focus, 44 px targets, 390/195 px reflow, dark theme, and Axe checks.
- Deployed through the static work order to `https://loudness-lens.sociobot.in`
  as deployment `0495d702-4eef-4278-8d71-732fec2b19f7`.
- `/opt/fleet/lib/verify-url.sh` passed the cold live root with no console or
  page errors. Evidence: `.factory/qa-artifacts/polish-3-live/verify.json`.
- The live Playwright Axe scan found zero serious/critical issues at 390 and
  195 px on `/`, `/demo`, `/privacy`, `/terms`, and `/missing`. Evidence:
  `.factory/qa-artifacts/polish-3-live/live-review.json`.
- Live Lighthouse mobile: performance 100, accessibility 100, best practices
  100, SEO 100; LCP 1.35 s, CLS 0, total blocking time 44 ms. Evidence:
  `.factory/qa-artifacts/polish-3-live/lighthouse.json`.
- Live status, CSP, robots, sitemap, package integrity, manifest, and byte
  identity evidence are under `.factory/qa-artifacts/polish-3-live/`.

Result: all 21 cumulative findings are closed. No item of any severity is
deferred.
