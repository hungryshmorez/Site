import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createReducedMotion } from './player/motion.js';
import { textPlane } from './scene/signs.js';
import { openWindow } from './ui/popup.js';
import { openVote } from './ui/vote.js';
import { LAB } from './data/catalog.js';
import { TTA_WIDE, TTA_TALL } from './data/tta.js';
import { LIBRARY } from './data/library.js';
import { THEATERS, ARCADE } from './data/theaters.js';
import { ALL_ENTRIES, CHROMA_VIDEOS } from './data/chroma.js';
import { buildTrash } from './scene/trash.js';
import { buildDealer } from './scene/dealer.js';
import { buildLitter } from './scene/litter.js';
import './player/globalplayer-boot.js';

// THE UNDERGROUND — the B2Buddy entertainment complex, rebuilt for the web from the Unity project's
// venue builder (Assets/B2BuddyUnderground). One walkable complex:
//   main lobby → concert arena (two DJ stages, VIP balconies up the stairs) → gallery →
//   neon arcade (every cabinet opens a real game) · cinema society (main + private screens).
// The Unity project is authored in metres with z forward; this file keeps those coordinates and
// mirrors z once at the end (see flush()), so every number below matches the Unity source.

createReducedMotion();
const $ = (id) => document.getElementById(id);
const canvas = $('tv');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03050d);
scene.fog = new THREE.FogExp2(0x05060d, 0.0065);
const camera = new THREE.PerspectiveCamera(70, innerWidth / innerHeight, 0.1, 220);
scene.add(new THREE.AmbientLight(0x6a76a8, 3.2));
scene.add(new THREE.HemisphereLight(0x8aa0ff, 0x2a1848, 1.6));

// ---- palette + materials ----
const CY = 0x10c4ff, VI = 0xa326ff, AM = 0xff8829;
const std = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.1, ...o });
const glow = (c) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
const M = {
  wall: std(0x3a4560, { roughness: 0.75 }), metal: std(0x2a3348, { roughness: 0.35, metalness: 0.8 }),
  stone: std(0x1c2436, { roughness: 0.3, metalness: 0.25 }), floor: std(0x161d2e, { roughness: 0.3, metalness: 0.3 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x1d2b3d, roughness: 0.1, transparent: true, opacity: 0.35 }),
  velvet: std(0x432a68, { roughness: 0.95 }), seat: std(0x6a3fa8, { roughness: 0.9 }), brass: std(0xb58a3c, { roughness: 0.3, metalness: 0.85 }),
  white: std(0xe8ecf8), cyan: glow(CY), violet: glow(VI), amber: glow(AM),
};
const BASE = { cyan: new THREE.Color(CY), violet: new THREE.Color(VI), amber: new THREE.Color(AM) };
const uTime = { value: 0 };
function ledMat(a, b) {   // animated LED wall: concentric / diagonal lines in two colours
  return new THREE.ShaderMaterial({
    uniforms: { t: uTime, a: { value: new THREE.Color(a) }, b: { value: new THREE.Color(b) }, k: { value: 1 } },
    vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: `varying vec2 v; uniform float t,k; uniform vec3 a,b;
      void main(){ vec2 p=v-.5; float r=length(p*vec2(1.,.62)); float w=smoothstep(.42,.5,abs(fract(r*9.-t*.6)-.5));
        float d=smoothstep(.43,.5,abs(fract((v.x+v.y)*6.-t*.35)-.5)); vec3 c=mix(a,b,clamp(v.x+sin(t*.5)*.2,0.,1.));
        vec3 col=c*(.12+.7*w+.45*d)*k; gl_FragColor=vec4(col,1.); }`,
  });
}
const ledA = ledMat(0x0a6a9a, 0x7a22d8), ledB = ledMat(0x7a22d8, 0x0a6a9a);
const testCard = (a, b) => ledMat(a, b);

// ---- static geometry builder: boxes etc. are placed in Unity space, merged per material ----
const buckets = new Map();
let T = new THREE.Matrix4();
const stack = [];
const push = (x = 0, y = 0, z = 0, yaw = 0, sc = 1) => { stack.push(T.clone()); T = T.clone().multiply(new THREE.Matrix4().makeTranslation(x, y, z)).multiply(new THREE.Matrix4().makeRotationY(THREE.MathUtils.degToRad(yaw))); if (sc !== 1) T.multiply(new THREE.Matrix4().makeScale(sc, sc, sc)); };
const pop = () => { T = stack.pop(); };
const group = (x, y, z, yaw, fn, sc = 1) => { push(x, y, z, yaw, sc); fn(); pop(); };
const place = (x, y, z, rx = 0, ry = 0, rz = 0) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z),
  new THREE.Quaternion().setFromEuler(new THREE.Euler(THREE.MathUtils.degToRad(rx), THREE.MathUtils.degToRad(ry), THREE.MathUtils.degToRad(rz), 'YXZ')), new THREE.Vector3(1, 1, 1));
function add(mat, geo, local) {
  geo.applyMatrix4(T.clone().multiply(local));
  if (!buckets.has(mat)) buckets.set(mat, []);
  buckets.get(mat).push(geo);
}
const box = (mat, w, h, d, x, y, z, rx, ry, rz) => add(mat, new THREE.BoxGeometry(w, h, d), place(x, y, z, rx, ry, rz));
const cyl = (mat, r, h, x, y, z, rx, ry, rz) => add(mat, new THREE.CylinderGeometry(r, r, h, 14), place(x, y, z, rx, ry, rz));
const sph = (mat, sx, sy, sz, x, y, z) => { const g = new THREE.SphereGeometry(0.5, 12, 8); g.scale(sx, sy, sz); add(mat, g, place(x, y, z)); };
function rod(mat, a, b, r) {
  const A = new THREE.Vector3(...a), Bv = new THREE.Vector3(...b), len = A.distanceTo(Bv);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), Bv.clone().sub(A).normalize());
  const g = new THREE.CylinderGeometry(r, r, len, 6);
  add(mat, g, new THREE.Matrix4().compose(A.clone().add(Bv).multiplyScalar(0.5), q, new THREE.Vector3(1, 1, 1)));
}
const flat = (mat, w, d, x, y, z) => add(mat, new THREE.PlaneGeometry(w, d), place(x, y, z, -90, 0, 0));   // a floor panel, facing up
function quad(mat, w, h, x, y, z, ry = 0) {   // Unity quads face -z with u running along +x
  const g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
  add(mat, g, place(x, y, z, 0, ry + 180, 0));
}
function flushInto(out) {   // mirror z (Unity is left-handed), fix winding, merge per material
  for (const [mat, list] of buckets) {
    for (const g of list) {
      const p = g.attributes.position, n = g.attributes.normal;
      for (let i = 0; i < p.count; i++) { p.setZ(i, -p.getZ(i)); if (n) n.setZ(i, -n.getZ(i)); }
      if (g.index) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } }
      if (g.attributes.uv) g.attributes.uv.needsUpdate = true;
    }
    out.add(new THREE.Mesh(mergeGeometries(list, false), mat));
  }
  buckets.clear();
}
function flush() { const out = new THREE.Group(); flushInto(out); scene.add(out); }
// a moving part: build `fn` around its own origin, get back a THREE.Group placed (and animatable) in the scene
function dyn(x, y, z, yaw, fn) {
  const saved = [...buckets], savedT = T.clone(), savedStack = stack.slice();
  const p = wpos(x, y, z), phi = yawOf() + THREE.MathUtils.degToRad(yaw);
  buckets.clear(); T = new THREE.Matrix4(); stack.length = 0;
  fn();
  const g = new THREE.Group(); flushInto(g);
  buckets.clear(); for (const [k, v] of saved) buckets.set(k, v);
  T = savedT; stack.length = 0; stack.push(...savedStack);
  g.position.set(p.x, p.y, -p.z); g.rotation.y = -phi; scene.add(g); return g;
}
const wpos = (x, y, z) => new THREE.Vector3().setFromMatrixPosition(T.clone().multiply(new THREE.Matrix4().makeTranslation(x, y, z)));
const yawOf = () => Math.atan2(T.elements[8], T.elements[0]);
function text(str, x, y, z, size, color = '#ffffff', yaw = 0) {   // Unity TextMesh: readable from -z
  const p = wpos(x, y, z), phi = yawOf() + THREE.MathUtils.degToRad(yaw);
  const w = Math.max(1.2, str.length * size * 0.8 + 0.6), h = size * 2.2;
  const m = textPlane(str, w, h, { color, glow: color, weight: '700' });
  m.position.set(p.x, p.y, -p.z); m.rotation.y = -phi; scene.add(m);
  return m;
}
const lights = [];
function point(x, y, z, color, intensity, dist) { const p = wpos(x, y, z); const l = new THREE.PointLight(color, intensity, dist, 1.7); l.position.set(p.x, p.y, -p.z); scene.add(l); lights.push(l); return l; }

// ---- walk model (Unity coords): rects you may stand in, heights, solid props ----
const rects = [];   // {x0,x1,z0,z1,u?}
const rect = (x0, x1, z0, z1, u = false) => rects.push({ x0, x1, z0, z1, u });
const solids = [];
const solid = (x0, x1, z0, z1, h = 0) => solids.push({ x0, x1, z0, z1, h });   // h > 0: a step or terrace, only blocks you while you are standing more than a stride below its top

// ---- architecture helpers (ports of the Unity builder) ----
const floorSlab = (cx, cy, cz, sx, sz) => { box(M.stone, sx, 0.5, sz, cx, cy - 0.25, cz); box(M.floor, sx, 0.01, sz, cx, cy + 0.005, cz); };
function portal(cx, cz, w, h, led, title, yaw = 0, lab = '#fff') {
  group(cx, 0, cz, yaw, () => {
    box(M.metal, 0.5, h, 0.65, -w / 2, h / 2, 0); box(M.metal, 0.5, h, 0.65, w / 2, h / 2, 0); box(M.wall, w + 0.5, 0.65, 0.65, 0, h, 0);
    box(led, 0.065, h - 0.1, 0.07, -w / 2 + 0.27, h / 2, -0.35); box(led, 0.065, h - 0.1, 0.07, w / 2 - 0.27, h / 2, -0.35); box(led, w, 0.06, 0.07, 0, h - 0.28, -0.35);
    text(title, 0, h + 0.68, -0.42, 0.45, lab);
  });
}
function sofa(x, z, yaw, w, mat, y = 0) {
  group(x, y, z, yaw, () => {
    box(M.wall, w, 0.35, 1.05, 0, 0.25, 0); box(mat, w, 1, 0.24, 0, 0.9, 0.45);
    const n = Math.max(1, Math.round(w / 0.85));
    for (let i = 0; i < n; i++) { const cx = -w / 2 + (w / n) * (i + 0.5); box(mat, w / n - 0.035, 0.23, 0.87, cx, 0.55, -0.04); box(mat, w / n - 0.04, 0.61, 0.22, cx, 0.91, 0.26); }
    for (const s of [-1, 1]) { box(mat, 0.2, 0.65, 1.1, s * (w / 2 - 0.06), 0.7, 0); box(M.brass, 0.08, 0.18, 0.65, s * (w / 2 - 0.24), 0.08, 0); }
  });
}
function table(x, z, w = 1.6, d = 1, y = 0) {
  group(x, y, z, 0, () => { box(M.metal, w * 0.55, 0.64, d * 0.55, 0, 0.32, 0); box(M.stone, w, 0.12, d, 0, 0.68, 0); box(M.brass, w + 0.02, 0.025, d + 0.02, 0, 0.61, 0); cyl(M.amber, 0.065, 0.28, 0, 0.99, 0); });
}
function truss(a, b) {
  const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b), dir = B.clone().sub(A).normalize();
  let u = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0)); if (u.lengthSq() < 0.01) u.set(1, 0, 0); u.normalize();
  const v = new THREE.Vector3().crossVectors(dir, u);
  for (let i = 0; i < 3; i++) { const an = (i * Math.PI * 2) / 3, off = u.clone().multiplyScalar(Math.cos(an) * 0.25).add(v.clone().multiplyScalar(Math.sin(an) * 0.25)); rod(M.metal, A.clone().add(off).toArray(), B.clone().add(off).toArray(), 0.045); }
  const n = Math.max(1, Math.ceil(A.distanceTo(B) / 0.9));
  for (let i = 0; i < n; i++) { const c = A.clone().lerp(B, i / n), d = A.clone().lerp(B, (i + 1) / n); rod(M.metal, c.clone().add(u.clone().multiplyScalar(0.25)).toArray(), d.clone().sub(u.clone().multiplyScalar(0.25)).toArray(), 0.026); }
}
const pulseMats = [];   // beam materials whose opacity breathes with the show
function beam(top, bottom, color) {
  const A = new THREE.Vector3(...top), B = new THREE.Vector3(...bottom), len = A.distanceTo(B);
  const g = new THREE.CylinderGeometry(0.05, 0.9, len, 10, 1, true);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.07, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, side: THREE.DoubleSide }));
  const pa = wpos(...A.toArray()), pb = wpos(...B.toArray());
  const a3 = new THREE.Vector3(pa.x, pa.y, -pa.z), b3 = new THREE.Vector3(pb.x, pb.y, -pb.z);
  m.position.copy(a3.clone().add(b3).multiplyScalar(0.5)); m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), a3.clone().sub(b3).normalize());
  scene.add(m); pulseMats.push(m.material);
}
function fixture(top, bottom) {   // simple moving-light housing aimed down its beam
  const A = new THREE.Vector3(...top), B = new THREE.Vector3(...bottom), dir = B.clone().sub(A).normalize(), q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, -1, 0), dir);
  add(M.metal, new THREE.CylinderGeometry(0.16, 0.22, 0.5, 8), new THREE.Matrix4().compose(A, q, new THREE.Vector3(1, 1, 1)));
  add(M.white, new THREE.CylinderGeometry(0.15, 0.15, 0.04, 8), new THREE.Matrix4().compose(A.clone().add(dir.clone().multiplyScalar(0.26)), q, new THREE.Vector3(1, 1, 1)));
}

// ---- supplied artwork models (decimated GLBs from the Unity project) ----
const gltf = new GLTFLoader();
const MODEL = { eyeA: 'VisionaryEye', eyeB: 'DreamEye', joust: 'JoustingRider', chrome: 'RobotHorse', toon: 'CartoonHorse' };
function model(key, x, y, z, height, yaw = 0, local = null) {
  const p = wpos(x, y, z), phi = yawOf() + THREE.MathUtils.degToRad(yaw);
  gltf.load(`underground/${MODEL[key]}.glb`, (g) => {
    const o = g.scene, bb = new THREE.Box3().setFromObject(o), sz = bb.getSize(new THREE.Vector3()), c = bb.getCenter(new THREE.Vector3());
    const s = height / (sz.y || 1);
    o.traverse((m) => { if (m.isMesh) { const map = m.material.map; m.material = new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide, toneMapped: false }); } });
    const wrap = new THREE.Group(); o.position.set(-c.x, -bb.min.y, -c.z); wrap.add(o); wrap.scale.setScalar(s);
    wrap.position.set(p.x, p.y, -p.z); wrap.rotation.y = -phi + Math.PI; scene.add(wrap);
  });
}

// ---- interactions: raycast targets ----
const hits = [];   // {mesh, run}
function hotspot(x, y, z, w, h, d, run, label) {
  const p = wpos(x, y, z), m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ visible: false }));
  m.position.set(p.x, p.y, -p.z); m.rotation.y = -yawOf(); m.userData.label = label; scene.add(m); hits.push({ mesh: m, run });
}
function kiosk(x, z, yaw, title, accent, run) {
  group(x, 1.3, z, yaw, () => {
    box(M.metal, 0.65, 1.05, 0.55, 0, -0.52, 0); box(M.wall, 0.85, 0.6, 0.12, 0, 0.1, -0.05, 12); box(accent, 0.85, 0.035, 0.04, 0, 0.43, -0.12);
    text(title.toUpperCase(), 0, 0.1, -0.15, 0.09, '#ffffff'); text('[ CLICK ]', 0, 0.68, -0.08, 0.14, '#99e0ff');
    hotspot(0, 0, -0.1, 1.1, 1.4, 0.9, run, title);
  });
}

// =====================================================================================
//  THE VENUE (positions are Unity metres: x right, z forward, arena centre at the origin)
// =====================================================================================

// ---- arena shell ----
function arenaShell() {
  floorSlab(0, 0, 0, 48, 48);
  box(M.wall, 0.6, 12, 48, -24, 6, 0); box(M.wall, 0.6, 12, 48, 24, 6, 0);
  for (const z of [-24, 24]) { box(M.wall, 19, 12, 0.5, -14.6, 6, z); box(M.wall, 19, 12, 0.5, 14.6, 6, z); box(M.wall, 10, 6.4, 0.5, 0, 8.8, z); }
  box(M.wall, 48, 0.4, 48, 0, 12.3, 0);
  for (let j = 0; j < 8; j++) box(M.stone, 1.9, 0.16, 45, -9.5 + j * 2.7, 12.04, 0);
  for (let k = 0; k < 7; k++) {
    const z = -20 + k * 6.6;
    for (const s of [-1, 1]) { if (Math.abs(z) > 10) box(M.metal, 0.85, 7.6, 0.75, s * 20.8, 8.4, z, 0, 0, s * -28); box(M.metal, 18.4, 0.65, 0.9, s * 9.5, 11.7, z); box(s < 0 ? M.violet : M.cyan, 17, 0.055, 0.06, s * 10.1, 11.32, z - 0.33); }
  }
  for (let i = 0; i < 12; i++) { const x = -22 + i * 4; box(M.brass, 0.18, 6.2, 0.16, x, 8.5, 23.65); box(M.metal, 0.18, 6.2, 0.16, x, 8.5, -23.65); }
  portal(0, -23.65, 9, 5.4, M.amber, '01   ARRIVAL', 180); portal(0, 23.65, 9, 5.4, M.cyan, 'ARCADE  /  CINEMAS');
  text('B 2 B U D D Y', 0, 9.25, 23.6, 0.8, '#b3d9ff'); text('T H E   U N D E R G R O U N D', 0, 8.15, 23.58, 0.27, '#5799cc');
  rect(-23.5, 23.5, -23.5, 23.5); rect(-4.4, 4.4, -24.5, -23.4); rect(-4.4, 4.4, 23.4, 24.5);
}
function djStage(artwork, led, accent, label) {
  box(M.stone, 15, 1.3, 6.3, 0, 0.65, 0.1);
  for (let i = 0; i < 3; i++) { box(M.wall, 13 - i * 0.6, 0.32 + i * 0.4, 0.6, 0, 0.16 + i * 0.2, -3.8 + i * 0.4); box(accent, 12.5 - i * 0.6, 0.035, 0.035, 0, 0.3 + i * 0.2, -4.1 + i * 0.4); }
  box(accent, 14.8, 0.055, 0.06, 0, 1.31, -3.02);
  box(M.metal, 13.95, 7.15, 0.3, 0, 5.2, 3.0); quad(led, 13.6, 6.8, 0, 5.2, 2.8);
  for (let i = 0; i < 7; i++) box(M.wall, 0.025, 6.8, 0.03, -6.4 + i * 2.13, 5.2, 2.75);
  group(0, 1.3, -1.1, 0, () => {
    box(M.metal, 7.4, 1.4, 1.5, 0, 0.7, 0);
    for (let i = 0; i < 7; i++) box(i % 2 ? M.stone : M.wall, 1.07, 1.25, 0.14, -3.15 + i * 1.05, 0.7, -0.82, 0, 0, i % 2 ? -12 : 12);
    box(M.stone, 7.7, 0.18, 1.8, 0, 1.48, 0); box(accent, 7.6, 0.04, 0.035, 0, 1.43, -0.93);
    for (const x of [-2, 2]) { box(M.wall, 2, 0.12, 1.25, x, 1.62, 0); cyl(M.metal, 0.48, 0.07, x, 1.72, 0); cyl(accent, 0.37, 0.02, x, 1.77, 0); cyl(M.wall, 0.2, 0.025, x, 1.79, 0); for (let i = 0; i < 4; i++) box(i % 2 ? M.violet : M.cyan, 0.21, 0.05, 0.18, x - 0.6 + i * 0.4, 1.72, -0.44); }
    box(M.wall, 1.35, 0.18, 1.1, 0, 1.65, 0); for (let i = 0; i < 5; i++) { box(M.metal, 0.04, 0.025, 0.65, -0.5 + i * 0.25, 1.77, -0.1); box(M.white, 0.13, 0.04, 0.09, -0.5 + i * 0.25, 1.8, Math.sin(i) * 0.2); }
  });
  text(label, 0, 8.15, 2.4, 0.5, '#ffffff');
  for (const x of [-6.4, 6.4]) {
    box(M.wall, 1.5, 1.5, 1.6, x, 1.72, -1.5);
    for (let j = 0; j < 5; j++) { box(M.wall, 0.9, 0.46, 0.85, x, 5.3 + j * 0.53, -1.35); box(M.metal, 0.73, 0.34, 0.025, x, 5.3 + j * 0.53, -1.79); }
  }
  truss([-7.4, 9, 1], [7.4, 9, 1]); for (const x of [-7.2, 7.2]) truss([x, 1.4, 1], [x, 9, 1]);
  for (let i = 0; i < 6; i++) { const top = [-6 + i * 2.4, 8.6, 0.8], bot = [-5 + i * 2, 1.4, -2.8]; fixture(new THREE.Vector3(...top), new THREE.Vector3(...bot)); beam(top, bot, accent === M.cyan ? CY : VI); }
  model(artwork, 0, 3.45, 2.43, 3.8);
}
function arena() {
  group(-20, 0, 0, -90, () => djStage('eyeA', ledA, M.cyan, 'A  /  CYAN'));
  group(20, 0, 0, 90, () => djStage('eyeB', ledB, M.violet, 'B  /  VIOLET'));
  for (let i = -5; i <= 5; i++) box(i < 0 ? M.violet : M.cyan, 0.035, 0.018, 28, i * 2.5, 0.025, 0);
  for (const z of [-14, 14]) box(M.violet, 27, 0.018, 0.04, 0, 0.026, z);
  for (let i = 0; i < 5; i++) { const s = 3 + i * 1.65, pts = [[-s, 0], [0, s], [s, 0], [0, -s]]; for (let j = 0; j < 4; j++) { const a = pts[j], b = pts[(j + 1) % 4]; rod(i % 2 ? M.violet : M.cyan, [a[0], 0.035, a[1]], [b[0], 0.035, b[1]], 0.018); } }
  // halo rings + beams overhead
  for (let i = 0; i < 64; i++) { const a0 = (i / 64) * Math.PI * 2, a1 = ((i + 1) / 64) * Math.PI * 2; rod(i < 32 ? M.cyan : M.violet, [Math.cos(a0) * 7.5, 10.8, Math.sin(a0) * 7.5], [Math.cos(a1) * 7.5, 10.8, Math.sin(a1) * 7.5], 0.09); rod(M.metal, [Math.cos(a0) * 8.1, 11.05, Math.sin(a0) * 8.1], [Math.cos(a1) * 8.1, 11.05, Math.sin(a1) * 8.1], 0.14); }
  for (let i = 0; i < 8; i++) { const a = (i * Math.PI) / 4, top = [Math.cos(a) * 7.4, 10.55, Math.sin(a) * 7.4], bot = [Math.cos(a + 0.3) * 8, 0.05, Math.sin(a + 0.3) * 8]; beam(top, bot, i % 2 ? VI : CY); fixture(new THREE.Vector3(...top), new THREE.Vector3(...bot)); }
  truss([-14, 10, -11], [14, 10, -11]); truss([-14, 10, 11], [14, 10, 11]);
  point(-15, 6, -2, CY, 70, 30); point(15, 6, 2, VI, 70, 30); point(0, 9, 0, 0x6a7cff, 40, 34);
  kiosk(-14.1, -5.6, 90, 'Support DJ Cyan', M.cyan, () => vote(0));
  kiosk(14.1, -5.6, -90, 'Support DJ Violet', M.violet, () => vote(1));
  kiosk(0, -5, 0, 'Show desk', M.amber, () => showDesk());
}
// ---- VIP balconies ----
function vipBooth() {
  box(M.wall, 7, 0.1, 4.8, 0, 0.05, 0); for (const x of [-3.45, 3.45]) box(M.amber, 0.04, 0.04, 4.8, x, 0.12, 0);
  sofa(0, -1.45 + 0, 180, 4.8, M.velvet); sofa(-2.6, -0.1, 90, 2.4, M.velvet); sofa(2.6, -0.1, -90, 2.4, M.velvet); table(0, 0.4, 2, 1.3);
  box(M.glass, 0.04, 3.4, 3.8, -3.5, 1.7, -0.4); box(M.wall, 7.2, 0.2, 4.2, 0, 3.9, -0.2); box(M.amber, 6.6, 0.035, 0.06, 0, 3.78, -2.16);
  text('RESERVED  /  VIP', 0, 1.7, -2.1, 0.2, '#ff8829', 180);
}
function vip() {
  for (const z of [-21, 21]) {
    floorSlab(0, 4, z, 31, 6);
    const zf = z + (z < 0 ? 3 : -3);
    box(M.metal, 31, 0.5, 0.2, 0, 3.75, zf); box(z < 0 ? M.cyan : M.violet, 31, 0.045, 0.07, 0, 3.99, z + (z < 0 ? 3.03 : -3.03));
    for (const x of [-8.2, 8.2]) group(x, 4, z, z > 0 ? 180 : 0, vipBooth);
    for (const x of [-11.5, -4.5, 4.5, 11.5]) { box(M.glass, 6.6, 1.25, 0.055, x, 4.68, zf); rod(M.brass, [x - 3.3, 5.33, zf], [x + 3.3, 5.33, zf], 0.035); }
    rect(-15.3, 15.3, z < 0 ? -23.7 : 18.3, z < 0 ? -18.3 : 23.7, true);
  }
  for (const sign of [-1, 1]) {
    for (let i = 0; i < 22; i++) { const h = ((i + 1) * 4) / 22, z = sign * (8.25 + i * 0.5); box(M.stone, 4.5, h, 0.5, 0, h / 2, z); for (const sx of [-1.94, 1.94]) box(M.amber, 0.38, 0.025, 0.045, sx, h + 0.014, z - sign * 0.24); }
    for (const s of [-1, 1]) rod(M.brass, [s * 2.3, 1.05, sign * 8], [s * 2.3, 5.05, sign * 19], 0.045);
    rect(-2.1, 2.1, sign < 0 ? -19.4 : 8, sign < 0 ? -8 : 19.4);
  }
  for (const z of [-13.2, 13.2]) for (const x of [-10.5, 10.5]) group(x, 0, z, z < 0 ? 180 : 0, () => { box(M.velvet, 6, 0.025, 4, 0, 0.015, 0); sofa(0, 1.2, 0, 4.7, M.seat); table(0, -0.4); });
}
// ---- lobby / gallery ----
function lobby() {
  floorSlab(0, 0, -31, 22, 14);
  box(M.wall, 0.4, 7, 14, -11, 3.5, -31); box(M.wall, 0.4, 7, 14, 11, 3.5, -31); box(M.wall, 8.4, 7, 0.4, -6.8, 3.5, -38); box(M.wall, 8.4, 7, 0.4, 6.8, 3.5, -38); box(M.wall, 5.2, 2.6, 0.4, 0, 5.7, -38); box(M.wall, 22, 0.3, 14, 0, 7, -31);
  text('THE UNDERGROUND', 0, 6.15, -37.65, 0.64, '#ffffff', 180); text('B 2 B U D D Y    /    MEMBERS ENTRANCE', 0, 5.45, -37.6, 0.23, '#ff8829', 180); text('OUT TO THE STREET  /  THE FESTIVAL', 0, 4.75, -37.75, 0.2, '#73e6ff', 180);
  slideDoor({ x: 0, z: -38, yaw: 0, w: 5.2, h: 4.4, color: CY });
  for (const x of [-8, 8]) { sofa(x, -32, x < 0 ? 90 : -90, 4, M.velvet); table(x * 0.78, -32, 1.3, 1.1); box(M.amber, 0.06, 2.5, 0.08, x, 4.8, -36.4); }
  for (let i = 0; i < 5; i++) { box(M.metal, 18, 0.3, 0.35, 0, 6.65, -36 + i * 2.4); box(M.amber, 14, 0.045, 0.06, 0, 6.47, -36 + i * 2.4); }
  text('02   CONCERT ARENA  ↑', 0, 5.9, -24.4, 0.35, '#ffffff'); box(M.stone, 3.7, 1.3, 1.1, 5.9, 0.65, -27.5); text('CONCIERGE', 5.9, 1, -28.1, 0.2, '#ff8829');
  solid(4, 7.8, -28.1, -26.9); point(0, 4, -32, AM, 40, 22);
  rect(-10.5, 10.5, -37.5, -23.6);
  rect(-2.6, 2.6, -38.8, -37.4); rect(-41.5, 107, -60.8, -38.6);   // the front doors and the street outside
}
function gallery() {
  floorSlab(0, 0, 29, 48, 10);
  box(M.wall, 0.4, 7, 5.4, -24, 3.5, 26.7); box(M.wall, 0.4, 7, 0.5, -24, 3.5, 33.75); box(M.wall, 0.4, 3, 4, -24, 5.5, 31.5); box(M.wall, 48, 0.35, 10, 0, 7, 29);
  // east end: wall with the movie theater door, then the opening into the tower lobby
  box(M.wall, 0.4, 7, 5.4, 24, 3.5, 26.7); box(M.wall, 0.4, 7, 0.5, 24, 3.5, 33.75); box(M.wall, 0.4, 3, 4, 24, 5.5, 31.5);
  box(M.wall, 3, 7, 0.4, -22.5, 3.5, 34); box(M.wall, 12, 7, 0.4, -1, 3.5, 34); box(M.wall, 6, 7, 0.4, 21, 3.5, 34);
  portal(-14, 33.8, 10, 5.7, M.violet, '04   THE ARCADE'); portal(12, 33.8, 10, 5.7, M.amber, '05   CINEMA SOCIETY');
  for (let i = 0; i < 12; i++) { const x = -22 + i * 4; box(M.metal, 0.16, 0.25, 8, x, 6.7, 29); box(i < 6 ? M.violet : M.amber, 0.04, 0.04, 7.2, x, 6.5, 29); }
  for (const x of [-19, 19]) { sofa(x, 27, 180, 3, M.velvet); table(x, 28.5, 1.2, 0.8); }
  text('←  ARCADE     /     CINEMAS  →', 0, 5.8, 33.72, 0.27, '#ffffff');
  themedDoor(-24, 26.7, -90, 4.2, 5, 0xff4a5a, 'MOVIE THEATER', 'lobby.html', 'five theaters · the red carpet');
  themedDoor(24, 26.7, 90, 4.2, 5, 0xff4a5a, 'MOVIE THEATER', 'lobby.html', 'five theaters · the red carpet');
  text('TOWER  →  THE ROOMS', 23.7, 5.9, 31.5, 0.3, '#ff2bd0', 90);
  rect(-23.5, 23.5, 24.3, 33.7); rect(-18.8, -9.2, 33.4, 34.8); rect(7.2, 16.8, 33.4, 34.8);
  rect(23.4, 25, 29.7, 33.3); rect(-25, -23.4, 29.7, 33.3);   // gallery → the two tower lobbies
  text('TOWER  →  THE ARCHIVE', -23.7, 5.9, 31.5, 0.3, '#39ff14', -90);
}
// ---- neon arcade (every cabinet opens a real game) ----
const GAMES = LAB.Games.slice(0, 10);
function cabinet(title, run) {
  box(M.wall, 1.35, 0.9, 1.15, 0, 0.45, 0); box(M.metal, 1.35, 1.3, 0.7, 0, 1.45, 0.22); box(M.wall, 1.45, 0.42, 1, 0, 2.5, 0.12); box(M.violet, 1.42, 0.035, 0.045, 0, 2.73, -0.38);
  box(M.metal, 1.5, 1.05, 0.12, 0, 1.85, -0.1); quad(ledB, 1.08, 0.83, 0, 1.85, -0.16);
  text(title, 0, 2.51, -0.4, 0.11, '#ffffff'); box(M.wall, 1.42, 0.18, 0.7, 0, 1.22, -0.38);
  for (const x of [-0.39, 0.39]) { cyl(M.metal, 0.035, 0.23, x, 1.45, -0.43); sph(M.violet, 0.12, 0.12, 0.12, x, 1.58, -0.43); for (let i = 0; i < 3; i++) cyl(M.cyan, 0.037, 0.035, x + 0.12 + i * 0.09, 1.33, -0.57); }
  for (const x of [-0.66, 0.66]) box(M.cyan, 0.035, 2.1, 0.035, x, 1.15, -0.54);
  text('PLAY  /  CLICK', 0, 0.7, -0.6, 0.08, '#10c4ff'); hotspot(0, 1.4, -0.3, 1.5, 2.8, 1.8, run, title);
}
function arcade() {
  floorSlab(0, 0, 0, 22, 18);
  box(M.wall, 0.4, 7, 18, -11, 3.5, 0); box(M.wall, 0.4, 7, 18, 11, 3.5, 0); box(M.wall, 22, 7, 0.4, 0, 3.5, 9); box(M.wall, 22, 0.35, 18, 0, 7, 0);
  for (const x of [-8, 8]) box(M.wall, 6, 7, 0.4, x, 3.5, -9);
  for (let i = 0; i < 5; i++) { const z = -6 + i * 3; box(M.metal, 20, 0.3, 0.3, 0, 6.7, z); box(i % 2 ? M.cyan : M.violet, 18, 0.04, 0.05, 0, 6.52, z); }
  text('THE ARCADE', 0, 6.3, 8.7, 0.63, '#ffffff'); text('ONE BIG SCREEN  ·  PICK A GAME AT THE TERMINAL  ·  F = FULLSCREEN', 0, 5.6, 8.68, 0.16, '#10c4ff');
  box(M.metal, 16.4, 7.2, 0.3, 0, 3.4, 8.7); quad(ledA, 16, 6.8, 0, 3.4, 8.5);
  group(0, 0, -1, 0, () => {   // the selection terminal, facing the screen
    box(M.wall, 3, 1, 0.9, 0, 0.5, 0); box(M.metal, 3.1, 0.06, 1, 0, 1.03, 0); box(M.metal, 1.8, 1.2, 0.14, 0, 1.75, 0.2); quad(ledB, 1.5, 0.95, 0, 1.75, 0.12); box(M.cyan, 3, 0.05, 0.05, 0, 0.9, -0.46);
    text('GAME TERMINAL', 0, 2.75, 0.1, 0.2, '#10c4ff'); text('CLICK TO BROWSE EVERY GAME', 0, 2.45, 0.1, 0.1, '#ffffff');
    hotspot(0, 1.4, 0, 3.2, 2.6, 1.4, () => openPicker('THE ARCADE', [{ name: 'MINI', items: [{ title: 'NEON PULSE', note: 'the rhythm minigame', run: openPulse }] }, ...(ARCADE.groups || [{ name: 'GAMES', items: ARCADE.items }])]), 'Game terminal');
  });
  solid(-15.6, -12.4, 41.8, 43.2);
  sofa(-3.4, -3.6, 90, 3, M.velvet); sofa(3.4, -3.6, -90, 3, M.velvet); table(0, -3.6, 1.5, 1.5);
  point(-4, 4, -2, VI, 40, 16); point(4, 4, 3, CY, 30, 15);
}
// ---- cinemas ----
const screens = {};
function cinemaLobby() {
  floorSlab(15.5, 0, 40, 25, 12);
  box(M.wall, 0.4, 7, 12, 3, 3.5, 40); box(M.wall, 0.4, 7, 4, 27.5, 3.5, 36); box(M.wall, 0.4, 7, 2, 27.5, 3.5, 45); box(M.wall, 0.4, 1.5, 6, 27.5, 6.25, 41); box(M.wall, 25, 0.3, 12, 15.5, 7, 40);
  portal(27.5, 41, 5.6, 4.8, M.amber, '06  PRIVATE', 90); portal(7, 45.8, 6, 4.8, M.amber, 'MAIN SCREEN');
  text('CINEMA SOCIETY', 17.5, 5.85, 45.55, 0.44, '#ffffff'); text('MAIN SCREEN  /  PRIVATE SCREENINGS', 17.5, 5.12, 45.53, 0.18, '#ff8829');
  group(19, 0, 43.7, 0, () => {
    box(M.stone, 9, 1.4, 1.4, 0, 0.7, 0); box(M.metal, 9.3, 0.12, 1.65, 0, 1.45, 0); box(M.amber, 8.8, 0.04, 0.04, 0, 0.3, -0.72); text('CONCESSIONS', 0, 0.9, -0.73, 0.25, '#ff8829');
    for (let i = 0; i < 6; i++) { const x = -3 + i * 1.1; cyl(i % 2 ? M.amber : M.violet, 0.12, 0.42, x, 1.72, 0); cyl(M.white, 0.14, 0.04, x, 1.94, 0); }
    for (let i = 0; i < 3; i++) { cyl(M.seat, 0.22, 0.4, -2 + i * 2, 1.73, 0.42); for (let k = 0; k < 8; k++) sph(M.white, 0.09, 0.09, 0.09, -2 + i * 2 + Math.cos(k * 2.4) * 0.14, 1.95 + (k % 3) * 0.03, 0.42 + Math.sin(k * 2.4) * 0.14); }
  });
  solid(14.5, 23.5, 42.9, 44.5); sofa(9, 37.7, 180, 4, M.seat); table(9, 39.4, 1.6, 1);
  for (let i = 0; i < 5; i++) box(M.amber, 20, 0.05, 0.07, 15, 6.7, 35 + i * 2.4);
  point(15, 4, 40, AM, 40, 22);
  rect(3.4, 27.6, 34.4, 45.6); rect(7.2, 16.8, 33.4, 34.8); rect(4.2, 9.8, 45.4, 46.6); rect(27, 29, 38.4, 43.6);
}
const CHAIRS = [];
function cinemaChair(x, y, z, mat) {
  group(x, y, z, 180, () => { box(M.wall, 1.45, 0.36, 1.5, 0, 0.18, 0); box(mat, 1.15, 0.27, 1.2, 0, 0.5, -0.1); box(mat, 1.19, 1.32, 0.3, 0, 1.04, 0.5, -8); box(mat, 0.83, 0.32, 0.18, 0, 1.6, 0.39); for (const s of [-0.67, 0.67]) box(mat, 0.23, 0.5, 1.48, s, 0.68, 0); });
}
function mainCinema() {
  floorSlab(0, 0, 0, 24, 26);
  box(M.wall, 0.4, 8, 26, -12, 4, 0); box(M.wall, 0.4, 8, 26, 12, 4, 0); box(M.wall, 24, 8, 0.4, 0, 4, 13); box(M.wall, 24, 0.4, 26, 0, 8, 0);
  box(M.wall, 17, 8, 0.4, 3.5, 4, -13); box(M.wall, 1, 8, 0.4, -11.5, 4, -13); box(M.wall, 6, 3, 0.4, -8, 6.5, -13);
  box(M.metal, 19.85, 6.45, 0.3, 0, 4.3, 12.8); quad(screens.main.mat, 19.5, 6.1, 0, 4.3, 12.6);
  text('CINEMA SOCIETY', 0, 7.2, 12.5, 0.45, '#ffffff');
  for (let row = 0; row < 8; row++) {
    const z = -9 + row * 2.25, h = (7 - row) * 0.32; box(M.stone, 22, h + 0.06, 2.25, 0, h / 2, z);
    for (const x of [-10.2, -3.5, 3.5, 10.2]) box(M.amber, 0.38, 0.025, 0.045, x, h + 0.065, z + 1.07);
    for (let col = 0; col < 8; col++) { let x = -8.3 + col * 2.37; if (col >= 4) x += 0.3; cinemaChair(x, h + 0.08, z, M.velvet); }
  }
  for (let i = 0; i < 10; i++) { const h = (i + 1) * 0.224; box(M.stone, 2.6, h, 0.4, -10, h / 2, -13.4 + i * 0.4); }
  for (let i = 0; i < 10; i++) { const z = -11 + i * 2.5; for (const x of [-11.7, 11.7]) { box(M.velvet, 0.26, 5.5, 1.55, x, 4, z); box(i % 3 ? M.metal : M.amber, 0.04, 4.8, 0.045, x + (x < 0 ? 0.15 : -0.15), 4, z - 0.81); } }
  for (let i = 0; i < 5; i++) { box(M.metal, 22, 0.35, 0.7, 0, 7.7, -9 + i * 4.5); box(M.amber, 19, 0.04, 0.06, 0, 7.47, -9 + i * 4.5); }
  point(0, 5.8, 2, 0x4c63b8, 45, 26);
  kiosk(-4.5, -14.2, 0, 'Main screen desk', M.amber, () => { nextVideo('main'); stamp(3, 'MAIN CINEMA'); });
}
function privateCinema() {
  floorSlab(0, 0, 0, 18, 20);
  box(M.wall, 18, 7, 0.4, 0, 3.5, 10); box(M.wall, 0.4, 7, 20, 9, 3.5, 0); box(M.wall, 18, 7, 0.4, 0, 3.5, -10); box(M.wall, 0.4, 7, 12, -9, 3.5, 4); box(M.wall, 0.4, 7, 2, -9, 3.5, -9); box(M.wall, 18, 0.3, 20, 0, 7, 0);
  box(M.metal, 14.85, 5.55, 0.3, 0, 3.8, 9.8); quad(screens.vip.mat, 14.5, 5.2, 0, 3.8, 9.6);
  text('PRIVATE / AFTER HOURS', 0, 6.9, 9.5, 0.35, '#ffffff');
  for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) { cinemaChair(-5.5 + i * 3.6, 0.1 + r * 0.22, -0.5 + r * 3.5, M.seat); if (i % 2 === 0) table(-3.7 + i * 3.6, -0.5 + r * 3.5, 0.55, 0.9); }
  sofa(0, -7.8, 180, 5, M.seat); table(0, -5.6, 2.1, 1.3);
  for (let i = 0; i < 8; i++) for (const x of [-8.7, 8.7]) { box(M.velvet, 0.25, 5.5, 0.9, x, 3.5, -8 + i * 2.3); box(M.amber, 0.04, 4.8, 0.045, x + (x < 0 ? 0.16 : -0.16), 3.4, -8 + i * 2.3); }
  point(0, 5, 0, AM, 40, 22);
  kiosk(-6.4, -6, -30, 'Private screen desk', M.amber, () => { nextVideo('vip'); stamp(4, 'PRIVATE CINEMA'); });
}

