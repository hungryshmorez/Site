// 12matt3r — the CLASSIC MENU. A flat, scrollable, two-column index for anyone
// who'd rather not walk the 3D festival. Everything is generated from the same
// canonical catalog the Lab uses, so the two experiences never drift apart.

import { ALIASES, LAB, LINKS } from './data/catalog.js';

const navEl = document.getElementById('nav');
const featEl = document.getElementById('features');
const secEl = document.getElementById('sections');

const SECTION_LEAD = {
  'DreamOS Ecosystem': 'Operating systems, the wake-up nodes, the TV, and the Deadnet.',
  'Wake Up Series': 'The chronological catalog of surreal dream experiences.',
  'Games': 'Playable worlds, racers, sims, and experiments.',
  'Stories & Experiences': 'Narrative pieces and liminal spaces to wander through.',
  'Tools': 'Trippy Cam, effects, the synthwave studio, and the flash portal.',
};

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// external launcher card (websim/minimax pages can't be framed → new tab)
function card(name, url, sub, opts = {}) {
  const internal = opts.internal;
  const a = el('a', 'card' + (opts.special ? ' special' : '') + (internal ? '' : ' ext'));
  a.href = url;
  if (!internal) { a.target = '_blank'; a.rel = 'noopener'; }
  a.appendChild(el('span', 'b', name));
  if (sub) a.appendChild(el('span', 's', sub));
  return a;
}

// ── two featured cards up top: Trippy Cam + DreamOS TV ──────────────────────
const trippy = (LAB['Tools'] || []).find((t) => /trippy cam/i.test(t.name));
if (trippy) {
  const f = el('a', 'feat'); f.href = trippy.url; f.target = '_blank'; f.rel = 'noopener';
  f.appendChild(el('b', null, 'TRIPPY CAM ↗'));
  f.appendChild(el('span', null, 'Real-time psychedelic webcam glitch studio. Point it at yourself.'));
  featEl.appendChild(f);
}
const ftv = el('a', 'feat tv'); ftv.href = 'tv.html';
ftv.appendChild(el('b', null, 'DREAMOS TV'));
ftv.appendChild(el('span', null, 'Walk-in CRT theater — 24 channels, popcorn in the air.'));
featEl.appendChild(ftv);

// ── build the nav + sections ────────────────────────────────────────────────
const sections = []; // { id, label, count }

// Artist Profiles first
(() => {
  const id = 'artist-profiles';
  const sec = el('section'); sec.id = id;
  sec.appendChild(el('h2', null, `Artist Profiles <span class="c">${ALIASES.length}</span>`));
  sec.appendChild(el('div', 'lead', 'The six personas of the collective — each name opens its EPK.'));
  const grid = el('div', 'grid');
  ALIASES.forEach((a) => grid.appendChild(card(a.name, a.epk, a.kind)));
  sec.appendChild(grid); secEl.appendChild(sec);
  sections.push({ id, label: 'Artist Profiles', count: ALIASES.length });
})();

// each LAB folder → a section
for (const [name, items] of Object.entries(LAB)) {
  const id = slug(name);
  const sec = el('section'); sec.id = id;
  sec.appendChild(el('h2', null, `${name} <span class="c">${items.length}</span>`));
  if (SECTION_LEAD[name]) sec.appendChild(el('div', 'lead', SECTION_LEAD[name]));
  const grid = el('div', 'grid');
  items.forEach((it) => grid.appendChild(card(it.name, it.url, it.note, { internal: it.internal, special: it.special })));
  sec.appendChild(grid); secEl.appendChild(sec);
  sections.push({ id, label: name, count: items.length });
}

// Links wall
(() => {
  const id = 'links';
  const linkCount = Object.values(LINKS).reduce((n, g) => n + Object.keys(g).length, 0);
  const sec = el('section'); sec.id = id;
  sec.appendChild(el('h2', null, `Links <span class="c">${linkCount}</span>`));
  sec.appendChild(el('div', 'lead', 'Off-site presence — portfolio, music, socials, web3 & support.'));
  const wall = el('div', 'links');
  for (const [group, entries] of Object.entries(LINKS)) {
    const col = el('div');
    col.appendChild(el('h3', null, group));
    for (const [label, url] of Object.entries(entries)) {
      const a = el('a', null, label); a.href = url; a.target = '_blank'; a.rel = 'noopener';
      col.appendChild(a);
    }
    wall.appendChild(col);
  }
  sec.appendChild(wall); secEl.appendChild(sec);
  sections.push({ id, label: 'Links', count: linkCount });
})();

// ── nav links ───────────────────────────────────────────────────────────────
const navLinks = {};
sections.forEach((s) => {
  const a = el('a', null, `<span>${s.label}</span><span class="n">${s.count}</span>`);
  a.href = '#' + s.id;
  a.onclick = () => { const nav = document.getElementById('nav'); nav.classList.remove('open'); };
  navEl.appendChild(a);
  navLinks[s.id] = a;
});

// active-state highlight as you scroll
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      Object.values(navLinks).forEach((a) => a.classList.remove('on'));
      const a = navLinks[e.target.id]; if (a) a.classList.add('on');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });
sections.forEach((s) => { const n = document.getElementById(s.id); if (n) obs.observe(n); });

// mobile menu toggle
const mt = document.getElementById('menutoggle');
if (mt) mt.onclick = () => document.getElementById('nav').classList.toggle('open');
