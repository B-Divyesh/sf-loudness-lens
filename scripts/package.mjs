import { cpSync, existsSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const downloads = resolve('dist/site/downloads');
mkdirSync(downloads, { recursive: true });
const zips = readdirSync('dist/extension').filter((name) => name.endsWith('.zip'));
if (!zips.length) throw new Error('WXT did not create an extension zip.');
const zip = zips[0];
const version = zip.match(/^loudness-lens-(.+)-chrome\.zip$/)?.[1];
if (!version) throw new Error(`Unexpected extension package name: ${zip}`);
copyFileSync(resolve('dist/extension', zip), resolve(downloads, `loudness-lens-chrome-${version}.zip`));
if (existsSync('dist/extension/chrome-mv3')) cpSync('dist/extension/chrome-mv3', resolve(downloads, 'unpacked'), { recursive: true });
