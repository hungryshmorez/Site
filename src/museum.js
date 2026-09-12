import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { createAdmin } from './scene/admin.js';

// THE GALLERY — a quiet walkable museum. Marble hall, framed pieces down both
// long walls (portraits of the roster + the worlds beyond the festival), a
// sculpture in the middle, benches to sit near. Walk up to any picture and its
// plaque rises at the bottom of the screen. Same Three.js + WalkControls stack
// as every other world; a portal on the entrance wall takes you home.

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
renderer.shadowMap.enabled = !isMobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141118);
scene.fog = new THREE.FogExp2(0x141118, 0.018);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 160);

// ---------- room shell ----------
const HX = 10, H = 7, ZMIN = -18, ZMAX = 18;
{
  const wallMat = std({ color: 0x2a2632, roughness: 0.92, metalness: 0.04 });
  const trimMat = std({ color: 0x3a3446, roughness: 0.8 });
  const mkWall = (w, h, pos, rotY) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
    m.position.copy(pos); if (rotY) m.rotation.y = rotY; m.receiveShadow = true; scene.add(m); return m;
  };
  const depth = ZMAX - ZMIN, midZ = (ZMAX + ZMIN) / 2;
  mkWall(HX * 2, H, new THREE.Vector3(0, H / 2, ZMIN));                 // far (north)
  mkWall(HX * 2, H, new THREE.Vector3(0, H / 2, ZMAX), Math.PI);         // entrance (south)
  mkWall(depth, H, new THREE.Vector3(-HX, H / 2, midZ), Math.PI / 2);    // left
  mkWall(depth, H, new THREE.Vector3(HX, H / 2, midZ), -Math.PI / 2);    // right
  // baseboard + dado rail trim on the long walls
  for (const sx of [-HX + 0.02, HX - 0.02]) {
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.4, depth), trimMat);
    base.position.set(sx, 0.2, midZ); scene.add(base);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, depth), trimMat);
    rail.position.set(sx, 3.2, midZ); scene.add(rail);
  }

  // marble floor — veined canvas texture
  const fc = document.createElement('canvas'); fc.width = fc.height = 256;
  const fx = fc.getContext('2d');
  fx.fillStyle = '#d9d4c8'; fx.fillRect(0, 0, 256, 256);
  fx.strokeStyle = 'rgba(150,140,120,0.35)'; fx.lineWidth = 1.2;
  for (let i = 0; i < 40; i++) {
    fx.beginPath(); let x = Math.random() * 256, y = Math.random() * 256; fx.moveTo(x, y);
    for (let j = 0; j < 5; j++) { x += (Math.random() - 0.5) * 90; y += (Math.random() - 0.5) * 90; fx.lineTo(x, y); }
    fx.stroke();
  }
  // subtle checker tint
  fx.fillStyle = 'rgba(60,50,40,0.06)';
  for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++) if ((a + b) % 2) fx.fillRect(a * 32, b * 32, 32, 32);
  const ftex = new THREE.CanvasTexture(fc); ftex.wrapS = ftex.wrapT = THREE.RepeatWrapping;
  ftex.repeat.set(6, depth / (HX * 2) * 6); ftex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(HX * 2, depth), std({ map: ftex, roughness: 0.35, metalness: 0.1 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, midZ); floor.receiveShadow = true; scene.add(floor);

  // coffered dark ceiling + warm light strips
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(HX * 2, depth), std({ color: 0x171420, roughness: 1 }));
  ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, midZ); scene.add(ceil);
  for (const sx of [-5.2, 5.2]) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.5, depth - 2), new THREE.MeshBasicMaterial({ color: 0xfff1d6 }));
    strip.rotation.x = Math.PI / 2; strip.position.set(sx, H - 0.05, midZ); scene.add(strip);
  }
}

