import * as THREE from 'three';
import { WalkControls } from '../player/controls.js';
import { buildLoopDoors } from '../data/loop.js';
import { buildDJDeck } from './djdeck.js';
import { addMotes, addHaze } from './ambientfx.js';
import { createAdmin } from './admin.js';

// Boilerplate for a simple walkable LOOP room: renderer + scene + camera, first-person
// controls, the back/forward loop doors, a DJ deck, drag-look + tap-to-walk input, the
// back button, and the render loop. A room file calls createRoom(...) then just adds its
// own content to `scene` (and optional tap handlers via addTap). Keeps the new rooms tiny.

// Shared complex motif: a glowing accent baseboard trim where wall meets floor.
// Rectangular (x0..x1, z0..z1) or a ring (radius). Ties every room together.
export function addBaseboard(scene, updaters, { color, x0 = -13, x1 = 13, z0 = -13, z1 = 13, ring = false, radius = 13, y = 0.16 }) {
  const ac = new THREE.Color(color); const tm = new THREE.MeshBasicMaterial({ color });
  if (ring) { const r = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.09, 8, 90), tm); r.rotation.x = -Math.PI / 2; r.position.y = y; scene.add(r); }
  else {
    const w = x1 - x0, d = z1 - z0, cx = (x0 + x1) / 2, cz = (z0 + z1) / 2;
    const bar = (bw, bd, bx, bz) => { const m = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.14, bd), tm); m.position.set(bx, y, bz); scene.add(m); };
    bar(w, 0.16, cx, z0); bar(w, 0.16, cx, z1); bar(0.16, d, x0, cz); bar(0.16, d, x1, cz);
  }
  const gb = new THREE.PointLight(color, 0.8, 40, 2); gb.position.set((x0 + x1) / 2, 0.6, (z0 + z1) / 2); scene.add(gb);
  updaters.push((dt, t) => { const p = 0.6 + Math.sin(t * 1.5) * 0.25; tm.color.copy(ac).multiplyScalar(0.7 + p * 0.5); gb.intensity = 0.6 + p * 0.4; });
}

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

  // ---- layout editor: every loop room is editable like the festival ----
  // The loop doors + DJ deck are registered as movable items; a room can add its
  // own props via api.addAdminItem(...). Toggle with the ✎ button / `~` key.
  const adminItems = [];
  loopDoors.forEach((d, i) => adminItems.push({ id: 'loopdoor_' + i, label: d.label || ('door ' + i), obj: d.group }));
  if (deck && deck.group) adminItems.push({ id: 'deck', label: 'DJ DECK', obj: deck.group });
  const admin = createAdmin({ scene, camera, renderer, controls, worldId: id, items: adminItems, overhead: { ax: bounds * 2.4, az: bounds * 2.4, cz: (zMin + bounds) / 2 } });
  // ambient atmosphere — floating motes + optional low haze
  if (motes) updaters.push(addMotes(scene, { color: 0xbfc8ff, count: 130, area: [24, 10, 24], center: [0, 4, 0], rise: 0.28, opacity: 0.4, ...motes }));
  if (haze) updaters.push(addHaze(scene, { color: 0x2a3060, count: 6, center: [0, 1.5, 0], area: [24, 4, 24], scale: 9, opacity: 0.05, ...haze }));
  // shared complex motif: a glowing accent baseboard trim around the room where wall meets floor
  if (accent) { const h = bounds - 0.3; addBaseboard(scene, updaters, { color: accent, x0: -h, x1: h, z0: -h, z1: h }); }

  // ---- input ----
  const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(); const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  let down = null, dragged = false; const taps = [];
  canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
  canvas.addEventListener('pointermove', (e) => { if (!down || e.pointerId !== down.id) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true; if (!admin.active) controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2); down.x = e.clientX; down.y = e.clientY; });
  canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
  canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
  function tap(sx, sy) {
    if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
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
    for (const d of loopDoors) { d.update(dt, t, controls.pos); if (!admin.active) d.tryEnter(controls.pos); }
    if (deck) deck.update(dt, t);
    for (const u of updaters) u(dt, t);
    for (const cb of frameCbs) cb(dt, t);
    admin.update(dt);
    renderer.render(scene, admin.active ? admin.cam : camera);
  }
  controls.update(0); renderer.render(scene, camera);
  const startEl = document.getElementById('enterBtn');
  const begin = () => { document.getElementById('start')?.classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
  if (startEl) startEl.onclick = begin; else begin();
  document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

  const api = { THREE, scene, camera, renderer, updaters, controls, loopDoors, deck, admin, isMobile, textPlane, std: (o) => new THREE.MeshStandardMaterial(o), C: (h) => new THREE.Color(h), addTap: (fn) => taps.push(fn), onFrame: (fn) => frameCbs.push(fn), addAdminItem: (it) => adminItems.push(it), zoneEl: document.getElementById('zone'), hintEl: document.getElementById('hint') };
  if (import.meta.env.DEV) window[hook] = api;
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) window.__world = { THREE, scene, camera, renderer };
  return api;
}
