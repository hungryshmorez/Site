import { createRoom } from './scene/roomkit.js';

// UTILITY / CONTROL ROOM — the behind-the-scenes nerve center: server racks with
// blinking lights, a wall of monitors, patch panels and cabling. Part of the big loop
// (Horrorcore ◂ ▸ Game Room), with its own DJ decks.
const R = createRoom({
  id: 'utility', hook: '__ut', fog: [0x060a0e, 0.028], exposure: 1.15,
  bounds: 13, zMin: -13, spawn: [0, 1.6, 11], yaw: 0,
  backAt: [0, 11.6, Math.PI], nextAt: [0, -12.4, 0], deckAt: [10, 4, -Math.PI / 2], deckColor: 0xffb020,
});
const { scene, updaters, std, C, textPlane, THREE } = R;

scene.add(new THREE.HemisphereLight(0x3a4a5c, 0x0a0e14, 1.15));
scene.add(new THREE.AmbientLight(0x2a3644, 0.5));
const amber = new THREE.PointLight(0xffb020, 3.0, 34, 2); amber.position.set(0, 6, 0); scene.add(amber);
const coolL = new THREE.PointLight(0x4a80c0, 2.0, 26, 2); coolL.position.set(-7, 5, 4); scene.add(coolL);
const coolR = new THREE.PointLight(0x4a80c0, 2.0, 26, 2); coolR.position.set(7, 5, 4); scene.add(coolR);

// ---- floor (grating) + walls ----
{
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const x = cv.getContext('2d');
  x.fillStyle = '#0c1016'; x.fillRect(0, 0, 64, 64); x.strokeStyle = 'rgba(90,110,130,0.5)'; x.lineWidth = 3;
  for (let i = 0; i <= 64; i += 8) { x.beginPath(); x.moveTo(i, 0); x.lineTo(i, 64); x.moveTo(0, i); x.lineTo(64, i); x.stroke(); }
  const tex = new THREE.CanvasTexture(cv); tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(13, 13); tex.colorSpace = THREE.SRGBColorSpace;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(26, 26), std({ map: tex, roughness: 0.6, metalness: 0.5, emissive: C(0x0a1016), emissiveIntensity: 0.3 })); floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
  const wm = std({ color: 0x0e141c, roughness: 0.8, metalness: 0.3, emissive: C(0x0a1420), emissiveIntensity: 0.3 });
  const mk = (w, h, d, x2, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wm); m.position.set(x2, y, z); scene.add(m); };
  mk(26, 8, 0.5, 0, 4, -13); mk(0.5, 8, 26, -13, 4, 0); mk(0.5, 8, 26, 13, 4, 0); mk(26, 8, 0.5, 0, 4, 13);
}

// ---- server racks with blinking LEDs ----
const leds = [];
function rack(x, z, ry) {
  const g = new THREE.Group(); g.position.set(x, 0, z); g.rotation.y = ry; scene.add(g);
  const body = new THREE.Mesh(new THREE.BoxGeometry(2, 4.4, 1), std({ color: 0x0a0d12, roughness: 0.5, metalness: 0.6 })); body.position.y = 2.2; body.castShadow = true; g.add(body);
  for (let r = 0; r < 8; r++) { const unit = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.42, 0.1), std({ color: 0x141a22, roughness: 0.4, metalness: 0.5 })); unit.position.set(0, 0.6 + r * 0.46, 0.52); g.add(unit);
    for (let c = 0; c < 5; c++) { const col = [0x39ff88, 0xffb020, 0xff3040, 0x00f3ff][(r + c) % 4]; const led = new THREE.Mesh(new THREE.CircleGeometry(0.05, 8), new THREE.MeshBasicMaterial({ color: col })); led.position.set(-0.7 + c * 0.35, 0.6 + r * 0.46, 0.58); g.add(led); leds.push({ m: led, ph: Math.random() * 6, sp: 1 + Math.random() * 4 }); } }
  const gl = new THREE.PointLight(0x2a5a8a, 1.2, 8, 2); gl.position.set(0, 2.4, 1.4); g.add(gl);
}
rack(-10, -8, 0.3); rack(-10, -3, 0.3); rack(-10, 2, 0.3); rack(10, -8, -0.3); rack(10, -3, -0.3);
updaters.push((dt, t) => leds.forEach((l) => { l.m.material.color.getHSL({}); l.m.visible = Math.sin(t * l.sp + l.ph) > -0.3; }));

