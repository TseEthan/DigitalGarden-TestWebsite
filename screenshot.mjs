// screenshot.mjs — capture a localhost page to ./temporary screenshots/
// Usage:
//   node screenshot.mjs http://localhost:3000 [label]
// Flags:
//   --w=1440 --h=900   viewport size (default 1440x900)
//   --full             capture full scrollable page
//   --wait=1500        extra ms to wait after load (default 1400)
//   --scale=2          device scale factor (default 2 for crisp text)
import puppeteer from 'puppeteer';
import { mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const args = process.argv.slice(2);
const url = args.find((a) => !a.startsWith('--') && /^https?:\/\//.test(a)) || 'http://localhost:3000';
const label = args.find((a) => !a.startsWith('--') && !/^https?:\/\//.test(a));

const flag = (name, def) => {
  const a = args.find((x) => x.startsWith(`--${name}=`));
  return a ? a.split('=')[1] : def;
};
const has = (name) => args.includes(`--${name}`);

const W = parseInt(flag('w', '1440'), 10);
const H = parseInt(flag('h', '900'), 10);
const WAIT = parseInt(flag('wait', '1400'), 10);
const SCALE = parseFloat(flag('scale', '2'));
const FULL = has('full');

const OUT_DIR = join(process.cwd(), 'temporary screenshots');
await mkdir(OUT_DIR, { recursive: true });

// auto-increment screenshot-N
let n = 1;
try {
  const files = await readdir(OUT_DIR);
  const nums = files
    .map((f) => f.match(/^screenshot-(\d+)/))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  if (nums.length) n = Math.max(...nums) + 1;
} catch {}

const fileName = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
const outPath = join(OUT_DIR, fileName);

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--force-color-profile=srgb'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: SCALE });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await new Promise((r) => setTimeout(r, WAIT));
  await page.screenshot({ path: outPath, fullPage: FULL });
  console.log(`Saved ${outPath}  (${W}x${H}${FULL ? ' full' : ''}, wait ${WAIT}ms)`);
} finally {
  await browser.close();
}
