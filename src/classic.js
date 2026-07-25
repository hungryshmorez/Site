// 12matt3r — the CLASSIC MENU. Flat, two-column index. Up top: the LINKS block —
// a tab/emblem per character (plus a COLLECTIVE tab) that swaps in that entity's
// links, exactly like the old site. Below: the catalog sections. All generated
// from the shared catalog so the flat page, the Lab, and the 3D world stay synced.

import { ALIASES, LAB, LINKS } from './data/catalog.js';
import { openWindow } from './ui/popup.js';

const navEl = document.getElementById('nav');
const featEl = document.getElementById('features');
const secEl = document.getElementById('sections');

const SECTION_LEAD = {
  'DreamOS Ecosystem': 'Operating systems, the wake-up nodes, and system tools.',
  'Wake Up Series': 'The chronological catalog of surreal dream experiences.',
  'Games': 'Playable worlds, racers, sims, and experiments.',
  'Stories & Experiences': 'Narrative pieces and liminal spaces to wander through.',
  'Deadnet': 'The digital afterlife — a self-generating, non-real internet.',
  'Tools': 'Trippy Cam, effects, the synth studio, the flash portal.',
};

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// popup-launcher card (games/worlds open in the in-site window)
function card(name, url, sub, opts = {}) {
  const a = el('a', 'card' + (opts.special ? ' special' : '') + (opts.internal ? '' : ' ext'));
  a.href = url;
  if (opts.internal) { /* same-tab */ } else if (opts.tab) { a.target = '_blank'; a.rel = 'noopener'; }
  else { a.onclick = (e) => { e.preventDefault(); openWindow(name, url); }; }
  a.appendChild(el('span', 'b', name));
  if (sub) a.appendChild(el('span', 's', sub));
  return a;
}

// ── featured cards: Trippy Cam + DreamOS TV ─────────────────────────────────
const trippy = (LAB['Tools'] || []).find((t) => /trippy cam/i.test(t.name));
if (trippy) {
  const f = el('a', 'feat'); f.href = trippy.url;
  f.onclick = (e) => { e.preventDefault(); openWindow('TRIPPY CAM', trippy.url); };
  f.appendChild(el('b', null, 'TRIPPY CAM ↗'));
  f.appendChild(el('span', null, 'Real-time psychedelic webcam glitch studio. Point it at yourself.'));
  featEl.appendChild(f);
}
const ftv = el('a', 'feat tv'); ftv.href = 'tv.html';
ftv.appendChild(el('b', null, 'DREAMOS TV'));
ftv.appendChild(el('span', null, 'Walk-in CRT theater — the channel lineup, popcorn in the air.'));
featEl.appendChild(ftv);

const sections = []; // { id, label }

// ── LINKS AT THE TOP: character tabs + a COLLECTIVE tab ─────────────────────
(() => {
  const id = 'links';
  const sec = el('section'); sec.id = id;
  sec.appendChild(el('h2', null, 'Links <span class="c">by artist</span>'));
  sec.appendChild(el('div', 'lead', 'Pick an artist to see their links, or COLLECTIVE for the 12matt3r hubs.'));
  const tabs = el('div', 'ctabs');
  const panel = el('div', 'cpanel');
  sec.appendChild(tabs); sec.appendChild(panel);
  secEl.appendChild(sec);
  sections.push({ id, label: 'Links' });

  // build the tab set: each alias, then COLLECTIVE
  const entries = ALIASES.map((a) => ({ key: a.name, render: () => renderArtist(a) }));
  entries.push({ key: 'COLLECTIVE', render: renderCollective });
  const tabEls = {};
  entries.forEach((e, i) => {
    const t = el('div', 'ctab', e.key);
    t.onclick = () => { Object.values(tabEls).forEach((x) => x.classList.remove('on')); t.classList.add('on'); e.render(); };
    tabs.appendChild(t); tabEls[e.key] = t;
    if (i === 0) { t.classList.add('on'); e.render(); }
  });

  function renderArtist(a) {
    panel.innerHTML = '';
    panel.appendChild(el('div', 'who', a.name));
    if (a.genre) panel.appendChild(el('div', 'genre', a.genre));
    if (a.epk) {
      const b = el('span', 'epk', 'Open EPK ↗');
      b.onclick = () => openWindow(a.name + ' — EPK', a.epk);
      panel.appendChild(b);
    }
    if (a.links && a.links.length) {
      const grid = el('div', 'grid');
      a.links.forEach((l) => grid.appendChild(card(l.name, l.url, null, { tab: true })));
      panel.appendChild(grid);
    } else {
      panel.appendChild(el('div', 'lead', 'Links coming soon — the EPK has everything for now.'));
    }
  }
  function renderCollective() {
    panel.innerHTML = '';
    panel.appendChild(el('div', 'who', '12MATT3R — COLLECTIVE'));
    panel.appendChild(el('div', 'genre', 'The shared hubs, dev nodes, web3, and support.'));
    const wall = el('div', 'links');
    for (const [group, obj] of Object.entries(LINKS)) {
      const col = el('div');
      col.appendChild(el('h3', null, group));
      for (const [label, url] of Object.entries(obj)) {
        const link = el('a', null, label); link.href = url; link.target = '_blank'; link.rel = 'noopener';
        col.appendChild(link);
      }
      wall.appendChild(col);
    }
    panel.appendChild(wall);
  }
})();

// ── the catalog folders ─────────────────────────────────────────────────────
for (const [name, items] of Object.entries(LAB)) {
  const id = slug(name);
  const sec = el('section'); sec.id = id;
  sec.appendChild(el('h2', null, `${name} <span class="c">${items.length}</span>`));
  if (SECTION_LEAD[name]) sec.appendChild(el('div', 'lead', SECTION_LEAD[name]));
  const grid = el('div', 'grid');
  items.forEach((it) => grid.appendChild(card(it.name, it.url, it.note, { internal: it.internal, special: it.special })));
  sec.appendChild(grid); secEl.appendChild(sec);
  sections.push({ id, label: name });
}

// ── nav ─────────────────────────────────────────────────────────────────────
const navLinks = {};
sections.forEach((s) => {
  const a = el('a', null, `<span>${s.label}</span>`);
  a.href = '#' + s.id;
  a.onclick = () => document.getElementById('nav').classList.remove('open');
  navEl.appendChild(a);
  navLinks[s.id] = a;
});

const obs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      Object.values(navLinks).forEach((a) => a.classList.remove('on'));
      const a = navLinks[e.target.id]; if (a) a.classList.add('on');
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });
sections.forEach((s) => { const n = document.getElementById(s.id); if (n) obs.observe(n); });

const mt = document.getElementById('menutoggle');
if (mt) mt.onclick = () => document.getElementById('nav').classList.toggle('open');
