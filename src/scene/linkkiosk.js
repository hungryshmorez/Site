import * as THREE from 'three';

// A small reusable "link kiosk" — a glowing monitor on a stand with a text
// label above it — used to surface an external link inside a walkable world
// without hand-building bespoke geometry every time. Side-effect free: it
// doesn't call openWindow() itself, callers raycast against `.proxy` and
// decide what to do (usually openWindow(title, url) from ui/popup.js).
export function buildLinkKiosk(scene, { pos = [0, 0], rotY = 0, label = 'LINK', color = '#00f3ff' } = {}) {
  const g = new THREE.Group();
  g.position.set(pos[0], 0, pos[1]);
  g.rotation.y = rotY;
  scene.add(g);

  const std = (o) => new THREE.MeshStandardMaterial(o);
  const c = new THREE.Color(color);

  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 1.5, 10), std({ color: 0x14141c, metalness: 0.5, roughness: 0.6 }));
  post.position.y = 0.75; post.castShadow = true; g.add(post);

  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.85, 0.5), std({ color: 0x1a1a26, metalness: 0.4, roughness: 0.5 }));
  cab.position.y = 1.85; cab.castShadow = true; g.add(cab);

  const screenMat = new THREE.MeshBasicMaterial({ color: c, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.6), screenMat);
  screen.position.set(0, 1.85, 0.26); g.add(screen);

  const glow = new THREE.PointLight(c, 3, 5, 2); glow.position.set(0, 1.85, 0.6); g.add(glow);

  // text-label cap floating above the kiosk (camera-facing sprite)
  const cv = document.createElement('canvas'); cv.width = 512; cv.height = 96;
  const ctx = cv.getContext('2d');
  ctx.font = '600 44px ui-monospace, "JetBrains Mono", monospace';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.lineWidth = 8; ctx.strokeStyle = 'rgba(0,0,0,.85)'; ctx.strokeText(label, 256, 52);
  ctx.shadowColor = color; ctx.shadowBlur = 12; ctx.fillStyle = color; ctx.fillText(label, 256, 52);
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const cap = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
  cap.position.set(0, 2.55, 0); cap.scale.set(2.3, 2.3 * 96 / 512, 1); g.add(cap);

  const proxy = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 0.7), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.y = 1.5; g.add(proxy);

  const worldPos = new THREE.Vector3(); g.getWorldPosition(worldPos);

  return {
    group: g, proxy, worldPos,
    tryClick: (raycaster) => !!raycaster.intersectObject(proxy, false)[0],
    update: (dt, t) => { glow.intensity = 2.4 + Math.sin(t * 2) * 0.8; },
  };
}
