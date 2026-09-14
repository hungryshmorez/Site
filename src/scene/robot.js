import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

// A little robot NPC (UNIT-12) assembled from the uploaded PR2 head STLs (pan +
// tilt) and a slotted disk. A wheeled procedural body carries a pan pivot (looks
// left/right) and a tilt pivot (nods) built from the real parts, glowing eyes,
// and the slotted disk spinning as a chest sensor. It ROAMS a bounded area
// (picking new targets, turning to face travel) and pipes up with a SPEECH
// BUBBLE now and then. Parts are auto-scaled/centred so the ROS meshes just work.
const _stl = new STLLoader();
const load = (url) => new Promise((res, rej) => _stl.load(url, res, undefined, rej));
function fit(geo, target) {
  geo.computeBoundingBox(); const b = geo.boundingBox, size = new THREE.Vector3(); b.getSize(size);
  const s = target / Math.max(size.x, size.y, size.z, 0.001); geo.scale(s, s, s);
  geo.computeBoundingBox(); const c = new THREE.Vector3(); geo.boundingBox.getCenter(c); geo.translate(-c.x, -c.y, -c.z);
  if (!geo.getAttribute('normal')) geo.computeVertexNormals();
  return geo;
}

const LINES = ['BEEP BOOP', 'SYSTEMS NOMINAL', 'WELCOME TO THE COMPLEX', 'SCANNING…', 'HELLO HUMAN', '01001000 01001001', 'ALL SYSTEMS GO', 'NICE VINYL', 'DO NOT FEED THE ROBOT', 'RECALIBRATING…'];
function makeBubble() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 128; const x = c.getContext('2d');
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const spr = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: false }));
  spr.scale.set(2.6, 0.65, 1); spr.visible = false;
  const draw = (text) => {
    x.clearRect(0, 0, 512, 128);
    x.fillStyle = 'rgba(8,10,16,0.86)'; x.strokeStyle = '#ffb020'; x.lineWidth = 4;
    const w = 480, h = 84, rx = 16; const px = 16, py = 12;
    x.beginPath(); x.moveTo(px + rx, py); x.arcTo(px + w, py, px + w, py + h, rx); x.arcTo(px + w, py + h, px, py + h, rx); x.arcTo(px, py + h, px, py, rx); x.arcTo(px, py, px + w, py, rx); x.closePath(); x.fill(); x.stroke();
    x.beginPath(); x.moveTo(236, py + h); x.lineTo(256, py + h + 26); x.lineTo(276, py + h); x.closePath(); x.fillStyle = 'rgba(8,10,16,0.86)'; x.fill();
    x.fillStyle = '#ffe0a0'; x.font = 'bold 40px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(text, 256, 54);
    tex.needsUpdate = true;
  };
  return { sprite: spr, say: (t) => { draw(t); spr.visible = true; }, hide: () => { spr.visible = false; } };
}

