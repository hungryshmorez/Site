import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildMarshmallow } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';

// SHMOREZ'S WORLD — a cozy-surreal campground where everything's a s'more. A
// giant BONFIRE ringed with roasting marshmallows, a S'MORES LAND of chocolate
// walls + graham platforms + marshmallow boulders, and a CAMP of tents + embers.

const EPK_URL = 'https://shmorez-official-epk--sofakingsadboi.on.websim.com/#visuals';
const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x1c0e06, 0.02);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 240);

// ---------- warm night sky + stars ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(150, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x100616) }, mid: { value: C(0x5a2410) }, bot: { value: C(0x2a1206) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot;
      void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.5)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
  const sp = []; for (let i = 0; i < 320; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(140); if (v.y > 10) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xfff0d0, size: 0.5, transparent: true, opacity: 0.8 })));
}

// ---------- grassy ground ----------
{
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), std({ color: 0x1f1a0e, roughness: 1, emissive: C(0x140a04), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const grid = new THREE.GridHelper(160, 50, 0xff6b35, 0x3a1c0c); grid.material.transparent = true; grid.material.opacity = 0.08; grid.position.y = 0.02; scene.add(grid);
}
scene.add(new THREE.HemisphereLight(0xff9a4a, 0x1c0e06, 0.7));

const updaters = [];

// ---------- reusable marshmallow ----------
function marsh(r = 0.5, h = 0.7) {
  return new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 18, 1, false), std({ color: 0xfff2d6, roughness: 0.85, emissive: C(0x3a2a10), emissiveIntensity: 0.12 }));
}

// ---------- central BONFIRE + roasting ring ----------
function buildBonfire() {
  const g = new THREE.Group(); g.position.set(0, 0, -3); scene.add(g);
  const stone = std({ color: 0x2a2422, roughness: 1 });
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; const s = new THREE.Mesh(new THREE.DodecahedronGeometry(0.45), stone); s.position.set(Math.cos(a) * 2.4, 0.35, Math.sin(a) * 2.4); g.add(s); }
  const logs = new THREE.Group();
  for (let i = 0; i < 6; i++) { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 3, 6), std({ color: 0x2a1810, roughness: 0.9 })); l.position.y = 0.3; l.rotation.z = Math.PI / 2; l.rotation.y = (i / 6) * Math.PI; logs.add(l); }
  g.add(logs);
  const flames = [];
  for (let i = 0; i < 7; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.9 - i * 0.1, 3 - i * 0.28, 8), new THREE.MeshBasicMaterial({ color: i < 2 ? 0xffe14a : i < 4 ? 0xff8a2a : 0xff3a1a, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false })); f.position.y = 1.3 + i * 0.2; g.add(f); flames.push(f); }
  const fire = new THREE.PointLight(0xff7a2a, 14, 34, 2); fire.position.set(0, 2.4, 0); g.add(fire);
  const fire2 = new THREE.PointLight(0xffd24a, 6, 12, 2); fire2.position.set(0, 1, 0); g.add(fire2);
  // roasting sticks with marshmallows around the fire
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.3; const bx = Math.cos(a) * 5, bz = Math.sin(a) * 5;
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 4, 6), std({ color: 0x3a2814 })); stick.position.set((bx) * 0.6, 1.2, (bz) * 0.6); stick.lookAt(0, 1.8, 0); stick.rotateX(Math.PI / 2); g.add(stick);
    const m = marsh(0.28, 0.42); m.position.set(bx * 0.28, 1.7, bz * 0.28); m.material = std({ color: 0xffcf8a, emissive: C(0xff6a1a), emissiveIntensity: 0.5, roughness: 0.7 }); g.add(m); // toasted
  }
  // embers drifting up
  const N = 160; const pos = new Float32Array(N * 3); const seed = [];
  for (let i = 0; i < N; i++) { const a = Math.random() * 6.28, rr = Math.random() * 2; pos[i * 3] = Math.cos(a) * rr; pos[i * 3 + 1] = Math.random() * 10; pos[i * 3 + 2] = Math.sin(a) * rr; seed.push(0.4 + Math.random()); }
  const eg = new THREE.BufferGeometry(); eg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const embers = new THREE.Points(eg, new THREE.PointsMaterial({ color: 0xffa64a, size: 0.12, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(embers);
  updaters.push((dt, t, p) => {
    flames.forEach((f, i) => { f.scale.set(1 + Math.sin(t * 10 + i) * 0.12 + p * 0.3, 1 + Math.sin(t * 13 + i) * 0.18 + p * 0.4, 1); f.rotation.y = Math.sin(t * 2 + i) * 0.1; });
    fire.intensity = 12 + Math.sin(t * 16) * 3 + p * 6 + Math.random();
    const a = eg.attributes.position.array; for (let i = 0; i < N; i++) { a[i * 3 + 1] += dt * seed[i] * 2.4; a[i * 3] += Math.sin(t + i) * dt * 0.2; if (a[i * 3 + 1] > 11) a[i * 3 + 1] = 0; } eg.attributes.position.needsUpdate = true;
  });
}

// ---------- EPK: the VISUALS screen behind the fire ----------
let epkProxy = null;
function buildVisuals() {
  const g = new THREE.Group(); g.position.set(0, 0, -20); scene.add(g);
  for (const px of [-5.5, 5.5]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 8, 8), std({ color: 0x2a1a10 })); post.position.set(px, 4, 0); g.add(post); }
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      void main(){ vec2 p=(v-0.5)*3.0; float a=sin(p.x*3.0+t)+cos(p.y*3.0-t*1.2)+sin(length(p)*4.0-t*2.0);
        vec3 c=0.5+0.5*cos(vec3(0.0,1.5,3.0)+a*1.4); c=mix(c,vec3(1.0,0.6,0.2),0.35); float scan=sin((v.y+t*0.3)*70.0)*0.5+0.5; gl_FragColor=vec4(c*(0.6+0.5*scan),1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(10, 5.6), scrMat); scr.position.set(0, 4.4, 0.2); g.add(scr);
  const cap = textPlane('SHMOREZ // VISUALS · EPK', '#ffcf5a'); cap.position.set(0, 7.6, 0.3); cap.scale.set(6, 0.8, 1); g.add(cap);
  const l = new THREE.PointLight(0xff8a3c, 5, 20, 2); l.position.set(0, 4, 4); g.add(l);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(10.5, 6, 0.6), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 4.4, 0.4); g.add(epkProxy);
  updaters.push((dt, t, p) => { scrMat.uniforms.t.value = t; l.intensity = 4 + p * 4; });
}

