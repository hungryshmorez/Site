import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildVaporwave } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';
import { createAmbience, AMBIENCE } from './audio/ambience.js';
import { createAdmin } from './scene/admin.js';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
const ambience = createAmbience(AMBIENCE.driftwave);

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
renderer.toneMappingExposure = 1.2;
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
scene.add(new THREE.HemisphereLight(0xff9ecb, 0x2a0a4a, 1.15));
const key = new THREE.DirectionalLight(0xffd9f0, 1.05); key.position.set(-8, 18, -20); scene.add(key);
const fill = new THREE.DirectionalLight(0x9fd8ff, 0.5); fill.position.set(12, 10, 16); scene.add(fill);

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
  return g;
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

// ---------- DREAMOS WORKSTATION (moved in from the festival) ----------
// A desk + CRT computer + office chair in the lo-fi nook. Click it to boot the
// DreamOS Ecosystem in the in-site window.
let dreamosProxy = null;
// the DreamOS is now a VJ TV — its monitor plays the festival's VJ playlist and
// clicking it opens the full playlist (with sound + controls) in the popup.
const VJ_PLAYLIST = 'PLTHYibH4Hb0Y';
const DREAMOS_URL = `https://www.youtube.com/embed/videoseries?list=${VJ_PLAYLIST}&autoplay=1&rel=0&modestbranding=1&playsinline=1`;
function buildDreamOS() {
  const g = new THREE.Group(); g.position.set(-14, 0, 7); g.rotation.y = 0.5; scene.add(g);
  const deskMat = std({ color: 0x2a1c2e, roughness: 0.6, metalness: 0.2 });
  const beige = std({ color: 0xcfc6ae, roughness: 0.7 });
  // desk
  const top = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.16, 1.5), deskMat); top.position.set(0, 1.0, 0); top.castShadow = true; g.add(top);
  for (const sx of [-1.5, 1.5]) for (const sz of [-0.55, 0.55]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 0.14), deskMat); leg.position.set(sx, 0.5, sz); g.add(leg); }
  // chunky CRT monitor
  const mon = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.3, 1.1), beige); mon.position.set(0, 1.9, -0.25); mon.castShadow = true; g.add(mon);
  const dosMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      float box(vec2 p, vec2 a, vec2 b){ return step(a.x,p.x)*step(p.x,b.x)*step(a.y,p.y)*step(p.y,b.y); }
      void main(){ vec3 bg=vec3(0.02,0.16,0.20);
        vec3 c=bg;
        c += box(v, vec2(0.08,0.62), vec2(0.5,0.9))*vec3(0.0,0.6,0.55);   // a window
        c += box(v, vec2(0.55,0.55), vec2(0.92,0.86))*vec3(0.05,0.35,0.5);
        c += box(v, vec2(0.1,0.12), vec2(0.9,0.34))*vec3(0.0,0.28,0.32);  // taskbar-ish
        float blink=step(0.5,fract(t*1.2)); c += box(v, vec2(0.12,0.2), vec2(0.16,0.28))*blink*vec3(0.2,1.0,0.7);
        float scan=sin((v.y+t*0.25)*120.0)*0.5+0.5; c*=(0.75+0.25*scan);
        gl_FragColor=vec4(c,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 1.0), dosMat); scr.position.set(0, 1.95, 0.32); g.add(scr);
  // keyboard + mouse
  const kb = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.08, 0.42), std({ color: 0x141018 })); kb.position.set(0, 1.09, 0.5); g.add(kb);
  const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.3), std({ color: 0x141018 })); mouse.position.set(0.9, 1.09, 0.5); g.add(mouse);
  // office chair (empty — sit down and mess with it)
  const chair = new THREE.Group(); chair.position.set(0, 0, 1.7); chair.rotation.y = Math.PI;
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.95), std({ color: 0x201826, roughness: 0.8 })); seat.position.y = 0.72; seat.castShadow = true; chair.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.1, 0.15), std({ color: 0x201826, roughness: 0.8 })); back.position.set(0, 1.28, -0.4); chair.add(back);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8), std({ color: 0x0a0a10 })); stem.position.y = 0.4; chair.add(stem);
  const wheels = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.07, 5), std({ color: 0x0a0a10 })); wheels.position.y = 0.08; chair.add(wheels);
  g.add(chair);
  // glow emanates FROM the CRT screen (at the monitor face), not a lamp overhead
  const gl = new THREE.PointLight(0x39ffd0, 3.4, 6, 2); gl.position.set(0, 1.95, 0.55); g.add(gl);
  const label = textPlane('DREAMOS ✧ VJ playlist — sit + watch', '#39ffd0'); label.position.set(0, 3.1, 0); label.scale.set(4.4, 0.55, 1); g.add(label);
  dreamosProxy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3.2, 2.8), new THREE.MeshBasicMaterial({ visible: false })); dreamosProxy.position.set(0, 1.6, 0.3); g.add(dreamosProxy);
  updaters.push((dt, t, p) => { dosMat.uniforms.t.value = t; gl.intensity = 2.4 + Math.sin(t * 4) * 0.7 + p * 1.4; });
  return g;
}

