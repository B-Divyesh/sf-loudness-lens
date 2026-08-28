# Loudness Lens visual system

## Direction

The interface is a **botanical field guide for sound**. A sound stem passes
through a specimen window. Quiet leaves sit open; hot peaks press toward a
protective glass cap. This makes limiting visible without borrowing the look of
an equalizer or music player. Fine rules, specimen labels, inked contours, and
small handwritten-style annotations give the tool an inspectable, calm tone.

## Palette

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| paper | `#F3EEDB` | `#172019` | page ground |
| paper-raised | `#FFFBEA` | `#202C23` | controls and specimens |
| ink | `#17231A` | `#F4EEDB` | primary text |
| ink-muted | `#526052` | `#B9C2B5` | secondary text |
| fern | `#245C42` | `#7FC99B` | action and safe meter |
| moss | `#708A4E` | `#9DBA73` | field markings |
| ochre | `#B46A2C` | `#E3A567` | approaching limit |
| berry | `#A43838` | `#F28B82` | danger and mute |
| rule | `#A9A487` | `#586359` | borders and scales |

All text pairs meet WCAG AA. State also uses words, shapes, and meter position,
never color alone. The site paints both light and dark palettes through the
system preference.

## Type and spacing

The display face uses Georgia, a locally available serif with field-manual
character. Body and controls use the system sans stack for quick scanning. No
font files or third-party requests are needed. The scale is 16, 18, 24, 34,
and 56 px. Body copy stays under 70 characters. Spacing follows 4 and 8 px
increments, with 24 px control groups and 80–112 px sections.

## Shape and interaction grammar

Specimen frames use clipped upper corners and a single dark keyline. Buttons
have a pressed offset like a field-stamp. Measurements use tick marks and
tabular figures. The main switch is always paired with the words Guard on or
Guard off. Panic mute is round, red, and isolated from tuning controls.

## Motion policy

The signature motion is a single sound stem that grows upward with the meter.
It changes over 180 ms with transform only. Route changes fade for 160 ms and
move focus to the new heading. With `prefers-reduced-motion: reduce`, all
transitions stop and the stem updates immediately. Nothing loops or flashes.

## Art plan and provenance

The hero is an original pressed-botanical plate: a dark green sound stem grows
through a transparent limiter bell, with amber peak seeds held safely below its
rim. It contains no text, people, brands, or interface claims. It supports the
field-guide concept without pretending to show measured data.

Prompt sheet: “Editorial botanical field-guide plate, pressed fern shaped like
an audio waveform passing through a clear scientific bell jar limiter, a few
ochre seed pods held below the glass rim, warm handmade paper, deep forest ink,
fine engraved contour lines, sparse specimen composition, soft window light,
subtle paper grain, orthographic macro lens, no text, no watermark, no logos,
no people, no gradients, no neon, no glossy SaaS 3D.”

Generated with the factory image model (`factory-image`) on 2026-08-28. The
source PNG and prompt sidecar are kept in `assets/src/`. The shipped WebP is an
original product asset under this repository’s MIT license. The favicon and
meter glyphs are hand-authored SVG using the same stem language.
