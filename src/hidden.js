import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addMotes } from './scene/ambientfx.js';

// THE HIDDEN ROOM — the secret post-endgame sanctum. A quiet void around a humming
// monolith, ringed by plinths that sing when touched. Paint the dark with stars.
// It adopts the accent colour you built your room in. (procedural + Web Audio)

const canvas = document.getElementById('scene');
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
scene.fog = new THREE.FogExp2(0x05050a, 0.028);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 200);
const updaters = [];

// accent carried over from the Room Builder (falls back to gold)
const ACCENTS = [0xff2bd0, 0xffb060, 0x39ff14, 0xe6e6f0, 0x7affc0, 0xff7b2a];
let ACC = 0xe6c04a;
try { const s = JSON.parse(localStorage.getItem('roomBuilder.v1') || 'null'); if (s && typeof s.theme === 'number' && ACCENTS[s.theme]) ACC = ACCENTS[s.theme]; } catch (e) {}
const acc = C(ACC);

scene.add(new THREE.AmbientLight(0x14141f, 1.0));
scene.add(new THREE.HemisphereLight(0x2a2a44, 0x050508, 0.5));

// ---------- void floor + starfield dome ----------
{
  const floor = new THREE.Mesh(new THREE.CircleGeometry(30, 64), new THREE.MeshStandardMaterial({ color: 0x07070e, roughness: 0.25, metalness: 0.6, emissive: acc.clone().multiplyScalar(0.05), emissiveIntensity: 1 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const ring = new THREE.Mesh(new THREE.RingGeometry(11.6, 12, 64), new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false }));
  ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; scene.add(ring);
  updaters.push((dt, t) => { ring.material.opacity = 0.25 + Math.sin(t * 1.2) * 0.15; });
  const sp = []; for (let i = 0; i < 700; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(120); sp.push(v.x, Math.abs(v.y) * 0.6 + 2, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xdfe6ff, size: 0.5, transparent: true, opacity: 0.7 })));
}

function textPlane(text, color, w = 512, h = 64) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.44)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- central humming monolith (accent-tinted) ----------
let monoLight;
function buildMonolith() {
  const g = new THREE.Group(); g.position.set(0, 0, -3); scene.add(g);
  const mono = new THREE.Mesh(new THREE.BoxGeometry(1.2, 5, 1.2), new THREE.MeshStandardMaterial({ color: 0x0a0a12, emissive: acc, emissiveIntensity: 0.5, roughness: 0.3, metalness: 0.5 }));
  mono.position.y = 3; mono.castShadow = true; g.add(mono);
  // slow-turning halo rings
  const rings = [];
  for (let i = 0; i < 3; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(1.8 + i * 0.5, 0.03, 8, 48), new THREE.MeshBasicMaterial({ color: ACC, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })); r.position.y = 2.6 + i * 0.6; r.rotation.x = Math.PI / 2 + (i - 1) * 0.4; g.add(r); rings.push(r); }
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 2), new THREE.MeshStandardMaterial({ color: 0x0a0a12, emissive: acc, emissiveIntensity: 1.6, roughness: 0.2 })); orb.position.y = 5.6; g.add(orb);
  monoLight = new THREE.PointLight(ACC, 4, 30, 2); monoLight.position.set(0, 4, 0); g.add(monoLight);
  const cap = textPlane('THE HEART OF IT', '#' + acc.getHexString(), 512, 56); cap.position.set(0, 6.6, 0); cap.scale.set(4.4, 0.55, 1); g.add(cap);
  updaters.push((dt, t) => { mono.material.emissiveIntensity = 0.4 + Math.sin(t * 1.4) * 0.2; orb.rotation.y += dt * 0.4; orb.position.y = 5.6 + Math.sin(t) * 0.15; rings.forEach((r, i) => { r.rotation.z += dt * (0.2 + i * 0.1); }); monoLight.intensity = 3.5 + Math.sin(t * 1.4) * 1.2; });
  return g;
}

// ---------- ring of singing plinths ----------
const plinths = [];
const SCALE = [523.25, 587.33, 698.46, 783.99, 880, 1046.5]; // pentatonic
function buildPlinths() {
  const g = new THREE.Group(); scene.add(g);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2; const px = Math.cos(a) * 7, pz = Math.sin(a) * 7 - 3;
    const grp = new THREE.Group(); grp.position.set(px, 0, pz); g.add(grp);
    const col = new THREE.Color().setHSL(i / 6, 0.7, 0.6);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 1.6, 8), std({ color: 0x0c0c14, roughness: 0.7, emissive: col, emissiveIntensity: 0.15 })); post.position.y = 0.8; post.castShadow = true; grp.add(post);
    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 1), new THREE.MeshStandardMaterial({ color: 0x0a0a12, emissive: col, emissiveIntensity: 0.6, roughness: 0.2 })); orb.position.y = 2.0; orb.userData.plinth = i; grp.add(orb);
    const gl = new THREE.PointLight(col.getHex(), 1, 8, 2); gl.position.y = 2.0; grp.add(gl);
    plinths.push({ grp, orb, gl, col, freq: SCALE[i], flash: 0, ny: 2.0 });
  }
  updaters.push((dt, t) => plinths.forEach((p, i) => {
    p.orb.rotation.y += dt * 0.5; p.orb.position.y = p.ny + Math.sin(t * 1.2 + i) * 0.08;
    if (p.flash > 0) p.flash = Math.max(0, p.flash - dt * 1.6);
    p.orb.material.emissiveIntensity = 0.5 + p.flash * 2.2; p.gl.intensity = 1 + p.flash * 5;
  }));
  return g;
}

