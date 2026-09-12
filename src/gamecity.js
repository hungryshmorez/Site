import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';
import { WalkControls } from './player/controls.js';
import { buildHoop } from './scene/hoop.js';
import { buildGallery } from './scene/gallery.js';
import { buildDunkTank } from './scene/dunktank.js';
import { buildMonkeyPaw } from './scene/models.js';
import { createGameZones } from './scene/gamezones.js';
import { openWindow } from './ui/popup.js';
import { spawnMannequin } from './scene/mannequin.js';

// THE BLOCK — the games city. Loads the real modern_block city model (with its
// plazas + park) and lets you walk it; the physical (non-video) games live here
// — basketball, shooting gallery, dunk tank, Monkey's Paw — and a car is parked
// with a track marshal beside it: walk up and he asks if you want to race, which
// takes you to the racetrack (an offshoot world).

THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9fc4e6);
scene.fog = new THREE.Fog(0x9fc4e6, 260, 900);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 4000);

scene.add(new THREE.HemisphereLight(0xdfeeff, 0x545048, 1.15));
const sun = new THREE.DirectionalLight(0xfff4e0, 2.0); sun.position.set(120, 220, 90); scene.add(sun);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

// ---- loaders ----
const draco = new DRACOLoader(); draco.setDecoderPath('draco/gltf/');
const gltf = new GLTFLoader(); gltf.setDRACOLoader(draco);

// ---- ground raycast (walk the real city terrain) ----
const cityMeshes = [];
const ray = new THREE.Raycaster(); ray.firstHitOnly = true; ray.far = 4000;
const DOWN = new THREE.Vector3(0, -1, 0); const _o = new THREE.Vector3();
function groundY(x, z, fromY) {
  _o.set(x, fromY, z); ray.set(_o, DOWN);
  const hit = ray.intersectObjects(cityMeshes, true);
  return hit.length ? hit[0].point.y : null;
}

// ---- controls: walk, with the ground following the city mesh ----
const controls = new WalkControls(camera, { bounds: 100000, eye: 1.7, zMin: -100000 });
controls.speed = 8;
let cityBounds = null; // {cx,cz,r,y} — a soft clamp so you stay in the plaza
controls.groundAt = (x, z) => {
  const y = groundY(x, z, (controls.pos.y || 5) + 30);
  return y == null ? (controls.pos.y - controls.eye) : y;
};

// ---- drag-look + tap-to-walk / click ----
const clickables = [];
const ndc = new THREE.Vector2(); const cray = new THREE.Raycaster();
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  cray.setFromCamera(ndc, camera);
  for (const c of clickables) if (cray.intersectObject(c.proxy, false)[0]) { c.onClick(); return; }
  if (gamezones && gamezones.onTap()) return;
  // walk toward the tapped ground point
  const hit = cray.intersectObjects(cityMeshes, true)[0];
  if (hit) { const t = hit.point.clone(); t.y = controls.pos.y; controls.walkTo(t); }
}

// ---- the games + the racetrack marshal, placed after the city loads ----
let hoop, gallery, dunktank, paw, gamezones;
let hits = 0, made = 0, dunks = 0;
const pillEl = document.getElementById('pill');
const setPill = () => { if (pillEl) pillEl.textContent = `🎯 ${hits} · 🏀 ${made} · 💦 ${dunks}`; };

// floating race prompt near the marshal
let marshalPos = null;
const racePromptEl = document.getElementById('racePrompt');

function padAt(x, z) {
  // a group whose Y sits on the city ground at (x,z), so a flat-ground game
  // builder drops onto the real terrain. pos passed to the builder stays in
  // world x/z so each game's near(player) test still works.
  const y = groundY(x, z, 400);
  const g = new THREE.Group(); g.position.y = (y == null ? 0 : y) + 0.02; scene.add(g);
  return { group: g, y: y == null ? 0 : y };
}

