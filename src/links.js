// The LINKS HUB page — renders the whole 12matt3r directory (every project, app,
// alias and social) from src/data/links.js. Same-origin lightweight page; every
// outbound link opens in a new tab. Reached from the warehouse hub's LINKS portal.
import { OWNER, BIO, LINK_CATEGORIES } from './data/links.js';
import { initGlobalPlayer } from './player/globalplayer.js';

initGlobalPlayer({ transport: true, autoResume: true });   // keep the music going here too

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const host = (u) => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };

const total = LINK_CATEGORIES.reduce((n, c) => n + c.items.length, 0);
document.getElementById('hubOwner').textContent = OWNER;
document.getElementById('hubBio').textContent = BIO;
document.getElementById('hubCount').textContent = `${total} links · ${LINK_CATEGORIES.length} categories`;

const root = document.getElementById('cats');
root.innerHTML = LINK_CATEGORIES.map((cat) => `
  <section class="cat" data-cat>
    <h2>${esc(cat.title)} <span class="n">${cat.items.length}</span></h2>
    <div class="grid">
      ${cat.items.map((it) => `
        <a class="card" href="${esc(it.url)}" target="_blank" rel="noopener" data-search="${esc((it.title + ' ' + it.note + ' ' + cat.title).toLowerCase())}">
          <div class="t">${esc(it.title)}</div>
          ${it.note ? `<div class="d">${esc(it.note)}</div>` : ''}
          <div class="h">${esc(host(it.url))} ↗</div>
        </a>`).join('')}
    </div>
  </section>`).join('');

// live search filter
const search = document.getElementById('hubSearch');
search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  for (const sec of root.querySelectorAll('[data-cat]')) {
    let shown = 0;
    for (const card of sec.querySelectorAll('.card')) {
      const match = !q || card.dataset.search.includes(q);
      card.style.display = match ? '' : 'none';
      if (match) shown++;
    }
    sec.style.display = shown ? '' : 'none';
  }
});
