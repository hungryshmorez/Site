import * as THREE from 'three';

// A neon basketball hoop. Walk near it and click to shoot a ball along your
// aim with an arc; sink it through the ring to score. Reuses simple ballistic
// physics. Faces the center of the grounds.

export function buildHoop(scene, { pos = [11, 8], accent = '#ff6b35', onScore } = {}) {
  const g = new THREE.Group();
  g.position.set(pos[0], 0, pos[1]);
  g.rotation.y = Math.atan2(0 - pos[0], -4 - pos[1]); // face center
  const col = new THREE.Color(accent);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 3.4, 10), new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.6, roughness: 0.5 }));
  pole.position.set(0, 1.7, -0.6); pole.castShadow = true; g.add(pole);
  const board = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.25, 0.08), new THREE.MeshStandardMaterial({ color: 0x0a0a14, emissive: col, emissiveIntensity: 0.22, transparent: true, opacity: 0.85 }));
  board.position.set(0, 3.5, -0.55); g.add(board);
  const ringR = 0.46;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(ringR, 0.05, 12, 32), new THREE.MeshStandardMaterial({ color: 0x120010, emissive: col, emissiveIntensity: 1.0 }));
  ring.rotation.x = Math.PI / 2; ring.position.set(0, 3.0, 0.05); g.add(ring);
  // simple net (a few hanging lines)
  const netMat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.5 });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(Math.cos(a) * ringR, 3.0, 0.05 + Math.sin(a) * ringR), new THREE.Vector3(Math.cos(a) * ringR * 0.4, 2.5, 0.05 + Math.sin(a) * ringR * 0.4)]);
    g.add(new THREE.Line(geo, netMat));
  }
  const gl = new THREE.PointLight(accent, 3, 8, 2); gl.position.set(0, 3.2, 0.8); g.add(gl);
  scene.add(g);

  g.updateWorldMatrix(true, true);
  const hoopCenter = new THREE.Vector3(); ring.getWorldPosition(hoopCenter);
  // backboard collision frame: reflect the ball in the group's local space, where
  // the board is axis-aligned (plane z≈-0.51, rect x∈[-0.95,0.95], y∈[2.88,4.12]).
  const invMat = new THREE.Matrix4().copy(g.matrixWorld).invert();
  const quat = g.quaternion.clone(), quatInv = quat.clone().invert();
  const _lp = new THREE.Vector3(), _lv = new THREE.Vector3();

  const BALLS = 6, balls = [];
  const ballGeo = new THREE.SphereGeometry(0.22, 16, 12);
  for (let i = 0; i < BALLS; i++) {
    const m = new THREE.Mesh(ballGeo, new THREE.MeshStandardMaterial({ color: accent, emissive: col, emissiveIntensity: 0.4, roughness: 0.5 }));
    m.visible = false; m.castShadow = true; scene.add(m);
    balls.push({ mesh: m, v: new THREE.Vector3(), active: false, scored: false, prevY: 0 });
  }
  let made = 0;
  const _fwd = new THREE.Vector3(), _flat = new THREE.Vector3(pos[0], 0, pos[1]);

  function throwBall(camera) {
    const b = balls.find((x) => !x.active); if (!b) return;
    camera.getWorldDirection(_fwd);
    b.mesh.position.copy(camera.position).addScaledVector(_fwd, 0.7);
    b.v.copy(_fwd).multiplyScalar(11).add(new THREE.Vector3(0, 4.4, 0)); // forward + arc
    b.active = true; b.mesh.visible = true; b.scored = false; b.prevY = b.mesh.position.y;
  }
  function near(playerPos) { return Math.hypot(playerPos.x - _flat.x, playerPos.z - _flat.z) < 10; }

  function update(dt, time) {
    ring.material.emissiveIntensity = 0.8 + Math.sin(time * 4) * 0.3;
    for (const b of balls) {
      if (!b.active) continue;
      b.prevY = b.mesh.position.y;
      b.v.y -= 12 * dt; b.mesh.position.addScaledVector(b.v, dt);
      b.mesh.rotation.x += dt * 4;
      // backboard bounce (in local space): if the ball is crossing the board
      // plane within the board rectangle, reflect its z-velocity and push it out.
      _lp.copy(b.mesh.position).applyMatrix4(invMat);
      if (_lp.z < -0.43 && _lp.z > -0.9 && Math.abs(_lp.x) < 0.98 && _lp.y > 2.85 && _lp.y < 4.15) {
        _lv.copy(b.v).applyQuaternion(quatInv);
        if (_lv.z < 0) { _lv.z = -_lv.z * 0.55; b.v.copy(_lv).applyQuaternion(quat); }
        _lp.z = -0.43; b.mesh.position.copy(_lp).applyMatrix4(g.matrixWorld);
      }
      if (!b.scored && b.prevY > hoopCenter.y && b.mesh.position.y <= hoopCenter.y) {
        if (Math.hypot(b.mesh.position.x - hoopCenter.x, b.mesh.position.z - hoopCenter.z) < ringR * 0.92) {
          b.scored = true; made++; if (onScore) onScore(made);
        }
      }
      if (b.mesh.position.y < -1) { b.active = false; b.mesh.visible = false; }
    }
  }
  return { update, throwBall, near, made: () => made, worldPos: new THREE.Vector3(pos[0], 0, pos[1]) };
}
