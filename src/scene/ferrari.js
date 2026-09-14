import * as THREE from 'three';

// Load the Ferrari GLB and fit it into a car group: aligns the longest
// horizontal axis to the group's forward (+Z), scales to a target length, and
// seats it on the ground centred at the group origin. Returns via onReady so the
// caller can hide its procedural placeholder once the real car is in.
export function loadFerrari(gltf, parent, { length = 4.6, flip = false, onReady, onError } = {}) {
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