export function buildRobot({ accent = 0x00f3ff, bounds = null, onReady } = {}) {
  const root = new THREE.Group();
  const col = new THREE.Color(accent);
  const metal = new THREE.MeshStandardMaterial({ color: 0xc7ccd4, metalness: 0.75, roughness: 0.32 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x2a2e36, metalness: 0.6, roughness: 0.5, emissive: col.clone().multiplyScalar(0.08), emissiveIntensity: 0.5 });
  const tire = new THREE.MeshStandardMaterial({ color: 0x14161c, roughness: 0.85 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.62, 0.45, 20), dark); base.position.y = 0.34; base.castShadow = true; root.add(base);
  // three wheels so it reads as a rover
  const wheels = [];
  for (const [wx, wz] of [[-0.5, 0], [0.5, 0], [0, -0.5]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.12, 14), tire); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.16, wz); root.add(w); wheels.push(w); }
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.46, 1.0, 18), metal); torso.position.y = 1.08; torso.castShadow = true; root.add(torso);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.32, 12), dark); neck.position.y = 1.68; root.add(neck);

  const panPivot = new THREE.Group(); panPivot.position.y = 1.88; root.add(panPivot);
  const tiltPivot = new THREE.Group(); tiltPivot.position.y = 0.05; panPivot.add(tiltPivot);
  const diskSpin = new THREE.Group(); diskSpin.position.set(0, 1.15, 0.42); root.add(diskSpin);

  for (const ex of [-0.13, 0.13]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.055, 10, 8), new THREE.MeshBasicMaterial({ color: accent })); e.position.set(ex, 0.05, 0.3); tiltPivot.add(e); }
  const eyeLight = new THREE.PointLight(accent, 1.4, 6, 2); eyeLight.position.set(0, 0.1, 0.5); tiltPivot.add(eyeLight);

  const bubble = makeBubble(); bubble.sprite.position.set(0, 2.9, 0); root.add(bubble.sprite);

  Promise.all([load('models/robot/pr2_head_pan.stl'), load('models/robot/pr2_head_tilt.stl'), load('models/robot/slotted_disk.stl')])
    .then(([panG, tiltG, diskG]) => {
      const pan = new THREE.Mesh(fit(panG, 0.5), metal); pan.castShadow = true; panPivot.add(pan);
      const tilt = new THREE.Mesh(fit(tiltG, 0.55), metal); tilt.castShadow = true; tiltPivot.add(tilt);
      diskSpin.add(new THREE.Mesh(fit(diskG, 0.5), metal));
      diskSpin.add(new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.03, 8, 24), new THREE.MeshBasicMaterial({ color: accent })));
      onReady && onReady();
    }).catch((e) => { console.error('robot parts failed', e); });

  // ---- roaming + speech state ----
  let gazeT = 0, gazeYaw = 0, gazeTgt = 0;
  let sayT = 4 + Math.random() * 4, saying = 0;
  const tgt = new THREE.Vector3(root.position.x, 0, root.position.z);
  let bodyYaw = 0, moving = false;
  const pickTarget = () => {
    if (!bounds) return;
    tgt.set(bounds.x0 + Math.random() * (bounds.x1 - bounds.x0), 0, bounds.z0 + Math.random() * (bounds.z1 - bounds.z0));
  };
  let waitT = 1 + Math.random() * 2;

  const api = {
    group: root,
    update(dt, t) {
      // head scan
      gazeT -= dt; if (gazeT <= 0) { gazeTgt = (Math.random() - 0.5) * 1.8; gazeT = 1.5 + Math.random() * 2.5; }
      gazeYaw += (gazeTgt - gazeYaw) * Math.min(1, dt * 2);
      panPivot.rotation.y = gazeYaw;
      tiltPivot.rotation.x = Math.sin(t * 0.8) * 0.16 - 0.05;
      diskSpin.rotation.z += dt * 1.6;
      eyeLight.intensity = 1.2 + Math.sin(t * 4) * 0.3;

      // roam
      if (bounds) {
        const dx = tgt.x - root.position.x, dz = tgt.z - root.position.z; const d = Math.hypot(dx, dz);
        if (d < 0.4) { moving = false; waitT -= dt; if (waitT <= 0) { pickTarget(); waitT = 1.5 + Math.random() * 3; } }
        else {
          moving = true; const spd = 1.2; const step = Math.min(spd * dt, d);
          root.position.x += (dx / d) * step; root.position.z += (dz / d) * step;
          const want = Math.atan2(dx, dz); let diff = ((want - bodyYaw + Math.PI) % (Math.PI * 2)) - Math.PI; bodyYaw += diff * Math.min(1, dt * 3);
          root.rotation.y = bodyYaw;
          for (const w of wheels) w.rotation.x += step * 6;
        }
      }

      // speech bubble
      if (saying > 0) { saying -= dt; if (saying <= 0) bubble.hide(); }
      else { sayT -= dt; if (sayT <= 0) { bubble.say(LINES[(Math.random() * LINES.length) | 0]); saying = 2.8; sayT = 6 + Math.random() * 7; } }
    },
    say: (t) => { bubble.say(t); saying = 2.8; },
  };
  pickTarget();
  return api;
}
