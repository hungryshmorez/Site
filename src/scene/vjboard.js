import * as THREE from 'three';

// THE VJ BOARD — a control desk by the lab side-stage. Walk up (or click it) to
// open the VJ panel and run the stage screens: start/stop the playlist and flip
// between clips. This is where you "mess with the VJ stuff."

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildVJBoard(scene, { pos = [4, 0, 13], accent = '#00F3FF', onActivate } = {}) {
  const g = new THREE.Group();
  g.position.set(pos[0], 0, pos[2]);
  g.rotation.y = Math.atan2(0 - pos[0], -4 - pos[2]); // face center
  scene.add(g);
  const col = new THREE.Color(accent);

  // desk + slanted control surface
  const legs = std({ color: 0x0d0d16, metalness: 0.5, roughness: 0.6 });
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.0), legs); desk.position.y = 0.45; desk.castShadow = true; g.add(desk);
  const surf = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.08, 1.0), std({ color: 0x05050a, metalness: 0.4, roughness: 0.5 }));
  surf.position.set(0, 0.92, 0.05); surf.rotation.x = -0.32; g.add(surf);

  // a little preview screen showing "VJ"
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.5), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.9 }));
  scr.position.set(0, 1.5, -0.35); scr.rotation.x = -0.2; g.add(scr);
  const label = makeLabel('VJ', accent); label.position.set(0, 1.5, -0.33); label.rotation.x = -0.2; label.scale.set(0.7, 0.35, 1); g.add(label);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 8), legs); post.position.set(0, 1.05, -0.3); g.add(post);

  // faders + knobs on the surface (visual)
  const knobs = [];
  for (let i = 0; i < 4; i++) {
    const k = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 12), new THREE.MeshBasicMaterial({ color: accent }));
    k.position.set(-0.75 + i * 0.5, 1.02, 0.1); k.rotation.x = -0.32; g.add(k); knobs.push(k);
  }
  const light = new THREE.PointLight(accent, 3, 8, 2); light.position.set(0, 1.6, 0.6); g.add(light);

  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 2.0), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(0, 1.1, 0); g.add(proxy);

  const worldPos = new THREE.Vector3(pos[0], 1.4, pos[2]);

  function tryClick(ray) {
    if (ray.intersectObject(proxy, false)[0]) { onActivate && onActivate(); return true; }
    return false;
  }
  const near = (playerPos) => Math.hypot(playerPos.x - worldPos.x, playerPos.z - worldPos.z) < 3.2;
  function update(dt, time, pulse) {
    scr.material.emissiveIntensity = 0.6 + pulse * 0.6 + Math.sin(time * 3) * 0.1;
    light.intensity = 2.5 + pulse * 2;
    knobs.forEach((k, i) => (k.rotation.y = Math.sin(time * 0.8 + i) * 0.6));
  }
  return { update, tryClick, near, worldPos, group: g };
}

function makeLabel(text, accent) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 128;
  const x = c.getContext('2d');
  x.font = 'bold 90px monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = accent; x.shadowColor = accent; x.shadowBlur = 20; x.fillText(text, 128, 68);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 0.5), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
}
