import * as THREE from 'three';

// DreamOS TV — a walk-in movie theater (its own lightweight page / Lab
// experiment). A big animated screen on channels, tiered seats, silhouette
// NPCs, and popcorn arcing through the projector haze. Back-portal → the Lab.

const canvas = document.getElementById('tv');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02030a);
scene.fog = new THREE.Fog(0x03040c, 9, 32);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 120);

const std = (o) => new THREE.MeshStandardMaterial(o);

// ---- room ----
const RW = 9, ZB = -13.5, ZF = 7, H = 6;
const wallMat = std({ color: 0x0a0b16, roughness: 0.96 });
function wall(w, h, pos, rot) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), wallMat);
  m.position.copy(pos); if (rot) m.rotation.copy(rot); scene.add(m); return m;
}
const floor = new THREE.Mesh(new THREE.PlaneGeometry(RW * 2, ZF - ZB), std({ color: 0x070810, roughness: 1 }));
floor.rotation.x = -Math.PI / 2; floor.position.set(0, 0, (ZB + ZF) / 2); scene.add(floor);
const ceil = new THREE.Mesh(new THREE.PlaneGeometry(RW * 2, ZF - ZB), std({ color: 0x05060d }));
ceil.rotation.x = Math.PI / 2; ceil.position.set(0, H, (ZB + ZF) / 2); scene.add(ceil);
wall(RW * 2, H, new THREE.Vector3(0, H / 2, ZB - 0.05));
wall(RW * 2, H, new THREE.Vector3(0, H / 2, ZF + 0.05), new THREE.Euler(0, Math.PI, 0));
wall(ZF - ZB, H, new THREE.Vector3(-RW, H / 2, (ZB + ZF) / 2), new THREE.Euler(0, Math.PI / 2, 0));
wall(ZF - ZB, H, new THREE.Vector3(RW, H / 2, (ZB + ZF) / 2), new THREE.Euler(0, -Math.PI / 2, 0));

// ---- the screen ----
const CHANNELS = [
  { name: 'ENTER THE VOID', col: 0xb060ff },
  { name: 'DEAD SIGNAL', col: 0xff2a4a },
  { name: 'DRIFTWAVE', col: 0xff6ab0 },
];
let chIndex = 0;
const screenMat = new THREE.ShaderMaterial({
  uniforms: { t: { value: 0 }, ch: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
  fragmentShader: `
    uniform float t; uniform float ch; varying vec2 vUv;
    float rand(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
    void main(){
      vec2 u=vUv; vec3 c;
      if(ch<0.5){
        vec2 p=u-0.5; float a=atan(p.y,p.x); float r=length(p);
        c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*3.0+t*1.5-r*14.0);
        c*=0.55+0.45*sin(a*8.0+t*2.0-r*22.0);
      } else if(ch<1.5){
        float n=rand(u+floor(t*20.0)*0.017);
        float scan=sin(u.y*180.0)*0.14;
        float bar=step(0.97,fract(u.y*2.0-t*0.6));
        c=vec3(n)*0.5+scan; c+=bar*vec3(1.0,0.0,0.4); c.r*=1.1;
      } else {
        vec3 top=vec3(0.30,0.08,0.45), bot=vec3(1.0,0.42,0.62);
        c=mix(bot,top,u.y);
        float sun=smoothstep(0.26,0.24,length((u-vec2(0.5,0.6))*vec2(1.0,1.15)));
        float band=step(0.55,fract(u.y*22.0-t*0.5));
        c=mix(c, vec3(1.0,0.85,0.4), sun*band);
      }
      c*=1.0-0.45*length(u-0.5);
      c*=0.92+0.08*sin(u.y*420.0);
      gl_FragColor=vec4(c,1.0);
    }`,
});
const SW = 15, SH = 6.4, SCY = 3.5;
const bezel = new THREE.Mesh(new THREE.PlaneGeometry(SW + 0.6, SH + 0.6), std({ color: 0x000000, roughness: 0.5 }));
bezel.position.set(0, SCY, ZB + 0.04); scene.add(bezel);
const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), screenMat);
screen.position.set(0, SCY, ZB + 0.06); scene.add(screen);

