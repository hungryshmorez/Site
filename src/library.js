import * as THREE from 'three';
import { createReducedMotion } from './player/motion.js';
import { textPlane } from './scene/signs.js';
import { openWindow } from './ui/popup.js';
import { LIBRARY } from './data/library.js';

// THE FEVER DREAM LIBRARY — a walkable reading room behind the lobby's east door.
//   · the long table holds one book per document — click a book to read it in the site
//   · the amber ARCHIVE TERMINAL (east wall) lists everything, with tabs + search
//   · the shelves are scenery; the back door returns to the lobby
// Documents are defined in data/library.js; files live in public/library/.

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
scene.background = new THREE.Color(0x070504);
scene.fog = new THREE.Fog(0x0a0705, 14, 34);
const camera = new THREE.PerspectiveCamera(68, innerWidth / innerHeight, 0.1, 80);

const std = (o) => new THREE.MeshStandardMaterial(o);
const basic = (c, o = {}) => new THREE.MeshBasicMaterial({ color: c, ...o });
const hex = (s) => parseInt(s.replace('#', ''), 16);
function box(w, h, d, mat, x, y, z, parent = scene) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(x, y, z); parent.add(m); return m; }

const RX = 11, RZ = 12, H = 6.5;
const AMBER = '#ffb000';

// ---- room ----
function woodTexture() {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#2a1a10'; g.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#33200f' : '#26170c'; g.fillRect(0, i * 32, 256, 31); }
  for (let i = 0; i < 160; i++) { g.fillStyle = `rgba(0,0,0,${Math.random() * 0.18})`; g.fillRect(Math.random() * 256, Math.random() * 256, 30 + Math.random() * 60, 1); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(8, 9); t.colorSpace = THREE.SRGBColorSpace; return t;
}
const floor = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ * 2), std({ map: woodTexture(), roughness: 0.8 }));
floor.rotation.x = -Math.PI / 2; scene.add(floor);
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ * 2), std({ color: 0x0d0805, roughness: 1 }));
ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
const wallMat = std({ color: 0x1d130b, roughness: 0.95 });
function wall(w, pos, rotY) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, H), wallMat); m.position.copy(pos); m.rotation.y = rotY; scene.add(m); }
wall(RX * 2, new THREE.Vector3(0, H / 2, -RZ), 0);
wall(RX * 2, new THREE.Vector3(0, H / 2, RZ), Math.PI);
wall(RZ * 2, new THREE.Vector3(-RX, H / 2, 0), Math.PI / 2);
wall(RZ * 2, new THREE.Vector3(RX, H / 2, 0), -Math.PI / 2);
scene.add(new THREE.AmbientLight(0x6a4a30, 1.0));
scene.add(new THREE.HemisphereLight(0xffcf90, 0x1a0e06, 0.6));

const blockers = [], triggers = [], animators = [], clickables = [];
const block = (x0, x1, z0, z1) => blockers.push({ x0, x1, z0, z1 });
const trig = (x0, x1, z0, z1, run) => triggers.push({ x0, x1, z0, z1, run, armed: true });

