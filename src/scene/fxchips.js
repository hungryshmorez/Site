import * as THREE from 'three';

// Hidden "shader chips" tucked in out-of-the-way spots. Reaching/clicking one
// unlocks its camera mode. Each is a small floating glyph cube with a glow.
// tryClick(ray) returns the mode id if a chip was hit (and hides it).

const CHIPS = [
  { mode: 'crt', pos: [0, 1.4, -30.5], accent: '#00f3ff' },       // behind the stage
  { mode: 'vhs', pos: [-24.5, 1.3, -2], accent: '#ff0055' },      // against the left grandstand
  { mode: 'ascii', pos: [24.5, 1.3, -2], accent: '#39ff14' },     // against the right grandstand
  { mode: 'gameboy', pos: [-4, 1.2, 24.5], accent: '#b967ff' },   // against the back grandstand
  { mode: 'wireframe', pos: [22, 1.3, -20], accent: '#e6c04a' },  // far back-right corner
];

export function buildFxChips(scene, { unlocked = [] } = {}) {
  const chips = [];
  for (const def of CHIPS) {
    if (unlocked.includes(def.mode)) continue; // already found — don't place
    const col = new THREE.Color(def.accent);
    const g = new THREE.Group();
    g.position.set(def.pos[0], def.pos[1], def.pos[2]);
    const cube = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x05050a, emissive: col, emissiveIntensity: 0.9, metalness: 0.5, roughness: 0.3 }));
    cube.castShadow = true; g.add(cube);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12),
      new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
    g.add(halo);
    const light = new THREE.PointLight(col, 2, 5, 2); g.add(light);
    const proxy = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ visible: false }));
    g.add(proxy); proxy.userData.mode = def.mode;
    scene.add(g);
    chips.push({ def, group: g, cube, halo, proxy, y: def.pos[1] });
  }

  function update(dt, time, pulse) {
    for (const c of chips) {
      c.cube.rotation.y += dt * 1.2; c.cube.rotation.x += dt * 0.6;
      c.group.position.y = c.y + Math.sin(time * 1.6 + c.def.pos[0]) * 0.18;
      c.halo.scale.setScalar(1 + pulse * 0.4 + Math.sin(time * 3) * 0.08);
    }
  }
  function tryClick(ray) {
    for (let i = 0; i < chips.length; i++) {
      if (ray.intersectObject(chips[i].proxy, false)[0]) {
        const mode = chips[i].def.mode;
        scene.remove(chips[i].group);
        chips.splice(i, 1);
        return mode;
      }
    }
    return null;
  }
  return { update, tryClick, count: chips.length };
}
