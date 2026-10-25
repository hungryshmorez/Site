import * as THREE from 'three';
import { createReducedMotion, prefersReducedMotion } from './player/motion.js';
import { openWindow } from './ui/popup.js';
import { THEATERS } from './data/theaters.js';

// THE LOBBY — a walkable movie-theater lobby. Straight ahead of the spawn is the
// CHROMA AWARDS theater, lit up like the Fourth of July (marquee bulbs, bunting,
// fireworks, a red carpet). Along the north wall are the other three theaters
// (9×16, 16×9, Enter the Void); the arcade runs down the west wall, a voting booth
// sits beside it, and the food court fills the east side.
//   · theater doors → walk through → that theater's page
//   · arcade pad    → arcade.html in the in-site window (every game)
//   · voting booth  → vote.html in the in-site window (links to each entry's vote page)
// Theaters are defined in data/theaters.js; the Chroma entries in data/chroma.js.

createReducedMotion();
const $ = (id) => document.getElementById(id);
const canvas = $('tv');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x04040c);
scene.fog = new THREE.Fog(0x05050f, 22, 70);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.1, 140);

const std = (o) => new THREE.MeshStandardMaterial(o);
const basic = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, ...o });
const C = (h) => new THREE.Color(h);
const hex = (s) => parseInt(s.replace('#', ''), 16);

// ---- room ----
const RX = 22, RZ = 20, H = 11;   // half-width, half-depth, height
const WALL_Z = -RZ;                // the north wall (theater doors)

function carpetTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#120a1c'; g.fillRect(0, 0, 256, 256);
  const cols = ['#ff2bd0', '#00f3ff', '#ffd24a', '#b967ff'];
  for (let i = 0; i < 46; i++) {
    g.save(); g.translate(Math.random() * 256, Math.random() * 256); g.rotate(Math.random() * Math.PI);
    g.fillStyle = cols[i % 4] + '88';
    if (i % 3 === 0) g.fillRect(-9, -2, 18, 4); else if (i % 3 === 1) { g.beginPath(); g.arc(0, 0, 4, 0, 7); g.fill(); } else { g.beginPath(); g.moveTo(0, -7); g.lineTo(6, 5); g.lineTo(-6, 5); g.fill(); }
    g.restore();
  }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(14, 13); t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const floor = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ * 2), std({ map: carpetTexture(), roughness: 1, color: 0xbbbbbb }));
floor.rotation.x = -Math.PI / 2; scene.add(floor);
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ * 2), std({ color: 0x07070f, roughness: 1 }));
ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
const wallMat = std({ color: 0x14101e, roughness: 0.9 });
function wall(w, pos, rotY) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, H), wallMat); m.position.copy(pos); m.rotation.y = rotY; scene.add(m); }
wall(RX * 2, new THREE.Vector3(0, H / 2, -RZ), 0);
wall(RX * 2, new THREE.Vector3(0, H / 2, RZ), Math.PI);
wall(RZ * 2, new THREE.Vector3(-RX, H / 2, 0), Math.PI / 2);
wall(RZ * 2, new THREE.Vector3(RX, H / 2, 0), -Math.PI / 2);

scene.add(new THREE.AmbientLight(0x3a3558, 1.1));
scene.add(new THREE.HemisphereLight(0x8a80c0, 0x1a1020, 0.7));
// ceiling light panels (emissive; a few real lights for the floor)
const panelMat = basic(0xfff0d8);
for (let x = -16; x <= 16; x += 8) for (let z = -12; z <= 14; z += 8) {
  const p = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1.2), panelMat); p.position.set(x, H - 0.06, z); scene.add(p);
}
for (const [x, z] of [[-11, 10], [11, 10], [-11, -6], [11, -6], [0, 2]]) {
  const l = new THREE.PointLight(0xffe2c0, 14, 26, 1.6); l.position.set(x, H - 1, z); scene.add(l);
}

