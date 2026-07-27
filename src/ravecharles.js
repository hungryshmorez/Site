import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildRaver } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
import { createAdmin } from './scene/admin.js';
const ambience = createAmbience(AMBIENCE.ravecharles);

// RAVE CHARLES'S WORLD — the masked headliner, down in the pit with the crowd.
// A raging neon MOSH PIT with a stage (EPK on the screen), a coast-to-coast
// TOUR ROAD of glowing shows, and a giant LED-VISOR MASK landmark.

const EPK_URL = 'https://express.adobe.com/page/s43NCJty7DfTO/';
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
scene.fog = new THREE.FogExp2(0x14020c, 0.02);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 240);

// ---------- night sky ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(150, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x0a0208) }, mid: { value: C(0x4a0524) }, bot: { value: C(0x2a0a30) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot;
      void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.5)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
  // stars
  const sp = []; for (let i = 0; i < 400; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(140); if (v.y > 6) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffd0e6, size: 0.5, transparent: true, opacity: 0.7 })));
}

// ---------- floor + grid ----------
{
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), std({ color: 0x14060f, roughness: 0.4, metalness: 0.5, emissive: C(0x1a0410), emissiveIntensity: 0.2 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const grid = new THREE.GridHelper(140, 70, 0xff0055, 0x00f3ff); grid.material.transparent = true; grid.material.opacity = 0.16; grid.position.y = 0.02; scene.add(grid);
}
scene.add(new THREE.HemisphereLight(0x5a1030, 0x0a0208, 0.7));

const updaters = [];

// ---------- THE PIT: stage, speaker walls, strobes, mosh crowd ----------
let epkProxy = null;
function buildPit() {
  const g = new THREE.Group(); scene.add(g);
  // stage deck
  const deck = new THREE.Mesh(new THREE.BoxGeometry(22, 1.4, 8), std({ color: 0x120410, roughness: 0.7, metalness: 0.3 })); deck.position.set(0, 0.7, -22); g.add(deck);
  // big screen (EPK)
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      void main(){ float bar=step(0.5,fract(v.x*10.0+sin(v.y*7.0+t)*0.3)); float scan=sin((v.y+t*0.3)*70.0)*0.5+0.5;
        vec3 c=mix(vec3(1.0,0.0,0.33),vec3(0.0,0.95,1.0),v.x*0.6+0.3*sin(t*1.4+v.y*5.0)); c*=(0.45+0.55*scan)*(0.55+0.6*bar); gl_FragColor=vec4(c,1.0);} `,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(14, 6), scrMat); screen.position.set(0, 6, -25.6); g.add(screen);
  const cap = textPlane('TOUR TIMELINE // EPK', '#00f3ff'); cap.position.set(0, 9.4, -25.4); cap.scale.set(6, 0.7, 1); g.add(cap);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(14.5, 6.5, 0.6), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 6, -25.4); g.add(epkProxy);
  // truss + speaker walls
  const truss = std({ color: 0x141018, metalness: 0.7, roughness: 0.4 });
  for (const px of [-8, 8]) { const t = new THREE.Mesh(new THREE.BoxGeometry(0.5, 11, 0.5), truss); t.position.set(px, 5.5, -25.4); g.add(t); }
  const cones = [];
  for (const sx of [-11, 11]) for (let i = 0; i < 5; i++) {
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 1.8), std({ color: 0x0a060c, roughness: 0.85 })); cab.position.set(sx, 0.9 + i * 1.55, -24); g.add(cab);
    const cn = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.12, 16), std({ color: 0x120810, emissive: C(0xff0055), emissiveIntensity: 0.1 })); cn.rotation.x = Math.PI / 2; cn.position.set(sx, 0.9 + i * 1.55, -23.05); g.add(cn); cones.push(cn);
  }
  // stage strobes + spot beams
  const strobes = [];
  for (const px of [-7, 0, 7]) { const l = new THREE.SpotLight(0xff2b8f, 0, 40, Math.PI / 6, 0.4, 1.2); l.position.set(px, 10.4, -25); l.target.position.set(px * 1.4, 0, 4); g.add(l); g.add(l.target); strobes.push(l); }
  const screenLight = new THREE.PointLight(0xff0055, 5, 30, 2); screenLight.position.set(0, 6, -20); g.add(screenLight);

  // mosh crowd — a dense field of silhouettes that jump to the beat
  const crowd = [];
  const dark = std({ color: 0x08040a, roughness: 1 });
  for (let i = 0; i < 90; i++) {
    const p = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 1.0, 4, 6), dark);
    const x = (Math.random() - 0.5) * 22, z = -16 + Math.random() * 15;
    p.position.set(x, 0.9, z); p.castShadow = false; g.add(p);
    crowd.push({ m: p, base: 0.9, ph: Math.random() * 6.28, amp: 0.3 + Math.random() * 0.5 });
  }
  updaters.push((dt, t, p) => {
    scrMat.uniforms.t.value = t; screenLight.intensity = 4 + p * 6;
    for (const cn of cones) cn.scale.z = 1 + p * 0.5;
    for (const s of strobes) s.intensity = p > 0.82 ? 55 : s.intensity * 0.82;
    for (const c of crowd) { c.m.position.y = c.base + Math.max(0, Math.sin(t * 6 + c.ph)) * p * 1.6 * c.amp; c.m.rotation.z = Math.sin(t * 4 + c.ph) * 0.12; }
  });
  return g;
}

// ---------- THE TOUR ROAD (east): glowing show-stops + city silhouettes ----------
function buildTour() {
  const g = new THREE.Group(); scene.add(g);
  // road
  const road = new THREE.Mesh(new THREE.PlaneGeometry(9, 40), std({ color: 0x0a0a12, roughness: 0.6, metalness: 0.3 })); road.rotation.x = -Math.PI / 2; road.position.set(18, 0.03, 0); road.rotation.z = 0; g.add(road);
  for (let i = -4; i < 5; i++) { const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 2.2), std({ color: 0xffd24a, emissive: C(0xffd24a), emissiveIntensity: 0.6 })); dash.rotation.x = -Math.PI / 2; dash.position.set(18, 0.04, i * 4.4); g.add(dash); }
  // glowing tour-stop pins along the road (nearly 400 shows, a few marked)
  const cities = ['ATL', 'NYC', 'LA', 'CHI', 'MIA', 'AUS', 'DEN', 'SEA'];
  cities.forEach((name, i) => {
    const side = i % 2 ? 1 : -1; const z = -16 + i * 4.4;
    const pin = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.4, 4), std({ color: 0x1a0812, emissive: C(0xff0055), emissiveIntensity: 1.1, metalness: 0.4 })); pin.position.set(18 + side * 3.4, 1.2, z); pin.rotation.x = Math.PI; g.add(pin);
    const dot = new THREE.PointLight(0xff0055, 2, 6, 2); dot.position.set(18 + side * 3.4, 1.6, z); g.add(dot);
    const lb = textPlane(name, '#ffd24a'); lb.position.set(18 + side * 3.4, 2.4, z); lb.scale.set(1.5, 0.5, 1); g.add(lb);
  });
  // "~400 SHOWS" sign + city skyline silhouettes at the far end
  const sign = textPlane('~400 SHOWS · 2014–2020', '#00f3ff'); sign.position.set(18, 6, -20); sign.scale.set(11, 1.1, 1); g.add(sign);
  const sky = std({ color: 0x05030a, roughness: 1, emissive: C(0x1a0620), emissiveIntensity: 0.3 });
  for (let i = 0; i < 12; i++) { const h = 3 + Math.random() * 9; const b = new THREE.Mesh(new THREE.BoxGeometry(1.6, h, 1.6), sky); b.position.set(8 + i * 2.4, h / 2, -24); g.add(b); }
  return g;
}

// ---------- THE MASK (west): a giant LED-visor sculpture ----------
function buildMask() {
  const g = new THREE.Group(); g.position.set(-18, 0, 0); scene.add(g);
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 3, 2, 8), std({ color: 0x120410, roughness: 0.7 })); ped.position.y = 1; g.add(ped);
  const shell = new THREE.Mesh(new THREE.SphereGeometry(3.2, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), std({ color: 0x0a0a12, roughness: 0.35, metalness: 0.7 }));
  shell.position.set(0, 6.2, 0); shell.rotation.x = Math.PI; g.add(shell);
  // the glowing LED visor bar
  const visorMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
  const visor = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.7, 0.3), visorMat); visor.position.set(0, 6, 2.7); g.add(visor);
  const vl = new THREE.PointLight(0xff0055, 6, 20, 2); vl.position.set(0, 6, 5); g.add(vl);
  updaters.push((dt, t, p) => { const hue = (t * 0.08) % 1; visorMat.color.setHSL(hue, 1, 0.55); vl.color.setHSL(hue, 1, 0.55); vl.intensity = 4 + p * 5; });
  return g;
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 32px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

const _pit = buildPit(); const _tour = buildTour(); const _mask = buildMask();

// ambient: thick magenta haze in the pit for the strobes to cut through + motes
updaters.push(addHaze(scene, { color: 0xff2b8f, count: 12, center: [0, 3, -14], area: [24, 7, 16], scale: 9, opacity: 0.07 }));
updaters.push(addMotes(scene, { color: 0xff9ecb, count: 200, area: [56, 16, 60], opacity: 0.4 }));

// Rave Charles himself, down in the pit with the crowd
const rc = buildRaver('#ff0055'); rc.group.position.set(0, 0, -8); rc.group.scale.setScalar(1.15); scene.add(rc.group);
updaters.push((dt, t, p) => { if (rc.update) rc.update(t, p); });

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 28, eye: 1.6, zMin: -18 });
controls.pos.set(0, 1.6, 12); controls.yaw = 0;

const epkRef = { url: EPK_URL };
const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'ravecharles', overhead: { ax: 25, az: 21, cz: -7 },
  items: [
    { id: 'ravecharles', label: 'Rave Charles', obj: rc.group },
    { id: 'pit', label: 'Stage / EPK', obj: _pit, dest: epkRef },
    { id: 'tour', label: 'Tour road', obj: _tour },
    { id: 'mask', label: 'LED mask', obj: _mask },
  ],
});

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  if (!admin.active) controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('RAVE CHARLES — TOUR TIMELINE', epkRef.url); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -27, 27); g.z = THREE.MathUtils.clamp(g.z, -27, 27); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones + hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) { if (p.x > 9) return 'THE TOUR ROAD'; if (p.x < -10) return 'THE MASK'; return 'THE PIT'; }
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) hintEl.classList.toggle('show', p.z < -6 && Math.abs(p.x) < 10);
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
  const p = Math.pow(1 - ((t * (140 / 60)) % 1), 1.8); // 140bpm rave pulse
  controls.update(dt);
  admin.update(dt);
  for (const u of updaters) u(dt, t, p);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.5; track.play().catch(() => {}); }
  ambience.start();
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__rc = { controls, scene };

// __world hook — overhead-screenshot harness only (activated with ?shot in the
// URL); exposes the scene so an offline top-down render can be captured. No-op
// for normal visitors.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
