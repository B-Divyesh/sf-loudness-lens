# Loudness Lens demo

- URL: `https://loudness-lens.sociobot.in/?demo=1` or local `/?demo=1`. The `/demo` route is an equivalent deep link.
- Sample: a 12-second generated lesson bed with quiet sections and two volume jumps. It ships at `/assets/sample-lesson-v1.wav`; no network media is loaded.
- Try: play the sample, move Peak limit to −12 dB, change Level trim, and use Mute now.
- Reset: use **Reset demo** in the persistent banner to restore the sample settings.
- Storage: only `localStorage["demo:loudness-lens:v1"]`.
- Leaving demo: browser Back, navigation, and direct page changes discard the demo settings.
- Download the extension ZIP: discards demo settings, starts the packaged Chrome extension download, and returns home. Demo data is not copied.
