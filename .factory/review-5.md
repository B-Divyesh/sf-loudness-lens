# Adversarial first-read review 5 — PASS

Reviewed 28 August 2026 for work order `loudness-lens-review-5`.

- Live URL: `https://loudness-lens.sociobot.in`
- Repository revision: `3aec820665e555e47227454462fa034c02a79e88`
- Fresh browser contexts: Chromium at 390 × 844 and 1440 × 900, plus
  195 × 844 reflow checks on every route
- Fresh test clone: `/tmp/loudness-lens-review-5.WERSE4/repo`
- Verdict: **PASS — zero findings, zero untested claims**

## Findings

None. No blocking, major, or minor issue remains.

## Cold first read

### Mobile, 390 × 844, before scrolling

- **What it does:** Limits sudden loud peaks in the browser tab I choose.
- **For whom:** People moving among videos, lessons, and music who want fewer
  sudden volume jumps.
- **What I should click first:** **Try it with sample data**. The adjacent text
  says the sample will keep sudden peaks below my chosen limit.

The exact job headline, audience sentence, action, result, and all three facts
were fully visible at `scrollY = 0`. Their lower edges were 411, 525, 610, 677,
728, 760, and 792 px in the 844 px viewport. The first screen therefore passes.

### Desktop, 1440 × 900, before scrolling

The same three answers were visible at `scrollY = 0`, alongside the original
botanical limiter illustration. The last first-screen fact ended at 699 px.
The desktop first screen passes.

## Copy audit