// ---------- lighting ----------
scene.add(new THREE.HemisphereLight(0xfff4e2, 0x2a2634, 0.9));
const amb = new THREE.AmbientLight(0xffffff, 0.25); scene.add(amb);
// warm ceiling wash down the hall
for (let z = ZMIN + 4; z <= ZMAX - 4; z += 7) {
  const pl = new THREE.PointLight(0xffe9c4, 0.5, 22, 2); pl.position.set(0, H - 0.6, z); scene.add(pl);
}

// ---------- the collection ----------
// Each piece: title/artist/year/blurb for the plaque, an accent, an aspect
// ('portrait'|'landscape'), and a paint(ctx,w,h) generator. Drop in `src:'url'`
// on any piece later to hang a real photo instead of the generated art.
const PIECES = [
  { title: 'RAVE CHARLES', artist: 'headliner · 2014–2020', year: 'neon on void', accent: '#ff0055', aspect: 'portrait',
    blurb: 'The masked headliner in the pit — LED visor glowing over a coast-to-coast tour. Nearly 400 shows.', paint: paintRaver },
  { title: 'STATIC CORP', artist: 'DriftWave Static', year: 'slushwave', accent: '#b967ff', aspect: 'landscape',
    blurb: 'A chrome vaporwave dreamscape — striped sun, marble temple, a dead mallsoft arcade at 3am.', paint: paintVapor },
  { title: 'S’MORES LAND', artist: 'SHMOREZ', year: 'ember study', accent: '#ff6b35', aspect: 'portrait',
    blurb: 'A toasted marshmallow man squishing to the bass by a bonfire of chocolate walls and marshmallow boulders.', paint: paintFire },
  { title: 'INTO THE VOID', artist: 'Tanky Johnson', year: 'cosmic western', accent: '#e6c04a', aspect: 'landscape',
    blurb: 'The outlaw of the void — neon honky-tonk, a lifted truck at the tailgate, mesas under a giant moon.', paint: paintWestern },
  { title: 'SO FA KING', artist: 'Sofa King Sad Boi', year: 'rain / bass', accent: '#6a6cff', aspect: 'portrait',
    blurb: 'Hood up on a beat-up couch under a personal rain cloud. A kingdom of sofas where the subs wobble.', paint: paintRain },
  { title: 'SIGNAL LOST', artist: '12matt3r', year: 'glitch · RGB split', accent: '#00f3ff', aspect: 'landscape',
    blurb: 'The web-OS and glitch engine driving every screen at the festival — datamosh, CRT snow, code.', paint: paintGlitch },
  { title: 'THE CROWD', artist: 'the festival', year: 'glowstick sea', accent: '#39ff14', aspect: 'landscape',
    blurb: 'Ten thousand hands and glowsticks pulsing on the beat — the sea you walk through to reach the stage.', paint: paintCrowd },
  { title: 'MAIN STAGE', artist: 'the festival', year: 'lasers', accent: '#00f3ff', aspect: 'portrait',
    blurb: 'The north wall — LED screen, truss, and lasers cutting the haze at 128 BPM.', paint: paintStage },
  { title: 'DEEP FIELD', artist: 'after hours', year: 'ambient', accent: '#b967ff', aspect: 'landscape',
    blurb: 'When the set ends and the field empties, the sky opens up over the tents.', paint: paintNebula },
  { title: 'CIRCUITRY', artist: 'the lab', year: 'generative', accent: '#39ff14', aspect: 'portrait',
    blurb: 'A study from the Lab — the playable, experimental side of the collective.', paint: paintCircuit },
  { title: 'SUNSET DRIVE', artist: 'DriftWave Static', year: 'gradient', accent: '#ff7ad9', aspect: 'landscape',
    blurb: 'An endless synthwave highway toward a low, banded sun. Windows down, no destination.', paint: paintSunset },
  { title: 'PORTRAIT OF NOISE', artist: '12matt3r', year: 'static', accent: '#ffffff', aspect: 'portrait',
    blurb: 'Pure signal noise, framed and dignified. Every festival needs one impossible piece.', paint: paintNoise },
];

