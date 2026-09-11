import * as THREE from 'three';

// A playable set of DJ DECKS you can drop into any room — two spinning platters, a
// mixer, and a VU screen. Tap it to start the beat; tap again to cycle through a few
// tunes; once more to stop. Self-contained Web Audio (no assets). Every loop room
// gets one so you can mix anywhere in the complex.
//
//   const deck = buildDJDeck(scene, { x, z, ry, color });
//   deck.tap(raycaster);  deck.update(dt, t);

const std = (o) => new THREE.MeshStandardMaterial(o);
const C = (h) => new THREE.Color(h);

function textPlane(text, color, w = 512, h = 64) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.44)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 14; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// three little tunes: [name, bassline (semitone offsets), lead scale, bpm]
const TUNES = [
  { name: 'HOUSE', root: 55, bass: [0, 0, 7, 0], lead: [0, 3, 7, 10], bpm: 122, wave: 'sawtooth' },
  { name: 'DUB', root: 41, bass: [0, 0, 0, 5], lead: [0, 5, 7, 12], bpm: 88, wave: 'square' },
  { name: 'TRANCE', root: 55, bass: [0, 7, 5, 7], lead: [0, 4, 7, 11], bpm: 138, wave: 'sawtooth' },
];
const semi = (root, n) => root * Math.pow(2, n / 12);

