// Primitive factory helpers extracted from VaporStudio's scene.js — the only
// part of the 'studio' the rooms need. Pure THREE, no synth/UI machinery.
import * as THREE from 'three';

export function makeBox(w, h, d, color, opts = {}) {
  const g = new THREE.BoxGeometry(w, h, d);
  const m = new THREE.MeshStandardMaterial({ color, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0.0, emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 0 });
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = opts.shadow !== false;
  mesh.receiveShadow = opts.shadow !== false;
  return mesh;
}
export function makeCylinder(rTop, rBot, h, segments, color, opts = {}) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, segments);
  const m = new THREE.MeshStandardMaterial({ color, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0.0, emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 0 });
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = opts.shadow !== false;
  mesh.receiveShadow = opts.shadow !== false;
  return mesh;
}
export function makeSphere(r, color, opts = {}) {
  const g = new THREE.SphereGeometry(r, 24, 16);
  const m = new THREE.MeshStandardMaterial({ color, roughness: opts.roughness ?? 0.7, metalness: opts.metalness ?? 0.0, emissive: opts.emissive ?? 0x000000, emissiveIntensity: opts.emissiveIntensity ?? 0 });
  const mesh = new THREE.Mesh(g, m);
  mesh.castShadow = opts.shadow !== false;
  mesh.receiveShadow = opts.shadow !== false;
  return mesh;
}
export function makeTextSprite(text, color = '#ffffff', fontSize = 64, font = 'bold 80px monospace') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1024;
  canvas.height = 256;
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // shadow
  ctx.shadowColor = color;
  ctx.shadowBlur = 30;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
  const geo = new THREE.PlaneGeometry(4, 1);
  return new THREE.Mesh(geo, mat);
}
