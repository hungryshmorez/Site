import * as THREE from 'three';

// Confetti burst — a pool of little fluttering paper bits that rain down on the
// beat drop. Cheap: reused meshes with simple gravity + sway + tumble.

const COLORS = [0x00f3ff, 0xff0055, 0x39ff14, 0xffd24a, 0xb967ff, 0xff6b35];

export function buildConfetti(scene, { count = 180 } = {}) {
  if (matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600) count = 80; // fewer bits on phones
  const geo = new THREE.PlaneGeometry(0.16, 0.26);
  const bits = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: COLORS[i % COLORS.length], side: THREE.DoubleSide, transparent: true, opacity: 0, depthWrite: false }));
    m.visible = false; scene.add(m);
    bits.push({ m, v: new THREE.Vector3(), spin: new THREE.Vector3(), life: 0 });
  }
  let idx = 0;
  function burst(origin, n = 80) {
    for (let k = 0; k < n; k++) {
      const b = bits[idx]; idx = (idx + 1) % bits.length;
      b.m.position.set(origin.x + (Math.random() - 0.5) * 10, origin.y + Math.random() * 2, origin.z + (Math.random() - 0.5) * 10);
      b.v.set((Math.random() - 0.5) * 3.5, 1.5 + Math.random() * 3.5, (Math.random() - 0.5) * 3.5);
      b.spin.set(Math.random() * 9, Math.random() * 9, Math.random() * 9);
      b.life = 1; b.m.visible = true; b.m.material.opacity = 1;
    }
  }
  function update(dt) {
    for (const b of bits) {
      if (b.life <= 0) continue;
      b.v.y -= 4.2 * dt; b.v.x += Math.sin(b.m.position.y * 2 + b.spin.z) * dt * 0.7; // flutter
      b.m.position.addScaledVector(b.v, dt);
      b.m.rotation.x += b.spin.x * dt; b.m.rotation.y += b.spin.y * dt; b.m.rotation.z += b.spin.z * dt;
      b.life -= dt * 0.3; b.m.material.opacity = Math.max(0, Math.min(1, b.life));
      if (b.m.position.y < -1 || b.life <= 0) { b.life = 0; b.m.visible = false; }
    }
  }
  return { burst, update };
}
