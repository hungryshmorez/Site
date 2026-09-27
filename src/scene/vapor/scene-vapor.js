// scene-vapor.js — Vaporwave Temple
// marble columns, Roman bust, palms, CRT TV, grid floor, neon, glitch

import * as THREE from 'three';
import { makeBox, makeCylinder, makeSphere, makeTextSprite } from './helpers.js';

export function buildVaporRoom(scene, onObjectClick = () => {}) {
  const root = new THREE.Group();
  root.name = 'vapor-temple';

  // visual sub-mode: classic, slush, breaks, trap
  let visualMode = 'classic';

  // ============ SKY DOME (sunset gradient) ============
  const skyUniforms = {
    uTime: { value: 0 },
    uMode: { value: 0 },  // 0=classic, 1=slush, 2=breaks, 3=trap
    uKick: { value: 0 },
    uHat: { value: 0 },
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
      uniform float uKick;
      uniform float uHat;
      varying vec3 vWorldPos;
      // simple value noise
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
      }
      vec3 skyClassic(vec3 d) {
        // sunset gradient
        float t = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 horizon = vec3(1.0, 0.4, 0.55);
        vec3 mid = vec3(0.95, 0.3, 0.7);
        vec3 top = vec3(0.15, 0.05, 0.35);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.3, t));
        col = mix(col, top, smoothstep(0.3, 1.0, t));
        // sun
        float sun = pow(max(0.0, 1.0 - distance(d, vec3(0.0, 0.05, -1.0))), 80.0);
        col += vec3(1.0, 0.6, 0.4) * sun;
        return col;
      }
      vec3 skySlush(vec3 d) {
        // frozen, blue/white
        float t = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 horizon = vec3(0.7, 0.85, 1.0);
        vec3 mid = vec3(0.4, 0.6, 0.95);
        vec3 top = vec3(0.1, 0.2, 0.55);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.4, t));
        col = mix(col, top, smoothstep(0.4, 1.0, t));
        return col;
      }
      vec3 skyBreaks(vec3 d) {
        // PS2-era green/cyan/yellow
        float t = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 horizon = vec3(0.4, 0.95, 0.5);
        vec3 mid = vec3(0.0, 0.7, 0.85);
        vec3 top = vec3(0.1, 0.15, 0.45);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.4, t));
        col = mix(col, top, smoothstep(0.4, 1.0, t));
        // fast clouds
        float n = noise(d.xz * 3.0 + uTime * 0.1);
        col = mix(col, vec3(1.0, 1.0, 0.6), smoothstep(0.55, 0.7, n) * 0.4);
        return col;
      }
      vec3 skyTrap(vec3 d) {
        // dark neon — magenta dominant
        float t = clamp(d.y * 0.5 + 0.5, 0.0, 1.0);
        vec3 horizon = vec3(0.95, 0.15, 0.5);
        vec3 mid = vec3(0.5, 0.05, 0.55);
        vec3 top = vec3(0.08, 0.0, 0.25);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.4, t));
        col = mix(col, top, smoothstep(0.4, 1.0, t));
        // glitch
        if (mod(floor(uTime * 4.0), 8.0) == 0.0) {
          col = mix(col, vec3(0.0, 1.0, 1.0), 0.1);
        }
        return col;
      }
      void main() {
        vec3 d = normalize(vWorldPos);
        vec3 col;
        if (uMode < 0.5) col = skyClassic(d);
        else if (uMode < 1.5) col = skySlush(d);
        else if (uMode < 2.5) col = skyBreaks(d);
        else col = skyTrap(d);
        // beat-driven brightness
        col *= 1.0 + uKick * 0.15;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyDome = new THREE.Mesh(new THREE.SphereGeometry(100, 32, 16), skyMat);
  root.add(skyDome);

  // ============ GRID FLOOR (extending to horizon) ============
  const gridUniforms = {
    uTime: { value: 0 },
    uMode: { value: 0 },
    uKick: { value: 0 },
    uHat: { value: 0 },
  };
  const gridMat = new THREE.ShaderMaterial({
    uniforms: gridUniforms,
    transparent: true,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        vUv = uv;
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uMode;
      uniform float uKick;
      uniform float uHat;
      varying vec2 vUv;
      varying vec3 vWorldPos;
      void main() {
        // grid in world space
        vec2 g = abs(fract(vWorldPos.xz * 0.5) - 0.5);
        float line = 1.0 - smoothstep(0.0, 0.04, min(g.x, g.y));
        // distance fade
        float d = length(vWorldPos.xz);
        float fade = 1.0 - smoothstep(10.0, 60.0, d);
        // moving highlight band
        float band = 1.0 - smoothstep(0.0, 1.5, abs(fract((d - uTime * 3.0) * 0.05) - 0.5) * 2.0);
        band *= smoothstep(2.0, 8.0, d);
        // mode color
        vec3 col;
        if (uMode < 0.5) col = mix(vec3(1.0, 0.45, 0.81), vec3(0.0, 0.81, 1.0), vUv.y);
        else if (uMode < 1.5) col = vec3(0.5, 0.85, 1.0);
        else if (uMode < 2.5) col = mix(vec3(0.0, 1.0, 0.5), vec3(0.0, 0.5, 1.0), vUv.y);
        else col = mix(vec3(1.0, 0.1, 0.4), vec3(0.7, 0.0, 0.6), vUv.y);
        col *= line * fade;
        col += col * band * 0.5;
        col += col * uKick * 0.3;
        gl_FragColor = vec4(col, line * fade);
      }
    `,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(120, 120), gridMat);
  grid.rotation.x = -Math.PI / 2;
  grid.position.y = 0;
  root.add(grid);

  // ============ MARBLE PLATFORM (raised floor) ============
  const platform = makeBox(24, 0.4, 24, 0xead8d4, { roughness: 0.3, metalness: 0.05 });
  platform.position.y = -0.2;
  platform.receiveShadow = true;
  root.add(platform);
  // platform edge glow (neon strip)
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0xff71ce, transparent: true, opacity: 0.7 });
  for (const s of [-1, 1]) {
    for (const a of [-1, 1]) {
      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(0.05, 0.05, 24),
        edgeMat
      );
      edge.position.set(s * 12, 0, 0);
      root.add(edge);
      const edge2 = new THREE.Mesh(
        new THREE.BoxGeometry(24, 0.05, 0.05),
        edgeMat
      );
      edge2.position.set(0, 0, a * 12);
      root.add(edge2);
    }
  }

  // ============ MARBLE COLUMNS (Greek/Ionic) ============
  const columnsGroup = new THREE.Group();
  root.add(columnsGroup);
  const colPositions = [
    [-6, -6], [-6, 6], [6, -6], [6, 6],
    [-10, -2], [10, -2], [-10, 2], [10, 2],
  ];
  const marbleMat = new THREE.MeshStandardMaterial({ color: 0xead8d4, roughness: 0.4, metalness: 0.05 });
  for (const [x, z] of colPositions) {
    const colGroup = new THREE.Group();
    colGroup.position.set(x, 0, z);
    // base
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, 1.0), marbleMat);
    base.position.y = 0.15;
    base.castShadow = true;
    colGroup.add(base);
    // shaft
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 4.5, 24), marbleMat);
    shaft.position.y = 2.55;
    shaft.castShadow = true;
    colGroup.add(shaft);
    // capital (top)
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.35, 0.95), marbleMat);
    cap.position.y = 4.95;
    cap.castShadow = true;
    colGroup.add(cap);
    // scroll spirals (simplified as small boxes on capital sides)
    for (const sx of [-1, 1]) {
      const scroll = new THREE.Mesh(
        new THREE.TorusGeometry(0.12, 0.04, 8, 12),
        new THREE.MeshStandardMaterial({ color: 0xd4bfb8, roughness: 0.3 })
      );
      scroll.position.set(sx * 0.4, 5.0, 0.42);
      scroll.rotation.y = Math.PI / 2;
      colGroup.add(scroll);
    }
    columnsGroup.add(colGroup);
  }

  // ============ ROMAN BUST on pedestal (center) ============
  const bustGroup = new THREE.Group();
  bustGroup.position.set(0, 0.2, 0);
  root.add(bustGroup);
  // pedestal
  const pedestal = makeBox(1.0, 1.0, 1.0, 0xc9b6a6, { roughness: 0.4 });
  pedestal.position.y = 0.5;
  bustGroup.add(pedestal);
  // bust — stylized as cylinders + sphere
  const bust = new THREE.Group();
  bust.position.y = 1.0;
  bustGroup.add(bust);
  // neck
  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.13, 0.16, 0.25, 16),
    marbleMat
  );
  neck.position.y = 0.13;
  bust.add(neck);
  // head
  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 24, 18),
    marbleMat
  );
  head.position.y = 0.5;
  head.scale.set(1, 1.2, 0.95);
  bust.add(head);
  // hair (top)
  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2),
    new THREE.MeshStandardMaterial({ color: 0xead8d4, roughness: 0.4 })
  );
  hair.position.y = 0.55;
  hair.scale.set(1, 0.6, 1);
  bust.add(hair);
  // nose
  const nose = new THREE.Mesh(
    new THREE.ConeGeometry(0.04, 0.12, 6),
    marbleMat
  );
  nose.position.set(0, 0.5, 0.25);
  nose.rotation.x = Math.PI / 2;
  bust.add(nose);
  // eyes (dark)
  for (const sx of [-0.09, 0.09]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.025, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    eye.position.set(sx, 0.55, 0.24);
    bust.add(eye);
  }
  scene.addClickable(bustGroup, 'bust', () => onObjectClick('bust'));

  // ============ CRT TV (right side, animated scanlines + glitch) ============
  const tvGroup = new THREE.Group();
  tvGroup.position.set(5, 0, -4);
  root.add(tvGroup);
  // TV body
  const tvBody = makeBox(1.4, 1.0, 0.7, 0x1a1a1a, { roughness: 0.4, metalness: 0.3 });
  tvBody.position.y = 1.3;
  tvGroup.add(tvBody);
  // screen bezel
  const bezel = makeBox(1.2, 0.85, 0.05, 0x0a0a0a);
  bezel.position.set(0, 1.35, 0.36);
  tvGroup.add(bezel);
  // screen — custom shader for scanlines + glitch + face content
  const screenCanvas = document.createElement('canvas');
  screenCanvas.width = 512; screenCanvas.height = 384;
  const screenCtx = screenCanvas.getContext('2d');
  const screenTex = new THREE.CanvasTexture(screenCanvas);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  const screenUniforms = {
    uTex: { value: screenTex },
    uTime: { value: 0 },
    uKick: { value: 0 },
    uHat: { value: 0 },
    uBass: { value: 0 },
  };
  const screenMat = new THREE.ShaderMaterial({
    uniforms: screenUniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D uTex;
      uniform float uTime;
      uniform float uKick;
      uniform float uHat;
      uniform float uBass;
      varying vec2 vUv;
      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      // distance to a lissajous curve
      float lissajous(vec2 uv, float a, float b, float phase) {
        // parameterize the curve t in [0, 2pi]
        // we approximate distance by sampling
        float minD = 1.0;
        float lastX = 0.0, lastY = 0.0;
        for (int i = 0; i < 80; i++) {
          float t = float(i) / 80.0 * 6.28318;
          float x = sin(a * t + phase);
          float y = sin(b * t);
          if (i > 0) {
            // distance from uv (in -1..1) to segment (lastX,lastY)-(x,y)
            vec2 a2 = vec2(lastX, lastY);
            vec2 b2 = vec2(x, y);
            vec2 p = uv - a2;
            vec2 q = b2 - a2;
            float h = clamp(dot(p, q) / max(dot(q, q), 0.0001), 0.0, 1.0);
            float d = length(p - q * h);
            minD = min(minD, d);
          }
          lastX = x; lastY = y;
        }
        return minD;
      }
      void main() {
        // glitch
        vec2 uv = vUv;
        if (uKick > 0.5 && hash(vec2(floor(uTime * 30.0), 1.0)) > 0.7) {
          uv.x += (hash(vec2(floor(uTime * 50.0), 2.0)) - 0.5) * 0.1;
        }
        vec3 col = texture2D(uTex, uv).rgb;
        // Lissajous figure overlay — mapped to lower-right of screen
        vec2 lisUv = (vUv - vec2(0.5, 0.32)) * 2.0;  // center
        lisUv.x *= 1.4;
        float a = 3.0 + sin(uTime * 0.3) * 1.0;
        float b = 2.0 + sin(uTime * 0.2 + 1.0) * 0.5;
        float phase = uTime * 0.6 + uBass * 1.2;
        float d = lissajous(lisUv, a, b, phase);
        float lineW = 0.03 + uKick * 0.02;
        float line = smoothstep(lineW, 0.0, d);
        // mask to lower-right region
        float mask = step(0.4, vUv.x) * step(0.05, vUv.y) * step(vUv.x, 0.95) * step(vUv.y, 0.55);
        vec3 lisColor = mix(vec3(0.0, 1.0, 0.95), vec3(1.0, 0.3, 0.7), 0.5 + 0.5 * sin(uTime * 0.5));
        col = mix(col, lisColor, line * mask * 0.9);
        // glow halo on the line
        col += lisColor * smoothstep(lineW * 3.0, 0.0, d) * mask * 0.15;
        // scanlines
        float scan = sin(uv.y * 380.0) * 0.5 + 0.5;
        col *= 0.7 + 0.3 * scan;
        // chroma aberration
        if (uKick > 0.3) {
          float ca = 0.003;
          col.r = texture2D(uTex, uv + vec2(ca, 0.0)).r;
          col.b = texture2D(uTex, uv - vec2(ca, 0.0)).b;
        }
        // soft glow
        col += vec3(0.1, 0.05, 0.2) * 0.3;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.15, 0.8), screenMat);
  screen.position.set(0, 1.35, 0.39);
  tvGroup.add(screen);
  // draw face / pattern
  const drawScreen = (t) => {
    screenCtx.fillStyle = '#ff71ce';
    screenCtx.fillRect(0, 0, 512, 384);
    // face pattern
    screenCtx.fillStyle = '#01cdfe';
    for (let i = 0; i < 8; i++) {
      const y = i * 48;
      screenCtx.fillRect(0, y, 512, 24);
    }
    // text
    screenCtx.fillStyle = '#ffffff';
    screenCtx.font = 'bold 60px monospace';
    screenCtx.textAlign = 'center';
    screenCtx.fillText('ＡＥＳＴＨＥＴＩＣ', 256, 180);
    screenCtx.font = 'bold 30px monospace';
    screenCtx.fillText('ＦＵＴＵＲＥ ＭＡＬＬ', 256, 230);
    screenCtx.font = '20px monospace';
    screenCtx.fillText('> ＰＲＥＳＳ ＳＴＡＲＴ <', 256, 300);
    // random glitch rectangles
    if (Math.random() < 0.3) {
      screenCtx.fillStyle = `hsl(${Math.random() * 360}, 80%, 60%)`;
      const x = Math.random() * 400;
      screenCtx.fillRect(x, Math.random() * 300, 100, 8);
    }
    screenTex.needsUpdate = true;
  };
  drawScreen(0);
  // TV stand
  const stand = makeBox(0.6, 0.4, 0.4, 0x0a0a0a);
  stand.position.y = 0.2;
  tvGroup.add(stand);
  // TV glow
  const tvGlow = new THREE.PointLight(0xff71ce, 1.2, 4, 1.5);
  tvGlow.position.set(0, 1.35, 0.8);
  tvGroup.add(tvGlow);
  scene.addClickable(tvGroup, 'tv', () => onObjectClick('tv'));

  // ============ PALM TREES (left and right) — wind-reactive leaves ============
  const palmRefs = [];  // store leaves + trunks for animation
  const buildPalm = (x, z) => {
    const palm = new THREE.Group();
    palm.position.set(x, 0, z);
    // trunk — curved via several segments
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2818, roughness: 0.8 });
    for (let i = 0; i < 8; i++) {
      const t = i / 8;
      const y = 0.5 + t * 4;
      const wobble = Math.sin(t * 3) * 0.15;
      const seg = makeCylinder(0.1 - t * 0.04, 0.13 - t * 0.04, 0.6, 8, 0x4a2818);
      seg.position.set(wobble, y, 0);
      palm.add(seg);
    }
    // top crown — leaves stored for wind animation
    const crownY = 5.0;
    const leaves = [];
    for (let i = 0; i < 9; i++) {
      const angle = (i / 9) * Math.PI * 2;
      const leaf = new THREE.Mesh(
        new THREE.ConeGeometry(0.4, 2.5, 6),
        new THREE.MeshStandardMaterial({ color: 0x33aa55, emissive: 0x113322, emissiveIntensity: 0.3 })
      );
      const baseX = Math.cos(angle) * 0.4;
      const baseZ = Math.sin(angle) * 0.4;
      leaf.position.set(baseX, crownY, baseZ);
      leaf.rotation.z = Math.cos(angle) * 1.2;
      leaf.rotation.x = Math.sin(angle) * 1.2;
      leaf.scale.set(0.4, 1, 0.3);
      leaf.userData.baseRot = { z: leaf.rotation.z, x: leaf.rotation.x, baseX, baseZ };
      palm.add(leaf);
      leaves.push(leaf);
    }
    // also a top crown ball
    const crownBall = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 12, 8),
      new THREE.MeshStandardMaterial({ color: 0x33aa55 })
    );
    crownBall.position.y = crownY;
    palm.add(crownBall);
    palmRefs.push({ palm, leaves, crownBall, baseX: x, baseZ: z });
    return palm;
  };
  root.add(buildPalm(-9, -8));
  root.add(buildPalm(9, -8));
  root.add(buildPalm(-9, 8));
  root.add(buildPalm(9, 8));

  // ============ NEON SIGNS ============
  const buildNeon = (text, color, x, y, z, rotY = 0) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 1024, 256);
    ctx.font = 'bold 140px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = color;
    ctx.shadowBlur = 50;
    ctx.fillStyle = color;
    ctx.fillText(text, 512, 128);
    ctx.shadowBlur = 0;
    ctx.fillText(text, 512, 128);  // double-draw for brighter
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide });
    const m = new THREE.Mesh(new THREE.PlaneGeometry(5, 1.25), mat);
    m.position.set(x, y, z);
    m.rotation.y = rotY;
    return { mesh: m, light: new THREE.PointLight(parseInt(color.replace('#', ''), 16), 0.6, 6, 1.2) };
  };
  const aest = buildNeon('ＡＥＳＴＨＥＴＩＣ', '#ff71ce', 0, 6, -10);
  aest.light.position.set(0, 6, -8);
  root.add(aest.mesh); root.add(aest.light);
  scene.addClickable(aest.mesh, 'neon-aesthetic', () => onObjectClick('neon-aesthetic'));

  const future = buildNeon('ＦＵＴＵＲＥ ＭＡＬＬ', '#01cdfe', -9, 5, 0, Math.PI / 2);
  future.light.position.set(-8, 5, 0);
  root.add(future.mesh); root.add(future.light);
  scene.addClickable(future.mesh, 'neon-future', () => onObjectClick('neon-future'));

  const palm = buildNeon('ＰＡＬＭＳ', '#b967ff', 9, 5, 0, -Math.PI / 2);
  palm.light.position.set(8, 5, 0);
  root.add(palm.mesh); root.add(palm.light);
  scene.addClickable(palm.mesh, 'neon-palms', () => onObjectClick('neon-palms'));

  const year = buildNeon('１９７７', '#fff95b', 0, 7, 0);
  year.light.position.set(0, 7, 1);
  root.add(year.mesh); root.add(year.light);
  scene.addClickable(year.mesh, 'neon-year', () => onObjectClick('neon-year'));

  // ============ FLOATING GEOMETRY (pyramid, torus) ============
  const pyramid = new THREE.Mesh(
    new THREE.ConeGeometry(0.7, 1.2, 4),
    new THREE.MeshStandardMaterial({ color: 0x01cdfe, emissive: 0x01cdfe, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.3 })
  );
  pyramid.position.set(-3, 3, 2);
  pyramid.rotation.y = Math.PI / 4;
  root.add(pyramid);
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.6, 0.2, 12, 32),
    new THREE.MeshStandardMaterial({ color: 0xff71ce, emissive: 0xff71ce, emissiveIntensity: 0.4, metalness: 0.5, roughness: 0.3 })
  );
  torus.position.set(3, 4, 2);
  torus.rotation.x = Math.PI / 2;
  root.add(torus);

  // ============ VHS TAPES (scattered on platform) ============
  for (let i = 0; i < 6; i++) {
    const vhs = makeBox(0.5, 0.08, 0.28, 0x1a1a1a);
    const a = (i / 6) * Math.PI * 2;
    vhs.position.set(Math.cos(a) * 3, 0.04, Math.sin(a) * 3);
    vhs.rotation.y = a + Math.random() * 0.5;
    // label
    const label = makeBox(0.3, 0.001, 0.18, [0xff71ce, 0x01cdfe, 0xb967ff][i % 3], { emissive: [0xff71ce, 0x01cdfe, 0xb967ff][i % 3], emissiveIntensity: 0.3 });
    label.position.y = 0.041;
    vhs.add(label);
    root.add(vhs);
  }

  // ============ FLOATING DUST / PARTICLES ============
  const partCount = 200;
  const partGeo = new THREE.BufferGeometry();
  const partPos = new Float32Array(partCount * 3);
  for (let i = 0; i < partCount; i++) {
    partPos[i * 3] = (Math.random() - 0.5) * 30;
    partPos[i * 3 + 1] = Math.random() * 8;
    partPos[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }
  partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
  const partMat = new THREE.PointsMaterial({ color: 0xff71ce, size: 0.06, transparent: true, opacity: 0.6, depthWrite: false });
  const particles = new THREE.Points(partGeo, partMat);
  root.add(particles);

  // ============ LIGHTS ============
  const ambient = new THREE.AmbientLight(0xff71ce, 0.55);
  root.add(ambient);
  // hemi light for soft fill
  const hemi = new THREE.HemisphereLight(0xff71ce, 0x01cdfe, 0.6);
  hemi.position.set(0, 10, 0);
  root.add(hemi);
  // moonlight from above
  const moon = new THREE.DirectionalLight(0xffffff, 0.8);
  moon.position.set(0, 10, 5);
  root.add(moon);
  // sun behind horizon
  const sun = new THREE.DirectionalLight(0xff5577, 0.6);
  sun.position.set(0, 2, -20);
  root.add(sun);
  // accent lights from columns
  for (let i = 0; i < colPositions.length; i++) {
    const [x, z] = colPositions[i];
    const col = new THREE.PointLight(0x01cdfe, 0.4, 6, 1.5);
    col.position.set(x, 0.5, z);
    root.add(col);
  }
  // bust spotlight
  const bustSpot = new THREE.SpotLight(0xffd0ee, 1.5, 8, Math.PI / 4, 0.5);
  bustSpot.position.set(0, 6, 0);
  bustSpot.target = bustGroup;
  root.add(bustSpot);

  // ============ UPDATE / ANIMATION ============
  const setVisualMode = (mode) => {
    visualMode = mode;
    const modeMap = { classic: 0, slush: 1, breaks: 2, trap: 3 };
    skyUniforms.uMode.value = modeMap[mode] || 0;
    gridUniforms.uMode.value = modeMap[mode] || 0;
    // change particles / accent colors per mode
    if (mode === 'slush') {
      partMat.color.setHex(0xaaeeff);
      ambient.color.setHex(0x88ccff);
      ambient.intensity = 0.5;
    } else if (mode === 'breaks') {
      partMat.color.setHex(0x99ffcc);
      ambient.color.setHex(0x55ffaa);
      ambient.intensity = 0.4;
    } else if (mode === 'trap') {
      partMat.color.setHex(0xff3388);
      ambient.color.setHex(0xff3388);
      ambient.intensity = 0.25;
    } else {
      partMat.color.setHex(0xff71ce);
      ambient.color.setHex(0xff71ce);
      ambient.intensity = 0.3;
    }
  };

  // store bust base Y for spring animation
  const bustBaseY = bustGroup.position.y;

  const update = (dt, { beatPulse, time, meters }) => {
    // sky / grid time
    skyUniforms.uTime.value = time;
    gridUniforms.uTime.value = time;
    const kickMeter = meters ? meters.kick : 0;
    if (meters) {
      skyUniforms.uKick.value = kickMeter;
      gridUniforms.uKick.value = kickMeter;
      skyUniforms.uHat.value = meters.hat || 0;
      gridUniforms.uHat.value = meters.hat || 0;
    }
    // tv screen
    screenUniforms.uTime.value = time;
    screenUniforms.uKick.value = kickMeter;
    screenUniforms.uBass.value = meters ? (meters.bass || 0) : 0;
    screenUniforms.uHat.value = meters ? (meters.hat || 0) : 0;
    drawScreen(time);
    // spin geometry
    pyramid.rotation.y = time * 0.3;
    pyramid.position.y = 3 + Math.sin(time * 0.7) * 0.2;
    torus.rotation.z = time * 0.5;
    torus.position.y = 4 + Math.cos(time * 0.6) * 0.2;
    // particles
    partMat.size = 0.06 + kickMeter * 0.1;
    // PALM TREES — wind sway on kick
    for (const p of palmRefs) {
      const sway = kickMeter * 0.25;
      const ambientSway = Math.sin(time * 0.7 + p.baseX) * 0.05;
      for (const leaf of p.leaves) {
        leaf.rotation.z = leaf.userData.baseRot.z + sway * (Math.random() - 0.5) * 0.5 + ambientSway;
        leaf.rotation.x = leaf.userData.baseRot.x + Math.cos(time * 0.5 + p.baseX) * 0.04;
      }
      p.crownBall.position.x = Math.sin(time * 0.6 + p.baseX) * 0.1;
      p.crownBall.position.z = Math.cos(time * 0.4 + p.baseZ) * 0.1;
    }
    // BUST — react to kick (float up + tilt)
    if (meters && meters.kick > 0.3) {
      bustGroup.position.y = bustBaseY + meters.kick * 0.3;
      bustGroup.rotation.z = Math.sin(time * 4) * meters.kick * 0.15;
      bustGroup.rotation.x = Math.sin(time * 3) * meters.kick * 0.05;
    } else {
      bustGroup.position.y += (bustBaseY - bustGroup.position.y) * 0.15;
      bustGroup.rotation.z *= 0.9;
      bustGroup.rotation.x *= 0.9;
    }
    // TV glow react to beat
    tvGlow.intensity = 1.2 + kickMeter * 0.8;
    // neon flicker (rare)
    if (Math.random() < 0.005) {
      aest.light.intensity = 2;
      future.light.intensity = 2;
      palm.light.intensity = 2;
      year.light.intensity = 2;
    } else {
      aest.light.intensity = 0.6 + beatPulse * 0.3;
      future.light.intensity = 0.6 + beatPulse * 0.3;
      palm.light.intensity = 0.6 + beatPulse * 0.3;
      year.light.intensity = 0.6 + beatPulse * 0.3;
    }
  };

  const onBeat = (beat, bar) => {
    // pulse tv glow
    tvGlow.intensity = 2.0;
  };

  const onMeter = (meters) => {
    if (meters) {
      tvGlow.intensity = 1.2 + meters.kick * 0.8;
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
      bg: 0x2a0a55, fog: 0x1a0833,
      warm: 0xff71ce, cool: 0x01cdfe, accent: 0xb967ff,
    },
    cameraStart: { pos: { x: 0, y: 3.0, z: 8 }, target: { x: 0, y: 1.8, z: 0 } },
    update, onBeat, onMeter, dispose,
    setVisualMode,
  };
}
