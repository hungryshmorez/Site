import * as THREE from 'three';

// Shared BACKSTAGE / WAREHOUSE dressing for the complex loop rooms — stacked
// crates, cable spools, road cases, a small amp stack, folding chairs and
// clustered cans/bottles, plus cable runs snaking along the floor. Everything
// hugs the walls (out of the walk path) and stays clear of the doors + DJ deck.
// One call from roomkit gives every loop room a lived-in, gigged-in feel.

const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

function crateStack(accent) {
  const g = new THREE.Group();
  const n = 1 + (Math.random() * 3 | 0);
  let y = 0;
  for (let i = 0; i < n; i++) {
    const s = 0.7 + Math.random() * 0.5;
    const crate = new THREE.Mesh(new THREE.BoxGeometry(s, s, s), std({ color: 0x3a2a1a, roughness: 0.85, emissive: C(accent), emissiveIntensity: 0.04 }));
    crate.position.set((Math.random() - 0.5) * 0.2, y + s / 2, (Math.random() - 0.5) * 0.2);
    crate.rotation.y = (Math.random() - 0.5) * 0.4; crate.castShadow = true; g.add(crate);
    // slat lines
    const edge = new THREE.Mesh(new THREE.BoxGeometry(s * 1.01, 0.04, s * 1.01), std({ color: 0x241a10 })); edge.position.y = y + s / 2; g.add(edge);
    y += s;
  }
  return g;
}
function cableSpool() {
  const g = new THREE.Group();
  const mat = std({ color: 0x4a3524, roughness: 0.9 });
  for (const zy of [-0.35, 0.35]) { const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.08, 20), mat); disc.rotation.x = Math.PI / 2; disc.position.z = zy; g.add(disc); }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.7, 16), std({ color: 0x14100a, roughness: 1 })); hub.rotation.x = Math.PI / 2; g.add(hub);
  const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.6, 20), std({ color: 0x0a0a0e, roughness: 0.7 })); cable.rotation.x = Math.PI / 2; g.add(cable);
  g.position.y = 0.8; g.rotation.z = Math.PI / 2; // rest on its side
  const holder = new THREE.Group(); holder.add(g); return holder;
}
function roadCase(accent) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.0, 0.9), std({ color: 0x111118, roughness: 0.5, metalness: 0.3 })); body.position.y = 0.5; body.castShadow = true; g.add(body);
  // metal corners + latches
  const mMat = std({ color: 0xb0b4bc, metalness: 0.8, roughness: 0.35 });
  for (const sx of [-0.63, 0.63]) for (const sy of [0.06, 0.94]) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.96), mMat); c.position.set(sx, sy, 0); g.add(c); }
  const latch = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.04), mMat); latch.position.set(0, 0.5, 0.47); g.add(latch);
  const sticker = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.3), std({ color: 0x0a0a12, emissive: C(accent), emissiveIntensity: 0.5 })); sticker.position.set(0, 0.62, 0.46); g.add(sticker);
  return g;
}
function ampStack(accent) {
  const g = new THREE.Group();
  const cab = std({ color: 0x0c0c10, roughness: 0.8 });
  for (const [y, w] of [[0.4, 1.4], [1.15, 1.4]]) {
    const c = new THREE.Mesh(new THREE.BoxGeometry(w, 0.7, 0.7), cab); c.position.y = y; c.castShadow = true; g.add(c);
    const grille = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.8, 0.5), std({ color: 0x1a1a1f, roughness: 1, emissive: C(accent), emissiveIntensity: 0.06 })); grille.position.set(0, y, 0.36); g.add(grille);
  }
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.03, 6, 6), new THREE.MeshBasicMaterial({ color: accent })); led.position.set(0.6, 1.45, 0.36); g.add(led);
  return g;
}
function foldingChair() {
  const g = new THREE.Group();
  const mat = std({ color: 0x20242c, metalness: 0.5, roughness: 0.5 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.5), mat); seat.position.y = 0.5; g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.05), mat); back.position.set(0, 0.75, -0.24); g.add(back);
  for (const [lx, lz] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 6), mat); leg.position.set(lx, 0.25, lz); g.add(leg); }
  g.rotation.y = Math.random() * Math.PI * 2;
  return g;
}
function cansCluster(accent) {
  const g = new THREE.Group();
  const n = 3 + (Math.random() * 4 | 0);
  for (let i = 0; i < n; i++) {
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.16, 10), std({ color: [0xc2c6ce, 0x2e6b3a, 0xd11e2a][i % 3], metalness: 0.6, roughness: 0.35 }));
    const a = Math.random() * Math.PI * 2, r = Math.random() * 0.4;
    can.position.set(Math.cos(a) * r, 0.08, Math.sin(a) * r);
    if (Math.random() < 0.5) { can.rotation.z = Math.PI / 2; can.position.y = 0.06; }
    g.add(can);
  }
  return g;
}

export function buildRoomDetail(scene, {
  bounds = 13, zMin = -13, accent = 0x00f3ff,
  avoid = [],           // [x, z, r] keep-out (doors, deck, spawn)
  density = 1,
} = {}) {
  const root = new THREE.Group(); scene.add(root);
  const lights = [];
  const inset = 1.4;
  const clear = (x, z) => avoid.every((a) => Math.hypot(x - a[0], z - a[1]) > (a[2] || 3));
  const place = (obj, x, z, ry) => { obj.position.set(x, 0, z); if (ry != null) obj.rotation.y = ry; root.add(obj); };

  // candidate spots hugging the four walls
  const spots = [];
  const b = bounds - inset, zN = zMin + inset;
  for (const t of [-0.75, -0.4, 0.4, 0.75]) {
    spots.push([t * b, b, Math.PI]);        // far (+z) wall, face -z
    spots.push([t * b, zN, 0]);             // near (-z) wall, face +z
  }
  for (const t of [-0.6, 0, 0.6]) {
    const zt = zMin + (bounds - zMin) * (0.5 + t * 0.4);
    spots.push([-b, zt, Math.PI / 2]);      // left wall
    spots.push([b, zt, -Math.PI / 2]);      // right wall
  }

  const makers = [
    () => crateStack(accent), () => crateStack(accent), () => roadCase(accent),
    () => cableSpool(), () => ampStack(accent), () => foldingChair(), () => cansCluster(accent),
  ];
  const shuffled = spots.sort(() => Math.random() - 0.5);
  const n = Math.min(shuffled.length, Math.round(9 * density));
  let placed = 0;
  for (const [x, z, ry] of shuffled) {
    if (placed >= n) break;
    if (!clear(x, z)) continue;
    const obj = makers[(Math.random() * makers.length) | 0]();
    place(obj, x + (Math.random() - 0.5) * 0.8, z, ry + (Math.random() - 0.5) * 0.4);
    placed++;
  }

  // a couple of floor cable runs snaking from a wall toward the center
  for (let i = 0; i < 2; i++) {
    const sx = (Math.random() < 0.5 ? -1 : 1) * (bounds - 0.6);
    const pts = [];
    for (let s = 0; s <= 6; s++) { const tt = s / 6; pts.push(new THREE.Vector3(sx * (1 - tt) + (Math.random() - 0.5) * 1.5, 0.04, zMin + (bounds - zMin) * (0.3 + 0.4 * tt))); }
    const curve = new THREE.CatmullRomCurve3(pts);
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 30, 0.05, 6, false), std({ color: 0x0a0a0e, roughness: 0.7 }));
    root.add(tube);
  }

  return { group: root, lights };
}
