// $AUCELAB — the 12matt3r DJ console (single-user). Adapted from the artist's
// DJ battle app with all the multiplayer/battle layer stripped out: no rooms,
// chat, voting, queue, roles, or cooldowns. Two decks you fully control, plus
// upload-your-own-tracks. Everything else (EQ, filter, crossfader, tempo,
// cue, sync, tap-tempo, jog wheel, loop, waveforms, meters) is kept.

import {
  initAudio, analyzeTrack, loadTrack, playTrack, pauseTrack, setEQ, setCrossfader,
  setFilter, setVolume, setPlaybackRate, syncDecks, setCuePoint, toggleLoop,
  getCurrentPosition, getDuration, seekTo, getTrackInfo, getAudioContext,
  camelotCompatible,
} from './audio.js';
import WaveSurfer from 'wavesurfer.js';
import { saveTrack, allTracks } from './store.js';
import { TRACKS, loadManifest } from '../data/tracks.js';
import './styles.css';

// id -> { name, genre, file, bpm, key, camelot, analyzed, analyzing, remote }
const library = {};
// track names come from user-uploaded filenames — escape before interpolating into innerHTML
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const tapTempo = { a: { taps: [], lastTap: 0 }, b: { taps: [], lastTap: 0 } };
let lastRenderTime = 0;
const FPS = 1000 / 30;

// auto-radio: when you stop DJing it cycles through your whole library
let radioActive = false, radioIndex = 0, lastUserAction = performance.now();
// auto-radio (idle jukebox) is OFF by default now — it was reloading the anthem
// onto deck A the moment you went idle, yanking your track. Opt in via the button.
let autoEnabled = localStorage.getItem('djAuto') === 'on';
const IDLE_MS = 8000;
function userActed() { lastUserAction = performance.now(); if (radioActive) stopRadio(); }

const KEYS = {
  KeyQ: () => togglePlay('a'), KeyP: () => togglePlay('b'),
  KeyW: () => handleCue('a'), KeyO: () => handleCue('b'),
  KeyE: () => handleSync('b', 'a'), KeyI: () => handleSync('a', 'b'),
};

async function init() {
  await initAudio();
  // browsers gate audio until a gesture — resume the context on the first tap
  const resume = () => { getAudioContext()?.resume(); document.removeEventListener('pointerdown', resume); };
  document.addEventListener('pointerdown', resume);

  initWaveforms();
  initUI();
  initKeyboard();
  requestAnimationFrame(loop);

  // when a radio track finishes, advance to the next one
  document.addEventListener('track-ended', (e) => { if (radioActive && e.detail.deck === 'a') { radioIndex++; radioPlay(); } });

  // seed the site's anthem, then restore the user's saved uploads (IndexedDB)
  await addTrack('Static Drift Anthem', 'vaporwave', 'static-drift-anthem.mp3');
  for (const t of await allTracks()) {
    library[t.id] = {
      name: t.name, genre: t.genre, bpm: t.bpm ?? null, key: t.key ?? null,
      camelot: t.camelot ?? null, analyzed: t.key != null, file: URL.createObjectURL(t.blob),
    };
  }
  renderLibrary();

  // pull in every track on the site (the same manifest the jukebox reads), so
  // the whole catalogue is playable in the decks — analysis happens on demand.
  loadSiteLibrary();
}

// genre buckets from a track title/filename, matching the library filter
function inferGenre(s) {
  const n = String(s).toLowerCase();
  if (/vapor|slushwave|mallsoft|saturn|telepath/.test(n)) return 'vaporwave';
  if (/lo-?fi|chill|sleep|study/.test(n)) return 'lofi';
  if (/dubstep|bass|riddim/.test(n)) return 'dubstep';
  if (/surf|beach|wave/.test(n)) return 'surf';
  return 'other';
}

