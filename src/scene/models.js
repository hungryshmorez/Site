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
  const jeans = std({ color: 0x2b4a86, roughness: 0.85 });                 // blue jeans
  const tee = std({ color: 0xf2f2f0, roughness: 0.92 });                   // white t-shirt
  const skin = std({ color: 0xcaa07a, roughness: 0.7 });
  const brown = std({ color: 0x5a3a1e, roughness: 0.82 });                 // brown hat + boots
  const dark = std({ color: 0x1a120c, roughness: 0.7 });
  const gold = std({ color: 0x3a2c10, emissive: new THREE.Color(accent), emissiveIntensity: 0.9, metalness: 0.7, roughness: 0.3 });

  // legs (jeans)
  for (const sx of [-0.16, 0.16]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.9, 12), jeans); leg.position.set(sx, 0.5, 0); leg.castShadow = true; g.add(leg); }
  const hips = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.34, 0.34), jeans); hips.position.y = 1.0; hips.castShadow = true; g.add(hips);
  // belt + gold buckle (Tanky's accent)
  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.09, 0.36), dark); belt.position.y = 1.16; g.add(belt);
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.09, 0.03), gold); buckle.position.set(0, 1.16, 0.19); g.add(buckle);
  // torso (white tee) + short sleeves + skin forearms
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.31, 0.45, 6, 12), tee); torso.position.y = 1.5; torso.castShadow = true; g.add(torso);
  for (const sx of [-0.34, 0.34]) {
    const sleeve = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 10), tee); sleeve.position.set(sx, 1.62, 0); g.add(sleeve);
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.42, 10), skin); arm.position.set(sx, 1.32, 0); g.add(arm);
  }
  // head + brown cowboy hat
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 16), skin); head.position.y = 1.98; head.castShadow = true; g.add(head);
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.05, 24), brown); brim.position.y = 2.12; brim.castShadow = true; g.add(brim);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.29, 0.34, 20), brown); crown.position.y = 2.3; g.add(crown);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.295, 0.295, 0.06, 20), dark); band.position.y = 2.18; g.add(band);
  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.05), brown); brow.position.set(0, 2.05, 0.2); g.add(brow);
  // brown boots
  for (const sx of [-0.16, 0.16]) { const b = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.34), brown); b.position.set(sx, 0.1, 0.06); b.castShadow = true; g.add(b); }

  return { group: g, update: (t, pulse) => { buckle.material.emissiveIntensity = 0.7 + pulse * 0.9; g.rotation.y = Math.sin(t * 0.5) * 0.08; } };
}

// ---------------------------------------------------------------- DRIFTWAVE
// Vaporwave: a chrome classical bust with shades, a retro striped sun halo,
// and a magenta grid ring at the feet.
export function buildVaporwave(accent = '#b967ff') {
  const g = new THREE.Group();
  const chrome = std({ color: 0x2a1840, roughness: 0.15, metalness: 0.9, emissive: new THREE.Color(accent), emissiveIntensity: 0.15 });
  // a chrome mannequin — torso, hips, arms with hands, legs with feet
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.5, 6, 14), chrome); torso.position.y = 1.32; torso.castShadow = true; g.add(torso);
  const hips = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), chrome); hips.position.y = 1.0; hips.scale.set(1, 0.7, 0.9); g.add(hips);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.16, 10), chrome); neck.position.y = 1.66; g.add(neck);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.56, 5, 10), chrome); leg.position.set(s * 0.13, 0.55, 0); leg.castShadow = true; g.add(leg);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.11, 0.36), chrome); foot.position.set(s * 0.13, 0.18, 0.08); foot.castShadow = true; g.add(foot);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.082, 0.52, 5, 10), chrome); arm.rotation.z = s * 0.26; arm.position.set(s * 0.34, 1.3, 0.02); arm.castShadow = true; g.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), chrome); hand.position.set(s * 0.47, 1.0, 0.05); g.add(hand);
  }
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.27, 20, 18), chrome);
  head.position.y = 1.86; head.scale.set(0.95, 1.05, 1); head.castShadow = true; g.add(head);

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
  const rubber = std({ color: 0x05050a, roughness: 0.8 });
  // techwear body — torso, hips, arms with hands, legs with boots
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.56, 6, 12), dark); torso.position.y = 1.38; torso.castShadow = true; g.add(torso);
  const hips = new THREE.Mesh(new THREE.SphereGeometry(0.27, 16, 12), dark); hips.position.y = 1.04; hips.scale.set(1, 0.68, 0.9); g.add(hips);
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.16, 10), dark); neck.position.y = 1.72; g.add(neck);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.58, 5, 10), dark); leg.position.set(s * 0.14, 0.56, 0); leg.castShadow = true; g.add(leg);
    const boot = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.14, 0.4), rubber); boot.position.set(s * 0.14, 0.2, 0.1); boot.castShadow = true; g.add(boot);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.085, 0.56, 5, 10), dark); arm.rotation.z = s * 0.24; arm.position.set(s * 0.36, 1.34, 0.02); arm.castShadow = true; g.add(arm);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8), rubber); hand.position.set(s * 0.5, 1.02, 0.05); g.add(hand);
  }

  // helmet
  const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 18), std({ color: 0x14141c, roughness: 0.3, metalness: 0.6 }));
  helmet.position.y = 2.0; helmet.castShadow = true; g.add(helmet);
  // glowing visor
  const visorMat = std({ color: 0x1a0010, emissive: new THREE.Color(accent), emissiveIntensity: 1.2 });
  const visor = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.05, 10, 24, Math.PI), visorMat);
  visor.position.set(0, 2.01, 0.14); visor.rotation.x = Math.PI / 2; visor.rotation.z = Math.PI; g.add(visor);
  // headphones
  for (const sx of [-0.3, 0.3]) { const ear = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.08, 16), visorMat); ear.rotation.z = Math.PI / 2; ear.position.set(sx, 2.03, 0); g.add(ear); }
  const bandTop = new THREE.Mesh(new THREE.TorusGeometry(0.31, 0.03, 8, 24, Math.PI), std({ color: 0x22222c })); bandTop.position.y = 2.15; g.add(bandTop);
  // arm light strips down the forearms
  const strips = [];
  for (const sx of [-0.4, 0.4]) { const st = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.5, 0.04), visorMat.clone()); st.position.set(sx, 1.3, 0.08); st.rotation.z = (sx < 0 ? 1 : -1) * 0.24; g.add(st); strips.push(st); }
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

