import * as THREE from 'three';
import { WalkControls } from './player/controls.js';

// PERSONALIZED ROOM BUILDER — the endgame reward. You're inside YOUR room; a live
// panel swaps the theme, lighting, wall art, decor, the sky out the window, and
// the ambient sound. Every change updates the scene and saves to localStorage,
// so the room returns exactly how you left it. (procedural + Web Audio)

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0a0a16, 0.02);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 120);
const updaters = [];

// ---------- options ----------
const THEMES = [
  { name: 'Vaporwave', wall: 0x2a1e4a, floor: 0x362a56, accent: 0xff2bd0 },
  { name: 'Cozy', wall: 0x4a3a2e, floor: 0x5a4436, accent: 0xffb060 },
  { name: 'Neon', wall: 0x101622, floor: 0x161620, accent: 0x39ff14 },
  { name: 'Mono', wall: 0x2c2c34, floor: 0x3a3a44, accent: 0xe6e6f0 },
  { name: 'Forest', wall: 0x1e3a2c, floor: 0x2a3a30, accent: 0x7affc0 },
  { name: 'Sunset', wall: 0x4a2a3a, floor: 0x5a3040, accent: 0xff7b2a },
];
const LIGHTS = [
  { name: 'Warm', key: 0xffd6a0, fill: 0xff9a6a, amb: 0x2a1e14, i: 1.0 },
  { name: 'Cool', key: 0xbfd0ff, fill: 0x6a8aff, amb: 0x141a2a, i: 1.0 },
  { name: 'Neon', key: 0xff2bd0, fill: 0x00f3ff, amb: 0x1a0a2a, i: 0.95 },
  { name: 'Candle', key: 0xffb060, fill: 0xff7040, amb: 0x1a1008, i: 0.72 },
  { name: 'Studio', key: 0xffffff, fill: 0xcfd6ff, amb: 0x2a2a34, i: 1.25 },
];
const ART = ['Swirl', 'Grid', 'Plasma', 'Rings', 'Stripes'];
const SKY = ['Day', 'Sunset', 'Night', 'Galaxy'];
const SOUND = ['off', 'lo-fi', 'rain'];

// ---------- persisted state ----------
const KEY = 'roomBuilder.v1';
const DEFAULT = { theme: 0, light: 0, art: 0, sky: 1, decor: { plants: true, lights: true, posters: true, rug: true }, sound: 'off' };
let state = DEFAULT;
try { const s = localStorage.getItem(KEY); if (s) state = Object.assign({}, DEFAULT, JSON.parse(s), { decor: Object.assign({}, DEFAULT.decor, (JSON.parse(s) || {}).decor) }); } catch (e) {}
function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} const el = document.getElementById('saved'); if (el) { el.classList.add('show'); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove('show'), 1200); } }

// ---------- materials we mutate ----------
const wallMat = std({ color: 0x2a1e4a, roughness: 0.95 });
const floorMat = std({ color: 0x362a56, roughness: 0.9, metalness: 0.1 });
const ceilMat = std({ color: 0x14141f, roughness: 1 });
const accentMats = [];    // MeshStandard whose color/emissive follows the accent
const accentLights = [];   // point lights tinted to the accent