// ---- screens: test card until a video plays (only while you're in the room) ----
function mkScreen(id, rectUnity, a, b) {
  const video = document.createElement('video');
  video.playsInline = true; video.crossOrigin = 'anonymous'; video.loop = false; video.muted = true; video.preload = 'none';
  const tex = new THREE.VideoTexture(video); tex.colorSpace = THREE.SRGBColorSpace;
  const mat = testCard(a, b), real = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false });
  screens[id] = { video, mat, real, rect: rectUnity, i: id === 'main' ? 0 : 3, playing: false, tex };
  video.addEventListener('ended', () => nextVideo(id));
}
function nextVideo(id, step = 1) {
  const s = screens[id]; s.i = (s.i + step + TTA_WIDE.length) % TTA_WIDE.length; const v = TTA_WIDE[s.i];
  s.video.src = v.src; s.video.muted = id !== 'main' || !userGesture; s.video.play().then(() => { swapMaterial(s); say(`▶ ${v.title}`); }).catch(() => { });
}
function swapMaterial(s) { if (s.mesh) s.mesh.material = s.real; s.playing = true; }
let userGesture = false;

// ---- crowd ----
const crowd = (() => {
  const n = 70, rng = (() => { let a = 72; return () => (a = (a * 16807) % 2147483647) / 2147483647; })();
  const bodies = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.22, 0.9, 3, 6), std(0x0b1020, { roughness: 1 }), n);
  const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.17, 8, 6), std(0x52382f, { roughness: 1 }), n);
  const pos = [];
  for (let i = 0; i < n; i++) { let x, z; do { x = (rng() - 0.5) * 26; z = (rng() - 0.5) * 24; } while (Math.abs(x) < 3 && Math.abs(z) < 3); pos.push([x, z, rng() * 6]); }
  scene.add(bodies, heads);
  const o = new THREE.Object3D();
  return (t, p) => { pos.forEach(([x, z, ph], i) => { const b = Math.abs(Math.sin(t * 4.2 + ph)) * 0.18 * p; o.position.set(x, 0.85 + b, -z); o.updateMatrix(); bodies.setMatrixAt(i, o.matrix); o.position.set(x, 1.62 + b, -z); o.updateMatrix(); heads.setMatrixAt(i, o.matrix); }); bodies.instanceMatrix.needsUpdate = heads.instanceMatrix.needsUpdate = true; };
})();


// ---- THEMED DOORS: a neon doorway that opens one of the site's own pages ----
const doorTriggers = [];   // {floor, x0..z1, url, label, armed}
const doorMats = new Map();
function doorGlow(color) {
  if (!doorMats.has(color)) doorMats.set(color, new THREE.ShaderMaterial({ uniforms: { t: uTime, c: { value: new THREE.Color(color) } }, vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec2 v; uniform float t; uniform vec3 c; void main(){ float g=.35+.25*sin(t*1.5+v.y*6.); float e=smoothstep(.0,.5,v.y)*.6+.4; gl_FragColor=vec4(c*g*e,1.); }' }));
  return doorMats.get(color);
}
const hexs = (c) => '#' + c.toString(16).padStart(6, '0');
// (x, z) is on the wall; yaw turns the door so its text reads from inside; walk through or click to enter
const LEVEL_INFO = {
  'museum.html': 'A walkable marble gallery hung with the whole roster. Walk up to any picture to read its plaque.',
  'ravecharles.html': 'Rave Charles: the masked headliner. A neon mosh pit, a coast-to-coast tour road and a giant LED-visor mask. You are down in the pit with the crowd.',
  'driftwave.html': 'DriftWave Static: a vaporwave dreamscape with a marble temple, a mallsoft arcade and a late-night lo-fi nook.',
  'vaporrooms.html': 'The VaporStudio rooms: a late-night lo-fi dorm, a vaporwave temple and a mallsoft plaza, inside the DriftWave Static area.',
  'sofaboi.html': 'Sofa King Sad Boi: a rainy kingdom of couches. A giant sofa throne, a sea of couches and a dubstep bass pit.',
  'tanky.html': 'Tanky Johnson: a cosmic western. A honky-tonk saloon, a tailgate bonfire with a lifted truck, and a neon-cactus desert under a giant moon.',
  'shmorez.html': 'Shmorez: a cozy, surreal s’mores wonderland. A giant bonfire, roasting marshmallows, chocolate-bar walls, tents and drifting embers.',
  'greenroom.html': 'The green room: the artist’s backstage lounge. Couches, a lit vanity mirror, a wardrobe rack, setlists, string lights and its own decks.',
  'lofi.html': 'Surreal lo-fi: mismatched furniture, floating headphone clouds, spinning vinyl and kaleidoscope skies, with a playable beat pad.',
  'abstract.html': 'Abstract psychedelic: swirling walls and floor that shift as you move, floating colour entities, and light you can paint onto the surfaces.',
  'studio.html': '12matt3r’s glitch room: a dark glitch-art lab around a monument of stacked CRT televisions. Datamosh, installations and the web OS.',
  'horrorcore.html': 'Horrorcore: a dim, flickering basement of dripping pipes and framed horrors. Tap the frames to hear them whisper, then crawl in for the hidden tapes.',
  'utility.html': 'The control room: server racks, a wall of monitors and a patch panel of switches you can flip, plus its own decks.',
  'gameroom.html': 'The game room: a reactive light-up dance floor that chimes when you tap the tiles, a claw machine, an arcade screen and its own decks.',
  'rooftop.html': 'The rooftop chill zone: a rotating galaxy overhead, floating holographic art and a soundboard to layer your own ambient soundscape.',
};
const wrapText = (t, n) => { const out = []; let cur = ''; for (const w of t.split(' ')) { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) out.push(cur); return out; };
function themedDoor(x, z, yaw, w, h, color, label, url, sub = '', floor = 0, y = 0, size = 0.3) {
  const mat = glow(color);
  group(x, y, z, yaw, () => {
    box(M.metal, 0.3, h, 0.5, -w / 2 - 0.15, h / 2, 0); box(M.metal, 0.3, h, 0.5, w / 2 + 0.15, h / 2, 0); box(M.metal, w + 0.6, 0.4, 0.5, 0, h + 0.2, 0);
    box(mat, 0.07, h - 0.1, 0.07, -w / 2, h / 2, -0.3); box(mat, 0.07, h - 0.1, 0.07, w / 2, h / 2, -0.3); box(mat, w, 0.07, 0.07, 0, h - 0.1, -0.3);
    quad(doorGlow(color), w, h - 0.1, 0, h / 2, -0.22);
    text(label, 0, h + 1.0, -0.3, size, hexs(color)); if (LEVEL_INFO[url]) wrapText(LEVEL_INFO[url], Math.max(24, Math.round(w * 6))).forEach((ln, i) => text(ln, 0, h + 0.55 - i * 0.26, -0.3, 0.1, '#cfe6ff')); else if (sub) text(sub.toUpperCase(), 0, h + 0.55, -0.3, Math.min(0.14, size * 0.5), '#cfe6ff');
    hotspot(0, h / 2, -0.5, w + 0.2, h, 0.8, () => useDoor(url, label, sub), label);
    // a walk-in zone just inside the doorway (in world Unity coords)
    const c = Math.cos(THREE.MathUtils.degToRad(yaw)), sn = Math.sin(THREE.MathUtils.degToRad(yaw)), wp = wpos(0, 0, -0.9);
    const hx = Math.abs(c) > 0.5 ? w / 2 : 0.9, hz = Math.abs(c) > 0.5 ? 0.9 : w / 2;
    doorTriggers.push({ floor, x0: wp.x - hx, x1: wp.x + hx, z0: wp.z - hz, z1: wp.z + hz, armed: true, run: () => useDoor(url, label, sub), label });
  });
}

// ---- THE TOWER: bottom floor is the museum; an elevator serves a different room on every floor above ----
const one = ([name, url, color, sub]) => ({ name, color, sub, doors: [[name, url, color]] });
const TOWERS = [
  { sx: 1, title: 'THE ROOMS', color: '#ff2bd0', floors: [   // 0 = ground; 1–6 the artist worlds; 7–14 the big loop in order, so the Rooftop is the top floor
    ['THE GALLERY · MUSEUM', 'museum.html', 0xe6c04a, 'the ground floor'],
    ['RAVE CHARLES', 'ravecharles.html', 0xff2bd0, '~400 shows'], ['DRIFTWAVE STATIC', 'driftwave.html', 0xa64bff, 'slushwave · ambient'], ['VAPORSTUDIO ROOMS', 'vaporrooms.html', 0x7a5cff, 'the vapor rooms'],
    ['SOFA KING SAD BOI', 'sofaboi.html', 0x5b6bff, 'dubstep · weird bass'], ['TANKY JOHNSON', 'tanky.html', 0xffd24a, 'outlaw of the void'], ['SHMOREZ · THE FIRE', 'shmorez.html', 0xff8a2a, 'the s’mores fire'],
    ['THE GREEN ROOM', 'greenroom.html', 0x39ff88, 'loop · backstage'], ['SURREAL LO-FI', 'lofi.html', 0xb967ff, 'loop · the beat room'], ['ABSTRACT PSYCHEDELIC', 'abstract.html', 0x00ffa8, 'loop · paint the void'],
    ['THE GLITCH ROOM', 'studio.html', 0x39ff14, 'loop · 12matt3r'], ['HORRORCORE', 'horrorcore.html', 0xff2b2b, 'loop · the crawlspace'], ['CONTROL ROOM', 'utility.html', 0xffb020, 'loop · utility'],
    ['GAME ROOM', 'gameroom.html', 0xff66cc, 'loop · interactive'], ['THE ROOFTOP', 'rooftop.html', 0x4ad0c0, 'top floor · the chill zone'],
  ].map(one) },
  { sx: -1, title: 'THE ARCHIVE', color: '#39ff14', floors: [   // everything else on the site: games, stages, the street, tools — four doors a floor — and the EPKs on the roof
    { name: 'THE FESTIVAL', color: 0xff2a4a, sub: 'ground floor · the grounds, the lobby, the Chroma desktop', doors: [['FESTIVAL GROUNDS', 'index.html', 0xff2bd0], ['THE WAREHOUSE', 'warehouse.html', 0x8890e0], ['MOVIE LOBBY', 'lobby.html', 0xff2a4a], ['CHROMA DESKTOP', 'chroma.html', 0xff8a2a]] },
    { name: 'GAMES I', color: 0xffd24a, sub: 'horror · open world · the knock', doors: [['KNOCK KNOCK', 'games/knock-knock/index.html', 0xe8e8ff], ['LO-FI 3D ROOM', 'games/lofi-room/index.html', 0xb967ff], ['BRIDGE HORROR HOUSE', 'games/horror-house/index.html', 0xcc1133], ['OPEN CITY', 'games/open-city/index.html', 0xffd24a]] },
    { name: 'GAMES II', color: 0x39ff14, sub: 'racing · parkour · found footage', doors: [['TURBO KART RUSH', 'games/turbo-kart-rush/index.html', 0xff8a2a], ['DRIFT DRIVE', 'games/drift-drive/index.html', 0x00f3ff], ['PARKOUR', 'games/parkour/index.html', 0x39ff88], ['SEVEN DAYS', 'games/seven-days/index.html', 0xff2a4a]] },
    { name: 'GAMES III', color: 0x00f3ff, sub: 'blocks · fractals · hydra', doors: [['VOXELCRAFT', 'games/minecraft/index.html', 0x39ff14], ['MINECRAFT CLASSIC', 'games/minecraft-classic/index.html', 0x8bc34a], ['FRACTALARIUM', 'games/fractalarium/index.html', 0xb967ff], ['HYDRACTRL', 'games/hydractrl/index.html', 0xff5ec7]] },
    { name: 'RETRO', color: 0xb967ff, sub: 'flash · browser games · old internet', doors: [['FLASH GAMES', 'games/flashstorage-archive/index.html', 0xff8a2a], ['BROWSER GAMES', 'games/browsergames/hub.html', 0x00f3ff], ['WINDOWS 97', 'games/windows97/index.html', 0x5b8cff], ['CLASSIC SITE', 'classic/index.html', 0xe6c04a]] },
    { name: 'ARCADE ROW', color: 0xff2bd0, sub: 'the block, the track, the cabinets', doors: [['ARCADE + KARAOKE', 'arcade.html', 0xff2bd0], ['THE BLOCK', 'gamecity.html', 0x39ff14], ['THE RACE TRACK', 'race.html', 0xff8a2a], ['BULLET HELL', 'bullethell.html', 0xff2a4a]] },
    { name: 'STAGES', color: 0x8a5cff, sub: 'tv · decks · visuals · the lab', doors: [['DREAMOS TV', 'tv.html', 0xff8a2a], ['SAUCELAB DJ', 'dj.html', 0x00f3ff], ['VJ STAGE', 'vj.html', 0x8a5cff], ['THE LAB', 'lab.html', 0x39ff88]] },
    { name: 'TOOLS + ARCHIVES', color: 0xc0c8d8, sub: 'build, read, investigate', doors: [['ROOM BUILDER', 'builder.html', 0xffffff], ['THE CODEX', 'codex.html', 0x99e0ff], ['CHANNEL 86 EVIDENCE', 'channel86-evidence/index.html', 0xcc1133], ['FEVER DREAM LIBRARY', 'library.html', 0xffb000]] },
  ] },
];
const FH = 8, TX = { x0: 24, x1: 44, z0: 24, z1: 34 }, TW = { x: 34, z: 29 };
const fy = (i) => i * FH;
const towerAt = (x) => TOWERS[x < 0 ? 1 : 0];
const towerLights = [];
function buildTower(T) {
  const sx = T.sx, X = (x) => sx * x, Y = (yaw) => (sx > 0 ? yaw : -yaw), hi = (a, b) => [Math.min(X(a), X(b)), Math.max(X(a), X(b))];
  T.floors.forEach((F, i) => {
    const y = fy(i), mat = glow(F.color), n = F.doors.length;
    floorSlab(X(34), y, 29, 20, 10);
    if (i > 0) box(M.wall, 0.4, FH - 0.4, 10, X(24), y + FH / 2, 29);   // on the ground floor the gallery's end wall is this wall
    box(M.wall, 0.4, FH - 0.4, 10, X(44), y + FH / 2, 29); box(M.wall, 20, FH - 0.4, 0.4, X(34), y + FH / 2, 34.2); box(M.wall, 20, FH - 0.4, 0.4, X(34), y + FH / 2, 23.8);
    if (i === 0) box(M.wall, 20, 0.35, 10, X(34), FH - 0.2, 29);
    box(mat, 19.6, 0.05, 0.06, X(34), y + FH - 0.5, 28.3); box(mat, 19.6, 0.05, 0.06, X(34), y + FH - 0.5, 29.7);
    text(`FLOOR ${i}`, X(24.25), y + 5.2, 29, 0.5, hexs(F.color), Y(90)); text(F.name, X(24.25), y + 4.2, 29, 0.24, '#ffffff', Y(90));
    if (n === 1) themedDoor(X(34), 33.8, 0, 6, 4.8, F.doors[0][2], F.doors[0][0], F.doors[0][1], F.sub, i, y, 0.3);
    else F.doors.forEach(([label, url, color], k) => themedDoor(X(34 + (k - (n - 1) / 2) * 4.8), 33.8, 0, 3.4, 4.4, color, label, url, k === 0 ? F.sub : '', i, y, 0.2));
    sofa(X(29), 27.2, 180, 3, M.velvet, y); table(X(29), 28.6, 1.2, 0.8, y);
    if (i === 0 && sx > 0) for (let k = 0; k < 5; k++) { const fx = 27 + k * 3.6; quad(doorGlow(k % 2 ? 0xe6c04a : 0xff6aa0), 2.2, 2.8, fx, 3.2, 24.5, 180); box(M.metal, 2.5, 3.1, 0.12, fx, 3.2, 24.35); }
    group(X(43.8), y, 29, Y(90), () => {   // elevator alcove on the far wall
      box(M.metal, 0.3, 3.8, 0.5, -1.6, 1.9, 0); box(M.metal, 0.3, 3.8, 0.5, 1.6, 1.9, 0); box(M.metal, 3.5, 0.4, 0.5, 0, 3.8, 0); box(M.glass, 2.8, 3.4, 0.1, 0, 1.7, 0.1); box(mat, 0.07, 3.6, 0.07, -1.4, 1.8, -0.3); box(mat, 0.07, 3.6, 0.07, 1.4, 1.8, -0.3); box(mat, 2.8, 0.07, 0.07, 0, 3.6, -0.3);
      text('ELEVATOR', 0, 4.5, -0.3, 0.25, '#ffffff'); box(M.amber, 0.3, 0.3, 0.06, 2.4, 1.4, -0.3); text('▲▼', 2.4, 1.4, -0.36, 0.14, '#000000');
      hotspot(0, 1.8, -0.4, 3.4, 3.8, 1, () => openLift(sx), 'Elevator'); hotspot(2.4, 1.4, -0.4, 0.8, 0.8, 0.8, () => openLift(sx), 'Elevator');
    });
  });
  towerLights.push(point(X(34), 5, 29, 0xff9aa8, 35, 22));
  const [r0, r1] = hi(24.6, 40.8); rect(r0, r1, 24.6, 33.4); const [s0, s1] = hi(41, 44); solid(s0, s1, 27, 31);
  for (const px of [24.5, 43.5]) for (const pz of [24.5, 33.5]) box(M.metal, 1, 150, 1, X(px), 75, pz);
  const top = fy(T.floors.length); box(M.violet, 20, 0.2, 10.4, X(34), top + 0.2, 29);
  text(T.title, X(34), top + 3, 23.5, 1.2, T.color, 180);
}
// elevator ride state + overlay
const ride = { on: false, from: 0, to: 0, t: 0, dur: 1, target: 0, sx: 1 };
function openLift(sx) {
  const el = $('lift'); if (!el) return;
  const T = sx < 0 ? TOWERS[1] : TOWERS[0], list = $('liftList'); list.replaceChildren();
  $('liftTitle').textContent = `ELEVATOR // ${T.title}`;
  T.floors.slice().reverse().forEach((f, k) => {
    const i = T.floors.length - 1 - k, b = document.createElement('button'); b.className = 'lt-row';
    b.innerHTML = `<span class="ic" style="color:${hexs(f.color)}">●</span><span><span class="t"></span><span class="m"></span><span class="d"></span></span>`;
    b.querySelector('.t').textContent = `FLOOR ${i} — ${f.name}`; b.querySelector('.m').textContent = i === player.floor && towerAt(player.x) === T ? ' · you are here' : ''; b.querySelector('.d').textContent = f.doors.length > 1 ? f.doors.map((d) => d[0]).join(' · ') : f.sub;
    b.onclick = () => { el.classList.remove('on'); rideTo(i, sx); }; list.appendChild(b);
  });
  el.classList.add('on'); player.keys.clear();
}
function rideTo(i, sx = towerAt(player.x).sx) {
  if (i === player.floor && towerAt(player.x).sx === sx) { say('already on this floor'); return; }
  const T = sx < 0 ? TOWERS[1] : TOWERS[0];
  ride.on = true; ride.sx = sx; ride.from = player.h; ride.to = fy(i); ride.target = i; ride.t = 0; ride.dur = Math.min(6, 1.2 + Math.abs(ride.to - ride.from) / 14);
  say(`▲▼ going to floor ${i} — ${T.floors[i].name}`);
}


// ---- SLIDING GLASS DOORS (animated; optionally a door into one of the site's pages) ----
const sliders = [];
const glassPane = new THREE.MeshStandardMaterial({ color: 0x35506a, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.38 });
function slideDoor({ x, z, yaw = 0, w = 5.2, h = 4.4, url = null, label = '', color = CY, sign = '', pane = glassPane }) {
  const p = wpos(x, 0, z), phi = yawOf() + THREE.MathUtils.degToRad(yaw), half = w / 2, panels = [];
  const g = new THREE.Group(); g.position.set(p.x, 0, -p.z); g.rotation.y = -phi; scene.add(g);
  const rim = new THREE.MeshBasicMaterial({ color, toneMapped: false });
  for (const s of [-1, 1]) {
    const pg = new THREE.Group(); pg.position.x = s * half / 2; g.add(pg);
    pg.add(new THREE.Mesh(new THREE.BoxGeometry(half - 0.05, h - 0.1, pane === glassPane ? 0.06 : 0.3), pane));
    pg.children[0].position.y = h / 2;
    const stile = new THREE.Mesh(new THREE.BoxGeometry(0.05, h - 0.1, 0.08), rim); stile.position.set(-s * (half / 2 - 0.05), h / 2, -0.03); pg.add(stile);
    panels.push({ g: pg, x0: s * half / 2, dir: s });
  }
  const px = wpos(x, 0, z), cx = px.x, cz = px.z;
  sliders.push({ panels, cx, cz, half, open: 0 });
  if (url) {
    group(x, 0, z, yaw, () => {
      box(M.metal, 0.3, h, 0.5, -half - 0.15, h / 2, 0); box(M.metal, 0.3, h, 0.5, half + 0.15, h / 2, 0); box(M.metal, w + 0.6, 0.4, 0.5, 0, h + 0.2, 0);
      box(glow(color), 0.07, h, 0.07, -half, h / 2, -0.3); box(glow(color), 0.07, h, 0.07, half, h / 2, -0.3); box(glow(color), w, 0.07, 0.07, 0, h, -0.3);
      if (label) text(label, 0, h + 1.0, -0.3, 0.38, hexs(color)); if (sign) text(sign, 0, h + 0.5, -0.3, 0.16, '#cfe6ff');
      hotspot(0, h / 2, -0.5, w, h, 0.8, () => goTo(url, `entering ${label.toLowerCase()}…`), label);
      const wp = wpos(0, 0, -1.3), c = Math.cos(THREE.MathUtils.degToRad(yaw)), hx = Math.abs(c) > 0.5 ? half : 1.3, hz = Math.abs(c) > 0.5 ? 1.3 : half;
      doorTriggers.push({ floor: 0, x0: wp.x - hx, x1: wp.x + hx, z0: wp.z - hz, z1: wp.z + hz, armed: true, url, label });
    });
  }
}
function lamp(x, z, toward, real) {   // street lamp: pole, arm, warm lens (arm points toward the road)
  const dz = toward > 0 ? 1 : -1;
  cyl(M.metal, 0.1, 8, x, 4, z); cyl(M.metal, 0.22, 0.4, x, 0.2, z); rod(M.metal, [x, 7.8, z], [x, 7.85, z + dz * 1.6], 0.05);
  box(M.metal, 0.5, 0.18, 0.9, x, 7.8, z + dz * 1.7); box(glow(0xffcf9a), 0.38, 0.03, 0.7, x, 7.69, z + dz * 1.7);
  if (real) point(x, 7, z + dz * 1.7, 0xffcc90, 55, 24);
}
function car(x, z, yaw, paint) {
  group(x, 0, z, yaw, () => {
    box(paint, 1.9, 0.62, 4.5, 0, 0.62, 0); box(M.glass, 1.66, 0.52, 2.3, 0, 1.17, 0.25); box(paint, 1.6, 0.06, 1.9, 0, 1.45, 0.25);
    for (const wx of [-0.97, 0.97]) for (const wz of [-1.45, 1.45]) cyl(M.metal, 0.36, 0.26, wx, 0.36, wz, 0, 0, 90);
    for (const hx of [-0.62, 0.62]) { box(M.white, 0.4, 0.12, 0.04, hx, 0.7, -2.26); box(glow(0xff2a2a), 0.45, 0.1, 0.04, hx, 0.72, 2.26); }
  });
}
const CONCRETE = std(0x3a3f4b, { roughness: 0.95 }), ASPHALT = std(0x0d1016, { roughness: 0.35, metalness: 0.4 }), PAINT = glow(0xc9cfdc), TURF = std(0x0b1612, { roughness: 1 }), RUST = std(0x5a3622, { roughness: 0.9, metalness: 0.3 });
const INK = std(0x090c14, { roughness: 0.8 }), PLUM = std(0x6a2a78, { roughness: 0.4, metalness: 0.4 }), TEAL = std(0x1c6a70, { roughness: 0.4, metalness: 0.4 });
const MUSEUM_FLOORS = [
  ['G', 'THE 3D MUSEUM', 'museum.html', 'The walkable gallery of the whole roster.'],
  ['1', 'RAVE CHARLES EPK', 'epk/ravecharles/index.html', 'Press kit: the masked headliner, about 400 shows.'], ['2', 'SHMOREZ EPK', 'epk/shmorez/index.html', 'Press kit: the s’mores fire.'],
  ['3', 'TANKY JOHNSON EPK', 'epk/tanky/index.html', 'Press kit: outlaw of the void.'], ['4', 'DRIFTWAVE STATIC EPK', 'epk/driftwave/index.html', 'Press kit: slushwave and ambient.'],
  ['5', 'SOFA KING EPK', 'epk/sofaboi/index.html', 'Press kit: Sofa King Sad Boi.'], ['6', 'GLITCH ART EPK', 'epk/glitch/glitch-art-epk.html', 'Press kit: the glitch art practice.'],
  ['7', 'THAT TIME AGAIN STUDIOS', 'studios/index.html', 'The studio: shows, episodes and synthetic media.'], ['8', 'LINKS · ALL PROJECTS', 'links.html', 'Every project, one page.'],
  ['9', 'THE BOARD', 'blog.html', 'News, posts and the guest book.'], ['10', 'MERCH STORE', 'store.html', 'Tees, caps and vinyl.'], ['11', 'B2BUDDY RECORDS', 'https://hungryshmorez.github.io/Media/music/', 'The music: the record label’s catalog.'],
];
function openMuseumLift() {
  openPanel('MUSEUM ELEVATOR // EVERYTHING ABOUT THE ART', [], (t2, q, body) => {
    for (const [fl, name, url, info] of MUSEUM_FLOORS.slice().reverse()) body.appendChild(panelRow(fl, name, 'floor ' + fl, info, () => { $('panel').classList.remove('on'); openWindow(name, /^https?:/.test(url) ? url : new URL(url, location.href).href); }));
  });
}
function museum() {   // a hollow building behind the pillared entrance; the elevator at the back reaches every floor
  box(M.stone, 17, 0.5, 24.4, 116.9, -0.25, -50.1); box(FST.marble, 16.6, 0.02, 24, 116.9, 0.012, -50.1);
  box(M.wall, 0.8, 14, 6.3, 108.4, 7, -59.15); box(M.wall, 0.8, 14, 12.1, 108.4, 7, -43.95); box(M.wall, 0.8, 9, 6, 108.4, 9.5, -53);
  box(M.wall, 16.8, 14, 0.8, 116.9, 7, -62.3); box(M.wall, 16.8, 14, 0.8, 116.9, 7, -37.9); box(M.wall, 0.8, 14, 24.4, 125.3, 7, -50.1); box(M.wall, 17.6, 0.6, 25, 116.9, 14.3, -50.1);
  for (let i = 0; i < 5; i++) { const z = -58 + i * 4.6; box(M.stone, 1.2, 1, 1.2, 114, 0.5, z); sph(O.gold, 0.5, 0.5, 0.5, 114, 1.6, z); box(M.stone, 1.2, 1, 1.2, 119.5, 0.5, z); sph(i % 2 ? O.cyan : O.magenta, 0.5, 0.5, 0.5, 119.5, 1.6, z); museumSolid(114, z); museumSolid(119.5, z); }
  group(124.8, 0, -50, 90, () => {
    box(M.metal, 0.3, 3.8, 0.5, -1.6, 1.9, 0); box(M.metal, 0.3, 3.8, 0.5, 1.6, 1.9, 0); box(M.metal, 3.5, 0.4, 0.5, 0, 3.8, 0); box(M.glass, 2.8, 3.4, 0.1, 0, 1.7, 0.1);
    box(glow(0xe6c04a), 0.07, 3.6, 0.07, -1.4, 1.8, -0.3); box(glow(0xe6c04a), 0.07, 3.6, 0.07, 1.4, 1.8, -0.3); box(glow(0xe6c04a), 2.8, 0.07, 0.07, 0, 3.6, -0.3);
    text('MUSEUM ELEVATOR', 0, 5, -0.3, 0.4, '#ffd96a'); text('THE EPKs  ·  THE STUDIOS  ·  THE LINKS  ·  THE STORE  ·  THE MUSIC', 0, 4.4, -0.3, 0.16, '#ffffff');
    hotspot(0, 1.8, -0.4, 3.4, 3.8, 1, () => openMuseumLift(), 'Museum elevator');
  });
  text('THE MUSEUM', 108.8, 12, -50, 1.2, '#ffd96a', 90); point(113, 8, -50, 0xffd9a0, 90, 30); point(121, 8, -50, 0xffd9a0, 90, 30);
  rect(107, 109.2, -56, -50); rect(108.8, 124.4, -61.6, -38.6);
}
const museumSolid = (x, z) => solid(x - 0.7, x + 0.7, z - 0.7, z + 0.7);
function street() {
  box(TURF, 300, 1, 140, 30, -0.5, -108);
  box(CONCRETE, 150, 0.12, 6.8, 33, 0.06, -41.6); box(CONCRETE, 150, 0.12, 4.2, 33, 0.06, -59.1);
  for (const z of [-45, -57]) box(M.stone, 150, 0.16, 0.3, 33, 0.08, z);
  box(ASPHALT, 150, 0.01, 11.7, 33, 0.005, -51);
  for (let i = 0; i < 30; i++) { const x = -40 + i * 5; if (Math.abs(x - 18) < 3) continue; box(PAINT, 2.4, 0.006, 0.14, x, 0.013, -51); }
  for (const z of [-45.6, -56.4]) box(PAINT, 150, 0.006, 0.1, 33, 0.013, z);
  for (let i = 0; i < 11; i++) box(PAINT, 4.2, 0.006, 0.55, 18, 0.014, -45.9 - i * 1.03);
  // ---- club facade ----
  box(M.wall, 39.4, 14, 0.8, -22.3, 7, -38.6); box(M.wall, 39.4, 14, 0.8, 22.3, 7, -38.6); box(M.wall, 5.2, 9.6, 0.8, 0, 9.2, -38.6); box(M.metal, 84.4, 0.5, 1.2, 0, 14.25, -38.7);
  for (let i = 0; i < 16; i++) { const x = -40 + i * 5.33; if (Math.abs(x) < 11) continue; box(M.metal, 0.3, 13.4, 0.3, x, 7, -39.12); box(i % 2 ? M.violet : M.cyan, 0.07, 8, 0.05, x, 5, -39.3); }
  box(INK, 21, 5.6, 0.1, 0, 9.6, -39.05); box(M.cyan, 21, 0.09, 0.07, 0, 12.45, -39.12); box(M.violet, 21, 0.09, 0.07, 0, 6.75, -39.12); for (const x of [-10.5, 10.5]) box(x < 0 ? M.cyan : M.violet, 0.09, 5.8, 0.07, x, 9.6, -39.12);
  text('THE UNDERGROUND', 0, 9.35, -39.15, 1.45, '#d9f5ff'); text('B 2 B U D D Y', 0, 11.45, -39.15, 0.6, '#4de8ff'); text('DJ BATTLES  ·  VIP  ·  ARCADE  ·  CINEMAS', 0, 7.5, -39.15, 0.3, '#ff9e40');
  for (const x of [-2.75, 2.75]) box(M.cyan, 0.09, 4.5, 0.06, x, 2.25, -39.06); box(M.cyan, 5.6, 0.09, 0.06, 0, 4.5, -39.06);
  box(M.metal, 9, 0.3, 4.6, 0, 4.95, -41.1); box(M.amber, 8.6, 0.04, 0.06, 0, 4.78, -43.38); text('MEMBERS ENTRANCE', 0, 4.95, -43.42, 0.24, '#ffa64d');
  for (const x of [-4.2, 4.2]) rod(M.brass, [x, 0.12, -43.1], [x, 4.8, -43.1], 0.07);
  for (let i = 0; i < 5; i++) { const x = 3.6 + i * 1.6; cyl(M.brass, 0.045, 1, x, 0.62, -42.4); sph(M.brass, 0.12, 0.12, 0.12, x, 1.14, -42.4); if (i < 4) rod(glow(0xb02a3a), [x, 0.98, -42.4], [x + 1.6, 0.98, -42.4], 0.035); }
  point(0, 4, -41.5, 0xff9e4d, 40, 14);
  // ---- lamps, signs, cars ----
  for (const x of [-30, -12, 12, 30]) lamp(x, -44.4, -1, Math.abs(x) < 20); for (const x of [-30, -6, 34]) lamp(x, -57.7, 1, false);
  group(8, 0, -44.3, 0, () => { cyl(M.metal, 0.06, 2.8, 0, 1.4, 0); box(INK, 3.6, 0.8, 0.08, 0, 2.65, 0); box(M.cyan, 3.6, 0.04, 0.1, 0, 3.06, 0); text('←  THE FESTIVAL', 0, 2.65, -0.08, 0.3, '#4de8ff'); });
  car(-22, -54.6, 90, PLUM); car(31, -47.4, -90, TEAL); car(-34, -47.4, -90, TEAL);
  // ---- west end: THE COMPLEX (the warehouse; see complex()) ----
  group(-8, 0, -44.3, 0, () => { cyl(M.metal, 0.06, 2.8, 0, 1.4, 0); box(INK, 3.6, 0.8, 0.08, 0, 2.65, 0); box(glow(0xffd96a), 3.6, 0.04, 0.1, 0, 3.06, 0); text('←  THE MOVIE THEATER', 0, 2.65, -0.08, 0.2, '#ffd96a'); });
  // ---- the street runs on east: the complex's door (x = 66), then THE MUSEUM at the far end ----
  box(M.wall, 66, 14, 0.8, 75, 7, -38.6); box(M.metal, 66, 0.5, 1.2, 75, 14.25, -38.7);
  for (const x of [58, 84, 98]) lamp(x, -44.4, -1, true); for (const x of [50, 74, 96]) lamp(x, -57.7, 1, false);
  car(60, -54.6, 90, PLUM); car(88, -47.4, -90, TEAL);
  group(54, 0, -44.3, 0, () => { cyl(M.metal, 0.06, 2.8, 0, 1.4, 0); box(INK, 3.6, 0.8, 0.08, 0, 2.65, 0); box(glow(0xffd96a), 3.6, 0.04, 0.1, 0, 3.06, 0); text('THE COMPLEX  →', 0, 2.65, -0.08, 0.3, '#ffd96a'); });
  museum();
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) box((r * 3 + c) % 4 === 0 ? glow(0xffcf9a) : INK, 0.05, 1.5, 2.3, 107.97, 7.6 + r * 2.6, -41 - c * 3.6);
  group(107.9, 0, -53, 90, () => {   // the pillared entrance, in the festival gateway's style
    for (const gx of [-5.2, 5.2]) { box(CONCRETE, 1.3, 9.6, 1.3, gx, 4.8, 0); box(M.cyan, 0.08, 9, 0.05, gx, 4.8, -0.68); box(M.metal, 1.5, 0.3, 1.5, gx, 9.75, 0); }
    box(CONCRETE, 11.7, 1.5, 1.5, 0, 9.4, 0); box(M.violet, 11.7, 0.07, 0.05, 0, 8.7, -0.78); text('THE MUSEUM', 0, 9.45, -0.8, 0.95, '#ffd96a'); box(INK, 8, 0.6, 0.3, 0, 10.6, -0.2); text('THE GALLERY OF WORKS  ·  WALK IN', 0, 10.6, -0.38, 0.24, '#ff7eb0');
    box(M.metal, 0.3, 5, 0.5, -3.15, 2.5, 0); box(M.metal, 0.3, 5, 0.5, 3.15, 2.5, 0); box(M.metal, 6.6, 0.4, 0.5, 0, 5.2, 0); box(glow(0xe6c04a), 0.07, 5, 0.07, -3, 2.5, -0.3); box(glow(0xe6c04a), 0.07, 5, 0.07, 3, 2.5, -0.3); box(glow(0xe6c04a), 6, 0.07, 0.07, 0, 5, -0.3);
  });
  text('B2BUDDY RECORDS', 107.9, 5.4, -41.5, 0.5, '#4de8ff', -90); box(glow(0x1b6a90), 0.05, 2.8, 3, 107.96, 1.9, -41.5);
  hotspot(107.5, 2, -41.5, 1.2, 4, 3.2, () => openWindow('B2BUDDY RECORDS // MUSIC', 'https://hungryshmorez.github.io/Media/music/'), 'B2Buddy Records');
  // ---- south sidewalk: THE MOVIE LOBBY is built in campus() ----
  // ---- the festival gateway: pillars, header, receding rings ----
  group(18, 0, -61, 180, () => {
    for (const gx of [-5.2, 5.2]) { box(M.wall, 1.3, 9.6, 1.3, gx, 4.8, 0); box(M.cyan, 0.08, 9, 0.05, gx, 4.8, -0.68); box(M.metal, 1.5, 0.3, 1.5, gx, 9.75, 0); }
    box(M.wall, 11.7, 1.5, 1.5, 0, 9.4, 0); box(M.violet, 11.7, 0.07, 0.05, 0, 8.7, -0.78); text('THE FESTIVAL', 0, 9.45, -0.8, 0.95, '#4de8ff'); box(INK, 8, 0.6, 0.3, 0, 10.6, -0.2); text('OPEN AIR  ·  MAIN STAGE  ·  THE MIDWAY', 0, 10.6, -0.38, 0.24, '#ff7eb0');
    for (let i = 0; i < 7; i++) add(i % 2 ? M.violet : M.cyan, new THREE.TorusGeometry(4.6, 0.09, 8, 48), place(0, 4.5, 1.2 + i * 1.6));
    for (let i = 0; i < 4; i++) { const zz = -5.2 + i * 1.05; rod(M.cyan, [-0.6, 0.14, zz - 0.35], [0, 0.14, zz + 0.2], 0.07); rod(M.cyan, [0.6, 0.14, zz - 0.35], [0, 0.14, zz + 0.2], 0.07); }
  });
  point(18, 6, -58, CY, 45, 20);
  // ---- night sky ----
  const n = 700, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 0.95 + 0.05), r = 200; pos.set([Math.cos(th) * Math.sin(ph) * r, Math.cos(ph) * r, Math.sin(th) * Math.sin(ph) * r], i * 3); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xbfd2ff, size: 1.4, sizeAttenuation: false, fog: false })));
}