// ---------------------------------------------------------------- SOFA KING SAD BOI
// A hooded sad-boi slumped on a worn couch under his own little rain cloud —
// dubstep / weird bass, watching the whole festival from the back.
export function buildSofaBoi(accent = '#6a6cff') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const fabric = std({ color: 0x2a2c3a, roughness: 0.95 });   // worn couch
  const fabric2 = std({ color: 0x22242f, roughness: 0.95 });
  const seam = std({ color: 0x15161f, roughness: 1 });        // dark piping / seams
  const hoodie = std({ color: 0x191b26, roughness: 0.9, emissive: col, emissiveIntensity: 0.12 });
  const hoodieDk = std({ color: 0x0f1017, roughness: 0.95 }); // hood interior / shadow
  const shins = std({ color: 0x14161f, roughness: 0.9 });
  const skin = std({ color: 0xc9a888, roughness: 0.7 });
  const rubber = std({ color: 0x0c0d13, roughness: 0.85 });

  // ---- couch: seat, tufted back, arms, feet, + worn detail ----
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 1.1), fabric); seat.position.set(0, 0.5, 0); seat.castShadow = seat.receiveShadow = true; g.add(seat);
  const cushL = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.22, 1.0), fabric2); cushL.position.set(-0.55, 0.72, 0.02); g.add(cushL);
  const cushR = cushL.clone(); cushR.position.x = 0.55; g.add(cushR);
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 0.28), fabric); back.position.set(0, 0.95, -0.55); back.castShadow = true; g.add(back);
  const bcushL = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.7, 0.2), fabric2); bcushL.position.set(-0.55, 0.95, -0.4); g.add(bcushL);
  const bcushR = bcushL.clone(); bcushR.position.x = 0.55; g.add(bcushR);
  for (const sx of [-1.28, 1.28]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.75, 1.1), fabric); arm.position.set(sx, 0.72, 0); arm.castShadow = true; g.add(arm); }
  for (const [ax, az] of [[-1.05, 0.45], [1.05, 0.45], [-1.05, -0.45], [1.05, -0.45]]) { const f = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 8), std({ color: 0x140f0a })); f.position.set(ax, 0.15, az); g.add(f); }
  // tufting buttons on the back cushions + a worn seam across the seat front
  for (const bx of [-0.85, -0.55, -0.25, 0.25, 0.55, 0.85]) for (const by of [0.78, 1.12]) { const btn = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 6), seam); btn.position.set(bx, by, -0.31); g.add(btn); }
  const piping = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.3, 8), seam); piping.rotation.z = Math.PI / 2; piping.position.set(0, 0.7, 0.55); g.add(piping);
  // a slumped throw pillow on the left seat + a blanket draped over the right arm
  const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.16), std({ color: 0x33364a, roughness: 0.95, emissive: col, emissiveIntensity: 0.06 })); pillow.position.set(-0.86, 0.95, 0.18); pillow.rotation.set(0.2, 0.3, 0.5); g.add(pillow);
  const blanket = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.06), std({ color: 0x3a2d4a, roughness: 1 })); blanket.position.set(1.28, 0.7, 0.35); blanket.rotation.set(0.35, 0, 0.05); g.add(blanket);

  // ---- the sad boi (sitting, slumped forward) ----
  const boi = new THREE.Group(); boi.position.set(0.05, 0, 0.05); g.add(boi);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.4, 6, 12), hoodie); torso.position.set(0, 1.15, 0.05); torso.rotation.x = 0.3; torso.castShadow = true; boi.add(torso);
  // kangaroo pocket + glowing chest emblem + drawstrings with aglets
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.12), hoodieDk); pocket.position.set(0, 0.98, 0.34); pocket.rotation.x = 0.3; boi.add(pocket);
  const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.06, 20), std({ color: 0x05060a, emissive: col, emissiveIntensity: 0.9, roughness: 0.4 })); emblem.position.set(0, 1.22, 0.35); emblem.rotation.x = 0.3; boi.add(emblem);
  for (const sx of [-0.07, 0.07]) { const str = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.26, 6), hoodieDk); str.position.set(sx, 1.24, 0.33); str.rotation.x = 0.3; boi.add(str); const ag = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.05, 6), std({ color: 0x0a0b12, metalness: 0.4 })); ag.position.set(sx, 1.11, 0.37); boi.add(ag); }
  // head, hood shell + dark inner rim framing the face
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 16), skin); head.position.set(0, 1.52, 0.24); boi.add(head);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.31, 18, 16, 0, Math.PI * 2, 0, Math.PI * 0.64), hoodie); hood.position.set(0, 1.58, 0.16); hood.rotation.x = 0.5; hood.castShadow = true; boi.add(hood);
  const hoodRim = new THREE.Mesh(new THREE.TorusGeometry(0.235, 0.05, 8, 22), hoodieDk); hoodRim.position.set(0, 1.55, 0.32); hoodRim.rotation.x = 0.28; boi.add(hoodRim);
  // sad face: heavy-lidded downcast eyes, worried (inner-raised) brows, small nose, frown
  const eyeMat = std({ color: 0x0e0e16 });
  const lidShadow = std({ color: 0x9a7a63, roughness: 0.85 });
  for (const sx of [-0.09, 0.09]) {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.033, 10, 8), eyeMat); e.position.set(sx, 1.49, 0.46); boi.add(e);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.026, 0.018), lidShadow); lid.position.set(sx, 1.511, 0.468); lid.rotation.z = sx > 0 ? -0.12 : 0.12; boi.add(lid);  // heavy droop
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.013, 0.013), lidShadow); bag.position.set(sx, 1.462, 0.47); boi.add(bag);                                          // faint under-eye bag
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.095, 0.02, 0.02), std({ color: 0x1a1420, roughness: 0.9 })); brow.position.set(sx * 1.05, 1.555, 0.46); brow.rotation.z = sx > 0 ? -0.32 : 0.32; boi.add(brow); // inner end raised = worried
  }
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.06, 6), skin); nose.rotation.x = Math.PI / 2 + 0.3; nose.position.set(0, 1.465, 0.48); boi.add(nose);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.045, 0.012, 6, 14, Math.PI), std({ color: 0x2a1e22, roughness: 0.9 })); mouth.position.set(0, 1.415, 0.47); boi.add(mouth); // frown arc (corners down)
  // legs, arms, hands (right hand cups the phone), sneakers
  for (const sx of [-0.16, 0.16]) { const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.4, 4, 8), hoodie); th.rotation.x = Math.PI / 2; th.position.set(sx, 0.88, 0.35); boi.add(th); }
  for (const sx of [-0.16, 0.16]) { const sh = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 4, 8), shins); sh.position.set(sx, 0.42, 0.62); boi.add(sh); }
  for (const sx of [-0.16, 0.16]) {
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.14, 0.34), rubber); shoe.position.set(sx, 0.12, 0.78); shoe.castShadow = true; boi.add(shoe);
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.05, 0.36), std({ color: 0xd8d8e0, roughness: 0.6 })); sole.position.set(sx, 0.05, 0.78); boi.add(sole);
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.205, 0.03, 0.16), std({ color: 0x05060a, emissive: col, emissiveIntensity: 0.5 })); stripe.position.set(sx, 0.13, 0.8); boi.add(stripe);
  }
  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.35, 4, 8), hoodie); armL.rotation.x = Math.PI / 2.2; armL.position.set(-0.24, 1.0, 0.42); boi.add(armL);
  const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.35, 4, 8), hoodie); armR.rotation.x = Math.PI / 2.2; armR.position.set(0.24, 1.0, 0.42); boi.add(armR);
  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), skin); handL.position.set(-0.24, 0.92, 0.62); boi.add(handL);
  const handR = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), skin); handR.position.set(0.24, 0.96, 0.6); boi.add(handR);
  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.02), std({ color: 0x05060a, emissive: col, emissiveIntensity: 1.2 }));
  phone.position.set(0.24, 1.04, 0.58); phone.rotation.x = -0.5; boi.add(phone);
  const phoneGlow = new THREE.PointLight(accent, 2, 2.5, 2); phoneGlow.position.set(0.24, 1.12, 0.62); boi.add(phoneGlow);

  // ---- side subwoofer that wobbles to his weird bass ----
  const sub = new THREE.Group(); sub.position.set(2.0, 0, 0.15); g.add(sub);
  const subBox = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.9, 0.66), std({ color: 0x0a0b11, roughness: 0.7 })); subBox.position.y = 0.45; subBox.castShadow = true; sub.add(subBox);
  const subRing = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 10, 24), std({ color: 0x1a1c26, roughness: 0.6 })); subRing.position.set(0, 0.5, 0.34); sub.add(subRing);
  const subCone = new THREE.Mesh(new THREE.CircleGeometry(0.24, 24), std({ color: 0x101219, roughness: 0.5, emissive: col, emissiveIntensity: 0.12 })); subCone.position.set(0, 0.5, 0.35); sub.add(subCone);
  const subDust = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), std({ color: 0x05060a, emissive: col, emissiveIntensity: 0.3 })); subDust.position.set(0, 0.5, 0.36); sub.add(subDust);
  const subGlow = new THREE.PointLight(accent, 0.6, 3, 2); subGlow.position.set(0, 0.5, 0.6); sub.add(subGlow);

  // ---- little clutter: crushed can + pizza slice on the left arm, puddle below ----
  const can = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.16, 10), std({ color: 0x9aa2ad, metalness: 0.7, roughness: 0.35 })); can.position.set(-1.28, 1.16, 0.2); can.rotation.set(0.4, 0, 0.6); g.add(can);
  const pizzaBox = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.05, 0.34), std({ color: 0x6b5030, roughness: 1 })); pizzaBox.position.set(-1.28, 1.13, -0.2); pizzaBox.rotation.y = 0.3; g.add(pizzaBox);
  const puddle = new THREE.Mesh(new THREE.CircleGeometry(1.5, 32), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false })); puddle.rotation.x = -Math.PI / 2; puddle.position.set(0.1, 0.02, 0.5); g.add(puddle);

  // ---- personal rain cloud (denser, with a lightning core) ----
  const cloud = new THREE.Group(); cloud.position.set(0.05, 2.65, 0.1); g.add(cloud);
  const cloudMat = std({ color: 0x2b2f3e, roughness: 1, emissive: col, emissiveIntensity: 0.08 });
  for (const [cx, cy, cr] of [[-0.5, -0.02, 0.34], [-0.2, 0.08, 0.4], [0.14, 0.12, 0.44], [0.5, 0.02, 0.34], [0.06, -0.08, 0.4], [-0.3, -0.06, 0.3]]) { const puff = new THREE.Mesh(new THREE.SphereGeometry(cr, 14, 12), cloudMat); puff.position.set(cx, cy, (Math.random() - 0.5) * 0.2); cloud.add(puff); }
  const bolt = new THREE.PointLight(0xdfe4ff, 0, 4, 2); bolt.position.set(0.05, -0.15, 0); cloud.add(bolt);
  const rain = [];
  const rainMat = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < 20; i++) { const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.18, 4), rainMat); drop.position.set((Math.random() - 0.5) * 1.05, -0.25 - Math.random() * 0.8, (Math.random() - 0.5) * 0.45); cloud.add(drop); rain.push(drop); }

  let flash = 0;
  return {
    group: g,
    update: (t, pulse) => {
      // dejected slump sinks on the bass; slow breathing otherwise
      boi.position.y = -pulse * 0.06 + Math.sin(t * 1.2) * 0.01;
      boi.rotation.x = 0.02 + pulse * 0.04;
      head.position.y = 1.52 + Math.sin(t * 1.1) * 0.006 - pulse * 0.02;   // faint head bob
      phone.material.emissiveIntensity = 0.9 + Math.sin(t * 3) * 0.3 + pulse * 0.5;
      phoneGlow.intensity = 1.4 + pulse;
      // subwoofer cone punches out on the bass
      const push = pulse * 0.06 + Math.sin(t * 6) * 0.008;
      subCone.position.z = 0.35 + push; subDust.position.z = 0.36 + push * 1.2;
      subGlow.intensity = 0.4 + pulse * 1.6;
      rain.forEach((d, i) => { d.position.y -= (0.5 + i * 0.03) * 0.03; if (d.position.y < -1.2) d.position.y = -0.2; });
      cloud.position.x = 0.05 + Math.sin(t * 0.5) * 0.05;
      // occasional lightning flicker inside the cloud
      flash *= 0.82; if (Math.random() < 0.006 + pulse * 0.02) flash = 1;
      bolt.intensity = flash * 5;
      cloudMat.emissiveIntensity = 0.08 + flash * 0.5;
    },
  };
}