export function buildDJDeck(scene, { x = 0, z = 0, ry = 0, color = 0x00f3ff } = {}) {
  const col = C(color);
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
  for (const [lx, lz] of [[-1.2, -0.4], [1.2, -0.4], [-1.2, 0.4], [1.2, 0.4]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.0, 8), std({ color: 0x14161f })); leg.position.set(lx, 0.5, lz); g.add(leg); }
  const table = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.18, 1.1), std({ color: 0x14202e, roughness: 0.5, metalness: 0.35, emissive: col.clone().multiplyScalar(0.12), emissiveIntensity: 0.5 })); table.position.y = 1.05; table.castShadow = true; g.add(table);
  const platters = [];
  for (const sx of [-0.9, 0.9]) {
    const deck = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.06, 0.9), std({ color: 0x0a0d14, roughness: 0.5 })); deck.position.set(sx, 1.16, 0); g.add(deck);
    const plat = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.05, 32), std({ color: 0x05060a, emissive: col, emissiveIntensity: 0.5, roughness: 0.4 })); plat.position.set(sx, 1.21, 0); g.add(plat);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.05, 12), new THREE.MeshBasicMaterial({ color: 0xffe08a })); dot.rotation.x = -Math.PI / 2; dot.position.set(sx + 0.18, 1.245, 0); plat.add(dot);
    platters.push(plat);
  }
  const mixer = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.1, 0.9), std({ color: 0x0e1620, roughness: 0.5, emissive: col, emissiveIntensity: 0.12 })); mixer.position.set(0, 1.16, 0); g.add(mixer);
  for (const fx of [-0.15, 0, 0.15]) { const fader = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.28), std({ color: 0x2a3546 })); fader.position.set(fx, 1.22, 0); g.add(fader); }
  // VU screen
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, on: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t,on; void main(){ float b=step(v.y, 0.5+0.45*sin(v.x*10.0+t*(4.0+on*6.0))*on); vec3 c=mix(vec3(0.1,0.4,0.5),vec3(1.0,0.7,0.3),v.x); gl_FragColor=vec4(c*b*(0.3+on*0.7),1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.5), scrMat); scr.position.set(0, 1.62, -0.53); scr.rotation.x = -0.15; g.add(scr);
  const cap = textPlane('DJ DECKS · tap to play', '#' + col.getHexString(), 512, 48); cap.position.set(0, 2.15, -0.4); cap.scale.set(2.9, 0.32, 1); g.add(cap);
  // "now playing" label with its own redrawable canvas
  const nowCanvas = document.createElement('canvas'); nowCanvas.width = 256; nowCanvas.height = 44; const nowCtx = nowCanvas.getContext('2d');
  const nowTex = new THREE.CanvasTexture(nowCanvas); nowTex.colorSpace = THREE.SRGBColorSpace;
  const nowEl = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: nowTex, transparent: true, depthWrite: false, fog: false }));
  nowEl.position.set(0, 1.85, -0.45); nowEl.scale.set(1.8, 0.24, 1); nowEl.visible = false; g.add(nowEl);
  function setNow(txt) { nowCtx.clearRect(0, 0, 256, 44); nowCtx.font = 'bold 22px ui-monospace, monospace'; nowCtx.textAlign = 'center'; nowCtx.textBaseline = 'middle'; nowCtx.shadowColor = '#ffe08a'; nowCtx.shadowBlur = 12; nowCtx.fillStyle = '#ffe08a'; nowCtx.fillText(txt, 128, 22); nowTex.needsUpdate = true; }
  const gl = new THREE.PointLight(color, 1.4, 9, 2); gl.position.set(0, 1.7, 0.7); g.add(gl);
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.6, 1.2), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(x, 1.2, z); proxy.rotation.y = ry; scene.add(proxy);

  // ---- audio ----
  let actx = null, master = null, playing = false, tune = -1, lastStep = -1;
  function AC() { if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); master = actx.createGain(); master.gain.value = 0.3; master.connect(actx.destination); } catch (e) { actx = null; } } if (actx && actx.state === 'suspended') actx.resume(); return actx; }
  function whiteBuf(sec) { const n = actx.sampleRate * sec; const b = actx.createBuffer(1, n, actx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1; return b; }
  function kick(w) { const o = actx.createOscillator(), gg = actx.createGain(); o.frequency.setValueAtTime(150, w); o.frequency.exponentialRampToValueAtTime(45, w + 0.12); gg.gain.setValueAtTime(0.9, w); gg.gain.exponentialRampToValueAtTime(0.001, w + 0.22); o.connect(gg); gg.connect(master); o.start(w); o.stop(w + 0.24); }
  function hat(w) { const s = actx.createBufferSource(); s.buffer = whiteBuf(0.06); const hp = actx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 8500; const gg = actx.createGain(); gg.gain.setValueAtTime(0.12, w); gg.gain.exponentialRampToValueAtTime(0.001, w + 0.04); s.connect(hp); hp.connect(gg); gg.connect(master); s.start(w); s.stop(w + 0.06); }
  function synth(w, f, wave, dur, gain) { const o = actx.createOscillator(), gg = actx.createGain(); o.type = wave; o.frequency.value = f; const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; o.connect(lp); lp.connect(gg); gg.connect(master); gg.gain.setValueAtTime(0.0001, w); gg.gain.linearRampToValueAtTime(gain, w + 0.02); gg.gain.exponentialRampToValueAtTime(0.001, w + dur); o.start(w); o.stop(w + dur + 0.02); }
  function tick(t) {
    if (!actx || !playing || tune < 0) return;
    const T = TUNES[tune]; const six = (60 / T.bpm) / 4; const step = Math.floor(t / six);
    if (step === lastStep) return; lastStep = step;
    const s = ((step % 16) + 16) % 16; const w = actx.currentTime + 0.01;
    if (s % 4 === 0) kick(w);
    if (s % 2 === 1) hat(w);
    if (s % 4 === 0) synth(w, semi(T.root, T.bass[(step / 4 | 0) % T.bass.length]), T.wave, 0.24, 0.2);        // bass
    if (s % 2 === 0) synth(w, semi(T.root * 2, T.lead[(step / 2 | 0) % T.lead.length]), T.wave, 0.18, 0.1);   // lead
  }
  function cycle() {
    AC(); if (!actx) return;
    if (!playing) { playing = true; tune = 0; }
    else { tune++; if (tune >= TUNES.length) { playing = false; tune = -1; } }
    scrMat.uniforms.on.value = playing ? 1 : 0;
    nowEl.visible = playing;
    if (playing) setNow('▶ ' + TUNES[tune].name);
  }
  function tap(raycaster) { if (raycaster.intersectObject(proxy, false)[0]) { cycle(); return true; } return false; }
  function update(dt, t) {
    scrMat.uniforms.t.value = t;
    platters.forEach((p, i) => p.rotation.y += dt * (playing ? 2.6 : 0.2) * (i ? 1 : -1));
    gl.intensity = (playing ? 2.2 : 1.0) + Math.sin(t * 3) * 0.4;
    tick(t);
  }
  return { group: g, proxy, tap, update, isPlaying: () => playing };
}
