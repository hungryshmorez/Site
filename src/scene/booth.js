import * as THREE from 'three';
import { textPlane } from './signs.js';

// A VOTING BOOTH you can walk into — red/white/blue valance, a glowing ballot
// screen, a "VOTE · CHROMA AWARDS" sign. Used all over: the lobby, every theater.
// `rotY` must be a multiple of π/2; rotY 0 opens toward +x.
// Returns the walls as AABB `blockers` and the walk-in `trigger` rect (world space),
// plus an `update(dt, t)` that pulses the ballot screen.

const basic = (c) => new THREE.MeshBasicMaterial({ color: c, toneMapped: false });

export function votingBooth({ parent, x, z, rotY = 0 }) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = rotY; parent.add(g);
  const panel = new THREE.MeshStandardMaterial({ color: 0xf2f2f6, roughness: 0.7 });
  const add = (w, h, d, mat, px, py, pz) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat); m.position.set(px, py, pz); g.add(m); return m; };
  add(0.15, 3, 2.8, panel, -1.35, 1.5, 0);          // back
  add(2.7, 3, 0.15, panel, 0, 1.5, -1.4);            // sides
  add(2.7, 3, 0.15, panel, 0, 1.5, 1.4);
  add(2.9, 0.15, 3, panel, 0, 3.05, 0);              // roof
  const stripe = [0xff2a3a, 0xffffff, 0x2a5bff];
  for (let i = 0; i < 9; i++) add(0.12, 0.6, 3 / 9, basic(stripe[i % 3]), 1.4, 2.7, -1.33 + i * (2.66 / 8));
  add(1.2, 0.9, 1.4, new THREE.MeshStandardMaterial({ color: 0x20243a }), -0.7, 0.45, 0);
  const ballot = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.7), basic(0x00f3ff));
  ballot.position.set(-0.08, 1.25, 0); ballot.rotation.y = Math.PI / 2; g.add(ballot);
  const sign = textPlane('VOTE', 3.2, 1.1, { color: '#fff', bg: '#102a8a', glow: '#2a5bff', sub: 'CHROMA AWARDS' });
  sign.position.set(1.5, 3.9, 0); sign.rotation.y = Math.PI / 2; g.add(sign);
  const back = sign.clone(); back.rotation.y = -Math.PI / 2; back.position.x = -1.5; g.add(back);
  const pad = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.7, 32), basic(0x2a5bff));
  pad.rotation.x = -Math.PI / 2; pad.position.set(-0.2, 0.03, 0); g.add(pad);
  const light = new THREE.PointLight(0x6a9aff, 6, 8, 1.6); light.position.set(0, 2.6, 0); g.add(light);

  // local rect → world AABB (rotY is a multiple of π/2)
  const c = Math.round(Math.cos(rotY)), s = Math.round(Math.sin(rotY));
  const world = (x0, x1, z0, z1) => {
    const pts = [[x0, z0], [x0, z1], [x1, z0], [x1, z1]].map(([lx, lz]) => [x + lx * c + lz * s, z - lx * s + lz * c]);
    const xs = pts.map((p) => p[0]), zs = pts.map((p) => p[1]);
    return { x0: Math.min(...xs), x1: Math.max(...xs), z0: Math.min(...zs), z1: Math.max(...zs) };
  };
  return {
    blockers: [world(-1.45, -1.25, -1.5, 1.5), world(-1.4, 1.4, -1.5, -1.3), world(-1.4, 1.4, 1.3, 1.5)],
    trigger: world(-0.9, 0.5, -0.8, 0.8),
    center: { x, z },
    update: (dt, t) => { ballot.material.color.setHex(0x00f3ff).multiplyScalar(0.7 + 0.3 * Math.sin(t * 3)); },
  };
}
