import * as THREE from 'three';
import { TRACKS, COVERS } from '../data/tracks.js';

// A retro BOOMBOX jukebox that plays the DriftWave Static tape (bundled MP3s).
// A front screen shows the current album art + track title; tap the deck to
// play/pause, tap the ◀ / ▶ pads to skip. Auto-advances at track end. HTML5
// <audio> so it streams (no giant decode); starts on the tap gesture.
//
//   const jb = buildJukebox({ onNowPlaying });
//   scene.add(jb.group);   // tap: jb.tap(ray)   loop: jb.update(dt,t)
const std = (o) => new THREE.MeshStandardMaterial(o);
const _texLoader = new THREE.TextureLoader();

export function buildJukebox({ accent = 0x9a64ff, onNowPlaying } = {}) {
  const group = new THREE.Group();
  const col = new THREE.Color(accent);

  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.4, 0.7), std({ color: 0x14141c, metalness: 0.5, roughness: 0.4, emissive: col.clone().multiplyScalar(0.12), emissiveIntensity: 0.5 }));
  body.position.y = 0.9; body.castShadow = true; group.add(body);
  for (const sx of [-0.85, 0.85]) {
    const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.14, 24), std({ color: 0x0a0a10, metalness: 0.6, roughness: 0.5 })); sp.rotation.x = Math.PI / 2; sp.position.set(sx, 0.9, 0.36); group.add(sp);
    const cone = new THREE.Mesh(new THREE.CircleGeometry(0.3, 24), std({ color: 0x1a1a24, metalness: 0.3, roughness: 0.7 })); cone.position.set(sx, 0.9, 0.44); group.add(cone);
    const dust = new THREE.Mesh(new THREE.CircleGeometry(0.08, 16), std({ color: 0x2a2a38 })); dust.position.set(sx, 0.9, 0.45); group.add(dust);
  }
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.05, 8, 24, Math.PI), std({ color: 0x22232c, metalness: 0.7 })); handle.position.set(0, 1.6, 0); group.add(handle);
  for (const lx of [-1.1, 1.1]) { const leg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.4, 0.5), std({ color: 0x0a0a10 })); leg.position.set(lx, 0.2, 0); group.add(leg); }

  // front screen: album art + a small VU glow frame
  const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), screenMat); screen.position.set(0, 1.02, 0.37); group.add(screen);
  const frame = new THREE.Mesh(new THREE.RingGeometry(0.64, 0.72, 4).rotateZ(Math.PI / 4), new THREE.MeshBasicMaterial({ color: accent })); frame.position.set(0, 1.02, 0.36); group.add(frame);

  // title bar (canvas texture)
  const cnv = document.createElement('canvas'); cnv.width = 512; cnv.height = 64; const ctx = cnv.getContext('2d');
  const titleTex = new THREE.CanvasTexture(cnv); titleTex.colorSpace = THREE.SRGBColorSpace;
  const titleMesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.32), new THREE.MeshBasicMaterial({ map: titleTex, transparent: true })); titleMesh.position.set(0, 0.34, 0.37); group.add(titleMesh);

  // ◀ ▶ skip pads (visible + tap proxies)
  const padMat = std({ color: 0x0a0a12, emissive: col, emissiveIntensity: 0.6, roughness: 0.5 });
  const prevPad = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.12), padMat); prevPad.position.set(-1.0, 0.55, 0.37); group.add(prevPad);
  const nextPad = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.34, 0.12), padMat.clone()); nextPad.position.set(1.0, 0.55, 0.37); group.add(nextPad);
  const glow = new THREE.PointLight(accent, 1.4, 9, 2); glow.position.set(0, 1.2, 1.2); group.add(glow);

  // ---- audio ----
  const audio = new Audio(); audio.preload = 'none'; audio.volume = 0.6; audio.crossOrigin = 'anonymous';
  let i = 0, playing = false;
  function setArt(idx) { _texLoader.load(COVERS[idx % COVERS.length], (t) => { t.colorSpace = THREE.SRGBColorSpace; screenMat.map = t; screenMat.color.set(0xffffff); screenMat.needsUpdate = true; }, undefined, () => {}); }
  function drawTitle(txt) {
    ctx.clearRect(0, 0, 512, 64); ctx.fillStyle = 'rgba(6,6,14,0.9)'; ctx.fillRect(0, 0, 512, 64);
    ctx.fillStyle = '#9af7d0'; ctx.font = 'bold 26px ui-monospace, monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText((playing ? '▶ ' : '❚❚ ') + txt, 256, 34, 490); titleTex.needsUpdate = true;
  }
  function load(idx) { i = (idx + TRACKS.length) % TRACKS.length; audio.src = TRACKS[i].src; setArt(i); drawTitle(TRACKS[i].title); onNowPlaying && onNowPlaying(TRACKS[i].title, playing); }
  function play() { audio.play().then(() => { playing = true; drawTitle(TRACKS[i].title); onNowPlaying && onNowPlaying(TRACKS[i].title, true); }).catch(() => {}); }
  function pause() { audio.pause(); playing = false; drawTitle(TRACKS[i].title); onNowPlaying && onNowPlaying(TRACKS[i].title, false); }
  audio.addEventListener('ended', () => { load(i + 1); play(); });
  load(0);

  function tap(ray) {
    if (ray.intersectObject(nextPad, false)[0]) { load(i + 1); play(); return true; }
    if (ray.intersectObject(prevPad, false)[0]) { load(i - 1); play(); return true; }
    if (ray.intersectObject(screen, false)[0] || ray.intersectObject(body, false)[0]) { playing ? pause() : play(); return true; }
    return false;
  }
  function update(dt, t) {
    const p = playing ? 1 : 0.25;
    glow.intensity = (1.0 + Math.sin(t * 3) * 0.3) * (0.4 + p * 0.6);
    frame.material.color.copy(col).multiplyScalar(0.6 + (playing ? 0.4 + Math.sin(t * 8) * 0.3 : 0));
    for (const sp of [prevPad, nextPad]) sp.material.emissiveIntensity = 0.5 + (playing ? 0.3 + Math.sin(t * 4) * 0.2 : 0);
  }
  return { group, tap, update, next: () => { load(i + 1); play(); }, get playing() { return playing; }, get title() { return TRACKS[i].title; } };
}
