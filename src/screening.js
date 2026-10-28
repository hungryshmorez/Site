import * as THREE from 'three';
import { createReducedMotion } from './player/motion.js';
import { THEATERS, ARCADE } from './data/theaters.js';
import { setScreenMap, setScreenAspect, showEmbed, setScreenMode, inScreenMode, onScreenTap, onFrame, start, scene, addBlockers, addClickable, player, RW, ZF } from './scene/theater.js';
import { textPlane } from './scene/signs.js';
import { votingBooth } from './scene/booth.js';
import { openVote } from './ui/vote.js';

// A lobby theater (Chroma Awards / 9×16 / 16×9 / Enter the Void / the Arcade) — the
// shared DreamOS room (scene/theater.js) sized to the room's aspect, playing that
// room's `items` from data/theaters.js. An item is a video file (`src`), a YouTube
// video (`yt`) or a playable page (`url`); the last two load on the big screen as a
// live embed — "step up" to the screen to control / play it. The Arcade adds a
// DreamOS terminal to pick the game. A room with nothing booked shows a card (or,
// for the Void, the animated trip shader).

createReducedMotion();
const $ = (id) => document.getElementById(id);
const cfg = [...THEATERS, ARCADE].find((t) => t.id === new URLSearchParams(location.search).get('room')) || THEATERS[1];
const items = cfg.items || [];
let idx = 0;

document.title = `${cfg.name} // Theater // 12matt3r`;
$('roomName').textContent = /THEATER|ARCADE/.test(cfg.name) ? cfg.name : `${cfg.name} THEATER`;
$('roomSub').textContent = cfg.sub.toUpperCase();
$('startName').textContent = cfg.name;
setScreenAspect(cfg.aspect);

// ---- card (shown when there's no video to play) ----
const CW = cfg.aspect >= 1 ? 1500 : Math.round(1500 * cfg.aspect), CH = cfg.aspect >= 1 ? Math.round(1500 / cfg.aspect) : 1500;
const card = document.createElement('canvas'); card.width = CW; card.height = CH;
const ctx = card.getContext('2d');
const cardTex = new THREE.CanvasTexture(card); cardTex.colorSpace = THREE.SRGBColorSpace;
const mono = (px, w = '700') => `${w} ${px}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`;
function wrap(text, maxW) {
  const out = []; let line = '';
  for (const word of text.split(' ')) { const t = line ? `${line} ${word}` : word; if (ctx.measureText(t).width > maxW && line) { out.push(line); line = word; } else line = t; }
  if (line) out.push(line); return out;
}
function drawCard(title, sub) {
  const u = Math.max(CW, CH) / 1500;
  ctx.fillStyle = '#05050e'; ctx.fillRect(0, 0, CW, CH);
  const g = ctx.createRadialGradient(CW * 0.3, CH * 0.25, 20, CW / 2, CH / 2, Math.max(CW, CH) * 0.7);
  g.addColorStop(0, cfg.accent + 'cc'); g.addColorStop(1, '#0a0a18'); ctx.fillStyle = g; ctx.fillRect(0, 0, CW, CH);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,255,255,.8)'; ctx.font = mono(Math.round(120 * u)); 
  const lines = wrap(title.toUpperCase(), CW - 80 * u);
  lines.forEach((l, i) => ctx.fillText(l, CW / 2, CH * 0.4 + (i - (lines.length - 1) / 2) * 130 * u));
  ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = mono(Math.round(34 * u), '500');
  ctx.fillText(sub.toUpperCase(), CW / 2, CH * 0.62);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 0; y < CH; y += 4) ctx.fillRect(0, y, CW, 2);
  cardTex.needsUpdate = true;
}

// ---- video ----
const video = document.createElement('video');
video.playsInline = true; video.loop = items.length === 1; video.crossOrigin = 'anonymous'; video.preload = 'metadata';
video.addEventListener('ended', () => show(idx + 1));
const videoTex = new THREE.VideoTexture(video); videoTex.colorSpace = THREE.SRGBColorSpace;
let started = false;

const kindOf = (it) => (it.yt || it.pl || it.url ? 'embed' : 'video');
const yt = `autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(location.origin)}`;
const embedUrl = (it) => (it.yt ? `https://www.youtube.com/embed/${encodeURIComponent(it.yt)}?${yt}`
  : it.pl ? `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(it.pl)}&${yt}`
  : new URL(it.url, location.href).href);