// ---------------------------------------------------------------- DREAMOS TV DOORWAY
// A big retro CRT television sitting flat on the ground: dark cabinet, wood side
// cheeks, dials, and a glowing scanline screen that lights up AROUND a central
// doorway you walk into → DreamOS TV (the movie theater).
export function buildDoorway(accent = '#FF0055') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);

  const W = 4.6, H = 3.7, D = 1.6;                 // TV cabinet
  const cabinet = std({ color: 0x16110c, roughness: 0.7, metalness: 0.2 });
  const wood = std({ color: 0x5a3a1e, roughness: 0.85 });                 // wood-grain cheeks

  // cabinet body, sitting flat on the ground
  const body = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), cabinet);
  body.position.y = H / 2; body.castShadow = body.receiveShadow = true; g.add(body);
  // wood side panels
  for (const sx of [-(W / 2 - 0.15), (W / 2 - 0.15)]) {
    const cheek = new THREE.Mesh(new THREE.BoxGeometry(0.4, H, D + 0.06), wood);
    cheek.position.set(sx, H / 2, 0); cheek.castShadow = true; g.add(cheek);
  }
  // dark bezel recess around the screen
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(W - 1.1, H - 0.8, 0.2), std({ color: 0x0a0a0f, roughness: 0.6 }));
  bezel.position.set(-0.2, H / 2 + 0.15, D / 2); g.add(bezel);

  // glowing scanline CRT screen (lights up around the doorway)
  const screenMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, c: { value: new THREE.Vector3(col.r, col.g, col.b) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: `varying vec2 vUv; uniform float t; uniform vec3 c;
      void main(){ vec2 u=vUv-0.5; float r=length(u);
        float rings=0.5+0.5*sin(r*22.0 - t*3.0);
        float scan=0.82+0.18*sin(vUv.y*150.0);
        float vig=smoothstep(0.85,0.15,r);
        float v=(0.35+0.5*rings)*scan*vig;
        vec3 col=mix(vec3(0.02,0.0,0.05), c, v);
        gl_FragColor=vec4(col,1.0); }`,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(W - 1.3, H - 1.0), screenMat);
  screen.position.set(-0.2, H / 2 + 0.15, D / 2 + 0.02); g.add(screen);

  // the doorway — a shimmering void set into the screen, open to the ground
  const DW = 1.7, DH = 2.5;
  const portalMat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { t: { value: 0 }, c: { value: new THREE.Vector3(col.r, col.g, col.b) } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }',
    fragmentShader: `varying vec2 vUv; uniform float t; uniform vec3 c;
      void main(){ vec2 u=vUv-0.5; float r=length(u);
        float rings=0.5+0.5*sin(r*30.0 - t*3.0);
        float v=smoothstep(0.55,0.0,r)*(0.32+0.55*rings);
        vec3 col=mix(vec3(0.0,0.0,0.02), c, v);
        gl_FragColor=vec4(col, 0.94); }`,
  });
  const portal = new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), portalMat);
  portal.position.set(-0.2, DH / 2 + 0.15, D / 2 + 0.05); g.add(portal);
  // dark doorframe around the opening so it reads as a way in
  const frameMat = std({ color: 0x05050a, roughness: 0.7 });
  for (const sx of [-(DW / 2 + 0.09), (DW / 2 + 0.09)]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.16, DH + 0.2, 0.14), frameMat); p.position.set(-0.2 + sx, DH / 2 + 0.15, D / 2 + 0.06); g.add(p); }
  const dtop = new THREE.Mesh(new THREE.BoxGeometry(DW + 0.34, 0.16, 0.14), frameMat); dtop.position.set(-0.2, DH + 0.23, D / 2 + 0.06); g.add(dtop);

  // control strip: dials + speaker grille on the right cheek's inner face
  const knobs = [];
  for (let i = 0; i < 3; i++) { const k = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 16), std({ color: 0x1a1a20, metalness: 0.5, roughness: 0.4 })); k.rotation.x = Math.PI / 2; k.position.set(W / 2 - 0.7, H - 0.6 - i * 0.55, D / 2 + 0.02); g.add(k); knobs.push(k); }

  // marquee label on top + underglow
  const sign = textPlane('DREAMOS TV', accent); sign.position.set(-0.2, H + 0.35, D / 2 - 0.2); sign.scale.set(2.8, 0.5, 1); g.add(sign);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(2.2, 32),
    new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending, depthWrite: false }));
  pool.rotation.x = -Math.PI / 2; pool.position.set(0, 0.03, 0.6); g.add(pool);
  const gl = new THREE.PointLight(accent, 3, 10, 2); gl.position.set(0, H / 2, 2.0); g.add(gl);

  return {
    group: g,
    update: (t, pulse) => {
      screenMat.uniforms.t.value = t;
      portalMat.uniforms.t.value = t;
      gl.intensity = 2.5 + pulse * 3;
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

  // ---- merch on display so it reads as a real merch tent ----
  const merchCols = [0xff2b8f, 0x00f3ff, 0x39ff14, 0xffd24a, 0xb967ff];
  // folded-shirt stacks along the counter top (counter top ~y 0.9, z 1)
  for (let i = 0; i < 4; i++) {
    const stack = new THREE.Group(); stack.position.set(-1.1 + i * 0.72, 0.92, 1.02);
    for (let j = 0; j < 3; j++) { const sh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.42), std({ color: merchCols[(i + j) % merchCols.length], roughness: 0.8, emissive: new THREE.Color(merchCols[(i + j) % merchCols.length]), emissiveIntensity: 0.12 })); sh.position.y = j * 0.09; stack.add(sh); }
    g.add(stack);
  }
  // a hanging-shirt rack behind the vendor: a bar on two uprights with tees
  const rackMat = std({ color: 0x14141c, metalness: 0.6, roughness: 0.5 });
  for (const rx of [-1.2, 1.2]) { const up = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.7, 8), rackMat); up.position.set(rx, 0.85, -1.05); g.add(up); }
  const rackBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.6, 8), rackMat); rackBar.rotation.z = Math.PI / 2; rackBar.position.set(0, 1.62, -1.05); g.add(rackBar);
  for (let i = 0; i < 5; i++) {
    const col = merchCols[i % merchCols.length];
    const tee = new THREE.Group(); tee.position.set(-1.0 + i * 0.5, 1.15, -1.05);
    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.5, 0.06), std({ color: col, roughness: 0.85, emissive: new THREE.Color(col), emissiveIntensity: 0.15 })); tee.add(torso);
    for (const sx of [-1, 1]) { const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.16, 0.06), torso.material); sleeve.position.set(sx * 0.24, 0.16, 0); sleeve.rotation.z = sx * 0.5; tee.add(sleeve); }
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 6, 10), rackMat); hook.position.y = 0.32; tee.add(hook);
    g.add(tee);
  }
  // a couple of caps stacked at the end of the counter
  for (let i = 0; i < 2; i++) {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), std({ color: merchCols[i], roughness: 0.8, emissive: new THREE.Color(merchCols[i]), emissiveIntensity: 0.12 }));
    cap.position.set(1.28, 0.95 + i * 0.12, 1.0); g.add(cap);
    const brim = new THREE.Mesh(new THREE.CircleGeometry(0.15, 12, 0, Math.PI), std({ color: merchCols[i], roughness: 0.8 })); brim.rotation.x = -Math.PI / 2; brim.position.set(1.28, 0.95 + i * 0.12, 1.14); g.add(brim);
  }
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
  const glow = std({ color: 0x03210f, emissive: new THREE.Color(accent), emissiveIntensity: 0.5 });
  const W = 1.5, H = 2.9, D = 1.5, GAP = 1.7; // bigger, taller porta-johns
  for (let i = 0; i < 3; i++) { // all three stalls glow
    const box = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), glow);
    box.position.set((i - 1) * GAP, H / 2, 0); box.castShadow = true; g.add(box);
    const door = new THREE.Mesh(new THREE.BoxGeometry(W * 0.8, H * 0.72, 0.04), std({ color: 0x0a1a10, roughness: 0.8 }));
    door.position.set((i - 1) * GAP, H * 0.44, D / 2 + 0.02); g.add(door);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 0.06), std({ color: 0x0a1a10, metalness: 0.5 })); handle.position.set((i - 1) * GAP + W * 0.28, H * 0.44, D / 2 + 0.05); g.add(handle);
    const vent = new THREE.Mesh(new THREE.BoxGeometry(W * 0.5, 0.1, 0.03), std({ color: 0x0a1a10 })); vent.position.set((i - 1) * GAP, H * 0.82, D / 2 + 0.02); g.add(vent);
    const l = new THREE.PointLight(accent, 3.2, 8, 2); l.position.set((i - 1) * GAP, H * 0.78, 1.3); g.add(l); // one light per stall
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(GAP * 3 + 0.4, 0.14, D + 0.3), std({ color: 0x0d200f })); roof.position.y = H + 0.07; g.add(roof);
  return { group: g, update: (t, pulse) => { glow.emissiveIntensity = 0.4 + Math.sin(t * 3) * 0.2 + pulse * 0.3; } };
}