// =====================================================================================
//  THE FESTIVAL + THE MIDWAY (from the Unity "outside world"; festival-local metres, origin at world [0, −94])
// =====================================================================================
const FZ = -94;
const O = { cyan: glow(0x00f2ff), magenta: glow(0xff0054), green: glow(0x38ff14), purple: glow(0xba66ff), indigo: glow(0x6b6bff), orange: glow(0xff6b36), gold: glow(0xe6bf4a), red: glow(0xd91233), warm: glow(0xffd44a) };
const PM = { cyan: glow(0x00ccee), magenta: glow(0xe60059), green: glow(0x33d91a), purple: glow(0x994dff), orange: glow(0xf2661f) };
const pulsers = [[PM.cyan, 0x00ccee], [PM.magenta, 0xe60059], [PM.green, 0x33d91a], [PM.purple, 0x994dff], [PM.orange, 0xf2661f]];
const FST = {
  stand: std(0x0c0c16, { roughness: 0.6, metalness: 0.2 }), deck: std(0x0a0a12, { roughness: 0.3, metalness: 0.3 }), fence: std(0x161620, { roughness: 0.5, metalness: 0.6, emissive: 0x00090c }),
  wood: std(0x40260f, { roughness: 0.8 }), marble: std(0xcdc7bd, { roughness: 0.75 }), chrome: std(0xb8c2d6, { roughness: 0.2, metalness: 1 }), denim: std(0x142a5c), tee: std(0xdbdbde), leather: std(0x472610),
  marsh: std(0xede3cc, { roughness: 0.4 }), toast: std(0x73400f), cloud: std(0x3d4252), hay: std(0x8c6e2e, { roughness: 1 }), plastic: std(0x1f3866), cream: std(0xe6d6b3), ink: INK, plum: PLUM, teal: TEAL,
  red: std(0x8c0508, { roughness: 0.3, metalness: 0.6 }), cart: std(0x990a0f), skin: std(0x523830, { roughness: 1 }), dump: std(0x0d2414, { metalness: 0.3 }), canvas: null,
};
const hazeMat = (hex, op = 0.13) => new THREE.MeshBasicMaterial({ color: hex, transparent: true, opacity: op, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, side: THREE.DoubleSide });
const stripeMat = new THREE.ShaderMaterial({ side: THREE.DoubleSide, uniforms: { a: { value: new THREE.Color(0xff0054) }, b: { value: new THREE.Color(0xfff0f5) }, n: { value: 36 }, g: { value: 0.55 } },
  vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }', fragmentShader: 'varying vec2 v; uniform vec3 a,b; uniform float n,g; void main(){ float s=step(.5,fract(v.x*n)); gl_FragColor=vec4(mix(a,b,s)*(.35+g*.55*(1.-v.y*.5)),1.); }' });
const checkerMat = new THREE.ShaderMaterial({ uniforms: { t: uTime }, vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: 'varying vec2 v; uniform float t; void main(){ vec2 c=floor(v*16.); float k=mod(c.x+c.y,2.); vec3 col=mix(vec3(.04,.02,.07),vec3(.2,.1,.3),k); col+=vec3(.6,.1,.5)*smoothstep(.97,1.,max(abs(fract(v.x*16.)-.5),abs(fract(v.y*16.)-.5))*2.)*.4; gl_FragColor=vec4(col,1.); }' });
const turfMat = new THREE.ShaderMaterial({ uniforms: { t: uTime }, vertexShader: 'varying vec3 w; void main(){ w=(modelMatrix*vec4(position,1.)).xyz; gl_Position=projectionMatrix*viewMatrix*modelMatrix*vec4(position,1.); }',
  fragmentShader: 'varying vec3 w; uniform float t; void main(){ vec2 p=w.xz; float gx=smoothstep(.96,1.,max(abs(fract(p.x/2.)-.5),abs(fract(p.y/2.)-.5))*2.); float glowc=exp(-length(vec2(p.x,p.y+120.))*.045); vec3 col=vec3(.02,.05,.04)+vec3(.0,.12,.14)*glowc+vec3(0.,.35,.4)*gx*.35*(.4+glowc); gl_FragColor=vec4(col,1.); }' });
const spinners = [], lasers = [], heads = [], flames = [];
const lineup = new Set(); const LINEUP_N = 13;
function checkIn(id, title, blurb) {
  if (!lineup.has(id)) { lineup.add(id); cue(false); updatePassport(); }
  say(`${title.toUpperCase()} — ${blurb}  (LINEUP ${lineup.size}/${LINEUP_N})`);
  if (id === 'the-decks') laserDrop = 6;
}
let laserDrop = 0;
function facing(x, z, tx, tz, fn) { group(x, 0, z, (Math.atan2(-(tx - x), -(tz - z)) * 180) / Math.PI, fn); }   // local −z faces the target
function figure(x, y, z, yaw, top, legs, skin, s = 1) {
  group(x, y, z, yaw, () => {
    sph(skin, 0.29, 0.34, 0.28, 0, 1.65, 0); box(top, 0.43, 0.67, 0.25, 0, 1.1, 0);
    for (const lx of [-0.13, 0.13]) rod(legs, [lx, 0.05, 0.03], [lx, 0.85, 0], 0.075);
    rod(top, [-0.27, 1.35, 0], [-0.39, 0.81, -0.1], 0.06); rod(top, [0.26, 1.35, 0], [0.37, 1.01, -0.18], 0.06);
  }, s);
}
const F = (x, z) => [-x, z];
const fsolid = (x0, x1, z0, z1) => solid(x0, x1, z0 + FZ, z1 + FZ);
function destination(id, title, blurb, [x, z], lift, acc, hex, fn, tx = 0, tz = -4) {
  facing(x, z, tx, tz, () => {
    add(acc, new THREE.RingGeometry(0.95, 1.35, 40), place(0, lift + 0.03, 0, -90, 0, 0)); cyl(FST.ink, 1, 0.02, 0, lift + 0.015, 0);
    const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.9, 9, 14, 1, true), hazeMat(hex, 0.16)); const bp = wpos(0, lift + 4.5, 0); bm.position.set(bp.x, bp.y, -bp.z); scene.add(bm); pulseMats.push(bm.material);
    text(title.toUpperCase(), 0, lift + 3.4, 0, 0.4, '#' + hex.toString(16).padStart(6, '0'), 180);
    hotspot(0, lift + 1.6, 0, 2.6, 3.4, 2.6, () => checkIn(id, title, blurb), title);
    const wp = wpos(0, 0, 0); doorTriggers.push({ floor: 0, x0: wp.x - 1.4, x1: wp.x + 1.4, z0: wp.z - 1.4, z1: wp.z + 1.4, armed: true, run: () => checkIn(id, title, blurb), label: title });
    if (fn) fn();
  });
}
function paStack(accent, inner) {
  for (let i = 0; i < 2; i++) { box(M.wall, 3, 1.38, 2, 0, 0.7 + i * 1.4, 0); cyl(M.metal, 0.55, 0.04, 0, 0.7 + i * 1.4, -1.01, 90); cyl(accent, 0.2, 0.02, 0, 0.7 + i * 1.4, -1.03, 90); }
  for (let i = 0; i < 6; i++) { const w = 2.7 - 0.06 * i, y = 2.8 + 0.45 + i * 0.9; group(0, y, 0, 0, () => { box(M.wall, w, 0.86, 1.7, 0, 0, 0, -2.3 * i); for (const x of [-0.55, 0.55]) cyl(M.metal, 0.26, 0.03, x, 0, -0.86, 90); }); }
  box(accent, 0.06, 9.6, 0.06, inner * 1.52, 4.9, -0.9);
}
function mainStage() {
  facing(0, -26, 0, 0, () => {
    box(FST.deck, 30, 1.6, 10, 0, 0.8, 0); box(O.cyan, 30, 0.05, 0.06, 0, 1.58, -5.02);
    box(FST.deck, 16, 0.2, 3.45, 0, 0.74, -6.5, -28); for (const x of [-8.02, 8.02]) rod(O.magenta, [x, 0.06, -8], [x, 1.62, -5], 0.05);
    box(M.metal, 22.4, 7.4, 0.3, 0, 6.2, 5.1); quad(ledA, 22, 7, 0, 6.2, 4.9); for (let i = 1; i < 11; i++) box(M.wall, 0.025, 7, 0.03, -11 + i * 2, 6.2, 4.88);
    for (const x of [-12, 12]) truss([x, 0, 4.7], [x, 11, 4.7]); truss([-12.3, 10.6, 4.7], [12.3, 10.6, 4.7]); text('MAIN STAGE', 0, 11.35, 4.5, 0.6, '#d9f2ff', 180);
    for (const x of [-13, 13]) group(x, 1.6, 3, 0, () => paStack(x < 0 ? O.cyan : O.magenta, x < 0 ? 1 : -1));
    // moving heads: housing here, the sweeping beam is a separate animated mesh
    const hc = [0x00f2ff, 0xff0054, 0x38ff14, 0xba66ff];
    for (let i = 0; i < 4; i++) { const x = -9 + i * 6; box(M.metal, 0.5, 0.5, 0.7, x, 10.2, 4.4); const a = wpos(x, 10.2, 4.4), b = wpos(x * 1.6, 0, -16); heads.push({ a: [a.x, a.y, -a.z], b: [b.x, b.y, -b.z], hex: hc[i], ph: i * 1.7 }); }
    // laser fan origin
    const lo = wpos(0, 10.4, 4.4); lasers.push({ o: [lo.x, lo.y, -lo.z], ends: Array.from({ length: 14 }, (_, i) => { const e = wpos((i - 7) * 4, 0.2, -38); return [e.x, e.y, -e.z]; }) });
    group(0, 1.6, -2, 0, () => {   // festival DJ rig
      box(M.metal, 4.2, 1, 1.2, 0, 0.5, 0); box(O.cyan, 4.1, 0.04, 0.03, 0, 0.9, -0.61);
      for (const x of [-1.35, 1.35]) { box(M.wall, 1.3, 0.1, 1, x, 1.06, 0); cyl(M.metal, 0.4, 0.05, x, 1.14, 0); cyl(O.cyan, 0.3, 0.02, x, 1.17, 0); }
      box(M.wall, 0.9, 0.14, 0.9, 0, 1.08, 0); for (let i = 0; i < 4; i++) box(i % 2 ? O.cyan : O.magenta, 0.04, 0.03, 0.5, -0.3 + i * 0.2, 1.16, -0.1);
    });
    const outfits = [O.magenta, O.cyan, O.purple, O.green, O.gold]; for (let i = 0; i < 5; i++) figure(-9 + i * 4.5, 1.6, -3, 0, M.wall, INK, outfits[i]);
    point(-8, 6, -9, 0x00ccff, 60, 26); point(8, 6, -9, 0xff1a80, 60, 26);
  });
  // the deck + ramp are walkable (heights in heightAt); PA stacks, rig solid
  fsolid(-14.6, -11.4, -29.6, -22.4); fsolid(11.4, 14.6, -29.6, -22.4);
}
function stand(x, z, sx, sz, alongX) {
  box(FST.stand, sx, 0.8, sz, x, 0.4, z); const ox = alongX ? 0 : Math.sign(x) * 1.2, oz = alongX ? 1.2 : 0;
  box(FST.stand, sx, 1.6, sz, x + ox, 0.8, z + oz); box(O.cyan, alongX ? sx : 0.05, 0.03, alongX ? 0.05 : sz, x - ox * 0.5, 0.81, z - oz * 0.5);
  fsolid(x - sx / 2 - 0.2 + ox * 0.5, x + sx / 2 + 0.2 + ox * 0.5, z - sz / 2 - 0.2 + oz * 0.5, z + sz / 2 + 0.2 + oz * 0.5);
}
function fenceLine(alongX, fixed, from, to, gapA, gapB) {
  const P = (t, y) => (alongX ? [t, y, fixed] : [fixed, y, t]), gap = gapB > gapA;
  for (let t = from; t <= to + 0.01; t += 2) if (!gap || t < gapA - 0.1 || t > gapB + 0.1) { const [px, py, pz] = P(t, 3); box(FST.fence, 0.12, 6, 0.12, px, py, pz); }
  const spans = gap ? [[from, gapA], [gapB, to]] : [[from, to]];
  for (const [a, b] of spans) for (const y of [1.8, 3.72, 5.88]) { const [px, py, pz] = P((a + b) / 2, y); box(FST.fence, alongX ? b - a : 0.08, 0.08, alongX ? 0.08 : b - a, px, py, pz); }
}
function perimeter() {
  for (const [a, b] of [[-30, -4], [7, 26]]) stand(25, (a + b) / 2, 1.2, b - a, false);
  for (const [a, b] of [[-30, -15], [14, 26]]) stand(-25, (a + b) / 2, 1.2, b - a, false);
  for (const [a, b] of [[-28, 12.8], [23.2, 28]]) stand((a + b) / 2, 25, b - a, 1.2, true);
  fenceLine(false, 32, -39, 33, 0, 0); fenceLine(false, -32, -39, 33, -11.6, -8.4); fenceLine(true, -39, -32, 32, 0, 0); fenceLine(true, 33, -32, 32, 12.8, 23.2);
  const strips = [PM.cyan, PM.magenta, PM.purple, PM.green, PM.orange]; let k = 0;
  for (let z = -36; z <= 30; z += 6) { box(strips[k++ % 5], 0.16, 5.4, 0.16, 31.7, 2.8, z); if (z < -13 || z > -7) box(strips[k++ % 5], 0.16, 5.4, 0.16, -31.7, 2.8, z); }
  for (let x = -30; x <= 30; x += 6) if (x < 12 || x > 24) box(strips[k++ % 5], 0.16, 5.4, 0.16, x, 2.8, 32.7);
  const posts = [[29, -16], [29, 0], [29, 14], [-29, -16], [-29, 0], [-29, 14], [-16, 29.5], [0, 29.5], [9, 29.5]], heads = [O.cyan, O.magenta, O.purple, O.green];
  posts.forEach(([px, pz], i) => { cyl(M.wall, 0.14, 7, px, 3.5, pz); sph(heads[i % 4], 0.56, 0.56, 0.56, px, 7, pz); });
  for (const [a, b] of [[0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8]]) {
    const A = [posts[a][0], 6.9, posts[a][1]], B = [posts[b][0], 6.9, posts[b][1]]; let prev = A;
    for (let i = 1; i <= 10; i++) { const t = i / 10, q = [A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t - Math.sin(t * Math.PI) * 2.4, A[2] + (B[2] - A[2]) * t]; rod(FST.ink, prev, q, 0.012); if (i < 10) sph([O.warm, O.gold, O.orange][i % 3], 0.26, 0.26, 0.26, q[0], q[1] - 0.12, q[2]); prev = q; }
  }
  const sp = [F(-23, 21), F(23, 21), F(-23, -19), F(23, -19)], sa = [O.cyan, O.magenta, O.green, O.purple];
  sp.forEach(([x, z], i) => facing(x, z, 0, -4, () => { for (let j = 0; j < 5; j++) { box(M.wall, 2.2, 0.98, 1.6, 0, 0.5 + j, 0); cyl(M.metal, 0.35, 0.03, 0, 0.5 + j, -0.81, 90); } box(sa[i], 0.05, 4.9, 0.05, -1.12, 2.5, -0.81); }));
}
function marshmallow(x, y, z) {
  group(x, y, z, 0, () => {
    cyl(FST.marsh, 0.46, 1.2, 0, 1.05, 0); cyl(FST.toast, 0.47, 0.16, 0, 1.72, 0); cyl(FST.toast, 0.475, 0.08, 0, 1.55, 0);
    for (const ex of [-0.15, 0.15]) { sph(FST.ink, 0.08, 0.08, 0.08, ex, 1.35, -0.42); rod(FST.marsh, [ex, 0, 0], [ex, 0.46, 0], 0.09); }
    box(FST.ink, 0.2, 0.03, 0.02, 0, 1.17, -0.45); rod(FST.wood, [0.45, 1.05, -0.1], [1.1, 1.6, -0.9], 0.025); rod(FST.marsh, [-0.45, 1.1, 0], [-0.72, 0.75, -0.12], 0.07);
  });
}
function destinations() {
  const sofa_ = (x, y, z) => sofa(x, z, 0, 2.6, M.velvet, y);
  destination('rave-charles', 'Rave Charles', 'Masked raver with an LED visor, down in the pit.', F(0, -16), 0, O.magenta, 0xff3380, () => { figure(0, 0, 0.3, 0, FST.ink, FST.ink, M.wall); box(O.magenta, 0.32, 0.09, 0.06, 0, 1.69, -0.13 + 0.3); for (const x of [-0.42, 0.42]) rod(x < 0 ? O.green : O.magenta, [x, 1.3, 0.1], [x * 1.3, 1.9, 0.05], 0.025); });
  destination('12matt3r', '12MATT3R', 'Glitching RGB-split figure, somewhere in the crowd.', F(0, -6), 0, O.cyan, 0x00f2ff, () => { figure(0, 0, 0.3, 0, M.wall, M.wall, INK); figure(-0.09, 0.02, 0.27, 0, O.cyan, O.cyan, O.cyan, 0.99); figure(0.09, -0.02, 0.33, 0, O.magenta, O.magenta, O.magenta, 0.99); });
  destination('driftwave-static', 'DriftWave Static', 'Chrome vaporwave figure in shades under a striped retro sun.', F(0, 3), 0, O.purple, 0xba66ff, () => {
    figure(0, 0, 0, 0, FST.chrome, FST.chrome, FST.chrome); box(FST.ink, 0.3, 0.07, 0.04, 0, 1.69, -0.14);
    for (let i = 0; i < 7; i++) { const y = -0.9 + i * 0.3, w = 2 * Math.sqrt(Math.max(0, 1.21 - y * y)); box(i < 3 ? O.magenta : i < 5 ? O.orange : O.gold, w, 0.2 - (i < 3 ? 0.06 * (3 - i) : 0), 0.04, 0, 1.7 + y, 0.5); }
  });
  destination('sofa-king-sad-boi', 'Sofa King Sad Boi', 'Hooded figure on a couch under a personal rain cloud.', [-56, -10], 1, O.indigo, 0x6b6bff, () => {
    box(FST.stand, 3.4, 1, 2.6, 0, 0.5, 0.4); box(O.indigo, 3.4, 0.04, 0.05, 0, 0.98, -0.91); sofa_(0, 1, 0.9);
    group(0.2, 1, 0.75, 0, () => { box(O.indigo, 0.45, 0.62, 0.3, 0, 0.95, 0); sph(O.indigo, 0.36, 0.4, 0.36, 0, 1.42, 0.02); sph(FST.ink, 0.24, 0.28, 0.22, 0, 1.4, -0.06); });
    for (let i = 0; i < 4; i++) sph(FST.cloud, 0.8, 0.55, 0.7, -0.6 + i * 0.4, 4.1 + (i % 2) * 0.18, 0.7); for (let i = 0; i < 12; i++) box(O.indigo, 0.02, 0.38, 0.02, -0.7 + (i % 6) * 0.28, 2.6 + (i % 3) * 0.35, 0.5 + Math.floor(i / 6) * 0.4);
  });
  destination('tanky-johnson', 'Tanky Johnson', 'Cowboy in a brown hat, white tee and blue jeans.', F(11, 7), 0, O.gold, 0xe6bf4a, () => { figure(0, 0, 0.3, 0, FST.tee, FST.denim, FST.skin, 1.05); cyl(FST.leather, 0.33, 0.03, 0, 1.84 * 1.05, 0.3); cyl(FST.leather, 0.17, 0.2, 0, 1.95 * 1.05, 0.3); });
  destination('shmorez', 'SHMOREZ', 'A toasted marshmallow man by the campfire.', F(14, 17), 0, O.orange, 0xff6b36, () => marshmallow(0, 0, 0.4));
  destination('the-decks', 'The Decks', 'Festival DJ rig. You just dropped the bass: lasers on!', F(0, -21.6), 1.6, O.cyan, 0x00f2ff);
  destination('the-lab', 'The Lab', 'Side stage with big screens over a deck.', F(0, 19.6), 0, O.green, 0x38ff14, () => {
    box(FST.deck, 8, 0.8, 2.4, 0, 0.4, 2.1); box(O.green, 8, 0.04, 0.05, 0, 0.78, 0.89); box(M.metal, 4.4, 2.6, 0.12, 0, 3.6, 3.2); quad(ledB, 4.2, 2.4, 0, 3.6, 3.1);
    for (const x of [-3.3, 3.3]) { box(M.metal, 2.4, 1.8, 0.1, x, 3.2, 3.0); quad(ledA, 2.2, 1.6, x, 3.2, 2.9); } for (const x of [-2.3, 2.3]) cyl(M.metal, 0.07, 3.6, x, 1.8, 3.35); box(M.metal, 1.8, 0.9, 0.7, 0, 1.25, 1.6); box(O.green, 1.4, 0.04, 0.5, 0, 1.72, 1.6);
  });
  destination('lab-tools', 'Lab Tools', 'Lab-market kiosk. Its tool shelf is stocked for a future update.', F(-25, -1), 0, O.green, 0x38ff14, () => { box(M.metal, 2.4, 1.2, 1.2, 0, 0.6, 1.6); box(M.metal, 1.9, 1.2, 0.1, 0, 1.8, 1.9); quad(ledB, 1.8, 1.1, 0, 1.8, 1.9); box(M.wall, 2.8, 0.12, 1.6, 0, 2.75, 1.6); box(O.green, 2.7, 0.04, 0.04, 0, 2.68, 0.82); for (const x of [-1.3, 1.3]) cyl(M.metal, 0.05, 2.7, x, 1.4, 2.2); });
  destination('merch-tent', 'Merch Tent', 'Vendor stall with festival tees and glow gear.', F(-25, 4), 0, O.green, 0x38ff14, () => {
    box(M.wall, 2.6, 1, 0.9, 0, 0.5, 1.7); box(M.metal, 2.85, 0.08, 1.1, 0, 1.03, 1.7); box(O.green, 3, 0.08, 1.8, 0, 2.45, 1.6, -12); box(O.green, 3, 0.3, 0.04, 0, 2.25, 0.9);
    for (const x of [-1.4, 1.4]) cyl(M.metal, 0.05, 2.4, x, 1.2, 1.2); [O.magenta, O.cyan, O.gold, O.purple].forEach((m, i) => box(m, 0.5, 0.55, 0.03, -1 + i * 0.66, 1.75, 2.05)); text('MERCH', 0, 2.65, 0.88, 0.3, '#66ff4d');
  });
  destination('porta-johns', 'Porta John’s', 'A row of porta-potties. One glows green; its CRT is dark tonight.', F(24, 10), 0, O.green, 0x38ff14, () => { for (let i = 0; i < 4; i++) { const x = -2.1 + i * 1.4; box(FST.plastic, 1.25, 2.4, 1.25, x, 1.2, 1.8); box(i === 2 ? O.green : FST.cream, 1.32, 0.14, 1.32, x, 2.47, 1.8); box(i === 2 ? O.green : FST.plastic, 0.9, 2, 0.03, x, 1.1, 1.16); box(FST.ink, 0.6, 0.12, 0.02, x, 2.05, 1.15); } });
  destination('the-complex', 'The Complex', 'Marble pavilion of THE COMPLEX. The warehouse itself opens off the street’s west end.', F(24, -2), 0, O.gold, 0xe6bf4a, () => {
    box(FST.marble, 6.4, 0.4, 4.6, 0, 0.2, 2.8); box(FST.marble, 5.6, 0.2, 0.5, 0, 0.1, 0.35);
    for (const x of [-2.6, -0.9, 0.9, 2.6]) for (const z of [0.9, 4.7]) cyl(FST.marble, 0.26, 4, x, 2.4, z);
    box(FST.marble, 6.4, 0.5, 4.6, 0, 4.65, 2.8); for (const sg of [-1, 1]) box(FST.marble, 3.6, 0.25, 4.8, sg * 1.62, 5.45, 2.8, 0, 0, sg * -22);
    box(O.gold, 6.2, 0.08, 0.03, 0, 4.65, 0.49); text('THE COMPLEX', 0, 4.66, 0.47, 0.36, '#ffd966'); box(FST.ink, 2, 3, 0.2, 0, 1.9, 4.7); text('ENTER FROM THE STREET', 0, 2.4, 4.58, 0.2, '#ffd966'); point(0, 3.6, 2.8, 0xffcc73, 20, 7);
  });
  destination('arcade', 'Arcade', 'Circus tent built into the fence. Walk through to THE MIDWAY.', F(21.2, -10), 0, O.magenta, 0xff3380, null, ...F(0, -10));
}
function arcadeTent() {   // circus tent built into the west fence, opening onto the tunnel to the Midway
  const [x, z] = F(27, -10);
  facing(x, z, 0, -10, () => {
    add(stripeMat, new THREE.CylinderGeometry(4, 4, 3.4, 24, 1, true, Math.PI * 0.5, Math.PI * 1.5), place(0, 1.7, 0)); add(stripeMat, new THREE.ConeGeometry(4.4, 3.8, 24, 1, true), place(0, 3.4 + 1.9, 0));
    rod(M.metal, [0, 7, 0], [0, 8.3, 0], 0.04); sph(O.gold, 0.22, 0.22, 0.22, 0, 8.35, 0);
    text('ARCADE', 0, 4.15, -4.1, 0.6, '#ff4d8c', 180); text('THE MIDWAY   ·   STEP RIGHT UP', 0, 3.6, -4.15, 0.18, '#ffd966', 180); box(FST.ink, 3.6, 0.5, 0.1, 0, 3.15, 2.9); text('THE MIDWAY  →', 0, 3.15, 2.84, 0.2, '#ff4d99'); point(0, 2.8, 0, 0xff4099, 25, 8);
  });
  for (const zz of [-11.85, -8.15]) { box(M.wall, 4.4, 3.2, 0.5, -32.6, 1.6, zz); box(O.magenta, 4.4, 0.05, 0.04, -32.6, 0.15, zz + (zz < -10 ? 0.27 : -0.27)); }
  box(M.wall, 4.4, 0.2, 4.2, -32.6, 3.3, -10);
  for (let i = 0; i < 3; i++) { const xx = -31.2 - i * 1.2; rod(O.magenta, [xx + 0.35, 0.03, -10.5], [xx - 0.2, 0.03, -10], 0.06); rod(O.magenta, [xx + 0.35, 0.03, -9.5], [xx - 0.2, 0.03, -10], 0.06); }
  rect(-34.9, -30.3, -11.7 + FZ, -8.3 + FZ);   // the tunnel
}
function festProps() {
  facing(...F(-10, 20), 0, -4, () => { for (let i = 0; i < 4; i++) box(FST.wood, 1.8, 0.05, 0.11, 0, 0.48, -0.2 + i * 0.14); for (let i = 0; i < 2; i++) box(FST.wood, 1.8, 0.11, 0.05, 0, 0.72 + i * 0.18, 0.33); for (const x of [-0.8, 0.8]) box(M.wall, 0.06, 0.48, 0.6, x, 0.24, 0); });
  facing(...F(-14, 20), 0, -4, () => { for (const x of [-1.2, 1.2]) cyl(FST.wood, 0.06, 2.4, x, 1.2, 0); box(FST.wood, 2.6, 1.3, 0.08, 0, 1.7, 0); text('MESSAGE BOARD', 0, 2.55, -0.05, 0.17, '#ffffff'); [O.gold, O.cyan, O.magenta, M.white].forEach((m, i) => { }); for (let i = 0; i < 9; i++) box([O.gold, O.cyan, O.magenta, M.white][i % 4], 0.28, 0.3, 0.01, -1 + (i % 5) * 0.5, 1.45 + Math.floor(i / 5) * 0.45, -0.05); });
  facing(...F(-6, 21), 0, -4, () => { box(M.wall, 1.6, 2.4, 1.6, 0, 1.2, 0.4); box(O.magenta, 0.8, 1.9, 0.03, 0.3, 1.05, -0.41); text('TRIPPY CAM', 0, 2.6, -0.42, 0.18, '#4de6ff'); box(M.white, 0.3, 0.08, 0.02, -0.5, 1.9, -0.42); hotspot(0, 1.2, -0.4, 1.8, 2.4, 1.2, () => openWindow('PHOTO BOOTH // TRIPPY CAM', 'https://g5kgb2qtzw2s.space.minimax.io/'), 'Photo booth'); });
  facing(...F(5, 18), 0, -4, () => { box(M.metal, 2.2, 1, 0.9, 0, 0.5, 0); box(ledB, 2, 0.04, 0.7, 0, 1.02, 0); for (const x of [-0.6, 0.6]) { box(M.metal, 1.1, 0.7, 0.08, x, 1.55, 0.25); quad(ledA, 1, 0.6, x, 1.55, 0.25); } text('VJ', 0, 2.15, 0.2, 0.2, '#4de6ff'); });
  const [fx, fz] = F(11.2, 15.2);   // campfire
  group(fx, 0, fz, 0, () => { for (let i = 0; i < 9; i++) { const a = (i * Math.PI * 2) / 9; sph(M.stone, 0.32, 0.2, 0.28, Math.cos(a) * 0.75, 0.1, Math.sin(a) * 0.75); } for (let i = 0; i < 3; i++) cyl(FST.wood, 0.09, 1.1, 0, 0.15, 0, 80, i * 60, 0); point(0, 1.2, 0, 0xff7326, 40, 11); });
  const fl = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.95, 10), new THREE.MeshBasicMaterial({ color: 0xff6b36, toneMapped: false })), fp = (() => { push(fx, 0, fz, 0); const w = wpos(0, 0.62, 0); pop(); return w; })(); fl.position.set(fp.x, fp.y, -fp.z); scene.add(fl); flames.push(fl);
  facing(...F(16, 21), 0, -4, () => { for (const sg of [-1, 1]) box(sg < 0 ? O.orange : stripeMat, 0.08, 1.75, 2.4, sg * 0.62, 0.72, 0.3, 0, 0, sg * 35); box(M.wall, 2, 0.05, 2.4, 0, 0.03, 0.3); });
  group(...F(19, 15).flatMap((v, i) => (i === 0 ? [v, 0] : [v])).slice(0, 3), 180 + (Math.atan2(-(0 - -19), -(-4 - 15)) * 180) / Math.PI, () => { box(FST.teal, 2, 1.1, 1.8, 0, 1.25, -1.2); box(FST.teal, 2, 0.6, 1.2, 0, 0.95, -2.6); box(M.wall, 2, 0.2, 2.8, 0, 0.75, 1.1); for (const x of [-0.98, 0.98]) box(FST.teal, 0.08, 0.6, 2.8, x, 1.1, 1.1); box(FST.teal, 2, 0.08, 0.6, 0, 0.7, 2.75); for (const x of [-1, 1]) for (const z of [-2.5, 1.6]) cyl(FST.ink, 0.4, 0.3, x, 0.4, z, 0, 0, 90); box(M.white, 0.7, 0.45, 0.5, 0.4, 1.05, 1.6); box(M.glass, 1.8, 0.5, 0.03, 0, 1.45, -2.11); });
  facing(...F(15, 11), 0, -4, () => { box(FST.wood, 0.75, 0.05, 2.4, 0, 0.76, 0); for (const zz of [-1, 1]) box(M.wall, 0.6, 0.74, 0.06, 0, 0.37, zz); for (const sg of [-1, 1]) for (let r = 0; r < 3; r++) for (let c = 0; c <= r; c++) cyl(O.red, 0.05, 0.13, (c - r * 0.5) * 0.13, 0.85, sg * (1.05 - r * 0.12)); });
  const [tx, tz] = F(-18, 7);   // showpiece turntable with a spinning sports car
  group(tx, 0, tz, 0, () => { cyl(M.wall, 3.6, 0.35, 0, 0.175, 0); add(O.magenta, new THREE.TorusGeometry(3.5, 0.05, 6, 64), place(0, 0.36, 0, 90, 0, 0)); text('SHOWPIECE', 0, 4.4, 0, 0.3, '#ff4d99', 180); });
  const car_ = dyn(tx, 0.35, tz, 0, () => { box(FST.red, 1.9, 0.42, 4.4, 0, 0.45, 0); box(M.glass, 1.5, 0.36, 1.7, 0, 0.82, 0.3); box(FST.red, 1.86, 0.2, 1.2, 0, 0.55, -1.7, 8); box(FST.ink, 1.8, 0.05, 0.35, 0, 0.95, 2); for (const x of [-0.95, 0.95]) for (const z of [-1.35, 1.35]) cyl(FST.ink, 0.32, 0.25, x, 0.32, z, 0, 0, 90); }); spinners.push({ g: car_, v: 0.6 });
  facing(...F(-13, -13), 0, -4, () => { box(M.wall, 2.2, 1.1, 0.8, 0, 0.55, 0.5); cyl(M.metal, 0.05, 2.6, 0, 1.9, 0.8); text('PROPS', 0, 1.3, 0.08, 0.2, '#ffd966'); });
  facing(...F(-22, -20), 0, -4, () => { box(FST.dump, 2.6, 1.5, 1.5, 0, 0.75, 0); box(FST.ink, 2.65, 0.08, 1.4, 0, 1.55, 0.1); cyl(M.metal, 0.08, 4, -3, 2, 1); box(O.warm, 0.4, 0.12, 0.5, -3, 4, 0.8); });
  box(FST.fence, 16.4, 4.4, 0.5, 23.2, 2.2, -20); for (let i = 0; i < 9; i++) box(M.metal, 0.12, 5, 0.6, 15.4 + i * 2, 2.5, -20.1);
  box(INK, 14, 2.2, 0.3, 23.2, 5.9, -20.4); text('BACKSTAGE', 23.2, 6.4, -20.65, 1.1, '#ff6666', 180); text('STAFF ONLY  ·  NO ENTRY', 23.2, 5.2, -20.65, 0.4, '#ffffff', 180); box(O.red, 14, 0.12, 0.2, 23.2, 4.8, -20.55);
  fsolid(15, 31.6, -20.7, -19.4);
  fsolid(-1.6 + -25 - 0, 1.6 - 25, 0, 0);
}
// 260 instanced festival-goers, thinning toward the back; clearings keep the props free
const festCrowd = (() => {
  const clear = [F(0, -16), F(0, -6), F(0, 3), F(11, -6), F(11, 7), F(14, 17), F(0, 19.6), F(-25, -1), F(-25, 4), F(24, 10), F(24, -2), F(21.2, -10), F(-10, 20), F(-14, 20), F(-6, 21), F(5, 18), F(11.2, 15.2), F(16, 21), F(19, 15), F(15, 11), F(-18, 7), F(-13, -13), F(-22, -20), F(-15, -20), F(-18, 18), F(-23, 21), F(23, 21), F(-23, -19), F(23, -19)]
    .map((c, i) => [c[0], c[1], [2.4, 2.4, 2.6, 3.6, 2.6, 2.6, 5, 3.6, 3.6, 4, 6.5, 6.5, 2.8, 3, 3, 3, 4.5, 3, 6.5, 3, 4.8, 2.4, 4, 4, 4.5, 2.5, 2.5, 2.5, 2.5][i]]);
  let a = 128; const rnd = () => (a = (a * 16807) % 2147483647) / 2147483647, list = []; let guard = 0;
  while (list.length < 260 && guard++ < 20000) {
    const x = rnd() * 44 - 22, z = rnd() * 34 - 19; if (rnd() > 1 - 0.82 * ((z + 19) / 34)) continue; if (z < -16.5 && Math.abs(x) < 9.5) continue;
    if (clear.some(([cx, cz, r]) => (x - cx) ** 2 + (z - cz) ** 2 < r * r) || list.some(([qx, qz]) => (x - qx) ** 2 + (z - qz) ** 2 < 0.3)) continue;
    list.push([x, z, rnd() * 6, (rnd() * 3) | 0]);
  }
  const n = list.length, body = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.22, 0.9, 3, 6), std(0x10132a, { roughness: 1 }), n), head = new THREE.InstancedMesh(new THREE.SphereGeometry(0.17, 8, 6), FST.skin, n), stick = new THREE.InstancedMesh(new THREE.BoxGeometry(0.035, 0.42, 0.035), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), n);
  const cols = [new THREE.Color(0x38ff14), new THREE.Color(0xff0054), new THREE.Color(0x00f2ff)]; list.forEach((c, i) => { body.setColorAt(i, new THREE.Color().setHSL(0.65 + (i % 7) * 0.04, 0.4, 0.12)); stick.setColorAt(i, cols[c[3]]); });
  const g = new THREE.Group(); g.position.z = 0; g.add(body, head, stick); scene.add(g); const o = new THREE.Object3D();
  return (t, p) => { list.forEach(([x, z, ph], i) => { const b = Math.abs(Math.sin(t * 4.2 + ph)) * 0.2 * p; const wx = x, wz = -(z + FZ); o.position.set(wx, 0.85 + b, wz); o.updateMatrix(); body.setMatrixAt(i, o.matrix); o.position.set(wx, 1.62 + b, wz); o.updateMatrix(); head.setMatrixAt(i, o.matrix); o.position.set(wx + 0.3, 1.75 + b, wz - 0.1); o.rotation.z = Math.sin(t * 3 + ph) * 0.4; o.updateMatrix(); stick.setMatrixAt(i, o.matrix); o.rotation.z = 0; }); body.instanceMatrix.needsUpdate = head.instanceMatrix.needsUpdate = stick.instanceMatrix.needsUpdate = true; };
})();
function festival() {
  group(0, 0, FZ, 0, () => {
    flat(turfMat, 66, 74, 0, 0.012, -3);   // glowing turf with a grid
    mainStage(); perimeter(); destinations(); arcadeTent(); festProps();
  });
  rect(-31.4, 31.4, -38.4 + FZ, 32.4 + FZ); rect(13, 23, -62.2, -60.4);   // the grounds + the gateway
}
// ---- THE MIDWAY: a striped big top reached through the arcade tent's tunnel ----
const MID = { x: -56, z: -134 };
const MIDWAY_CABS = [
  ['FLASH GAMES', 0xff0055, [-10.5, -14.5], 'games/flashstorage-archive/index.html'], ['WAKE UP', 0xb967ff, [-3.5, -15], 'https://wakeupwork.on.websim.com'], ['GAMES', 0x00f3ff, [3.5, -15], null], ['STORIES', 0x39ff14, [10.5, -14.5], 'https://leonida-360-vice-city-crime-simulator--sofakingsadboi.on.websim.com'],
  ['DODGE HELL', 0xff0055, [-15, -5], 'bullethell.html'], ['MINECRAFT', 0x39ff14, [-15, 3], 'games/minecraft/index.html'], ['FLASHSTORAGE', 0xff8a1e, [-15, 11], 'games/flashstorage-archive/index.html'], ['MINI GAMES', 0xffd24a, [15, -5], 'games/browsergames/hub.html'],
  ['KNOCK KNOCK', 0x00f3ff, [15, 3], 'games/knock-knock/index.html'], ['WINDOWS93', 0x39ff14, [15, 11], 'games/windows97/index.html'], ['WINDOWS 97', 0x00c2ff, [15, -13], 'games/windows97/index.html'],
];
function midway() {
  group(MID.x, 0, MID.z, 90, () => {
    flat(checkerMat, 44, 44, 0, 0.012, 0);
    add(stripeMat, new THREE.CylinderGeometry(22, 22, 8, 72, 1, true, THREE.MathUtils.degToRad(4), Math.PI * 2 - THREE.MathUtils.degToRad(8)), place(0, 4, 0)); add(stripeMat, new THREE.ConeGeometry(23, 9, 48, 1, true), place(0, 8 + 4.5, 0));
    sph(O.gold, 1.2, 1.2, 1.2, 0, 17.3, 0); cyl(std(0x290f1f), 0.22, 17, 0, 8.5, 0);
    text('THE MIDWAY', 0, 9.6, 23.4, 1.1, '#ff4d8c', 180); text('THE MIDWAY', 0, 6.5, -20.8, 1.1, '#ff4d8c', 180); text('STEP RIGHT UP', 0, 5.4, -20.8, 0.42, '#ffd966', 180); text('BACK TO THE FESTIVAL', 0, 3.9, 21.6, 0.26, '#4de6ff');
    const bulbs = [PM.magenta, PM.cyan, PM.green, PM.orange, PM.purple]; for (let i = 0; i < 20; i++) { const a = (i * Math.PI * 2) / 20; sph(bulbs[i % 5], 0.28, 0.28, 0.28, Math.sin(a) * 20, 7.6, Math.cos(a) * 20); }
    for (let i = 0; i < 4; i++) { const a = ((45 + i * 90) * Math.PI) / 180; cyl(std(0x290f1f), 0.17, 8, Math.sin(a) * 20, 4, Math.cos(a) * 20); }
    MIDWAY_CABS.forEach(([label, hex, [sx, sz], url]) => {
      const [x, z] = F(sx, sz); facing(x, z, 0, 2, () => {
        const neon = glow(hex), scr = ledMat(hex, 0x40087a);
        box(std(0x291c3b, { roughness: 0.5, metalness: 0.3 }), 1.8, 3.2, 1.3, 0, 1.6, 0); box(FST.ink, 1.9, 0.4, 1.5, 0, 3.3, -0.1); box(neon, 1.9, 0.4, 0.02, 0, 3.3, -0.86);
        for (const sx2 of [-0.92, 0.92]) box(neon, 0.06, 3, 1.34, sx2, 1.6, 0); box(neon, 1.9, 0.3, 1.4, 0, 0.15, 0); box(M.metal, 1.5, 1.2, 0.08, 0, 2.15, -0.66); quad(scr, 1.4, 1.1, 0, 2.15, -0.68); box(neon, 1.5, 0.5, 0.1, 0, 1.2, -0.72);
        text(label, 0, 3.3, -0.89, 0.2, '#ffffff'); text(url === null ? 'NEON PULSE  /  CLICK' : 'PLAY  /  CLICK', 0, 0.72, -0.67, 0.1, '#66ffe6');
        hotspot(0, 1.7, -0.4, 2, 3.4, 1.8, url === null ? () => openPulse() : () => openWindow(`MIDWAY // ${label}`, url), label);
      });
    });
    point(0, 6.5, 0, 0xff4099, 55, 28);
    const [px, pz] = F(-11, 4); facing(px, pz, ...F(0, 2), () => { box(FST.cream, 3.2, 1.1, 1.1, 0, 0.55, 0); for (let i = 0; i < 8; i++) box(i % 2 ? M.white : O.magenta, 0.2, 1.1, 0.02, -1.4 + i * 0.4, 0.55, -0.56); box(FST.wood, 3.2, 0.1, 0.6, 0, 2, 0.35); [O.magenta, O.cyan, O.green, O.gold, O.purple, O.orange].forEach((m, i) => sph(m, 0.48, 0.62, 0.48, -1.25 + i * 0.5, 2.35, 0.35)); box(O.gold, 3.4, 0.6, 0.08, 0, 2.9, 0.5); text('PRIZES', 0, 2.9, 0.44, 0.32, '#330d1a'); });
    const [cx2, cz2] = F(11, 6); facing(cx2, cz2, ...F(0, 2), () => { box(FST.cart, 1.8, 1.2, 1.1, 0, 0.9, 0); box(M.glass, 1.5, 0.9, 0.9, 0, 1.95, 0); for (let i = 0; i < 16; i++) sph(M.white, 0.14, 0.14, 0.14, -0.55 + (i % 4) * 0.37, 1.6 + Math.floor(i / 8) * 0.12, -0.25 + (Math.floor(i / 4) % 2) * 0.5); box(O.magenta, 1.4, 0.4, 0.06, 0, 2.6, 0); text('POPCORN', 0, 2.6, -0.04, 0.2, '#ffffff'); });
    for (const hb of [F(-6, 9), F(5, 10)]) cyl(FST.hay, 0.6, 1.2, hb[0], 0.6, hb[1], 0, 0, 90);
  });
  circles.push({ cx: MID.x, cz: MID.z, r: 20.5 });
  box(CONCRETE, 3.4, 0.1, 33, -34.9, 0.05, -119.5); box(O.magenta, 0.08, 0.04, 33, -36.6, 0.11, -119.5); box(O.magenta, 0.08, 0.04, 33, -33.2, 0.11, -119.5);
  rect(-36.6, -33.2, MID.z - 1.7, -102.3);   // the walkway from the tent's tunnel down to the midway
  text('THE MIDWAY  ↓', -34.9, 3, -108, 0.3, '#ff4d8c', 90);
}
const circles = [];

