// Bake BPM/key/Camelot for the whole catalogue into src/data/analysis.json, so
// every visitor gets pre-analysed tracks with no work on their machine.
//
// Runs the REAL DJ analysis engine (src/dj/audio.js) in a headless browser via
// analyze-harness.html under `vite dev`, one track at a time. Resumable: existing
// results are kept and only missing tracks are analysed. Writes incrementally.
//
//   node scripts/bake-analysis.mjs            # analyse everything missing
//   PLAYWRIGHT_EXECUTABLE=/opt/pw-browsers/chromium node scripts/bake-analysis.mjs
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const PORT = 4519, BASE = `http://localhost:${PORT}`;
const OUT = 'src/data/analysis.json';
const MEDIA = process.env.VITE_MEDIA_CDN || 'https://hungryshmorez.github.io/Media/';
const MEDIA_BASE = MEDIA.replace(/\/+$/, '') + '/';
const MANIFEST = MEDIA_BASE + 'manifest.json';

const encodeSegment = (s) => { try { if (decodeURIComponent(s) !== s) return s; } catch (e) { return s; } return encodeURIComponent(s); };
const media = (p) => MEDIA_BASE + String(p).replace(/^\/+/, '').split('/').map(encodeSegment).join('/');

function startDev() {
  const p = spawn('npx', ['vite', '--port', String(PORT), '--strictPort'], { stdio: ['ignore', 'pipe', 'pipe'] });
  return new Promise((res, rej) => {
    const to = setTimeout(() => rej(new Error('dev did not start')), 40000);
    const on = (d) => { if (String(d).includes(`localhost:${PORT}`)) { clearTimeout(to); setTimeout(() => res(p), 800); } };
    p.stdout.on('data', on); p.stderr.on('data', on);
    p.on('exit', (c) => rej(new Error(`dev exited early (${c})`)));
  });
}

const load = () => { try { return JSON.parse(readFileSync(OUT, 'utf8')); } catch (e) { return { version: 1, byUrl: {} }; } };
const save = (data) => { mkdirSync('src/data', { recursive: true }); writeFileSync(OUT, JSON.stringify(data, null, 0)); };

const res = await fetch(MANIFEST, { cache: 'no-cache' });
if (!res.ok) { console.error('manifest', res.status); process.exit(1); }
const manifest = await res.json();
const urls = (manifest.tracks || []).filter((t) => t && t.src).map((t) => media(t.src));
console.log('catalogue tracks:', urls.length);

const data = load();
data.byUrl ??= {};
const todo = urls.filter((u) => !data.byUrl[u]);
console.log('already baked:', urls.length - todo.length, '| to analyse:', todo.length);
if (!todo.length) { console.log('nothing to do'); process.exit(0); }

const dev = await startDev();
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined, args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ ignoreHTTPSErrors: true });
const page = await ctx.newPage();
page.on('pageerror', (e) => console.log('PAGEERR', e.message.split('\n')[0]));
await page.goto(`${BASE}/analyze-harness.html`, { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForFunction(() => window.__ready && window.__ready(), { timeout: 20000 }).catch(() => {});

let ok = 0, fail = 0, i = 0;
for (const url of todo) {
  i++;
  try {
    const r = await page.evaluate((u) => window.__analyze(u), url);
    if (r && (r.bpm != null || r.key != null)) { data.byUrl[url] = { bpm: r.bpm ?? null, key: r.key ?? null, camelot: r.camelot ?? null }; ok++; }
    else { fail++; }
  } catch (e) { fail++; console.log('FAIL', i, url.split('/').pop(), (e.message || '').slice(0, 40)); }
  if (i % 5 === 0 || i === todo.length) { data.generatedAt = new Date().toISOString(); save(data); console.log(`[${i}/${todo.length}] ok=${ok} fail=${fail}`); }
}
data.generatedAt = new Date().toISOString(); save(data);
console.log(`DONE ok=${ok} fail=${fail} total=${Object.keys(data.byUrl).length}`);
await browser.close(); dev.kill();