// ---------------------------------------------------------------- LABS STAGE
// The Lab as its own second stage: a deck, a truss, and three live experiment
// screens — Trippy Cam (feedback swirl), DreamOS TV (CRT static), Deadnet
// (green terminal). Its own green wash + a banner.
export function buildLabsStage(accent = '#39FF14') {
  const g = new THREE.Group();
  const dark = std({ color: 0x0a1410, roughness: 0.8, metalness: 0.3 });
  const truss = new THREE.MeshStandardMaterial({ color: 0x122018, roughness: 0.5, metalness: 0.7 });

  const deck = new THREE.Mesh(new THREE.BoxGeometry(11, 1.2, 5), dark); deck.position.set(0, 0.6, 0); deck.castShadow = deck.receiveShadow = true; g.add(deck);
  const wall = new THREE.Mesh(new THREE.BoxGeometry(10, 4.2, 0.3), std({ color: 0x060a08, roughness: 0.9 })); wall.position.set(0, 3.4, -2.2); g.add(wall);

  // three experiment screens
  const screens = [];
  const shaders = [trippyFrag(), tvFrag(), deadnetFrag()];
  const labels = ['GAMES', 'WAKE UP', 'STORIES'];
  for (let i = 0; i < 3; i++) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { t: { value: 0 }, pulse: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
      fragmentShader: shaders[i],
    });
    const sc = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.8), mat);
    sc.position.set((i - 1) * 3.1, 3.5, -2.03); g.add(sc); screens.push(mat);
    // little caption bar
    const cap = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 0.28), std({ color: 0x02160a, emissive: new THREE.Color(accent), emissiveIntensity: 0.5 }));
    cap.position.set((i - 1) * 3.1, 2.45, -2.02); g.add(cap);
    const capTex = textPlane(labels[i], accent); capTex.position.set((i - 1) * 3.1, 2.45, -2.0); capTex.scale.set(2.4, 0.24, 1); g.add(capTex);
  }

  // truss
  for (const px of [-5, 5]) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.4, 6, 0.4), truss); p.position.set(px, 3, -2.4); p.castShadow = true; g.add(p); }
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(10.4, 0.4, 0.4), truss); topBar.position.set(0, 6, -2.4); g.add(topBar);
  const banner = textPlane('THE LAB · SIDE STAGE', accent); banner.position.set(0, 5.4, -2.3); banner.scale.set(6, 0.6, 1); g.add(banner);

  // speaker stacks
  for (const px of [-5.6, 5.6]) { const sp = new THREE.Mesh(new THREE.BoxGeometry(1, 2.4, 1), std({ color: 0x08110c, roughness: 0.9 })); sp.position.set(px, 1.2, 0.5); sp.castShadow = true; g.add(sp); }

  const gl1 = new THREE.PointLight(accent, 8, 16, 2); gl1.position.set(0, 4, 2); g.add(gl1);
  const gl2 = new THREE.PointLight(accent, 4, 12, 2); gl2.position.set(0, 1, 4); g.add(gl2);

  return { group: g, update: (t, pulse) => { screens.forEach((m) => { m.uniforms.t.value = t; m.uniforms.pulse.value = pulse; }); gl1.intensity = 5 + pulse * 8; } };
}
function trippyFrag() {
  return `varying vec2 vUv; uniform float t,pulse;
    void main(){ vec2 u=vUv-0.5; float a=atan(u.y,u.x); float r=length(u);
      float v=sin(a*6.0+t*2.0-r*22.0);
      vec3 c=0.5+0.5*cos(vec3(0.0,2.0,4.0)+a*3.0+t+r*10.0);
      c*=0.55+0.45*v; c*=0.7+0.6*pulse; gl_FragColor=vec4(c,1.0);} `;
}
function tvFrag() {
  return `varying vec2 vUv; uniform float t,pulse;
    float rand(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    void main(){ vec2 u=vUv; float n=rand(u+floor(t*20.0)*0.017);
      float scan=sin(u.y*150.0)*0.16; float bar=step(0.96,fract(u.y*3.0-t*0.7));
      vec3 c=vec3(n)*0.55+scan; c+=bar*vec3(1.0,0.0,0.55); c.r*=1.1; c.b*=1.05;
      gl_FragColor=vec4(c,1.0);} `;
}
function deadnetFrag() {
  return `varying vec2 vUv; uniform float t,pulse;
    float rand(vec2 p){return fract(sin(dot(p,vec2(41.0,289.0)))*45758.5);}
    void main(){ vec2 g=vec2(30.0,20.0); vec2 id=floor(vec2(vUv.x*g.x, vUv.y*g.y - t*4.0));
      float on=step(0.55,rand(id)); float fl=step(0.5,rand(id+floor(t*3.0)));
      vec3 c=vec3(0.1,1.0,0.25)*on*(0.35+0.65*fl); gl_FragColor=vec4(c,1.0);} `;
}
function textPlane(text, color) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 64; const x = c.getContext('2d');
  x.fillStyle = 'rgba(0,0,0,0)'; x.fillRect(0, 0, 512, 64);
  x.font = 'bold 34px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 16; x.fillStyle = color; x.fillText(text, 256, 34);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
}

