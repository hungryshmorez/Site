import * as THREE from 'three';

// The Lab portal: a cramped porta-potty interior with an old CRT computer
// sitting on the toilet. You look around, then click the screen — the camera
// zooms into it and boots the Lab (its own page). Kept deliberately tiny and
// self-contained: while you're in here the whole festival stops rendering.

const std = (o) => new THREE.MeshStandardMaterial(o);

function crtScreenTexture() {
  const c = document.createElement('canvas'); c.width = 512; c.height = 384;
  const x = c.getContext('2d');
  x.fillStyle = '#02120a'; x.fillRect(0, 0, 512, 384);
  // faint scanlines
  x.fillStyle = 'rgba(0,0,0,0.35)';
  for (let y = 0; y < 384; y += 3) x.fillRect(0, y, 512, 1);
  x.fillStyle = '#39ff14'; x.shadowColor = '#39ff14'; x.shadowBlur = 8;
  x.font = 'bold 30px ui-monospace, monospace';
  x.fillText('12matt3r LABS', 26, 60);
  x.font = '18px ui-monospace, monospace';
  x.fillText('DreamOS v0.12  //  terminal', 26, 96);
  x.fillText('C:\\> load experiments...', 26, 150);
  x.fillText('  [ok] trippy cam', 26, 186);
  x.fillText('  [ok] dreamos tv', 26, 214);
  x.fillText('  [ok] deadnet', 26, 242);
  x.font = 'bold 20px ui-monospace, monospace';
  x.fillText('> CLICK TO ENTER THE LAB', 26, 320);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildLabPortal() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x05100a);
  scene.fog = new THREE.Fog(0x05100a, 1.5, 6);

  const g = new THREE.Group(); scene.add(g);

  // ---- the stall shell (cramped, blue-green plastic) ----
  const wallMat = std({ color: 0x1c3a4a, roughness: 0.9 });
  const wallMat2 = std({ color: 0x18323f, roughness: 0.9 });
  const W = 1.5, D = 1.5, H = 2.3;
  const floor = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, D), std({ color: 0x0e1a12, roughness: 1 }));
  floor.position.y = 0; floor.receiveShadow = true; g.add(floor);
  const ceil = new THREE.Mesh(new THREE.BoxGeometry(W, 0.06, D), wallMat2); ceil.position.y = H; g.add(ceil);
  const back = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.06), wallMat); back.position.set(0, H / 2, -D / 2); g.add(back);
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, H, D), wallMat2); left.position.set(-W / 2, H / 2, 0); g.add(left);
  const right = new THREE.Mesh(new THREE.BoxGeometry(0.06, H, D), wallMat2); right.position.set(W / 2, H / 2, 0); g.add(right);
  const door = new THREE.Mesh(new THREE.BoxGeometry(W, H, 0.06), std({ color: 0x14303c, roughness: 0.85 })); door.position.set(0, H / 2, D / 2); g.add(door);
  // crescent-moon vent on the door
  const moon = new THREE.Mesh(new THREE.CircleGeometry(0.14, 24), std({ color: 0x0a1a10, emissive: new THREE.Color(0x2a5), emissiveIntensity: 0.2 }));
  moon.position.set(0, 1.85, D / 2 - 0.033); moon.rotation.y = Math.PI; g.add(moon);

  // ---- toilet (the computer sits on the closed lid) ----
  const seatMat = std({ color: 0x24424e, roughness: 0.8 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.5, 20), seatMat); base.position.set(0, 0.25, -0.38); g.add(base);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.33, 0.33, 0.08, 20), std({ color: 0x2c4d5a, roughness: 0.7 })); lid.position.set(0, 0.54, -0.38); g.add(lid);
  const tp = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.12, 16), std({ color: 0xe8e6de, roughness: 1 })); tp.rotation.z = Math.PI / 2; tp.position.set(-W / 2 + 0.14, 1.0, -0.3); g.add(tp);

  // ---- the old CRT computer ----
  const beige = std({ color: 0xcfc7ac, roughness: 0.8 });
  const beigeDark = std({ color: 0xb3ab90, roughness: 0.85 });
  const comp = new THREE.Group(); comp.position.set(0, 0.58, -0.34); g.add(comp);
  // monitor shell
  const shell = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.44, 0.42), beige); shell.position.set(0, 0.32, 0); shell.castShadow = true; comp.add(shell);
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.36, 0.04), beigeDark); bezel.position.set(0, 0.34, 0.2); comp.add(bezel);
  // the screen (emissive, the zoom target)
  const screenTex = crtScreenTexture();
  const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.36, 0.28), screenMat);
  screen.position.set(0, 0.34, 0.223); comp.add(screen);
  screen.userData.isLabScreen = true;
  // blinking cursor
  const cursor = new THREE.Mesh(new THREE.PlaneGeometry(0.018, 0.022), new THREE.MeshBasicMaterial({ color: 0x39ff14 }));
  cursor.position.set(-0.02, 0.24, 0.224); comp.add(cursor);
  // keyboard on the floor / lid front
  const kbd = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 0.16), beige); kbd.position.set(0, 0.02, 0.28); kbd.rotation.x = -0.05; comp.add(kbd);
  // screen glow light — gentle, so the beige monitor reads as beige, not neon
  const glow = new THREE.PointLight(0x39ff14, 0.8, 3, 2); glow.position.set(0, 0.92, 0.25); g.add(glow);

  // dim ambient so the room reads but the screen dominates
  scene.add(new THREE.AmbientLight(0x2a4a3d, 0.5));
  const top = new THREE.PointLight(0x9fd8c0, 0.5, 4, 2); top.position.set(0, H - 0.2, 0.2); scene.add(top);

  // camera pose while standing in the stall (looking at the screen)
  const eye = new THREE.Vector3(0.12, 1.5, 0.42);
  const screenWorld = new THREE.Vector3(0, 0.92, -0.117); // comp origin + screen offset
  // zoom target: right up against the glass
  const zoomEye = new THREE.Vector3(0, 0.92, 0.02);

  function update(dt, time) {
    // CRT flicker + blink
    glow.intensity = 0.72 + Math.sin(time * 30) * 0.05 + Math.random() * 0.04;
    cursor.visible = (time % 1) < 0.5;
  }

  return { scene, update, screen, eye, lookAt: screenWorld, zoomEye };
}
