import * as THREE from 'three';
import { PALETTE } from '../data/destinations.js';

// The festival world + a full day/night cycle. update(dt,time,pulse,dayT)
// where dayT in [0,1): 0 = midnight, .25 = sunrise, .5 = noon, .75 = sunset.
// Sky, sun/moon, fog and ambient light all interpolate across the cycle, and
// the stage lights / lasers glow stronger the darker it gets.
export function buildFestival(scene) {
  // ---- day/night colour keyframes (night, dusk/dawn, day) ----
  const KEY = {
    top:  [c(0x05050f), c(0x241537), c(0x2f5f9c)],
    mid:  [c(0x0d0a22), c(0x7a2f52), c(0x74a9d6)],
    bot:  [c(0x1a0a24), c(0xff7a42), c(0xbcd8ea)],
    fog:  [c(0x07071a), c(0x53303f), c(0x9db6cd)],
    amb:  [c(0x223046), c(0x7a4a5a), c(0x8aa2c2)],
    sun:  [c(0x8fa8ff), c(0xff9a5a), c(0xfff2d6)],
  };
  const AMB_I = [0.52, 0.68, 0.95], SUN_I = [0.34, 0.78, 1.15];

  // ---- sky dome ----
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false,
    uniforms: { top: { value: c(0x05050f) }, mid: { value: c(0x0d0a22) }, bot: { value: c(0x1a0a24) } },
    vertexShader: `varying vec3 vP; void main(){ vP=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec3 vP; uniform vec3 top,mid,bot;
      void main(){ float h=normalize(vP).y; vec3 col=mix(bot,mid,smoothstep(-0.15,0.3,h)); col=mix(col,top,smoothstep(0.25,0.85,h)); gl_FragColor=vec4(col,1.0);} `,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(150, 32, 16), skyMat));

  // ---- stars (fade out in daylight) ----
  const starMat = new THREE.PointsMaterial({ size: 0.7, map: dot(), vertexColors: true, transparent: true, opacity: 1, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true });
  {
    const N = 1200, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const cyan = c(PALETTE.cyan), mag = c(PALETTE.magenta), w = c(0xcfe9ff);
    for (let i = 0; i < N; i++) {
      const r = 80 + Math.random() * 60, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = Math.abs(r * Math.cos(ph)) * 0.6 + 8; pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      const cc = Math.random() < 0.1 ? cyan : (Math.random() < 0.08 ? mag : w);
      col[i * 3] = cc.r; col[i * 3 + 1] = cc.g; col[i * 3 + 2] = cc.b;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    scene.add(new THREE.Points(g, starMat));
  }

  // ---- sun/moon disc ----
  const orb = new THREE.Mesh(new THREE.SphereGeometry(2.4, 20, 20), new THREE.MeshBasicMaterial({ color: 0xfff2d6 }));
  scene.add(orb);
  const orbGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  orbGlow.scale.setScalar(16); orb.add(orbGlow);

  // ---- ground ----
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(160, 160), new THREE.MeshStandardMaterial({ color: 0x080810, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const grid = new THREE.GridHelper(54, 27, 0x123038, 0x0a1016); // only the arena floor is gridded
  grid.material.transparent = true; grid.material.opacity = 0.35; grid.position.y = 0.012; scene.add(grid);

  // ---- lights ----
  const amb = new THREE.AmbientLight(KEY.amb[0], AMB_I[0]); scene.add(amb);
  const sun = new THREE.DirectionalLight(KEY.sun[0], SUN_I[0]);
  sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  const scam = sun.shadow.camera; scam.left = -34; scam.right = 34; scam.top = 34; scam.bottom = -34; scam.near = 1; scam.far = 120;
  scene.add(sun);

  // ---- stage ----
  const stageZ = -26;
  const stage = new THREE.Group(); scene.add(stage);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(30, 1.6, 10), new THREE.MeshStandardMaterial({ color: 0x0a0a12, roughness: 0.8, metalness: 0.3 }));
  deck.position.set(0, 0.8, stageZ); deck.receiveShadow = true; deck.castShadow = true; stage.add(deck);

  // front-of-stage ramp so the player can walk up onto the deck
  const RAMP_RUN = 3, DECK_FRONT = stageZ + 5; // -21
  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(16, 0.25, Math.hypot(RAMP_RUN, 1.6)),
    new THREE.MeshStandardMaterial({ color: 0x0c0c16, roughness: 0.8, metalness: 0.3 })
  );
  ramp.position.set(0, 0.8, DECK_FRONT + RAMP_RUN / 2); ramp.rotation.x = Math.atan2(1.6, RAMP_RUN);
  ramp.receiveShadow = true; stage.add(ramp);
  const deckInfo = { halfW: 15, top: 1.6, zFront: DECK_FRONT, zBack: stageZ - 5, rampFront: DECK_FRONT + RAMP_RUN };

  const screenMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, pulse: { value: 0 }, cA: { value: c(PALETTE.cyan) }, cB: { value: c(PALETTE.magenta) } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);} `,
    fragmentShader: `varying vec2 vUv; uniform float t,pulse; uniform vec3 cA,cB;
      void main(){ vec2 u=vUv; float scan=sin((u.y+t*0.3)*60.0)*0.5+0.5; float cols=step(0.5,fract(u.x*18.0+sin(u.y*8.0+t)*0.3));
        vec3 col=mix(cA,cB,u.x*0.6+0.2*sin(t+u.y*6.0)); col*=(0.4+0.6*scan)*(0.6+0.8*pulse)*(0.5+0.5*cols); gl_FragColor=vec4(col,1.0);} `,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(22, 7), screenMat);
  screen.position.set(0, 6.2, stageZ - 4.9); stage.add(screen);

  const truss = new THREE.MeshStandardMaterial({ color: 0x141420, roughness: 0.5, metalness: 0.7 });
  for (const px of [-12, 12]) { const m = new THREE.Mesh(new THREE.BoxGeometry(0.5, 11, 0.5), truss); m.position.set(px, 5.5, stageZ - 4.7); m.castShadow = true; stage.add(m); }
  const topBar = new THREE.Mesh(new THREE.BoxGeometry(24.5, 0.5, 0.5), truss); topBar.position.set(0, 10.6, stageZ - 4.7); stage.add(topBar);

  // ---- PA speaker stacks flanking the wall, as tall as the video wall ----
  const speakerCones = [];
  function speakerStack(sx, accent) {
    const grp = new THREE.Group();
    const cab = new THREE.MeshStandardMaterial({ color: 0x08080d, roughness: 0.85, metalness: 0.2 });
    const cone = (r, y, cx) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.09, 20),
        new THREE.MeshStandardMaterial({ color: 0x0a0a10, roughness: 0.7, emissive: c(accent), emissiveIntensity: 0.05 }));
      m.rotation.x = Math.PI / 2; m.position.set(cx, y, 0.92); grp.add(m); speakerCones.push(m);
    };
    let y = 1.6;                       // sit on the deck
    for (let i = 0; i < 2; i++) {      // two subwoofers
      const h = 1.4; const box = new THREE.Mesh(new THREE.BoxGeometry(3.0, h, 2.0), cab);
      box.position.set(0, y + h / 2, 0); box.castShadow = true; grp.add(box);
      cone(0.55, y + h / 2, 0); y += h;
    }
    for (let i = 0; i < 6; i++) {      // line-array cabinets
      const h = 0.9, w = 2.7 - i * 0.06;
      const box = new THREE.Mesh(new THREE.BoxGeometry(w, h, 1.7), cab);
      box.position.set(0, y + h / 2, 0); box.rotation.x = -0.04 * i; box.castShadow = true; grp.add(box);
      cone(0.26, y + h / 2, -0.55); cone(0.26, y + h / 2, 0.55); y += h;
    }
    // side neon accent strip
    const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, y - 1.6, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x02121a, emissive: c(accent), emissiveIntensity: 0.6 }));
    strip.position.set(sx < 0 ? -1.55 : 1.55, (1.6 + y) / 2, 0.9); grp.add(strip);
    grp.position.set(sx, 0, stageZ - 3);
    stage.add(grp);
  }
  speakerStack(-13, PALETTE.cyan);
  speakerStack(13, PALETTE.magenta);

  // ---- moving-head spotlights ----
  const spots = [];
  const spotColors = [PALETTE.cyan, PALETTE.magenta, PALETTE.green, PALETTE.purple];
  for (let i = 0; i < 4; i++) {
    const s = new THREE.SpotLight(c(spotColors[i]), 60, 60, Math.PI / 9, 0.4, 1.2);
    s.position.set(-9 + i * 6, 10.2, stageZ - 4.4); s.target.position.set(-14 + i * 9, 0, 4);
    scene.add(s, s.target);
    const beam = new THREE.Mesh(new THREE.ConeGeometry(2.6, 20, 24, 1, true),
      new THREE.MeshBasicMaterial({ color: spotColors[i], transparent: true, opacity: 0.06, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    beam.position.copy(s.position); stage.add(beam);
    spots.push({ light: s, beam, phase: i * 1.7 });
  }

  // ---- lasers ----
  const laserGeo = new THREE.BufferGeometry();
  const LN = 14, lpos = new Float32Array(LN * 2 * 3);
  for (let i = 0; i < LN; i++) { lpos.set([0, 10.4, stageZ - 4.4], i * 6); lpos.set([(i - LN / 2) * 4, 0.2, 12], i * 6 + 3); }
  laserGeo.setAttribute('position', new THREE.BufferAttribute(lpos, 3));
  const lasers = new THREE.LineSegments(laserGeo, new THREE.LineBasicMaterial({ color: c(PALETTE.green), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(lasers);

  // ---- spawn bench (where you start, facing the stage) ----
  buildBench(scene);

  // ---- perimeter: 3-sided stadium seating that closes off the arena (stage is
  // the 4th side), with colored light posts that shine inward and brighten at
  // night so the edge of the map is lit and obvious. ----
  const perimLights = [];
  const wallStrips = [];
  let wlasers = null;
  {
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x0c0c16, roughness: 0.9, metalness: 0.2 });
    const R = 25, TIERS = 4;
    const mkTier = (w, d, x, y, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, 1.0, d), seatMat); m.position.set(x, y, z); m.receiveShadow = true; scene.add(m); };
    for (let i = 0; i < TIERS; i++) {
      const off = i * 1.3, y = 0.5 + i * 1.0;
      mkTier(1.2, 56, -R - off, y, -2);   // left grandstand (runs along z)
      mkTier(1.2, 56, R + off, y, -2);    // right grandstand
      mkTier(56, 1.2, 0, y, R + off);     // back grandstand (runs along x)
    }
    const cols = [PALETTE.cyan, PALETTE.magenta, PALETTE.purple, PALETTE.green];
    const posts = [[-26, -16], [-26, 0], [-26, 14], [26, -16], [26, 0], [26, 14], [-16, 26], [0, 26], [16, 26]];
    posts.forEach(([px, pz], i) => {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 7, 8), new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.6, roughness: 0.5 }));
      post.position.set(px, 3.5, pz); post.castShadow = true; scene.add(post);
      const col = c(cols[i % cols.length]);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), new THREE.MeshBasicMaterial({ color: col })); head.position.set(px, 7, pz); scene.add(head);
      const L = new THREE.PointLight(col, 4, 46, 2); L.position.set(px * 0.9, 7.2, pz * 0.9); scene.add(L); perimLights.push(L);
    });

    // ---- tall rectangular enclosing wall so you can't see the ground beyond
    // (north wall sits behind the stage deck) ----
    const WX = 28, WSZ = 28, WNZ = -34, H = 20;
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x07070e, roughness: 0.95, metalness: 0.1, side: THREE.DoubleSide, emissive: c(PALETTE.cyan), emissiveIntensity: 0.02 });
    const midZ = (WSZ + WNZ) / 2, lenZ = WSZ - WNZ, lenX = WX * 2;
    const mkWall = (w, d, x, z) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, H, d), wallMat); m.position.set(x, H / 2, z); scene.add(m); };
    mkWall(0.5, lenZ, -WX, midZ);  // left
    mkWall(0.5, lenZ, WX, midZ);   // right
    mkWall(lenX, 0.5, 0, WSZ);     // back (south / spawn side)
    mkWall(lenX, 0.5, 0, WNZ);     // north (behind stage)

    // ---- beat-reactive light strips up the interior of the walls ----
    const stripCols = [PALETTE.cyan, PALETTE.magenta, PALETTE.purple, PALETTE.green, PALETTE.orange];
    const stripAt = (x, z, i) => { const s = new THREE.Mesh(new THREE.BoxGeometry(0.16, 9, 0.16), new THREE.MeshStandardMaterial({ color: 0x05050a, emissive: c(stripCols[i % stripCols.length]), emissiveIntensity: 0.3 })); s.position.set(x, 4.8, z); scene.add(s); wallStrips.push(s); };
    let si = 0;
    for (let z = WNZ + 4; z < WSZ; z += 6) { stripAt(-WX + 0.3, z, si++); stripAt(WX - 0.3, z, si++); }
    for (let x = -WX + 5; x < WX; x += 6) { stripAt(x, WSZ - 0.3, si++); }

    // ---- wall lasers: beams from the wall-top toward center, sweeping ----
    const lp = []; const edge = [];
    for (let z = WNZ + 4; z < WSZ; z += 8) { edge.push([-WX, z], [WX, z]); }
    for (let x = -WX + 6; x < WX; x += 8) edge.push([x, WSZ]);
    edge.forEach(([x, z]) => lp.push(x, 9, z, 0, 0.6, 0));
    const wlGeo = new THREE.BufferGeometry(); wlGeo.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
    wlasers = new THREE.LineSegments(wlGeo, new THREE.LineBasicMaterial({ color: c(PALETTE.magenta), transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(wlasers);

    // ---- corner speaker stacks in the open corners ----
    const cornerStack = (x, z, accent) => {
      const grp = new THREE.Group();
      const cab = new THREE.MeshStandardMaterial({ color: 0x08080d, roughness: 0.85, metalness: 0.2 });
      let y = 0;
      for (let i = 0; i < 5; i++) {
        const h = 1.0; const box = new THREE.Mesh(new THREE.BoxGeometry(2.2, h, 1.6), cab); box.position.set(0, y + h / 2, 0); box.castShadow = true; grp.add(box);
        const cn = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.08, 18), new THREE.MeshStandardMaterial({ color: 0x0a0a10, emissive: c(accent), emissiveIntensity: 0.06 }));
        cn.rotation.x = Math.PI / 2; cn.position.set(0, y + h / 2, 0.82); grp.add(cn); speakerCones.push(cn); y += h;
      }
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, y, 0.06), new THREE.MeshStandardMaterial({ color: 0x02121a, emissive: c(accent), emissiveIntensity: 0.6 }));
      strip.position.set(1.2, y / 2, 0.8); grp.add(strip);
      grp.position.set(x, 0, z); grp.rotation.y = Math.atan2(0 - x, -4 - z); scene.add(grp);
    };
    cornerStack(-23, 21, PALETTE.cyan); cornerStack(23, 21, PALETTE.magenta);
    cornerStack(-23, -19, PALETTE.green); cornerStack(23, -19, PALETTE.purple);
  }

  // ---- haze ----
  const fog = new THREE.FogExp2(0x07071a, 0.016); scene.fog = fog;

  const tmpC = new THREE.Color();
  function update(dt, time, pulse, dayT) {
    // sun elevation over the cycle
    const ang = (dayT - 0.25) * Math.PI * 2;
    const elev = Math.sin(ang);
    let wN = clamp(-elev, 0, 1), wDk = clamp(1 - Math.abs(elev) / 0.4, 0, 1), wDy = clamp(elev, 0, 1);
    const sum = wN + wDk + wDy || 1; wN /= sum; wDk /= sum; wDy /= sum;
    const darkness = clamp(1 - Math.max(elev, 0), 0, 1);

    blend3(skyMat.uniforms.top.value, KEY.top, wN, wDk, wDy);
    blend3(skyMat.uniforms.mid.value, KEY.mid, wN, wDk, wDy);
    blend3(skyMat.uniforms.bot.value, KEY.bot, wN, wDk, wDy);
    blend3(fog.color, KEY.fog, wN, wDk, wDy);
    blend3(amb.color, KEY.amb, wN, wDk, wDy); amb.intensity = AMB_I[0] * wN + AMB_I[1] * wDk + AMB_I[2] * wDy;
    blend3(sun.color, KEY.sun, wN, wDk, wDy); sun.intensity = SUN_I[0] * wN + SUN_I[1] * wDk + SUN_I[2] * wDy;
    fog.density = 0.016 - wDy * 0.008;
    starMat.opacity = darkness;

    // sun/moon disc position + look
    sun.position.set(Math.cos(ang) * 42, Math.sin(ang) * 42 + 2, -18);
    orb.position.copy(sun.position);
    tmpC.copy(sun.color); if (wN > 0.5) tmpC.setHex(0xcfd8ff); orb.material.color.copy(tmpC);
    orbGlow.material.color.copy(tmpC);
    orb.visible = sun.position.y > -3;

    // stage FX pop when dark
    screenMat.uniforms.t.value = time; screenMat.uniforms.pulse.value = pulse;
    for (const sp of spots) {
      const sweep = Math.sin(time * 0.7 + sp.phase);
      sp.light.target.position.set(sweep * 18, 0, 2 + Math.cos(time * 0.5 + sp.phase) * 6);
      sp.light.intensity = (20 + pulse * 90) * (0.25 + darkness);
      sp.beam.material.opacity = (0.03 + pulse * 0.10) * darkness;
      sp.beam.lookAt(sp.light.target.position); sp.beam.rotateX(-Math.PI / 2);
    }
    lasers.material.opacity = Math.pow(pulse, 2) * 0.5 * darkness;
    lasers.rotation.y = Math.sin(time * 0.4) * 0.15;

    // perimeter light posts flare up at night so the arena edge stays lit
    for (const L of perimLights) L.intensity = 3 + darkness * 9 + pulse * 4;
    // wall light strips dim/brighten to the beat; wall lasers sweep on the drop
    for (const s of wallStrips) s.material.emissiveIntensity = 0.18 + pulse * 1.3 * (0.45 + darkness);
    if (wlasers) { wlasers.material.opacity = Math.pow(pulse, 2) * 0.45 * darkness; wlasers.material.color.setHSL((time * 0.05) % 1, 1, 0.6); }

    // speaker cones glow + punch on the bass
    for (const cn of speakerCones) {
      cn.material.emissiveIntensity = 0.05 + pulse * (0.5 + 0.7 * darkness);
      const s = 1 + pulse * 0.18; cn.scale.set(s, s, 1);
    }
  }

  return { stageZ, deck: deckInfo, screen, screenPos: [0, 6.2, stageZ - 4.9], screenSize: [22, 7], update };
}

// spawn bench (simple wooden slats + iron legs), at +Z facing the stage
function buildBench(scene) {
  const g = new THREE.Group(); g.position.set(-4, 0, 6);
  g.rotation.y = Math.atan2(0 - (-4), -4 - 6); // face the center of the grounds
  const wood = new THREE.MeshStandardMaterial({ color: 0x2a1d16, roughness: 0.8, emissive: new THREE.Color(0x001a1f), emissiveIntensity: 0.3 });
  const iron = new THREE.MeshStandardMaterial({ color: 0x0a0a12, roughness: 0.5, metalness: 0.6 });
  const box = (w, h, d, m) => { const x = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); x.castShadow = true; x.receiveShadow = true; return x; };
  for (let i = 0; i < 4; i++) { const s = box(1.9, 0.06, 0.13, wood); s.position.set(0, 0.5, -0.27 + i * 0.18); g.add(s); }
  for (let i = 0; i < 3; i++) { const s = box(1.9, 0.13, 0.05, wood); s.position.set(0, 0.64 + i * 0.16, -0.34); s.rotation.x = -0.12; g.add(s); }
  for (const sx of [-0.82, 0.82]) for (const sz of [-0.22, 0.22]) { const l = box(0.08, 0.52, 0.08, iron); l.position.set(sx, 0.26, sz); g.add(l); }
  scene.add(g);
}

// helpers
function c(h) { return new THREE.Color(h); }
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function blend3(out, keys, wN, wDk, wDy) {
  out.setRGB(
    keys[0].r * wN + keys[1].r * wDk + keys[2].r * wDy,
    keys[0].g * wN + keys[1].g * wDk + keys[2].g * wDy,
    keys[0].b * wN + keys[1].b * wDk + keys[2].b * wDy
  );
  return out;
}
function dot() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d');
  const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, 'rgba(255,255,255,1)'); rad.addColorStop(0.4, 'rgba(255,255,255,.7)'); rad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rad; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
function glowTex() {
  const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d');
  const rad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  rad.addColorStop(0, 'rgba(255,255,255,1)'); rad.addColorStop(0.3, 'rgba(255,240,214,.7)'); rad.addColorStop(1, 'rgba(255,240,214,0)');
  g.fillStyle = rad; g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(cv); t.colorSpace = THREE.SRGBColorSpace; return t;
}
