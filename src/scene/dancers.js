import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';

// Fully skeletal-animated dancers (Michelle, with the Mixamo Samba clip baked
// into the GLB). Loaded once and cloned per dancer, each with its own
// AnimationMixer + phase offset so a line of them isn't in lockstep. Used for a
// handful of featured performers (e.g. on the stage) — the mass crowd stays
// baked/instanced.

let _proto = null, _anims = null, _loading = null;
const draco = new DRACOLoader(); draco.setDecoderPath('draco/gltf/');
const gltf = new GLTFLoader(); gltf.setDRACOLoader(draco);

function load() {
  if (_proto) return Promise.resolve();
  if (!_loading) _loading = new Promise((res, rej) => {
    gltf.load('models/characters/michelle.glb', (g) => { _proto = g.scene; _anims = g.animations; res(); }, undefined, rej);
  });
  return _loading;
}

export function spawnDancer(scene, { pos = [0, 0, 0], rotY = 0, height = 1.7, clip = 'SambaDance', color = null, timeScale = 1 } = {}) {
  const holder = new THREE.Group();
  holder.position.set(pos[0], pos[1], pos[2]); holder.rotation.y = rotY;
  scene.add(holder);
  const api = { group: holder, mixer: null, update(dt) { if (api.mixer) api.mixer.update(dt); } };
  load().then(() => {
    const m = skeletonClone(_proto);
    m.traverse((o) => { if (o.isMesh) { o.frustumCulled = false; o.castShadow = true; if (color) { o.material = o.material.clone(); o.material.color = new THREE.Color(color); } } });
    // normalize to a target height, then reseat feet on the ground.
    // NB: must update world matrices before measuring — a skinned mesh's bounds
    // are wrong (tiny bind box) until the skeleton/nodes are resolved, which
    // otherwise scales the dancer up ~3.6x into a giant.
    m.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(m); const h = box.getSize(new THREE.Vector3()).y || 1;
    m.scale.setScalar(height / h);
    m.updateMatrixWorld(true);
    const box2 = new THREE.Box3().setFromObject(m); m.position.y -= box2.min.y;
    holder.add(m);
    const mixer = new THREE.AnimationMixer(m);
    const cl = THREE.AnimationClip.findByName(_anims || [], clip) || (_anims && _anims[0]);
    if (cl) { const act = mixer.clipAction(cl); act.timeScale = timeScale; act.play(); act.time = Math.random() * cl.duration; }
    api.mixer = mixer;
  }).catch(() => {});
  return api;
}