// ---------- DEADNET portal (moved in from the festival) ----------
// A broken CRT monolith spitting static; click it to log into the dead internet.
let deadnetProxy = null;
const DEADNET_URL = 'https://deadnet.on.websim.com/';
function buildDeadnet() {
  const g = new THREE.Group(); g.position.set(21, 0, 11); g.rotation.y = -1.15; scene.add(g);
  // the whole cabinet leans — a dead, abandoned terminal sinking into the plaza
  const lean = new THREE.Group(); lean.rotation.z = 0.09; lean.rotation.x = -0.05; g.add(lean);
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 3.2, 1.5), std({ color: 0x0a0a14, metalness: 0.45, roughness: 0.55 })); body.position.y = 1.8; body.castShadow = true; lean.add(body);
  // a busted, dented top corner + hairline cracks across the shell
  const dent = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 1.6), std({ color: 0x050509, metalness: 0.4, roughness: 0.7 })); dent.position.set(0.95, 3.15, 0); dent.rotation.z = -0.4; lean.add(dent);
  const crackMat = std({ color: 0x02020a, emissive: C(0x1a0a2a), emissiveIntensity: 0.3 });
  for (const [cy, cz, rz] of [[2.3, 0.76, 0.5], [1.3, 0.76, -0.7], [2.7, 0.76, 1.2]]) { const cr = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.1, 0.02), crackMat); cr.position.set((Math.random() - 0.5) * 1.6, cy, cz); cr.rotation.z = rz; lean.add(cr); }
  // exposed wires trailing out the bottom
  const wireMat = std({ color: 0x1a1a22, roughness: 0.8 });
  for (let i = 0; i < 4; i++) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 5), wireMat); w.position.set(-0.7 + i * 0.35, 0.4, 0.8); w.rotation.set(1.1 + Math.random() * 0.4, 0, (Math.random() - 0.5) * 0.6); lean.add(w); }
  const stMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t;
      float h(vec2 p){ return fract(sin(dot(p,vec2(12.9,78.2)))*43758.5); }
      void main(){ float n=h(floor(v*vec2(90.0,120.0))+floor(t*24.0));
        float band=step(0.86,fract(v.y*6.0 - t*1.4));
        vec3 c=vec3(n)*0.7; c += band*vec3(0.72,0.4,1.0)*0.6;
        c=mix(c, vec3(0.5,0.0,0.8), 0.15);
        gl_FragColor=vec4(c,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 1.8), stMat); scr.position.set(0, 2.0, 0.77); lean.add(scr);
  const gl = new THREE.PointLight(0xb967ff, 3, 11, 2); gl.position.set(0, 2.2, 1.6); lean.add(gl);
  const label = textPlane('DEADNET // the dead internet', '#b967ff'); label.position.set(0, 3.9, 0.3); label.scale.set(3.4, 0.5, 1); g.add(label);
  deadnetProxy = new THREE.Mesh(new THREE.BoxGeometry(2.8, 3.6, 1.9), new THREE.MeshBasicMaterial({ visible: false })); deadnetProxy.position.set(0, 1.9, 0.3); g.add(deadnetProxy);
  updaters.push((dt, t, p) => { stMat.uniforms.t.value = t; gl.intensity = 2 + Math.sin(t * 9) * 1.4 + p; });
  return g;
}

const _temple = buildTemple(); const _monolith = buildMonolith(); const _mall = buildMall(); const _lofi = buildLoFi();
const _dreamos = buildDreamOS(); const _deadnet = buildDeadnet();
// mutable link refs so the editor can re-point them
const epkRef = { url: EPK_URL }, dreamosRef = { url: DREAMOS_URL }, deadnetRef = { url: DEADNET_URL };

