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
    // everything faces the CENTER of the grounds (front = +Z), so the whole
    // build reads as pointing inward. Stage acts face out; `rot` still overrides.
    const CX = 0, CZ = -4;
    group.rotation.y = d.rot !== undefined ? d.rot : (d.onStage ? 0 : Math.atan2(CX - x, CZ - z));

    // build the character/structure model
    const built = (MODELS[d.model] || MODELS.glitch)(d.accent, d.modelLabel);
    group.add(built.group);

    // ground aura ring + a soft filled pad, so each act reads as a "stand here"
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.35, 40),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    ring.rotation.x = -Math.PI / 2; ring.position.y = 0.02; group.add(ring);
    const pad = new THREE.Mesh(
      new THREE.CircleGeometry(1.0, 32),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    pad.rotation.x = -Math.PI / 2; pad.position.y = 0.015; group.add(pad);

    // beacon beam — a tall, tapered light column so each act is visible as a
    // landmark from across the dark grounds (wayfinding), fading out at the top.
    const glow = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 1.1, 9, 20, 1, true),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.13, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glow.position.y = 4.5; group.add(glow);

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
      c.glow.material.opacity = 0.1 + pulse * 0.14;               // beacon breathes to the beat
    }
  }

  return { list, proxies: list.map((c) => c.proxy), update };
}
