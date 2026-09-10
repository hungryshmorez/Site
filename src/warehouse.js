import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
import { createAdmin } from './scene/admin.js';
const ambience = createAmbience(AMBIENCE.studio);

// THE 12MATT3R IMMERSIVE EXPERIENCE COMPLEX — a rusty neon WAREHOUSE on a foggy
// street. Walk up: the door slides open with a creak. Inside, a projection-lined
// ENTRANCE HALL welcomes you and glowing floor arrows lead you in. Beyond it, the
// CENTRAL HUB — a checkerboard gallery of floating golden frames around a
// levitating "heart" orb, whose portal-sigils radiate out to every themed room.

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.18;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x080a14, 0.028);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 260);

const updaters = [];

// ---------- night street sky + sparse stars ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(160, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x05060f) }, mid: { value: C(0x141636) }, bot: { value: C(0x0a0a16) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot;
      void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.5)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
  const sp = []; for (let i = 0; i < 260; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(150); if (v.y > 8) sp.push(v.x, v.y, v.z); }
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3));
  scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xaab0e0, size: 0.5, transparent: true, opacity: 0.7 })));
}
scene.add(new THREE.HemisphereLight(0x3a3e6a, 0x05060e, 0.85));
const moon = new THREE.DirectionalLight(0x8890c0, 0.35); moon.position.set(-12, 20, 22); scene.add(moon);

