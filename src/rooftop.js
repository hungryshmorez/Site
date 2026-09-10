import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addMotes } from './scene/ambientfx.js';
import { createAdmin } from './scene/admin.js';

// ROOFTOP CHILL ZONE — a serene rooftop under a slowly turning galaxy. City lights
// below the parapet, holographic art drifting overhead, cozy seating, and a
// soundboard: tap pads to layer ambient sounds (wind, rain, chimes, a lo-fi beat,
// vinyl crackle, a warm pad) into your own soundscape. (procedural + Web Audio)

const canvas = document.getElementById('scene');
try { const K = '12m.explored'; const s = new Set(JSON.parse(localStorage.getItem(K) || '[]')); s.add('rooftop'); localStorage.setItem(K, JSON.stringify([...s])); } catch (e) {}
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.24;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a1226, 0.012);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 400);
const updaters = [];

// ---------- night sky + rotating galaxy overhead ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(220, 40, 24), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x05070f) }, mid: { value: C(0x141d3a) }, bot: { value: C(0x0a0f22) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot; void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.5)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
  const sp = []; for (let i = 0; i < 500; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(200); if (v.y > 4) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xdfe6ff, size: 0.7, transparent: true, opacity: 0.85 })));
  // the galaxy: a big spiral disc high overhead, slowly rotating
  const galMat = new THREE.ShaderMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=(v-0.5)*2.0; float r=length(p); float a=atan(p.y,p.x);
      float arms=sin(a*2.0 + r*10.0 - t*0.3)*0.5+0.5; float core=smoothstep(0.5,0.0,r);
      float d=arms*smoothstep(1.0,0.15,r)*smoothstep(0.05,0.25,r); float br=core*1.2+d*0.9;
      vec3 c=mix(vec3(0.5,0.7,1.0), vec3(1.0,0.85,0.7), core) + vec3(0.6,0.4,0.9)*d;
      float alpha=clamp(br,0.0,1.0)*smoothstep(1.0,0.7,r); gl_FragColor=vec4(c*br,alpha);} `,
  });
  const galaxy = new THREE.Mesh(new THREE.PlaneGeometry(190, 190), galMat); galaxy.position.set(0, 32, -85); galaxy.rotation.x = -0.72; scene.add(galaxy);
  const galGlow = new THREE.PointLight(0x8aa0ff, 2.2, 120, 2); galGlow.position.set(0, 26, -60); scene.add(galGlow);
  updaters.push((dt, t) => { galMat.uniforms.t.value = t; galaxy.rotation.z += dt * 0.02; galGlow.intensity = 2 + Math.sin(t * 0.5) * 0.4; });
}
scene.add(new THREE.HemisphereLight(0x6a78b0, 0x10142a, 1.25));
const moon = new THREE.DirectionalLight(0xbfc8ff, 0.6); moon.position.set(-14, 24, -10); scene.add(moon);

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.44)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- rooftop deck, parapet, and city skyline below ----------
const RX = 15, RZ0 = 12, RZ1 = -16;
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d');
  x.fillStyle = '#20242e'; x.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 90; i++) { x.fillStyle = `rgba(${40 + Math.random() * 20 | 0},${44 + Math.random() * 20 | 0},${52 + Math.random() * 20 | 0},0.6)`; const s = 3 + Math.random() * 10; x.fillRect(Math.random() * 128, Math.random() * 128, s, s); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(16, 16); tex.colorSpace = THREE.SRGBColorSpace;
  const deck = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ0 - RZ1), std({ map: tex, roughness: 0.95, emissive: C(0x0e1428), emissiveIntensity: 0.2 }));
  deck.rotation.x = -Math.PI / 2; deck.position.set(0, 0, (RZ0 + RZ1) / 2); deck.receiveShadow = true; scene.add(deck);
  // parapet ledge around the edge
  const ledge = std({ color: 0x2a2e3a, roughness: 0.9 });
  const wall = (w, h, d, x2, y2, z2) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), ledge); m.position.set(x2, y2, z2); m.castShadow = true; scene.add(m); };
  wall(RX * 2 + 1, 1.0, 0.5, 0, 0.5, RZ1); wall(RX * 2 + 1, 1.0, 0.5, 0, 0.5, RZ0);
  wall(0.5, 1.0, RZ0 - RZ1 + 1, -RX, 0.5, (RZ0 + RZ1) / 2); wall(0.5, 1.0, RZ0 - RZ1 + 1, RX, 0.5, (RZ0 + RZ1) / 2);
  // city skyline silhouette rings beyond the ledge (lit windows)
  const winTex = (() => { const c = document.createElement('canvas'); c.width = 64; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#05070f'; g.fillRect(0, 0, 64, 128); for (let i = 0; i < 90; i++) { if (Math.random() < 0.5) continue; g.fillStyle = `rgba(255,${180 + Math.random() * 60 | 0},${100 + Math.random() * 80 | 0},${0.4 + Math.random() * 0.5})`; g.fillRect(6 + (i % 6) * 10, 6 + ((i / 6) | 0) * 10, 6, 7); } const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const cityMat = std({ map: winTex, emissive: C(0x1a1408), emissiveIntensity: 0.5, roughness: 1, color: 0x0a0d18 });
  for (let i = 0; i < 60; i++) {
    const ang = (i / 60) * Math.PI * 2; const dist = 30 + Math.random() * 60; const bh = 6 + Math.random() * 34;
    const b = new THREE.Mesh(new THREE.BoxGeometry(4 + Math.random() * 7, bh, 4 + Math.random() * 7), cityMat.clone());
    b.position.set(Math.cos(ang) * dist, bh / 2 - 8, Math.sin(ang) * dist - 2); scene.add(b);
  }
}

// ---------- rooftop dressing: water tower, HVAC, string lights, plants ----------
function buildDressing() {
  const g = new THREE.Group(); scene.add(g);
  // water tower (corner)
  const tower = new THREE.Group(); tower.position.set(-11, 0, -12); g.add(tower);
  for (const [lx, lz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 4, 6), std({ color: 0x2a2018 })); leg.position.set(lx, 2, lz); tower.add(leg); }
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 2.6, 14), std({ color: 0x3a2a1c, roughness: 0.9 })); tank.position.y = 5.3; tower.add(tank);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.1, 14), std({ color: 0x241a12 })); roof.position.y = 7.1; tower.add(roof);
  // HVAC boxes
  for (const [hx, hz] of [[11, -11], [12, -6]]) { const box = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 2), std({ color: 0x30343e, roughness: 0.8, metalness: 0.3 })); box.position.set(hx, 0.7, hz); g.add(box); const fan = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.08, 8, 16), std({ color: 0x14161c })); fan.rotation.x = -Math.PI / 2; fan.position.set(hx, 1.42, hz); g.add(fan); }
  // string lights strung across, warm bulbs
  const bulbs = [];
  for (let s = 0; s < 3; s++) { const z = -6 + s * 6; for (let i = 0; i < 14; i++) { const t = i / 13; const bx = -12 + t * 24; const by = 4.2 - Math.sin(t * Math.PI) * 1.1; const b = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(bx, by, z); g.add(b); bulbs.push(b); } }
  const sl = new THREE.PointLight(0xffd88a, 3, 24, 2); sl.position.set(0, 4, 0); g.add(sl);
  // potted plants
  for (const [px, pz] of [[-6, 6], [6, 6], [8, -2]]) { const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.32, 0.6, 10), std({ color: 0x6a4a3a })); pot.position.set(px, 0.3, pz); g.add(pot); for (let k = 0; k < 6; k++) { const a = (k / 6) * 6.28; const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.13, 1.1, 5), std({ color: 0x2a6a4a, roughness: 0.8 })); leaf.position.set(px + Math.cos(a) * 0.2, 1.0, pz + Math.sin(a) * 0.2); leaf.rotation.set(Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); g.add(leaf); } }
  updaters.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHSL(0.1, 0.6, 0.55 + Math.sin(t * 1.5 + i * 0.4) * 0.15)));
  return g;
}

// ---------- cozy seating ----------
function buildSeating() {
  const g = new THREE.Group(); scene.add(g);
  // rug
  const rug = new THREE.Mesh(new THREE.CircleGeometry(4.2, 40), std({ color: 0x2a2450, roughness: 1, emissive: C(0x14103a), emissiveIntensity: 0.2 })); rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.02, 3); g.add(rug);
  // low couch
  const couch = new THREE.Group(); couch.position.set(0, 0, 5.5); g.add(couch);
  const cf = std({ color: 0x3a4568, roughness: 0.95 });
  const cseat = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.5, 1.3), cf); cseat.position.set(0, 0.4, 0); cseat.castShadow = true; couch.add(cseat);
  const cb = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.9, 0.3), cf); cb.position.set(0, 0.85, -0.5); couch.add(cb);
  for (const sx of [-1.2, 0, 1.2]) { const cush = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.24, 1.1), std({ color: 0x4a5580, roughness: 0.95 })); cush.position.set(sx, 0.72, 0.05); couch.add(cush); }
  for (const [sx, col] of [[-1.3, 0x4ad0c0], [1.3, 0xff9ac0]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.16), std({ color: col, roughness: 0.9, emissive: C(col), emissiveIntensity: 0.25 })); p.position.set(sx, 0.9, 0.2); p.rotation.set(0.2, 0, 0.4); couch.add(p); }
  // two bean bags
  for (const [bx, bz, col] of [[-3.5, 3, 0xffd88a], [3.5, 3.2, 0xb6a8ff]]) { const bag = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 12), std({ color: col, roughness: 1, emissive: C(col), emissiveIntensity: 0.12 })); bag.scale.set(1, 0.6, 1); bag.position.set(bx, 0.45, bz); bag.castShadow = true; g.add(bag); }
  // low table with a candle
  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.15, 16), std({ color: 0x3a2a1c, roughness: 0.7 })); table.position.set(0, 0.5, 3); g.add(table);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.5, 8), std({ color: 0x241a12 })); stem.position.set(0, 0.25, 3); g.add(stem);
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 6), new THREE.MeshBasicMaterial({ color: 0xffd06a })); flame.position.set(0, 0.7, 3); g.add(flame);
  const fl = new THREE.PointLight(0xffb060, 1.4, 6, 2); fl.position.set(0, 0.8, 3); g.add(fl);
  updaters.push((dt, t) => { flame.scale.setScalar(1 + Math.sin(t * 12) * 0.15); fl.intensity = 1.2 + Math.sin(t * 10) * 0.3; });
  return g;
}

// ---------- floating holographic art displays ----------
function buildHolos() {
  const g = new THREE.Group(); scene.add(g);
  const mats = []; const holos = [];
  const holoMat = (seed) => new THREE.ShaderMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { t: { value: 0 }, s: { value: seed } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t,s; void main(){ vec2 p=(v-0.5)*3.0; float a=atan(p.y,p.x); float r=length(p);
      float w=sin(a*4.0+t+s*6.0-r*5.0); vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*2.0+t*0.5+s*3.0+r*3.0);
      float edge=smoothstep(1.4,1.2,r); float scan=sin((v.y+t*0.3)*40.0)*0.3+0.7;
      gl_FragColor=vec4(c*(0.5+0.5*w)*scan, edge*0.7);} `,
  });
  const spots = [[-8, 5.5, -4, 3], [7, 6.5, -8, 3.4], [-3, 7, -11, 2.6]];
  spots.forEach(([x, y, z, sz], i) => { const m = holoMat(i * 0.3); mats.push(m); const holo = new THREE.Mesh(new THREE.PlaneGeometry(sz, sz), m); holo.position.set(x, y, z); holo.userData = { y, ph: i * 2 }; g.add(holo); holos.push(holo); });
  updaters.push((dt, t) => { mats.forEach((m) => m.uniforms.t.value = t); holos.forEach((h) => { h.position.y = h.userData.y + Math.sin(t * 0.5 + h.userData.ph) * 0.4; h.rotation.y = Math.sin(t * 0.3 + h.userData.ph) * 0.3; }); });
  return g;
}

