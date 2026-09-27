// scene-mall.js — Cyberpunk Mallsoft Arcade
// 3D neon mall with arcade machines, neon signs, polished floor, escalators

import * as THREE from 'three';
import { makeBox, makeCylinder, makeSphere, makeTextSprite } from './helpers.js';

export function buildMallRoom(scene, onObjectClick = () => {}) {
  const root = new THREE.Group();
  root.name = 'mall-room';

  // visual sub-mode: mallsoft, cyberpunk, late-night
  let visualMode = 'mallsoft';

  // ============ SKY/CEILING DOME (dark with neon haze) ============
  const skyUniforms = {
    uTime: { value: 0 },
    uMode: { value: 0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uMode;
      varying vec3 vWorldPos;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      void main() {
        vec3 d = normalize(vWorldPos);
        // dark ceiling
        vec3 col = vec3(0.02, 0.01, 0.05);
        // distant glow at the "back" of the mall
        float back = max(0.0, -d.z);
        col += vec3(1.0, 0.3, 0.8) * pow(back, 6.0) * 0.4;
        col += vec3(0.0, 0.8, 1.0) * pow(back, 10.0) * 0.3;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(80, 32, 16), skyMat);
  root.add(skyDome);

  // ============ POLISHED TILE FLOOR ============
  const floorUniforms = {
    uTime: { value: 0 },
  };
  const floorMat = new THREE.ShaderMaterial({
    uniforms: floorUniforms,
    side: THREE.DoubleSide,
    transparent: true,
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      varying vec3 vWorldPos;
      void main() {
        // tile pattern
        vec2 t = vWorldPos.xz;
        vec2 tile = fract(t / 1.5);
        float line = step(0.95, max(tile.x, tile.y));
        // reflection of neon
        float dist = length(t);
        // alternating tile colors (dark/light marble)
        float checker = mod(floor(t.x / 1.5) + floor(t.y / 1.5), 2.0);
        vec3 col1 = vec3(0.05, 0.05, 0.1);
        vec3 col2 = vec3(0.1, 0.08, 0.15);
        vec3 base = mix(col1, col2, checker);
        // neon glow strips
        float glow = sin(t.y * 0.3 - uTime * 0.3) * 0.5 + 0.5;
        col1 = mix(base, vec3(0.0, 0.6, 0.9), glow * 0.3);
        // tile lines
        col1 = mix(col1, vec3(0.4, 0.3, 0.5), line * 0.6);
        // distance fog
        float fog = 1.0 - smoothstep(8.0, 30.0, dist);
        col1 = mix(col1 * 0.3, col1, fog);
        // grid lines (subtle)
        vec2 g = abs(fract(t) - 0.5);
        float gline = 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y));
        col1 += vec3(0.0, 0.4, 0.6) * gline * 0.2;
        gl_FragColor = vec4(col1, 0.95);
      }
    `,
  });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  root.add(floor);

  // walls + ceiling removed — the mall is laid open in the VaporStudio plaza.
  // Neon signs, mannequins and escalators stay where the walls used to be so
  // the shopfronts still read as an arcade strip you walk between.

  // ============ NEON SHOP SIGNS (where the corridor walls used to be) ============
  const buildNeonSign = (text, color, x, y, z, rotY = 0, width = 4) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1024, 256);
    ctx.font = 'bold 110px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 60;
    ctx.fillStyle = color;
    ctx.fillText(text, 512, 128);
    ctx.shadowBlur = 0;
    ctx.fillText(text, 512, 128);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 4), mat);
    m.position.set(x, y, z);
    m.rotation.y = rotY;
    const light = new THREE.PointLight(parseInt(color.replace('#', ''), 16), 0.6, 8, 1.5);
    return { mesh: m, light };
  };
  // left wall signs
  const signs = [
    buildNeonSign('ＡＲＣＡＤＥ', '#ff71ce', -9.7, 6, -8, Math.PI / 2, 3.5),
    buildNeonSign('電気屋', '#01cdfe', -9.7, 4.5, -3, Math.PI / 2, 2.5),
    buildNeonSign('マート', '#fff95b', -9.7, 5.5, 3, Math.PI / 2, 3),
    buildNeonSign('ＴＡＲＧＥＴ', '#b967ff', -9.7, 5, 8, Math.PI / 2, 3),
    // right wall signs
    buildNeonSign('ＦＯＯＤ', '#ff5070', 9.7, 5, -10, -Math.PI / 2, 3),
    buildNeonSign('シネマ', '#00ffaa', 9.7, 4.5, -5, -Math.PI / 2, 2.5),
    buildNeonSign('ＳＨＯＥＳ', '#ffaa55', 9.7, 5.5, 0, -Math.PI / 2, 3),
    buildNeonSign('ＢＯＯＫＳ', '#ff71ce', 9.7, 5, 5, -Math.PI / 2, 3),
    buildNeonSign('２０２５', '#01cdfe', 9.7, 7, 10, -Math.PI / 2, 3),
    // back wall
    buildNeonSign('ＦＵＴＵＲＥ ＭＡＬＬ', '#b967ff', 0, 6, -14.7, 0, 6),
  ];
  for (const s of signs) {
    root.add(s.mesh);
    s.light.position.set(s.mesh.position.x * 0.9, s.mesh.position.y, s.mesh.position.z * 0.9);
    root.add(s.light);
    scene.addClickable(s.mesh, 'neon-sign', () => onObjectClick('neon-sign'));
  }

  // ============ ARCADE MACHINES (2 rows, 4 machines each) ============
  const arcadeMachines = [];
  for (let row = 0; row < 2; row++) {
    const xBase = row === 0 ? -7 : 7;
    for (let i = 0; i < 3; i++) {
      const machine = new THREE.Group();
      machine.position.set(xBase, 0, -6 + i * 6);
      // body
      const body = makeBox(1.4, 2.0, 1.0, 0x1a0a25, { roughness: 0.4, metalness: 0.3 });
      body.position.y = 1.0;
      body.castShadow = true;
      machine.add(body);
      // screen
      const screenColors = [0xff71ce, 0x01cdfe, 0xfff95b, 0xb967ff, 0x00ffaa, 0xff5070];
      const screenColor = screenColors[Math.floor(Math.random() * screenColors.length)];
      const screenMat = new THREE.MeshBasicMaterial({ color: screenColor, transparent: true, opacity: 0.9 });
      const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.7), screenMat);
      screen.position.set(0, 1.5, 0.51);
      machine.add(screen);
      // control panel
      const panel = makeBox(1.2, 0.05, 0.6, 0x2a1530, { roughness: 0.5 });
      panel.position.set(0, 0.95, 0.55);
      panel.rotation.x = -0.3;
      machine.add(panel);
      // joystick
      const stick = makeCylinder(0.03, 0.03, 0.15, 8, 0xffaa55);
      stick.position.set(-0.3, 1.05, 0.7);
      machine.add(stick);
      const ball = makeSphere(0.05, 0xff5070, { emissive: 0xff5070, emissiveIntensity: 0.4 });
      ball.position.set(-0.3, 1.13, 0.7);
      machine.add(ball);
      // buttons
      for (let b = 0; b < 3; b++) {
        const btn = makeCylinder(0.06, 0.06, 0.03, 12, screenColor, { emissive: screenColor, emissiveIntensity: 0.5 });
        btn.position.set(0.1 + b * 0.15, 1.04, 0.7);
        machine.add(btn);
      }
      // glow
      const glow = new THREE.PointLight(screenColor, 0.4, 3, 1.5);
      glow.position.set(0, 1.5, 1);
      machine.add(glow);
      root.add(machine);
      arcadeMachines.push({ machine, screen, screenMat, screenColor });
      scene.addClickable(machine, 'arcade', () => onObjectClick('arcade'));
    }
  }

  // ============ CENTRAL FOUNTAIN / WATER FEATURE ============
  const fountainGroup = new THREE.Group();
  fountainGroup.position.set(0, 0, 0);
  root.add(fountainGroup);
  // base pool
  const pool = makeCylinder(3, 3, 0.3, 32, 0x1a1530, { roughness: 0.3, metalness: 0.5 });
  pool.position.y = 0.15;
  fountainGroup.add(pool);
  // water surface
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(2.8, 32),
    new THREE.MeshBasicMaterial({ color: 0x4488ff, transparent: true, opacity: 0.6 })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.32;
  fountainGroup.add(water);
  // central pillar
  const pillar = makeCylinder(0.3, 0.4, 1.5, 16, 0xead8d4);
  pillar.position.y = 0.9;
  fountainGroup.add(pillar);
  // top sphere
  const topSphere = makeSphere(0.4, 0xead8d4, { emissive: 0x01cdfe, emissiveIntensity: 0.3 });
  topSphere.position.y = 1.8;
  fountainGroup.add(topSphere);
  // water particles (will animate)
  const waterCount = 60;
  const waterGeo = new THREE.BufferGeometry();
  const waterPos = new Float32Array(waterCount * 3);
  const waterVel = new Float32Array(waterCount * 3);
  const waterLife = new Float32Array(waterCount);
  for (let i = 0; i < waterCount; i++) {
    waterPos[i * 3] = 0;
    waterPos[i * 3 + 1] = 1.8;
    waterPos[i * 3 + 2] = 0;
    waterLife[i] = Math.random();
  }
  waterGeo.setAttribute('position', new THREE.BufferAttribute(waterPos, 3));
  const waterMat = new THREE.PointsMaterial({
    color: 0x88ccff,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const waterPoints = new THREE.Points(waterGeo, waterMat);
  fountainGroup.add(waterPoints);
  // glow
  const fountainGlow = new THREE.PointLight(0x4488ff, 0.8, 6, 1.5);
  fountainGlow.position.set(0, 1.8, 0);
  fountainGroup.add(fountainGlow);
  scene.addClickable(fountainGroup, 'fountain', () => onObjectClick('fountain'));

  // ============ MANNEQUINS (shop window displays) ============
  const mannequinGroup = (x, y, z, rotY = 0) => {
    const g = new THREE.Group();
    g.position.set(x, y, z);
    g.rotation.y = rotY;
    // head
    const head = makeSphere(0.15, 0xead8d4, { roughness: 0.3 });
    head.position.y = 1.6;
    g.add(head);
    // torso
    const torso = makeBox(0.4, 0.7, 0.25, 0x1a0a20, { roughness: 0.5 });
    torso.position.y = 1.0;
    g.add(torso);
    // legs
    const legs = makeBox(0.35, 0.7, 0.2, 0x1a0a20);
    legs.position.y = 0.35;
    g.add(legs);
    // arms
    for (const sx of [-1, 1]) {
      const arm = makeBox(0.1, 0.6, 0.1, 0xead8d4);
      arm.position.set(sx * 0.27, 1.0, 0);
      g.add(arm);
    }
    // platform
    const platform = makeCylinder(0.3, 0.3, 0.05, 16, 0x000000);
    platform.position.y = 0.025;
    g.add(platform);
    return g;
  };
  // place mannequins in shop windows (against walls)
  root.add(mannequinGroup(-9, 0, -12, 0));
  root.add(mannequinGroup(-9, 0, -6, 0));
  root.add(mannequinGroup(9, 0, -12, Math.PI));
  root.add(mannequinGroup(9, 0, 6, Math.PI));
  root.add(mannequinGroup(9, 0, 10, Math.PI));

  // ============ ESCALATORS (left and right, going up) ============
  const buildEscalator = (x, z, dir) => {
    const eg = new THREE.Group();
    eg.position.set(x, 0, z);
    // base
    const base = makeBox(1.5, 0.1, 4, 0x2a1530);
    base.position.y = 0.05;
    eg.add(base);
    // moving steps
    const stepsCount = 10;
    const steps = [];
    for (let i = 0; i < stepsCount; i++) {
      const t = i / stepsCount;
      const step = makeBox(1.3, 0.05, 0.3, 0x555555, { roughness: 0.3, metalness: 0.7 });
      const y = t * 2 + 0.1;
      const zoff = (1 - t) * 1.5 * dir;
      step.position.set(0, y, zoff);
      eg.add(step);
      steps.push({ mesh: step, baseY: y, baseZ: zoff, phase: t });
    }
    // side rails with neon
    for (const sx of [-0.8, 0.8]) {
      const rail = makeBox(0.05, 2.5, 0.05, 0x888888, { metalness: 0.8, roughness: 0.2 });
      rail.position.set(sx, 1.25, 1.5 * dir);
      eg.add(rail);
      // neon strip
      const neon = makeBox(0.06, 0.05, 3, 0x01cdfe, { emissive: 0x01cdfe, emissiveIntensity: 0.6 });
      neon.position.set(sx, 0.1, 0.75 * dir);
      eg.add(neon);
    }
    return { group: eg, steps, dir };
  };
  const esc1 = buildEscalator(-5.5, -11, -1);
  const esc2 = buildEscalator(5.5, -11, -1);
  root.add(esc1.group);
  root.add(esc2.group);
  scene.addClickable(esc1.group, 'escalator', () => onObjectClick('escalator'));
  scene.addClickable(esc2.group, 'escalator', () => onObjectClick('escalator'));

  // ============ SKATING RINK or FOOD COURT in the back ============
  // distant food court with tables
  for (let i = 0; i < 3; i++) {
    const tableX = -3 + i * 3;
    const tableTop = makeCylinder(0.5, 0.5, 0.05, 12, 0x4488aa, { roughness: 0.3, metalness: 0.4 });
    tableTop.position.set(tableX, 0.8, -13);
    root.add(tableTop);
    const tableLeg = makeCylinder(0.05, 0.05, 0.8, 6, 0x888888);
    tableLeg.position.set(tableX, 0.4, -13);
    root.add(tableLeg);
    // chair
    const chair = makeBox(0.4, 0.4, 0.4, 0xff71ce, { roughness: 0.5 });
    chair.position.set(tableX, 0.2, -12.4);
    root.add(chair);
  }
  scene.addClickable(root, 'food-court', () => onObjectClick('food-court'));

  // ============ FLOATING HOLOGRAMS ============
  for (let i = 0; i < 3; i++) {
    const holo = new THREE.Mesh(
      new THREE.TorusGeometry(0.3, 0.03, 6, 16),
      new THREE.MeshBasicMaterial({
        color: [0xff71ce, 0x01cdfe, 0xb967ff][i],
        transparent: true,
        opacity: 0.6,
      })
    );
    holo.position.set(-2 + i * 2, 4, 2);
    holo.userData.baseY = holo.position.y;
    root.add(holo);
  }

  // ============ ATMOSPHERIC FOG ============
  // scene-level fog will be set by Scene3D

  // ============ LIGHTS ============
  const ambient = new THREE.AmbientLight(0x404060, 0.4);
  root.add(ambient);
  // overhead spotlights (mall lighting)
  for (let i = 0; i < 4; i++) {
    const spot = new THREE.SpotLight(0xffffff, 0.6, 12, Math.PI / 3, 0.5);
    spot.position.set(-3 + i * 2, 9.5, 0);
    spot.target.position.set(-3 + i * 2, 0, 0);
    root.add(spot);
    root.add(spot.target);
  }
  // fountain glow
  const fountainLight = new THREE.PointLight(0x4488ff, 1.0, 8, 1.5);
  fountainLight.position.set(0, 2, 0);
  root.add(fountainLight);

  // ============ PARTICLES (mall dust) ============
  const dustCount = 100;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 18;
    dustPos[i * 3 + 1] = Math.random() * 8;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 25;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xff71ce,
    size: 0.03,
    transparent: true,
    opacity: 0.3,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  root.add(dust);

  // ============ UPDATE / ANIMATION ============
  const setVisualMode = (mode) => {
    visualMode = mode;
    const modeMap = { mallsoft: 0, cyberpunk: 1, 'late-night': 2 };
    skyUniforms.uMode.value = modeMap[mode] || 0;
    if (mode === 'cyberpunk') {
      ambient.color.setHex(0xff3388);
      ambient.intensity = 0.35;
    } else if (mode === 'late-night') {
      ambient.color.setHex(0x4060aa);
      ambient.intensity = 0.5;
    } else {
      ambient.color.setHex(0x404060);
      ambient.intensity = 0.4;
    }
  };

  const update = (dt, { beatPulse, time, meters }) => {
    // sky/floor time
    skyUniforms.uTime.value = time;
    floorUniforms.uTime.value = time;
    const kickMeter = meters ? meters.kick : 0;
    // arcade screens pulse
    for (const m of arcadeMachines) {
      m.screen.material.opacity = 0.7 + Math.sin(time * 3 + m.screen.position.x) * 0.2;
      // random glitch
      if (Math.random() < 0.01) {
        m.screen.material.color.setHex(0xffffff);
        setTimeout(() => m.screen.material.color.setHex(m.screenColor), 50);
      }
    }
    // escalator steps
    const escSpeed = 0.4;
    for (const esc of [esc1, esc2]) {
      for (let i = 0; i < esc.steps.length; i++) {
        const s = esc.steps[i];
        s.phase += dt * escSpeed;
        if (s.phase > 1) s.phase -= 1;
        const t = s.phase;
        s.mesh.position.y = s.baseY + Math.sin(t * Math.PI) * 0.2;
        s.mesh.position.z = s.baseZ + (1 - t) * 0.5 * esc.dir;
      }
    }
    // fountain water
    const wpArr = waterPoints.geometry.attributes.position;
    for (let i = 0; i < waterCount; i++) {
      waterLife[i] += dt * 0.8;
      if (waterLife[i] > 1) {
        waterLife[i] = 0;
        const angle = Math.random() * Math.PI * 2;
        wpArr.array[i * 3] = Math.cos(angle) * 0.2;
        wpArr.array[i * 3 + 1] = 1.8;
        wpArr.array[i * 3 + 2] = Math.sin(angle) * 0.2;
      } else {
        const angle = Math.atan2(wpArr.array[i * 3 + 2], wpArr.array[i * 3]);
        const r = waterLife[i] * 1.2;
        wpArr.array[i * 3] = Math.cos(angle) * r;
        wpArr.array[i * 3 + 1] = 1.8 + waterLife[i] * 0.5 - waterLife[i] * waterLife[i] * 0.8;
        wpArr.array[i * 3 + 2] = Math.sin(angle) * r;
      }
    }
    wpArr.needsUpdate = true;
    // floating holograms
    root.children.forEach(c => {
      if (c.geometry && c.geometry.type === 'TorusGeometry') {
        c.rotation.x = time * 0.5;
        c.rotation.y = time * 0.7;
        c.position.y = c.userData.baseY + Math.sin(time * 1.5 + c.position.x) * 0.2;
        c.material.opacity = 0.5 + Math.sin(time * 2 + c.position.x) * 0.2;
      }
    });
    // dust drift
    const dpArr = dust.geometry.attributes.position;
    for (let i = 0; i < dustCount; i++) {
      dpArr.array[i * 3 + 1] += dt * 0.05;
      if (dpArr.array[i * 3 + 1] > 8) dpArr.array[i * 3 + 1] = 0;
      dpArr.array[i * 3] += Math.sin(time + i) * 0.001;
    }
    dpArr.needsUpdate = true;
    // neon flicker (rare)
    if (Math.random() < 0.003) {
      for (const s of signs) {
        s.light.intensity = 2;
        setTimeout(() => { s.light.intensity = 0.6; }, 80);
      }
    }
  };

  const onBeat = (beat, bar) => {};
  const onMeter = (meters) => {
    if (meters) {
      fountainLight.intensity = 1.0 + meters.kick * 0.8;
      for (const m of arcadeMachines) {
        m.screen.material.opacity = Math.min(1, 0.7 + meters.kick * 0.5);
      }
    }
  };

  const dispose = () => {
    root.traverse(o => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
        else o.material.dispose();
      }
    });
  };

  return {
    root,
    palette: {
      bg: 0x0a0510, fog: 0x1a1020,
      warm: 0xff71ce, cool: 0x01cdfe, accent: 0xb967ff,
    },
    cameraStart: { pos: { x: 0, y: 2.5, z: 9 }, target: { x: 0, y: 2.0, z: -2 } },
    update, onBeat, onMeter, dispose,
    setVisualMode,
  };
}
