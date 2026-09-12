import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
import { createAdmin } from './scene/admin.js';
import { buildDoor } from './scene/door.js';
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
renderer.toneMappingExposure = 1.34;

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
scene.add(new THREE.HemisphereLight(0x545a8c, 0x0e1020, 1.35));
scene.add(new THREE.AmbientLight(0x2a2e4a, 0.55));
const moon = new THREE.DirectionalLight(0x9aa2d0, 0.55); moon.position.set(-12, 20, 22); scene.add(moon);

// ---------- ground: wet asphalt outside, poured-concrete inside ----------
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 256; const x = cv.getContext('2d');
  x.fillStyle = '#22242f'; x.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 120; i++) { x.fillStyle = `rgba(${44 + Math.random() * 30 | 0},${48 + Math.random() * 30 | 0},${60 + Math.random() * 34 | 0},0.5)`; const s = 6 + Math.random() * 30; x.fillRect(Math.random() * 256, Math.random() * 256, s, s * 0.8); }
  for (let i = 0; i < 40; i++) { x.strokeStyle = 'rgba(0,0,0,0.35)'; x.beginPath(); x.moveTo(Math.random() * 256, Math.random() * 256); x.lineTo(Math.random() * 256, Math.random() * 256); x.stroke(); } // cracks
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(30, 30); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), std({ map: tex, roughness: 0.8, metalness: 0.15, emissive: C(0x1a1e30), emissiveIntensity: 0.5 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  // broad soft fill over the whole approach so the street isn't pitch-black
  const streetFill = new THREE.PointLight(0x9aa2d8, 4, 70, 2); streetFill.position.set(0, 20, 30); scene.add(streetFill);
}

// ---------- HUB checkerboard floor (inside, z < 8) ----------
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const x = cv.getContext('2d');
  for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { x.fillStyle = (i + j) % 2 ? '#0a0a12' : '#e7e8f2'; x.fillRect(i * 64, j * 64, 64, 64); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(15, 12); tex.colorSpace = THREE.SRGBColorSpace; tex.magFilter = THREE.NearestFilter;
  const hubFloor = new THREE.Mesh(new THREE.PlaneGeometry(30, 24), std({ map: tex, roughness: 0.35, metalness: 0.25, emissive: C(0x1a1c30), emissiveIntensity: 0.14 }));
  hubFloor.rotation.x = -Math.PI / 2; hubFloor.position.set(0, 0.016, -9); scene.add(hubFloor);
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
  const tag = textPlane('SOFA KING SAD BOI', '#ff2b8f', 512, 128); tag.position.set(-13, 3.4, FZ + 0.42); tag.scale.set(8, 1.4, 1); tag.rotation.z = 0.04; g.add(tag);
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
    const ll = new THREE.PointLight(0xffdca0, 16, 55, 2); ll.position.set(head.position.x, 7.4, lz); g.add(ll); lamps.push(ll);
  }

  updaters.push((dt, t) => {
    // erratic neon flicker
    const f = Math.random() < 0.06 ? 0.2 : 1; neon.material.opacity = 0.75 + 0.25 * f; neonGlow.intensity = 4.5 + f * 3 + Math.sin(t * 7) * 0.6;
    const of = (Math.sin(t * 3) > 0.2 && Math.random() > 0.03) ? 1 : 0.15; openSign.material.opacity = of; openGlow.intensity = of * 3;
    lamps.forEach((l, i) => l.intensity = 15 + Math.sin(t * 20 + i * 2) * (Math.random() < 0.04 ? 4 : 0.6));
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
  for (let i = 0; i < 5; i++) { const z = HZ1 + 1.5 + i * 2.9; const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 1.3, 7.6, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0x9a9cff, transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); beam.position.set(0, 4, z); g.add(beam);
    const pl = new THREE.PointLight(0xbfc4ff, 6, 16, 2); pl.position.set(0, 6.6, z); g.add(pl); beams.push(pl); }
  // warm floor-level wash so the corridor actually reads
  for (const z of [HZ1 + 3, HZ1 + 8, HZ0 - 1.5]) { const wl = new THREE.PointLight(0xdfe2ff, 3, 12, 2); wl.position.set(0, 2.2, z); g.add(wl); }
  // glowing floor arrows pointing inward (toward -z) — bigger + brighter
  const arrows = [];
  const arrowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < 6; i++) { const a = new THREE.Mesh(new THREE.ConeGeometry(0.72, 1.5, 3), arrowMat.clone()); a.rotation.x = -Math.PI / 2; a.position.set(0, 0.05, HZ1 + 0.5 + i * 2.3); a.rotation.z = Math.PI; g.add(a); arrows.push(a); }
  updaters.push((dt, t) => {
    projMats.forEach((m) => m.uniforms.t.value = t);
    beams.forEach((b, i) => b.intensity = 5 + Math.sin(t * 3 + i) * 1.5);
    arrows.forEach((a, i) => { a.material.opacity = 0.5 + 0.5 * Math.max(0, Math.sin(t * 3 - i * 0.7)); });
  });
  return g;
}

// ---------- CENTRAL HUB: shell, golden frames, heart orb, portals ----------
function buildHubShell() {
  const g = new THREE.Group(); scene.add(g);
  // (the atrium's own collidable perimeter is built in buildAtrium; here we keep
  // just the roof, trusses and dramatic spotlights over the arena)
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

// ---------- DOORS: a wall of real doors across the street, facing the warehouse ----------
// The radiating light-beam portals are gone. Behind where you spawn stands a big wall
// facing the warehouse's main door; set into it are the four "warehouse-area" rooms and
// the entrance to the big room-loop. Walk out to it and step through.
const doors = [];
let hiddenDoor = null;   // secret room door behind the Heart — active only at 5/5
function buildDoors() {
  const g = new THREE.Group(); scene.add(g);
  const Z = 54, WH = 13, TH = 1.0, HALF = 26, GAP = 2.4, DOORH = 3.9;
  const wm = std({ color: 0x1a1a26, roughness: 0.85, metalness: 0.35, emissive: C(0x14142a), emissiveIntensity: 0.28 });
  const defs = [
    { x: -21, label: 'DREAM OS · THEATER', url: 'tv.html', color: 0xff8a2a },
    { x: -14, label: 'VJ · STAGE', url: 'vj.html', color: 0x8a5cff },
    { x: -7, label: 'THE ROOMS ▸', sub: 'the big loop starts here', url: 'dj.html', color: 0x00f3ff },
    { x: 0, label: 'THE GALLERY', url: 'museum.html', color: 0xe6c04a },
    { x: 7, label: 'ARCADE + KARAOKE', url: 'arcade.html', color: 0xff2bd0 },
    { x: 14, label: 'THE BLOCK', sub: 'street games + the racetrack', url: 'gamecity.html', color: 0x39ff14 },
    { x: 21, label: 'ROOM BUILDER', url: 'builder.html', color: 0xffffff },
  ];
  // solid wall segments between/around the door openings (with collision)
  const edges = [-HALF]; for (const d of defs) { edges.push(d.x - GAP, d.x + GAP); } edges.push(HALF);
  for (let i = 0; i < edges.length; i += 2) {
    const a = edges[i], b = edges[i + 1]; if (b - a < 0.05) continue; const w = b - a, cx = (a + b) / 2;
    const seg = new THREE.Mesh(new THREE.BoxGeometry(w, WH, TH), wm); seg.position.set(cx, WH / 2, Z); seg.castShadow = seg.receiveShadow = true; g.add(seg);
    walls.push({ x0: cx - w / 2, x1: cx + w / 2, z0: Z - TH / 2 - 0.1, z1: Z + TH / 2 + 0.1 });
  }
  // lintels above each door opening + a parapet across the top
  for (const d of defs) { const lin = new THREE.Mesh(new THREE.BoxGeometry(GAP * 2, WH - DOORH, TH), wm); lin.position.set(d.x, DOORH + (WH - DOORH) / 2, Z); g.add(lin); }
  const para = new THREE.Mesh(new THREE.BoxGeometry(HALF * 2 + 2, 0.9, TH + 1.4), std({ color: 0x241a2a, roughness: 0.9 })); para.position.set(0, WH + 0.4, Z); g.add(para);
  // big sign facing the warehouse
  const sign = textPlane('THE 12MATT3R ROOMS', '#00f3ff', 512, 90); sign.position.set(0, WH - 1.4, Z - 0.55); sign.rotation.y = Math.PI; sign.scale.set(13, 2.0, 1); g.add(sign);
  const signGlow = new THREE.PointLight(0x00f3ff, 3, 22, 2); signGlow.position.set(0, WH - 1.4, Z - 2.4); g.add(signGlow);
  // wall-wash so the doors read at night (brighter + tinted to each door's colour)
  for (const d of defs) { const wl = new THREE.PointLight(d.color, 2.6, 16, 2); wl.position.set(d.x, 3.4, Z - 2.6); g.add(wl); }
  for (const lx of [-13.5, 13.5]) { const wl = new THREE.PointLight(0xbfc4ff, 3, 24, 2); wl.position.set(lx, 7, Z - 5); g.add(wl); }
  // glowing baseboard strip along the wall base
  const baseStrip = new THREE.Mesh(new THREE.BoxGeometry(HALF * 2, 0.16, 0.16), new THREE.MeshBasicMaterial({ color: 0x00f3ff })); baseStrip.position.set(0, 0.2, Z - 0.55); g.add(baseStrip);
  const glowBar = new THREE.Mesh(new THREE.PlaneGeometry(HALF * 2, 3.5), new THREE.MeshBasicMaterial({ color: 0x2aa0ff, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); glowBar.position.set(0, 0.05, Z - 2.2); glowBar.rotation.x = -Math.PI / 2; g.add(glowBar);
  // two streetlamps flanking the wall, throwing warm pools onto the approach
  for (const lx of [-23, 23]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 9, 8), std({ color: 0x14161f, metalness: 0.6 })); pole.position.set(lx, 4.5, Z - 6); g.add(pole);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.3, 1.4), std({ color: 0x1a1c26, emissive: C(0xffdca0), emissiveIntensity: 1.3 })); head.position.set(lx + (lx < 0 ? 1.6 : -1.6), 8.6, Z - 6); g.add(head);
    const ll = new THREE.PointLight(0xffdca0, 12, 44, 2); ll.position.set(head.position.x, 8.2, Z - 6.5); g.add(ll);
  }
  // ground haze drifting along the wall's approach
  updaters.push(addHaze(scene, { color: 0x2a3a6a, count: 8, center: [0, 1, Z - 6], area: [50, 3, 10], scale: 11, opacity: 0.07 }));
  updaters.push((dt, t) => { signGlow.intensity = 2.4 + Math.sin(t * 2) * 0.6; baseStrip.material.color.setHSL((t * 0.05) % 1, 0.8, 0.55); });
  // the doors themselves, set into the openings, facing the warehouse (-Z)
  for (const d of defs) { doors.push(buildDoor(g, { x: d.x, z: Z - 0.55, ry: Math.PI, label: d.label, sub: d.sub, url: d.url, color: d.color })); }
  return g;
}

