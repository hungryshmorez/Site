// Global, cross-page music player.
//
// The site is a multi-page app: every "room" is its own HTML page, so a normal
// per-page <audio> restarts from scratch on every navigation. This module makes
// music behave as ONE continuous player across the whole site:
//
//   • a single <audio> element (reuses #track if the page has one, else creates it)
//   • the shared site playlist (data/tracks.js — same source as the jukebox/festival)
//   • playback state (track, position, playing, volume, muted) is mirrored to
//     localStorage continuously and on page-hide, then RESTORED on the next page —
//     so changing rooms resumes the same song near where it left off and keeps
//     playing, instead of starting over.
//   • one small, consistent transport (◀ ⏯ ▶ + now-playing) shown in every room.
//
// It never creates a MediaElementSource, so the festival's beat-reactor can still
// own the WebAudio graph on the same element (see getAudioEl()).

import { TRACKS, loadManifest } from '../data/tracks.js';
import { analysisFor } from '../data/analysis.js';

const LS_KEY = 'fp:nowplaying';
const SAVE_THROTTLE_MS = 900;

// Read the persisted state (or null). Guarded — private mode / blocked storage.
function readState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    return s && typeof s === 'object' ? s : null;
  } catch (e) { return null; }
}
function writeState(s) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(s)); } catch (e) { /* storage off */ }
}

let started = false; // idempotent guard — one global player per page

/**
 * Mount the global player on the current page.
 * @param {object} opts
 * @param {boolean} [opts.transport=true]  render the floating ◀⏯▶ bar
 * @param {boolean} [opts.autoResume=true] resume the saved track on load
 * @param {boolean} [opts.randomFirst=false] on a first-ever visit (no saved
 *        state), start on a random track (festival radio behaviour)
 * @returns {{getAudioEl, resume, toggle, next, prev, setMuted, isPlaying, current}}
 */
