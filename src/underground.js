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
function sofa(x, z, yaw, w, mat) {
  group(x, 0, z, yaw, () => {
    box(M.wall, w, 0.35, 1.05, 0, 0.25, 0); box(mat, w, 1, 0.24, 0, 0.9, 0.45);
    const n = Math.max(1, Math.round(w / 0.85));
    for (let i = 0; i < n; i++) { const cx = -w / 2 + (w / n) * (i + 0.5); box(mat, w / n - 0.035, 0.23, 0.87, cx, 0.55, -0.04); box(mat, w / n - 0.04, 0.61, 0.22, cx, 0.91, 0.26); }
    for (const s of [-1, 1]) { box(mat, 0.2, 0.65, 1.1, s * (w / 2 - 0.06), 0.7, 0); box(M.brass, 0.08, 0.18, 0.65, s * (w / 2 - 0.24), 0.08, 0); }
  });
}
function table(x, z, w = 1.6, d = 1) {
  group(x, 0, z, 0, () => { box(M.metal, w * 0.55, 0.64, d * 0.55, 0, 0.32, 0); box(M.stone, w, 0.12, d, 0, 0.68, 0); box(M.brass, w + 0.02, 0.025, d + 0.02, 0, 0.61, 0); cyl(M.amber, 0.065, 0.28, 0, 0.99, 0); });
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
  kiosk(-14.1, -5.6, 90, 'Support DJ Cyan', M.cyan, () => openVote());
  kiosk(14.1, -5.6, -90, 'Support DJ Violet', M.violet, () => openVote());
  kiosk(0, -5, 0, 'Show desk', M.amber, () => toggleMusic());
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
  box(M.wall, 0.4, 7, 14, -11, 3.5, -31); box(M.wall, 0.4, 7, 14, 11, 3.5, -31); box(M.wall, 22, 7, 0.4, 0, 3.5, -38); box(M.wall, 22, 0.3, 14, 0, 7, -31);
  text('THE UNDERGROUND', 0, 4.7, -37.65, 0.64, '#ffffff', 180); text('B 2 B U D D Y    /    MEMBERS ENTRANCE', 0, 3.65, -37.6, 0.23, '#ff8829', 180);
  for (const x of [-8, 8]) { sofa(x, -32, x < 0 ? 90 : -90, 4, M.velvet); table(x * 0.78, -32, 1.3, 1.1); box(M.amber, 0.06, 2.5, 0.08, x, 4.8, -36.4); }
  for (let i = 0; i < 5; i++) { box(M.metal, 18, 0.3, 0.35, 0, 6.65, -36 + i * 2.4); box(M.amber, 14, 0.045, 0.06, 0, 6.47, -36 + i * 2.4); }
  text('02   CONCERT ARENA  ↑', 0, 5.9, -24.4, 0.35, '#ffffff'); box(M.stone, 3.7, 1.3, 1.1, 5.9, 0.65, -27.5); text('CONCIERGE', 5.9, 1, -28.1, 0.2, '#ff8829');
  solid(4, 7.8, -28.1, -26.9); point(0, 4, -32, AM, 40, 22);
  rect(-10.5, 10.5, -37.5, -23.6);
  hotspot(0, 2, -37, 6, 4, 1, () => goTo('lobby.html', 'back to the festival lobby…'), 'Exit to the festival lobby');
  text('EXIT  →  THE FESTIVAL LOBBY', 0, 1.9, -37.55, 0.2, '#99e0ff', 180);
}
function gallery() {
  floorSlab(0, 0, 29, 48, 10);
  box(M.wall, 0.4, 7, 10, -24, 3.5, 29); box(M.wall, 0.4, 7, 10, 24, 3.5, 29); box(M.wall, 48, 0.35, 10, 0, 7, 29);
  box(M.wall, 3, 7, 0.4, -22.5, 3.5, 34); box(M.wall, 12, 7, 0.4, -1, 3.5, 34); box(M.wall, 6, 7, 0.4, 21, 3.5, 34);
  portal(-14, 33.8, 10, 5.7, M.violet, '04   NEON ARCADE'); portal(12, 33.8, 10, 5.7, M.amber, '05   CINEMA SOCIETY');
  for (let i = 0; i < 12; i++) { const x = -22 + i * 4; box(M.metal, 0.16, 0.25, 8, x, 6.7, 29); box(i < 6 ? M.violet : M.amber, 0.04, 0.04, 7.2, x, 6.5, 29); }
  for (const x of [-19, 19]) { sofa(x, 27, 180, 3, M.velvet); table(x, 28.5, 1.2, 0.8); }
  text('←  ARCADE     /     CINEMAS  →', 0, 5.8, 33.72, 0.27, '#ffffff');
  rect(-23.5, 23.5, 24.3, 33.7); rect(-18.8, -9.2, 33.4, 34.8); rect(7.2, 16.8, 33.4, 34.8);
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
    group(x, 0, z, side ? 90 : -90, () => cabinet(g.name.replace(/\s*\(.*$/, '').toUpperCase().slice(0, 18), () => openWindow(`ARCADE // ${g.name}`, g.url)));
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
  kiosk(-4.5, -14.2, 0, 'Main screen desk', M.amber, () => nextVideo('main'));
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
  kiosk(-6.4, -6, -30, 'Private screen desk', M.amber, () => nextVideo('vip'));
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

// ---- assemble ----
mkScreen('main', null, 0x0f2b6a, 0x7a22d8); mkScreen('vip', null, 0x6a2a10, 0x3a1088);
arenaShell(); arena(); vip(); lobby(); gallery();
group(-14, 0, 43, 0, arcade);
cinemaLobby();
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
const player = { pos: new THREE.Vector3(0, 1.65, 0), x: 0, z: -33, h: 0, yaw: 0, pitch: -0.04, keys: new Set(), target: null };
const R = 0.4;
function heightAt(x, z, prev) {
  const c = [0], ax = Math.abs(x), az = Math.abs(z);
  if (az < 7.5) { if (ax >= 16.95 && ax <= 23.4) c.push(1.3); else if (ax > 16.2 && ax < 16.95) c.push(1.3 * (1 - (ax - 16.2) / 0.75)); }   // DJ decks + entry steps
  if (ax < 2.25 && az > 8 && az < 19.5) c.push(Math.min(4, Math.max(0, ((az - 8.25) / 11) * 4)));                                            // VIP stairs
  if (ax < 15.5 && az > 18 && az < 24) c.push(4);                                                                                           // VIP balconies
  if (x > 4 && x < 26 && z > 47 && z < 71) c.push((7 - THREE.MathUtils.clamp(Math.floor((z - 48.875) / 2.25), 0, 7)) * 0.32);              // auditorium terraces
  if (x > 3.7 && x < 6.3 && z > 45.6 && z < 49.6) c.push(Math.min(2.24, (Math.floor((z - 45.6) / 0.4) + 1) * 0.224));                        // auditorium entry stair
  let best = 0; for (const v of c) if (v <= prev + 0.6 && v > best) best = v; return best;
}
const inRects = (x, z, upper) => rects.some((r) => (upper || !r.u) && x > r.x0 && x < r.x1 && z > r.z0 && z < r.z1);
const blocked = (x, z) => solids.some((b) => x > b.x0 - R && x < b.x1 + R && z > b.z0 - R && z < b.z1 + R);
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
function teleport(x, z, h = 0, yaw = null) { player.x = x; player.z = z; player.h = h; player.target = null; if (yaw !== null) player.yaw = yaw; }

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
const face = (dx, dz) => Math.atan2(-dx, dz);   // yaw that looks along (dx, dz) in Unity coords
const spots = [
  ['🚪 Lobby', 0, -33, 0, face(0, 1), true], ['🎧 Arena', 0, -12, 0, face(0, 1)], ['◀ Stage A', -14, 0, 0, face(-1, 0)], ['Stage B ▶', 14, 0, 0, face(1, 0)],
  ['🥂 VIP balcony', 0, -21, 4, face(0, 1)], ['🕹 Arcade', -14, 38, 0, face(0, 1)], ['🎬 Cinema', 15, 40, 0, face(0, 1)], ['🍿 Main screen', 15, 52, 2.2, face(0, 1)], ['🛋 Private', 33, 41, 0, face(1, 0)],
];
for (const [label, x, z, h, yaw, hot] of spots) { const b = document.createElement('button'); b.className = `btn${hot ? ' hot' : ''}`; b.textContent = label; b.onclick = () => teleport(x, z, h, yaw); $('goRow').appendChild(b); }
$('backBtn').onclick = () => goTo('lobby.html', 'back to the festival lobby…');
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
  crowd(t, p);
  // play the cinema screens only while you're in them
  for (const [id, s] of Object.entries(screens)) {
    const r = id === 'main' ? [3.4, 26.6, 46.4, 71.6] : [28.4, 45.6, 36.4, 55.6], inside = player.x > r[0] && player.x < r[1] && player.z > r[2] && player.z < r[3];
    if (inside && !s.playing && !s.requested) { s.requested = true; nextVideo(id, 0); }
    if (!inside && s.playing) { s.video.pause(); s.playing = false; s.requested = false; if (s.mesh) s.mesh.material = s.mat; }
    if (inside && s.playing && s.video.paused && !s.video.ended) s.video.play().catch(() => { });
  }
  moveUpdate(dt);
  renderer.render(scene, camera);
}
teleport(0, -33, 0, face(0, 1)); moveUpdate(0.016); renderer.render(scene, camera);
$('enterBtn').onclick = () => { userGesture = true; $('start').classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
if (import.meta.env.DEV || location.hash === '#debug') window.__ug = { player, scene, teleport, camera };
