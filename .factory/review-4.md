# Adversarial first-read review 4 — FAIL

Reviewed 28 August 2026 for work order `loudness-lens-review-4`.

- Live URL: `https://loudness-lens.sociobot.in`
- Repository revision: `c9e2ff52ca4a83890a5a6ede2d5f497ee0e4daad`
- Fresh browser contexts: 390 × 844 mobile and 1440 × 900 desktop; a 195 px
  reflow check was also run on every route.
- Verdict: **FAIL — 3 minor findings.** Functional, claim, privacy, routing,
  and accessibility checks pass. The remaining visible copy does not meet the
  supplied plain-words rule that every heading names its section and that
  decorative labels carry information.

## Findings

### Minor

#### F-4-1 — The preview heading uses a mood phrase instead of naming the section

**Location and exact quote:** Landing page, peak-limit preview heading:

> “See the peak before it surprises you”

**Why this is a finding:** In a heading list this does not identify a
peak-limit preview. “Surprises you” is a mood/metaphor, not usable
information. The nearby kicker helps visually, but an `h2` must still make
sense on its own.

**Concrete fix:** Change the heading to **“Preview the selected peak limit”**
and add a copy test that rejects the old wording.

#### F-4-2 — The meter contains a decorative specimen number

**Location and exact quote:** Landing peak panel, above “Live peak”:

> “SPECIMEN 01 · ACTIVE TAB”

**Why this is a finding:** “SPECIMEN 01” is field-guide lore, not information
about the current control. It takes attention from the relevant state and
breaks the supplied rule against decorative labels.

**Concrete fix:** Replace the label with **“Active tab”**. Keep any botanical
styling in the frame and artwork, rather than in text a visitor has to parse.

#### F-4-3 — The designed 404 hides the error behind a field-guide metaphor

**Location and exact quote:** `/missing` h1:

> “This specimen is not in the guide”

**Why this is a finding:** A person following a bad link should immediately
hear “Page not found.” The current h1 requires them to decode the visual
theme; “Field note 404” does not state what happened either.

**Concrete fix:** Use **“Page not found”** as the h1 and remove the “Field
note 404” kicker. Keep the botanical mark as decorative artwork and retain
the existing return-home link.

## Cold first read

### Mobile, 390 × 844, before scrolling

- **What it does:** Limits sudden loud peaks in the browser tab a person
  enables.
- **For whom:** People moving between videos, lessons, and music who want
  fewer sudden volume jumps.
- **What to click first:** **Try it with sample data**. It says that the
  sample will keep sudden peaks below the chosen limit.

The headline, audience sentence, primary action, action result, and three
facts were all visible at scroll position zero. No first-read blocking finding
was observed.

### Desktop, 1440 × 900, before scrolling

The same job, audience, action, result, and three facts were visible before
scrolling. There were no console errors and all cold-load requests were to
`https://loudness-lens.sociobot.in`.

## Copy audit

Counts treat hyphenated terms, paths, URLs, commands, and version numbers as
one word. The table includes visible headings, labels, buttons, navigation,
and alt text as well as sentences. No unit exceeds 22 words and no banned
marketing adjective was found. The three flagged units are findings above.

### Landing page

| Copy unit | Words | Result |
| --- | ---: | --- |
| Skip to main content | 4 | Pass |
| Loudness Lens | 2 | Pass |
| Demo; How it works; Privacy; Download | 1; 3; 1; 1 | Pass |
| A per-tab peak limiter | 4 | Pass |
| Limit sudden peaks in the tab you enable | 8 | `per-tab-peak-limit` |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | Pass |
| Try it with sample data | 6 | Pass |
| Keep sudden peaks below your chosen limit. | 7 | `per-tab-peak-limit` |
| Audio never leaves your browser. | 5 | `local-only` |
| No account or server setup. | 5 | `free-download` |
| Free to use. | 3 | `free-download` |
| A pressed fern waveform sits beneath a protective glass bell. | 10 | Useful art alt text |
| Illustration of peak limiting. | 4 | Art caption |
| Peak-limit preview | 2 | Pass |
| See the peak before it surprises you | 7 | **F-4-1** |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | `peak-limit-marker` |
| SPECIMEN 01 · ACTIVE TAB | 4 | **F-4-2** |
| Live peak | 2 | `live-meter` |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Explicit example |
| Peak limit; Mute now | 2; 2 | Pass; `panic-mute` |
| Three steps; How it works | 2; 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | `tab-consent` |
| Set the peak limit; Watch the meter. | 4; 3 | Pass; `live-meter` |
| Use Mute now if sound feels unsafe. | 7 | `panic-mute` |
| Limits and browser constraints; What the guard does not do | 4; 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | `tab-consent` |
| It does not capture background tabs by itself. | 8 | `tab-consent` |
| Some tabs cannot provide audio to Chrome extensions. | 8 | `capture-error` boundary |
| It cannot guarantee a safe listening level. | 7 | Honest limitation |
| Chrome extension · v1 | 3 | Pass |
| Install the extension in Chrome | 5 | Pass |
| Download the ZIP.; Extract the ZIP.; Open chrome://extensions. | 3; 3; 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| Download Loudness Lens | 3 | `free-download` |
| Limit sudden peaks in the tab you enable. | 8 | `per-tab-peak-limit` |
| Terms | 1 | Pass |
| Built by Param Factory ↗ external site | 7 | Pass |
| v1.0.0 · Original generated botanical artwork | 5 | Provenance label |