// ---------- ground: wet asphalt outside, poured-concrete inside ----------
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d');
  x.fillStyle = '#0c0d15'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 120; i++) { x.fillStyle = `rgba(${20 + Math.random() * 26 | 0},${22 + Math.random() * 26 | 0},${34 + Math.random() * 30 | 0},0.5)`; const s = 6 + Math.random() * 30; x.fillRect(Math.random() * 256, Math.random() * 256, s, s * 0.8); }
  for (let i = 0; i < 40; i++) { x.strokeStyle = 'rgba(0,0,0,0.4)'; x.beginPath(); x.moveTo(Math.random() * 256, Math.random() * 256); x.lineTo(Math.random() * 256, Math.random() * 256); x.stroke(); } // cracks
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(30, 30); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), std({ map: tex, roughness: 0.7, metalness: 0.2, emissive: C(0x0a0c18), emissiveIntensity: 0.2 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
}

// ---------- HUB checkerboard floor (inside, z < 8) ----------
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d');
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#0a0a12' : '#e7e8f2'; x.fillRect(i * 64, j * 64, 64, 64); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(26, 20); tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.NearestFilter;
  const hubFloor = new THREE.Mesh(new THREE.PlaneGeometry(52, 40), std({ map: tex, roughness: 0.35, metalness: 0.25, emissive: C(0x1a1c30), emissiveIntensity: 0.14 }));
  hubFloor.rotation.x = -Math.PI / 2; hubFloor.position.set(0, 0.015, -10); scene.add(hubFloor);
}

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.46)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 18; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- EXTERIOR: rusty warehouse facade + neon + streetlights + door ----------
let doorL, doorR, openTarget = 0;
function buildExterior() {
  const g = new THREE.Group(); scene.add(g);
  // rusty corrugated metal facade texture
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 256; const x = cv.getContext('2d');
  x.fillStyle = '#3a2a20'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 256; i += 8) { x.fillStyle = i % 16 ? 'rgba(0,0,0,0.18)' : 'rgba(120,90,60,0.12)'; x.fillRect(i, 0, 4, 256); } // corrugation
  for (let i = 0; i < 60; i++) { x.fillStyle = `rgba(${90 + Math.random() * 60 | 0},${40 + Math.random() * 30 | 0},20,0.35)`; x.beginPath(); x.arc(Math.random() * 256, Math.random() * 256, 6 + Math.random() * 22, 0, 7); x.fill(); } // rust blooms
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(6, 2); tex.colorSpace = THREE.SRGBColorSpace;
  const metal = std({ map: tex, roughness: 0.85, metalness: 0.5, emissive: C(0x241811), emissiveIntensity: 0.3 });
  // facade wall (z = 20) with a door gap x in [-3.2, 3.2]
  const FZ = 20, WH = 13;
  const seg = (w, h, cx, cy) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.8), metal); m.position.set(cx, cy, FZ); m.castShadow = true; g.add(m); return m; };
  seg(21.6, WH, -13, WH / 2);       // left of door
  seg(21.6, WH, 13, WH / 2);        // right of door
  seg(6.8, WH - 6.2, 0, 6.2 + (WH - 6.2) / 2); // lintel above door
  // roof parapet
  const para = new THREE.Mesh(new THREE.BoxGeometry(48, 0.9, 2.2), std({ color: 0x241a14, roughness: 0.9 })); para.position.set(0, WH + 0.4, FZ); g.add(para);
  // graffiti tags on the facade
  const tag = textPlane('SO FA KING', '#ff2b8f', 512, 128); tag.position.set(-13, 3.4, FZ + 0.42); tag.scale.set(7, 1.7, 1); tag.rotation.z = 0.04; g.add(tag);
  const tag2 = textPlane('▓ 12m ▓', '#39ff14', 256, 128); tag2.position.set(12, 2.7, FZ + 0.42); tag2.scale.set(4.4, 2.2, 1); tag2.rotation.z = -0.05; g.add(tag2);

  // sliding door panels (two halves that part when you approach)
  const doorMat = std({ color: 0x14131a, roughness: 0.6, metalness: 0.7, emissive: C(0x0a1a22), emissiveIntensity: 0.25 });
  doorL = new THREE.Mesh(new THREE.BoxGeometry(3.4, 6.2, 0.5), doorMat); doorL.position.set(-1.65, 3.1, FZ); g.add(doorL);
  doorR = new THREE.Mesh(new THREE.BoxGeometry(3.4, 6.2, 0.5), doorMat); doorR.position.set(1.65, 3.1, FZ); g.add(doorR);
  for (const d of [doorL, doorR]) { const bar = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 0.08), std({ color: 0x2a2a36, metalness: 0.8 })); bar.position.set(0, 1.4, 0.3); d.add(bar); const bar2 = bar.clone(); bar2.position.y = -1.2; d.add(bar2); }

  // big flickering neon sign "12MATT3R" over the door + erratic "OPEN"
  const neon = textPlane('12MATT3R', '#00f3ff', 512, 96); neon.position.set(0, 8.7, FZ + 0.5); neon.scale.set(13, 2.4, 1); g.add(neon);
  const neonGlow = new THREE.PointLight(0x00f3ff, 7, 22, 2); neonGlow.position.set(0, 8.6, FZ + 2); g.add(neonGlow);
  const openSign = textPlane('OPEN', '#ff0055', 256, 96); openSign.position.set(9.5, 7.4, FZ + 0.5); openSign.scale.set(3.6, 1.35, 1); g.add(openSign);
  const openGlow = new THREE.PointLight(0xff0055, 3, 10, 2); openGlow.position.set(9.5, 7.4, FZ + 1.6); g.add(openGlow);
  // warm wall-wash on the facade + a cool spill from the open doorway
  for (const lx of [-11, 0, 11]) { const wl = new THREE.PointLight(0xffcaa0, 2.4, 22, 2); wl.position.set(lx, 6, FZ + 5); g.add(wl); }
  const doorSpill = new THREE.PointLight(0x6a6cff, 4, 16, 2); doorSpill.position.set(0, 3, FZ - 2); g.add(doorSpill);

  // streetlights casting long shadows over the approach
  const lamps = [];
  for (const lx of [-15, 15]) for (const lz of [30, 40]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 8, 8), std({ color: 0x14161f, metalness: 0.6 })); pole.position.set(lx, 4, lz); g.add(pole);
    const armM = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.14, 2), std({ color: 0x14161f })); armM.position.set(lx + (lx < 0 ? 1 : -1), 7.8, lz); g.add(armM);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 1.1), std({ color: 0x1a1c26, emissive: C(0xffdca0), emissiveIntensity: 1.2 })); head.position.set(lx + (lx < 0 ? 1.9 : -1.9), 7.7, lz); g.add(head);
    const ll = new THREE.PointLight(0xffdca0, 7.5, 34, 2); ll.position.set(head.position.x, 7.4, lz); g.add(ll); lamps.push(ll);
  }

  updaters.push((dt, t) => {
    // erratic neon flicker
    const f = Math.random() < 0.06 ? 0.2 : 1; neon.material.opacity = 0.75 + 0.25 * f; neonGlow.intensity = 4.5 + f * 3 + Math.sin(t * 7) * 0.6;
    const of = (Math.sin(t * 3) > 0.2 && Math.random() > 0.03) ? 1 : 0.15; openSign.material.opacity = of; openGlow.intensity = of * 3;
    lamps.forEach((l, i) => l.intensity = 7 + Math.sin(t * 20 + i * 2) * (Math.random() < 0.04 ? 2.8 : 0.4));
    // slide the doors toward their target (open when the player is close)
    const s = openTarget * 5.0;
    doorL.position.x += ((-1.65 - s) - doorL.position.x) * Math.min(1, dt * 3.2);
    doorR.position.x += ((1.65 + s) - doorR.position.x) * Math.min(1, dt * 3.2);
  });
  return g;
}

