import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';

// Real rigged human characters, from the storyai UE / Biped mannequin. Loaded
// once and cloned (with an independent skeleton) per figure, so a world can
// drop in posed people — NPCs, a crowd, dancers — instead of blocky stand-ins.
// Poses are additive bone-rotation deltas (radians) on the Biped bones.

let _proto = null, _loading = null;
const draco = new DRACOLoader(); draco.setDecoderPath('draco/gltf/');
const gltf = new GLTFLoader(); gltf.setDRACOLoader(draco);

function loadProto() {
  if (_proto) return Promise.resolve(_proto);
  if (!_loading) _loading = new Promise((res, rej) => {
    gltf.load('models/characters/mannequin.glb', (g) => { _proto = g.scene; res(_proto); }, undefined, rej);
  });
  return _loading;
}

// Biped bone names in this GLB
const BONE = {
  spine: 'Bip001_Spine_04', spine1: 'Bip001_Spine1_05', neck: 'Bip001_Neck_06', head: 'Bip001_Head_055',
  lClav: 'Bip001_L_Clavicle_07', lUpper: 'Bip001_L_UpperArm_08', lFore: 'Bip001_L_Forearm_09',
  rClav: 'Bip001_R_Clavicle_031', rUpper: 'Bip001_R_UpperArm_032', rFore: 'Bip001_R_Forearm_033',
  lThigh: 'Bip001_L_Thigh_057', lCalf: 'Bip001_L_Calf_058',
  rThigh: 'Bip001_R_Thigh_061', rCalf: 'Bip001_R_Calf_062',
};

// pose = { boneKey: [dx, dy, dz] } additive euler deltas, tuned against the rig
export const POSES = {
  stand: {},
  wave: { rUpper: [0, 0, -2.0], rFore: [0.6, 0, -0.4], lUpper: [0, 0, 0.15] },
  cheer: { rUpper: [0, 0, -2.4], lUpper: [0, 0, 2.4], rFore: [0.3, 0, 0], lFore: [0.3, 0, 0] },
  point: { rUpper: [0, 0, -1.2], rFore: [0, 0, -0.2] },
};

export function spawnMannequin(scene, { pos = [0, 0, 0], rotY = 0, color = null, pose = 'stand', scale = 1, arms = 0.35 } = {}) {
  const holder = new THREE.Group();
  holder.position.set(pos[0], pos[1], pos[2]); holder.rotation.y = rotY; holder.scale.setScalar(scale);
  scene.add(holder);
  const api = { group: holder, model: null };
  loadProto().then((proto) => {
    const m = skeletonClone(proto);
    if (color) {
      const col = new THREE.Color(color);
      m.traverse((o) => { if (o.isMesh) { o.material = o.material.clone(); o.material.color = col; o.material.metalness = 0.1; o.material.roughness = 0.7; o.castShadow = true; o.frustumCulled = false; } });
    }
    // a relaxed A-pose so arms hang instead of the T rest pose
    setDelta(m, BONE.lUpper, [0, 0, arms]);
    setDelta(m, BONE.rUpper, [0, 0, -arms]);
    applyPose(m, pose);
    holder.add(m);
    api.model = m;
  }).catch(() => {});
  return api;
}

function setDelta(model, boneName, e) {
  const b = model.getObjectByName(boneName); if (!b) return;
  b.rotation.x += e[0]; b.rotation.y += e[1]; b.rotation.z += e[2];
}

export function applyPose(model, name) {
  const p = POSES[name] || {};
  for (const [k, e] of Object.entries(p)) { const bn = BONE[k]; if (bn) setDelta(model, bn, e); }
}
