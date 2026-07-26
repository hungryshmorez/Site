import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildVaporwave } from './scene/models.js';
import { openWindow } from './ui/popup.js';

// DRIFTWAVE STATIC'S WORLD — one big vaporwave dreamscape stitched from the
// three VAPORSTUDIO rooms: a marble TEMPLE (with the EPK monolith), a dead
// MALLSOFT arcade, and a rainy late-night LO-FI nook. Walk between them.

const EPK_URL = 'https://staticcorp--sofakingsadboi.on.websim.com/';
const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = !isMobile;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x2a0f3e, 0.021);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 220);

// ---------- sky: vaporwave sunset gradient ----------
{
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(140, 32, 20),
    new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false,
      uniforms: { top: { value: C(0x2a0a4a) }, mid: { value: C(0xff2b8f) }, bot: { value: C(0xffd27a) } },
      vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying float h; uniform vec3 top,mid,bot;
        void main(){ float t=clamp(h,-1.0,1.0);
          vec3 c = t>0.0 ? mix(mid,top,pow(t,0.7)) : mix(mid,bot,pow(-t,0.6));
          gl_FragColor=vec4(c,1.0); }`,
    })
  );
  scene.add(sky);
}
// retro striped sun on the temple horizon
{
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  const grd = x.createLinearGradient(0, 0, 0, 256); grd.addColorStop(0, '#ffe89a'); grd.addColorStop(0.5, '#ff8fc7'); grd.addColorStop(1, '#ff2b8f');
  x.fillStyle = grd; x.beginPath(); x.arc(128, 128, 126, 0, 7); x.fill();
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 9; i++) { const y = 150 + i * 14; x.fillRect(0, y, 256, 3 + i * 1.4); } // stripe gaps
  const tex = new THREE.CanvasTexture(c);
  const sun = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
  sun.position.set(0, 9, -46); scene.add(sun);
}

// ---------- floor: checkerboard + neon grid ----------
{
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#1a0b2e'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#241141'; x.fillRect(0, 0, 32, 32); x.fillRect(32, 32, 32, 32);
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(40, 40); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), std({ map: tex, roughness: 0.5, metalness: 0.35, emissive: C(0x180a2c), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(120, 60, 0xff2b8f, 0x00f3ff); grid.material.transparent = true; grid.material.opacity = 0.22; grid.position.y = 0.02; scene.add(grid);
}

// ---------- lights ----------
scene.add(new THREE.HemisphereLight(0xff9ecb, 0x2a0a4a, 0.9));
const key = new THREE.DirectionalLight(0xffd9f0, 0.7); key.position.set(-8, 18, -20); scene.add(key);

const updaters = [];

// ---------- TEMPLE (north, -z) ----------
function buildTemple() {
  const g = new THREE.Group(); scene.add(g);
  const marble = std({ color: 0xf3e9ff, roughness: 0.45, metalness: 0.1, emissive: C(0x40204a), emissiveIntensity: 0.12 });
  const col = (x, z) => {
    const grp = new THREE.Group(); grp.position.set(x, 0, z);
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 5.2, 20), marble); shaft.position.y = 2.6; shaft.castShadow = true; grp.add(shaft);
    for (const yy of [0.2, 5.1]) { const cap = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.4, 1.3), marble); cap.position.y = yy; grp.add(cap); }
    g.add(grp);
  };
  for (const z of [-11, -25]) for (const x of [-9, -3, 3, 9]) col(x, z);
  // entablature beams across the tops
  for (const z of [-11, -25]) { const beam = new THREE.Mesh(new THREE.BoxGeometry(20, 0.6, 1.1), marble); beam.position.set(0, 5.4, z); g.add(beam); }
  // a Greek bust on a pedestal at the back
  {
    const ped = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.2, 1.6), marble); ped.position.set(0, 1.1, -24); ped.castShadow = true; g.add(ped);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 20, 18), marble); head.position.set(0, 2.95, -24); g.add(head);
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.4, 8), marble); nose.position.set(0, 2.95, -23.35); nose.rotation.x = Math.PI / 2; g.add(nose);
    const bl = new THREE.PointLight(0xff9ecb, 3, 10, 2); bl.position.set(0, 4, -22); g.add(bl);
  }
  palm(-13, -18, g); palm(13, -18, g); palm(-13, -8, g); palm(13, -8, g);
  return g;
}
function palm(x, z, parent) {
  const grp = new THREE.Group(); grp.position.set(x, 0, z);
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 4.2, 8), std({ color: 0x5b3d6b, roughness: 0.8 })); trunk.position.y = 2.1; trunk.castShadow = true; grp.add(trunk);
  const frondMat = std({ color: 0x2fd6a6, roughness: 0.6, emissive: C(0x0a3a2c), emissiveIntensity: 0.3, side: THREE.DoubleSide });
  for (let i = 0; i < 7; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.3, 2.6, 4), frondMat); f.position.set(0, 4.2, 0); f.rotation.z = Math.PI / 2; f.rotation.y = (i / 7) * Math.PI * 2; f.position.x = Math.cos(f.rotation.y) * 1.1; f.position.z = Math.sin(f.rotation.y) * 1.1; grp.add(f); }
  parent.add(grp);
}

// EPK monolith — a big CRT in the temple; click it to open the EPK
let epkProxy = null;
function buildMonolith() {
  const g = new THREE.Group(); g.position.set(0, 0, -8); scene.add(g);
  const body = new THREE.Mesh(new THREE.BoxGeometry(3, 3.6, 0.8), std({ color: 0x140a24, metalness: 0.5, roughness: 0.5 })); body.position.y = 2; body.castShadow = true; g.add(body);
  const scrMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      void main(){ float scan=sin((v.y+t*0.3)*90.0)*0.5+0.5; vec3 a=vec3(1.0,0.17,0.56),b=vec3(0.0,0.95,1.0);
        vec3 c=mix(a,b,v.x*0.7+0.2*sin(t+v.y*8.0)); c*=(0.5+0.5*scan); gl_FragColor=vec4(c,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 2.9), scrMat); scr.position.set(0, 2.1, 0.42); g.add(scr);
  const label = textPlane('DRIFTWAVE // EPK', '#00f3ff'); label.position.set(0, 4, 0.3); label.scale.set(3, 0.5, 1); g.add(label);
  const gl = new THREE.PointLight(0xff2b8f, 4, 12, 2); gl.position.set(0, 2.4, 1.6); g.add(gl);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.8, 1.4), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 2, 0.3); g.add(epkProxy);
  updaters.push((dt, t, p) => { scrMat.uniforms.t.value = t; gl.intensity = 3 + Math.sin(t * 5) * 1 + p * 2; });
}

// ---------- MALLSOFT (east, +x) ----------
function buildMall() {
  const g = new THREE.Group(); scene.add(g);
  // tiled section
  const tile = std({ color: 0x2b1a44, roughness: 0.3, metalness: 0.4, emissive: C(0x1a0e30), emissiveIntensity: 0.3 });
  const pad = new THREE.Mesh(new THREE.BoxGeometry(20, 0.06, 26), tile); pad.position.set(17, 0.03, 0); g.add(pad);
  // storefronts along the far side
  const neon = ['#00f3ff', '#ff2b8f', '#ffd27a', '#39ff14'];
  const names = ['SUNSET', 'CINNABON', 'ORANGE JULIUS', 'ELECTRO'];
  for (let i = 0; i < 4; i++) {
    const z = -9 + i * 6;
    const box = new THREE.Mesh(new THREE.BoxGeometry(3.6, 4, 4), std({ color: 0x1c1030, roughness: 0.8 })); box.position.set(25, 2, z); box.castShadow = true; g.add(box);
    const win = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2.2), std({ color: 0x0a0518, emissive: C(neon[i]), emissiveIntensity: 0.5 })); win.position.set(22.9, 1.6, z); win.rotation.y = Math.PI / 2; g.add(win);
    const sign = textPlane(names[i], neon[i]); sign.position.set(22.85, 3.4, z); sign.rotation.y = Math.PI / 2; sign.scale.set(3.2, 0.6, 1); g.add(sign);
    const l = new THREE.PointLight(C(neon[i]), 2.5, 9, 2); l.position.set(22, 3, z); g.add(l);
    potPalm(20, z, g);
  }
  // central fountain
  {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 0.7, 24), std({ color: 0x3a2456, roughness: 0.5 })); base.position.set(13, 0.35, 2); g.add(base);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 0.2, 24), std({ color: 0x9fdfff, transparent: true, opacity: 0.7, emissive: C(0x2aa8ff), emissiveIntensity: 0.5, metalness: 0.6, roughness: 0.1 })); water.position.set(13, 0.6, 2); g.add(water);
    const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.6, 10), std({ color: 0xbfeaff, transparent: true, opacity: 0.5, emissive: C(0x88ccff), emissiveIntensity: 0.6 })); jet.position.set(13, 1.4, 2); g.add(jet);
    const fl = new THREE.PointLight(0x66ccff, 3, 12, 2); fl.position.set(13, 2, 2); g.add(fl);
    updaters.push((dt, t) => { jet.scale.y = 1 + Math.sin(t * 4) * 0.15; water.material.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.15; });
  }
  return g;
}
function potPalm(x, z, parent) {
  const grp = new THREE.Group(); grp.position.set(x, 0, z);
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.35, 0.7, 12), std({ color: 0x14243a, roughness: 0.6 })); pot.position.y = 0.35; grp.add(pot);
  const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 0), std({ color: 0x2fd6a6, roughness: 0.7, emissive: C(0x0a3a2c), emissiveIntensity: 0.25, flatShading: true })); foliage.position.y = 1.3; grp.add(foliage);
  parent.add(grp);
}

// ---------- LATE-NIGHT LO-FI NOOK (west, -x) ----------
function buildLoFi() {
  const g = new THREE.Group(); scene.add(g);
  // warm rug
  const rug = new THREE.Mesh(new THREE.PlaneGeometry(11, 11), std({ color: 0x3a1f2e, roughness: 0.95, emissive: C(0x2a1018), emissiveIntensity: 0.2 })); rug.rotation.x = -Math.PI / 2; rug.position.set(-17, 0.02, 0); g.add(rug);
  // L-couch
  const couchMat = std({ color: 0x5a3550, roughness: 0.9 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(5, 0.8, 1.8), couchMat); seat.position.set(-17, 0.6, -3); seat.castShadow = true; g.add(seat);
  const backr = new THREE.Mesh(new THREE.BoxGeometry(5, 1.2, 0.5), couchMat); backr.position.set(-17, 1.2, -3.8); g.add(backr);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.1, 2.6), couchMat); arm.position.set(-21.5, 0.9, -2.6); arm.rotation.y = -0.4; g.add(arm);
  // floor lamp (warm)
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.6, 8), std({ color: 0x2a2030 })); pole.position.set(-13, 1.3, -4); g.add(pole);
  const shade = new THREE.Mesh(new THREE.ConeGeometry(0.55, 0.7, 16, 1, true), std({ color: 0xffcf8a, emissive: C(0xffb060), emissiveIntensity: 1.2, side: THREE.DoubleSide })); shade.position.set(-13, 2.7, -4); g.add(shade);
  const lamp = new THREE.PointLight(0xffb060, 6, 12, 2); lamp.position.set(-13, 2.6, -4); g.add(lamp);
  // vinyl player on a low table
  const table = new THREE.Mesh(new THREE.BoxGeometry(2, 0.5, 1.2), std({ color: 0x2a1c14, roughness: 0.7 })); table.position.set(-17, 0.55, 1.5); g.add(table);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 1), std({ color: 0x120c08 })); deck.position.set(-17, 0.86, 1.5); g.add(deck);
  const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.03, 24), std({ color: 0x05050a, emissive: C(0xb967ff), emissiveIntensity: 0.35 })); disc.position.set(-17, 0.94, 1.5); g.add(disc);
  // tall rainy window
  const rainMat = new THREE.ShaderMaterial({
    transparent: true, uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; float h(vec2 p){return fract(sin(dot(p,vec2(41.3,289.1)))*43758.5);}
      void main(){ vec3 sky=mix(vec3(0.10,0.06,0.20),vec3(0.35,0.12,0.32),v.y);
        float col=floor(v.x*22.0); float sp=h(vec2(col,1.0)); float y=fract(v.y*1.5 - t*(0.5+sp) - sp);
        float drop=smoothstep(0.0,0.05,y)*smoothstep(0.16,0.05,y)*step(0.55,h(vec2(col,floor(v.y*4.0))));
        gl_FragColor=vec4(sky+drop*0.6,1.0);} `,
  });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 3.4), rainMat); win.position.set(-26.5, 2, 0); win.rotation.y = Math.PI / 2; g.add(win);
  const frame = new THREE.Mesh(new THREE.BoxGeometry(0.3, 3.8, 5), std({ color: 0x201020 })); frame.position.set(-26.7, 2, 0); g.add(frame);
  potPalm(-13, 2.5, g);
  // a sleeping cat on the couch arm
  const cat = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.5, 4, 8), std({ color: 0x1a1418, roughness: 0.9 })); cat.rotation.z = Math.PI / 2; cat.position.set(-21.5, 1.7, -2.6); g.add(cat);
  updaters.push((dt, t) => { disc.rotation.y += dt * 2.2; rainMat.uniforms.t.value = t; lamp.intensity = 5.5 + Math.sin(t * 3) * 0.4; });
  return g;
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 34px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---------- PARKOUR ASCENT: floating islands rising into the sunset ----------
let summitReached = false;
function buildParkour(scene, controls) {
  const g = new THREE.Group(); scene.add(g);
  const PLAT = []; const cx = 16, cz = -6, R = 5, N = 11;
  for (let i = 0; i < N; i++) {
    const ang = i * 0.85;
    const x = cx + Math.cos(ang) * R, z = cz + Math.sin(ang) * R, top = 1.5 + i * 1.1, hw = 1.4, hd = 1.4;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(hw * 2, 0.4, hd * 2), std({ color: 0x2a1846, roughness: 0.4, metalness: 0.4, emissive: C(0xb967ff), emissiveIntensity: 0.5 }));
    slab.position.set(x, top - 0.2, z); slab.castShadow = true; g.add(slab);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 + 0.1, 0.06, hd * 2 + 0.1), new THREE.MeshBasicMaterial({ color: 0xff2b8f, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
    edge.position.set(x, top + 0.03, z); g.add(edge);
    PLAT.push({ x, z, top, hw, hd });
  }
  const topP = PLAT[N - 1];
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), std({ color: 0x120a20, emissive: C(0xffd27a), emissiveIntensity: 1.2, metalness: 0.6, roughness: 0.2 }));
  crystal.position.set(topP.x, topP.top + 1.6, topP.z); g.add(crystal);
  const beacon = new THREE.PointLight(0xffd27a, 0, 34, 2); beacon.position.set(topP.x, topP.top + 2, topP.z); g.add(beacon);
  const sign = textPlane('▲ JUMP THE ISLANDS TO THE TOP', '#ff9ecb'); sign.position.set(cx + 4, 2.4, cz + 5); sign.scale.set(6.5, 0.7, 1); g.add(sign);

  // land on a platform top when you're at/above it (and not jumping up through it)
  function groundAt(x, z) {
    const feet = controls.pos.y - controls.eye; let gg = 0;
    for (const p of PLAT) if (Math.abs(x - p.x) < p.hw && Math.abs(z - p.z) < p.hd && p.top <= feet + 0.35 && p.top > gg) gg = p.top;
    return gg;
  }
  function update(dt, t) {
    crystal.rotation.y += dt * 1.4; crystal.position.y = topP.top + 1.6 + Math.sin(t * 2) * 0.15;
    beacon.intensity = summitReached ? 12 + Math.sin(t * 6) * 4 : 0;
    if (!summitReached) {
      const feet = controls.pos.y - controls.eye;
      if (feet > topP.top - 0.5 && Math.abs(controls.pos.x - topP.x) < 2 && Math.abs(controls.pos.z - topP.z) < 2) {
        summitReached = true; crystal.material.emissiveIntensity = 2.4;
        if (zoneEl) { zoneEl.textContent = '✦ THE ENDLESS SUMMER ✦'; zoneEl.classList.add('show'); }
      }
    }
  }
  return { groundAt, update };
}

