import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// VJ SCREEN — a YouTube playlist mounted as a CSS3D object sitting exactly on
// the stage video wall. It shares the WebGL camera, so it scales / perspectives
// with the stage as you walk around. A browser can't paint YouTube pixels onto
// a WebGL surface (cross-origin video is tainted), so this DOM layer rides on
// top of the canvas instead — fine for a screen at the back of the stage.
//
// The playlist is muted (visual only — no clash with the festival audio) and
// loops. The person VJ'ing flips between clips with next()/prev(); the YouTube
// IFrame API takes those as postMessage commands (enablejsapi=1).

const PPU = 42; // DOM pixels per world unit — higher = crisper video

export function buildVJ({ container, pos, size, playlist }) {
  const cssScene = new THREE.Scene();
  const renderer = new CSS3DRenderer();
  renderer.setSize(innerWidth, innerHeight);
  const layer = renderer.domElement;
  Object.assign(layer.style, {
    position: 'fixed', top: '0', left: '0',
    pointerEvents: 'none',   // let drags / taps fall through to the WebGL canvas
    zIndex: '2',             // above the canvas, below the HUD (z-index 10)
    display: 'none',
  });
  container.appendChild(layer);

  const wrap = document.createElement('div');
  Object.assign(wrap.style, {
    width: (size[0] * PPU) + 'px', height: (size[1] * PPU) + 'px',
    background: '#000', overflow: 'hidden', pointerEvents: 'none',
    boxShadow: '0 0 40px rgba(0,243,255,.25)',
  });
  const frame = document.createElement('iframe');
  Object.assign(frame.style, { width: '100%', height: '100%', border: '0', pointerEvents: 'none' });
  frame.allow = 'autoplay; encrypted-media; picture-in-picture';
  frame.setAttribute('frameborder', '0');
  wrap.appendChild(frame);

  const obj = new CSS3DObject(wrap);
  obj.position.set(pos[0], pos[1], pos[2]);
  obj.scale.setScalar(1 / PPU);
  cssScene.add(obj);

  let on = false, paused = false;
  const applyVis = () => { layer.style.display = on && !paused ? 'block' : 'none'; };
  const src = () =>
    `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlist)}` +
    `&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1`;

  function start() { on = true; paused = false; applyVis(); if (frame.src !== src()) frame.src = src(); }
  function stop() { on = false; applyVis(); frame.src = 'about:blank'; }
  function toggle() { on ? stop() : start(); return on; }
  function setPaused(p) { paused = p; applyVis(); }

  function cmd(func) {
    try {
      frame.contentWindow.postMessage(JSON.stringify({ event: 'command', func, args: [] }), '*');
    } catch (_) { /* iframe not ready yet */ }
  }
  const next = () => cmd('nextVideo');
  const prev = () => cmd('previousVideo');

  function render(camera) { if (on && !paused) renderer.render(cssScene, camera); }
  function resize() { renderer.setSize(innerWidth, innerHeight); }

  return { toggle, start, stop, setPaused, next, prev, isOn: () => on, render, resize, object: obj };
}
