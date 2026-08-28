# Adversarial first-read review 1 — FAIL

Reviewed 28 August 2026 for work order `loudness-lens-review-1`.

- Live URL: `https://loudness-lens.sociobot.in`
- Repository base: `a4231b5805014c748da15cdac470ee57d5b5fccf`
- Viewports: 390 × 844, 1440 × 900, and 195 × 844 (the required
  390 px mobile viewport at 200% zoom)
- Verdict: **FAIL — 3 blocking, 2 major, and 12 minor findings**

The first screen and isolated demo are clear. All 15 declared claim commands
and the full repository suite pass. The product still fails because visible
landing controls do nothing, the real installation instructions omit required
steps, and the 200%-zoom layout has a serious accessibility violation plus
horizontal overflow.

## Findings

### Blocking

#### F-1-1 — The 200%-zoom accessibility repair is incomplete

**Location and evidence:** On every live route at 195 CSS px, the header link
is:

> `<a class="wordmark" href="/"><img ... alt=""><span>Loudness Lens</span></a>`

`site/src/style.css` hides `.wordmark span` below 280 px. The image is
decorative, so the remaining focusable link has no accessible name. Axe 4.10.2
reports serious `link-name` on `/`, `/demo`, `/privacy`, `/terms`, and the 404.
The live `/privacy` page also reports `scrollWidth: 198` at `innerWidth: 195`;
the unbreakable `privacy@sociobot.in` link extends to x=198.

The prior handoff says the site has no overflow at both 390 and 195 CSS px.
That repair is not complete. The current test runs Axe at 390 px, then narrows
the viewport without running Axe again; it checks 195 px overflow only on
`/demo`.

**Why this blocks:** At the required 200% zoom, the home link loses its name on
every route and the privacy page requires horizontal panning. This fails the
non-negotiable accessibility baseline and regresses a handoff item marked
fixed.

**Concrete fix:** Give `.wordmark` a persistent accessible name, such as
`aria-label="Loudness Lens home"`, and allow long prose links to wrap with
`overflow-wrap: anywhere`. At 195 px, run Axe and the scroll-width assertion on
every route after resizing, not only before resizing or only on `/demo`.

#### F-1-2 — The landing preview presents dead controls and a false, unlisted claim

**Location and quote:** Landing section “See the peak before it surprises you”:

> “The meter shows this tab’s level. The red mark shows your chosen limit.”

The panel contains a focusable **Peak limit** slider and **Mute now** button.
On the live page, changing the slider from `-6` to `-18` leaves the readout at
`−6 dB` and the marker class at `limit-6`. Clicking **Mute now** leaves its
label and state unchanged. `home()` renders `meterMarkup()` but only
`setupDemo()` attaches those listeners. The red-marker sentence also has no
entry or test in `.factory/claims.json`.

**Why this blocks:** The standard skeleton calls this “the product itself or a
live preview.” A first-time visitor receives interactive controls that silently
fail. The adjacent sentence promises an observable result that neither occurs
nor has a claim test.

**Concrete fix:** Either make this a clearly labelled, non-interactive preview
with no focusable form controls, or wire it to a real local sample. If it stays
interactive, add a `peak-limit-marker` claim and an end-to-end test that moves
the control, checks the numeric readout and marker position, and verifies mute
and restore state.

#### F-1-3 — The installation instructions do not complete the real job

**Location and quote:** Landing install section:

> “Download the package, open Chrome extensions, and load the unpacked folder.”

The live action downloads a 50,455-byte ZIP whose 14 extension files are at the
archive root. Chrome's **Load unpacked** picker cannot load the ZIP. The page
does not tell a first-time user to extract it, open `chrome://extensions`, turn
on Developer mode, or select the extracted folder.

**Why this blocks:** The demo is usable, but following the only production
installation instructions does not get a normal user to a working extension.
That fails the end-to-end job-to-be-done.

**Concrete fix:** Replace the sentence with a numbered flow: “Download the
ZIP. Extract it. Open `chrome://extensions`. Turn on Developer mode. Choose
Load unpacked and select the extracted folder.” Add a browser-level or
documented manual acceptance check that starts from the live download and ends
with the popup controlling a normal audio tab.

### Major

#### F-1-4 — “How it works” bypasses route focus handling

**Location and evidence:** The shared header renders
`<a href="/#how">How it works</a>` without `data-link`. From live `/demo`, the
link performs a full navigation to `/#how`; the page scrolls to the section,
but focus remains on `BODY`. By contrast, the routed Privacy link focuses its
new `h1`, and browser Back focuses the restored home `h1`.

