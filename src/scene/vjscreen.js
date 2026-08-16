import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';

// VJ SCREENS — the stage runs the VJ playlist on two 16:9 side panels flanking
// the centered DJ booth, PLUS a set of big "billboard" screens hung high on the
// side walls so the whole room can watch. Each screen is a muted, looping
// YouTube player mounted as a CSS3D object locked to the world, sharing the
// WebGL camera so it tracks perspective as you walk. Controls (toggle / next /
// prev / submit-a-link / listen) come from the in-world VJ board + HUD bar.
//
// Panels are muted so they don't clash with the festival audio; the "listen"
// toggle un-mutes the main stage feed on demand (main ducks the festival track).

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

  // each screen: { frame, index (playlist start offset), audio (may carry sound) }
  const screens = [];
  for (const p of panels) {
    const wrap = document.createElement('div');
    Object.assign(wrap.style, {
      width: (p.size[0] * PPU) + 'px', height: (p.size[1] * PPU) + 'px',
      background: '#000', overflow: 'hidden', pointerEvents: 'none',
      boxShadow: p.audio ? '0 0 46px rgba(255,0,85,.3)' : '0 0 34px rgba(0,243,255,.22)',
      border: '1px solid rgba(255,255,255,.12)',
    });
    const frame = document.createElement('iframe');
    Object.assign(frame.style, { width: '100%', height: '100%', border: '0', pointerEvents: 'none' });
    frame.allow = 'autoplay; encrypted-media; picture-in-picture';
    frame.setAttribute('frameborder', '0');
    wrap.appendChild(frame);
    const obj = new CSS3DObject(wrap);
    obj.position.set(p.pos[0], p.pos[1], p.pos[2]);
    if (p.rotY) obj.rotation.y = p.rotY;
    obj.scale.setScalar(1 / PPU);
    cssScene.add(obj);
    screens.push({ frame, index: p.index || 0, audio: !!p.audio });
  }

  let on = false, paused = false, listening = false, custom = null; // custom = a submitted video id

  const applyVis = () => { layer.style.display = on && !paused ? 'block' : 'none'; };

  // build the embed URL for a screen — a custom single video if one was
  // submitted, otherwise the playlist (each screen can start at its own index so
  // the billboards show DIFFERENT clips = "all the VJ videos" across the room)
  const srcFor = (s) => {
    const base = `&autoplay=1&loop=1&controls=0&modestbranding=1&playsinline=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
    const mute = (s.audio && listening) ? 0 : 1;
    if (custom) return `https://www.youtube.com/embed/${custom}?playlist=${custom}&mute=${mute}${base}`;
    return `https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlist)}&index=${s.index}&mute=${mute}${base}`;
  };

  function loadAll() { screens.forEach((s) => { const u = srcFor(s); if (s.frame.src !== u) s.frame.src = u; }); }

  function start() { on = true; paused = false; applyVis(); loadAll(); }
  function stop() { on = false; listening = false; applyVis(); screens.forEach((s) => { s.frame.src = 'about:blank'; }); }
  function toggle() { on ? stop() : start(); return on; }
  function setPaused(p) { paused = p; applyVis(); }

  function cmd(func, args = [], audioOnly = false) {
    const msg = JSON.stringify({ event: 'command', func, args });
    screens.forEach((s) => { if (audioOnly && !s.audio) return; try { s.frame.contentWindow.postMessage(msg, '*'); } catch (_) { /* not ready */ } });
  }
  const next = () => cmd('nextVideo');
  const prev = () => cmd('previousVideo');

  // un/mute the main stage feed so you can actually hear the VJ video. Uses the
  // YouTube JS API (no reload) when possible; also reloads as a fallback so the
  // mute state sticks even before the player is ready.
  function setListen(v) {
    listening = v;
    cmd(v ? 'unMute' : 'mute', [], true);
    if (v) cmd('setVolume', [100], true);
    // reload the audio screens so the &mute= flag matches (covers not-yet-ready players)
    screens.forEach((s) => { if (s.audio) { const u = srcFor(s); if (s.frame.src !== u && s.frame.src !== 'about:blank') s.frame.src = u; } });
    return listening;
  }
  const toggleListen = () => setListen(!listening);

  // play any submitted YouTube link across every screen (a shared show). Accepts
  // watch?v=, youtu.be/, /embed/, /shorts/, or a bare 11-char id.
  function playLink(url) {
    const id = parseYouTubeId(url);
    if (!id) return false;
    custom = id;
    if (!on) start(); else loadAll();
    return true;
  }
  function clearLink() { custom = null; if (on) loadAll(); }

  function render(camera) { if (on && !paused) renderer.render(cssScene, camera); }
  function resize() { renderer.setSize(innerWidth, innerHeight); }

  return { toggle, start, stop, setPaused, next, prev, setListen, toggleListen, isListening: () => listening, playLink, clearLink, hasCustom: () => !!custom, isOn: () => on, render, resize };
}

// pull an 11-char video id out of the common YouTube URL shapes
function parseYouTubeId(input) {
  if (!input) return null;
  const s = String(input).trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(/(?:v=|youtu\.be\/|\/embed\/|\/shorts\/|\/v\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