// ---- helpers ----
function textPlane(text, w, h, { color = '#fff', bg = null, glow = null, weight = '700', sub = null } = {}) {
  const px = 110, c = document.createElement('canvas'); c.width = Math.round(w * px); c.height = Math.round(h * px);
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height); }
  g.textAlign = 'center'; g.textBaseline = 'middle';
  let size = Math.round(c.height * (sub ? 0.5 : 0.6));
  do { g.font = `${weight} ${size}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`; size -= 4; } while (g.measureText(text).width > c.width * 0.92 && size > 12);
  if (glow) { g.shadowColor = glow; g.shadowBlur = size * 0.35; }
  g.fillStyle = color; g.fillText(text, c.width / 2, c.height * (sub ? 0.36 : 0.52));
  if (sub) { g.shadowBlur = 0; g.font = `500 ${Math.round(c.height * 0.17)}px ui-monospace, Menlo, monospace`; g.fillStyle = 'rgba(255,255,255,.75)'; g.fillText(sub, c.width / 2, c.height * 0.78); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: !bg, toneMapped: false }));
  return m;
}
function box(w, h, d, mat, x, y, z, parent = scene) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); parent.add(m); return m; }

const blockers = [];   // AABBs the player can't walk into: {x0,x1,z0,z1}
const block = (x0, x1, z0, z1) => blockers.push({ x0, x1, z0, z1 });
const triggers = [];   // walk-in zones: {x0,x1,z0,z1, run, armed}
const trig = (x0, x1, z0, z1, run) => triggers.push({ x0, x1, z0, z1, run, armed: true });
const animators = [];  // (dt, t) => void

const RED = 0xff2a3a, WHITE = 0xffffff, BLUE = 0x2a5bff;

// ---- the four theater doors (north wall) ----
function neonFrame(g, w, h, color, thick = 0.18) {
  const m = basic(color, { toneMapped: false });
  box(thick, h, 0.2, m, -w / 2, h / 2, 0.06, g); box(thick, h, 0.2, m, w / 2, h / 2, 0.06, g); box(w + thick, thick, 0.2, m, 0, h, 0.06, g);
}
function theaterDoor(cfg, x, big) {
  const g = new THREE.Group(); g.position.set(x, 0, WALL_Z + 0.05); scene.add(g);
  const w = big ? 5.6 : 3.2, h = big ? 5.4 : 4.2, accent = hex(cfg.accent);
  const hole = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic(0x000000)); hole.position.set(0, h / 2, 0.03); g.add(hole);
  // a faint projector glow spilling out of the doorway
  const spill = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic(accent, { transparent: true, opacity: 0.18, toneMapped: false })); spill.position.set(0, h / 2, 0.04); g.add(spill);
  neonFrame(g, w, h, big ? WHITE : accent);
  const mw = big ? 12.5 : 5.2, mh = big ? 2.7 : 1.5, my = h + (big ? 2.1 : 1.3);
  const sign = textPlane(cfg.name, mw, mh, { color: big ? '#fff' : cfg.accent, bg: big ? '#16060c' : '#0a0a14', glow: big ? '#ff2a4a' : cfg.accent, sub: cfg.sub.toUpperCase() });
  sign.position.set(0, my, 0.1); g.add(sign);
  const hw = w / 2 - 0.1;
  trig(x - hw, x + hw, WALL_Z, WALL_Z + 1.6, () => goTo(cfg.page, `entering ${cfg.name}…`));
  return { g, w, h, mw, mh, my, accent };
}
const doorXs = { vertical: -16, wide: -8, chroma: 0, void: 8 };
const doors = {};
for (const t of THEATERS) doors[t.id] = theaterDoor(t, doorXs[t.id], t.id === 'chroma');
// the spare bay on the end — a poster for the next booking
{
  const p = textPlane('NOW BOOKING', 4, 5.2, { color: '#8a8aa0', bg: '#0c0c18', sub: 'ROOM 5 · COMING SOON' }); p.position.set(16, 3.2, WALL_Z + 0.08); scene.add(p);
}