// ---- shelves: instanced book spines along the walls ----
const SPINES = ['#7a1f1f', '#1f3a5a', '#2f5a3a', '#6a4a1a', '#4a2a5a', '#8a6a2a', '#203a3a', '#5a2a2a', '#c9b99a', '#15151a'];
function shelfUnit(x, z, rotY, len) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rotY; scene.add(g);
  const wood = std({ color: 0x3a2412, roughness: 0.85 });
  box(len, H - 1, 0.1, std({ color: 0x120a05 }), 0, (H - 1) / 2 + 0.2, -0.3, g);
  const rows = 5, top = H - 1.2;
  for (let r = 0; r <= rows; r++) box(len, 0.08, 0.7, wood, 0, 0.3 + (r * (top - 0.3)) / rows, 0, g);
  box(0.1, top, 0.7, wood, -len / 2, top / 2 + 0.2, 0, g); box(0.1, top, 0.7, wood, len / 2, top / 2 + 0.2, 0, g);
  const dummy = new THREE.Object3D(), mats = SPINES.map((c) => std({ color: hex(c), roughness: 0.9 }));
  const meshes = mats.map(() => []);
  for (let r = 0; r < rows; r++) {
    const y0 = 0.34 + (r * (top - 0.3)) / rows, rh = (top - 0.3) / rows - 0.14;
    let px = -len / 2 + 0.2;
    while (px < len / 2 - 0.3) {
      const w = 0.07 + Math.random() * 0.1, h = rh * (0.72 + Math.random() * 0.26), m = (Math.random() * mats.length) | 0;
      meshes[m].push([px + w / 2, y0 + h / 2, w, h]); px += w + 0.01;
      if (Math.random() < 0.05) px += 0.25 + Math.random() * 0.4;
    }
  }
  meshes.forEach((arr, i) => {
    if (!arr.length) return;
    const im = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), mats[i], arr.length);
    arr.forEach(([bx, by, w, h], k) => { dummy.position.set(bx, by, 0.02); dummy.scale.set(w, h, 0.5); dummy.updateMatrix(); im.setMatrixAt(k, dummy.matrix); });
    g.add(im);
  });
}
// west wall: full run; east wall: two runs either side of the terminal alcove; north: behind the sign
shelfUnit(-RX + 0.45, -2, Math.PI / 2, 22);
shelfUnit(RX - 0.45, -6.5, -Math.PI / 2, 9); shelfUnit(RX - 0.45, 8.5, -Math.PI / 2, 6);
shelfUnit(-7.2, -RZ + 0.45, 0, 6.4); shelfUnit(7.2, -RZ + 0.45, 0, 6.4);
block(-RX, -RX + 0.9, -RZ, RZ); block(RX - 0.9, RX, -11, -2); block(RX - 0.9, RX, 5.5, 11.5);
block(-10.4, -4, -RZ, -RZ + 0.9); block(4, 10.4, -RZ, -RZ + 0.9);

// ---- title sign + lamps ----
const title = textPlane(LIBRARY.name, 7.5, 1.7, { color: AMBER, bg: '#0a0604', glow: AMBER, sub: LIBRARY.sub });
title.position.set(0, 3.9, -RZ + 0.08); scene.add(title);
const quote = textPlane('“A grueling, 57-minute analog death rattle.”', 7.5, 0.8, { color: '#ffe3a0', bg: '#0a0604' });
quote.position.set(0, 2.7, -RZ + 0.08); scene.add(quote);
for (const [x, z] of [[-6, -6], [6, -6], [-6, 4], [6, 4], [0, -1]]) {
  const l = new THREE.PointLight(0xffc070, 11, 17, 1.6); l.position.set(x, H - 1.2, z); scene.add(l);
  box(0.9, 0.05, 0.9, basic(0xffd9a0, { toneMapped: false }), x, H - 0.05, z);
}
const flick = scene.children.filter((o) => o.isPointLight);
animators.push((dt, t) => flick.forEach((l, i) => { l.intensity = 10.5 + 1.2 * Math.sin(t * 6 + i * 2.3) * (0.6 + 0.4 * Math.sin(t * 1.3 + i)); }));

