import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildCowboy } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
const ambience = createAmbience(AMBIENCE.tanky);

// TANKY JOHNSON'S WORLD — a cosmic western at dusk. A honky-tonk SALOON (EPK on
// the jukebox), a TAILGATE bonfire with his lifted truck + hay bales, and a
// VOID DESERT of mesas + neon cacti under a giant moon.

const EPK_URL = 'https://tanky-johnson-epk--sofakingsadboi.on.websim.com/';
const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x2a1226, 0.017);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 260);

// ---------- dusk sky + giant moon + stars ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(160, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x1a0a3a) }, mid: { value: C(0xb0568c) }, bot: { value: C(0x3a1020) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot;
      void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.6)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
  const sp = []; for (let i = 0; i < 350; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(150); if (v.y > 8) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffe6c0, size: 0.6, transparent: true, opacity: 0.8 })));
  const moon = new THREE.Mesh(new THREE.CircleGeometry(14, 40), new THREE.MeshBasicMaterial({ color: 0xffe1b0, transparent: true, fog: false })); moon.position.set(-30, 20, -60); scene.add(moon);
  const halo = new THREE.Mesh(new THREE.CircleGeometry(20, 40), new THREE.MeshBasicMaterial({ color: 0xffb060, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false, fog: false })); halo.position.set(-30, 20, -61); scene.add(halo);
}

