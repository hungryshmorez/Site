import * as THREE from 'three';

// Hidden trash scattered across the festival grounds. Find every piece, carry
// it to the dumpster, and cleaning up the whole place unlocks a secret
// download — a small reward for being a good person.
//
// Pick up:  walk within reach of a piece, OR click it.
// Deposit:  walk up to the dumpster (it glows while you're carrying).
// Finish:   every piece dumped → onComplete fires once.

// Hand-placed spots across walkable ground — tucked near edges, behind the
// crowd, off to the flanks — avoiding the stage front and the structures.
const SPOTS = [
  [5, 5], [-4, -3], [-12, 9], [14, 11], [2, -13],
  [-19, -2], [21, 15], [-9, 19], [9, 22], [17, -9],
];

const KINDS = ['can', 'bottle', 'cup', 'bag', 'paper'];
const LABELS = {
  can: 'a crushed can', bottle: 'an empty bottle', cup: 'a solo cup',
  bag: 'a chip bag', paper: 'a flyer',
};

function buildPiece(kind) {
  let mesh;
  switch (kind) {
    case 'can':
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.22, 12),
        new THREE.MeshStandardMaterial({ color: 0xc2c6ce, metalness: 0.9, roughness: 0.32 })
      );
      mesh.scale.set(1, 0.7, 0.55);          // crushed
      mesh.rotation.set(0, 0, Math.PI / 2);
      break;
    case 'bottle':
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.07, 0.3, 12),
        new THREE.MeshStandardMaterial({ color: 0x2e6b3a, metalness: 0.1, roughness: 0.08, transparent: true, opacity: 0.6 })
      );
      mesh.rotation.set(0, 0, Math.PI / 2.1);
      break;
    case 'cup':
      mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.075, 0.2, 16, 1, true),
        new THREE.MeshStandardMaterial({ color: 0xd11e2a, roughness: 0.6, side: THREE.DoubleSide })
      );
      mesh.rotation.set(0.2, 0, 1.35);
      break;
    case 'bag':
      mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.13, 0),
        new THREE.MeshStandardMaterial({ color: 0xe8c24a, metalness: 0.55, roughness: 0.45 })
      );
      mesh.scale.set(1.1, 0.5, 1);
      break;
    default: // paper / flyer
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.22, 0.015, 0.16),
        new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: 0.9 })
      );
      mesh.rotation.set(0.25, 0.6, 0.12);
  }
  mesh.castShadow = true;
  return mesh;
}

function buildDumpster() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 1.4, 1.4),
    new THREE.MeshStandardMaterial({ color: 0x2f7d3a, metalness: 0.3, roughness: 0.7 })
  );
  body.position.y = 0.72; body.castShadow = true; body.receiveShadow = true; group.add(body);

  const lidMat = new THREE.MeshStandardMaterial({ color: 0x24602c, metalness: 0.3, roughness: 0.6 });
  const lidL = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.08, 1.5), lidMat);
  lidL.position.set(-0.6, 1.46, -0.12); lidL.rotation.x = -0.55; group.add(lidL);
  const lidR = lidL.clone(); lidR.position.x = 0.6; group.add(lidR);

  // ground glow ring — brightens while you're carrying trash, to guide you here
  const glow = new THREE.Mesh(
    new THREE.RingGeometry(1.7, 2.4, 40),
    new THREE.MeshBasicMaterial({ color: 0x39ff14, transparent: true, opacity: 0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  glow.rotation.x = -Math.PI / 2; glow.position.y = 0.03; group.add(glow);

  return { group, glow };
}

export function buildTrash(scene, {
  dumpsterPos = [16, 16],
  reach = 1.8,           // walk-over pickup radius
  depositRange = 3.4,    // how close to the dumpster to dump
  onPickup, onDeposit, onComplete,
} = {}) {
  const root = new THREE.Group();
  scene.add(root);

  const pieces = [];
  SPOTS.forEach((p, i) => {
    const kind = KINDS[i % KINDS.length];
    const g = new THREE.Group();
    g.position.set(p[0], 0, p[1]);
    g.rotation.y = Math.random() * Math.PI * 2;

    const mesh = buildPiece(kind);
    mesh.position.y = 0.11;
    g.add(mesh);

    // faint glint so a keen eye can spot it without it screaming "game object"
    const glint = new THREE.Mesh(
      new THREE.SphereGeometry(0.045, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    glint.position.y = 0.3; g.add(glint);

    // generous invisible proxy so it's easy to tap
    const proxy = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8), new THREE.MeshBasicMaterial({ visible: false }));
    proxy.position.y = 0.2; g.add(proxy);

    root.add(g);
    const piece = { kind, group: g, glint, proxy, pos: new THREE.Vector3(p[0], 0, p[1]), taken: false, phase: Math.random() * 6.283 };
    proxy.userData.piece = piece;
    pieces.push(piece);
  });

  const dumpster = buildDumpster();
  dumpster.group.position.set(dumpsterPos[0], 0, dumpsterPos[1]);
  dumpster.group.rotation.y = Math.atan2(0 - dumpsterPos[0], -4 - dumpsterPos[1]); // face center
  const dumpPos = new THREE.Vector3(dumpsterPos[0], 0, dumpsterPos[1]);
  scene.add(dumpster.group);

  const state = { total: pieces.length, found: 0, dumped: 0, held: 0, done: false };
  const publicState = () => ({ ...state });

  function pickup(piece) {
    if (piece.taken) return false;
    piece.taken = true;
    piece.group.visible = false;
    state.found++; state.held++;
    onPickup && onPickup(LABELS[piece.kind], publicState());
    return true;
  }

  // click support — nearest untaken piece under the ray
  function intersect(raycaster) {
    const hits = raycaster.intersectObjects(pieces.filter((p) => !p.taken).map((p) => p.proxy), false);
    return hits[0] ? hits[0].object.userData.piece : null;
  }
  function tryClick(raycaster) {
    const piece = intersect(raycaster);
    if (piece) { pickup(piece); return true; }
    return false;
  }

  function deposit() {
    if (state.held <= 0) return;
    const n = state.held;
    state.dumped += n; state.held = 0;
    onDeposit && onDeposit(n, publicState());
    if (!state.done && state.dumped >= state.total) {
      state.done = true;
      onComplete && onComplete(publicState());
    }
  }

  function update(dt, time, pulse, playerPos) {
    for (const piece of pieces) {
      if (piece.taken) continue;
      // slow spin + twinkle so it catches the eye at the right angle
      piece.group.rotation.y += dt * 0.3;
      piece.glint.material.opacity = 0.35 + 0.4 * (0.5 + 0.5 * Math.sin(time * 2.2 + piece.phase));
      piece.glint.scale.setScalar(0.8 + 0.5 * Math.sin(time * 2.2 + piece.phase));
      // proximity pickup
      if (playerPos && playerPos.distanceTo(piece.pos) < reach) pickup(piece);
    }

    // dumpster attracts you while carrying; deposit on arrival
    const near = playerPos ? playerPos.distanceTo(dumpPos) : Infinity;
    const wantGlow = state.held > 0 ? 0.35 + 0.3 * (0.5 + 0.5 * Math.sin(time * 3)) : 0;
    dumpster.glow.material.opacity += (wantGlow - dumpster.glow.material.opacity) * Math.min(1, dt * 6);
    dumpster.glow.scale.setScalar(1 + pulse * 0.15);
    if (state.held > 0 && near < depositRange) deposit();
  }

  return { update, tryClick, state: publicState, dumpsterPos: dumpPos };
}
