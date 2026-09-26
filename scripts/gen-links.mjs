// Generate src/data/links.js — the in-world LINKS HUB directory — from the
// canonical classic-site export (src/data/portfolio_data.json). Keeps only
// absolute http(s) links (the classic site's own relative asset paths don't
// exist here). Regenerate: node scripts/gen-links.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const src = JSON.parse(readFileSync('src/data/portfolio_data.json', 'utf8'));
// optional reachability map from scripts/check-links.mjs — drop hard-dead urls
let status = {};
try { status = JSON.parse(readFileSync('scripts/.link-status.json', 'utf8')); } catch (e) { /* none */ }
const isDead = (u) => status[u] === 404 || status[u] === 410 || (typeof status[u] === 'number' && status[u] >= 500);

const TITLES = {
  artist_profiles: 'Artist Profiles', deadnet: 'Deadnet — Digital Afterlife', music: 'Music', videos: 'Videos',
  dreamos_tv: 'DreamOS TV', dreamos: 'DreamOS Ecosystem', wakeup_games: 'Wake-Up Game Series', games: 'Games',
  flash_games: 'Flash Games', apps: 'Apps & Tools', stories: 'Stories & Experiences', profiles: 'Profiles & Sites',
  downloads: 'Downloads & Resources', social_footprint: 'Social Footprint', social_links: 'Social Links',
};

const categories = [];
let kept = 0, dropped = 0;
for (const cat of src.categories || []) {
  const seen = new Set();
  const items = [];
  for (const it of cat.items || []) {
    if (!/^https?:/i.test(it.url)) { dropped++; continue; }      // relative classic-site paths — not hosted here
    if (isDead(it.url)) { dropped++; continue; }
    if (seen.has(it.url)) continue; seen.add(it.url);
    items.push({ title: String(it.title || it.url), url: it.url, note: String(it.note || '') });
    kept++;
  }
  if (items.length) categories.push({ id: cat.id, title: cat.title || TITLES[cat.id] || cat.id, items });
}

const out = `// The 12matt3r LINKS HUB — every project, alias, app and social, surfaced in-world.
// Generated from src/data/portfolio_data.json by scripts/gen-links.mjs — edit the
// JSON (or that script), not this file.
export const OWNER = ${JSON.stringify(src.owner || '12matt3r')};
export const BIO = ${JSON.stringify(src.bio || '')};
export const LINK_CATEGORIES = ${JSON.stringify(categories, null, 0)};
`;
writeFileSync('src/data/links.js', out);
console.log('links.js written — categories:', categories.length, '| links kept:', kept, '| dropped:', dropped);
