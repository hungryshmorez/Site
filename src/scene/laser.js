import * as THREE from 'three';

// AIMABLE LASER SHOW — a fan of beams from emitters across the top of the stage
// truss. Turn it on and the beams track wherever you look: sweep your view over
// the crowd, the walls, or up into the sky and the whole rig follows. Beat-
// reactive brightness + rolling hue. A bright spot marks where you're aiming.

export function buildLaserShow(scene, { emitters = [], spread = 3.2 } = {}) {
  const N = emitters.length;
  // one line segment (2 verts) per beam
  const pos = new Float32Array(N * 6);
  for (let i = 0; i < N; i++) {
    pos[i * 6 + 0] = emitters[i][0]; pos[i * 6 + 1] = emitters[i][1]; pos[i * 6 + 2] = emitters[i][2];
    pos[i * 6 + 3] = emitters[i][0]; pos[i * 6 + 4] = 0; pos[i * 6 + 5] = emitters[i][2];
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.LineBasicMaterial({ color: 0xff0055, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const lines = new THREE.LineSegments(geo, mat);
  lines.frustumCulled = false; scene.add(lines);

  // little emitter heads that glow when live
  const heads = [];
  for (const e of emitters) {
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), new THREE.MeshBasicMaterial({ color: 0xff0055 }));
    h.position.set(e[0], e[1], e[2]); h.visible = false; scene.add(h); heads.push(h);
  }
  // aim spot on the target
  const spot = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 12),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  spot.visible = false; scene.add(spot);

  const aim = new THREE.Vector3(0, 0, 0);
  const col = new THREE.Color();
  let active = false;

  function setAim(p) { aim.copy(p); }
  function setActive(v) {
    active = v; spot.visible = v; heads.forEach((h) => (h.visible = v));
    if (!v) mat.opacity = 0;
  }
  function toggle() { setActive(!active); return active; }

  function update(dt, time, pulse) {
    if (!active) return;
    const arr = geo.attributes.position.array;
    for (let i = 0; i < N; i++) {
      // fan: nudge each beam's target sideways so they spread, not converge to a dot
      const off = (i - (N - 1) / 2) * spread;
      arr[i * 6 + 3] = aim.x + off;
      arr[i * 6 + 4] = aim.y + Math.sin(time * 6 + i) * 0.4;
      arr[i * 6 + 5] = aim.z;
    }
    geo.attributes.position.needsUpdate = true;
    col.setHSL((time * 0.12) % 1, 1, 0.6);
    mat.color.copy(col);
    mat.opacity = 0.35 + pulse * 0.5;
    heads.forEach((h) => h.material.color.copy(col));
    spot.position.copy(aim);
    spot.material.color.copy(col);
    spot.material.opacity = 0.4 + pulse * 0.5;
    spot.scale.setScalar(1 + pulse * 0.8);
  }

  return { setAim, setActive, toggle, isActive: () => active, update };
}
