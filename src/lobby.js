import * as THREE from 'three';
import { createReducedMotion, prefersReducedMotion } from './player/motion.js';
import { textPlane } from './scene/signs.js';
import { votingBooth } from './scene/booth.js';
import { buildPhotoBooth } from './scene/photobooth.js';
import { buildStall } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { openVote } from './ui/vote.js';
import { THEATERS, ARCADE } from './data/theaters.js';

// THE LOBBY — a walkable movie-theater lobby. Straight ahead of the spawn is the
// CHROMA AWARDS theater, lit up like the Fourth of July (marquee bulbs, bunting,
// fireworks, a red carpet). Along the north wall are the other three theaters
// (9×16, 16×9, Enter the Void); the arcade runs down the west wall, a voting booth
// sits beside it, and the food court fills the east side.
//   · theater doors → walk through → that theater's page
//   · arcade terminal desk → the Arcade theater (a DreamOS terminal picks a game; it loads on the big screen)
//   · photo booth   → the Trippy Cam in the in-site window; merch tent → store.html
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
// door sizes by theater: the Chroma one is the grand entrance; the New Mobile door is
// tall and narrow (a portrait screen); the 2025 room gets a gold frame
const DOOR = { chroma: [5.6, 5.4], vertical: [3.2, 6], wide: [4.4, 4.2], void: [3.4, 4.4], chroma25: [3.6, 4.6] };
function theaterDoor(cfg, x, big) {
  const g = new THREE.Group(); g.position.set(x, 0, WALL_Z + 0.05); scene.add(g);
  const [w, h] = DOOR[cfg.id] || [3.2, 4.2], accent = hex(cfg.accent);
  const hole = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic(0x000000)); hole.position.set(0, h / 2, 0.03); g.add(hole);
  // a faint projector glow spilling out of the doorway
  const spill = new THREE.Mesh(new THREE.PlaneGeometry(w, h), basic(accent, { transparent: true, opacity: 0.18, toneMapped: false })); spill.position.set(0, h / 2, 0.04); g.add(spill);
  neonFrame(g, w, h, big ? WHITE : accent);
  const mw = big ? 12.5 : 5.4, mh = big ? 2.7 : 1.6, my = h + (big ? 2.1 : 1.3);
  const sign = textPlane(cfg.name, mw, mh, { color: big ? '#fff' : cfg.accent, bg: big ? '#16060c' : '#0a0a14', glow: big ? '#ff2a4a' : cfg.accent, sub: cfg.sub.toUpperCase() });
  sign.position.set(0, my, 0.1); g.add(sign);
  const hw = w / 2 - 0.1;
  trig(x - hw, x + hw, WALL_Z, WALL_Z + 1.6, () => goTo(cfg.page, `entering ${cfg.name}…`));
  return { g, w, h, mw, mh, my, accent };
}
const doors = {};
for (const t of THEATERS) doors[t.id] = theaterDoor(t, t.doorX, t.id === 'chroma');

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

