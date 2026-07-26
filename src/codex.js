// The encyclopedia, rendered on the site. It imports the ONE codex source
// (docs/CODEX.md) raw and renders it, so the page can never drift from the doc.
import md from '../docs/CODEX.md?raw';
import { WORLD_MAPS, MAP_KINDS } from './data/worldmaps.js';

// tiny, purpose-built markdown renderer (headings, tables, lists, hr, inline)
function inline(s) {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

function cells(row) { return row.split('|').slice(1, -1).map((c) => c.trim()); }

function table(rows) {
  const head = cells(rows[0]);
  const body = rows.slice(2).map(cells); // rows[1] is the |---| separator
  let h = '<div class="tw"><table><thead><tr>';
  h += head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
  for (const r of body) h += '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>';
  return h + '</tbody></table></div>';
}

function render(src) {
  const lines = src.split('\n');
  let out = '', i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^\s*---\s*$/.test(line)) { out += '<hr>'; i++; continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) { const lv = h[1].length; out += `<h${lv}>${inline(h[2])}</h${lv}>`; i++; continue; }
    if (line.trim().startsWith('|')) {
      const rows = []; while (i < lines.length && lines[i].trim().startsWith('|')) { rows.push(lines[i]); i++; }
      out += table(rows); continue;
    }
    if (/^\s*[-*]\s+/.test(line)) {
      out += '<ul>';
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) { out += `<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ''))}</li>`; i++; }
      out += '</ul>'; continue;
    }
    if (line.trim() === '') { i++; continue; }
    const para = [line]; i++;
    while (i < lines.length && lines[i].trim() !== '' && !/^\s*([-*#|]|---)/.test(lines[i])) { para.push(lines[i]); i++; }
    out += `<p>${inline(para.join(' '))}</p>`;
  }
  return out;
}

// ---- world maps (top-down SVG atlas) ------------------------------------
// Rendered from src/data/worldmaps.js so every notable thing in a world — the
// person, their EPK, structures, games, prop landmarks — shows on the map at
// its real world-space position.
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function mapSvg(w) {
  const [minX, maxX, minZ, maxZ] = w.bounds;
  const wW = maxX - minX, wH = maxZ - minZ;
  const PAD = 34, IW = 660, IH = Math.round((IW - PAD * 2) * (wH / wW)) + PAD * 2;
  // world [x,z] → svg [px,py]; +x east (right), +z south (down)
  const sx = (x) => PAD + ((x - minX) / wW) * (IW - PAD * 2);
  const sy = (z) => PAD + ((z - minZ) / wH) * (IH - PAD * 2);

  let g = '';
  // frame + faint grid (every 10 world units)
  g += `<rect x="${PAD}" y="${PAD}" width="${IW - PAD * 2}" height="${IH - PAD * 2}" fill="rgba(255,255,255,.015)" stroke="${w.accent}" stroke-opacity=".35" rx="8"/>`;
  const gridStep = 10;
  for (let gx = Math.ceil(minX / gridStep) * gridStep; gx < maxX; gx += gridStep) {
    if (gx === 0) continue;
    g += `<line x1="${sx(gx).toFixed(1)}" y1="${PAD}" x2="${sx(gx).toFixed(1)}" y2="${IH - PAD}" stroke="rgba(255,255,255,.05)"/>`;
  }
  for (let gz = Math.ceil(minZ / gridStep) * gridStep; gz < maxZ; gz += gridStep) {
    if (gz === 0) continue;
    g += `<line x1="${PAD}" y1="${sy(gz).toFixed(1)}" x2="${IW - PAD}" y2="${sy(gz).toFixed(1)}" stroke="rgba(255,255,255,.05)"/>`;
  }
  // origin cross-hair (world 0,0)
  if (minX < 0 && maxX > 0) g += `<line x1="${sx(0).toFixed(1)}" y1="${PAD}" x2="${sx(0).toFixed(1)}" y2="${IH - PAD}" stroke="rgba(255,255,255,.12)" stroke-dasharray="3 5"/>`;
  if (minZ < 0 && maxZ > 0) g += `<line x1="${PAD}" y1="${sy(0).toFixed(1)}" x2="${IW - PAD}" y2="${sy(0).toFixed(1)}" stroke="rgba(255,255,255,.12)" stroke-dasharray="3 5"/>`;
  // compass
  g += `<text x="${IW / 2}" y="${PAD - 12}" fill="var(--muted)" font-size="10" text-anchor="middle" font-family="var(--mono)">N ↑ (stage side)</text>`;

  // items — one labeled dot per item/person. Compute the true screen position
  // for each, then relax any that land on top of each other so every dot stays
  // individually visible (two things at one spot → two separate dots). A faint
  // leader line ties a nudged dot back to its true position.
  const nodes = w.items.map((item) => {
    const k = MAP_KINDS[item.kind] || MAP_KINDS.prop;
    const tx0 = sx(item.x), ty0 = sy(item.z);
    const r = item.kind === 'person' || item.kind === 'spawn' ? 6 : 4.5;
    return { item, k, r, tx0, ty0, x: tx0, y: ty0 };
  });
  const MIN = 15; // px of breathing room between dot centers
  for (let iter = 0; iter < 60; iter++) {
    let moved = false;
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const na = nodes[a], nb = nodes[b];
        let dx = nb.x - na.x, dy = nb.y - na.y;
        let d = Math.hypot(dx, dy);
        if (d < MIN) {
          if (d < 0.01) { dx = (Math.random() - 0.5); dy = (Math.random() - 0.5); d = Math.hypot(dx, dy) || 1; }
          const push = (MIN - d) / 2;
          const ux = dx / d, uy = dy / d;
          na.x -= ux * push; na.y -= uy * push;
          nb.x += ux * push; nb.y += uy * push;
          moved = true;
        }
      }
    }
    for (const n of nodes) { // keep inside the frame
      n.x = Math.max(PAD + n.r, Math.min(IW - PAD - n.r, n.x));
      n.y = Math.max(PAD + n.r, Math.min(IH - PAD - n.r, n.y));
    }
    if (!moved) break;
  }
  for (const n of nodes) {
    const { item, k, r } = n;
    const left = n.x > IW * 0.62;
    const tx = left ? n.x - 9 : n.x + 9;
    const anchor = left ? 'end' : 'start';
    // leader from nudged dot back to true position, if it drifted
    if (Math.hypot(n.x - n.tx0, n.y - n.ty0) > 3) {
      g += `<line x1="${n.tx0.toFixed(1)}" y1="${n.ty0.toFixed(1)}" x2="${n.x.toFixed(1)}" y2="${n.y.toFixed(1)}" stroke="${k.color}" stroke-opacity=".35" stroke-width="1"/>`;
      g += `<circle cx="${n.tx0.toFixed(1)}" cy="${n.ty0.toFixed(1)}" r="1.6" fill="${k.color}" fill-opacity=".55"/>`;
    }
    g += `<g>`;
    if (item.kind === 'spawn') g += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="11" fill="none" stroke="${k.color}" stroke-opacity=".5"/>`;
    g += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${r}" fill="${k.color}" stroke="#05060f" stroke-width="1"/>`;
    g += `<text x="${tx.toFixed(1)}" y="${(n.y + 3.5).toFixed(1)}" fill="#d7d7e4" font-size="11" text-anchor="${anchor}" font-family="var(--mono)">${esc(item.label)}</text>`;
    g += `</g>`;
  }
  return `<svg class="wmap" viewBox="0 0 ${IW} ${IH}" role="img" aria-label="${esc(w.name)} map">${g}</svg>`;
}