function buildGames(spawn) {
  // cluster the games in the plaza around the spawn point
  const sx = spawn.x, sz = spawn.z;
  const P = (dx, dz) => [sx + dx, sz + dz];

  let p;
  p = padAt(...P(-14, -10)); hoop = buildHoop(p.group, { pos: P(-14, -10), onScore: (n) => { made = n; setPill(); } });
  p = padAt(...P(14, -10)); gallery = buildGallery(p.group, { pos: P(14, -10), onHit: (n) => { hits = n; setPill(); } });
  p = padAt(...P(0, -18)); dunktank = buildDunkTank(p.group, { pos: P(0, -18), onDunk: (n) => { dunks = n; setPill(); } });
  p = padAt(...P(-16, 6)); paw = buildMonkeyPaw('#b967ff'); paw.group.position.set(sx - 16, p.y, sz + 6); paw.group.rotation.y = 0.6; scene.add(paw.group);
  {
    const y = groundY(sx - 16, sz + 6, 400) ?? 0;
    const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.4, 2.2), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.set(sx - 16, y + 1.7, sz + 6); scene.add(proxy);
    clickables.push({ proxy, onClick: () => openWindow("THE MONKEY'S PAW", 'https://3jnyhlyqkqq1e.space.minimax.io/') });
  }

  // ---- the parked car + track marshal ----
  const carY = groundY(sx + 9, sz + 14, 400) ?? 0;
  const carSpot = new THREE.Vector3(sx + 9, carY, sz + 14);
  const carG = new THREE.Group(); carG.position.copy(carSpot); carG.rotation.y = -0.5; scene.add(carG);
  buildParkedCar(carG);
  // marshal figure standing beside the car
  const marY = groundY(sx + 12, sz + 15, 400) ?? carY;
  marshalPos = new THREE.Vector3(sx + 12, marY, sz + 15);
  // the track marshal — a real rigged mannequin, waving you over
  const faceY = Math.atan2(carSpot.x - marshalPos.x, carSpot.z - marshalPos.z);
  spawnMannequin(scene, { pos: [marshalPos.x, marY, marshalPos.z], rotY: faceY, color: '#ff2b55', pose: 'wave', scale: 1.05 });
  // floating banner over the car
  const banner = makeLabel('🏁 WANNA RACE?', '#ff0055'); banner.position.set(carSpot.x, carY + 4.2, carSpot.z); banner.scale.set(8, 2, 1); scene.add(banner);
  // clickable proxy: the car takes you to the racetrack
  const cproxy = new THREE.Mesh(new THREE.BoxGeometry(6, 4, 10), new THREE.MeshBasicMaterial({ visible: false })); cproxy.position.set(carSpot.x, carY + 1.5, carSpot.z); scene.add(cproxy);
  clickables.push({ proxy: cproxy, onClick: () => toRacetrack() });

  // ---- game-zone prompts (walk up → "Play?") ----
  gamezones = createGameZones({ controls, camera });
  gamezones.register({ id: 'hoop', label: 'Basketball', emoji: '🏀', accent: '#ff6b35', near: (pp) => hoop.near(pp), spotFn: () => ({ pos: [sx - 14, sz - 4], yaw: Math.PI }), play: (cam) => hoop.throwBall(cam) });
  gamezones.register({ id: 'gallery', label: 'Shooting Gallery', emoji: '🎯', accent: '#ff0055', near: (pp) => gallery.near(pp), spotFn: () => ({ pos: [sx + 14, sz - 4], yaw: Math.PI }), play: (cam) => gallery.shoot(cam) });
  gamezones.register({ id: 'dunk', label: 'Dunk Tank', emoji: '💦', accent: '#00f3ff', near: (pp) => dunktank.near(pp), spotFn: () => ({ pos: [sx, sz - 12], yaw: Math.PI }), play: (cam) => dunktank.throwBall(cam) });
}

function toRacetrack() {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'race.html'; }, 460);
}

// a low-poly parked car (matches the racer's car look, resting)
function buildParkedCar(g) {
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 4.6), std({ color: 0x00f3ff, metalness: 0.5, roughness: 0.35 })); body.position.y = 0.75; g.add(body);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 1.8), std({ color: 0x0a0a14, metalness: 0.2, roughness: 0.3, emissive: 0x00171a, emissiveIntensity: 0.5 })); cabin.position.set(0, 1.25, -0.2); g.add(cabin);
  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.6), std({ color: 0xff0055 })); spoiler.position.set(0, 1.35, -2.3); g.add(spoiler);
  const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.5, 16); const wheelMat = std({ color: 0x111118, roughness: 0.8 });
  for (const [wx, wz] of [[-1.15, 1.5], [1.15, 1.5], [-1.15, -1.6], [1.15, -1.6]]) { const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.55, wz); g.add(w); }
  const glow = new THREE.PointLight(0x00f3ff, 2, 14, 2); glow.position.set(0, 1.4, 0); g.add(glow);
}

// a camera-facing text label sprite
function makeLabel(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d');
  x.font = 'bold 56px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 22; x.fillStyle = color; x.fillText(text, 256, 64);
  x.fillStyle = '#fff'; x.shadowBlur = 8; x.fillText(text, 256, 64);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }));
}

