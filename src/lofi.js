import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAdmin } from './scene/admin.js';

// SURREAL LO-FI ROOM — a cozy dreamscape for the lo-fi tapes. Mismatched
// furniture on a warm rug under kaleidoscopic skies, clouds wearing headphones
// drifting overhead, vinyl spinning in the air, and a playable BEAT-PAD (real
// Web Audio) so you can tap out lo-fi live. Tap the turntable to start a loop.

const canvas = document.getElementById('scene');
// mark this room explored (unlocks the hub's hidden door once all are found)
try { const K = '12m.explored'; const s = new Set(JSON.parse(localStorage.getItem(K) || '[]')); s.add('lofi'); localStorage.setItem(K, JSON.stringify([...s])); } catch (e) {}
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.28;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x241640, 0.018);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 240);

const updaters = [];

// ---------- kaleidoscopic dream sky ----------
let skyMat;
{
  skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { t: { value: 0 } },
    vertexShader: `varying vec3 vp; void main(){ vp=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec3 vp; uniform float t;
      void main(){ float h=vp.y*0.5+0.5; float a=atan(vp.z,vp.x);
        float k=sin(a*6.0+t*0.3)*0.5+0.5;
        vec3 dusk=mix(vec3(0.16,0.09,0.26), vec3(0.55,0.35,0.6), h);
        vec3 candy=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*2.0+t*0.2+h*3.0);
        vec3 c=mix(dusk, candy, 0.35+0.25*k*pow(h,0.6));
        c+=pow(max(0.0,1.0-abs(h-0.5)*2.0),3.0)*vec3(0.9,0.6,0.7)*0.25; // horizon band
        gl_FragColor=vec4(c,1.0);} `,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(150, 40, 24), skyMat); scene.add(sky);
  updaters.push((dt, t) => { skyMat.uniforms.t.value = t; });
  // soft dream stars
  const sp = []; for (let i = 0; i < 200; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(140); if (v.y > 6) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xfff0ff, size: 0.6, transparent: true, opacity: 0.6 })));
}
scene.add(new THREE.HemisphereLight(0xc9b6ff, 0x2a1840, 1.25));
const key = new THREE.DirectionalLight(0xffd9c0, 0.6); key.position.set(8, 16, 12); scene.add(key);
const fill = new THREE.DirectionalLight(0x9af7d0, 0.35); fill.position.set(-10, 8, -6); scene.add(fill);

