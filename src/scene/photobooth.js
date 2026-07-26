import * as THREE from 'three';

// The PHOTO BOOTH by the hub board — a curtained carnival booth with a big
// glass lens for a face. Walk in (or click it) and it flips the TRIPPY CAM:
// your live webcam wraps the whole sky, so your face becomes the festival's
// heavens. Same activate API as the old DJ-booth trigger it replaces.

const std = (o) => new THREE.MeshStandardMaterial(o);

function stripeCurtain(accent) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 128;
  const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#0a0a12' : accent; x.fillRect(i * 16, 0, 16, 128); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return std({ map: tex, emissive: new THREE.Color(accent), emissiveIntensity: 0.18, roughness: 0.85 });
}

function labelPlane(text, accent) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64;
  const x = c.getContext('2d');
  x.fillStyle = '#04060a'; x.fillRect(0, 0, 256, 64);
  x.font = 'bold 40px monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = accent; x.shadowColor = accent; x.shadowBlur = 16;
  x.fillText(text, 128, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 0.25), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
}

export function buildPhotoBooth(scene, { pos = [-13, 0, 17], accent = '#00F3FF', onActivate } = {}) {
  const g = new THREE.Group();
  g.position.set(pos[0], pos[1], pos[2]);
  scene.add(g);
  const col = new THREE.Color(accent);
  const shell = std({ color: 0x12121c, metalness: 0.4, roughness: 0.6 });

  // booth cabinet — back + two side walls + roof, open front
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.7, 2.6, 0.12), shell); back.position.set(0, 1.3, -0.8); back.castShadow = true; g.add(back);
  for (const sx of [-0.85, 0.85]) { const w = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.6, 1.6), shell); w.position.set(sx, 1.3, 0); w.castShadow = true; g.add(w); }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.16, 1.8), shell); roof.position.set(0, 2.65, 0); roof.castShadow = true; g.add(roof);

  // striped curtain across the open front (top half)
  const curtain = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.0), stripeCurtain(accent));
  curtain.position.set(0, 2.0, 0.78); g.add(curtain);
  // a little stool inside
  const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.5, 16), std({ color: 0x1a1a24, roughness: 0.7 }));
  stool.position.set(0, 0.25, 0); g.add(stool);

  // the camera / lens — the tell that this flips the cam
  const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 0.35, 20), std({ color: 0x05050a, metalness: 0.7, roughness: 0.3 }));
  barrel.rotation.x = Math.PI / 2; barrel.position.set(0, 1.35, -0.55); g.add(barrel);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 12, 28), new THREE.MeshBasicMaterial({ color: accent }));
  ring.position.set(0, 1.35, -0.36); g.add(ring);
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.15, 18, 18), new THREE.MeshBasicMaterial({ color: accent }));
  lens.position.set(0, 1.35, -0.34); g.add(lens);
  // flash bulb that pops on the beat
  const flash = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
  flash.position.set(0.34, 1.7, -0.4); g.add(flash);

  const sign = labelPlane('PHOTO', '#00f3ff'); sign.position.set(0, 2.95, 0.4); sign.scale.set(1.6, 1.6, 1); g.add(sign);
  const light = new THREE.PointLight(accent, 3, 8, 2); light.position.set(0, 1.8, 0.6); g.add(light);

  const proxy = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.7, 1.9), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(0, 1.35, 0); g.add(proxy);

  const worldPos = new THREE.Vector3(pos[0], pos[1], pos[2]);
  let wasClose = false;

  function tryClick(ray) {
    if (ray.intersectObject(proxy, false)[0]) { onActivate && onActivate(); return true; }
    return false;
  }
  function update(dt, time, pulse, playerPos) {
    lens.material.color.setHSL((time * 0.12) % 1, 1, 0.6); // shimmer to hint the cam
    ring.rotation.z += dt * 0.6;
    light.intensity = 2.5 + pulse * 2;
    flash.material.opacity = 1;
    const f = Math.max(0, pulse - 0.6) * 2.5; // bright pop on the drop
    flash.scale.setScalar(1 + f * 1.5);
    if (!playerPos) return;
    const close = Math.hypot(playerPos.x - worldPos.x, playerPos.z - worldPos.z) < 2.9;
    if (close && !wasClose && onActivate) onActivate();
    wasClose = close;
  }
  return { update, tryClick, worldPos };
}
