// Web-Audio DJ engine (adapted from the artist's DJ app, single-user).
// Signal chain per deck: BufferSource -> EQ(low/mid/high) -> Filter -> Volume
// -> Gain(crossfader) -> Analyser -> Master. WaveSurfer is visual-only; the
// cursor is driven from getCurrentPosition() by the UI, so nothing double-plays.

let audioContext;
let gainNodes = {};
let eqNodes = {};
let filterNodes = {};
let volumeNodes = {};
let tracks = {};
let analyzerNodes = {};
let loopNodes = {};

export async function initAudio() {
  audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.connect(audioContext.destination);

  for (const deck of ['a', 'b']) {
    const volumeNode = audioContext.createGain(); volumeNode.gain.value = 0.8; volumeNodes[deck] = volumeNode;
    const gainNode = audioContext.createGain(); gainNodes[deck] = gainNode;

    const filterNode = audioContext.createBiquadFilter();
    filterNode.type = 'lowpass'; filterNode.frequency.value = 22050; filterNode.Q.value = 1; filterNodes[deck] = filterNode;

    const eqLow = audioContext.createBiquadFilter(); eqLow.type = 'lowshelf'; eqLow.frequency.value = 320; eqLow.gain.value = 0;
    const eqMid = audioContext.createBiquadFilter(); eqMid.type = 'peaking'; eqMid.frequency.value = 1000; eqMid.Q.value = 0.5; eqMid.gain.value = 0;
    const eqHigh = audioContext.createBiquadFilter(); eqHigh.type = 'highshelf'; eqHigh.frequency.value = 3200; eqHigh.gain.value = 0;
    eqNodes[deck] = { low: eqLow, mid: eqMid, high: eqHigh };

    const analyzerNode = audioContext.createAnalyser(); analyzerNode.fftSize = 2048; analyzerNodes[deck] = analyzerNode;

    eqLow.connect(eqMid); eqMid.connect(eqHigh); eqHigh.connect(filterNode);
    filterNode.connect(volumeNode); volumeNode.connect(gainNode); gainNode.connect(analyzerNode); analyzerNode.connect(masterGain);

    loopNodes[deck] = { active: false, startPoint: 0, endPoint: 0 };
  }

  setCrossfader(0.5);
  window.analyzerNodes = analyzerNodes;
  return audioContext;
}

export async function loadTrack(deck, url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  // CRITICAL: kill any source already playing on this deck before we swap the
  // track in — otherwise the old song keeps playing under the new one.
  const old = tracks[deck];
  if (old && old.source) {
    try { old.source.onended = null; old.source.stop(); old.source.disconnect(); } catch (e) { /* already stopped */ }
    old.source = null;
  }
  tracks[deck] = {
    buffer: audioBuffer, source: null, startTime: 0, pauseTime: 0, isPlaying: false,
    cuePoint: 0, bpm: null, key: null, camelot: null, playbackRate: 1.0, loopActive: false, loopStart: 0, loopEnd: 0,
  };
  return audioBuffer;
}

export function playTrack(deck) {
  if (!tracks[deck] || !tracks[deck].buffer) return;
  if (tracks[deck].source) { tracks[deck].source.stop(); tracks[deck].source = null; }
  const trackRef = tracks[deck];
  const source = audioContext.createBufferSource();
  source.buffer = trackRef.buffer;
  source.playbackRate.value = trackRef.playbackRate;
  source.connect(eqNodes[deck].low);
  let offset = trackRef.pauseTime > 0 ? trackRef.pauseTime : 0;
  if (trackRef.loopActive) { source.loop = true; source.loopStart = trackRef.loopStart; source.loopEnd = trackRef.loopEnd; }
  source.start(0, offset);
  trackRef.source = source;
  trackRef.startTime = audioContext.currentTime - offset;
  trackRef.isPlaying = true;
  source.onended = () => {
    if (!tracks || !tracks[deck] || tracks[deck] !== trackRef) return;
    if (!trackRef.loopActive) {
      trackRef.isPlaying = false; trackRef.pauseTime = 0;
      document.dispatchEvent(new CustomEvent('track-ended', { detail: { deck } }));
    }
  };
}

