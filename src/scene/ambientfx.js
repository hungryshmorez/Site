import * as THREE from 'three';

// Shared ambient-atmosphere helpers for the character worlds: drifting light
// motes and soft haze billboards. Each returns an update(dt, t) you push into
// the world's updater list. Cheap: one Points cloud / a handful of sprites.

export function addMotes(scene, { count = 200, color = 0xffe6b0, area = [54, 15, 60], center = [0, 0, -2], rise = 0.4, size = 0.09, opacity = 0.5 } = {}) {
  const pos = new Float32Array(count * 3), rs = [];
  for (let i = 0; i < count; i++) {
    pos[i * 3] = center[0] + (Math.random() - 0.5) * area[0];
    pos[i * 3 + 1] = Math.random() * area[1];
    pos[i * 3 + 2] = center[2] + (Math.random() - 0.5) * area[2];
    rs.push((0.4 + Math.random()) * rise);
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const p = new THREE.Points(g, new THREE.PointsMaterial({ color, size, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
  p.frustumCulled = false; scene.add(p);
  return (dt, t) => {
    const a = g.attributes.position.array;
    for (let i = 0; i < count; i++) { a[i * 3 + 1] += rs[i] * dt; a[i * 3] += Math.sin(t * 0.3 + i) * dt * 0.12; if (a[i * 3 + 1] > area[1]) a[i * 3 + 1] = 0; }
    g.attributes.position.needsUpdate = true;
  };
}

export function addHaze(scene, { count = 10, color = 0xaab4ff, area = [26, 6, 20], center = [0, 3, -10], scale = 8, opacity = 0.05 } = {}) {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const cc = new THREE.Color(color), rgb = `${(cc.r * 255) | 0},${(cc.g * 255) | 0},${(cc.b * 255) | 0}`;
  const r = x.createRadialGradient(64, 64, 0, 64, 64, 64);
  r.addColorStop(0, `rgba(${rgb},0.5)`); r.addColorStop(0.5, `rgba(${rgb},0.16)`); r.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = r; x.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sprites = [];
  for (let i = 0; i < count; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
    const sc = scale * (0.7 + Math.random() * 0.8); s.scale.set(sc, sc, 1);
    s.position.set(center[0] + (Math.random() - 0.5) * area[0], center[1] + Math.random() * area[1], center[2] + (Math.random() - 0.5) * area[2]);
    s.userData.d = 0.08 + Math.random() * 0.16; scene.add(s); sprites.push(s);
  }
  return (dt) => { for (const s of sprites) { s.position.y += s.userData.d * dt; if (s.position.y > center[1] + area[1]) s.position.y = center[1]; } };
}