**Why this matters:** Keyboard and screen-reader users are not told that the
route changed, contrary to the route-focus contract.

**Concrete fix:** Route this link through the same navigation handler, focus
and announce the home `h1`, then scroll to `#how`. Add an end-to-end test from
`/demo` that asserts the URL, announcement/focus, and final section position.

#### F-1-5 — Non-home routes reuse the landing-page description

**Location and quote:** `/demo`, `/privacy`, and `/terms` all expose:

> “Guard one browser tab from sudden volume peaks with a visible local limiter and panic mute.”

Titles, canonicals, and OG titles update, but the meta, Open Graph, and Twitter
descriptions do not. In particular, Privacy and Terms search/share snippets do
not describe those pages.

**Concrete fix:** Store a plain description on each route and update
`description`, `og:description`, and `twitter:description` alongside the title
and canonical. Test the exact values for every route.

### Minor copy and structure findings

#### F-1-6 — “Start for real” does not name its result

**Location and quote:** Demo banner action:

> “Start for real”

It downloads an extension ZIP, clears the demo key, and leaves the demo page
visible. The label does not say that the result is a download.

**Concrete fix:** Use “Start for real — download extension” or “Download the
extension ZIP,” while retaining the demo-exit explanation beside it.

#### F-1-7 — The account fact is grammatically ambiguous

**Location and quote:** Landing first-screen fact:

> “No account or setup server.”

“Setup server” reads as an undefined kind of server rather than “server
setup.”

**Concrete rewrite:** “No account or server setup.”

#### F-1-8 — The first-screen kicker uses an unexplained metaphor

**Location and quote:** Landing first screen:

> “A field control for browser sound”

“Field control” supports the art direction but does not name a familiar audio
control.

**Concrete rewrite:** “A per-tab volume guard.”

#### F-1-9 — The first action's outcome uses unexplained audio jargon

**Location and quote:** Beside **Try it with sample data**:

> “Hear a local sample pass through the limiter.”

“Limiter” is not explained before this line.

**Concrete rewrite:** “Hear a sample stay below your chosen volume limit.”

#### F-1-10 — The untouched demo reports an event as approaching while paused

**Location and quotes:** The first demo screen simultaneously says:

> “Ready at the quiet section.”

> “A loud moment is approaching the −6 dB limit.”

No audio or timeline is advancing yet.

**Concrete fix:** Before playback, use “The sample is ready. Play it to see the
peak.” Set the approaching/reduction message only from playback state.

#### F-1-11 — README changes “demo” to “sandbox”

**Location and quote:** README heading:

> “Try the sandbox”

The site, URL, banner, and documentation otherwise call this the demo.

**Concrete rewrite:** “Try the demo.”

#### F-1-12 — README combines three mechanisms in one jargon-heavy sentence

**Location and quote:** README introduction:

> “A 10 ms look-ahead limiter reduces peaks, the live meter shows the result, and Mute now cuts the captured output.”

The sentence has 20 words, but it carries three ideas and assumes the reader
understands “look-ahead limiter” and “captured output.”

**Concrete rewrite:** “The extension turns down sudden peaks before they play.
The meter shows the tab’s current level. Mute now silences that tab.” Keep the
10 ms implementation detail in a later technical note.

#### F-1-13 — README uses “MV3” without expanding it

**Location and quote:** Build output list:

> “unpacked MV3 extension”

**Concrete rewrite:** “unpacked Manifest V3 extension.”

#### F-1-14 — README uses “provenance” where plain words suffice

**Location and quote:** README test/build section:

> “Design and image provenance are in `.factory/design.md`.”

**Concrete rewrite:** “The design file records each image’s source and
generation notes.”

#### F-1-15 — README uses the unexplained abbreviation “SPA”

**Location and quote:** README deploy section:

> “The included `staticwebapp.config.json` supplies SPA fallback and security headers.”

**Concrete rewrite:** “The included configuration sends unknown app routes to
the single-page app and adds security headers.”

#### F-1-16 — README uses “third-party runtime assets” instead of naming the behavior

**Location and quote:** README privacy section:

> “Loudness Lens has no account or third-party runtime assets.”

**Concrete rewrite:** “Loudness Lens needs no account. The extension and site
load no files from other companies.” If the second sentence remains, list and
test it as a separate privacy claim.

#### F-1-17 — The external-site notice is hidden from sighted users

**Location and quote:** Footer link:

