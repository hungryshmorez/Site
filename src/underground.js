import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createReducedMotion } from './player/motion.js';
import { textPlane } from './scene/signs.js';
import { openWindow } from './ui/popup.js';
import { openVote } from './ui/vote.js';
import { LAB } from './data/catalog.js';
import { TTA_WIDE } from './data/tta.js';
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
const push = (x = 0, y = 0, z = 0, yaw = 0) => { stack.push(T.clone()); T = T.clone().multiply(new THREE.Matrix4().makeTranslation(x, y, z)).multiply(new THREE.Matrix4().makeRotationY(THREE.MathUtils.degToRad(yaw))); };
const pop = () => { T = stack.pop(); };
const group = (x, y, z, yaw, fn) => { push(x, y, z, yaw); fn(); pop(); };
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
function quad(mat, w, h, x, y, z, ry = 0) {   // Unity quads face -z with u running along +x
  const g = new THREE.PlaneGeometry(w, h), uv = g.attributes.uv;
  for (let i = 0; i < uv.count; i++) uv.setX(i, 1 - uv.getX(i));
  add(mat, g, place(x, y, z, 0, ry + 180, 0));
}
function flush() {   // mirror z (Unity is left-handed), fix winding, merge per material
  const out = new THREE.Group();
  for (const [mat, list] of buckets) {
    for (const g of list) {
      const p = g.attributes.position, n = g.attributes.normal;
      for (let i = 0; i < p.count; i++) { p.setZ(i, -p.getZ(i)); if (n) n.setZ(i, -n.getZ(i)); }
      if (g.index) { const ix = g.index.array; for (let i = 0; i < ix.length; i += 3) { const t = ix[i + 1]; ix[i + 1] = ix[i + 2]; ix[i + 2] = t; } }
      if (g.attributes.uv) g.attributes.uv.needsUpdate = true;
    }
    const geo = mergeGeometries(list, false);
    out.add(new THREE.Mesh(geo, mat));
  }
  scene.add(out); buckets.clear();
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
const solid = (x0, x1, z0, z1) => solids.push({ x0, x1, z0, z1 });

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
  rect(-2.6, 2.6, -38.8, -37.4); rect(-41.5, 41.5, -60.8, -38.6);   // the front doors and the street outside
}
function gallery() {
  floorSlab(0, 0, 29, 48, 10);
  box(M.wall, 0.4, 7, 5.4, -24, 3.5, 26.7); box(M.wall, 0.4, 7, 0.5, -24, 3.5, 33.75); box(M.wall, 0.4, 3, 4, -24, 5.5, 31.5); box(M.wall, 48, 0.35, 10, 0, 7, 29);
  // east end: wall with the Chroma Awards theater door, then the opening into the tower lobby
  box(M.wall, 0.4, 7, 5.4, 24, 3.5, 26.7); box(M.wall, 0.4, 7, 0.5, 24, 3.5, 33.75); box(M.wall, 0.4, 3, 4, 24, 5.5, 31.5);
  box(M.wall, 3, 7, 0.4, -22.5, 3.5, 34); box(M.wall, 12, 7, 0.4, -1, 3.5, 34); box(M.wall, 6, 7, 0.4, 21, 3.5, 34);
  portal(-14, 33.8, 10, 5.7, M.violet, '04   NEON ARCADE'); portal(12, 33.8, 10, 5.7, M.amber, '05   CINEMA SOCIETY');
  for (let i = 0; i < 12; i++) { const x = -22 + i * 4; box(M.metal, 0.16, 0.25, 8, x, 6.7, 29); box(i < 6 ? M.violet : M.amber, 0.04, 0.04, 7.2, x, 6.5, 29); }
  for (const x of [-19, 19]) { sofa(x, 27, 180, 3, M.velvet); table(x, 28.5, 1.2, 0.8); }
  text('←  ARCADE     /     CINEMAS  →', 0, 5.8, 33.72, 0.27, '#ffffff');
  themedDoor(-24, 26.7, -90, 4.2, 5, 0xffd24a, 'CHROMA AWARDS 2025', 'screening.html?room=chroma25', 'last year · games + films');
  themedDoor(24, 26.7, 90, 4.2, 5, 0xff2a4a, 'CHROMA AWARDS', 'screening.html?room=chroma', 'this year · the big one');
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
  text('NEON / PLAY', 0, 5.5, 8.7, 0.63, '#ffffff'); text('PICK A CABINET · IT PLAYS RIGHT HERE', 0, 4.65, 8.68, 0.18, '#10c4ff');
  for (let side = 0; side < 2; side++) for (let i = 0; i < 5; i++) {
    const g = GAMES[side * 5 + i] || GAMES[i], x = side ? 8.6 : -8.6, z = -5.5 + i * 2.6;
    const pulse = side === 0 && i === 0;   // the first cabinet is NEON PULSE, the passport's arcade stamp
    group(x, 0, z, side ? 90 : -90, () => cabinet(pulse ? 'NEON PULSE' : g.name.replace(/\s*\(.*$/, '').toUpperCase().slice(0, 18), pulse ? () => openPulse() : () => openWindow(`ARCADE // ${g.name}`, g.url)));
    solid(-14 + x - 0.8, -14 + x + 0.8, 43 + z - 0.8, 43 + z + 0.8);
  }
  [['joust', 'JOUST / 01'], ['chrome', 'CHROME / 02'], ['toon', 'TOON / 03']].forEach(([k, label], i) => {
    group(-3.8 + i * 3.8, 0, 4.9, 0, () => { cyl(M.metal, 1.1, 0.8, 0, 0.4, 0); cyl(i === 1 ? M.cyan : M.violet, 1.07, 0.035, 0, 0.81, 0); model(k, 0, 0.85, 0, 2.3); text(label, 0, 0.5, -1.12, 0.14, '#ffffff'); });
    solid(-14 + -3.8 + i * 3.8 - 1.1, -14 - 3.8 + i * 3.8 + 1.1, 47.8, 50);
  });
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
function themedDoor(x, z, yaw, w, h, color, label, url, sub = '', floor = 0, y = 0, size = 0.3) {
  const mat = glow(color);
  group(x, y, z, yaw, () => {
    box(M.metal, 0.3, h, 0.5, -w / 2 - 0.15, h / 2, 0); box(M.metal, 0.3, h, 0.5, w / 2 + 0.15, h / 2, 0); box(M.metal, w + 0.6, 0.4, 0.5, 0, h + 0.2, 0);
    box(mat, 0.07, h - 0.1, 0.07, -w / 2, h / 2, -0.3); box(mat, 0.07, h - 0.1, 0.07, w / 2, h / 2, -0.3); box(mat, w, 0.07, 0.07, 0, h - 0.1, -0.3);
    quad(doorGlow(color), w, h - 0.1, 0, h / 2, -0.22);
    text(label, 0, h + 1.0, -0.3, size, hexs(color)); if (sub) text(sub.toUpperCase(), 0, h + 0.55, -0.3, Math.min(0.14, size * 0.5), '#cfe6ff');
    hotspot(0, h / 2, -0.5, w + 0.2, h, 0.8, () => goTo(url, `entering ${label.toLowerCase()}…`), label);
    // a walk-in zone just inside the doorway (in world Unity coords)
    const c = Math.cos(THREE.MathUtils.degToRad(yaw)), sn = Math.sin(THREE.MathUtils.degToRad(yaw)), wp = wpos(0, 0, -0.9);
    const hx = Math.abs(c) > 0.5 ? w / 2 : 0.9, hz = Math.abs(c) > 0.5 ? 0.9 : w / 2;
    doorTriggers.push({ floor, x0: wp.x - hx, x1: wp.x + hx, z0: wp.z - hz, z1: wp.z + hz, armed: true, url, label });
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
    { name: 'STUDIOS', color: 0xffcf9a, sub: 'shows, links, the board, the store', doors: [['THAT TIME AGAIN', 'studios/index.html', 0xffcf9a], ['LINKS · ALL PROJECTS', 'links.html', 0x39ff88], ['THE BOARD', 'blog.html', 0xff5ec7], ['MERCH STORE', 'store.html', 0x39ff14]] },
    { name: 'TOOLS + ARCHIVES', color: 0xc0c8d8, sub: 'build, read, investigate', doors: [['ROOM BUILDER', 'builder.html', 0xffffff], ['THE CODEX', 'codex.html', 0x99e0ff], ['CHANNEL 86 EVIDENCE', 'channel86-evidence/index.html', 0xcc1133], ['FEVER DREAM LIBRARY', 'library.html', 0xffb000]] },
    { name: 'ROOF · THE EPKs', color: 0x4ad0c0, sub: 'the press kits, up on the roof', doors: [['RAVE CHARLES EPK', 'epk/ravecharles/index.html', 0xff2bd0], ['SHMOREZ EPK', 'epk/shmorez/index.html', 0xff8a2a], ['TANKY JOHNSON EPK', 'epk/tanky/index.html', 0xffd24a], ['DRIFTWAVE EPK', 'epk/driftwave/index.html', 0xa64bff]] },
    { name: 'ROOF · MORE EPKs', color: 0x4ad0c0, sub: 'sofa king and the glitch room', doors: [['SOFA KING EPK', 'epk/sofaboi/index.html', 0x5b6bff], ['GLITCH ART EPK', 'epk/glitch/glitch-art-epk.html', 0x39ff14]] },
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
function slideDoor({ x, z, yaw = 0, w = 5.2, h = 4.4, url = null, label = '', color = CY, sign = '' }) {
  const p = wpos(x, 0, z), phi = yawOf() + THREE.MathUtils.degToRad(yaw), half = w / 2, panels = [];
  const g = new THREE.Group(); g.position.set(p.x, 0, -p.z); g.rotation.y = -phi; scene.add(g);
  const rim = new THREE.MeshBasicMaterial({ color, toneMapped: false });
  for (const s of [-1, 1]) {
    const pg = new THREE.Group(); pg.position.x = s * half / 2; g.add(pg);
    pg.add(new THREE.Mesh(new THREE.BoxGeometry(half - 0.05, h - 0.1, 0.06), glassPane));
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
function street() {
  box(TURF, 180, 1, 114, -20, -0.5, -95.1);
  box(CONCRETE, 84, 0.12, 6.8, 0, 0.06, -41.6); box(CONCRETE, 84, 0.12, 4.2, 0, 0.06, -59.1);
  for (const z of [-45, -57]) box(M.stone, 84, 0.16, 0.3, 0, 0.08, z);
  box(ASPHALT, 84, 0.01, 11.7, 0, 0.005, -51);
  for (let i = 0; i < 17; i++) { const x = -40 + i * 5; if (Math.abs(x - 18) < 3) continue; box(PAINT, 2.4, 0.006, 0.14, x, 0.013, -51); }
  for (const z of [-45.6, -56.4]) box(PAINT, 84, 0.006, 0.1, 0, 0.013, z);
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
  // ---- west end: THE COMPLEX (the warehouse) ----
  box(RUST, 6, 12, 24, -45, 6, -50); for (let i = 0; i < 24; i++) box(M.metal, 0.12, 11.6, 0.2, -41.95, 6, -61.5 + i * 1.0);
  text('THE COMPLEX', -41.8, 9.3, -50, 1.0, '#ffd96a', 90); text('12MATT3R  ·  A WAREHOUSE OF ROOMS  ·  OPEN', -41.8, 7.9, -50, 0.26, '#ff9e40', 90);
  box(glow(0xffd96a), 0.06, 0.12, 13, -41.9, 8.3, -50);
  slideDoor({ x: -42, z: -51, yaw: 90, w: 4.4, h: 4.2, url: 'warehouse.html', label: 'THE COMPLEX', color: 0xffd96a, sign: 'sliding door · walk in' });
  group(-8, 0, -44.3, 0, () => { cyl(M.metal, 0.06, 2.8, 0, 1.4, 0); box(INK, 3.6, 0.8, 0.08, 0, 2.65, 0); box(glow(0xffd96a), 3.6, 0.04, 0.1, 0, 3.06, 0); text('←  THE COMPLEX', 0, 2.65, -0.08, 0.3, '#ffd96a'); });
  // ---- east end: B2BUDDY RECORDS ----
  box(M.wall, 4.2, 16, 23.8, 44.1, 8, -50.1);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) box((r * 3 + c) % 4 === 0 ? glow(0xffcf9a) : INK, 0.05, 1.5, 2.3, 41.97, 7.6 + r * 2.6, -41 - c * 3.6);
  text('B2BUDDY RECORDS', 41.9, 5.4, -50, 0.8, '#4de8ff', -90); text('VINYL  ·  DECKS  ·  OPEN LATE', 41.9, 4.6, -50, 0.24, '#4de8ff', -90);
  box(glow(0x1b6a90), 0.05, 2.8, 6, 41.96, 1.9, -50); box(M.cyan, 0.1, 0.15, 6.4, 41.93, 3.4, -50);
  hotspot(41.5, 2, -50, 1.2, 4, 6.4, () => openWindow('B2BUDDY RECORDS // MUSIC', 'https://hungryshmorez.github.io/Media/music/'), 'B2Buddy Records');
  doorTriggers.push({ floor: 0, x0: 40.2, x1: 41.5, z0: -53, z1: -47, armed: true, url: null, label: 'B2Buddy Records', run: () => openWindow('B2BUDDY RECORDS // MUSIC', 'https://hungryshmorez.github.io/Media/music/') });
  // ---- south sidewalk: THE MOVIE LOBBY (between the festival and the records shop) ----
  box(M.wall, 22, 11, 0.8, 54.6, 5.5, -62.3); box(M.metal, 22.6, 0.5, 1.4, 54.6, 11.3, -62.0); box(M.amber, 22, 0.06, 0.06, 54.6, 10.4, -61.8);
  text('THE MOVIE LOBBY', 54.6, 8.6, -61.7, 1.1, '#ff5a6a', 180); text('5 THEATERS  ·  ARCADE  ·  FOOD COURT  ·  FEVER DREAM LIBRARY', 54.6, 7.2, -61.7, 0.26, '#ffcf9a', 180);
  box(M.amber, 11, 0.3, 2.6, 38, 5.2, -60.4); text('CINEMA', 38, 5.2, -59.0, 0.3, '#ffcf9a', 180);
  slideDoor({ x: 38, z: -61.9, yaw: 180, w: 4.4, h: 4.2, url: 'lobby.html', label: 'THE MOVIE LOBBY', color: 0xff4a5a, sign: 'sliding doors · walk in' });
  // ---- the festival gateway: pillars, header, receding rings ----
  group(18, 0, -61, 180, () => {
    for (const gx of [-5.2, 5.2]) { box(M.wall, 1.3, 9.6, 1.3, gx, 4.8, 0); box(M.cyan, 0.08, 9, 0.05, gx, 4.8, -0.68); box(M.metal, 1.5, 0.3, 1.5, gx, 9.75, 0); }
    box(M.wall, 11.7, 1.5, 1.5, 0, 9.4, 0); box(M.violet, 11.7, 0.07, 0.05, 0, 8.7, -0.78); text('THE FESTIVAL', 0, 9.45, -0.8, 0.95, '#4de8ff'); box(INK, 8, 0.6, 0.3, 0, 10.6, -0.2); text('OPEN AIR  ·  MAIN STAGE  ·  THE MIDWAY', 0, 10.6, -0.38, 0.24, '#ff7eb0');
    for (let i = 0; i < 7; i++) add(i % 2 ? M.violet : M.cyan, new THREE.TorusGeometry(4.6, 0.09, 8, 48), place(0, 4.5, 1.2 + i * 1.6));
    for (let i = 0; i < 4; i++) { const zz = -5.2 + i * 1.05; rod(M.cyan, [-0.6, 0.14, zz - 0.35], [0, 0.14, zz + 0.2], 0.07); rod(M.cyan, [0.6, 0.14, zz - 0.35], [0, 0.14, zz + 0.2], 0.07); }
    const wp = wpos(0, 0, -1.4); doorTriggers.push({ floor: 0, x0: wp.x - 4.2, x1: wp.x + 4.2, z0: wp.z - 1.2, z1: wp.z + 1.2, armed: true, url: 'index.html', label: 'the festival' });
    hotspot(0, 4.5, 0.4, 9.4, 9, 1.6, () => goTo('index.html', 'entering the festival…'), 'The Festival');
  });
  point(18, 6, -58, CY, 45, 20);
  // ---- night sky ----
  const n = 700, pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 0.95 + 0.05), r = 200; pos.set([Math.cos(th) * Math.sin(ph) * r, Math.cos(ph) * r, Math.sin(th) * Math.sin(ph) * r], i * 3); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xbfd2ff, size: 1.4, sizeAttenuation: false, fog: false })));
}

// ---- assemble ----
mkScreen('main', null, 0x0f2b6a, 0x7a22d8); mkScreen('vip', null, 0x6a2a10, 0x3a1088);
arenaShell(); arena(); vip(); lobby(); gallery();
group(-14, 0, 43, 0, arcade);
cinemaLobby(); TOWERS.forEach(buildTower); street();
group(15, 0, 59, 0, mainCinema);
group(37, 0, 46, 0, privateCinema);
// walkable rects for the wings (world Unity coords)
rect(-24.8, -3.2, 34.2, 51.8);                 // arcade
rect(3.4, 26.6, 46.4, 71.6);                   // main auditorium
rect(28.4, 45.6, 36.4, 55.6);                  // private cinema
flush();
// screens' meshes: find the quads by their material and remember them for swapping
scene.traverse((o) => { if (o.isMesh) for (const k of ['main', 'vip']) if (o.material === screens[k].mat) screens[k].mesh = o; });
// show lights on the stage walls
const ledMats = [ledA, ledB];

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
  if (x > 4 && x < 26 && z > 47 && z < 71) c.push((7 - THREE.MathUtils.clamp(Math.floor((z - 48.875) / 2.25), 0, 7)) * 0.32);              // auditorium terraces
  if (x > 3.7 && x < 6.3 && z > 45.6 && z < 49.6) c.push(Math.min(2.24, (Math.floor((z - 45.6) / 0.4) + 1) * 0.224));                        // auditorium entry stair
  let best = 0; for (const v of c) if (v <= prev + 0.6 && v > best) best = v; return best;
}
const inTowerRect = (x, z) => Math.abs(x) > 24.6 && Math.abs(x) < 40.8 && z > 24.6 && z < 33.4;
const inRects = (x, z, upper) => player.floor > 0 ? inTowerRect(x, z) : rects.some((r) => (upper || !r.u) && x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1);
const blocked = (x, z) => player.floor === 0 && solids.some((b) => x > b.x0 - R && x < b.x1 + R && z > b.z0 - R && z < b.z1 + R);
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
canvas.addEventListener('pointerdown', (e) => { userGesture = true; canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  player.yaw -= (e.movementX || dx * 0.2) * 0.0045; player.pitch = THREE.MathUtils.clamp(player.pitch - (e.movementY || dy * 0.2) * 0.0045, -0.7, 0.6);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => {
  canvas.classList.remove('drag');
  if (down && !dragged) {
    ndc.x = (e.clientX / innerWidth) * 2 - 1; ndc.y = -(e.clientY / innerHeight) * 2 + 1; ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(hits.map((h) => h.mesh), false)[0];
    if (hit) hits.find((h) => h.mesh === hit.object).run();
    else {
      const g = new THREE.Plane(new THREE.Vector3(0, 1, 0), -player.h); const p = ray.ray.intersectPlane(g, new THREE.Vector3());
      if (p) player.target = { x: p.x, z: -p.z };
    }
  }
  down = null;
});
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
const MOVE = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'];
addEventListener('keydown', (e) => { userGesture = true; const k = e.key.toLowerCase(); if (MOVE.includes(k) && !document.querySelector('.wp-ov.on')) { player.keys.add(k); player.target = null; } });
addEventListener('keyup', (e) => player.keys.delete(e.key.toLowerCase()));
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
$('backBtn').onclick = () => goTo('lobby.html', 'back to the festival lobby…');

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
  $('scoreA').textContent = String(score[0]).padStart(2, '0'); $('scoreB').textContent = String(score[1]).padStart(2, '0');
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
  ['PRIVATE CINEMA', 33, 41, 0, face(1, 0)], ['THE STREET', 0, -44, 0, face(0, -1)], ['THE FESTIVAL', 18, -58.5, 0, face(0, -1), 'index.html'], ['THE MIDWAY', 18, -58.5, 0, face(0, -1), 'arcade.html'],
  ['THE COMPLEX', -40.5, -51, 0, face(-1, 0), 'warehouse.html'], ['THE MOVIE LOBBY', 38, -60.4, 0, face(0, -1), 'lobby.html'], ['FEVER DREAM LIBRARY', -39.6, 29, 8 * 8, face(1, 0), 'library.html'], ['THE ROOMS TOWER', 32, 29, 0, face(1, 0)], ['THE ARCHIVE TOWER', -32, 29, 0, face(-1, 0)],
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
node('crossing', 18, -44); node('gate', 18, -59); node('street', 0, -52); node('complexTurn', -38, -52); node('complexDoor', -40.5, -51); node('cinemaStreet', 30, -53); node('lobbyDoor', 38, -60);
[['balcony', 'vip'], ['balcony', 'stair'], ['stair', 'aisle'], ['aisle', 'entry'], ['entry', 'lounge'], ['lounge', 'outside'], ['stair', 'vote'], ['stair', 'desk'], ['aisle', 'gallery'], ['gallery', 'mid'], ['mid', 'west'], ['west', 'arcade'], ['arcade', 'game'],
  ['mid', 'east'], ['east', 'cinema'], ['cinema', 'screen'], ['cinema', 'privHall'], ['privHall', 'priv'], ['east', 'rooms'], ['rooms', 'roomsIn'], ['west', 'archive'], ['archive', 'archiveIn'],
  ['outside', 'crossing'], ['crossing', 'gate'], ['outside', 'street'], ['street', 'complexTurn'], ['complexTurn', 'complexDoor'], ['crossing', 'cinemaStreet'], ['cinemaStreet', 'lobbyDoor']].forEach(([a, b]) => edge(a, b));
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
for (const [id, close] of [['map', 'mapX'], ['passport', 'passX'], ['pulse', 'pulseX'], ['finale', 'finaleX']]) { $(close).onclick = () => { $(id).classList.remove('on'); pulse = id === 'pulse' ? null : pulse; }; $(id).addEventListener('pointerdown', (e) => { if (e.target === $(id)) { $(id).classList.remove('on'); if (id === 'pulse') pulse = null; } }); }
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
  crowd(t, p + crowdKick * 0.8);
  // play the cinema screens only while you're in them
  for (const [id, s] of Object.entries(screens)) {
    const r = id === 'main' ? [3.4, 26.6, 46.4, 71.6] : [28.4, 45.6, 36.4, 55.6], inside = player.x > r[0] && player.x < r[1] && player.z > r[2] && player.z < r[3];
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
}
teleport(0, -33, 0, face(0, 1)); moveUpdate(0.016); renderer.render(scene, camera);
$('enterBtn').onclick = () => { userGesture = true; $('start').classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
if (import.meta.env.DEV || location.hash === '#debug') window.__ug = { player, scene, teleport, camera, rideTo, openLift, doorTriggers, TOWERS };
