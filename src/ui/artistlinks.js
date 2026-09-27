// A drop-in "LINKS" panel for an artist's world. One call — mountArtistLinks(name)
// — injects a small HUD button and an overlay listing that artist's EPK + links
// (the canonical, correct ones from data/artistlinks.js). Every link opens in a
// new tab. No per-page HTML needed; styles inject once.
import { ARTIST_LINKS } from '../data/artistlinks.js';

let styled = false;
function injectStyle() {
  if (styled) return; styled = true;
  const css = `
    .al-btn{position:fixed;left:16px;bottom:62px;z-index:8;font-family:ui-monospace,"JetBrains Mono",Menlo,monospace;
      font-size:11px;letter-spacing:.08em;color:#eaf6ff;background:rgba(6,12,18,.72);border:1px solid rgba(255,255,255,.18);
      border-radius:9px;padding:8px 12px;cursor:pointer;backdrop-filter:blur(6px)}
    .al-btn:hover{border-color:#00f3ff;color:#fff}
    .al-ov{position:fixed;inset:0;z-index:40;display:none;align-items:center;justify-content:center;padding:24px;
      background:radial-gradient(70% 60% at 50% 40%,rgba(10,8,26,.86),rgba(2,3,10,.96))}
    .al-ov.on{display:flex}
    .al-card{width:min(440px,94vw);background:linear-gradient(180deg,rgba(16,18,30,.96),rgba(8,10,18,.96));
      border:1px solid rgba(255,255,255,.14);border-radius:16px;padding:22px;box-shadow:0 24px 60px -20px rgba(0,243,255,.4)}
    .al-card h2{font-family:ui-monospace,monospace;font-size:20px;letter-spacing:.05em;color:#00f3ff;text-shadow:2px 0 #ff0055}
    .al-card .note{font-size:12.5px;color:#8aa0ac;line-height:1.6;margin:8px 0 16px}
    .al-links{display:flex;flex-direction:column;gap:9px}
    .al-links a{display:flex;justify-content:space-between;align-items:center;gap:10px;text-decoration:none;
      font-family:ui-monospace,monospace;font-size:13px;color:#eaf6ff;background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:11px 14px;transition:.14s}
    .al-links a:hover{border-color:#00f3ff;color:#fff;background:rgba(0,243,255,.08)}
    .al-links a.epk{border-color:rgba(0,243,255,.5);color:#00f3ff}
    .al-links a .go{font-size:11px;color:#8aa0ac}
    .al-close{margin-top:16px;width:100%;font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.1em;
      color:#eaf6ff;background:transparent;border:1px solid rgba(255,255,255,.16);border-radius:10px;padding:9px;cursor:pointer}
    .al-close:hover{border-color:#ff0055;color:#fff}
    @media(max-width:600px){.al-btn{bottom:58px}}`;
  const el = document.createElement('style'); el.textContent = css; document.head.appendChild(el);
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Mount the LINKS button + overlay for `name` (a key of ARTIST_LINKS).
export function mountArtistLinks(name) {
  const data = ARTIST_LINKS[name];
  if (!data) return;
  injectStyle();

  const btn = document.createElement('button');
  btn.className = 'al-btn'; btn.textContent = '🔗 links'; btn.setAttribute('aria-label', `${name} links`);
  document.body.appendChild(btn);

  const ov = document.createElement('div');
  ov.className = 'al-ov'; ov.setAttribute('aria-hidden', 'true');
  const rows = [];
  if (data.epk) rows.push(`<a class="epk" href="${esc(data.epk)}" target="_blank" rel="noopener">EPK <span class="go">↗</span></a>`);
  for (const l of data.links) rows.push(`<a href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.title)} <span class="go">↗</span></a>`);
  rows.push('<a href="links.html"><span>All projects &amp; socials</span><span class="go">▸</span></a>');
  ov.innerHTML = `<div class="al-card" role="dialog" aria-label="${esc(name)} links">
    <h2>${esc(name)}</h2>
    <div class="note">${esc(data.note || '')}</div>
    <div class="al-links">${rows.join('')}</div>
    <button class="al-close">close</button>
  </div>`;
  document.body.appendChild(ov);

  const open = () => { ov.classList.add('on'); ov.setAttribute('aria-hidden', 'false'); };
  const close = () => { ov.classList.remove('on'); ov.setAttribute('aria-hidden', 'true'); };
  btn.onclick = open;
  ov.querySelector('.al-close').onclick = close;
  ov.addEventListener('click', (e) => { if (e.target === ov) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ov.classList.contains('on')) close(); });
  return { open, close };
}