// ---- CHROMA AWARDS: lit up like the Fourth of July ----
{
  const d = doors.chroma, g = d.g;
  // marquee bulb border: red / white / blue chasing around the sign
  const bulbs = [], bulbR = 0.1, step = 0.42;
  const W2 = d.mw / 2 + 0.2, Hh = d.mh / 2 + 0.2, cy = d.my;
  for (let x = -W2; x <= W2; x += step) { bulbs.push([x, cy + Hh]); bulbs.push([x, cy - Hh]); }
  for (let y = -Hh + step; y < Hh; y += step) { bulbs.push([-W2, cy + y]); bulbs.push([W2, cy + y]); }
  // also bulbs round the doorway itself
  for (let y = 0.3; y <= d.h; y += step) { bulbs.push([-d.w / 2 - 0.25, y]); bulbs.push([d.w / 2 + 0.25, y]); }
  const bm = new THREE.InstancedMesh(new THREE.SphereGeometry(bulbR, 8, 6), basic(0xffffff, { toneMapped: false }), bulbs.length);
  const o = new THREE.Object3D();
  bulbs.forEach(([bx, by], i) => { o.position.set(bx, by, 0.2); o.updateMatrix(); bm.setMatrixAt(i, o.matrix); bm.setColorAt(i, C(RED)); });
  g.add(bm);
  const pal = [C(RED), C(WHITE), C(BLUE)], dim = new THREE.Color(0x222222);
  let ph = 0, acc = 0;
  animators.push((dt) => {
    acc += dt; if (acc < 0.16) return; acc = 0; ph++;
    const reduced = prefersReducedMotion();
    for (let i = 0; i < bulbs.length; i++) bm.setColorAt(i, reduced ? pal[i % 3] : ((i + ph) % 6 < 3 ? pal[(i + ph) % 3] : dim));
    bm.instanceColor.needsUpdate = true;
  });
  // stars flanking the marquee
  for (const sx of [-1, 1]) { const s = textPlane('★', 2, 2, { color: sx < 0 ? '#ff4a5a' : '#4a7bff', glow: '#fff' }); s.position.set(sx * (d.mw / 2 + 1.5), d.my, 0.12); g.add(s); }
  // bunting swagged across the wall: red / white / blue pennants on a sagging line
  const flagGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.28, 0, 0), new THREE.Vector3(0.28, 0, 0), new THREE.Vector3(0, -0.7, 0)]);
  flagGeo.computeVertexNormals();
  const fm = [RED, WHITE, BLUE].map((c) => new THREE.MeshBasicMaterial({ color: c, side: THREE.DoubleSide, toneMapped: false }));
  const SPAN = 15, N = 30;
  for (let i = 0; i <= N; i++) {
    const t = i / N, bx = (t - 0.5) * SPAN * 2, by = H - 0.5 - 1.2 * Math.sin(Math.PI * t);
    const f = new THREE.Mesh(flagGeo, fm[i % 3]); f.position.set(bx, by, 0.15); g.add(f);
  }
  // red carpet runway from the spawn to the door, with velvet-rope posts
  const rc = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 36), std({ color: 0xb01828, roughness: 0.9, emissive: 0x330508 }));
  rc.rotation.x = -Math.PI / 2; rc.position.set(0, 0.02, -1); scene.add(rc);
  const post = new THREE.CylinderGeometry(0.07, 0.07, 1, 8), postM = basic(0xffd24a), rope = new THREE.CylinderGeometry(0.03, 0.03, 1, 6), ropeM = std({ color: 0xaa1122 });
  for (let z = -16; z <= 12; z += 3.5) for (const sx of [-2.5, 2.5]) {
    const p = new THREE.Mesh(post, postM); p.position.set(sx, 0.5, z); scene.add(p);
    const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), postM); b.position.set(sx, 1.02, z); scene.add(b);
    if (z < 12) { const r = new THREE.Mesh(rope, ropeM); r.scale.y = 3.5; r.rotation.x = Math.PI / 2; r.position.set(sx, 0.85, z + 1.75); scene.add(r); }
  }
  // flashing red / white / blue lights on the door
  const lights = [RED, WHITE, BLUE].map((c, i) => { const l = new THREE.PointLight(c, 0, 20, 1.5); l.position.set((i - 1) * 4, 4.5, WALL_Z + 3); scene.add(l); return l; });
  animators.push((dt, t) => lights.forEach((l, i) => { l.intensity = 10 + 9 * Math.max(0, Math.sin(t * 3 + i * 2.1)); }));

  // fireworks over the entrance: bursts of red / white / blue points
  const BURSTS = 7, PER = 70, total = BURSTS * PER;
  const pos = new Float32Array(total * 3), col = new Float32Array(total * 3), vel = new Float32Array(total * 3);
  const sc = document.createElement('canvas'); sc.width = sc.height = 32;
  const sg = sc.getContext('2d'), grad = sg.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, '#fff'); grad.addColorStop(0.4, 'rgba(255,255,255,.6)'); grad.addColorStop(1, 'rgba(255,255,255,0)'); sg.fillStyle = grad; sg.fillRect(0, 0, 32, 32);
  const spark = new THREE.CanvasTexture(sc);
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3)); geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const fw = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.16, map: spark, alphaTest: 0.02, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
  fw.frustumCulled = false; scene.add(fw);
  const bursts = Array.from({ length: BURSTS }, () => ({ age: 99, ox: 0, oy: 0, c: new THREE.Color() }));
  let next = 0;
  const fire = (b, i) => {
    b.c.setHex([RED, WHITE, BLUE][(Math.random() * 3) | 0]);
    b.age = 0; b.ox = (Math.random() - 0.5) * 18; b.oy = H - 2.5 + Math.random() * 1.2;
    for (let k = 0; k < PER; k++) {
      const j = (i * PER + k) * 3, a = Math.random() * 6.283, e = Math.acos(2 * Math.random() - 1), s = 2.2 + Math.random() * 2.4;
      pos[j] = b.ox; pos[j + 1] = b.oy; pos[j + 2] = WALL_Z + 3.5;
      vel[j] = Math.sin(e) * Math.cos(a) * s; vel[j + 1] = Math.cos(e) * s * 0.8; vel[j + 2] = Math.sin(e) * Math.sin(a) * s * 0.6;
    }
  };
  animators.push((dt) => {
    if (prefersReducedMotion()) { fw.visible = false; return; }
    fw.visible = true;
    next -= dt; if (next <= 0) { const i = bursts.findIndex((b) => b.age > 2.2); if (i >= 0) fire(bursts[i], i); next = 0.45 + Math.random() * 0.8; }
    bursts.forEach((b, i) => {
      if (b.age > 2.2) { for (let k = 0; k < PER; k++) pos[(i * PER + k) * 3 + 1] = -50; return; }
      b.age += dt; const fade = Math.max(0, 1 - b.age / 2.2);
      for (let k = 0; k < PER; k++) {
        const j = (i * PER + k) * 3; vel[j + 1] -= 3.2 * dt;
        pos[j] += vel[j] * dt; pos[j + 1] += vel[j + 1] * dt; pos[j + 2] += vel[j + 2] * dt;
        col[j] = b.c.r * fade; col[j + 1] = b.c.g * fade; col[j + 2] = b.c.b * fade;
      }
    });
    geo.attributes.position.needsUpdate = true; geo.attributes.color.needsUpdate = true;
  });
}

