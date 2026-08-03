import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildGlitch } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
import { createAdmin } from './scene/admin.js';
const ambience = createAmbience(AMBIENCE.studio);

// 12MATT3R'S ROOM — a dark glitch-art studio built around a central MONUMENT of
// stacked CRT televisions you circle. Trippy + glitch screens everywhere, a
// datamosh wall, a code workstation, cables. The big CRT boots the web-OS.

const EPK_URL = 'https://12matt3r.univer.se/';
const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x03060a);
scene.fog = new THREE.FogExp2(0x03060a, 0.03);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 120);

// ---------- the room shell ----------
const RW = 17, H = 9;
{
  const wallMat = std({ color: 0x0a0c12, roughness: 0.92, metalness: 0.15, emissive: C(0x061018), emissiveIntensity: 0.25 });
  const mk = (w, h, pos, rotY) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat); m.position.copy(pos); if (rotY) m.rotation.y = rotY; scene.add(m); return m; };
  mk(RW * 2, H, new THREE.Vector3(0, H / 2, -RW));
  mk(RW * 2, H, new THREE.Vector3(0, H / 2, RW), Math.PI);
  mk(RW * 2, H, new THREE.Vector3(-RW, H / 2, 0), Math.PI / 2);
  mk(RW * 2, H, new THREE.Vector3(RW, H / 2, 0), -Math.PI / 2);
  // floor (dark reflective) + ceiling
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#06080e'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#0b0e18'; x.fillRect(0, 0, 32, 32); x.fillRect(32, 32, 32, 32);
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(12, 12); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RW * 2, RW * 2), std({ map: tex, roughness: 0.3, metalness: 0.5, emissive: C(0x05080e), emissiveIntensity: 0.2 }));
  floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RW * 2, RW * 2), std({ color: 0x05060c, roughness: 1 })); ceil.rotation.x = Math.PI / 2; ceil.position.y = H; scene.add(ceil);
  const grid = new THREE.GridHelper(RW * 2, 34, 0x00f3ff, 0x1a0a30); grid.material.transparent = true; grid.material.opacity = 0.14; grid.position.y = 0.02; scene.add(grid);
}
scene.add(new THREE.HemisphereLight(0x3a5a8a, 0x08101a, 1.1));
const stKey = new THREE.DirectionalLight(0x9fd8ff, 0.7); stKey.position.set(8, 16, 12); scene.add(stKey);
scene.add(new THREE.AmbientLight(0xbfe0ff, 0.38));

// ---------- shared CRT-screen shader (glitch OR plasma) ----------
const screenMats = [];
function crtMaterial(mode, seed) {
  const m = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, seed: { value: seed }, mode: { value: mode } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `
      varying vec2 v; uniform float t, seed, mode;
      float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3,289.1)) + seed) * 43758.5453); }
      void main(){
        vec2 uv = v;
        if(mode < 0.5){
          // GLITCH: block row shifts + rgb split + scanlines + noise
          float row = floor(uv.y*20.0);
          float g = step(0.82, hash(vec2(row, floor(t*7.0))));
          uv.x += g*(hash(vec2(row, floor(t*3.0)))-0.5)*0.35;
          float sh = 0.02 + 0.03*sin(t*2.0+seed);
          float r = hash(floor(uv*vec2(28.0,20.0))+vec2(sh,0.0)+floor(t*10.0)*0.01);
          float gg= hash(floor(uv*vec2(28.0,20.0))+floor(t*10.0)*0.013);
          float b = hash(floor(uv*vec2(28.0,20.0))-vec2(sh,0.0)+floor(t*10.0)*0.017);
          vec3 col = vec3(r,gg,b);
          col *= vec3(0.2+uv.x, 0.7, 1.3-uv.x*0.6);        // colour cast
          float scan = sin((uv.y+t*0.4)*90.0)*0.5+0.5;
          col *= 0.55 + 0.55*scan;
          gl_FragColor = vec4(col, 1.0);
        } else {
          // PLASMA / trippy
          vec2 p = (uv-0.5)*4.0;
          float a = sin(p.x*2.0 + t) + cos(p.y*2.0 - t*1.3) + sin(length(p)*3.0 - t*2.0);
          vec3 col = 0.5 + 0.5*cos(vec3(0.0,2.0,4.0) + a*1.6 + seed);
          float scan = sin((uv.y+t*0.3)*80.0)*0.5+0.5;
          gl_FragColor = vec4(col*(0.6+0.5*scan), 1.0);
        }
      }`,
  });
  screenMats.push(m); return m;
}