// Add every manifest track to the library (metadata + CDN URL only). BPM/key
// are analyzed lazily — when a track is loaded to a deck or the user asks —
// because fetching and decoding the whole catalogue up front would be brutal.
async function loadSiteLibrary() {
  try {
    await loadManifest(); // replaces TRACKS in place from the live manifest
    const known = new Set(Object.values(library).map((t) => t.file));
    let i = 0;
    for (const t of TRACKS) {
      if (!t || typeof t.src !== 'string' || known.has(t.src)) continue;
      known.add(t.src);
      const name = String(t.title ?? t.src);
      library[`m-${i++}-${Math.random().toString(36).slice(2, 6)}`] = {
        name, genre: inferGenre(name), file: t.src,
        bpm: null, key: null, camelot: null, analyzed: false, remote: true,
      };
    }
    renderLibrary();
  } catch (e) { /* offline or blocked — the seeded library still works */ }
}

// ── auto-radio (idle jukebox) ────────────────────────────────────────────────
function startRadio() { radioActive = true; radioIndex = 0; radioPlay(); updateRadioBadge(); }
// stopping the auto-radio must also SILENCE it — it plays on deck A, so pause
// that deck and reset its button. Otherwise the idle-jukebox track kept playing
// under your mix the moment you started to DJ.
function stopRadio() {
  radioActive = false;
  try { pauseTrack('a'); } catch (e) { /* engine not ready */ }
  const pa = document.getElementById('play-a'); if (pa) pa.textContent = 'PLAY';
  updateRadioBadge();
}
async function radioPlay() {
  const ids = Object.keys(library); if (!ids.length) { radioActive = false; return; }
  const id = ids[radioIndex % ids.length];
  await loadToDeck(id, 'a');
  if (radioActive) { getAudioContext()?.resume(); playTrack('a'); document.getElementById('play-a').textContent = 'PAUSE'; updateRadioBadge(); }
}
function updateRadioBadge() {
  const b = document.getElementById('radio-badge');
  if (b) b.classList.toggle('on', radioActive);
}

function initWaveforms() {
  const mk = (sel, wave, prog) => WaveSurfer.create({
    container: sel, waveColor: wave, progressColor: prog, cursorColor: '#f05454',
    barWidth: 2, barGap: 1, height: 110, barRadius: 2, interact: true,
  });
  const a = mk('#waveform-a', 'rgba(0,243,255,0.45)', 'rgb(0,243,255)');
  const b = mk('#waveform-b', 'rgba(255,0,85,0.45)', 'rgb(255,0,85)');
  window.wavesurfers = { a, b };
}

// per-frame: move each deck's cursor from the real engine + drive peak meters
function loop(ts) {
  requestAnimationFrame(loop);
  if (ts - lastRenderTime < FPS) return;
  lastRenderTime = ts;
  for (const deck of ['a', 'b']) {
    const info = getTrackInfo(deck);
    const ws = window.wavesurfers[deck];
    if (info && info.buffer && ws) {
      const dur = getDuration(deck) || 1;
      try { ws.setTime(Math.min(getCurrentPosition(deck), dur)); } catch (e) { /* noop */ }
    }
    updateMeter(deck, info && info.isPlaying);
  }
  // idle → start the auto-radio (cycles the whole library) once you stop DJing
  const anyPlaying = ['a', 'b'].some((d) => { const i = getTrackInfo(d); return i && i.isPlaying; });
  if (autoEnabled && !radioActive && !anyPlaying && Object.keys(library).length && performance.now() - lastUserAction > IDLE_MS) {
    startRadio();
  }
}

function updateMeter(deck, playing) {
  const bars = document.querySelectorAll(`#peak-meter-${deck} .meter-bar`);
  if (!bars.length) return;
  if (!playing) { bars.forEach((b) => (b.className = 'meter-bar')); return; }
  const an = window.analyzerNodes?.[deck]; if (!an) return;
  const data = new Uint8Array(an.frequencyBinCount); an.getByteFrequencyData(data);
  const avg = data.reduce((s, v) => s + v, 0) / (data.length * 255);
  const active = Math.floor(avg * bars.length * 1.4);
  bars.forEach((bar, i) => {
    if (i < active) { const lvl = i > bars.length * 0.7 ? 'high' : i > bars.length * 0.4 ? 'medium' : 'low'; bar.className = `meter-bar active ${lvl}`; }
    else bar.className = 'meter-bar';
  });
}