// ---- ARCADE (west wall) ----
{
  const ax = -RX + 1.1, z0 = 2, z1 = 15, n = 9;
  block(-RX, ax + 0.6, z0 - 1, z1 + 1);
  const body = std({ color: 0x3a2a5c, roughness: 0.6, emissive: 0x160c28 });
  const neon = [0xff2bd0, 0x00f3ff, 0xffd24a, 0x39ff14, 0xb967ff];
  const screens = [];
  for (let i = 0; i < n; i++) {
    const z = z0 + (z1 - z0) * (i / (n - 1)), c = neon[i % neon.length];
    const g = new THREE.Group(); g.position.set(ax, 0, z); g.rotation.y = Math.PI / 2; scene.add(g);
    box(1.1, 2.3, 0.9, body, 0, 1.15, 0, g);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.85, 0.7), basic(c, { toneMapped: false })); scr.position.set(0, 1.55, 0.46); scr.rotation.x = -0.12; g.add(scr); screens.push(scr);
    box(1.14, 0.18, 0.95, basic(c, { toneMapped: false }), 0, 2.32, 0, g);
    box(1.0, 0.1, 0.5, body, 0, 0.95, 0.5, g);
  }
  animators.push((dt, t) => screens.forEach((s, i) => { s.material.color.setHex(neon[i % neon.length]).multiplyScalar(0.55 + 0.45 * Math.abs(Math.sin(t * 2.3 + i))); }));
  const sign = textPlane('ARCADE', 7, 1.7, { color: '#ff2bd0', bg: '#0a0614', glow: '#ff2bd0', sub: 'EVERY GAME · PLAY ANYTHING' }); sign.position.set(-RX + 0.05, 5.6, 8.5); sign.rotation.y = Math.PI / 2; scene.add(sign);
  // the play pad: step on it and every game opens in a window
  const pad = new THREE.Mesh(new THREE.RingGeometry(0.7, 1.1, 40), basic(0xff2bd0, { toneMapped: false })); pad.rotation.x = -Math.PI / 2; pad.position.set(-17.2, 0.03, 8.5); scene.add(pad);
  const lbl = textPlane('▶ PLAY', 2, 0.6, { color: '#fff', glow: '#ff2bd0' }); lbl.rotation.x = -Math.PI / 2; lbl.position.set(-17.2, 0.04, 9.7); scene.add(lbl);
  animators.push((dt, t) => { pad.scale.setScalar(1 + 0.08 * Math.sin(t * 4)); });
  trig(-18.3, -16.1, 7.4, 9.6, () => openWindow('ARCADE', new URL('arcade.html', location.href).href));
}

