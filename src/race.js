import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { computeBoundsTree, disposeBoundsTree, acceleratedRaycast } from 'three-mesh-bvh';

// BVH-accelerated raycasting — the car samples the track surface several times
// per frame; on 100k+ triangle circuits a linear raycast tanks the framerate,
// so every track mesh gets a bounds tree and raycasts go log-time.
THREE.BufferGeometry.prototype.computeBoundsTree = computeBoundsTree;
THREE.BufferGeometry.prototype.disposeBoundsTree = disposeBoundsTree;
THREE.Mesh.prototype.raycast = acceleratedRaycast;

// THE RACETRACK — drive a car around real GLB circuits (F1, Big City, Paris,
// Moscow, Summit, Red Rock, Hometown, Atlantica). Arcade driving: the car
// follows the track surface by raycasting straight down onto the loaded mesh,
// so it hugs elevation without a physics engine. Pick a track from the garage
// carousel screen, then drive. This is the standalone racer; it gets wrapped
// into the Modern Block "complex" next.

const TRACKS = [
  { id: 'f1', name: 'F1 GRAND PRIX', file: 'models/racing/f1.glb', accent: '#ff0055' },
  { id: 'big_city', name: 'BIG CITY', file: 'models/racing/big_city.glb', accent: '#00f3ff' },
  { id: 'paris', name: 'PARIS', file: 'models/racing/paris.glb', accent: '#e6c04a' },
  { id: 'moscow', name: 'MOSCOW', file: 'models/racing/moscow.glb', accent: '#b967ff' },
  { id: 'summit', name: 'SUMMIT', file: 'models/racing/summit.glb', accent: '#39ff14' },
  { id: 'redrock_ridge', name: 'RED ROCK RIDGE', file: 'models/racing/redrock_ridge.glb', accent: '#ff6b35' },
  { id: 'hometown', name: 'HOMETOWN', file: 'models/racing/hometown.glb', accent: '#6a6cff' },
  { id: 'atlantica', name: 'ATLANTICA', file: 'models/racing/atlantica.glb', accent: '#00f3ff' },
];

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x8fb7d9);
scene.fog = new THREE.Fog(0x8fb7d9, 1200, 6000);
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.5, 30000);
camera.position.set(0, 40, 60);

// ---- lighting ----
scene.add(new THREE.HemisphereLight(0xdfeeff, 0x4a4636, 1.25));
const sun = new THREE.DirectionalLight(0xfff4e0, 2.1);
sun.position.set(600, 900, 400);
scene.add(sun);
scene.add(new THREE.AmbientLight(0xffffff, 0.25));

// ---- loaders (Draco decoder bundled under public/draco) ----
const draco = new DRACOLoader();
draco.setDecoderPath('draco/gltf/');
const gltf = new GLTFLoader();
gltf.setDRACOLoader(draco);

// ---------- the car (procedural low-poly) ----------
const car = new THREE.Group();
{
  const std = (o) => new THREE.MeshStandardMaterial(o);
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.7, 4.6), std({ color: 0x00f3ff, metalness: 0.5, roughness: 0.35 }));
  body.position.y = 0.75; car.add(body);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.4, 1.2), std({ color: 0x00d6e0, metalness: 0.5, roughness: 0.4 }));
  nose.position.set(0, 0.55, 2.6); car.add(nose);
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.6, 1.8), std({ color: 0x0a0a14, metalness: 0.2, roughness: 0.3, emissive: 0x00171a, emissiveIntensity: 0.5 }));
  cabin.position.set(0, 1.25, -0.2); car.add(cabin);
  const spoiler = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 0.6), std({ color: 0xff0055, metalness: 0.4, roughness: 0.4 }));
  spoiler.position.set(0, 1.35, -2.3); car.add(spoiler);
  for (const sx of [-1.05, 1.05]) { const fin = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.5, 0.6), std({ color: 0xff0055 })); fin.position.set(sx, 1.05, -2.3); car.add(fin); }
  const wheelGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.5, 16);
  const wheelMat = std({ color: 0x111118, roughness: 0.8 });
  const wheels = [];
  for (const [wx, wz] of [[-1.15, 1.5], [1.15, 1.5], [-1.15, -1.6], [1.15, -1.6]]) {
    const w = new THREE.Mesh(wheelGeo, wheelMat); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.55, wz); car.add(w); wheels.push(w);
  }
  car.userData.wheels = wheels;
  // headlight glow so the car reads on dark tracks
  const hl = new THREE.PointLight(0x00f3ff, 3, 20, 2); hl.position.set(0, 1, 3); car.add(hl);
}
scene.add(car);

