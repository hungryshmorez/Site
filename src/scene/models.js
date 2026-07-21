import * as THREE from 'three';

// Procedural, stylized characters + structures built from primitives (no
// external assets). Each builder returns { group, update?(t,pulse) } with the
// group's feet at y=0. Colours lean on each act's accent.

const std = (o) => new THREE.MeshStandardMaterial(o);

// ---------------------------------------------------------------- SHMOREZ
// A marshmallow man: stacked soft white puffs, singed/toasted glowing base
// ("an animated electronic marshmallow squish of fire").
export function buildMarshmallow(accent = '#ff6b35') {
  const g = new THREE.Group();
  const white = std({ color: 0xf3efe6, roughness: 0.95, metalness: 0 });
  const toast = std({ color: 0xcaa27a, roughness: 0.9, emissive: new THREE.Color(accent), emissiveIntensity: 0.25 });

  const belly = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 20), white);
  belly.position.y = 0.62; belly.scale.y = 0.92; belly.castShadow = true; g.add(belly);
  const chest = new THREE.Mesh(new THREE.SphereGeometry(0.48, 24, 20), white);
  chest.position.y = 1.32; chest.castShadow = true; g.add(chest);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 20), white);
  head.position.y = 1.92; head.castShadow = true; g.add(head);

  // toasted underside
  const base = new THREE.Mesh(new THREE.SphereGeometry(0.6, 24, 12, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38), toast);
  base.position.y = 0.62; base.scale.y = 0.92; g.add(base);

  // stubby arms + legs
  const limb = (x, y, r = 0.17) => { const m = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), white); m.position.set(x, y, 0); m.castShadow = true; g.add(m); return m; };
  const armL = limb(-0.62, 1.05, 0.2), armR = limb(0.62, 1.05, 0.2);
  limb(-0.26, 0.06, 0.22); limb(0.26, 0.06, 0.22);

  // face
  const eye = std({ color: 0x1a120e });
  for (const sx of [-0.13, 0.13]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), eye); e.position.set(sx, 1.98, 0.3); g.add(e); }
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.02, 8, 16, Math.PI), eye);
  mouth.position.set(0, 1.84, 0.31); mouth.rotation.z = Math.PI; g.add(mouth);

  return {
    group: g,
    update: (t, pulse) => {
      // squish on the beat
      const s = 1 + pulse * 0.12;
      belly.scale.set(1 + pulse * 0.14, 0.92 * (1 - pulse * 0.12), 1 + pulse * 0.14);
      chest.scale.setScalar(1 + pulse * 0.06);
      armL.position.y = 1.05 + Math.sin(t * 3) * 0.1 + pulse * 0.2;
      armR.position.y = 1.05 - Math.sin(t * 3) * 0.1 + pulse * 0.2;
      base.material.emissiveIntensity = 0.2 + pulse * 0.5;
    },
  };
}

// ---------------------------------------------------------------- TANKY
// A cowboy: brown duster body, wide-brim hat, boots, glowing gold star badge.
export function buildCowboy(accent = '#e6c04a') {
  const g = new THREE.Group();
  const denim = std({ color: 0x3a2c22, roughness: 0.85 });
  const skin = std({ color: 0xcaa07a, roughness: 0.7 });
  const felt = std({ color: 0x241a12, roughness: 0.9 });
  const gold = std({ color: 0x3a2c10, emissive: new THREE.Color(accent), emissiveIntensity: 0.8, metalness: 0.6, roughness: 0.3 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.33, 1.0, 6, 12), denim);
  body.position.y = 1.05; body.castShadow = true; g.add(body);
  // duster flare
  const coat = new THREE.Mesh(new THREE.ConeGeometry(0.55, 1.0, 16, 1, true), denim);
  coat.position.y = 0.7; coat.castShadow = true; g.add(coat);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 18, 16), skin);
  head.position.y = 1.92; head.castShadow = true; g.add(head);

  // hat: brim + crown
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.05, 24), felt);
  brim.position.y = 2.06; g.add(brim);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.3, 0.34, 20), felt);
  crown.position.y = 2.24; g.add(crown);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.305, 0.305, 0.07, 20), gold);
  band.position.y = 2.12; g.add(band);

  // boots
  for (const sx of [-0.18, 0.18]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.34), felt); b.position.set(sx, 0.1, 0.06); b.castShadow = true; g.add(b); }
  // star badge
  const star = new THREE.Mesh(new THREE.CircleGeometry(0.1, 5), gold);
  star.position.set(0.14, 1.25, 0.33); g.add(star);
  // brim shade for face
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.05), felt); brow.position.set(0, 1.99, 0.22); g.add(brow);

  return { group: g, update: (t, pulse) => { star.material.emissiveIntensity = 0.6 + pulse * 0.8; g.rotation.y = Math.sin(t * 0.5) * 0.08; } };
}

