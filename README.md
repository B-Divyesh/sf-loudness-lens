# Loudness Lens

Limit sudden peaks in the tab you enable.

Loudness Lens is a free Chrome extension for mixed videos, lessons, and music.
It captures only the tab you enable. The extension turns down sudden peaks
before they play. The meter shows the tab’s current level. **Mute now**
silences that tab.
Audio is processed inside Chrome and stays in your browser.

## Try the demo

Open `/?demo=1` on the site, or visit
`http://localhost:5173/?demo=1` during local development. The shipped
12-second lesson sample contains two volume jumps. Demo settings use the
separate `demo:loudness-lens:v1` storage key. **Reset demo** restores the
defaults. Leaving the demo discards its key.

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

To install the published ZIP:

1. Download the ZIP.
2. Extract the ZIP.
3. Open `chrome://extensions`.
4. Turn on **Developer mode**.
5. Choose **Load unpacked** and select the extracted folder.
6. Open the Extensions menu, then pin Loudness Lens to the toolbar.

## Test and build

```sh
npm test
npm run build
```

The exact production build command is `npm run build`. It creates:

- `dist/extension/chrome-mv3/` — unpacked Manifest V3 extension
- `dist/extension/loudness-lens-1.0.0-chrome.zip` — package archive
- `dist/site/index.html` — static site root
- `dist/site/downloads/loudness-lens-chrome-1.0.0.zip` — versioned public download

`npm run build:site` performs the same deploy build and also packages the
extension download into `dist/site/`.

Claim tests are listed in `.factory/claims.json`. The design file records each
image’s source and generation notes.

The extension uses a 10 ms look-ahead window before it reduces a peak. This
implementation detail has a focused claim test.

## Browser limits and privacy

Chrome can block capture on protected pages and internal browser pages. The
extension shows a recovery error and leaves the guard off. Turning off,
closing, or reloading a tab ends its capture. Loudness Lens needs no account.
See `/privacy` and `/terms` on the site.

## Deploy

Deploy `dist/site/` as the static root. The included
configuration sends known app routes to the single-page app and adds security
headers. Factory infrastructure handles hosting and DNS.

## License

MIT. See [LICENSE](LICENSE).