// ---------------------------------------------------------------- ARCADE
// An arcade cabinet — the physical door to the Flash Games portal and the games
// library. Walk up, "insert coin". Live grid on the screen, joystick + buttons.
export function buildArcade(accent = '#FF0055') {
  const g = new THREE.Group();
  const body = std({ color: 0x0d0d16, roughness: 0.6, metalness: 0.3 });
  const side = std({ color: 0x120018, emissive: new THREE.Color(accent), emissiveIntensity: 0.25, roughness: 0.7 });
  const screens = [];
  // a single cabinet as a subgroup, so we can stand up a whole row of them
  function cabinet(col) {
    const cg = new THREE.Group();
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.4, 1.1), body); cab.position.y = 1.2; cab.castShadow = true; cg.add(cab);
    for (const sx of [-0.66, 0.66]) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.02, 2.4, 1.1), side); s.position.set(sx, 1.2, 0); cg.add(s); }
    const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, pulse: { value: 0 } },
      vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`, fragmentShader: arcadeFrag() });
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.8), scrMat); scr.position.set(0, 1.78, 0.57); scr.rotation.x = -0.22; cg.add(scr); screens.push(scrMat);
    const panel = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.1, 0.6), std({ color: 0x101018, roughness: 0.7 })); panel.position.set(0, 1.16, 0.62); panel.rotation.x = -0.5; cg.add(panel);
    const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.22, 8), std({ color: 0x222230 })); stick.position.set(-0.32, 1.3, 0.72); cg.add(stick);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.06, 10, 10), new THREE.MeshBasicMaterial({ color: col })); ball.position.set(-0.32, 1.42, 0.72); cg.add(ball);
    for (let i = 0; i < 3; i++) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 12), new THREE.MeshBasicMaterial({ color: i ? 0x33ffff : col })); b.position.set(0.02 + i * 0.16, 1.3, 0.72); b.rotation.x = Math.PI / 2; cg.add(b); }
    return cg;
  }
  // a row of three cabinets, the outer two angled inward like a little arcade nook
  const rowCols = ['#00F3FF', accent, '#b967ff'];
  [-1.7, 0, 1.7].forEach((x, i) => {
    const cab = cabinet(rowCols[i]); cab.position.x = x; cab.rotation.y = -x * 0.14; g.add(cab);
    const cl = new THREE.PointLight(rowCols[i], 2.6, 6, 2); cl.position.set(x, 2.0, 1.1); g.add(cl); // each cabinet lit
  });
  const marq = textPlane('ARCADE', accent); marq.position.set(0, 3.0, 0.6); marq.scale.set(3.2, 0.5, 1); g.add(marq);
  const gl = new THREE.PointLight(accent, 3, 12, 2); gl.position.set(0, 2.6, 1.8); g.add(gl);
  return { group: g, update: (t, pulse) => { screens.forEach((m) => { m.uniforms.t.value = t; m.uniforms.pulse.value = pulse; }); gl.intensity = 2.5 + pulse * 3; } };
}

// ---------------------------------------------------------------- TENT
// A festival teepee tent — reads as a little camp; used behind Shmorez by the
// fire. Faces the center of the grounds.
export function buildTent(scene, { pos = [0, 0], accent = '#ff6b35' } = {}) {
  const g = new THREE.Group(); g.position.set(pos[0], 0, pos[1]);
  g.rotation.y = Math.atan2(0 - pos[0], -4 - pos[1]); // face center
  const cone = new THREE.Mesh(new THREE.ConeGeometry(2.0, 3.0, 8, 1, true),
    std({ color: 0x2a3550, roughness: 0.95, emissive: new THREE.Color(accent), emissiveIntensity: 0.08, side: THREE.DoubleSide }));
  cone.position.y = 1.5; cone.castShadow = true; g.add(cone);
  for (let i = 0; i < 4; i++) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 6), std({ color: 0x1a120c })); p.position.set((i - 1.5) * 0.12, 3.0, 0); p.rotation.z = (i - 1.5) * 0.12; g.add(p); }
  const door = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.5), std({ color: 0x05050a, side: THREE.DoubleSide })); door.position.set(0, 0.75, 1.5); g.add(door);
  const gl = new THREE.PointLight(accent, 2, 7, 2); gl.position.set(0, 1.1, 0); g.add(gl);
  scene.add(g);
  return { group: g };
}
function arcadeFrag() {
  return `varying vec2 vUv; uniform float t,pulse;
    float rand(vec2 p){return fract(sin(dot(p,vec2(12.9,78.2)))*43758.5);}
    void main(){ vec2 gr=floor(vUv*vec2(8.0,6.0)); float c=rand(gr+floor(t*2.0));
      vec3 col=0.5+0.5*cos(vec3(0.0,2.0,4.0)+c*6.28+t);
      col*=step(0.18,fract(vUv.y*6.0)); col*=0.6+0.6*pulse; gl_FragColor=vec4(col,1.0);} `;
}

// ---------------------------------------------------------------- DEADNET
// The digital afterlife — a dead, flickering CRT monolith in a lonely corner,
// running the deadnet feed. Broken, glitching, orbited by shards.
export function buildDeadnet(accent = '#b967ff') {
  const g = new THREE.Group();
  const dark = std({ color: 0x0a0812, roughness: 0.8, metalness: 0.4 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 0.5, 6), dark); base.position.y = 0.25; base.castShadow = true; g.add(base);
  const shell = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.2, 1.2), dark); shell.position.y = 1.7; shell.castShadow = true; g.add(shell);
  const scrMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 }, pulse: { value: 0 } },
    vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`, fragmentShader: deadnetFrag() });
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.5), scrMat); scr.position.set(0, 1.8, 0.62); g.add(scr);
  const cap = textPlane('DEADNET', accent); cap.position.set(0, 3.1, 0.3); cap.scale.set(2.4, 0.5, 1); g.add(cap);
  const shards = [];
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Mesh(new THREE.TetrahedronGeometry(0.12 + Math.random() * 0.1), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
    const a = Math.random() * 6.28, rr = 1.4 + Math.random(); s.position.set(Math.cos(a) * rr, 2 + Math.random() * 1.5, Math.sin(a) * rr); g.add(s); shards.push(s);
  }
  const gl = new THREE.PointLight(accent, 5, 10, 2); gl.position.set(0, 2, 1.4); g.add(gl);
  return { group: g, update: (t, pulse) => {
    scrMat.uniforms.t.value = t; scrMat.uniforms.pulse.value = pulse;
    gl.intensity = 3 + Math.sin(t * 7.0) * 1.5 + pulse * 3;
    shards.forEach((s, i) => { s.rotation.x += 0.01 * (i + 1); s.rotation.y += 0.013 * (i + 1); s.position.y += Math.sin(t * 2 + i) * 0.002; });
  } };
}

