import * as THREE from 'three';

// Effect ORBS scattered in out-of-the-way spots. Click/reach one to pick it up
// and carry it; deliver it to the dealer and that effect goes "in stock" as a
// buyable, time-limited drug. tryClick(ray) returns the orb's id (and removes it).

// All within the walkable field (|x| <= 24, z in [-30, 24]) so every orb is
// actually reachable — tucked near an edge but never inside/behind a wall.
const SPOTS = {
  crt: { pos: [8, 1.5, -20], accent: '#00f3ff' },        // out front of the stage
  vhs: { pos: [-20, 1.4, -8], accent: '#ff0055' },       // left flank, open floor
  ascii: { pos: [20, 1.4, 4], accent: '#39ff14' },       // right flank, open floor
  gameboy: { pos: [-18, 1.3, 14], accent: '#b967ff' },   // lower-left, near the board
  wireframe: { pos: [20, 1.4, -20], accent: '#e6c04a' }, // back-right corner
};

export function buildOrbs(scene, { need = [] } = {}) {
  const orbs = [];
  for (const id of need) {
    const def = SPOTS[id]; if (!def) continue;
    const col = new THREE.Color(def.accent);
    const g = new THREE.Group();
    g.position.set(def.pos[0], def.pos[1], def.pos[2]);
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 1), new THREE.MeshStandardMaterial({ color: 0x05050a, emissive: col, emissiveIntensity: 1.1, metalness: 0.4, roughness: 0.3 }));
    g.add(core);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false }));
    g.add(halo);
    const light = new THREE.PointLight(col, 2.4, 6, 2); g.add(light);
    const proxy = new THREE.Mesh(new THREE.SphereGeometry(0.95, 8, 6), new THREE.MeshBasicMaterial({ visible: false })); g.add(proxy);
    scene.add(g);
    orbs.push({ id, group: g, core, halo, y: def.pos[1], proxy });
  }

  function update(dt, time, pulse) {
    for (const o of orbs) {
      o.core.rotation.y += dt * 1.4; o.core.rotation.x += dt * 0.7;
      o.group.position.y = o.y + Math.sin(time * 1.7 + o.group.position.x) * 0.2;
      o.halo.scale.setScalar(1 + pulse * 0.5 + Math.sin(time * 3) * 0.1);
    }
  }
  function tryClick(ray) {
    for (let i = 0; i < orbs.length; i++) {
      if (ray.intersectObject(orbs[i].proxy, false)[0]) {
        const id = orbs[i].id; scene.remove(orbs[i].group); orbs.splice(i, 1); return id;
      }
    }
    return null;
  }
  // near-check so you can also just walk into an orb to grab it
  function pickNear(playerPos, radius = 2.4) {
    for (let i = 0; i < orbs.length; i++) {
      const p = orbs[i].group.position;
      if (Math.hypot(playerPos.x - p.x, playerPos.z - p.z) < radius) {
        const id = orbs[i].id; scene.remove(orbs[i].group); orbs.splice(i, 1); return id;
      }
    }
    return null;
  }
  return { update, tryClick, pickNear, count: () => orbs.length };
}