// ---------- ENTRANCE HALL: projection walls + light beams + floor arrows ----------
function buildEntranceHall() {
  const g = new THREE.Group(); scene.add(g);
  const HZ0 = 20, HZ1 = 7, HX = 5.4;
  // side walls carrying looping "teaser gallery" projections
  const projMat = () => new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      void main(){ vec2 p=(v-0.5)*4.0; float a=sin(p.x*2.0+t)+cos(p.y*2.5-t*1.3)+sin(length(p)*3.0-t*1.6);
        vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*1.3+t*0.4); float scan=sin((v.y+t*0.25)*80.0)*0.4+0.6;
        gl_FragColor=vec4(c*scan*0.8,1.0);} `,
  });
  const projMats = [];
  for (const sx of [-HX, HX]) {
    const wall = new THREE.Mesh(new THREE.BoxGeometry(0.4, 8, HZ0 - HZ1), std({ color: 0x0a0b12, roughness: 0.9 })); wall.position.set(sx, 4, (HZ0 + HZ1) / 2); g.add(wall);
    for (let i = 0; i < 3; i++) { const m = projMat(); projMats.push(m); const scr = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.1), m); scr.position.set(sx + (sx < 0 ? 0.22 : -0.22), 4.2, HZ1 + 2 + i * 4); scr.rotation.y = sx < 0 ? Math.PI / 2 : -Math.PI / 2; g.add(scr); }
  }
  // low ceiling with slot light-beams
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(HX * 2 + 0.8, 0.4, HZ0 - HZ1), std({ color: 0x080910, roughness: 1 })); ceil.position.set(0, 8, (HZ0 + HZ1) / 2); g.add(ceil);
  const beams = [];
  for (let i = 0; i < 4; i++) { const z = HZ1 + 2 + i * 3.4; const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 1.2, 7.6, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0x6a6cff, transparent: true, opacity: 0.06, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); beam.position.set(0, 4, z); g.add(beam);
    const pl = new THREE.PointLight(0x6a6cff, 2, 8, 2); pl.position.set(0, 7, z); g.add(pl); beams.push(pl); }
  // glowing floor arrows pointing inward (toward -z)
  const arrows = [];
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < 5; i++) { const a = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.1, 3), arrowMat.clone()); a.rotation.x = -Math.PI / 2; a.position.set(0, 0.04, HZ1 + 1 + i * 2.6); a.rotation.z = Math.PI; g.add(a); arrows.push(a); }
  updaters.push((dt, t) => {
    projMats.forEach((m) => m.uniforms.t.value = t);
    beams.forEach((b, i) => b.intensity = 1.5 + Math.sin(t * 3 + i) * 1.2);
    arrows.forEach((a, i) => { a.material.opacity = 0.3 + 0.6 * Math.max(0, Math.sin(t * 3 - i * 0.7)); });
  });
  return g;
}

// ---------- CENTRAL HUB: shell, golden frames, heart orb, portals ----------
function buildHubShell() {
  const g = new THREE.Group(); scene.add(g);
  const wall = std({ color: 0x0c0d16, roughness: 0.95, metalness: 0.15, emissive: C(0x10122a), emissiveIntensity: 0.12 });
  // side + back walls of the hall
  const side = (sx) => { const w = new THREE.Mesh(new THREE.BoxGeometry(0.6, 12, 36), wall); w.position.set(sx, 6, -10); g.add(w); };
  side(-25.6); side(25.6);
  const backW = new THREE.Mesh(new THREE.BoxGeometry(52, 12, 0.6), wall); backW.position.set(0, 6, -28); g.add(backW);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(52, 0.6, 36), std({ color: 0x070810, roughness: 1 })); roof.position.set(0, 12, -10); g.add(roof);
  // exposed truss beams overhead
  for (let i = -3; i <= 3; i++) { const tb = new THREE.Mesh(new THREE.BoxGeometry(51, 0.4, 0.4), std({ color: 0x1a1c28, metalness: 0.6 })); tb.position.set(0, 11.4, -10 + i * 5); g.add(tb); }
  // dramatic overhead spotlights
  for (const sx of [-16, 0, 16]) for (const sz of [-4, -18]) { const sl = new THREE.SpotLight(0xbfc4ff, 26, 34, Math.PI / 7, 0.6, 1.2); sl.position.set(sx, 11, sz); sl.target.position.set(sx, 0, sz); g.add(sl); g.add(sl.target); }
  return g;
}

// floating golden frames dividing the gallery, each holding a shifting art panel
function buildGoldenFrames() {
  const g = new THREE.Group(); scene.add(g);
  const gold = std({ color: 0xe6c04a, roughness: 0.3, metalness: 0.9, emissive: C(0x3a2c08), emissiveIntensity: 0.4 });
  const artMat = () => new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=(v-0.5)*3.0; float a=atan(p.y,p.x); float r=length(p);
      float s=sin(a*5.0+t-r*8.0); vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*2.0+t*0.5+r*4.0); gl_FragColor=vec4(c*(0.55+0.45*s),1.0);} `,
  });
  const mats = [];
  const place = (x, y, z, ry, w, h) => {
    const grp = new THREE.Group(); grp.position.set(x, y, z); grp.rotation.y = ry;
    const t = 0.16;
    for (const [bw, bh, bx, by] of [[w, t, 0, h / 2], [w, t, 0, -h / 2], [t, h, -w / 2, 0], [t, h, w / 2, 0]]) { const b = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 0.18), gold); b.position.set(bx, by, 0); grp.add(b); }
    const m = artMat(); mats.push(m); const art = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.3, h - 0.3), m); grp.add(art);
    grp.userData.baseY = y; g.add(grp); return grp;
  };
  const frames = [
    place(-19, 4.2, -8, 0.5, 4.2, 3), place(-19, 4.6, -16, 0.4, 3.4, 4.4),
    place(19, 4.2, -8, -0.5, 4.2, 3), place(19, 4.6, -16, -0.4, 3.4, 4.4),
    place(-9, 6.6, -25, 0.06, 5, 3.2), place(9, 6.6, -25, -0.06, 5, 3.2),
  ];
  updaters.push((dt, t) => { mats.forEach((m) => m.uniforms.t.value = t); frames.forEach((f, i) => { f.position.y = f.userData.baseY + Math.sin(t * 0.6 + i) * 0.18; f.rotation.z = Math.sin(t * 0.4 + i) * 0.02; }); });
  return g;
}