// ── library ──────────────────────────────────────────────────────────────────
async function addTrack(name, genre, file) {
  const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const entry = { name, genre, file, bpm: null, key: null, camelot: null, analyzed: false };
  library[id] = entry;
  try {
    const buf = await fetch(file).then((r) => r.arrayBuffer());
    const audioBuf = await getAudioContext().decodeAudioData(buf.slice(0));
    const res = await analyzeTrack(audioBuf);
    Object.assign(entry, { bpm: res.bpm, key: res.key, camelot: res.camelot, analyzed: true });
  } catch (e) { /* leave unanalyzed — the ANALYZE button can retry */ }
  return id;
}

// Fetch, decode and analyze one library track on demand (used by the per-row
// ANALYZE button for tracks not yet loaded to a deck).
async function analyzeLibraryTrack(id) {
  const t = library[id]; if (!t || t.analyzed || t.analyzing) return;
  t.analyzing = true; renderLibrary();
  try {
    const buf = await fetch(t.file).then((r) => r.arrayBuffer());
    const audioBuf = await getAudioContext().decodeAudioData(buf.slice(0));
    const res = await analyzeTrack(audioBuf);
    Object.assign(t, { bpm: res.bpm, key: res.key, camelot: res.camelot, analyzed: true });
  } catch (e) { console.warn('analyze failed', e); }
  finally { t.analyzing = false; renderLibrary(); }
}

// track's detail line: shows BPM + key + Camelot once analyzed
function trackDetails(t) {
  if (t.analyzing) return 'analyzing…';
  if (!t.analyzed) return `${t.genre.toUpperCase()} • not analyzed`;
  const bpm = t.bpm != null ? `${t.bpm} BPM` : '— BPM';
  const key = t.key ? `${t.key}${t.camelot ? ` · ${t.camelot}` : ''}` : 'key —';
  return `${t.genre.toUpperCase()} • ${bpm} • ${key}`;
}

function renderLibrary(list) {
  const container = document.getElementById('library-tracks');
  const search = (document.getElementById('library-search').value || '').toLowerCase();
  const filter = document.getElementById('library-filter').value;
  const entries = (list || Object.entries(library)).filter(([, t]) =>
    t.name.toLowerCase().includes(search) && (filter === 'all' || t.genre === filter));
  if (!entries.length) { container.innerHTML = '<div class="library-empty">No tracks yet — hit ADD TO LIBRARY to upload your own.</div>'; return; }
  container.innerHTML = entries.map(([id, t]) => `
    <div class="library-track">
      <div class="track-info-container">
        <div class="track-name">${escapeHTML(t.name)}</div>
        <div class="track-details">${escapeHTML(trackDetails(t))}</div>
      </div>
      <div class="track-actions">
        ${t.analyzed || t.analyzing ? '' : `<button class="analyze-button" data-id="${id}" title="Detect BPM and key" aria-label="Analyze BPM and key">◎</button>`}
        <button class="load-deck-button" data-id="${id}" data-deck="a">A</button>
        <button class="load-deck-button" data-id="${id}" data-deck="b">B</button>
      </div>
    </div>`).join('');
  container.querySelectorAll('.load-deck-button').forEach((btn) => {
    btn.onclick = () => { userActed(); loadToDeck(btn.dataset.id, btn.dataset.deck); };
  });
  container.querySelectorAll('.analyze-button').forEach((btn) => {
    btn.onclick = () => analyzeLibraryTrack(btn.dataset.id);
  });
}