// ---------- room shell + window ----------
const RX = 7, RZ0 = 7, RZ1 = -7, H = 4;
function buildShell() {
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ0 - RZ1), floorMat); floor.rotation.x = -Math.PI / 2; floor.position.z = (RZ0 + RZ1) / 2; floor.receiveShadow = true; scene.add(floor);
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RX * 2, RZ0 - RZ1), ceilMat); ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, (RZ0 + RZ1) / 2); scene.add(ceil);
  // left / right / front walls
  const mkWall = (w, ry, x, z) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, H), wallMat); m.rotation.y = ry; m.position.set(x, H / 2, z); scene.add(m); };
  mkWall(RZ0 - RZ1, Math.PI / 2, -RX, (RZ0 + RZ1) / 2);
  mkWall(RZ0 - RZ1, -Math.PI / 2, RX, (RZ0 + RZ1) / 2);
  mkWall(RX * 2, Math.PI, 0, RZ0);
  // back wall built AROUND a window opening
  const wp = [[-(RX + 3.2) / 1, 0], [0, 0]]; // not used; build segments explicitly
  const seg = (w, h, x, y) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat); m.position.set(x, y, RZ1); scene.add(m); };
  seg(RX * 2, 1.0, 0, 0.5);            // below window
  seg(RX * 2, 1.0, 0, H - 0.5);        // above window
  seg(4.2, 2.0, -RX + 2.1, 2.0);       // left of window
  seg(4.2, 2.0, RX - 2.1, 2.0);        // right of window
  // window frame (accent) + sky quad behind it
  const frameMat = std({ color: 0x000000, emissive: C(0xffffff), emissiveIntensity: 0.3, roughness: 0.4 }); accentMats.push(frameMat);
  for (const [fw, fh, fx, fy] of [[4.4, 0.2, 0, 3.1], [4.4, 0.2, 0, 0.9], [0.2, 2.2, -2.1, 2], [0.2, 2.2, 2.1, 2], [0.14, 2.2, 0, 2], [4.4, 0.14, 0, 2]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(fw, fh, 0.2), frameMat); b.position.set(fx, fy, RZ1 - 0.02); scene.add(b); }
  const skyQuad = new THREE.Mesh(new THREE.PlaneGeometry(4.0, 2.0), skyMat); skyQuad.position.set(0, 2, RZ1 - 0.2); scene.add(skyQuad);
  const skyGlow = new THREE.PointLight(0x8090ff, 1.4, 14, 2); skyGlow.position.set(0, 2, RZ1 + 1.5); scene.add(skyGlow); accentLights.push(skyGlow);
}

// ---------- window sky shader (modes: day/sunset/night/galaxy) ----------
const skyMat = new THREE.ShaderMaterial({
  uniforms: { t: { value: 0 }, mode: { value: 1 } },
  vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `varying vec2 v; uniform float t; uniform int mode;
    float h(vec2 p){ return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5); }
    void main(){ vec3 c;
      if(mode==0){ c=mix(vec3(0.5,0.75,1.0), vec3(0.85,0.95,1.0), v.y); c+=smoothstep(0.85,1.0,h(floor(v*20.0)))*0.0; float sun=smoothstep(0.2,0.0,length(v-vec2(0.7,0.75))); c+=sun*vec3(1.0,0.95,0.7); }
      else if(mode==1){ c=mix(vec3(0.95,0.5,0.3), vec3(0.3,0.25,0.55), v.y); float sun=smoothstep(0.18,0.0,length(v-vec2(0.5,0.35))); c+=sun*vec3(1.0,0.7,0.3); }
      else if(mode==2){ c=mix(vec3(0.03,0.04,0.12), vec3(0.08,0.09,0.2), v.y); float st=step(0.985,h(floor(v*90.0))); c+=st*vec3(1.0); float m=smoothstep(0.06,0.0,length(v-vec2(0.72,0.78))); c+=m*vec3(0.9,0.9,1.0); }
      else { vec2 p=(v-0.5)*2.0; float r=length(p); float a=atan(p.y,p.x); float arm=sin(a*2.0+r*8.0-t*0.4)*0.5+0.5; float core=smoothstep(0.5,0.0,r); float d=arm*smoothstep(1.0,0.1,r); c=vec3(0.04,0.05,0.14)+ (core*1.2+d*0.8)*mix(vec3(0.6,0.7,1.0),vec3(1.0,0.8,0.7),core)+vec3(0.5,0.3,0.8)*d; float st=step(0.99,h(floor(v*80.0))); c+=st; }
      gl_FragColor=vec4(c,1.0);} `,
});
updaters.push((dt, t) => { skyMat.uniforms.t.value = t; });

