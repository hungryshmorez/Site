import * as THREE from 'three';

// DUNK TANK — a carnival dunk tank. Walk up, aim and click to throw a ball at
// the bullseye; hit it and the seat drops the dunkee into the water with a
// splash. Ballistic ball + target-hit detection, same feel as the hoop.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildDunkTank(scene, { pos = [5, 7], accent = '#00f3ff', onDunk } = {}) {
  const g = new THREE.Group();
  const [x, z] = pos;
  g.position.set(x, 0, z);
  g.rotation.y = 0; // bullseye faces +Z (toward the thrower / crowd)
  const col = new THREE.Color(accent);
  scene.add(g);

  // tank + water — a brighter carnival barrel so it doesn't read as a black blob
  const tank = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 1.8, 20), std({ color: 0x14506a, metalness: 0.4, roughness: 0.4, emissive: new THREE.Color(0x0a2a3a), emissiveIntensity: 0.35 })); tank.position.set(0, 0.9, -1.2); g.add(tank);
  // a glowing rim band at the waterline + a base ring, tying it to the accent
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.84, 1.84, 0.22, 20, 1, true), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.9, side: THREE.DoubleSide })); rim.position.set(0, 1.72, -1.2); g.add(rim);
  const baseRing = new THREE.Mesh(new THREE.CylinderGeometry(1.86, 1.9, 0.18, 20, 1, true), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.55, side: THREE.DoubleSide })); baseRing.position.set(0, 0.12, -1.2); g.add(baseRing);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.65, 0.3, 20), std({ color: 0x2aa8ff, transparent: true, opacity: 0.7, emissive: col, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.1 })); water.position.set(0, 1.7, -1.2); g.add(water);
  // frame + drop seat — candy-stripe uprights read as a carnival rig
  const frameMat = std({ color: 0xf4f0f6, metalness: 0.3, roughness: 0.5, emissive: col, emissiveIntensity: 0.12 });
  const stripeCv = document.createElement('canvas'); stripeCv.width = 16; stripeCv.height = 64; const sx0 = stripeCv.getContext('2d');
  for (let i = 0; i < 8; i++) { sx0.fillStyle = i % 2 ? '#ff2b5e' : '#f4f0f6'; sx0.fillRect(0, i * 8, 16, 8); }
  const stripeTex = new THREE.CanvasTexture(stripeCv); stripeTex.wrapS = stripeTex.wrapT = THREE.RepeatWrapping; stripeTex.repeat.set(1, 3); stripeTex.colorSpace = THREE.SRGBColorSpace;
  const poleMat = std({ map: stripeTex, roughness: 0.6, emissive: col, emissiveIntensity: 0.1 });
  for (const sx of [-1.7, 1.7]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.6, 8), poleMat); p.position.set(sx, 1.8, -1.2); g.add(p); }
  const bar = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.15, 0.15), frameMat); bar.position.set(0, 3.5, -1.2); g.add(bar);
  const seat = new THREE.Group(); seat.position.set(0, 2.9, -1.2); g.add(seat);
  const plank = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 0.5), std({ color: 0x3a2a16, roughness: 0.8 })); plank.position.set(0, 0, 0.3); seat.add(plank);
  // the dunkee (a nervous little guy)
  const dunkee = new THREE.Group(); dunkee.position.set(0, 0.5, 0.3); seat.add(dunkee);
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.3, 0.5, 4, 8), std({ color: 0xff6b35, roughness: 0.6, emissive: new THREE.Color(0x3a1400), emissiveIntensity: 0.3 })); body.position.y = 0.3; dunkee.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 12), std({ color: 0xfff2d6, roughness: 0.7 })); head.position.y = 0.95; dunkee.add(head);

  // bullseye target on an arm
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.6), frameMat); arm.position.set(1.7, 2.5, -0.4); arm.rotation.x = Math.PI / 2; g.add(arm);
  const target = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.12, 24), std({ color: 0xffffff, emissive: col, emissiveIntensity: 0.7, metalness: 0.3 }));
  target.rotation.x = Math.PI / 2; target.position.set(1.7, 2.5, 0.5); g.add(target);
  const bull = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.14, 20), new THREE.MeshBasicMaterial({ color: accent })); bull.rotation.x = Math.PI / 2; bull.position.set(1.7, 2.5, 0.52); g.add(bull);
  const gl = new THREE.PointLight(accent, 3, 10, 2); gl.position.set(0, 3, 1); g.add(gl);

  g.updateWorldMatrix(true, true);
  const targetW = new THREE.Vector3(); target.getWorldPosition(targetW);

  const BALLS = 6, balls = [];
  const ballGeo = new THREE.SphereGeometry(0.2, 14, 10);
  for (let i = 0; i < BALLS; i++) { const m = new THREE.Mesh(ballGeo, std({ color: 0xff0055, emissive: new THREE.Color(0x3a0010), emissiveIntensity: 0.4, roughness: 0.5 })); m.visible = false; scene.add(m); balls.push({ mesh: m, v: new THREE.Vector3(), active: false }); }
  const splashes = [];
  for (let i = 0; i < 20; i++) { const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 6, 6), new THREE.MeshBasicMaterial({ color: 0x8fdfff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(s); splashes.push({ mesh: s, v: new THREE.Vector3(), life: 0 }); }

  let dunks = 0, dropT = 0; // dropT>0 = dunkee is down
  const _fwd = new THREE.Vector3(), _flat = new THREE.Vector3(x, 0, z);
  const near = (p) => Math.hypot(p.x - x, p.z - z) < 8;
  function throwBall(camera) {
    const b = balls.find((x) => !x.active); if (!b) return;
    camera.getWorldDirection(_fwd);
    b.mesh.position.copy(camera.position).addScaledVector(_fwd, 0.7);
    b.v.copy(_fwd).multiplyScalar(15).add(new THREE.Vector3(0, 2.2, 0));
    b.active = true; b.mesh.visible = true;
  }
  function dunk() {
    dunks++; dropT = 2.6; if (onDunk) onDunk(dunks);
    // splash burst from the water
    for (const s of splashes) { s.mesh.position.copy(water.getWorldPosition(new THREE.Vector3())); s.v.set((Math.random() - 0.5) * 4, 4 + Math.random() * 3, (Math.random() - 0.5) * 4); s.life = 1; s.mesh.material.opacity = 1; }
  }
  function update(dt, time) {
    target.material.emissiveIntensity = 0.55 + Math.sin(time * 4) * 0.25;
    // dunkee: nervous idle when up; splashed down in the tank when hit
    if (dropT > 0) {
      dropT -= dt;
      seat.rotation.x = Math.min(1.3, seat.rotation.x + dt * 6); // seat flips
      if (dropT <= 0) seat.rotation.x = 0;
    } else {
      seat.rotation.x += (0 - seat.rotation.x) * Math.min(1, dt * 6);
      dunkee.position.y = 0.5 + Math.sin(time * 5) * 0.03;
    }
    for (const b of balls) {
      if (!b.active) continue;
      b.v.y -= 12 * dt; b.mesh.position.addScaledVector(b.v, dt); b.mesh.rotation.x += dt * 5;
      if (dropT <= 0 && b.mesh.position.distanceTo(targetW) < 0.7) { b.active = false; b.mesh.visible = false; dunk(); continue; }
      if (b.mesh.position.y < -1) { b.active = false; b.mesh.visible = false; }
    }
    for (const s of splashes) {
      if (s.life <= 0) continue;
      s.v.y -= 12 * dt; s.mesh.position.addScaledVector(s.v, dt); s.life -= dt * 0.5; s.mesh.material.opacity = Math.max(0, s.life);
    }
  }
  return { near, throwBall, update, worldPos: _flat, dunks: () => dunks };
}