// ---------- S'MORES LAND (west): choc walls, graham platforms, marshmallow rocks
function buildSmoresLand() {
  const g = new THREE.Group(); scene.add(g);
  // chocolate-bar wall (segmented)
  const chocMat = std({ color: 0x3a1e0c, roughness: 0.5, metalness: 0.1, emissive: C(0x1a0c04), emissiveIntensity: 0.3 });
  for (let r = 0; r < 3; r++) for (let cc = 0; cc < 5; cc++) { const sq = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.8, 1.8), chocMat); sq.position.set(-24 + cc * 2.0, 1 + r * 2.0, -6); g.add(sq); }
  // graham-cracker platforms (tan boxes with dot texture-ish)
  const graham = std({ color: 0xc98a3c, roughness: 0.9, emissive: C(0x3a2408), emissiveIntensity: 0.2 });
  [[-16, 4, 0], [-20, 8, 1.6], [-12, 10, 0.8]].forEach(([x, z, y]) => { const p = new THREE.Mesh(new THREE.BoxGeometry(4, 0.6, 3), graham); p.position.set(x, 0.3 + y, z); g.add(p); });
  // giant marshmallow boulders
  [[-14, -2, 2.2], [-19, 14, 1.8], [-10, 6, 1.4], [-24, 4, 2.6]].forEach(([x, z, s]) => { const m = marsh(s, s * 1.3); m.position.set(x, s * 0.65, z); g.add(m); });
  // a completed giant s'more you can stand by
  {
    const gr1 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), graham); gr1.position.set(-18, 0.25, -13); g.add(gr1);
    const mm = marsh(1.6, 1.6); mm.position.set(-18, 1.4, -13); g.add(mm);
    const ch = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.4, 3.4), chocMat); ch.position.set(-18, 2.4, -13); g.add(ch);
    const gr2 = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 4), graham); gr2.position.set(-18, 2.9, -13); g.add(gr2);
    const gl = new THREE.PointLight(0xffcf8a, 3, 12, 2); gl.position.set(-18, 4, -11); g.add(gl);
  }
  return g;
}