> “Built by Param Factory”

Only a screen-reader-only span says “external site.” The site-structure rule
requires external links to say so, not only in one presentation mode.

**Concrete fix:** Show a visible “external site” label or a conventional
external-link icon with an accessible text equivalent.

## Cold first read

### Mobile, 390 × 844, before scrolling

- **What it does:** It keeps the volume of each browser tab steady and shows a
  peak limit.
- **For whom:** People moving among videos, lessons, and music who want fewer
  sudden volume jumps.
- **What to click first:** **Try it with sample data**. The adjacent line says
  that a local sample will pass through the limiter.

All three answers are visible in the first screen. The three short facts are
also visible. This gate passes.

### Desktop, 1440 × 900, before scrolling

The same three answers, action, and facts are visible without scrolling. This
gate passes.

## Copy audit

Counts treat a whitespace-separated hyphenated term, path, URL, number, or
version as one word. Headings, labels, navigation, and buttons are included so
that every landing-page copy unit is accounted for. No item exceeds 22 words,
and no banned marketing adjective appears. Flags refer to findings above.

### Landing page

| Copy | Words | Flag |
| --- | ---: | --- |
| Loudness Lens | 2 | — |
| Demo | 1 | — |
| How it works | 3 | — |
| Privacy | 1 | — |
| Download | 1 | — |
| A field control for browser sound | 6 | F-1-8: unexplained metaphor |
| Keep every tab at a steady volume | 7 | — |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | — |
| Try it with sample data | 6 | — |
| Hear a local sample pass through the limiter. | 9 | F-1-9: jargon |
| Audio never leaves your browser. | 5 | — |
| No account or setup server. | 5 | F-1-7: ambiguous wording |
| Free to use. | 3 | — |
| Plate I · peaks kept below the bell | 7 | — |
| The control in one glance | 5 | — |
| See the peak before it surprises you | 7 | — |
| The meter shows this tab’s level. | 6 | F-1-2: inert preview |
| The red mark shows your chosen limit. | 7 | F-1-2: false and unlisted claim |
| Specimen 01 · active tab | 4 | — |
| Live peak | 2 | — |
| A loud moment is approaching the −6 dB limit. | 9 | — on landing; see F-1-10 on paused demo |
| Peak limit | 2 | F-1-2: inert preview control |
| Mute now | 2 | F-1-2: inert preview control |
| Three field notes | 3 | — |
| How it works | 3 | — |
| Open the tab | 3 | — |
| Play the video, lesson, or song you want to guard. | 10 | — |
| Turn on the guard | 4 | — |
| The extension asks Chrome for that tab’s audio only. | 9 | — |
| Set the peak limit | 4 | — |
| Watch the meter. | 3 | — |
| Use Mute now if sound feels unsafe. | 7 | — |
| Clear boundaries | 2 | — |
| What the guard does not do | 6 | — |
| It starts only when you turn it on for a tab. | 11 | — |
| It does not capture background tabs by itself. | 8 | — |
| Some tabs cannot provide audio to Chrome extensions. | 8 | — |
| It cannot guarantee a safe listening level. | 7 | — |
| Chrome extension · v1 | 3 | — |
| Put the guard beside your address bar | 7 | — |
| Download the package, open Chrome extensions, and load the unpacked folder. | 11 | F-1-3: incomplete instruction |
| Download Loudness Lens | 3 | — |
| Keep each browser tab at a predictable listening level. | 9 | — |
| Terms | 1 | — |
| Built by Param Factory | 4 | F-1-17: external destination not visibly stated |
| v1.0.0 · Original generated botanical artwork | 5 | — |

### README

Code blocks are commands rather than sentences; their surrounding headings,
prose, and artifact-list copy are counted below.

