# Loudness Lens

Keep each browser tab at a predictable listening level.

Loudness Lens is a free Chrome extension for mixed videos, lessons, and music.
It captures only the tab you enable. A 10 ms look-ahead limiter reduces peaks,
the live meter shows the result, and **Mute now** cuts the captured output.
Audio is processed inside Chrome and stays in your browser.

## Try the sandbox

Open `/demo` on the site, or run the site and visit
`http://localhost:5173/demo`. The shipped 12-second lesson sample contains two
volume jumps. Demo settings use the separate `demo:loudness-lens:v1` storage
key. **Reset demo** restores the defaults. Leaving the demo discards its key.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- Chrome 116 or newer

## Develop

```sh
npm install
npm run dev          # WXT extension development
npm run dev:site     # site at http://localhost:5173
```

Open `chrome://extensions`, turn on Developer mode, choose **Load unpacked**,
and select `dist/extension/chrome-mv3` during development.

## Test and build

```sh
npm test
npm run build
```

The exact production build command is `npm run build`. It creates:

- `dist/extension/chrome-mv3/` — unpacked MV3 extension
- `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive
- `dist/site/index.html` — static site root
- `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download

`npm run build:site` performs the same deploy build and also packages the
extension download into `dist/site/`.

Claim tests are listed in `.factory/claims.json`. Design and image provenance
are in `.factory/design.md`.

## Browser limits and privacy

Chrome can block capture on protected pages and internal browser pages. The
extension shows a recovery error and leaves the guard off. Turning off,
closing, or reloading a tab ends its capture. Loudness Lens has no account or
third-party runtime assets. See `/privacy` and `/terms` on the site.

## Deploy

Deploy `dist/site/` as the static root. The included
`staticwebapp.config.json` supplies SPA fallback and security headers. Factory
infrastructure handles hosting and DNS.

## License

MIT. See [LICENSE](LICENSE).