// ---------- load the city ----------
const statusEl = document.getElementById('status');
function setStatus(t) { if (statusEl) { statusEl.textContent = t; statusEl.style.opacity = t ? '1' : '0'; } }

setStatus('loading THE BLOCK…');
gltf.load('models/cities/modern_block.glb', (g) => {
  const city = g.scene;
  city.traverse((o) => { if (o.isMesh) { if (o.material) o.material.side = THREE.FrontSide; if (o.geometry && !o.geometry.boundsTree) o.geometry.computeBoundsTree(); cityMeshes.push(o); } });
  scene.add(city);

  // spawn on the STREET/PLAZA level, not a rooftop. In a city block the open
  // ground is the single largest flat area, so we grid-sample the footprint,
  // histogram the first-hit heights, and take the most common (modal) level.
  const box = new THREE.Box3().setFromObject(city);
  const c = box.getCenter(new THREE.Vector3());
  const top = box.max.y + 100;
  const spanX = box.max.x - box.min.x, spanZ = box.max.z - box.min.z;
  const pts = [];
  const N = 46, inset = 0.12;
  for (let ix = 0; ix < N; ix++) for (let iz = 0; iz < N; iz++) {
    const x = box.min.x + spanX * (inset + (1 - 2 * inset) * ix / (N - 1));
    const z = box.min.z + spanZ * (inset + (1 - 2 * inset) * iz / (N - 1));
    const y = groundY(x, z, top);
    if (y != null) pts.push({ x, z, y });
  }
  // modal height (2-unit bins)
  const bins = new Map();
  for (const p of pts) { const b = Math.round(p.y / 2); bins.set(b, (bins.get(b) || 0) + 1); }
  let modeBin = 0, modeN = -1; for (const [b, n] of bins) if (n > modeN) { modeN = n; modeBin = b; }
  const level = modeBin * 2;
  const plaza = pts.filter((p) => Math.abs(p.y - level) < 2.5);
  // spawn = plaza point nearest the model centre
  let spawn = plaza[0] || { x: c.x, z: c.z, y: level };
  let bd = Infinity; for (const p of plaza) { const d = Math.hypot(p.x - c.x, p.z - c.z); if (d < bd) { bd = d; spawn = p; } }
  // plaza radius: how far the flat level reaches from spawn (capped)
  let far = 12; for (const p of plaza) { const d = Math.hypot(p.x - spawn.x, p.z - spawn.z); if (d > far && d < 90) far = d; }
  controls.pos.set(spawn.x, spawn.y + controls.eye, spawn.z);
  controls.yaw = Math.PI;
  cityBounds = { cx: spawn.x, cz: spawn.z, r: Math.min(48, far), y: spawn.y };

  buildGames(spawn);
  setStatus('');
  document.getElementById('start').classList.remove('wait');
  if (window.__gcReady) window.__gcReady(spawn);
}, (e) => { if (e && e.total) setStatus(`loading THE BLOCK… ${Math.round((e.loaded / e.total) * 100)}%`); },
  (err) => { setStatus('failed to load THE BLOCK'); console.error(err); });

// ---------- HUD / race prompt ----------
function updatePrompt() {
  if (!marshalPos || !racePromptEl) return;
  const d = Math.hypot(controls.pos.x - marshalPos.x, controls.pos.z - marshalPos.z);
  racePromptEl.classList.toggle('show', d < 12 && !(gamezones && gamezones.isPlaying()));
}

// ---------- loop ----------
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  // soft-clamp to the plaza so you don't wander off into the city and fall
  if (cityBounds) {
    const dx = controls.pos.x - cityBounds.cx, dz = controls.pos.z - cityBounds.cz;
    const d = Math.hypot(dx, dz);
    if (d > cityBounds.r) { const s = cityBounds.r / d; controls.pos.x = cityBounds.cx + dx * s; controls.pos.z = cityBounds.cz + dz * s; }
  }
  if (hoop) { hoop.update(dt, t); gallery.update(dt, t, 0.5); dunktank.update(dt, t); if (paw && paw.update) paw.update(t, 0.5); }
  if (gamezones) gamezones.update(controls.pos);
  updatePrompt();
  renderer.render(scene, camera);
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

document.getElementById('raceBtn').onclick = () => toRacetrack();
document.getElementById('backBtn').onclick = () => { const w = document.getElementById('warp'); if (w) w.classList.add('go'); setTimeout(() => { window.location.href = 'warehouse.html'; }, 460); };
document.getElementById('enterBtn').onclick = () => { document.getElementById('start').classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };

controls.update(0);
renderer.render(scene, camera);

if (import.meta.env.DEV) window.__gc = { controls, scene, camera };
