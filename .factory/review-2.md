# Adversarial first-read review 2 — FAIL

Reviewed 28 August 2026 for work order `loudness-lens-review-2`.

- Live URL: `https://loudness-lens.sociobot.in`
- Repository revision: `d154d1f784b465588d790b8abcb5e7895217f444`
- Fresh contexts: Chromium at 390 × 844 and 1440 × 900; route/accessibility recheck at 390 × 844 and 195 × 844.
- Verdict: **FAIL — 2 minor findings.** There are no blocking findings, but the required PASS standard is zero findings and zero untested claims.

## Findings

### Minor

#### F-2-1 — The documented Chrome-version requirement is an unlisted claim

**Location and exact quote:** `README.md`, Requirements:

> “Chrome 116 or newer”

**Why this is a finding:** This is a compatibility promise a prospective installer can rely on. `wxt.config.ts` sets `minimum_chrome_version: '116'`, but `.factory/claims.json` has no `Chrome 116` claim and no corresponding `@claim:` test. The 16 declared claim commands all pass, but this README promise is outside that audited list.

**Concrete fix:** Add a `minimum-chrome-version` claim to `.factory/claims.json`, tied to the README, and an `@claim:minimum-chrome-version` unit test that builds the extension and asserts its manifest has `minimum_chrome_version === '116'`. Alternatively, remove the versioned compatibility promise from the README.

#### F-2-2 — Three decorative section labels make the content less scannable

**Locations and exact quotes:** Landing-page kickers above the preview, steps, and limits sections:

> “The control in one glance”

> “Three field notes”

> “Clear boundaries”

**Why this is a finding:** These labels use the botanical theme rather than naming their sections. A visitor scanning the page learns less than they would from labels such as “Peak-limit preview,” “Three steps,” and “Limits and browser constraints.” The adjacent semantic headings are useful, so this is minor, but the supplied plain-words standard says labels and headings must carry usable information rather than mood.

**Concrete fix:** Replace the three labels with “Peak-limit preview,” “Three steps,” and “Limits and browser constraints.” The botanical visual treatment can remain in the art, palette, and specimen framing.

## Cold first read

### Mobile, 390 × 844, before scrolling

- **What it does:** It keeps each browser tab at a steady volume.
- **For whom:** People switching among videos, lessons, and music who want fewer sudden volume jumps.
- **What to click first:** **Try it with sample data**. The nearby copy says the sample will stay below the chosen volume limit.

All three answers, the primary action, and the three facts (local audio, no account/server setup, free) are visible in the first screen. This gate passes.

### Desktop, 1440 × 900, before scrolling

The same job, audience, action, and three facts are visible without scrolling. This gate passes.

## Copy audit

Counts treat a hyphenated word, URL, path, or version as one word. Labels and headings are included with the sentences so the audit accounts for all visitor-facing landing and README copy. No audited unit exceeds 22 words. F-2-2 identifies the only plain-words issues found; F-2-1 is the only unlisted README claim.

### Landing page

| Copy | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Demo | 1 | Pass |
| How it works | 3 | Pass |
| Privacy | 1 | Pass |
| Download | 1 | Pass |
| A per-tab volume guard | 4 | Pass |
| Keep every tab at a steady volume | 7 | Pass |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | Pass |
| Try it with sample data | 6 | Pass |
| Hear a sample stay below your chosen volume limit. | 9 | Pass; covered by `sample-limiter` |
| Audio never leaves your browser. | 5 | Pass; covered by `local-only` |
| No account or server setup. | 5 | Pass; covered by `free-download` |
| Free to use. | 3 | Pass; covered by `free-download` |
| Plate I · peaks kept below the bell | 7 | Art caption; no product claim |
| The control in one glance | 5 | F-2-2 |
| See the peak before it surprises you | 7 | Pass |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | Pass; covered by `peak-limit-marker` |
| Specimen 01 · active tab | 4 | Pass |
| Live peak | 2 | Pass |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Pass; labelled example |
| Peak limit | 2 | Pass |
| Mute now | 2 | Pass |
| Three field notes | 3 | F-2-2 |
| How it works | 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | Pass; covered by `tab-consent` |
| Set the peak limit | 4 | Pass |
| Watch the meter. | 3 | Pass |
| Use Mute now if sound feels unsafe. | 7 | Pass |
| Clear boundaries | 2 | F-2-2 |
| What the guard does not do | 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | Pass; covered by `tab-consent` |
| It does not capture background tabs by itself. | 8 | Pass; covered by `tab-consent` |
| Some tabs cannot provide audio to Chrome extensions. | 8 | Pass; bounded by `capture-error` |
| It cannot guarantee a safe listening level. | 7 | Pass; limitation, not a promise |
| Chrome extension · v1 | 3 | Pass |
| Put the guard beside your address bar | 7 | Pass |
| Download the ZIP. | 3 | Pass |
| Extract the ZIP. | 3 | Pass |
| Open chrome://extensions. | 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Download Loudness Lens | 3 | Pass |
| Keep each browser tab at a predictable listening level. | 9 | Pass |
| Terms | 1 | Pass |
| Built by Param Factory ↗ external site | 7 | Pass |
| v1.0.0 · Original generated botanical artwork | 5 | Pass |