function mapsSection() {
  const kinds = Object.values(MAP_KINDS);
  const legend = kinds.map((k) => `<span class="lg"><i style="background:${k.color}"></i>${esc(k.label)}</span>`).join('');
  let h = `<h2 id="maps">World maps</h2>`;
  h += `<p>Top-down floor-plans of every walkable world — each structure, person, EPK, game and landmark plotted at its real position. +x is east, +z is south (toward where you spawn); the stage/EPK side is north (top).</p>`;
  h += `<div class="wlegend">${legend}</div>`;
  for (const w of WORLD_MAPS) {
    h += `<h3>${esc(w.name)}</h3>`;
    h += `<p>${esc(w.blurb)}</p>`;
    h += `<div class="wmapwrap">${mapSvg(w)}</div>`;
    // cut-out label sheet: every item as a dot+name chip, separate from the
    // plotted map, so you can screenshot these and paste them where you want.
    const chips = w.items.map((item) => {
      const k = MAP_KINDS[item.kind] || MAP_KINDS.prop;
      return `<span class="chip"><i style="background:${k.color}"></i>${esc(item.label)}</span>`;
    }).join('');
    h += `<details class="cutouts"><summary>✂ cut-out labels — ${w.items.length} pins</summary><div class="chipsheet">${chips}</div></details>`;
  }
  return h;
}

document.getElementById('doc').innerHTML = render(md) + mapsSection();