export function pauseTrack(deck) {
  if (!tracks || !tracks[deck] || !tracks[deck].isPlaying) return;
  tracks[deck].pauseTime = audioContext.currentTime - tracks[deck].startTime;
  try { if (tracks[deck].source) { tracks[deck].source.stop(); tracks[deck].source = null; } } catch (e) { /* noop */ }
  tracks[deck].isPlaying = false;
}

export function setCuePoint(deck) {
  if (!tracks[deck]) return;
  if (tracks[deck].isPlaying) tracks[deck].cuePoint = audioContext.currentTime - tracks[deck].startTime;
  else jumpToCue(deck);
  return tracks[deck].cuePoint;
}

export function jumpToCue(deck) {
  if (!tracks[deck]) return;
  if (tracks[deck].source) { tracks[deck].source.stop(); tracks[deck].source = null; }
  tracks[deck].pauseTime = tracks[deck].cuePoint;
}

export function toggleLoop(deck, startTime, endTime) {
  if (!tracks[deck] || !tracks[deck].buffer) return false;
  const track = tracks[deck];
  if (startTime === undefined || endTime === undefined) {
    if (track.loopActive) { track.loopActive = false; if (track.source) track.source.loop = false; return false; }
    const currentPosition = track.isPlaying ? audioContext.currentTime - track.startTime : track.pauseTime;
    if (track.bpm) {
      const beatDuration = 60 / track.bpm;
      startTime = currentPosition; endTime = Math.min(currentPosition + beatDuration * 4, track.buffer.duration);
    } else { startTime = currentPosition; endTime = Math.min(currentPosition + 2, track.buffer.duration); }
  }
  track.loopStart = startTime; track.loopEnd = endTime; track.loopActive = true;
  if (track.isPlaying && track.source) { track.source.loop = true; track.source.loopStart = startTime; track.source.loopEnd = endTime; }
  return true;
}

export function setEQ(deck, band, value) {
  if (!eqNodes[deck] || !eqNodes[deck][band]) return;
  eqNodes[deck][band].gain.value = (value * 24) - 12;
}

export function setFilter(deck, value) {
  if (!filterNodes[deck]) return;
  const filterNode = filterNodes[deck];
  if (value <= 0.5) { filterNode.type = 'lowpass'; filterNode.frequency.value = 200 + (21850 * (value * 2)); }
  else { filterNode.type = 'highpass'; filterNode.frequency.value = 22050 - (21850 * ((value - 0.5) * 2)); }
}

export function setVolume(deck, value) { if (volumeNodes[deck]) volumeNodes[deck].gain.value = value; }

export function setCrossfader(value) {
  value = Math.max(0, Math.min(1, value));
  const gainA = Math.cos(value * Math.PI / 2);
  const gainB = Math.cos((1 - value) * Math.PI / 2);
  if (gainNodes.a) gainNodes.a.gain.value = gainA;
  if (gainNodes.b) gainNodes.b.gain.value = gainB;
  const indicator = document.querySelector('.crossfader-indicator');
  if (indicator) {
    if (value <= 0.5) { indicator.style.left = '0'; indicator.style.width = `${(1 - value * 2) * 50}%`; }
    else { const width = (value - 0.5) * 2 * 50; indicator.style.left = `${50 - width}%`; indicator.style.width = `${width}%`; }
  }
}

export function setPlaybackRate(deck, rate) {
  if (!tracks[deck]) return;
  tracks[deck].playbackRate = rate;
  if (tracks[deck].source) tracks[deck].source.playbackRate.value = rate;
}