export function initGlobalPlayer(opts = {}) {
  const { transport = true, autoResume = true, randomFirst = false } = opts;
  if (started) return window.__gp; // already mounted (e.g. boot script + main.js)
  started = true;

  // ── the one audio element ──────────────────────────────────────────────────
  let audio = document.getElementById('track');
  const createdEl = !audio;
  if (!audio) {
    audio = document.createElement('audio');
    audio.id = 'track';
    document.body.appendChild(audio);
  }
  audio.loop = false;                       // advance through the playlist, don't loop one file
  audio.preload = 'auto';
  audio.crossOrigin = 'anonymous';          // needed if the festival reactor analyses it

  const saved = readState();
  let index = 0;
  let volume = saved && typeof saved.volume === 'number' ? saved.volume : 0.6;
  let muted = !!(saved && saved.muted);
  audio.volume = volume;
  audio.muted = muted;

  // Resolve a src → playlist index (so ◀ ▶ work relative to whatever's loaded).
  const indexOfSrc = (src) => TRACKS.findIndex((t) => t && t.src === src);
  const titleOf = (i) => (TRACKS[i] && TRACKS[i].title) || 'Static Drift';

  // Decide the opening track.
  if (saved && saved.src) {
    const known = indexOfSrc(saved.src);
    index = known >= 0 ? known : (Number.isInteger(saved.index) ? saved.index : 0);
    audio.src = saved.src;                  // exact URL survives even if the list changed
  } else {
    index = randomFirst && TRACKS.length ? Math.floor(Math.random() * TRACKS.length) : 0;
    if (TRACKS[index]) audio.src = TRACKS[index].src;
  }

  // ── transport UI ─────────────────────────────────────────────────────────────
  let nowEl = document.getElementById('nowplaying'); // festival already has one
  const hostMuteBtn = document.getElementById('mutebtn');
  let ui = null;
  if (transport) ui = buildTransport(!nowEl, createdEl && !hostMuteBtn);
  if (ui && ui.titleEl && !nowEl) nowEl = ui.titleEl;
  // On pages that had no <audio> before, the page's own #mutebtn isn't wired to
  // any music — compose a mute handler onto it (addEventListener, so we don't
  // clobber a reduced-motion/ambience handler the room binds afterwards).
  if (createdEl && hostMuteBtn) hostMuteBtn.addEventListener('click', () => setMuted(!muted));

  const listeners = [];
  const onNowPlaying = (cb) => { listeners.push(cb); return () => {}; };
  function paint() {
    const title = titleOf(index);
    const playing = !audio.paused && !audio.ended;
    if (nowEl) nowEl.textContent = `♪ ${title}`;
    if (ui) {
      ui.playBtn.textContent = playing ? '❚❚' : '►';
      ui.bar.classList.toggle('playing', playing);
      if (ui.metaEl) {                                   // baked BPM/key readout
        const a = analysisFor(audio.currentSrc || audio.src);
        ui.metaEl.textContent = a ? `${a.bpm ?? '—'} BPM${a.camelot ? ` · ${a.camelot}` : a.key ? ` · ${a.key}` : ''}` : '';
      }
    }
    for (const cb of listeners) { try { cb(title, playing); } catch (e) { /* noop */ } }
  }

  // ── playback ──────────────────────────────────────────────────────────────────
  function load(i, { play } = {}) {
    index = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
    if (TRACKS[index]) audio.src = TRACKS[index].src;
    audio.currentTime = 0;
    paint(); save();
    if (play) resume();
  }
  function resume() {
    audio.muted = muted;
    const p = audio.play();
    if (p && p.catch) p.catch(() => armGesture()); // autoplay blocked → wait for a tap
    paint();
  }
  function pause() { audio.pause(); paint(); save(); }
  function toggle() { (audio.paused ? resume : pause)(); }
  function next() { load(index + 1, { play: true }); }
  function prev() { load(index - 1, { play: true }); }
  function setMuted(v) { muted = !!v; audio.muted = muted; if (ui && ui.muteBtn) ui.muteBtn.textContent = muted ? '🔇' : '🔊'; save(); }

  // First user gesture anywhere resumes playback that autoplay policy blocked.
  let armed = false;
  function armGesture() {
    if (armed) return; armed = true;
    const go = () => {
      armed = false;
      ['pointerdown', 'keydown', 'touchstart'].forEach((e) => document.removeEventListener(e, go, true));
      resume();
    };
    ['pointerdown', 'keydown', 'touchstart'].forEach((e) => document.addEventListener(e, go, true));
  }

  // ── persistence ───────────────────────────────────────────────────────────────
  let lastSave = 0;
  function save(force) {
    const now = Date.now();
    if (!force && now - lastSave < SAVE_THROTTLE_MS) return;
    lastSave = now;
    writeState({
      src: audio.currentSrc || audio.src,
      index,
      title: titleOf(index),
      position: audio.currentTime || 0,
      playing: !audio.paused && !audio.ended,
      volume,
      muted,
      updatedAt: now,
    });
  }

  audio.addEventListener('timeupdate', () => save());
  audio.addEventListener('play', () => { paint(); save(true); });
  audio.addEventListener('pause', () => { paint(); save(true); });
  audio.addEventListener('ended', () => next());
  audio.addEventListener('error', () => { if (!audio.paused) next(); }); // skip a dud
  window.addEventListener('pagehide', () => save(true));
  window.addEventListener('beforeunload', () => save(true));
  document.addEventListener('visibilitychange', () => { if (document.hidden) save(true); });

  // Seek to where we left off (bridging the reload gap) once metadata is in.
  if (saved && saved.src && autoResume) {
    const seek = () => {
      const gap = saved.playing ? Math.max(0, (Date.now() - (saved.updatedAt || Date.now())) / 1000) : 0;
      let target = (saved.position || 0) + gap;
      const dur = audio.duration;
      if (Number.isFinite(dur) && dur > 0) {
        if (target >= dur - 0.3) { load(index + 1, { play: saved.playing }); return; } // ran past the end mid-navigation
        target = Math.min(target, dur - 0.3);
      }
      try { audio.currentTime = target; } catch (e) { /* not seekable yet */ }
      if (saved.playing) resume();
    };
    if (audio.readyState >= 1) seek();
    else audio.addEventListener('loadedmetadata', seek, { once: true });
    if (saved.playing) armGesture(); // in case play() is blocked before metadata lands
  }

  // Pull the live playlist; keep the current file, just widen ◀ ▶ range.
  loadManifest().then(() => {
    const known = indexOfSrc(audio.currentSrc || audio.src);
    if (known >= 0) index = known;
    paint();
  }).catch(() => {});

  paint();

  const api = { getAudioEl: () => audio, resume, pause, toggle, next, prev, setMuted, isPlaying: () => !audio.paused, current: () => titleOf(index), onNowPlaying };
  window.__gp = api;
  return api;

  // ── transport factory (kept inside so it closes over the handlers) ─────────────
  function buildTransport(withTitle, withMute) {
    const bar = document.createElement('div');
    bar.className = 'gp-bar';
    bar.innerHTML = `
      <button class="gp-btn gp-prev" aria-label="Previous track">◀</button>
      <button class="gp-btn gp-play" aria-label="Play or pause">►</button>
      <button class="gp-btn gp-next" aria-label="Next track">▶</button>
      ${withTitle ? '<span class="gp-title"></span>' : ''}
      <span class="gp-meta"></span>
      <a class="gp-btn gp-mix" href="dj.html" aria-label="Open the DJ console" title="DJ console">🎛</a>
      ${withMute ? '<button class="gp-btn gp-mute" aria-label="Mute music">🔊</button>' : ''}`;
    injectStyle();
    document.body.appendChild(bar);
    const q = (s) => bar.querySelector(s);
    const prevBtn = q('.gp-prev'), playBtn = q('.gp-play'), nextBtn = q('.gp-next');
    const titleEl = q('.gp-title'), muteBtn = q('.gp-mute'), metaEl = q('.gp-meta');
    prevBtn.onclick = () => prev();
    playBtn.onclick = () => toggle();
    nextBtn.onclick = () => next();
    if (muteBtn) muteBtn.onclick = () => setMuted(!muted);
    // save state before the console navigation so it resumes where it left off
    q('.gp-mix').addEventListener('click', () => save(true));
    return { bar, playBtn, titleEl, muteBtn, metaEl };
  }
}

