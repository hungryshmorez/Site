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

// ---------------------------------------------------------------- SOFA KING SAD BOI
// A hooded sad-boi slumped on a worn couch under his own little rain cloud —
// dubstep / weird bass, watching the whole festival from the back.
export function buildSofaBoi(accent = '#6a6cff') {
  const g = new THREE.Group();
  const fabric = std({ color: 0x2a2c3a, roughness: 0.95 });   // worn couch
  const fabric2 = std({ color: 0x22242f, roughness: 0.95 });
  const hoodie = std({ color: 0x191b26, roughness: 0.9, emissive: new THREE.Color(accent), emissiveIntensity: 0.12 });
  const shins = std({ color: 0x14161f, roughness: 0.9 });
  const skin = std({ color: 0xc9a888, roughness: 0.7 });

  // ---- couch ----
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.4, 1.1), fabric); seat.position.set(0, 0.5, 0); seat.castShadow = seat.receiveShadow = true; g.add(seat);
  const cushL = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.22, 1.0), fabric2); cushL.position.set(-0.55, 0.72, 0.02); g.add(cushL);
  const cushR = cushL.clone(); cushR.position.x = 0.55; g.add(cushR);
  const back = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 0.28), fabric); back.position.set(0, 0.95, -0.55); back.castShadow = true; g.add(back);
  const bcushL = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.7, 0.2), fabric2); bcushL.position.set(-0.55, 0.95, -0.4); g.add(bcushL);
  const bcushR = bcushL.clone(); bcushR.position.x = 0.55; g.add(bcushR);
  for (const sx of [-1.28, 1.28]) { const arm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.75, 1.1), fabric); arm.position.set(sx, 0.72, 0); arm.castShadow = true; g.add(arm); }
  for (const [ax, az] of [[-1.05, 0.45], [1.05, 0.45], [-1.05, -0.45], [1.05, -0.45]]) { const f = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.3, 8), std({ color: 0x140f0a })); f.position.set(ax, 0.15, az); g.add(f); }

  // ---- the sad boi (sitting, slumped forward) ----
  const boi = new THREE.Group(); boi.position.set(0.05, 0, 0.05); g.add(boi);
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.4, 6, 12), hoodie); torso.position.set(0, 1.15, 0.05); torso.rotation.x = 0.3; torso.castShadow = true; boi.add(torso);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 16), skin); head.position.set(0, 1.52, 0.24); boi.add(head);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.31, 18, 16, 0, Math.PI * 2, 0, Math.PI * 0.64), hoodie); hood.position.set(0, 1.58, 0.16); hood.rotation.x = 0.5; hood.castShadow = true; boi.add(hood);
  const eyeMat = std({ color: 0x0e0e16 });
  for (const sx of [-0.09, 0.09]) { const e = new THREE.Mesh(new THREE.SphereGeometry(0.032, 8, 8), eyeMat); e.position.set(sx, 1.5, 0.46); boi.add(e); }
  for (const sx of [-0.16, 0.16]) { const th = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 0.4, 4, 8), hoodie); th.rotation.x = Math.PI / 2; th.position.set(sx, 0.88, 0.35); boi.add(th); }
  for (const sx of [-0.16, 0.16]) { const sh = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.5, 4, 8), shins); sh.position.set(sx, 0.42, 0.62); boi.add(sh); }
  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.35, 4, 8), hoodie); armL.rotation.x = Math.PI / 2.2; armL.position.set(-0.24, 1.0, 0.42); boi.add(armL);
  const armR = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.35, 4, 8), hoodie); armR.rotation.x = Math.PI / 2.2; armR.position.set(0.24, 1.0, 0.42); boi.add(armR);
  const phone = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.28, 0.02), std({ color: 0x05060a, emissive: new THREE.Color(accent), emissiveIntensity: 1.2 }));
  phone.position.set(0.24, 1.04, 0.58); phone.rotation.x = -0.5; boi.add(phone);
  const phoneGlow = new THREE.PointLight(accent, 2, 2.5, 2); phoneGlow.position.set(0.24, 1.12, 0.62); boi.add(phoneGlow);

  // ---- personal rain cloud ----
  const cloud = new THREE.Group(); cloud.position.set(0.05, 2.65, 0.1); g.add(cloud);
  const cloudMat = std({ color: 0x2b2f3e, roughness: 1, emissive: new THREE.Color(accent), emissiveIntensity: 0.08 });
  for (const [cx, cy, cr] of [[-0.38, 0, 0.32], [0.02, 0.09, 0.42], [0.44, 0, 0.3], [0.04, -0.06, 0.36]]) { const puff = new THREE.Mesh(new THREE.SphereGeometry(cr, 14, 12), cloudMat); puff.position.set(cx, cy, 0); cloud.add(puff); }
  const rain = [];
  const rainMat = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
  for (let i = 0; i < 12; i++) { const drop = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.18, 4), rainMat); drop.position.set((Math.random() - 0.5) * 0.9, -0.25 - Math.random() * 0.7, (Math.random() - 0.5) * 0.35); cloud.add(drop); rain.push(drop); }

  return {
    group: g,
    update: (t, pulse) => {
      // dejected slump sinks on the bass; slow breathing otherwise
      boi.position.y = -pulse * 0.06 + Math.sin(t * 1.2) * 0.01;
      boi.rotation.x = 0.02 + pulse * 0.04;
      phone.material.emissiveIntensity = 0.9 + Math.sin(t * 3) * 0.3 + pulse * 0.5;
      phoneGlow.intensity = 1.4 + pulse;
      rain.forEach((d, i) => { d.position.y -= (0.5 + i * 0.03) * 0.03; if (d.position.y < -1.15) d.position.y = -0.2; });
      cloud.position.x = 0.05 + Math.sin(t * 0.5) * 0.05;
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
export function buildKiosk(accent = '#39FF14') {
  const g = new THREE.Group();
  const col = new THREE.Color(accent);
  const frame = std({ color: 0x101018, metalness: 0.5, roughness: 0.55 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.0, 0.9), frame); base.position.y = 0.5; base.castShadow = true; g.add(base);
  const facia = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.5), std({ color: 0x02121a, emissive: col, emissiveIntensity: 0.7 })); facia.position.set(0, 0.5, 0.46); g.add(facia);
  // angled terminal screen
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.0), std({ color: 0x03060a, emissive: col, emissiveIntensity: 0.9, roughness: 0.4 }));
  scr.position.set(0, 1.35, 0.28); scr.rotation.x = -0.5; g.add(scr);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8), frame); post.position.set(0, 1.2, -0.1); g.add(post);
  // thin canopy
  const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.1, 1.2), std({ color: 0x0a0a12, emissive: col, emissiveIntensity: 0.1 })); canopy.position.set(0, 2.05, 0); canopy.castShadow = true; g.add(canopy);
  const gl = new THREE.PointLight(col, 3, 7, 2); gl.position.set(0, 1.6, 0.8); g.add(gl);
  return { group: g, update: (t, pulse) => { scr.material.emissiveIntensity = 0.7 + Math.sin(t * 3) * 0.2 + pulse * 0.4; facia.material.emissiveIntensity = 0.5 + pulse * 0.5; gl.intensity = 2.5 + pulse * 2; } };
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
  // three-quarter wall, open toward +Z (the front / center)
  const wall = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 5, 24, 1, true, 2.356, 4.712), stripe);
  wall.position.y = 2.5; wall.castShadow = true; g.add(wall);
  // roof cone (overhangs)
  const roof = new THREE.Mesh(new THREE.ConeGeometry(6, 5, 24, 1, true), stripe); roof.position.y = 7.4; roof.castShadow = true; g.add(roof);
  // dark interior backdrop + warm glow (reads as "inside")
  const inside = new THREE.Mesh(new THREE.CylinderGeometry(4.7, 4.7, 4.8, 24, 1, true, 2.356, 4.712), std({ color: 0x1a0510, side: THREE.BackSide, emissive: col, emissiveIntensity: 0.15 }));
  inside.position.y = 2.5; g.add(inside);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(4.8, 24), std({ color: 0x120410, roughness: 0.6, metalness: 0.3 })); floor.rotation.x = -Math.PI / 2; floor.position.y = 0.05; g.add(floor);
  const glow = new THREE.PointLight(0xffd24a, 6, 14, 2); glow.position.set(0, 2.4, 1); g.add(glow);
  // entrance frame: two poles + a striped valance across the front (z≈+3.5)
  const poleMat = std({ color: 0x2a1020, metalness: 0.4, roughness: 0.6 });
  for (const px of [-3.5, 3.5]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 5.6, 8), poleMat); p.position.set(px, 2.8, 3.5); p.castShadow = true; g.add(p); }
  const valance = new THREE.Mesh(new THREE.BoxGeometry(7.4, 0.9, 0.2), stripe); valance.position.set(0, 5.2, 3.5); g.add(valance);
  // scalloped bunting bulbs across the entrance
  const bulbs = [];
  for (let i = 0; i < 9; i++) { const b = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffd88a })); b.position.set(-3.2 + i * 0.8, 4.7 - Math.sin(i / 8 * Math.PI) * 0.5, 3.6); g.add(b); bulbs.push(b); }
  // pennant flag on the tip
  const flag = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.5, 4), new THREE.MeshBasicMaterial({ color: 0xffd24a })); flag.position.y = 10.1; g.add(flag);
  const marquee = textPlane('▸ ENTER ◂', accent); marquee.position.set(0, 3, 3.7); marquee.scale.set(3, 0.6, 1); g.add(marquee);
  return { group: g, update: (t, pulse) => { glow.intensity = 5 + Math.sin(t * 3) * 1 + pulse * 2; bulbs.forEach((b, i) => b.material.color.setHSL((i / 9 + t * 0.15) % 1, 0.85, 0.6)); flag.rotation.y = t * 2; } };
}

export const MODELS = {
  marshmallow: buildMarshmallow,
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