// ---- DreamOS "TV": a live CSS3D YouTube player pinned to the monitor screen so
// the VJ playlist actually plays on the DreamOS as you sit at it (muted/looping;
// click the machine for the full playlist with sound). One player, loaded on
// enter so nothing streams before you start. ----
const dosCss = new THREE.Scene();
const dosCssRenderer = new CSS3DRenderer();
dosCssRenderer.setSize(innerWidth, innerHeight);
Object.assign(dosCssRenderer.domElement.style, { position: 'fixed', top: '0', left: '0', pointerEvents: 'none', zIndex: '2' });
document.body.appendChild(dosCssRenderer.domElement);
let dosTvFrame = null;
{
  const PPU = 60, w = 1.34, h = 0.99;
  const wrap = document.createElement('div');
  Object.assign(wrap.style, { width: (w * PPU) + 'px', height: (h * PPU) + 'px', background: '#000', overflow: 'hidden' });
  const f = document.createElement('iframe');
  Object.assign(f.style, { width: '100%', height: '100%', border: '0', pointerEvents: 'none' });
  f.allow = 'autoplay; encrypted-media; picture-in-picture'; f.setAttribute('frameborder', '0');
  wrap.appendChild(f); dosTvFrame = f;
  const obj = new CSS3DObject(wrap);
  obj.position.set(-13.83, 1.95, 7.31); obj.rotation.y = 0.5; obj.scale.setScalar(1 / PPU); // matches the monitor face
  dosCss.add(obj);
}
const startDreamTV = () => { if (dosTvFrame && !dosTvFrame.src) dosTvFrame.src = `https://www.youtube.com/embed/videoseries?list=${VJ_PLAYLIST}&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0`; };

// ambient drift: warm motes across the dream + soft pink haze in the temple
updaters.push(addMotes(scene, { color: 0xffd27a, count: 220, area: [56, 16, 60], opacity: 0.45 }));
updaters.push(addHaze(scene, { color: 0xff9ecb, count: 9, center: [0, 3, -16], area: [22, 6, 16], scale: 9, opacity: 0.05 }));

// DriftWave himself in the central plaza, facing the spawn
const dw = buildVaporwave('#b967ff'); dw.group.position.set(0, 0, 1); dw.group.rotation.y = Math.PI; scene.add(dw.group);

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 28, eye: 1.6, zMin: -28 });
controls.pos.set(0, 1.6, 15); controls.yaw = 0;
const parkour = buildParkour(scene, controls);
controls.groundAt = parkour.groundAt; // land on the floating islands
const rings = buildRings(scene, controls); // glide from the summit through them

// ---------- layout editor (overhead move / rotate / resize / rename / relink) ----------
const admin = createAdmin({
  scene, camera, renderer, controls, worldId: 'driftwave',
  overhead: { ax: 30, az: 24, cz: -4 },
  items: [
    { id: 'driftwave', label: 'DriftWave', obj: dw.group },
    { id: 'epk', label: 'EPK monolith', obj: _monolith, dest: epkRef },
    { id: 'dreamos', label: 'DreamOS', obj: _dreamos, dest: dreamosRef },
    { id: 'deadnet', label: 'Deadnet', obj: _deadnet, dest: deadnetRef },
    { id: 'temple', label: 'Temple', obj: _temple },
    { id: 'mall', label: 'Mallsoft', obj: _mall },
    { id: 'lofi', label: 'Lo-fi nook', obj: _lofi },
  ],
});

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
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('DRIFTWAVE STATIC — EPK', epkRef.url); return; }
  if (dreamosProxy && ray.intersectObject(dreamosProxy, false)[0]) { openWindow('DREAMOS · VJ PLAYLIST', dreamosRef.url); return; }
  if (deadnetProxy && ray.intersectObject(deadnetProxy, false)[0]) { openWindow('DEADNET — the dead internet', deadnetRef.url); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -27, 27); g.z = THREE.MathUtils.clamp(g.z, -27, 27); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); dosCssRenderer.setSize(innerWidth, innerHeight); });

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
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  beat = Math.pow(1 - ((t * (72 / 60)) % 1), 2.0); // gentle 72bpm pulse
  controls.update(dt);
  admin.update(dt);
  if (dw.update) dw.update(t, beat);
  for (const u of updaters) u(dt, t, beat);
  parkour.update(dt, t);
  rings.update(dt, t);
  updateZone(controls.pos);
  renderer.render(scene, admin.active ? admin.cam : camera);
  dosCssRenderer.render(dosCss, admin.active ? admin.cam : camera); // DreamOS TV tracks the camera
}
controls.update(0);
renderer.render(scene, camera); // one frame behind the overlay

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.55; track.play().catch(() => {}); }
  ambience.start();
  startDreamTV(); // the DreamOS monitor starts playing the VJ playlist
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__dw = { controls, scene };

// __world hook — overhead-screenshot harness only (activated with ?shot in the
// URL); exposes the scene so an offline top-down render can be captured. No-op
// for normal visitors.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