// chamber exploration → 5/5 reveals the secret door (wired in buildMaze)
const CHAMBERS = ['glitch', 'horrorcore', 'arcade', 'abstract', 'festival'];
let exploredCh = new Set();
try { exploredCh = new Set((JSON.parse(localStorage.getItem('12m.chambers') || '[]')).filter((c) => CHAMBERS.includes(c))); } catch (e) {}

// build everything
const _ext = buildExterior();
const _hall = buildEntranceHall();
const _shell = buildHubShell();
const _heartG = buildHeart();

// ================= COLLISION SYSTEM (AABB walls + push-out) =================
const walls = [];       // { x0,x1,z0,z1 }
const losTargets = [];  // TALL cover — blocks the floating eye's view of anyone
const lowTargets = [];  // WAIST-HIGH cover — only hides a CROUCHED player
const PR = 0.45;        // player radius
function addWall(cx, cz, w, d, h, mat, y) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(cx, y != null ? y : h / 2, cz); m.castShadow = m.receiveShadow = true; scene.add(m); walls.push({ x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2 }); losTargets.push(m); return m; }
function resolveCollision(pos) {
  for (const w of walls) {
    if (pos.x > w.x0 - PR && pos.x < w.x1 + PR && pos.z > w.z0 - PR && pos.z < w.z1 + PR) {
      const pL = pos.x - (w.x0 - PR), pRr = (w.x1 + PR) - pos.x, pB = pos.z - (w.z0 - PR), pT = (w.z1 + PR) - pos.z;
      const m = Math.min(pL, pRr, pB, pT);
      if (m === pL) pos.x = w.x0 - PR; else if (m === pRr) pos.x = w.x1 + PR; else if (m === pB) pos.z = w.z0 - PR; else pos.z = w.z1 + PR;
    }
  }
}

// ================= ATRIUM COVER (sightline breaks, with collision) =================
const ATR = { x0: -13, x1: 13, z0: -20, z1: 2 };    // seeker stays inside the atrium (never the maze)
function buildCover() {
  const g = new THREE.Group(); scene.add(g);
  const crtMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; float h(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5);} void main(){ float n=h(floor(v*vec2(60.0,80.0))+floor(t*10.0)); float sc=step(0.5,fract(v.y*40.0+t)); vec3 c=vec3(0.2,0.5,0.9)*n+vec3(0.9,0.2,0.5)*sc*0.3; gl_FragColor=vec4(c,1.0);} `,
  });
  const crtMats = [];
  // CRT video walls (cover) — a stack of screens on a solid block
  const crtWall = (cx, cz, ry) => {
    const grp = new THREE.Group(); grp.position.set(cx, 0, cz); grp.rotation.y = ry; g.add(grp);
    const body = new THREE.Mesh(new THREE.BoxGeometry(4, 3, 0.6), std({ color: 0x0c0d16, roughness: 0.7 })); body.position.y = 1.6; grp.add(body);
    for (let i = 0; i < 4; i++) { const m = crtMat.clone(); m.uniforms = { t: { value: 0 } }; crtMats.push(m); const s = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.3), m); s.position.set(-0.95 + (i % 2) * 1.9, 1 + ((i / 2) | 0) * 1.4, 0.33); grp.add(s); }
    const gl = new THREE.PointLight(0x3a6cff, 1.6, 8, 2); gl.position.set(0, 1.8, 1); grp.add(gl);
    // collider along the rotated footprint (approx as axis box)
    const cos = Math.abs(Math.cos(ry)), sin = Math.abs(Math.sin(ry));
    walls.push({ x0: cx - (2 * cos + 0.3 * sin), x1: cx + (2 * cos + 0.3 * sin), z0: cz - (2 * sin + 0.3 * cos), z1: cz + (2 * sin + 0.3 * cos) });
    losTargets.push(body);
  };
  crtWall(-8, -3, 0.35); crtWall(9, -14, -0.4);
  // tall pillar racks
  const pillar = (cx, cz) => {
    const grp = new THREE.Group(); grp.position.set(cx, 0, cz); g.add(grp);
    for (let i = 0; i < 3; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.5, 0.8), std({ color: 0x16182a, roughness: 0.6, metalness: 0.4, emissive: C(0x1a2c5a), emissiveIntensity: 0.3 })); p.position.set((i - 1) * 0.9, 2.25, 0); grp.add(p); losTargets.push(p); }
    walls.push({ x0: cx - 1.5, x1: cx + 1.5, z0: cz - 0.6, z1: cz + 0.6 });
  };
  pillar(-9, -15); pillar(10, -3);
  // half-wall partitions (waist-high — you can peek over, not walk through)
  const half = (cx, cz, w, ry) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 1.3, 0.4), std({ color: 0x12141f, roughness: 0.8, emissive: C(0x0a2a3a), emissiveIntensity: 0.3 })); m.position.set(cx, 0.65, cz); m.rotation.y = ry; g.add(m); const cos = Math.abs(Math.cos(ry)), sin = Math.abs(Math.sin(ry)); walls.push({ x0: cx - (w / 2 * cos + 0.2 * sin), x1: cx + (w / 2 * cos + 0.2 * sin), z0: cz - (w / 2 * sin + 0.2 * cos), z1: cz + (w / 2 * sin + 0.2 * cos) }); lowTargets.push(m); };
  half(0, -6, 5, 0); half(-3, -18, 5, 0.5); half(4, -9, 4, 1.2);
  // holographic billboards (tall glowing panels — visual cover + landmarks)
  const bbMat = new THREE.ShaderMaterial({ transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ float b=sin(v.y*20.0-t*3.0)*0.5+0.5; vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+v.y*4.0+t); gl_FragColor=vec4(c*b, (1.0-v.y)*0.5);} `,
  });
  const bbMats = [];
  for (const [bx, bz] of [[-14, -10], [14, -8]]) { const m = bbMat.clone(); m.uniforms = { t: { value: 0 } }; bbMats.push(m); const bb = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 5), m); bb.position.set(bx, 3, bz); g.add(bb); const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 6, 8), std({ color: 0x14161f })); post.position.set(bx, 3, bz + 0.1); g.add(post); walls.push({ x0: bx - 0.3, x1: bx + 0.3, z0: bz - 0.3, z1: bz + 0.3 }); }
  // curved lounge seating (cover near the entry)
  const LGX = -9, LGZ = -5;   // tucked to the side, clear of the entry + archways
  const lounge = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.5, 10, 24, Math.PI), std({ color: 0x2a2f4a, roughness: 0.9, emissive: C(0x141a3a), emissiveIntensity: 0.25 })); lounge.position.set(LGX, 0.5, LGZ); lounge.rotation.x = Math.PI / 2; g.add(lounge);
  for (let a = -1.0; a <= 1.0; a += 0.5) { walls.push({ x0: LGX + Math.sin(a) * 2.2 - 0.5, x1: LGX + Math.sin(a) * 2.2 + 0.5, z0: LGZ - Math.cos(a) * 2.2 - 0.5, z1: LGZ - Math.cos(a) * 2.2 + 0.5 }); }
  updaters.push((dt, t) => { crtMats.forEach((m) => m.uniforms.t.value = t); bbMats.forEach((m) => m.uniforms.t.value = t); });
  return g;
}
const _cover = buildCover();
const _doorsG = buildDoors();   // built after the collision system exists (the wall segments add colliders)