// ---------- cozy floor: warm boards + a big soft rug ----------
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d');
  x.fillStyle = '#3a2a3e'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 16) { x.fillStyle = i % 32 ? 'rgba(0,0,0,0.14)' : 'rgba(120,90,120,0.1)'; x.fillRect(0, i, 256, 8); } // boards
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(20, 20); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(140, 140), std({ map: tex, roughness: 0.9, emissive: C(0x1c1030), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  // rug
  const rc = document.createElement('canvas'); rc.width = rc.height = 128; const rx = rc.getContext('2d');
  rx.fillStyle = '#5a2f5e'; rx.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 6; i++) { rx.strokeStyle = ['#ffb3a7', '#9af7d0', '#ffe08a', '#c9b6ff'][i % 4]; rx.lineWidth = 3; rx.strokeRect(8 + i * 8, 8 + i * 8, 128 - 16 - i * 16, 128 - 16 - i * 16); }
  const rtex = new THREE.CanvasTexture(rc); rtex.colorSpace = THREE.SRGBColorSpace;
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(14, 11), std({ map: rtex, roughness: 1, emissive: C(0x2a1030), emissiveIntensity: 0.2 }));
  rug.rotation.x = -Math.PI / 2; rug.position.set(0, 0.02, 1); scene.add(rug);
}

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.46)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 18; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- clouds wearing headphones (floating, bobbing) ----------
function buildClouds() {
  const g = new THREE.Group(); scene.add(g);
  const cloudMat = std({ color: 0xe9dcff, roughness: 1, emissive: C(0x6a4a9a), emissiveIntensity: 0.18 });
  const cans = [];
  const mk = (x, y, z, s) => {
    const grp = new THREE.Group(); grp.position.set(x, y, z); grp.scale.setScalar(s);
    for (const [cx, cy, cr] of [[-0.7, 0, 0.55], [0, 0.14, 0.72], [0.72, 0, 0.5], [0.05, -0.1, 0.6], [-0.3, 0.08, 0.5]]) { const p = new THREE.Mesh(new THREE.SphereGeometry(cr, 14, 12), cloudMat); p.position.set(cx, cy, (Math.random() - 0.5) * 0.3); grp.add(p); }
    // headphones: band + two cups
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.07, 8, 20, Math.PI), std({ color: 0x1a1424, roughness: 0.5 })); band.position.y = 0.5; grp.add(band);
    for (const sx of [-1, 1]) { const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 14), std({ color: 0x2a2036, emissive: C(0xb967ff), emissiveIntensity: 0.4 })); cup.rotation.z = Math.PI / 2; cup.position.set(sx * 0.78, 0.16, 0); grp.add(cup); }
    grp.userData.baseY = y; grp.userData.ph = Math.random() * 6; g.add(grp); cans.push(grp);
  };
  mk(-8, 6, -6, 1.4); mk(7, 7.2, -8, 1.7); mk(0, 8, -12, 2.0); mk(10, 5.5, 2, 1.2); mk(-11, 6.4, 1, 1.5);
  updaters.push((dt, t) => cans.forEach((c) => { c.position.y = c.userData.baseY + Math.sin(t * 0.6 + c.userData.ph) * 0.4; c.rotation.y = Math.sin(t * 0.2 + c.userData.ph) * 0.2; }));
  return g;
}

