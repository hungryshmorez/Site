import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Physics } from './physics.js';
import { randomSeed } from './seed.js';
import { stepBallPits } from './ballpit_balls.js';
import { createBliss, blissTime } from './world_bliss.js';
import { createBackrooms } from './world_backrooms.js';
import { createHotel } from './world_hotel.js';
import { createPoolRooms } from './world_poolrooms.js';
import { createBallPit } from './world_ballpit.js';
import { createNight } from './world_night.js';
import { createTruman } from './world_truman.js';
import { createHallway } from './world_hallway.js';
import { createSkyroad } from './world_skyroad.js';
import { createMall } from './world_mall.js';
import { createStairwell } from './world_stairwell.js';
import { createHouse } from './world_house.js';
import { createSurface } from './world_moon.js';
import { createField } from './world_field.js';
import { createPlayground } from './world_playground.js';

// The fifteen realms of the Liminal Space Explorer, built right inside the Underground's scene.
// Each realm is generated once (from a seed) and kept hidden until you walk through its gate; entering
// hides the Underground, shows the realm and hands movement to the realm's own physics. Nothing loads.

const FACTORIES = [createBliss, createBackrooms, createHotel, createPoolRooms, createBallPit, createNight, createTruman, createHallway, createSkyroad, createMall, createStairwell, createHouse, createSurface, createField, createPlayground];
const INDOOR = [1, 2, 3, 4, 7, 9, 11, 14];   // no invisible walls: step out of the building and you fall out of the realm

const up = new THREE.Vector3(0, 1, 0), fwdV = new THREE.Vector3(), rightV = new THREE.Vector3(), wish = new THREE.Vector3();

