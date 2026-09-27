import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { attachAdaptiveResolution } from './player/adaptive.js';
import { createReducedMotion, wireMuteButton } from './player/motion.js';
import { buildLofiRoom } from './scene/vapor/scene-lofi.js';
import { buildMallRoom } from './scene/vapor/scene-mall.js';
import { buildVaporRoom } from './scene/vapor/scene-vapor.js';

// DRIFTWAVE STATIC — VaporStudio Rooms. The three environments lifted out of the
// old VaporStudio app (Late-Night Lo-Fi dorm, Vaporwave Temple, Mallsoft Plaza),
// with all the synth/theory/MIDI "studio" machinery stripped — just the rooms you
// walk through. Reached from a portal in the DriftWave world. Site music keeps
// playing (global player, booted from the HTML).

window.addEventListener('error', (e) => console.error('[fatal]', e.error || e.message));

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
createReducedMotion();

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
attachAdaptiveResolution(renderer, isMobile ? 1.5 : 2);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0812);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 200);

// gentle base lighting so the rooms read even before their own accents kick in
scene.add(new THREE.HemisphereLight(0x9a8ad0, 0x140f1a, 0.5));
scene.add(new THREE.AmbientLight(0x2a2440, 0.4));

const controls = new WalkControls(camera, { bounds: 6, eye: 1.55, zMin: -4.2 });
controls.pos.set(0, 1.55, 3.4); controls.yaw = 0;

// The rooms register interactions via scene.addClickable() (the old studio's click
// layer). We don't want the studio interactions — pass a no-op stub; all geometry
// is added to each room's own root group, which we add/remove wholesale.
const stub = { addClickable: () => {} };
const NAV = {
  lofi: { bounds: 6, zMin: -4.2, spawn: [0, 1.55, 3.6] },
  vapor: { bounds: 9, zMin: -9, spawn: [0, 1.55, 7] },
  mall: { bounds: 9, zMin: -9, spawn: [0, 1.55, 7] },
};
const ROOMS = {
  lofi: { name: 'LATE-NIGHT LO-FI', build: buildLofiRoom },
  vapor: { name: 'VAPORWAVE TEMPLE', build: buildVaporRoom },
  mall: { name: 'MALLSOFT PLAZA', build: buildMallRoom },
};

let current = null, currentKey = null;
function loadRoom(key) {
  if (!ROOMS[key]) return;
  if (current) { if (current.root) scene.remove(current.root); try { current.dispose && current.dispose(); } catch (e) { /* noop */ } current = null; }
  let r;
  try { r = ROOMS[key].build(stub); } catch (e) { console.error('room build failed', key, e); return; }
  if (r.root) scene.add(r.root);
  if (r.palette) {
    scene.background = new THREE.Color(r.palette.bg ?? 0x0a0812);
    scene.fog = new THREE.Fog(r.palette.fog ?? r.palette.bg ?? 0x0a0812, 10, 46);
  }
  const nav = NAV[key] || { bounds: 7, zMin: -6, spawn: [0, 1.55, 4] };
  controls.bounds = nav.bounds; controls.zMin = nav.zMin;
  controls.pos.set(nav.spawn[0], nav.spawn[1], nav.spawn[2]); controls.yaw = 0;
  current = r; currentKey = key;
  for (const b of document.querySelectorAll('.rtab')) b.classList.toggle('on', b.dataset.room === key);
  const nm = document.getElementById('roomName'); if (nm) nm.textContent = ROOMS[key].name;
}

// ---- Static Corp desk: a lit terminal showing the Static Corp + DriftWave logos.
// Persists across room switches (added to the scene, not a room root). ----
{
  const texLoader = new THREE.TextureLoader();
  const g = new THREE.Group(); g.position.set(-3.2, 0, -3.4); g.rotation.y = 0.5; scene.add(g);
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.0), new THREE.MeshStandardMaterial({ color: 0x14121c, roughness: 0.5, metalness: 0.4 }));
  desk.position.y = 0.95; g.add(desk);
  for (const lx of [-0.95, 0.95]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.95, 0.8), new THREE.MeshStandardMaterial({ color: 0x0c0a12 })); leg.position.set(lx, 0.47, 0); g.add(leg); }
  const scr = (url, x, w = 1.1, h = 0.7) => {
    const mat = new THREE.MeshBasicMaterial({ color: 0x111018, toneMapped: false });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat); m.position.set(x, 1.55, -0.1); g.add(m);
    texLoader.load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; mat.map = t; mat.color.set(0xffffff); mat.needsUpdate = true; }, undefined, () => {});
    const frame = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.08, h + 0.08), new THREE.MeshBasicMaterial({ color: 0x6a5cff })); frame.position.set(x, 1.55, -0.11); g.add(frame);
  };
  scr('vapor/static-corp-logo.png', -0.62);
  scr('vapor/driftwave-logo.png', 0.62);
  const glow = new THREE.PointLight(0x8a6cff, 2.2, 8, 2); glow.position.set(0, 1.7, 0.8); g.add(glow);
}

// ---- pointer look + tap-to-walk ----
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -controls.bounds, controls.bounds); g.z = THREE.MathUtils.clamp(g.z, controls.zMin, controls.bounds); controls.walkTo(g); }
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- UI: room tabs + back + mute ----
for (const b of document.querySelectorAll('.rtab')) b.onclick = () => loadRoom(b.dataset.room);
document.getElementById('backBtn').onclick = () => { window.location.href = 'driftwave.html'; };
wireMuteButton([]);   // global player composes its own mute onto #mutebtn (created element)

// ---- loop ----
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  const beatPulse = Math.pow(1 - ((t * (78 / 60)) % 1), 2.2);            // gentle synthetic 78bpm pulse
  const meters = { kick: beatPulse * 0.7, hat: 0.2 + 0.2 * Math.abs(Math.sin(t * 5)), bass: 0.3 + 0.2 * Math.sin(t * 1.5) };
  if (current && current.update) { try { current.update(dt, { beatPulse, time: t, meters }); } catch (e) { /* room anim hiccup */ } }
  renderer.render(scene, camera);
}

loadRoom('lofi');
controls.update(0);
renderer.render(scene, camera);
document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
