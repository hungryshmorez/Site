import * as THREE from 'three';

// The DJ booth up on the main stage. Walk up onto the stage and reach it (or
// click it) to flip the TRIPPY CAM — your live webcam wrapped across the whole
// sky, so you're staring down at yourself like a god over the festival. The
// glowing eye above the decks is the tell.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildDJBooth(scene, { pos = [0, 1.6, -24], accent = '#00F3FF', onActivate } = {}) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  scene.add(g);
  const col = new THREE.Color(accent);

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.0, 1.0), std({ color: 0x0d0d16, metalness: 0.5, roughness: 0.5 }));
  body.position.y = 0.5; body.castShadow = true; g.add(body);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 0.8), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.8 }));
  panel.position.set(0, 0.5, 0.51); g.add(panel);

  const platters = [];
  for (const sx of [-0.7, 0.7]) {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.06, 24), std({ color: 0x1a1a22, metalness: 0.6, roughness: 0.4 }));
    plate.position.set(sx, 1.03, 0); g.add(plate);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.02, 24), std({ color: 0x05050a, emissive: col, emissiveIntensity: 0.35 }));
    disc.position.set(sx, 1.07, 0); g.add(disc); platters.push(disc);
  }
  const lap = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.35, 0.02), std({ color: 0x02121a, emissive: col, emissiveIntensity: 1.0 }));
  lap.position.set(0, 1.2, -0.15); lap.rotation.x = -0.5; g.add(lap);

  // floating camera-eye (the tell)
  const eye = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 28), new THREE.MeshBasicMaterial({ color: accent }));
  eye.position.set(0, 2.0, 0.1); g.add(eye);
  const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.1, 14, 14), new THREE.MeshBasicMaterial({ color: accent }));
  pupil.position.set(0, 2.0, 0.1); g.add(pupil);
  const light = new THREE.PointLight(accent, 3, 8, 2); light.position.set(0, 1.5, 0.7); g.add(light);

  const proxy = new THREE.Mesh(new THREE.BoxGeometry(3, 2.6, 2), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(0, 1.1, 0); g.add(proxy);

  const worldPos = new THREE.Vector3(pos[0], pos[1], pos[2]);
  let wasClose = false;

  function tryClick(ray) {
    if (ray.intersectObject(proxy, false)[0]) { onActivate && onActivate(); return true; }
    return false;
  }
  function update(dt, time, pulse, playerPos) {
    platters.forEach((d, i) => (d.rotation.y += dt * (i ? -3.2 : 3.2)));
    eye.rotation.z += dt * 0.5;
    panel.material.emissiveIntensity = 0.6 + pulse * 0.6;
    light.intensity = 2.5 + pulse * 2;
    pupil.material.color.setHSL((time * 0.12) % 1, 1, 0.6); // shimmer to hint the cam
    if (!playerPos) return;
    const close = Math.hypot(playerPos.x - worldPos.x, playerPos.z - worldPos.z) < 2.9;
    if (close && !wasClose && onActivate) onActivate();
    wasClose = close;
  }
  return { update, tryClick, worldPos };
}