### README

| Copy | Words | Result |
| --- | ---: | --- |
| Loudness Lens | 2 | Pass |
| Keep each browser tab at a predictable listening level. | 9 | Pass |
| Loudness Lens is a free Chrome extension for mixed videos, lessons, and music. | 14 | Pass; `free-download` |
| It captures only the tab you enable. | 7 | Pass; `tab-consent` |
| The extension turns down sudden peaks before they play. | 8 | Pass; `look-ahead-limiter` |
| The meter shows the tab’s current level. | 7 | Pass; `live-meter` |
| Mute now silences that tab. | 5 | Pass; `panic-mute` |
| Audio is processed inside Chrome and stays in your browser. | 10 | Pass; `local-only` |
| Try the demo | 3 | Pass |
| Open `/?demo=1` on the site, or visit `http://localhost:5173/?demo=1` during local development. | 11 | Pass |
| The shipped 12-second lesson sample contains two volume jumps. | 9 | Pass; `sample-timing` |
| Demo settings use the separate `demo:loudness-lens:v1` storage key. | 7 | Pass; `demo-isolation` |
| Reset demo restores the defaults. | 5 | Pass; `demo-reset` |
| Leaving the demo discards its key. | 6 | Pass; `demo-discard` |
| Requirements | 1 | Pass |
| Node.js 20 or newer | 4 | Environment prerequisite |
| npm 10 or newer | 4 | Environment prerequisite |
| Chrome 116 or newer | 4 | F-2-1 |
| Develop | 1 | Pass |
| npm install | 2 | Command |
| npm run dev | 3 | Command |
| npm run dev:site | 3 | Command |
| Open `chrome://extensions`, turn on Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3` during development. | 14 | Pass |
| To install the published ZIP: | 5 | Pass |
| Download the ZIP. | 3 | Pass |
| Extract the ZIP. | 3 | Pass |
| Open `chrome://extensions`. | 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Test and build | 3 | Pass |
| npm test | 2 | Command |
| npm run build | 3 | Command |
| The exact production build command is `npm run build`. | 8 | Pass |
| It creates: | 2 | Pass |
| `dist/extension/chrome-mv3/` — unpacked Manifest V3 extension | 5 | Build output |
| `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive | 4 | Build output |
| `dist/site/index.html` — static site root | 5 | Build output |
| `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download | 5 | Build output |
| `npm run build:site` performs the same deploy build and also packages the extension download into `dist/site/`. | 14 | Pass |
| Claim tests are listed in `.factory/claims.json`. | 6 | Pass |
| The design file records each image’s source and generation notes. | 10 | Pass |
| The extension uses a 10 ms look-ahead window before it reduces a peak. | 13 | Pass; `look-ahead-limiter` |
| This implementation detail has a focused claim test. | 7 | Pass |
| Browser limits and privacy | 4 | Pass |
| Chrome can block capture on protected pages and internal browser pages. | 10 | Pass; boundary for `capture-error` |
| The extension shows a recovery error and leaves the guard off. | 10 | Pass; `capture-error` |
| Turning off, closing, or reloading a tab ends its capture. | 10 | Pass; `capture-lifecycle` |
| Loudness Lens needs no account. | 5 | Pass; `free-download` |
| See `/privacy` and `/terms` on the site. | 6 | Pass |
| Deploy | 1 | Pass |
| Deploy `dist/site/` as the static root. | 6 | Pass |
| The included configuration sends known app routes to the single-page app and adds security headers. | 15 | Pass |
| Factory infrastructure handles hosting and DNS. | 5 | Pass |
| License | 1 | Pass |
| MIT. | 1 | Pass |
| See [LICENSE](LICENSE). | 2 | Pass |

## Demo and sandbox verification

- The first-screen action reached `/?demo=1` in one click in a fresh 390 px context.
- The first demo screen already contained a named 12-second cooking-lesson sample, a visible peak-limit control, level trim, meter, and **Play sample** action.
- The persistent banner read **“Demo — sample data, nothing is saved”** and supplied **Reset demo** plus **Download the extension ZIP**.
- Playback advanced to 0.72 seconds and showed **“Playing through the local limiter.”** with 1.8 dB limiter reduction. This is a real local sample, not a static mockup.
- A fresh demo wrote only `localStorage["demo:loudness-lens:v1"]`; a pre-existing non-demo key remained unchanged. Reset returned trim to `0` and the peak limit to `−6`.
- The complete live demo request log contained only `https://loudness-lens.sociobot.in` requests. No analytics, external media, fonts, or scripts were requested.
- The product makes no offline claim. The local test suite nevertheless verifies loaded demo controls still work after the context goes offline.