// ---- the long table: one book per document ----
const TABLE = { x: 0, z: -3.2, w: 9, d: 2.4 };
box(TABLE.w, 0.12, TABLE.d, std({ color: 0x3b2514, roughness: 0.6 }), TABLE.x, 0.9, TABLE.z);
for (const sx of [-1, 1]) for (const sz of [-1, 1]) box(0.14, 0.9, 0.14, std({ color: 0x24150a }), TABLE.x + sx * (TABLE.w / 2 - 0.2), 0.45, TABLE.z + sz * (TABLE.d / 2 - 0.2));
block(TABLE.x - TABLE.w / 2 - 0.1, TABLE.x + TABLE.w / 2 + 0.1, TABLE.z - TABLE.d / 2 - 0.1, TABLE.z + TABLE.d / 2 + 0.1);
const KIND = { site: '#ffb000', bible: '#c0392b', script: '#2e86c1', prod: '#7d6608' };
const bookMeshes = [];
const docs = LIBRARY.docs, perRow = Math.ceil(docs.length / 2);
docs.forEach((d, i) => {
  const row = i < perRow ? 0 : 1, col = row ? i - perRow : i, n = row ? docs.length - perRow : perRow;
  const bx = TABLE.x + (col - (n - 1) / 2) * 1.5, bz = TABLE.z + (row ? 0.55 : -0.55);
  const g = new THREE.Group(); g.position.set(bx, 0.96, bz); g.rotation.y = (Math.random() - 0.5) * 0.25; scene.add(g);
  const cover = hex(KIND[d.kind] || '#888');
  const body = box(0.7, 0.14, 0.98, std({ color: cover, roughness: 0.7 }), 0, 0.07, 0, g);
  box(0.66, 0.1, 0.92, std({ color: 0xe8dcc0, roughness: 1 }), 0.03, 0.07, 0.02, g);
  const label = textPlane(d.short, 0.62, 0.86, { color: '#fff4d6', bg: '#' + cover.toString(16).padStart(6, '0'), sub: d.pages ? `${d.pages} PP` : d.kind === 'site' ? 'INTERACTIVE' : 'TEXT' });
  label.rotation.x = -Math.PI / 2; label.position.set(0, 0.146, 0); g.add(label);
  body.userData.doc = d; label.userData.doc = d; bookMeshes.push(body, label);
  const glow = new THREE.PointLight(cover, 1.6, 2.4, 1.6); glow.position.set(0, 0.7, 0); g.add(glow);
});

// reading nooks: armchairs + a floor lamp
for (const [x, z, r] of [[-7, 5, 0.6], [-7, -8, -0.4]]) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = r; scene.add(g);
  const m = std({ color: 0x4a1f1f, roughness: 0.9 });
  box(1.1, 0.5, 1.0, m, 0, 0.25, 0, g); box(1.1, 0.9, 0.25, m, 0, 0.75, -0.42, g); box(0.2, 0.7, 1.0, m, -0.5, 0.45, 0, g); box(0.2, 0.7, 1.0, m, 0.5, 0.45, 0, g);
  block(x - 0.8, x + 0.8, z - 0.8, z + 0.8);
}

// ---- ARCHIVE TERMINAL: its own amber desk on the east wall ----
{
  const x = RX - 1.5, z = 1.6, rot = -Math.PI / 2;
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rot; scene.add(g);
  const body = std({ color: 0x2a1c0c, roughness: 0.6 });
  box(2.0, 0.85, 0.9, body, 0, 0.425, 0, g);
  box(1.25, 1.0, 0.55, std({ color: 0x120c05, roughness: 0.5 }), 0, 1.35, -0.1, g);
  const scr = textPlane('ARCHIVE', 1.05, 0.8, { color: AMBER, bg: '#0a0600', glow: AMBER, sub: 'TERMINAL' });
  scr.position.set(0, 1.35, 0.18); g.add(scr);
  box(0.85, 0.04, 0.3, std({ color: 0x120c05 }), 0, 0.87, 0.3, g);
  const L = new THREE.PointLight(0xffb000, 7, 8, 1.7); L.position.set(0, 1.8, 0.9); g.add(L);
  const sign = textPlane('ARCHIVE TERMINAL', 4, 0.9, { color: AMBER, bg: '#0a0600', glow: AMBER, sub: 'SEARCH EVERY DOCUMENT' });
  sign.position.set(0, 3.2, -0.42); g.add(sign);
  const pad = new THREE.Mesh(new THREE.RingGeometry(0.5, 0.8, 36), basic(0xffb000, { toneMapped: false })); pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.03, 1.3); g.add(pad);
  animators.push((dt, t) => { pad.scale.setScalar(1 + 0.08 * Math.sin(t * 4)); scr.material.color.setScalar(0.8 + 0.2 * Math.sin(t * 3)); });
  block(x - 0.6, x + 0.6, z - 1.1, z + 1.1);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 1.6), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(0, 1.2, 0.3); g.add(proxy);
  clickables.push((ray) => (ray.intersectObject(proxy, false)[0] ? (openTerm(), true) : false));
  trig(x - 2.1, x - 0.75, z - 0.8, z + 0.8, openTerm);
}

