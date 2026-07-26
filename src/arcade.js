import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildHoop } from './scene/hoop.js';
import { buildGallery } from './scene/gallery.js';
import { buildDunkTank } from './scene/dunktank.js';
import { buildMonkeyPaw } from './scene/models.js';
import { openWindow } from './ui/popup.js';

// THE MIDWAY — a carnival arcade tent holding every game: portal cabinets
// (flash / Wake Up / games / stories), a Monkey's Paw machine, a basketball
// hoop (banks off the backboard), and a shooting gallery.

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.06;
renderer.shadowMap.enabled = !isMobile;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x120416);
scene.fog = new THREE.FogExp2(0x120416, 0.028);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 140);

const updaters = [];
const screenMats = [];

// ---------- floor ----------
{
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#1a0820'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#24102e'; x.fillRect(0, 0, 32, 32); x.fillRect(32, 32, 32, 32);
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(16, 16); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, 44), std({ map: tex, roughness: 0.35, metalness: 0.4, emissive: C(0x140618), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(44, 22, 0xff0055, 0x2a1030); grid.material.transparent = true; grid.material.opacity = 0.16; grid.position.y = 0.02; scene.add(grid);
}
scene.add(new THREE.HemisphereLight(0x5a2a4a, 0x120416, 0.7));

// ---------- the big-top tent ----------
{
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d');
  for (let i = 0; i < 16; i++) { x.fillStyle = i % 2 ? '#ff0055' : '#fff0f6'; x.fillRect(i * 16, 0, 16, 64); }
  const tex = new THREE.CanvasTexture(c); tex.wrapS = THREE.RepeatWrapping; tex.repeat.set(6, 1); tex.colorSpace = THREE.SRGBColorSpace;
  const roof = new THREE.Mesh(new THREE.ConeGeometry(23, 9, 24, 1, true), std({ map: tex, side: THREE.DoubleSide, roughness: 0.85, emissive: C(0xff0055), emissiveIntensity: 0.06 }));
  roof.position.y = 12.5; scene.add(roof);
  const topper = new THREE.Mesh(new THREE.SphereGeometry(0.6, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffd24a })); topper.position.y = 17.3; scene.add(topper);
  // perimeter poles + scalloped valance + string lights
  const poleMat = std({ color: 0x2a1020, metalness: 0.4, roughness: 0.6 });
  const bulbs = [];
  const R = 20, N = 20;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, x2 = Math.cos(a) * R, z2 = Math.sin(a) * R;
    if (i % 5 === 0) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 8, 8), poleMat); p.position.set(x2, 4, z2); p.castShadow = true; scene.add(p); }
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(x2, 7.6, z2); scene.add(b); bulbs.push(b);
  }
  updaters.push((dt, t) => { bulbs.forEach((b, i) => b.material.color.setHSL((i / N + t * 0.1) % 1, 0.8, 0.6)); topper.material.color.setHSL((t * 0.2) % 1, 1, 0.6); });
}

