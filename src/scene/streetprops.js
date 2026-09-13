import * as THREE from 'three';

// Low-poly STREET FURNITURE for the city plaza — benches, planters, trash cans,
// bollards, hydrants, a few streetlamps, newspaper boxes and a hero food cart.
// Everything is seated on the real ground via a groundY(x,z) callback so props
// sit flush on the loaded city model. Returns { group, lamps } — lamps are the
// PointLights (kept few) so the caller can flicker them if it likes.

const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

function bench(col = 0x3a2a1c) {
  const g = new THREE.Group();
  const wood = std({ color: col, roughness: 0.85 });
  const metal = std({ color: 0x1a1c22, metalness: 0.7, roughness: 0.4 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 0.7), wood); seat.position.y = 0.5; seat.castShadow = true; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.6, 0.12), wood); back.position.set(0, 0.85, -0.29); back.castShadow = true; g.add(back);
  for (const lx of [-1.0, 1.0]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.5, 0.6), metal); leg.position.set(lx, 0.25, 0); g.add(leg); }
  return g;
}
function planter() {
  const g = new THREE.Group();
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 1.3), std({ color: 0x2c2f36, roughness: 0.8 })); box.position.y = 0.35; box.castShadow = true; g.add(box);
  const soil = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.1, 1.15), std({ color: 0x120d09, roughness: 1 })); soil.position.y = 0.72; g.add(soil);
  for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2; const bush = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.9 + Math.random() * 0.5, 5), std({ color: new THREE.Color().setHSL(0.28 + Math.random() * 0.06, 0.5, 0.35), roughness: 0.9 })); bush.position.set(Math.cos(a) * 0.28, 1.15, Math.sin(a) * 0.28); bush.rotation.set(Math.cos(a) * 0.3, 0, -Math.sin(a) * 0.3); g.add(bush); }
  return g;
}
function trashCan() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.9, 12), std({ color: 0x20303a, metalness: 0.5, roughness: 0.6 })); body.position.y = 0.45; body.castShadow = true; g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 12), std({ color: 0x14202a, metalness: 0.6, roughness: 0.5 })); lid.position.y = 0.96; g.add(lid);
  return g;
}
function bollard(accent) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.9, 10), std({ color: 0x14161c, metalness: 0.6, roughness: 0.4 })); post.position.y = 0.45; g.add(post);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.13, 0.03, 8, 16), new THREE.MeshBasicMaterial({ color: accent })); ring.rotation.x = Math.PI / 2; ring.position.y = 0.78; g.add(ring);
  return g;
}
function hydrant() {
  const g = new THREE.Group();
  const red = std({ color: 0xc62828, roughness: 0.6, metalness: 0.2 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.5, 10), red); body.position.y = 0.3; body.castShadow = true; g.add(body);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), red); cap.position.y = 0.58; g.add(cap);
  for (const [ax, az] of [[0.18, 0], [-0.18, 0], [0, 0.18]]) { const n = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.14, 8), red); n.rotation.z = Math.PI / 2; n.position.set(ax, 0.36, az); g.add(n); }
  return g;
}
function newsbox(accent) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.45), std({ color: accent, roughness: 0.5, metalness: 0.3 })); body.position.y = 0.55; body.castShadow = true; g.add(body);
  const win = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.02), std({ color: 0x0a0a12, roughness: 0.2, metalness: 0.1, emissive: C(0x223), emissiveIntensity: 0.3 })); win.position.set(0, 0.72, 0.24); g.add(win);
  for (const lx of [-0.18, 0.18]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.2, 6), std({ color: 0x14161c })); leg.position.set(lx, 0.1, 0); g.add(leg); }
  return g;
}
function streetlamp() {
  const g = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 6.2, 8), std({ color: 0x14161f, metalness: 0.6 })); pole.position.y = 3.1; pole.castShadow = true; g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 1.3), std({ color: 0x14161f })); arm.position.set(0, 6.0, 0.55); g.add(arm);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.24, 0.9), std({ color: 0x1a1c26, emissive: C(0xffdca0), emissiveIntensity: 1.3 })); head.position.set(0, 5.9, 1.1); g.add(head);
  const light = new THREE.PointLight(0xffe6b0, 9, 26, 2); light.position.set(0, 5.7, 1.1); g.add(light);
  return { group: g, light };
}
function foodCart(accent = 0xff6b35) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.2, 1.3), std({ color: 0xe8e4d8, roughness: 0.6 })); body.position.y = 0.9; body.castShadow = true; g.add(body);
  const counter = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.1, 1.4), std({ color: 0xb0b4bc, metalness: 0.6, roughness: 0.4 })); counter.position.y = 1.5; g.add(counter);
  // striped awning
  for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.37, 0.06, 1.1), std({ color: i % 2 ? 0xffffff : accent, roughness: 0.7 })); s.position.set(-0.92 + i * 0.37, 2.2 - (i % 2) * 0, 0.9); s.rotation.x = -0.5; g.add(s); }
  for (const lx of [-1.0, 1.0]) { const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 6), std({ color: 0x8a8f98, metalness: 0.6 })); pole.position.set(lx, 1.85, 0.9); g.add(pole); }
  // wheels
  for (const wx of [-0.9, 0.9]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.16, 14), std({ color: 0x111118, roughness: 0.8 })); w.rotation.z = Math.PI / 2; w.position.set(wx, 0.34, -0.5); g.add(w); }
  const sign = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.4, 0.06), std({ color: 0x0a0a12, emissive: C(accent), emissiveIntensity: 0.7 })); sign.position.set(0, 1.95, -0.66); g.add(sign);
  const gl = new THREE.PointLight(accent, 2.4, 8, 2); gl.position.set(0, 1.8, 0.6); g.add(gl);
  return { group: g, light: gl };
}

