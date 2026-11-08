// Points the page's download buttons at the installer of a release of Slidr:
//
//   node set-download.mjs https://github.com/slidrhq/app/releases/download/v0.4.0/Slidr_0.4.0_x64-setup.exe
//
// The Site workflow of slidrhq/app (.github/workflows/site.yml) runs it when a release is
// published, commits and pushes, and the push publishes the site (.github/workflows/deploy.yml).
// Every link of index.html to a file of a release of slidrhq/app is a download button; the
// footer's link to the releases page is not one, and stays.
import { readFileSync, writeFileSync } from 'node:fs';

const INSTALLER = /^https:\/\/github\.com\/slidrhq\/app\/releases\/download\/v[\w.-]+\/[\w.-]+_x64-setup\.exe$/;
const LINK = /https:\/\/github\.com\/slidrhq\/app\/releases\/download\/[^"]+/g;

const url = process.argv[2] ?? '';
if (!INSTALLER.test(url)) fail(`Not an installer of a release of slidrhq/app: ${url}`);

const file = new URL('index.html', import.meta.url);
const page = readFileSync(file, 'utf8');
const count = page.match(LINK)?.length ?? 0;
if (count === 0) fail('index.html has no download button');
writeFileSync(file, page.replace(LINK, url));
console.log(`${count} download buttons → ${url}`);

function fail(message) {
  console.error(`set-download: ${message}`);
  process.exit(1);
}