// ---- VOTING BOOTH (west, between the theaters and the arcade) ----
{
  const bx = -17.5, bz = -5;
  const panel = std({ color: 0xf2f2f6, roughness: 0.7 });
  box(0.15, 3, 2.8, panel, bx - 1.35, 1.5, bz);          // back
  box(2.7, 3, 0.15, panel, bx, 1.5, bz - 1.4);            // sides
  box(2.7, 3, 0.15, panel, bx, 1.5, bz + 1.4);
  box(2.9, 0.15, 3, panel, bx, 3.05, bz);                 // roof
  block(bx - 1.45, bx - 1.25, bz - 1.5, bz + 1.5); block(bx - 1.4, bx + 1.4, bz - 1.5, bz - 1.3); block(bx - 1.4, bx + 1.4, bz + 1.3, bz + 1.5);
  // striped valance across the open front
  const stripe = [RED, WHITE, BLUE];
  for (let i = 0; i < 9; i++) box(0.12, 0.6, 3 / 9, basic(stripe[i % 3], { toneMapped: false }), bx + 1.4, 2.7, bz - 1.33 + i * (2.66 / 8));
  // desk + glowing ballot screen
  box(1.2, 0.9, 1.4, std({ color: 0x20243a }), bx - 0.7, 0.45, bz);
  const ballot = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.7), basic(0x00f3ff, { toneMapped: false })); ballot.position.set(bx - 0.08, 1.25, bz); ballot.rotation.y = Math.PI / 2; ballot.rotation.z = 0; scene.add(ballot);
  const vs = textPlane('VOTE', 3.2, 1.1, { color: '#fff', bg: '#102a8a', glow: '#2a5bff', sub: 'CHROMA AWARDS' }); vs.position.set(bx + 1.5, 3.9, bz); vs.rotation.y = Math.PI / 2; scene.add(vs);
  const vs2 = vs.clone(); vs2.rotation.y = -Math.PI / 2; vs2.position.x = bx - 1.5; scene.add(vs2);
  const L = new THREE.PointLight(0x6a9aff, 6, 8, 1.6); L.position.set(bx, 2.6, bz); scene.add(L);
  animators.push((dt, t) => { ballot.material.color.setHex(0x00f3ff).multiplyScalar(0.7 + 0.3 * Math.sin(t * 3)); });
  // walk into the booth → the voting page
  trig(bx - 0.9, bx + 0.5, bz - 0.8, bz + 0.8, () => openWindow('VOTE // CHROMA AWARDS', new URL('vote.html', location.href).href));
  const pad = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.7, 32), basic(0x2a5bff, { toneMapped: false })); pad.rotation.x = -Math.PI / 2; pad.position.set(bx - 0.2, 0.03, bz); scene.add(pad);
}