function show(i) {
  video.pause();
  if (!items.length) {
    if (cfg.shader) { setScreenMap(null); $('chName').textContent = cfg.name; $('chNo').textContent = 'LOOPING'; }
    else { drawCard(cfg.name, 'now booking — nothing screening yet'); setScreenMap(cardTex, 0xffffff); $('chName').textContent = cfg.name; $('chNo').textContent = 'NOW BOOKING'; }
    syncButtons(); return;
  }
  idx = ((i % items.length) + items.length) % items.length;
  const it = items[idx];
  $('chName').textContent = it.title; $('chNo').textContent = `${idx + 1} / ${items.length}${it.note ? ` · ${it.note}` : ''}`;
  if (kindOf(it) === 'embed') { setScreenMap(null); showEmbed(embedUrl(it)); }
  else { video.src = it.src; video.muted = !started; video.play().catch(() => {}); setScreenMap(videoTex); }
  syncButtons();
}
const current = () => items[idx];
const isEmbed = () => items.length && kindOf(current()) === 'embed';
function syncButtons() {
  $('playBtn').textContent = isEmbed() ? (inScreenMode() ? '◄ step back' : '🎮 step up to the screen') : '⏯ play / pause';
  $('playBtn').style.display = items.length ? '' : 'none';
}
const toggle = () => {
  if (!items.length) return;
  if (isEmbed()) { setScreenMode(!inScreenMode()); syncButtons(); return; }
  if (video.paused) video.play().catch(() => {}); else video.pause();
};
onScreenTap(toggle);
$('playBtn').onclick = toggle;
$('nextCh').onclick = () => { setScreenMode(false); show(idx + 1); };
$('prevCh').onclick = () => { setScreenMode(false); show(idx - 1); };
addEventListener('keydown', (e) => { if (e.key === 'Escape' && inScreenMode()) { setScreenMode(false); syncButtons(); } });
$('marq').style.display = 'none';

// ---- voting booths: walk in (or press 🗳) and the Chroma Awards vote page opens in the site ----
const booths = [-7, 7].map((x) => votingBooth({ parent: scene, x, z: 5.5, rotY: x < 0 ? 0 : Math.PI }));
addBlockers(booths.flatMap((b) => b.blockers));
const zones = booths.map((b) => ({ ...b.trigger, armed: true }));
const inside = (z, m = 0) => player.pos.x > z.x0 - m && player.pos.x < z.x1 + m && player.pos.z > z.z0 - m && player.pos.z < z.z1 + m;
onFrame((dt, t) => {
  booths.forEach((b) => b.update(dt, t));
  for (const z of zones) { if (inside(z)) { if (z.armed) { z.armed = false; openVote(); } } else if (!z.armed && !inside(z, 1.2)) z.armed = true; }
});
$('voteBtn').onclick = openVote;
if (cfg.desktop) { $('deskBtn').style.display = ''; $('deskBtn').onclick = () => { location.href = 'chroma.html'; }; }