// generated art → CanvasTexture
function artTexture(piece) {
  const portrait = piece.aspect === 'portrait';
  const w = portrait ? 512 : 720, h = portrait ? 720 : 512;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#08060c'; ctx.fillRect(0, 0, w, h);
  piece.paint(ctx, w, h, piece.accent);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  return { tex, w, h };
}

// plaque plate texture (dark brushed metal + engraved title)
function plaqueTexture(piece) {
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 160;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#141017'; ctx.fillRect(0, 0, 512, 160);
  ctx.strokeStyle = piece.accent; ctx.globalAlpha = 0.55; ctx.lineWidth = 4; ctx.strokeRect(8, 8, 496, 144); ctx.globalAlpha = 1;
  ctx.fillStyle = '#f4efe6'; ctx.textAlign = 'center'; ctx.font = 'bold 40px Georgia, serif';
  ctx.fillText(piece.title, 256, 66);
  ctx.fillStyle = '#b7ae9e'; ctx.font = 'italic 26px Georgia, serif';
  ctx.fillText(`${piece.artist} · ${piece.year}`, 256, 112);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace; return tex;
}

// hang one framed piece; returns its info for proximity captions
const frames = [];
const adminItems = [];   // movable pieces for the layout editor
let admin = null;
function hang(piece, x, z, rotY) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rotY; scene.add(g);
  const { tex, w, h } = artTexture(piece);
  const portrait = piece.aspect === 'portrait';
  const artW = portrait ? 1.7 : 2.5, artH = artW * (h / w);
  const cy = 2.05; // eye-height center

  // frame (gilded/dark box) + matboard behind the art
  const frameCol = C(0x1a1510).lerp(C(piece.accent), 0.08);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(artW + 0.34, artH + 0.34, 0.12), std({ color: frameCol, metalness: 0.5, roughness: 0.45, emissive: C(piece.accent), emissiveIntensity: 0.06 }));
  frame.position.set(0, cy, 0.06); frame.castShadow = true; g.add(frame);
  const mat = new THREE.Mesh(new THREE.PlaneGeometry(artW + 0.12, artH + 0.12), std({ color: 0x0e0b12, roughness: 1 }));
  mat.position.set(0, cy, 0.13); g.add(mat);
  // the art — mapped + gently self-lit so it always reads under gallery light
  const art = new THREE.Mesh(new THREE.PlaneGeometry(artW, artH), std({ map: tex, emissive: 0xffffff, emissiveMap: tex, emissiveIntensity: 0.35, roughness: 0.85, metalness: 0 }));
  art.position.set(0, cy, 0.14); g.add(art);

  // picture light: a little brass fixture + spotlight raking down the canvas
  const fixture = new THREE.Mesh(new THREE.BoxGeometry(artW * 0.7, 0.08, 0.2), std({ color: 0x2a2118, metalness: 0.7, roughness: 0.4 }));
  fixture.position.set(0, cy + artH / 2 + 0.3, 0.36); g.add(fixture);
  // real picture-light only on desktop — on mobile the emissive art already
  // reads, and ~14 spotlights would tax the tile GPU. Keep the brass fixture.
  if (!isMobile) {
    const spot = new THREE.SpotLight(0xfff2da, 5, 6.5, 0.72, 0.6, 1.4);
    spot.position.set(0, cy + artH / 2 + 0.3, 0.5);
    spot.target.position.set(0, cy, 0.14); g.add(spot); g.add(spot.target);
  }

  // plaque below the frame
  const plq = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.28), std({ map: plaqueTexture(piece), roughness: 0.6, metalness: 0.3 }));
  plq.position.set(0, cy - artH / 2 - 0.42, 0.14); g.add(plq);

  // world-space center + inward normal for the proximity check
  const center = new THREE.Vector3(x, cy, z);
  const normal = new THREE.Vector3(Math.sin(rotY), 0, Math.cos(rotY)); // +Z of the group, in world
  frames.push({ piece, center, normal });
  // editor: the piece is movable; worldPos keeps the proximity-caption center in sync
  adminItems.push({ id: 'art_' + adminItems.length, label: piece.title, obj: g, worldPos: center });
}

