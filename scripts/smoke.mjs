// Smoke test: build first, then load every world page in a headless browser and
// fail if any throws a script error or 404s one of its own assets. Catches the
// class of regression that a hand-edit to a world most often causes — a broken
// import, a syntax slip, a renamed module, a missing chunk — before it ships.
//
//   npm run build && node scripts/smoke.mjs
//
// It does NOT drive gameplay (that needs a real GPU + gestures); it verifies
// each page loads and initialises cleanly, which is the 80/20 for catching
// breakage across 27 worlds by hand.

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const PAGES = [
  'index', 'codex', 'driftwave', 'sofaboi', 'ravecharles', 'studio', 'tanky',
  'shmorez', 'arcade', 'bullethell', 'lab', 'tv', 'dj', 'warehouse', 'lofi',
  'horrorcore', 'abstract', 'rooftop', 'builder', 'hidden', 'vj', 'greenroom',
  'utility', 'gameroom', 'museum', 'race', 'gamecity',
];
const PORT = 4319;
const BASE = `http://localhost:${PORT}`;

function startPreview() {
  const p = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: ['ignore', 'pipe', 'pipe'] });
  return new Promise((res, rej) => {
    const to = setTimeout(() => rej(new Error('preview did not start')), 30000);
    const onData = (d) => { if (String(d).includes(`localhost:${PORT}`)) { clearTimeout(to); res(p); } };
    p.stdout.on('data', onData); p.stderr.on('data', onData);
    p.on('exit', (c) => rej(new Error(`preview exited early (${c})`)));
  });
}

const preview = await startPreview();
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
const failures = [];

for (const name of PAGES) {
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(`JS: ${e.message.split('\n')[0]}`));
  page.on('response', (r) => {
    // only flag this site's own assets (not third-party CDN / analytics)
    if (r.status() === 404 && r.url().startsWith(BASE) && /\.(js|css|glb|gltf|mp3|mp4|png|jpe?g|webp|svg|json|hdr)/.test(r.url())) {
      errors.push(`404: ${r.url().slice(BASE.length)}`);
    }
  });
  try {
    // domcontentloaded, not load: module scripts execute right after DCL, which
    // is where a broken import / syntax slip / dead chunk / own-asset 404 throws.
    // Waiting for the full `load` event instead hangs up to the timeout on
    // media-heavy worlds (streamed audio, preloaded fonts) with nothing to gain,
    // which is what made this smoke exceed CI's budget.
    await page.goto(`${BASE}/${name}.html`, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(3000); // let modules initialise + first render settle
  } catch (e) {
    errors.push(`LOAD: ${e.message.split('\n')[0]}`);
  }
  await page.close();
  if (errors.length) { failures.push({ name, errors }); console.log(`✗ ${name}`); errors.forEach((e) => console.log(`    ${e}`)); }
  else console.log(`✓ ${name}`);
}

await browser.close();
preview.kill();

if (failures.length) {
  console.error(`\nSMOKE FAILED — ${failures.length}/${PAGES.length} page(s) had errors.`);
  process.exit(1);
}
console.log(`\nSMOKE PASSED — ${PAGES.length} pages loaded clean.`);
