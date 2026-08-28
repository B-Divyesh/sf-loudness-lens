# Copy audit

Audited 28 August 2026 after polish round 2. Counts treat hyphenated terms,
paths, URLs, and version numbers as one word. No sentence exceeds 22 words.
No copy uses a banned marketing word.

## Landing page

| Copy unit | Words | Result |
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
| Hear a sample stay below your chosen volume limit. | 9 | Pass |
| Audio never leaves your browser. | 5 | Pass |
| No account or server setup. | 5 | Pass |
| Free to use. | 3 | Pass |
| Plate I · peaks kept below the bell | 7 | Pass |
| Peak-limit preview | 2 | Pass |
| See the peak before it surprises you | 7 | Pass |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | Pass |
| Specimen 01 · active tab | 4 | Pass |
| Live peak | 2 | Pass |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Pass |
| Peak limit | 2 | Pass |
| Mute now | 2 | Pass |
| Three steps | 2 | Pass |
| How it works | 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | Pass |
| Set the peak limit | 4 | Pass |
| Watch the meter. | 3 | Pass |
| Use Mute now if sound feels unsafe. | 7 | Pass |
| Limits and browser constraints | 4 | Pass |
| What the guard does not do | 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | Pass |
| It does not capture background tabs by itself. | 8 | Pass |
| Some tabs cannot provide audio to Chrome extensions. | 8 | Pass |
| It cannot guarantee a safe listening level. | 7 | Pass |
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

The first screen reads aloud in one breath: the job headline, audience
sentence, sample action, and its immediate result are concrete and complete.

## Demo and state copy

| Copy unit | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 7 | Pass |
| Reset demo | 2 | Pass |
| Download the extension ZIP | 4 | Pass |
| Sample cooking lesson · 12 seconds | 6 | Pass |
| Control a sample tab | 4 | Pass |
| This sample has quiet instruction and two sudden peaks. | 9 | Pass |
| Set a limit, then listen. | 5 | Pass |
| Play sample | 2 | Pass |
| Ready. | 1 | Pass |
| The sample is ready. | 4 | Pass |
| Play it to see the peak. | 6 | Pass |
| Tip: try a −12 dB peak limit, then replay the sample. | 11 | Pass |
| What is in the sample | 6 | Pass |
| Quiet lesson bed | 3 | Pass |
| First volume jump | 3 | Pass |
| Second volume jump | 3 | Pass |

## README

Every heading, prose sentence, list item, and artifact label was checked. The
longest prose sentence is 17 words. The earlier flagged terms were replaced:

| Earlier wording | Current wording | Result |
| --- | --- | --- |
| Try the sandbox | Try the demo | Pass |
| One sentence combining limiting, metering, and mute | Three short sentences, one action each | Pass |
| MV3 | Manifest V3 | Pass |
| image provenance | image source and generation notes | Pass |
| SPA fallback | known routes go to the single-page app | Pass |
| third-party runtime assets | Removed; the surrounding privacy facts remain concrete | Pass |

The published installation flow is also listed as five separate steps. It
starts with downloading and extracting the ZIP before opening Chrome settings.
The “Chrome 116 or newer” requirement is listed in `.factory/claims.json` and
verified against the production manifest by `@claim:minimum-chrome-version`.

## Terminology

| Concept | One term used |
| --- | --- |
| Per-tab safety control | guard |
| Maximum allowed peak | peak limit |
| Gain before limiting | level trim |
| Immediate silence control | Mute now |
| Visual level display | meter |
| Isolated try-out | demo |
| Captured browser page | tab |
| Downloaded package | ZIP |

Catalog description: “Keep each Chrome tab at a predictable listening level.”
It is 55 characters, starts with a verb, and contains no banned word.
