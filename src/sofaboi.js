import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { buildSofaBoi } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { addMotes, addHaze } from './scene/ambientfx.js';

// SOFA KING SAD BOI'S WORLD — a rainy kingdom of couches. A giant sofa THRONE
// under a personal storm cloud, a SEA of couches to roam, and a BASS PIT where
// the subs wobble to the weird bass. Moody indigo, dubstep energy, sad-boi rain.

const EPK_URL = 'https://sofa-king-sad-boi-official-epk--sofakingsadboi.on.websim.com/';
const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.02;
renderer.shadowMap.enabled = !isMobile;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x08081e, 0.026);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 220);

// ---------- stormy night sky ----------
{
  const sky = new THREE.Mesh(new THREE.SphereGeometry(140, 32, 20), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: C(0x05050f) }, mid: { value: C(0x1a1c50) }, bot: { value: C(0x2a2470) } },
    vertexShader: `varying float h; void main(){ h=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying float h; uniform vec3 top,mid,bot;
      void main(){ float t=clamp(h,-1.0,1.0); vec3 c=t>0.0?mix(mid,top,pow(t,0.55)):mix(mid,bot,pow(-t,0.6)); gl_FragColor=vec4(c,1.0);} `,
  }));
  scene.add(sky);
}

// ---------- wet floor + grid ----------
{
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  x.fillStyle = '#0a0a1e'; x.fillRect(0, 0, 64, 64); x.fillStyle = '#101033'; x.fillRect(0, 0, 32, 32); x.fillRect(32, 32, 32, 32);
  const tex = new THREE.CanvasTexture(c); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(36, 36); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), std({ map: tex, roughness: 0.28, metalness: 0.55, emissive: C(0x0a0a24), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(120, 60, 0x6a6cff, 0x2a2470); grid.material.transparent = true; grid.material.opacity = 0.18; grid.position.y = 0.02; scene.add(grid);
}

// ---------- lights (dim, moody) ----------
scene.add(new THREE.HemisphereLight(0x3a3a80, 0x05050f, 0.6));
const moon = new THREE.DirectionalLight(0x8a90ff, 0.35); moon.position.set(6, 20, 10); scene.add(moon);

const updaters = [];

// ---------- a reusable couch ----------
function buildCouch({ color = 0x4a3a6a, s = 1 } = {}) {
  const g = new THREE.Group();
  const m = std({ color, roughness: 0.95 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4 * s, 0.7 * s, 1.2 * s), m); seat.position.y = 0.55 * s; seat.castShadow = true; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.4 * s, 1.1 * s, 0.4 * s), m); back.position.set(0, 1.1 * s, -0.5 * s); g.add(back);
  for (const ax of [-1.1 * s, 1.1 * s]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35 * s, 0.95 * s, 1.3 * s), m); arm.position.set(ax, 0.75 * s, 0); g.add(arm); }
  for (const cx of [-0.6 * s, 0.6 * s]) { const cu = new THREE.Mesh(new THREE.BoxGeometry(1.0 * s, 0.28 * s, 1.0 * s), std({ color: color + 0x0a0a12, roughness: 0.98 })); cu.position.set(cx, 0.95 * s, 0.05 * s); g.add(cu); }
  return g;
}