// ---------- THE CAMP (east): tents, string lights, log seats, trees ----------
function buildCamp() {
  const g = new THREE.Group(); scene.add(g);
  const tent = (x, z, col) => {
    const grp = new THREE.Group(); grp.position.set(x, 0, z);
    const cone = new THREE.Mesh(new THREE.ConeGeometry(2, 3, 4), std({ color: col, roughness: 0.9, emissive: C(col).multiplyScalar(0.15), emissiveIntensity: 0.5 })); cone.position.y = 1.5; cone.rotation.y = Math.PI / 4; grp.add(cone);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1.2), std({ color: 0x1a0a04, emissive: C(0xffb060), emissiveIntensity: 0.8 })); glow.position.set(0, 0.8, 1.35); grp.add(glow);
    const l = new THREE.PointLight(0xffb060, 1.5, 7, 2); l.position.set(0, 1, 1.6); grp.add(l); g.add(grp);
  };
  tent(15, 6, 0x7a3a2a); tent(19, 12, 0x2a3a6a); tent(12, 14, 0x3a5a2a);
  // log seats around a small secondary fire pit
  for (let i = 0; i < 4; i++) { const a = (i / 4) * Math.PI * 2; const log = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 2.2, 10), std({ color: 0x3a2412, roughness: 0.9 })); log.rotation.z = Math.PI / 2; log.position.set(16 + Math.cos(a) * 3, 0.4, 4 + Math.sin(a) * 3); log.rotation.y = a; g.add(log); }
  // pine tree silhouettes
  const pine = std({ color: 0x0e1a10, roughness: 1, emissive: C(0x081006), emissiveIntensity: 0.3 });
  [[24, -2], [26, 10], [20, 18], [14, 20], [28, 4]].forEach(([x, z]) => { const tr = new THREE.Group(); tr.position.set(x, 0, z); const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 2, 6), std({ color: 0x2a1810 })); trunk.position.y = 1; tr.add(trunk); for (let k = 0; k < 3; k++) { const cone = new THREE.Mesh(new THREE.ConeGeometry(2 - k * 0.5, 2.4, 7), pine); cone.position.y = 2.5 + k * 1.4; tr.add(cone); } g.add(tr); });
  // string lights arcing over the camp
  const bulbs = [];
  for (let i = 0; i < 12; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(8 + i * 1.6, 5 - Math.sin(i / 11 * Math.PI) * 1.6, 8); g.add(b); bulbs.push(b); }
  updaters.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHSL(0.1, 0.7, 0.55 + Math.sin(t * 2 + i) * 0.15)));
  return g;
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 72; const x = c.getContext('2d');
  x.font = 'bold 34px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 38);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

buildBonfire(); buildVisuals(); buildSmoresLand(); buildCamp();

// ambient: warm ember motes drifting across the whole camp + soft smoke haze
updaters.push(addMotes(scene, { color: 0xffa64a, count: 220, area: [56, 15, 56], rise: 0.6, opacity: 0.5 }));
updaters.push(addHaze(scene, { color: 0xff8a3c, count: 8, center: [0, 3, -2], area: [22, 6, 20], scale: 9, opacity: 0.05 }));

// Shmorez himself, bouncing by the fire
const sh = buildMarshmallow('#ff6b35'); sh.group.position.set(4, 0, 2); sh.group.scale.setScalar(1.3); scene.add(sh.group);
updaters.push((dt, t, p) => { if (sh.update) sh.update(t, p); sh.group.position.y = Math.abs(Math.sin(t * 3)) * (0.3 + p * 0.6); });

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 28, eye: 1.6, zMin: -24 });
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
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('SHMOREZ — EPK', EPK_URL); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -27, 27); g.z = THREE.MathUtils.clamp(g.z, -23, 27); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones + hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) { if (p.x < -8) return "S'MORES LAND"; if (p.x > 8) return 'THE CAMP'; if (p.z < -12) return 'THE VISUALS'; return 'THE BONFIRE'; }
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) hintEl.classList.toggle('show', p.z < -12 && Math.abs(p.x) < 8);
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
  const p = Math.pow(1 - ((t * (90 / 60)) % 1), 2.0);
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
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__sh = { controls, scene };