// ---------------------------------------------------------------- THE DECKS
// A DJ booth table: two spinning platters + a glowing laptop → the $AUCELAB
// console (dj.html). Faces the center of the grounds.
export function buildDecks(accent = '#00F3FF') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const table = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.0, 1.2), std({ color: 0x0d0d16, metalness: 0.4, roughness: 0.6 }));
  table.position.y = 0.5; table.castShadow = true; g.add(table);
  const facia = new THREE.Mesh(new THREE.PlaneGeometry(3.1, 0.55), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.7 }));
  facia.position.set(0, 0.5, 0.61); g.add(facia);
  const platters = [];
  for (const sx of [-0.9, 0.9]) {
    const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.08, 28), std({ color: 0x15151f, metalness: 0.6, roughness: 0.4 }));
    plate.position.set(sx, 1.05, 0); g.add(plate);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.02, 28), std({ color: 0x05050a, emissive: col, emissiveIntensity: 0.4 }));
    disc.position.set(sx, 1.1, 0); g.add(disc); platters.push(disc);
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.03, 8), new THREE.MeshBasicMaterial({ color: accent }));
    dot.position.set(sx, 1.12, 0.28); g.add(dot); platters.push(dot);
  }
  const laptop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.6, 0.03), std({ color: 0x02121a, emissive: col, emissiveIntensity: 1.0 }));
  laptop.position.set(0, 1.35, -0.15); laptop.rotation.x = -0.5; g.add(laptop);
  const gl = new THREE.PointLight(accent, 4, 9, 2); gl.position.set(0, 1.6, 1.0); g.add(gl);
  return { group: g, update: (t, pulse) => { platters.forEach((d, i) => (d.rotation.y += 0.03 * (i % 2 ? -1 : 1))); facia.material.emissiveIntensity = 0.5 + pulse * 0.6; gl.intensity = 3 + pulse * 3; } };
}

// ---------------------------------------------------------------- MONKEY'S PAW
// A creepy carnival fortune machine — a wooden cabinet with a glass dome, a
// glowing severed monkey's paw curled on velvet inside, and a marquee sign.
// Walk up and it opens the wish app. "Be careful what you wish for."
export function buildMonkeyPaw(accent = '#b967ff') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const wood = std({ color: 0x1a0f0a, roughness: 0.7, metalness: 0.2 });
  // cabinet body
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.5, 1.1), wood); body.position.y = 0.75; body.castShadow = true; g.add(body);
  // glass dome housing on top
  const housing = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.3, 1.1), wood); housing.position.y = 2.1; housing.castShadow = true; g.add(housing);
  const glassMat = std({ color: 0x0a0812, emissive: col, emissiveIntensity: 0.15, metalness: 0.6, roughness: 0.1, transparent: true, opacity: 0.28 });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.62, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.55), glassMat);
  dome.position.set(0, 2.1, 0.15); g.add(dome);
  const velvet = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 20), std({ color: 0x2a0810, roughness: 0.9 }));
  velvet.position.set(0, 1.7, 0.15); g.add(velvet);
  // the paw: a palm + five curled clawed fingers, emissive so it glows in the dome
  const paw = new THREE.Group(); paw.position.set(0, 1.78, 0.15); g.add(paw);
  const flesh = std({ color: 0x1a120c, emissive: col, emissiveIntensity: 0.9, roughness: 0.6 });
  const palm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.1, 0.3), flesh); paw.add(palm);
  for (let i = 0; i < 5; i++) {
    const fg = new THREE.Group(); fg.position.set(-0.1 + i * 0.05, 0.02, 0.15); paw.add(fg);
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.03, 0.16, 6), flesh);
    seg.position.set(0, 0.02, 0.02); seg.rotation.x = 1.1 + i * 0.06; fg.add(seg); // curled inward
    const claw = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.06, 6), std({ color: 0x0a0806, roughness: 0.5 }));
    claw.position.set(0, -0.04, 0.11); claw.rotation.x = 2.2; fg.add(claw);
  }
  // marquee sign
  const cap = textPlane("MONKEY'S PAW", accent); cap.position.set(0, 2.95, 0.3); cap.scale.set(2.2, 0.44, 1); g.add(cap);
  const coin = textPlane('make a wish', accent); coin.position.set(0, 0.5, 0.56); coin.scale.set(1.1, 0.26, 1); g.add(coin);
  const gl = new THREE.PointLight(accent, 4, 8, 2); gl.position.set(0, 2.0, 0.6); g.add(gl);
  return { group: g, update: (t, pulse) => {
    flesh.emissiveIntensity = 0.7 + Math.sin(t * 2.3) * 0.3 + pulse * 0.4; // the paw pulses like it's breathing
    gl.intensity = 3 + Math.sin(t * 1.7) * 1.2 + pulse * 2;
    paw.rotation.y = Math.sin(t * 0.4) * 0.25;
  } };
}

// ---------------------------------------------------------------- LAB KIOSK
// A small digital vendor kiosk — a counter + an angled glowing terminal screen
// under a thin canopy. Used for the lab-market aisles (each opens a Lab folder).
// The floating name tag (drawn by the HUD) says which aisle it is.
// TOOLS AISLE — a vendor booth where someone's selling tools: a striped canopy,
// a counter, a pegboard hung with hammers/wrenches/saws, a red toolbox, and a
// vendor behind it. Front (+Z) faces the grounds.
export function buildKiosk(accent = '#39FF14') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const frame = std({ color: 0x14141c, metalness: 0.6, roughness: 0.5 });
  const wood = std({ color: 0x4a3320, roughness: 0.9 });
  const metal = std({ color: 0x9aa0aa, metalness: 0.85, roughness: 0.35 });
  const metalDk = std({ color: 0x5a6068, metalness: 0.8, roughness: 0.45 });

  // frame posts + striped awning
  for (const [px, pz] of [[-1.5, -1], [1.5, -1], [-1.5, 1], [1.5, 1]]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.5, 8), frame); p.position.set(px, 1.25, pz); p.castShadow = true; g.add(p); }
  const cv = document.createElement('canvas'); cv.width = 128; cv.height = 32; const cx = cv.getContext('2d');
  const hex = '#' + col.getHexString();
  for (let i = 0; i < 8; i++) { cx.fillStyle = i % 2 ? hex : '#101018'; cx.fillRect(i * 16, 0, 16, 32); }
  const ctex = new THREE.CanvasTexture(cv); ctex.colorSpace = THREE.SRGBColorSpace;
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 2.4), std({ map: ctex, emissive: col, emissiveIntensity: 0.12, roughness: 0.85 })); canopy.position.set(0, 2.55, 0); canopy.castShadow = true; g.add(canopy);

  // counter (front, +Z)
  const counter = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.95, 0.7), wood); counter.position.set(0, 0.48, 0.95); counter.castShadow = true; g.add(counter);
  const cTop = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.08, 0.82), std({ color: 0x5a4326, roughness: 0.7 })); cTop.position.set(0, 0.98, 0.95); g.add(cTop);

  // pegboard of hanging tools behind the counter
  const peg = new THREE.Mesh(new THREE.BoxGeometry(3.0, 1.7, 0.08), std({ color: 0x2a2420, roughness: 0.9, emissive: col, emissiveIntensity: 0.05 })); peg.position.set(0, 1.6, -0.9); g.add(peg);
  const hammer = (x, y) => { const gr = new THREE.Group(); gr.position.set(x, y, -0.82); const hn = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.5, 0.06), wood); hn.position.y = -0.1; gr.add(hn); const hd = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.12, 0.12), metal); hd.position.y = 0.2; gr.add(hd); g.add(gr); };
  const wrench = (x, y) => { const gr = new THREE.Group(); gr.position.set(x, y, -0.82); gr.add(new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.5, 0.05), metal)); const jaw = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.04, 8, 16, Math.PI * 1.4), metal); jaw.position.y = 0.28; gr.add(jaw); g.add(gr); };
  const saw = (x, y) => { const gr = new THREE.Group(); gr.position.set(x, y, -0.82); gr.rotation.z = -0.3; const bl = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.16, 0.02), metalDk); bl.position.x = 0.2; gr.add(bl); const grip = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.03, 8, 14), wood); grip.rotation.y = Math.PI / 2; grip.position.x = -0.12; gr.add(grip); g.add(gr); };
  const driver = (x, y) => { const gr = new THREE.Group(); gr.position.set(x, y, -0.82); const h = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.05, 0.24, 8), std({ color: 0xd11e2a, emissive: new THREE.Color(0xd11e2a), emissiveIntensity: 0.2 })); h.position.y = 0.12; gr.add(h); const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3, 6), metal); sh.position.y = -0.15; gr.add(sh); g.add(gr); };
  hammer(-1.1, 1.75); wrench(-0.4, 1.8); saw(0.45, 1.8); driver(1.15, 1.75);
  wrench(-1.1, 1.15); hammer(0.55, 1.15); driver(-0.35, 1.1);

  // toolbox + loose tools on the counter
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.28, 0.36), std({ color: 0xd11e2a, roughness: 0.5, emissive: new THREE.Color(0xd11e2a), emissiveIntensity: 0.15 })); box.position.set(-1.0, 1.16, 0.95); g.add(box);
  const bh = new THREE.Mesh(new THREE.TorusGeometry(0.1, 0.02, 6, 12, Math.PI), metal); bh.rotation.x = Math.PI / 2; bh.position.set(-1.0, 1.32, 0.95); g.add(bh);
  const cw = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.4, 0.04), metal); cw.rotation.x = Math.PI / 2; cw.position.set(0.3, 1.03, 1.0); g.add(cw);
  const ch = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.1, 0.1), metal); ch.position.set(0.95, 1.05, 1.0); g.add(ch);
  const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.2, 12), std({ color: 0x88aacc, transparent: true, opacity: 0.5, roughness: 0.2 })); jar.position.set(1.25, 1.12, 0.88); g.add(jar);

  // vendor behind the counter
  const vend = buildMarshmallow(accent).group; vend.scale.setScalar(0.6); vend.position.set(0.15, 0.3, 0.05); g.add(vend);

  // sign + wash
  const facia = new THREE.Mesh(new THREE.PlaneGeometry(3.3, 0.42), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.45 })); facia.position.set(0, 2.32, 1.19); g.add(facia);
  const sign = textPlane('TOOLS', accent); sign.position.set(0, 2.32, 1.21); sign.scale.set(2.2, 0.55, 1); g.add(sign);
  const gl = new THREE.PointLight(0xffe8b0, 1.8, 6, 2); gl.position.set(0, 1.9, 1.3); g.add(gl); // warm booth light so the tools read, not a green blowout
  return { group: g, update: (t, pulse) => { facia.material.emissiveIntensity = 0.3 + pulse * 0.4; gl.intensity = 1.6 + Math.sin(t * 3) * 0.3 + pulse * 0.8; } };
}

