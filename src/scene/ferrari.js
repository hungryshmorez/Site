import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// Load the Ferrari GLB and fit it into a car group: aligns the longest
// horizontal axis to the group's forward (+Z), scales to a target length, and
// seats it on the ground centred at the group origin. Returns via onReady so the
// caller can hide its procedural placeholder once the real car is in. Uses its
// own loader so any world can drop in a Ferrari without wiring one up.
const _draco = new DRACOLoader(); _draco.setDecoderPath('draco/gltf/');
const _gltf = new GLTFLoader(); _gltf.setDRACOLoader(_draco);

export function loadFerrari(parent, { length = 4.6, flip = false, onReady, onError } = {}) {
  const gltf = _gltf;
  gltf.load('models/racing/ferrari.glb', (g) => {
    const m = g.scene;
    m.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.frustumCulled = false; if (o.material) o.material.side = THREE.FrontSide; } });
    m.updateMatrixWorld(true);
    let box = new THREE.Box3().setFromObject(m); let size = box.getSize(new THREE.Vector3());
    // orient: longest horizontal axis should run along Z (the car's forward)
    if (size.x > size.z) { m.rotation.y = Math.PI / 2; m.updateMatrixWorld(true); box = new THREE.Box3().setFromObject(m); size = box.getSize(new THREE.Vector3()); }
    if (flip) { m.rotation.y += Math.PI; m.updateMatrixWorld(true); box = new THREE.Box3().setFromObject(m); size = box.getSize(new THREE.Vector3()); }
    const s = length / Math.max(size.z, 0.001);
    m.scale.setScalar(s); m.updateMatrixWorld(true);
    box = new THREE.Box3().setFromObject(m);
    const c = box.getCenter(new THREE.Vector3());
    m.position.x -= c.x; m.position.z -= c.z; m.position.y -= box.min.y;   // centre X/Z, feet on ground
    parent.add(m);
    onReady && onReady(m);
  }, undefined, (e) => { onError ? onError(e) : console.error('ferrari load failed', e); });
}
