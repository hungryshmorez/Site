import { CHROMA } from './data/chroma.js';

// The voting booth page, shown inside the site (an in-site window → this page → an
// iframe of the Chroma Awards vote page). Each Chroma entry can have its own `vote`
// link in data/chroma.js; entries without one fall back to the general Chroma Awards
// link (`voteHub`). One tab per distinct link.
const safe = (u) => { if (!u) return ''; try { const x = new URL(u, location.href); return x.protocol === 'https:' ? x.href : ''; } catch { return ''; } };
const hub = safe(CHROMA.voteHub);
const tabs = [];
for (const y of CHROMA.years) for (const e of y.entries) {
  const url = safe(e.vote) || hub;
  if (url && !tabs.some((t) => t.url === url)) tabs.push({ url, label: safe(e.vote) ? e.title : 'CHROMA AWARDS' });
}
const frame = document.getElementById('frame'), ext = document.getElementById('ext'), bar = document.getElementById('tabs');
function pick(i) {
  const t = tabs[i]; if (!t) return;
  frame.src = t.url; ext.href = t.url;
  [...bar.children].forEach((b, j) => b.classList.toggle('on', j === i));
}
if (!tabs.length) { document.getElementById('note').textContent = 'voting links are not set up yet'; ext.style.display = 'none'; }
else {
  if (tabs.length > 1) tabs.forEach((t, i) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = t.label; b.onclick = () => pick(i); bar.appendChild(b); });
  pick(0);
}
