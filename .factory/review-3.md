# Adversarial first-read review 3 — FAIL

Reviewed 28 August 2026 for work order `loudness-lens-review-3`.

- Live URL: `https://loudness-lens.sociobot.in`
- Repository revision: `34e6f0b83025b552564e1adb89881070fb21f166`
- Fresh contexts: Chromium at 390 × 844 and 1440 × 900; 195 px viewport for
  the 200%-zoom reflow check
- Fresh test clone: `/tmp/loudness-lens-review-3.E0dekW/repo`
- Verdict: **FAIL — 1 blocking finding and 1 major finding.**

The cold first screen, isolated sample demo, accessibility checks, all 17
registered claim commands, and the full 52-test suite pass. The hero makes an
absolute, unlisted promise that the actual peak limiter cannot make, and the
installation section promises a toolbar location without telling a new Chrome
user how to put the extension there. PASS requires zero findings.

## Findings

### Blocking

#### F-3-1 — The hero promises steady volume for every tab, which is both unlisted and contradicted by the product boundary

**Location and exact quotes:** The landing `<h1>` says:

> “Keep every tab at a steady volume”

The document title says “Loudness Lens — keep browser volume steady,” and the
footer says “Keep each browser tab at a predictable listening level.” Later on
the same page the product says:

> “Some tabs cannot provide audio to Chrome extensions.”

**Why this blocks:** “Every” promises protected and otherwise uncapturable
tabs, which the product explicitly cannot guard. “Steady volume” describes
normalisation, while the implemented feature is a peak limiter: quiet passages
remain quiet and peaks are reduced. No entry in `.factory/claims.json` claims
or tests a steady/predictable level for every tab. `look-ahead-limiter`,
`tab-consent`, and `sample-limiter` prove narrower facts. A visitor expecting
mixed-media normalisation receives a different tool.

**Concrete fix:** Replace the title, hero, and footer with the actual job:

> “Limit sudden peaks in the tab you enable”

Use “Keep sudden peaks below your chosen limit” as the action result. Add a
`per-tab-peak-limit` claim with a harness test that enables a tab, sends a loud
fixture through the limiter, and asserts output is reduced to the selected
limit. Do not use “every,” “steady,” or “predictable” without a testable
all-supported-tab normalisation feature.

### Major

#### F-3-2 — The installation heading promises a toolbar placement but omits Chrome’s required pin step

**Location and exact quote:** The landing install heading says:

> “Put the guard beside your address bar”

The five visible steps end with:

> “Choose Load unpacked and select the extracted folder.”

**Why this is a finding:** Loading an unpacked Manifest V3 extension does not
pin its action beside Chrome’s address bar. The inspected live ZIP has an
`action.default_popup`, but Chrome requires the user to open the Extensions
menu and select its pin. A first-time installer following the complete list
finishes with Loudness Lens in the Extensions menu, not where the heading said
it would be. Existing archive and installation tests verify the package and the
five displayed steps, not this promised end state.

**Concrete fix:** Rename the section “Install the extension in Chrome,” or add
a sixth visible step: “Open the Extensions menu, then pin Loudness Lens to the
toolbar.” Add it to README and add a UI/documentation test that asserts the
step exists. If pinning is essential, show the same first-run prompt.

## Cold first read

### Mobile, 390 × 844, before scrolling

- **What it appears to do:** Keep every browser tab at a steady volume.
- **For whom:** People switching between videos, lessons, and music who want
  fewer sudden volume jumps.
- **What to click first:** **Try it with sample data**; the adjacent result says
  the sample will stay below the chosen limit.

All three answers, the primary action, and the three short facts are visible.
The first-screen shape passes, but the apparent job is overstated by F-3-1.

### Desktop, 1440 × 900, before scrolling

The same job statement, audience, action, result, and facts are visible. The
same unlisted absolute wording affects the desktop first read.

## Copy audit