// ---------------------------------------------------------------- DRIFTWAVE
// Vaporwave: a chrome classical bust with shades, a retro striped sun halo,
// and a magenta grid ring at the feet.
export function buildVaporwave(accent = '#b967ff') {
  const g = new THREE.Group();
  const chrome = std({ color: 0x2a1840, roughness: 0.15, metalness: 0.9, emissive: new THREE.Color(accent), emissiveIntensity: 0.15 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.9, 6, 14), chrome);
  body.position.y = 1.0; body.castShadow = true; g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 18), chrome);
  head.position.y = 1.85; head.castShadow = true; g.add(head);

  // shades
  const shade = std({ color: 0x050008, emissive: new THREE.Color('#01cdfe'), emissiveIntensity: 0.6, metalness: 0.5, roughness: 0.2 });
  const glasses = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.12, 0.06), shade);
  glasses.position.set(0, 1.88, 0.24); g.add(glasses);

  // retro sun halo behind head (striped disc)
  const sun = makeRetroSun();
  sun.position.set(0, 1.95, -0.45); sun.scale.setScalar(1.1); g.add(sun);

  // grid ring
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.7, 0.02, 8, 40), std({ color: 0x120018, emissive: new THREE.Color('#ff71ce'), emissiveIntensity: 0.9 }));
  ring.rotation.x = Math.PI / 2; ring.position.y = 0.05; g.add(ring);
  const pink = new THREE.PointLight('#ff71ce', 3, 6, 2); pink.position.set(0, 1.4, 0.4); g.add(pink);

  return {
    group: g,
    update: (t, pulse) => {
      head.rotation.y = Math.sin(t * 0.6) * 0.3;
      sun.material.emissiveIntensity = 0.7 + pulse * 0.5;
      ring.scale.setScalar(1 + pulse * 0.3);
    },
  };
}
function makeRetroSun() {
  const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d');
  const grd = x.createLinearGradient(0, 0, 0, 128);
  grd.addColorStop(0, '#ffd36b'); grd.addColorStop(0.5, '#ff71ce'); grd.addColorStop(1, '#8a2be2');
  x.fillStyle = grd; x.beginPath(); x.arc(64, 64, 60, 0, Math.PI * 2); x.fill();
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 6; i++) { const y = 74 + i * 9; x.fillRect(0, y, 128, 4 + i); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.CircleGeometry(0.5, 32),
    new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
  m.material.emissiveIntensity = 1; return m;
}

// ---------------------------------------------------------------- 12MATT3R
// A glitch character: humanoid built from horizontal slices that shear and
// RGB-split on the beat.
export function buildGlitch(accent = '#00F3FF') {
  const g = new THREE.Group();
  const slices = [];
  const cyanMat = std({ color: 0x06222a, emissive: new THREE.Color(accent), emissiveIntensity: 0.6, roughness: 0.4 });
  const NS = 9;
  for (let i = 0; i < NS; i++) {
    const w = 0.5 - Math.abs(i - 3.5) * 0.02;
    const s = new THREE.Mesh(new THREE.BoxGeometry(w, 0.19, 0.32), cyanMat.clone());
    s.position.set(0, 0.35 + i * 0.2, 0); s.castShadow = true; g.add(s); slices.push(s);
  }
  // ghost copies for RGB split
  const ghost = (col) => { const gg = new THREE.Group();
    slices.forEach((s) => { const m = new THREE.Mesh(s.geometry, new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })); m.position.copy(s.position); gg.add(m); });
    g.add(gg); return gg; };
  const gMag = ghost(0xff0055), gCyn = ghost(0x00f3ff);
  const cyanL = new THREE.PointLight(accent, 5, 7, 2); cyanL.position.y = 1.4; g.add(cyanL);

  return {
    group: g,
    update: (t, pulse) => {
      const glitch = pulse > 0.5 || Math.random() < 0.08;
      slices.forEach((s, i) => {
        const off = glitch ? (Math.random() - 0.5) * (0.25 + pulse * 0.5) : Math.sin(t * 4 + i) * 0.02;
        s.position.x = off;
        s.material.emissiveIntensity = 0.4 + pulse * 0.7 + (glitch ? Math.random() * 0.5 : 0);
      });
      gMag.position.set(-0.06 - pulse * 0.1, 0, 0); gMag.visible = glitch;
      gCyn.position.set(0.06 + pulse * 0.1, 0, 0); gCyn.visible = glitch;
      gMag.children.forEach((m, i) => (m.position.x = slices[i].position.x));
      gCyn.children.forEach((m, i) => (m.position.x = slices[i].position.x));
    },
  };
}

