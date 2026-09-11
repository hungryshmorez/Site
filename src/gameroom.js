import { createRoom } from './scene/roomkit.js';

// INTERACTIVE GAME ROOM — a reactive LIGHT-UP DANCE FLOOR: the tiles glow under your
// feet as you walk, and tapping a tile pulses it and plays a note. Neon arcade dressing.
// Part of the big loop (Control Room ◂ ▸ Rooftop), with its own DJ decks.
const R = createRoom({
  id: 'gameroom', hook: '__gm', fog: [0x0a0614, 0.022], exposure: 1.2,
  bounds: 13, zMin: -13, spawn: [0, 1.6, 11], yaw: 0,
  backAt: [0, 11.6, Math.PI], nextAt: [0, -12.4, 0], deckAt: [10.5, 4, -Math.PI / 2], deckColor: 0xff66cc,
});
const { scene, updaters, std, C, textPlane, THREE } = R;

scene.add(new THREE.HemisphereLight(0x2a1840, 0x06040c, 0.7));
const glow = new THREE.PointLight(0xff66cc, 1.6, 26, 2); glow.position.set(0, 6, 0); scene.add(glow);

// ---- walls ----
{
  const base = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), std({ color: 0x0a0812, roughness: 0.7, metalness: 0.3, emissive: C(0x120a1e), emissiveIntensity: 0.25 })); base.rotation.x = -Math.PI / 2; base.position.y = -0.01; scene.add(base);
  const wm = std({ color: 0x140a20, roughness: 0.85, emissive: C(0x1a0a2a), emissiveIntensity: 0.3 });
  const mk = (w, h, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wm); m.position.set(x, y, z); scene.add(m); };
  mk(26, 8, 0.5, 0, 4, -13); mk(0.5, 8, 26, -13, 4, 0); mk(0.5, 8, 26, 13, 4, 0); mk(26, 8, 0.5, 0, 4, 13);
  // neon trim lines
  for (const [x, y, z, w, h, col] of [[0, 7.5, -12.7, 24, 0.12, 0xff66cc], [-12.7, 4, 0, 0.12, 7, 0x00f3ff], [12.7, 4, 0, 0.12, 7, 0x39ff14]]) { const n = new THREE.Mesh(new THREE.BoxGeometry(w, h, w > h ? 0.12 : 24), new THREE.MeshBasicMaterial({ color: col })); n.position.set(x, y, z); scene.add(n); }
}

// ---- reactive light-up dance floor ----
const NOTES = [261.6, 293.7, 329.6, 392, 440, 523.2];
let actx = null; function note(f) { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.type = 'triangle'; o.frequency.value = f; g.gain.setValueAtTime(0.16, actx.currentTime); g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.35); o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.37); } catch (e) {} }
const tiles = [];
{
  const N = 7, S = 1.7, off = -(N - 1) / 2 * S;
  for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) {
    const hue = (r + c) / (2 * N);
    const col = new THREE.Color().setHSL(hue, 0.9, 0.55);
    const mat = std({ color: 0x0c0c16, emissive: col, emissiveIntensity: 0.12, roughness: 0.4, metalness: 0.3 });
    const tile = new THREE.Mesh(new THREE.BoxGeometry(S * 0.92, 0.12, S * 0.92), mat);
    const x = off + c * S, z = off + r * S; tile.position.set(x, 0.06, z); scene.add(tile);
    tiles.push({ mesh: tile, mat, x, z, col, lvl: 0.12, note: NOTES[(r + c) % NOTES.length] });
  }
}
R.addTap((ray) => { const h = ray.intersectObjects(tiles.map((t) => t.mesh), false)[0]; if (h) { const t = tiles.find((q) => q.mesh === h.object); t.lvl = 1.6; note(t.note); return true; } return false; });
R.onFrame((dt, t2) => {
  const p = R.controls.pos;
  for (const q of tiles) {
    const near = Math.abs(p.x - q.x) < 1.0 && Math.abs(p.z - q.z) < 1.0;
    const tgt = near ? 1.3 : 0.12;
    if (near && q.lvl < 0.6) note(q.note);   // step on a tile → it chimes
    q.lvl += (Math.max(tgt, q.lvl * 0.9) - q.lvl) * Math.min(1, dt * 8);
    q.mat.emissiveIntensity = q.lvl;
  }
});

// ---- a big arcade screen + a claw-machine cabinet as dressing ----
{
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t; void main(){ vec2 p=floor(v*12.0); float b=step(0.5, fract(sin(dot(p,vec2(12.9,78.2))+floor(t*3.0))*43758.5)); vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+p.x*0.6+t); gl_FragColor=vec4(c*b,1.0);} `,
  });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(7, 3.6), scrMat); scr.position.set(0, 3.4, -12.6); scene.add(scr);
  updaters.push((dt, t) => scrMat.uniforms.t.value = t);
  const cap = textPlane('GAME ROOM', '#ff66cc', 512, 64); cap.position.set(0, 5.7, -12.5); cap.scale.set(5.5, 0.8, 1); scene.add(cap);
  // claw machine
  const g = new THREE.Group(); g.position.set(-10.5, 0, -9); scene.add(g);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(2, 3.2, 2), std({ color: 0x14202e, roughness: 0.4, metalness: 0.4, emissive: C(0xff2bd0), emissiveIntensity: 0.15 })); cab.position.y = 1.6; g.add(cab);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.6, 1.7), new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.18 })); glass.position.y = 2.4; g.add(glass);
  for (let i = 0; i < 6; i++) { const prize = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), std({ color: [0xff66cc, 0xffe14a, 0x39ff14, 0x00f3ff][i % 4], emissive: C(0xffffff), emissiveIntensity: 0.1 })); prize.position.set(-0.5 + Math.random(), 1.85 + Math.random() * 0.2, -0.5 + Math.random()); g.add(prize); }
  const cg = new THREE.PointLight(0xff66cc, 1.6, 8, 2); cg.position.set(0, 3, 0.5); g.add(cg);
}
