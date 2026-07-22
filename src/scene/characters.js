import * as THREE from 'three';
import { DESTINATIONS } from '../data/destinations.js';
import { MODELS } from './models.js';

// Places each destination in the world using its procedural model, wrapped
// with a ground aura, a clickable proxy, and a soft glow column. The HUD draws
// the floating name tag by projecting worldPos each frame.
export function buildCharacters(scene, { stageZ = -26 } = {}) {
  const list = [];

  for (const d of DESTINATIONS) {
    const color = new THREE.Color(d.accent);
    const group = new THREE.Group();
    const [x, , z] = d.pos;
    const y = d.onStage ? 1.6 : (d.lift || 0); // onStage = main deck; lift = a custom riser
    group.position.set(x, y, z);
    // face the crowd/stage-ish (or an explicit override)
    group.rotation.y = d.rot !== undefined ? d.rot : (d.onStage ? 0 : Math.atan2(0 - x, stageZ - z) + Math.PI);

    // build the character/structure model
    const built = (MODELS[d.model] || MODELS.glitch)(d.accent);
    group.add(built.group);

    // ground aura ring
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.35, 40),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; group.add(ring);

    // soft glow column
    const glow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.6, 1.0, 3.4, 20, 1, true),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.08, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glow.position.y = 1.7; group.add(glow);

    // invisible proxy for raycast (big + easy to tap)
    const proxy = new THREE.Mesh(new THREE.CylinderGeometry(1.3, 1.3, 3.2, 8), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.y = 1.5; group.add(proxy);
    proxy.userData.destId = d.id;

    scene.add(group);
    list.push({ dest: d, group, built, ring, glow, proxy, worldPos: new THREE.Vector3(x, 1.6 + y, z) });
  }

  function update(dt, time, pulse) {
    for (const c of list) {
      if (c.built.update) c.built.update(time, pulse);
      c.ring.scale.setScalar(1 + pulse * 0.5 + Math.sin(time * 2 + c.worldPos.x) * 0.05);
      c.ring.material.opacity = 0.3 + pulse * 0.4;
      c.glow.material.opacity = 0.06 + pulse * 0.12;
    }
  }

  return { list, proxies: list.map((c) => c.proxy), update };
}
