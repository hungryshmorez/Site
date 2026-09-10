import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAdmin } from './scene/admin.js';

// HORRORCORE CRAWLSPACE — a dim concrete basement under one swinging, flickering
// bulb. Pipes drip in the dark, framed scenes whisper when you tap them, and a
// low crawlspace in the back wall hides five tapes. Find them all to unlock a
// track that was never released. (procedural geometry + Web Audio, no assets)

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
scene.fog = new THREE.FogExp2(0x080605, 0.05);
scene.background = C(0x060403);
const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 120);

const updaters = [];

scene.add(new THREE.HemisphereLight(0x3a2622, 0x060403, 0.7));
const amb = new THREE.AmbientLight(0x241a16, 0.55); scene.add(amb);

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.44)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- concrete room: floor, walls, low ceiling ----------
const RX = 13, RZ0 = 9, RZ1 = -18, CEIL = 4.2;
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d');
  x.fillStyle = '#1a1512'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 140; i++) { x.fillStyle = `rgba(${10 + Math.random() * 20 | 0},${8 + Math.random() * 16 | 0},${6 + Math.random() * 12 | 0},0.6)`; const s = 6 + Math.random() * 40; x.fillRect(Math.random() * 256, Math.random() * 256, s, s * 0.7); }
  for (let i = 0; i < 30; i++) { x.strokeStyle = 'rgba(0,0,0,0.5)'; x.beginPath(); x.moveTo(Math.random() * 256, Math.random() * 256); x.lineTo(Math.random() * 256, Math.random() * 256); x.stroke(); }
  for (let i = 0; i < 20; i++) { x.fillStyle = 'rgba(90,40,20,0.25)'; x.beginPath(); x.arc(Math.random() * 256, Math.random() * 256, 5 + Math.random() * 18, 0, 7); x.fill(); } // stains
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.colorSpace = THREE.SRGBColorSpace;
  const conc = (rx, ry) => { const m = tex.clone(); m.needsUpdate = true; m.wrapS = m.wrapT = THREE.RepeatWrapping; m.repeat.set(rx, ry); return std({ map: m, roughness: 1, emissive: C(0x0a0605), emissiveIntensity: 0.15 }); };
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ0 - RZ1), conc(8, 8)); floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, (RZ0 + RZ1) / 2); floor.receiveShadow = true; scene.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ0 - RZ1), conc(8, 8)); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, CEIL, (RZ0 + RZ1) / 2); scene.add(ceil);
  const wallMat = conc(8, 2);
  const back = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, CEIL), wallMat); back.position.set(0, CEIL / 2, RZ1); scene.add(back);
  const front = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, CEIL), wallMat); front.rotation.y = Math.PI; front.position.set(0, CEIL / 2, RZ0); scene.add(front);
  const left = new THREE.Mesh(new THREE.PlaneGeometry(RZ0 - RZ1, CEIL), wallMat); left.rotation.y = Math.PI / 2; left.position.set(-RX, CEIL / 2, (RZ0 + RZ1) / 2); scene.add(left);
  const right = new THREE.Mesh(new THREE.PlaneGeometry(RZ0 - RZ1, CEIL), wallMat); right.rotation.y = -Math.PI / 2; right.position.set(RX, CEIL / 2, (RZ0 + RZ1) / 2); scene.add(right);
}