// projector wash + ambient
const screenLight = new THREE.PointLight(CHANNELS[0].col, 3.6, 54, 2);
screenLight.position.set(0, SCY, ZB + 5); scene.add(screenLight);
scene.add(new THREE.AmbientLight(0x1a2138, 0.55));
// a faint downlight at the back so the entrance/aisle reads
const back = new THREE.PointLight(0x33406a, 0.8, 18, 2); back.position.set(0, H - 0.5, ZF - 1); scene.add(back);

// ---- seats (tiered, center aisle) ----
const COLS = [-7, -5.85, -4.7, -3.55, -2.4, 2.4, 3.55, 4.7, 5.85, 7];
const ROWS = isMobile ? 6 : 8;
const seats = [];
for (let r = 0; r < ROWS; r++) {
  const z = -8 + r * 1.65, y = r * 0.14;
  for (const x of COLS) seats.push({ x, y, z });
}
const seatMat = std({ color: 0x3a1522, roughness: 0.85 });
const baseM = new THREE.InstancedMesh(new THREE.BoxGeometry(0.85, 0.28, 0.8), seatMat, seats.length);
const backM = new THREE.InstancedMesh(new THREE.BoxGeometry(0.85, 0.9, 0.2), seatMat, seats.length);
const dummy = new THREE.Object3D();
seats.forEach((s, i) => {
  dummy.position.set(s.x, s.y + 0.35, s.z); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); baseM.setMatrixAt(i, dummy.matrix);
  dummy.position.set(s.x, s.y + 0.85, s.z - 0.32); dummy.updateMatrix(); backM.setMatrixAt(i, dummy.matrix);
});
scene.add(baseM, backM);

// ---- silhouette NPCs in ~55% of seats ----
const npc = seats.filter(() => Math.random() < 0.55);
const npcMat = std({ color: 0x050509, roughness: 1 });
const bodyM = new THREE.InstancedMesh(new THREE.CapsuleGeometry(0.27, 0.5, 4, 8), npcMat, npc.length);
const headM = new THREE.InstancedMesh(new THREE.SphereGeometry(0.2, 12, 10), npcMat, npc.length);
npc.forEach((s, i) => {
  dummy.position.set(s.x, s.y + 0.92, s.z - 0.12); dummy.rotation.set(0, 0, 0); dummy.updateMatrix(); bodyM.setMatrixAt(i, dummy.matrix);
  dummy.position.set(s.x, s.y + 1.4, s.z - 0.12); dummy.updateMatrix(); headM.setMatrixAt(i, dummy.matrix);
});
scene.add(bodyM, headM);

// ---- popcorn ----
const POP = isMobile ? 28 : 48;
const popM = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.05, 6, 6),
  new THREE.MeshStandardMaterial({ color: 0xfff2c0, emissive: 0x3a3012, emissiveIntensity: 0.5, roughness: 0.6 }),
  POP
);
popM.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(popM);
const kernels = Array.from({ length: POP }, () => ({ active: false, p: new THREE.Vector3(), v: new THREE.Vector3() }));
const hidden = new THREE.Object3D(); hidden.scale.setScalar(0); hidden.updateMatrix();
for (let i = 0; i < POP; i++) popM.setMatrixAt(i, hidden.matrix);
popM.instanceMatrix.needsUpdate = true;

function spawnPopcorn() {
  if (!npc.length) return;
  const k = kernels.find((x) => !x.active); if (!k) return;
  const s = npc[(Math.random() * npc.length) | 0];
  k.active = true;
  k.p.set(s.x + (Math.random() - 0.5) * 0.3, s.y + 1.55, s.z - 0.1);
  k.v.set((Math.random() - 0.5) * 1.4, 3.4 + Math.random() * 1.6, -1.6 - Math.random() * 1.8);
}
let popTimer = 0;
function updatePopcorn(dt) {
  popTimer -= dt;
  if (popTimer <= 0) { const n = 1 + ((Math.random() * 3) | 0); for (let j = 0; j < n; j++) spawnPopcorn(); popTimer = 0.5 + Math.random() * 0.9; }
  let dirty = false;
  for (let i = 0; i < POP; i++) {
    const k = kernels[i];
    if (!k.active) continue;
    k.v.y -= 9.8 * dt;
    k.p.addScaledVector(k.v, dt);
    if (k.p.y < 0.05) { k.active = false; popM.setMatrixAt(i, hidden.matrix); dirty = true; continue; }
    dummy.position.copy(k.p); dummy.rotation.set(k.p.x * 3, k.p.z * 3, 0); dummy.scale.setScalar(1); dummy.updateMatrix();
    popM.setMatrixAt(i, dummy.matrix); dirty = true;
  }
  if (dirty) popM.instanceMatrix.needsUpdate = true;
}