// ================= SOUNDBOARD (Web Audio, layerable) =================
let actx = null, master = null;
const layers = {}; // name -> { on, gain, target, ... }
const LAYERS = [
  { name: 'WIND', col: 0x9fb0d8 }, { name: 'RAIN', col: 0x4ad0c0 }, { name: 'CHIMES', col: 0xffd88a },
  { name: 'LO-FI BEAT', col: 0xff9ac0 }, { name: 'CRACKLE', col: 0xb6a8ff }, { name: 'WARM PAD', col: 0x7affc0 },
];
function noiseBuffer(sec) { const n = actx.sampleRate * sec; const b = actx.createBuffer(1, n, actx.sampleRate); const d = b.getChannelData(0); let last = 0; for (let i = 0; i < n; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } return b; }
function whiteBuffer(sec) { const n = actx.sampleRate * sec; const b = actx.createBuffer(1, n, actx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; }
function ensureAudio() {
  if (actx) { if (actx.state === 'suspended') actx.resume(); return; }
  actx = new (window.AudioContext || window.webkitAudioContext)();
  master = actx.createGain(); master.gain.value = 0.4; master.connect(actx.destination);
  // WIND: brown noise -> lowpass w/ LFO
  { const src = actx.createBufferSource(); src.buffer = noiseBuffer(4); src.loop = true; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; const lfo = actx.createOscillator(); const lg = actx.createGain(); lfo.frequency.value = 0.08; lg.gain.value = 260; lfo.connect(lg); lg.connect(lp.frequency); lfo.start(); const g = actx.createGain(); g.gain.value = 0; src.connect(lp); lp.connect(g); g.connect(master); src.start(); layers.WIND = { gain: g, target: 0.5, on: false }; }
  // RAIN: white noise -> highpass
  { const src = actx.createBufferSource(); src.buffer = whiteBuffer(3); src.loop = true; const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1400; const g = actx.createGain(); g.gain.value = 0; src.connect(hp); hp.connect(g); g.connect(master); src.start(); layers.RAIN = { gain: g, target: 0.22, on: false }; }
  // WARM PAD: detuned chord drone (A minor)
  { const g = actx.createGain(); g.gain.value = 0; g.connect(master); [220, 261.6, 329.6].forEach((f) => { for (const det of [-4, 4]) { const o = actx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = det; const og = actx.createGain(); og.gain.value = 0.16; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; o.connect(lp); lp.connect(og); og.connect(g); o.start(); } }); layers['WARM PAD'] = { gain: g, target: 0.5, on: false }; }
  // event layers (scheduled in the loop)
  layers.CHIMES = { on: false, next: 0 };
  layers['LO-FI BEAT'] = { on: false, next: 0, step: 0 };
  layers.CRACKLE = { on: false, next: 0 };
}
function toggleLayer(name) {
  ensureAudio(); const L = layers[name]; if (!L) return false; L.on = !L.on;
  if (L.gain) { const t = actx.currentTime; L.gain.gain.cancelScheduledValues(t); L.gain.gain.setValueAtTime(L.gain.gain.value, t); L.gain.gain.linearRampToValueAtTime(L.on ? L.target : 0, t + 0.8); }
  return L.on;
}
function bell(freq, when, gainv) { const t = when; const o = actx.createOscillator(); const o2 = actx.createOscillator(); const g = actx.createGain(); o.type = 'sine'; o2.type = 'sine'; o.frequency.value = freq; o2.frequency.value = freq * 2.01; const g2 = actx.createGain(); g2.gain.value = 0.3; o2.connect(g2); g2.connect(g); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gainv, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 2.4); o.connect(g); g.connect(master); o.start(t); o.stop(t + 2.5); o2.start(t); o2.stop(t + 2.5); }
function kick(when) { const o = actx.createOscillator(); const g = actx.createGain(); o.frequency.setValueAtTime(140, when); o.frequency.exponentialRampToValueAtTime(45, when + 0.12); g.gain.setValueAtTime(0.7, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.2); o.connect(g); g.connect(master); o.start(when); o.stop(when + 0.22); }
function hat(when) { const s = actx.createBufferSource(); s.buffer = whiteBuffer(0.1); const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 8000; const g = actx.createGain(); g.gain.setValueAtTime(0.16, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.05); s.connect(hp); hp.connect(g); g.connect(master); s.start(when); s.stop(when + 0.08); }
function pop(when) { const o = actx.createOscillator(); const g = actx.createGain(); o.frequency.value = 400 + Math.random() * 3000; g.gain.setValueAtTime(0.12, when); g.gain.exponentialRampToValueAtTime(0.001, when + 0.03); o.connect(g); g.connect(master); o.start(when); o.stop(when + 0.04); }
const PENTA = [523.25, 587.33, 698.46, 783.99, 880, 1046.5];
function schedule() {
  if (!actx) return; const now = actx.currentTime;
  const ch = layers.CHIMES; if (ch && ch.on) { if (ch.next < now) ch.next = now + 0.2; if (ch.next < now + 0.3) { bell(PENTA[(Math.random() * PENTA.length) | 0], ch.next, 0.18); ch.next += 0.7 + Math.random() * 2.2; } }
  const be = layers['LO-FI BEAT']; if (be && be.on) { if (be.next < now) be.next = now + 0.1; if (be.next < now + 0.3) { const s = be.step % 8; if (s === 0 || s === 3 || s === 6) kick(be.next); hat(be.next); be.step++; be.next += 0.25; } } // ~ lazy 8-step
  const cr = layers.CRACKLE; if (cr && cr.on) { if (cr.next < now) cr.next = now + 0.1; if (cr.next < now + 0.3) { pop(cr.next); cr.next += 0.08 + Math.random() * 0.5; } }
}

