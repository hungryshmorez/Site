// Web Audio reactor: analyses the live track and turns its bass into the
// `pulse` (0..1, spiking on the kick) that drives the whole festival — crowd
// bounce, stage lights, lasers, screens and auras. Falls back to null before
// playback starts so main.js can use its BPM simulation until then.
export function createAudioReactor(audioEl) {
  let ctx, analyser, data, gain, filter, started = false;
  let avg = 0, muted = false, spatial = 1, enclosed = false;
  const BASE = 0.9;

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    const src = ctx.createMediaElementSource(audioEl);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    // analyser sits BEFORE the filter so the beat pulse survives muffling
    filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 20000; filter.Q.value = 0.7;
    gain = ctx.createGain();
    gain.gain.value = muted ? 0 : BASE;
    src.connect(analyser); analyser.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    data = new Uint8Array(analyser.frequencyBinCount);
    apply(true);
  }

  // gain swells toward the stage; the low-pass muffles when enclosed (porta-potty)
  function apply(instant) {
    if (!gain) return;
    const g = muted ? 0 : BASE * (0.45 + 0.55 * spatial) * (enclosed ? 0.72 : 1);
    const f = enclosed ? 480 : 20000;
    const t = ctx.currentTime;
    gain.gain.setTargetAtTime(g, t, instant ? 0.01 : 0.14);
    filter.frequency.setTargetAtTime(f, t, enclosed ? 0.08 : 0.25);
  }

  async function start() {
    ensure();
    try {
      if (ctx.state === 'suspended') await ctx.resume();
      audioEl.loop = true;
      await audioEl.play();
      started = true;
    } catch (e) { started = false; }
    return started;
  }

  // returns pulse 0..1 (or null if not analysing yet)
  function pulse() {
    if (!analyser) return null;
    analyser.getByteFrequencyData(data);
    let b = 0; for (let i = 1; i < 12; i++) b += data[i];   // low-frequency (bass) bins
    b /= (11 * 255);                                          // 0..1
    avg = avg * 0.9 + b * 0.1;                                // running average
    const spike = Math.max(0, b - avg) * 3.4;                 // kick detection
    return Math.min(1, Math.max(b * 0.55, spike));
  }

  function setMuted(m) { muted = m; apply(true); }
  function setSpatial(level) { spatial = level < 0 ? 0 : level > 1 ? 1 : level; apply(); }
  function setEnclosed(on) { if (on !== enclosed) { enclosed = on; apply(); } }
  function isMuted() { return muted; }
  function isStarted() { return started; }

  return { start, pulse, setMuted, setSpatial, setEnclosed, isMuted, isStarted };
}
