# Loudness Lens demo

- URL: `https://loudness-lens.sociobot.in/demo` or local `/demo`.
- Sample: a 12-second generated lesson bed with quiet sections and two volume jumps. It ships at `/assets/sample-lesson-v1.wav`; no network media is loaded.
- Try: play the sample, move Peak limit to −12 dB, change Level trim, and use Mute now.
- Reset: use **Reset demo** in the persistent banner to restore the sample settings.
- Storage: only `localStorage["demo:loudness-lens:v1"]`.
- Leaving demo: browser Back, navigation, and direct page changes discard the demo settings.
- Start for real: discards demo settings and downloads the packaged Chrome extension. Demo data is not copied into the extension.