// ---------- soundboard console with 6 pads ----------
const pads = [];
function buildSoundboard() {
  const g = new THREE.Group(); g.position.set(0, 0, -3); scene.add(g);
  for (const [lx, lz] of [[-1.4, -0.5], [1.4, -0.5], [-1.4, 0.5], [1.4, 0.5]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), std({ color: 0x1a1e28 })); leg.position.set(lx, 0.5, lz); g.add(leg); }
  const deck = new THREE.Group(); deck.position.set(0, 1.05, 0.1); deck.rotation.x = 0.5; g.add(deck);
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.3, 1.6), std({ color: 0x14202e, roughness: 0.5, metalness: 0.35 })); body.castShadow = true; deck.add(body);
  LAYERS.forEach((L, i) => {
    const c = i % 3, r = (i / 3) | 0;
    const mat = std({ color: 0x0e1620, emissive: C(L.col), emissiveIntensity: 0.25, roughness: 0.5 });
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.12, 0.5), mat);
    pad.position.set((c - 1) * 0.95, 0.22, (r - 0.5) * 0.6);
    pad.userData = { layer: L.name, mat, col: L.col, on: false };
    deck.add(pad); pads.push(pad);
    const lbl = textPlane(L.name, '#' + C(L.col).getHexString(), 256, 40); lbl.position.set((c - 1) * 0.95, 0.16, (r - 0.5) * 0.6 + 0.02); lbl.rotation.x = -Math.PI / 2; lbl.scale.set(0.9, 0.14, 1); deck.add(lbl);
  });
  const cap = textPlane('SOUNDBOARD · tap to layer', '#4ad0c0', 512, 48); cap.position.set(0, 2.0, -0.4); cap.scale.set(3.6, 0.36, 1); g.add(cap);
  updaters.push((dt, t) => pads.forEach((p) => { const tgt = p.userData.on ? (0.9 + Math.sin(t * 4) * 0.25) : 0.25; p.userData.mat.emissiveIntensity += (tgt - p.userData.mat.emissiveIntensity) * Math.min(1, dt * 5); }));
  return g;
}
function hitPad(pad) {
  const on = toggleLayer(pad.userData.layer); pad.userData.on = on;
  const active = pads.filter((p) => p.userData.on).map((p) => p.userData.layer);
  const mix = document.getElementById('mix'); if (mix) mix.innerHTML = 'soundboard: <b>' + (active.length ? active.join(' · ') : 'silent') + '</b>';
}