// ---------- wall art (styles) in an accent frame ----------
const artMat = new THREE.ShaderMaterial({
  uniforms: { t: { value: 0 }, style: { value: 0 }, acc: { value: new THREE.Color(0xff2bd0) } },
  vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
  fragmentShader: `varying vec2 v; uniform float t; uniform int style; uniform vec3 acc;
    void main(){ vec2 p=(v-0.5)*3.0; float a=atan(p.y,p.x); float r=length(p); vec3 c;
      if(style==0){ float s=sin(a*5.0+t-r*8.0); c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*2.0+t*0.4+r*3.0); c*=0.55+0.45*s; }
      else if(style==1){ vec2 g=abs(fract(v*8.0+vec2(0.0,t*0.1))-0.5); float line=smoothstep(0.46,0.5,max(g.x,g.y)); c=mix(vec3(0.05),acc,line); }
      else if(style==2){ float w=sin(p.x*3.0+t)+cos(p.y*3.0-t*1.1)+sin(length(p)*4.0-t*1.4); c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+w*1.3); }
      else if(style==3){ float ring=sin(r*10.0-t*2.0)*0.5+0.5; c=mix(vec3(0.04), acc, ring)*(0.6+0.4*ring); }
      else { float s=step(0.5,fract((v.x+v.y)*6.0-t*0.3)); c=mix(vec3(0.06), acc, s); }
      gl_FragColor=vec4(c,1.0);} `,
});
updaters.push((dt, t) => { artMat.uniforms.t.value = t; });
function buildArt() {
  const g = new THREE.Group(); g.position.set(RX - 0.1, 2.3, 1); g.rotation.y = -Math.PI / 2; scene.add(g);
  const frameMat = std({ color: 0x0a0a12, emissive: C(0xffffff), emissiveIntensity: 0.4, roughness: 0.4 }); accentMats.push(frameMat);
  const fr = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 0.12), frameMat); fr.position.z = -0.04; g.add(fr);
  const art = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.8), artMat); art.position.z = 0.04; g.add(art);
  const gl = new THREE.PointLight(0xffffff, 1.6, 8, 2); gl.position.set(0, 0, 1.4); g.add(gl); accentLights.push(gl);
  return g;
}

