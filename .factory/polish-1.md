# Polish round 1 — cumulative finding closure

Repaired from review commit `076a9c7ce55f0279c8549d922a3627a9f3a8c15d`.
No earlier `.factory/review-*.md` or `.factory/polish-*.md` exists in repository
history. Code repair commit: `3f14fbd`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Added the persistent `Loudness Lens home` name, allowed legal links and install code to wrap, and kept the full mobile navigation usable. | `page structure and accessibility: <route>` runs Axe plus overflow checks on `/`, `/demo`, `/privacy`, `/terms`, and `/missing` at 390 and 195 px. Live results: `.factory/qa-artifacts/polish-1-live/review.json`; screenshot: `.factory/qa-artifacts/polish-1-live/privacy-195-cold.png`; live `/privacy`. |
| F-1-2 | Made the landing preview interactive. Its slider updates the number and marker; mute and restore update button state and the text alternative. The copy now labels the level as an example. | `@claim:peak-limit-marker updates the landing marker and mute state`; live report `preview.pass`; screenshot: `.factory/qa-artifacts/polish-1-live/home-desktop-cold.png`; live `/`. |
| F-1-3 | Replaced the incomplete sentence with five numbered steps: download, extract, open Chrome extensions, enable Developer mode, and load the extracted folder. | `the live download is paired with complete Chrome installation steps`; unit test `packages an installable extension folder at the ZIP root`; live ZIP check returned 200, 50,455 bytes, root `manifest.json`, and Manifest V3. Screenshot: `.factory/qa-artifacts/polish-1-live/home-mobile-cold.png`; live `/`. |
| F-1-4 | Routed “How it works” through History API navigation. The home h1 receives focus and is announced before the target section scrolls into view. | `How it works navigation focuses, announces, and scrolls to the home content`; live report `routing.pass` with `/#how`, focused h1, matching announcement, and section top 1 px; live `/?demo=1`. |
| F-1-5 | Added a description to every route and update logic for description, Open Graph description, Twitter description, title, canonical, and 404 robots state. | `each route sets exact page and sharing metadata`; live route matrix in `.factory/qa-artifacts/polish-1-live/review.json`; live `/demo`, `/privacy`, `/terms`, and missing-route checks. |
| F-1-6 | Renamed the demo action to “Download the extension ZIP”; it downloads, discards demo state, and returns home. | `@claim:demo-discard clears settings on browser history and direct navigation`; live report `demo.discarded: null`; screenshot: `.factory/qa-artifacts/polish-1-live/demo-mobile-cold.png`; live `/?demo=1`. |
| F-1-7 | Rewrote the fact as “No account or server setup.” | `@claim:free-download provides the extension package without an account`; `.factory/copy-audit.md`; live `/`. |
| F-1-8 | Rewrote the kicker as “A per-tab volume guard.” | `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-1-live/home-mobile-cold.png`; live `/`. |
| F-1-9 | Rewrote the action result as “Hear a sample stay below your chosen volume limit.” | `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-1-live/home-mobile-cold.png`; live `/`. |
| F-1-10 | The untouched demo now says “The sample is ready. Play it to see the peak.” Reduction text appears only during playback. | `direct demo entry is isolated, resettable, and honest before playback`; live report `demo.initial.note`; screenshot: `.factory/qa-artifacts/polish-1-live/demo-mobile-cold.png`; live `/?demo=1`. |
| F-1-11 | Renamed the README section to “Try the demo” and made `/?demo=1` the primary URL. | README copy table in `.factory/copy-audit.md`; direct demo browser test; live `/?demo=1`. |
| F-1-12 | Split the README description into one sentence each for peak control, the meter, and mute. Moved 10 ms to a technical note. | README copy table in `.factory/copy-audit.md`; `@claim:look-ahead-limiter` and `@claim:live-meter`. |
| F-1-13 | Expanded MV3 to “Manifest V3.” | README copy table; unit package test verifies `manifest_version: 3`. |
| F-1-14 | Replaced “provenance” with “image’s source and generation notes.” | README copy table in `.factory/copy-audit.md`. |
| F-1-15 | Replaced “SPA fallback” with a plain description of known routes and security headers. | README copy table; `ships crawlable metadata, versioned immutable assets, and a real static 404 response`. |
| F-1-16 | Replaced the jargon-heavy sentence with “Loudness Lens needs no account.” The existing local-processing sentence remains separately testable. | `@claim:free-download`; `@claim:local-only`; README copy table. |
| F-1-17 | Made “external site” visible beside the Param Factory link on every route. | Live report `preview.external: true`; `every visible site control has a 44 px touch target`; screenshot: `.factory/qa-artifacts/polish-1-live/home-mobile-cold.png`; live footer. |

## Required paths and cross-cutting checks

- `/?demo=1` enters the isolated demo directly. Its banner, Reset demo, ZIP
  download, separate `demo:loudness-lens:v1` key, reset defaults, real-key
  sentinel, offline interaction, and discard behavior all passed locally and
  live.
- `.factory/claims.json` contains 16 unique claims. The policy test asserts
  exactly one tagged test per claim. Every exact command passed from fresh
  clone `/tmp/tmp.4dEHB8ODYh/clone` after `npm ci`.
- Live `/`, `/demo`, `/privacy`, `/terms`, and a missing route passed titles,
  descriptions, canonicals, one h1/main, `lang=en`, Axe, 390/195 px overflow,
  link crawl, and status checks. The missing route correctly returned 404,
  omitted its canonical, and set `noindex`.
- `npm test` passed 15 Vitest tests and 50 Playwright tests. Live Lighthouse:
  performance 100, accessibility 100, best practices 100, SEO 100; LCP 1.2 s,
  CLS 0, total blocking time 10 ms. Evidence:
  `.factory/qa-artifacts/polish-1-live/lighthouse.json`.
- `/opt/fleet/lib/verify-url.sh` passed the live root with no page or console
  errors. Evidence: `.factory/qa-artifacts/polish-1-live/verify.json`.

Result: all 17 findings are closed. No severity remains deferred.