// ---------- floating spinning vinyl records with kaleidoscope labels ----------
function buildVinyls() {
  const g = new THREE.Group(); scene.add(g);
  const disc = std({ color: 0x0a0a12, roughness: 0.4, metalness: 0.2 });
  const labelMat = () => new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=(v-0.5)*2.0; float a=atan(p.y,p.x); float r=length(p);
      vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*4.0+t-r*6.0); gl_FragColor=vec4(c,1.0);} `,
  });
  const recs = []; const mats = [];
  const mk = (x, y, z, s, tilt) => {
    const grp = new THREE.Group(); grp.position.set(x, y, z); grp.rotation.x = tilt; grp.scale.setScalar(s);
    const d = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.05, 40), disc); d.rotation.x = Math.PI / 2; grp.add(d);
    const m = labelMat(); mats.push(m); const lab = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), m); lab.position.z = 0.03; grp.add(lab);
    const hole = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0x000000 })); hole.position.z = 0.031; grp.add(hole);
    grp.userData.baseY = y; grp.userData.ph = Math.random() * 6; g.add(grp); recs.push(grp);
  };
  mk(-6, 4.5, -4, 1.1, 0.5); mk(6, 5, -5, 1.3, -0.4); mk(1, 6, -9, 1.5, 0.3);
  updaters.push((dt, t) => { mats.forEach((m) => m.uniforms.t.value = t); recs.forEach((r) => { r.rotation.z += dt * 0.7; r.position.y = r.userData.baseY + Math.sin(t * 0.5 + r.userData.ph) * 0.3; }); });
  return g;
}

// ---------- cozy mismatched furniture ----------
function buildFurniture() {
  const g = new THREE.Group(); scene.add(g);
  // couch (right)
  const couch = new THREE.Group(); couch.position.set(6.5, 0, 1.5); couch.rotation.y = -0.7; g.add(couch);
  const cf = std({ color: 0x7a4a6a, roughness: 0.95 });
  const cseat = new THREE.Mesh(new THREE.BoxGeometry(3, 0.5, 1.3), cf); cseat.position.y = 0.55; cseat.castShadow = true; couch.add(cseat);
  const cback = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 0.35), cf); cback.position.set(0, 1.1, -0.5); couch.add(cback);
  for (const sx of [-1.5, 1.5]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 1.3), cf); arm.position.set(sx, 0.8, 0); couch.add(arm); }
  for (const sx of [-1.1, 0, 1.1]) { const cush = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 1.1), std({ color: 0x8a5a7a, roughness: 0.95 })); cush.position.set(sx, 0.86, 0.05); couch.add(cush); }
  const pil = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.16), std({ color: 0x9af7d0, roughness: 0.9, emissive: C(0x2a5a44), emissiveIntensity: 0.2 })); pil.position.set(-0.9, 1.0, 0.2); pil.rotation.set(0.3, 0, 0.4); couch.add(pil);

  // armchair (left)
  const chair = new THREE.Group(); chair.position.set(-6.5, 0, 2); chair.rotation.y = 0.7; g.add(chair);
  const chm = std({ color: 0x4a5a8a, roughness: 0.95 });
  const cs = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 1.4), chm); cs.position.y = 0.55; cs.castShadow = true; chair.add(cs);
  const cb = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.1, 0.35), chm); cb.position.set(0, 1.1, -0.55); chair.add(cb);
  for (const sx of [-0.8, 0.8]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 1.4), chm); arm.position.set(sx, 0.85, 0); chair.add(arm); }

  // floor lamp (warm)
  const lamp = new THREE.Group(); lamp.position.set(-8.5, 0, -1); g.add(lamp);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.6, 8), std({ color: 0x2a2030, metalness: 0.5 })); pole.position.y = 1.3; lamp.add(pole);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.5, 0.6, 16, 1, true), std({ color: 0xffe08a, roughness: 0.7, emissive: C(0xffcf6a), emissiveIntensity: 0.9, side: THREE.DoubleSide })); shade.position.y = 2.7; lamp.add(shade);
  const lampL = new THREE.PointLight(0xffd98a, 4, 12, 2); lampL.position.set(-8.5, 2.5, -1); g.add(lampL);
  updaters.push((dt, t) => { lampL.intensity = 3.6 + Math.sin(t * 2.2) * 0.4; });

  // potted plant
  const plant = new THREE.Group(); plant.position.set(8.5, 0, -1.5); g.add(plant);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.5, 12), std({ color: 0xc86a4a, roughness: 0.9 })); pot.position.y = 0.25; plant.add(pot);
  for (let i = 0; i < 7; i++) { const a = (i / 7) * Math.PI * 2; const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.14, 1.1 + Math.random() * 0.5, 5), std({ color: 0x4aa06a, roughness: 0.8 })); leaf.position.set(Math.cos(a) * 0.2, 1.0, Math.sin(a) * 0.2); leaf.rotation.set(Math.cos(a) * 0.5, 0, -Math.sin(a) * 0.5); plant.add(leaf); }

  // bookshelf against the back
  const shelf = new THREE.Group(); shelf.position.set(-13, 0, -8); shelf.rotation.y = 0.5; g.add(shelf);
  const wood = std({ color: 0x4a3020, roughness: 0.9 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(3, 3.4, 0.6), wood); frame.position.y = 1.7; shelf.add(frame);
  for (let r = 0; r < 4; r++) { const board = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.08, 0.55), std({ color: 0x2a1c12 })); board.position.set(0, 0.5 + r * 0.85, 0.02); shelf.add(board);
    for (let b = 0; b < 6; b++) { const bk = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5 + Math.random() * 0.2, 0.4), std({ color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5), roughness: 0.9 })); bk.position.set(-1.2 + b * 0.24, 0.85 + r * 0.85, 0.05); bk.rotation.z = Math.random() < 0.2 ? 0.3 : 0; shelf.add(bk); } }
  return g;
}

// ---------- turntable on a low table (tap to start the loop) ----------
let platter, ttSpin = 0;
function buildTurntable() {
  const g = new THREE.Group(); g.position.set(-4.5, 0, -0.5); scene.add(g);
  const wood = std({ color: 0x5a3a26, roughness: 0.85 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 1.6), wood); top.position.y = 0.9; top.castShadow = true; g.add(top);
  for (const [lx, lz] of [[-1, -0.6], [1, -0.6], [-1, 0.6], [1, 0.6]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 8), std({ color: 0x2a1c12 })); leg.position.set(lx, 0.45, lz); g.add(leg); }
  const deck = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.14, 1.3), std({ color: 0x1a1620, roughness: 0.5, metalness: 0.3 })); deck.position.y = 1.05; g.add(deck);
  platter = new THREE.Group(); platter.position.set(-0.2, 1.13, 0); g.add(platter);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.04, 40), std({ color: 0x08080e, roughness: 0.4 })); disc.rotation.x = 0; platter.add(disc);
  const labMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=(v-0.5)*2.0; float a=atan(p.y,p.x); vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*3.0+t); gl_FragColor=vec4(c,1.0);} `,
  });
  const lab = new THREE.Mesh(new THREE.CircleGeometry(0.24, 28), labMat); lab.rotation.x = -Math.PI / 2; lab.position.y = 0.025; platter.add(lab);
  const tonearm = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.9), std({ color: 0xcfd0e0, metalness: 0.6 })); tonearm.position.set(0.55, 1.2, -0.3); tonearm.rotation.y = -0.5; g.add(tonearm);
  const cap = textPlane('TURNTABLE · tap to play', '#9af7d0', 512, 48); cap.position.set(0, 1.7, 0); cap.scale.set(3.2, 0.34, 1); g.add(cap);
  // proxy for tapping
  const proxy = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.4, 12), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(-0.2, 1.2, 0); proxy.userData.turntable = true; g.add(proxy);
  updaters.push((dt, t) => { labMat.uniforms.t.value = t; platter.rotation.y += dt * ttSpin; ttSpin += ((trackOn ? 3.2 : 0) - ttSpin) * Math.min(1, dt * 2); });
  return { g, proxy };
}

