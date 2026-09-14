import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

// A little robot NPC assembled from the uploaded PR2 head STLs (pan + tilt) and a
// slotted disk. A procedural body carries a pan pivot (looks left/right) and a
// tilt pivot (nods up/down) built from the real parts, glowing eyes, and the
// slotted disk spinning as a chest sensor. update() runs an idle "looking
// around" behaviour. Parts are auto-scaled/centred so the ROS meshes just work.
const _stl = new STLLoader();
const load = (url) => new Promise((res, rej) => _stl.load(url, res, undefined, rej));
function fit(geo, target) {
  geo.computeBoundingBox(); const b = geo.boundingBox, size = new THREE.Vector3(); b.getSize(size);
  const s = target / Math.max(size.x, size.y, size.z, 0.001); geo.scale(s, s, s);
  geo.computeBoundingBox(); const c = new THREE.Vector3(); geo.boundingBox.getCenter(c); geo.translate(-c.x, -c.y, -c.z);
  if (!geo.getAttribute('normal')) geo.computeVertexNormals();
  return geo;
}

export function buildRobot({ accent = 0x00f3ff, onReady } = {}) {
  const root = new THREE.Group();
  const col = new THREE.Color(accent);
  const metal = new THREE.MeshStandardMaterial({ color: 0xc7ccd4, metalness: 0.75, roughness: 0.32 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2e36, metalness: 0.6, roughness: 0.5, emissive: col.clone().multiplyScalar(0.08), emissiveIntensity: 0.5 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.45, 20), dark); base.position.y = 0.22; base.castShadow = true; root.add(base);
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.46, 1.0, 18), metal); torso.position.y = 0.98; torso.castShadow = true; root.add(torso);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.32, 12), dark); neck.position.y = 1.58; root.add(neck);

  const panPivot = new THREE.Group(); panPivot.position.y = 1.78; root.add(panPivot);
  const tiltPivot = new THREE.Group(); tiltPivot.position.y = 0.05; panPivot.add(tiltPivot);
  const diskSpin = new THREE.Group(); diskSpin.position.set(0, 1.05, 0.42); root.add(diskSpin);

  // glowing eyes + head light live on the tilt so they track the gaze
  for (const ex of [-0.13, 0.13]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshBasicMaterial({ color: accent })); e.position.set(ex, 0.05, 0.3); tiltPivot.add(e); }
  const eyeLight = new THREE.PointLight(accent, 1.4, 6, 2); eyeLight.position.set(0, 0.1, 0.5); tiltPivot.add(eyeLight);

  Promise.all([load('models/robot/pr2_head_pan.stl'), load('models/robot/pr2_head_tilt.stl'), load('models/robot/slotted_disk.stl')])
    .then(([panG, tiltG, diskG]) => {
      const pan = new THREE.Mesh(fit(panG, 0.5), metal); pan.castShadow = true; panPivot.add(pan);
      const tilt = new THREE.Mesh(fit(tiltG, 0.55), metal); tilt.castShadow = true; tiltPivot.add(tilt);
      const disk = new THREE.Mesh(fit(diskG, 0.5), metal); diskSpin.add(disk);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 8, 24), new THREE.MeshBasicMaterial({ color: accent })); diskSpin.add(ring);
      onReady && onReady();
    }).catch((e) => { console.error('robot parts failed', e); });

  let gazeT = 0, gazeYaw = 0, gazeTgt = 0;
  const api = {
    group: root,
    update(dt, t) {
      // idle: pick a new place to look every few seconds, ease toward it, plus a gentle nod
      gazeT -= dt; if (gazeT <= 0) { gazeTgt = (Math.random() - 0.5) * 1.8; gazeT = 1.5 + Math.random() * 2.5; }
      gazeYaw += (gazeTgt - gazeYaw) * Math.min(1, dt * 2);
      panPivot.rotation.y = gazeYaw;
      tiltPivot.rotation.x = Math.sin(t * 0.8) * 0.16 - 0.05;
      diskSpin.rotation.z += dt * 1.6;
      eyeLight.intensity = 1.2 + Math.sin(t * 4) * 0.3;
    },
  };
  return api;
}
