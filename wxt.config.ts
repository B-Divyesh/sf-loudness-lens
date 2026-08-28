import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: '.',
  outDir: 'dist/extension',
  vite: () => ({
    optimizeDeps: { entries: ['entrypoints/**/*.html'] },
  }),
  manifest: {
    name: 'Loudness Lens',
    description: 'Limit sudden peaks in the tab you enable.',
    version: '1.0.0',
    permissions: ['activeTab', 'storage', 'tabCapture', 'offscreen'],
    minimum_chrome_version: '116',
    action: { default_title: 'Open Loudness Lens' },
    icons: {
      16: 'icons/icon-16.png',
      32: 'icons/icon-32.png',
      48: 'icons/icon-48.png',
      128: 'icons/icon-128.png'
    }
  }
});