### README

| Copy unit | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Limit sudden peaks in the tab you enable. | 8 | `per-tab-peak-limit` |
| Loudness Lens is a free Chrome extension for mixed videos, lessons, and music. | 14 | `free-download` |
| It captures only the tab you enable. | 7 | `tab-consent` |
| The extension turns down sudden peaks before they play. | 8 | `look-ahead-limiter` |
| The meter shows the tab’s current level. | 7 | `live-meter` |
| Mute now silences that tab. | 5 | `panic-mute` |
| Audio is processed inside Chrome and stays in your browser. | 10 | `local-only` |
| Try the demo | 3 | Pass |
| Open `/?demo=1` on the site, or visit `http://localhost:5173/?demo=1` during local development. | 11 | Pass |
| The shipped 12-second lesson sample contains two volume jumps. | 9 | `sample-timing` |
| Demo settings use the separate `demo:loudness-lens:v1` storage key. | 7 | `demo-isolation` |
| Reset demo restores the defaults. | 5 | `demo-reset` |
| Leaving the demo discards its key. | 6 | `demo-discard` |
| Requirements; Node.js 20 or newer; npm 10 or newer; Chrome 116 or newer | 1; 4; 4; 4 | Prerequisites; `minimum-chrome-version` |
| Develop; npm install; npm run dev; npm run dev:site | 1; 2; 3; 3 | Pass |
| Open `chrome://extensions`, turn on Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3` during development. | 14 | Pass |
| To install the published ZIP: | 5 | Pass |
| Download the ZIP.; Extract the ZIP.; Open `chrome://extensions`. | 3; 3; 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| Test and build; npm test; npm run build | 3; 2; 3 | Pass |
| The exact production build command is `npm run build`. | 8 | Pass |
| It creates: | 2 | Pass |
| `dist/extension/chrome-mv3/` — unpacked Manifest V3 extension | 5 | Build output |
| `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive | 4 | Build output |
| `dist/site/index.html` — static site root | 5 | Build output |
| `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download | 5 | Build output |
| `npm run build:site` performs the same deploy build and also packages the extension download into `dist/site/`. | 14 | Pass |
| Claim tests are listed in `.factory/claims.json`. | 6 | Pass |
| The design file records each image’s source and generation notes. | 10 | Pass |
| The extension uses a 10 ms look-ahead window before it reduces a peak. | 13 | `look-ahead-limiter` |
| This implementation detail has a focused claim test. | 7 | Pass |
| Browser limits and privacy | 4 | Pass |
| Chrome can block capture on protected pages and internal browser pages. | 10 | `capture-error` boundary |
| The extension shows a recovery error and leaves the guard off. | 10 | `capture-error` |
| Turning off, closing, or reloading a tab ends its capture. | 10 | `capture-lifecycle` |
| Loudness Lens needs no account. | 5 | `free-download` |
| See `/privacy` and `/terms` on the site. | 6 | Pass |
| Deploy; Deploy `dist/site/` as the static root. | 1; 6 | Pass |
| The included configuration sends known app routes to the single-page app and adds security headers. | 15 | Pass |
| Factory infrastructure handles hosting and DNS. | 5 | Pass |
| License; MIT.; See [LICENSE](LICENSE). | 1; 1; 2 | Pass |

Terminology remains consistent: **tab**, **peak limit**, **peak limiter**,
**level trim**, **meter**, **Mute now**, **demo**, and **ZIP** each keep one
meaning. No unlisted product claim was found on the live landing page or in
the README.

## Demo and sandbox verification

- A fresh 390 px context reached `/?demo=1` in one click from the first-screen
  action. The first resulting screen already showed a named 12-second cooking
  lesson, peak limit, level trim, meter, mute, and Play sample controls.
- The persistent banner was present: **“Demo — sample data, nothing is
  saved”**, with **Reset demo** and **Download the extension ZIP**.
- In the live browser, clicking **Play sample** advanced the shipped audio to
  1.224 seconds and changed the status to “Playing through the local limiter.”
- Changing controls wrote only `demo:loudness-lens:v1`. Reset restored trim
  `0`, limit `-6`, and mute off. The download/exit action returned home and
  left localStorage empty in the fresh context.
- The complete demo request log contained only the product origin. This
  confirms the `local-only` privacy claim. No offline claim is displayed;
  therefore no untested offline promise remains.

## Claims audit