// ---------- STREET GATEWAYS: two big subway-style portals flanking spawn ----------
// You spawn mid-street facing the warehouse. The room-loop is easy to miss on the
// wall behind you, so at EITHER END of the street stands a big gateway arch that
// drops you straight into the loop: the left one enters at DJ DECKS (forward), the
// right one at the ROOFTOP (the loop's other side). Walk the loop and it returns
// you here — in one end, out the other.
function buildStreetGateways() {
  const g = new THREE.Group(); scene.add(g);
  const Zc = 40;                 // the spawn line
  const gates = [
    { x: -30, ry: Math.PI / 2, url: 'dj.html', label: 'THE ROOMS ▸', sub: 'the loop — this way in', color: 0x00f3ff },
    { x: 30, ry: -Math.PI / 2, url: 'rooftop.html', label: '◂ THE ROOMS', sub: 'the loop — the other end', color: 0x4ad0c0 },
  ];
  // The arch is authored in door.js's local convention: the opening faces +Z,
  // the two pillars flank it along local X, and the tunnel recedes into local -Z.
  // Applying gt.ry then aims the whole gateway AND its portal-door the same way,
  // so the arch always squarely frames the door you walk through (no more sideways
  // arches perpendicular to the doorway).
  for (const gt of gates) {
    const col = C(gt.color);
    const arch = new THREE.Group(); arch.position.set(gt.x, 0, Zc); arch.rotation.y = gt.ry; scene.add(arch);
    const H = 8.5, HALFW = 4.6, PILLAR = 1.1;
    const conc = std({ color: 0x1c1c26, roughness: 0.9, metalness: 0.3, emissive: col.clone().multiplyScalar(0.12), emissiveIntensity: 0.5 });
    // two pillars flanking the opening (separated along local X, like door.js jambs)
    for (const sx of [-HALFW, HALFW]) {
      const p = new THREE.Mesh(new THREE.BoxGeometry(PILLAR, H, PILLAR), conc); p.position.set(sx, H / 2, 0); p.castShadow = true; arch.add(p);
    }
    // header beam + parapet spanning the opening (along local X)
    const beam = new THREE.Mesh(new THREE.BoxGeometry(HALFW * 2 + PILLAR, 1.4, PILLAR), conc); beam.position.set(0, H - 0.2, 0); arch.add(beam);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(HALFW * 2 + PILLAR + 0.6, 0.5, PILLAR + 0.5), std({ color: 0x141420, roughness: 0.9 })); cap.position.set(0, H + 0.5, 0); arch.add(cap);
    // receding tunnel rings for the "subway" depth — recede into local -Z (away from the street)
    for (let i = 1; i <= 3; i++) {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(HALFW - 0.2, 0.22, 8, 4), std({ color: 0x101018, emissive: col, emissiveIntensity: 0.35 + i * 0.12, metalness: 0.6, roughness: 0.5 }));
      ring.rotation.x = Math.PI / 2;                    // torus axis along local Z (the tunnel/passage axis)
      ring.position.set(0, H / 2 - 0.6, -i * 1.7);      // recede into the tunnel
      ring.scale.set(1, 0.9, 1);
      arch.add(ring);
    }
    // glowing portal membrane in the opening (local XY plane, faces +Z toward the approach)
    const memb = new THREE.Mesh(new THREE.PlaneGeometry(HALFW * 2 - 0.6, H - 1.2), new THREE.MeshBasicMaterial({ color: gt.color, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    memb.position.set(0, H / 2 - 0.2, 0); arch.add(memb);
    const gl = new THREE.PointLight(gt.color, 6, 34, 2); gl.position.set(0, H / 2, 0); arch.add(gl);
    const gl2 = new THREE.PointLight(gt.color, 4, 22, 2); gl2.position.set(0, 3, -3); arch.add(gl2);
    // big sign on the header facing the street centre (local +Z, i.e. toward the player)
    const sign = textPlane(gt.label, '#' + col.getHexString(), 512, 80); sign.position.set(0, H - 0.2, 0.7); sign.scale.set(6.5, 1.1, 1); arch.add(sign);
    const sub = textPlane(gt.sub, '#9fb0d8', 512, 44); sub.position.set(0, H - 1.4, 0.7); sub.scale.set(4.2, 0.4, 1); arch.add(sub);
    // ground threshold glow leading through the opening (spans the opening in X, laid down the approach in Z)
    const th = new THREE.Mesh(new THREE.PlaneGeometry(HALFW * 2 - 0.4, 3.4), new THREE.MeshBasicMaterial({ color: gt.color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    th.rotation.x = -Math.PI / 2; th.position.set(0, 0.06, 1.6); arch.add(th);
    updaters.push((dt, t) => { memb.material.opacity = 0.12 + Math.sin(t * 2 + gt.x) * 0.06; th.material.opacity = 0.3 + Math.sin(t * 2.4 + gt.x) * 0.12; });
    // the working portal (reuses the room-door enter/tap logic), pushed into `doors`.
    // Same gt.ry as the arch, so the door squarely fills the arch opening and faces the player.
    doors.push(buildDoor(scene, { x: gt.x, z: Zc, ry: gt.ry, width: 5, height: 6, label: '', url: gt.url, color: gt.color }));
  }
  return g;
}
const _gateways = buildStreetGateways();

// ===== ARENA EXTRAS: denser cover + hiding spots + sweeping searchlights (additive) =====
// Fleshes the central arena into a full hide-and-seek playfield. Purely additive —
// the maze wings and every room interior are left exactly as they are.
const hideSpots = [];    // {x,z,r} — crouch inside one and the seeker can't see you
const searchCams = [];   // sweeping ceiling lights that alert the seeker when they catch you
function concealed() {   // fully hidden = crouched inside a hide spot
  if (!crouched) return false;
  for (const h of hideSpots) { if (Math.hypot(controls.pos.x - h.x, controls.pos.z - h.z) < h.r) return true; }
  return false;
}
function buildArenaExtras() {
  const g = new THREE.Group(); scene.add(g);
  const crateMat = () => std({ color: 0x2a2418, roughness: 0.85, metalness: 0.1, emissive: C(0x1a1508), emissiveIntensity: 0.15 });
  // a shipping crate — tall crates block the eye (losTargets), low crates only hide a croucher (lowTargets)
  function crate(cx, cz, w, h, d, low) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), crateMat()); m.position.set(cx, h / 2, cz); m.castShadow = m.receiveShadow = true; g.add(m);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: 0x4a3f28, transparent: true, opacity: 0.5 })); edge.position.copy(m.position); g.add(edge);
    walls.push({ x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2 });
    (low ? lowTargets : losTargets).push(m);
  }
  // crate clusters — each a tall anchor + a low neighbour, making a nook you can crouch behind
  const clusters = [[6, -4], [-10, -6], [11, -11.5], [-6.5, -17], [6.5, -18.5], [-11, -13.5], [10, -16.5]];
  clusters.forEach(([cx, cz], i) => { crate(cx, cz, 1.4, 2.3, 1.4, false); crate(cx + (i % 2 ? 1.3 : -1.3), cz + 0.2, 1.1, 1.0, 1.1, true); });
  // perimeter pillar ring — evokes the colonnade in the blueprint, and breaks long sightlines
  for (const [px, pz] of [[11, -9], [7.8, -2.6], [-7.8, -2.6], [-11, -9], [-7.8, -15.4], [0, -18], [7.8, -15.4]]) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 5, 14), std({ color: 0x181a28, roughness: 0.6, metalness: 0.35, emissive: C(0x1a2c5a), emissiveIntensity: 0.28 }));
    col.position.set(px, 2.5, pz); col.castShadow = true; g.add(col);
    walls.push({ x0: px - 0.55, x1: px + 0.55, z0: pz - 0.55, z1: pz + 0.55 }); losTargets.push(col);
  }
  // partition walls → short corridors / dead-ends
  function partition(cx, cz, w, d) { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 2.4, d), std({ color: 0x12141f, roughness: 0.8, emissive: C(0x0a1a2a), emissiveIntensity: 0.25 })); m.position.set(cx, 1.2, cz); m.castShadow = m.receiveShadow = true; g.add(m); walls.push({ x0: cx - w / 2, x1: cx + w / 2, z0: cz - d / 2, z1: cz + d / 2 }); losTargets.push(m); }
  partition(-3.2, -9, 0.4, 4.5); partition(3.2, -15, 4.5, 0.4);
  // hiding spots — crouch inside a green ring and you're concealed. tucked into the corners, behind cover.
  for (const [sx, sz] of [[-11, -3.4], [11, -3.4], [-11, -18.4], [11, -18.4], [0, -19.2]]) {
    hideSpots.push({ x: sx, z: sz, r: 1.7 });
    const ring = new THREE.Mesh(new THREE.RingGeometry(1.2, 1.7, 32), new THREE.MeshBasicMaterial({ color: 0x39ff88, transparent: true, opacity: 0.14, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(sx, 0.04, sz); g.add(ring);
    const glyph = textPlane('▾ hide', '#39ff88', 128, 40); glyph.position.set(sx, 0.08, sz); glyph.rotation.x = -Math.PI / 2; glyph.scale.set(1.2, 0.3, 1); g.add(glyph);
    updaters.push((dt) => { const inside = Math.hypot(controls.pos.x - sx, controls.pos.z - sz) < 1.7; const tgt = inside ? (crouched ? 0.55 : 0.3) : 0.12; ring.material.opacity += (tgt - ring.material.opacity) * Math.min(1, dt * 5); });
  }
  // sweeping ceiling searchlights — get caught in a beam and the seeker is alerted to your position
  for (const [cx, cz, base] of [[-9, -9, -0.6], [9, -15, 2.5]]) {
    const grp = new THREE.Group(); grp.position.set(cx, 6.4, cz); g.add(grp);   // grp is oriented so local -Y aims the beam
    const housing = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), std({ color: 0x0a0a12, roughness: 0.4, metalness: 0.6 })); grp.add(housing);
    const light = new THREE.SpotLight(0xfff2c0, 5, 22, 0.34, 0.4, 1.2); light.position.set(0, 0, 0); grp.add(light);
    const tgt = new THREE.Object3D(); scene.add(tgt); light.target = tgt;
    // beam cone: apex at the housing (grp origin), widening downward along local -Y
    const beam = new THREE.Mesh(new THREE.ConeGeometry(2.6, 11, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.05, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.position.y = -5.5; grp.add(beam);   // apex at the origin (ceiling), base hangs 11 units below along -Y
    const disc = new THREE.Mesh(new THREE.CircleGeometry(2.2, 28), new THREE.MeshBasicMaterial({ color: 0xfff2c0, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })); disc.rotation.x = -Math.PI / 2; scene.add(disc);
    searchCams.push({ x: cx, z: cz, base, yaw: base, arc: 0.95, speed: 0.55, range: 18, cone: 0.34, light, tgt, beam, disc, grp });
  }
  return g;
}
const _extras = buildArenaExtras();

// ================= ATRIUM SHELL + PERIMETER MAZE (spec §2–3) =================
const wallMat = std({ color: 0x0c0d16, roughness: 0.95, metalness: 0.15, emissive: C(0x10122a), emissiveIntensity: 0.14 });
const WALLH = 7;
function wallSeg(x0, z0, x1, z1, mat) { const w = Math.max(0.6, Math.abs(x1 - x0)), d = Math.max(0.6, Math.abs(z1 - z0)); addWall((x0 + x1) / 2, (z0 + z1) / 2, w, d, WALLH, mat || wallMat); }
const thresholds = [];
const _secret = { mesh: null, wall: null, open: false, y: WALLH / 2 };

// base floor under the whole complex (chambers + corridors need ground)
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d'); x.fillStyle = '#0e0f18'; x.fillRect(0, 0, 64, 64);
  for (let i = 0; i < 40; i++) { x.fillStyle = `rgba(${30 + Math.random() * 20 | 0},${32 + Math.random() * 20 | 0},${48 + Math.random() * 24 | 0},0.5)`; x.fillRect(Math.random() * 64, Math.random() * 64, 6, 6); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(40, 40); tex.colorSpace = THREE.SRGBColorSpace;
  const base = new THREE.Mesh(new THREE.PlaneGeometry(96, 84), std({ map: tex, roughness: 0.9, emissive: C(0x0e1428), emissiveIntensity: 0.35 })); base.rotation.x = -Math.PI / 2; base.position.set(0, -0.02, -14); base.receiveShadow = true; scene.add(base);
}

function chamberFX(cx, cz, col, i, range) {
  const g = new THREE.Group(); g.position.set(cx, 0, cz); scene.add(g);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(3.6, 32), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })); disc.rotation.x = -Math.PI / 2; disc.position.y = 0.05; g.add(disc);
  const lite = new THREE.PointLight(col, i || 3.5, range || 16, 2); lite.position.set(0, 4, 0); g.add(lite);
  return { g, lite };
}
function chamberLabel(txt, col, x, z, ry) { const l = textPlane(txt, col, 512, 52); l.position.set(x, 4.4, z); l.rotation.y = ry; l.scale.set(5, 0.55, 1); scene.add(l); }