// ---- the arcade's DreamOS terminal: pick a game, it loads on the big screen ----
if (cfg.terminal) {
  const css = document.createElement('style');
  css.textContent = `
  #term{position:fixed;z-index:25;left:16px;top:70px;bottom:70px;width:min(380px,calc(100vw - 32px));display:none;flex-direction:column;
    background:rgba(2,18,10,.94);border:1px solid rgba(57,255,20,.5);border-radius:12px;color:#c9ffd0;
    font-family:ui-monospace,"JetBrains Mono",Menlo,Consolas,monospace;box-shadow:0 0 40px -10px rgba(57,255,20,.5);overflow:hidden}
  #term.on{display:flex}
  #term .th{padding:12px 14px;border-bottom:1px solid rgba(57,255,20,.3);color:#39ff14;letter-spacing:.14em;font-size:12px;display:flex;justify-content:space-between;align-items:center}
  #term .th button{background:none;border:1px solid rgba(57,255,20,.4);color:#39ff14;border-radius:6px;padding:3px 8px;cursor:pointer;font:inherit;font-size:11px}
  #term input{margin:10px 12px 4px;padding:9px 11px;background:rgba(57,255,20,.06);border:1px solid rgba(57,255,20,.35);border-radius:8px;color:#c9ffd0;font:inherit;font-size:13px}
  #term .tabs{display:flex;gap:6px;flex-wrap:wrap;padding:6px 12px}
  #term .tabs button{font:inherit;font-size:10.5px;letter-spacing:.08em;padding:5px 9px;border-radius:14px;cursor:pointer;color:#7fd98a;background:none;border:1px solid rgba(57,255,20,.3)}
  #term .tabs button.on{background:#39ff14;color:#02120a;font-weight:700}
  #term .list{flex:1;overflow:auto;padding:6px 12px 12px;display:flex;flex-direction:column;gap:6px}
  #term .g{display:block;text-align:left;width:100%;padding:10px 12px;border-radius:9px;cursor:pointer;font:inherit;font-size:13px;color:#c9ffd0;background:rgba(57,255,20,.04);border:1px solid rgba(57,255,20,.25)}
  #term .g:hover,#term .g.on{border-color:#39ff14;box-shadow:0 0 18px -8px #39ff14;color:#fff}
  #term .g small{display:block;color:#3fa04a;font-size:10px;letter-spacing:.1em;margin-top:3px}
  #term .none{color:#3fa04a;font-size:12px;padding:8px 2px}
  #termBtn{display:inline-block}`;
  document.head.appendChild(css);
  const term = document.createElement('div'); term.id = 'term';
  term.innerHTML = '<div class="th"><span>DREAMOS TERMINAL // ' + cfg.name + '</span><button type="button" id="termX" aria-label="Hide terminal">hide</button></div><input id="termQ" type="search" placeholder="search…" autocomplete="off" aria-label="Search"><div class="tabs" id="termTabs"></div><div class="list" id="termList"></div>';
  document.body.appendChild(term);
  const tb = document.createElement('button'); tb.className = 'btn'; tb.id = 'termBtn'; tb.textContent = '🖥 terminal';
  $('prevCh').before(tb);
  let tab = 'ALL';
  const tabs = ['ALL', ...cfg.groups.map((g) => g.name)];
  const esc = (x) => String(x).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function draw() {
    const q = $('termQ').value.trim().toLowerCase();
    $('termTabs').innerHTML = tabs.map((t) => `<button type="button" class="${t === tab ? 'on' : ''}" data-t="${esc(t)}">${esc(t)}</button>`).join('');
    const list = items.map((it, i) => ({ it, i })).filter(({ it }) => (tab === 'ALL' || cfg.groups.find((g) => g.name === tab).items.includes(it)) && (!q || it.title.toLowerCase().includes(q)));
    $('termList').innerHTML = list.length ? list.map(({ it, i }) => `<button type="button" class="g${i === idx ? ' on' : ''}" data-i="${i}">${esc(it.title)}${it.note ? `<small>${esc(it.note.toUpperCase())}</small>` : ''}</button>`).join('') : '<div class="none">no games match.</div>';
  }
  const open = () => { setScreenMode(false); term.classList.add('on'); draw(); syncButtons(); };
  const close = () => term.classList.remove('on');
  $('termTabs').addEventListener('click', (e) => { const b = e.target.closest('[data-t]'); if (b) { tab = b.dataset.t; draw(); } });
  $('termQ').addEventListener('input', draw);
  $('termList').addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (!b) return; show(+b.dataset.i); close(); $('chNo').textContent += ' · click the screen to step up and play'; });
  $('termX').onclick = close;
  tb.onclick = () => (term.classList.contains('on') ? close() : open());
  window.__openTerminal = open;

  // the DreamOS terminal desk in the room — click it (or the 🖥 button) to pick something
  // else. Your pick plays on the big movie screen; the room stays around you.
  const kg = new THREE.Group(); kg.position.set(1.5, 0, 2.7); scene.add(kg);
  const deskM = new THREE.MeshStandardMaterial({ color: 0x1a2a22, roughness: 0.6 });
  const part = (w, h, d, m, x, y, z) => { const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); o.position.set(x, y, z); kg.add(o); return o; };
  part(1.5, 0.85, 0.8, deskM, 0, 0.425, 0);
  part(1.0, 0.8, 0.45, new THREE.MeshStandardMaterial({ color: 0x0c1410 }), 0, 1.25, -0.1);
  const scr = textPlane('DREAMOS', 0.85, 0.62, { color: '#39ff14', bg: '#02120a', glow: '#39ff14', sub: 'TERMINAL' }); scr.position.set(0, 1.25, 0.13); kg.add(scr);
  const kl = new THREE.PointLight(0x39ff14, 5, 7, 1.7); kl.position.set(0, 1.9, 0.9); kg.add(kl);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2, 1.2), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(0, 1, 0.1); kg.add(proxy);
  addBlockers([{ x0: 0.7, x1: 2.3, z0: 2.25, z1: 3.15 }]);
  addClickable((ray) => (ray.intersectObject(proxy, false)[0] ? (open(), true) : false));
}

$('backBtn').onclick = () => { $('warp').classList.add('go'); setTimeout(() => { location.href = 'lobby.html'; }, 480); };
$('enterBtn').onclick = () => { started = true; $('start').classList.add('gone'); start(); video.muted = false; if (cfg.terminal) window.__openTerminal(); };
if (!cfg.terminal) show(0); else { drawCard(cfg.name, 'pick something on the terminal'); setScreenMap(cardTex, 0xffffff); $('chName').textContent = cfg.name; $('chNo').textContent = 'DREAMOS TERMINAL'; syncButtons(); }
