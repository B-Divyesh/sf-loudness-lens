# Polish round 2 — cumulative finding closure

Repaired from review commit `6b5ba1e41325c091f51b0471e052290476f777be`.
Product repair commit: `6f70d404c7c392b621c9fed74d9c864957713c6a`.
Deployment ID: `a457ee7e-c3dc-4ad5-8dc1-da0b544a2919`.

| Finding | Change made | Evidence |
| --- | --- | --- |
| F-1-1 | Retained the named wordmark, wrapping legal links, and 195 px reflow fix on every route. | `page structure and accessibility: <route>` runs Axe and overflow checks at 390 and 195 px. Live matrix: `.factory/qa-artifacts/polish-2-live/review.json`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live `/privacy` and all other routes pass. |
| F-1-2 | Retained the working landing preview: peak-limit changes update the readout and marker; mute and restore update state and copy. | `@claim:peak-limit-marker updates the landing marker and mute state`; live report `findings.F-1-2`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live `/` reports `−12 dB`, `limit-12`, and pressed mute. |
| F-1-3 | Retained the complete five-step ZIP installation flow and installable archive root. | `the live download is paired with complete Chrome installation steps` and `packages an installable extension folder at the ZIP root`; live report `findings.F-1-3`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live ZIP is 50,455 bytes with root `manifest.json`. |
| F-1-4 | Retained History API navigation, h1 focus and announcement, then scroll to the requested section. | `How it works navigation focuses, announces, and scrolls to the home content`; live report `findings.F-1-4`; screenshot: `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`; live `/#how` focused the h1, announced it, and placed `#how` at 0 px. |
| F-1-5 | Retained exact route descriptions across meta, Open Graph, and Twitter metadata. | `each route sets exact page and sharing metadata`; live route matrix in `.factory/qa-artifacts/polish-2-live/review.json`; screenshot: `.factory/qa-artifacts/polish-2-live/screenshot-desktop.png`; live `/demo`, `/privacy`, and `/terms` expose distinct descriptions. |
| F-1-6 | Retained the result-naming “Download the extension ZIP” demo action and discard behavior. | `@claim:demo-discard clears settings on browser history and direct navigation`; screenshot: `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`; live `/?demo=1` shows the action in the persistent banner. |
| F-1-7 | Retained “No account or server setup.” | `@claim:free-download provides the extension package without an account`; `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live first screen confirmed. |
| F-1-8 | Retained the concrete first-screen label “A per-tab volume guard.” | `landing section labels describe the content in plain words`; `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live `/` confirmed. |
| F-1-9 | Retained the plain action result “Hear a sample stay below your chosen volume limit.” | `@claim:sample-limiter plays the shipped sample through the limiter`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live `/` and `/?demo=1` confirmed. |
| F-1-10 | Retained honest idle demo copy, with reduction copy appearing only after playback. | `direct demo entry is isolated, resettable, and honest before playback`; live report `demo.initialNote` and `demo.playing`; screenshot: `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`; live `/?demo=1` confirmed. |
| F-1-11 | Retained “Try the demo” and the direct `/?demo=1` README path. | `direct demo entry is isolated, resettable, and honest before playback`; `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`; live `/?demo=1` returned 200. |
| F-1-12 | Retained the three short README mechanism sentences and separately tested 10 ms detail. | `@claim:look-ahead-limiter delays audio by 10 ms before applying gain reduction` and `@claim:live-meter measures a captured peak and reports limiter reduction`; `.factory/copy-audit.md`; live demo screenshot: `.factory/qa-artifacts/polish-2-live/demo-mobile-cold.png`. |
| F-1-13 | Retained the expanded “Manifest V3” term. | `packages an installable extension folder at the ZIP root`; `.factory/copy-audit.md`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live ZIP manifest reports version 3. |
| F-1-14 | Retained “image’s source and generation notes” in README. | README table in `.factory/copy-audit.md`; visual source remains recorded in `.factory/design.md`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live footer discloses original generated artwork. |
| F-1-15 | Retained the plain single-page routing description and valid static 404 configuration. | `ships crawlable metadata, versioned immutable assets, and a real static 404 response`; live report `/missing`; screenshot: `.factory/qa-artifacts/polish-2-live/screenshot-desktop.png`; live missing URL returned HTTP 404 with `noindex` and no canonical. |
| F-1-16 | Retained the concrete no-account and local-processing wording. | `@claim:local-only keeps the complete demo flow on the same origin` and `@claim:free-download provides the extension package without an account`; live report `demo.requestOrigins`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live flow contacted only the product origin. |
| F-1-17 | Retained the visible “external site” label and full-size footer target. | `every visible site control has a 44 px touch target`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live footer visibly reads “Built by Param Factory ↗ external site.” |
| F-2-1 | Added `minimum-chrome-version` to `.factory/claims.json` and a focused test that reads the production manifest. | `@claim:minimum-chrome-version declares Chrome 116 in the built extension manifest`; clean-claim summary: `.factory/qa-artifacts/polish-2-local/claims-clean.txt`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; the live ZIP reports `minimum_chrome_version: "116"`. |
| F-2-2 | Replaced three decorative labels with “Peak-limit preview,” “Three steps,” and “Limits and browser constraints.” | `landing section labels describe the content in plain words`; live report `findings.F-2-2`; screenshot: `.factory/qa-artifacts/polish-2-live/home-mobile-cold.png`; live `/` contains all three labels and none of the old wording. |

## Complete acceptance evidence

- A fresh clone at `6f70d404c7c392b621c9fed74d9c864957713c6a`
  passed `npm ci`, all 17 exact claim commands, and `npm test`.
- `npm test` passed the production build, typecheck, lint, 16 Vitest tests,
  and 52 Playwright tests across desktop and mobile. The browser suite includes
  demo privacy, offline interaction, route focus, keyboard, 44 px targets,
  dark mode, Axe, and 195 px reflow checks.
- `/opt/fleet/lib/verify-url.sh` passed the deployed root with zero page or
  console errors. Evidence: `.factory/qa-artifacts/polish-2-live/verify.json`.
- Live Lighthouse scored performance 100, accessibility 100, best practices
  100, and SEO 100. LCP was 0.4 s, CLS 0, and blocking time 0 ms. Evidence:
  `.factory/qa-artifacts/polish-2-live/lighthouse.json`.
- Live `/`, `/demo`, `/privacy`, `/terms`, and the HTTP 404 passed exact title,
  description, canonical, h1/main, Axe, console, and overflow checks at 390 and
  195 px. Evidence: `.factory/qa-artifacts/polish-2-live/review.json`.

Result: all 19 cumulative findings are closed. No severity or follow-up item is
deferred.