// the levitating "heart" of the complex — a fractal orb that pulses with movement
let heart, heartLight, heartBaseI = 3;
function buildHeart() {
  const g = new THREE.Group(); g.position.set(0, 4.6, -12); scene.add(g);
  const mat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, e: { value: 0 } },
    vertexShader: `varying vec3 n; varying vec3 vp; void main(){ n=normalize(normalMatrix*normal); vp=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec3 n; varying vec3 vp; uniform float t,e;
      void main(){ float f=pow(1.0-abs(n.z),2.0);
        float band=sin(vp.y*6.0+t*2.0)+sin(vp.x*5.0-t*1.5)+sin(vp.z*5.0+t);
        vec3 base=0.5+0.5*cos(vec3(0.0,2.0,4.0)+band*0.8+t*0.4);
        vec3 c=mix(base*0.5, vec3(0.4,0.9,1.0), f) + e*0.5;
        gl_FragColor=vec4(c,1.0);} `,
  });
  heart = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 3), mat); g.add(heart);
  const halo = new THREE.Mesh(new THREE.SphereGeometry(2.1, 24, 18), new THREE.MeshBasicMaterial({ color: 0x6a6cff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.BackSide })); g.add(halo);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 10, 40), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false })); ring.rotation.x = Math.PI / 2.2; g.add(ring);
  heartLight = new THREE.PointLight(0x6a6cff, heartBaseI, 24, 2); g.add(heartLight);
  const cap = textPlane('THE HEART', '#00f3ff', 512, 64); cap.position.set(0, 3.1, 0); cap.scale.set(4.2, 0.52, 1); g.add(cap);
  updaters.push((dt, t, p, prox) => {
    mat.uniforms.t.value = t; mat.uniforms.e.value = 0.15 + p * 0.5 + (prox || 0) * 0.6;
    g.position.y = 4.6 + Math.sin(t * 0.8) * 0.22;
    heart.rotation.y += dt * 0.3; heart.rotation.x = Math.sin(t * 0.4) * 0.2;
    const s = 1 + p * 0.06 + (prox || 0) * 0.12; heart.scale.setScalar(s);
    ring.rotation.z += dt * 0.5; halo.scale.setScalar(1 + p * 0.05 + Math.sin(t * 2) * 0.02);
    heartLight.intensity = heartBaseI + p * 3 + (prox || 0) * 4;
  });
  return g;
}