// ---------- desert floor ----------
{
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(180, 180), std({ color: 0x3a2418, roughness: 0.95, emissive: C(0x1a0e08), emissiveIntensity: 0.2 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const grid = new THREE.GridHelper(180, 60, 0xe6c04a, 0x5a3020); grid.material.transparent = true; grid.material.opacity = 0.1; grid.position.y = 0.02; scene.add(grid);
  // dirt road up to the saloon
  const road = new THREE.Mesh(new THREE.PlaneGeometry(6, 60), std({ color: 0x2a1a10, roughness: 1 })); road.rotation.x = -Math.PI / 2; road.position.set(0, 0.03, 0); scene.add(road);
}
scene.add(new THREE.HemisphereLight(0xffb878, 0x2a1226, 0.7));
const moonLight = new THREE.DirectionalLight(0xffd0a0, 0.4); moonLight.position.set(-20, 24, -30); scene.add(moonLight);

const updaters = [];

// ---------- SALOON (north) with the EPK jukebox ----------
let epkProxy = null;
function buildSaloon() {
  const g = new THREE.Group(); g.position.set(0, 0, -20); scene.add(g);
  const wood = std({ color: 0x4a3320, roughness: 0.9 });
  const woodDk = std({ color: 0x2e2013, roughness: 0.9 });
  // body
  const body = new THREE.Mesh(new THREE.BoxGeometry(14, 6, 10), wood); body.position.set(0, 3, -2); body.castShadow = true; g.add(body);
  // false front + roof
  const front = new THREE.Mesh(new THREE.BoxGeometry(14.4, 2.4, 0.5), woodDk); front.position.set(0, 7, 3); g.add(front);
  // porch posts + awning
  const awning = new THREE.Mesh(new THREE.BoxGeometry(14.4, 0.3, 3), woodDk); awning.position.set(0, 5.4, 4.5); g.add(awning);
  for (const px of [-6.5, 6.5]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 5.2, 8), wood); post.position.set(px, 2.6, 5.9); g.add(post); }
  // swinging doors + windows glowing warm
  const doorMat = std({ color: 0x3a2616, roughness: 0.8 });
  for (const dx of [-0.7, 0.7]) { const d = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.12), doorMat); d.position.set(dx, 1.5, 3.05); g.add(d); }
  for (const wx of [-4.5, 4.5]) { const win = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 2), std({ color: 0x2a1000, emissive: C(0xffa63c), emissiveIntensity: 0.9 })); win.position.set(wx, 3, 3.06); g.add(win); }
  // neon sign
  const sign = textPlane('★ TANKY’S ★', '#ff8a3c'); sign.position.set(0, 7, 3.3); sign.scale.set(7, 1.2, 1); g.add(sign);
  const signL = new THREE.PointLight(0xff8a3c, 4, 16, 2); signL.position.set(0, 6.5, 6); g.add(signL);
  const warm = new THREE.PointLight(0xffb060, 5, 18, 2); warm.position.set(0, 3, 6); g.add(warm);
  // the JUKEBOX out on the porch — the EPK
  const jb = new THREE.Group(); jb.position.set(4.5, 0, 6.2); g.add(jb);
  const cabinet = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 1), std({ color: 0x3a1030, roughness: 0.5, metalness: 0.3 })); cabinet.position.y = 1.3; cabinet.castShadow = true; jb.add(cabinet);
  const dome = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.7, 16, 1, false, 0, Math.PI), std({ color: 0x4a1840, emissive: C(0xff5aa0), emissiveIntensity: 0.6, metalness: 0.4 })); dome.rotation.z = Math.PI / 2; dome.rotation.y = Math.PI / 2; dome.position.set(0, 2.5, 0); jb.add(dome);
  const jScrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      void main(){ float bar=step(0.5,fract(v.y*8.0+t)); vec3 c=mix(vec3(1.0,0.54,0.24),vec3(0.9,0.15,0.63),v.y+0.2*sin(t+v.x*6.0)); gl_FragColor=vec4(c*(0.6+0.4*bar),1.0);} `,
  });
  const jScr = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.9), jScrMat); jScr.position.set(0, 1.6, 0.51); jb.add(jScr);
  const jcap = textPlane('EPK', '#ffe1b0'); jcap.position.set(0, 3.05, 0.2); jcap.scale.set(1.1, 0.5, 1); jb.add(jcap);
  const jl = new THREE.PointLight(0xff5aa0, 3, 8, 2); jl.position.set(0, 2, 1.4); jb.add(jl);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 3, 1.4), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 1.5, 0.3); jb.add(epkProxy);
  updaters.push((dt, t) => { jScrMat.uniforms.t.value = t; jl.intensity = 2.5 + Math.sin(t * 4) * 0.8; signL.intensity = 3.5 + Math.sin(t * 8) * 0.8; });
}

// ---------- TAILGATE (east): lifted truck + bonfire + hay bales ----------
function buildTailgate() {
  const g = new THREE.Group(); g.position.set(15, 0, 4); scene.add(g);
  buildTruck(g);
  // bonfire
  const logs = new THREE.Group(); logs.position.set(4, 0, 3);
  for (let i = 0; i < 5; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 1.6, 6), std({ color: 0x2a1810, roughness: 0.9 })); l.position.y = 0.2; l.rotation.z = Math.PI / 2; l.rotation.y = (i / 5) * Math.PI; logs.add(l); }
  const flames = [];
  for (let i = 0; i < 5; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.4 - i * 0.05, 1.4 - i * 0.12, 7), new THREE.MeshBasicMaterial({ color: i < 2 ? 0xffd24a : 0xff6a1a, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })); f.position.y = 0.7 + i * 0.18; logs.add(f); flames.push(f); }
  const fire = new THREE.PointLight(0xff7a2a, 8, 16, 2); fire.position.set(4, 1.5, 3); g.add(fire); g.add(logs);
  // hay bales to sit on
  for (const [hx, hz] of [[6, 4], [5.6, 1.2], [2.6, 5]]) { const bale = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 1.4, 12), std({ color: 0xc9a24a, roughness: 1, emissive: C(0x3a2c10), emissiveIntensity: 0.25 })); bale.rotation.z = Math.PI / 2; bale.position.set(hx, 0.7, hz); g.add(bale); }
  // string lights between truck and a pole
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.5, 8), std({ color: 0x2a1a10 })); pole.position.set(7, 2.25, -1); g.add(pole);
  const bulbs = [];
  for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(-1 + i * 1.0, 3.6 - Math.sin(i / 8 * Math.PI) * 0.8, -0.5); g.add(b); bulbs.push(b); }
  updaters.push((dt, t) => {
    flames.forEach((f, i) => { f.scale.set(1 + Math.sin(t * 9 + i) * 0.15, 1 + Math.sin(t * 12 + i) * 0.2, 1); });
    fire.intensity = 7 + Math.sin(t * 15) * 2 + Math.random();
    bulbs.forEach((b, i) => (b.material.color.setHSL(0.11, 0.7, 0.6 + Math.sin(t * 2 + i) * 0.12)));
  });
}
function buildTruck(parent) {
  const t = new THREE.Group(); t.position.set(0, 0, -3); t.rotation.y = -0.4; parent.add(t);
  const paint = std({ color: 0x7a2418, roughness: 0.5, metalness: 0.4 });
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1, 5), paint); bed.position.set(0, 2, 0); bed.castShadow = true; t.add(bed);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.5, 2.2), paint); cab.position.set(0, 2.6, -1.4); t.add(cab);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 2.0), std({ color: 0x0a1420, emissive: C(0x1a3a4a), emissiveIntensity: 0.4, metalness: 0.6, roughness: 0.2 })); glass.position.set(0, 3.15, -1.4); t.add(glass);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.2, 0.15), paint); tail.position.set(0, 1.7, 2.6); tail.rotation.x = 1.2; t.add(tail); // tailgate down
  for (const wx of [-1.4, 1.4]) for (const wz of [-1.8, 1.8]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.6, 16), std({ color: 0x0e0e10, roughness: 0.8 })); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.85, wz); t.add(w); }
  const head = new THREE.PointLight(0xfff0c0, 0, 20, 2); head.position.set(0, 2, -3); t.add(head);
}

// ---------- VOID DESERT (west + back): mesas, neon cacti, tumbleweeds ----------
function buildDesert() {
  const g = new THREE.Group(); scene.add(g);
  const rock = std({ color: 0x5a2a2e, roughness: 1, emissive: C(0x2a1016), emissiveIntensity: 0.25 });
  const mesa = (x, z, s) => { const m = new THREE.Mesh(new THREE.CylinderGeometry(s * 0.8, s, s * 2.2, 6), rock); m.position.set(x, s * 1.1, z); m.castShadow = true; g.add(m); };
  mesa(-22, -14, 5); mesa(-30, 2, 7); mesa(-18, 16, 4); mesa(26, -18, 6); mesa(30, 12, 5);
  const cacti = [];
  const cactus = (x, z, col) => {
    const grp = new THREE.Group(); grp.position.set(x, 0, z);
    const mat = std({ color: 0x0c2a18, emissive: C(col), emissiveIntensity: 0.6, roughness: 0.6 });
    const trunk = new THREE.Mesh(new THREE.CapsuleGeometry(0.35, 2.6, 4, 8), mat); trunk.position.y = 1.6; grp.add(trunk);
    for (const s of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 1.0, 4, 8), mat); arm.position.set(s * 0.6, 1.8, 0); arm.rotation.z = -s * 0.6; grp.add(arm); const up = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.8, 4, 8), mat); up.position.set(s * 0.95, 2.5, 0); grp.add(up); }
    const l = new THREE.PointLight(C(col), 1.6, 7, 2); l.position.set(0, 2.4, 0); grp.add(l); g.add(grp); cacti.push(mat);
  };
  const neon = ['#39ff14', '#00f3ff', '#e6c04a', '#ff5aa0'];
  [[-12, -6], [-16, 8], [-24, -4], [12, -12], [20, 6], [-10, 18], [22, -6]].forEach(([x, z], i) => cactus(x, z, neon[i % neon.length]));
  // a couple tumbleweeds drifting
  const tws = [];
  for (let i = 0; i < 3; i++) { const tw = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 1), std({ color: 0x6a4a2a, wireframe: true, emissive: C(0x2a1a10), emissiveIntensity: 0.4 })); tw.position.set(-10 + i * 8, 0.7, 12); g.add(tw); tws.push(tw); }
  updaters.push((dt, t) => { tws.forEach((w, i) => { w.position.x += dt * (1.4 + i * 0.3); w.rotation.z -= dt * 3; if (w.position.x > 30) w.position.x = -30; }); });
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 80; const x = c.getContext('2d');
  x.font = 'bold 40px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 18; x.fillStyle = color; x.fillText(text, 256, 42);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

buildSaloon(); buildTailgate(); buildDesert();

// ambient: golden desert dust drifting + warm haze over the tailgate fire
updaters.push(addMotes(scene, { color: 0xffd9a0, count: 200, area: [58, 14, 58], rise: 0.3, opacity: 0.4 }));
updaters.push(addHaze(scene, { color: 0xff8a3c, count: 8, center: [17, 3, 6], area: [14, 6, 14], scale: 8, opacity: 0.06 }));

// Tanky himself, out by the tailgate fire
const tj = buildCowboy('#e6c04a'); tj.group.position.set(12, 0, 8); tj.group.rotation.y = -1.4; tj.group.scale.setScalar(1.1); scene.add(tj.group);
updaters.push((dt, t, p) => { if (tj.update) tj.update(t, p); });

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 30, eye: 1.6, zMin: -26 });
controls.pos.set(0, 1.6, 14); controls.yaw = 0;

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
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('TANKY JOHNSON — EPK', EPK_URL); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -29, 29); g.z = THREE.MathUtils.clamp(g.z, -25, 29); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones + hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) { if (p.z < -8 && Math.abs(p.x) < 9) return 'THE SALOON'; if (p.x > 8) return 'THE TAILGATE'; return 'THE VOID DESERT'; }
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) hintEl.classList.toggle('show', Math.hypot(p.x - 4.5, p.z + 13.8) < 6);
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
  const p = Math.pow(1 - ((t * (84 / 60)) % 1), 2.0);
  controls.update(dt);
  for (const u of updaters) u(dt, t, p);
  updateZone(controls.pos);
  renderer.render(scene, camera);
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

if (import.meta.env.DEV) window.__tj = { controls, scene };