function buildAtrium() {
  // south (hall gap x[-4,4]); north (secret gap x[-3,3])
  wallSeg(-15, 3, -4, 3); wallSeg(4, 3, 15, 3);
  wallSeg(-15, -21, -3, -21); wallSeg(3, -21, 15, -21);
  // west: archway z[-3,3] → glitch; re-entry z[-18,-14] ← horrorcore
  wallSeg(-15, -21, -15, -18); wallSeg(-15, -14, -15, -3);
  // east: archway z[-3,3] → arcade; re-entry z[-18,-14] ← festival
  wallSeg(15, -21, 15, -18); wallSeg(15, -14, 15, -3);
  chamberLabel('◄ WEST WING', '#39ff14', -14.6, 0, Math.PI / 2);
  chamberLabel('EAST WING ►', '#ff0055', 14.6, 0, -Math.PI / 2);
  // secret door (north gap) — a panel that stays shut until 5/5
  const dm = new THREE.Mesh(new THREE.BoxGeometry(6.2, WALLH, 0.7), std({ color: 0x1a1020, roughness: 0.5, metalness: 0.4, emissive: C(0x3a0820), emissiveIntensity: 0.5 }));
  dm.position.set(0, WALLH / 2, -21); scene.add(dm); _secret.mesh = dm;
  _secret.wall = { x0: -3.1, x1: 3.1, z0: -21.35, z1: -20.65 }; walls.push(_secret.wall);
  const sc = textPlane('✦ ? ✦', '#e6c04a', 256, 64); sc.position.set(0, 4.4, -20.6); sc.scale.set(2, 0.5, 1); scene.add(sc);
}

function buildMaze() {
  // ---- WEST WING: GLITCH (z[-7,7]) → HORRORCORE (z[-21,-7]) ----
  // glitch walls
  wallSeg(-31, -7, -31, 7); wallSeg(-31, 7, -15, 7);
  wallSeg(-31, -7, -26, -7); wallSeg(-22, -7, -15, -7);   // north gap x[-26,-22] → horrorcore
  // horrorcore walls
  wallSeg(-31, -21, -31, -7); wallSeg(-31, -21, -15, -21);
  // ---- EAST WING: ARCADE (z[-5,3]) → ABSTRACT (z[-13,-5]) → FESTIVAL (z[-21,-13]) ----
  wallSeg(31, -5, 31, 3); wallSeg(15, 3, 31, 3);
  wallSeg(15, -5, 22, -5); wallSeg(26, -5, 31, -5);       // arcade↕abstract gap x[22,26]
  wallSeg(31, -13, 31, -5);
  wallSeg(15, -13, 22, -13); wallSeg(26, -13, 31, -13);   // abstract↕festival gap
  wallSeg(31, -21, 31, -13); wallSeg(15, -21, 31, -21);

  // ---- themed chamber interiors ----
  // GLITCH: electric-cyan spot, CRT stacks, a jittering wireframe
  { const fx = chamberFX(-23, 0, 0x39ff14, 3.5, 16); chamberLabel('GLITCH ART', '#39ff14', -23, 6.6, 0);
    for (const sx of [-29, -29]) { } // (screens below)
    const scMat = new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0.6 });
    for (const [zx, zz] of [[-30.4, -3], [-30.4, 3]]) { const crt = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.4, 1.4), std({ color: 0x0a0a12 })); crt.position.set(zx, 1.6, zz); scene.add(crt); const s = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.1), scMat.clone()); s.position.set(zx + 0.25, 1.6, zz); s.rotation.y = Math.PI / 2; scene.add(s); }
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.1, 1), new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true })); wire.position.set(-23, 2, -3); scene.add(wire);
    updaters.push((dt, t) => { wire.rotation.x += dt; wire.rotation.y += dt * 1.3; wire.position.x = -23 + (Math.random() - 0.5) * 0.2; fx.lite.intensity = 3 + Math.random() * 1.5; }); }
  // HORRORCORE: crimson underlight, flicker, pipes
  { const fx = chamberFX(-23, -14, 0xc81e2a, 2.4, 15); chamberLabel('HORRORCORE', '#c81e2a', -23, 6.6, -14);
    const under = new THREE.PointLight(0xc81e2a, 3, 12, 2); under.position.set(-23, 0.4, -14); scene.add(under);
    for (const px of [-30, -16]) { const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 13, 8), std({ color: 0x2a2420, roughness: 0.6, metalness: 0.6 })); pipe.rotation.x = Math.PI / 2; pipe.position.set(px, 5.6, -14); scene.add(pipe); }
    updaters.push((dt, t) => { const f = Math.random() < 0.12 ? 0.2 + Math.random() * 0.5 : 1; fx.lite.intensity = 2.4 * f; under.intensity = 3 * f; }); }
  // ARCADE + KARAOKE: neon magenta/cyan, cabinets, pulsing
  { const fx = chamberFX(23, -1, 0xff0055, 3, 15); chamberLabel('ARCADE + KARAOKE', '#ff2bd0', 23, 6.6, -1);
    const cols = [0xff2bd0, 0x00f3ff, 0xffe14a];
    for (let i = 0; i < 4; i++) { const cx = 17 + i * 3.6, cz = i % 2 ? -3.6 : 1.6; const cab = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.2, 0.9), std({ color: 0x0c0d16, roughness: 0.4, metalness: 0.4 })); cab.position.set(cx, 1.1, cz); scene.add(cab); const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.0), std({ color: 0x05060a, emissive: C(cols[i % 3]), emissiveIntensity: 1.2 })); scr.position.set(cx, 1.5, cz + 0.47); scene.add(scr); }
    const beat = new THREE.PointLight(0x00f3ff, 2, 12, 2); beat.position.set(23, 3.5, -1); scene.add(beat);
    updaters.push((dt, t) => { const b = 0.6 + Math.sin(t * 6) * 0.4; fx.lite.intensity = 3 * b; beat.intensity = 2 + Math.sin(t * 5 + 1) * 1.5; }); }
  // ABSTRACT / ROOM BUILDER: prismatic light, floating rings
  { const fx = chamberFX(23, -9, 0x00ffa8, 3, 15); chamberLabel('ABSTRACT · ROOM BUILDER', '#00ffa8', 23, 6.6, -9);
    const rings = []; for (let i = 0; i < 3; i++) { const r = new THREE.Mesh(new THREE.TorusGeometry(1.2 + i * 0.5, 0.06, 10, 32), new THREE.MeshBasicMaterial({ color: 0x00ffa8, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })); r.position.set(23, 2.5, -9); r.rotation.set(Math.random(), Math.random(), 0); scene.add(r); rings.push(r); }
    updaters.push((dt, t) => { fx.lite.color.setHSL((t * 0.1) % 1, 0.8, 0.6); rings.forEach((r, i) => { r.rotation.x += dt * (0.3 + i * 0.1); r.rotation.y += dt * (0.4 - i * 0.1); }); }); }
  // FESTIVAL / THEATER: velour arch, amber spots, stage + gold shafts
  { const fx = chamberFX(23, -17, 0xe6c04a, 3, 15); chamberLabel('FESTIVAL · THEATER', '#e6c04a', 23, 6.6, -17);
    const stage = new THREE.Mesh(new THREE.BoxGeometry(10, 0.6, 3), std({ color: 0x2a1a2a, roughness: 0.8 })); stage.position.set(23, 0.3, -19.5); scene.add(stage);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.4), new THREE.MeshBasicMaterial({ color: 0xffe1b0 })); screen.position.set(23, 3, -20.7); scene.add(screen);
    const shafts = []; for (const sx of [19, 27]) { const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 1.4, 6, 12, 1, true), new THREE.MeshBasicMaterial({ color: 0xffcf6a, transparent: true, opacity: 0.14, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })); sh.position.set(sx, 3, -18); scene.add(sh); shafts.push(sh); const sl = new THREE.PointLight(0xffcf6a, 3, 12, 2); sl.position.set(sx, 5, -18); scene.add(sl); }
    updaters.push((dt, t) => { fx.lite.intensity = 3 + Math.sin(t * 2) * 0.5; shafts.forEach((s, i) => s.material.opacity = 0.1 + Math.sin(t * 2 + i) * 0.06); }); }

  // chamber threshold trigger boxes (crossing → explored++)
  thresholds.push({ id: 'glitch', box: { x0: -30, x1: -16, z0: -6, z1: 6 } });
  thresholds.push({ id: 'horrorcore', box: { x0: -30, x1: -16, z0: -20, z1: -8 } });
  thresholds.push({ id: 'arcade', box: { x0: 16, x1: 30, z0: -4, z1: 2 } });
  thresholds.push({ id: 'abstract', box: { x0: 16, x1: 30, z0: -12, z1: -6 } });
  thresholds.push({ id: 'festival', box: { x0: 16, x1: 30, z0: -20, z1: -14 } });

  // ---- secret area behind The Heart ----
  wallSeg(-6, -31, -6, -21); wallSeg(6, -31, 6, -21); wallSeg(-6, -31, 6, -31);
}

