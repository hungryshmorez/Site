import { readFileSync, writeFileSync } from 'node:fs';
const F = 'src/data/portfolio_data.json';
const d = JSON.parse(readFileSync(F, 'utf8'));
const urls = [...new Set(d.categories.flatMap((c) => c.items).map((i) => i.url).filter((u) => /^https?:/.test(u)))];
console.log('checking', urls.length, 'urls');

async function check(url) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 12000);
  try {
    let r = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctl.signal, headers: { 'User-Agent': 'Mozilla/5.0' } });
    clearTimeout(t);
    return { url, status: r.status };
  } catch (e) {
    clearTimeout(t);
    return { url, status: 0, err: (e.message || '').slice(0, 40) };
  }
}

const results = [];
const CONC = 8;
let i = 0;
async function worker() { while (i < urls.length) { const u = urls[i++]; results.push(await check(u)); } }
await Promise.all(Array.from({ length: CONC }, worker));

const dead = results.filter((r) => r.status === 0 || r.status === 404 || r.status === 410 || r.status >= 500);
const ok = results.filter((r) => !dead.includes(r));
writeFileSync('scripts/.link-status.json', JSON.stringify(Object.fromEntries(results.map((r) => [r.url, r.status])), null, 0));
console.log('OK:', ok.length, '| DEAD/suspect:', dead.length);
console.log('--- DEAD ---');
for (const r of dead) console.log(r.status, r.err || '', r.url);