// ---- exit door (south wall) back to the lobby ----
{
  const g = new THREE.Group(); g.position.set(0, 0, RZ - 0.05); g.rotation.y = Math.PI; scene.add(g);
  box(2.6, 3.4, 0.1, basic(0x000000), 0, 1.7, 0, g);
  const m = basic(0xff2bd0, { toneMapped: false });
  box(0.14, 3.5, 0.16, m, -1.4, 1.75, 0.04, g); box(0.14, 3.5, 0.16, m, 1.4, 1.75, 0.04, g); box(2.94, 0.14, 0.16, m, 0, 3.5, 0.04, g);
  const s = textPlane('BACK TO THE LOBBY', 3.6, 0.7, { color: '#ff2bd0', bg: '#0a0614', glow: '#ff2bd0' }); s.position.set(0, 4.2, 0.08); g.add(s);
  trig(-1.2, 1.2, RZ - 1.1, RZ, () => goTo('lobby.html', 'back to the lobby…'));
}

// ---- terminal UI ----
const termEl = $('term'), listEl = $('termList'), tabsEl = $('termTabs');
let tab = 'all', query = '';
const ICON = { site: '🖥', bible: '📕', script: '📘', prod: '📜' };
const search = document.createElement('input'); search.type = 'search'; search.placeholder = 'search…'; search.setAttribute('aria-label', 'Search documents');
function openDoc(d) { termEl.classList.remove('on'); openWindow('FEVER DREAM // ' + d.title.toUpperCase(), d.url); }
function renderTerm() {
  tabsEl.replaceChildren();
  for (const [k, label] of [...LIBRARY.tabs, ['how', 'HOW IT WAS MADE']]) {
    const b = document.createElement('button'); b.textContent = label; b.className = tab === k ? 'on' : ''; b.onclick = () => { tab = k; renderTerm(); }; tabsEl.appendChild(b);
  }
  tabsEl.appendChild(search);
  listEl.replaceChildren();
  if (tab === 'how') {
    const p = document.createElement('div'); p.className = 'lt-proc';
    p.innerHTML = `<div class="lt-intro">${LIBRARY.blurb}</div>` + LIBRARY.process.map(([a, b]) => `<p><b>${a}</b>${b}</p>`).join('');
    listEl.appendChild(p); return;
  }
  const q = query.trim().toLowerCase();
  for (const d of docs) {
    if (tab !== 'all' && d.kind !== tab && !(tab === 'bible' && d.kind === 'site')) continue;
    if (q && !(d.title + ' ' + d.desc + ' ' + d.short).toLowerCase().includes(q)) continue;
    const r = document.createElement('button'); r.className = 'lt-row';
    const meta = [d.pages ? d.pages + ' pp' : '', d.size].filter(Boolean).join(' · ');
    r.innerHTML = `<span class="ic">${ICON[d.kind]}</span><span><span class="t"></span><span class="m"></span><span class="d"></span></span>`;
    r.querySelector('.t').textContent = d.title; r.querySelector('.m').textContent = meta; r.querySelector('.d').textContent = d.desc;
    r.onclick = () => openDoc(d); listEl.appendChild(r);
  }
  if (!listEl.children.length) listEl.textContent = 'no matches.';
}
search.addEventListener('input', () => { query = search.value; const pos = search.selectionStart; renderTerm(); const s = tabsEl.querySelector('input'); s.value = query; s.focus(); s.setSelectionRange(pos, pos); });
function openTerm() { termEl.classList.add('on'); player.keys.clear(); renderTerm(); }
$('termX').onclick = () => termEl.classList.remove('on');
termEl.addEventListener('pointerdown', (e) => { if (e.target === termEl) termEl.classList.remove('on'); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') termEl.classList.remove('on'); });

// ---- player ----
const player = { pos: new THREE.Vector3(0, 1.65, 9.2), yaw: 0, pitch: -0.05, keys: new Set(), target: null };
const R = 0.45, _t = new THREE.Vector3();
function applyCam() {
  camera.position.copy(player.pos);
  _t.set(player.pos.x - Math.sin(player.yaw) * Math.cos(player.pitch), player.pos.y + Math.sin(player.pitch), player.pos.z - Math.cos(player.yaw) * Math.cos(player.pitch));
  camera.lookAt(_t);
}
const easeAngle = (a, b, t) => a + (((b - a + Math.PI) % (Math.PI * 2)) - Math.PI) * t;
function collide() {
  const p = player.pos;
  p.x = THREE.MathUtils.clamp(p.x, -RX + R, RX - R); p.z = THREE.MathUtils.clamp(p.z, -RZ + R, RZ - 0.1);
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
  const sp = 4.5 * (k.has('shift') ? 1.7 : 1);
  if (fwd || str) {
    const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
    const vx = -s * fwd + c * str, vz = -c * fwd - s * str, l = Math.hypot(vx, vz) || 1;
    player.pos.x += (vx / l) * sp * dt; player.pos.z += (vz / l) * sp * dt; player.target = null;
  } else if (player.target) {
    _t.subVectors(player.target, player.pos); _t.y = 0;
    if (_t.length() < 0.5) player.target = null;
    else { _t.normalize(); player.pos.x += _t.x * 4.5 * dt; player.pos.z += _t.z * 4.5 * dt; player.yaw = easeAngle(player.yaw, Math.atan2(-_t.x, -_t.z), 1 - Math.pow(0.002, dt)); }
  }
  collide(); applyCam();
}
const inRect = (t) => player.pos.x > t.x0 && player.pos.x < t.x1 && player.pos.z > t.z0 && player.pos.z < t.z1;
const nearRect = (t, m) => player.pos.x > t.x0 - m && player.pos.x < t.x1 + m && player.pos.z > t.z0 - m && player.pos.z < t.z1 + m;
function checkTriggers() {
  for (const t of triggers) {
    if (inRect(t)) { if (t.armed) { t.armed = false; t.run(); } } else if (!t.armed && !nearRect(t, 1.2)) t.armed = true;
  }
}

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
    const hit = ray.intersectObjects(bookMeshes, false)[0];
    if (hit) openDoc(hit.object.userData.doc);
    else if (!clickables.some((f) => f(ray))) { const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3()); if (g) player.target = g; }
  }
  down = null;
});
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
const MOVE = ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'];
addEventListener('keydown', (e) => {
  const k = e.key.toLowerCase();
  if (MOVE.includes(k) && !document.querySelector('.wp-ov.on') && !termEl.classList.contains('on')) { player.keys.add(k); player.target = null; }
});
addEventListener('keyup', (e) => player.keys.delete(e.key.toLowerCase()));
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- HUD ----
const toast = $('toast'); let toastT = 0;
function say(msg) { toast.textContent = msg; toast.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => toast.classList.remove('on'), 2200); }
function goTo(url, msg) { say(msg); $('warp').classList.add('go'); setTimeout(() => { location.href = url; }, 520); }
const spots = [
  { label: '📚 The table', x: 0, z: 0.4, hot: true }, { label: '🖥 Archive terminal', x: RX - 3.4, z: 1.6 },
  { label: '🛋 Reading nook', x: -5.6, z: 5 }, { label: '🚪 Lobby', x: 0, z: 10.4 },
];
for (const s of spots) {
  const b = document.createElement('button'); b.className = `btn${s.hot ? ' hot' : ''}`; b.textContent = s.label;
  b.onclick = () => { player.target = new THREE.Vector3(s.x, 0, s.z); };
  $('goRow').appendChild(b);
}
$('backBtn').onclick = () => goTo('lobby.html', 'back to the lobby…');

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
if (import.meta.env.DEV || location.hash === '#debug') window.__lib = { player, scene, applyCam, openTerm };
