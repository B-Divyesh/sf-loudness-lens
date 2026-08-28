# Polish round 4 — complete cumulative finding closure

Reviewed `.factory/review-1.md` through `.factory/review-4.md` and every prior
polish report. Product repair commit: `774d2e7f5ea9e722d813e3cfac5ed685f5b86a39`.
Static deployment: `ead0b159-b9bc-4885-9c60-47f4c7bc292d` at
`https://loudness-lens.sociobot.in`.

## Finding map

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Kept the persistent home-link name, wrapping legal links, 16 px explanatory text, and 195 px reflow treatment. | Tests `page structure and accessibility: <route>` and `readability baseline keeps site instructions at 16 px and reflows at 200% mobile zoom`; `.factory/qa-artifacts/polish-4-live/privacy-195-cold.png`; live `/privacy`; `live-review.json` reports no overflow or serious/critical Axe issue on all five routes at 195 px. |
| F-1-2 | Kept the working landing slider, marker, readout, mute/restore state, and explicit example label. | `@claim:peak-limit-marker updates the landing marker and mute state`; `.factory/qa-artifacts/polish-4-live/preview-interaction.png`; live `/`. |
| F-1-3 | Kept all six ZIP install steps and the installable archive root. | Tests `the live download is paired with complete Chrome installation and pinning steps` and `packages an installable extension folder at the ZIP root`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live ZIP and `zip-test.log`. |
| F-1-4 | Kept History API navigation, heading focus, announcement, and final section scroll. | `How it works navigation focuses, announces, and scrolls to the home content`; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live `/?demo=1` to `/#how`; `live-review.json` records focused/announced h1 and section top 1 px. |
| F-1-5 | Kept exact titles, descriptions, Open Graph/Twitter descriptions, and canonicals per route. | `each route sets exact page and sharing metadata`; `.factory/qa-artifacts/polish-4-live/home-mobile-cold.png`, `demo-mobile-cold.png`, and `missing-mobile-cold.png`; live route values in `live-review.json`. |
| F-1-6 | Kept the result-naming **Download the extension ZIP** action and discard-on-exit behavior. | `@claim:demo-discard clears settings on browser history and direct navigation`; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live `/?demo=1`; `live-review.json` records a null demo key after exit. |
| F-1-7 | Kept the concrete fact **No account or server setup.** | `@claim:free-download provides the extension package without an account`; `.factory/qa-artifacts/polish-4-live/home-mobile-cold.png`; live `/`. |
| F-1-8 | Kept the exact first-screen label **A per-tab peak limiter**. | `the first screen describes a selected-tab peak limiter without a normalization promise`; `.factory/qa-artifacts/polish-4-live/home-mobile-cold.png`; live `/`. |
| F-1-9 | Kept the action result **Keep sudden peaks below your chosen limit.** | The first-screen wording test and `@claim:per-tab-peak-limit`; `.factory/qa-artifacts/polish-4-live/home-mobile-cold.png`; live `/`. |
| F-1-10 | Kept the truthful paused message; reduction appears only after playback starts. | `direct demo entry is isolated, resettable, and honest before playback`; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live `/?demo=1`; initial and playing states are recorded in `live-review.json`. |
| F-1-11 | Kept the term **demo** and direct `/?demo=1` URL in README and product docs. | Direct-demo test; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live `/?demo=1` returned 200 and loaded the sample in one click. |
| F-1-12 | Kept the README mechanism split into short sentences and retained focused 10 ms and meter proofs. | `@claim:look-ahead-limiter` and `@claim:live-meter`; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live `/?demo=1`. |
| F-1-13 | Kept **Manifest V3** expanded and verified the packaged manifest. | `packages an installable extension folder at the ZIP root`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live ZIP passed `unzip -t`. |
| F-1-14 | Kept plain image-source wording and recorded the original generated art in the design file. | `.factory/copy-audit.md`, `.factory/design.md`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live footer on `/`. |
| F-1-15 | Kept real routes, route metadata, response security headers, sitemap/robots, and the designed HTTP 404. | `ships crawlable metadata, versioned immutable assets, and a real static 404 response`; `.factory/qa-artifacts/polish-4-live/missing-mobile-cold.png`; live checks in `statuses.txt`, `live-review.json`, and `root-headers.txt`. |
| F-1-16 | Kept the concrete local-processing and no-account wording. | `@claim:local-only` and `@claim:free-download`; `.factory/qa-artifacts/polish-4-live/demo-mobile-cold.png`; live demo request log in `live-review.json` contains no foreign origin. |
| F-1-17 | Kept the visible **external site** label and a full-size footer target. | `every visible site control has a 44 px touch target`; `.factory/qa-artifacts/polish-4-live/home-mobile-cold.png`; live footer and `link-crawl.json` show the Factory destination returns 200. |
| F-2-1 | Kept the Chrome 116 requirement registered and checked against the production manifest. | `@claim:minimum-chrome-version declares Chrome 116 in the built extension manifest`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live ZIP URL and passing archive log. |
| F-2-2 | Kept concrete section labels: **Peak-limit preview**, **Three steps**, and **Limits and browser constraints**. | `landing section labels describe the content in plain words`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live `/`. |
| F-3-1 | Kept hero, title, metadata, footer, README, catalog, manifest, and popup limited to selected-tab peak limiting. | `@claim:per-tab-peak-limit` and the first-screen wording test; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png` and `home-mobile-cold.png`; live `/`. |
| F-3-2 | Kept **Install the extension in Chrome** and the toolbar-pinning step on the site and in README. | `the live download is paired with complete Chrome installation and pinning steps`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live install section on `/`. |
| F-4-1 | Replaced the mood phrase with the self-explanatory h2 **Preview the selected peak limit**. | `preview and 404 copy names the content without field-guide lore`; `.factory/qa-artifacts/polish-4-live/home-desktop-cold.png`; live `/`; `live-review.json` records the new h2 and zero old matches. |
| F-4-2 | Replaced **SPECIMEN 01 · ACTIVE TAB** with **Active tab** while retaining the botanical frame. | The same copy regression plus `keeps preview and both 404 renderers free of decorative copy`; `.factory/qa-artifacts/polish-4-live/preview-interaction.png`; live `/`; zero old matches in `live-review.json`. |
| F-4-3 | Changed both client and static 404 h1s to **Page not found** and removed **Field note 404**. | The browser and source copy regressions; `.factory/qa-artifacts/polish-4-live/missing-mobile-cold.png` and `missing-195-cold.png`; live `/missing` returns HTTP 404 with the direct h1, `noindex`, and no canonical. |

All screenshot paths above are under `.factory/qa-artifacts/polish-4-live/`
unless written in full.

## Acceptance evidence

- Fresh clone `/tmp/loudness-lens-polish-4-clean.73rwT6/repo` at
  `774d2e7f5ea9e722d813e3cfac5ed685f5b86a39` passed `npm ci` with zero
  vulnerabilities. All 18 exact commands in `.factory/claims.json` passed;
  see `.factory/qa-artifacts/polish-4-local/claims-summary.txt` and individual
  claim logs.
- Clean-clone `npm test` passed the build, TypeScript, ESLint, 19 Vitest tests,
  and 56 Playwright tests. Browser coverage includes desktop/mobile, keyboard,
  route focus/history, privacy request logging, offline interaction, dark mode,
  44 px targets, 390/195 px reflow, popup reflow, and Axe.
- The exact work-order command `npm ci && npm test && npm run build:site`
  passed before deployment; see `work-order-build.log`.
- Local Lighthouse: performance 99, accessibility 100, best practices 100,
  SEO 100, LCP 1.7 s, TBT 100 ms, CLS 0. Live Lighthouse: 100 in all four
  categories, LCP 1.4 s, TBT 20 ms, CLS 0. Initial transfer was 95 KiB.
- `/opt/fleet/lib/verify-url.sh` passed locally and live with no page or console
  errors. The live matrix found no serious/critical Axe findings and no
  overflow on any route at 390 or 195 CSS px.
- Live root and ZIP SHA-256 values match the deployed build byte for byte; see
  `.factory/qa-artifacts/polish-4-live/identity-sha256.txt`.
- The 41-character catalog line now reads: **Limit sudden peaks in the tab you
  enable.** It starts with a verb and contains no banned term.

Result: all 24 cumulative findings are closed. No severity, TODO, or follow-up
item is deferred.