// =====================================================================================
//  THE COMPLEX — the rusty neon warehouse at the street's west end (spec metres; spec [x, z] → world [−62.2 + z, −48 + x])
// =====================================================================================
const CXM = { rust: std(0x331f14, { roughness: 0.6, metalness: 0.45 }), rib: std(0x1c0f0a, { roughness: 0.55, metalness: 0.5 }), concrete: std(0x13141a, { roughness: 0.7, metalness: 0.1 }), slab: std(0x07070a, { roughness: 0.5, metalness: 0.2 }),
  crate: std(0x38240f, { roughness: 0.9 }), panel: std(0x47050a, { roughness: 0.5, metalness: 0.3 }), cab: std(0x1a1429, { roughness: 0.5, metalness: 0.3 }), mint: glow(0x00ffaa), blue: glow(0x3373ff), heart: glow(0x8c80ff) };
const cxChecker = new THREE.ShaderMaterial({ vertexShader: 'varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: 'varying vec2 v; void main(){ vec2 c=floor(v*vec2(25.,24.)/2.5); float k=mod(c.x+c.y,2.); vec3 col=mix(vec3(.025,.025,.04),vec3(.33,.34,.39)*.55,k); col+=vec3(.3,.32,.6)*.15*smoothstep(.95,1.,max(abs(fract(v.x*10.)-.5),abs(fract(v.y*9.6)-.5))*2.); gl_FragColor=vec4(col,1.); }' });
const plasmaMat = ledMat(0xff0099, 0x4d4dff), crtMat = ledMat(0x3380ff, 0xccdfff), holoMat = ledMat(0x00ffb3, 0xff33e6), cabMats = [ledMat(0xff2bd1, 0x4d0d80), ledMat(0x00f2ff, 0x4d0d80), ledMat(0xffdb33, 0x4d0d80)];
const CX = { x: 66, z: -82.3 };   // spec (x, z) → world (CX.x − x, CX.z + z); the entrance (spec z = 20) is the south sidewalk wall at z = −62.3
const S = (x, z, y = 0) => [-x, y, z];
const cxWorld = (x, z, y = 0) => new THREE.Vector3(CX.x - x, y, -(CX.z + z));   // spec → three-space
const cxRect = (x0, x1, z0, z1, gate = null) => { const a = CX.x - x0, b = CX.x - x1, c = CX.z + z0, d = CX.z + z1; rects.push({ x0: Math.min(a, b), x1: Math.max(a, b), z0: Math.min(c, d), z1: Math.max(c, d), u: false, gate }); };
function cxWall(x0, z0, x1, z1, h, mat, thick = 0.6, y0 = 0) {
  const a = S(x0, z0), b = S(x1, z1), dx = b[0] - a[0], dz = b[2] - a[2], len = Math.hypot(dx, dz);
  box(mat, thick, h, len + thick, (a[0] + b[0]) / 2, y0 + h / 2, (a[2] + b[2]) / 2, 0, (Math.atan2(dx, dz) * 180) / Math.PI, 0);
}
const faceYaw = (dx, dz) => (Math.atan2(-dx, -dz) * 180) / Math.PI;
const cxSpin = [], cxSearch = [], cxFlicker = [];
let cxHeart = null, cxHeartRing = null, cxGlitch = null, cxPanel = null, cxRings = [], cxChargeMats = [];
function cxText(str, x, z, y, size, col, dirx, dirz) { text(str, ...S(x, z, y), size, col, dirx === undefined ? 180 : faceYaw(dirx, dirz)); }
function wireIco(rad, mat) {
  const f = (1 + Math.sqrt(5)) / 2, v = [];
  for (const a of [-1, 1]) for (const b of [-f, f]) { v.push([0, a, b], [a, b, 0], [b, 0, a]); }
  const sc = rad / Math.hypot(0, 1, f);
  for (let i = 0; i < v.length; i++) for (let j = i + 1; j < v.length; j++) { const d = Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]); if (Math.abs(d - 2) < 0.01) rod(mat, v[i].map((c) => c * sc), v[j].map((c) => c * sc), 0.035); }
}
function complexShell() {
  box(CXM.slab, 63.2, 0.32, 51.6, ...S(0, -5.8, -0.14));
  box(CXM.rust, 28.2, 13, 0.8, ...S(-17.5, 20, 6.5)); box(CXM.rust, 28.2, 13, 0.8, ...S(17.5, 20, 6.5)); box(CXM.rust, 6.8, 6.8, 0.8, ...S(0, 20, 9.6)); box(CXM.rib, 63.6, 0.9, 1.2, ...S(0, 20, 13.45));
  for (const x of [-31.3, 31.3]) box(CXM.rust, 0.6, 12.6, 51.6, ...S(x, -5.8, 6.3)); box(CXM.rust, 63.2, 12.6, 0.6, ...S(0, -31.3, 6.3)); box(CXM.slab, 63.2, 0.6, 51.6, ...S(0, -5.8, 12.9));
  for (let x = -13; x <= 9.4; x += 0.8) { if (Math.abs(x) < 3.9) continue; box(CXM.rib, 0.14, 12.6, 0.1, ...S(x, 20.45, 6.4)); }
  for (const x of [-3.55, 3.55]) box(O.cyan, 0.08, 6.3, 0.06, ...S(x, 20.46, 3.15)); box(O.cyan, 7.2, 0.08, 0.06, ...S(0, 20.46, 6.3));
  box(INK, 13, 2.6, 0.1, ...S(0, 20.5, 8.7)); text('12MATT3R', ...S(0, 20.58, 8.7), 1.9, '#00f2ff', 180);
  text('THE COMPLEX', ...S(0, 20.58, 11.55), 0.95, '#ffd966', 180); text('WAREHOUSE OF ROOMS   ·   NOW OPEN', ...S(0, 20.58, 10.55), 0.28, '#ffd966', 180);
  point(...S(0, 23.5, 8.5), 0x00e5ff, 40, 14);
  box(INK, 0.1, 3.2, 17, ...S(-31.65, 12, 9.5)); text('THE COMPLEX', ...S(-31.72, 12, 9.9), 2.2, '#ffd966', faceYaw(1, 0)); text('12MATT3R   ·   WAREHOUSE OF ROOMS', ...S(-31.72, 12, 8.45), 0.42, '#00f2ff', faceYaw(1, 0));
}
function entranceHall() {
  for (const x of [-5.4, 5.4]) { cxWall(x, 3, x, 11.5, 8, CXM.concrete, 0.4); cxWall(x, 14.5, x, 19.6, 8, CXM.concrete, 0.4); cxWall(x, 11.5, x, 14.5, 3.5, CXM.concrete, 0.4, 4.5); }
  box(CXM.slab, 11.6, 0.4, 16.6, ...S(0, 11.3, 8.2)); box(INK, 3.6, 0.01, 16.6, ...S(0, 11.3, 0.025)); for (const x of [-1.85, 1.85]) box(O.cyan, 0.05, 0.01, 16.6, ...S(x, 11.3, 0.03));
  for (const sx of [-1, 1]) for (const z of [9, 17]) { const a = S(sx * 4.95, z, 4.2), b = S(0, z, 4.2); group(a[0], a[1], a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(M.metal, 3.5, 2.2, 0.1, 0, 0, 0.05); quad(plasmaMat, 3.4, 2.1, 0, 0, 0); }); }
  for (const z of [8.5, 11.4, 14.3, 17.2]) { box(M.white, 0.5, 0.1, 0.5, ...S(0, z, 7.95)); const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.3, 7.6, 10, 1, true), hazeMat(0x99adff, 0.1)); const bp = cxWorld(0, z, 7.95 - 3.8); bm.position.copy(bp); scene.add(bm); }
  point(...S(0, 10, 6.6), 0xbfccff, 30, 12); point(...S(0, 16.5, 6.6), 0xbfccff, 30, 12);
  for (let i = 0; i < 6; i++) { const [ax, ay, az] = S(0, 7.5 + i * 2.3, 0.045); rod(O.cyan, [ax - 0.6, ay, az + 0.35], [ax, ay, az - 0.35], 0.08); rod(O.cyan, [ax + 0.6, ay, az + 0.35], [ax, ay, az - 0.35], 0.08); }
  text('EXIT TO THE STREET', ...S(0, 19.3, 7), 0.32, '#99b3ff', 0); text('THE CENTRAL HUB', ...S(0, 3.34, 6.2), 0.34, '#00f2ff', 180);
}
function hubShell() {
  flat(cxChecker, 30, 24, 0, 0.03, -9);
  cxWall(-15, 3, -4, 3, 7, CXM.concrete); cxWall(4, 3, 31, 3, 7, CXM.concrete); cxWall(-31, 7, -15, 7, 7, CXM.concrete); cxWall(-15, 7, -15, 3, 7, CXM.concrete);
  for (const x of [-15, 15]) { cxWall(x, -3, x, -14, 7, CXM.concrete); cxWall(x, -18, x, -21, 7, CXM.concrete); cxWall(x, 3, x, -3, 2.2, CXM.concrete, 0.6, 4.8); cxWall(x, -14, x, -18, 2.2, CXM.concrete, 0.6, 4.8); }
  cxWall(-31, -21, -3, -21, 7, CXM.concrete); cxWall(3, -21, 31, -21, 7, CXM.concrete); cxWall(-4, 3, 4, 3, 1.6, CXM.concrete, 0.6, 5.4);
  cxWall(-31, -7, -26, -7, 7, CXM.concrete); cxWall(-22, -7, -15, -7, 7, CXM.concrete);
  for (const z of [-5, -13]) { cxWall(15, z, 22, z, 7, CXM.concrete); cxWall(26, z, 31, z, 7, CXM.concrete); }
  for (const x of [-15, 15]) for (const z of [3, -3, -14, -18]) box(x < 0 ? O.green : O.magenta, 0.06, 4.8, 0.06, ...S(x > 0 ? x - 0.32 : x + 0.32, z, 2.4));
  text('←  WEST WING', ...S(-14.66, 0, 5.9), 0.42, '#66ff4d', faceYaw(-1, 0)); text('EAST WING  →', ...S(14.66, 0, 5.9), 0.42, '#ff4dd9', faceYaw(1, 0));
  for (let i = 0; i < 7; i++) box(M.metal, 62.4, 0.4, 0.4, ...S(0, -25 + i * 5, 11.4));
  for (const [px, pz] of [[-8, -8], [8, -14]]) { box(M.metal, 0.7, 0.3, 0.7, ...S(px, pz, 11.1)); point(...S(px, pz, 9.8), 0xbfc4ff, 45, 24); }
}
function hubCover() {
  for (const [px, pz] of [[-8, -3], [9, -14]]) { const a = S(px, pz), b = S(0, -9); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(CXM.slab, 4, 3, 0.6, 0, 1.6, 0); for (let r = 0; r < 2; r++) for (let c = 0; c < 2; c++) quad(crtMat, 1.6, 1.18, -0.9 + c * 1.8, 1 + r * 1.32, -0.32); box(CXM.blue, 3.9, 0.05, 0.05, 0, 3.12, -0.25); }); }
  for (const [px, pz] of [[-9, -15], [10, -3]]) { const a = S(px, pz), b = S(0, -9); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { for (let i = -1; i <= 1; i++) { box(CXM.concrete, 0.8, 4.5, 0.8, i * 0.9, 2.25, 0); box(CXM.blue, 0.08, 4.3, 0.03, i * 0.9, 2.25, -0.41); } }); }
  [[0, -6, 5, 0], [-3, -18, 5, 0.5], [4, -9, 4, 1.2]].forEach(([x, z, w, r]) => { const [px, , pz] = S(x, z); group(px, 0, pz, (-r * 180) / Math.PI, () => { box(CXM.concrete, w, 1.3, 0.4, 0, 0.65, 0); box(O.magenta, w, 0.04, 0.42, 0, 1.32, 0); }); });
  box(CXM.concrete, 0.4, 2.4, 4.5, ...S(-3.2, -9, 1.2)); box(CXM.concrete, 4.5, 2.4, 0.4, ...S(3.2, -15, 1.2));
  for (const [px, pz] of [[-14, -10], [14, -8]]) { const a = S(px, pz), b = S(0, pz); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { cyl(M.metal, 0.09, 6, 0, 3, 0.45); box(M.metal, 2.5, 5.1, 0.1, 0, 3.4, 0.05); quad(holoMat, 2.4, 5, 0, 3.4, 0); }); }
  { const a = S(-6.6, -11.5), b = S(0, -12); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => sofa(0, 0, 0, 2.6, M.velvet)); }
  [[6, -4], [-10, -6], [11, -11.5], [-6.5, -17], [6.5, -18.5], [-11, -13.5], [10, -16.5]].forEach(([x, z], i) => { const [px, , pz] = S(x, z); group(px, 0, pz, 0, () => { box(CXM.crate, 1.4, 2.3, 1.4, 0, 1.15, 0); box(CXM.crate, 1.1, 1, 1.1, i % 2 === 0 ? 1.3 : -1.3, 0.5, 0); box(M.metal, 1.44, 0.08, 1.44, 0, 1.9, 0); }); });
  [[11, -9], [7.8, -2.6], [-7.8, -2.6], [-11, -9], [-7.8, -15.4], [0, -18], [7.8, -15.4]].forEach(([x, z]) => { cyl(CXM.concrete, 0.48, 5, ...S(x, z, 2.5)); cyl(CXM.blue, 0.5, 0.14, ...S(x, z, 4.4)); cyl(CXM.blue, 0.52, 0.06, ...S(x, z, 0.1)); });
  [[-9, -9, -0.6], [9, -15, 2.5]].forEach(([x, z, yaw]) => {
    rod(M.metal, S(x, z, 6.8), S(x, z, 11.4), 0.05);
    const g = dyn(...S(x, z, 6.4), 0, () => { sph(M.metal, 0.8, 0.8, 0.8, 0, 0, 0); box(O.warm, 0.5, 0.5, 0.04, 0, -0.3, 0.38, 38); }); g.userData.base = yaw;
    const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 4.6, 14, 10, 1, true), hazeMat(0xffd18c, 0.09)); bm.position.set(0, -6.2, 0); bm.rotation.x = 0.7; g.add(bm); cxSearch.push(g);
  });
}
function heart() {
  const hg = dyn(...S(0, -12, 4.6), 0, () => { sph(CXM.heart, 3, 3, 3, 0, 0, 0); wireIco(1.9, O.cyan); }); cxHeart = hg;
  const rg = dyn(...S(0, -12, 4.6), 0, () => add(O.cyan, new THREE.TorusGeometry(2.6, 0.06, 8, 48), place(0, 0, 0, 0, 0, 0))); rg.rotation.x = 1.22; rg.rotation.z = 0.35; cxHeartRing = rg;
  add(O.indigo, new THREE.RingGeometry(0.95, 1.35, 40), new THREE.Matrix4().compose(new THREE.Vector3(...S(0, -12, 0.05)), new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0)), new THREE.Vector3(1, 1, 1)));
  text('THE HEART', ...S(0, -12, 7.9), 0.55, '#00f2ff', 180); point(...S(0, -12, 4.6), 0x6b6bff, 55, 15);
  hotspot(...S(0, -12, 1.8), 3, 3.6, 3, () => say('THE HEART — a levitating fractal orb. It pulses with the show and hums when you stand beneath it.'), 'The Heart');
}
function hideAndSeekProps() {
  const a = S(-8, 0), b = S(-2, -8);
  group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => {
    box(FST.cream, 2.6, 1, 0.9, 0, 0.5, 0); box(M.metal, 2.85, 0.12, 1.1, 0, 1.06, 0); for (let i = 0; i < 5; i++) box(i % 2 === 0 ? O.magenta : FST.cream, 0.57, 0.08, 1.3, -1.14 + i * 0.57, 2.3, 0.1); for (const x of [-1.32, 1.32]) cyl(M.metal, 0.05, 2.3, x, 1.15, 0.45);
    text('HIDE & SEEK', 0, 2.72, -0.35, 0.36, '#ff2640'); text('wanna play?', 0, 0.55, -0.47, 0.2, '#ffe633'); figure(0, 0, 0.85, 0, O.purple, INK, FST.marsh, 0.95); text('?', 0, 2.1, 0.85, 0.75, '#4dff33');
    hotspot(0, 1.4, -0.4, 3, 3, 2, () => startHide(), 'Hide & Seek');
  });
  [[-11, -3.4], [11, -3.4], [-11, -18.4], [11, -18.4], [0, -19.2]].forEach(([x, z]) => {
    const m = new THREE.MeshBasicMaterial({ color: 0x38ff14, toneMapped: false, transparent: true, opacity: 0.85, side: THREE.DoubleSide }), r = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.7, 40), m); r.rotation.x = -Math.PI / 2; const w = cxWorld(x, z, 0.04); r.position.copy(w); scene.add(r);
    text('HIDE', ...S(x, z, 0.06), 0.32, '#66ff4d', 180); cxRings.push({ x, z, mesh: r, m, charge: 1 });
  });
}
function chamber(label, col, disc, cx, cz, vx, vz) {
  text(label, ...S(cx, cz, 6.6), 0.6, col, faceYaw(vx, vz));
  const m = new THREE.MeshBasicMaterial({ color: disc, toneMapped: false, transparent: true, opacity: 0.22, side: THREE.DoubleSide }), d = new THREE.Mesh(new THREE.CircleGeometry(3.6, 40), m); d.rotation.x = -Math.PI / 2; d.position.copy(cxWorld(cx, cz, 0.05)); scene.add(d);
}
function wings() {
  // Glitch Art
  chamber('GLITCH ART', '#66ff4d', 0x38ff14, -23, 0, -1, 0);
  for (const z of [-3, 3]) { const a = S(-30.4, z), b = S(-23, z); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(CXM.slab, 1, 0.9, 0.5, 0, 0.45, 0); box(M.wall, 1.4, 1.4, 0.4, 0, 1.6, 0); quad(ledA, 1.1, 1.1, 0, 1.6, -0.21); }); }
  let a = 12; const rnd = () => (a = (a * 16807) % 2147483647) / 2147483647, bars = [O.green, O.magenta, O.cyan];
  for (let i = 0; i < 14; i++) box(bars[i % 3], 0.04, 0.12 + rnd() * 0.2, 0.4 + rnd() * 1.8, ...S(-30.96, -6 + rnd() * 12, 1 + rnd() * 5));
  for (let i = 0; i < 10; i++) box(bars[(i + 1) % 3], 0.4 + rnd() * 1.6, 0.12 + rnd() * 0.2, 0.04, ...S(-29 + rnd() * 12, 6.68, 1 + rnd() * 5));
  cxGlitch = dyn(...S(-23, -3, 2), 0, () => wireIco(1.1, O.cyan)); point(...S(-23, 0, 4), 0x4dff40, 30, 13);
  // Horrorcore
  chamber('HORRORCORE', '#ff1f33', 0xd91233, -23, -14, -1, 0);
  for (const x of [-30, -16]) { rod(CXM.rib, S(x, -20.4, 5.6), S(x, -7.6, 5.6), 0.18); for (let i = 0; i < 3; i++) rod(M.metal, S(x, -18 + i * 4, 5.6), S(x, -18 + i * 4, 7), 0.04); }
  for (let i = 0; i < 6; i++) { const x = -28 + i * 2.2, z = -11.5 - (i % 3) * 2.4, len = 1.6 + (i % 3) * 0.7; rod(M.metal, S(x, z, 7), S(x, z, 7 - len), 0.025); rod(M.brass, S(x, z, 7 - len), S(x + 0.12, z, 7 - len - 0.3), 0.03); }
  cyl(INK, 0.4, 0.02, ...S(-23, -14, 0.03)); sph(O.warm, 0.22, 0.22, 0.22, ...S(-20, -10, 5.2)); rod(INK, S(-20, -10, 5.3), S(-20, -10, 7), 0.01);
  const hl = point(...S(-23, -14, 0.4), 0xff0d14, 45, 12); cxFlicker.push(hl); cxFlicker.push(point(...S(-20, -10, 5), 0xffbf80, 20, 9));
  // Arcade + karaoke (magenta)
  chamber('ARCADE + KARAOKE', '#ff4dd9', 0xff2bd1, 23, -1, 1, 0);
  const ax = [17, 20.6, 24.2, 27.8], az = [1.6, -3.6, 1.6, -3.6], trim = [O.magenta, O.cyan, O.gold];
  for (let i = 0; i < 4; i++) { const p = S(ax[i], az[i]), t = S(ax[i], -1); group(p[0], 0, p[2], faceYaw(t[0] - p[0], t[2] - p[2]), () => { box(CXM.cab, 1.2, 2.2, 0.9, 0, 1.1, 0); quad(cabMats[i % 3], 0.9, 1, 0, 1.45, -0.47); box(trim[i % 3], 1.2, 0.22, 0.1, 0, 2.08, -0.42); box(trim[i % 3], 1.1, 0.1, 0.3, 0, 0.92, -0.52); }); }
  cyl(FST.deck, 1.2, 0.2, ...S(23, -1, 0.1)); rod(FST.chrome, S(23, -1, 0.2), S(23, -1, 1.55), 0.02); sph(FST.chrome, 0.1, 0.1, 0.14, ...S(23, -1.08, 1.62));
  text('KARAOKE NIGHT   /   MIC CHECK', ...S(18.5, -4.66, 3.4), 0.3, '#ffd94d', faceYaw(0, 1)); point(...S(23, -1, 3.5), 0x00e5ff, 30, 11);
  // Abstract (mint)
  chamber('ABSTRACT', '#4dffbf', 0x00ffa8, 23, -9, 1, 0);
  [1.2, 1.7, 2.2].forEach((r, i) => { const g = dyn(...S(23, -9, 2.6), 0, () => add(CXM.mint, new THREE.TorusGeometry(r, 0.06, 6, 48), place(0, 0, 0, 0, 0, 0))); g.rotation.x = (i * 55 * Math.PI) / 180; g.rotation.z = (i * 40 * Math.PI) / 180; cxSpin.push({ g, v: 0.5 + i * 0.3 }); });
  point(...S(23, -9, 4), 0x00ffa8, 35, 11); text('ROOM BUILDER   /   COMING SOON', ...S(18.5, -12.66, 3.4), 0.28, '#80ffd9', faceYaw(0, 1));
  // Festival theater (gold)
  chamber('FESTIVAL  ·  THEATER', '#ffd966', 0xffd24a, 23, -17, 1, 0);
  box(FST.deck, 10, 0.6, 3, ...S(23, -19.5, 0.3)); box(O.gold, 10, 0.04, 0.05, ...S(23, -18, 0.58));
  { const p = S(23, -20.6, 3.2), t = S(23, -10, 3.2); group(p[0], p[1], p[2], faceYaw(t[0] - p[0], t[2] - p[2]), () => { box(M.metal, 8.3, 3.7, 0.1, 0, 0, 0.1); quad(ledA, 8, 3.4, 0, 0, 0); }); }
  for (const x of [19, 27]) { box(M.metal, 0.45, 0.25, 0.45, ...S(x, -18, 6.7)); const bm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 2.8, 6.2, 10, 1, true), hazeMat(0xffc74d, 0.1)); bm.position.copy(cxWorld(x, -18, 3.5)); scene.add(bm); }
  for (const x of [19.5, 27.5]) { const p = S(x, -16.5), t = S(x, -20); group(p[0], 0, p[2], faceYaw(t[0] - p[0], t[2] - p[2]), () => { box(M.velvet, 2, 0.12, 0.55, 0, 0.45, 0); box(M.wall, 1.8, 0.4, 0.4, 0, 0.2, 0); }); }
  point(...S(23, -17, 5), 0xffcc66, 35, 12);
}
function hiddenRoom() {
  cxWall(-6, -21, -6, -31, 7, CXM.concrete); cxWall(6, -21, 6, -31, 7, CXM.concrete); box(CXM.slab, 12.6, 0.4, 9.6, ...S(0, -26.2, 7.2));
  cxPanel = dyn(...S(0, -21), 0, () => { box(CXM.panel, 6.2, 7, 0.7, 0, 3.5, 0); text('*  ?  *', 0, 4.4, 0.38, 0.7, '#ffd966', 180); box(O.gold, 6.2, 0.06, 0.03, 0, 6.9, 0.36); });
  for (const x of [-1.2, 1.2]) box(O.gold, 0.2, 3.2, 0.2, ...S(x, -30.85, 1.6)); box(O.gold, 2.6, 0.2, 0.2, ...S(0, -30.85, 3.3)); box(M.brass, 2.2, 3.2, 0.1, ...S(0, -30.9, 1.6)); text('THE STUDIO', ...S(0, -30.75, 4.3), 0.5, '#ffd966', 180);
  cyl(FST.marble, 0.6, 1.1, ...S(0, -26, 0.55));
  const v = dyn(...S(0, -26, 1.25), 0, () => { cyl(O.gold, 0.45, 0.02, 0, 0, 0); cyl(O.red, 0.15, 0.01, 0, 0.012, 0); }); v.rotation.x = 0.24; cxSpin.push({ g: v, v: 1.2, axis: 'y' });
  for (const x of [-5.6, 5.6]) box(O.gold, 0.06, 3, 0.06, ...S(x, -26, 3.5)); point(...S(0, -26, 5), 0xffcc66, 40, 11);
  for (const [dx, label, url] of [[-3.4, 'SAUCELAB DJ', 'dj.html'], [3.4, 'VJ STAGE', 'vj.html']]) {   // DJ tables
    const a = S(dx, -29.4), b = S(dx, -22);
    group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(CXM.slab, 2.4, 1, 0.9, 0, 0.5, 0); box(M.metal, 2.5, 0.06, 1, 0, 1.03, 0); for (const sx of [-0.7, 0.7]) { cyl(INK, 0.32, 0.05, sx, 1.09, -0.02); cyl(O.cyan, 0.05, 0.06, sx, 1.12, -0.02); } box(INK, 0.5, 0.08, 0.6, 0, 1.1, 0); text(label, 0, 1.9, 0.2, 0.18, '#4de8ff', 0); hotspot(0, 1.2, 0, 2.6, 1.6, 1.2, () => openWindow(label, new URL(url, location.href).href), label); });
    cxSolid(dx - 1.3, dx + 1.3, -29.9, -28.9);
  }
  { const a = S(0, -23.2), b = S(0, -14); group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(CXM.slab, 1.2, 2.2, 0.8, 0, 1.1, 0); quad(ledMat(0x00f3ff, 0x101830), 0.9, 0.9, 0, 1.4, -0.42); text('NPC MACHINE', 0, 2.6, -0.1, 0.16, '#00f3ff', 0); hotspot(0, 1.2, -0.2, 1.6, 2.4, 1.2, () => openWindow('KNOCK KNOCK', new URL('games/knock-knock/index.html', location.href).href), 'NPC machine · knock knock'); }); cxSolid(-0.8, 0.8, -23.7, -22.7); }
  hotspot(...S(0, -26, 1.3), 2, 2, 2, () => { if (secretOpen) say('THE STUDIO — the golden record. Spin the decks, or poke the NPC machine.'); }, 'Golden record');
}
function paparazzo(lx, lz, tx, tz, y = 0) {
  const coat = std(0x16161a);
  facing(lx, lz, tx, tz, () => {
    figure(0, y, 0, 0, coat, INK, FST.skin, 0.98); box(INK, 0.24, 0.16, 0.14, 0.05, 1.55 + y, -0.3); cyl(M.metal, 0.05, 0.12, 0.05, 1.55 + y, -0.42, 90, 0, 0);
    const f = wpos(0.05, 1.7 + y, -0.33), m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.1, 0.06), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
    m.position.set(f.x, f.y, -f.z); m.visible = false; scene.add(m); flashes.push({ m, t: Math.random() * 3 });
  });
}
function openLevels() {
  const rooms = TOWERS[0].floors, arch = TOWERS[1].floors, row = (f, i) => ({ f, i });
  const tabs = [['loop', 'THE LOOP'], ['artists', 'ARTIST WORLDS'], ['archive', 'THE ARCHIVE']];
  openPanel('LEVELS ELEVATOR // EVERY LEVEL, ONE STACK', tabs, (tab, q, body) => {
    const list = tab === 'loop' ? rooms.slice(7).map(row).reverse() : tab === 'artists' ? rooms.slice(0, 7).map(row).reverse() : arch.map(row).reverse();
    for (const { f, i } of list) for (const [label, url] of f.doors) {
      const info = LEVEL_INFO[url] || f.sub || '';
      if (q && !(label + ' ' + info).toLowerCase().includes(q)) continue;
      body.appendChild(panelRow(String(i).padStart(2, '0'), label, f.name, info, () => { $('panel').classList.remove('on'); useDoor(url, label, info); }));
    }
  }, true);
}
function levelElevator() {
  const a = S(-9, -20.3), b = S(-9, -10);
  group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => {
    box(M.metal, 0.3, 3.8, 0.5, -1.6, 1.9, 0); box(M.metal, 0.3, 3.8, 0.5, 1.6, 1.9, 0); box(M.metal, 3.5, 0.4, 0.5, 0, 3.8, 0); box(M.glass, 2.8, 3.4, 0.1, 0, 1.7, 0.1);
    box(O.cyan, 0.07, 3.6, 0.07, -1.4, 1.8, -0.3); box(O.cyan, 0.07, 3.6, 0.07, 1.4, 1.8, -0.3); box(O.cyan, 2.8, 0.07, 0.07, 0, 3.6, -0.3);
    text('LEVELS ELEVATOR', 0, 4.6, -0.3, 0.3, '#00f2ff'); text('EVERY ROOM OF THE LOOP, ONE STACK', 0, 4.15, -0.3, 0.13, '#ffffff');
    hotspot(0, 1.8, -0.4, 3.4, 3.8, 1, () => openLevels(), 'Levels elevator');
  });
  cxSolid(-10.8, -7.2, -20.9, -20);
}
function chromaRoom() {   // east of the entrance hall: the red carpet comes in off the street, down the hall and through the door
  box(CA.carpet, 25, 0.02, 16, ...S(18.3, 11.4, 0.02));
  box(CA.red, 3.2, 0.02, 6, ...S(0, 28.3, 0.02)); box(CA.red, 3.2, 0.02, 5, ...S(0, 22.8, 0.14)); box(CA.red, 3.2, 0.02, 20, ...S(0, 21.4, 0.04)); box(CA.red, 28, 0.02, 3.2, ...S(14, 13, 0.04));
  for (const dz of [-1.6, 1.6]) { box(CA.gold, 20, 0.02, 0.06, ...S(16, 13 + dz, 0.05)); }
  for (let i = 0; i < 9; i++) for (const s2 of [-1, 1]) { const z = 33 - i * 2.4; if (z > 31.5) continue; cyl(M.brass, 0.045, 1, ...S(s2 * 2.1, z, 0.5)); sph(M.brass, 0.12, 0.12, 0.12, ...S(s2 * 2.1, z, 1.02)); if (i < 8 && z - 2.4 > 12) rod(CA.redG, S(s2 * 2.1, z, 0.88), S(s2 * 2.1, z - 2.4, 0.88), 0.035); }
  text('CHROMA AWARDS  ▶', ...S(5.3, 13, 5.6), 0.5, '#ffd966', faceYaw(-1, 0)); text('THE RED CARPET IS OPEN', ...S(5.3, 13, 5.0), 0.2, '#ffffff', faceYaw(-1, 0));
  box(INK, 8, 1.4, 0.3, ...S(0, 20.5, 11)); text('CHROMA AWARDS', ...S(0, 20.7, 11), 0.55, '#ffd966', 180); text('THE RED CARPET STARTS HERE', ...S(0, 20.7, 10.2), 0.18, '#ffffff', 180);
  box(M.metal, 1.2, 8, 0.4, ...S(31.1, 2, 4)); const a = S(30.95, 11.4, 3.6), b = S(5, 11.4, 3.6);
  group(a[0], a[1], a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => { box(M.metal, 11.4, 6.4, 0.2, 0, 0, 0.1); quad(ledA, 11, 6, 0, 0, 0); });
  box(CXM.slab, 5, 0.6, 11, ...S(28.4, 11.5, 0.3)); for (const dz of [-5.4, 5.4]) box(CA.redG, 0.5, 6.5, 0.4, ...S(30.4, 11.5 + dz, 3.3));
  text('CHROMA AWARDS', ...S(30.6, 11.5, 7), 0.9, '#ffd966', faceYaw(-1, 0)); text('EVERY ENTRY  ·  EVERY GAME  ·  ONE NIGHT', ...S(30.6, 11.5, 6.2), 0.25, '#ffffff', faceYaw(-1, 0));
  for (const z0 of [7.6, 18]) for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) { const sx = 11.5 + c * 2, sz = z0 + (z0 < 10 ? -r : r) * 0.9, g2 = S(sx, sz), t2 = S(sx + 1, sz); group(g2[0], 0, g2[2], faceYaw(t2[0] - g2[0], t2[2] - g2[2]), () => { box(CA.red, 1, 0.5, 0.8, 0, 0.3, 0); box(CA.red, 1, 0.9, 0.2, 0, 0.8, 0.4); }); }
  { const k = S(8.2, 5.6); group(k[0], 0, k[2], 180, () => kiosk(0, 0, 0, 'Chroma entries', O.red, () => openPicker('CHROMA AWARDS', THEATERS.find((t) => t.id === 'chroma').groups))); }
  { const v = S(27, 18.4); group(v[0], 0, v[2], 180, () => { box(INK, 1.5, 2.4, 0.1, 0, 1.2, 0.3); box(CA.gold, 0.8, 0.55, 0.06, 0, 1.35, 0.2); text('VOTE', 0, 2.65, 0.2, 0.32, '#ffd966'); hotspot(0, 1.3, 0, 1.8, 2.6, 1.2, () => openVote(), 'Vote'); }); }
  point(...S(18, 11, 6.5), 0xff4d52, 90, 26);
  for (const [px, pz] of [[-3.9, 18], [3.9, 16.5], [-3.9, 15], [3.9, 19]]) { const l = S(px, pz); paparazzo(l[0], l[2], 0, l[2]); }
  for (const dx of [-3, 3]) { const l = S(dx, 23.4); paparazzo(l[0], l[2], 0, l[2], 0.12); }
  for (const [px, pz] of [[24, 9.8], [24, 16.4]]) { const l = S(px, pz), t = S(px - 4, 13); paparazzo(l[0], l[2], t[0], t[2]); }
}
function computerRoom() {   // west of the entrance hall: a bank of terminals into every Chroma Awards app
  box(CA.paneDark, 25, 0.02, 12, ...S(-18.3, 13.5, 0.02));
  text('THE COMPUTER ROOM', ...S(-5.3, 13, 5.6), 0.4, '#66ffb3', faceYaw(1, 0)); text('◀  EVERY CHROMA AWARDS APP', ...S(-5.3, 13, 5.0), 0.2, '#ffffff', faceYaw(1, 0));
  text('CHROMA AWARDS  ·  APPS', ...S(-30.6, 13.5, 6.4), 0.7, '#66ffb3', faceYaw(1, 0));
  const games = (y) => ALL_ENTRIES.filter((e) => e.year === y).map((e) => ({ title: e.title, url: e.url, note: e.tag })), films = (y) => CHROMA_VIDEOS.filter((v) => v.year === y).map((v) => ({ title: v.title, yt: v.yt, note: v.note }));
  const T = [
    ['CHROMA DESKTOP', 0x00f3ff, () => openWindow('CHROMA DESKTOP', new URL('chroma.html', location.href).href)],
    ['2026 GAMES', 0xff2a4a, () => openPicker('CHROMA 2026 // GAMES', [{ name: 'GAMES', items: games(2026) }])],
    ['2025 GAMES', 0xffd24a, () => openPicker('CHROMA 2025 // GAMES', [{ name: 'GAMES', items: games(2025) }])],
    ['FILMS', 0xb967ff, () => openPicker('CHROMA // FILMS', [{ name: '2026', items: films(2026) }, { name: '2025', items: films(2025) }])],
    ['THE VOTE', 0xffb020, () => openVote()],
    ['THE LAB', 0x39ff88, () => openWindow('THE LAB', new URL('lab.html', location.href).href)],
    ['THE ARCADE', 0xff2bd0, () => openPicker('THE ARCADE', ARCADE.groups || [{ name: 'GAMES', items: ARCADE.items }])],
    ['PASSPORT', 0x4ad0c0, () => { $('passBtn').click(); }],
  ];
  T.forEach(([label, hex, run], i) => {
    const row = i < 4 ? 0 : 1, x = -27 + (i % 4) * 5, z = row ? 8.6 : 18.4, a = S(x, z), b = S(x, 13.5);
    group(a[0], 0, a[2], faceYaw(b[0] - a[0], b[2] - a[2]), () => {
      box(CXM.slab, 2, 0.9, 0.8, 0, 0.45, 0); box(M.metal, 1.6, 1.1, 0.12, 0, 1.6, 0.25); quad(ledMat(hex, 0x101830), 1.4, 0.9, 0, 1.6, 0.18); box(glow(hex), 1.7, 0.05, 0.04, 0, 0.95, -0.38);
      text(label, 0, 2.55, 0.1, 0.17, hexs(hex), 0); hotspot(0, 1.3, 0, 2, 2.4, 1.2, run, label);
    });
    cxSolid(x - 1.1, x + 1.1, z - 0.6, z + 0.6);
  });
  point(...S(-18, 13.5, 6.2), 0x66ffb3, 80, 24);
}
let exploredC = [false, false, false, false, false], secretOpen = false, secretT = 0;
try { const sv = JSON.parse(localStorage.getItem('ug:explored') || 'null'); if (Array.isArray(sv) && sv.length === 5) exploredC = sv.map(Boolean); secretOpen = exploredC.every(Boolean); } catch (e) { /* ignore */ }
const CHAMBERS = ['GLITCH ART', 'HORRORCORE', 'ARCADE + KARAOKE', 'ABSTRACT', 'FESTIVAL THEATER'], CHAMBER_RECTS = [[-30, -16, -6, 6], [-30, -16, -20, -8], [16, 30, -4, 2], [16, 30, -12, -6], [16, 30, -20, -14]];
function complex() {
  group(CX.x, 0, CX.z, 0, () => { complexShell(); entranceHall(); hubShell(); heart(); hubCover(); hideAndSeekProps(); wings(); hiddenRoom(); chromaRoom(); computerRoom(); levelElevator(); });
  slideDoor({ x: CX.x, z: CX.z + 19.2, yaw: 0, w: 6.8, h: 6.2, color: 0x00f2ff, pane: CXM.rust });
  // walkable: entrance hall, hub (with arches), the five wings, the studio (opens at 5/5), the Chroma Awards room, the computer room
  cxRect(-4.6, 4.6, 3.3, 19.4); cxRect(-2.6, 2.6, 19.2, 22.8); cxRect(-4, 4, 2.5, 3.6); cxRect(-14.6, 14.6, -20.6, 2.6);
  cxRect(-15.4, -14.6, -3, 3); cxRect(14.6, 15.4, -3, 3); cxRect(14.6, 15.4, -18, -14);
  cxRect(-30.6, -15.4, -6.6, 6.6); cxRect(-30.6, -15.4, -20.6, -7.4); cxRect(-26, -22, -7.4, -6.6);
  cxRect(15.4, 30.6, -4.6, 2.6); cxRect(15.4, 30.6, -12.6, -5.4); cxRect(22, 26, -5.4, -4.6); cxRect(15.4, 30.6, -20.6, -13.4); cxRect(22, 26, -13.4, -12.6);
  cxRect(-5.5, 5.5, -30.6, -20.4, () => secretOpen);
  cxRect(4.8, 6.2, 11.6, 14.4); cxRect(5.8, 30.8, 3.8, 19.2); cxRect(-6.2, -4.8, 11.6, 14.4); cxRect(-30.8, -5.8, 7.8, 19.2);
  for (const [px, pz] of [[6, -4], [-10, -6], [11, -11.5], [-6.5, -17], [6.5, -18.5], [-11, -13.5], [10, -16.5]]) cxSolid(px - 1.5, px + 1.5, pz - 0.9, pz + 0.9);
  for (const [px, pz] of [[11, -9], [7.8, -2.6], [-7.8, -2.6], [-11, -9], [-7.8, -15.4], [0, -18], [7.8, -15.4]]) cxSolid(px - 0.5, px + 0.5, pz - 0.5, pz + 0.5);
  cxSolid(26, 31, 6, 17); cxSolid(10, 22, 5.4, 9.4); cxSolid(10, 22, 16.6, 19.2);
}
// ---- hide & seek round ----
const hs = { on: false, t: 0, head: 0, wins: 0, seekers: [] };
const WP = [[-12, -3], [12, -6], [8, -19], [-8, -19], [0, -12], [-12, -14], [12, -16], [0, -3], [-6, -10], [6, -12]];
function playerSpec() { return { x: CX.x - player.x, z: player.z - CX.z }; }
const cxSolid = (x0, x1, z0, z1) => solid(CX.x - x1, CX.x - x0, CX.z + z0, CX.z + z1);
const inHub = (s) => Math.abs(s.x) < 15.4 && s.z < 3.2 && s.z > -21;
function startHide() {
  const s = playerSpec(); if (!inHub(s)) { say('HIDE & SEEK — step into the central hub first.'); return; }
  hs.on = true; hs.t = 60; hs.head = 3; hs.seekers.forEach((k, i) => { k.x = i === 0 ? 0 : 0; k.z = i === 0 ? -18 : -10; k.h = Math.PI; k.target = (i * 5 + 3) % WP.length; k.notice = 0; k.chase = false; k.m.visible = true; });
  rings0(); $('hsBar').classList.add('on'); say('HIDE & SEEK — survive 60 s. Stand in a green ring to hide (8 s) — leaving the hub forfeits.');
}
function rings0() { for (const r of cxRings) r.charge = 1; }
function endHide(win, msg) { hs.on = false; $('hsBar').classList.remove('on'); hs.seekers.forEach((k) => { k.m.visible = false; }); if (win) { hs.wins++; cue(true); } say(msg); if (!win && msg.startsWith('CAUGHT')) { player.x = CX.x; player.z = CX.z + 1.8; player.floor = 0; player.h = 0; player.yaw = face(0, -1); } }
function hideTick(dt) {
  const s = playerSpec();
  for (const r of cxRings) { const inside = Math.hypot(s.x - r.x, s.z - r.z) < 1.7; r.hiding = hs.on && inside && r.charge > 0; if (r.hiding) r.charge = Math.max(0, r.charge - dt / 8); else r.charge = Math.min(1, r.charge + dt / 6); r.m.color.setRGB(1 - r.charge * 0.8, 0.2 + r.charge * 0.8, 0.05); r.m.opacity = 0.35 + r.charge * 0.5; }
  if (!hs.on) return;
  if (!inHub(s)) { endHide(false, 'FORFEIT — you left the hub.'); return; }
  hs.t -= dt; hs.head -= dt; $('hsTime').textContent = Math.ceil(hs.t); if (hs.t <= 0) { endHide(true, 'YOU SURVIVED — 60 s. The seekers lose interest.'); return; }
  const hidden = cxRings.some((r) => r.hiding), late = hs.t < 15;
  for (const k of hs.seekers) {
    let gx, gz, spd;
    const dx = s.x - k.x, dz = s.z - k.z, d = Math.hypot(dx, dz), ang = Math.abs(((Math.atan2(dx, dz) - k.h + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    const sees = hs.head <= 0 && !hidden && d < 16 && ang < 0.6 + 0.0;
    if (hs.head > 0) { gx = k.x; gz = k.z; spd = 0; } else if (sees) { k.notice += dt; if (k.notice >= 0.5) k.chase = true; } else if (!sees) { k.notice = Math.max(0, k.notice - dt); if (hidden || d > 20) k.chase = false; }
    if (k.chase && !hidden) { gx = s.x; gz = s.z; spd = 5.6 * (late ? 1.25 : 1); } else if (hs.head <= 0) { [gx, gz] = WP[k.target]; spd = sees ? 0 : 3; if (Math.hypot(gx - k.x, gz - k.z) < 0.6) k.target = (k.target + 1 + Math.floor(Math.random() * (WP.length - 1))) % WP.length; }
    if (spd) { const ddx = gx - k.x, ddz = gz - k.z, dd = Math.hypot(ddx, ddz) || 1; k.x += (ddx / dd) * spd * dt; k.z += (ddz / dd) * spd * dt; k.h = Math.atan2(ddx, ddz); }
    if (d < 1.4 && hs.head <= 0 && !hidden) { endHide(false, 'CAUGHT — a seeker found you. Back to the hub entrance.'); return; }
  }
}
function cxTick(t, dt) {
  if (!cxHeart) return;
  cxHeart.position.y = 4.6 + Math.sin(t * 1.4) * 0.15; cxHeart.rotation.y += dt * 0.4; cxHeartRing.rotation.y += dt * 0.9; if (cxGlitch) cxGlitch.rotation.y += dt * 1.1 + Math.sin(t * 9) * 0.05;
  for (const s of cxSpin) s.g.rotation[s.axis || 'z'] += s.v * dt;
  cxSearch.forEach((g, i) => { g.rotation.y = Math.sin(t * 0.6 + i * 2) * 1.1; });
  for (const l of cxFlicker) l.intensity = (l.userData.cb ??= l.intensity) * (0.55 + 0.45 * Math.abs(Math.sin(t * 17 + l.position.x)) * (Math.random() > 0.93 ? 0.2 : 1));
  const s = playerSpec(); CHAMBER_RECTS.forEach(([x0, x1, z0, z1], i) => { if (!exploredC[i] && s.x > x0 && s.x < x1 && s.z > z0 && s.z < z1) { exploredC[i] = true; try { localStorage.setItem('ug:explored', JSON.stringify(exploredC)); } catch (e) { /* ignore */ } cue(false); say(`CHAMBER ${exploredC.filter(Boolean).length}/5 — ${CHAMBERS[i]} EXPLORED`); if (exploredC.every(Boolean)) { secretOpen = true; say('THE HEART shudders — a red panel rises behind it. THE HIDDEN ROOM is open.'); } } });
  secretT += ((secretOpen ? 1 : 0) - secretT) * Math.min(1, dt * 0.8); if (cxPanel) cxPanel.position.y = secretT * 5.2;
  hs.seekers.forEach((k) => { if (!k.m.visible) return; const w = cxWorld(k.x, k.z, k.hgt + Math.sin(t * 2 + k.hgt) * 0.12); k.m.position.copy(w); k.m.rotation.y = Math.atan2(Math.cos(k.h), -Math.sin(k.h)); });
  hideTick(dt);
}
for (let i = 0; i < 2; i++) {
  const g = new THREE.Group(), body = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), std(0x20252f, { roughness: 0.4, metalness: 0.5 })), eye = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), glow(0xd91233)), ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.05, 6, 32), glow(0xd91233));
  eye.position.z = 0.42; eye.scale.set(1, 1, 0.7); ring.rotation.x = Math.PI / 2; const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 4.2, 10, 10, 1, true), hazeMat(0xff0d1f, 0.09)); cone.rotation.x = Math.PI / 2 + 0.2; cone.position.z = 5.2; g.add(body, eye, ring, cone); g.visible = false; scene.add(g);
  hs.seekers.push({ m: g, x: 0, z: 0, h: 0, hgt: i === 0 ? 3.4 : 2.9, target: 0, notice: 0, chase: false });
}

