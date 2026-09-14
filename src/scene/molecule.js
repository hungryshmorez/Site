import * as THREE from 'three';
import { PDBLoader } from 'three/examples/jsm/loaders/PDBLoader.js';

// Build a ball-and-stick MOLECULE from a .pdb file: coloured atom spheres + grey
// bond cylinders, merged into one group, centred and normalized so its longest
// dimension is `size` world units. Returns the group via onReady (async load).
//
//   loadMolecule('models/molecules/lsd.pdb', { size: 1.4, onReady: (g) => scene.add(g) });
const _loader = new PDBLoader();
const _cache = {};

export function loadMolecule(url, { size = 1.4, atomScale = 0.28, bondRadius = 0.06, onReady, onError } = {}) {
  const build = (pdb) => {
    const group = new THREE.Group();
    const atomGeo = new THREE.IcosahedronGeometry(1, 2);
    const posA = pdb.geometryAtoms.getAttribute('position');
    const colA = pdb.geometryAtoms.getAttribute('color');
    const p = new THREE.Vector3(), c = new THREE.Color();
    for (let i = 0; i < posA.count; i++) {
      p.fromBufferAttribute(posA, i); c.fromBufferAttribute(colA, i);
      const mat = new THREE.MeshStandardMaterial({ color: c.clone(), roughness: 0.35, metalness: 0.1, emissive: c.clone().multiplyScalar(0.25), emissiveIntensity: 0.5 });
      const a = new THREE.Mesh(atomGeo, mat); a.position.copy(p); a.scale.setScalar(atomScale); group.add(a);
    }
    // bonds — consecutive vertex pairs in geometryBonds
    const posB = pdb.geometryBonds.getAttribute('position');
    const bondMat = new THREE.MeshStandardMaterial({ color: 0xbfc4cc, roughness: 0.5, metalness: 0.2 });
    const s = new THREE.Vector3(), e = new THREE.Vector3(), mid = new THREE.Vector3(), dir = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0), q = new THREE.Quaternion();
    const cyl = new THREE.CylinderGeometry(bondRadius, bondRadius, 1, 8);
    for (let i = 0; i < posB.count; i += 2) {
      s.fromBufferAttribute(posB, i); e.fromBufferAttribute(posB, i + 1);
      const len = s.distanceTo(e); if (len < 0.001) continue;
      dir.subVectors(e, s).normalize(); q.setFromUnitVectors(up, dir);
      const b = new THREE.Mesh(cyl, bondMat);
      b.position.copy(mid.addVectors(s, e).multiplyScalar(0.5)); b.quaternion.copy(q); b.scale.set(1, len, 1);
      group.add(b);
    }
    // centre + normalize to `size`
    group.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(group);
    const ctr = box.getCenter(new THREE.Vector3()); const dim = box.getSize(new THREE.Vector3());
    for (const ch of group.children) ch.position.sub(ctr);
    const sc = size / Math.max(dim.x, dim.y, dim.z, 0.001);
    group.scale.setScalar(sc);
    group.traverse((o) => { if (o.isMesh) o.frustumCulled = false; });
    onReady && onReady(group);
  };
  if (_cache[url]) { build(_cache[url]); return; }
  _loader.load(url, (pdb) => { _cache[url] = pdb; build(pdb); }, undefined, (err) => { onError ? onError(err) : console.error('molecule load failed', url, err); });
}