// ---------- RING RUN: glide off the summit through descending rings ----------
let ringsDone = false;
function buildRings(scene, controls) {
  const g = new THREE.Group(); scene.add(g);
  const spots = [[15, 9, -1], [12, 8, 2.5], [9, 7, 5.5], [6, 6, 8], [3, 5.2, 10.5], [0, 4.6, 12.5]];
  const RINGS = [];
  spots.forEach(([x, y, z], i) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.7, 0.16, 12, 32), std({ color: 0x120a20, emissive: C(0xff2b8f), emissiveIntensity: 0.9, metalness: 0.5, roughness: 0.3 }));
    ring.position.set(x, y, z); ring.rotation.y = Math.PI / 2; g.add(ring);
    RINGS.push({ ring, c: new THREE.Vector3(x, y, z), passed: false });
  });
  const sign = textPlane('GLIDE THE RINGS ▸ hold space', '#ff9ecb'); sign.position.set(15, 11, 1); sign.scale.set(6, 0.7, 1); g.add(sign);
  let count = 0;
  function update(dt, t) {
    for (const r of RINGS) {
      if (!r.passed) { r.ring.material.emissiveIntensity = 0.7 + Math.sin(t * 3 + r.c.x) * 0.3; r.ring.rotation.z += dt * 0.6;
        if (controls.pos.distanceTo(r.c) < 1.7) { r.passed = true; r.ring.material.emissive = C(0x39ff14); r.ring.material.emissiveIntensity = 1.6; count++;
          if (count === RINGS.length && !ringsDone) { ringsDone = true; if (zoneEl) { zoneEl.textContent = '✦ RING RUNNER ✦'; zoneEl.classList.add('show'); } }
        }
      } else { r.ring.material.emissiveIntensity = 1.2 + Math.sin(t * 6) * 0.3; }
    }
  }
  return { update };
}