export class Realms {
  constructor({ scene, renderer, camera, base = 'realms/', isMobile = false }) {
    this.scene = scene; this.renderer = renderer; this.camera = camera; this.isMobile = isMobile;
    this.worlds = []; this.active = null; this.hidden = []; this.saved = null;
    this.physics = new Physics(); this.feet = new THREE.Vector3(); this.vel = new THREE.Vector3(); this.body = { grounded: false };
    this.stepSmooth = 0; this.bobPhase = 0; this.queue = []; this.exitGate = null; this.exitArmed = true; this.onExit = null;
    const loader = new THREE.TextureLoader(), cache = new Map(), aniso = renderer.capabilities.getMaxAnisotropy();
    const loadTex = (url, rx = 1, ry = 1, srgb = true, tag = '') => {
      const key = [url, rx, ry, srgb, tag].join('|');
      if (cache.has(key)) return cache.get(key);
      const t = loader.load(base + url); cache.set(key, t);
      t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rx, ry); t.anisotropy = aniso; if (srgb) t.colorSpace = THREE.SRGBColorSpace;
      return t;
    };
    this.pmrem = new THREE.PMREMGenerator(renderer);
    this.ctx = { scene, renderer, pmrem: this.pmrem, roomEnv: null, loadTex, isMobile };
  }

  get roomEnv() { return (this.ctx.roomEnv ||= this.pmrem.fromScene(new RoomEnvironment(this.renderer), 0.04).texture); }

  // build one realm (once) and keep it hidden
  ensure(type) {
    if (this.worlds[type]) return this.worlds[type];
    this.ctx.roomEnv = this.roomEnv;
    let seed = randomSeed(); if (type === 0) while (blissTime(seed) !== 'day') seed = randomSeed();
    const w = FACTORIES[type](this.ctx, seed, 1);
    w.seed = seed;
    if (INDOOR.includes(type) && w.bounds) {
      const B = w.bounds, m = w.eye * 1.5, g = w.ground, F = { minX: B.minX - m, maxX: B.maxX + m, minZ: B.minZ - m, maxZ: B.maxZ + m };
      w.ground = (x, z) => (x < F.minX || x > F.maxX || z < F.minZ || z > F.maxZ) ? -1e4 : (g ? g(x, z) : 0);
      w.bounds = undefined; w.fallY = -w.eye * 6;
    }
    w.setVisible(false);
    this.worlds[type] = w;
    return w;
  }

  // build the rest a little at a time while you walk around, so a gate never makes you wait
  prebuild(types) {
    this.queue = types.filter((t) => !this.worlds[t]);
    if (this.timer) return;
    const next = () => { this.timer = null; if (this.active || !this.queue.length) { if (this.queue.length) this.timer = setTimeout(next, 3000); return; } try { this.ensure(this.queue.shift()); } catch (e) { console.error('realm build failed', e); } if (this.queue.length) this.timer = setTimeout(next, 2500); };
    this.timer = setTimeout(next, 2500);
  }

  enter(type) {
    const w = this.ensure(type), { scene, renderer, camera } = this;
    this.hidden = []; for (const c of scene.children) if (c.visible) { c.visible = false; this.hidden.push(c); }
    this.saved = { fog: scene.fog, background: scene.background, environment: scene.environment, exposure: renderer.toneMappingExposure, shadows: renderer.shadowMap.enabled, near: camera.near, far: camera.far, fov: camera.fov };
    w.setVisible(true);
    scene.fog = w.fog; scene.background = w.background; scene.environment = w.environment; renderer.toneMappingExposure = w.exposure ?? 1;
    camera.near = 0.1; camera.far = 2000; camera.fov = 70; camera.updateProjectionMatrix();
    this.physics.setWorld(w); this.active = w; this.type = type;
    const f = this.feet; f.copy(w.spawn); f.y = this.physics.supportAt(f, w.radius ?? 1.6, f.y + 50);
    this.vel.set(0, 0, 0); this.body.grounded = true; this.stepSmooth = 0;
    this.spawnYaw = w.spawnYaw ?? 0;
    this.buildExitGate(w);
    return { yaw: this.spawnYaw };
  }

  buildExitGate(w) {
    const e = w.eye, g = new THREE.Group(), mat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }), glow = new THREE.MeshBasicMaterial({ color: 0x4de8ff, transparent: true, opacity: 0.55, side: THREE.DoubleSide, toneMapped: false, depthWrite: false });
    const gw = e * 0.62, gh = e * 1.25, t = e * 0.05;
    for (const x of [-gw / 2, gw / 2]) { const m = new THREE.Mesh(new THREE.BoxGeometry(t, gh, t), mat); m.position.set(x, gh / 2, 0); g.add(m); }
    const top = new THREE.Mesh(new THREE.BoxGeometry(gw + t, t, t), mat); top.position.y = gh; g.add(top);
    const pane = new THREE.Mesh(new THREE.PlaneGeometry(gw, gh), glow); pane.position.y = gh / 2; g.add(pane);
    const back = new THREE.Vector3(Math.sin(this.spawnYaw), 0, Math.cos(this.spawnYaw)).multiplyScalar(e * 1.3);
    g.position.copy(this.feet).add(back); g.position.y = this.feet.y; g.rotation.y = this.spawnYaw;
    this.scene.add(g); this.exitGate = g; this.exitArmed = true; this.exitR = e * 0.55;
  }

  exit() {
    if (!this.active) return;
    const { scene, renderer, camera, saved } = this;
    this.active.setVisible(false); this.active = null;
    if (this.exitGate) { scene.remove(this.exitGate); this.exitGate.traverse((o) => { o.geometry?.dispose(); o.material?.dispose(); }); this.exitGate = null; }
    for (const c of this.hidden) c.visible = true; this.hidden = [];
    scene.fog = saved.fog; scene.background = saved.background; scene.environment = saved.environment; renderer.toneMappingExposure = saved.exposure;
    camera.near = saved.near; camera.far = saved.far; camera.fov = saved.fov; camera.updateProjectionMatrix();
    this.onExit?.();
  }

  jump() { const w = this.active; if (w && this.body.grounded) { this.vel.y = w.jump; this.body.grounded = false; } }

  // one frame inside a realm. input: { fwd, str, sprint } ; yaw/pitch in three space
  tick(dt, t, input, yaw, pitch) {
    const w = this.active, { feet, vel, body, camera } = this; if (!w) return;
    fwdV.set(-Math.sin(yaw), 0, -Math.cos(yaw)); rightV.crossVectors(fwdV, up).normalize();
    wish.set(0, 0, 0).addScaledVector(fwdV, input.fwd).addScaledVector(rightV, input.str);
    if (wish.lengthSq() > 1) wish.normalize();
    wish.multiplyScalar(w.speed * (input.sprint ? 1.6 : 1));
    const accel = body.grounded ? 12 : 2.5;
    vel.x += (wish.x - vel.x) * Math.min(1, accel * dt); vel.z += (wish.z - vel.z) * Math.min(1, accel * dt);
    w.beforeMove?.(feet, vel, body, dt, true);
    stepBallPits(w.group, feet, vel, dt);
    const opts = { radius: w.radius ?? 1.6, height: w.height ?? w.eye + 0.8, stepHeight: w.stepHeight ?? w.eye * 0.24, mantleHeight: w.mantleHeight ?? w.eye * 0.55, gravity: w.gravity, ceiling: w.ceiling, bounds: w.bounds };
    const sub = Math.max(1, Math.ceil(Math.hypot(vel.x, vel.z) * dt / 0.5)), prevY = feet.y;
    for (let i = 0; i < sub; i++) this.physics.move(feet, vel, body, dt / sub, opts);
    if (w.terminal && vel.y < -w.terminal) vel.y = -w.terminal;
    if (w.fallY !== undefined && feet.y < w.fallY) { this.exit(); return; }
    if (body.grounded) this.stepSmooth -= feet.y - prevY; else this.stepSmooth = 0;
    const maxLag = w.eye * 0.12; this.stepSmooth = Math.max(-maxLag, Math.min(maxLag, this.stepSmooth)) * Math.exp(-dt * 10);
    const hs = Math.hypot(vel.x, vel.z);
    if (body.grounded && hs > 0.5) this.bobPhase += hs * dt * (Math.PI / w.stride); else this.bobPhase += (Math.round(this.bobPhase / Math.PI) * Math.PI - this.bobPhase) * Math.min(1, dt * 6);
    const bob = Math.abs(Math.sin(this.bobPhase)) * w.eye * 0.035 * Math.min(1, hs / w.speed);
    camera.position.set(feet.x, feet.y + w.eye + bob + this.stepSmooth, feet.z);
    camera.rotation.set(pitch, yaw, 0, 'YXZ');
    const wrap = w.wrapY?.(feet); if (wrap) { feet.y += wrap; camera.position.y += wrap; }
    if (this.scene.environment !== w.environment) this.scene.environment = w.environment;
    w.update(camera.position, t, dt, camera, feet);
    const g = this.exitGate;
    if (g) {
      const d = Math.hypot(feet.x - g.position.x, feet.z - g.position.z);
      if (d > this.exitR * 2.6) this.exitArmed = true;
      if (this.exitArmed && d < this.exitR) { this.exitArmed = false; this.exit(); }
    }
  }
}