// ---------- DJ booth (tap the decks to open the full DJ rig) ----------
function buildDJBooth() {
  const g = new THREE.Group(); g.position.set(-8, 0, -2); g.rotation.y = 0.5; scene.add(g);
  for (const [lx, lz] of [[-1.2, -0.4], [1.2, -0.4], [-1.2, 0.4], [1.2, 0.4]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), std({ color: 0x14161f })); leg.position.set(lx, 0.5, lz); g.add(leg); }
  const table = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.18, 1.1), std({ color: 0x14202e, roughness: 0.5, metalness: 0.35 })); table.position.y = 1.05; table.castShadow = true; g.add(table);
  // two spinning platters + a center mixer
  const platters = [];
  for (const sx of [-0.9, 0.9]) {
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.9), std({ color: 0x0a0d14, roughness: 0.5 })); deck.position.set(sx, 1.16, 0); g.add(deck);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 32), std({ color: 0x05060a, emissive: C(0x4ad0c0), emissiveIntensity: 0.5, roughness: 0.4 })); plat.position.set(sx, 1.21, 0); g.add(plat);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0xffe08a })); dot.rotation.x = -Math.PI / 2; dot.position.set(sx + 0.18, 1.24, 0); plat.add(dot);
    platters.push(plat);
  }
  const mixer = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.9), std({ color: 0x0e1620, roughness: 0.5, emissive: C(0x4ad0c0), emissiveIntensity: 0.12 })); mixer.position.set(0, 1.16, 0); g.add(mixer);
  for (const fx of [-0.15, 0, 0.15]) { const fader = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.28), std({ color: 0x2a3546 })); fader.position.set(fx, 1.22, 0); g.add(fader); const knob = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.06, 0.07), std({ color: 0xffe08a, emissive: C(0xffe08a), emissiveIntensity: 0.4 })); knob.position.set(fx, 1.25, (Math.random() - 0.5) * 0.2); g.add(knob); }
  // little VU screen
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ float b=step(v.y, 0.5+0.45*sin(v.x*10.0+t*4.0)); vec3 c=mix(vec3(0.1,0.5,0.5),vec3(1.0,0.7,0.3),v.x); gl_FragColor=vec4(c*b,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), scrMat); scr.position.set(0, 1.9, -0.55); g.add(scr);
  const cap = textPlane('DJ DECKS · tap to mix', '#4ad0c0', 512, 48); cap.position.set(0, 2.4, -0.4); cap.scale.set(3.2, 0.34, 1); g.add(cap);
  const gl = new THREE.PointLight(0x4ad0c0, 2.6, 10, 2); gl.position.set(0, 1.8, 0.8); g.add(gl);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 1.4), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(0, 1.3, 0); g.add(proxy);
  updaters.push((dt, t) => { scrMat.uniforms.t.value = t; platters.forEach((p) => p.rotation.y += dt * 2.2); gl.intensity = 2.2 + Math.sin(t * 3) * 0.5; });
  return { g, proxy };
}