// ---------- furniture + decor ----------
let decorPlants, decorLights, decorPosters, decorRug;
function buildFurniture() {
  const g = new THREE.Group(); scene.add(g);
  const wood = std({ color: 0x3a2a1e, roughness: 0.85 });
  const soft = std({ color: 0x2e3350, roughness: 0.95 });
  // low bed / daybed against the left wall
  const bed = new THREE.Group(); bed.position.set(-RX + 1.6, 0, -3.5); g.add(bed);
  bed.add(mesh(new THREE.BoxGeometry(2.6, 0.5, 4.2), wood, 0, 0.28, 0));
  bed.add(mesh(new THREE.BoxGeometry(2.5, 0.3, 4.0), soft, 0, 0.6, 0));
  bed.add(mesh(new THREE.BoxGeometry(2.4, 0.4, 0.7), std({ color: 0x4a5580, roughness: 0.95 }), 0, 0.78, -1.6));
  const throwMat = std({ color: 0xff2bd0, roughness: 0.9, emissive: C(0xff2bd0), emissiveIntensity: 0.15 }); accentMats.push(throwMat);
  bed.add(mesh(new THREE.BoxGeometry(2.5, 0.12, 1.6), throwMat, 0, 0.86, 0.9));
  // desk + chair + monitor against the front wall
  const desk = new THREE.Group(); desk.position.set(2.5, 0, RZ0 - 1.2); g.add(desk);
  desk.add(mesh(new THREE.BoxGeometry(2.6, 0.12, 1.1), wood, 0, 1.0, 0));
  for (const lx of [-1.1, 1.1]) desk.add(mesh(new THREE.BoxGeometry(0.12, 1.0, 1.0), wood, lx, 0.5, 0));
  const monMat = std({ color: 0x05060a, emissive: C(0xffffff), emissiveIntensity: 0.5 }); accentMats.push(monMat);
  desk.add(mesh(new THREE.BoxGeometry(1.3, 0.8, 0.06), monMat, 0, 1.55, -0.3));
  desk.add(mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), soft, 0, 0.35, 1.0)); // stool
  // shelf on the right-back
  const shelf = new THREE.Group(); shelf.position.set(-RX + 0.5, 0, 2.5); shelf.rotation.y = Math.PI / 2; g.add(shelf);
  shelf.add(mesh(new THREE.BoxGeometry(2.6, 2.6, 0.4), wood, 0, 1.6, 0));
  for (let r = 0; r < 3; r++) { shelf.add(mesh(new THREE.BoxGeometry(2.4, 0.08, 0.36), std({ color: 0x241a12 }), 0, 0.7 + r * 0.8, 0.03));
    for (let b = 0; b < 6; b++) shelf.add(mesh(new THREE.BoxGeometry(0.12, 0.5, 0.3), std({ color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5) }), -1 + b * 0.22, 1.0 + r * 0.8, 0.06)); }
  // floor lamp (accent)
  const lamp = new THREE.Group(); lamp.position.set(RX - 1.2, 0, -4); g.add(lamp);
  lamp.add(mesh(new THREE.CylinderGeometry(0.05, 0.06, 2.2, 8), std({ color: 0x1a1a22 }), 0, 1.1, 0));
  const shadeMat = std({ color: 0xffffff, emissive: C(0xffb060), emissiveIntensity: 0.9, roughness: 0.7, side: THREE.DoubleSide }); accentMats.push(shadeMat);
  lamp.add(mesh(new THREE.ConeGeometry(0.5, 0.6, 16, 1, true), shadeMat, 0, 2.4, 0));
  const lampL = new THREE.PointLight(0xffd090, 3, 10, 2); lampL.position.set(RX - 1.2, 2.3, -4); g.add(lampL); accentLights.push(lampL);
  // rug (decor)
  decorRug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40), std({ color: 0x40406a, roughness: 1, emissive: C(0x20204a), emissiveIntensity: 0.2 })); decorRug.rotation.x = -Math.PI / 2; decorRug.position.set(0.5, 0.02, 0); g.add(decorRug);
  // plants (decor)
  decorPlants = new THREE.Group(); g.add(decorPlants);
  for (const [px, pz] of [[RX - 1, RZ0 - 1], [-RX + 1, RZ0 - 1]]) { const pot = mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.6, 10), std({ color: 0xc86a4a }), px, 0.3, pz); decorPlants.add(pot); for (let k = 0; k < 6; k++) { const a = (k / 6) * 6.28; decorPlants.add(mesh(new THREE.ConeGeometry(0.13, 1.1, 5), std({ color: 0x3a8a5a, roughness: 0.8 }), px + Math.cos(a) * 0.2, 1.0, pz + Math.sin(a) * 0.2)); } }
  // string lights (decor)
  decorLights = new THREE.Group(); g.add(decorLights); const bulbs = [];
  for (let i = 0; i < 22; i++) { const t = i / 21; const b = mesh(new THREE.SphereGeometry(0.07, 8, 8), null, -RX + 0.4 + t * (RX * 2 - 0.8), H - 0.3 - Math.sin(t * Math.PI * 3) * 0.3, RZ1 + 0.4); b.material = new THREE.MeshBasicMaterial({ color: 0xffd88a }); decorLights.add(b); bulbs.push(b); }
  updaters.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHSL(0.11, 0.6, 0.55 + Math.sin(t * 1.5 + i * 0.3) * 0.15)));
  // posters (decor) on the left wall
  decorPosters = new THREE.Group(); g.add(decorPosters);
  for (const [pz, hue] of [[-1, 0.8], [1.4, 0.4]]) { const pm = std({ color: new THREE.Color().setHSL(hue, 0.6, 0.5), roughness: 0.9, emissive: new THREE.Color().setHSL(hue, 0.6, 0.3), emissiveIntensity: 0.3 }); const p = mesh(new THREE.PlaneGeometry(1.2, 1.6), pm, -RX + 0.06, 2.4, pz); p.rotation.y = Math.PI / 2; decorPosters.add(p); }
  return g;
}
function mesh(geo, mat, x, y, z) { const m = new THREE.Mesh(geo, mat || std({ color: 0x888888 })); m.position.set(x, y, z); m.castShadow = true; return m; }

