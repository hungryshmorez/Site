import * as THREE from 'three';
import { gltfLoader as _gltf } from './loaders.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

// Loaders for the uploaded tree.obj + pool.glb. The tree OBJ ships with no
// materials, so we tint it by height — brown trunk near the base, green canopy
// above — via vertex colours. Both come back centred with their base on the
// ground, normalized to a target size, ready to clone/place.
const _obj = new OBJLoader();

export function loadTree({ height = 6, onReady, onError } = {}) {
  _obj.load('models/props/tree.obj', (o) => {
    let mesh = null; o.traverse((c) => { if (c.isMesh && !mesh) mesh = c; });
    if (!mesh) { onError && onError('no mesh'); return; }
    const geo = mesh.geometry; geo.computeBoundingBox();
    const bb = geo.boundingBox, minY = bb.min.y, h = (bb.max.y - bb.min.y) || 1;
    const pos = geo.getAttribute('position');
    const colors = new Float32Array(pos.count * 3);
    const trunk = new THREE.Color(0x5a3a22), leafA = new THREE.Color(0x2f6b34), leafB = new THREE.Color(0x3f8a44);
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) - minY) / h;
      const c = t < 0.28 ? trunk : (((i * 2654435761) % 100) / 100 < 0.5 ? leafA : leafB);
      colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    if (!geo.getAttribute('normal')) geo.computeVertexNormals();
    const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 }));
    m.castShadow = true; m.frustumCulled = false;
    const s = height / h; m.scale.setScalar(s); m.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(m), ctr = box.getCenter(new THREE.Vector3());
    m.position.set(-ctr.x, -box.min.y, -ctr.z);
    onReady && onReady(m);
  }, undefined, (e) => { onError ? onError(e) : console.error('tree load failed', e); });
}

export function loadPool({ size = 7, onReady, onError } = {}) {
  _gltf.load('models/props/pool.glb', (g) => {
    const m = g.scene; m.traverse((o) => { if (o.isMesh) { o.receiveShadow = true; if (o.material) o.material.side = THREE.FrontSide; } });
    m.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(m), dim = box.getSize(new THREE.Vector3());
    const s = size / Math.max(dim.x, dim.z, 0.001); m.scale.setScalar(s); m.updateMatrixWorld(true);
    const b2 = new THREE.Box3().setFromObject(m), c2 = b2.getCenter(new THREE.Vector3());
    m.position.set(-c2.x, -b2.min.y, -c2.z);
    onReady && onReady(m);
  }, undefined, (e) => { onError ? onError(e) : console.error('pool load failed', e); });
}