// ---- FOOD COURT (east side) ----
{
  const stalls = [
    { name: 'POPCORN & CANDY', menu: ['BUTTER POPCORN', 'SOUR WORMS', 'JUMBO SODA'], color: '#ffd24a', z: -9 },
    { name: 'THE SLICE', menu: ['CHEESE', 'PEPPERONI', 'GARLIC KNOTS'], color: '#ff6b35', z: -2 },
    { name: 'DOGS & NACHOS', menu: ['CHILI DOG', 'LOADED NACHOS', 'PRETZEL'], color: '#ff2a3a', z: 5 },
    { name: 'SLUSH BAR', menu: ['BLUE RASPBERRY', 'CHERRY', 'MYSTERY FLAVOR'], color: '#00f3ff', z: 12 },
  ];
  const counter = std({ color: 0x241a30, roughness: 0.5 });
  for (const s of stalls) {
    const cx = RX - 1.6, c = hex(s.color);
    box(1.4, 1.1, 5, counter, cx, 0.55, s.z); block(cx - 0.7, RX, s.z - 2.5, s.z + 2.5);
    box(1.5, 0.08, 5.1, basic(c, { toneMapped: false }), cx, 1.12, s.z);
    const menu = textPlane(s.menu.join('   ·   '), 4.6, 0.7, { color: '#fff', bg: '#0b0b16' }); menu.position.set(RX - 0.05, 3.0, s.z); menu.rotation.y = -Math.PI / 2; scene.add(menu);
    const sign = textPlane(s.name, 4.8, 1.1, { color: s.color, bg: '#0b0b16', glow: s.color }); sign.position.set(RX - 0.05, 4.3, s.z); sign.rotation.y = -Math.PI / 2; scene.add(sign);
    const L = new THREE.PointLight(c, 5, 9, 1.8); L.position.set(RX - 2, 3.2, s.z); scene.add(L);
  }
  const fs = textPlane('FOOD COURT', 9, 1.8, { color: '#ffd24a', bg: '#0a0614', glow: '#ffd24a', sub: 'EAT · SIT · DEBATE THE ENDING' }); fs.position.set(RX - 0.05, 6.1, 1.5); fs.rotation.y = -Math.PI / 2; scene.add(fs);
  // round tables with stools
  const tt = std({ color: 0x2c2a44, roughness: 0.4 }), stool = std({ color: 0xff2bd0, roughness: 0.6 });
  for (const [x, z] of [[9, -8], [14, -6], [9, 0], [14, 2], [9, 8], [14, 10], [6, 13]]) {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.08, 20), tt); t.position.set(x, 1.0, z); scene.add(t);
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 1, 8), tt); leg.position.set(x, 0.5, z); scene.add(leg);
    block(x - 1.1, x + 1.1, z - 1.1, z + 1.1);
    for (let k = 0; k < 3; k++) { const a = k * 2.094 + 0.5, s = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.6, 10), stool); s.position.set(x + Math.cos(a) * 1.5, 0.3, z + Math.sin(a) * 1.5); scene.add(s); }
  }
}

// ---- lobby dressing: a "now showing" standee + a few moviegoers ----
{
  const board = textPlane('NOW SHOWING', 5, 1.4, { color: '#fff', bg: '#0d0d1c', glow: '#00f3ff', sub: THEATERS.map((t) => t.name).join(' · ') });
  board.position.set(7, 2.3, 8); board.rotation.y = -0.5; scene.add(board);
  box(0.25, 1.6, 0.25, std({ color: 0x222233 }), 7, 0.8, 8);
  const npcMat = std({ color: 0x07070c, roughness: 1 });
  const spots = [[-6, 4], [-5, 5.2], [6, 3], [7.5, 4.5], [-9, -2], [3, -10], [-3, -12], [12, 14], [8, 15], [-12, 12]];
  const bodies = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.27, 0.8, 4, 8), npcMat, spots.length);
  const heads = new THREE.InstancedMesh(new THREE.SphereGeometry(0.21, 12, 10), npcMat, spots.length);
  const o = new THREE.Object3D();
  spots.forEach(([x, z], i) => { o.position.set(x, 0.95, z); o.updateMatrix(); bodies.setMatrixAt(i, o.matrix); o.position.set(x, 1.72, z); o.updateMatrix(); heads.setMatrixAt(i, o.matrix); });
  scene.add(bodies, heads);
}