buildAtrium(); buildMaze();

// hidden-room door beyond the secret panel — only reachable/active once it opens at 5/5
hiddenDoor = buildDoor(scene, { label: '▾ THE HIDDEN ROOM', url: 'hidden.html', x: 0, z: -25, ry: Math.PI, color: 0xe6c04a });

function updateProgress() { const pe = document.getElementById('progress'); if (pe) pe.innerHTML = exploredCh.size >= 5 ? '✦ <b>secret door open — behind The Heart</b>' : `explored <b>${exploredCh.size}/5</b> chambers · find them all`; }
function openSecret() {
  if (_secret.open) return; _secret.open = true;
  if (_secret.wall) { _secret.wall.z0 = 9990; _secret.wall.z1 = 9991; }   // disable collider
  toast('✦ THE SECRET DOOR OPENS behind The Heart');
}
function explore(id) {
  if (exploredCh.has(id)) return; exploredCh.add(id);
  try { localStorage.setItem('12m.chambers', JSON.stringify([...exploredCh])); } catch (e) {}
  updateProgress(); toast(`✦ ${id.toUpperCase()} chamber discovered (${exploredCh.size}/5)`);
  if (exploredCh.size >= 5) openSecret();
}
updateProgress();
if (exploredCh.size >= 5) { openSecret(); _secret.y = WALLH + 2; if (_secret.mesh) _secret.mesh.position.y = WALLH + 2; }
updaters.push((dt) => { if (_secret.open && _secret.mesh) { _secret.y += (WALLH + 2 - _secret.y) * Math.min(1, dt * 2); _secret.mesh.position.y = _secret.y; } });