// ---------- THRONE ROOM (north) ----------
let epkProxy = null;
function buildThrone() {
  const g = new THREE.Group(); g.position.set(0, 0, -18); scene.add(g);
  // dais + worn red carpet runner
  const dais = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 6.2, 0.7, 6), std({ color: 0x1a1030, roughness: 0.8 })); dais.position.y = 0.35; dais.receiveShadow = true; g.add(dais);
  const carpet = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 20), std({ color: 0x5a1030, roughness: 0.95, emissive: C(0x2a0010), emissiveIntensity: 0.25 })); carpet.rotation.x = -Math.PI / 2; carpet.position.set(0, 0.03, 11); g.add(carpet);
  // the giant sofa throne
  const throne = buildCouch({ color: 0x3a2a6a, s: 2.2 }); throne.position.set(0, 0.7, 0); g.add(throne);
  // a crown floating over it
  const crown = new THREE.Group(); crown.position.set(0, 5.6, -0.5);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.35, 20, 1, true), std({ color: 0xffd24a, metalness: 0.9, roughness: 0.25, emissive: C(0x6a5010), emissiveIntensity: 0.5, side: THREE.DoubleSide })); crown.add(band);
  for (let i = 0; i < 6; i++) { const sp = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.5, 6), std({ color: 0xffd24a, metalness: 0.9, roughness: 0.25, emissive: C(0x6a5010), emissiveIntensity: 0.5 })); const a = (i / 6) * Math.PI * 2; sp.position.set(Math.cos(a) * 0.7, 0.35, Math.sin(a) * 0.7); crown.add(sp); }
  g.add(crown);
  // banners behind the throne
  for (const bx of [-4, 4]) { const ban = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 5), std({ color: 0x2a1a55, roughness: 0.9, emissive: C(0x140a30), emissiveIntensity: 0.4, side: THREE.DoubleSide })); ban.position.set(bx, 3.4, -3.4); g.add(ban); }
  // throne spotlight (the sad single light)
  const spot = new THREE.SpotLight(0x9aa0ff, 60, 30, Math.PI / 7, 0.5, 1.3); spot.position.set(0, 16, 4); spot.target.position.set(0, 1, 0); g.add(spot); g.add(spot.target);
  // the EPK TV in front of the throne — the king watches it
  const tv = new THREE.Group(); tv.position.set(0, 0, 8); g.add(tv);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.8, 1.6), std({ color: 0x2a1c14, roughness: 0.7 })); cab.position.y = 1.9; cab.castShadow = true; tv.add(cab);
  const legs = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.5, 1.2), std({ color: 0x201410 })); legs.position.y = 0.3; tv.add(legs);
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; float n(vec2 p){return fract(sin(dot(p,vec2(12.9,78.2)))*43758.5);}
      void main(){ float scan=sin((v.y+t*0.3)*80.0)*0.5+0.5; float st=n(vec2(floor(v.x*30.0),floor(t*12.0)))*0.4;
        vec3 c=mix(vec3(0.14,0.16,0.6),vec3(0.0,0.9,1.0),v.x*0.6+0.2*sin(t+v.y*7.0)); c=c*(0.5+0.5*scan)+st; gl_FragColor=vec4(c,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 2.1), scrMat); scr.position.set(0, 1.9, 0.81); tv.add(scr);
  const cap = textPlane('SOFA KING // EPK', '#00f3ff'); cap.position.set(0, 3.6, 0.4); cap.scale.set(3, 0.5, 1); tv.add(cap);
  const tvl = new THREE.PointLight(0x3a6cff, 4, 12, 2); tvl.position.set(0, 2, 2); tv.add(tvl);
  epkProxy = new THREE.Mesh(new THREE.BoxGeometry(3.6, 3, 1.8), new THREE.MeshBasicMaterial({ visible: false })); epkProxy.position.set(0, 1.9, 0.4); tv.add(epkProxy);
  updaters.push((dt, t, p, wob) => { scrMat.uniforms.t.value = t; tvl.intensity = 3 + p * 3; spot.intensity = 45 + Math.sin(t * 1.5) * 8; });

  // the king himself, slumped on the throne
  const king = buildSofaBoi('#6a6cff'); king.group.scale.setScalar(1.5); king.group.position.set(0, 1.4, -0.3); g.add(king.group);
  updaters.push((dt, t, p) => { if (king.update) king.update(t, p); });
  // personal rain cloud over the throne
  buildRain(g, [0, 12, 0], 7);
}

// ---------- COUCH KINGDOM (a sea of couches) ----------
function buildCouchField() {
  const cols = [0x4a3a6a, 0x3a4a7a, 0x5a3a5a, 0x3a3a5a, 0x4a2a4a, 0x2a3a6a];
  const spots = [[-14, 2], [-9, 8], [-16, 10], [-6, 13], [-13, -2], [-19, 4], [12, 14], [7, 10], [16, 6], [10, 2], [-20, 14], [4, 16], [-3, 9], [18, 12]];
  spots.forEach(([x, z], i) => {
    const c = buildCouch({ color: cols[i % cols.length], s: 0.8 + (i % 3) * 0.25 });
    c.position.set(x, 0, z); c.rotation.y = (i * 1.7) % (Math.PI * 2);
    if (i % 5 === 0) { const c2 = buildCouch({ color: cols[(i + 2) % cols.length], s: 0.75 }); c2.position.set(x, 1.3, z); c2.rotation.y = c.rotation.y + 0.6; scene.add(c2); } // stacked
    scene.add(c);
  });
}

