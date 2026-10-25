import * as THREE from 'three';
import { createReducedMotion } from './player/motion.js';
import { THEATERS } from './data/theaters.js';
import { setScreenMap, setScreenAspect, onScreenTap, onFrame, start } from './scene/theater.js';

// A lobby theater (9×16 / 16×9 / Enter the Void) — the shared DreamOS room
// (scene/theater.js) sized to the room's aspect, playing that room's `items` from
// data/theaters.js. A room with nothing booked shows a card (or, for the Void, the
// animated trip shader). Tap the screen or the button to play / pause.

createReducedMotion();
const $ = (id) => document.getElementById(id);
const cfg = THEATERS.find((t) => t.id === new URLSearchParams(location.search).get('room')) || THEATERS[1];
const items = cfg.items || [];
let idx = 0;

document.title = `${cfg.name} // Theater // 12matt3r`;
$('roomName').textContent = `${cfg.name} THEATER`;
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

function show(i) {
  if (!items.length) {
    if (cfg.shader) { setScreenMap(null); $('chName').textContent = cfg.name; $('chNo').textContent = 'LOOPING'; }
    else { drawCard(cfg.name, 'now booking — nothing screening yet'); setScreenMap(cardTex, 0xffffff); $('chName').textContent = cfg.name; $('chNo').textContent = 'NOW BOOKING'; }
    return;
  }
  idx = ((i % items.length) + items.length) % items.length;
  const it = items[idx];
  $('chName').textContent = it.title; $('chNo').textContent = `${idx + 1} / ${items.length}${it.note ? ` · ${it.note}` : ''}`;
  video.src = it.src; video.muted = !started; video.play().catch(() => {});
  setScreenMap(videoTex);
}
const toggle = () => { if (!items.length) return; if (video.paused) video.play().catch(() => {}); else video.pause(); };
onScreenTap(toggle);
$('playBtn').onclick = toggle;
$('nextCh').onclick = () => show(idx + 1);
$('prevCh').onclick = () => show(idx - 1);
$('marq').style.display = 'none';
onFrame(() => {});

$('backBtn').onclick = () => { $('warp').classList.add('go'); setTimeout(() => { location.href = 'lobby.html'; }, 480); };
$('enterBtn').onclick = () => { started = true; $('start').classList.add('gone'); start(); video.muted = false; };
show(0);