// ================= SEEKER BOT + HIDE-AND-SEEK GAME =================
const game = { on: false, time: 0, state: 'off', detect: 0, best: 0 };
const ENTRY = new THREE.Vector3(0, 1.6, 4);
let crouched = false;
const seeker = { group: null, yaw: 0, wp: 0, sweep: 0, pauseT: 0, lastSeen: new THREE.Vector3(), hasLast: false };
const WAYPOINTS = [[-12, -3], [12, -6], [8, -20], [-8, -20], [0, -12], [-14, -14], [14, -16], [0, -3], [-6, -10], [6, -12]];
const CONE = 0.6, RANGE = 16;
const _rc = new THREE.Raycaster(), _sv = new THREE.Vector3(), _pv = new THREE.Vector3();
let coneMesh, seekLight, seekLightTarget, coneFloor, eyeIris;
function buildSeeker() {
  const g = new THREE.Group(); g.position.set(0, 2.6, -18); scene.add(g); seeker.group = g;
  const shell = new THREE.Mesh(new THREE.SphereGeometry(0.55, 20, 16), std({ color: 0x0a0a12, roughness: 0.3, metalness: 0.6, emissive: C(0x300010), emissiveIntensity: 0.4 })); g.add(shell);
  eyeIris = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 14), new THREE.MeshBasicMaterial({ color: 0xff2a2a })); eyeIris.position.z = 0.34; g.add(eyeIris);
  const ringM = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.06, 8, 24), new THREE.MeshBasicMaterial({ color: 0xff3040, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })); ringM.rotation.x = Math.PI / 2; g.add(ringM);
  // vision cone (from eye out to the floor ahead)
  coneMesh = new THREE.Mesh(new THREE.ConeGeometry(RANGE * Math.tan(CONE), RANGE, 24, 1, true), new THREE.MeshBasicMaterial({ color: 0xff3040, transparent: true, opacity: 0.08, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  coneMesh.rotation.x = -Math.PI / 2; coneMesh.position.z = 0; g.add(coneMesh);
  seekLight = new THREE.SpotLight(0xff5060, 0, 26, CONE * 1.1, 0.5, 1.2); seekLight.position.set(0, 0, 0); g.add(seekLight); seekLightTarget = new THREE.Object3D(); scene.add(seekLightTarget); seekLight.target = seekLightTarget;
  coneFloor = new THREE.Mesh(new THREE.RingGeometry(0.2, 2.4, 28), new THREE.MeshBasicMaterial({ color: 0xff3040, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); coneFloor.rotation.x = -Math.PI / 2; coneFloor.position.y = -2.55; scene.add(coneFloor);
  return g;
}
buildSeeker();

// generic vision test from any watcher (eye position + heading + cone/range) to the player
function visFrom(ox, oy, oz, yaw, cone, range) {
  if (concealed()) return 0;   // ducked into a hide spot → invisible to everyone
  _sv.set(ox, oy, oz);
  _pv.set(controls.pos.x, crouched ? 1.0 : 1.55, controls.pos.z);
  const dx = _pv.x - _sv.x, dz = _pv.z - _sv.z; const dist = Math.hypot(dx, dz);
  if (dist > range) return 0;
  const fx = -Math.sin(yaw), fz = -Math.cos(yaw);
  const ang = Math.acos(THREE.MathUtils.clamp((dx * fx + dz * fz) / (dist || 1), -1, 1));
  if (ang > cone) return 0;
  // line of sight — tall cover always blocks the eye; low cover only hides a croucher
  const dir = _pv.clone().sub(_sv); const len = dir.length(); dir.normalize();
  _rc.set(_sv, dir); _rc.far = len - 0.5;
  if (_rc.intersectObjects(losTargets, false).length) return 0;
  if (crouched) { _rc.set(_sv, dir); _rc.far = len - 0.5; if (_rc.intersectObjects(lowTargets, false).length) return 0; }
  // visible. crouching cuts your profile; closer + centred in cone = stronger
  let vis = (1 - dist / range) * (1 - ang / cone) + 0.35;
  if (crouched) vis *= 0.45;
  return THREE.MathUtils.clamp(vis, 0, 1);
}
function seekerCanSee() { return visFrom(seeker.group.position.x, seeker.group.position.y, seeker.group.position.z, seeker.yaw, CONE, RANGE); }

function updateSeeker(dt, t) {
  const g = seeker.group; if (!g) return;
  g.position.y = 2.6 + Math.sin(t * 1.5) * 0.12;
  if (!game.on) { // dormant: drift back to the dock by the vendor, powered down
    g.position.x += (-12 - g.position.x) * Math.min(1, dt * 1.2); g.position.z += (1 - g.position.z) * Math.min(1, dt * 1.2);
    g.rotation.y += dt * 0.3; seeker.yaw = g.rotation.y; coneMesh.material.opacity = 0.03; seekLight.intensity = 0; eyeIris.material.color.setHex(0x552233); coneFloor.material.opacity = 0; return;
  }
  if (game.freeze > 0) { g.rotation.y += dt * 0.5; seeker.yaw = g.rotation.y; coneMesh.material.opacity = 0.05; seekLight.intensity = 1.5; eyeIris.material.color.setHex(0x883344); coneFloor.material.opacity = 0.1; return; }   // head-start: seeker idles while you hide
  const pp = controls.pos; const vis = seekerCanSee();
  const rush = game.time < 15 ? 1.3 : 1;   // final stretch — the seeker gets desperate
  if (vis > 0) { seeker.lastSeen.set(pp.x, 0, pp.z); seeker.hasLast = true; }   // remember where you were
  // state machine
  if (game.state === 'chase') {
    // home in on the player (bounded to atrium); if they break LOS, fall back to investigating where you were
    const dx = pp.x - g.position.x, dz = pp.z - g.position.z; const d = Math.hypot(dx, dz);
    seeker.yaw = Math.atan2(-dx, -dz);
    const spd = 7 * rush * dt; g.position.x += (dx / (d || 1)) * spd; g.position.z += (dz / (d || 1)) * spd;
    game.detect = Math.min(2.4, game.detect + dt * (vis > 0 ? 2 : 0.4));
    if (vis <= 0) { game.detect -= dt * 1.2; if (game.detect < 1.0) { game.state = 'search'; seeker.sweep = 0; } }
    if (d < 1.4) return caught();
  } else if (game.state === 'search') {
    // walk to your last-known spot, then look around before giving up
    const dx = seeker.lastSeen.x - g.position.x, dz = seeker.lastSeen.z - g.position.z; const d = Math.hypot(dx, dz);
    if (seeker.hasLast && d > 1.4) { const spd = 5 * rush * dt; g.position.x += (dx / d) * spd; g.position.z += (dz / d) * spd; seeker.yaw = Math.atan2(-dx, -dz); }
    else { seeker.sweep += dt; seeker.yaw += Math.sin(seeker.sweep * 2.4) * dt * 2.6; if (seeker.sweep > 3.2) seeker.hasLast = false; }   // arrived → sweep the area
    game.detect += dt * (vis > 0 ? 2.5 : -0.9);
    if (game.detect >= 1.5) { game.state = 'chase'; }
    else if (game.detect <= 0) { game.detect = 0; game.state = 'patrol'; seeker.sweep = 0; }
  } else { // patrol — roam waypoints while scanning the cone side to side
    const [wx, wz] = WAYPOINTS[seeker.wp]; const dx = wx - g.position.x, dz = wz - g.position.z; const d = Math.hypot(dx, dz);
    let travel = seeker.yaw;
    if (d < 1.2) { seeker.pauseT -= dt; if (seeker.pauseT <= 0) { seeker.wp = (seeker.wp + 1 + (Math.random() * 2 | 0)) % WAYPOINTS.length; seeker.pauseT = 0.6 + Math.random(); } }
    else { const spd = 4 * rush * dt; g.position.x += (dx / d) * spd; g.position.z += (dz / d) * spd; travel = Math.atan2(-dx, -dz); }
    seeker.yaw = travel + Math.sin(t * 1.6) * 0.6;   // sweep the vision cone as it moves
    game.detect += dt * (vis > 0 ? 3.0 : -0.7);
    if (game.detect > 0.35) { game.state = 'search'; seeker.sweep = 0; }
    if (game.detect < 0) game.detect = 0;
  }
  // keep the seeker inside the atrium (never into the wings/hall)
  g.position.x = THREE.MathUtils.clamp(g.position.x, ATR.x0 + 1, ATR.x1 - 1);
  g.position.z = THREE.MathUtils.clamp(g.position.z, ATR.z0 + 1, ATR.z1 - 1);
  g.rotation.y = seeker.yaw;
  // visuals: cone + spotlight point where it looks
  const fx = -Math.sin(seeker.yaw), fz = -Math.cos(seeker.yaw);
  seekLightTarget.position.set(g.position.x + fx * 8, 0, g.position.z + fz * 8);
  seekLight.intensity = game.state === 'chase' ? 14 : 8;
  const col = game.state === 'chase' ? 0xff2020 : (game.state === 'search' ? 0xff8030 : 0xff5060);
  seekLight.color.setHex(col); coneMesh.material.color.setHex(col); coneFloor.material.color.setHex(col); eyeIris.material.color.setHex(col);
  coneMesh.material.opacity = game.state === 'chase' ? 0.16 : 0.09;
  coneFloor.position.set(g.position.x + fx * 6, 0.04, g.position.z + fz * 6); coneFloor.material.opacity = 0.35 + Math.sin(t * 6) * 0.1;
}

// sweeping ceiling searchlights: they scan the floor and, when the game is live and one
// catches you in the open, they alert the seeker to your position.
const _cv2 = new THREE.Vector3(), _cd = new THREE.Vector3(), _down = new THREE.Vector3(0, -1, 0), _aim = new THREE.Vector3(), _q = new THREE.Quaternion();
function updateCams(dt, t) {
  const pp = controls.pos;
  for (const c of searchCams) {
    c.yaw = c.base + Math.sin(t * c.speed) * c.arc;
    const fx = Math.sin(c.yaw), fz = Math.cos(c.yaw);
    // aim the spotlight/beam at a point on the floor along the sweep
    const gx = c.x + fx * 9, gz = c.z + fz * 9;
    c.tgt.position.set(gx, 0, gz);
    _aim.set(gx - c.x, -6.4, gz - c.z).normalize(); _q.setFromUnitVectors(_down, _aim); c.grp.quaternion.copy(_q);   // aim the beam (local -Y) at the floor spot
    c.disc.position.set(gx, 0.05, gz);
    // does it have the player? (in the beam, in range, LOS clear, not concealed)
    let seeing = false;
    if (game.on && !concealed()) {
      const dx = pp.x - c.x, dz = pp.z - c.z, dist = Math.hypot(dx, dz);
      if (dist < c.range) {
        // angle of the player off the beam's floor direction
        const px = pp.x - gx, pz = pp.z - gz;
        if (Math.hypot(px, pz) < 2.4) {   // within the lit disc on the floor
          _cv2.set(c.x, 6.4, c.z); _cd.set(pp.x - c.x, (crouched ? 1.0 : 1.55) - 6.4, pp.z - c.z);
          const len = _cd.length(); _cd.normalize(); _rc.set(_cv2, _cd); _rc.far = len - 0.4;
          const blocked = _rc.intersectObjects(losTargets, false).length || (crouched && _rc.intersectObjects(lowTargets, false).length);
          if (!blocked) seeing = true;
        }
      }
    }
    if (seeing) {
      game.detect += dt * 2.2; seeker.lastSeen.set(pp.x, 0, pp.z); seeker.hasLast = true;
      if (game.state === 'patrol') { game.state = 'search'; seeker.sweep = 0; }
    }
    if (seeing && !c.wasSeeing) sfxBeep(); c.wasSeeing = seeing;
    const col = seeing ? 0xff3040 : 0xfff2c0;
    c.light.color.setHex(col); c.beam.material.color.setHex(col); c.disc.material.color.setHex(col);
    c.light.intensity = game.on ? (seeing ? 9 : 5) : 2.5;
    c.beam.material.opacity = game.on ? (seeing ? 0.11 : 0.05) : 0.03;
    c.disc.material.opacity = (game.on ? 0.22 : 0.12) + (seeing ? 0.15 : 0) + Math.sin(t * 5) * 0.04;
  }
}

// ================= GAME AUDIO (Web Audio, lazy on first start) =================
let _ac = null;
function AC() { if (!_ac) { try { _ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { _ac = null; } } if (_ac && _ac.state === 'suspended') _ac.resume(); return _ac; }
function tone(freq, dur, type = 'sine', gain = 0.2, slideTo = null) {
  const a = AC(); if (!a) return; const o = a.createOscillator(), g = a.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, a.currentTime);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(1, slideTo), a.currentTime + dur);
  g.gain.setValueAtTime(0.0001, a.currentTime); g.gain.exponentialRampToValueAtTime(gain, a.currentTime + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
  o.connect(g).connect(a.destination); o.start(); o.stop(a.currentTime + dur + 0.03);
}
function sfxThump(f) { tone(f, 0.16, 'sine', 0.3); }
function sfxAlarm() { tone(900, 0.14, 'square', 0.13, 480); setTimeout(() => tone(900, 0.14, 'square', 0.13, 480), 160); }
function sfxWin() { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.5, 'triangle', 0.2), i * 130)); }
function sfxCaught() { tone(220, 0.6, 'sawtooth', 0.26, 55); tone(160, 0.62, 'sawtooth', 0.2, 45); }
function sfxBeep() { tone(1500, 0.06, 'square', 0.07); }
function sfxTick(go) { tone(go ? 1200 : 760, 0.14, 'square', 0.16); }

// ================= SECOND SEEKER — "THE SENTINEL" (patrol drone) =================
// A methodical ground drone: it doesn't chase, but it sweeps its own routes, alerts the
// main seeker when it spots you, and nabs you on contact. Bounded to the atrium like the eye.
const seeker2 = { group: null, yaw: 0, wp: 0, pauseT: 0 };
const WAYPOINTS2 = [[10, -3], [-10, -4], [-10, -17], [10, -18], [0, -10], [6, -14], [-6, -8]];
const CONE2 = 0.5, RANGE2 = 11;
let cone2Mesh, cone2Floor, eye2;
function buildSeeker2() {
  const g = new THREE.Group(); g.position.set(0, 1.6, -10); scene.add(g); seeker2.group = g;
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.7, 6), std({ color: 0x0a1016, roughness: 0.4, metalness: 0.6, emissive: C(0x00303f), emissiveIntensity: 0.4 })); g.add(body);
  eye2 = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 12), new THREE.MeshBasicMaterial({ color: 0x00f3ff })); eye2.position.set(0, 0.12, 0.46); g.add(eye2);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.05, 8, 20), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false })); ring.rotation.x = Math.PI / 2; ring.position.y = 0.42; g.add(ring);
  cone2Mesh = new THREE.Mesh(new THREE.ConeGeometry(RANGE2 * Math.tan(CONE2), RANGE2, 20, 1, true), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.06, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  cone2Mesh.rotation.x = -Math.PI / 2; g.add(cone2Mesh);
  cone2Floor = new THREE.Mesh(new THREE.RingGeometry(0.2, 1.8, 24), new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); cone2Floor.rotation.x = -Math.PI / 2; cone2Floor.position.y = -1.55; scene.add(cone2Floor);
  return g;
}
buildSeeker2();
function updateSeeker2(dt, t) {
  const g = seeker2.group; if (!g) return;
  g.position.y = 1.6 + Math.sin(t * 2) * 0.06;
  if (!game.on || game.freeze > 0) {
    if (!game.on) { g.position.x += (-10 - g.position.x) * Math.min(1, dt * 1.2); g.position.z += (2 - g.position.z) * Math.min(1, dt * 1.2); }   // dock by the vendor when idle
    g.rotation.y += dt * 0.6; seeker2.yaw = g.rotation.y; cone2Mesh.material.opacity = 0.03; cone2Floor.material.opacity = 0; eye2.material.color.setHex(0x224a55); return;
  }
  const vis = visFrom(g.position.x, g.position.y, g.position.z, seeker2.yaw, CONE2, RANGE2);
  const rush = game.time < 15 ? 1.25 : 1;
  const [wx, wz] = WAYPOINTS2[seeker2.wp]; const dx = wx - g.position.x, dz = wz - g.position.z, d = Math.hypot(dx, dz);
  let travel = seeker2.yaw;
  if (d < 1.1) { seeker2.pauseT -= dt; if (seeker2.pauseT <= 0) { seeker2.wp = (seeker2.wp + 1) % WAYPOINTS2.length; seeker2.pauseT = 0.5 + Math.random(); } }
  else { const spd = 3.2 * rush * dt; g.position.x += dx / d * spd; g.position.z += dz / d * spd; travel = Math.atan2(-dx, -dz); }
  seeker2.yaw = travel + Math.sin(t * 1.3 + 2) * 0.5;
  g.position.x = THREE.MathUtils.clamp(g.position.x, ATR.x0 + 1, ATR.x1 - 1);
  g.position.z = THREE.MathUtils.clamp(g.position.z, ATR.z0 + 1, ATR.z1 - 1);
  g.rotation.y = seeker2.yaw;
  if (vis > 0) { game.detect += dt * 2.2; seeker.lastSeen.set(controls.pos.x, 0, controls.pos.z); seeker.hasLast = true; if (game.state === 'patrol') { game.state = 'search'; seeker.sweep = 0; } }
  if (vis > 0 && Math.hypot(controls.pos.x - g.position.x, controls.pos.z - g.position.z) < 1.5) return caught();
  const fx = -Math.sin(seeker2.yaw), fz = -Math.cos(seeker2.yaw);
  cone2Floor.position.set(g.position.x + fx * 5, 0.05, g.position.z + fz * 5);
  const seeing = vis > 0, col = seeing ? 0xff3040 : 0x00f3ff;
  cone2Mesh.material.color.setHex(col); cone2Floor.material.color.setHex(col); eye2.material.color.setHex(col);
  cone2Mesh.material.opacity = seeing ? 0.14 : 0.06; cone2Floor.material.opacity = 0.3 + Math.sin(t * 6) * 0.1;
}