// place pieces down both long walls, then two on the far wall
const leftWall = -HX + 0.14, rightWall = HX - 0.14, farWall = ZMIN + 0.14;
const wallPieces = PIECES.slice(0, 10);
const spanZ = [-13, -7, -1, 5, 11];
spanZ.forEach((z, i) => {
  hang(wallPieces[i], leftWall, z, Math.PI / 2);      // left wall faces +X (rotY 90 → normal +X)
  hang(wallPieces[i + 5], rightWall, z, -Math.PI / 2); // right wall faces -X
});
hang(PIECES[10], -3.2, farWall, 0);  // far wall faces +Z (into room)
hang(PIECES[11], 3.2, farWall, 0);

// ---------- centerpiece sculpture + benches ----------
{
  const marble = std({ color: 0xe7e2d6, roughness: 0.5, metalness: 0.08 });
  const centerG = new THREE.Group(); scene.add(centerG);   // pedestal + sculpture, movable as one
  const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.85, 1.1, 24), std({ color: 0xcfc9ba, roughness: 0.7 }));
  pedestal.position.set(0, 0.55, 0); pedestal.castShadow = pedestal.receiveShadow = true; centerG.add(pedestal);
  const sculpt = new THREE.Mesh(new THREE.TorusKnotGeometry(0.5, 0.17, 160, 24, 2, 3), marble);
  sculpt.position.set(0, 1.9, 0); sculpt.castShadow = true; centerG.add(sculpt);
  const key = new THREE.SpotLight(0xfff4e0, 6, 10, 0.6, 0.5, 1); key.position.set(0, H - 0.5, 0); key.target.position.set(0, 1.9, 0); centerG.add(key); centerG.add(key.target);
  window.__sculpt = sculpt;
  adminItems.push({ id: 'sculpture', label: 'SCULPTURE', obj: centerG });

  // two benches flanking the sculpture
  const benchMat = std({ color: 0x2c2620, roughness: 0.7 });
  let bi = 0;
  for (const bz of [-5.5, 5.5]) {
    const b = new THREE.Group(); b.position.set(0, 0, bz);
    const seat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.16, 0.7), benchMat); seat.position.y = 0.5; seat.castShadow = true; b.add(seat);
    for (const lx of [-1.1, 1.1]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.5, 0.6), benchMat); leg.position.set(lx, 0.25, 0); b.add(leg); }
    scene.add(b);
    adminItems.push({ id: 'bench_' + (bi++), label: 'BENCH', obj: b });
  }
}

// ---------- exit portal on the entrance (south) wall ----------
let exitCenter = new THREE.Vector3(0, 1.4, ZMAX - 0.2);
let exitPortal = null;
{
  const accent = '#e6c04a';
  const col = C(accent);
  const DW = 2, DH = 2.8;
  const portalMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { t: { value: 0 }, c: { value: new THREE.Vector3(col.r, col.g, col.b) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: `varying vec2 vUv; uniform float t; uniform vec3 c;
      void main(){ vec2 u=vUv-0.5; float r=length(u);
        float rings=0.5+0.5*sin(r*26.0 - t*3.0);
        float v=smoothstep(0.55,0.0,r)*(0.3+0.55*rings);
        vec3 col=mix(vec3(0.02,0.015,0.0), c, v);
        gl_FragColor=vec4(col, 0.94); }`,
  });
  const portal = new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), portalMat);
  portal.position.set(0, DH / 2, ZMAX - 0.12); portal.rotation.y = Math.PI; scene.add(portal);
  exitPortal = portal;
  const glow = new THREE.PointLight(accent, 3, 10, 2); glow.position.set(0, 1.6, ZMAX - 1); scene.add(glow);
  window.__portalMat = portalMat;
  exitCenter.set(0, 1.4, ZMAX - 0.12);
}

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 100, eye: 1.6, zMin: -100 });
controls.pos.set(0, 1.6, 12); controls.yaw = 0; controls.speed = 5.4;   // spawn inside the gallery, facing in
controls.update(0);