// ---------------------------------------------------------------- RAVE CHARLES
// A masked raver / DJ: dark body, helmet with a glowing curved LED visor,
// headphones, magenta light-strips.
export function buildRaver(accent = '#FF0055') {
  const g = new THREE.Group();
  const dark = std({ color: 0x0d0d14, roughness: 0.6, metalness: 0.3 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.33, 1.0, 6, 12), dark);
  body.position.y = 1.05; body.castShadow = true; g.add(body);

  // helmet
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 18), std({ color: 0x14141c, roughness: 0.3, metalness: 0.6 }));
  helmet.position.y = 1.95; helmet.castShadow = true; g.add(helmet);
  // glowing visor
  const visorMat = std({ color: 0x1a0010, emissive: new THREE.Color(accent), emissiveIntensity: 1.2 });
  const visor = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 10, 24, Math.PI), visorMat);
  visor.position.set(0, 1.96, 0.14); visor.rotation.x = Math.PI / 2; visor.rotation.z = Math.PI; g.add(visor);
  // headphones
  for (const sx of [-0.3, 0.3]) { const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), visorMat); ear.rotation.z = Math.PI / 2; ear.position.set(sx, 1.98, 0); g.add(ear); }
  const bandTop = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.03, 8, 24, Math.PI), std({ color: 0x22222c })); bandTop.position.y = 2.1; g.add(bandTop);
  // arm light strips
  const strips = [];
  for (const sx of [-0.34, 0.34]) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.04), visorMat.clone()); st.position.set(sx, 1.1, 0.05); g.add(st); strips.push(st); }
  const mag = new THREE.PointLight(accent, 7, 8, 2); mag.position.set(0, 1.7, 0.4); g.add(mag);

  return {
    group: g,
    update: (t, pulse) => {
      visor.material.emissiveIntensity = 0.9 + pulse * 1.4;
      strips.forEach((s, i) => (s.material.emissiveIntensity = 0.6 + pulse * 1.2 + Math.sin(t * 6 + i) * 0.3));
      g.children[0].rotation.z = Math.sin(t * 2) * 0.05; // sway
    },
  };
}

// ---------------------------------------------------------------- VENDOR STALL
// The merch tent: a striped canopy on posts + a glowing sign + a small vendor.
export function buildStall(accent = '#39FF14') {
  const g = new THREE.Group();
  const post = std({ color: 0x14141c, metalness: 0.6, roughness: 0.5 });
  for (const [x, z] of [[-1.4, -1], [1.4, -1], [-1.4, 1], [1.4, 1]]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.4, 10), post); p.position.set(x, 1.2, z); p.castShadow = true; g.add(p); }
  // canopy (striped)
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 2.6), makeStripes(accent));
  canopy.position.set(0, 2.45, 0); canopy.castShadow = true; g.add(canopy);
  // counter
  const counter = new THREE.Mesh(new THREE.BoxGeometry(3, 0.9, 0.5), std({ color: 0x101018, roughness: 0.8 }));
  counter.position.set(0, 0.45, 1); counter.castShadow = true; g.add(counter);
  // sign
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), std({ color: 0x02160a, emissive: new THREE.Color(accent), emissiveIntensity: 0.7 }));
  sign.position.set(0, 2.0, 1.31); g.add(sign);
  // vendor person behind counter
  const vend = buildMarshmallow('#39FF14').group; vend.scale.setScalar(0.62); vend.position.set(0, 0.35, 0.2); g.add(vend);
  const gl = new THREE.PointLight(accent, 5, 8, 2); gl.position.set(0, 2.2, 1); g.add(gl);
  return { group: g, update: (t, pulse) => { sign.material.emissiveIntensity = 0.5 + pulse * 0.6; } };
}
function makeStripes(accent) {
  const c = document.createElement('canvas'); c.width = 256; c.height = 64; const x = c.getContext('2d');
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? '#0a0a12' : accent; x.fillRect(i * 32, 0, 32, 64); }
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return std({ map: tex, emissive: new THREE.Color(accent), emissiveIntensity: 0.12, roughness: 0.8 });
}

// ---------------------------------------------------------------- BATHROOM (Labs)
// The Lab is the festival bathroom: a row of porta-potty stalls, one glowing
// green ("experiments happen in here").
export function buildBathroom(accent = '#39FF14') {
  const g = new THREE.Group();
  const shell = std({ color: 0x14301c, roughness: 0.9 });
  const glow = std({ color: 0x03210f, emissive: new THREE.Color(accent), emissiveIntensity: 0.5 });
  for (let i = 0; i < 3; i++) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.0, 2.1, 1.0), i === 1 ? glow : shell);
    box.position.set((i - 1) * 1.15, 1.05, 0); box.castShadow = true; g.add(box);
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.5, 0.03), std({ color: 0x0a1a10, roughness: 0.8 }));
    door.position.set((i - 1) * 1.15, 0.9, 0.52); g.add(door);
    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.02), std({ color: 0x0a1a10 })); vent.position.set((i - 1) * 1.15, 1.7, 0.52); g.add(vent);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.1, 1.2), std({ color: 0x0d200f })); roof.position.y = 2.15; g.add(roof);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.4), glow); sign.position.set(0, 2.45, 0); g.add(sign);
  const gl = new THREE.PointLight(accent, 4, 7, 2); gl.position.set(0, 1.6, 1); g.add(gl);
  return { group: g, update: (t, pulse) => { g.children[3 * 0].material.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.2 + pulse * 0.3; } };
}

export const MODELS = {
  marshmallow: buildMarshmallow,
  cowboy: buildCowboy,
  vaporwave: buildVaporwave,
  glitch: buildGlitch,
  raver: buildRaver,
  stall: buildStall,
  bathroom: buildBathroom,
};