// ================= HEARING — movement makes noise the seekers can follow =================
// Sprint and you're loud; walk and you're quiet; crouch (or stand still) and you're silent.
// A seeker within your noise radius is drawn to investigate, even if it can't see you.
const _lastPP = new THREE.Vector3(); let _hadLast = false, noisy = 0;
function updateHearing(dt) {
  const pp = controls.pos;
  if (!_hadLast) { _lastPP.set(pp.x, 0, pp.z); _hadLast = true; noisy = 0; return; }
  const spd = Math.hypot(pp.x - _lastPP.x, pp.z - _lastPP.z) / Math.max(dt, 1e-3);
  _lastPP.set(pp.x, 0, pp.z);
  noisy = crouched ? 0 : (spd > 9 ? 7 : spd > 1.5 ? 3.5 : 0);   // sprint = loud, walk = soft, crouch/still = silent
  if (!game.on || game.freeze > 0 || noisy === 0) return;
  for (const s of [seeker.group, seeker2.group]) {
    if (!s) continue;
    if (Math.hypot(pp.x - s.position.x, pp.z - s.position.z) < noisy) {
      game.detect += dt * 1.6; seeker.lastSeen.set(pp.x, 0, pp.z); seeker.hasLast = true;
      if (game.state === 'patrol') { game.state = 'search'; seeker.sweep = 0; }
    }
  }
}

// ---- HUD (built in JS so no HTML edits needed) ----
const hs = document.createElement('div'); hs.style.cssText = 'position:fixed;top:96px;left:50%;transform:translateX(-50%);z-index:7;text-align:center;font-family:ui-monospace,monospace;pointer-events:none';
hs.innerHTML = '<div id="hsTimer" style="font-size:26px;letter-spacing:.08em;color:#eaeaf5;text-shadow:0 0 14px rgba(0,243,255,.6);opacity:0;transition:opacity .3s"></div><div id="hsStealth" style="margin-top:4px;font-size:13px;letter-spacing:.22em;opacity:0;transition:opacity .3s"></div>';
document.body.appendChild(hs);
const hsTimerEl = hs.querySelector('#hsTimer'), hsStealthEl = hs.querySelector('#hsStealth');
// (no floating start button — the game is started from the Hide & Seek vendor booth)

// ---- persistent stats: best survival streak + record (remembered across visits) ----
const HS_STATS = '12m.hsStats';
let stats = { plays: 0, wins: 0, streak: 0, best: 0 };
try { const s = JSON.parse(localStorage.getItem(HS_STATS) || 'null'); if (s) stats = Object.assign(stats, s); } catch (e) {}
function saveStats() { try { localStorage.setItem(HS_STATS, JSON.stringify(stats)); } catch (e) {} }
const statEl = document.createElement('div');
statEl.style.cssText = 'position:fixed;left:50%;bottom:150px;transform:translateX(-50%);z-index:8;font:600 12px ui-monospace,monospace;letter-spacing:.12em;color:#9fb2d8;opacity:0;transition:opacity .3s;pointer-events:none;text-shadow:0 0 8px rgba(0,0,0,.7)';
document.body.appendChild(statEl);
function renderStats() { statEl.textContent = stats.plays > 0 ? `🏆 best streak ${stats.best} · survived ${stats.wins}/${stats.plays}` : 'first run — survive 60 seconds'; }
renderStats();

function startGame() {
  game.on = true; game.time = 60; game.state = 'patrol'; game.detect = 0; game.freeze = 3; game.hb = 0; game._prev = 'patrol'; game._tick = 4;
  seeker.wp = 0; seeker.pauseT = 0; seeker.hasLast = false; seeker2.wp = 0; seeker2.pauseT = 0;
  controls.pos.set(ENTRY.x, 1.6, ENTRY.z); controls.yaw = Math.PI;
  seeker.group.position.set(0, 2.6, -18); seeker2.group.position.set(0, 1.6, -11);
  statEl.style.opacity = '0'; hsTimerEl.style.opacity = '1'; hsStealthEl.style.opacity = '1';
  _hadLast = false;   // don't count the spawn teleport as movement noise
  AC(); toast('👁 GET READY — run and hide! crouch (C) behind cover or in a green ring');
}
function endGame(msg) { game.on = false; game.state = 'off'; game.freeze = 0; hsTimerEl.style.opacity = '0'; hsStealthEl.style.opacity = '0'; toast(msg); }
function caught() {
  sfxCaught(); stats.plays++; stats.streak = 0; saveStats(); renderStats();
  endGame('💥 CAUGHT! back to the entrance');
  controls.pos.set(ENTRY.x, 1.6, ENTRY.z); controls.yaw = Math.PI;
}
function winGame() {
  game.best = Math.max(game.best, 60); sfxWin();
  stats.plays++; stats.wins++; stats.streak++; stats.best = Math.max(stats.best, stats.streak); saveStats(); renderStats();
  endGame(stats.streak > 1 ? `🏆 YOU SURVIVED! ${stats.streak} in a row` : '🏆 YOU SURVIVED! the arena is yours');
  heartBaseI = 8; setTimeout(() => { heartBaseI = 3; }, 2500);
}
function updateGame(dt) {
  if (!game.on) return;
  // head-start countdown — you get a few seconds to hide before the hunt begins
  if (game.freeze > 0) {
    game.freeze -= dt;
    const n = Math.ceil(game.freeze);
    if (n !== game._tick) { game._tick = n; if (n > 0) sfxTick(false); else sfxTick(true); }
    hsTimerEl.textContent = game.freeze > 0 ? 'HIDE! ' + n : 'GO';
    hsStealthEl.textContent = '● GET READY'; hsStealthEl.style.color = '#39ff88';
    return;
  }
  game.time -= dt;
  hsTimerEl.textContent = '⏱ ' + Math.ceil(game.time) + 's';
  const lvl = concealed() ? ['🛡 CONCEALED', '#39ffcc']
    : (game.detect >= 1.5 ? ['DETECTED', '#ff2020'] : (game.detect >= 0.35 ? ['CAUTION', '#ff9030'] : ['HIDDEN', '#39ff88']));
  hsStealthEl.textContent = '● ' + lvl[0] + (noisy > 0 ? '  🔊' : ''); hsStealthEl.style.color = lvl[1];
  // alarm sting the moment a seeker locks onto you
  if (game.state === 'chase' && game._prev !== 'chase') sfxAlarm();
  game._prev = game.state;
  // tension heartbeat — faster & lower the closer you are to being found
  const iv = concealed() ? 0 : (game.detect >= 1.5 ? 0.34 : (game.detect >= 0.35 ? 0.62 : 0));
  game.hb -= dt;
  if (iv > 0 && game.hb <= 0) { const hot = game.detect >= 1.5; sfxThump(hot ? 64 : 52); if (hot) setTimeout(() => sfxThump(48), 150); game.hb = iv; }
  if (game.time <= 0) winGame();
}