// ================= BEAT-PAD (real Web Audio) =================
let actx = null, master = null, filt = null;
function ensureAudio() {
  if (!actx) {
    actx = new (window.AudioContext || window.webkitAudioContext)();
    master = actx.createGain(); master.gain.value = 0.32;
    filt = actx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 2600; filt.Q.value = 0.6; // lo-fi warmth
    filt.connect(master); master.connect(actx.destination);
  }
  if (actx.state === 'suspended') actx.resume();
}
function tone(freq, dur, type, gainv, when = 0) {
  const t = actx.currentTime + when; const o = actx.createOscillator(); const g = actx.createGain();
  o.type = type; o.frequency.value = freq; const d = o.detune; if (d) d.value = (Math.random() - 0.5) * 8;
  g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(gainv, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(filt); o.start(t); o.stop(t + dur + 0.03);
}
let noiseBuf = null;
function noise() { if (noiseBuf) return noiseBuf; const n = actx.sampleRate * 0.4; noiseBuf = actx.createBuffer(1, n, actx.sampleRate); const d = noiseBuf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return noiseBuf; }
function drum(kind) {
  const t = actx.currentTime;
  if (kind === 'kick') { const o = actx.createOscillator(); const g = actx.createGain(); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(45, t + 0.12); g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.connect(g); g.connect(filt); o.start(t); o.stop(t + 0.22); return; }
  const src = actx.createBufferSource(); src.buffer = noise(); const g = actx.createGain(); const bp = actx.createBiquadFilter();
  if (kind === 'snare') { bp.type = 'highpass'; bp.frequency.value = 1200; g.gain.setValueAtTime(0.6, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18); }
  else { bp.type = 'highpass'; bp.frequency.value = 7000; g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.05); } // hat
  src.connect(bp); bp.connect(g); g.connect(filt); src.start(t); src.stop(t + 0.2);
}
// pad → sound map. bottom row = drums, upper rows = a warm pentatonic
const SCALE = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22, 24, 27]; // minor pentatonic, semitones
const noteFreq = (semi) => 220 * Math.pow(2, semi / 12);
function playPad(i) {
  ensureAudio();
  if (i < 4) { drum(['kick', 'snare', 'hat', 'kick'][i]); }
  else { const semi = SCALE[(i - 4) % SCALE.length]; tone(noteFreq(semi), 0.8, i % 2 ? 'triangle' : 'sine', 0.5); tone(noteFreq(semi) * 1.5, 0.5, 'sine', 0.12); }
}