// ---------- swinging, flickering bulb ----------
let bulb, bulbLight;
{
  const g = new THREE.Group(); g.position.set(0, CEIL, -3); scene.add(g);
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.2, 6), std({ color: 0x0a0a0a })); wire.position.y = -0.6; g.add(wire);
  bulb = new THREE.Mesh(new THREE.SphereGeometry(0.11, 14, 12), std({ color: 0xfff2c0, emissive: C(0xffe08a), emissiveIntensity: 2.4 })); bulb.position.y = -1.2; g.add(bulb);
  bulbLight = new THREE.PointLight(0xffdca0, 12, 28, 2); bulbLight.position.y = -1.2; g.add(bulbLight);
  let flick = 1;
  updaters.push((dt, t) => {
    g.rotation.z = Math.sin(t * 0.9) * 0.14; g.rotation.x = Math.cos(t * 0.7) * 0.08;
    flick += ((Math.random() < 0.08 ? 0.15 + Math.random() * 0.4 : 1) - flick) * Math.min(1, dt * 14);
    bulbLight.intensity = 11.5 * flick; bulb.material.emissiveIntensity = 2.4 * flick;
  });
}
// a second dying bulb deep in the back
{
  const b2 = new THREE.PointLight(0x6aff8a, 2.2, 12, 2); b2.position.set(0, 2.6, -15); scene.add(b2);
  updaters.push((dt, t) => { b2.intensity = 1.6 + (Math.random() < 0.1 ? Math.random() * 2 : 0) + Math.sin(t * 3) * 0.3; });
}

// ---------- ceiling pipes with dripping points ----------
const dripPts = [];
function buildPipes() {
  const g = new THREE.Group(); scene.add(g);
  const pipeMat = std({ color: 0x2a2420, roughness: 0.6, metalness: 0.6 });
  for (const px of [-8, -2, 5, 9]) { const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, RZ0 - RZ1, 10), pipeMat); pipe.rotation.x = Math.PI / 2; pipe.position.set(px, CEIL - 0.35, (RZ0 + RZ1) / 2); g.add(pipe);
    for (const b of [-1, 1]) { const br = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6), pipeMat); br.position.set(px + b * 0.2, CEIL - 0.15, 0); g.add(br); } }
  // valves
  for (const [vx, vz] of [[-2, 2], [5, -6]]) { const v = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.06, 8, 16), std({ color: 0x8a2a1a, roughness: 0.7, metalness: 0.4 })); v.position.set(vx, CEIL - 0.35, vz); g.add(v); }
  // drip emitters (a hanging droplet that falls + splashes)
  for (const [dx, dz] of [[-2, 3], [5, -4], [-8, -9]]) {
    const drop = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), new THREE.MeshBasicMaterial({ color: 0x9ad0ff, transparent: true, opacity: 0.8 }));
    drop.position.set(dx, CEIL - 0.5, dz); g.add(drop);
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.06, 16), new THREE.MeshBasicMaterial({ color: 0x9ad0ff, transparent: true, opacity: 0, side: THREE.DoubleSide })); ring.rotation.x = -Math.PI / 2; ring.position.set(dx, 0.03, dz); g.add(ring);
    dripPts.push({ drop, ring, dz, dx, y: CEIL - 0.5, phase: Math.random() * 3, next: 1 + Math.random() * 3 });
  }
  updaters.push((dt, t) => {
    for (const d of dripPts) {
      d.phase += dt;
      if (d.phase < d.next) { d.drop.position.y = d.y; d.drop.material.opacity = 0.8; }
      else { const f = (d.phase - d.next) / 0.6; if (f < 1) { d.drop.position.y = d.y - f * (d.y - 0.05); d.drop.material.opacity = 0.8; } else { d.drop.material.opacity = 0; d.ring.material.opacity = Math.max(0, 1 - (f - 1) * 2); d.ring.scale.setScalar(1 + (f - 1) * 6); if (f > 1.5) { d.phase = 0; d.next = 1.5 + Math.random() * 3.5; playDrip(); } } }
    }
  });
  return g;
}

