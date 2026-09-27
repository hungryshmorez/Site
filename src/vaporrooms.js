import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { attachAdaptiveResolution } from './player/adaptive.js';
import { createReducedMotion, wireMuteButton } from './player/motion.js';
import { buildLofiRoom } from './scene/vapor/scene-lofi.js';
import { buildMallRoom } from './scene/vapor/scene-mall.js';
import { buildVaporRoom } from './scene/vapor/scene-vapor.js';

// DRIFTWAVE STATIC — VaporStudio Plaza. The three environments lifted out of the
// old VaporStudio app (Late-Night Lo-Fi dorm, Vaporwave Temple, Mallsoft Arcade)
// with all the synth/theory/MIDI "studio" machinery stripped, their enclosing
// walls removed, and now laid out side-by-side on ONE open vaporwave grid you
// walk freely — no room switching, no loading between them. Reached from a portal
// in the DriftWave world. Site music keeps playing (global player, from the HTML).

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
scene.background = new THREE.Color(0x14082a);
scene.fog = new THREE.Fog(0x14082a, 24, 90);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 300);

// gentle shared lighting so every zone reads even before its own accents kick in
scene.add(new THREE.HemisphereLight(0x9a8ad0, 0x140f1a, 0.5));
scene.add(new THREE.AmbientLight(0x2a2440, 0.35));

// ---- shared vaporwave plaza ground: dark reflective floor + neon grid ----
{
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(160, 90),
    new THREE.MeshStandardMaterial({ color: 0x0c0618, roughness: 0.35, metalness: 0.5 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);
  const grid = new THREE.GridHelper(160, 80, 0xff4fd8, 0x6a3aa8);
  grid.position.y = 0.0;
  grid.material.transparent = true;
  grid.material.opacity = 0.5;
  scene.add(grid);
  // distant gradient sky dome (single, shared — the per-room domes are stripped)
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {},
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `
      varying vec3 vP;
      void main(){
        float h = normalize(vP).y * 0.5 + 0.5;
        vec3 top = vec3(0.06, 0.02, 0.14);
        vec3 mid = vec3(0.42, 0.10, 0.44);
        vec3 low = vec3(0.95, 0.35, 0.55);
        vec3 c = mix(low, mid, smoothstep(0.0, 0.45, h));
        c = mix(c, top, smoothstep(0.4, 0.9, h));
        gl_FragColor = vec4(c, 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(140, 32, 16), skyMat));
}

// The rooms register interactions via scene.addClickable() (the old studio's click
// layer). We don't want the studio interactions — pass a no-op stub; all geometry
// lands in each room's own root group, which we position into a plaza zone.
const stub = { addClickable: () => {} };

// Strip each room's self-contained environment shell so the three don't fight over
// one space: their giant sky domes (big spheres) and full-bleed grid/tile floors
// (big planes) are removed, leaving the props to sit on the shared plaza ground.
function stripShell(root) {
  const kill = [];
  root.traverse((o) => {
    if (!o.isMesh || !o.geometry) return;
    const p = o.geometry.parameters || {};
    const isDome = o.geometry.type === 'SphereGeometry' && (p.radius ?? 0) >= 40;
    const isBigPlane = o.geometry.type === 'PlaneGeometry' && Math.max(p.width ?? 0, p.height ?? 0) >= 40;
    if (isDome || isBigPlane) kill.push(o);
  });
  for (const o of kill) {
    o.parent?.remove(o);
    o.geometry.dispose();
    if (o.material) { Array.isArray(o.material) ? o.material.forEach((m) => m.dispose()) : o.material.dispose(); }
  }
}

// Three zones laid west→east on the shared grid. Each zone gets a display name, an
// X offset for its room root, and a viewing spawn (where a teleport tab drops you).
const ZONES = [
  { key: 'lofi', name: 'LATE-NIGHT LO-FI', build: buildLofiRoom, x: -26, spawn: [-26, 1.55, 8] },
  { key: 'vapor', name: 'VAPORWAVE TEMPLE', build: buildVaporRoom, x: 0, spawn: [0, 1.55, 15] },
  { key: 'mall', name: 'MALLSOFT ARCADE', build: buildMallRoom, x: 28, spawn: [28, 1.55, 14] },
];

const rooms = [];
for (const z of ZONES) {
  let r;
  try { r = z.build(stub); } catch (e) { console.error('room build failed', z.key, e); continue; }
  if (!r?.root) continue;
  stripShell(r.root);
  r.root.position.x = z.x;
  scene.add(r.root);
  rooms.push({ zone: z, room: r });
}

// ---- Static Corp desk: a lit terminal showing the Static Corp + DriftWave logos.
// Sits at the plaza entrance (between lo-fi and the temple). ----
{
  const texLoader = new THREE.TextureLoader();
  const g = new THREE.Group(); g.position.set(-13, 0, 12); g.rotation.y = 0.5; scene.add(g);
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

// ---- one open field to roam: bounds span all three zones ----
const controls = new WalkControls(camera, { bounds: 44, eye: 1.55, zMin: -18 });
controls.pos.set(0, 1.55, 15); controls.yaw = 0;

// nearest-zone label so the HUD always names where you're standing
function nearestZone() {
  let best = ZONES[0], bd = Infinity;
  for (const z of ZONES) { const d = Math.abs(controls.pos.x - z.x); if (d < bd) { bd = d; best = z; } }
  return best;
}
function setLabel(z) {
  const nm = document.getElementById('roomName'); if (nm) nm.textContent = z.name;
  for (const b of document.querySelectorAll('.rtab')) b.classList.toggle('on', b.dataset.room === z.key);
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

// ---- UI: zone tabs teleport you to that zone, back + mute ----
for (const b of document.querySelectorAll('.rtab')) {
  b.onclick = () => {
    const z = ZONES.find((zz) => zz.key === b.dataset.room);
    if (!z) return;
    controls.pos.set(z.spawn[0], z.spawn[1], z.spawn[2]); controls.yaw = 0;
    if (controls.walkTarget) controls.walkTarget = null;
    setLabel(z);
  };
}
document.getElementById('backBtn').onclick = () => { window.location.href = 'driftwave.html'; };
wireMuteButton([]);   // global player composes its own mute onto #mutebtn (created element)

// ---- loop ----
const clock = new THREE.Clock();
let running = false;
let lastLabel = null;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  const beatPulse = Math.pow(1 - ((t * (78 / 60)) % 1), 2.2);            // gentle synthetic 78bpm pulse
  const meters = { kick: beatPulse * 0.7, hat: 0.2 + 0.2 * Math.abs(Math.sin(t * 5)), bass: 0.3 + 0.2 * Math.sin(t * 1.5) };
  for (const { room } of rooms) {
    if (room.update) { try { room.update(dt, { beatPulse, time: t, meters }); } catch (e) { /* room anim hiccup */ } }
  }
  const z = nearestZone();
  if (z !== lastLabel) { setLabel(z); lastLabel = z; }
  renderer.render(scene, camera);
}

setLabel(ZONES[1]);   // spawn faces the temple
controls.update(0);
renderer.render(scene, camera);
document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