// ---------------------------------------------------------------- CIRCUS TENT
// The MIDWAY entrance — a striped big-top built into the wall with an open front
// you walk into. Reaching it loads the arcade world. Front (+Z) faces center.
export function buildCircusTent(accent = '#FF0055') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  // stripe texture (red/cream)
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 32; const cx = cv.getContext('2d');
  for (let i = 0; i < 16; i++) { cx.fillStyle = i % 2 ? '#ff0055' : '#fff0f6'; cx.fillRect(i * 16, 0, 16, 32); }
  const stex = new THREE.CanvasTexture(cv); stex.wrapS = THREE.RepeatWrapping; stex.repeat.set(5, 1); stex.colorSpace = THREE.SRGBColorSpace;
  const stripe = std({ map: stex, side: THREE.DoubleSide, roughness: 0.85, emissive: col, emissiveIntensity: 0.06 });
  // FULL enclosed striped wall (so the entrance reads as a doorway cut into it,
  // not just an open-sided bandstand)
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 5, 24, 1, true), stripe);
  wall.position.y = 2.5; wall.castShadow = true; g.add(wall);
  // roof cone (overhangs)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6, 5, 24, 1, true), stripe); roof.position.y = 7.4; roof.castShadow = true; g.add(roof);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(4.8, 24), std({ color: 0x120410, roughness: 0.6, metalness: 0.3 })); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.05; g.add(floor);
  const glow = new THREE.PointLight(0xffd24a, 6, 14, 2); glow.position.set(0, 2.4, 0); g.add(glow);

  // ---- DOORWAY on the front (+Z): a dark opening in the wall, framed by a
  // glowing peaked arch with parted curtains, so it clearly reads "walk in" ----
  const DZ = 5.04; // just outside the wall surface
  // the dark opening you look/step into
  const openMat = std({ color: 0x08020a, emissive: col, emissiveIntensity: 0.22, side: THREE.DoubleSide, roughness: 1 });
  const opening = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 4.4), openMat); opening.position.set(0, 2.25, DZ); g.add(opening);
  // glowing frame: two uprights + a peaked arch meeting at a point
  const frameMat = std({ color: 0x2a0a14, emissive: col, emissiveIntensity: 0.95, metalness: 0.3, roughness: 0.4 });
  const bar = (ax, ay, bx, by, w = 0.16) => { const len = Math.hypot(bx - ax, by - ay); const m = new THREE.Mesh(new THREE.BoxGeometry(len, w, w), frameMat); m.position.set((ax + bx) / 2, (ay + by) / 2, DZ + 0.05); m.rotation.z = Math.atan2(by - ay, bx - ax); m.castShadow = true; g.add(m); };
  bar(-1.7, 0, -1.7, 4.4); bar(1.7, 0, 1.7, 4.4);          // uprights
  bar(-1.7, 4.4, 0, 5.7); bar(1.7, 4.4, 0, 5.7);            // peak
  // parted striped curtains hugging the frame
  const curtainMat = std({ map: stex.clone(), side: THREE.DoubleSide, roughness: 0.9, emissive: col, emissiveIntensity: 0.08 });
  curtainMat.map.repeat.set(2, 1);
  for (const s of [-1, 1]) {
    const curtain = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 4.4), curtainMat);
    curtain.position.set(s * 2.5, 2.3, DZ + 0.06); curtain.rotation.y = -s * 0.5; curtain.castShadow = true; g.add(curtain);
    const tie = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); tie.position.set(s * 1.9, 1.5, DZ + 0.14); g.add(tie);
  }
  // scalloped bunting bulbs along the peak
  const bulbs = [];
  for (let i = 0; i < 9; i++) { const t = i / 8, bx = -1.7 + t * 3.4, by = 4.4 + (1 - Math.abs(t - 0.5) * 2) * 1.3; const b = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(bx, by + 0.25, DZ + 0.1); g.add(b); bulbs.push(b); }
  // pennant flag on the tip
  const flag = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xffd24a })); flag.position.y = 10.1; g.add(flag);
  const marquee = textPlane('▸ WALK IN ◂', accent); marquee.position.set(0, 6.4, DZ + 0.1); marquee.scale.set(3, 0.6, 1); g.add(marquee);
  // a glowing threshold on the ground you step across to go in
  const thresh = new THREE.Mesh(new THREE.PlaneGeometry(3.0, 1.6), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false }));
  thresh.rotation.x = -Math.PI / 2; thresh.position.set(0, 0.07, DZ + 0.9); g.add(thresh);
  const doorGlow = new THREE.PointLight(accent, 3, 9, 2); doorGlow.position.set(0, 1.8, DZ - 0.6); g.add(doorGlow);
  return { group: g, update: (t, pulse) => { glow.intensity = 5 + Math.sin(t * 3) * 1 + pulse * 2; doorGlow.intensity = 2.5 + Math.sin(t * 2.5) * 1 + pulse; thresh.material.opacity = 0.45 + Math.sin(t * 2.5) * 0.15; bulbs.forEach((b, i) => b.material.color.setHSL((i / 9 + t * 0.15) % 1, 0.85, 0.6)); flag.rotation.y = t * 2; } };
}

