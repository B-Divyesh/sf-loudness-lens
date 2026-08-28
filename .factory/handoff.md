# Loudness Lens repair handoff

## Result

Repaired the release blockers reported for candidate
`7885872f2569f6dc46510fb13303a12fc3d0e49a`.

Commit and deployment evidence are added after the final push.

## What changed

- Replaced the six source-string extension claim checks with behavioral
  harnesses that execute the same tab-stream, audio-settings, meter, session
  shutdown, and session-storage logic used by the MV3 extension.
- Added the `capture-error` claim and regression. It simulates Chrome refusing
  a tab stream and checks the recovery instruction.
- Removed untestable claim-like copy about recording, upload, system volume,
  analytics, uninstall deletion, and demo cross-namespace implementation.
  The researched product behavior remains unchanged.
- Extended the demo-discard regression to cover **Start for real**, in addition
  to browser Back, Forward, and direct navigation.
- Added explicit successful Static Web Apps routes for `/robots.txt` and
  `/sitemap.xml` before the 404 catch-all.
- Kept immutable caching only for fingerprinted JS and CSS; stable artwork,
  audio, crawler files, and the extension download now use short revalidating
  cache headers.

## Verification

Fresh clean-install and release checks completed on 28 August 2026:

```sh
npm ci                         # 293 packages, 0 vulnerabilities
npm test                       # 13 Vitest + 34 Playwright tests passed
npm run build                  # dist/site and dist/extension produced
npm audit                      # 0 vulnerabilities
```

All 15 exact commands in `.factory/claims.json` were run separately and
passed. They cover desktop and 390 px mobile demo behavior where relevant.

Additional checks passed:

- `unzip -t dist/extension/loudness-lens-1.0.0-chrome.zip` — all 14 package
  files valid; manifest is MV3 with only `activeTab`, `storage`, `tabCapture`,
  and `offscreen` permissions.
- Fresh persistent Chromium profile with the built unpacked extension — popup
  loaded at its extension URL with title **Loudness Lens — tab loudness guard**,
  one `<main>`, one `<h1>`, and no startup error.
- `/opt/fleet/lib/verify-url.sh http://127.0.0.1:4173/ <tempdir>` — 200,
  zero console/page errors, title/lang/one h1/main/alt/button checks passed.
- Playwright Axe coverage in `npm test` — zero serious or critical findings on
  `/`, `/demo`, `/privacy`, `/terms`, and the 404 route at desktop and 390 px,
  including dark/reduced-motion coverage.
- Local build smoke — `/robots.txt` and `/sitemap.xml` returned 200 with the
  expected MIME types; the deployment-config regression asserts successful
  routes and non-immutable stable assets.

`npx @axe-core/cli` was attempted as an additional check but the CLI's bundled
ChromeDriver is version 152 while the supplied Playwright Chromium is version
145. The integrated `@axe-core/playwright` run above uses that supplied browser
and passed every route.

## Re-run

```sh
npm ci
npm test
npm run build
npm audit
```

Deploy `dist/site/` using `site/public/staticwebapp.config.json` (copied into
the build output). After deployment, confirm `/robots.txt` and `/sitemap.xml`
return HTTP 200 and stable files use `max-age=300, must-revalidate`.

## Known gaps

None in the repository repair. The post-push static-host response check remains
the deployment system's responsibility and is recorded once the factory host
has consumed the pushed commit.