// =====================================================================================
//  THE MOVIE LOBBY · THE FIVE THEATERS · THE FEVER DREAM LIBRARY  (Unity "campus", all Unity metres)
//  Lobby origin world [54.6, −82.3] (unrotated: street wall at local z=+20, theater row at z=−20, theaters behind it).
//  Library origin world [89, −98.3], turned −90° so its door faces the lobby's east wall.
// =====================================================================================
const CP = { x: -63, z: -58 };   // lobby origin, turned 90°: its street wall is the west cap of the street (x = −43)
const cw = (lx, lz) => [CP.x + lz, CP.z - lx];   // lobby-local → world (Unity)
const THX = [-17.6, -8.8, 0, 8.8, 17.6];
const THEATER_TITLES = ['DREAMOS TV', 'NEW MOBILE THEATER  9x16', '16x9 THEATER', 'CHROMA AWARDS 2025', 'ENTER THE VOID'];
const rgb = (r, g, b) => '#' + [r, g, b].map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('');
const CA = {
  carpet: std(0x2d1334, { roughness: 0.9 }), red: std(0x6b0510, { roughness: 0.8 }), wood: std(0x4d2b14, { roughness: 0.6 }), walnut: std(0x1c0f09, { roughness: 0.65 }), plaster: std(0x1f1822, { roughness: 0.7 }),
  cream: std(0xe6d6b3), gold: glow(0xf2b840), redG: glow(0xe60f26), warm: glow(0xffcc80), green: glow(0x33d91a), paneDark: std(0x1a1d28, { roughness: 0.2, metalness: 0.5 }),
  books: [0x59080f, 0x0f3319, 0x0d1440, 0x734d14, 0x380f33, 0x0a383d].map((c) => std(c, { roughness: 0.7 })),
  posters: [ledMat(0xffb333, 0xe6142e), ledMat(0x10c4ff, 0xa326ff), ledMat(0xff1ac2, 0x33ff66)], fresco: ledMat(0xe6732a, 0x8c339a), term: ledMat(0xff8c1f, 0x993f0d),
};
const lines = (str, x, y, z, size, col, yaw = 0) => str.split('\n').forEach((s, i) => text(s, x, y - i * size * 2.5, z, size, col, yaw));
// straight wall with optional gaps: gap = [centre along the run, width, lintel bottom]
function runWall(ax, az, bx, bz, h, mat, gaps = [], th = 0.4) {
  const dx = bx - ax, dz = bz - az, len = Math.hypot(dx, dz), ux = dx / len, uz = dz / len, yaw = (Math.atan2(dx, dz) * 180) / Math.PI;
  const seg = (f, t, y0, y1) => { if (t - f < 0.01 || y1 - y0 < 0.01) return; const m = (f + t) / 2; box(mat, th, y1 - y0, t - f, ax + ux * m, (y0 + y1) / 2, az + uz * m, 0, yaw, 0); };
  let s = -th / 2;
  for (const [c, w, top] of [...gaps].sort((a, b) => a[0] - b[0])) { seg(s, c - w / 2, 0, h); seg(c - w / 2, c + w / 2, top, h); s = c + w / 2; }
  seg(s, len + th / 2, 0, h);
}
const box2 = (fn, x0, x1, z0, z1, ...r) => { const a = cw(x0, z0), b = cw(x1, z1); fn(Math.min(a[0], b[0]), Math.max(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[1], b[1]), ...r); };
const lobbyRect = (x0, x1, z0, z1) => box2(rect, x0, x1, z0, z1);
const lobbySolid = (x0, x1, z0, z1, h) => box2(solid, x0, x1, z0, z1, h);
const libL = (lx, lz) => [-34.4 + lz, -16 - lx];   // library-local → lobby-local (library sits off the lobby's west wall, turned 90°)
const libBox = (fn, lx0, lx1, lz0, lz1) => { const a = libL(lx0, lz0), b = libL(lx1, lz1); fn(Math.min(a[0], b[0]), Math.max(a[0], b[0]), Math.min(a[1], b[1]), Math.max(a[1], b[1])); };
const libRect = (...a) => libBox(lobbyRect, ...a), libSolid = (...a) => libBox(lobbySolid, ...a);