Counts use whitespace-separated words; hyphenated terms, paths, URLs, and
versions count as one word. Separators such as an em dash do not count. The
tables include headings, labels, links, buttons, alt text, and list items as
well as prose sentences. No unit exceeds 22 words. No banned marketing word,
unexplained jargon, inconsistent product term, mood heading, empty slogan, or
non-result-naming button remains.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Loudness Lens | 2 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Download | 1 | Pass |
| A per-tab peak limiter | 4 | Pass |
| Limit sudden peaks in the tab you enable | 8 | Pass; `per-tab-peak-limit` |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | Pass |
| Try it with sample data | 5 | Pass |
| Keep sudden peaks below your chosen limit. | 7 | Pass; `per-tab-peak-limit` |
| Audio never leaves your browser. | 5 | Pass; `local-only` |
| No account or server setup. | 5 | Pass; `free-download` |
| Free to use. | 3 | Pass; `free-download` |
| A pressed fern waveform sits beneath a protective glass bell. | 10 | Pass; descriptive alt text |
| Illustration of peak limiting. | 4 | Pass |
| Peak-limit preview | 2 | Pass |
| Preview the selected peak limit | 5 | Pass |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | Pass; `peak-limit-marker` |
| Active tab | 2 | Pass |
| Live peak | 2 | Pass; `live-meter` |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Pass; explicitly an example |
| Peak limit | 2 | Pass |
| Mute now | 2 | Pass; result-naming verb, `panic-mute` |
| Three steps | 2 | Pass |
| How it works | 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | Pass; `tab-consent` |
| Set the peak limit | 4 | Pass |
| Watch the meter. | 3 | Pass; `live-meter` |
| Use Mute now if sound feels unsafe. | 7 | Pass; `panic-mute` |
| Limits and browser constraints | 4 | Pass |
| What the guard does not do | 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | Pass; `tab-consent` |
| It does not capture background tabs by itself. | 8 | Pass; `tab-consent` |
| Some tabs cannot provide audio to Chrome extensions. | 8 | Pass; honest `capture-error` boundary |
| It cannot guarantee a safe listening level. | 7 | Pass; limitation, not a promise |
| Chrome extension · v1 | 3 | Pass |
| Install the extension in Chrome | 5 | Pass |
| Download the ZIP. | 3 | Pass; `free-download` |
| Extract the ZIP. | 3 | Pass |
| Open chrome://extensions. | 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| Download Loudness Lens | 3 | Pass; result-naming verb, `free-download` |
| Limit sudden peaks in the tab you enable. | 8 | Pass; `per-tab-peak-limit` |
| Terms | 1 | Pass |
| Built by Param Factory ↗ external site | 6 | Pass; external destination is visible |
| v1.0.0 · Original generated botanical artwork | 5 | Pass; useful provenance |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Limit sudden peaks in the tab you enable. | 8 | Pass; `per-tab-peak-limit` |
| Loudness Lens is a free Chrome extension for mixed videos, lessons, and music. | 13 | Pass; `free-download` |
| It captures only the tab you enable. | 7 | Pass; `tab-consent` |
| The extension turns down sudden peaks before they play. | 9 | Pass; `look-ahead-limiter` |
| The meter shows the tab’s current level. | 7 | Pass; `live-meter` |
| Mute now silences that tab. | 5 | Pass; `panic-mute` |
| Audio is processed inside Chrome and stays in your browser. | 10 | Pass; `local-only` |
| Try the demo | 3 | Pass |
| Open `/?demo=1` on the site, or visit `http://localhost:5173/?demo=1` during local development. | 11 | Pass |
| The shipped 12-second lesson sample contains two volume jumps. | 9 | Pass; `sample-timing` |
| Demo settings use the separate `demo:loudness-lens:v1` storage key. | 8 | Pass; `demo-isolation` |
| Reset demo restores the defaults. | 5 | Pass; `demo-reset` |
| Leaving the demo discards its key. | 6 | Pass; `demo-discard` |
| Requirements | 1 | Pass |
| Node.js 20 or newer | 4 | Pass; build prerequisite |
| npm 10 or newer | 4 | Pass; build prerequisite |
| Chrome 116 or newer | 4 | Pass; `minimum-chrome-version` |
| Develop | 1 | Pass |
| `npm install` | 2 | Pass; command |
| `npm run dev` | 3 | Pass; command |
| `npm run dev:site` | 3 | Pass; command |
| Open `chrome://extensions`, turn on Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3` during development. | 14 | Pass |
| To install the published ZIP: | 5 | Pass |
| Download the ZIP. | 3 | Pass |
| Extract the ZIP. | 3 | Pass |
| Open `chrome://extensions`. | 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| Test and build | 3 | Pass |
| `npm test` | 2 | Pass; command |
| `npm run build` | 3 | Pass; command |
| The exact production build command is `npm run build`. | 9 | Pass; verified in the clean clone |
| It creates: | 2 | Pass |
| `dist/extension/chrome-mv3/` — unpacked Manifest V3 extension | 5 | Pass; verified output |
| `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive | 3 | Pass; verified output |
| `dist/site/index.html` — static site root | 4 | Pass; verified output |
| `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download | 4 | Pass; verified output |
| `npm run build:site` performs the same deploy build and also packages the extension download into `dist/site/`. | 16 | Pass; verified in the build chain |
| Claim tests are listed in `.factory/claims.json`. | 6 | Pass |
| The design file records each image’s source and generation notes. | 10 | Pass |
| The extension uses a 10 ms look-ahead window before it reduces a peak. | 13 | Pass; `look-ahead-limiter` |
| This implementation detail has a focused claim test. | 8 | Pass |
| Browser limits and privacy | 4 | Pass |
| Chrome can block capture on protected pages and internal browser pages. | 11 | Pass; honest `capture-error` boundary |
| The extension shows a recovery error and leaves the guard off. | 11 | Pass; `capture-error` |
| Turning off, closing, or reloading a tab ends its capture. | 10 | Pass; `capture-lifecycle` |
| Loudness Lens needs no account. | 5 | Pass; `free-download` |
| See `/privacy` and `/terms` on the site. | 7 | Pass |
| Deploy | 1 | Pass |
| Deploy `dist/site/` as the static root. | 6 | Pass |
| The included configuration sends known app routes to the single-page app and adds security headers. | 15 | Pass; verified build configuration |
| Factory infrastructure handles hosting and DNS. | 6 | Pass; deployment instruction |
| License | 1 | Pass |
| MIT. | 1 | Pass; matches `LICENSE` |
| See `LICENSE`. | 2 | Pass |