// ---- monitor wall (animated shader screens) ----
{
  const scrMat = () => new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, s: { value: Math.random() * 10 } },
    vertexShader: `varying vec2 v; void main(){ v=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 v; uniform float t,s; void main(){ float g=step(0.5, fract(v.y*8.0)); float wv=0.5+0.5*sin(v.x*12.0+t*2.0+s); vec3 c=mix(vec3(0.05,0.5,0.4), vec3(0.9,0.7,0.15), wv); float sl=0.85+0.15*sin(v.y*160.0); float line=step(v.y, fract(v.x*3.0+t*0.5)); gl_FragColor=vec4(c*(0.4+0.6*line)*sl,1.0);} `,
  });
  const mats = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) { const m = scrMat(); mats.push(m); const scr = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), m); scr.position.set(-4.5 + c * 3, 2.2 + r * 1.8, -12.6); scene.add(scr); const fr = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.7, 0.12), std({ color: 0x05070a, metalness: 0.5 })); fr.position.set(-4.5 + c * 3, 2.2 + r * 1.8, -12.7); scene.add(fr); }
  updaters.push((dt, t) => mats.forEach((m) => m.uniforms.t.value = t));
  const cap = textPlane('CONTROL ROOM', '#ffb020', 512, 64); cap.position.set(0, 5.6, -12.5); cap.scale.set(6, 0.8, 1); scene.add(cap);
}

// ---- patch panel you can flip (tap the switches → they toggle + click) ----
{
  const g = new THREE.Group(); g.position.set(11.4, 2.2, -2); g.rotation.y = -Math.PI / 2; scene.add(g);
  const panel = new THREE.Mesh(new THREE.BoxGeometry(4, 2.4, 0.2), std({ color: 0x14181f, roughness: 0.5, metalness: 0.5 })); g.add(panel);
  const switches = [];
  for (let i = 0; i < 12; i++) { const sx = -1.5 + (i % 6) * 0.6, sy = 0.5 - ((i / 6) | 0) * 1.0; const base = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 0.1), std({ color: 0x0a0d12 })); base.position.set(sx, sy, 0.14); g.add(base); const lev = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.26, 0.14), std({ color: 0xffb020, emissive: C(0xffb020), emissiveIntensity: 0.5 })); lev.position.set(sx, sy + 0.12, 0.22); g.add(lev); switches.push({ lev, on: false, y: sy }); }
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(4, 2.4, 0.6), new THREE.MeshBasicMaterial({ visible: false })); proxy.position.set(11.4, 2.2, -2); proxy.rotation.y = -Math.PI / 2; scene.add(proxy);
  let ac = null; function beep() { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); const o = ac.createOscillator(), gg = ac.createGain(); o.type = 'square'; o.frequency.value = 300 + Math.random() * 500; gg.gain.setValueAtTime(0.08, ac.currentTime); gg.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08); o.connect(gg); gg.connect(ac.destination); o.start(); o.stop(ac.currentTime + 0.1); } catch (e) {} }
  R.addTap((ray) => { if (ray.intersectObject(proxy, false)[0]) { const s = switches[(Math.random() * switches.length) | 0]; s.on = !s.on; s.lev.position.y = s.y + (s.on ? -0.12 : 0.12); s.lev.material.color.setHex(s.on ? 0x39ff88 : 0xffb020); s.lev.material.emissive.setHex(s.on ? 0x39ff88 : 0xffb020); beep(); return true; } return false; });
}