export function buildStreetProps(scene, {
  groundY, center = [0, 0], radius = 34, accent = 0x39ff14,
  avoid = [], maxLamps = 6,
} = {}) {
  const root = new THREE.Group(); scene.add(root);
  const lamps = [];
  const [cx, cz] = center;
  const accents = [accent, 0x00f3ff, 0xff2bd0, 0xffd24a, 0xb967ff];
  const clear = (x, z) => avoid.every((a) => Math.hypot(x - a[0], z - a[1]) > (a[2] || 4));

  // seat a group on the ground at (x,z); returns false if off the walkable mesh
  const place = (obj, x, z, ry = 0) => {
    const y = groundY(x, z, 400);
    if (y == null) return false;
    obj.position.set(x, y + 0.01, z); obj.rotation.y = ry; root.add(obj); return true;
  };
  // scatter N of a thing on a ring band around the plaza
  const scatter = (n, make, { rMin = radius * 0.45, rMax = radius * 0.95, faceIn = true } = {}) => {
    let placed = 0, guard = 0;
    while (placed < n && guard < n * 40) {
      guard++;
      const a = Math.random() * Math.PI * 2;
      const r = rMin + Math.random() * (rMax - rMin);
      const x = cx + Math.cos(a) * r, z = cz + Math.sin(a) * r;
      if (!clear(x, z)) continue;
      const ry = faceIn ? Math.atan2(cx - x, cz - z) + (Math.random() - 0.5) * 0.5 : Math.random() * Math.PI * 2;
      const made = make();
      if (place(made.group || made, x, z, ry)) { placed++; if (made.light) lamps.push(made.light); }
    }
  };

  scatter(6, () => bench(), { rMin: radius * 0.4, rMax: radius * 0.8 });
  scatter(8, () => planter(), { rMin: radius * 0.35, rMax: radius * 0.9, faceIn: false });
  scatter(6, () => trashCan(), { rMin: radius * 0.4, rMax: radius * 0.85, faceIn: false });
  scatter(10, () => bollard(accents[(Math.random() * accents.length) | 0]), { rMin: radius * 0.3, rMax: radius * 0.6, faceIn: false });
  scatter(3, () => hydrant(), { rMin: radius * 0.4, rMax: radius * 0.9, faceIn: false });
  scatter(4, () => newsbox(accents[(Math.random() * accents.length) | 0]), { rMin: radius * 0.45, rMax: radius * 0.85 });
  scatter(maxLamps, () => streetlamp(), { rMin: radius * 0.5, rMax: radius * 0.92, faceIn: false });
  scatter(1, () => foodCart(0xff6b35), { rMin: radius * 0.35, rMax: radius * 0.55 });

  return { group: root, lamps };
}