async function handleUpload(e) {
  const files = Array.from(e.target.files || []);
  for (const file of files) {
    const n = file.name.toLowerCase();
    const genre = n.includes('vaporwave') ? 'vaporwave' : n.includes('lofi') ? 'lofi' : n.includes('dubstep') ? 'dubstep' : n.includes('surf') ? 'surf' : 'other';
    const name = file.name.replace(/\.[^.]+$/, '');
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    let res = { bpm: null, key: null, camelot: null };
    try { res = await analyzeTrack(await getAudioContext().decodeAudioData((await file.arrayBuffer()).slice(0))); } catch (err) { /* keep nulls */ }
    library[id] = { name, genre, ...res, analyzed: true, file: URL.createObjectURL(file) };
    // persist the actual audio + analysis to the user's computer (IndexedDB)
    saveTrack({ id, name, genre, ...res, blob: file });
  }
  e.target.value = '';
  renderLibrary();
}

let loadingDeck = { a: false, b: false };
async function loadToDeck(id, deck) {
  const t = library[id]; if (!t || loadingDeck[deck]) return;
  loadingDeck[deck] = true;
  try {
    try { await getAudioContext()?.resume(); } catch (e) { /* fine */ }
    await loadTrack(deck, t.file);            // stops any old source on this deck
    const info = getTrackInfo(deck);
    if (info) { info.bpm = t.bpm ?? 120; info.key = t.key; info.camelot = t.camelot; }
    document.getElementById(`deck-${deck}-title`).textContent = t.name;
    // a fresh track loads paused at 1× — reset the transport UI so it's honest
    const ts = document.getElementById(`tempo-${deck}`); if (ts) ts.value = 0;
    const tv = document.getElementById(`tempo-value-${deck}`); if (tv) tv.textContent = '0%';
    const tb = document.getElementById(`tap-bpm-${deck}`); if (tb) tb.textContent = '--';
    updateEffectiveBpm(deck);
    updateDeckMeta(deck);
    document.getElementById(`cue-markers-${deck}`).innerHTML = '';
    document.getElementById(`play-${deck}`).textContent = 'PLAY';
    // waveform is visual-only; never let it block loading the deck
    try { window.wavesurfers[deck].load(t.file); } catch (e) { console.warn('waveform load failed', e); }
    // analyze on load (reusing the buffer we just decoded — no second fetch)
    if (!t.analyzed && info?.buffer) analyzeLoadedDeck(deck, id, info.buffer);
  } catch (err) { console.error(err); alert('Could not load that track.'); }
  finally { loadingDeck[deck] = false; }
}

// Analyze the buffer already decoded onto a deck, then fold the result back
// into the library entry and the deck (if it still holds the same track).
async function analyzeLoadedDeck(deck, id, buffer) {
  const t = library[id]; if (!t || t.analyzed) return;
  t.analyzing = true; renderLibrary();
  try {
    const res = await analyzeTrack(buffer);
    Object.assign(t, { bpm: res.bpm, key: res.key, camelot: res.camelot, analyzed: true });
    const info = getTrackInfo(deck);
    if (info && info.buffer === buffer) {
      info.bpm = res.bpm ?? 120; info.key = res.key; info.camelot = res.camelot;
      updateEffectiveBpm(deck); updateDeckMeta(deck);
    }
  } catch (e) { console.warn('analyze failed', e); }
  finally { t.analyzing = false; renderLibrary(); }
}

// deck header key/Camelot readout + harmonic-match hint between the two decks
function updateDeckMeta(deck) {
  const el = document.getElementById(`deck-${deck}-key`);
  if (el) {
    const info = getTrackInfo(deck);
    el.textContent = info && info.key ? `${info.key}${info.camelot ? ` · ${info.camelot}` : ''}` : '';
  }
  updateHarmonicHint();
}

function updateHarmonicHint() {
  const el = document.getElementById('harmonic-hint'); if (!el) return;
  const a = getTrackInfo('a'), b = getTrackInfo('b');
  if (!a?.camelot || !b?.camelot) { el.textContent = ''; el.className = ''; return; }
  const ok = camelotCompatible(a.camelot, b.camelot);
  el.textContent = ok ? `IN KEY ${a.camelot}/${b.camelot}` : `CLASH ${a.camelot}/${b.camelot}`;
  el.className = ok ? 'match' : 'clash';
}

