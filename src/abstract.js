import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addBaseboard } from './scene/roomkit.js';
import { createAdmin } from './scene/admin.js';
import { buildLoopDoors } from './data/loop.js';
import { buildDJDeck } from './scene/djdeck.js';

// ABSTRACT PSYCHEDELIC — a swirling immersive void. The dome and floor are living
// shaders that shift with where you stand, glowing entities drift past, and every
// surface is a canvas: tap to paint glowing trails of light in the colour you pick.

const canvas = document.getElementById('scene');
try { const K = '12m.explored'; const s = new Set(JSON.parse(localStorage.getItem(K) || '[]')); s.add('abstract'); localStorage.setItem(K, JSON.stringify([...s])); } catch (e) {}
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 120);
const updaters = [];
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

const PLAYER = new THREE.Vector3();

// ---------- immersive swirling dome (walls + sky) ----------
const R = 28;
let domeMat, domeMesh;
{
  domeMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    uniforms: { t: { value: 0 }, pl: { value: new THREE.Vector3() } },
    vertexShader: `varying vec3 wp; void main(){ wp=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec3 wp; uniform float t; uniform vec3 pl;
      void main(){ vec3 d=normalize(wp); float a=atan(d.z,d.x); float el=d.y;
        vec3 rel=(wp-pl)*0.04;
        float w=sin(a*5.0+t*0.5+rel.x*3.0)+cos(el*8.0-t*0.4+rel.z*3.0)+sin(length(rel)*4.0-t);
        vec3 c=0.5+0.5*cos(vec3(0.0,2.1,4.2)+a*2.0+el*3.0+t*0.3+w*0.8);
        c=mix(c, 0.5+0.5*cos(vec3(1.0,3.0,5.0)+w*1.5+t*0.2), 0.4);
        gl_FragColor=vec4(c*0.9,1.0);} `,
  });
  domeMesh = new THREE.Mesh(new THREE.SphereGeometry(R, 48, 32), domeMat); scene.add(domeMesh);
  updaters.push((dt, t) => { domeMat.uniforms.t.value = t; domeMat.uniforms.pl.value.copy(PLAYER); });
}

// ---------- swirling floor ----------
let floorMat, floorMesh;
{
  floorMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, pl: { value: new THREE.Vector3() } },
    vertexShader: `varying vec3 wp; void main(){ wp=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec3 wp; uniform float t; uniform vec3 pl;
      void main(){ vec2 p=wp.xy*0.12; vec2 rel=(wp.xy-pl.xz)*0.08;
        float r=length(rel); float a=atan(rel.y,rel.x);
        float w=sin(a*6.0-t+r*6.0)+cos(p.x*3.0+t*0.6)+sin(p.y*3.0-t*0.5);
        vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*3.0+r*3.0+t*0.4+w);
        float ring=smoothstep(0.06,0.0,abs(fract(r*1.5-t*0.2)-0.5)-0.35);
        c+=ring*0.3; gl_FragColor=vec4(c*0.85,1.0);} `,
  });
  floorMesh = new THREE.Mesh(new THREE.CircleGeometry(R - 1, 64), floorMat);
  floorMesh.rotation.x = -Math.PI / 2; floorMesh.position.y = 0.01; scene.add(floorMesh);
  updaters.push((dt, t) => { floorMat.uniforms.t.value = t; floorMat.uniforms.pl.value.copy(PLAYER); });
}

// ---------- floating colour-shifting entities ----------
function buildEntities() {
  const g = new THREE.Group(); scene.add(g);
  const ents = [];
  for (let i = 0; i < 9; i++) {
    const grp = new THREE.Group(); g.add(grp);
    const mat = std({ color: 0x111122, emissive: C(0xffffff), emissiveIntensity: 1.2, roughness: 0.3 });
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5 + Math.random() * 0.7, 1), mat); grp.add(body);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(body.geometry.parameters.radius * 2.2, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide })); grp.add(halo);
    ents.push({ grp, mat, halo, body, hue: Math.random(), a: [Math.random() * 6, Math.random() * 6, Math.random() * 6], sp: [0.2 + Math.random() * 0.3, 0.15 + Math.random() * 0.3, 0.2 + Math.random() * 0.3], rad: [8 + Math.random() * 12, 2 + Math.random() * 4, 8 + Math.random() * 12] });
  }
  // a few shared coloured lights so entities cast a glow
  const lights = [new THREE.PointLight(0xff2bd0, 2, 30, 2), new THREE.PointLight(0x00f3ff, 2, 30, 2), new THREE.PointLight(0x39ff14, 1.6, 30, 2)];
  lights.forEach((l) => scene.add(l));
  updaters.push((dt, t) => {
    ents.forEach((e, i) => {
      e.grp.position.set(Math.sin(t * e.sp[0] + e.a[0]) * e.rad[0], 3 + Math.sin(t * e.sp[1] + e.a[1]) * e.rad[1], Math.cos(t * e.sp[2] + e.a[2]) * e.rad[2]);
      const col = new THREE.Color().setHSL((e.hue + t * 0.05) % 1, 0.9, 0.6);
      e.mat.emissive.copy(col); e.halo.material.color.copy(col);
      e.body.rotation.x += dt * 0.4; e.body.rotation.y += dt * 0.5;
      const s = 1 + Math.sin(t * 2 + i) * 0.12; e.grp.scale.setScalar(s);
    });
    lights.forEach((l, i) => { if (ents[i]) l.position.copy(ents[i].grp.position); });
  });
  return g;
}

