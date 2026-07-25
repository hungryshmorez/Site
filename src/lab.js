// 12matt3r LABS — the DreamOS terminal behind the porta-potty. A data-driven
// launcher generated entirely from the canonical catalog. Dashboard of folders
// → click a folder → grid of launchable cards. Two extra folders surface the
// artist EPKs and the off-site link wall. Nothing is hard-coded here; edit
// src/data/catalog.js instead.

import { ALIASES, LAB, LINKS } from './data/catalog.js';
import { openWindow } from './ui/popup.js';

const app = document.getElementById('app');
const folderNames = Object.keys(LAB);

// One-line descriptions for the dashboard folder cards.
const FOLDER_DESC = {
  'DreamOS Ecosystem': 'operating systems & the TV',
  'Wake Up Series': 'the surreal dream saga',
  'Games': 'playable worlds & experiments',
  'Stories & Experiences': 'narrative & liminal spaces',
  'Tools': 'trippy cam, effects, the portal',
};

function el(tag, cls, html) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
}

// A launchable item card. Internal pages navigate in-tab; external worlds pop
// open in a Windows-style window over the Lab (no URL, never leaves the site).
function itemCard(item) {
  const a = el('a', 'card' + (item.special ? ' special' : '') + (item.internal ? '' : ' ext'));
  a.href = item.url;
  if (!item.internal) { a.onclick = (e) => { e.preventDefault(); openWindow(item.name, item.url); }; }
  a.appendChild(el('span', 'b', item.name));
  if (item.note) a.appendChild(el('span', 's', item.note));
  return a;
}

function crumb(title, count) {
  const c = el('div', 'crumb');
  const back = el('button', null, '◄ folders');
  back.onclick = () => renderDashboard();
  c.appendChild(back);
  c.appendChild(el('span', 'title', title));
  if (count != null) c.appendChild(el('span', 'count', `${count} item${count === 1 ? '' : 's'}`));
  return c;
}

function renderFolder(name) {
  app.innerHTML = '';
  const items = LAB[name];
  app.appendChild(crumb(name, items.length));
  const grid = el('div', 'grid');
  items.forEach((it) => grid.appendChild(itemCard(it)));
  app.appendChild(grid);
  window.scrollTo(0, 0);
}

function renderAliases() {
  app.innerHTML = '';
  app.appendChild(crumb('Artist Profiles', ALIASES.length));
  const grid = el('div', 'grid');
  ALIASES.forEach((al) => {
    const card = itemCard({ name: al.name, url: al.epk, note: al.kind });
    grid.appendChild(card);
  });
  app.appendChild(grid);
  window.scrollTo(0, 0);
}

function renderLinks() {
  app.innerHTML = '';
  app.appendChild(crumb('Off-site Links'));
  const wall = el('div', 'links');
  for (const [group, entries] of Object.entries(LINKS)) {
    const col = el('div');
    col.appendChild(el('h3', null, group));
    for (const [label, url] of Object.entries(entries)) {
      const a = el('a', null, label);
      a.href = url; a.target = '_blank'; a.rel = 'noopener';
      col.appendChild(a);
    }
    wall.appendChild(col);
  }
  app.appendChild(wall);
  window.scrollTo(0, 0);
}

function renderDashboard() {
  app.innerHTML = '';
  const grid = el('div', 'grid');

  // Artist profiles first, then each lab folder, then the link wall.
  const aliasCard = el('div', 'card folder');
  aliasCard.appendChild(el('span', 'b', 'Artist Profiles'));
  aliasCard.appendChild(el('span', 's', `${ALIASES.length} aliases · EPKs`));
  aliasCard.onclick = () => renderAliases();
  grid.appendChild(aliasCard);

  folderNames.forEach((name) => {
    const card = el('div', 'card folder');
    card.appendChild(el('span', 'b', name));
    card.appendChild(el('span', 's', `${LAB[name].length} · ${FOLDER_DESC[name] || ''}`));
    card.onclick = () => renderFolder(name);
    grid.appendChild(card);
  });

  const linkCard = el('div', 'card folder');
  linkCard.appendChild(el('span', 'b', 'Off-site Links'));
  const linkCount = Object.values(LINKS).reduce((n, g) => n + Object.keys(g).length, 0);
  linkCard.appendChild(el('span', 's', `${linkCount} · socials, music, web3`));
  linkCard.onclick = () => renderLinks();
  grid.appendChild(linkCard);

  app.appendChild(grid);
  window.scrollTo(0, 0);
}

renderDashboard();