// ── deck controls ────────────────────────────────────────────────────────────
function togglePlay(deck) {
  userActed();
  const info = getTrackInfo(deck); if (!info) return;
  const btn = document.getElementById(`play-${deck}`);
  if (info.isPlaying) { pauseTrack(deck); btn.textContent = 'PLAY'; }
  else { getAudioContext()?.resume(); playTrack(deck); btn.textContent = 'PAUSE'; }
}

function handleCue(deck) {
  userActed();
  const info = getTrackInfo(deck); if (!info) return;
  const cue = setCuePoint(deck);
  const markers = document.getElementById(`cue-markers-${deck}`);
  markers.innerHTML = '';
  const m = document.createElement('div'); m.className = 'cue-marker';
  m.style.left = `${(cue / getDuration(deck)) * 100}%`; markers.appendChild(m);
}

function handleSync(source, target) {
  userActed();
  const s = getTrackInfo(source), t = getTrackInfo(target);
  if (!s || !t || !s.bpm || !t.bpm) { alert('Both decks need tracks with BPM to sync.'); return; }
  if (syncDecks(source, target)) {
    const pct = Math.round((s.bpm / t.bpm - 1) * 100);
    document.getElementById(`tempo-${target}`).value = pct;
    document.getElementById(`tempo-value-${target}`).textContent = `${pct > 0 ? '+' : ''}${pct}%`;
  }
}

function handleLoop(deck) {
  userActed();
  const on = toggleLoop(deck);
  document.getElementById(`loop-${deck}`).classList.toggle('active', on);
}

// TAP TEMPO — tap along with the beat to MEASURE a song's tempo. This only
// reads the tempo (and sets it as the deck's reference BPM so SYNC + the tempo
// display use the true value); it does NOT change the song's playback speed. To
// actually beat-match, read both decks' BPM and nudge the TEMPO slider until the
// numbers line up (or hit SYNC).
function handleTap(deck) {
  userActed();
  const now = Date.now(); const ti = tapTempo[deck];
  if (now - ti.lastTap > 2000) ti.taps = []; // long gap → start a fresh measure
  if (ti.lastTap > 0) {
    ti.taps.push((now - ti.lastTap) / 1000);
    if (ti.taps.length > 7) ti.taps.shift();
    if (ti.taps.length >= 2) {
      const avg = ti.taps.reduce((s, v) => s + v, 0) / ti.taps.length;
      const bpm = Math.round(60 / avg);
      const tb = document.getElementById(`tap-bpm-${deck}`); if (tb) tb.textContent = `${bpm} BPM`;
      const info = getTrackInfo(deck);
      if (info && bpm >= 40 && bpm <= 220) info.bpm = bpm; // set the reference, leave speed alone
      updateEffectiveBpm(deck);
    }
  }
  ti.lastTap = now;
}

// show the deck's CURRENT effective tempo (measured/analyzed BPM × playback rate)
// so two decks can be dialed to the same number and beat-match
function updateEffectiveBpm(deck) {
  const el = document.getElementById(`deck-${deck}-bpm`); if (!el) return;
  const info = getTrackInfo(deck);
  if (!info || !info.bpm) { el.textContent = '-- BPM'; return; }
  el.textContent = `${Math.round(info.bpm * (info.playbackRate || 1))} BPM`;
}

function applyRate(deck, rate) {
  setPlaybackRate(deck, rate);
  const pct = Math.round((rate - 1) * 100);
  document.getElementById(`tempo-${deck}`).value = pct;
  document.getElementById(`tempo-value-${deck}`).textContent = `${pct > 0 ? '+' : ''}${pct}%`;
}

function setupJog(deck) {
  const el = document.getElementById(`deck-${deck}-controller`); if (!el) return;
  let dragging = false, lastY = 0, angle = 0;
  el.addEventListener('pointerdown', (e) => { dragging = true; lastY = e.clientY; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dy = e.clientY - lastY; lastY = e.clientY; angle += dy;
    el.style.transform = `rotate(${angle}deg)`;
    scrub(deck, dy);
  });
  el.addEventListener('pointerup', () => { dragging = false; });
}

