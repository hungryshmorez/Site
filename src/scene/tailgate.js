import * as THREE from 'three';

// Tanky's tailgate: a lifted low-poly truck (tailgate down) in one group, and a
// SEPARATE beer-pong table (with NPCs tossing ping-pong balls into the cups) in
// its own group so the two can be placed independently. Each is built in local
// space facing +Z, then positioned by the caller.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildTailgate(scene, { pos = [15, -7], rot = -0.9, pongPos = null, pongRot = null, accent = '#e6c04a', onScore } = {}) {
  const col = new THREE.Color(accent);
  const bodyMat = std({ color: 0x7a1424, metalness: 0.6, roughness: 0.28 });   // glossy deep red
  const glass = std({ color: 0x05080f, metalness: 0.4, roughness: 0.15, emissive: col, emissiveIntensity: 0.05 });
  const chrome = std({ color: 0x9aa0aa, metalness: 0.9, roughness: 0.25 });
  const tire = std({ color: 0x0a0a0e, roughness: 0.9 });

  // ---- lifted truck (its own group; rear/tailgate faces +Z) ----
  const group = new THREE.Group();
  group.position.set(pos[0], 0, pos[1]); group.rotation.y = rot; scene.add(group);
  const truck = new THREE.Group(); truck.position.set(0, 0, 0); group.add(truck);
  const L = 1.15; // lift
  const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 2.6), bodyMat); bed.position.set(0, L + 0.35, 0.8); bed.castShadow = true; truck.add(bed);
  const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.5, 0.75), std({ color: 0xd6d8dc, roughness: 0.6 })); cooler.position.set(-0.5, L + 0.95, 0.9); cooler.castShadow = true; truck.add(cooler);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.09, 0.78), std({ color: 0xc02f2f, roughness: 0.5 })); lid.position.set(-0.5, L + 1.24, 0.9); truck.add(lid);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 2.0), bodyMat); cab.position.set(0, L + 0.55, -1.1); cab.castShadow = true; truck.add(cab);
  const cabTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.7), glass); cabTop.position.set(0, L + 1.4, -1.05); truck.add(cabTop);
  const hood = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 1.2), bodyMat); hood.position.set(0, L + 0.35, -2.6); hood.castShadow = true; truck.add(hood);
  const gate = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.7, 0.1), bodyMat); gate.position.set(0, L + 0.03, 2.15); gate.rotation.x = -Math.PI / 2; truck.add(gate);
  const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.25, 0.2), chrome); bumper.position.set(0, L - 0.1, -3.25); truck.add(bumper);
  for (const sx of [-0.85, 0.85]) { const hl = new THREE.Mesh(new THREE.CircleGeometry(0.17, 16), new THREE.MeshBasicMaterial({ color: 0xfff2c0 })); hl.position.set(sx, L + 0.35, -3.21); hl.rotation.y = Math.PI; truck.add(hl); }
  for (const sx of [-0.9, 0.9]) { const tl = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.18), new THREE.MeshBasicMaterial({ color: 0xff2a2a })); tl.position.set(sx, L + 0.45, 2.11); truck.add(tl); }
  for (const [tx, tz] of [[-1.25, -2.0], [1.25, -2.0], [-1.25, 1.3], [1.25, 1.3]]) {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.55, 20), tire); w.rotation.z = Math.PI / 2; w.position.set(tx, 0.72, tz); w.castShadow = true; truck.add(w);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.57, 10), chrome); hub.rotation.z = Math.PI / 2; hub.position.set(tx, 0.72, tz); truck.add(hub);
  }
  const underglow = new THREE.PointLight(accent, 2, 6, 2); underglow.position.set(0, 0.2, -1); truck.add(underglow);

  // ---- beer-pong table: its OWN group, placed independently ----
  const pong = new THREE.Group();
  const pp = pongPos || [pos[0], pos[1] + 4]; // default: just off the tailgate
  pong.position.set(pp[0], 0, pp[1]); pong.rotation.y = (pongRot != null ? pongRot : rot); scene.add(pong);

  const top = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 3.0), std({ color: 0x203040, roughness: 0.5, metalness: 0.3, emissive: col, emissiveIntensity: 0.06 }));
  top.position.set(0, 0.9, 0); top.castShadow = true; pong.add(top);
  for (const [lx, lz] of [[-0.5, -1.3], [0.5, -1.3], [-0.5, 1.3], [0.5, 1.3]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), std({ color: 0x14141c, metalness: 0.6, roughness: 0.4 })); leg.position.set(lx, 0.45, lz); pong.add(leg); }
  const cupMat = std({ color: 0xd11e2a, roughness: 0.6, emissive: new THREE.Color(0xd11e2a), emissiveIntensity: 0.25 });
  const rackRows = [[0], [-0.16, 0.16], [-0.32, 0, 0.32]];
  const cups = []; // { mesh, sunk } — for the playable toss
  function rack(zBase, dir) {
    rackRows.forEach((row, ri) => row.forEach((cx) => {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.05, 0.16, 12), cupMat);
      cup.position.set(cx, 0.98, zBase + dir * ri * 0.16); pong.add(cup);
      cups.push({ mesh: cup, sunk: false });
    }));
  }
  rack(-1.2, 1);  // one end
  rack(1.2, -1);  // far end

  const marker = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.04, 10, 28), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
  marker.rotation.x = Math.PI / 2; marker.position.set(0, 2.2, 0); pong.add(marker);
  const markerLight = new THREE.PointLight(accent, 2.5, 7, 2); markerLight.position.set(0, 1.6, 0); pong.add(markerLight);

  // ---- NPC players around the table ----
  const npcMat = std({ color: 0x05050a, roughness: 1 });
  const players = [[-1.15, 2.0, -1], [1.15, 2.0, -1], [-1.15, -2.0, 1]]; // [x, z, tossDir]
  for (const [nx, nz] of players) {
    const rg = new THREE.Group(); rg.position.set(nx, 0, nz); rg.rotation.y = Math.atan2(0 - nx, 0 - nz);
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.7, 4, 8), npcMat); body.position.y = 0.85; body.castShadow = true; rg.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), npcMat); head.position.y = 1.45; rg.add(head);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.4, 4, 6), npcMat); arm.position.set(0.2, 1.15, 0.25); arm.rotation.x = -1.1; rg.add(arm);
    pong.add(rg);
  }

  // ---- NPC ping-pong tosses (instanced, cosmetic) ----
  const POOL = 10;
  const ballM = new THREE.InstancedMesh(new THREE.SphereGeometry(0.05, 8, 8),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x333333, emissiveIntensity: 0.3, roughness: 0.5 }), POOL);
  ballM.instanceMatrix.setUsage(THREE.DynamicDrawUsage); pong.add(ballM);
  const balls = Array.from({ length: POOL }, () => ({ active: false, p: new THREE.Vector3(), v: new THREE.Vector3() }));
  const hide = new THREE.Object3D(); hide.scale.setScalar(0); hide.updateMatrix();
  for (let i = 0; i < POOL; i++) ballM.setMatrixAt(i, hide.matrix);
  ballM.instanceMatrix.needsUpdate = true;
  const dummy = new THREE.Object3D();
  let tmr = 0;
  function toss() {
    const k = balls.find((b) => !b.active); if (!k) return;
    const pl = players[(Math.random() * players.length) | 0];
    const dir = pl[2];
    k.active = true;
    k.p.set(pl[0] + (Math.random() - 0.5) * 0.3, 1.35, pl[1]);
    const targetZ = dir > 0 ? 1.2 : -1.2;
    const dz = targetZ - pl[1], flight = 0.62;
    k.v.set((0 - pl[0]) * 0.15, 2.9, dz / flight + (Math.random() - 0.5) * 0.3);
  }

  // ---- the PLAYABLE toss: world-space balls you throw by aiming + clicking ----
  // world anchors are recomputed live (the table can be moved by the editor).
  const _wc = new THREE.Vector3();
  function tableCenter() { return pong.localToWorld(_wc.set(0, 0.98, 0)); }
  const PBALLS = 6, pBalls = [];
  const pGeo = new THREE.SphereGeometry(0.06, 12, 10);
  for (let i = 0; i < PBALLS; i++) {
    const m = new THREE.Mesh(pGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x666666, emissiveIntensity: 0.4, roughness: 0.5 }));
    m.visible = false; scene.add(m); pBalls.push({ mesh: m, v: new THREE.Vector3(), active: false, scored: false });
  }
  let made = 0;
  const _fwd = new THREE.Vector3(), _tc = new THREE.Vector3();
  function near(playerPos) { const c = tableCenter(); return Math.hypot(playerPos.x - c.x, playerPos.z - c.z) < 8; }
  function throwBall(camera) {
    const b = pBalls.find((x) => !x.active); if (!b) return;
    camera.getWorldDirection(_fwd);
    b.mesh.position.copy(camera.position).addScaledVector(_fwd, 0.6);
    b.v.copy(_fwd).multiplyScalar(8).add(new THREE.Vector3(0, 3.6, 0));
    b.active = true; b.mesh.visible = true; b.scored = false;
  }
  function resetCups() { cups.forEach((c) => { c.sunk = false; c.mesh.visible = true; }); }

  function update(dt, time, pulse) {
    underglow.intensity = 1.6 + pulse * 1.4;
    marker.material.opacity = 0.55 + Math.sin(time * 3) * 0.25 + pulse * 0.2;
    marker.position.y = 2.2 + Math.sin(time * 1.6) * 0.12;
    tmr -= dt; if (tmr <= 0) { toss(); tmr = 0.7 + Math.random() * 0.9; }
    let dirty = false;
    for (let i = 0; i < POOL; i++) {
      const b = balls[i]; if (!b.active) continue;
      b.v.y -= 12 * dt; b.p.addScaledVector(b.v, dt);
      if (b.p.y < 0.9) { b.active = false; ballM.setMatrixAt(i, hide.matrix); dirty = true; continue; }
      dummy.position.copy(b.p); dummy.scale.setScalar(1); dummy.updateMatrix(); ballM.setMatrixAt(i, dummy.matrix); dirty = true;
    }
    if (dirty) ballM.instanceMatrix.needsUpdate = true;

    // player toss physics + cup scoring (cup world positions computed live)
    for (const b of pBalls) {
      if (!b.active) continue;
      const py = b.mesh.position.y;
      b.v.y -= 11 * dt; b.mesh.position.addScaledVector(b.v, dt);
      if (!b.scored && py > 1.06 && b.mesh.position.y <= 1.06) {
        for (const c of cups) {
          if (c.sunk) continue;
          c.mesh.getWorldPosition(_tc);
          if (Math.hypot(b.mesh.position.x - _tc.x, b.mesh.position.z - _tc.z) < 0.16) {
            c.sunk = true; c.mesh.visible = false; b.scored = true; made++;
            if (onScore) onScore(made, cups.filter((k) => !k.sunk).length);
            if (cups.every((k) => k.sunk)) setTimeout(resetCups, 1200);
            break;
          }
        }
      }
      if (b.mesh.position.y < 0.5) { b.active = false; b.mesh.visible = false; }
    }
  }

  return { update, near, throwBall, made: () => made, group, pong };
}