// layout editor: rearrange the art, sculpture + benches (✎ button / `~` key)
admin = createAdmin({ scene, camera, renderer, controls, worldId: 'museum', items: adminItems, overhead: { ax: 40, az: 40, cx: 0, cz: 0 } });

// drag-look + click (auto-walk to a picture / step through the exit)
let dragging = false, lastX = 0, lastY = 0, moved = 0;
const ndc = new THREE.Vector2(); const ray = new THREE.Raycaster();
canvas.addEventListener('pointerdown', (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; canvas.classList.add('drag'); canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', (e) => { if (!dragging) return; const dx = e.clientX - lastX, dy = e.clientY - lastY; moved += Math.abs(dx) + Math.abs(dy); lastX = e.clientX; lastY = e.clientY; if (!(admin && admin.active)) controls.look(dx, dy); });
canvas.addEventListener('pointerup', (e) => { dragging = false; canvas.classList.remove('drag'); if (moved < 6) onTap(e.clientX, e.clientY); });

function onTap(sx, sy) {
  if (admin && admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  // only leave when you actually tap the glowing exit portal (or use the back button /
  // walk into it) — a tap anywhere else just walks you there
  if (exitPortal && ray.intersectObject(exitPortal, false)[0]) { goHome(); return; }
  const floorHit = ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), new THREE.Vector3());
  if (floorHit) { floorHit.y = 1.6; controls.walkTo(floorHit); }
}

// ---------- proximity caption ----------
const capEl = document.getElementById('caption');
const capTitle = document.getElementById('capTitle');
const capMeta = document.getElementById('capMeta');
const capBlurb = document.getElementById('capBlurb');
const _view = new THREE.Vector3(), _to = new THREE.Vector3();
let shownTitle = null;
function updateCaption() {
  camera.getWorldDirection(_view);
  let best = null, bestScore = 0;
  for (const f of frames) {
    _to.subVectors(f.center, controls.pos); const dist = _to.length();
    if (dist > 6) continue;
    _to.normalize();
    const facing = _to.dot(_view);              // am I looking at it?
    const front = -_to.dot(f.normal);           // am I in front of it? (normal points into room)
    if (facing < 0.55 || front < 0.2) continue;
    const score = facing * (1 - dist / 6);
    if (score > bestScore) { bestScore = score; best = f; }
  }
  if (best && best.piece.title !== shownTitle) {
    shownTitle = best.piece.title;
    capTitle.textContent = best.piece.title;
    capMeta.textContent = `${best.piece.artist} · ${best.piece.year}`;
    capBlurb.textContent = best.piece.blurb;
    capEl.classList.add('show');
  } else if (!best && shownTitle) {
    shownTitle = null; capEl.classList.remove('show');
  }
}

// ---------- zone label + exit hint ----------
const hintEl = document.getElementById('hint');
function updateHint() {
  const nearExit = Math.hypot(controls.pos.x - exitCenter.x, controls.pos.z - exitCenter.z) < 4;
  if (hintEl) hintEl.classList.toggle('show', nearExit);
}

// ---------- back / exit ----------
let exitArmed = false, exiting = false;
function goHome() {
  if (exiting) return; exiting = true;
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'warehouse.html'; }, 470);
}
document.getElementById('backBtn').onclick = goHome;