// ---- first-person controller (clamped to the room) ----
const player = { pos: new THREE.Vector3(0, 1.6, 5.6), yaw: 0, pitch: -0.03, keys: new Set(), target: null };
const _t = new THREE.Vector3();
function look(dx, dy) {
  player.yaw -= dx * 0.0045;
  player.pitch = THREE.MathUtils.clamp(player.pitch - dy * 0.0045, -0.6, 0.5);
}
function applyCam() {
  camera.position.copy(player.pos);
  _t.set(
    player.pos.x - Math.sin(player.yaw) * Math.cos(player.pitch),
    player.pos.y + Math.sin(player.pitch),
    player.pos.z - Math.cos(player.yaw) * Math.cos(player.pitch)
  );
  camera.lookAt(_t);
}
function moveUpdate(dt) {
  const k = player.keys;
  const fwd = (k.has('w') || k.has('arrowup') ? 1 : 0) - (k.has('s') || k.has('arrowdown') ? 1 : 0);
  const str = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0);
  const run = k.has('shift') ? 1.7 : 1, sp = 4.6;
  if (fwd || str) {
    const s = Math.sin(player.yaw), c = Math.cos(player.yaw);
    let vx = (-s * fwd + c * str), vz = (-c * fwd - s * str);
    const l = Math.hypot(vx, vz) || 1; vx /= l; vz /= l;
    player.pos.x += vx * sp * run * dt; player.pos.z += vz * sp * run * dt;
    player.target = null;
  } else if (player.target) {
    _t.subVectors(player.target, player.pos); _t.y = 0;
    if (_t.length() < 1) player.target = null;
    else { _t.normalize(); player.pos.x += _t.x * sp * dt; player.pos.z += _t.z * sp * dt; player.yaw = easeAngle(player.yaw, Math.atan2(-_t.x, -_t.z), 1 - Math.pow(0.002, dt)); }
  }
  player.pos.x = THREE.MathUtils.clamp(player.pos.x, -RW + 0.8, RW - 0.8);
  player.pos.z = THREE.MathUtils.clamp(player.pos.z, ZB + 1.5, ZF - 0.7);
  applyCam();
}
function easeAngle(a, b, t) { let d = ((b - a + Math.PI) % (Math.PI * 2)) - Math.PI; return a + d * t; }

// ---- input ----
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; canvas.classList.add('drag'); });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { canvas.classList.remove('drag'); if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  if (ray.intersectObject(screen, false)[0]) { setChannel(chIndex + 1); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) player.target = g;
}
addEventListener('keydown', (e) => { const k = e.key.toLowerCase(); if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(k)) { player.keys.add(k); player.target = null; } });
addEventListener('keyup', (e) => player.keys.delete(e.key.toLowerCase()));
addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- channel UI ----
const chNameEl = document.getElementById('chName'), chNoEl = document.getElementById('chNo');
function setChannel(i) {
  chIndex = ((i % CHANNELS.length) + CHANNELS.length) % CHANNELS.length;
  screenMat.uniforms.ch.value = chIndex;
  screenLight.color.setHex(CHANNELS[chIndex].col);
  if (chNameEl) chNameEl.textContent = CHANNELS[chIndex].name;
  if (chNoEl) chNoEl.textContent = 'CH ' + String(chIndex + 1).padStart(2, '0');
}
document.getElementById('nextCh').onclick = () => setChannel(chIndex + 1);
document.getElementById('prevCh').onclick = () => setChannel(chIndex - 1);

// ---- back portal → the Lab ----
document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'index.html'; }, 480);
};

// ---- loop ----
const clock = new THREE.Clock();
let running = false;
function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;
  screenMat.uniforms.t.value = time;
  screenLight.intensity = 3.2 + Math.sin(time * 24) * 0.28 + Math.random() * 0.4; // projector flicker
  moveUpdate(dt);
  updatePopcorn(dt);
  renderer.render(scene, camera);
}
applyCam();
renderer.render(scene, camera); // one frame behind the overlay

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

if (import.meta.env.DEV) window.__tv = { player, setChannel, applyCam, scene };
