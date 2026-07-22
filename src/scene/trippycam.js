import * as THREE from 'three';

// TRIPPY CAM — the user's live webcam wrapped onto a giant inward-facing
// sphere that swaps in for the night sky. Opt-in (asks for camera access);
// gracefully no-ops if denied. onState(active, error?) drives the HUD.

export function createTrippyCam(scene, { onState } = {}) {
  const video = document.createElement('video');
  video.autoplay = true; video.muted = true; video.playsInline = true;
  video.setAttribute('playsinline', ''); video.setAttribute('muted', '');

  const tex = new THREE.VideoTexture(video);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping; tex.repeat.x = -1; tex.offset.x = 1; // mirror like a selfie

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(140, 40, 24),
    new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide, fog: false })
  );
  sphere.visible = false; sphere.renderOrder = -1; scene.add(sphere);

  let stream = null, active = false, busy = false;

  async function start() {
    if (active || busy) return;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { onState && onState(false, new Error('no camera api')); return; }
    busy = true;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      video.srcObject = stream;
      await video.play().catch(() => {});
      sphere.visible = true; active = true;
      onState && onState(true);
    } catch (e) {
      onState && onState(false, e);
    } finally { busy = false; }
  }
  function stop() {
    active = false; sphere.visible = false;
    if (stream) { stream.getTracks().forEach((t) => t.stop()); stream = null; }
    video.srcObject = null;
    onState && onState(false);
  }
  function toggle() { active ? stop() : start(); }

  return { toggle, start, stop, isActive: () => active };
}