// ---------- loop ----------
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  if (!(admin && admin.active)) {
    // keep the visitor inside the hall (rectangular clamp)
    controls.pos.x = THREE.MathUtils.clamp(controls.pos.x, -HX + 0.5, HX - 0.5);
    controls.pos.z = THREE.MathUtils.clamp(controls.pos.z, ZMIN + 0.5, ZMAX - 0.5);
    // keep-out ring around the sculpture pedestal
    const d = Math.hypot(controls.pos.x, controls.pos.z);
    if (d < 1.6 && d > 0.001) { const s = 1.6 / d; controls.pos.x *= s; controls.pos.z *= s; }
    // walk right up to the exit portal to leave (armed once you've stepped away from it)
    { const ex = Math.hypot(controls.pos.x - exitCenter.x, controls.pos.z - exitCenter.z); if (ex > 2.5) exitArmed = true; if (exitArmed && ex < 1.25) goHome(); }
    updateCaption();
    updateHint();
  }
  if (window.__sculpt) window.__sculpt.rotation.y = t * 0.25;
  if (window.__portalMat) window.__portalMat.uniforms.t.value = t;
  admin.update(dt);
  renderer.render(scene, admin && admin.active ? admin.cam : camera);
}
controls.update(0);
renderer.render(scene, camera);

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(innerWidth, innerHeight);
});
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};