export function syncDecks(fromDeck, toDeck) {
  if (!tracks[fromDeck] || !tracks[toDeck] || !tracks[fromDeck].bpm || !tracks[toDeck].bpm) return false;
  const rate = tracks[fromDeck].bpm / tracks[toDeck].bpm;
  setPlaybackRate(toDeck, rate);
  if (tracks[fromDeck].isPlaying && tracks[toDeck].isPlaying) {
    const beatDuration = 60 / tracks[fromDeck].bpm;
    const sourceBeats = (audioContext.currentTime - tracks[fromDeck].startTime) / beatDuration;
    const targetBeats = (audioContext.currentTime - tracks[toDeck].startTime) / beatDuration;
    const frac = (sourceBeats - targetBeats) - Math.floor(sourceBeats - targetBeats);
    const offset = frac * beatDuration;
    pauseTrack(toDeck);
    tracks[toDeck].pauseTime = (audioContext.currentTime - tracks[fromDeck].startTime) - offset;
    if (tracks[toDeck].pauseTime > tracks[toDeck].buffer.duration) tracks[toDeck].pauseTime = 0;
    playTrack(toDeck);
  }
  return true;
}

// Lightweight BPM estimate via energy-onset clustering (no external lib).
// Tempo detection by autocorrelation of an onset-strength envelope. Far more
// reliable than interval-clustering: build a low-res "how much did the energy
// jump" signal, autocorrelate it, and the strongest periodic lag in the musical
// range is the beat. Octaves are folded into a sensible BPM window. Analyses a
// slice from ~10% in (skips intros) for speed + stability.
export async function analyzeBPM(audioBuffer) {
  try {
    const sr = audioBuffer.sampleRate;
    // mono mixdown of the slice we analyze
    const chs = [];
    for (let c = 0; c < Math.min(2, audioBuffer.numberOfChannels); c++) chs.push(audioBuffer.getChannelData(c));
    const total = chs[0].length;
    const from = Math.floor(total * 0.1);
    const to = Math.min(total, from + sr * 60);       // up to 60s
    const H = 512;                                     // hop ≈ 11.6ms @44.1k
    const nF = Math.floor((to - from) / H);
    if (nF < 128) return null;

    // onset-strength envelope: positive change in short-window RMS energy
    const env = new Float32Array(nF);
    let prev = 0, mean = 0;
    for (let f = 0; f < nF; f++) {
      let e = 0; const o = from + f * H;
      for (let j = 0; j < H; j++) { let s = chs[0][o + j]; if (chs[1]) s = (s + chs[1][o + j]) * 0.5; e += s * s; }
      e = Math.sqrt(e / H);
      const flux = e - prev; env[f] = flux > 0 ? flux : 0; prev = e; mean += env[f];
    }
    mean /= nF;
    for (let f = 0; f < nF; f++) env[f] -= mean;        // zero-mean → cleaner autocorrelation

    // autocorrelation across lags for 60–190 BPM
    const minBpm = 60, maxBpm = 190;
    const minLag = Math.max(1, Math.floor((60 / maxBpm) * sr / H));
    const maxLag = Math.min(nF - 1, Math.ceil((60 / minBpm) * sr / H));
    let bestLag = minLag, best = -Infinity;
    for (let lag = minLag; lag <= maxLag; lag++) {
      let sum = 0; for (let i = 0; i + lag < nF; i++) sum += env[i] * env[i + lag];
      sum /= (nF - lag);
      if (sum > best) { best = sum; bestLag = lag; }
    }
    let bpm = 60 * sr / (bestLag * H);
    // fold octaves into the usual DJ window (tap tempo can correct odd cases)
    while (bpm < 82) bpm *= 2;
    while (bpm > 165) bpm /= 2;
    return Math.round(bpm);
  } catch { return null; }
}