function scrub(deck, dy) {
  userActed();
  const dur = getDuration(deck); if (!dur) return;
  const info = getTrackInfo(deck); const wasPlaying = info && info.isPlaying;
  const np = Math.max(0, Math.min(dur, getCurrentPosition(deck) - dy * 0.02));
  seekTo(deck, np);
  if (wasPlaying) { pauseTrack(deck); playTrack(deck); }
  try { window.wavesurfers[deck].setTime(np); } catch (e) { /* noop */ }
}

// ── UI wiring ────────────────────────────────────────────────────────────────
function initUI() {
  for (const d of ['a', 'b']) {
    setupJog(d);
    document.getElementById(`play-${d}`).onclick = () => togglePlay(d);
    document.getElementById(`cue-${d}`).onclick = () => handleCue(d);
    document.getElementById(`loop-${d}`).onclick = () => handleLoop(d);
    document.getElementById(`tap-tempo-${d}`).onclick = () => handleTap(d);
    document.getElementById(`tempo-${d}`).oninput = (e) => {
      userActed();
      const pct = +e.target.value;
      document.getElementById(`tempo-value-${d}`).textContent = `${pct > 0 ? '+' : ''}${pct}%`;
      setPlaybackRate(d, 1 + pct / 100);
      updateEffectiveBpm(d); // live BPM readout so you can match the two decks
    };
    document.getElementById(`volume-${d}`).oninput = (e) => { userActed(); setVolume(d, e.target.value / 100); };
    for (const band of ['high', 'mid', 'low']) document.getElementById(`${band}-${d}`).oninput = (e) => { userActed(); setEQ(d, band, e.target.value / 100); };
    document.getElementById(`filter-${d}`).oninput = (e) => { userActed(); setFilter(d, e.target.value / 100); };
    // click the waveform to scrub
    document.getElementById(`waveform-${d}`).addEventListener('click', (e) => {
      userActed();
      const dur = getDuration(d); if (!dur) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = ((e.clientX - rect.left) / rect.width) * dur;
      const info = getTrackInfo(d); const wasPlaying = info && info.isPlaying;
      seekTo(d, pos); if (wasPlaying) { pauseTrack(d); playTrack(d); }
      try { window.wavesurfers[d].setTime(pos); } catch (err) { /* noop */ }
    });
  }
  document.getElementById('sync-a').onclick = () => handleSync('b', 'a');
  document.getElementById('sync-b').onclick = () => handleSync('a', 'b');
  document.getElementById('crossfader').oninput = (e) => { userActed(); setCrossfader(e.target.value / 100); };
  document.getElementById('library-search').oninput = () => renderLibrary();
  document.getElementById('library-filter').onchange = () => renderLibrary();
  document.getElementById('library-upload').onchange = handleUpload;
  const shortcutToggle = document.getElementById('shortcut-toggle');
  if (shortcutToggle) shortcutToggle.onclick = () => document.getElementById('keyboard-shortcuts').classList.toggle('open');

  // auto-radio toggle (persists in localStorage)
  const autoBtn = document.getElementById('auto-toggle');
  if (autoBtn) {
    const paint = () => { autoBtn.textContent = `AUTO RADIO: ${autoEnabled ? 'ON' : 'OFF'}`; autoBtn.classList.toggle('on', autoEnabled); };
    paint();
    autoBtn.onclick = () => { autoEnabled = !autoEnabled; localStorage.setItem('djAuto', autoEnabled ? 'on' : 'off'); if (!autoEnabled && radioActive) stopRadio(); paint(); };
  }
}

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    const fn = KEYS[e.code]; if (fn) { fn(); e.preventDefault(); }
  });
}

init().catch((err) => { console.error(err); alert('Could not start the DJ console. Please refresh.'); });