const pads = [];
function buildBeatPad() {
  const g = new THREE.Group(); g.position.set(0, 0, -3.4); scene.add(g);
  for (const [lx, lz] of [[-1.5, -0.7], [1.5, -0.7], [-1.5, 0.7], [1.5, 0.7]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), std({ color: 0x14101c })); leg.position.set(lx, 0.5, lz); g.add(leg); }
  // one tilted console; everything on top is a child so it inherits the slant.
  // A steep tilt faces the pads up toward a standing player.
  const deck = new THREE.Group(); deck.position.set(0, 1.0, 0.1); deck.rotation.x = 0.5; g.add(deck);
  const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.32, 2.0), std({ color: 0x1c1626, roughness: 0.6, metalness: 0.3 })); body.castShadow = true; deck.add(body);
  // little screen along the back edge of the console
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ float w=sin((v.x*8.0)+t*3.0)*0.5+0.5; vec3 c=mix(vec3(0.1,0.5,0.4),vec3(0.7,0.5,0.9),v.y); gl_FragColor=vec4(c*(0.4+0.6*w),1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 0.42), scrMat); scr.position.set(0, 0.28, -0.78); scr.rotation.x = -0.5; deck.add(scr);
  updaters.push((dt, t) => { scrMat.uniforms.t.value = t; });
  // 4x4 pad grid laid flat on the (tilted) deck
  const cols = 4, rows = 4;
  const PADCOLS = [0xff6a8a, 0x9af7d0, 0xffe08a, 0xb967ff];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const idx = r * cols + c;
    const mat = std({ color: 0x14101c, emissive: C(PADCOLS[c]), emissiveIntensity: 0.5, roughness: 0.5 });
    const pad = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.12, 0.4), mat);
    pad.position.set((c - 1.5) * 0.76, 0.22, (r - 1.5) * 0.56);
    pad.userData = { padIndex: idx, mat, col: PADCOLS[c], flash: 0, baseY: 0.22 };
    deck.add(pad); pads.push(pad);
  }
  const cap = textPlane('BEAT-PAD · tap to play lo-fi', '#ffe08a', 512, 48); cap.position.set(0, 2.0, -0.5); cap.scale.set(3.6, 0.36, 1); g.add(cap);
  updaters.push((dt) => pads.forEach((p) => { const u = p.userData; if (u.flash > 0) { u.flash = Math.max(0, u.flash - dt * 3); u.mat.emissiveIntensity = 0.5 + u.flash * 1.8; p.position.y = u.baseY + u.flash * 0.05; } }));
  return g;
}
function hitPad(pad) {
  const u = pad.userData; u.flash = 1; u.mat.emissiveIntensity = 1.8; playPad(u.padIndex);
  const np = document.getElementById('np'); if (np) np.innerHTML = 'beat-pad: <b>' + (u.padIndex < 4 ? 'drum' : 'note ' + (u.padIndex - 3)) + '</b>';
}

