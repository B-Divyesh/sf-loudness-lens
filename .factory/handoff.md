# Loudness Lens review 4 handoff

## Result

**FAIL — 3 minor copy findings.** The independent review did not modify
product code. The complete report is `.factory/review-4.md`.

## What was verified

- Cold live first reads at 390 × 844 and 1440 × 900 clearly state the job,
  audience, and sample action.
- The live demo is one click, uses its separate `demo:loudness-lens:v1` key,
  plays the shipped sample, resets defaults, discards its key on exit, and
  made only same-origin requests.
- Every one of the 18 exact claim commands passed from fresh clone
  `/tmp/loudness-lens-review-4.8HeRUS/repo`.
- `npm test` passed in that clone: build, typecheck, lint, 18 Vitest tests,
  and 54 Playwright tests.
- Live routes, links, metadata, 404, focus/back behavior, 195 px reflow, and
  a fresh live Axe smoke scan were checked.

## Remaining work

1. Change “See the peak before it surprises you” to “Preview the selected
   peak limit.”
2. Change “SPECIMEN 01 · ACTIVE TAB” to “Active tab.”
3. Change the 404 h1 to “Page not found” and remove “Field note 404.”
4. Add a focused copy-policy test, then repeat the full first-read review.
