// Procedural ambience beds for the character worlds — filtered noise textures
// (rain / fire / wind / crowd / static / airy wash) synthesized with Web Audio,
// layered quietly under the music. No audio files. Start on a user gesture.

export function createAmbience(preset = {}) {
  let ctx = null, started = false, crackleTimer = 0;

  function noiseBuffer(type) {
    const len = ctx.sampleRate * 2;
    const b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      if (type === 'brown') { last = (last + 0.02 * w) / 1.02; d[i] = last * 3.5; } else d[i] = w;
    }
    return b;
  }

  function crackle(master) {
    // short filtered pops for a fire
    const pop = () => {
      if (!ctx) return;
      const s = ctx.createBufferSource(); s.buffer = noiseBuffer('white');
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 1200 + Math.random() * 2600; f.Q.value = 2;
      const g = ctx.createGain(); const t = ctx.currentTime;
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.08 + Math.random() * 0.1, t + 0.005); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08 + Math.random() * 0.1);
      s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + 0.25);
      crackleTimer = setTimeout(pop, 90 + Math.random() * 320);
    };
    pop();
  }

  function start() {
    if (started) return; started = true;
    try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return; }
    const master = ctx.createGain(); master.gain.value = preset.vol ?? 0.09; master.connect(ctx.destination);
    // base noise texture
    const src = ctx.createBufferSource(); src.buffer = noiseBuffer(preset.noise || 'white'); src.loop = true;
    const filt = ctx.createBiquadFilter(); filt.type = preset.filterType || 'lowpass'; filt.frequency.value = preset.freq || 800; filt.Q.value = preset.q || 0.7;
    src.connect(filt); filt.connect(master); src.start();
    // slow movement on the filter cutoff
    const lfo = ctx.createOscillator(); lfo.frequency.value = preset.lfo || 0.1;
    const lg = ctx.createGain(); lg.gain.value = preset.lfoAmt || 300; lfo.connect(lg); lg.connect(filt.frequency); lfo.start();
    // optional tonal drone (a soft low pad)
    if (preset.drone) {
      const dg = ctx.createGain(); dg.gain.value = preset.droneVol ?? 0.04; dg.connect(master);
      for (const f of preset.drone) { const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = f; const of = ctx.createBiquadFilter(); of.type = 'lowpass'; of.frequency.value = 400; o.connect(of); of.connect(dg); o.start(); }
    }
    if (preset.crackle) crackle(master);
  }
  return { start };
}

// themed presets keyed by world
export const AMBIENCE = {
  driftwave: { noise: 'white', filterType: 'highpass', freq: 6500, vol: 0.05, lfo: 0.05, lfoAmt: 2500, drone: [110, 164.8], droneVol: 0.03 }, // airy vaporwave wash + soft pad
  sofaboi: { noise: 'white', filterType: 'bandpass', freq: 2600, q: 0.6, vol: 0.11, lfo: 0.2, lfoAmt: 900, drone: [55, 82.4], droneVol: 0.03 }, // rain + low sad drone
  ravecharles: { noise: 'brown', filterType: 'lowpass', freq: 1300, vol: 0.08, lfo: 0.15, lfoAmt: 500 }, // crowd roar bed
  studio: { noise: 'white', filterType: 'bandpass', freq: 3200, q: 1.3, vol: 0.05, lfo: 3, lfoAmt: 1800 }, // glitchy static
  tanky: { noise: 'brown', filterType: 'lowpass', freq: 620, vol: 0.09, lfo: 0.07, lfoAmt: 320 }, // desert night wind
  shmorez: { noise: 'brown', filterType: 'lowpass', freq: 950, vol: 0.09, lfo: 0.1, lfoAmt: 250, crackle: true }, // campfire crackle
};