buildTemple(); buildMonolith(); buildMall(); buildLoFi();

// DriftWave himself in the central plaza, facing the spawn
const dw = buildVaporwave('#b967ff'); dw.group.position.set(0, 0, 1); dw.group.rotation.y = Math.PI; scene.add(dw.group);

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 28, eye: 1.6, zMin: -28 });
controls.pos.set(0, 1.6, 15); controls.yaw = 0;
const parkour = buildParkour(scene, controls);
controls.groundAt = parkour.groundAt; // land on the floating islands
const rings = buildRings(scene, controls); // glide from the summit through them

const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('DRIFTWAVE STATIC — EPK', EPK_URL); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -27, 27); g.z = THREE.MathUtils.clamp(g.z, -27, 27); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zone labels + EPK hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) {
  if (p.z < -6) return 'THE TEMPLE';
  if (p.x > 7) return 'MALLSOFT';
  if (p.x < -7) return 'LATE NIGHT LO-FI';
  return '';
}
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.toggle('show', !!z); } }
  if (hintEl) hintEl.classList.toggle('show', Math.hypot(p.x - 0, p.z - (-8)) < 7);
}

// ---------- back portal ----------
document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'index.html'; }, 470);
};

// ---------- loop ----------
const track = document.getElementById('track');
const clock = new THREE.Clock();
let running = false, beat = 0;
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  beat = Math.pow(1 - ((t * (72 / 60)) % 1), 2.0); // gentle 72bpm pulse
  controls.update(dt);
  if (dw.update) dw.update(t, beat);
  for (const u of updaters) u(dt, t, beat);
  parkour.update(dt, t);
  rings.update(dt, t);
  updateZone(controls.pos);
  renderer.render(scene, camera);
}
controls.update(0);
renderer.render(scene, camera); // one frame behind the overlay

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.55; track.play().catch(() => {}); }
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__dw = { controls, scene };