// THE COMPLEX — a compact rusty warehouse facade on the grounds; a lit doorway
// (with flickering neon) you walk up to, which opens the full indoor complex.
// Front (+Z) faces center.
export function buildComplex(accent = '#00f3ff') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const W = 6.4, H = 5.2, DZ = 0.9;
  const metal = std({ color: 0x3a2a20, roughness: 0.85, metalness: 0.5 });
  // facade (door gap in the middle)
  const seg = (w, h, cx, cy) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.8), metal); m.position.set(cx, cy, DZ); m.castShadow = true; g.add(m); };
  seg(2.1, H, -(W / 2 - 1.05), H / 2); seg(2.1, H, (W / 2 - 1.05), H / 2); seg(W, H - 3.4, 0, 3.4 + (H - 3.4) / 2);
  const para = new THREE.Mesh(new THREE.BoxGeometry(W + 0.5, 0.5, 1.4), std({ color: 0x241a14, roughness: 0.9 })); para.position.set(0, H + 0.2, DZ); g.add(para);
  // recessed dark doorway
  const doorway = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.4, 0.6), std({ color: 0x05070c, emissive: col, emissiveIntensity: 0.35 })); doorway.position.set(0, 1.7, DZ - 0.2); g.add(doorway);
  // neon sign + erratic OPEN
  const neon = textPlane('12MATT3R', accent); neon.position.set(0, 4.4, DZ + 0.45); neon.scale.set(4.6, 0.7, 1); g.add(neon);
  const open = textPlane('OPEN', '#ff0055'); open.position.set(W / 2 - 0.9, 3.0, DZ + 0.45); open.scale.set(1.5, 0.6, 1); g.add(open);
  // graffiti tag
  const tag = textPlane('SOFA KING SAD BOI', '#39ff14'); tag.position.set(-(W / 2 - 1.4), 1.1, DZ + 0.42); tag.scale.set(3.4, 0.42, 1); tag.rotation.z = 0.05; g.add(tag);
  // glowing threshold on the ground
  const thresh = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 1.5), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
  thresh.rotation.x = -Math.PI / 2; thresh.position.set(0, 0.07, DZ + 1.0); g.add(thresh);
  const gl = new THREE.PointLight(accent, 3.4, 12, 2); gl.position.set(0, 2.2, DZ + 1.6); g.add(gl);
  const openGl = new THREE.PointLight(0xff0055, 1.6, 6, 2); openGl.position.set(W / 2 - 0.9, 3.0, DZ + 1); g.add(openGl);
  return { group: g, update: (t, pulse) => {
    const f = Math.random() < 0.06 ? 0.25 : 1; neon.material.opacity = 0.7 + 0.3 * f; gl.intensity = 3 + f * 1.5 + pulse * 1.5;
    const of = (Math.sin(t * 3) > 0.1 && Math.random() > 0.03) ? 1 : 0.2; open.material.opacity = of; openGl.intensity = of * 1.8;
    thresh.material.opacity = 0.4 + Math.sin(t * 2.5) * 0.15 + pulse * 0.1;
  } };
}

// ---------------------------------------------------------------- THE GALLERY
// A little neoclassical museum pavilion on the grounds: marble steps, columns,
// a pediment, and a glowing doorway. Walk up and enter to step into the
// walkable picture gallery (museum.html).
export function buildMuseum(accent = '#e6c04a') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const marble = std({ color: 0xe9e6dd, roughness: 0.6, metalness: 0.05 });
  const shadowMarble = std({ color: 0xcfcabb, roughness: 0.7, metalness: 0.05 });
  const W = 7.2, H = 4.4, D = 3.2;

  // stepped plinth
  for (let i = 0; i < 3; i++) {
    const sw = W + 1.4 - i * 0.5, sd = D + 1.6 - i * 0.5;
    const step = new THREE.Mesh(new THREE.BoxGeometry(sw, 0.28, sd), shadowMarble);
    step.position.set(0, 0.14 + i * 0.28, D / 2 + 0.8 - i * 0.25); step.receiveShadow = true; step.castShadow = true; g.add(step);
  }
  const baseY = 0.84;
  // back wall + side walls (a shallow box so the facade reads as a building)
  const shell = new THREE.Mesh(new THREE.BoxGeometry(W, H, D), marble);
  shell.position.set(0, baseY + H / 2, -0.2); shell.castShadow = shell.receiveShadow = true; g.add(shell);

  // four front columns
  const colGeo = new THREE.CylinderGeometry(0.34, 0.38, H, 20);
  for (const cx of [-W / 2 + 0.6, -W / 6, W / 6, W / 2 - 0.6]) {
    const c = new THREE.Mesh(colGeo, marble);
    c.position.set(cx, baseY + H / 2, D / 2 + 0.35); c.castShadow = true; g.add(c);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 0.9), shadowMarble);
    cap.position.set(cx, baseY + H - 0.12, D / 2 + 0.35); g.add(cap);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.24, 0.9), shadowMarble);
    foot.position.set(cx, baseY + 0.12, D / 2 + 0.35); g.add(foot);
  }
  // architrave + pediment (triangular prism via extruded shape)
  const arch = new THREE.Mesh(new THREE.BoxGeometry(W + 0.6, 0.5, D + 1.1), shadowMarble);
  arch.position.set(0, baseY + H + 0.25, 0.05); arch.castShadow = true; g.add(arch);
  const shape = new THREE.Shape(); shape.moveTo(-(W + 0.6) / 2, 0); shape.lineTo((W + 0.6) / 2, 0); shape.lineTo(0, 1.5); shape.lineTo(-(W + 0.6) / 2, 0);
  const ped = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: D + 1.1, bevelEnabled: false }), marble);
  ped.position.set(0, baseY + H + 0.5, (D + 1.1) / 2 - (D + 1.1) + 0.6); ped.castShadow = true; g.add(ped);

  // MUSEUM sign glowing on the architrave
  const sign = textPlane('THE GALLERY', accent); sign.position.set(0, baseY + H + 0.25, D / 2 + 0.72); sign.scale.set(4.0, 0.5, 1); g.add(sign);

  // dark doorway with an accent glow — the way in
  const DW = 1.8, DH = 2.9;
  const doorway = new THREE.Mesh(new THREE.PlaneGeometry(DW, DH), new THREE.MeshBasicMaterial({ color: 0x0a0b12 }));
  doorway.position.set(0, baseY + DH / 2, D / 2 + 0.36); g.add(doorway);
  const glowFrame = new THREE.Mesh(new THREE.RingGeometry(0.0, 0.1, 4), new THREE.MeshBasicMaterial({ color: accent }));
  const thresh = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.6), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false }));
  thresh.rotation.x = -Math.PI / 2; thresh.position.set(0, 0.08, D / 2 + 1.3); g.add(thresh);
  const doorGlow = new THREE.PointLight(accent, 3, 10, 2); doorGlow.position.set(0, 1.9, D / 2 + 0.9); g.add(doorGlow);
  const upLight = new THREE.SpotLight(0xfff4d8, 6, 14, 0.7, 0.5, 1); upLight.position.set(0, 0.4, D / 2 + 3.2); upLight.target.position.set(0, baseY + H, 0); g.add(upLight); g.add(upLight.target);

  return { group: g, update: (t, pulse) => { doorGlow.intensity = 2.6 + Math.sin(t * 2) * 0.8 + pulse; thresh.material.opacity = 0.4 + Math.sin(t * 2.2) * 0.14; } };
}

export const MODELS = {
  marshmallow: buildMarshmallow,
  complex: buildComplex,
  museum: buildMuseum,
  monkeypaw: buildMonkeyPaw,
  kiosk: buildKiosk,
  circustent: buildCircusTent,
  sofaboi: buildSofaBoi,
  doorway: buildDoorway,
  cowboy: buildCowboy,
  vaporwave: buildVaporwave,
  glitch: buildGlitch,
  raver: buildRaver,
  stall: buildStall,
  bathroom: buildBathroom,
  labsstage: buildLabsStage,
  arcade: buildArcade,
  deadnet: buildDeadnet,
  decks: buildDecks,
};