The Node and npm lines are development prerequisites, not visitor-facing
product behavior promises. The clean build used npm 10.9.8 on Node 22.23.2;
the customer-facing Chrome minimum is separately registered and tested.

### Terminology

| Concept | Term used consistently |
| --- | --- |
| Per-tab safety control | guard |
| Peak-reduction processor | peak limiter |
| Maximum allowed peak | peak limit |
| Gain before limiting | level trim |
| Immediate silence control | Mute now |
| Visual level display | meter |
| Isolated try-out | demo |
| Captured browser page | tab |
| Downloaded package | ZIP |

## Demo and sandbox verification

- The first-screen action entered `/?demo=1` in one click in a fresh 390 px
  context. The resulting screen immediately named a realistic **Sample cooking
  lesson · 12 seconds**, explained its quiet instruction and two peaks, and
  showed the ready **Play sample** control and audio controls.
- The persistent banner read **Demo — sample data, nothing is saved** and
  contained **Reset demo** and **Download the extension ZIP**.
- Playback advanced to 0.32 seconds, reported **Playing through the local
  limiter**, and showed **Limiter reduced 6.2 dB.**
- A pre-seeded real key, `loudness-lens:real = untouched`, remained unchanged.
  Control changes wrote only `demo:loudness-lens:v1`.
- Reset restored level trim `0`, peak limit `−6`, and mute off. Leaving for
  `/#how` removed the demo key. Re-entering with Back loaded fresh defaults.
- After the initial load, offline mode still allowed changing the limit and
  updated the readout to `−14 dB`.
- The full live flow requested only `https://loudness-lens.sociobot.in`. No
  analytics, external scripts, external fonts, media, or API calls appeared.

## Claims audit

I cloned revision `3aec820` without shared hard links, ran `npm ci`, then ran
each exact command from `.factory/claims.json` independently. All 18 passed.

| Claim ID | Exact test result |
| --- | --- |
| `local-only` | PASS |
| `sample-limiter` | PASS |
| `sample-timing` | PASS |
| `demo-isolation` | PASS |
| `demo-reset` | PASS |
| `demo-discard` | PASS |
| `free-download` | PASS |
| `per-tab-peak-limit` | PASS |
| `peak-limit-marker` | PASS |
| `tab-consent` | PASS |
| `panic-mute` | PASS |
| `look-ahead-limiter` | PASS |
| `live-meter` | PASS |
| `level-trim` | PASS |
| `capture-lifecycle` | PASS |
| `local-settings` | PASS |
| `capture-error` | PASS |
| `minimum-chrome-version` | PASS |

The full clean-clone `npm test` also passed: the production build, TypeScript,
ESLint, 19 Vitest tests, and 56 Playwright tests. The build produced both
`dist/site/` and `dist/extension/`. The live HTML and extension ZIP match the
clean build byte for byte; the ZIP SHA-256 is
`350e06624579f53701258feb8534aed9c4f8d98c900b5dc1599948183050c52a`.

Every claim-like sentence on the landing, Privacy, Terms, and README pages is
either a registered product claim, a directly verified build/documentation
fact, or an explicit limitation. No unlisted product claim remains.

## Earlier-finding regression check

Every earlier review and polish report was read. Each finding was checked on
the current live site and in current source/tests, not accepted from its prior
status label.

