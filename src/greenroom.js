import { createRoom } from './scene/roomkit.js';

// GREEN ROOM / BACKSTAGE — a cozy artist's lounge before the show: couches, a lit
// vanity mirror, a wardrobe rack, setlists on the wall, string lights, a mini-fridge.
// Part of the big loop (DJ Decks ◂ ▸ Lo-Fi), with its own set of DJ decks.
const R = createRoom({
  id: 'greenroom', hook: '__gr', fog: [0x1a1410, 0.02], exposure: 1.25,
  bounds: 13, zMin: -13, spawn: [0, 1.6, 11], yaw: 0,
  backAt: [0, 11.6, Math.PI], nextAt: [0, -12.4, 0], deckAt: [10, 4, -Math.PI / 2], deckColor: 0x39ff88,
  motes: { color: 0xffcf9a, count: 110, opacity: 0.35, rise: 0.2 }, haze: { color: 0x2a1810, opacity: 0.045 },
});
const { scene, updaters, std, C, textPlane, THREE } = R;

scene.add(new THREE.HemisphereLight(0x8a7458, 0x241a12, 1.15));
scene.add(new THREE.AmbientLight(0x40342a, 0.55));
const warm = new THREE.PointLight(0xffcf9a, 3.2, 34, 2); warm.position.set(0, 6, 2); scene.add(warm);
const warm2 = new THREE.PointLight(0xffb877, 2.2, 24, 2); warm2.position.set(-4, 4, 4); scene.add(warm2);
const warm3 = new THREE.PointLight(0xffd8a0, 1.8, 20, 2); warm3.position.set(6, 4, -6); scene.add(warm3);

// ---- room shell: warm carpeted floor + walls ----
{
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), std({ color: 0x2a2018, roughness: 0.95, emissive: C(0x140f0a), emissiveIntensity: 0.25 }));
  floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const wm = std({ color: 0x241a26, roughness: 0.9, emissive: C(0x140a18), emissiveIntensity: 0.25 });
  const mk = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wm); m.position.set(x, y, z); scene.add(m); };
  mk(26, 8, 0.5, 0, 4, -13); mk(0.5, 8, 26, -13, 4, 0); mk(0.5, 8, 26, 13, 4, 0); mk(26, 8, 0.5, 0, 4, 13);
  // warm rug
  const rug = new THREE.Mesh(new THREE.CircleGeometry(4.5, 40), std({ color: 0x6a2a3a, roughness: 1, emissive: C(0x2a0f18), emissiveIntensity: 0.25 })); rug.rotation.x = -Math.PI / 2; rug.position.set(-3, 0.02, 0); scene.add(rug);
}

// ---- lit vanity mirror (bulbs around a mirror) ----
{
  const g = new THREE.Group(); g.position.set(-7.5, 0, -12.4); scene.add(g);   // off-centre so the forward door stays clear
  const frame = new THREE.Mesh(new THREE.BoxGeometry(4.2, 3.2, 0.3), std({ color: 0x141018, roughness: 0.5, metalness: 0.4 })); frame.position.set(0, 3, 0); g.add(frame);
  const mirror = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.4), std({ color: 0x9fb0c8, roughness: 0.1, metalness: 0.9, emissive: C(0x223040), emissiveIntensity: 0.4 })); mirror.position.set(0, 3, 0.18); g.add(mirror);
  const bulbs = [];
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2; const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffe6b0 })); b.position.set(Math.cos(a) * 2.4, 3 + Math.sin(a) * 1.7, 0.2); g.add(b); bulbs.push(b); }
  const gl = new THREE.PointLight(0xffe6b0, 2.2, 12, 2); gl.position.set(0, 3, 2); g.add(gl);
  updaters.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHSL(0.1, 0.5, 0.6 + Math.sin(t * 2 + i * 0.5) * 0.12)));
  const cap = textPlane('GREEN ROOM', '#39ff88', 512, 64); cap.position.set(0, 5.4, 0.2); cap.scale.set(5, 0.7, 1); g.add(cap);
}