// ---------- the central CRT MONUMENT ----------
let epkProxy = null;
function buildMonument() {
  const g = new THREE.Group(); scene.add(g);
  const cab = std({ color: 0x14140f, roughness: 0.7, metalness: 0.2 });
  const cabAlt = std({ color: 0x1b160f, roughness: 0.75 });
  let idx = 0;
  // stack rings of CRTs, tapering as it rises → a rough pyramid/pile
  const rings = [
    { y: 0.9, r: 2.5, n: 8, s: 1.6 },
    { y: 2.5, r: 2.0, n: 7, s: 1.4 },
    { y: 3.9, r: 1.5, n: 6, s: 1.2 },
    { y: 5.1, r: 1.0, n: 4, s: 1.05 },
    { y: 6.1, r: 0.0, n: 1, s: 1.2 },   // crown TV on top
  ];
  for (const ring of rings) {
    for (let i = 0; i < ring.n; i++) {
      const a = (i / ring.n) * Math.PI * 2 + ring.y;
      const x = Math.cos(a) * ring.r, z = Math.sin(a) * ring.r;
      const s = ring.s * (0.9 + Math.random() * 0.25);
      const box = new THREE.Mesh(new THREE.BoxGeometry(s, s * 0.85, s * 0.9), i % 2 ? cab : cabAlt);
      box.position.set(x, ring.y, z); box.lookAt(x * 3, ring.y, z * 3); box.castShadow = true; g.add(box);
      const mode = Math.random() < 0.6 ? 0 : 1;
      const scr = new THREE.Mesh(new THREE.PlaneGeometry(s * 0.72, s * 0.6), crtMaterial(mode, idx * 1.7));
      scr.position.set(x, ring.y, z); scr.lookAt(x * 3, ring.y, z * 3); scr.translateZ(s * 0.46); g.add(scr);
      const gl = new THREE.PointLight(new THREE.Color().setHSL((idx * 0.11) % 1, 1, 0.5), 1.4, 5, 2); gl.position.set(x * 1.1, ring.y, z * 1.1); g.add(gl);
      idx++;
    }
  }
  // the BIG front CRT — the web-OS boot screen (clickable)
  const bigCab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.9, 2.4), std({ color: 0x101008, roughness: 0.6, metalness: 0.3 }));
  bigCab.position.set(0, 1.7, 3.4); g.add(bigCab);
  const bigScr = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 2.2), crtMaterial(0, 99));
  bigScr.position.set(0, 1.8, 4.62); g.add(bigScr);
  const label = textPlane('12MATT3R // WEB-OS', '#00f3ff'); label.position.set(0, 3.5, 4.5); label.scale.set(4, 0.6, 1); g.add(label);
  const bigL = new THREE.PointLight(0x00f3ff, 5, 12, 2); bigL.position.set(0, 2, 6); g.add(bigL);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3, 1), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 1.8, 4.4); g.add(epkProxy);
  updaters.push((dt, t, p) => { bigL.intensity = 4 + Math.sin(t * 8) * 1.2 + p * 2; });
  return g;
}

