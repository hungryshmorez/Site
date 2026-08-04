import * as THREE from 'three';

// TRIPPY CAM — the user's live webcam wrapped onto a giant inward-facing
// sphere that swaps in for the night sky. Opt-in (asks for camera access);
// gracefully no-ops if denied. onState(active, error?) drives the HUD.
//
// While it's on, hitting the DJ booth again randomizes the visual tint / spin /
// blend — but the feed is always ONE picture stretched across the whole sky
// (no tiling / mirror-hall), so it reads as a single image wrapped overhead.

export function createTrippyCam(scene, { onState } = {}) {
  const video = document.createElement('video');
  video.autoplay = true; video.muted = true; video.playsInline = true;
  video.setAttribute('playsinline', ''); video.setAttribute('muted', '');

  const tex = new THREE.VideoTexture(video);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.center.set(0.5, 0.5);

  const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false });
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(140, 40, 24), mat);
  sphere.visible = false; sphere.renderOrder = -1; scene.add(sphere);

  let stream = null, active = false, busy = false;
  let spin = 0; // per-effect texture rotation speed

  // Apply a tint/spin/blend combo. The feed is always a SINGLE picture stretched
  // across the whole sky — repeat (-1, 1) wraps exactly one copy around (negative
  // x keeps the selfie mirror); we never tile it into a mirror-hall.
  function applyEffect({ hue = null, spinSpeed = 0, additive = false } = {}) {
    tex.repeat.set(-1, 1); // one stretched image, selfie-mirrored
    if (hue === null) {
      mat.color.setRGB(1, 1, 1);
    } else {
      mat.color.setHSL(hue, 1, 0.6);
    }
    mat.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending;
    mat.needsUpdate = true;
    spin = spinSpeed;
  }

  // A pool of looks; randomizeEffect() picks one at random (never the same twice
  // in a row) while the cam is already live.
  const EFFECTS = [
    { hue: null, spinSpeed: 0, additive: false },     // clean, true-color
    { hue: 0.5, spinSpeed: 0.05, additive: false },   // cyan wash, slow spin
    { hue: 0.85, spinSpeed: -0.08, additive: false }, // magenta wash
    { hue: 0.33, spinSpeed: 0.14, additive: true },   // acid-green bloom
    { hue: 0.08, spinSpeed: -0.03, additive: true },  // warm smear
    { hue: 0.66, spinSpeed: 0.2, additive: false },   // indigo drift
  ];
  let lastIdx = 0;
  function randomizeEffect() {
    if (!active) return;
    let i = lastIdx;
    while (i === lastIdx && EFFECTS.length > 1) i = (Math.random() * EFFECTS.length) | 0;
    lastIdx = i;
    applyEffect(EFFECTS[i]);
  }

  async function start() {
    if (active || busy) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { onState && onState(false, new Error('no camera api')); return; }
    busy = true;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      video.srcObject = stream;
      await video.play().catch(() => {});
      lastIdx = 0; applyEffect(EFFECTS[0]); // start zoomed out and clean
      sphere.visible = true; active = true;
      onState && onState(true);
    } catch (e) {
      onState && onState(false, e);
    } finally { busy = false; }
  }
  function stop() {
    active = false; sphere.visible = false; spin = 0;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    video.srcObject = null;
    onState && onState(false);
  }
  function toggle() { active ? stop() : start(); }

  // slow drift on the spinning effects; call each frame from the render loop
  function update(dt) { if (active && spin) tex.rotation += spin * dt; }

  return { toggle, start, stop, randomizeEffect, update, isActive: () => active };
}
