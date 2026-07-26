import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// VJ SCREENS — the stage runs the VJ playlist on TWO 16:9 side panels (like a
// real concert's flanking screens), so there are no black bars and the centered
// DJ booth sits in the open gap between them. Each panel is a muted, looping
// YouTube player mounted as a CSS3D object locked to the stage, sharing the
// WebGL camera so it tracks perspective as you walk. Controls (toggle / next /
// prev) come from the in-world VJ board. Muted → no clash with the festival audio.

const PPU = 42; // DOM pixels per world unit — higher = crisper video

export function buildVJ({ container, panels = [], playlist }) {
  const cssScene = new THREE.Scene();
  const renderer = new CSS3DRenderer();
  renderer.setSize(innerWidth, innerHeight);
  const layer = renderer.domElement;
  Object.assign(layer.style, {
    position: 'fixed', top: '0', left: '0',
    pointerEvents: 'none',   // clicks fall through to the WebGL canvas
    zIndex: '2',             // above the canvas, below the HUD
    display: 'none',
  });
  container.appendChild(layer);

  const frames = [];
  for (const p of panels) {
    const wrap = document.createElement('div');
    Object.assign(wrap.style, {
      width: (p.size[0] * PPU) + 'px', height: (p.size[1] * PPU) + 'px',
      background: '#000', overflow: 'hidden', pointerEvents: 'none',
      boxShadow: '0 0 40px rgba(0,243,255,.25)',
    });
    const frame = document.createElement('iframe');
    Object.assign(frame.style, { width: '100%', height: '100%', border: '0', pointerEvents: 'none' });
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.setAttribute('frameborder', '0');
    wrap.appendChild(frame);
    const obj = new CSS3DObject(wrap);
    obj.position.set(p.pos[0], p.pos[1], p.pos[2]);
    obj.scale.setScalar(1 / PPU);
    cssScene.add(obj);
    frames.push(frame);
  }

  let on = false, paused = false;
  const applyVis = () => { layer.style.display = on && !paused ? 'block' : 'none'; };
  const src = () =>
    `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlist)}` +
    `&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`;

  function start() { on = true; paused = false; applyVis(); frames.forEach((f) => { if (f.src !== src()) f.src = src(); }); }
  function stop() { on = false; applyVis(); frames.forEach((f) => { f.src = 'about:blank'; }); }
  function toggle() { on ? stop() : start(); return on; }
  function setPaused(p) { paused = p; applyVis(); }

  function cmd(func) {
    const msg = JSON.stringify({ event: 'command', func, args: [] });
    frames.forEach((f) => { try { f.contentWindow.postMessage(msg, '*'); } catch (_) { /* not ready */ } });
  }
  const next = () => cmd('nextVideo');
  const prev = () => cmd('previousVideo');

  function render(camera) { if (on && !paused) renderer.render(cssScene, camera); }
  function resize() { renderer.setSize(innerWidth, innerHeight); }

  return { toggle, start, stop, setPaused, next, prev, isOn: () => on, render, resize };
}