// ---- shell: floor, the theater row wall with five doors, street wall with the entrance, roofs ----
function lobbyShell() {
  floorSlab(0, 0, -7.7, 44, 55.4);
  runWall(-22, -20, 22, -20, 11, CA.plaster, THX.map((x, i) => [x + 22, i === 2 ? 4 : 2.6, i === 2 ? 4.4 : 3.6]));
  runWall(-22, 20, 22, 20, 11, M.wall, [[4.6, 4.4, 4.4]]);
  runWall(-22, 20, -22, -35.4, 11, M.wall, [[36, 4, 3.4]]); runWall(22, 20, 22, -35.4, 11, M.wall);
  for (let i = 1; i < 5; i++) runWall(-22 + i * 8.8, -20, -22 + i * 8.8, -35.4, 8, CA.plaster);
  runWall(-22, -35.4, 22, -35.4, 8, M.wall);
  box(M.wall, 44.4, 0.3, 40.4, 0, 11.15, 0); box(M.wall, 44.4, 0.3, 15.8, 0, 8.15, -27.7);
  for (const z of [-17.62, -14.38]) box(M.brass, 1.1, 4, 0.16, -22.3, 2, z);
  box(CA.wood, 1.1, 0.01, 3.4, -22.3, 0.005, -16);
}
// ---- the street face: marquee canopy, sign, blade sign, sliding glass doors ----
function lobbyFacade() {
  box(CONCRETE, 9.4, 0.12, 1.1, -17.3, 0.06, 20.75);
  box(M.metal, 7.6, 0.45, 3.8, -17.4, 4.9, 22.1); box(INK, 7.6, 1.25, 0.12, -17.4, 5.3, 24);
  text('NOW SHOWING', -17.4, 5.6, 24.08, 0.3, '#ffd973', 180); text('CHROMA AWARDS  /  ENTER THE VOID  /  9x16', -17.4, 5.1, 24.08, 0.22, '#ffffff', 180);
  for (let i = 0; i < 15; i++) { const bx = -21.1 + i * 0.53; sph(CA.gold, 0.11, 0.11, 0.11, bx, 5.98, 24.06); sph(CA.gold, 0.11, 0.11, 0.11, bx, 4.62, 24.06); }
  for (let i = 0; i < 5; i++) for (let j = 0; j < 2; j++) box(O.warm, 0.36, 0.03, 0.36, -19.8 + i * 1.2, 4.66, 21.2 + j * 1.5);
  for (const bx of [-20.9, -13.9]) rod(M.brass, [bx, 5.1, 23.9], [bx, 9.2, 20.25], 0.06);
  box(INK, 9.2, 3.2, 0.1, -17.3, 8.3, 20.26); text('MOVIE THEATER', -17.3, 8.65, 20.33, 0.72, '#ffc759', 180); text('12MATT3R   /   FIVE THEATERS   /   LIBRARY', -17.3, 7.65, 20.33, 0.24, '#73e6ff', 180);
  for (const y of [6.72, 9.88]) box(CA.gold, 9.2, 0.07, 0.05, -17.3, y, 20.33);
  group(-12.9, 7.2, 21.1, 0, () => {
    box(INK, 0.3, 5.2, 1.6, 0, 0, 0);
    for (const sx of [-0.17, 0.17]) { box(CA.redG, 0.05, 5.2, 0.05, sx, 0, -0.78); box(CA.redG, 0.05, 5.2, 0.05, sx, 0, 0.78); 'CINEMA'.split('').forEach((c, i) => text(c, sx * 1.15, 2 - i * 0.8, 0, 0.6, '#ff4d59', sx < 0 ? 90 : -90)); }
  });
  for (const dx of [-2.32, 2.32]) box(O.gold, 0.08, 4.4, 0.06, -17.4 + dx, 2.2, 20.26); box(O.gold, 4.7, 0.08, 0.06, -17.4, 4.42, 20.26);
  box(INK, 0.1, 2.6, 16, 22.26, 8.4, 0); text('MOVIE THEATER', 22.33, 8.75, 0, 1.5, '#ffc759', -90); text('FIVE THEATERS  /  ENTRANCE ON THE STREET', 22.33, 7.65, 0, 0.36, '#73e6ff', -90);
  for (const fx of [-21.7, -13.1]) box(fx < -20 ? CA.redG : O.purple, 0.08, 11, 0.06, fx, 5.5, 20.32);
  slideDoor({ x: -17.4, z: 20, yaw: 0, w: 4.4, h: 4.3, color: 0xf2b840 });
}
function lobbyInterior() {
  box(CA.carpet, 43.2, 0.01, 39.2, 0, 0.015, 0); box(CA.plaster, 43.2, 0.01, 4.4, 0, 0.022, -17.6);
  for (let i = 0; i < 9; i++) box(i % 2 === 0 ? CA.gold : O.purple, 0.06, 0.006, 24, -18 + i * 4.5, 0.025, 6);
  for (let i = 0; i < 10; i++) box(CA.plaster, 0.35, 0.7, 40, -19.8 + i * 4.4, 10.6, 0);
  for (let i = 0; i < 5; i++) box(CA.plaster, 44, 0.7, 0.35, 0, 10.6, -16 + i * 8);
  for (const [px, pz] of [[-11, 4], [11, 4], [0, -8]]) group(px, 8.4, pz, 0, () => {
    add(CA.warm, new THREE.TorusGeometry(2.2, 0.09, 8, 48), place(0, 0, 0, 90)); add(M.brass, new THREE.TorusGeometry(2.2, 0.09, 8, 48), place(0, 0.45, 0, 90));
    for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; sph(O.warm, 0.14, 0.32, 0.14, Math.cos(a) * 2.2, -0.35, Math.sin(a) * 2.2); }
    rod(M.brass, [0, 0.45, 0], [0, 2.2, 0], 0.03);
  });
  point(-11, 7.4, 4, 0xffb873, 55, 26); point(11, 7.4, 4, 0xffb873, 55, 26);
  for (const [px, pz] of [[-11, -7], [11, -7], [-11, 10], [11, 10]]) { cyl(FST.marble, 0.55, 11, px, 5.5, pz); for (const y of [0.3, 10.2]) cyl(M.brass, 0.66, 0.18, px, y, pz); cyl(CA.gold, 0.58, 0.05, px, 3, pz); lobbySolid(px - 0.7, px + 0.7, pz - 0.7, pz + 0.7); }
  // the theater row: neon frames, marquees, posters
  const tn = [O.gold, O.cyan, O.red, O.purple, O.magenta], tc = ['#ffd159', '#4de6ff', '#ff4d59', '#c78cff', '#ff40bf'];
  for (let i = 0; i < 5; i++) {
    const x = THX[i], w = i === 2 ? 4 : 2.6, h = i === 2 ? 4.4 : 3.6;
    for (const s of [-1, 1]) box(tn[i], 0.08, h, 0.06, x + s * (w / 2 + 0.06), h / 2, -19.78);
    box(tn[i], w + 0.2, 0.08, 0.06, x, h + 0.05, -19.78);
    box(INK, w + 2.4, 1.2, 0.12, x, h + 1.05, -19.76);
    text(THEATER_TITLES[i], x, h + 1.15, -19.68, i === 1 ? 0.24 : 0.3, tc[i], 180); text(`SCREEN ${i + 1}   /   NOW SHOWING`, x, h + 0.7, -19.68, 0.13, '#bfc7d9', 180);
    box(INK, 1.4, 2.2, 0.06, x + (i < 2 ? 2.4 : -2.4), 2.3, -19.8); quad(CA.posters[[0, 1, 0, 1, 2][i] % 3], 1.3, 2.1, x + (i < 2 ? 2.4 : -2.4), 2.3, -19.72, 180);
  }
  // the directory pylon
  group(0, 0, 11, 0, () => {
    box(INK, 1.6, 3.2, 0.4, 0, 1.6, 0); for (const s of [-1, 1]) box(CA.gold, 0.05, 3.2, 0.44, s * 0.82, 1.6, 0);
    text('THE MOVIE LOBBY', 0, 2.9, -0.22, 0.2, '#ffd166'); lines('^  THE STREET\n>  FOOD COURT\n>  FEVER DREAM LIBRARY\n<  ARCADE TERMINAL\n<  TRIPPY CAM\nv  THEATERS 1-5', 0, 2.3, -0.22, 0.1, '#ffffff');
    lines('^  THEATERS 1-5\n<  FOOD COURT\n<  FEVER DREAM LIBRARY\n>  ARCADE TERMINAL\n>  TRIPPY CAM\nv  THE STREET', 0, 2.3, 0.22, 0.1, '#ffffff', 180);
  });
  lobbySolid(-0.9, 0.9, 10.7, 11.3);
  text('THE UNDERGROUND  /  THE STREET  /  THE FESTIVAL', -17.4, 5.1, 19.74, 0.22, '#73e6ff'); text('EXIT', -17.4, 4.72, 19.74, 0.16, '#ff4d4d');
  // the library door on the east wall
  for (const z of [-17.8, -14.2]) box(O.orange, 0.06, 4, 0.08, -21.76, 2, z); box(O.orange, 0.06, 0.08, 3.7, -21.76, 4.05, -16);
  text('FEVER DREAM LIBRARY', -21.72, 5.1, -16, 0.36, '#ffad59', -90); text('PRODUCTION DOCUMENTS  /  ARCHIVE TERMINAL', -21.72, 4.6, -16, 0.14, '#ffffff', -90);
  // west wall: arcade terminal · Trippy Cam · vote booths
  facing(-20.6, 4, 0, 4, () => {
    box(M.wall, 2.6, 1, 0.9, 0, 0.5, 0); box(CA.wood, 2.7, 0.05, 1, 0, 1.02, -0.05); box(M.metal, 1.5, 1.1, 0.5, 0, 1.75, 0.18); quad(CA.term, 1.25, 0.85, 0, 1.75, -0.08); box(INK, 0.9, 0.04, 0.3, 0, 1.07, -0.25);
    box(INK, 2.8, 0.6, 0.08, 0, 3.1, 0.3); text('ARCADE TERMINAL', 0, 3.12, 0.24, 0.26, '#66ff59'); text('NEON PULSE ON THE BIG SCREEN', 0, 2.65, 0.24, 0.12, '#ffffff');
    hotspot(0, 1.4, -0.2, 2.8, 2.6, 1.6, () => openPicker('THE ARCADE', [{ name: 'MINI', items: [{ title: 'NEON PULSE', note: 'the rhythm minigame', run: openPulse }] }, ...(ARCADE.groups || [{ name: 'GAMES', items: ARCADE.items }])]), 'Arcade terminal · pick a game');
  });
  facing(-20.85, -5, 0, -5, () => {
    const pl = std(0x40143f, { roughness: 0.5 });
    box(pl, 2.4, 2.8, 0.12, 0, 1.4, 0.55); for (const s of [-1, 1]) box(pl, 0.1, 2.8, 1.4, s * 1.15, 1.4, -0.1);
    box(pl, 2.4, 0.12, 1.4, 0, 2.86, -0.1); box(CA.redG, 0.9, 2.4, 0.06, -0.6, 1.5, -0.75); box(M.velvet, 1.8, 0.5, 0.5, 0, 0.25, 0.25); box(INK, 0.5, 0.5, 0.04, 0.5, 1.6, 0.48); box(INK, 2.2, 0.6, 0.1, 0, 3.3, -0.1);
    text('TRIPPY CAM', 0, 3.32, -0.18, 0.28, '#ff4de6'); for (const s of [-1, 1]) box(O.magenta, 0.05, 2.8, 0.05, s * 1.2, 1.4, -0.8);
    hotspot(0, 1.4, -0.4, 2.4, 2.8, 1.4, () => { snapReq = true; }, 'Trippy Cam · take a photo');
  });
  [[-20.5, -9, 0, -9], [-20.5, 12, 0, 12], [12, 18.5, 12, 0], [20.5, 17.5, 20.5, 0]].forEach(([vx, vz, tx, tz]) => facing(vx, vz, tx, tz, () => {
    box(INK, 1.5, 2.4, 0.1, 0, 1.2, 0.3); for (const s of [-1, 1]) box(INK, 0.06, 2.4, 0.7, s * 0.72, 1.2, -0.05);
    box(CA.gold, 0.8, 0.55, 0.06, 0, 1.35, 0.2); box(M.brass, 1.2, 0.05, 0.5, 0, 0.95, 0); text('VOTE', 0, 2.65, 0.2, 0.32, '#ffd966'); text('CHROMA AWARDS', 0, 2.32, 0.2, 0.11, '#ffffff');
    hotspot(0, 1.3, -0.1, 1.6, 2.6, 1.2, () => openVote(), 'Chroma Awards vote');
  }));
  // the merch tent beside the street door
  facing(-11.2, 17.6, -11.2, 0, () => {
    const stripe = std(0xc4202a, { roughness: 0.9 });
    for (const sx of [-1.9, 1.9]) for (const sz of [-1.2, 1.2]) cyl(M.metal, 0.05, 2.8, sx, 1.4, sz);
    box(stripe, 4.2, 0.12, 2.8, 0, 2.95, 0); box(stripe, 4.2, 0.4, 0.04, 0, 2.7, -1.4); box(CA.wood, 3.4, 0.9, 0.9, 0, 0.45, -0.4);
    for (let i = 0; i < 5; i++) box(i % 2 === 0 ? FST.tee : INK, 0.5, 0.08, 0.4, -1.3 + i * 0.65, 0.95, -0.45);
    box(M.metal, 3.4, 0.06, 0.06, 0, 1.8, 1.1); for (let i = 0; i < 6; i++) box(i % 3 === 0 ? O.cyan : i % 3 === 1 ? INK : FST.tee, 0.48, 0.7, 0.05, -1.4 + i * 0.56, 1.35, 1.1);
    for (let i = 0; i < 3; i++) cyl(INK, 0.15, 0.01, 1.1 + i * 0.01, 1.15 + i * 0.02, -0.5, 80, 0, 0);
    text('MERCH', 0, 2.72, -1.44, 0.22, '#66ff4d'); hotspot(0, 1.3, -0.4, 4.2, 2.6, 2.2, () => openWindow('MERCH STORE', new URL('store.html', location.href).href), 'Merch tent · the store');
  });
  // the food court: four stalls on the east wall, eight tables
  const stalls = ['NEON NOODLES', 'PIXEL PIZZA', 'TACO TERMINAL', 'BOBA BEAT'], menu = ['Steaming bowls under cyan neon. One is waiting for you, on the house tonight.', 'A slice with a pixel-perfect crust. Order up!', 'Three tacos and a bass drop.', 'Taro boba with glowing pearls. Shake it to the beat.'];
  const sn = [O.cyan, O.orange, O.green, O.magenta], sc = ['#00f2ff', '#ff9959', '#66ff4d', '#ff4dd9'];
  stalls.forEach((nm, i) => {
    const z = -9 + i * 6;
    facing(20.3, z, 0, z, () => {
      box(M.wall, 5, 4, 0.2, 0, 2, 1.3); box(CA.wood, 4.6, 1.1, 0.8, 0, 0.55, -0.2); box(FST.marble, 4.7, 0.06, 0.9, 0, 1.12, -0.2); box(sn[i], 4.5, 0.05, 0.04, 0, 0.95, -0.62);
      box(INK, 5, 0.15, 1.9, 0, 3.4, -0.2); box(INK, 3.6, 1.2, 0.04, 0, 2.35, 1.18); text(nm, 0, 3.7, -1.18, 0.34, sc[i]); box(INK, 4.6, 0.6, 0.08, 0, 3.72, -1.1); text('MENU  /  OPEN LATE', 0, 2.6, 1.14, 0.14, sc[i], 180);
      figure(0, 0, 0.6, 180, FST.tee, INK, FST.skin, 0.95);
      hotspot(0, 1.3, -0.3, 4.8, 2.6, 1.8, () => say(`${nm} — ${menu[i]}`), nm);
    });
  });
  for (let i = 0; i < 8; i++) {
    const tx = i < 4 ? 13.5 : 17, tz = -8 + (i % 4) * 6;
    cyl(M.metal, 0.06, 0.76, tx, 0.38, tz); cyl(FST.marble, 0.55, 0.04, tx, 0.76, tz);
    for (let k = 0; k < 4; k++) { const a = (k * Math.PI) / 2 + 0.4; cyl(i % 2 === 0 ? O.orange : O.cyan, 0.2, 0.48, tx + Math.cos(a) * 0.95, 0.24, tz + Math.sin(a) * 0.95); }
    lobbySolid(tx - 0.6, tx + 0.6, tz - 0.6, tz + 0.6);
  }
  text('FOOD COURT', 21.7, 6.3, 0, 0.7, '#ffb359', 90);
}
// ---- one theater behind the row wall ----
const tScreens = [];
function theater(i) {
  const x = THX[i], lc = ['#ffbf59', '#4dd9ff', '#ff4d52', '#b380ff', '#ff40cc'], side = [O.gold, O.cyan, O.red, O.purple, O.magenta];
  box(CA.carpet, 8.3, 0.01, 14.9, x, 0.015, -27.7); box(CA.plaster, 8.4, 0.12, 15, x, 7.9, -27.7);
  for (const s of [-1, 1]) { for (let k = 0; k < 4; k++) box(M.velvet, 0.12, 3.6, 2.6, x + s * 4.12, 3.4, -23.4 - k * 3.2); box(side[i], 0.05, 0.06, 14.8, x + s * 4.14, 5.6, -27.7); }
  const sz = i === 1 ? [3.2, 5.7] : i === 2 ? [8, 4.5] : [7.2, 4.05], sy = i === 1 ? 4 : 4.4;
  box(M.metal, sz[0] + 0.3, sz[1] + 0.3, 0.2, x, sy, -35.2);
  const mat = ledMat(...[[0x7a4a10, 0xe6a020], [0x0a6a9a, 0xe620c0], [0x7a0a1a, 0xe68020], [0x0a6a9a, 0x7a22d8], [0x6a0a7a, 0x20e6a0]][i]);
  const g = dyn(x, sy, -35.05, 0, () => quad(mat, sz[0], sz[1], 0, 0, 0, 180));
  const video = document.createElement('video'); video.playsInline = true; video.crossOrigin = 'anonymous'; video.loop = false; video.muted = true; video.preload = 'none';
  const ts = { i, mat, mesh: g.children[0], video, real: null, list: i === 1 ? TTA_TALL : i === 2 ? TTA_WIDE : null, n: 0, playing: false, requested: false };
  if (ts.list) { const tex = new THREE.VideoTexture(video); tex.colorSpace = THREE.SRGBColorSpace; ts.real = new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }); video.addEventListener('ended', () => nextTheaterVideo(ts, 1)); }
  tScreens.push(ts);
  if (i === 2) { for (const s of [-1, 1]) box(CA.redG, 0.5, 7.6, 0.3, x + s * 4, 3.9, -34.8); box(M.brass, 8.4, 0.3, 0.3, x, 7.05, -34.85); }
  if (i === 1) for (const s of [-1, 1]) box(O.cyan, 0.08, 5.7, 0.06, x + s * 2.05, 4, -34.95);
  if (i === 4) for (let k = 0; k < 6; k++) box(k % 2 === 0 ? O.magenta : O.green, 0.05, 0.05, 10, x + (k % 2 === 0 ? -1 : 1) * 4.12, 1 + k * 1.1, -30);
  const seatMat = [M.seat, M.velvet, std(0x8a0c18, { roughness: 0.9 }), M.velvet, std(0x6a1a66, { roughness: 0.9 })][i];
  for (let r = 0; r < 3; r++) for (const sx of [-3.1, -1.6, 1.6, 3.1]) group(x + sx, 0, -24.6 - r * 2.5, 0, () => {
    box(M.wall, 1.2, 0.44, 0.9, 0, 0.22, 0); box(seatMat, 1, 0.16, 0.85, 0, 0.5, -0.05); box(seatMat, 1.05, 1.05, 0.2, 0, 0.95, 0.4); for (const ax of [-0.57, 0.57]) box(M.wall, 0.1, 0.4, 0.85, ax, 0.66, 0);
  });
  for (let k = 0; k < 6; k++) for (const s of [-1, 1]) box(O.warm, 0.12, 0.02, 0.3, x + s * 0.8, 0.03, -22.4 - k * 2.2);
  text(THEATER_TITLES[i], x, 7.35, -34.9, 0.3, lc[i], 180);
  kiosk(x + 3.2, -21.9, 180, ts.list ? 'Next video' : i === 4 ? 'Play the playlist' : i === 0 ? 'Open DreamOS TV' : 'Pick an entry', side[i], () => theaterDesk(i, ts));
  lobbyRect(x - 4, x + 4, -35, -20.2); lobbySolid(x + 2.5, x + 3.9, -22.5, -21.3);
  for (let r = 0; r < 3; r++) for (const sx of [-3.1, -1.6, 1.6, 3.1]) lobbySolid(x + sx - 0.55, x + sx + 0.55, -24.6 - r * 2.5 - 0.4, -24.6 - r * 2.5 + 0.5);
  const w = (i === 2 ? 4 : 2.6) / 2 - 0.3; lobbyRect(x - w, x + w, -20.9, -19);
}
function nextTheaterVideo(ts, step = 1) {
  if (!ts.list) return;
  ts.n = (ts.n + step + ts.list.length) % ts.list.length; const v = ts.list[ts.n];
  ts.video.src = v.src; ts.video.muted = !userGesture;
  ts.video.play().then(() => { ts.mesh.material = ts.real; ts.playing = true; say(`▶ ${v.title}`); }).catch(() => { });
}
const ROOMS = [{ id: 'dreamos', name: 'DREAMOS TV', items: [{ title: 'DreamOS TV', url: 'tv.html' }] }, ...['vertical', 'wide', 'chroma25', 'void'].map((id) => THEATERS.find((t) => t.id === id))];
function theaterDesk(i, ts) {
  if (ts.list) { nextTheaterVideo(ts, 1); return; }
  const room = ROOMS[i];
  if (i === 0 || i === 4) { openWindow(room.name, embedOf(room.items[0])); return; }
  openPicker(room.name, room.groups || [{ name: 'ENTRIES', items: room.items }]);
}
function openPicker(title, groups) {
  openPanel(title, groups.map((g2, k) => [String(k), g2.name]), (tab, q, body) => {
    for (const it of groups[+tab].items) {
      if (q && !(it.title + ' ' + (it.note || '')).toLowerCase().includes(q)) continue;
      body.appendChild(panelRow(it.run ? '★' : it.yt || it.pl ? '▶' : '◆', it.title, it.note || '', '', () => { if (it.run) { $('panel').classList.remove('on'); it.run(); } else openWindow(it.title, embedOf(it)); }));
    }
  }, true);
}
const embedOf = (it) => (it.yt ? `https://www.youtube.com/embed/${encodeURIComponent(it.yt)}?autoplay=1&rel=0` : it.pl ? `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(it.pl)}&autoplay=1&rel=0` : new URL(it.url, location.href).href);
// ---- the Fever Dream Library ----
function library() {
  box(M.stone, 22.4, 0.5, 24.4, 0, -0.25, 0); box(CA.wood, 22, 0.012, 24, 0, 0.006, 0); box(CA.red, 7, 0.01, 13, 0, 0.02, -3.2);
  runWall(-11, 12, 11, 12, 6.5, CA.walnut, [[11, 4, 3.4]]); runWall(11, 12, 11, -12, 6.5, CA.walnut); runWall(11, -12, -11, -12, 6.5, CA.walnut); runWall(-11, -12, -11, 12, 6.5, CA.walnut);
  box(CA.walnut, 22.4, 0.3, 24.4, 0, 6.65, 0); for (let i = 0; i < 6; i++) box(CA.wood, 22, 0.4, 0.35, 0, 6.3, -10 + i * 4);
  let a = 4; const rnd = () => (a = (a * 16807) % 2147483647) / 2147483647;
  const shelf = (px, pz, yaw, width) => group(px, 0, pz, yaw, () => {
    box(CA.wood, width, 4.8, 0.15, 0, 2.4, 0.2); for (const s of [-1, 1]) box(CA.wood, 0.1, 4.8, 0.5, (s * width) / 2, 2.4, 0);
    for (let k = 0; k < 6; k++) {
      const y = 0.12 + k * 0.8; box(CA.wood, width, 0.05, 0.5, 0, y, 0); if (k === 5) continue;
      let x0 = -width / 2 + 0.08;
      while (x0 < width / 2 - 0.3) { let bw = 0.3 + rnd() * 0.7; if (x0 + bw > width / 2 - 0.08) bw = width / 2 - 0.08 - x0; const bh = 0.45 + rnd() * 0.2; box(CA.books[(rnd() * 6) | 0], bw - 0.02, bh, 0.32, x0 + bw / 2, y + 0.025 + bh / 2, -0.02); x0 += bw + (rnd() < 0.2 ? 0.25 : 0.01); }
    }
  });
  for (let i = 0; i < 4; i++) { const z = -9.5 + i * 5; shelf(-10.55, z, -90, 4.6); if (i !== 2) shelf(10.55, z, 90, 4.6); libSolid(-10.8, -10.3, z - 2.3, z + 2.3); if (i !== 2) libSolid(10.3, 10.8, z - 2.3, z + 2.3); }
  for (const x of [-7, 7]) { shelf(x, -11.55, 180, 5.6); libSolid(x - 2.8, x + 2.8, -11.8, -11.3); }
  quad(CA.fresco, 5.4, 4.6, 0, 3.4, -11.75, 180); box(M.brass, 0.08, 4.6, 0.04, 0, 3.4, -11.7); box(M.brass, 5.4, 0.08, 0.04, 0, 4, -11.7);
  text('FEVER DREAM LIBRARY', 0, 6, -11.7, 0.42, '#ffb866', 180); text('FEVER DREAM LIBRARY', 0, 5.2, 11.75, 0.4, '#ffb866'); text('THE MOVIE LOBBY', 0, 4.55, 11.75, 0.16, '#ffffff');
  box(CA.wood, 2.4, 0.08, 9, 0, 0.82, -3.2); for (const x of [-1, 1]) for (const z of [-7.3, -3.2, 0.9]) box(CA.walnut, 0.14, 0.8, 0.14, x, 0.4, z); libSolid(-1.3, 1.3, -7.8, 1.4);
  for (let i = 0; i < 3; i++) group(0, 0.86, -6.4 + i * 3.2, 0, () => { box(M.brass, 0.3, 0.06, 0.2, 0, 0.03, 0); rod(M.brass, [0, 0.05, 0], [0, 0.38, 0], 0.02); box(CA.green, 0.45, 0.1, 0.18, 0, 0.42, 0); });
  for (let i = 0; i < 4; i++) for (const s of [-1, 1]) facing(s * 1.75, -6.6 + i * 2.3, 0, -6.6 + i * 2.3, () => { box(CA.wood, 0.55, 0.08, 0.55, 0, 0.46, 0); box(CA.wood, 0.55, 0.9, 0.06, 0, 0.95, 0.25); for (const lx of [-0.22, 0.22]) for (const lz of [-0.22, 0.22]) box(CA.walnut, 0.05, 0.44, 0.05, lx, 0.22, lz); });
  LIBRARY.docs.forEach((d, i) => {
    const z = -7.4 + i * 0.84, x = i % 2 === 0 ? -0.6 : 0.6;
    group(x, 0.86, z, i % 2 === 0 ? 8 : -8, () => {
      box(CA.books[i % 6], 0.5, 0.06, 0.36, 0, 0.03, 0); box(CA.cream, 0.46, 0.02, 0.33, 0, 0.065, 0); box(CA.gold, 0.03, 0.005, 0.08, 0.1, 0.07, -0.17);
      hotspot(0, 0.1, 0, 0.7, 0.4, 0.55, () => openWindow(d.title, new URL(d.url, location.href).href), d.short);
    });
  });
  for (const s of [-1, 1]) group(s * 7.2, 0, 7.2, 0, () => {
    box(CA.red, 3.6, 0.01, 3, 0, 0.02, 0);
    for (const aa of [-1, 1]) facing(aa * 0.9, 0, aa * 0.9, -0.6, () => { box(M.seat, 0.95, 0.6, 0.9, 0, 0.3, 0); box(M.seat, 0.95, 0.9, 0.2, 0, 0.9, 0.38); for (const ax of [-0.45, 0.45]) box(M.seat, 0.15, 0.35, 0.9, ax, 0.65, 0); });
    cyl(CA.wood, 0.35, 0.6, 0, 0.3, -0.8); rod(M.brass, [s * 1.6, 0, 0.8], [s * 1.6, 1.7, 0.8], 0.03); sph(O.warm, 0.4, 0.4, 0.4, s * 1.6, 1.8, 0.8);
  });
  libSolid(-9, -5.4, 5.6, 8.8); libSolid(5.4, 9, 5.6, 8.8);
  facing(10.35, 1.6, 0, 1.6, () => {
    box(CA.walnut, 2.2, 1.1, 0.7, 0, 0.55, 0); box(M.brass, 2.3, 0.05, 0.8, 0, 1.12, -0.05); box(CA.walnut, 2, 1.4, 0.3, 0, 2.1, 0.15); quad(CA.term, 1.7, 1.1, 0, 2.1, -0.02);
    text('ARCHIVE TERMINAL', 0, 3.15, 0.05, 0.22, '#ff9e33'); text('PLACES  /  TOWERS  /  SYSTEMS  /  HOW IT WAS MADE', 0, 2.9, 0.05, 0.09, '#ffffff');
    hotspot(0, 1.6, -0.2, 2.4, 2.8, 1.2, () => openArchive(), 'Archive Terminal');
  });
  libSolid(9.5, 11.2, 0.5, 2.7);
  for (let i = 0; i < 3; i++) group(0, 5.3, -8 + i * 7, 0, () => { rod(M.brass, [0, 0, 0], [0, 1.2, 0], 0.02); sph(O.warm, 0.55, 0.55, 0.55, 0, 0, 0); for (const s of [-1, 1]) sph(O.warm, 0.22, 0.22, 0.22, s * 0.6, -0.1, 0); });
  point(0, 4.8, -2, 0xffad66, 48, 20);
}
// ---- the Archive Terminal and a generic info panel ----
function panelRow(icon, title, meta, desc, run) {
  const b = document.createElement('button'); b.className = 'lt-row';
  b.innerHTML = '<span class="ic"></span><span style="flex:1"><span class="t"></span><span class="m"></span><span class="d"></span></span>';
  b.querySelector('.ic').textContent = icon; b.querySelector('.t').textContent = title; b.querySelector('.m').textContent = meta ? ' · ' + meta : ''; b.querySelector('.d').textContent = desc; b.onclick = run; return b;
}
function openPanel(title, tabs, draw, search = false) {
  $('panelT').textContent = title; const top = $('panelTop'), body = $('panelBody'); top.replaceChildren();
  let cur = tabs.length ? tabs[0][0] : '', q = '';
  const redraw = () => { body.replaceChildren(); draw(cur, q.toLowerCase(), body); top.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.id === cur)); };
  for (const [id, label] of tabs) { const b = document.createElement('button'); b.textContent = label; b.dataset.id = id; b.onclick = () => { cur = id; redraw(); }; top.appendChild(b); }
  if (search) { const inp = document.createElement('input'); inp.type = 'search'; inp.placeholder = 'search…'; inp.setAttribute('aria-label', 'Search'); inp.oninput = () => { q = inp.value; redraw(); }; top.appendChild(inp); }
  top.style.display = tabs.length || search ? 'flex' : 'none'; $('panel').classList.add('on'); player.keys.clear(); redraw();
}
const ARCHIVE_PAGES = {
  places: 'THE UNDERGROUND  /  the club: arrival lounge, DJ battle arena (CYAN vs VIOLET), VIP balconies, gallery, neon arcade, cinema lounge, main auditorium and private cinema.\n\nTHE STREET  /  out through the arrival lounge’s sliding doors.\nTHE FESTIVAL  /  through the ring gateway: the main stage and a 13-act lineup.\nTHE MIDWAY  /  a big-top arcade, through the festival’s striped tent.\nTHE COMPLEX  /  the rusty warehouse at the street’s west end: five wing chambers, hide & seek and a hidden room.\n\nTHE MOVIE LOBBY  /  on the street’s south side: five theaters, the arcade terminal, Trippy Cam, the merch tent, Chroma vote booths and the food court.\nFEVER DREAM LIBRARY  /  through the lobby’s east door. You are here.\nTHE ROOMS and THE ARCHIVE  /  the catalog towers at the gallery’s east and west ends.',
  towers: 'THE ROOMS  /  east end of the gallery, 15 floors, one door each\n  G  The Gallery (museum)\n  1-6  artist worlds: Rave Charles, Driftwave Static, VaporStudio Rooms, Sofa King Sad Boi, Tanky Johnson, Shmorez\n  7-14  the big loop: Green Room, Surreal Lo-Fi, Abstract Psychedelic, Glitch Room, Horrorcore, Control Room, Game Room, Rooftop\n\nTHE ARCHIVE  /  west end of the gallery, 11 floors, up to four doors each\n  G  The Festival   1-3  Games   4  Retro   5  Arcade Row   6  Stages\n  7  Studios   8  Tools + Archives   9-10  Roof: the EPKs\n\nEvery floor has an elevator on its far wall. Doors that match a place in this world take you there. The other doors show their card, with the page one click away in a window.',
  systems: 'WALK  /  WASD or arrows, Shift to hurry, drag to look. Touch: the pads. Click things to use them.\n\nDOORS  /  walk into a doorway or click it.\nELEVATORS  /  call one on any tower floor’s far wall and pick a floor.\nTHEATERS  /  each screen desk changes what is playing; the Chroma desks open an entry in a window.\nSHOW CLOCK  /  a simulated 120 BPM pulse drives the neon, LED walls and crowd everywhere. It is not audio analysis.\nVOTES  /  the booths open the real Chroma Awards vote page.\nTRIPPY CAM  /  four tinted frames of what you are looking at. Nothing is uploaded.',
  made: 'Built from the creator’s Unity world specs and supplied models. Every wall, seat, shelf, sign and screen here is procedural geometry, ported to Three.js for the browser.\n\nThe campus follows the creator’s world spec: the Movie Lobby’s theaters, terminal, booths and food court; the library’s long table, nooks and terminal; and the two towers’ floor lists.\n\nDifferences: the lobby’s street door sits at the west end of its street wall so it opens onto the street.',
};
function openArchive() {
  const tabs = [['all', 'ALL'], ...LIBRARY.tabs.filter((t2) => t2[0] !== 'all'), ['places', 'PLACES'], ['towers', 'TOWERS'], ['systems', 'SYSTEMS'], ['made', 'HOW IT WAS MADE']];
  openPanel('ARCHIVE TERMINAL // FEVER DREAM LIBRARY', tabs, (tab, q, body) => {
    if (ARCHIVE_PAGES[tab]) { const p = document.createElement('div'); p.className = 'lt-intro'; p.style.whiteSpace = 'pre-wrap'; p.textContent = ARCHIVE_PAGES[tab]; body.appendChild(p); return; }
    for (const d of LIBRARY.docs) {
      if (tab !== 'all' && d.kind !== tab) continue;
      if (q && !(d.title + ' ' + d.desc + ' ' + d.short).toLowerCase().includes(q)) continue;
      body.appendChild(panelRow('▤', d.title, d.pages ? `${d.pages} pp · ${d.size}` : d.size, d.desc, () => openWindow(d.title, new URL(d.url, location.href).href)));
    }
  }, true);
}
// ---- Trippy Cam: four tinted frames of the current view ----
let snapReq = false;
function snapDone() {
  snapReq = false; const src = renderer.domElement, w = 480, h = Math.round((480 * src.height) / src.width), tiles = [];
  for (const f of ['none', 'hue-rotate(90deg) saturate(2)', 'hue-rotate(200deg) saturate(2.4) contrast(1.2)', 'invert(1) hue-rotate(160deg)']) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const g = c.getContext('2d'); g.filter = f; g.drawImage(src, 0, 0, w, h); tiles.push(c.toDataURL('image/jpeg', 0.85));
  }
  openPanel('TRIPPY CAM', [], (t2, q, body) => {
    const grid = document.createElement('div'); grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px;padding:8px';
    tiles.forEach((u, k) => { const a = document.createElement('a'); a.href = u; a.download = `trippy-cam-${k + 1}.jpg`; const im = document.createElement('img'); im.src = u; im.alt = `Trippy Cam frame ${k + 1}`; im.style.cssText = 'width:100%;border:1px solid #ffb000;border-radius:6px'; a.appendChild(im); grid.appendChild(a); });
    body.appendChild(grid); const n = document.createElement('div'); n.className = 'lt-intro'; n.textContent = 'Tap a frame to save it. Nothing leaves this device.'; body.appendChild(n);
  });
}
const flashes = [];
function campus() {
  group(CP.x, 0, CP.z, 90, () => { lobbyShell(); lobbyFacade(); lobbyInterior(); for (let i = 0; i < 5; i++) theater(i); group(-34.4, 0, -16, 90, library); });
  // walkable: the entrance apron, the lobby floor, the library passage and the library
  lobbyRect(-19.6, -15.2, 18.5, 22.6); lobbyRect(-21.6, 21.6, -19.6, 19.6); lobbyRect(-23.4, -21, -17.6, -14.4); libRect(-10.6, 10.6, -11.6, 11.6);
}
function campusTick(t, dt) {
  if (looked() && document.querySelector('.lt.on, .wp-ov.on')) document.exitPointerLock();
  activeVideo = null;
  const inCx = player.floor === 0 && player.x > 34 && player.x < 98 && player.z < -62 && player.z > -114; if (inCx !== campusTick.cx) { campusTick.cx = inCx; $('backBtn').style.display = inCx ? '' : 'none'; }
  for (const f of flashes) { f.t -= dt; if (f.t < 0) { f.m.visible = true; f.t = 0.8 + Math.random() * 2.6; f.off = 0.07; } else if (f.m.visible) { f.off -= dt; if (f.off < 0) f.m.visible = false; } }
  for (const ts of tScreens) {
    if (!ts.list) continue;
    const lx = CP.z - player.z, lz = player.x - CP.x, inside = player.floor === 0 && Math.abs(lx - THX[ts.i]) < 4 && lz > -35 && lz < -20.2;
    if (inside && ts.playing) activeVideo = ts.video;
    if (inside && !ts.playing && !ts.requested) { ts.requested = true; nextTheaterVideo(ts, 0); }
    if (!inside && ts.playing) { ts.video.pause(); ts.playing = false; ts.requested = false; ts.mesh.material = ts.mat; }
    if (inside && ts.playing && ts.video.paused && !ts.video.ended) ts.video.play().catch(() => { });
  }
}

