// THE BOARD — the 12matt3r blog / message board. Renders every post baked from
// content/blog/ by scripts/gen-posts.mjs (newest first). Posts are authored by
// the site owner (text/PDF/DOCX dropped into the repo), so their HTML is trusted
// and injected as-is. Same-origin lightweight page; global music keeps playing.
import { POSTS } from './data/posts.js';
import { initGlobalPlayer } from './player/globalplayer.js';

initGlobalPlayer({ transport: true, autoResume: true });

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtDate = (iso) => {
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return iso;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

const countEl = document.getElementById('count');
const root = document.getElementById('posts');

if (!POSTS.length) {
  countEl.textContent = 'no posts yet';
  root.innerHTML = `<div class="empty">Nothing posted yet.<br>Drop a <code>.md</code>, <code>.txt</code>, <code>.pdf</code> or <code>.docx</code> into <code>content/blog/</code> and push.</div>`;
} else {
  countEl.textContent = `${POSTS.length} post${POSTS.length === 1 ? '' : 's'} · newest first`;
  root.innerHTML = POSTS.map((p) => `
    <article class="post" data-search="${esc((p.title + ' ' + (p.excerpt || '')).toLowerCase())}">
      <div class="meta">
        <span class="date">${esc(fmtDate(p.date))}</span>
        <span class="kind">${esc(p.type)}</span>
      </div>
      <h2>${esc(p.title)}</h2>
      <div class="body">${p.html || ''}</div>
    </article>`).join('');
}

// live search filter
const q = document.getElementById('q');
q.addEventListener('input', () => {
  const term = q.value.trim().toLowerCase();
  let shown = 0;
  for (const el of root.querySelectorAll('.post')) {
    const match = !term || el.dataset.search.includes(term);
    el.style.display = match ? '' : 'none';
    if (match) shown++;
  }
  countEl.textContent = term ? `${shown} match${shown === 1 ? '' : 'es'}` : `${POSTS.length} post${POSTS.length === 1 ? '' : 's'} · newest first`;
});