// ---------- lights ----------
const key = new THREE.DirectionalLight(0xffffff, 1.0); key.position.set(4, 8, 6); scene.add(key);
const fill = new THREE.DirectionalLight(0xffffff, 0.5); fill.position.set(-6, 4, -4); scene.add(fill);
const amb = new THREE.AmbientLight(0x222233, 1.0); scene.add(amb);
const hemi = new THREE.HemisphereLight(0x8890b0, 0x101018, 0.6); scene.add(hemi);

// ---------- Web Audio ambience ----------
let actx = null, master = null, soundNodes = null;
function ensureAudio() { if (!actx) { actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0.3; master.connect(actx.destination); } if (actx.state === 'suspended') actx.resume(); }
let beatTimer = 0, beatStep = 0;
function setSound(kind) {
  ensureAudio();
  if (soundNodes) { try { soundNodes.stop(); } catch (e) {} soundNodes = null; }
  if (kind === 'rain') { const s = actx.createBufferSource(); const n = actx.sampleRate * 2; const buf = actx.createBuffer(1, n, actx.sampleRate); const d = buf.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; s.buffer = buf; s.loop = true; const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1200; const g = actx.createGain(); g.gain.value = 0.18; s.connect(hp); hp.connect(g); g.connect(master); s.start(); soundNodes = { stop: () => { s.stop(); } }; }
  else if (kind === 'lo-fi') { const g = actx.createGain(); g.gain.value = 0.18; g.connect(master); const oscs = []; [220, 277.2, 329.6].forEach((f) => { const o = actx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; const og = actx.createGain(); og.gain.value = 0.2; o.connect(lp); lp.connect(og); og.connect(g); o.start(); oscs.push(o); }); soundNodes = { stop: () => oscs.forEach((o) => o.stop()), beat: true }; }
}

// ---------- apply state ----------
let running = false;
function apply() {
  const th = THEMES[state.theme], li = LIGHTS[state.light], acc = C(th.accent);
  wallMat.color.copy(C(th.wall)); floorMat.color.copy(C(th.floor)); ceilMat.color.copy(C(th.wall).multiplyScalar(0.5));
  accentMats.forEach((m) => { if (m.emissive) m.emissive.copy(acc); if (m.color && m !== wallMat && m !== floorMat) { /* keep frame bodies dark, emissive drives colour */ } });
  artMat.uniforms.acc.value.copy(acc); artMat.uniforms.style.value = state.art;
  skyMat.uniforms.mode.value = state.sky;
  key.color.copy(C(li.key)); key.intensity = li.i; fill.color.copy(C(li.fill)); fill.intensity = li.i * 0.5; amb.color.copy(C(li.amb)); hemi.color.copy(C(li.key)).multiplyScalar(0.6);
  accentLights.forEach((l) => l.color.copy(acc));
  if (decorPlants) decorPlants.visible = state.decor.plants;
  if (decorLights) decorLights.visible = state.decor.lights;
  if (decorPosters) decorPosters.visible = state.decor.posters;
  if (decorRug) decorRug.visible = state.decor.rug;
  if (running && actx) setSound(state.sound);
}