| Earlier finding | Current live and code confirmation | Status |
| --- | --- | --- |
| F-1-1 | Named home link, wrapping legal address, Axe, and 390/195 px reflow pass on all five routes. | Fixed |
| F-1-2 | Landing slider updates its readout/marker; mute and restore update state and text. | Fixed |
| F-1-3 | Six install steps cover download, extraction, Chrome settings, loading, and pinning; the live ZIP is valid. | Fixed |
| F-1-4 | Demo-to-How navigation uses History API, announces/focuses the new h1, scrolls to `#how`, and Back restores demo focus. | Fixed |
| F-1-5 | Every route has its own title, description, Open Graph/Twitter description, and canonical. | Fixed |
| F-1-6 | Demo exit says **Download the extension ZIP** and discards demo state. | Fixed |
| F-1-7 | First-screen fact says **No account or server setup.** | Fixed |
| F-1-8 | First-screen label says **A per-tab peak limiter**. | Fixed |
| F-1-9 | Action result says **Keep sudden peaks below your chosen limit.** | Fixed |
| F-1-10 | Idle demo says the sample is ready and asks the user to play it; reduction appears only during playback. | Fixed |
| F-1-11 | Site and README consistently call it a demo and use the direct `/?demo=1` URL. | Fixed |
| F-1-12 | README uses separate plain sentences for peak reduction, meter, and mute. | Fixed |
| F-1-13 | README expands **Manifest V3**. | Fixed |
| F-1-14 | README names image source and generation notes plainly; source assets and prompt sidecars exist. | Fixed |
| F-1-15 | Real routes, response security headers, sitemap, robots, and a designed HTTP 404 are deployed. | Fixed |
| F-1-16 | Local-processing and no-account wording is concrete and test-backed. | Fixed |
| F-1-17 | The footer visibly labels Param Factory as an external site. | Fixed |
| F-2-1 | Chrome 116 is registered as `minimum-chrome-version` and matches the built/live manifest. | Fixed |
| F-2-2 | Section labels are **Peak-limit preview**, **Three steps**, and **Limits and browser constraints**. | Fixed |
| F-3-1 | Hero, metadata, footer, README, manifest, and popup promise selected-tab peak limiting, not normalisation. | Fixed |
| F-3-2 | Landing and README include the toolbar pinning step. | Fixed |
| F-4-1 | Preview h2 is **Preview the selected peak limit**. | Fixed |
| F-4-2 | Meter label is **Active tab**; the specimen number is absent. | Fixed |
| F-4-3 | Client and static 404 pages use **Page not found** with no field-guide error lore. | Fixed |

## Structure, routing, accessibility, and identity

- `/`, `/demo`, `/privacy`, and `/terms` returned 200. The tested missing URL
  returned a designed 404 with `noindex`, no canonical, and a way home.
- Every route has `lang="en"`, one `main`, one h1, correct heading order,
  route-specific metadata, favicon, 180 × 180 Apple icon, and a 1200 × 630 OG
  image. Title and description lengths stay within the required limits.
- The complete HTTP link set returned 200; the privacy email is an explicit
  `mailto:` link. Header and footer structure is consistent on every route.
- Deep links, route focus, the live announcement, browser Back, keyboard
  activation, 44 px targets, dark mode, reduced motion, and 200% mobile reflow
  pass in the clean browser suite.
- Fresh live Axe scans found zero serious or critical issues at 390 and 195 px
  on all five routes. No route overflowed. The live verifier found no page or
  console errors and confirmed title, language, h1, main, alt text, and button
  names.
- Response headers carry the self-only CSP and `frame-ancestors 'none'`.
  Initial site JavaScript is 6.5 KB gzip, below the 150 KB requirement.
- The warm-paper palette, engraved botanical art, clipped specimen frames,
  serif/sans pairing, measurement ticks, and restrained meter motion are
  specific to this peak-limiter product. They do not use a generic SaaS hero
  or feature-card template. Original-art provenance is present in
  `.factory/design.md` and `assets/src/`.

## Missed leverage

The brief calls for a visible local guard on one browser tab. An AI feature,
sync, or import/export flow would not remove a step from that job. No such
missing feature is implied, and no decorative AI or provider key is present.

## What would make this perfect

Nothing actionable remains from this review. The first read, sample demo,
real installation path, claims, sandbox isolation, copy, accessibility,
routing, privacy, documentation, and visual identity all meet the supplied
contract.