Counts treat hyphenated terms, paths, URLs, and versions as one word. Commands,
names, navigation labels, headings, and buttons are included, so this records
all visitor-facing landing and README copy. No item exceeds 22 words. Other
than F-3-1 and F-3-2, no jargon, marketing adjective, inconsistent term,
unexplained heading, mood heading, or non-result-naming button was found.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Demo; How it works; Privacy; Download | 1; 3; 1; 1 | Pass |
| A per-tab volume guard | 4 | Pass |
| Keep every tab at a steady volume | 7 | F-3-1 |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | Pass |
| Try it with sample data | 6 | Pass |
| Hear a sample stay below your chosen volume limit. | 9 | `sample-limiter` |
| Audio never leaves your browser. | 5 | `local-only` |
| No account or server setup. | 5 | `free-download` |
| Free to use. | 3 | `free-download` |
| Plate I · peaks kept below the bell | 7 | Art caption |
| Peak-limit preview; See the peak before it surprises you | 2; 7 | Pass |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | `peak-limit-marker` |
| Specimen 01 · active tab; Live peak | 4; 2 | Pass |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Explicit example |
| Peak limit; Mute now | 2; 2 | Pass; `panic-mute` |
| Three steps; How it works | 2; 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | `tab-consent` |
| Set the peak limit; Watch the meter. | 4; 3 | Pass |
| Use Mute now if sound feels unsafe. | 7 | `panic-mute` |
| Limits and browser constraints; What the guard does not do | 4; 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | `tab-consent` |
| It does not capture background tabs by itself. | 8 | `tab-consent` |
| Some tabs cannot provide audio to Chrome extensions. | 8 | `capture-error` boundary |
| It cannot guarantee a safe listening level. | 7 | Limitation |
| Chrome extension · v1 | 3 | Pass |
| Put the guard beside your address bar | 7 | F-3-2 |
| Download the ZIP.; Extract the ZIP.; Open chrome://extensions. | 3; 3; 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | F-3-2 incomplete flow |
| Download Loudness Lens | 3 | Pass |
| Keep each browser tab at a predictable listening level. | 9 | F-3-1 |
| Terms | 1 | Pass |
| Built by Param Factory ↗ external site | 7 | Pass |
| v1.0.0 · Original generated botanical artwork | 5 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Keep each browser tab at a predictable listening level. | 9 | F-3-1 |
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
| Requirements; Node.js 20 or newer; npm 10 or newer | 1; 4; 4 | Prerequisites |
| Chrome 116 or newer | 4 | `minimum-chrome-version` |
| Develop; npm install; npm run dev; npm run dev:site | 1; 2; 3; 3 | Pass |
| Open `chrome://extensions`, turn on Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3` during development. | 14 | Pass |
| To install the published ZIP: | 5 | Pass |
| Download the ZIP.; Extract the ZIP.; Open `chrome://extensions`. | 3; 3; 2 | Pass |
| Turn on **Developer mode**. | 4 | Pass |
| Choose **Load unpacked** and select the extracted folder. | 8 | F-3-2 incomplete flow |
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

## Demo and sandbox verification

- A fresh mobile context reached `/?demo=1` from the first-screen action in one
  click. Its first screen already showed the named cooking-lesson sample, trim,
  peak limit, meter, mute, and **Play sample**.
- The persistent banner read **“Demo — sample data, nothing is saved”** and
  contained **Reset demo** plus **Download the extension ZIP**.
- Before playback, the meter said “The sample is ready. Play it to see the
  peak.” Playback advanced to `0.906` seconds, reported “Playing through the
  local limiter,” and showed `1.0 dB` limiter reduction.
- With a pre-seeded `real:sentinel`, changing all controls wrote only
  `demo:loudness-lens:v1`; the sentinel stayed `untouched`. Reset restored trim
  `0`, peak limit `-6`, and mute off.
- The exit/download action returned to `/`, removed the demo key, and produced
  `loudness-lens-chrome-1.0.0.zip`. It did not copy sample state to real data.
- The complete live request log used only `https://loudness-lens.sociobot.in`.

## Claims audit

After `npm ci` in the fresh clone, every exact command declared by
`.factory/claims.json` passed. `npm test` also passed, with 52 Playwright tests.
Per-claim logs are retained under `/tmp/loudness-lens-review-3-*.log`.