// ---- first-person controller (tap-to-walk + WASD), walls + blockers ----
const player = { pos: new THREE.Vector3(0, 1.65, 16.5), yaw: 0, pitch: -0.02, keys: new Set(), target: null };
const R = 0.45;
const _t = new THREE.Vector3();
function applyCam() {
  camera.position.copy(player.pos);
  _t.set(player.pos.x - Math.sin(player.yaw) * Math.cos(player.pitch), player.pos.y + Math.sin(player.pitch), player.pos.z - Math.cos(player.yaw) * Math.cos(player.pitch));
  camera.lookAt(_t);
}
const easeAngle = (a, b, t) => a + (((b - a + Math.PI) % (Math.PI * 2)) - Math.PI) * t;
function collide() {
  const p = player.pos;
  p.x = THREE.MathUtils.clamp(p.x, -RX + R, RX - R); p.z = THREE.MathUtils.clamp(p.z, WALL_Z + 0.2, RZ - R);
  for (const b of blockers) {
    if (p.x > b.x0 - R && p.x < b.x1 + R && p.z > b.z0 - R && p.z < b.z1 + R) {
      const dx = Math.min(p.x - (b.x0 - R), b.x1 + R - p.x), dz = Math.min(p.z - (b.z0 - R), b.z1 + R - p.z);
      if (dx < dz) p.x = p.x - (b.x0 - R) < b.x1 + R - p.x ? b.x0 - R : b.x1 + R; else p.z = p.z - (b.z0 - R) < b.z1 + R - p.z ? b.z0 - R : b.z1 + R;
    }
  }
}
function moveUpdate(dt) {
  const k = player.keys;
  const fwd = (k.has('w') || k.has('arrowup') ? 1 : 0) - (k.has('s') || k.has('arrowdown') ? 1 : 0);
  const str = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0);
  const sp = 5 * (k.has('shift') ? 1.7 : 1);
  if (fwd || str) {
    const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
    let vx = -s * fwd + c * str, vz = -c * fwd - s * str; const l = Math.hypot(vx, vz) || 1;
    player.pos.x += (vx / l) * sp * dt; player.pos.z += (vz / l) * sp * dt; player.target = null;
  } else if (player.target) {
    _t.subVectors(player.target, player.pos); _t.y = 0;
    if (_t.length() < 0.5) player.target = null;
    else { _t.normalize(); player.pos.x += _t.x * 5 * dt; player.pos.z += _t.z * 5 * dt; player.yaw = easeAngle(player.yaw, Math.atan2(-_t.x, -_t.z), 1 - Math.pow(0.002, dt)); }
  }
  collide(); applyCam();
}
const inRect = (t) => player.pos.x > t.x0 && player.pos.x < t.x1 && player.pos.z > t.z0 && player.pos.z < t.z1;
function checkTriggers() {
  for (const t of triggers) {
    if (inRect(t)) { if (t.armed) { t.armed = false; t.run(); } } else if (!t.armed && !nearRect(t, 1.2)) t.armed = true;
  }
}
const nearRect = (t, m) => player.pos.x > t.x0 - m && player.pos.x < t.x1 + m && player.pos.z > t.z0 - m && player.pos.z < t.z1 + m;

// ---- input ----
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2(), GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  player.yaw -= (e.movementX || dx * 0.2) * 0.0045; player.pitch = THREE.MathUtils.clamp(player.pitch - (e.movementY || dy * 0.2) * 0.0045, -0.6, 0.5);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => {
  canvas.classList.remove('drag');
  if (down && !dragged) {
    ndc.x = (e.clientX / innerWidth) * 2 - 1; ndc.y = -(e.clientY / innerHeight) * 2 + 1; ray.setFromCamera(ndc, camera);
    const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3()); if (g) player.target = g;
  }
  down = null;
});
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
const MOVE = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'];
addEventListener('keydown', (e) => { const k = e.key.toLowerCase(); if (MOVE.includes(k) && !document.querySelector('.wp-ov.on')) { player.keys.add(k); player.target = null; } });
addEventListener('keyup', (e) => player.keys.delete(e.key.toLowerCase()));
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- HUD: quick-walk buttons, toast, warps ----
const toast = $('toast'); let toastT = 0;
function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 2200); }
function goTo(url, msg) {
  say(msg); $('warp').classList.add('go');
  setTimeout(() => { location.href = url; }, 520);
}
const spots = [
  ...THEATERS.map((t) => ({ label: t.id === 'chroma' ? '🎆 Chroma Awards' : t.id === 'void' ? '🌀 Enter the Void' : `🎬 ${t.name}`, x: doorXs[t.id], z: WALL_Z + 2.6, hot: t.id === 'chroma' })),
  { label: '🕹 Arcade', x: -17.2, z: 8.5 }, { label: '🗳 Vote', x: -17.5, z: -5 }, { label: '🍿 Food court', x: 12, z: 2 },
];
for (const s of spots) {
  const b = document.createElement('button'); b.className = `btn${s.hot ? ' hot' : ''}`; b.textContent = s.label;
  b.onclick = () => { player.target = new THREE.Vector3(s.x, 0, s.z); };
  $('goRow').appendChild(b);
}
$('backBtn').onclick = () => { $('warp').classList.add('go'); setTimeout(() => { location.href = 'index.html'; }, 480); };

// ---- loop ----
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05), t = clock.elapsedTime;
  moveUpdate(dt); checkTriggers();
  for (const a of animators) a(dt, t);
  renderer.render(scene, camera);
}
applyCam(); renderer.render(scene, camera);
$('enterBtn').onclick = () => { $('start').classList.add('gone'); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
if (import.meta.env.DEV || location.hash === '#debug') window.__lobby = { player, scene, applyCam };
