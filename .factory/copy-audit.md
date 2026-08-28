# Copy audit

Audited 28 August 2026 for polish round 3. Counts treat hyphenated terms,
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
| A per-tab peak limiter | 4 | Pass |
| Limit sudden peaks in the tab you enable | 8 | `per-tab-peak-limit` |
| For people switching between videos, lessons, and music who want fewer sudden volume jumps. | 14 | Pass |
| Try it with sample data | 6 | Pass |
| Keep sudden peaks below your chosen limit. | 7 | `per-tab-peak-limit` |
| Audio never leaves your browser. | 5 | `local-only` |
| No account or server setup. | 5 | `free-download` |
| Free to use. | 3 | `free-download` |
| Illustration of peak limiting. | 4 | Art caption |
| Peak-limit preview | 2 | Pass |
| See the peak before it surprises you | 7 | Pass |
| This preview starts with an example reading. | 7 | Pass |
| Move the peak limit to place the red marker. | 9 | `peak-limit-marker` |
| Specimen 01 · active tab | 4 | Pass |
| Live peak | 2 | `live-meter` |
| Example reading: −18 dB, below the −6 dB limit. | 9 | Explicit example |
| Peak limit | 2 | Pass |
| Mute now | 2 | `panic-mute` |
| Three steps | 2 | Pass |
| How it works | 3 | Pass |
| Open the tab | 3 | Pass |
| Play the video, lesson, or song you want to guard. | 10 | Pass |
| Turn on the guard | 4 | Pass |
| The extension asks Chrome for that tab’s audio only. | 9 | `tab-consent` |
| Set the peak limit | 4 | Pass |
| Watch the meter. | 3 | `live-meter` |
| Use Mute now if sound feels unsafe. | 7 | `panic-mute` |
| Limits and browser constraints | 4 | Pass |
| What the guard does not do | 6 | Pass |
| It starts only when you turn it on for a tab. | 11 | `tab-consent` |
| It does not capture background tabs by itself. | 8 | `tab-consent` |
| Some tabs cannot provide audio to Chrome extensions. | 8 | `capture-error` boundary |
| It cannot guarantee a safe listening level. | 7 | Limitation |
| Chrome extension · v1 | 3 | Pass |
| Install the extension in Chrome | 5 | Pass |
| Download the ZIP. | 3 | `free-download` |
| Extract the ZIP. | 3 | Pass |
| Open chrome://extensions. | 2 | Pass |
| Turn on Developer mode. | 4 | Pass |
| Choose Load unpacked and select the extracted folder. | 8 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| Download Loudness Lens | 3 | `free-download` |
| Limit sudden peaks in the tab you enable. | 8 | `per-tab-peak-limit` |
| Terms | 1 | Pass |
| Built by Param Factory ↗ external site | 7 | Pass |
| v1.0.0 · Original generated botanical artwork | 5 | Pass |

The first screen reads aloud in one breath: the job headline, audience
sentence, sample action, and its immediate result are concrete and complete.
The product promises peak limiting only for the tab a person enables. It does
not promise steady-volume normalisation or support for every tab.

## Demo and state copy

| Copy unit | Words | Result |
| --- | ---: | --- |
| Demo — sample data, nothing is saved | 7 | Pass |
| Reset demo | 2 | `demo-reset` |
| Download the extension ZIP | 4 | `demo-discard` |
| Sample cooking lesson · 12 seconds | 6 | `sample-timing` |
| Control a sample tab | 4 | Pass |
| This sample has quiet instruction and two sudden peaks. | 9 | `sample-timing` |
| Set a limit, then listen. | 5 | Pass |
| Play sample | 2 | `sample-limiter` |
| Ready. | 1 | Pass |
| The sample is ready. Play it to see the peak. | 10 | Pass |
| Tip: try a −12 dB peak limit, then replay the sample. | 11 | Pass |
| What is in the sample | 6 | Pass |
| Quiet lesson bed | 3 | Pass |
| First volume jump | 3 | Pass |
| Second volume jump | 3 | Pass |

## README

Every heading, prose sentence, list item, and artifact label was checked. The
longest prose sentence is 17 words. The published installation flow starts
with downloading and extracting the ZIP, then includes the Chrome toolbar pin
step after loading the extension.

| Copy unit | Words | Result |
| --- | ---: | --- |
| Limit sudden peaks in the tab you enable. | 8 | `per-tab-peak-limit` |
| Loudness Lens is a free Chrome extension for mixed videos, lessons, and music. | 14 | `free-download` |
| It captures only the tab you enable. | 7 | `tab-consent` |
| The extension turns down sudden peaks before they play. | 8 | `look-ahead-limiter` |
| The meter shows the tab’s current level. | 7 | `live-meter` |
| Mute now silences that tab. | 5 | `panic-mute` |
| Audio is processed inside Chrome and stays in your browser. | 10 | `local-only` |
| Try the demo | 3 | Pass |
| The shipped 12-second lesson sample contains two volume jumps. | 9 | `sample-timing` |
| Demo settings use the separate `demo:loudness-lens:v1` storage key. | 7 | `demo-isolation` |
| Reset demo restores the defaults. | 5 | `demo-reset` |
| Leaving the demo discards its key. | 6 | `demo-discard` |
| Chrome 116 or newer | 4 | `minimum-chrome-version` |
| To install the published ZIP: | 5 | Pass |
| Open the Extensions menu, then pin Loudness Lens to the toolbar. | 11 | Pass |
| The extension uses a 10 ms look-ahead window before it reduces a peak. | 13 | `look-ahead-limiter` |
| Chrome can block capture on protected pages and internal browser pages. | 10 | `capture-error` boundary |
| The extension shows a recovery error and leaves the guard off. | 10 | `capture-error` |
| Turning off, closing, or reloading a tab ends its capture. | 10 | `capture-lifecycle` |
| Loudness Lens needs no account. | 5 | `free-download` |

## Terminology

| Concept | One term used |
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

Catalog description: “Limit sudden peaks in the Chrome tab you enable.” It is
48 characters, starts with a verb, and contains no banned word.