## Claims audit

I made a clean clone at `d154d1f`, ran `npm ci` (293 packages, 0 vulnerabilities), then ran every exact command in `.factory/claims.json` separately. All 16 commands passed.

| Claim IDs | Exact command | Result |
| --- | --- | --- |
| `local-only`, `sample-limiter`, `sample-timing`, `demo-isolation`, `demo-reset`, `demo-discard`, `free-download`, `peak-limit-marker` | `npm run test:e2e -- --grep @claim:<id>` | PASS, Chromium and mobile projects |
| `tab-consent`, `panic-mute`, `look-ahead-limiter`, `live-meter`, `level-trim`, `capture-lifecycle`, `local-settings`, `capture-error` | `npm run test:unit -- --testNamePattern @claim:<id>` | PASS |

`npm test` also passed from that clone: production build, TypeScript, ESLint, 15 Vitest tests, and 50 Playwright tests. `dist/site/` and `dist/extension/` were produced. F-2-1 is the sole unlisted, therefore untested, claim-like statement found in the README or landing copy.

## Earlier-review closure check

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the existing handoff. Every earlier finding was checked again on the live site and in source/tests; none remains open.

| Earlier finding | Live/code confirmation | Status |
| --- | --- | --- |
| F-1-1 | Wordmark has `aria-label="Loudness Lens home"`; long privacy email wraps; Axe and overflow pass at 195 px on all checked routes. | Fixed |
| F-1-2 | Landing preview has active slider/mute listeners and `peak-limit-marker` browser claim test. | Fixed |
| F-1-3 | Landing and README provide ZIP extraction, Chrome extensions, Developer mode, and Load unpacked steps. | Fixed |
| F-1-4 | “How it works” is SPA-routed; live route changes focus/announce the h1 and then scroll to `#how`. | Fixed |
| F-1-5 | Demo, Privacy, and Terms set distinct description, OG, and Twitter descriptions. | Fixed |
| F-1-6 | Demo action is now “Download the extension ZIP.” | Fixed |
| F-1-7 | First-screen fact is “No account or server setup.” | Fixed |
| F-1-8 | First-screen kicker is “A per-tab volume guard.” | Fixed |
| F-1-9 | Action explanation says “stay below your chosen volume limit.” | Fixed |
| F-1-10 | Idle demo says “The sample is ready. Play it to see the peak.” | Fixed |
| F-1-11 | README says “Try the demo.” | Fixed |
| F-1-12 | README uses three short mechanism sentences. | Fixed |
| F-1-13 | README expands Manifest V3. | Fixed |
| F-1-14 | README names image source and generation notes. | Fixed |
| F-1-15 | README says “single-page app,” not SPA. | Fixed |
| F-1-16 | The unclear “third-party runtime assets” statement is removed. | Fixed |
| F-1-17 | Footer visibly says “external site” beside the factory link. | Fixed |

## Structure, routing, and visual identity

- The live root, `/demo`, `/privacy`, `/terms`, `robots.txt`, and `sitemap.xml` return 200. A missing route returns a designed HTTP 404 with a way home.
- All normal live routes have `lang="en"`, one `main`, one h1, a route-specific title, meta description, canonical, OG/Twitter metadata, favicon, and Apple touch icon. The 404 correctly has no canonical and uses `noindex`.
- At 390 and 195 px, Axe found zero serious/critical violations, no horizontal overflow, and no page/runtime errors on normal routes. The browser emits the expected failed-document-status console entry for the intentionally HTTP-404 response.
- Browser Back, deep links, header/footer navigation, focus movement, and route announcements are covered by the full passing browser suite. Internal links, the download, and the declared external Factory link all returned 200; the mail link is an explicit `mailto:` link.
- The field-guide palette, serif/sans pairing, clipped specimen frames, original botanical art, and restrained motion are clearly product-specific rather than a generic SaaS template. The design provenance is recorded in `.factory/design.md`.
- The brief does not imply a missing AI, import/export, or sync feature. A local per-tab audio guard does not gain a useful AI step; adding one would be decorative.

## What would make this perfect

1. Add and run the manifest-version claim test for “Chrome 116 or newer,” or remove that promise.
2. Replace the three theme-only kickers with the concrete section names in F-2-2.
3. Re-run this complete review from a clean clone and return PASS only if the copy/claim audit has no remaining entries.