// ---------- PORTALS: radiating sigils that lead to each themed room ----------
const PORTALS = [
  { name: 'GLITCH ART', col: 0x39ff14, url: 'studio.html', x: -15, z: -5 },
  { name: 'ARCADE + KARAOKE', col: 0xff0055, url: 'arcade.html', x: -5, z: -5 },
  { name: 'IMMERSIVE THEATER', col: 0xff8a2a, url: 'tv.html', x: 5, z: -5 },
  { name: 'AUDIO / VIDEO BOOTHS', col: 0x00f3ff, url: 'dj.html', x: 15, z: -5 },
  { name: 'SURREAL LO-FI', col: 0xb967ff, url: 'lofi.html', x: -15, z: -19 },
  { name: 'HORRORCORE CRAWLSPACE', col: 0xff2b2b, url: 'horrorcore.html', x: -5, z: -19 },
  { name: 'ABSTRACT PSYCHEDELIC', col: 0x00ffa8, url: 'abstract.html', x: 5, z: -19 },
  { name: 'FESTIVAL FRENZY', col: 0xe6c04a, url: 'index.html', x: 15, z: -19 },
];
const portalDiscs = [];
function buildPortals() {
  const g = new THREE.Group(); scene.add(g);
  for (const p of PORTALS) {
    const col = C(p.col);
    const grp = new THREE.Group(); grp.position.set(p.x, 0, p.z); g.add(grp);
    // floor sigil: ring + inner disc
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.11, 12, 40), new THREE.MeshBasicMaterial({ color: p.col, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.06; grp.add(ring);
    const disc = new THREE.Mesh(new THREE.CircleGeometry(1.4, 40), new THREE.MeshBasicMaterial({ color: p.col, transparent: true, opacity: p.soon ? 0.12 : 0.24, blending: THREE.AdditiveBlending, depthWrite: false }));
    disc.rotation.x = -Math.PI / 2; disc.position.y = 0.05; disc.userData.portal = p; grp.add(disc); portalDiscs.push(disc);
    // upward light beam
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.4, 8, 16, 1, true), new THREE.MeshBasicMaterial({ color: p.col, transparent: true, opacity: p.soon ? 0.05 : 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.position.y = 4; grp.add(beam);
    const pl = new THREE.PointLight(p.col, p.soon ? 1 : 2.4, 10, 2); pl.position.y = 1.6; grp.add(pl);
    // floating label + status
    const label = textPlane(p.name, '#' + col.getHexString(), 512, 64); label.position.set(0, 3.1, 0); label.scale.set(Math.min(6, p.name.length * 0.42), 0.62, 1); grp.add(label);
    if (p.soon) { const s = textPlane('opening in phase 2', '#9aa0c8', 512, 48); s.position.set(0, 2.5, 0); s.scale.set(3.4, 0.34, 1); grp.add(s); }
    grp.userData = { p, ring, disc, pl, label };
    updaters.push((dt, t) => { ring.rotation.z += dt * (p.soon ? 0.2 : 0.6); const b = 0.6 + Math.sin(t * 2 + p.x) * 0.25; ring.material.opacity = (p.soon ? 0.4 : 0.85) * b; pl.intensity = (p.soon ? 1 : 2.4) + Math.sin(t * 3 + p.z) * 0.6; label.position.y = 3.1 + Math.sin(t * 1.2 + p.x) * 0.06; });
  }
  return g;
}

// build everything
const _ext = buildExterior();
const _hall = buildEntranceHall();
const _shell = buildHubShell();
const _frames = buildGoldenFrames();
const _heartG = buildHeart();
const _portalsG = buildPortals();

// ambient: cool motes inside, ground fog on the street
updaters.push(addMotes(scene, { color: 0x8890e0, count: 220, area: [50, 12, 60], center: [0, 5, -6], rise: 0.4, opacity: 0.4 }));
updaters.push(addHaze(scene, { color: 0x2a3060, count: 10, center: [0, 1, 30], area: [60, 3, 24], scale: 12, opacity: 0.09 }));   // street fog
updaters.push(addHaze(scene, { color: 0x3a3e8a, count: 6, center: [0, 2, -12], area: [40, 5, 26], scale: 10, opacity: 0.045 })); // hub haze

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 30, eye: 1.6, zMin: -26 });
controls.pos.set(0, 1.6, 29); controls.yaw = 0;

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'warehouse', overhead: { ax: 34, az: 26, cz: -4 },
  items: [
    { id: 'exterior', label: 'Exterior + door', obj: _ext },
    { id: 'hall', label: 'Entrance hall', obj: _hall },
    { id: 'shell', label: 'Hub shell', obj: _shell },
    { id: 'frames', label: 'Golden frames', obj: _frames },
    { id: 'heart', label: 'The heart', obj: _heartG },
    { id: 'portals', label: 'Portals', obj: _portalsG },
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
  const hit = ray.intersectObjects(portalDiscs, false)[0];
  if (hit && hit.object.userData.portal) { activate(hit.object.userData.portal); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -29, 29); g.z = THREE.MathUtils.clamp(g.z, -25, 29); controls.walkTo(g); }
}

