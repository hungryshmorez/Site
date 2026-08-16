import * as THREE from 'three';

// TARGET SHOOTING GALLERY — a carnival booth with a rail of sliding targets.
// Walk up, aim with your gaze (screen center) and click to fire a hitscan shot;
// knock a target down to score. Targets pop back up after a moment. Reuses the
// look-to-aim / click-to-act pattern from the hoop + beer pong.

const std = (o) => new THREE.MeshStandardMaterial(o);
const RING_COLS = [0xff0055, 0xffe14d, 0x39ff14, 0x00f3ff, 0xb967ff];

export function buildGallery(scene, { pos = [-16, 10], accent = '#ff0055', onHit } = {}) {
  const g = new THREE.Group();
  const [x, z] = pos;
  g.position.set(x, 0, z);
  g.rotation.y = Math.atan2(0 - x, -4 - z); // face center
  scene.add(g);
  const col = new THREE.Color(accent);

  // booth: back panel, side posts, striped canopy, counter
  const frame = std({ color: 0x14141c, metalness: 0.5, roughness: 0.6 });
  const back = new THREE.Mesh(new THREE.BoxGeometry(6.4, 3.2, 0.2), std({ color: 0x0b0b14, roughness: 0.8 }));
  back.position.set(0, 1.9, -1.1); back.castShadow = true; g.add(back);
  for (const sx of [-3.1, 3.1]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.24, 3.6, 0.24), frame); p.position.set(sx, 1.8, 0); p.castShadow = true; g.add(p); }
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.2, 1.6), stripeTex(accent)); canopy.position.set(0, 3.7, -0.4); canopy.castShadow = true; g.add(canopy);
  const counter = new THREE.Mesh(new THREE.BoxGeometry(6.4, 1.0, 0.6), std({ color: 0x101018, roughness: 0.8 })); counter.position.set(0, 0.5, 0.9); counter.castShadow = true; g.add(counter);
  const sign = makeLabel('SHOOTING GALLERY', accent); sign.position.set(0, 3.35, -0.98); sign.scale.set(4.4, 0.55, 1); g.add(sign);
  const gl = new THREE.PointLight(accent, 4, 12, 2); gl.position.set(0, 3, 1.2); g.add(gl);

  // muzzle-flash sprite at the counter
  const flash = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  flash.position.set(0, 1.4, 0.9); g.add(flash);

  // rail of targets (flat discs on stems) that slide side to side
  const targets = [];
  const NT = 5, rowY = [1.6, 2.4, 1.6, 2.4, 1.6];
  for (let i = 0; i < NT; i++) {
    const t = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 24), std({ color: 0x05050a, emissive: new THREE.Color(RING_COLS[i]), emissiveIntensity: 0.7, metalness: 0.3, roughness: 0.4 }));
    disc.rotation.x = Math.PI / 2; t.add(disc);
    const bull = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.14, 20), new THREE.MeshBasicMaterial({ color: RING_COLS[i] })); bull.rotation.x = Math.PI / 2; bull.position.z = 0.01; t.add(bull);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, rowY[i], 8), std({ color: 0x14141c, metalness: 0.5 })); stem.position.set(0, -rowY[i] / 2, 0); t.add(stem);
    const baseX = -2.2 + i * 1.1;
    t.position.set(baseX, rowY[i], -0.2);
    g.add(t);
    targets.push({ grp: t, disc, baseX, y: rowY[i], phase: Math.random() * 6.28, amp: 0.6 + Math.random() * 0.5, spd: 0.6 + Math.random() * 0.5, down: 0, respawn: 0 });
  }

  const worldPos = new THREE.Vector3(x, 1.6, z);
  const ray = new THREE.Raycaster();
  const CENTER = new THREE.Vector2(0, 0);
  let score = 0, muzzle = 0;

  const near = (p) => Math.hypot(p.x - x, p.z - z) < 6;

  function shoot(camera) {
    muzzle = 1;
    ray.setFromCamera(CENTER, camera);
    const standing = targets.filter((t) => t.down === 0).map((t) => t.disc);
    const hit = ray.intersectObjects(standing, false)[0];
    if (hit) {
      const t = targets.find((tt) => tt.disc === hit.object);
      if (t) { t.down = 1; t.respawn = 1.6; score++; onHit && onHit(score); return true; }
    }
    return false;
  }

  function update(dt, time, pulse) {
    gl.intensity = 3 + pulse * 2;
    muzzle = Math.max(0, muzzle - dt * 6);
    flash.material.opacity = muzzle;
    flash.scale.setScalar(1 + muzzle * 1.5);
    for (const t of targets) {
      if (t.down === 0) {
        t.grp.position.x = t.baseX + Math.sin(time * t.spd + t.phase) * t.amp; // slide
        t.grp.rotation.z = 0;
        t.disc.material.emissiveIntensity = 0.55 + pulse * 0.5;
      } else {
        // knocked down: flip flat + fade, then respawn
        t.grp.rotation.z = Math.min(Math.PI / 2, t.grp.rotation.z + dt * 7);
        t.respawn -= dt;
        if (t.respawn <= 0) { t.down = 0; t.grp.rotation.z = 0; }
      }
    }
  }

  return { near, shoot, update, worldPos, getScore: () => score };
}

function stripeTex(accent) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 32; const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#0a0a12' : accent; x.fillRect(i * 32, 0, 32, 32); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return std({ map: tex, emissive: new THREE.Color(accent), emissiveIntensity: 0.12, roughness: 0.8 });
}
function makeLabel(text, accent) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.font = 'bold 34px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = accent; x.shadowBlur = 16; x.fillStyle = accent; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false }));
}