// ---------- star paint ----------
const stars = new THREE.Group(); scene.add(stars);
const starList = [];
const starTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.4, 'rgba(255,255,255,0.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
function addStar(p) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: starTex, color: acc.clone().offsetHSL((Math.random() - 0.5) * 0.15, 0, 0.1), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  s.position.copy(p).add(new THREE.Vector3((Math.random() - 0.5) * 0.4, 0, (Math.random() - 0.5) * 0.4)); s.position.y = 0.2 + Math.random() * 4;
  const sc = 0.4 + Math.random() * 0.6; s.scale.setScalar(sc); s.userData = { base: sc, ph: Math.random() * 6 };
  stars.add(s); starList.push(s); if (starList.length > 260) { const o = starList.shift(); stars.remove(o); o.material.dispose(); }
}
updaters.push((dt, t) => starList.forEach((s) => { s.material.opacity = 0.5 + Math.sin(t * 2 + s.userData.ph) * 0.4; s.scale.setScalar(s.userData.base * (1 + Math.sin(t * 1.5 + s.userData.ph) * 0.15)); }));

// ================= Web Audio =================
let actx = null, master = null;
function ensureAudio() { if (!actx) { actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0.32; master.connect(actx.destination);
  // warm sustained pad drone (A minor-ish)
  const g = actx.createGain(); g.gain.value = 0.14; g.connect(master); [110, 164.8, 220].forEach((f) => { for (const d of [-3, 3]) { const o = actx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = d; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 600; const og = actx.createGain(); og.gain.value = 0.16; o.connect(lp); lp.connect(og); og.connect(g); o.start(); } });
} if (actx.state === 'suspended') actx.resume(); }
function sing(freq) { ensureAudio(); const t = actx.currentTime; const o = actx.createOscillator(); const o2 = actx.createOscillator(); const g = actx.createGain(); o.type = 'sine'; o2.type = 'sine'; o.frequency.value = freq; o2.frequency.value = freq * 2.01; const g2 = actx.createGain(); g2.gain.value = 0.3; o2.connect(g2); g2.connect(g); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.35, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6); o.connect(g); g.connect(master); o.start(t); o.stop(t + 2.7); o2.start(t); o2.stop(t + 2.7); }
function chime() { ensureAudio(); const t = actx.currentTime; [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => { const o = actx.createOscillator(); const g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t + i * 0.08); g.gain.linearRampToValueAtTime(0.28, t + i * 0.08 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 1.2); o.connect(g); g.connect(master); o.start(t + i * 0.08); o.stop(t + i * 0.08 + 1.3); }); }

// build
buildMonolith(); buildPlinths();
updaters.push(addMotes(scene, { color: ACC, count: 160, area: [30, 12, 30], center: [0, 5, -3], rise: 0.2, opacity: 0.4 }));

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 11, eye: 1.6, zMin: -14 });
controls.pos.set(0, 1.6, 8); controls.yaw = Math.PI;

// ---------- input ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => { if (!down || e.pointerId !== down.id) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true; controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2); down.x = e.clientX; down.y = e.clientY; });
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
const plinthOrbs = () => plinths.map((p) => p.orb);
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1; ray.setFromCamera(ndc, camera);
  const ph = ray.intersectObjects(plinthOrbs(), false)[0];
  if (ph && ph.object.userData.plinth != null) { const p = plinths[ph.object.userData.plinth]; p.flash = 1; sing(p.freq); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { const d = Math.hypot(g.x, g.z + 3); if (d < 2.2) { walkedToCenter(); return; } if (d > 11) g.setLength ? null : null; g.x = THREE.MathUtils.clamp(g.x, -10.5, 10.5); g.z = THREE.MathUtils.clamp(g.z, -13, 10.5); addStar(g); }
}
let blessed = false;
function walkedToCenter() { addStar(new THREE.Vector3(0, 0, -3)); if (!blessed) { blessed = true; chime(); const z = document.getElementById('zone'); if (z) { z.textContent = 'MADE WITH LOVE · 12MATT3R'; z.classList.add('show'); setTimeout(() => z.classList.remove('show'), 3200); } } }

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones
const zoneEl = document.getElementById('zone'); let curZone = '';
function updateZone(p) { const z = Math.hypot(p.x, p.z + 3) < 3 ? 'THE MONOLITH' : (Math.hypot(p.x, p.z + 3) > 6 ? 'THE PLINTHS' : 'THE SANCTUM'); if (z !== curZone && !blessed) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1600); } } }

document.getElementById('backBtn').onclick = () => { const w = document.getElementById('warp'); if (w) w.classList.add('go'); setTimeout(() => { window.location.href = 'warehouse.html'; }, 470); };

// loop
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime;
  controls.update(dt);
  for (const u of updaters) u(dt, t, 0);
  updateZone(controls.pos);
  renderer.render(scene, camera);
}
controls.update(0); renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => { document.getElementById('start').classList.add('gone'); ensureAudio(); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__hd = { controls, scene, plinths, ACC };
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) window.__world = { THREE, scene, camera, renderer };