// ------------------------------------------------------------------ ART
// Small library of on-brand generators. Each fills an already-dark canvas.
function paintRaver(ctx, w, h, accent) {
  const g = ctx.createRadialGradient(w / 2, h * 0.42, 10, w / 2, h * 0.42, h * 0.7);
  g.addColorStop(0, accent); g.addColorStop(0.4, '#3a0018'); g.addColorStop(1, '#08060c');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // silhouette head + visor
  ctx.fillStyle = '#0a0810'; ctx.beginPath(); ctx.ellipse(w / 2, h * 0.5, w * 0.22, h * 0.26, 0, 0, 7); ctx.fill();
  ctx.fillStyle = accent; ctx.globalAlpha = 0.9; ctx.fillRect(w * 0.32, h * 0.44, w * 0.36, h * 0.06);
  ctx.globalAlpha = 1;
  // raised hands
  ctx.strokeStyle = accent; ctx.lineWidth = 6;
  for (let i = 0; i < 14; i++) { const x = Math.random() * w, y = h * 0.75 + Math.random() * h * 0.2; ctx.beginPath(); ctx.moveTo(x, h); ctx.lineTo(x + (Math.random() - 0.5) * 20, y); ctx.stroke(); }
}
function paintVapor(ctx, w, h, accent) {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a1a4a'); g.addColorStop(0.55, '#b967ff'); g.addColorStop(1, '#ff7ad9');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // banded sun
  ctx.fillStyle = '#ffe36b'; ctx.beginPath(); ctx.arc(w / 2, h * 0.42, h * 0.26, 0, 7); ctx.fill();
  ctx.fillStyle = '#2a1a4a'; for (let i = 0; i < 7; i++) ctx.fillRect(w * 0.2, h * 0.42 + i * 12, w * 0.6, 6);
  // grid floor
  ctx.strokeStyle = 'rgba(0,255,255,0.7)'; ctx.lineWidth = 2;
  for (let i = -10; i <= 10; i++) { ctx.beginPath(); ctx.moveTo(w / 2, h * 0.6); ctx.lineTo(w / 2 + i * w * 0.12, h); ctx.stroke(); }
  for (let j = 0; j < 8; j++) { const y = h * 0.6 + Math.pow(j / 8, 2) * h * 0.4; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
}
function paintFire(ctx, w, h, accent) {
  const g = ctx.createRadialGradient(w / 2, h * 0.72, 10, w / 2, h * 0.72, h * 0.8);
  g.addColorStop(0, '#fff2b0'); g.addColorStop(0.3, accent); g.addColorStop(0.7, '#7a1500'); g.addColorStop(1, '#08060c');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // flames
  for (let i = 0; i < 40; i++) { const x = w / 2 + (Math.random() - 0.5) * w * 0.5, y = h * 0.72 - Math.random() * h * 0.5; ctx.fillStyle = `rgba(255,${150 + Math.random() * 100 | 0},60,${0.5})`; ctx.beginPath(); ctx.ellipse(x, y, 8, 20, 0, 0, 7); ctx.fill(); }
  // marshmallow blob
  ctx.fillStyle = '#f3efe6'; ctx.beginPath(); ctx.ellipse(w / 2, h * 0.5, w * 0.14, h * 0.16, 0, 0, 7); ctx.fill();
}
function paintWestern(ctx, w, h, accent) {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#0a0a20'); g.addColorStop(0.6, '#3a1a3a'); g.addColorStop(1, '#1a0a10');
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#f5e6a8'; ctx.beginPath(); ctx.arc(w * 0.7, h * 0.3, h * 0.18, 0, 7); ctx.fill(); // moon
  // mesas
  ctx.fillStyle = '#120810'; for (const [mx, mw, mh] of [[0.1, 0.22, 0.28], [0.4, 0.3, 0.42], [0.75, 0.26, 0.34]]) { ctx.fillRect(w * mx, h * (1 - mh), w * mw, h * mh); }
  // neon cacti
  ctx.strokeStyle = accent; ctx.lineWidth = 5; ctx.shadowColor = accent; ctx.shadowBlur = 14;
  for (const cx of [0.25, 0.55, 0.85]) { const bx = w * cx; ctx.beginPath(); ctx.moveTo(bx, h); ctx.lineTo(bx, h * 0.7); ctx.moveTo(bx, h * 0.82); ctx.lineTo(bx + 18, h * 0.82); ctx.stroke(); }
  ctx.shadowBlur = 0;
}
function paintRain(ctx, w, h, accent) {
  ctx.fillStyle = '#0d1030'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(90,90,160,0.4)'; ctx.beginPath(); ctx.ellipse(w / 2, h * 0.28, w * 0.3, h * 0.1, 0, 0, 7); ctx.fill(); // cloud
  ctx.strokeStyle = 'rgba(150,160,255,0.6)'; ctx.lineWidth = 2;
  for (let i = 0; i < 120; i++) { const x = Math.random() * w, y = Math.random() * h; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 6, y + 18); ctx.stroke(); }
  // couch
  ctx.fillStyle = accent; ctx.globalAlpha = 0.85; ctx.fillRect(w * 0.25, h * 0.62, w * 0.5, h * 0.2); ctx.fillRect(w * 0.22, h * 0.5, w * 0.1, h * 0.32); ctx.fillRect(w * 0.68, h * 0.5, w * 0.1, h * 0.32); ctx.globalAlpha = 1;
}
function paintGlitch(ctx, w, h) {
  ctx.fillStyle = '#05060a'; ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 60; i++) { const y = Math.random() * h, bh = 2 + Math.random() * 24; const cols = ['#00f3ff', '#ff0055', '#39ff14']; ctx.fillStyle = cols[i % 3]; ctx.globalAlpha = 0.35 + Math.random() * 0.4; ctx.fillRect(Math.random() * w * 0.4, y, w * (0.3 + Math.random() * 0.6), bh); }
  ctx.globalAlpha = 1;
  // RGB-split blocks
  for (let i = 0; i < 3; i++) { ctx.fillStyle = ['rgba(255,0,60,.5)', 'rgba(0,243,255,.5)', 'rgba(57,255,20,.5)'][i]; ctx.fillRect(w * 0.3 + i * 6, h * 0.4, w * 0.4, h * 0.18); }
}
function paintCrowd(ctx, w, h, accent) {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#1a0a30'); g.addColorStop(1, '#02040a'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const cols = ['#00f3ff', '#ff0055', '#39ff14', '#b967ff', '#ffe14d'];
  for (let i = 0; i < 260; i++) { const x = Math.random() * w, y = h * 0.45 + Math.random() * h * 0.55; ctx.fillStyle = cols[i % 5]; ctx.globalAlpha = 0.8; ctx.fillRect(x, y, 3, -10 - Math.random() * 18); }
  ctx.globalAlpha = 1;
}
function paintStage(ctx, w, h, accent) {
  ctx.fillStyle = '#04060c'; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#0b1020'; ctx.fillRect(w * 0.12, h * 0.15, w * 0.76, h * 0.5); // screen
  const g = ctx.createLinearGradient(0, h * 0.15, 0, h * 0.65); g.addColorStop(0, accent); g.addColorStop(1, '#ff0055'); ctx.fillStyle = g; ctx.globalAlpha = 0.6; ctx.fillRect(w * 0.12, h * 0.15, w * 0.76, h * 0.5); ctx.globalAlpha = 1;
  // lasers
  ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.shadowColor = accent; ctx.shadowBlur = 10;
  for (let i = 0; i < 16; i++) { ctx.beginPath(); ctx.moveTo(w / 2, h * 0.15); ctx.lineTo(Math.random() * w, h); ctx.stroke(); }
  ctx.shadowBlur = 0;
}
function paintNebula(ctx, w, h, accent) {
  ctx.fillStyle = '#050310'; ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 3; i++) { const g = ctx.createRadialGradient(Math.random() * w, Math.random() * h, 10, Math.random() * w, Math.random() * h, h * 0.5); g.addColorStop(0, ['rgba(185,103,255,.4)', 'rgba(0,243,255,.3)', 'rgba(255,122,217,.3)'][i]); g.addColorStop(1, 'transparent'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); }
  ctx.fillStyle = '#fff'; for (let i = 0; i < 200; i++) { ctx.globalAlpha = Math.random(); ctx.fillRect(Math.random() * w, Math.random() * h, Math.random() < 0.1 ? 2 : 1, 1); } ctx.globalAlpha = 1;
}
function paintCircuit(ctx, w, h, accent) {
  ctx.fillStyle = '#03100a'; ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = accent; ctx.fillStyle = accent; ctx.lineWidth = 2; ctx.shadowColor = accent; ctx.shadowBlur = 8;
  for (let i = 0; i < 40; i++) { let x = Math.random() * w, y = Math.random() * h; ctx.beginPath(); ctx.moveTo(x, y); for (let j = 0; j < 4; j++) { if (Math.random() < 0.5) x += (Math.random() - 0.5) * 120; else y += (Math.random() - 0.5) * 120; ctx.lineTo(x, y); } ctx.stroke(); ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); }
  ctx.shadowBlur = 0;
}
function paintSunset(ctx, w, h, accent) {
  const g = ctx.createLinearGradient(0, 0, 0, h); g.addColorStop(0, '#2a0a4a'); g.addColorStop(0.5, accent); g.addColorStop(0.7, '#ff9e5e'); g.addColorStop(1, '#1a0820'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff2b0'; ctx.beginPath(); ctx.arc(w / 2, h * 0.5, h * 0.22, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(20,6,20,0.9)'; ctx.lineWidth = 3;
  for (let i = 0; i < 6; i++) { const y = h * 0.5 + i * 10; ctx.beginPath(); ctx.moveTo(w * 0.28, y); ctx.lineTo(w * 0.72, y); ctx.stroke(); }
  // road
  ctx.fillStyle = '#120a18'; ctx.beginPath(); ctx.moveTo(w * 0.45, h * 0.62); ctx.lineTo(w * 0.55, h * 0.62); ctx.lineTo(w * 0.8, h); ctx.lineTo(w * 0.2, h); ctx.fill();
  ctx.strokeStyle = accent; ctx.setLineDash([16, 16]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(w / 2, h * 0.62); ctx.lineTo(w / 2, h); ctx.stroke(); ctx.setLineDash([]);
}
function paintNoise(ctx, w, h) {
  const img = ctx.createImageData(w, h); const d = img.data;
  for (let i = 0; i < d.length; i += 4) { const v = Math.random() * 255 | 0; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; for (let y = 0; y < h; y += 3) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
}

if (import.meta.env.DEV) window.__mu = { controls, scene, frames };
