import * as THREE from 'three';
import { createReducedMotion, prefersReducedMotion } from './player/motion.js';
import { openWindow } from './ui/popup.js';
import { ALL_ENTRIES } from './data/chroma.js';
import { setScreenMap, onScreenTap, onFrame, start, scene, player, applyCam } from './scene/theater.js';

// CHROMA THEATER — the DreamOS TV room (scene/theater.js) screening every Chroma
// Awards entry. Each entry gets a marquee title card on the big screen (or its
// trailer, if data/chroma.js gives one). Clicking the screen — or the play
// button — opens the entry itself in the in-site window.

createReducedMotion();

const $ = (id) => document.getElementById(id);
const entries = ALL_ENTRIES;
const urlId = new URLSearchParams(location.search).get('e');
let idx = Math.max(0, entries.findIndex((e) => e.id === urlId));

// ---- the title card (a canvas texture on the screen) ----
const CW = 1500, CH = 640;
const card = document.createElement('canvas'); card.width = CW; card.height = CH;
const ctx = card.getContext('2d');
const cardTex = new THREE.CanvasTexture(card);
cardTex.colorSpace = THREE.SRGBColorSpace;

function fitText(text, maxW, size, weight = '700') {
  let s = size;
  do { ctx.font = `${weight} ${s}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`; s -= 4; } while (ctx.measureText(text).width > maxW && s > 28);
}
function drawCard(e, t) {
  const glitch = prefersReducedMotion() ? 0 : (Math.sin(t * 2.1) > 0.97 ? 1 : 0) * 14;
  ctx.fillStyle = '#05050e'; ctx.fillRect(0, 0, CW, CH);
  const g = ctx.createRadialGradient(CW * 0.3, CH * 0.2, 40, CW * 0.5, CH * 0.5, CW * 0.7);
  g.addColorStop(0, e.accent + 'dd'); g.addColorStop(1, '#0a0a18');
  ctx.fillStyle = g; ctx.fillRect(0, 0, CW, CH);
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.font = '600 30px ui-monospace, Menlo, Consolas, monospace';
  ctx.fillStyle = 'rgba(255,255,255,.7)';
  ctx.fillText(`CHROMA AWARDS ${e.year}`.split('').join(' '), CW / 2, 130);
  fitText(e.title.toUpperCase(), CW - 160, 170);
  // RGB-split title
  for (const [dx, col] of [[-6 - glitch, '#00f3ff'], [6 + glitch, '#ff0055']]) { ctx.fillStyle = col; ctx.globalAlpha = 0.85; ctx.fillText(e.title.toUpperCase(), CW / 2 + dx, CH * 0.4); }
  ctx.globalAlpha = 1; ctx.fillStyle = '#fff'; ctx.fillText(e.title.toUpperCase(), CW / 2, CH * 0.4);
  ctx.font = '500 34px ui-monospace, Menlo, Consolas, monospace';
  ctx.fillStyle = 'rgba(255,255,255,.88)'; ctx.fillText(e.tag.toUpperCase(), CW / 2, CH * 0.58);
  ctx.font = '600 28px ui-monospace, Menlo, Consolas, monospace';
  ctx.fillStyle = 'rgba(255,255,255,.75)';
  ctx.fillText(`${e.trailer ? '▶ NOW PLAYING' : 'NOW SHOWING'}  ·  ${idx + 1} / ${entries.length}  ·  CLICK TO PLAY`, CW / 2, CH * 0.72);
  // scanlines
  ctx.fillStyle = 'rgba(0,0,0,.18)';
  for (let y = 0; y < CH; y += 4) ctx.fillRect(0, y, CW, 2);
  cardTex.needsUpdate = true;
}

// ---- optional trailer: a VideoTexture, used instead of the card when present ----
const video = document.createElement('video');
video.playsInline = true; video.loop = true; video.crossOrigin = 'anonymous'; video.preload = 'metadata';
const videoTex = new THREE.VideoTexture(video);
videoTex.colorSpace = THREE.SRGBColorSpace;

const chName = $('chName'), chNo = $('chNo'), mTag = $('mTag'), mBlurb = $('mBlurb');
let started = false;
function show(i) {
  idx = ((i % entries.length) + entries.length) % entries.length;
  const e = entries[idx];
  chName.textContent = e.title.toUpperCase();
  chNo.textContent = `CHROMA AWARDS ${e.year} · ${idx + 1} / ${entries.length}`;
  mTag.textContent = e.tag; mBlurb.textContent = e.blurb;
  history.replaceState(null, '', `?e=${encodeURIComponent(e.id)}`);
  if (e.trailer) {
    video.src = e.trailer; video.muted = !started;
    video.play().catch(() => {});
    setScreenMap(videoTex);
  } else {
    video.pause(); video.removeAttribute('src');
    drawCard(e, 0);
    setScreenMap(cardTex, 0xffffff);
  }
}
const playCurrent = () => { const e = entries[idx]; video.pause(); openWindow(e.title, new URL(e.url, location.href).href); };
onScreenTap(playCurrent);
$('playBtn').onclick = playCurrent;
$('nextCh').onclick = () => show(idx + 1);
$('prevCh').onclick = () => show(idx - 1);
addEventListener('keydown', (ev) => { if (ev.key === 'ArrowRight' && ev.shiftKey) show(idx + 1); else if (ev.key === 'ArrowLeft' && ev.shiftKey) show(idx - 1); });

// the title card breathes (glitch + redraw) a few times a second
let acc = 0;
onFrame((dt, t) => {
  acc += dt; if (acc < 0.12) return; acc = 0;
  const e = entries[idx]; if (!e.trailer) drawCard(e, t);
});

$('backBtn').onclick = () => {
  $('warp').classList.add('go');
  setTimeout(() => { location.href = 'chroma.html'; }, 480);
};
$('enterBtn').onclick = () => { started = true; $('start').classList.add('gone'); start(); video.muted = false; };

show(idx);
if (import.meta.env.DEV) window.__chromaTheater = { player, applyCam, scene };
