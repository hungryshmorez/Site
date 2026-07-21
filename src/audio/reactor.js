// Web Audio reactor: analyses the live track and turns its bass into the
// `pulse` (0..1, spiking on the kick) that drives the whole festival — crowd
// bounce, stage lights, lasers, screens and auras. Falls back to null before
// playback starts so main.js can use its BPM simulation until then.
export function createAudioReactor(audioEl) {
  let ctx, analyser, data, gain, started = false;
  let avg = 0, muted = false;

  function ensure() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    const src = ctx.createMediaElementSource(audioEl);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.72;
    gain = ctx.createGain();
    gain.gain.value = muted ? 0 : 0.9;
    src.connect(analyser); analyser.connect(gain); gain.connect(ctx.destination);
    data = new Uint8Array(analyser.frequencyBinCount);
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

  function setMuted(m) { muted = m; if (gain) gain.gain.value = m ? 0 : 0.9; }
  function isMuted() { return muted; }
  function isStarted() { return started; }

  return { start, pulse, setMuted, isMuted, isStarted };
}