// ---------- clickable game cabinets ----------
const clickables = [];
function buildCabinet(x, z, label, accent, onClick) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = Math.atan2(0 - x, 2 - z); // face inward
  const col = C(accent);
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3.2, 1.3), std({ color: 0x140a1e, roughness: 0.6, metalness: 0.3 })); body.position.y = 1.6; body.castShadow = true; g.add(body);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.4, 1.5), std({ color: 0x0a0512, emissive: col, emissiveIntensity: 0.4 })); hood.position.set(0, 3.3, 0.1); g.add(hood);
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, col: { value: col } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; uniform vec3 col;
      void main(){ float bar=step(0.5,fract(v.y*8.0-t)); float scan=sin((v.y+t*0.3)*70.0)*0.5+0.5;
        vec3 c=mix(col,vec3(1.0),0.15*sin(t*2.0+v.x*6.0)); gl_FragColor=vec4(c*(0.5+0.5*scan)*(0.7+0.3*bar),1.0);} `,
  });
  screenMats.push(scrMat);
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.1), scrMat); scr.position.set(0, 2.15, 0.66); g.add(scr);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.5), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.7 })); panel.position.set(0, 1.2, 0.66); g.add(panel);
  const marquee = textPlane(label, accent); marquee.position.set(0, 3.55, 0.4); marquee.scale.set(2.4, 0.42, 1); g.add(marquee);
  const gl = new THREE.PointLight(col, 3, 8, 2); gl.position.set(0, 2.4, 1.4); g.add(gl);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2, 3.4, 1.6), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.y = 1.7; g.add(proxy);
  scene.add(g);
  clickables.push({ proxy, onClick });
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 30px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// cabinets along the back arc — each opens its game in the in-arcade popup
buildCabinet(-9, -13, 'FLASH GAMES', '#ff0055', () => openWindow('FLASH GAMES PORTAL', 'https://flash-games-collection--sofakingsadboi.on.websim.com/'));
buildCabinet(-4.5, -14.5, 'WAKE UP', '#b967ff', () => openWindow('WAKE UP SERIES', 'lab.html?folder=Wake%20Up%20Series'));
buildCabinet(0, -15, 'GAMES', '#00f3ff', () => openWindow('GAMES', 'lab.html?folder=Games'));
buildCabinet(4.5, -14.5, 'STORIES', '#39ff14', () => openWindow('STORIES & EXPERIENCES', 'lab.html?folder=Stories%20%26%20Experiences'));

// the real Monkey's Paw fortune machine (moved in from the festival)
const paw = buildMonkeyPaw('#b967ff'); paw.group.position.set(10, 0, -12.5); paw.group.rotation.y = -0.5; scene.add(paw.group);
updaters.push((dt, t, p) => { if (paw.update) paw.update(t, p); });
{
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.4, 2.2), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(10, 1.7, -12.5); scene.add(proxy);
  clickables.push({ proxy, onClick: () => openWindow("THE MONKEY'S PAW", 'https://3jnyhlyqkqq1e.space.minimax.io/') });
}

// ---------- the physical games (reused, now under the tent) ----------
const pillEl = document.getElementById('pill');
let hits = 0, made = 0, dunks = 0;
const setPill = () => { if (pillEl) pillEl.textContent = `🎯 ${hits} · 🏀 ${made} · 💦 ${dunks}`; };
const hoop = buildHoop(scene, { pos: [-12, 2], onScore: (n) => { made = n; setPill(); } });
const gallery = buildGallery(scene, { pos: [12, 2], onHit: (n) => { hits = n; setPill(); } });
const dunktank = buildDunkTank(scene, { pos: [5, 8], onDunk: (n) => { dunks = n; setPill(); } });

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 19, eye: 1.6, zMin: -17 });
controls.pos.set(0, 1.6, 13); controls.yaw = 0;

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
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
  ray.setFromCamera(ndc, camera);
  for (const c of clickables) if (ray.intersectObject(c.proxy, false)[0]) { c.onClick(); return; }
  if (gallery.near(controls.pos)) { gallery.shoot(camera); return; }
  if (hoop.near(controls.pos) && controls.pos.x < -2) { hoop.throwBall(camera); return; }
  if (dunktank.near(controls.pos)) { dunktank.throwBall(camera); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -18, 18); g.z = THREE.MathUtils.clamp(g.z, -16, 18); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// hint contextual to the nearest game
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function updateHint(p) {
  let z = 'THE MIDWAY';
  if (hoop.near(p) && p.x < -4) z = 'BASKETBALL';
  else if (gallery.near(p) && p.x > 4) z = 'SHOOTING GALLERY';
  else if (dunktank.near(p) && p.z > 2 && Math.abs(p.x - 6) < 6) z = 'DUNK TANK';
  else if (p.z < -9) z = 'THE CABINETS';
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) {
    const atHoop = hoop.near(p) && p.x < -4, atGal = gallery.near(p) && p.x > 4;
    const atDunk = dunktank.near(p) && p.z > 2 && Math.abs(p.x - 6) < 6 && !atGal;
    hintEl.textContent = atHoop ? '🏀 aim & click to shoot — bank it off the board' : atGal ? '🎯 aim & click to hit a target' : atDunk ? '💦 aim & click to hit the bullseye — dunk him!' : 'click a cabinet to play';
    hintEl.classList.toggle('show', atHoop || atGal || atDunk || p.z < -9);
  }
}

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'index.html'; }, 470);
};

// ---------- loop ----------
const track = document.getElementById('track');
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const p = Math.pow(1 - ((t * (110 / 60)) % 1), 2.0);
  controls.update(dt);
  for (const m of screenMats) m.uniforms.t.value = t;
  for (const u of updaters) u(dt, t, p);
  hoop.update(dt, t); gallery.update(dt, t, p); dunktank.update(dt, t);
  updateHint(controls.pos);
  renderer.render(scene, camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.45; track.play().catch(() => {}); }
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__arc = { controls, scene };
