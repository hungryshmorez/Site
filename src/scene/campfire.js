import * as THREE from 'three';

// Shmorez's campfire: a crackling additive fire particle system + flickering
// firelight, ringed by silhouette NPCs roasting marshmallows on sticks. Purely
// ambient — it just makes his corner of the field feel lived-in.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildCampfire(scene, { pos = [-10, -8], roasters = 3 } = {}) {
  const group = new THREE.Group();
  group.position.set(pos[0], 0, pos[1]);
  scene.add(group);

  // ---- logs ----
  const logMat = std({ color: 0x2a1a10, roughness: 0.9, emissive: new THREE.Color(0xff5a1e), emissiveIntensity: 0.15 });
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI;
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 1.4, 8), logMat);
    log.position.set(Math.cos(a) * 0.14, 0.18, Math.sin(a) * 0.14);
    log.rotation.z = Math.PI / 2; log.rotation.y = a; log.castShadow = true; group.add(log);
  }
  const embers = new THREE.Mesh(new THREE.CircleGeometry(0.55, 20),
    new THREE.MeshBasicMaterial({ color: 0xff7a2a, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  embers.rotation.x = -Math.PI / 2; embers.position.y = 0.05; group.add(embers);

  // ---- fire particles ----
  const N = 54;
  const fpos = new Float32Array(N * 3), fcol = new Float32Array(N * 3);
  const parts = [];
  const respawn = (init) => ({
    x: (Math.random() - 0.5) * 0.5, z: (Math.random() - 0.5) * 0.5,
    vy: 1.3 + Math.random() * 1.3, maxLife: 0.7 + Math.random() * 0.7,
    life: init ? Math.random() : 0, phase: Math.random() * 6.28,
  });
  for (let i = 0; i < N; i++) parts.push(respawn(true));
  const fireGeo = new THREE.BufferGeometry();
  fireGeo.setAttribute('position', new THREE.BufferAttribute(fpos, 3));
  fireGeo.setAttribute('color', new THREE.BufferAttribute(fcol, 3));
  const fire = new THREE.Points(fireGeo, new THREE.PointsMaterial({
    size: 0.62, map: dot(), vertexColors: true, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  group.add(fire);

  const light = new THREE.PointLight(0xff6a22, 4, 12, 2); light.position.set(0, 0.9, 0); group.add(light);

  // ---- roasters (silhouettes with marshmallow sticks) ----
  const npcMat = std({ color: 0x05050a, roughness: 1 });
  const stickMat = std({ color: 0x6a4a2a, roughness: 0.9 });
  const marsh = [];
  const UP = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < roasters; i++) {
    const ang = 2.3 + i * 1.0;                 // spread on the far arc, leaving room for Shmorez
    const gx = Math.cos(ang) * 2.0, gz = Math.sin(ang) * 2.0;
    const rg = new THREE.Group();
    rg.position.set(gx, 0, gz);
    rg.rotation.y = Math.atan2(-gx, -gz);      // face the fire
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.7, 4, 8), npcMat); body.position.y = 0.85; body.castShadow = true; rg.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), npcMat); head.position.y = 1.45; rg.add(head);
    const hand = new THREE.Vector3(0, 1.0, 0.28), tip = new THREE.Vector3(0, 0.6, 1.55);
    const d = new THREE.Vector3().subVectors(tip, hand);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, d.length(), 6), stickMat);
    stick.position.copy(hand).addScaledVector(d, 0.5);
    stick.quaternion.setFromUnitVectors(UP, d.clone().normalize());
    rg.add(stick);
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.08, 12, 10),
      std({ color: 0xf3efe6, roughness: 0.9, emissive: new THREE.Color(0xff5a1e), emissiveIntensity: 0.25 }));
    m.position.copy(tip); rg.add(m); marsh.push(m);
    group.add(rg);
  }

  function update(dt, time, pulse) {
    const p = fireGeo.attributes.position.array, c = fireGeo.attributes.color.array;
    for (let i = 0; i < N; i++) {
      const pt = parts[i];
      pt.life += dt;
      if (pt.life >= pt.maxLife) parts[i] = respawn(false);
      const q = parts[i], t = q.life / q.maxLife, fade = 1 - t;
      p[i * 3] = q.x + Math.sin(time * 3 + q.phase) * 0.12 * t;
      p[i * 3 + 1] = 0.15 + t * q.vy;
      p[i * 3 + 2] = q.z + Math.cos(time * 2.5 + q.phase) * 0.1 * t;
      c[i * 3] = fade;                       // R
      c[i * 3 + 1] = (0.55 - 0.45 * t) * fade; // G
      c[i * 3 + 2] = 0.12 * fade * fade;     // B
    }
    fireGeo.attributes.position.needsUpdate = true;
    fireGeo.attributes.color.needsUpdate = true;
    embers.material.opacity = 0.6 + Math.sin(time * 8) * 0.15 + pulse * 0.2;
    light.intensity = 3.5 + Math.sin(time * 13) * 0.6 + Math.random() * 0.5 + pulse * 1.5;
    for (const m of marsh) m.material.emissiveIntensity = 0.3 + Math.sin(time * 5 + m.position.x) * 0.2 + pulse * 0.3;
  }

  return { update, group };
}

function dot() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, 'rgba(255,255,255,1)'); rad.addColorStop(0.4, 'rgba(255,255,255,.6)'); rad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rad; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