I cloned the repository fresh to
`/tmp/loudness-lens-review-4.8HeRUS/repo`, ran `npm ci`, then ran every exact
command in `.factory/claims.json` independently. All 18 passed.

| Claim ID | Result |
| --- | --- |
| local-only | PASS |
| sample-limiter | PASS |
| sample-timing | PASS |
| demo-isolation | PASS |
| demo-reset | PASS |
| demo-discard | PASS |
| free-download | PASS |
| per-tab-peak-limit | PASS |
| peak-limit-marker | PASS |
| tab-consent | PASS |
| panic-mute | PASS |
| look-ahead-limiter | PASS |
| live-meter | PASS |
| level-trim | PASS |
| capture-lifecycle | PASS |
| local-settings | PASS |
| capture-error | PASS |
| minimum-chrome-version | PASS |

`npm test` also passed in that clone: production build, typecheck, ESLint, 18
Vitest tests, and 54 Playwright tests. Per-claim logs are in
`/tmp/loudness-lens-review-4-*.log`; Playwright records `status: "passed"`.

## Earlier-review closure check

Every earlier review, polish report, and handoff was read. The table confirms
each previous finding against the current live page and the corresponding
source/tests; none is merely marked fixed.

| Earlier finding | Current confirmation | Status |
| --- | --- | --- |
| F-1-1 | Named home link, wrapped privacy email, and no overflow at 195 px on all routes. | Fixed |
| F-1-2 | Landing slider, marker, mute state, and example text update in `setupPreview()`. | Fixed |
| F-1-3 | Landing and README give download, extract, extensions, Developer mode, Load unpacked, and pin steps. | Fixed |
| F-1-4 | `/demo` → How it works changes history, focuses/announces the home h1, and reaches `#how`; Back restores demo focus. | Fixed |
| F-1-5 | Demo, Privacy, and Terms have route-specific title, description, OG/Twitter description, and canonical. | Fixed |
| F-1-6 | Demo exit is visibly named “Download the extension ZIP” and clears demo state. | Fixed |
| F-1-7 | First-screen fact reads “No account or server setup.” | Fixed |
| F-1-8 | First-screen kicker now names a per-tab peak limiter. | Fixed |
| F-1-9 | Action result says what happens and is covered by `per-tab-peak-limit`. | Fixed |
| F-1-10 | Idle demo states “The sample is ready. Play it to see the peak.” | Fixed |
| F-1-11 | README and site consistently use “demo” and provide `/?demo=1`. | Fixed |
| F-1-12 | README mechanism description is split into short sentences. | Fixed |
| F-1-13 | README expands Manifest V3. | Fixed |
| F-1-14 | README uses plain image-source wording. | Fixed |
| F-1-15 | Routes, response headers, sitemap, robots, and HTTP 404 are present. | Fixed |
| F-1-16 | Local-processing/no-account wording remains concrete and claimed. | Fixed |
| F-1-17 | Footer visibly labels the Param Factory link as an external site. | Fixed |
| F-2-1 | Chrome 116 requirement has the `minimum-chrome-version` claim test. | Fixed |
| F-2-2 | Content section labels are now concrete; F-4-1/F-4-2 identify the remaining separate text violations. | Fixed, with new findings |
| F-3-1 | Hero, footer, metadata, README, and manifest now promise selected-tab peak limiting only. | Fixed |
| F-3-2 | Live installation flow and README include the toolbar-pin step. | Fixed |

## Structure, routing, accessibility, and identity

- Live `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, `sitemap.xml`, and
  the ZIP download returned 200. The external Factory link returned 200;
  email is an explicit `mailto:` link. `/missing` returned a designed HTTP
  404 with `noindex` and no canonical.
- Every normal route has `lang="en"`, exactly one `main`, one h1, a matching
  title, description, canonical, Open Graph/Twitter metadata, SVG favicon,
  and Apple touch icon. The titles follow the required product-and-purpose
  pattern.
- Live 195 px checks found `scrollWidth === innerWidth` and one h1/main on all
  five routes. A fresh live Axe scan at 390 px found zero serious or critical
  violations. The fresh-clone browser suite also passed all route, keyboard,
  touch-target, dark-theme, reduced-motion, and 195 px Axe/reflow checks.
- Deep links, Back, focus movement, and the live announcement work. The
  `#how` destination completed its smooth scroll after navigation; the new h1
  was focused and announced immediately.
- The botanical field-guide identity, original local art, clipped specimen
  frames, and restraint in motion are distinct from a generic SaaS template.
  Asset provenance is recorded in `.factory/design.md`.

## Missed leverage

No additional AI, import/export, or sync capability is implied by this
local-first selected-tab limiter. Adding one would not improve the stated job.
No AI feature or provider key is present.

## What would make this perfect

1. Replace the three flagged theme-first text fragments with the concrete
   rewrites above.
2. Add a copy-policy test covering the preview h2, meter label, and 404 h1.
3. Re-run this complete review in a fresh browser context. A PASS requires
   those checks to leave no findings at any severity.