// HIDE & SEEK VENDOR — a little booth off to the side of the entrance. The arena is a
// normal space to walk; the game only starts if you go to the vendor and choose to play.
let vendorProxy = null; const VENDOR = { x: -8, z: 0 };
{
  const g = new THREE.Group(); g.position.set(VENDOR.x, 0, VENDOR.z); g.rotation.y = 0.4; scene.add(g);
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 0.9), std({ color: 0x1a1030, roughness: 0.6, metalness: 0.3, emissive: C(0x2a0a3a), emissiveIntensity: 0.32 })); counter.position.set(0, 0.5, 0); counter.castShadow = counter.receiveShadow = true; g.add(counter);
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.85, 0.12, 1.1), std({ color: 0x2a1a40, roughness: 0.5 })); top.position.set(0, 1.06, 0); g.add(top);
  // striped canopy + posts
  for (let i = 0; i < 5; i++) { const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.06, 1.4), std({ color: i % 2 ? 0xff2bd0 : 0xf5f5ff, emissive: C(i % 2 ? 0x3a0020 : 0x222233), emissiveIntensity: 0.4 })); stripe.position.set(-1.12 + i * 0.56, 2.3, -0.15); stripe.rotation.x = -0.28; g.add(stripe); }
  for (const px of [-1.32, 1.32]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.4, 8), std({ color: 0x14161f, metalness: 0.5 })); post.position.set(px, 1.2, -0.35); g.add(post); }
  // neon sign
  const sign = textPlane('HIDE & SEEK', '#ff3040', 512, 60); sign.position.set(0, 1.92, 0.12); sign.scale.set(2.6, 0.5, 1); g.add(sign);
  const sub = textPlane('wanna play?', '#ffe14a', 512, 44); sub.position.set(0, 1.5, 0.52); sub.scale.set(1.7, 0.26, 1); sub.rotation.x = -0.35; g.add(sub);
  // the vendor — a little glowing character behind the counter
  const vg = new THREE.Group(); vg.position.set(0, 0, -0.45); g.add(vg);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.5, 6, 12), std({ color: 0x2a2f6a, roughness: 0.7, emissive: C(0x101a4a), emissiveIntensity: 0.35 })); body.position.y = 1.15; vg.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 14), std({ color: 0xf0e6d0, roughness: 0.6 })); head.position.y = 1.78; vg.add(head);
  for (const ex of [-0.11, 0.11]) { const eye = new THREE.Mesh(new THREE.SphereGeometry(0.045, 10, 8), new THREE.MeshBasicMaterial({ color: 0x101018 })); eye.position.set(ex, 1.81, 0.27); vg.add(eye); }
  const q = textPlane('?', '#39ff88', 128, 96); q.position.set(0.55, 2.25, 0.3); q.scale.set(0.5, 0.6, 1); vg.add(q);
  const gl = new THREE.PointLight(0xff5090, 2.4, 10, 2); gl.position.set(0, 2, 0.8); g.add(gl);
  vendorProxy = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 2.6, 8), new THREE.MeshBasicMaterial({ visible: false })); vendorProxy.position.set(VENDOR.x, 1.2, VENDOR.z); scene.add(vendorProxy);
  walls.push({ x0: VENDOR.x - 1.5, x1: VENDOR.x + 1.5, z0: VENDOR.z - 0.7, z1: VENDOR.z + 0.7 });
  updaters.push((dt, t) => { gl.intensity = 1.8 + Math.sin(t * 3) * 0.5; q.position.y = 2.25 + Math.sin(t * 2.5) * 0.12; head.rotation.y = Math.sin(t * 0.8) * 0.35; });
}

// crouch toggle
addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'c') { crouched = !crouched; controls.eye = crouched ? 0.95 : 1.6; toast(crouched ? (concealed() ? '🛡 concealed — the seeker can\'t see you here' : '🧎 crouched — harder to spot') : '🧍 standing'); } });

// ambient: cool motes inside, ground fog on the street
updaters.push(addMotes(scene, { color: 0x8890e0, count: 220, area: [50, 12, 60], center: [0, 5, -6], rise: 0.4, opacity: 0.4 }));
updaters.push(addHaze(scene, { color: 0x2a3060, count: 10, center: [0, 1, 30], area: [60, 3, 24], scale: 12, opacity: 0.09 }));   // street fog
updaters.push(addHaze(scene, { color: 0x3a3e8a, count: 6, center: [0, 2, -12], area: [40, 5, 26], scale: 10, opacity: 0.045 })); // hub haze

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 58, eye: 1.6, zMin: -32 });
controls.pos.set(0, 1.6, 40); controls.yaw = 0;   // spawn mid-street facing the warehouse; the wall of room-doors is behind you
// hold your place: coming back from a room drops you where you were, not outside
try { const s = JSON.parse(sessionStorage.getItem('wh.pos') || 'null'); if (s && isFinite(s.x) && isFinite(s.z)) { controls.pos.set(s.x, 1.6, s.z); if (isFinite(s.y)) controls.yaw = s.y; openTarget = 1; } } catch (e) {}
addEventListener('pagehide', () => { try { sessionStorage.setItem('wh.pos', JSON.stringify({ x: controls.pos.x, z: controls.pos.z, y: controls.yaw })); } catch (e) {} });

const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'warehouse', overhead: { ax: 34, az: 26, cz: -4 },
  items: [
    { id: 'exterior', label: 'Exterior + door', obj: _ext },
    { id: 'hall', label: 'Entrance hall', obj: _hall },
    { id: 'shell', label: 'Hub shell', obj: _shell },
    { id: 'heart', label: 'The heart', obj: _heartG },
    { id: 'doors', label: 'Doors', obj: _doorsG },
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
  if (vendorProxy && ray.intersectObject(vendorProxy, false)[0]) { if (!game.on) startGame(); return; }
  for (const d of doors) { if (d.tap(ray)) return; }
  if (_secret.open && hiddenDoor && hiddenDoor.tap(ray)) return;
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -38, 38); g.z = THREE.MathUtils.clamp(g.z, -31, 29); controls.walkTo(g); }
}

let nearDoor = null, nearVendor = false;
addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'e') { if (nearVendor && !game.on) startGame(); else if (nearDoor) nearDoor.go(); } });

const toastEl = document.getElementById('toast');
let toastT = 0;
function toast(msg) { if (!toastEl) return; toastEl.textContent = msg; toastEl.classList.add('show'); toastT = 2.4; }

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
  if (!admin.active) resolveCollision(controls.pos);   // walls + cover block movement
  admin.update(dt);
  updateSeeker(dt, t);
  updateSeeker2(dt, t);
  updateCams(dt, t);
  updateHearing(dt);
  updateGame(dt);
  // chamber thresholds → explored X/5 (and the secret door at 5/5)
  { const pp = controls.pos; for (const th of thresholds) { if (!exploredCh.has(th.id) && pp.x > th.box.x0 && pp.x < th.box.x1 && pp.z > th.box.z0 && pp.z < th.box.z1) explore(th.id); } }
  // near the vendor (and not already playing) → offer the game + show your record
  nearVendor = !game.on && Math.hypot(controls.pos.x - VENDOR.x, controls.pos.z - VENDOR.z) < 3.4;
  if (statEl) statEl.style.opacity = nearVendor ? '1' : '0';
  // door opens as you near it; heart reacts to how close you are
  openTarget += (((controls.pos.z < 25 && controls.pos.z > 8 && Math.abs(controls.pos.x) < 9) ? 1 : 0) - openTarget) * Math.min(1, dt * 3);
  const dH = Math.hypot(controls.pos.x - 0, controls.pos.z - (-12));
  const prox = THREE.MathUtils.clamp(1 - dH / 12, 0, 1);
  // doors: animate, let you walk through, and light the nearest one's hint
  const activeDoors = (_secret.open && hiddenDoor) ? doors.concat(hiddenDoor) : doors;
  nearDoor = null; let best = 3.4;
  for (const d of activeDoors) {
    d.update(dt, t, controls.pos);
    d.tryEnter(controls.pos);
    const dist = Math.hypot(controls.pos.x - d.pos.x, controls.pos.z - d.pos.z);
    if (dist < best) { best = dist; nearDoor = d; }
  }
  if (hiddenDoor && !_secret.open) hiddenDoor.update(dt, t, controls.pos);   // keep it animating (shut) before 5/5
  if (hintEl) {
    if (nearVendor) { hintEl.textContent = '🎪 Hide & Seek — wanna play?  ·  tap / E'; hintEl.classList.add('show'); }
    else if (nearDoor) { hintEl.textContent = `▸ ${nearDoor.label}  ·  walk in / tap / E`; hintEl.classList.add('show'); }
    else hintEl.classList.remove('show');
  }
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

if (import.meta.env.DEV) window.__wh = { controls, scene, doors, hiddenDoor, game, seeker, seeker2, startGame, walls, updateSeeker, updateSeeker2, updateGame, updateCams, updateHearing, exploredCh, thresholds, explore, resolveCollision, hideSpots, searchCams, concealed, setCrouch: (v) => { crouched = v; controls.eye = v ? 0.95 : 1.6; } };

// __world hook — overhead-screenshot harness only (activated with ?shot).
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
