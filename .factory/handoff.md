# Loudness Lens review 1 handoff

## Result

**FAIL.** Adversarial first-read review 1 is recorded in
`.factory/review-1.md`. Product code was not changed.

The cold first screen and demo isolation pass, all 15 declared claim commands
pass from a clean clone, and the full `npm test` suite passes. The review found
three release-blocking defects: an unnamed home link plus privacy overflow at
the required 195 CSS-pixel viewport, inert controls and a false/unlisted claim
in the landing preview, and incomplete instructions for installing the live
ZIP.

## Verification performed

- Fresh live Chromium contexts at 390 × 844 and 1440 × 900.
- Live 195 × 844 checks for 200% zoom equivalence.
- One-click demo, reset, separate storage namespace, real-storage sentinel,
  demo discard, and full request log.
- Every exact `.factory/claims.json` command after `npm ci` in a clean clone;
  all 15 passed.
- `npm test`; build, typecheck, lint, 13 unit tests, and 38 Playwright tests
  passed.
- `/opt/fleet/lib/verify-url.sh https://loudness-lens.sociobot.in`; passed.
- Live Axe on `/`, `/demo`, `/privacy`, `/terms`, and `/missing` at 390 and 195
  CSS px. The 195 px run found serious `link-name` on all routes.
- Metadata inspection, internal/external link crawl, route/focus/history
  checks, live ZIP inspection, and prior handoff verification.
- Complete landing-page and README copy inventory with word counts.

## Remaining work

Resolve F-1-1 through F-1-17 in `.factory/review-1.md`, add regressions for the
195 px route matrix and landing controls, add the missing claim test, deploy,
and rerun the entire review against the new live build.