| Claim IDs | Exact command | Result |
| --- | --- | --- |
| local-only, sample-limiter, sample-timing, demo-isolation, demo-reset, demo-discard, free-download, peak-limit-marker | `npm run test:e2e -- --grep @claim:<id>` | PASS for every ID |
| tab-consent, panic-mute, look-ahead-limiter, live-meter, level-trim, capture-lifecycle, local-settings, capture-error, minimum-chrome-version | `npm run test:unit -- --testNamePattern @claim:<id>` | PASS for every ID |

F-3-1 is the remaining unlisted live/README promise. F-3-2 is an untested,
incomplete user instruction rather than a declared software claim.

## Earlier-review closure check

Every earlier review, polish file, and handoff was read. Each earlier finding
was checked again on the live site and in code/tests; none is regressed.

| Earlier finding | Confirmation | Status |
| --- | --- | --- |
| F-1-1 | Named wordmark, wrapped privacy address, 195 px reflow, and Axe pass. | Fixed |
| F-1-2 | Landing slider/mute update their displayed marker, state, and copy. | Fixed |
| F-1-3 | Download, extract, extensions, Developer mode, and Load unpacked are shown. | Fixed; F-3-2 finds the omitted pin step. |
| F-1-4 | How navigation updates history, focus, announcement, and scroll position. | Fixed |
| F-1-5 | Demo, Privacy, and Terms have separate description/OG/Twitter metadata. | Fixed |
| F-1-6 | Demo exit action now names the ZIP download result. | Fixed |
| F-1-7 | First-screen account fact is grammatical and concrete. | Fixed |
| F-1-8 | First-screen kicker names the per-tab guard. | Fixed |
| F-1-9 | Sample action result is concrete and test-backed. | Fixed |
| F-1-10 | Idle demo state is honest before playback. | Fixed |
| F-1-11 | README names and links the direct demo. | Fixed |
| F-1-12 | README uses short, single-purpose mechanism sentences. | Fixed |
| F-1-13 | README expands Manifest V3. | Fixed |
| F-1-14 | README uses plain image-source wording. | Fixed |
| F-1-15 | Routing/404 documentation is plain and deployed. | Fixed |
| F-1-16 | Unclear runtime-assets wording was removed. | Fixed |
| F-1-17 | Footer visibly marks Param Factory as an external site. | Fixed |
| F-2-1 | Chrome 116 has a registered manifest test. | Fixed |
| F-2-2 | Section kickers name content, not mood. | Fixed |

## Structure, routing, accessibility, and identity

- Live `/`, `/demo`, `/privacy`, `/terms`, `robots.txt`, and `sitemap.xml`
  return 200. A missing route returns the designed HTTP 404; the sitemap lists
  every public page.
- Normal routes have `lang="en"`, one `main`, one `h1`, a route-specific title,
  description, canonical, OG/Twitter data, favicon, Apple touch icon, and theme
  color. The 404 has `noindex` and no canonical.
- Fresh Axe 4.10.2 checks on live `/`, `/demo`, `/privacy`, `/terms`, and 404
  found zero serious or critical issues. The clean-clone suite checks 390 and
  195 px reflow on every route.
- Browser Back/deep links, route focus and live announcements, keyboard paths,
  and no-overflow checks are covered by the passing browser suite. Internal
  links, the download, and the declared Factory link returned 200; mail is
  explicit `mailto:`.
- The live CSP is self-only with response-header `frame-ancestors 'none'`; cold
  home loads had no console errors. The ZIP passed `unzip -t` and has Manifest
  V3 `action` plus `minimum_chrome_version: "116"`.
- The botanical plate, field-guide palette/rules, clipped specimen frames,
  serif/sans pairing, and restrained motion are product-specific, not a generic
  SaaS template. Provenance is recorded in `.factory/design.md`.

## Missed leverage

No AI, import/export, or sync feature is implied by this local per-tab peak
guard. Such a feature would be decorative; no provider key is embedded.

## What would make this perfect

1. Rewrite and test the core promise as per-tab peak limiting, not universal
   steady-volume normalisation.
2. Complete the Chrome install path with toolbar pinning, or stop promising it.
3. Re-run this whole review from a fresh context and return PASS only with no
   unlisted promise or incomplete instruction.