// car state
const cs = { pos: new THREE.Vector3(), yaw: 0, speed: 0, y: 0, pitch: 0, roll: 0 };
const MAXSPD = 150, ACCEL = 55, BRAKE = 90, DRAG = 0.6, REVERSE = 45, TURN = 1.5;

// ---------- track loading ----------
let trackGroup = null;
let trackMeshes = [];
const ray = new THREE.Raycaster();
ray.far = 5000;
ray.firstHitOnly = true; // three-mesh-bvh: stop at the first surface hit
const DOWN = new THREE.Vector3(0, -1, 0);
const _o = new THREE.Vector3();

function groundY(x, z, fromY) {
  _o.set(x, fromY, z);
  ray.set(_o, DOWN);
  const hits = ray.intersectObjects(trackMeshes, true);
  return hits.length ? hits[0].point.y : null;
}

function loadTrack(track, onReady) {
  if (trackGroup) { scene.remove(trackGroup); trackGroup.traverse((o) => { if (o.isMesh) { if (o.geometry.disposeBoundsTree) o.geometry.disposeBoundsTree(); o.geometry.dispose(); } }); }
  trackMeshes = [];
  setStatus(`loading ${track.name}…`);
  gltf.load(track.file, (g) => {
    trackGroup = g.scene;
    trackGroup.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false; o.receiveShadow = false;
        if (o.material) o.material.side = THREE.FrontSide;
        if (o.geometry && !o.geometry.boundsTree) o.geometry.computeBoundsTree();
        trackMeshes.push(o);
      }
    });
    scene.add(trackGroup);

    // find a spawn: sample points near the bbox center, take the highest ground
    // hit (the drivable surface tends to sit above infield/water).
    const box = new THREE.Box3().setFromObject(trackGroup);
    const c = box.getCenter(new THREE.Vector3());
    const top = box.max.y + 200;
    let best = null;
    for (let i = 0; i < 240; i++) {
      const a = i * 0.9, r = (i / 240) * Math.max(box.max.x - box.min.x, box.max.z - box.min.z) * 0.45;
      const x = c.x + Math.cos(a) * r, z = c.z + Math.sin(a) * r;
      const y = groundY(x, z, top);
      if (y != null && (best == null || y > best.y - 2) ) { if (!best || Math.hypot(x - c.x, z - c.z) < best.d) best = { x, y, z, d: Math.hypot(x - c.x, z - c.z) }; }
    }
    const spawn = best || { x: c.x, y: box.min.y, z: c.z };
    cs.pos.set(spawn.x, spawn.y, spawn.z);
    cs.y = spawn.y; cs.speed = 0; cs.yaw = 0; cs.pitch = 0; cs.roll = 0;
    // aim the sun/fog to the track scale
    scene.fog.near = Math.max(600, (box.max.x - box.min.x) * 0.3);
    scene.fog.far = (box.max.x - box.min.x) * 2.2 + 2000;
    camera.far = (box.max.x - box.min.x) * 8 + 5000; camera.updateProjectionMatrix();
    placeCarInstant();
    setStatus('');
    if (onReady) onReady();
  }, (e) => {
    if (e && e.total) setStatus(`loading ${track.name}… ${Math.round((e.loaded / e.total) * 100)}%`);
  }, (err) => { setStatus(`failed to load ${track.name}`); console.error(err); });
}

// ---------- driving ----------
const keys = new Set();
addEventListener('keydown', (e) => { const k = e.key.toLowerCase(); if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault(); keys.add(k); });
addEventListener('keyup', (e) => keys.delete(e.key.toLowerCase()));