// ---------- paint system: glowing dabs on any surface ----------
const PALETTE = [0xff2bd0, 0x00f3ff, 0x39ff14, 0xffe14a, 0xff7b2a, 0xffffff];
let curCol = 0;
const paints = new THREE.Group(); scene.add(paints);
const dabList = [];
const MAX_DABS = 320;
const dabTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = gr; x.fillRect(0, 0, 64, 64); const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; return tex;
})();
function paintAt(point, normal, colHex) {
  const col = C(colHex).offsetHSL((Math.random() - 0.5) * 0.05, 0, 0);
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: dabTex, color: col, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9 }));
  spr.position.copy(point).addScaledVector(normal, 0.15);
  const s = 0.6 + Math.random() * 0.7; spr.scale.setScalar(s); spr.userData = { born: performance.now() / 1000, base: s };
  paints.add(spr); dabList.push(spr);
  if (dabList.length > MAX_DABS) { const old = dabList.shift(); paints.remove(old); old.material.dispose(); }
  const cnt = document.getElementById('cnt'); if (cnt) cnt.innerHTML = 'dabs painted: <b>' + dabList.length + '</b>';
}
updaters.push((dt, t) => { for (const s of dabList) { s.material.opacity = 0.55 + Math.sin(t * 3 + s.position.x) * 0.25; s.scale.setScalar(s.userData.base * (1 + Math.sin(t * 2 + s.position.z) * 0.08)); } });

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: R - 3, eye: 1.6, zMin: -(R - 3) });
controls.pos.set(0, 1.6, 21); controls.yaw = 0;   // spawn at the entry (back) door, facing in
const loopDoors = buildLoopDoors(scene, 'abstract', { back: [0, 23.5, Math.PI], next: [0, -23.5, 0] });
const deck = buildDJDeck(scene, { x: 16, z: 6, ry: -Math.PI / 2, color: 0x00ffa8 });
addBaseboard(scene, updaters, { color: 0x00ffa8, ring: true, radius: 26 });

const _ents = buildEntities();
const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'abstract', overhead: { ax: 30, az: 30, cz: 0 },
  items: [
    { id: 'entities', label: 'Entities', obj: _ents },
    { id: 'paints', label: 'Your paint', obj: paints },
  ],
});

// ---------- input ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
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

const _hitFloor = new THREE.Vector3();
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  for (const d of loopDoors) { if (d.tap(ray)) return; }
  if (deck.tap(ray)) return;
  // nearest of floor / dome
  let best = null, bestD = Infinity, normal = new THREE.Vector3(0, 1, 0);
  const fh = ray.intersectObject(floorMesh, false)[0];
  if (fh) { best = fh.point; bestD = fh.distance; normal.set(0, 1, 0); }
  const dh = ray.intersectObject(domeMesh, false)[0];
  if (dh && dh.distance < bestD) { best = dh.point; bestD = dh.distance; normal.copy(dh.point).multiplyScalar(-1).normalize(); }
  if (best) paintAt(best, normal, PALETTE[curCol]);
}

// palette swatches
const palEl = document.getElementById('palette');
if (palEl) PALETTE.forEach((hex, i) => {
  const b = document.createElement('div'); b.className = 'sw' + (i === curCol ? ' on' : ''); b.style.background = '#' + C(hex).getHexString();
  b.onclick = () => { curCol = i; [...palEl.children].forEach((c, j) => c.classList.toggle('on', j === i)); };
  palEl.appendChild(b);
});

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones
const zoneEl = document.getElementById('zone'); let curZone = '';
function updateZone(p) {
  const z = Math.hypot(p.x, p.z) > 16 ? 'THE OUTER SWIRL' : (dabList.length > 40 ? 'YOUR CANVAS' : 'THE VOID');
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1700); } }
}

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'warehouse.html'; }, 470);
};

// loop
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  PLAYER.copy(controls.pos);
  admin.update(dt);
  for (const d of loopDoors) { d.update(dt, t, controls.pos); d.tryEnter(controls.pos); }
  deck.update(dt, t);
  for (const u of updaters) u(dt, t, 0);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__ab = { controls, scene, paintAt, dabList };

if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
