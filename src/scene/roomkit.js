import * as THREE from 'three';
import { WalkControls } from '../player/controls.js';
import { buildLoopDoors } from '../data/loop.js';
import { buildDJDeck } from './djdeck.js';
import { addMotes, addHaze } from './ambientfx.js';

// Boilerplate for a simple walkable LOOP room: renderer + scene + camera, first-person
// controls, the back/forward loop doors, a DJ deck, drag-look + tap-to-walk input, the
// back button, and the render loop. A room file calls createRoom(...) then just adds its
// own content to `scene` (and optional tap handlers via addTap). Keeps the new rooms tiny.

export function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.42)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

export function createRoom({
  id, hook = '__room', fog = null, exposure = 1.2,
  bounds = 13, zMin = -13, spawn = [0, 1.6, 11], yaw = 0,
  backAt, nextAt, deckAt, deckColor = 0x00f3ff,
  motes = null, haze = null, accent = null,
}) {
  const canvas = document.getElementById('scene');
  try { const K = '12m.explored'; const s = new Set(JSON.parse(localStorage.getItem(K) || '[]')); s.add(id); localStorage.setItem(K, JSON.stringify([...s])); } catch (e) {}
  const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = exposure;
  const scene = new THREE.Scene(); if (fog) scene.fog = new THREE.FogExp2(fog[0], fog[1]);
  const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 300);
  const updaters = [];
  const controls = new WalkControls(camera, { bounds, eye: 1.6, zMin }); controls.pos.set(spawn[0], spawn[1], spawn[2]); controls.yaw = yaw;
  const loopDoors = buildLoopDoors(scene, id, { back: backAt, next: nextAt });
  const deck = deckAt ? buildDJDeck(scene, { x: deckAt[0], z: deckAt[1], ry: deckAt[2] || 0, color: deckColor }) : null;
  // ambient atmosphere — floating motes + optional low haze
  if (motes) updaters.push(addMotes(scene, { color: 0xbfc8ff, count: 130, area: [24, 10, 24], center: [0, 4, 0], rise: 0.28, opacity: 0.4, ...motes }));
  if (haze) updaters.push(addHaze(scene, { color: 0x2a3060, count: 6, center: [0, 1.5, 0], area: [24, 4, 24], scale: 9, opacity: 0.05, ...haze }));
  // shared complex motif: a glowing accent baseboard trim around the room where wall meets floor
  if (accent) {
    const half = bounds - 0.3, ac = new THREE.Color(accent);
    const tm = new THREE.MeshBasicMaterial({ color: accent });
    const bar = (w, d, x, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 0.14, d), tm); m.position.set(x, 0.16, z); scene.add(m); };
    bar(half * 2, 0.16, 0, -half); bar(half * 2, 0.16, 0, half); bar(0.16, half * 2, -half, 0); bar(0.16, half * 2, half, 0);
    const gb = new THREE.PointLight(accent, 0.9, half * 2.4, 2); gb.position.set(0, 0.6, 0); scene.add(gb);
    updaters.push((dt, t) => { const p = 0.6 + Math.sin(t * 1.5) * 0.25; tm.color.copy(ac).multiplyScalar(0.7 + p * 0.5); gb.intensity = 0.7 + p * 0.4; });
  }

  // ---- input ----
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let down = null, dragged = false; const taps = [];
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
  canvas.addEventListener('pointermove', (e) => { if (!down || e.pointerId !== down.id) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true; controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2); down.x = e.clientX; down.y = e.clientY; });
  canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
  canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
  function tap(sx, sy) {
    ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1; ray.setFromCamera(ndc, camera);
    for (const d of loopDoors) { if (d.tap(ray)) return; }
    if (deck && deck.tap(ray)) return;
    for (const fn of taps) { if (fn(ray)) return; }
    const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
    if (g) { g.x = THREE.MathUtils.clamp(g.x, -bounds + 1, bounds - 1); g.z = THREE.MathUtils.clamp(g.z, zMin + 1, bounds - 1); controls.walkTo(g); }
  }
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });
  const backEl = document.getElementById('backBtn'); if (backEl) backEl.onclick = () => { const w = document.getElementById('warp'); if (w) w.classList.add('go'); setTimeout(() => { location.href = 'warehouse.html'; }, 460); };

  // ---- render loop ----
  const clock = new THREE.Clock(); let running = false; const frameCbs = [];
  function frame() {
    requestAnimationFrame(frame); if (document.hidden) return;
    const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime;
    controls.update(dt);
    for (const d of loopDoors) { d.update(dt, t, controls.pos); d.tryEnter(controls.pos); }
    if (deck) deck.update(dt, t);
    for (const u of updaters) u(dt, t);
    for (const cb of frameCbs) cb(dt, t);
    renderer.render(scene, camera);
  }
  controls.update(0); renderer.render(scene, camera);
  const startEl = document.getElementById('enterBtn');
  const begin = () => { document.getElementById('start')?.classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
  if (startEl) startEl.onclick = begin; else begin();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

  const api = { THREE, scene, camera, renderer, updaters, controls, loopDoors, deck, isMobile, textPlane, std: (o) => new THREE.MeshStandardMaterial(o), C: (h) => new THREE.Color(h), addTap: (fn) => taps.push(fn), onFrame: (fn) => frameCbs.push(fn), zoneEl: document.getElementById('zone'), hintEl: document.getElementById('hint') };
  if (import.meta.env.DEV) window[hook] = api;
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) window.__world = { THREE, scene, camera, renderer };
  return api;
}