let nearPortal = null;
addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'e' && nearPortal) activate(nearPortal); });

const toastEl = document.getElementById('toast');
let toastT = 0;
function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); toastT = 2.4; }
function activate(p) {
  if (p.soon) { toast(`✦ ${p.name} — opening in phase 2`); return; }
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = p.url; }, 460);
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---------- zones + proximity hint ----------
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) { if (p.z > 20) return 'THE STREET'; if (p.z > 7) return 'ENTRANCE HALL'; return 'CENTRAL HUB'; }
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); setTimeout(() => zoneEl.classList.remove('show'), 1800); } }
}

// ---------- voiceover intro ----------
const voEl = document.getElementById('vo');
function runVoiceover() {
  const lines = [
    'Welcome to my world — where art, sound, and imagination collide.',
    'Take your time… everything here is waiting for you to explore.',
  ];
  let i = 0;
  const play = () => { if (!voEl || i >= lines.length) { if (voEl) voEl.classList.remove('show'); return; } voEl.textContent = lines[i]; voEl.classList.add('show'); setTimeout(() => { voEl.classList.remove('show'); i++; setTimeout(play, 900); }, 4200); };
  setTimeout(play, 700);
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
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const p = Math.pow(1 - ((t * (90 / 60)) % 1), 2.0);
  controls.update(dt);
  admin.update(dt);
  // door opens as you near it; heart reacts to how close you are
  openTarget += (((controls.pos.z < 25 && controls.pos.z > 8 && Math.abs(controls.pos.x) < 9) ? 1 : 0) - openTarget) * Math.min(1, dt * 3);
  const dH = Math.hypot(controls.pos.x - 0, controls.pos.z - (-12));
  const prox = THREE.MathUtils.clamp(1 - dH / 12, 0, 1);
  // nearest portal for the hint / E key
  nearPortal = null; let best = 3.2;
  for (const p2 of PORTALS) { const d = Math.hypot(controls.pos.x - p2.x, controls.pos.z - p2.z); if (d < best) { best = d; nearPortal = p2; } }
  if (hintEl) { if (nearPortal) { hintEl.textContent = nearPortal.soon ? `${nearPortal.name} — opening in phase 2` : `▸ enter ${nearPortal.name}  ·  tap / E`; hintEl.classList.add('show'); } else hintEl.classList.remove('show'); }
  if (toastT > 0) { toastT -= dt; if (toastT <= 0 && toastEl) toastEl.classList.remove('show'); }
  for (const u of updaters) u(dt, t, p, prox);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.5; track.play().catch(() => {}); }
  ambience.start();
  runVoiceover();
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__wh = { controls, scene, PORTALS };

// __world hook — overhead-screenshot harness only (activated with ?shot).
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