// ── Musical key detection (chroma + Krumhansl profile correlation) ────────────
// Ported from the standalone SHMOREZ BPM + Key finder: an FFT chromagram over a
// stable mid-section of the track, correlated against major/minor tonal
// profiles. Camelot notation is what DJs use for harmonic mixing.
const NOTE_NAMES = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
const KEY_MAJOR = [6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88];
const KEY_MINOR = [6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17];
const CAMELOT_MAJOR = ['8B', '3B', '10B', '5B', '12B', '7B', '2B', '9B', '4B', '11B', '6B', '1B'];
const CAMELOT_MINOR = ['5A', '12A', '7A', '2A', '9A', '4A', '11A', '6A', '1A', '8A', '3A', '10A'];

// in-place iterative radix-2 FFT (power-of-two length)
function fft(re, im) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]]; }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wlenCos = Math.cos(ang), wlenSin = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let wCos = 1, wSin = 0;
      for (let j = 0; j < len / 2; j++) {
        const uR = re[i + j], uI = im[i + j];
        const vR = re[i + j + len / 2] * wCos - im[i + j + len / 2] * wSin;
        const vI = re[i + j + len / 2] * wSin + im[i + j + len / 2] * wCos;
        re[i + j] = uR + vR; im[i + j] = uI + vI;
        re[i + j + len / 2] = uR - vR; im[i + j + len / 2] = uI - vI;
        const nc = wCos * wlenCos - wSin * wlenSin; wSin = wCos * wlenSin + wSin * wlenCos; wCos = nc;
      }
    }
  }
}

// Pearson correlation of the chroma vector against a profile rotated to `root`.
function chromaCorr(chroma, profile, root) {
  let mx = 0, my = 0;
  for (let i = 0; i < 12; i++) { mx += chroma[i]; my += profile[i]; }
  mx /= 12; my /= 12;
  let num = 0, dx = 0, dy = 0;
  for (let i = 0; i < 12; i++) {
    const x = chroma[(i + root) % 12] - mx, y = profile[i] - my;
    num += x * y; dx += x * x; dy += y * y;
  }
  return num / Math.sqrt((dx + 1e-12) * (dy + 1e-12));
}

const yieldUI = () => new Promise((r) => setTimeout(r, 0));

// Estimate the musical key. Returns { name, root, mode, camelot, confidence,
// candidates } or null if it can't be determined.
export async function analyzeKey(audioBuffer) {
  try {
    const sr = audioBuffer.sampleRate;
    const n = audioBuffer.length;
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = audioBuffer.numberOfChannels > 1 ? audioBuffer.getChannelData(1) : null;
    const at = ch1 ? (i) => (ch0[i] + ch1[i]) * 0.5 : (i) => ch0[i];

    const duration = n / sr;
    const startSec = duration > 50 ? Math.min(20, duration * 0.12) : 0;
    const endSec = Math.min(duration, startSec + Math.min(120, duration));
    const start = Math.floor(startSec * sr), end = Math.floor(endSec * sr);
    const N = 4096, hop = 4096;
    const chroma = new Float64Array(12);
    const re = new Float64Array(N), im = new Float64Array(N), win = new Float64Array(N);
    for (let i = 0; i < N; i++) win[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1));

    let fi = 0;
    for (let pos = start; pos + N < end; pos += hop, fi++) {
      let rms = 0;
      for (let i = 0; i < N; i++) { const v = at(pos + i) * win[i]; re[i] = v; im[i] = 0; rms += v * v; }
      if (rms / N < 1e-7) continue;
      fft(re, im);
      for (let k = 2; k < N / 2; k++) {
        const freq = k * sr / N; if (freq < 55 || freq > 5000) continue;
        const mag = Math.hypot(re[k], im[k]); if (mag < 1e-5) continue;
        const midi = 69 + 12 * Math.log2(freq / 440);
        const pc = ((Math.round(midi) % 12) + 12) % 12;
        const weight = Math.sqrt(mag) / (1 + Math.max(0, freq - 1200) / 4000);
        chroma[pc] += weight;
      }
      if (fi % 8 === 0) await yieldUI(); // keep the UI responsive during analysis
    }
    if (fi === 0) return null;

    let sum = chroma.reduce((a, b) => a + b, 0) || 1;
    for (let i = 0; i < 12; i++) chroma[i] /= sum;
    const candidates = [];
    for (let root = 0; root < 12; root++) {
      candidates.push({ root, mode: 'major', score: chromaCorr(chroma, KEY_MAJOR, root) });
      candidates.push({ root, mode: 'minor', score: chromaCorr(chroma, KEY_MINOR, root) });
    }
    candidates.sort((a, b) => b.score - a.score);
    const best = candidates[0], second = candidates[1];
    const gap = best.score - second.score;
    const confidence = Math.max(0, Math.min(1, best.score * 0.55 + gap * 1.8));
    return {
      name: `${NOTE_NAMES[best.root]} ${best.mode}`,
      root: best.root,
      mode: best.mode,
      camelot: best.mode === 'major' ? CAMELOT_MAJOR[best.root] : CAMELOT_MINOR[best.root],
      confidence,
      candidates: candidates.slice(0, 5).map((c) => ({ name: `${NOTE_NAMES[c.root]} ${c.mode}`, score: c.score })),
    };
  } catch { return null; }
}