// ---------- BASS PIT (east) — subwoofers that wobble to the weird bass ----------
function buildBassPit() {
  const g = new THREE.Group(); scene.add(g);
  const pad = new THREE.Mesh(new THREE.BoxGeometry(16, 0.06, 22), std({ color: 0x0c0c22, roughness: 0.4, metalness: 0.4, emissive: C(0x10103a), emissiveIntensity: 0.3 })); pad.position.set(18, 0.03, 0); g.add(pad);
  const subs = [];
  const stack = (x, z, accent) => {
    const grp = new THREE.Group(); grp.position.set(x, 0, z);
    for (let i = 0; i < 4; i++) {
      const cab = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.4, 2.0), std({ color: 0x0a0a14, roughness: 0.85 })); cab.position.y = 0.7 + i * 1.42; cab.castShadow = true; grp.add(cab);
      const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.15, 20), std({ color: 0x14141e, emissive: C(accent), emissiveIntensity: 0.15, metalness: 0.4 })); cone.rotation.x = Math.PI / 2; cone.position.set(0, 0.7 + i * 1.42, 1.02); grp.add(cone); subs.push(cone);
    }
    const l = new THREE.PointLight(C(accent), 0, 12, 2); l.position.set(0, 4, 2); grp.add(l);
    g.add(grp); return l;
  };
  const lights = [stack(13, -7, '#6a6cff'), stack(13, 7, '#00f3ff'), stack(23, -7, '#b967ff'), stack(23, 7, '#2a3aff')];
  // strobe wash over the pit
  const strobe = new THREE.PointLight(0xffffff, 0, 24, 2); strobe.position.set(18, 9, 0); g.add(strobe);
  updaters.push((dt, t, p, wob) => {
    const punch = 1 + wob * 0.35;
    for (const s of subs) s.scale.set(1, 1, punch);
    for (const l of lights) l.intensity = 1.5 + wob * 6;
    strobe.intensity = p > 0.8 ? 8 : strobe.intensity * 0.8; // flash on the drop
  });
}

// ---------- rain over an area ----------
function buildRain(parent, center, radius) {
  const N = 240; const pos = new Float32Array(N * 3);
  const base = [];
  for (let i = 0; i < N; i++) {
    const x = center[0] + (Math.random() - 0.5) * radius * 2, y = center[1] * Math.random(), z = center[2] + (Math.random() - 0.5) * radius * 2;
    pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z; base.push([x, z]);
  }
  const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x9aa0ff, size: 0.09, transparent: true, opacity: 0.7, depthWrite: false }));
  parent.add(pts);
  updaters.push((dt) => {
    const a = geo.attributes.position.array;
    for (let i = 0; i < N; i++) { a[i * 3 + 1] -= dt * (7 + (i % 5)); if (a[i * 3 + 1] < 0) a[i * 3 + 1] = center[1]; }
    geo.attributes.position.needsUpdate = true;
  });
}

function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 34px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

buildThrone(); buildCouchField(); buildBassPit();

// ambient: cool indigo motes drifting in the rain + haze in the bass pit
updaters.push(addMotes(scene, { color: 0x9aa0ff, count: 200, area: [56, 16, 56], opacity: 0.4 }));
updaters.push(addHaze(scene, { color: 0x6a6cff, count: 8, center: [18, 3, 0], area: [14, 6, 18], scale: 8, opacity: 0.06 }));

// ---------- controls ----------
const controls = new WalkControls(camera, { bounds: 28, eye: 1.6, zMin: -28 });
controls.pos.set(0, 1.6, 15); controls.yaw = 0;

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
  if (epkProxy && ray.intersectObject(epkProxy, false)[0]) { openWindow('SOFA KING SAD BOI — EPK', EPK_URL); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -27, 27); g.z = THREE.MathUtils.clamp(g.z, -27, 27); controls.walkTo(g); }
}
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// zone labels + EPK hint
const zoneEl = document.getElementById('zone'), hintEl = document.getElementById('hint');
let curZone = '';
function zoneAt(p) { if (p.z < -9) return 'THE THRONE ROOM'; if (p.x > 8) return 'THE BASS PIT'; return 'THE COUCH KINGDOM'; }
function updateZone(p) {
  const z = zoneAt(p);
  if (z !== curZone) { curZone = z; if (zoneEl) { zoneEl.textContent = z; zoneEl.classList.add('show'); } }
  if (hintEl) hintEl.classList.toggle('show', Math.hypot(p.x, p.z + 10) < 8);
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
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const beatPhase = (t * (70 / 60)) % 1;
  const p = Math.pow(1 - beatPhase, 2.0);            // beat pulse
  const wob = 0.5 + 0.5 * Math.sin(t * 5.0) * Math.sin(t * 1.7); // dubstep wobble
  controls.update(dt);
  for (const u of updaters) u(dt, t, p, wob);
  updateZone(controls.pos);
  renderer.render(scene, camera);
}
controls.update(0);
renderer.render(scene, camera);

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (track) { track.volume = 0.5; track.play().catch(() => {}); }
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__sk = { controls, scene };