| Copy | Words | Flag |
| --- | ---: | --- |
| Loudness Lens | 2 | — |
| Keep each browser tab at a predictable listening level. | 9 | — |
| Loudness Lens is a free Chrome extension for mixed videos, lessons, and music. | 13 | — |
| It captures only the tab you enable. | 7 | — |
| A 10 ms look-ahead limiter reduces peaks, the live meter shows the result, and Mute now cuts the captured output. | 20 | F-1-12: jargon and three ideas |
| Audio is processed inside Chrome and stays in your browser. | 10 | — |
| Try the sandbox | 3 | F-1-11: inconsistent term |
| Open `/demo` on the site, or run the site and visit `http://localhost:5173/demo`. | 12 | — |
| The shipped 12-second lesson sample contains two volume jumps. | 9 | — |
| Demo settings use the separate `demo:loudness-lens:v1` storage key. | 8 | —; developer-facing identifier is defined in place |
| Reset demo restores the defaults. | 5 | — |
| Leaving the demo discards its key. | 6 | — |
| Requirements | 1 | — |
| Node.js 20 or newer | 4 | — |
| npm 10 or newer | 4 | — |
| Chrome 116 or newer | 4 | — |
| Develop | 1 | — |
| Open `chrome://extensions`, turn on Developer mode, choose Load unpacked, and select `dist/extension/chrome-mv3` during development. | 14 | — |
| Test and build | 3 | — |
| The exact production build command is `npm run build`. | 9 | — |
| It creates: | 2 | — |
| `dist/extension/chrome-mv3/` — unpacked MV3 extension | 5 | F-1-13: unexplained abbreviation |
| `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive | 4 | — |
| `dist/site/index.html` — static site root | 5 | — |
| `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download | 5 | — |
| `npm run build:site` performs the same deploy build and also packages the extension download into `dist/site/`. | 16 | — |
| Claim tests are listed in `.factory/claims.json`. | 6 | — |
| Design and image provenance are in `.factory/design.md`. | 7 | F-1-14: jargon |
| Browser limits and privacy | 4 | — |
| Chrome can block capture on protected pages and internal browser pages. | 11 | — |
| The extension shows a recovery error and leaves the guard off. | 11 | — |
| Turning off, closing, or reloading a tab ends its capture. | 10 | — |
| Loudness Lens has no account or third-party runtime assets. | 9 | F-1-16: jargon and two ideas |
| See `/privacy` and `/terms` on the site. | 7 | — |
| Deploy | 1 | — |
| Deploy `dist/site/` as the static root. | 6 | — |
| The included `staticwebapp.config.json` supplies SPA fallback and security headers. | 9 | F-1-15: unexplained abbreviation |
| Factory infrastructure handles hosting and DNS. | 6 | — |
| License | 1 | — |
| MIT. | 1 | — |
| See `LICENSE`. | 2 | — |

## Demo and sandbox verification

- The landing action opens `/demo` in one click.
- Its first screen already shows a named 12-second cooking-lesson sample,
  timing notes, level trim, peak limit, meter, and mute control.
- The persistent banner says “Demo — sample data, nothing is saved” and
  exposes **Reset demo** and **Start for real**.
- A fresh context wrote only `localStorage["demo:loudness-lens:v1"]`. A seeded
  non-demo sentinel remained unchanged through entry, changes, and reset.
- Reset restored trim `0 dB`, peak limit `−6 dB`, and mute off.
- **Start for real** removed the demo key and initiated the extension download;
  it did not copy demo state.
- The complete live demo request log contained only the product origin:
  document, hashed JS/CSS, the mark, and the shipped WAV.
- There is no offline claim, so no offline claim was left untested.

The sandbox isolation gate passes. F-1-6 and F-1-10 concern its wording/state,
not data isolation.

## Claims audit

Every exact command in `.factory/claims.json` was run independently after
`npm ci` in a clean clone. All commands exited 0.

| Claim | Exact command | Result |
| --- | --- | --- |
| `local-only` | `npm run test:e2e -- --grep @claim:local-only` | PASS — desktop and mobile |
| `sample-limiter` | `npm run test:e2e -- --grep @claim:sample-limiter` | PASS — desktop and mobile |
| `sample-timing` | `npm run test:e2e -- --grep @claim:sample-timing` | PASS — desktop and mobile |
| `demo-isolation` | `npm run test:e2e -- --grep @claim:demo-isolation` | PASS — desktop and mobile |
| `demo-reset` | `npm run test:e2e -- --grep @claim:demo-reset` | PASS — desktop and mobile |
| `demo-discard` | `npm run test:e2e -- --grep @claim:demo-discard` | PASS — desktop and mobile |
| `free-download` | `npm run test:e2e -- --grep @claim:free-download` | PASS — desktop and mobile |
| `tab-consent` | `npm run test:unit -- --testNamePattern @claim:tab-consent` | PASS — one focused test |
| `panic-mute` | `npm run test:unit -- --testNamePattern @claim:panic-mute` | PASS — one focused test |
| `look-ahead-limiter` | `npm run test:unit -- --testNamePattern @claim:look-ahead-limiter` | PASS — one focused test |
| `live-meter` | `npm run test:unit -- --testNamePattern @claim:live-meter` | PASS — one focused test |
| `level-trim` | `npm run test:unit -- --testNamePattern @claim:level-trim` | PASS — one focused test |
| `capture-lifecycle` | `npm run test:unit -- --testNamePattern @claim:capture-lifecycle` | PASS — one focused test |
| `local-settings` | `npm run test:unit -- --testNamePattern @claim:local-settings` | PASS — one focused test |
| `capture-error` | `npm run test:unit -- --testNamePattern @claim:capture-error` | PASS — one focused test |