let styled = false;
function injectStyle() {
  if (styled) return; styled = true;
  const css = `
    .gp-bar{position:fixed;z-index:9;left:50%;bottom:16px;transform:translateX(-50%);
      display:flex;align-items:center;gap:8px;padding:7px 12px;border-radius:999px;
      background:rgba(6,8,16,.62);border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(8px);
      font-family:ui-monospace,"JetBrains Mono",Menlo,Consolas,monospace;color:#eaf6ff;
      box-shadow:0 8px 30px -12px rgba(0,0,0,.8);transition:opacity .3s}
    .gp-btn{background:transparent;border:none;color:#eaf6ff;cursor:pointer;font-size:14px;
      line-height:1;padding:5px 7px;border-radius:8px;opacity:.85;text-decoration:none;
      display:inline-flex;align-items:center;justify-content:center}
    .gp-btn:hover{opacity:1;background:rgba(255,255,255,.1);color:#00f3ff}
    .gp-play{color:#00f3ff;font-size:15px}
    .gp-mix{font-size:13px}
    .gp-bar.playing .gp-play{text-shadow:0 0 10px rgba(0,243,255,.7)}
    .gp-title{font-size:10.5px;letter-spacing:.05em;color:#8aa0ac;max-width:200px;
      overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .gp-meta{font-size:9.5px;letter-spacing:.04em;color:#00f3ff;opacity:.8;white-space:nowrap}
    .gp-meta:empty{display:none}
    body.inportal .gp-bar{opacity:.15;pointer-events:none}
    @media (max-width:600px){.gp-bar{bottom:10px;padding:6px 9px;gap:5px}.gp-title{max-width:96px}.gp-meta{display:none}}
    @media (prefers-reduced-motion: reduce){.gp-bar{transition:none}}`;
  const el = document.createElement('style'); el.textContent = css; document.head.appendChild(el);
}
