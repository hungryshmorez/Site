// scene-lofi.js — Late Night Lo-Fi room
// 3D cozy dorm with vinyl, lamp, rain window, cat, books

import * as THREE from 'three';
import { makeBox, makeCylinder, makeSphere, makeTextSprite } from './helpers.js';

export function buildLofiRoom(scene, onObjectClick = () => {}) {
  const root = new THREE.Group();
  root.name = 'lofi-room';

  // ============ ROOM SHELL ============
  // floor
  const floor = makeBox(14, 0.2, 10, 0x2a1a10, { roughness: 0.9 });
  floor.position.set(0, -0.1, 0);
  floor.receiveShadow = true;
  root.add(floor);
  // back wall
  const backWall = makeBox(14, 6, 0.2, 0x3a2418, { roughness: 0.95 });
  backWall.position.set(0, 3, -5);
  backWall.receiveShadow = true;
  root.add(backWall);
  // left wall with window hole (we'll just do a wall + window frame overlay)
  const leftWall = makeBox(0.2, 6, 10, 0x2e1c10, { roughness: 0.95 });
  leftWall.position.set(-7, 3, 0);
  leftWall.receiveShadow = true;
  root.add(leftWall);
  // right wall
  const rightWall = makeBox(0.2, 6, 10, 0x2e1c10, { roughness: 0.95 });
  rightWall.position.set(7, 3, 0);
  rightWall.receiveShadow = true;
  root.add(rightWall);

  // ============ WINDOW (left wall) with rain shader ============
  const windowGroup = new THREE.Group();
  windowGroup.position.set(-6.85, 2.4, 0.2);
  root.add(windowGroup);
  // window frame
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x5a3a20, roughness: 0.7 });
  const frameTop = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 3.4), frameMat);
  frameTop.position.set(0, 1.7, 0);
  windowGroup.add(frameTop);
  const frameBot = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 3.4), frameMat);
  frameBot.position.set(0, -1.7, 0);
  windowGroup.add(frameBot);
  const frameL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.6, 0.2), frameMat);
  frameL.position.set(0, 0, -1.6);
  windowGroup.add(frameL);
  const frameR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.6, 0.2), frameMat);
  frameR.position.set(0, 0, 1.6);
  windowGroup.add(frameR);
  // window glass plane — night sky shader
  const skyUniforms = {
    uTime: { value: 0 },
    uHat: { value: 0 },
  };
  const skyMat = new THREE.ShaderMaterial({
    uniforms: skyUniforms,
    transparent: true,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uHat;
      varying vec2 vUv;
      // raindrop streak
      float rain(vec2 uv, float seed) {
        float x = fract(uv.x * 40.0 + seed * 13.0 + uTime * 0.4);
        float y = fract(uv.y * 30.0 - uTime * (0.6 + seed * 0.3) + seed * 7.0);
        float drop = smoothstep(0.02, 0.0, abs(x - 0.5));
        drop *= smoothstep(0.0, 0.5, y);
        return drop;
      }
      void main() {
        // night sky gradient (deep blue to teal)
        vec3 col1 = vec3(0.04, 0.06, 0.12);
        vec3 col2 = vec3(0.08, 0.15, 0.28);
        vec3 col = mix(col1, col2, vUv.y);
        // distant city lights
        float city = step(0.95, fract(vUv.x * 200.0)) * step(0.3, fract(vUv.y * 80.0));
        col += vec3(0.4, 0.25, 0.1) * city * 0.6 * vUv.y;
        // moon
        float d = distance(vUv, vec2(0.7, 0.7));
        col += vec3(0.9, 0.85, 0.7) * smoothstep(0.04, 0.0, d);
        // rain on glass
        float r = 0.0;
        for (int i = 0; i < 3; i++) {
          r += rain(vUv, float(i)) * (0.5 + uHat * 0.5);
        }
        col += vec3(0.4, 0.5, 0.7) * r * 0.3;
        // glass interior (warm glow from room)
        col += vec3(0.15, 0.08, 0.04) * (1.0 - vUv.y) * 0.2;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const skyMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 3.2), skyMat);
  skyMesh.position.set(0.08, 0, 0);
  windowGroup.add(skyMesh);
  scene.addClickable(skyMesh, 'window', () => onObjectClick('window'));

  // ============ DESK ============
  const desk = makeBox(4, 0.1, 1.6, 0x4a2818, { roughness: 0.8 });
  desk.position.set(1.5, 1.0, -3.2);
  desk.receiveShadow = true;
  desk.castShadow = true;
  root.add(desk);
  // desk legs
  for (const x of [-1.7, 1.7]) {
    for (const z of [-0.7, 0.7]) {
      const leg = makeBox(0.1, 1.0, 0.1, 0x3a1f10);
      leg.position.set(1.5 + x, 0.5, -3.2 + z);
      root.add(leg);
    }
  }

  // ============ LAMP on desk (pulses with beat) ============
  const lampGroup = new THREE.Group();
  lampGroup.position.set(2.8, 1.05, -3.2);
  root.add(lampGroup);
  const lampBase = makeCylinder(0.2, 0.25, 0.05, 16, 0x2a1a0e);
  lampBase.position.y = 0.03;
  lampGroup.add(lampBase);
  const lampArm = makeCylinder(0.03, 0.03, 0.7, 8, 0x1a1a1a);
  lampArm.position.y = 0.4;
  lampGroup.add(lampArm);
  const lampHead = makeCylinder(0.25, 0.15, 0.3, 16, 0xffd09a, { emissive: 0xffaa55, emissiveIntensity: 1.0 });
  lampHead.position.set(0.1, 0.85, 0);
  lampHead.rotation.z = 0.3;
  lampGroup.add(lampHead);
  // lamp glow
  const lampLight = new THREE.PointLight(0xffaa55, 1.5, 8, 1.5);
  lampLight.position.set(0.3, 0.9, 0);
  lampGroup.add(lampLight);
  scene.addClickable(lampGroup, 'lamp', () => onObjectClick('lamp'));

  // ============ COFFEE MUG on desk ============
  const mug = makeCylinder(0.1, 0.08, 0.18, 16, 0xeeeeee);
  mug.position.set(0.5, 1.18, -3.5);
  mug.castShadow = true;
  root.add(mug);
  // coffee surface (slightly recessed)
  const coffee = makeCylinder(0.09, 0.09, 0.005, 16, 0x2a1a0a);
  coffee.position.set(0.5, 1.265, -3.5);
  root.add(coffee);
  // coffee steam — particle system
  const steamCount = 40;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  const steamVel = new Float32Array(steamCount * 3);
  const steamLife = new Float32Array(steamCount);
  for (let i = 0; i < steamCount; i++) {
    steamPos[i * 3] = 0.5 + (Math.random() - 0.5) * 0.05;
    steamPos[i * 3 + 1] = 1.27 + Math.random() * 0.5;
    steamPos[i * 3 + 2] = -3.5 + (Math.random() - 0.5) * 0.05;
    steamVel[i * 3] = (Math.random() - 0.5) * 0.002;
    steamVel[i * 3 + 1] = 0.003 + Math.random() * 0.004;
    steamVel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    steamLife[i] = Math.random();
  }
  steamGeo.setAttribute('position', new THREE.BufferAttribute(steamPos, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.04,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const steam = new THREE.Points(steamGeo, steamMat);
  root.add(steam);
  scene.addClickable(mug, 'coffee', () => onObjectClick('coffee'));

  // ============ COMPUTER / SCREEN on desk ============
  const comp = makeBox(0.05, 0.5, 0.7, 0x111111, { emissive: 0x66aaff, emissiveIntensity: 0.2 });
  comp.position.set(0.5, 1.35, -3.7);
  comp.rotation.x = -0.1;
  root.add(comp);
  // code on screen — animated
  const codeCanvas = document.createElement('canvas');
  codeCanvas.width = 512; codeCanvas.height = 256;
  const codeCtx = codeCanvas.getContext('2d');
  const codeTex = new THREE.CanvasTexture(codeCanvas);
  const codeMat = new THREE.MeshBasicMaterial({ map: codeTex });
  const codePlane = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.68), codeMat);
  codePlane.position.set(0.51, 1.35, -3.69);
  codePlane.rotation.x = -0.1;
  root.add(codePlane);
  scene.addClickable(codePlane, 'computer', () => onObjectClick('computer'));
  // helper to draw code
  let codeScroll = 0;
  const drawCode = (t) => {
    codeCtx.fillStyle = '#0a1a2a';
    codeCtx.fillRect(0, 0, 512, 256);
    codeCtx.font = '14px monospace';
    const lines = [
      ['const', 'lofi', '=', 'new', 'Composer();'],
      ['lofi', '.', 'add', '(', ')', ';'],
      ['const', 'beat', '=', 'setInterval', '(', 'function', '()', '{'],
      ['  ', 'drums', '.', 'kick', '();'],
      ['  ', 'bass', '.', 'note', '(', 'A1', ');'],
      ['  ', 'chord', '.', 'stab', '(', ')', ';'],
      ['},', '60', '/', 'BPM', ');'],
      ['// ', '00:42 AM', ' —', ' rain on window'],
      ['// ', 'synth', ' pads', ' warm'],
      ['// ', 'keep', ' coding', '...'],
    ];
    for (let i = 0; i < lines.length; i++) {
      const y = (i * 22 - codeScroll) % 280 - 14;
      let x = 16;
      for (const tok of lines[i]) {
        if (tok === 'const' || tok === 'new' || tok === 'function' || tok === 'setInterval') codeCtx.fillStyle = '#ff79c6';
        else if (tok === '//' || tok.startsWith('//')) codeCtx.fillStyle = '#6272a4';
        else if (tok.match(/^[0-9]+$/)) codeCtx.fillStyle = '#bd93f9';
        else if (tok === '=' || tok === '(' || tok === ')' || tok === ';' || tok === '{' || tok === '}' || tok === ',') codeCtx.fillStyle = '#f8f8f2';
        else if (tok === 'lofi' || tok === 'beat' || tok === 'drums' || tok === 'bass' || tok === 'chord') codeCtx.fillStyle = '#50fa7b';
        else if (tok === '.' || tok === 'add' || tok === 'kick' || tok === 'note' || tok === 'stab') codeCtx.fillStyle = '#f1fa8c';
        else codeCtx.fillStyle = '#f8f8f2';
        codeCtx.fillText(tok, x, y);
        x += codeCtx.measureText(tok).width + 6;
      }
    }
    codeTex.needsUpdate = true;
  };
  drawCode(0);

  // ============ VINYL TURNTABLE (right side of room) ============
  const ttGroup = new THREE.Group();
  ttGroup.position.set(4, 0.85, -2.8);
  root.add(ttGroup);
  // base
  const ttBase = makeBox(0.9, 0.1, 0.7, 0x1a0e08, { roughness: 0.5, metalness: 0.3 });
  ttGroup.add(ttBase);
  // record
  const record = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.32, 0.01, 64),
    new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.3, metalness: 0.4 })
  );
  record.position.y = 0.06;
  ttGroup.add(record);
  // record label
  const label = new THREE.Mesh(
    new THREE.CylinderGeometry(0.1, 0.1, 0.012, 32),
    new THREE.MeshStandardMaterial({ color: 0xff5070, emissive: 0xff3050, emissiveIntensity: 0.3 })
  );
  label.position.y = 0.061;
  ttGroup.add(label);
  // tonearm
  const armBase = makeCylinder(0.04, 0.04, 0.05, 8, 0xcccccc, { metalness: 0.8, roughness: 0.2 });
  armBase.position.set(0.32, 0.06, 0.2);
  ttGroup.add(armBase);
  const arm = makeBox(0.02, 0.02, 0.35, 0xcccccc, { metalness: 0.8, roughness: 0.2 });
  arm.position.set(0.22, 0.07, 0.05);
  arm.rotation.y = 0.5;
  ttGroup.add(arm);
  scene.addClickable(ttGroup, 'turntable', () => onObjectClick('turntable'));

  // ============ BOOKSHELF (back wall) ============
  const shelfGroup = new THREE.Group();
  shelfGroup.position.set(-3.5, 0, -4.7);
  root.add(shelfGroup);
  // shelf box
  const shelf = makeBox(2.4, 2.2, 0.3, 0x3a2010, { roughness: 0.8 });
  shelf.position.y = 1.1;
  shelfGroup.add(shelf);
  // books (varied colors)
  const bookColors = [0x8b3a3a, 0x3a5a8b, 0x3a8b3a, 0x8b6a3a, 0x5a3a8b, 0x8b3a6a, 0x2a2a2a];
  for (let row = 0; row < 3; row++) {
    let x = -1.0;
    for (let i = 0; i < 7; i++) {
      const h = 0.4 + Math.random() * 0.2;
      const w = 0.08 + Math.random() * 0.05;
      const book = makeBox(w, h, 0.2, bookColors[Math.floor(Math.random() * bookColors.length)]);
      book.position.set(x, 0.3 + row * 0.65 + h / 2, 0);
      x += w + 0.01;
      if (x > 1.0) break;
    }
  }
  scene.addClickable(shelfGroup, 'bookshelf', () => onObjectClick('bookshelf'));

  // ============ CAT (on rug, animated tail) ============
  const catGroup = new THREE.Group();
  catGroup.position.set(-1.5, 0.1, 1.5);
  catGroup.rotation.y = 0.7;
  root.add(catGroup);
  // body
  const catBody = makeSphere(0.18, 0x222222, { roughness: 0.7 });
  catBody.scale.set(1.4, 0.7, 0.8);
  catGroup.add(catBody);
  // head
  const catHead = makeSphere(0.12, 0x222222);
  catHead.position.set(0.22, 0.05, 0);
  catGroup.add(catHead);
  // ears
  for (const sx of [-0.06, 0.06]) {
    const ear = new THREE.Mesh(
      new THREE.ConeGeometry(0.04, 0.08, 4),
      new THREE.MeshStandardMaterial({ color: 0x222222 })
    );
    ear.position.set(0.22, 0.15, sx);
    catGroup.add(ear);
  }
  // eyes
  for (const sx of [-0.04, 0.04]) {
    const eye = new THREE.Mesh(
      new THREE.SphereGeometry(0.018, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x88ff66, emissive: 0x66ff44, emissiveIntensity: 0.5 })
    );
    eye.position.set(0.32, 0.06, sx);
    catGroup.add(eye);
  }
  // tail (animated)
  const tail = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.015, 0.35, 8),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
  );
  tail.position.set(-0.25, 0.08, 0);
  tail.rotation.z = 1.2;
  catGroup.add(tail);
  // legs
  for (const sx of [-0.08, 0.08]) {
    for (const sz of [-0.06, 0.06]) {
      const leg = makeSphere(0.04, 0x222222);
      leg.scale.set(0.6, 0.8, 0.6);
      leg.position.set(sx, -0.1, sz);
      catGroup.add(leg);
    }
  }
  // store refs for animation
  root.userData.cat = { group: catGroup, tail };

  // ============ RUG ============
  const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(3.5, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x6a3a1a, roughness: 0.95 })
  );
  rug.rotation.x = -Math.PI / 2;
  rug.position.set(0, 0.01, 1.5);
  root.add(rug);

  // ============ SPEAKERS (left and right) ============
  const speakerGeo = new THREE.BoxGeometry(0.4, 0.6, 0.35);
  for (const sx of [-4.5, 4.5]) {
    const spk = new THREE.Mesh(
      speakerGeo,
      new THREE.MeshStandardMaterial({ color: 0x2a1a10, roughness: 0.6 })
    );
    spk.position.set(sx, 0.3, -4.5);
    spk.castShadow = true;
    root.add(spk);
    // speaker cone
    const cone = new THREE.Mesh(
      new THREE.CircleGeometry(0.1, 16),
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.3, metalness: 0.2 })
    );
    cone.position.set(sx, 0.35, -4.32);
    root.add(cone);
    // tweeter
    const tw = new THREE.Mesh(
      new THREE.CircleGeometry(0.04, 12),
      new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.3 })
    );
    tw.position.set(sx, 0.5, -4.32);
    root.add(tw);
    scene.addClickable(spk, 'speaker', () => onObjectClick('speaker'));
  }

  // ============ LIGHTS ============
  const ambient = new THREE.AmbientLight(0xffd09a, 0.45);
  root.add(ambient);
  // warm key light from lamp area
  const keyLight = new THREE.PointLight(0xffaa55, 1.5, 12, 1.4);
  keyLight.position.set(2.8, 2.2, -3.0);
  root.add(keyLight);
  // cool fill from window
  const fillLight = new THREE.DirectionalLight(0x88aaff, 0.55);
  fillLight.position.set(-6, 4, 0);
  root.add(fillLight);
  // moon from window
  const moonLight = new THREE.SpotLight(0xaaccff, 0.7, 10, Math.PI / 3, 0.6);
  moonLight.position.set(-5, 3, 0);
  moonLight.target.position.set(0, 0, 2);
  root.add(moonLight);
  moonLight.target.updateMatrixWorld();
  root.add(moonLight.target);
  // soft fill from below (rear of camera)
  const rear = new THREE.PointLight(0x665544, 0.4, 8, 1.5);
  rear.position.set(0, 2, 5);
  root.add(rear);

  // ============ DUST PARTICLES (floating motes) ============
  const dustCount = 80;
  const dustGeo = new THREE.BufferGeometry();
  const dustPos = new Float32Array(dustCount * 3);
  const dustVel = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dustPos[i * 3] = (Math.random() - 0.5) * 10;
    dustPos[i * 3 + 1] = Math.random() * 3.5;
    dustPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    dustVel[i * 3] = (Math.random() - 0.5) * 0.005;
    dustVel[i * 3 + 1] = Math.random() * 0.003 + 0.001;
    dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
  }
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dustMat = new THREE.PointsMaterial({ color: 0xffd09a, size: 0.02, transparent: true, opacity: 0.4, depthWrite: false });
  const dust = new THREE.Points(dustGeo, dustMat);
  root.add(dust);

  // ============ UPDATE / ANIMATION ============
  const update = (dt, { beatPulse, time, meters }) => {
    // vinyl spin
    record.rotation.y = time * 0.5;
    label.rotation.y = time * 0.5;
    // cat tail
    if (root.userData.cat) {
      const t = time * 2;
      root.userData.cat.tail.rotation.z = 1.2 + Math.sin(t) * 0.4;
      root.userData.cat.group.position.y = 0.1 + Math.sin(t * 0.7) * 0.01;
    }
    // lamp pulse
    if (lampHead.material.emissiveIntensity !== undefined) {
      const baseI = 0.8;
      const pulse = beatPulse * 0.6 + (meters && meters.kick ? meters.kick * 0.4 : 0);
      lampHead.material.emissiveIntensity = baseI + pulse;
      lampLight.intensity = 1.2 + pulse;
    }
    // dust drift
    const pos = dust.geometry.attributes.position;
    for (let i = 0; i < dustCount; i++) {
      let x = pos.array[i * 3] + dustVel[i * 3];
      let y = pos.array[i * 3 + 1] + dustVel[i * 3 + 1];
      let z = pos.array[i * 3 + 2] + dustVel[i * 3 + 2];
      if (y > 4) y = 0;
      if (x > 5) x = -5; else if (x < -5) x = 5;
      if (z > 4) z = -4; else if (z < -4) z = 4;
      pos.array[i * 3] = x;
      pos.array[i * 3 + 1] = y;
      pos.array[i * 3 + 2] = z;
    }
    pos.needsUpdate = true;
    // rain shader
    skyUniforms.uTime.value = time;
    if (meters) skyUniforms.uHat.value = meters.hat;
    // coffee steam update
    const steamPosArr = steam.geometry.attributes.position;
    for (let i = 0; i < steamCount; i++) {
      steamLife[i] += dt * 0.3;
      if (steamLife[i] > 1) {
        steamLife[i] = 0;
        steamPosArr.array[i * 3] = 0.5 + (Math.random() - 0.5) * 0.05;
        steamPosArr.array[i * 3 + 1] = 1.27;
        steamPosArr.array[i * 3 + 2] = -3.5 + (Math.random() - 0.5) * 0.05;
      } else {
        steamPosArr.array[i * 3] += steamVel[i * 3] + Math.sin(time * 2 + i) * 0.001;
        steamPosArr.array[i * 3 + 1] += steamVel[i * 3 + 1];
        steamPosArr.array[i * 3 + 2] += steamVel[i * 3 + 2] + Math.cos(time * 1.5 + i) * 0.001;
      }
    }
    steamPosArr.needsUpdate = true;
    // steam intensity reacts to meters (more steam when music is active)
    steamMat.opacity = 0.3 + (meters ? meters.kick * 0.4 : 0);
    // code scroll
    codeScroll = (time * 8) % 280;
    drawCode(time);
  };

  const onBeat = (beat, bar) => {
    // could trigger additional pulse on speakers, etc.
  };

  const onMeter = (meters) => {
    // speakers bounce with bass/kick
    // we handle that via material emissive in update
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
      bg: 0x0a0807, fog: 0x1a1410,
      warm: 0xffaa55, cool: 0x88aaff, accent: 0xffd09a,
    },
    cameraStart: { pos: { x: 0, y: 2.4, z: 6.5 }, target: { x: 0, y: 1.6, z: -1 } },
    update, onBeat, onMeter, dispose,
  };
}