// ---- doors that lead to a place in this world warp there; the rest show a card with the page one click away in a window ----
function warpFor(url) {
  const cx = (sx, sz) => [CX.x - sx, CX.z + sz];
  const W = {
    'index.html': [18, -76, face(-1, -1)], 'warehouse.html': [...cx(0, 17), face(0, -1)],
    'lobby.html': [...cw(-15.5, 15.2), face(-1, 0)], 'store.html': [...cw(-12, 14.2), face(1, 0)], 'library.html': [...cw(-25.4, -16), face(0, 1)],
    'studio.html': [...cx(-18, 0), face(1, 0)], 'horrorcore.html': [...cx(-18, -14), face(1, 0)], 'abstract.html': [...cx(19, -9), face(-1, 0)], 'arcade.html': [...cx(19, -1), face(-1, 0)],
    'screening.html?room=chroma25': [...cw(THX[3], -22.6), face(-1, 0)], 'screening.html?room=chroma': [...cx(14, 13), face(-1, 0)],
  };
  return W[url] || null;
}
const MIDWAY_GAMES = /^games\/|^(arcade|gamecity|race|bullethell|gameroom)\.html$|^classic\//;
function useDoor(url, label, sub) {
  if (MIDWAY_GAMES.test(url) && url !== 'arcade.html') { ride.on = false; teleport(-33, -134, 0, face(-1, 0)); say(`${label.toLowerCase()} — every game lives in the midway`); return; }
  const w = warpFor(url);
  if (w) { ride.on = false; teleport(w[0], w[1], 0, w[2]); say(`→ ${label.toLowerCase()}`); return; }
  const full = /^https?:/.test(url) ? url : new URL(url, location.href).href;
  openPanel(label, [], (t2, q, body) => {
    const p = document.createElement('div'); p.className = 'lt-intro'; p.textContent = sub ? sub.toUpperCase() : 'A PAGE OF THE 12MATT3R SITE'; body.appendChild(p);
    const n = document.createElement('div'); n.className = 'lt-intro'; n.textContent = 'This door has no room of its own in the Underground yet. It opens in a window, so you stay right here.'; body.appendChild(n);
    const b = document.createElement('button'); b.className = 'btn'; b.textContent = 'OPEN IN A WINDOW'; b.style.margin = '6px 4px'; b.onclick = () => { $('panel').classList.remove('on'); openWindow(label, full); }; body.appendChild(b);
  });
}

// ---- the first festival's features, brought over: ground litter, the trash hunt, and the dealer ----
let fx = null;
const DRUGS = [
  { id: 'trip', name: 'TRIP', dur: 30, note: 'the signature: the whole world goes rainbow.' }, { id: 'crt', name: 'CRT', dur: 25, note: 'tube glow, over-bright and crunchy.' }, { id: 'vhs', name: 'VHS', dur: 25, note: 'smeared colour, bad tracking.' },
  { id: 'ascii', name: 'ASCII', dur: 25, note: 'everything in hard black and white.' }, { id: 'gameboy', name: 'GAMEBOY', dur: 25, note: 'four shades of green.' }, { id: 'wireframe', name: 'WIREFRAME', dur: 25, note: 'inverted, outlined, cold.' },
  { id: 'everything', name: 'EVERYTHING', dur: 60, note: 'all of it, one after another.' },
];
const DRUG_FILTER = { crt: 'contrast(1.25) saturate(1.4) brightness(1.1)', vhs: 'saturate(1.7) hue-rotate(-14deg) blur(0.7px) contrast(1.1)', ascii: 'grayscale(1) contrast(2.2)', gameboy: 'grayscale(1) sepia(1) hue-rotate(45deg) saturate(2.6) contrast(1.3)', wireframe: 'invert(1) grayscale(1) contrast(2.4)' };
let drug = null, drugT = 0;
function festExtras() {
  const g = new THREE.Group(); g.rotation.y = Math.PI; g.position.z = -FZ; scene.add(g);   // festival-local (x, z) → world (−x, FZ + z)
  buildLitter(g, { count: 520, area: [54, 56], center: [0, -2], avoid: [[0, -26, 12], [-13, -13, 2]] });
  const hud = document.createElement('div'); hud.style.cssText = 'position:fixed;left:16px;bottom:130px;z-index:8;font:12px ui-monospace,monospace;letter-spacing:.1em;color:#9af7d0;background:rgba(0,0,0,.55);border:1px solid rgba(154,247,208,.4);border-radius:8px;padding:6px 10px;display:none'; document.body.appendChild(hud);
  const upd = (st) => { hud.style.display = 'block'; hud.textContent = `TRASH ${st.dumped}/${st.total}${st.held ? ` · carrying ${st.held}` : ''}`; };
  const trash = buildTrash(g, { dumpsterPos: [-22, -12], store: '12m.trash', onPickup: (l, st) => { say(`picked up ${l}`); upd(st); }, onDeposit: (n, st) => { say(n === 1 ? 'tossed it in the dumpster' : `dumped ${n} pieces`); upd(st); },
    onComplete: (st) => { upd(st); say('THE GROUNDS ARE CLEAN — a thank-you is downloading'); const a = document.createElement('a'); a.href = import.meta.env.BASE_URL + 'secret/cleanup-reward.txt'; a.download = '12matt3r-secret-drop.txt'; a.click(); } });
  const dealer = buildDealer(g, { pos: [-13, -13], stageZ: -24, onToggle: () => { if (!$('panel').classList.contains('on')) openDealer(); } });
  fx = { trash, dealer, lp: new THREE.Vector3() };
}
function openDealer() {
  openPanel('THE DEALER // what you havin’?', [], (t2, q, body) => {
    for (const d of DRUGS) body.appendChild(panelRow('💊', d.name, `${d.dur}s`, d.note, () => { $('panel').classList.remove('on'); drug = d; drugT = d.dur; say(`${d.name} — ${d.dur}s. Enjoy.`); }));
    if (drug) body.appendChild(panelRow('✖', 'COME DOWN', '', 'end the trip now.', () => { $('panel').classList.remove('on'); drug = null; drugT = 0; canvas.style.filter = ''; say('back to earth'); }));
  });
}
function festExtrasTick(t, p, dt) {
  if (!fx) return;
  fx.lp.set(-player.x, 0, 94 + player.z);   // player in festival-local space
  const near = player.floor === 0 && player.z < -60 && player.z > -130 && Math.abs(player.x) < 40;
  fx.trash.update(dt, t, p, near ? fx.lp : null); fx.dealer.update(dt, t, p, near ? fx.lp : null, !!drug);
  if (drug) {
    drugT -= dt; const id = drug.id === 'everything' ? ['trip', 'crt', 'vhs', 'ascii', 'gameboy', 'wireframe'][Math.floor(t / 5) % 6] : drug.id;
    canvas.style.filter = id === 'trip' ? `hue-rotate(${(t * 70) % 360}deg) saturate(2.4) contrast(1.15)` : DRUG_FILTER[id];
    if (drugT <= 0) { drug = null; canvas.style.filter = ''; say('you come down'); }
  }
}
// ---- assemble ----
mkScreen('main', null, 0x0f2b6a, 0x7a22d8); mkScreen('vip', null, 0x6a2a10, 0x3a1088);
arenaShell(); arena(); vip(); lobby(); gallery();
group(-14, 0, 43, 0, arcade);
cinemaLobby(); TOWERS.forEach(buildTower); street(); festival(); midway(); complex(); campus(); festExtras();
group(15, 0, 59, 0, mainCinema);
group(37, 0, 46, 0, privateCinema);
// walkable rects for the wings (world Unity coords)
rect(-24.8, -3.2, 34.2, 51.8);                 // arcade
rect(3.4, 26.6, 46.4, 71.6);                   // main auditorium
for (let r = 0; r < 7; r++) { const z0 = 48.875 + r * 2.25, hh = (7 - r) * 0.32; if (r === 0) { solid(6.4, 26.6, z0, z0 + 0.75, hh); solid(4, 26.6, z0 + 0.75, z0 + 2.25, hh); } else solid(4, 26.6, z0, z0 + 2.25, hh); }   // the terraces: climb them by the entry stair or from the screen end
rect(28.4, 45.6, 36.4, 55.6);                  // private cinema
flush();
// screens' meshes: find the quads by their material and remember them for swapping
scene.traverse((o) => { if (o.isMesh) for (const k of ['main', 'vip']) if (o.material === screens[k].mat) screens[k].mesh = o; });
// show lights on the stage walls
const ledMats = [ledA, ledB];

