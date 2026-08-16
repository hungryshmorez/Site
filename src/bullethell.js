import * as THREE from 'three';
import { WalkControls } from './player/controls.js';

// DODGE HELL — a first-person neon bullet-hell survival. Emitters ring the arena
// and fire aimed shots (telegraphed) at varied heights; strafe, jump and glide
// through the gaps. The barrage ramps up the longer you last. Reuses WalkControls.

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04060c);
scene.fog = new THREE.FogExp2(0x04060c, 0.02);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 120);

// ---- arena ----
const R = 14;
{
  const floor = new THREE.Mesh(new THREE.CircleGeometry(R, 48), new THREE.MeshBasicMaterial({ color: 0x0a0e18 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const grid = new THREE.PolarGridHelper(R, 16, 6, 48, 0x00f3ff, 0xff0055); grid.material.transparent = true; grid.material.opacity = 0.22; grid.position.y = 0.02; scene.add(grid);
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 6, 48, 1, true), new THREE.MeshBasicMaterial({ color: 0x0a1420, side: THREE.BackSide, transparent: true, opacity: 0.5 }));
  wall.position.y = 3; scene.add(wall);
  scene.add(new THREE.HemisphereLight(0x334, 0x04060c, 1));
}

// ---- emitters ----
const EMIT = [];
const EMC = [0x00f3ff, 0xff0055, 0x39ff14, 0xffd24a, 0xb967ff];
for (let i = 0; i < 10; i++) {
  const a = (i / 10) * Math.PI * 2, x = Math.cos(a) * (R - 0.6), z = Math.sin(a) * (R - 0.6);
  const col = EMC[i % EMC.length];
  const m = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.6, 6), new THREE.MeshBasicMaterial({ color: col }));
  m.position.set(x, 1.4, z); m.lookAt(0, 1.4, 0); m.rotateX(Math.PI / 2); scene.add(m);
  EMIT.push({ mesh: m, pos: new THREE.Vector3(x, 0, z), col: C(col), tele: 0 });
}

// ---- bullet pool ----
const bullets = [];
const bgeo = new THREE.SphereGeometry(0.22, 10, 8);
for (let i = 0; i < 160; i++) {
  const core = new THREE.Mesh(bgeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
  const halo = new THREE.Mesh(new THREE.SphereGeometry(0.4, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false }));
  core.visible = halo.visible = false; core.add(halo); scene.add(core);
  bullets.push({ core, halo, v: new THREE.Vector3(), life: 0, active: false });
}

// ---- controls ----
const controls = new WalkControls(camera, { bounds: R - 1, eye: 1.6, zMin: -(R - 1) });
controls.pos.set(0, 1.6, 0); controls.speed = 8.2;
const ray = new THREE.Raycaster();
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => { if (!down || e.pointerId !== down.id) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true; controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2); down.x = e.clientX; down.y = e.clientY; });
canvas.addEventListener('pointerup', () => { canvas.classList.remove('drag'); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- game state ----
const hpEl = document.getElementById('hp'), statEl = document.getElementById('stat'), hitEl = document.getElementById('hit');
const overEl = document.getElementById('over'), finalEl = document.getElementById('finalTime'), bestEl = document.getElementById('bestTime');
let hp = 100, survived = 0, playing = false, iFrame = 0, fireTimer = 1, pending = [], hitFlash = 0;
let best = parseFloat(localStorage.getItem('dodgehell_best') || '0');

function spawnBullet(from, speed, y) {
  const b = bullets.find((x) => !x.active); if (!b) return;
  // aim at the player's position now, at chosen height
  const target = new THREE.Vector3(controls.pos.x, y, controls.pos.z);
  b.core.position.set(from.x, y, from.z);
  b.v.copy(target).sub(b.core.position).normalize().multiplyScalar(speed);
  const col = EMIT[(Math.random() * EMIT.length) | 0].col;
  b.core.material.color.copy(col); b.halo.material.color.copy(col);
  b.active = true; b.core.visible = true; b.life = 6;
}
function fire() {
  const e = EMIT[(Math.random() * EMIT.length) | 0]; e.tele = 0.35;
  const spread = survived > 40 ? 3 : survived > 18 ? 2 : 1;
  const speed = 7 + Math.min(9, survived * 0.14);
  pending.push({ e, t: 0.35, speed, spread });
}
function reset() {
  hp = 100; survived = 0; iFrame = 0; fireTimer = 1; pending = [];
  for (const b of bullets) { b.active = false; b.core.visible = false; }
  controls.pos.set(0, 1.6, 0); controls.vy = 0; controls.airborne = false;
  overEl.classList.remove('on'); playing = true;
}

// ---- loop ----
const clock = new THREE.Clock();
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  controls.update(dt);
  if (playing) {
    survived += dt; statEl.childNodes[0].nodeValue = survived.toFixed(1);
    iFrame = Math.max(0, iFrame - dt); hitFlash = Math.max(0, hitFlash - dt);
    // schedule fire; interval shrinks as you survive
    fireTimer -= dt;
    if (fireTimer <= 0) { fire(); fireTimer = Math.max(0.16, 0.85 - survived * 0.012); }
    // resolve telegraphed shots
    for (let i = pending.length - 1; i >= 0; i--) { const p = pending[i]; p.t -= dt; if (p.t <= 0) { for (let s = 0; s < p.spread; s++) spawnBullet(p.e.pos, p.speed, [0.6, 1.5, 2.4][s % 3]); pending.splice(i, 1); } }
  }
  // emitters telegraph glow
  for (const e of EMIT) { e.tele = Math.max(0, e.tele - dt); const g = 0.4 + (e.tele > 0 ? 0.6 : 0); e.mesh.material.color.copy(e.col).multiplyScalar(0.6 + g); }
  // bullets
  const px = controls.pos.x, pz = controls.pos.z, feet = controls.pos.y - controls.eye, head = controls.pos.y;
  for (const b of bullets) {
    if (!b.active) continue;
    b.core.position.addScaledVector(b.v, dt); b.life -= dt;
    const p = b.core.position;
    const hb = 0.9 + Math.sin(clock.elapsedTime * 20) * 0.1; b.halo.scale.setScalar(hb);
    if (playing && iFrame <= 0 && Math.hypot(p.x - px, p.z - pz) < 0.62 && p.y > feet - 0.15 && p.y < head + 0.15) {
      b.active = false; b.core.visible = false; hp -= 14; iFrame = 0.7; hitFlash = 0.18;
      if (hp <= 0) gameOver();
    }
    if (b.life <= 0 || Math.hypot(p.x, p.z) > R + 2) { b.active = false; b.core.visible = false; }
  }
  hpEl.style.width = Math.max(0, hp) + '%';
  hitEl.classList.toggle('on', hitFlash > 0);
  renderer.render(scene, camera);
}
function gameOver() {
  playing = false;
  if (survived > best) { best = survived; localStorage.setItem('dodgehell_best', best.toFixed(1)); }
  finalEl.textContent = survived.toFixed(1) + 's'; bestEl.textContent = best.toFixed(1) + 's';
  overEl.classList.add('on');
}

document.getElementById('backBtn').onclick = () => { window.location.href = 'index.html'; };
document.getElementById('retryBtn').onclick = () => reset();
document.getElementById('enterBtn').onclick = () => { document.getElementById('start').classList.add('gone'); clock.start(); reset(); frame(); };
controls.update(0); renderer.render(scene, camera);
