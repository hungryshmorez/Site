import * as THREE from 'three';

// Sofa King's lounge: a small elevated riser (he sits on top, via his dest's
// `lift`), with beat-up couches below holding seated NPC silhouettes that look
// up at him and nod on the beat. Built facing -Z (the audience side).

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildLounge(scene, { pos = [14, 17], rot = 0, accent = '#6a6cff' } = {}) {
  const group = new THREE.Group();
  group.position.set(pos[0], 0, pos[1]);
  group.rotation.y = rot; // orient the whole cluster (audience side, -Z, toward center)
  scene.add(group);
  const col = new THREE.Color(accent);

  // ---- elevated riser ----
  const H = 1.0;
  const deck = new THREE.Mesh(new THREE.BoxGeometry(5, H, 4.5), std({ color: 0x14141f, roughness: 0.7, metalness: 0.3 }));
  deck.position.set(0, H / 2, 0); deck.castShadow = deck.receiveShadow = true; group.add(deck);
  const trim = new THREE.Mesh(new THREE.BoxGeometry(5.15, 0.09, 4.65), std({ color: 0x0a0a14, emissive: col, emissiveIntensity: 0.7 }));
  trim.position.set(0, H, 0); group.add(trim);
  // a step down the front (audience side, -Z)
  const step = new THREE.Mesh(new THREE.BoxGeometry(2.4, H * 0.5, 0.6), std({ color: 0x101019, roughness: 0.8 }));
  step.position.set(0, H * 0.25, -2.55); group.add(step);
  const glow = new THREE.PointLight(accent, 3, 11, 2); glow.position.set(0, H + 1.6, 0); group.add(glow);

  // ---- audience couches + seated NPCs (facing +Z, up at him) ----
  const couchMat = std({ color: 0x2a2c3a, roughness: 0.95 });
  const cushMat = std({ color: 0x22242f, roughness: 0.95 });
  const npcMat = std({ color: 0x05050a, roughness: 1 });
  const heads = [];
  const spots = [[-2.3, -3.4], [0.2, -3.4], [2.5, -3.9], [-1.1, -5.6], [1.6, -5.7]];
  for (const [cx, cz] of spots) {
    const c = new THREE.Group(); c.position.set(cx, 0, cz);
    c.rotation.y = (Math.random() - 0.5) * 0.4;             // beat-up = not perfectly aligned
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.3, 0.9), couchMat); seat.position.set(0, 0.42, 0); seat.castShadow = true; c.add(seat);
    const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 0.22), couchMat); back.position.set(0, 0.74, -0.5); c.add(back);
    for (const ax of [-0.85, 0.85]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.5, 0.95), couchMat); arm.position.set(ax, 0.53, 0); c.add(arm); }
    for (const kx of [-0.42, 0.42]) { const cu = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.2, 0.82), cushMat); cu.position.set(kx, 0.6, 0.02); cu.rotation.z = (Math.random() - 0.5) * 0.12; c.add(cu); }
    // seated NPC, looking up
    const seats = Math.random() < 0.5 ? [-0.42, 0.42] : [0];
    for (const nx of seats) {
      const npc = new THREE.Group(); npc.position.set(nx, 0, 0.05);
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, 0.32, 4, 8), npcMat); torso.position.set(0, 0.92, 0.02); torso.rotation.x = 0.12; npc.add(torso);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 10), npcMat); head.position.set(0, 1.3, 0.1); head.rotation.x = -0.3; npc.add(head); heads.push({ head, phase: Math.random() * 6.28 });
      for (const tx of [-0.13, 0.13]) { const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.34, 4, 8), npcMat); th.rotation.x = Math.PI / 2; th.position.set(tx, 0.58, 0.32); npc.add(th); }
      c.add(npc);
    }
    group.add(c);
  }

  function update(dt, time, pulse) {
    trim.material.emissiveIntensity = 0.5 + pulse * 0.7;
    glow.intensity = 2.4 + pulse * 1.6;
    for (const h of heads) h.head.rotation.x = -0.3 + Math.sin(time * 2.4 + h.phase) * (0.06 + pulse * 0.18); // nodding
  }

  return { update, group };
}