// ---- PAPARAZZI on the red carpet: flashbulbs popping as you walk the runway ----
// (kept to ~3 flashes a second in total, and switched off for reduced-motion users)
{
  const suit = std({ color: 0x0b0b14, roughness: 1 }), skin = std({ color: 0x2a1f24, roughness: 1 }), camM = std({ color: 0x16161e, roughness: 0.5 });
  const lens = basic(0x9ab8ff);
  const sc = document.createElement('canvas'); sc.width = sc.height = 64;
  const sg = sc.getContext('2d'), gr = sg.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, '#fff'); gr.addColorStop(0.25, 'rgba(255,255,255,.85)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); sg.fillStyle = gr; sg.fillRect(0, 0, 64, 64);
  const flashTex = new THREE.CanvasTexture(sc);
  const pool = [0, 1, 2].map(() => { const l = new THREE.PointLight(0xffffff, 0, 10, 1.6); scene.add(l); return l; });
  let poolI = 0;
  const press = [0xff2a3a, 0xffd24a, 0x39ff14, 0x00f3ff];
  const figs = [];
  const zs = [-14, -10.5, -7, -3.5, 0, 3.5, 7.5, 11];
  zs.forEach((z, i) => {
    const sx = i % 2 ? 1 : -1, x = sx * (3.5 + (i % 3) * 0.35), zz = z + (i % 3) * 0.6;
    const g = new THREE.Group(); g.position.set(x, 0, zz); g.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2; scene.add(g);
    const bodyM = new THREE.Mesh(new THREE.CapsuleGeometry(0.27, 0.8, 4, 8), suit); bodyM.position.y = 0.95; g.add(bodyM);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.21, 12, 10), skin); head.position.y = 1.72; g.add(head);
    const tag = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.16, 0.04), basic(press[i % 4])); tag.position.set(0, 1.25, 0.27); g.add(tag);
    for (const ax of [-1, 1]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 0.5), suit); arm.position.set(ax * 0.2, 1.55, 0.3); g.add(arm); }
    const cam = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.2, 0.16), camM); cam.position.set(0, 1.72, 0.52); g.add(cam);
    const lz = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 10), lens); lz.rotation.x = Math.PI / 2; lz.position.set(0, 1.72, 0.66); g.add(lz);
    const flash = new THREE.Sprite(new THREE.SpriteMaterial({ map: flashTex, color: 0xffffff, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false }));
    flash.position.set(0, 1.78, 0.78); flash.scale.setScalar(0); g.add(flash);
    figs.push({ g, flash, next: 0.5 + Math.random() * 3.5, t: 0, ph: Math.random() * 6 });
  });
  animators.push((dt, t) => {
    const calm = prefersReducedMotion();
    for (const f of figs) {
      f.g.position.y = calm ? 0 : Math.abs(Math.sin(t * 2 + f.ph)) * 0.03;
      if (calm) { f.flash.scale.setScalar(0); continue; }
      f.next -= dt;
      if (f.next <= 0) {
        f.t = 0.14; f.next = 1.6 + Math.random() * 4.2;
        const l = pool[poolI++ % pool.length]; l.position.set(f.g.position.x * 0.8, 1.9, f.g.position.z); l.intensity = 26;
      }
      if (f.t > 0) { f.t -= dt; f.flash.scale.setScalar(1.3 + Math.random() * 0.5); } else f.flash.scale.setScalar(0);
    }
    for (const l of pool) l.intensity = Math.max(0, l.intensity - dt * 230);
  });
}

// ---- WALL FIXTURES: everything lives against the walls, vending-machine style, so the
// middle of the lobby (the red carpet and the paths to the theaters) stays clear ----
// world AABB for a local rect on a prop placed at (x, z) turned `rot` (multiple of π/2)
function wrect(x, z, rot, x0, x1, z0, z1) {
  const c = Math.round(Math.cos(rot)), s = Math.round(Math.sin(rot));
  const pts = [[x0, z0], [x0, z1], [x1, z0], [x1, z1]].map(([lx, lz]) => [x + lx * c + lz * s, z - lx * s + lz * c]);
  const xs = pts.map((p) => p[0]), zs = pts.map((p) => p[1]);
  return [Math.min(...xs), Math.max(...xs), Math.min(...zs), Math.max(...zs)];
}
const clickables = [];   // (ray) => boolean — tap/click on a prop

// DREAMOS ARCADE TERMINAL — a desk with a glowing monitor. Walk up or click it: it takes
// you to the Arcade theater, where the game you pick plays on the big movie screen.
{
  const x = -20.6, z = 4, rot = Math.PI / 2;
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; scene.add(g);
  const body = std({ color: 0x1a2a22, roughness: 0.6 });
  box(1.9, 0.85, 0.9, body, 0, 0.425, 0, g);
  box(1.2, 0.95, 0.5, std({ color: 0x0c1410, roughness: 0.5 }), 0, 1.33, -0.1, g);
  const scr = textPlane('DREAMOS', 1.0, 0.75, { color: '#39ff14', bg: '#02120a', glow: '#39ff14', sub: 'TERMINAL' });
  scr.position.set(0, 1.33, 0.16); g.add(scr);
  box(0.8, 0.04, 0.28, std({ color: 0x0c1410 }), 0, 0.87, 0.3, g);
  const L = new THREE.PointLight(0x39ff14, 6, 8, 1.7); L.position.set(0, 1.8, 0.8); g.add(L);
  const sign = textPlane('ARCADE TERMINAL', 5, 1.2, { color: '#39ff14', bg: '#0a0614', glow: '#39ff14', sub: 'PICK A GAME · IT PLAYS ON THE BIG SCREEN' });
  sign.position.set(0, 3.4, -0.46); g.add(sign);
  const pad = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.85, 36), basic(0x39ff14, { toneMapped: false })); pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.03, 1.3); g.add(pad);
  animators.push((dt, t) => { pad.scale.setScalar(1 + 0.08 * Math.sin(t * 4)); scr.material.color.setScalar(0.8 + 0.2 * Math.sin(t * 3)); });
  block(...wrect(x, z, rot, -1.0, 1.0, -0.55, 0.5));
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2, 2.4, 1.6), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(0, 1.2, 0.3); g.add(proxy);
  const go = () => goTo(ARCADE.page, 'booting the arcade…');
  clickables.push((ray) => (ray.intersectObject(proxy, false)[0] ? (go(), true) : false));
  const [x0, x1, z0, z1] = wrect(x, z, rot, -0.8, 0.8, 0.9, 1.7); trig(x0, x1, z0, z1, go);
}