// ---------- framed horror scenes (tap → whisper + subtitle) ----------
const frames = [];
const LINES = [
  'i can still hear it under the floorboards…',
  'nobody came looking. nobody ever does.',
  'the tape keeps playing after it ends.',
];
function buildFrames() {
  const g = new THREE.Group(); scene.add(g);
  const frameMat = std({ color: 0x1a1210, roughness: 0.8, metalness: 0.2 });
  const sceneMat = (seed) => new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, s: { value: seed } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t,s;
      float h(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5); }
      void main(){ vec2 p=v; float n=h(floor(p*vec2(90.0,120.0))+floor(t*12.0));
        float scan=step(0.5,fract(p.y*80.0+t));
        float fig=smoothstep(0.36,0.34,abs(p.x-0.5)) * smoothstep(0.1,0.13,p.y) * smoothstep(0.95,0.9,p.y+abs(p.x-0.5)*1.6); // a hunched silhouette
        vec3 blood=vec3(0.55,0.05,0.07); vec3 base=mix(vec3(0.04,0.03,0.03), blood, s*0.5);
        vec3 c=base*(0.4+0.6*n) - fig*base*0.9; c+=blood*scan*0.06; c+=blood*0.3*smoothstep(0.7,1.0,h(p+t*0.1));
        gl_FragColor=vec4(c,1.0);} `,
  });
  const place = (x, z, ry, seed, i) => {
    const grp = new THREE.Group(); grp.position.set(x, 2.1, z); grp.rotation.y = ry; g.add(grp);
    const fr = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.14), frameMat); fr.position.z = -0.04; grp.add(fr);
    const m = sceneMat(seed); const art = new THREE.Mesh(new THREE.PlaneGeometry(2.1, 1.5), m); art.position.z = 0.05; art.userData.frameIndex = i; grp.add(art);
    frames.push({ mat: m, mesh: art, line: LINES[i] });
    const gl = new THREE.PointLight(0xc81e2a, 0.8, 6, 2); gl.position.set(0, 0, 1.2); grp.add(gl);
    updaters.push((dt, t) => { m.uniforms.t.value = t; });
  };
  place(-RX + 0.2, -6, Math.PI / 2, 0.2, 0);
  place(RX - 0.2, -3, -Math.PI / 2, 0.8, 1);
  place(RX - 0.2, -11, -Math.PI / 2, 0.5, 2);
  return g;
}

// ---------- the crawlspace: a low opening + 5 hidden tapes ----------
const tapes = [];
let reward = null;
function buildCrawlspace() {
  const g = new THREE.Group(); scene.add(g);
  // dark low opening in the back wall
  const mouth = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.6, 0.6), new THREE.MeshBasicMaterial({ color: 0x000000 })); mouth.position.set(0, 0.8, RZ1 + 0.2); g.add(mouth);
  // jagged plank frame around it
  const plank = std({ color: 0x2a1c12, roughness: 0.95 });
  for (const [bx, by, bw, bh] of [[-1.9, 0.8, 0.4, 1.9], [1.9, 0.8, 0.4, 1.9], [0, 1.75, 4.2, 0.4]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.3), plank); b.position.set(bx, by, RZ1 + 0.45); g.add(b); }
  // a couple pried-off boards leaning
  for (const [bx, br] of [[-1.2, 0.4], [1.4, -0.5]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.2, 0.1), plank); b.position.set(bx, 1.1, RZ1 + 0.7); b.rotation.z = br; g.add(b); }
  const warn = textPlane('DO NOT ENTER', '#c81e2a', 512, 48); warn.position.set(0, 2.2, RZ1 + 0.5); warn.scale.set(3.2, 0.34, 1); g.add(warn);

  // 5 hidden cassette tapes deeper in the dark (z from -13 to -17)
  const tapeSpots = [[-3.5, -13, 0.5], [3, -14, 0.9], [-1, -16, 0.4], [5.5, -12.5, 0.6], [-6, -15.5, 0.7]];
  tapeSpots.forEach(([tx, tz, ty], i) => {
    const grp = new THREE.Group(); grp.position.set(tx, ty, tz); grp.rotation.y = Math.random() * 6;
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.08), std({ color: 0x14100e, emissive: C(0x6aff8a), emissiveIntensity: 0.5, roughness: 0.5 }));
    grp.add(body);
    for (const rx of [-0.11, 0.11]) { const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.1, 12), std({ color: 0x0a0a0a })); reel.rotation.x = Math.PI / 2; reel.position.set(rx, 0.02, 0.05); grp.add(reel); }
    const lab = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.14), new THREE.MeshBasicMaterial({ color: 0x6aff8a, transparent: true, opacity: 0.85 })); lab.position.set(0, 0.06, 0.041); grp.add(lab);
    const gl = new THREE.PointLight(0x6aff8a, 0, 4, 2); grp.add(gl);
    body.userData.tape = i; g.add(grp);
    tapes.push({ grp, body, gl, ty, phase: Math.random() * 6, found: false });
  });
  updaters.push((dt, t) => {
    const inside = controls.pos.z < -10;
    tapes.forEach((tp) => {
      if (tp.found) return;
      tp.grp.rotation.y += dt * 0.8; tp.grp.position.y = tp.ty + Math.sin(t * 1.5 + tp.phase) * 0.12;
      const vis = inside ? 1 : 0.15; tp.body.material.emissiveIntensity += (vis * (0.8 + Math.sin(t * 4 + tp.phase) * 0.3) - tp.body.material.emissiveIntensity) * Math.min(1, dt * 3);
      tp.gl.intensity += ((inside ? 1.6 : 0) - tp.gl.intensity) * Math.min(1, dt * 3);
    });
    if (reward) { reward.rotation.y += dt * 0.6; reward.position.y = 1.4 + Math.sin(t * 1.2) * 0.15; }
  });
  return g;
}

let found = 0;
function collectTape(i) {
  const tp = tapes[i]; if (!tp || tp.found) return;
  tp.found = true; tp.grp.visible = false; found++;
  playCollect();
  const el = document.getElementById('tapes'); if (el) el.innerHTML = `tapes found: <b>${found}</b> / 5`;
  toast(`✦ tape ${found}/5 recovered`);
  if (found >= 5) unlockTrack();
}
function unlockTrack() {
  toast('☠ HIDDEN TRACK UNLOCKED — "BODIES IN THE CRAWLSPACE"');
  if (track) { track.volume = 0.5; track.play().catch(() => {}); }
  // a glowing reward reel floats up at the crawlspace mouth
  reward = new THREE.Group(); reward.position.set(0, 1.4, RZ1 + 2);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.06, 32), std({ color: 0x0a0a0a, emissive: C(0x6aff8a), emissiveIntensity: 0.4 })); disc.rotation.x = Math.PI / 2; reward.add(disc);
  const lab = new THREE.Mesh(new THREE.CircleGeometry(0.2, 24), new THREE.MeshBasicMaterial({ color: 0xc81e2a })); lab.position.z = 0.04; reward.add(lab);
  const gl = new THREE.PointLight(0x6aff8a, 4, 12, 2); reward.add(gl);
  const cap = textPlane('UNRELEASED', '#6aff8a', 512, 48); cap.position.set(0, 0.8, 0); cap.scale.set(2.4, 0.3, 1); reward.add(cap);
  scene.add(reward);
}

// ================= Web Audio: drips, whispers, collect =================
let actx = null, master = null;
function ensureAudio() {
  if (!actx) { actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0.32; master.connect(actx.destination);
    // low whisper/room drone
    const wsrc = actx.createBufferSource(); const n = actx.sampleRate * 2; const buf = actx.createBuffer(1, n, actx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; wsrc.buffer = buf; wsrc.loop = true;
    const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 320; bp.Q.value = 0.7; const wg = actx.createGain(); wg.gain.value = 0.06; wsrc.connect(bp); bp.connect(wg); wg.connect(master); wsrc.start();
    const lfo = actx.createOscillator(); const lg = actx.createGain(); lfo.frequency.value = 0.15; lg.gain.value = 0.04; lfo.connect(lg); lg.connect(wg.gain); lfo.start();
  }
  if (actx.state === 'suspended') actx.resume();
}
function playDrip() {
  if (!actx) return; const t = actx.currentTime; const o = actx.createOscillator(); const g = actx.createGain();
  o.frequency.setValueAtTime(900 + Math.random() * 300, t); o.frequency.exponentialRampToValueAtTime(180, t + 0.12);
  g.gain.setValueAtTime(0.25, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.2); o.connect(g); g.connect(master); o.start(t); o.stop(t + 0.22);
}
function playWhisper() {
  ensureAudio(); const t = actx.currentTime; const n = actx.sampleRate * 1.2; const buf = actx.createBuffer(1, n, actx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = actx.createBufferSource(); src.buffer = buf; const bp = actx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1400; bp.Q.value = 2;
  const lfo = actx.createOscillator(); const lg = actx.createGain(); lfo.frequency.value = 6; lg.gain.value = 700; lfo.connect(lg); lg.connect(bp.frequency); lfo.start(t); lfo.stop(t + 1.2);
  const g = actx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.4, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
  src.connect(bp); bp.connect(g); g.connect(master); src.start(t); src.stop(t + 1.2);
}
function playCollect() {
  ensureAudio(); const t = actx.currentTime;
  [523, 659, 784].forEach((f, i) => { const o = actx.createOscillator(); const g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t + i * 0.06); g.gain.linearRampToValueAtTime(0.3, t + i * 0.06 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.06 + 0.4); o.connect(g); g.connect(master); o.start(t + i * 0.06); o.stop(t + i * 0.06 + 0.42); });
}

// build
const _pipes = buildPipes();
const _frames = buildFrames();
const _crawl = buildCrawlspace();
updaters.push(addMotes(scene, { color: 0x4a3a30, count: 150, area: [24, 4, 26], center: [0, 2, -6], rise: 0.15, opacity: 0.35 }));
updaters.push(addHaze(scene, { color: 0x2a1a14, count: 8, center: [0, 1.5, -8], area: [22, 4, 24], scale: 9, opacity: 0.06 }));

// ---------- controls ----------
const track = document.getElementById('track');
const controls = new WalkControls(camera, { bounds: RX - 1, eye: 1.6, zMin: RZ1 + 1.5 });
controls.pos.set(0, 1.6, 7); controls.yaw = 0;

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'horrorcore', overhead: { ax: 16, az: 16, cz: -5 },
  items: [
    { id: 'pipes', label: 'Pipes + drips', obj: _pipes },
    { id: 'frames', label: 'Framed scenes', obj: _frames },
    { id: 'crawl', label: 'Crawlspace + tapes', obj: _crawl },
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

const tapeMeshes = () => tapes.filter((t) => !t.found).map((t) => t.body);
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  const th = ray.intersectObjects(tapeMeshes(), false)[0];
  if (th && th.object.userData.tape != null) { collectTape(th.object.userData.tape); return; }
  const fh = ray.intersectObjects(frames.map((f) => f.mesh), false)[0];
  if (fh && fh.object.userData.frameIndex != null) { const f = frames[fh.object.userData.frameIndex]; playWhisper(); showSub(f.line); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -RX + 1, RX - 1); g.z = THREE.MathUtils.clamp(g.z, RZ1 + 1.5, RZ0 - 1); controls.walkTo(g); }
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---------- subtitle + toast ----------
const subEl = document.getElementById('sub'); let subT = 0;
function showSub(txt) { if (!subEl) return; subEl.textContent = '“' + txt + '”'; subEl.classList.add('show'); subT = 3.2; }
const toastEl = document.getElementById('toast'); let toastT = 0;
function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); toastT = 2.6; }

// ---------- zones + hint ----------
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function updateZone(p) {
  const z = p.z < -10 ? 'THE CRAWLSPACE' : (p.z < -1 ? 'THE GALLERY OF ROT' : 'THE BASEMENT');
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1700); } }
  if (hintEl) hintEl.classList.toggle('show', p.z < -9 && found < 5);
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
  controls.update(dt);
  admin.update(dt);
  for (const u of updaters) u(dt, t, 0);
  updateZone(controls.pos);
  if (subT > 0) { subT -= dt; if (subT <= 0 && subEl) subEl.classList.remove('show'); }
  if (toastT > 0) { toastT -= dt; if (toastT <= 0 && toastEl) toastEl.classList.remove('show'); }
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

if (import.meta.env.DEV) window.__hc = { controls, scene, tapes, collectTape };

if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