// ---------- NOW PLAYING wall art (vibe only) ----------
function buildWallArt() {
  const g = new THREE.Group(); g.position.set(0, 0, -15.5); scene.add(g);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(40, 12, 0.6), std({ color: 0x201636, roughness: 0.95, emissive: C(0x160e28), emissiveIntensity: 0.3 })); wall.position.y = 6; g.add(wall);
  const artMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=(v-0.5)*4.0; float a=atan(p.y,p.x); float r=length(p);
      float s=sin(a*3.0+t*0.6-r*3.0); vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*1.5+t*0.4+r*2.0); gl_FragColor=vec4(c*(0.5+0.5*s),1.0);} `,
  });
  const art = new THREE.Mesh(new THREE.PlaneGeometry(8, 4.6), artMat); art.position.set(0, 5.4, 0.35); g.add(art);
  const cap = textPlane('SO FA KING · LO-FI TAPES', '#c9b6ff', 512, 56); cap.position.set(0, 8.4, 0.4); cap.scale.set(7, 0.7, 1); g.add(cap);
  const l = new THREE.PointLight(0xb967ff, 4, 22, 2); l.position.set(0, 5, 6); g.add(l);
  updaters.push((dt, t) => { artMat.uniforms.t.value = t; });
  return g;
}

// build
const _clouds = buildClouds();
const _vinyls = buildVinyls();
const _furniture = buildFurniture();
const _tt = buildTurntable();
const _pad = buildBeatPad();
const _wall = buildWallArt();

updaters.push(addMotes(scene, { color: 0xd8c4ff, count: 200, area: [46, 14, 46], center: [0, 5, -4], rise: 0.3, opacity: 0.45 }));
updaters.push(addHaze(scene, { color: 0x6a4a9a, count: 8, center: [0, 3, -6], area: [34, 6, 24], scale: 10, opacity: 0.05 }));

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 22, eye: 1.6, zMin: -16 });
controls.pos.set(0, 1.6, 8); controls.yaw = 0;

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'lofi', overhead: { ax: 26, az: 20, cz: -3 },
  items: [
    { id: 'clouds', label: 'Headphone clouds', obj: _clouds },
    { id: 'vinyls', label: 'Floating vinyl', obj: _vinyls },
    { id: 'furniture', label: 'Furniture', obj: _furniture },
    { id: 'turntable', label: 'Turntable', obj: _tt.g },
    { id: 'beatpad', label: 'Beat-pad', obj: _pad },
    { id: 'wall', label: 'Wall art', obj: _wall },
  ],
});

// ---------- input ----------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
let trackOn = false;
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
  const padHit = ray.intersectObjects(pads, false)[0];
  if (padHit) { hitPad(padHit.object); return; }
  if (_tt.proxy && ray.intersectObject(_tt.proxy, false)[0]) { toggleTrack(); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -21, 21); g.z = THREE.MathUtils.clamp(g.z, -15, 21); controls.walkTo(g); }
}

const track = document.getElementById('track');
function toggleTrack() {
  ensureAudio();
  trackOn = !trackOn;
  if (track) { if (trackOn) { track.volume = 0.45; track.play().catch(() => {}); } else track.pause(); }
  const np = document.getElementById('np'); if (np) np.innerHTML = trackOn ? 'now spinning: <b>lo-fi loop</b>' : 'turntable: <b>stopped</b>';
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---------- zones + hint ----------
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function updateZone(p) {
  const z = Math.hypot(p.x - 0, p.z - (-3.4)) < 4 ? 'THE BEAT-PAD' : (p.x < -3 ? 'THE TURNTABLE' : (p.x > 3 ? 'THE LOUNGE' : 'THE LO-FI ROOM'));
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1700); } }
  if (hintEl) hintEl.classList.toggle('show', Math.hypot(p.x, p.z - (-3.4)) < 5 || Math.hypot(p.x - (-4.5), p.z - (-0.5)) < 3);
}

document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'warehouse.html'; }, 470);
};

// ---------- loop ----------
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const p = Math.pow(1 - ((t * (78 / 60)) % 1), 2.0);
  controls.update(dt);
  admin.update(dt);
  for (const u of updaters) u(dt, t, p);
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

if (import.meta.env.DEV) window.__lf = { controls, scene, pads };

if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