**Unlisted live claim:** “The red mark shows your chosen limit” is not listed
and is false on the landing route. See F-1-2. No declared claim test failed,
but this unlisted claim leaves the claims gate incomplete.

## Structure, links, and identity

- `/`, `/demo`, `/privacy`, and `/terms` return 200. A missing route returns a
  designed botanical 404 with status 404 and a home action.
- Every tested route has `lang="en"`, one `main`, one `h1`, a route title, and
  consistent header/footer links to Privacy and Terms.
- The root title follows “Product — what it does” and is 42 characters. Route
  titles are “Demo — Loudness Lens,” “Privacy — Loudness Lens,” “Terms —
  Loudness Lens,” and “Page not found — Loudness Lens.”
- Canonicals update correctly on all index routes. The 404 correctly has no
  canonical and is `noindex`.
- The root includes Open Graph/Twitter fields, a 1200 × 630 original image, an
  SVG favicon, and a 180 × 180 Apple icon. F-1-5 covers stale route
  descriptions.
- The crawl found no dead product link: all internal links and the extension
  ZIP returned 200; `mailto:` was recognized; `https://sociobot.in/` returned
  200. The 404 page's self-referencing skip fragment naturally retains the 404
  document status and is not a dead destination.
- SPA navigation, browser Back, h1 focus, and scroll restoration work for
  routed links. F-1-4 covers the one header link that bypasses this system.
- The field-guide palette, serif/sans pairing, specimen frames, pressed-fern
  artwork, and botanical 404 are distinct and match `.factory/design.md`.
  This is not a generic SaaS template.
- The landing JavaScript is 12.65 KB raw / 4.80 KB gzip, below the static
  budget. The live root emits no console or page errors.

## Accessibility and quality evidence

- `/opt/fleet/lib/verify-url.sh` passed the live root: status 200, title,
  `lang=en`, one h1/main, no missing alt, no unlabeled button, and no console
  error.
- Live Axe at 390 px found zero serious/critical violations on `/`, `/demo`,
  `/privacy`, `/terms`, and the designed 404.
- Live Axe at 195 px found serious `link-name` on all five routes. See F-1-1.
- All checked instructional/status text remains 16 CSS px at 390 and 195 px.
- `npm test` passes: production build, typecheck, ESLint, 13 Vitest tests, and
  38 Playwright tests. The suite misses F-1-1 and F-1-2.
- `npm run build` creates `dist/site` and `dist/extension` as part of that run.

## Earlier review and handoff check

No earlier `.factory/review-*.md` or `.factory/polish-*.md` file exists.
The existing `.factory/handoff.md` listed four repaired areas:

| Earlier handoff item | Independent result |
| --- | --- |
| Site and popup instructional text raised to at least 16 px | Confirmed live for the named site selectors and by the built-popup test. |
| Popup and site reflow at 195 CSS px | **Regressed/incomplete.** The demo and popup tests pass, but the wordmark loses its accessible name on every site route and `/privacy` overflows. Reopened as F-1-1. |
| Browser regressions cover Axe, actions, and overflow at 390 and 195 px | **Half-fixed.** The test runs site Axe only before narrowing and checks narrow overflow only on `/demo`. Reopened as F-1-1. |
| Landing copy audit matches the four current boundary statements | Confirmed in code and live copy. This review adds the required README audit and flags separate copy issues. |

## Missed leverage

No AI feature is warranted. Peak limiting, metering, and mute are deterministic
local audio operations; sending audio or settings to an inference gateway
would add privacy and latency costs without advancing the brief. Import,
export, and sync are not implied by a per-tab guard. The obvious missing value
is a complete installation path, already recorded as F-1-3.

## What would make this perfect

Resolve every finding above, then rerun the review from a fresh live context.
In particular: make the landing preview honest or functional; document and
verify installation from the downloaded ZIP; fix and test every route at 195
CSS px; route the How link with focus announcement; supply route-specific
metadata; add the missing claim/test; and clear every copy flag. PASS requires
zero remaining findings and no untested claim.