// ---------- build panel ----------
function buildPanel() {
  const rows = document.getElementById('rows'); if (!rows) return;
  const chipRow = (label, opts, getSel, onPick, swatches) => {
    const row = document.createElement('div'); row.className = 'row';
    const lab = document.createElement('div'); lab.className = 'lab'; lab.textContent = label; row.appendChild(lab);
    const chips = document.createElement('div'); chips.className = 'chips';
    opts.forEach((o, i) => { const b = document.createElement('div'); b.className = 'chip' + (swatches ? ' sw' : '') + (getSel() === i ? ' on' : '');
      if (swatches) b.style.background = '#' + C(o.accent).getHexString(); else b.textContent = o;
      b.title = swatches ? o.name : o;
      b.onclick = () => { onPick(i); [...chips.children].forEach((c, j) => c.classList.toggle('on', j === i)); apply(); save(); }; chips.appendChild(b); });
    row.appendChild(chips); rows.appendChild(row);
  };
  chipRow('THEME', THEMES, () => state.theme, (i) => state.theme = i, true);
  chipRow('LIGHT', LIGHTS.map((l) => l.name), () => state.light, (i) => state.light = i);
  chipRow('WALL ART', ART, () => state.art, (i) => state.art = i);
  chipRow('WINDOW', SKY, () => state.sky, (i) => state.sky = i);
  chipRow('SOUND', SOUND, () => SOUND.indexOf(state.sound), (i) => state.sound = SOUND[i]);
  // decor toggles
  const row = document.createElement('div'); row.className = 'row';
  const lab = document.createElement('div'); lab.className = 'lab'; lab.textContent = 'DECOR'; row.appendChild(lab);
  const chips = document.createElement('div'); chips.className = 'chips';
  [['plants', 'Plants'], ['lights', 'String lights'], ['posters', 'Posters'], ['rug', 'Rug']].forEach(([k, name]) => {
    const b = document.createElement('div'); b.className = 'chip' + (state.decor[k] ? ' on' : ''); b.textContent = name;
    b.onclick = () => { state.decor[k] = !state.decor[k]; b.classList.toggle('on', state.decor[k]); apply(); save(); }; chips.appendChild(b);
  });
  row.appendChild(chips); rows.appendChild(row);
  // collapse toggle
  const tog = document.getElementById('tog'); if (tog) tog.onclick = () => { rows.classList.toggle('min'); tog.textContent = rows.classList.contains('min') ? 'show' : 'hide'; };
}

// build everything
buildShell(); const _art = buildArt(); const _furn = buildFurniture(); buildPanel(); apply();

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: RX - 0.6, eye: 1.6, zMin: RZ1 + 0.6 });
controls.pos.set(0, 1.6, 4.5); controls.yaw = Math.PI;

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => { if (!down || e.pointerId !== down.id) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true; controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2); down.x = e.clientX; down.y = e.clientY; });
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) { ndc.x = (e.clientX / innerWidth) * 2 - 1; ndc.y = -(e.clientY / innerHeight) * 2 + 1; ray.setFromCamera(ndc, camera); const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3()); if (g) { g.x = THREE.MathUtils.clamp(g.x, -RX + 0.6, RX - 0.6); g.z = THREE.MathUtils.clamp(g.z, RZ1 + 0.6, RZ0 - 0.6); controls.walkTo(g); } } down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

document.getElementById('backBtn').onclick = () => { const w = document.getElementById('warp'); if (w) w.classList.add('go'); setTimeout(() => { window.location.href = 'warehouse.html'; }, 470); };

// loop
const clock = new THREE.Clock();
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime;
  controls.update(dt);
  for (const u of updaters) u(dt, t, 0);
  // lo-fi beat scheduler
  if (soundNodes && soundNodes.beat && actx) { beatTimer -= dt; if (beatTimer <= 0) { const now = actx.currentTime; const s = beatStep % 8; if (s === 0 || s === 3 || s === 6) { const o = actx.createOscillator(); const g = actx.createGain(); o.frequency.setValueAtTime(140, now); o.frequency.exponentialRampToValueAtTime(45, now + 0.12); g.gain.setValueAtTime(0.5, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.18); o.connect(g); g.connect(master); o.start(now); o.stop(now + 0.2); } beatStep++; beatTimer = 0.26; } }
  renderer.render(scene, camera);
}
controls.update(0); renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => { document.getElementById('start').classList.add('gone'); ensureAudio(); if (state.sound !== 'off') setSound(state.sound); if (!running) { running = true; clock.start(); frame(); } };
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__rb = { controls, scene, state, apply };
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) window.__world = { THREE, scene, camera, renderer };