// PHOTO BOOTH — the festival's curtained booth with the big glass lens. Step in (or click)
// and the Trippy Cam opens in a window: your webcam, turned psychedelic.
{
  const x = -21.15, z = -5, rot = Math.PI / 2;
  const open = () => openWindow('PHOTO BOOTH // TRIPPY CAM', 'https://g5kgb2qtzw2s.space.minimax.io/');
  const pb = buildPhotoBooth(scene, { pos: [x, 0, z], accent: '#00F3FF', onActivate: open });
  pb.group.rotation.y = rot;
  animators.push((dt, t) => pb.update(dt, t, 0.5 + 0.5 * Math.sin(t * 2)));
  block(...wrect(x, z, rot, -0.95, 0.95, -0.9, -0.7)); block(...wrect(x, z, rot, 0.79, 0.91, -0.9, 0.8)); block(...wrect(x, z, rot, -0.91, -0.79, -0.9, 0.8));
  const [x0, x1, z0, z1] = wrect(x, z, rot, -0.6, 0.6, -0.5, 0.5); trig(x0, x1, z0, z1, open);
  clickables.push((ray) => pb.tryClick(ray));
}

// MERCH TENT — the festival's striped stall, with the vendor, shirt stacks and tee rack.
// Walk up to the counter (or click it) → the 3D store.
{
  const x = -12, z = 18.6, rot = Math.PI;
  const st = buildStall('#39FF14');
  st.group.position.set(x, 0, z); st.group.rotation.y = rot; scene.add(st.group);
  animators.push((dt, t) => st.update(t, 0.5 + 0.5 * Math.sin(t * 2)));
  const sign = textPlane('MERCH TENT', 5, 1.1, { color: '#39ff14', bg: '#0a0614', glow: '#39ff14', sub: 'WALK UP TO THE COUNTER → THE 3D STORE' });
  sign.position.set(x, 4.6, 19.95); sign.rotation.y = Math.PI; scene.add(sign);
  block(...wrect(x, z, rot, -1.6, 1.6, 0.7, 1.3)); block(...wrect(x, z, rot, -1.6, 1.6, -1.3, -0.8));
  const go = () => goTo('store.html', 'off to the merch store…');
  const [x0, x1, z0, z1] = wrect(x, z, rot, -1.5, 1.5, 1.45, 2.4); trig(x0, x1, z0, z1, go);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.6, 2.6), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(0, 1.3, 0.4); st.group.add(proxy);
  clickables.push((ray) => (ray.intersectObject(proxy, false)[0] ? (go(), true) : false));
}

// VOTING BOOTHS — flush against the walls, away from the walkways. Walk in → the Chroma
// Awards vote page opens in the site.
const booths = [[-20.5, -13, 0], [-20.5, 12, 0], [12, 18.5, Math.PI / 2], [20.5, 17.5, Math.PI]];
for (const [x, z, r] of booths) {
  const b = votingBooth({ parent: scene, x, z, rotY: r });
  b.blockers.forEach((k) => block(k.x0, k.x1, k.z0, k.z1));
  const t = b.trigger; trig(t.x0, t.x1, t.z0, t.z1, openVote);
  animators.push(b.update);
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
  board.position.set(-12, 2.3, 9); board.rotation.y = 0.5; scene.add(board);
  box(0.25, 1.6, 0.25, std({ color: 0x222233 }), -12, 0.8, 9);
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
    if (!clickables.some((f) => f(ray))) { const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3()); if (g) player.target = g; }
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
const LABEL = { chroma25: '🏆 Chroma 2025', vertical: '📱 New Mobile', chroma: '🎆 Chroma Awards', wide: '🎬 16×9', void: '🌀 Enter the Void' };
const spots = [
  ...THEATERS.map((t) => ({ label: LABEL[t.id] || t.name, x: t.doorX, z: WALL_Z + 2.6, hot: t.id === 'chroma' })),
  { label: '🖥 Arcade terminal', x: -18.2, z: 4 }, { label: '📷 Photo booth', x: -19.2, z: -5 }, { label: '🛍 Merch', x: -12, z: 15.8 }, { label: '🗳 Vote', x: -19, z: -13 }, { label: '🍿 Food court', x: 12, z: 2 },
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