// Analyze a decoded buffer for both tempo and key in one pass. Returns
// { bpm, key, camelot } (bpm/key null if undetermined) — a compact shape for
// the library to cache and display.
export async function analyzeTrack(audioBuffer) {
  const [bpm, key] = await Promise.all([analyzeBPM(audioBuffer), analyzeKey(audioBuffer)]);
  return {
    bpm: bpm ?? null,
    key: key ? key.name.replace(' major', '').replace(' minor', 'm') : null,
    camelot: key ? key.camelot : null,
  };
}

// Two Camelot codes mix harmonically when they share a number (relative
// major/minor) or sit one step apart on the wheel with the same letter.
export function camelotCompatible(a, b) {
  if (!a || !b) return false;
  if (a === b) return true;
  const pa = /^(\d{1,2})([AB])$/.exec(a), pb = /^(\d{1,2})([AB])$/.exec(b);
  if (!pa || !pb) return false;
  const na = +pa[1], la = pa[2], nb = +pb[1], lb = pb[2];
  if (na === nb) return true; // relative major/minor
  if (la === lb) { const d = Math.abs(na - nb); return d === 1 || d === 11; } // ±1 around the 12-hour wheel
  return false;
}

export function getCurrentPosition(deck) {
  if (!tracks[deck]) return 0;
  return tracks[deck].isPlaying ? audioContext.currentTime - tracks[deck].startTime : tracks[deck].pauseTime;
}
export function getDuration(deck) { return tracks[deck]?.buffer?.duration || 0; }
export function seekTo(deck, seconds) { if (tracks[deck]) tracks[deck].pauseTime = Math.max(0, Math.min(seconds, tracks[deck].buffer.duration)); }
export function getAudioContext() { return audioContext; }
export function getTrackInfo(deck) { return tracks[deck] || null; }

export function resetDeck(deck) {
  if (!deck || !tracks) return;
  try { if (tracks[deck] && tracks[deck].source) { tracks[deck].source.onended = null; tracks[deck].source.stop(); tracks[deck].source = null; } } catch (e) { /* noop */ }
  tracks[deck] = null;
  if (eqNodes[deck]) { eqNodes[deck].low.gain.value = 0; eqNodes[deck].mid.gain.value = 0; eqNodes[deck].high.gain.value = 0; }
  if (filterNodes[deck]) { filterNodes[deck].type = 'lowpass'; filterNodes[deck].frequency.value = 22050; }
  if (volumeNodes[deck]) volumeNodes[deck].gain.value = 0.8;
}