function drive(dt) {
  const up = keys.has('w') || keys.has('arrowup');
  const down = keys.has('s') || keys.has('arrowdown');
  const left = keys.has('a') || keys.has('arrowleft');
  const right = keys.has('d') || keys.has('arrowright');
  const brakeKey = keys.has(' ');

  if (up) cs.speed += ACCEL * dt;
  else if (down) cs.speed -= (cs.speed > 0 ? BRAKE : ACCEL * 0.7) * dt;
  else cs.speed -= Math.sign(cs.speed) * DRAG * Math.abs(cs.speed) * dt * 2;
  if (brakeKey) cs.speed -= Math.sign(cs.speed) * BRAKE * 1.4 * dt;
  cs.speed = THREE.MathUtils.clamp(cs.speed, -REVERSE, MAXSPD);
  if (Math.abs(cs.speed) < 0.4 && !up && !down) cs.speed = 0;

  // steering scales down at very low speed, tightens at cruising speed
  const grip = THREE.MathUtils.clamp(Math.abs(cs.speed) / 24, 0, 1);
  const steer = (left ? 1 : 0) - (right ? 1 : 0);
  cs.yaw += steer * TURN * grip * dt * Math.sign(cs.speed || 1);

  const dir = new THREE.Vector3(Math.sin(cs.yaw), 0, Math.cos(cs.yaw));
  cs.pos.addScaledVector(dir, cs.speed * dt);

  // ground follow: sample under the car + fore/aft/side for slope
  const top = cs.y + 60;
  const hC = groundY(cs.pos.x, cs.pos.z, top);
  if (hC != null) {
    cs.y += (hC - cs.y) * Math.min(1, dt * 12);
    const f = 2.2, s = 1.2;
    const hF = groundY(cs.pos.x + dir.x * f, cs.pos.z + dir.z * f, top);
    const hB = groundY(cs.pos.x - dir.x * f, cs.pos.z - dir.z * f, top);
    const rdir = new THREE.Vector3(dir.z, 0, -dir.x);
    const hR = groundY(cs.pos.x + rdir.x * s, cs.pos.z + rdir.z * s, top);
    const hL = groundY(cs.pos.x - rdir.x * s, cs.pos.z - rdir.z * s, top);
    const tPitch = (hF != null && hB != null) ? Math.atan2(hB - hF, f * 2) : cs.pitch;
    const tRoll = (hL != null && hR != null) ? Math.atan2(hL - hR, s * 2) : cs.roll;
    cs.pitch += (tPitch - cs.pitch) * Math.min(1, dt * 8);
    cs.roll += (tRoll - cs.roll) * Math.min(1, dt * 8);
  }
  placeCar();
  // spin wheels
  if (car.userData.wheels) for (const w of car.userData.wheels) w.rotation.x += cs.speed * dt * 0.5;
}

const _q = new THREE.Quaternion(), _e = new THREE.Euler();
function placeCar() {
  car.position.set(cs.pos.x, cs.y + 0.1, cs.pos.z);
  _e.set(cs.pitch, cs.yaw, cs.roll, 'YXZ');
  car.quaternion.setFromEuler(_e);
}
function placeCarInstant() { placeCar(); updateCamera(1); }

// chase camera
const _camGoal = new THREE.Vector3(), _look = new THREE.Vector3();
function updateCamera(snap) {
  const dir = new THREE.Vector3(Math.sin(cs.yaw), 0, Math.cos(cs.yaw));
  _camGoal.set(cs.pos.x - dir.x * 14, cs.y + 7, cs.pos.z - dir.z * 14);
  camera.position.lerp(_camGoal, snap ? 1 : 0.12);
  _look.set(cs.pos.x + dir.x * 8, cs.y + 2.5, cs.pos.z + dir.z * 8);
  camera.lookAt(_look);
}

// ---------- HUD ----------
const speedEl = document.getElementById('speed');
const statusEl = document.getElementById('status');
const trackNameEl = document.getElementById('trackName');
function setStatus(t) { if (statusEl) { statusEl.textContent = t; statusEl.style.opacity = t ? '1' : '0'; } }

// ---------- track select (garage) ----------
const grid = document.getElementById('trackGrid');
let current = TRACKS[0];
for (const t of TRACKS) {
  const b = document.createElement('button');
  b.className = 'trackBtn'; b.style.setProperty('--a', t.accent);
  b.innerHTML = `<b>${t.name}</b>`;
  b.onclick = () => { current = t; document.querySelectorAll('.trackBtn').forEach((x) => x.classList.remove('on')); b.classList.add('on'); };
  if (t.id === 'f1') b.classList.add('on');
  grid.appendChild(b);
}
document.getElementById('goBtn').onclick = () => {
  document.getElementById('select').classList.add('gone');
  if (trackNameEl) trackNameEl.textContent = current.name;
  loadTrack(current, () => { if (!running) { running = true; clock.start(); frame(); } });
};
document.getElementById('resetBtn').onclick = () => loadTrack(current);
document.getElementById('menuBtn').onclick = () => { document.getElementById('select').classList.remove('gone'); };

// ---------- loop ----------
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  if (trackGroup) { drive(dt); updateCamera(0); }
  if (speedEl) speedEl.textContent = Math.round(Math.abs(cs.speed) * 2.6);
  renderer.render(scene, camera);
}

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'index.html'; }, 460);
};

if (import.meta.env.DEV) window.__race = { cs, scene, camera, loadTrack, TRACKS, car };