// ---- festival animated bits: sweeping moving heads, laser fan, flames, spinners ----
const sweeps = [];
for (const h of heads) {
  const a = new THREE.Vector3(...h.a), b = new THREE.Vector3(...h.b), len = a.distanceTo(b), sway = new THREE.Group(), pivot = new THREE.Object3D();
  sway.position.copy(a); sway.add(pivot); pivot.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), b.clone().sub(a).normalize());
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.05, len, 10, 1, true), hazeMat(h.hex, 0.11)); m.rotation.x = Math.PI / 2; m.position.z = len / 2; pivot.add(m); scene.add(sway); sweeps.push({ sway, ph: h.ph, mat: m.material });
}
const laserMats = [];
for (const L of lasers) {
  const pos = []; for (const e of L.ends) pos.push(...L.o, ...e); const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const lm = new THREE.LineBasicMaterial({ color: 0x38ff14, transparent: true, opacity: 0.3, toneMapped: false }); scene.add(new THREE.LineSegments(g, lm)); laserMats.push(lm);
}
function festTick(t, p, dt) {
  for (const s of spinners) s.g.rotation.y += s.v * dt;
  for (const f of flames) { f.scale.set(1 + 0.15 * Math.sin(t * 13), 1 + 0.25 * Math.sin(t * 9 + 1), 1 + 0.15 * Math.cos(t * 11)); }
  for (const sw of sweeps) { sw.sway.rotation.y = Math.sin(t * 0.7 + sw.ph) * 0.35; sw.mat.opacity = 0.07 + 0.08 * p; }
  laserDrop = Math.max(0, laserDrop - dt); for (const m of laserMats) m.opacity = laserDrop > 0 ? 0.95 : 0.12 + 0.35 * p;
  for (const [m, hx] of pulsers) m.color.setHex(hx).multiplyScalar(0.8 + 0.35 * p);
  festCrowd(t, p + crowdKick * 0.8);
}

// ---- player ----
const face = (dx, dz) => Math.atan2(-dx, dz);   // yaw that looks along (dx, dz) in Unity coords
const player = { pos: new THREE.Vector3(0, 1.65, 0), x: 0, z: -33, h: 0, yaw: 0, pitch: -0.04, keys: new Set(), target: null, floor: 0 };
const R = 0.4;
function heightAt(x, z, prev) {
  if (player.floor > 0) return fy(player.floor);
  const c = [0], ax = Math.abs(x), az = Math.abs(z);
  if (az < 7.5) { if (ax >= 16.95 && ax <= 23.4) c.push(1.3); else if (ax > 16.2 && ax < 16.95) c.push(1.3 * (1 - (ax - 16.2) / 0.75)); }   // DJ decks + entry steps
  if (ax < 2.25 && az > 8 && az < 19.5) c.push(Math.min(4, Math.max(0, ((az - 8.25) / 11) * 4)));                                            // VIP stairs
  if (ax < 15.5 && az > 18 && az < 24) c.push(4);                                                                                           // VIP balconies
  if (ax < 15 && z > -125 && z < -115) c.push(1.6); else if (ax < 8 && z >= -115 && z < -112) c.push((1.6 * (-112 - z)) / 3);   // festival main stage + its crowd ramp
  if (x > 4 && x < 26 && z > 47 && z < 71) c.push((7 - THREE.MathUtils.clamp(Math.floor((z - 48.875) / 2.25), 0, 7)) * 0.32);              // auditorium terraces
  if (x > 3.7 && x < 6.3 && z > 45.6 && z < 49.6) c.push(Math.min(2.24, (Math.floor((z - 45.6) / 0.4) + 1) * 0.224));                        // auditorium entry stair
  let best = 0; for (const v of c) if (v <= prev + 0.6 && v > best) best = v; return best;
}
const inTowerRect = (x, z) => Math.abs(x) > 24.6 && Math.abs(x) < 40.8 && z > 24.6 && z < 33.4;
const inCircle = (x, z) => circles.some((c) => (x - c.cx) ** 2 + (z - c.cz) ** 2 < c.r * c.r);
const inRects = (x, z, upper) => player.floor > 0 ? inTowerRect(x, z) : inCircle(x, z) || rects.some((r) => (upper || !r.u) && (!r.gate || r.gate()) && x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1);
const blocked = (x, z) => player.floor === 0 && solids.some((b) => (!b.h || player.h < b.h - 0.6) && x > b.x0 - R && x < b.x1 + R && z > b.z0 - R && z < b.z1 + R);
const okAt = (x, z, upper) => inRects(x, z, upper) && !blocked(x, z);
function step(dx, dz) {
  const up = player.h > 2.5;
  if (okAt(player.x + dx, player.z + dz, up)) { player.x += dx; player.z += dz; }
  else if (okAt(player.x + dx, player.z, up)) player.x += dx;
  else if (okAt(player.x, player.z + dz, up)) player.z += dz;
}
const easeAngle = (a, b, t) => a + (((b - a + Math.PI) % (Math.PI * 2)) - Math.PI) * t;
function moveUpdate(dt) {
  const k = player.keys, fwd = (k.has('w') || k.has('arrowup') ? 1 : 0) - (k.has('s') || k.has('arrowdown') ? 1 : 0), str = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0);
  const sp = 5 * (k.has('shift') ? 1.8 : 1);
  if (ride.on) {   // elevator: glide the camera up/down, then land on the new floor
    ride.t += dt; const e = Math.min(1, ride.t / ride.dur), q = e * e * (3 - 2 * e);
    player.h = ride.from + (ride.to - ride.from) * q;
    if (e >= 1) { ride.on = false; player.floor = ride.target; player.h = ride.to; player.x = 39.6 * ride.sx; player.z = 29; player.yaw = face(-ride.sx, 0); player.target = null; say(`floor ${ride.target} — ${(ride.sx < 0 ? TOWERS[1] : TOWERS[0]).floors[ride.target].name}`); }
    camera.position.set(player.x, 1.65 + player.h, -player.z); camera.lookAt(camera.position.x - Math.sin(player.yaw), camera.position.y + Math.sin(player.pitch) * 0.2, camera.position.z - Math.cos(player.yaw)); return;
  }
  // view yaw is in three space; Unity z = -three z, so heading in Unity coords is (−sin, +cos)·…
  const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
  if (fwd || str) { const vx = -s * fwd + c * str, vz = -c * fwd - s * str, l = Math.hypot(vx, vz) || 1; step((vx / l) * sp * dt, -(vz / l) * sp * dt); player.target = null; }
  else if (player.target) {
    const dx = player.target.x - player.x, dz = player.target.z - player.z, d = Math.hypot(dx, dz);
    if (d < 0.5) player.target = null; else { step((dx / d) * 5 * dt, (dz / d) * 5 * dt); player.yaw = easeAngle(player.yaw, Math.atan2(-dx, dz), 1 - Math.pow(0.002, dt)); }
  }
  const h = heightAt(player.x, player.z, player.h); player.h += (h - player.h) * Math.min(1, dt * 9);
  camera.position.set(player.x, 1.65 + player.h, -player.z);
  const t = new THREE.Vector3(camera.position.x - Math.sin(player.yaw) * Math.cos(player.pitch), camera.position.y + Math.sin(player.pitch), camera.position.z - Math.cos(player.yaw) * Math.cos(player.pitch));
  camera.lookAt(t);
}
function teleport(x, z, h = 0, yaw = null) { player.floor = 0; player.x = x; player.z = z; player.h = h; player.target = null; if (yaw !== null) player.yaw = yaw; }

// ---- input ----
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let down = null, dragged = false;
const looked = () => document.pointerLockElement === canvas;
function clickAt(nx, ny, walk) {
  ndc.x = nx; ndc.y = ny; ray.setFromCamera(ndc, camera);
  if (fx && (fx.trash.tryClick(ray) || fx.dealer.tryClick(ray))) return true;
  const hit = ray.intersectObjects(hits.map((h) => h.mesh), false)[0];
  if (hit) { hits.find((h) => h.mesh === hit.object).run(); return true; }
  if (walk) { const g = new THREE.Plane(new THREE.Vector3(0, 1, 0), -player.h); const p = ray.ray.intersectPlane(g, new THREE.Vector3()); if (p) player.target = { x: p.x, z: -p.z }; }
  return false;
}
// mouse: click once to capture the pointer and look around freely; Esc lets go. Touch keeps drag-to-look and tap-to-walk.
canvas.addEventListener('pointerdown', (e) => {
  userGesture = true;
  if (e.pointerType === 'mouse') { if (looked()) { clickAt(0, 0, false); return; } down = { x: e.clientX, y: e.clientY, id: e.pointerId, mouse: true }; dragged = false; return; }
  canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag');
});
document.addEventListener('mousemove', (e) => {
  if (!looked()) return;
  player.yaw -= e.movementX * 0.0022; player.pitch = THREE.MathUtils.clamp(player.pitch - e.movementY * 0.0022, -0.7, 0.6);
});
canvas.addEventListener('pointermove', (e) => {
  if (!down || down.mouse || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  player.yaw -= (e.movementX || dx * 0.2) * 0.0045; player.pitch = THREE.MathUtils.clamp(player.pitch - (e.movementY || dy * 0.2) * 0.0045, -0.7, 0.6);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => {
  canvas.classList.remove('drag');
  if (down && down.mouse) { if (!clickAt((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, false) && canvas.requestPointerLock) canvas.requestPointerLock(); }
  else if (down && !dragged) clickAt((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1, true);
  down = null;
});
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
const MOVE = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'];
addEventListener('keydown', (e) => { userGesture = true; const k = e.key.toLowerCase(); if (MOVE.includes(k) && !document.querySelector('.wp-ov.on')) { player.keys.add(k); player.target = null; } });
addEventListener('keyup', (e) => player.keys.delete(e.key.toLowerCase()));
let activeVideo = null;   // the playing screen you are standing in front of; F sends it fullscreen (anything else: the whole page)
addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() !== 'f' || e.ctrlKey || e.metaKey || e.altKey || document.querySelector('.lt.on, .wp-ov.on')) return;
  if (document.fullscreenElement) { document.exitFullscreen(); return; }
  (activeVideo || document.documentElement).requestFullscreen?.().catch(() => { });
});
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- HUD ----
const toast = $('toast'); let toastT = 0;
function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 2600); }
function goTo(url, msg) { say(msg); $('warp').classList.add('go'); setTimeout(() => { location.href = url; }, 520); }
const spots = [
  ['🚪 Lobby', 0, -33, 0, face(0, 1), true], ['🎧 Arena', 0, -12, 0, face(0, 1)], ['◀ Stage A', -14, 0, 0, face(-1, 0)], ['Stage B ▶', 14, 0, 0, face(1, 0)],
  ['🥂 VIP balcony', 0, -21, 4, face(0, 1)], ['🕹 Arcade', -14, 38, 0, face(0, 1)], ['🎬 Cinema', 15, 40, 0, face(0, 1)], ['🍿 Main screen', 15, 52, 2.2, face(0, 1)], ['🛋 Private', 33, 41, 0, face(1, 0)], ['🌃 The street', 0, -44, 0, face(0, -1)], ['🎪 Festival gate', 18, -57, 0, face(0, -1)], ['🏢 Tower · museum', 32, 29, 0, face(1, 0)], ['🗄 The Archive', -32, 29, 0, face(-1, 0)],
];
for (const [label, x, z, h, yaw, hot] of spots) { const b = document.createElement('button'); b.className = `btn${hot ? ' hot' : ''}`; b.textContent = label; b.onclick = () => teleport(x, z, h, yaw); $('goRow').appendChild(b); }
$('liftX').onclick = () => $('lift').classList.remove('on');
$('lift').addEventListener('pointerdown', (e) => { if (e.target === $('lift')) $('lift').classList.remove('on'); });
$('backBtn').onclick = () => { teleport(-38.5, -48, 0, face(1, 0)); say('back on the street'); };

// =====================================================================================
//  THE EXPLORER LAYER (from the Unity "polish pass"): access passport, map + beacon, finale
// =====================================================================================
const STAMPS = [['DJ BATTLE', 'Vote for a DJ at a kiosk in the arena (or press 1 / 2).'], ['VIP DECK', 'Walk up the stairs onto a VIP balcony.'], ['NEON PULSE', 'Win NEON PULSE: the first cabinet in the arcade.'], ['MAIN CINEMA', 'Use the main screen desk in the Cinema Society.'], ['PRIVATE CINEMA', 'Use the private screen desk in the private cinema.']];
let stamps = [false, false, false, false, false], score = [0, 0], fxOn = true, finaleDone = false;
try { const sv = JSON.parse(localStorage.getItem('ug:stamps') || 'null'); if (Array.isArray(sv) && sv.length === 5) stamps = sv.map(Boolean); finaleDone = localStorage.getItem('ug:finale') === '1'; } catch (e) { /* storage unavailable */ }
const stampCount = () => stamps.filter(Boolean).length;
let actx = null;
function cue(big) {
  if (!fxOn) return;
  try {
    actx ||= new (window.AudioContext || window.webkitAudioContext)();
    const notes = big ? [523.25, 659.25, 783.99, 1046.5, 1318.5] : [880, 1318.5], t0 = actx.currentTime + 0.02;
    notes.forEach((f, i) => { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0 + i * 0.11); g.gain.exponentialRampToValueAtTime(0.12, t0 + i * 0.11 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + i * 0.11 + 0.38); o.connect(g).connect(actx.destination); o.start(t0 + i * 0.11); o.stop(t0 + i * 0.11 + 0.4); });
  } catch (e) { /* audio blocked */ }
}
function updatePassport() {
  const n = stampCount(); $('passN').textContent = `${n} / 5`; $('passSub').textContent = finaleDone ? 'ALL ACCESS GRANTED' : n === 5 ? 'GO TO THE SHOW DESK · LAUNCH THE FINALE' : 'EXPLORE · INTERACT · UNLOCK THE FINALE';
  $('lineupSc').textContent = `LINEUP ${lineup.size} / ${LINEUP_N}`; $('scoreA').textContent = String(score[0]).padStart(2, '0'); $('scoreB').textContent = String(score[1]).padStart(2, '0');
  try { localStorage.setItem('ug:stamps', JSON.stringify(stamps)); } catch (e) { /* ignore */ }
  if ($('passport').classList.contains('on')) renderPassport();
}
function stamp(i, label) {
  if (stamps[i]) return; stamps[i] = true; cue(false); updatePassport();
  say(`ACCESS STAMP ${stampCount()}/5 — ${label} DISCOVERED`);
}
function vote(dj) {
  score[dj] += 3; updatePassport(); stamp(0, 'DJ BATTLE'); say(`${dj ? 'VIOLET' : 'CYAN'} SELECTED — the crowd roars (+3)`);
  crowdKick = 1;
}
let crowdKick = 0;
function showDesk() {
  if (stampCount() === 5) launchFinale(); else { toggleMusic(); say(`SHOW DESK — ${stampCount()}/5 stamps. Collect them all to unlock the finale.`); }
}
function nextStop() {
  const i = stamps.findIndex((x) => !x); if (i < 0) return finaleDone ? 'All access granted — replay the finale at the show desk.' : 'Return to the arena show desk and launch the finale.';
  return STAMPS[i][1];
}
function renderPassport() {
  const el = $('passBody'); el.replaceChildren();
  const next = document.createElement('div'); next.className = 'lt-intro'; next.textContent = `NEXT STOP — ${nextStop()}`; el.appendChild(next);
  STAMPS.forEach(([n, how], i) => { const r = document.createElement('div'); r.className = 'lt-row'; r.style.cursor = 'default'; r.innerHTML = `<span class="ic">${stamps[i] ? '✔' : '○'}</span><span><span class="t"></span><span class="d"></span></span>`; r.querySelector('.t').textContent = `0${i + 1}  ${n}`; r.querySelector('.d').textContent = stamps[i] ? 'Stamped.' : how; el.appendChild(r); });
  const row = document.createElement('div'); row.style.cssText = 'display:flex;gap:8px;flex-wrap:wrap;padding:12px 4px';
  const mk = (label, fn) => { const b = document.createElement('button'); b.className = 'btn'; b.textContent = label; b.onclick = fn; row.appendChild(b); return b; };
  mk(`FX: ${fxOn ? 'ON' : 'OFF'}`, () => { fxOn = !fxOn; renderPassport(); });
  mk('RESTART TOUR', () => { stamps = [false, false, false, false, false]; score = [0, 0]; finaleDone = false; try { localStorage.removeItem('ug:finale'); } catch (e) { /* ignore */ } updatePassport(); say('tour restarted'); });
  if (stampCount() === 5) mk('LAUNCH FINALE', () => { $('passport').classList.remove('on'); launchFinale(); });
  el.appendChild(row);
}
// ---- map: 14 destinations, WALK sets a beacon, GO jumps there ----
const DEST = [
  ['ARRIVAL LOUNGE', 0, -33, 0, face(0, 1)], ['CONCERT ARENA', 0, -14, 0, face(0, 1)], ['VIP DECK', 0, -20.5, 4, face(0, 1)], ['NEON ARCADE', -14, 38, 0, face(0, 1)], ['CINEMA SOCIETY', 15, 40, 0, face(0, 1)],
  ['PRIVATE CINEMA', 33, 41, 0, face(1, 0)], ['THE STREET', 0, -44, 0, face(0, -1)], ['THE FESTIVAL', 0, -70, 0, face(0, -1)], ['THE MIDWAY', -33, -134, 0, face(-1, 0)],
  ['THE COMPLEX', 66, -59, 0, face(0, -1)], ['THE MOVIE THEATER', ...cw(-15.5, 15.2), 0, face(-1, 0)], ['FEVER DREAM LIBRARY', ...cw(-25.4, -16), 0, face(0, 1)], ['THE ROOMS TOWER', 32, 29, 0, face(1, 0)], ['THE ARCHIVE TOWER', -32, 29, 0, face(-1, 0)],
];
function renderMap() {
  const el = $('mapBody'); el.replaceChildren();
  DEST.forEach(([name, x, z, h, yaw, url], i) => {
    const r = document.createElement('div'); r.className = 'lt-row'; r.style.cursor = 'default';
    r.innerHTML = `<span class="ic">${String(i + 1).padStart(2, '0')}</span><span style="flex:1"><span class="t"></span><span class="d"></span></span><span class="acts"></span>`;
    r.querySelector('.t').textContent = name; r.querySelector('.d').textContent = url ? `opens ${url}` : (h > 0 ? 'upstairs' : '');
    const acts = r.querySelector('.acts');
    const walk = document.createElement('button'); walk.className = 'btn'; walk.textContent = 'WALK'; walk.onclick = () => { setBeacon(i); $('map').classList.remove('on'); };
    const go = document.createElement('button'); go.className = 'btn'; go.textContent = 'GO'; go.onclick = () => { $('map').classList.remove('on'); if (url) goTo(url, `going to ${name.toLowerCase()}…`); else teleport(x, z, h, yaw); };
    acts.append(walk, go); r.querySelector('.acts').style.cssText = 'display:flex;gap:6px'; el.appendChild(r);
  });
}
// ---- beacon: a small route graph over the walked routes; shows the next landmark + distance, never moves you ----
const NODES = {}, EDGES = [];
const node = (k, x, z) => { NODES[k] = [x, z]; }, edge = (a, b) => EDGES.push([a, b]);
node('balcony', 0, -20); node('vip', 7, -19); node('stair', 0, -6); node('aisle', 3.5, -6); node('entry', 3.5, -25); node('lounge', 0, -33); node('outside', 0, -43.4);
node('vote', -14.1, -5.6); node('desk', 0, -5); node('gallery', 3.5, 26); node('mid', 0, 29); node('west', -14, 29); node('arcade', -14, 36.5); node('game', -21.2, 37.5);
node('east', 12, 29); node('cinema', 12, 40); node('screen', 10.5, 44.3); node('privHall', 15, 40); node('priv', 31, 41); node('rooms', 22, 29); node('roomsIn', 31, 29); node('archive', -22, 29); node('archiveIn', -31, 29);
node('crossing', 18, -44); node('gate', 18, -59); node('street', 0, -52); node('westEnd', -38, -43); node('eastRoad', 66, -52); node('complexDoor', 66, -59.5);
node('lobbyDoor', ...cw(-17.4, 21)); node('lobbyIn', ...cw(-17.4, 14)); node('lobbyHall', ...cw(-8, 4)); node('libDoor', ...cw(-22, -16)); node('libIn', ...cw(-27, -16));
[['balcony', 'vip'], ['balcony', 'stair'], ['stair', 'aisle'], ['aisle', 'entry'], ['entry', 'lounge'], ['lounge', 'outside'], ['stair', 'vote'], ['stair', 'desk'], ['aisle', 'gallery'], ['gallery', 'mid'], ['mid', 'west'], ['west', 'arcade'], ['arcade', 'game'],
  ['mid', 'east'], ['east', 'cinema'], ['cinema', 'screen'], ['cinema', 'privHall'], ['privHall', 'priv'], ['east', 'rooms'], ['rooms', 'roomsIn'], ['west', 'archive'], ['archive', 'archiveIn'],
  ['outside', 'crossing'], ['crossing', 'gate'], ['outside', 'street'], ['street', 'westEnd'], ['westEnd', 'lobbyDoor'], ['lobbyDoor', 'lobbyIn'], ['lobbyIn', 'lobbyHall'], ['lobbyHall', 'libDoor'], ['libDoor', 'libIn'], ['crossing', 'eastRoad'], ['eastRoad', 'complexDoor']].forEach(([a, b]) => edge(a, b));
function nearestNode(x, z) { let best = null, d = 1e9; for (const [k, [nx, nz]] of Object.entries(NODES)) { const dd = (nx - x) ** 2 + (nz - z) ** 2; if (dd < d) { d = dd; best = k; } } return best; }
function route(x, z, gx, gz) {
  const start = nearestNode(x, z), end = nearestNode(gx, gz), dist = {}, prev = {}, todo = new Set(Object.keys(NODES));
  for (const k of todo) dist[k] = Infinity; dist[start] = 0;
  while (todo.size) { let u = null; for (const k of todo) if (u === null || dist[k] < dist[u]) u = k; if (dist[u] === Infinity || u === end) break; todo.delete(u); for (const [a, b] of EDGES) { const v = a === u ? b : b === u ? a : null; if (!v) continue; const dd = dist[u] + Math.hypot(NODES[u][0] - NODES[v][0], NODES[u][1] - NODES[v][1]); if (dd < dist[v]) { dist[v] = dd; prev[v] = u; } } }
  const out = []; for (let n = end; n; n = prev[n]) { out.push(NODES[n]); if (n === start) break; } out.reverse(); out.push([gx, gz]);
  while (out.length > 1 && Math.hypot(out[0][0] - x, out[0][1] - z) < 2) out.shift();
  return out;
}
let beacon = null;
function setBeacon(i) { beacon = i; say(`WALK — beacon set to ${DEST[i][0]}`); }
function updateBeacon() {
  const el = $('beacon');
  if (beacon === null) { el.classList.remove('on'); return; }
  const [name, gx, gz, , , url] = DEST[beacon]; let tx = gx, tz = gz;
  if (player.floor > 0 || ride.on) { el.classList.add('on'); $('bText').textContent = `${name} — take the elevator`; $('bArrow').style.transform = 'rotate(0deg)'; return; }
  const r = route(player.x, player.z, gx, gz); [tx, tz] = r[0] || [gx, gz];
  const dxT = tx - player.x, dzT = tz - player.z, fx = -Math.sin(player.yaw), fz = Math.cos(player.yaw), dot = fx * dxT + fz * dzT, cross = fx * dzT - fz * dxT;
  const deg = (Math.atan2(-cross, dot) * 180) / Math.PI, total = Math.hypot(gx - player.x, gz - player.z);
  if (total < 3) { beacon = null; el.classList.remove('on'); say(`arrived — ${name}`); return; }
  el.classList.add('on'); $('bArrow').style.transform = `rotate(${deg}deg)`; $('bText').textContent = `${name} · ${Math.round(total)} m`;
}
// ---- NEON PULSE: tap/space when the ring meets the target; 3 hits in 5 tries unlocks the arcade stamp ----
let pulse = null;
function openPulse() {
  const el = $('pulse'); el.classList.add('on'); player.keys.clear(); pulse = { t: 0, hits: 0, tries: 0, last: 0, done: false };
  $('pulseMsg').textContent = 'Hit SPACE (or tap) as the ring meets the target.'; pulseDraw();
}
function pulseDraw() {
  if (!pulse) return; const c = $('pulseCv'), g = c.getContext('2d'), w = c.width, h = c.height; g.clearRect(0, 0, w, h);
  const ph = (pulse.t % 1.6) / 1.6, r = 140 * (1 - ph) + 28, ok = Math.abs(r - 60) < 14;
  g.strokeStyle = '#a326ff'; g.lineWidth = 5; g.beginPath(); g.arc(w / 2, h / 2, 60, 0, 7); g.stroke();
  g.strokeStyle = ok ? '#39ff14' : '#10c4ff'; g.lineWidth = 7; g.beginPath(); g.arc(w / 2, h / 2, r, 0, 7); g.stroke();
  g.fillStyle = '#fff'; g.font = '16px monospace'; g.textAlign = 'center'; g.fillText(`HITS ${pulse.hits}/3   ·   TRIES ${pulse.tries}/5`, w / 2, h - 14);
}
function pulseHit() {
  if (!pulse || pulse.done) return; const ph = (pulse.t % 1.6) / 1.6, r = 140 * (1 - ph) + 28; pulse.tries++;
  if (Math.abs(r - 60) < 14) { pulse.hits++; cue(false); $('pulseMsg').textContent = 'HIT!'; } else $('pulseMsg').textContent = 'miss';
  if (pulse.hits >= 3) { pulse.done = true; $('pulseMsg').textContent = 'PULSE MASTER — 3 hits. Arcade stamp unlocked.'; stamp(2, 'NEON PULSE'); setTimeout(() => $('pulse').classList.remove('on'), 1600); }
  else if (pulse.tries >= 5) { pulse.done = true; $('pulseMsg').textContent = 'out of tries — walk up and play again'; setTimeout(() => $('pulse').classList.remove('on'), 1500); }
}
// ---- finale: winning DJ, score, bounded neon confetti, a synthesized cue ----
function launchFinale() {
  finaleDone = true; try { localStorage.setItem('ug:finale', '1'); } catch (e) { /* ignore */ } updatePassport();
  const win = score[0] >= score[1] ? 0 : 1; $('finaleBody').textContent = `${win ? 'DJ VIOLET' : 'DJ CYAN'} WINS THE NIGHT  ·  ${score[0]} – ${score[1]}`;
  $('finale').classList.add('on'); cue(true); confetti();
}
function confetti() {
  const c = $('confetti'), g = c.getContext('2d'); c.width = innerWidth; c.height = innerHeight;
  const cols = ['#10c4ff', '#a326ff', '#ff8829', '#39ff14', '#ff2bd0'], ps = Array.from({ length: 140 }, () => ({ x: Math.random() * c.width, y: -20 - Math.random() * c.height * 0.5, vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3, r: 3 + Math.random() * 4, c: cols[(Math.random() * cols.length) | 0] }));
  let t = 0; const tick = () => { g.clearRect(0, 0, c.width, c.height); t++; for (const p of ps) { p.x += p.vx; p.y += p.vy; g.fillStyle = p.c; g.fillRect(p.x, p.y, p.r, p.r * 1.6); } if (t < 280 && $('finale').classList.contains('on')) requestAnimationFrame(tick); else g.clearRect(0, 0, c.width, c.height); };
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) tick();
}
for (const [id, close] of [['map', 'mapX'], ['passport', 'passX'], ['pulse', 'pulseX'], ['finale', 'finaleX'], ['panel', 'panelX']]) { $(close).onclick = () => { $(id).classList.remove('on'); pulse = id === 'pulse' ? null : pulse; }; $(id).addEventListener('pointerdown', (e) => { if (e.target === $(id)) { $(id).classList.remove('on'); if (id === 'pulse') pulse = null; } }); }
$('mapBtn').onclick = () => { renderMap(); $('map').classList.add('on'); player.keys.clear(); };
$('passBtn').onclick = () => { renderPassport(); $('passport').classList.add('on'); player.keys.clear(); };
$('pulseCv').addEventListener('pointerdown', pulseHit);
addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase(), open = document.querySelector('.lt.on, .wp-ov.on');
  if (k === 'escape') { document.querySelectorAll('.lt.on').forEach((n) => n.classList.remove('on')); pulse = null; return; }
  if (pulse && k === ' ') { e.preventDefault(); pulseHit(); return; }
  if (open) return;
  if (k === 'm') $('mapBtn').click(); else if (k === 'p') $('passBtn').click(); else if (k === '1') vote(0); else if (k === '2') vote(1);
});
updatePassport();
setTimeout(() => { if (stampCount() === 0) say('WELCOME BELOW — collect five access stamps. Open the MAP (M) to begin.'); }, 1200);

let music = false;
function toggleMusic() { const b = document.querySelector('.gp-play'); if (b) b.click(); music = !music; say(music ? '♪ show on' : '♪ show paused'); }

// ---- show: simulated 120 BPM clock (as in the Unity project) pulses LEDs, neon, beams, crowd ----
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  uTime.value = t;
  const beat = (t * 2) % 1, p = Math.pow(1 - beat, 3);   // 120 BPM, bounded pulse (no strobe)
  const k = 0.82 + 0.28 * p;
  for (const key of ['cyan', 'violet', 'amber']) M[key].color.copy(BASE[key]).multiplyScalar(k);
  ledA.uniforms.k.value = ledB.uniforms.k.value = 0.9 + 0.35 * p;
  for (const m of pulseMats) m.opacity = 0.05 + 0.06 * p;
  for (const l of lights) l.userData.base ??= l.intensity, l.intensity = l.userData.base * (0.85 + 0.3 * p);
  crowd(t, p + crowdKick * 0.8); festTick(t, p, dt); cxTick(t, dt); campusTick(t, dt); festExtrasTick(t, p, dt);
  // play the cinema screens only while you're in them
  for (const [id, s] of Object.entries(screens)) {
    const r = id === 'main' ? [3.4, 26.6, 46.4, 71.6] : [28.4, 45.6, 36.4, 55.6], inside = player.x > r[0] && player.x < r[1] && player.z > r[2] && player.z < r[3];
    if (inside && s.playing) activeVideo = s.video;
    if (inside && !s.playing && !s.requested) { s.requested = true; nextVideo(id, 0); }
    if (!inside && s.playing) { s.video.pause(); s.playing = false; s.requested = false; if (s.mesh) s.mesh.material = s.mat; }
    if (inside && s.playing && s.video.paused && !s.video.ended) s.video.play().catch(() => { });
  }
  moveUpdate(dt);
  if (!stamps[1] && player.h > 3 && Math.abs(player.x) > 4 && Math.abs(player.z) > 16 && Math.abs(player.z) < 24) stamp(1, 'VIP DECK');
  if (pulse && !pulse.done) { pulse.t += dt; pulseDraw(); }
  updateBeacon(); crowdKick = Math.max(0, crowdKick - dt);
  for (const sl of sliders) { const near = Math.hypot(player.x - sl.cx, player.z - sl.cz) < 6.5 && player.floor === 0; sl.open += ((near ? 1 : 0) - sl.open) * Math.min(1, dt * 5); for (const pn of sl.panels) pn.g.position.x = pn.x0 + pn.dir * sl.open * sl.half * 0.46; }
  for (const d of doorTriggers) { const inside = !ride.on && d.floor === player.floor && player.x > d.x0 && player.x < d.x1 && player.z > d.z0 && player.z < d.z1; if (inside && d.armed) { d.armed = false; if (d.run) d.run(); else goTo(d.url, `entering ${d.label.toLowerCase()}…`); } else if (!inside) d.armed = true; }
  towerLights.forEach((l, k) => { const T = TOWERS[k], on = towerAt(player.x) === T && player.x * T.sx > 20, f = on ? player.floor : 0; l.position.set(T.sx * 34, fy(f) + 5, -29); l.color.setHex(T.floors[f].color); });
  renderer.render(scene, camera);
  if (snapReq) snapDone();
}
teleport(0, -33, 0, face(0, 1)); moveUpdate(0.016); renderer.render(scene, camera);
$('enterBtn').onclick = () => { userGesture = true; $('start').classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
if (import.meta.env.DEV || location.hash === '#debug') window.__ug = { openMuseumLift, openDealer, fx: () => fx, openLevels, rects, solids, circles, heightAt, okAt, warpFor, useDoor, openArchive, openPanel, theaterDesk, tScreens, player, scene, teleport, camera, rideTo, openLift, doorTriggers, TOWERS, startHide, hs, exploredC };
