import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addMotes } from './scene/ambientfx.js';
import { createAdmin } from './scene/admin.js';

// VJ / PERFORMANCE STAGE — a dark club room with a raised stage, a truss of moving-head
// lights, and a giant reactive VIDEO WALL. Step onto the stage and the show goes LIVE:
// the beat kicks in, the crowd lifts, the lights swing. Work the VJ DECK up front — each
// pad flips the wall to a new visual and re-flavors the music. (procedural + Web Audio)

const canvas = document.getElementById('scene');
try { const K = '12m.explored'; const s = new Set(JSON.parse(localStorage.getItem(K) || '[]')); s.add('vj'); localStorage.setItem(K, JSON.stringify([...s])); } catch (e) {}
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
scene.fog = new THREE.FogExp2(0x07060f, 0.02);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 400);
const updaters = [];

scene.add(new THREE.HemisphereLight(0x2a2350, 0x08060f, 0.5));
const ambient = new THREE.AmbientLight(0x2a2a44, 0.35); scene.add(ambient);

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.44)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- room shell: floor + walls ----------
const RX = 16, ZFRONT = 14, ZBACK = -14;
const STAGE = { x0: -11, x1: 11, z0: -13, z1: -7, y: 0.8 };
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d');
  x.fillStyle = '#0a0a14'; x.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(${20 + Math.random() * 18 | 0},${20 + Math.random() * 18 | 0},${34 + Math.random() * 22 | 0},0.5)`; const s = 4 + Math.random() * 9; x.fillRect(Math.random() * 128, Math.random() * 128, s, s); }
  x.strokeStyle = 'rgba(90,90,140,0.25)'; x.lineWidth = 2; for (let i = 0; i <= 128; i += 16) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 128); x.moveTo(0, i); x.lineTo(128, i); x.stroke(); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(12, 12); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, ZFRONT - ZBACK), std({ map: tex, roughness: 0.7, metalness: 0.2, emissive: C(0x0a0a1e), emissiveIntensity: 0.18 }));
  floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, (ZFRONT + ZBACK) / 2); floor.receiveShadow = true; scene.add(floor);
  // dark walls
  const wm = std({ color: 0x0b0a16, roughness: 0.95, emissive: C(0x0a0818), emissiveIntensity: 0.12 });
  const back = new THREE.Mesh(new THREE.BoxGeometry(RX * 2, 16, 0.6), wm); back.position.set(0, 8, ZBACK - 0.6); scene.add(back);
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.6, 16, ZFRONT - ZBACK), wm); left.position.set(-RX, 8, (ZFRONT + ZBACK) / 2); scene.add(left);
  const right = left.clone(); right.position.x = RX; scene.add(right);
}

// ---------- the stage platform + steps ----------
function buildStage() {
  const g = new THREE.Group(); scene.add(g);
  const deckMat = std({ color: 0x14121f, roughness: 0.5, metalness: 0.4, emissive: C(0x1a1030), emissiveIntensity: 0.2 });
  const slab = new THREE.Mesh(new THREE.BoxGeometry(STAGE.x1 - STAGE.x0 + 1, STAGE.y, STAGE.z1 - STAGE.z0 + 1), deckMat);
  slab.position.set((STAGE.x0 + STAGE.x1) / 2, STAGE.y / 2, (STAGE.z0 + STAGE.z1) / 2); slab.castShadow = slab.receiveShadow = true; g.add(slab);
  // glowing edge strip along the front lip
  const lip = new THREE.Mesh(new THREE.BoxGeometry(STAGE.x1 - STAGE.x0 + 1, 0.08, 0.16), new THREE.MeshBasicMaterial({ color: 0x8a5cff }));
  lip.position.set((STAGE.x0 + STAGE.x1) / 2, STAGE.y, STAGE.z1 + 0.5); g.add(lip);
  edgeStrip = lip;
  // steps at front center
  for (let i = 0; i < 2; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(5, STAGE.y * (1 - (i + 1) / 3), 0.6), deckMat); const h = STAGE.y * (1 - (i + 1) / 3); st.position.set(0, h / 2, STAGE.z1 + 0.5 + (i + 1) * 0.6); g.add(st); }
  return g;
}
let edgeStrip = null;
const _stage = buildStage();

// ---------- the giant reactive VIDEO WALL (+ side screens) ----------
const MODES = [
  { name: 'PULSE', col: 0x8a5cff }, { name: 'BARS', col: 0x00f3ff }, { name: 'TUNNEL', col: 0xff2bd0 },
  { name: 'PLASMA', col: 0xffe14a }, { name: 'STROBE', col: 0xffffff }, { name: 'KALEIDO', col: 0x39ff88 },
];
let mode = 0;
let wallGlow = null;
const wallMat = new THREE.ShaderMaterial({
  uniforms: { t: { value: 0 }, beat: { value: 0 }, mode: { value: 0 }, col: { value: C(MODES[0].col) } },
  vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `
    varying vec2 v; uniform float t, beat, mode; uniform vec3 col;
    void main(){
      vec2 uv=v; vec2 p=(uv-0.5)*2.0; p.x*=1.9;
      float r=length(p), a=atan(p.y,p.x); vec3 c=vec3(0.0); float m=mode;
      if(m<0.5){ float rings=sin(r*9.0 - t*3.0 - beat*7.0); float g=smoothstep(0.1,0.95,rings)*smoothstep(1.9,0.15,r); c=col*(g*(0.55+beat)); }
      else if(m<1.5){ float b=floor(uv.x*18.0); float h=fract(sin(b*12.9)*43758.5)*0.55 + beat*0.55*fract(sin(b*7.7+3.0)*2345.6); float on=step(uv.y,h); c=mix(col, vec3(1.0)-col*0.4, uv.y)*on; }
      else if(m<2.5){ float tun=sin(3.0/max(r,0.08)+t*2.0)*sin(a*6.0+t*1.4); c=(0.5+0.5*cos(vec3(0.0,2.0,4.0)+tun*3.0+t))*smoothstep(1.7,0.1,r)*(0.55+beat); }
      else if(m<3.5){ float pl=sin(p.x*4.0+t)+sin(p.y*4.0+t*1.3)+sin((p.x+p.y)*3.0+t*0.7)+sin(r*6.0-t*2.0); c=(0.5+0.5*cos(vec3(0.0,2.0,4.0)+pl+t*0.5))*(0.65+beat*0.5); }
      else if(m<4.5){ float s=beat>0.5?1.0:0.05; c=mix(col,vec3(1.0),0.4)*s; }
      else { float k=abs(sin(a*5.0+t)); float rr=fract(r*3.0-t*0.5); c=(0.5+0.5*cos(vec3(0.0,2.0,4.0)+k*4.0+rr*6.0))*smoothstep(1.8,0.2,r)*(0.6+beat*0.4); }
      c*=0.86+0.14*sin(uv.y*170.0);
      gl_FragColor=vec4(c,1.0);
    }`,
});
{
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(20, 9.5), wallMat); wall.position.set(0, 6, ZBACK + 0.1); scene.add(wall);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(20.6, 10.1, 0.3), std({ color: 0x05050c, roughness: 0.6, metalness: 0.5 })); frame.position.set(0, 6, ZBACK - 0.05); scene.add(frame);
  // side LED columns using the same shader
  for (const sx of [-14.6, 14.6]) { const col = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 9), wallMat); col.position.set(sx, 5.5, -9); col.rotation.y = sx < 0 ? 0.5 : -0.5; scene.add(col); }
  // wall backlight (colours the room, tied to the current mode)
  wallGlow = new THREE.PointLight(MODES[0].col, 2.4, 40, 2); wallGlow.position.set(0, 6, ZBACK + 3); scene.add(wallGlow);
}

// ---------- truss + moving-head spotlights ----------
const heads = [];
function buildLights() {
  const g = new THREE.Group(); scene.add(g);
  const trussMat = std({ color: 0x1a1a22, roughness: 0.6, metalness: 0.6 });
  for (const tz of [-11, -4]) { const beam = new THREE.Mesh(new THREE.BoxGeometry(RX * 2 - 2, 0.3, 0.3), trussMat); beam.position.set(0, 10.5, tz); g.add(beam); }
  for (const sx of [-11, 11]) { const post = new THREE.Mesh(new THREE.BoxGeometry(0.3, 11, 0.3), trussMat); post.position.set(sx, 5.5, -7.4); g.add(post); }
  const xs = [-8, -4, 0, 4, 8];
  xs.forEach((hx, i) => {
    const yoke = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), std({ color: 0x0c0c14, metalness: 0.6, roughness: 0.4 })); yoke.position.set(hx, 10.3, -11); g.add(yoke);
    const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.28, 0.5, 12), std({ color: 0x060608, emissive: C(0xffffff), emissiveIntensity: 0.5 })); lamp.position.set(hx, 9.9, -11); g.add(lamp);
    const sp = new THREE.SpotLight(MODES[0].col, 0, 40, 0.24, 0.5, 1.4); sp.position.set(hx, 9.9, -11); g.add(sp);
    const tgt = new THREE.Object3D(); tgt.position.set(hx, 0, -3); scene.add(tgt); sp.target = tgt;
    // a soft volumetric beam cone
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.6, 12, 16, 1, true), new THREE.MeshBasicMaterial({ color: MODES[0].col, transparent: true, opacity: 0.05, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    cone.position.set(hx, 4, -8); g.add(cone);
    heads.push({ sp, tgt, cone, lamp, x: hx, ph: i * 1.2 });
  });
  return g;
}
const _lights = buildLights();

// ---------- mic stand, center stage ----------
function buildMic() {
  const g = new THREE.Group(); g.position.set(2.5, STAGE.y, -9.5); scene.add(g);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 16), std({ color: 0x14141c, metalness: 0.5 })); base.position.y = 0.04; g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), std({ color: 0x2a2a34, metalness: 0.7, roughness: 0.3 })); pole.position.y = 0.79; g.add(pole);
  const mic = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.16, 6, 10), std({ color: 0x0a0a10, roughness: 0.4, metalness: 0.5, emissive: C(0x8a5cff), emissiveIntensity: 0.25 })); mic.position.set(0, 1.6, 0.06); mic.rotation.x = 0.5; g.add(mic);
  return g;
}
const _mic = buildMic();

// ---------- crowd of bobbing silhouettes in front of the stage ----------
const crowd = [];
function buildCrowd() {
  const g = new THREE.Group(); scene.add(g);
  const bodyMat = std({ color: 0x07070e, roughness: 1 });
  for (let r = 0; r < 4; r++) {
    for (let i = 0; i < 11; i++) {
      const px = -10 + i * 2 + (r % 2) * 1 + (Math.random() - 0.5) * 0.7;
      const pz = -4 + r * 2.4 + (Math.random() - 0.5) * 0.6;
      if (Math.abs(px) > 14) continue;
      const p = new THREE.Group(); p.position.set(px, 0, pz); g.add(p);
      const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.9, 5, 8), bodyMat); body.position.y = 0.85; p.add(body);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), bodyMat); head.position.y = 1.55; p.add(head);
      // a raised glowstick that lights up with the show
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.5, 6), new THREE.MeshBasicMaterial({ color: MODES[0].col }));
      stick.position.set(0.2, 1.9, 0); stick.rotation.z = -0.4; p.add(stick);
      crowd.push({ p, stick, base: 0, ph: Math.random() * 6.28, sway: 0.4 + Math.random() * 0.5 });
    }
  }
  return g;
}
const _crowd = buildCrowd();

// ================= WEB AUDIO — the beat + a per-mode lead =================
let actx = null, master = null;
function ensureAudio() {
  if (actx) { if (actx.state === 'suspended') actx.resume(); return; }
  actx = new (window.AudioContext || window.webkitAudioContext)();
  master = actx.createGain(); master.gain.value = 0.32; master.connect(actx.destination);
}
function whiteBuffer(sec) { const n = actx.sampleRate * sec; const b = actx.createBuffer(1, n, actx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; }
function kick(when) { const o = actx.createOscillator(), g = actx.createGain(); o.frequency.setValueAtTime(150, when); o.frequency.exponentialRampToValueAtTime(46, when + 0.13); g.gain.setValueAtTime(0.9, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.24); o.connect(g); g.connect(master); o.start(when); o.stop(when + 0.26); }
function hat(when) { const s = actx.createBufferSource(); s.buffer = whiteBuffer(0.08); const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 8500; const g = actx.createGain(); g.gain.setValueAtTime(0.14, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.045); s.connect(hp); hp.connect(g); g.connect(master); s.start(when); s.stop(when + 0.07); }
function bass(when, f) { const o = actx.createOscillator(), g = actx.createGain(); o.type = 'sawtooth'; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420; o.frequency.value = f; g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(0.22, when + 0.02); g.gain.exponentialRampToValueAtTime(0.001, when + 0.24); o.connect(lp); lp.connect(g); g.connect(master); o.start(when); o.stop(when + 0.26); }
function lead(when, f, waveIdx) { const waves = ['square', 'sawtooth', 'triangle', 'sawtooth', 'square', 'triangle']; const o = actx.createOscillator(), g = actx.createGain(); o.type = waves[waveIdx % waves.length]; o.frequency.value = f; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1600 + (waveIdx % 3) * 900; g.gain.setValueAtTime(0.0001, when); g.gain.linearRampToValueAtTime(0.12, when + 0.01); g.gain.exponentialRampToValueAtTime(0.001, when + 0.22); o.connect(lp); lp.connect(g); g.connect(master); o.start(when); o.stop(when + 0.24); }
function stab(freqs) { if (!actx) return; const when = actx.currentTime + 0.005; freqs.forEach((f) => lead(when, f, mode)); }
const ROOT = 55; // A1
// per-mode arpeggio scales (freqs)
const SCALES = [
  [110, 164.8, 220, 164.8],                 // PULSE  A minor-ish
  [123.5, 185, 246.9, 370],                 // BARS   B
  [146.8, 220, 293.7, 220],                 // TUNNEL D
  [164.8, 246.9, 329.6, 493.9],             // PLASMA E major
  [110, 220, 110, 440],                     // STROBE octaves
  [130.8, 196, 261.6, 392],                 // KALEIDO C
];
let live = false, lastStep = -1; const BPM = 124;
function tickAudio(t) {
  if (!actx || !live) return;
  const six = (60 / BPM) / 4; const step = Math.floor(t / six);
  if (step === lastStep) return; lastStep = step;
  const s = ((step % 16) + 16) % 16; const when = actx.currentTime + 0.01;
  if (s % 4 === 0) kick(when);
  if (s % 2 === 1) hat(when);
  if (s % 8 === 0) bass(when, ROOT);
  if (s % 8 === 4) bass(when, ROOT * 1.5);
  if (s % 2 === 0) { const sc = SCALES[mode]; lead(when, sc[(step / 2 | 0) % sc.length], mode); }
}

// ================= VJ DECK — six pads that drive the wall + music =================
const pads = [];
function buildDeck() {
  const g = new THREE.Group(); g.position.set(0, STAGE.y, -8); scene.add(g);
  for (const [lx, lz] of [[-1.5, -0.5], [1.5, -0.5], [-1.5, 0.5], [1.5, 0.5]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), std({ color: 0x14141c })); leg.position.set(lx, 0.5, lz); g.add(leg); }
  const deck = new THREE.Group(); deck.position.set(0, 1.05, 0.15); deck.rotation.x = 0.55; g.add(deck);
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.3, 1.7), std({ color: 0x120f1e, roughness: 0.5, metalness: 0.4, emissive: C(0x1a1030), emissiveIntensity: 0.2 })); body.castShadow = true; deck.add(body);
  MODES.forEach((M, i) => {
    const c = i % 3, r = (i / 3) | 0;
    const mat = std({ color: 0x0c0a18, emissive: C(M.col), emissiveIntensity: 0.3, roughness: 0.5 });
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, 0.55), mat);
    pad.position.set((c - 1) * 1.05, 0.22, (r - 0.5) * 0.66);
    pad.userData = { idx: i, mat, col: M.col }; deck.add(pad); pads.push(pad);
    const lbl = textPlane(M.name, '#' + C(M.col).getHexString(), 256, 40); lbl.position.set((c - 1) * 1.05, 0.17, (r - 0.5) * 0.66 + 0.02); lbl.rotation.x = -Math.PI / 2; lbl.scale.set(0.95, 0.15, 1); deck.add(lbl);
  });
  const cap = textPlane('VJ DECK · tap to switch the visual', '#8a5cff', 512, 48); cap.position.set(0, 1.95, -0.5); cap.scale.set(3.8, 0.36, 1); g.add(cap);
  const gl = new THREE.PointLight(0x8a5cff, 2, 8, 2); gl.position.set(0, 1.7, 0.7); g.add(gl);
  updaters.push((dt, t) => { gl.intensity = 1.6 + Math.sin(t * 3) * 0.5; pads.forEach((p) => { const on = p.userData.idx === mode; const tgt = on ? (0.9 + Math.sin(t * 6) * 0.3) : 0.3; p.userData.mat.emissiveIntensity += (tgt - p.userData.mat.emissiveIntensity) * Math.min(1, dt * 6); }); });
  return g;
}
const _deck = buildDeck();

function setMode(i) {
  mode = i; wallMat.uniforms.mode.value = i; wallMat.uniforms.col.value = C(MODES[i].col);
  if (wallGlow) wallGlow.color.setHex(MODES[i].col);
  const el = document.getElementById('mode'); if (el) el.innerHTML = 'visual: <b>' + MODES[i].name + '</b>';
  stab(SCALES[i].slice(0, 3));
}

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: RX - 1, eye: 1.6, zMin: ZBACK + 1 });
controls.pos.set(0, 1.6, 10); controls.yaw = Math.PI;
// walking onto the stage lifts you up onto the platform
controls.groundAt = (x, z) => (x > STAGE.x0 - 0.5 && x < STAGE.x1 + 0.5 && z > STAGE.z0 - 0.5 && z < STAGE.z1 + 0.5) ? STAGE.y : 0;

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'vj', overhead: { ax: 32, az: 30, cz: -2 },
  items: [
    { id: 'stage', label: 'Stage', obj: _stage },
    { id: 'lights', label: 'Lights + truss', obj: _lights },
    { id: 'mic', label: 'Mic', obj: _mic },
    { id: 'crowd', label: 'Crowd', obj: _crowd },
    { id: 'deck', label: 'VJ deck', obj: _deck },
  ],
});

// ---------- input ----------
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
  const ph = ray.intersectObjects(pads, false)[0];
  if (ph) { setMode(ph.object.userData.idx); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -RX + 1, RX - 1); g.z = THREE.MathUtils.clamp(g.z, ZBACK + 1, ZFRONT - 1); controls.walkTo(g); }
}
addEventListener('keydown', (e) => { const k = e.key; if (k >= '1' && k <= '6') setMode(+k - 1); });
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones + hint (going live)
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function onStage(p) { return p.x > STAGE.x0 - 0.5 && p.x < STAGE.x1 + 0.5 && p.z > STAGE.z0 - 0.5 && p.z < STAGE.z1 + 1.2; }
function updateZone(p) {
  const live2 = onStage(p);
  const z = live2 ? 'ON STAGE' : (p.z < -4 ? 'THE PIT' : 'THE FLOOR');
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1600); } }
  if (hintEl) hintEl.classList.toggle('show', live2);
}

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'warehouse.html'; }, 470);
};

// ---------- loop ----------
let beat = 0;
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  admin.update(dt);
  live = onStage(controls.pos);
  // beat pulse (locked to BPM); only "pumps" while the show is live
  beat = live ? Math.pow(1 - ((t * (BPM / 60)) % 1), 2.2) : beat * (1 - Math.min(1, dt * 3));
  wallMat.uniforms.t.value = t; wallMat.uniforms.beat.value = beat;
  tickAudio(t);
  // wall backlight + edge strip react
  if (wallGlow) wallGlow.intensity = (live ? 2.6 : 1.2) + beat * 3.2;
  if (edgeStrip) edgeStrip.material.color.copy(C(MODES[mode].col)).multiplyScalar(0.5 + beat);
  // moving heads: swing, colour to the mode, flash on the beat
  const mc = C(MODES[mode].col);
  heads.forEach((h, i) => {
    const swing = Math.sin(t * 1.1 + h.ph) * 6;
    h.tgt.position.set(h.x * 0.4 + swing, 0, live ? (2 + Math.sin(t * 0.7 + h.ph) * 3) : -3);
    const base = live ? 5 : 0.6; h.sp.intensity = base + beat * 9 * (live ? 1 : 0.2);
    h.sp.color.copy(mc); h.cone.material.color.copy(mc);
    h.cone.material.opacity = (live ? 0.06 : 0.02) + beat * 0.06;
    h.lamp.material.emissiveIntensity = 0.3 + h.sp.intensity * 0.05;
  });
  // crowd bobs harder when the show is live
  crowd.forEach((m) => {
    const amp = live ? (0.12 + beat * 0.4) : 0.03;
    m.p.position.y = amp * (0.5 + 0.5 * Math.sin(t * 5 + m.ph));
    m.p.rotation.z = (live ? 0.12 : 0.03) * Math.sin(t * 2 * m.sway + m.ph);
    m.stick.material.color.copy(mc).multiplyScalar(live ? (0.7 + beat) : 0.25);
  });
  for (const u of updaters) u(dt, t, beat);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  ensureAudio();
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
updaters.push(addMotes(scene, { color: 0x8a5cff, count: 140, area: [30, 12, 30], center: [0, 5, -4], rise: 0.3, opacity: 0.35 }));

if (import.meta.env.DEV) window.__vj = { controls, scene, pads, setMode, onStage, MODES, get mode() { return mode; }, get live() { return live; } };

if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
