// $AUCELAB — the 12matt3r DJ console (single-user). Adapted from the artist's
// DJ battle app with all the multiplayer/battle layer stripped out: no rooms,
// chat, voting, queue, roles, or cooldowns. Two decks you fully control, plus
// upload-your-own-tracks. Everything else (EQ, filter, crossfader, tempo,
// cue, sync, tap-tempo, jog wheel, loop, waveforms, meters) is kept.

import {
  initAudio, analyzeBPM, loadTrack, playTrack, pauseTrack, setEQ, setCrossfader,
  setFilter, setVolume, setPlaybackRate, syncDecks, setCuePoint, toggleLoop,
  getCurrentPosition, getDuration, seekTo, getTrackInfo, getAudioContext,
} from './audio.js';
import WaveSurfer from 'wavesurfer.js';
import './styles.css';

const library = {}; // id -> { name, genre, file, bpm }
const tapTempo = { a: { taps: [], lastTap: 0 }, b: { taps: [], lastTap: 0 } };
let lastRenderTime = 0;
const FPS = 1000 / 30;

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

  // seed the library with the site's anthem so there's something to spin
  await addTrack('Static Drift Anthem', 'vaporwave', 'static-drift-anthem.mp3');
  renderLibrary();
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
  let bpm = 120;
  try {
    const buf = await fetch(file).then((r) => r.arrayBuffer());
    const ctx = getAudioContext();
    const audioBuf = await ctx.decodeAudioData(buf.slice(0));
    bpm = (await analyzeBPM(audioBuf)) || 120;
  } catch (e) { /* keep default bpm */ }
  library[id] = { name, genre, file, bpm };
  return id;
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
        <div class="track-name">${t.name}</div>
        <div class="track-details">${t.genre.toUpperCase()} • ${t.bpm} BPM</div>
      </div>
      <div class="track-actions">
        <button class="load-deck-button" data-id="${id}" data-deck="a">DECK A</button>
        <button class="load-deck-button" data-id="${id}" data-deck="b">DECK B</button>
      </div>
    </div>`).join('');
  container.querySelectorAll('.load-deck-button').forEach((btn) => {
    btn.onclick = () => loadToDeck(btn.dataset.id, btn.dataset.deck);
  });
}

async function handleUpload(e) {
  const files = Array.from(e.target.files || []);
  for (const file of files) {
    const url = URL.createObjectURL(file);
    const n = file.name.toLowerCase();
    const genre = n.includes('vaporwave') ? 'vaporwave' : n.includes('lofi') ? 'lofi' : n.includes('dubstep') ? 'dubstep' : n.includes('surf') ? 'surf' : 'other';
    await addTrack(file.name.replace(/\.[^.]+$/, ''), genre, url);
  }
  e.target.value = '';
  renderLibrary();
}

async function loadToDeck(id, deck) {
  const t = library[id]; if (!t) return;
  try {
    await loadTrack(deck, t.file);
    const info = getTrackInfo(deck); if (info) info.bpm = t.bpm;
    document.getElementById(`deck-${deck}-title`).textContent = t.name;
    document.getElementById(`deck-${deck}-bpm`).textContent = `${t.bpm} BPM`;
    window.wavesurfers[deck].load(t.file);
    document.getElementById(`cue-markers-${deck}`).innerHTML = '';
    document.getElementById(`play-${deck}`).textContent = 'PLAY';
  } catch (err) { console.error(err); alert('Could not load that track.'); }
}

// ── deck controls ────────────────────────────────────────────────────────────
function togglePlay(deck) {
  const info = getTrackInfo(deck); if (!info) return;
  const btn = document.getElementById(`play-${deck}`);
  if (info.isPlaying) { pauseTrack(deck); btn.textContent = 'PLAY'; }
  else { getAudioContext()?.resume(); playTrack(deck); btn.textContent = 'PAUSE'; }
}

function handleCue(deck) {
  const info = getTrackInfo(deck); if (!info) return;
  const cue = setCuePoint(deck);
  const markers = document.getElementById(`cue-markers-${deck}`);
  markers.innerHTML = '';
  const m = document.createElement('div'); m.className = 'cue-marker';
  m.style.left = `${(cue / getDuration(deck)) * 100}%`; markers.appendChild(m);
}

function handleSync(source, target) {
  const s = getTrackInfo(source), t = getTrackInfo(target);
  if (!s || !t || !s.bpm || !t.bpm) { alert('Both decks need tracks with BPM to sync.'); return; }
  if (syncDecks(source, target)) {
    const pct = Math.round((s.bpm / t.bpm - 1) * 100);
    document.getElementById(`tempo-${target}`).value = pct;
    document.getElementById(`tempo-value-${target}`).textContent = `${pct > 0 ? '+' : ''}${pct}%`;
  }
}

function handleLoop(deck) {
  const on = toggleLoop(deck);
  document.getElementById(`loop-${deck}`).classList.toggle('active', on);
}

function handleTap(deck) {
  const now = Date.now(); const ti = tapTempo[deck];
  if (now - ti.lastTap > 2000) ti.taps = [];
  if (ti.lastTap > 0) {
    ti.taps.push((now - ti.lastTap) / 1000);
    if (ti.taps.length > 4) ti.taps.shift();
    if (ti.taps.length >= 2) {
      const avg = ti.taps.reduce((s, v) => s + v, 0) / ti.taps.length;
      const bpm = Math.round(60 / avg);
      document.getElementById(`tap-bpm-${deck}`).textContent = `${bpm} BPM`;
      const info = getTrackInfo(deck);
      if (info && info.bpm) { const rate = bpm / info.bpm; if (rate >= 0.5 && rate <= 2) applyRate(deck, rate); }
    }
  }
  ti.lastTap = now;
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
      const pct = +e.target.value;
      document.getElementById(`tempo-value-${d}`).textContent = `${pct > 0 ? '+' : ''}${pct}%`;
      setPlaybackRate(d, 1 + pct / 100);
    };
    document.getElementById(`volume-${d}`).oninput = (e) => setVolume(d, e.target.value / 100);
    for (const band of ['high', 'mid', 'low']) document.getElementById(`${band}-${d}`).oninput = (e) => setEQ(d, band, e.target.value / 100);
    document.getElementById(`filter-${d}`).oninput = (e) => setFilter(d, e.target.value / 100);
    // click the waveform to scrub
    document.getElementById(`waveform-${d}`).addEventListener('click', (e) => {
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
  document.getElementById('crossfader').oninput = (e) => setCrossfader(e.target.value / 100);
  document.getElementById('library-search').oninput = () => renderLibrary();
  document.getElementById('library-filter').onchange = () => renderLibrary();
  document.getElementById('library-upload').onchange = handleUpload;
  const shortcutToggle = document.getElementById('shortcut-toggle');
  if (shortcutToggle) shortcutToggle.onclick = () => document.getElementById('keyboard-shortcuts').classList.toggle('open');
}

function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    const fn = KEYS[e.code]; if (fn) { fn(); e.preventDefault(); }
  });
}

init().catch((err) => { console.error(err); alert('Could not start the DJ console. Please refresh.'); });