// ---- L-shaped couch + coffee table ----
{
  const cf = std({ color: 0x3a4a3a, roughness: 0.95, emissive: C(0x0f1a0f), emissiveIntensity: 0.2 });
  const seat = (w, d, x, z) => { const s = new THREE.Mesh(new THREE.BoxGeometry(w, 0.5, d), cf); s.position.set(x, 0.4, z); s.castShadow = true; scene.add(s); const b = new THREE.Mesh(new THREE.BoxGeometry(w, 0.8, 0.3), cf); b.position.set(x, 0.85, z - d / 2 + 0.15); scene.add(b); };
  seat(5, 1.4, -3, 3.2); seat(1.4, 3.6, -5.3, 1.2);
  for (const [px, col] of [[-4.6, 0x39ff88], [-1.4, 0xffcf6a]]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.2), std({ color: col, roughness: 0.9, emissive: C(col), emissiveIntensity: 0.3 })); p.position.set(px, 0.9, 2.7); p.rotation.z = 0.3; scene.add(p); }
  const table = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.15, 20), std({ color: 0x2a1a12, roughness: 0.6 })); table.position.set(-3, 0.5, 1); scene.add(table);
  // drinks on the table
  for (const dx of [-0.4, 0, 0.4]) { const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.07, 0.24, 10), std({ color: 0xd11e2a, roughness: 0.6 })); cup.position.set(-3 + dx, 0.7, 1 + (Math.random() - 0.5) * 0.4); scene.add(cup); }
}

// ---- wardrobe rack with garments ----
{
  const g = new THREE.Group(); g.position.set(8, 0, -8); scene.add(g);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 5, 8), std({ color: 0x888, metalness: 0.8, roughness: 0.3 })); bar.rotation.z = Math.PI / 2; bar.position.y = 3.2; g.add(bar);
  for (const lx of [-2.4, 2.4]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 3.3, 8), std({ color: 0x444, metalness: 0.7 })); post.position.set(lx, 1.65, 0); g.add(post); }
  const cols = [0xff2bd0, 0x00f3ff, 0x39ff14, 0xffe14a, 0x8a5cff, 0xff7b2a];
  for (let i = 0; i < 6; i++) { const gm = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.6, 0.18), std({ color: cols[i], roughness: 0.85, emissive: C(cols[i]), emissiveIntensity: 0.15 })); gm.position.set(-2 + i * 0.8, 2.2, 0); g.add(gm); }
}

// ---- setlist / poster wall ----
for (const [x, z, ry, txt, col] of [[-12.4, -4, Math.PI / 2, 'TONIGHT: 12MATT3R', '#ff2bd0'], [-12.4, 4, Math.PI / 2, 'SET · 90 MIN', '#00f3ff'], [12.4, 2, -Math.PI / 2, 'SOFA KING SAD BOI', '#39ff88']]) {
  const board = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 2), std({ color: 0x0e0e14, roughness: 0.8, emissive: C(0x141018), emissiveIntensity: 0.3 })); board.position.set(x, 3, z); board.rotation.y = ry; scene.add(board);
  const t = textPlane(txt, col, 512, 96); t.position.set(x + (x < 0 ? 0.06 : -0.06), 3, z); t.rotation.y = ry; t.scale.set(2.8, 0.9, 1); scene.add(t);
}

// ---- string lights across the ceiling ----
{
  const bulbs = [];
  for (let s = 0; s < 3; s++) { const z = -6 + s * 6; for (let i = 0; i < 12; i++) { const tt = i / 11; const b = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(-11 + tt * 22, 6.2 - Math.sin(tt * Math.PI) * 0.8, z); scene.add(b); bulbs.push(b); } }
  updaters.push((dt, t) => bulbs.forEach((b, i) => b.material.color.setHSL(0.11, 0.6, 0.55 + Math.sin(t * 1.6 + i * 0.4) * 0.15)));
}