// build
const _dress = buildDressing();
const _seat = buildSeating();
const _holo = buildHolos();
const _board = buildSoundboard();
const _dj = buildDJBooth();
updaters.push(addMotes(scene, { color: 0xbfc8ff, count: 160, area: [40, 14, 40], center: [0, 5, -2], rise: 0.25, opacity: 0.4 }));

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: RX - 1, eye: 1.6, zMin: RZ1 + 1 });
controls.pos.set(0, 1.6, 9); controls.yaw = Math.PI;

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'rooftop', overhead: { ax: 30, az: 26, cz: -2 },
  items: [
    { id: 'dressing', label: 'Roof dressing', obj: _dress },
    { id: 'seating', label: 'Seating', obj: _seat },
    { id: 'holos', label: 'Holo art', obj: _holo },
    { id: 'board', label: 'Soundboard', obj: _board },
    { id: 'dj', label: 'DJ booth', obj: _dj.g },
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
  if (ph) { hitPad(ph.object); return; }
  if (_dj.proxy && ray.intersectObject(_dj.proxy, false)[0]) { const w = document.getElementById('warp'); if (w) w.classList.add('go'); setTimeout(() => { window.location.href = 'dj.html'; }, 470); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -RX + 1, RX - 1); g.z = THREE.MathUtils.clamp(g.z, RZ1 + 1, RZ0 - 1); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zones + hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function updateZone(p) {
  const z = p.z < -1 ? 'THE SOUNDBOARD' : (p.z > 4 ? 'THE LOUNGE' : 'THE ROOFTOP');
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1700); } }
  if (hintEl) hintEl.classList.toggle('show', p.z < 0);
}

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'warehouse.html'; }, 470);
};

// loop
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  controls.update(dt);
  admin.update(dt);
  schedule();
  for (const u of updaters) u(dt, t, 0);
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

if (import.meta.env.DEV) window.__rf = { controls, scene, pads, toggleLayer };

if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