// ---------- wall installations ----------
const updaters = [];
function buildInstalls() {
  // datamosh wall: a grid of small monitors on the north wall
  for (let r = 0; r < 3; r++) for (let cc = 0; cc < 6; cc++) {
    const x = -7.5 + cc * 3, y = 2.2 + r * 2.1;
    const cabm = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.5), std({ color: 0x0e0e14, roughness: 0.7 })); cabm.position.set(x, y, -16.6); scene.add(cabm);
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.5), crtMaterial(Math.random() < 0.5 ? 0 : 1, r * 6 + cc)); scr.position.set(x, y, -16.33); scene.add(scr);
  }
  // code workstation on the east wall
  {
    const desk = new THREE.Mesh(new THREE.BoxGeometry(4, 1, 1.6), std({ color: 0x101018, roughness: 0.6 })); desk.position.set(14.5, 0.5, 4); desk.rotation.y = -Math.PI / 2; scene.add(desk);
    const mon = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.4), codeMaterial()); mon.position.set(13.6, 1.9, 4); mon.rotation.y = -Math.PI / 2; scene.add(mon);
    const kl = new THREE.PointLight(0x39ff14, 3, 8, 2); kl.position.set(13, 2, 4); scene.add(kl);
  }
  // hanging trippy portal on the west wall (a plasma disc)
  {
    const portal = new THREE.Mesh(new THREE.CircleGeometry(2.4, 40), crtMaterial(1, 42)); portal.position.set(-16.6, 4.2, 0); portal.rotation.y = Math.PI / 2; scene.add(portal);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.5, 0.14, 12, 40), std({ color: 0x0a0a12, emissive: C(0xb967ff), emissiveIntensity: 0.8, metalness: 0.6 })); ring.position.set(-16.5, 4.2, 0); ring.rotation.y = Math.PI / 2; scene.add(ring);
    const pl = new THREE.PointLight(0xb967ff, 4, 12, 2); pl.position.set(-14, 4.2, 0); scene.add(pl);
  }
  // cables snaking on the floor + floating glitch cubes
  const cubes = [];
  for (let i = 0; i < 22; i++) {
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), new THREE.MeshBasicMaterial({ color: new THREE.Color().setHSL(Math.random(), 1, 0.55), transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
    const a = Math.random() * 6.28, rr = 5 + Math.random() * 9;
    cube.position.set(Math.cos(a) * rr, 0.5 + Math.random() * 6, Math.sin(a) * rr); scene.add(cube); cubes.push(cube);
  }
  updaters.push((dt, t) => { cubes.forEach((c, i) => { c.rotation.x += dt * (1 + i * 0.05); c.rotation.y += dt * 0.8; c.position.y += Math.sin(t * 1.5 + i) * 0.004; }); });
}
function codeMaterial() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 160; const x = c.getContext('2d');
  x.fillStyle = '#02100a'; x.fillRect(0, 0, 256, 160); x.font = '10px monospace'; x.fillStyle = '#39ff14';
  const toks = ['const', 'glitch=>', 'render()', 'shader', '0xFF00A8', 'flux.lora', 'websim', 'return void', 'matt3r()', '#!/bin'];
  for (let i = 0; i < 14; i++) x.fillText(toks[i % toks.length] + ' ' + Math.random().toString(16).slice(2, 8), 6, 14 + i * 11);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return std({ map: tex, emissive: 0x0a2a10, emissiveIntensity: 0.6, roughness: 0.5 });
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 32px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

const _monument = buildMonument(); buildInstalls();

// ambient: cyan data-bit motes floating through the dark room
updaters.push(addMotes(scene, { color: 0x00f3ff, count: 160, area: [30, 8, 30], rise: 0.3, size: 0.07, opacity: 0.45 }));

// 12matt3r himself, glitching by the workstation
const fig = buildGlitch('#00f3ff'); fig.group.position.set(9, 0, 8); fig.group.rotation.y = -2.2; scene.add(fig.group);
updaters.push((dt, t, p) => { if (fig.update) fig.update(t, p); });

// ---------- controls (with a keep-out circle around the monument) ----------
const controls = new WalkControls(camera, { bounds: RW - 1.5, eye: 1.6, zMin: -(RW - 1.5) });
controls.pos.set(0, 1.6, 12); controls.yaw = 0;
const KEEP = 4.2; // can't walk into the TV pile

