import { CHROMA } from './data/chroma.js';

// The voting booth page (opened from the lobby's booth): one card per Chroma Awards
// entry, linking to that entry's vote page (`vote` in data/chroma.js). Entries
// without a link yet show a placeholder instead of a dead button.
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safe = (u) => { if (!u) return ''; try { const x = new URL(u, location.href); return x.protocol === 'https:' || x.protocol === 'http:' ? x.href : ''; } catch { return ''; } };

document.getElementById('app').innerHTML = CHROMA.years.map((y) => `
  <h2>${y.year} · ${esc(y.label)}</h2>
  <div class="grid">${y.entries.map((e) => {
    const url = safe(e.vote || CHROMA.voteHub || '');
    return `<div class="card" style="--a:${esc(e.accent)}">
      <div class="n">${esc(e.glyph)} ${esc(e.title)}</div><div class="t">${esc(e.tag)}</div><div class="d">${esc(e.blurb)}</div>
      ${url ? `<a class="btn" href="${esc(url)}" target="_blank" rel="noopener">VOTE FOR ${esc(e.title.toUpperCase())} ↗</a>` : '<span class="btn">VOTE LINK COMING SOON</span>'}
    </div>`;
  }).join('')}</div>`).join('');
