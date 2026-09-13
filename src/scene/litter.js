import * as THREE from 'three';

// Festival-aftermath ground dressing: a cheap instanced scatter of confetti
// flecks + stray flattened debris lying flat on the ground. Purely decorative
// (non-interactive — the pickable trash is a separate system with glowing
// beacons), it just makes the grounds feel lived-in and grimy. One draw call
// per layer. Colours drawn from the passed palette.
export function buildLitter(scene, {
  count = 420,
  area = [46, 46],          // x, z extent centred on `center`
  center = [0, 0],
  avoid = [],               // [x, z, r] keep-out discs (stage front, structures)
  colors = ['#ff0055', '#00f3ff', '#39ff14', '#b967ff', '#ffe08a', '#ffffff'],
  y = 0.02,
} = {}) {
  const root = new THREE.Group(); scene.add(root);
  const cols = colors.map((c) => new THREE.Color(c));
  const [ax, az] = area, [cx, cz] = center;

  // one flat quad, instanced, laid on the ground with random yaw + slight scale
  const geo = new THREE.PlaneGeometry(1, 1);
  geo.rotateX(-Math.PI / 2);
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, opacity: 0.85, depthWrite: false });
  const mesh = new THREE.InstancedMesh(geo, mat, count);
  mesh.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
  mesh.receiveShadow = false; mesh.castShadow = false;

  const dummy = new THREE.Object3D();
  const clear = (x, z) => avoid.every((a) => Math.hypot(x - a[0], z - a[1]) > (a[2] || 3));
  let n = 0, guard = 0;
  while (n < count && guard < count * 30) {
    guard++;
    const x = cx + (Math.random() - 0.5) * ax;
    const z = cz + (Math.random() - 0.5) * az;
    if (!clear(x, z)) continue;
    dummy.position.set(x, y + Math.random() * 0.015, z);
    dummy.rotation.set(0, Math.random() * Math.PI * 2, 0);
    const s = 0.05 + Math.random() * 0.14;                 // confetti fleck → small scrap
    dummy.scale.set(s, 1, s * (0.5 + Math.random()));
    dummy.updateMatrix();
    mesh.setMatrixAt(n, dummy.matrix);
    const c = cols[(Math.random() * cols.length) | 0];
    mesh.setColorAt(n, c);
    n++;
  }
  mesh.count = n;
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  root.add(mesh);

  return { group: root, mesh, count: n };
}