const epkRef = { url: EPK_URL };
const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'studio', overhead: { ax: 18, az: 13, cz: 2 },
  items: [
    { id: 'studio', label: '12matt3r', obj: fig.group },
    { id: 'monument', label: 'CRT monument / EPK', obj: _monument, dest: epkRef },
  ],
});

// ---------- LASER SECURITY GRID guarding the portal (west) ----------
let breached = false;
const laserGrid = (function () {
  const gx = -10; // the grid plane (cross it going west to the portal)
  const beams = [];
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.09, 8), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
    b.position.set(gx, 0.5 + i * 0.55, 0); scene.add(b);
    beams.push({ m: b, base: 0.6 + i * 0.5, ph: i * 1.1, amp: 1.3 });
  }
  for (const pz of [-4, 4]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4, 8), std({ color: 0x14141c, metalness: 0.6 })); p.position.set(gx, 2, pz); scene.add(p); }
  // prize past the grid, by the portal
  const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.6, 0), std({ color: 0x0a1020, emissive: C(0x39ff14), emissiveIntensity: 0.6, metalness: 0.6, roughness: 0.2 }));
  shard.position.set(-14.5, 1.6, 0); scene.add(shard);
  const shardL = new THREE.PointLight(0x39ff14, 0, 12, 2); shardL.position.set(-14.5, 2, 0); scene.add(shardL);
  let zap = 0;
  function update(dt, t) {
    shard.rotation.y += dt * 1.5;
    for (const b of beams) { b.m.position.y = b.base + Math.sin(t * 1.6 + b.ph) * b.amp; b.m.material.color.setHex(breached ? 0x39ff14 : 0xff0033); }
    if (zap > 0) zap -= dt;
    if (!breached) {
      const p = controls.pos;
      if (Math.abs(p.x - gx) < 0.6 && Math.abs(p.z) < 4 && zap <= 0) {
        for (const b of beams) { if (Math.abs(b.m.position.y - (p.y - 0.8)) < 0.95) { // beam hits the body
          p.x = gx + 1.2; controls.vy = 0; zap = 0.6; if (zoneEl) { zoneEl.textContent = '⚠ SECURITY GRID'; zoneEl.classList.add('show'); } break; } }
      }
      if (p.x < gx - 1) { breached = true; shardL.intensity = 6; if (zoneEl) { zoneEl.textContent = '✦ SYSTEM BREACHED ✦'; zoneEl.classList.add('show'); } }
    } else { shardL.intensity = 5 + Math.sin(t * 5) * 2; }
  }
  return { update };
})();

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
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
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('12MATT3R — WEB-OS', epkRef.url); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -(RW - 1.5), RW - 1.5); g.z = THREE.MathUtils.clamp(g.z, -(RW - 1.5), RW - 1.5); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zone-ish labels + hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function updateZone(p) {
  let z = 'THE GLITCH ROOM';
  if (p.z < -8) z = 'THE DATAMOSH WALL'; else if (p.x > 8) z = 'THE WORKSTATION'; else if (p.x < -8) z = 'THE PORTAL';
  else if (Math.hypot(p.x, p.z) < 7) z = 'THE TV MONUMENT';
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) hintEl.classList.toggle('show', Math.hypot(p.x, p.z - 4) < 6);
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
  const p = Math.pow(1 - ((t * (100 / 60)) % 1), 2.0);
  controls.update(dt);
  admin.update(dt);
  // keep-out circle around the TV pile
  const d = Math.hypot(controls.pos.x, controls.pos.z);
  if (!admin.active && d < KEEP && d > 0.001) { const s = KEEP / d; controls.pos.x *= s; controls.pos.z *= s; }
  for (const m of screenMats) m.uniforms.t.value = t;
  for (const u of updaters) u(dt, t, p);
  laserGrid.update(dt, t);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
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

if (import.meta.env.DEV) window.__st = { controls, scene };

// __world hook — overhead-screenshot harness only (activated with ?shot in the
// URL); exposes the scene so an offline top-down render can be captured. No-op
// for normal visitors.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
