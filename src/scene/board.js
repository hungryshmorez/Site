import * as THREE from 'three';

// The 12matt3r hub board: a walk-up cork board of Post-it notes — news &
// updates, plus a guest book you sign ("leave a message"). Click it to open
// the board panel. Self-contained like the other props; main wires the UI.

const std = (o) => new THREE.MeshStandardMaterial(o);
const NOTE_COLORS = [0xffe14d, 0xff8fb1, 0x8fe1ff, 0x9dffa3];

export function buildBoard(scene, { pos = [3, 11], stageZ = -24, accent = '#00F3FF', onOpen } = {}) {
  const group = new THREE.Group();
  const [x, z] = pos;
  group.position.set(x, 0, z);
  group.rotation.y = Math.atan2(0 - x, -4 - z); // face the center of the grounds
  scene.add(group);

  const wood = std({ color: 0x5a4326, roughness: 0.85 });
  // posts
  for (const sx of [-1.15, 1.15]) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.2, 10), wood);
    p.position.set(sx, 1.1, 0); p.castShadow = true; group.add(p);
  }
  // cork panel
  const frame = new THREE.Mesh(new THREE.BoxGeometry(2.5, 1.5, 0.12), wood);
  frame.position.set(0, 1.7, 0); frame.castShadow = true; group.add(frame);
  const cork = new THREE.Mesh(new THREE.BoxGeometry(2.28, 1.28, 0.06), std({ color: 0x8a6a3a, roughness: 1 }));
  cork.position.set(0, 1.7, 0.06); group.add(cork);

  // scattered Post-it notes (decorative)
  const notes = [];
  let ni = 0;
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 4; c++) {
      const note = new THREE.Mesh(
        new THREE.PlaneGeometry(0.4, 0.4),
        std({ color: NOTE_COLORS[ni % NOTE_COLORS.length], emissive: new THREE.Color(NOTE_COLORS[ni % NOTE_COLORS.length]), emissiveIntensity: 0.12, roughness: 0.9, side: THREE.DoubleSide })
      );
      note.position.set(-0.8 + c * 0.53, 2.05 - r * 0.62, 0.1);
      note.rotation.z = (Math.random() - 0.5) * 0.28;
      note.userData.baseZ = note.rotation.z;
      group.add(note); notes.push(note); ni++;
    }
  }

  // glowing header sign
  const sign = makeSign('12matt3r  //  ARTISTS · NEWS · GUEST BOOK', accent);
  sign.position.set(0, 2.62, 0.1); sign.scale.set(2.5, 0.3, 1); group.add(sign);
  const gl = new THREE.PointLight(accent, 3, 6, 2); gl.position.set(0, 2.4, 1); group.add(gl);

  // click proxy
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.2, 0.6), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(0, 1.7, 0.2); group.add(proxy);

  const worldPos = new THREE.Vector3(x, 1.6, z);

  function tryClick(raycaster) {
    if (raycaster.intersectObject(proxy, false)[0]) { onOpen && onOpen(); return true; }
    return false;
  }
  function update(dt, time, pulse) {
    sign.material.opacity = 0.8 + Math.sin(time * 2) * 0.15;
    notes.forEach((n, i) => { n.rotation.z = n.userData.baseZ + Math.sin(time * 1.3 + i) * 0.02; });
    gl.intensity = 2.4 + pulse * 1.2;
  }

  return { update, tryClick, worldPos };
}

function makeSign(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64;
  const x = c.getContext('2d');
  x.font = 'bold 30px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
}
