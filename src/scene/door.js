import * as THREE from 'three';

// A real DOOR you walk through — a framed portal with sliding panels, a lit lintel
// sign naming where it leads, and an accent glow. Walk into it (or tap it) and it
// warps to the destination page. Used to chain the complex rooms into one big loop.
//
//   const d = buildDoor(scene, { x, z, ry, label, color, url });
//   // in the loop:  d.update(dt, t, playerPos);  d.tryEnter(playerPos);
//   // on tap:       d.tap(raycaster)

const std = (o) => new THREE.MeshStandardMaterial(o);

function textPlane(text, color, w = 512, h = 72) {
  const c = document.createElement('canvas'); c.width = w; c.height = h; const x = c.getContext('2d');
  x.font = `bold ${Math.round(h * 0.42)}px ui-monospace, monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 18; x.fillStyle = color; x.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// warp to another page using the room's #warp overlay if it has one
export function warpTo(url) {
  if (!url) return;
  const w = document.getElementById('warp');
  if (w) { w.classList.add('go'); setTimeout(() => { window.location.href = url; }, 460); }
  else window.location.href = url;
}

export function buildDoor(scene, {
  x = 0, z = 0, y = 0, ry = 0,     // position + facing (door opening faces +Z before ry rotation); y lifts it onto a landing
  label = '', sub = '',           // lintel sign + small subtitle
  color = 0x8a5cff,               // accent colour
  url = null,                     // destination page
  width = 3.0, height = 3.4,      // opening size
  enterRadius = 1.5,              // walk within this of the doorway → go through
  wall = false,                   // draw a bit of surrounding wall around the frame
} = {}) {
  const col = new THREE.Color(color);
  const g = new THREE.Group(); g.position.set(x, y, z); g.rotation.y = ry; scene.add(g);
  const jw = 0.34;                 // jamb width
  const frameMat = std({ color: 0x14141c, roughness: 0.6, metalness: 0.5, emissive: col.clone().multiplyScalar(0.25), emissiveIntensity: 0.6 });
  // jambs + lintel
  const jl = new THREE.Mesh(new THREE.BoxGeometry(jw, height, 0.5), frameMat); jl.position.set(-width / 2 - jw / 2, height / 2, 0); jl.castShadow = true; g.add(jl);
  const jr = jl.clone(); jr.position.x = width / 2 + jw / 2; g.add(jr);
  const lin = new THREE.Mesh(new THREE.BoxGeometry(width + jw * 2, 0.5, 0.5), frameMat); lin.position.set(0, height + 0.25, 0); g.add(lin);
  // optional surrounding wall slab (so a door in the open reads as set into a wall)
  if (wall) {
    const wm = std({ color: 0x0c0c14, roughness: 0.9, emissive: col.clone().multiplyScalar(0.06), emissiveIntensity: 0.4 });
    const ww = 3.2;
    const wl = new THREE.Mesh(new THREE.BoxGeometry(ww, height + 0.7, 0.4), wm); wl.position.set(-width / 2 - jw - ww / 2, (height + 0.7) / 2, 0); g.add(wl);
    const wr = wl.clone(); wr.position.x = width / 2 + jw + ww / 2; g.add(wr);
    const wt = new THREE.Mesh(new THREE.BoxGeometry(width + jw * 2 + ww * 2, 1.2, 0.4), wm); wt.position.set(0, height + 0.5 + 0.6, 0); g.add(wt);
  }
  // sliding double panels (open as you approach)
  const panelMat = std({ color: 0x0a0a12, roughness: 0.35, metalness: 0.4, emissive: col.clone().multiplyScalar(0.18), emissiveIntensity: 0.5 });
  const pL = new THREE.Mesh(new THREE.BoxGeometry(width / 2, height - 0.1, 0.14), panelMat); pL.position.set(-width / 4, height / 2, 0); g.add(pL);
  const pR = new THREE.Mesh(new THREE.BoxGeometry(width / 2, height - 0.1, 0.14), panelMat); pR.position.set(width / 4, height / 2, 0); g.add(pR);
  // a glowing seam + threshold strip on the floor
  const seam = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  seam.rotation.x = -Math.PI / 2; seam.position.set(0, 0.03, 0); g.add(seam);
  // a soft "welcome mat" of light on the approach side + chevrons drawing you in
  const mat = new THREE.Mesh(new THREE.PlaneGeometry(width + 0.6, 3.2), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  mat.rotation.x = -Math.PI / 2; mat.position.set(0, 0.02, 1.7); g.add(mat);
  const chevs = [];
  for (let i = 0; i < 3; i++) { const ch = textPlane('▾', '#' + col.getHexString(), 64, 64); ch.rotation.x = -Math.PI / 2; ch.position.set(0, 0.04, 2.6 - i * 0.7); ch.scale.set(0.6, 0.6, 1); g.add(ch); chevs.push({ ch, ph: i * 0.5 }); }
  // inner glow so the opening reads as lit from within
  const inner = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.2, height - 0.4), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  inner.position.set(0, height / 2, -0.2); g.add(inner);
  // lit lintel sign + backing bar
  if (label) {
    const bar = new THREE.Mesh(new THREE.BoxGeometry(width + jw * 2, 0.7, 0.12), std({ color: 0x08080e, roughness: 0.5, emissive: col.clone().multiplyScalar(0.4), emissiveIntensity: 0.6 })); bar.position.set(0, height + 0.85, 0.24); g.add(bar);
    const s = textPlane(label, '#' + col.getHexString(), 512, 64); s.position.set(0, height + 0.85, 0.32); s.scale.set(Math.min(6.2, Math.max(2.4, label.length * 0.34)), 0.62, 1); g.add(s);
  }
  if (sub) { const s2 = textPlane(sub, '#9fb0d8', 512, 44); s2.position.set(0, height + 0.35, 0.34); s2.scale.set(3.4, 0.3, 1); g.add(s2); }
  // accent light in the doorway + a spill onto the approach
  const gl = new THREE.PointLight(color, 2.4, 10, 2); gl.position.set(0, height * 0.6, 0.4); g.add(gl);
  const spill = new THREE.PointLight(color, 1.4, 8, 2); spill.position.set(0, 1.2, 2.2); g.add(spill);

  // tap proxy spanning the opening
  const proxy = new THREE.Mesh(new THREE.BoxGeometry(width + jw, height, 1.2), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(x, y + height / 2, z); proxy.rotation.y = ry; scene.add(proxy);

  const doorPos = new THREE.Vector3(x, 0, z);
  let open = 0, fired = false, armed = false;   // 'armed' guards against instant re-trigger when you spawn on a door
  function go() { if (fired || !url) return; fired = true; warpTo(url); }

  function update(dt, t, playerPos) {
    // open the panels when the player is near
    const d = playerPos ? Math.hypot(playerPos.x - x, playerPos.z - z) : 99;
    if (d > enterRadius + 1.1) armed = true;     // once you've stepped clear, walking back in counts
    const want = d < 4 ? 1 : 0;
    open += (want - open) * Math.min(1, dt * 6);
    pL.position.x = -width / 4 - open * (width / 2 - 0.05);
    pR.position.x = width / 4 + open * (width / 2 - 0.05);
    gl.intensity = 1.8 + open * 1.2 + Math.sin(t * 3) * 0.3;
    seam.material.opacity = 0.35 + Math.sin(t * 4) * 0.12 + open * 0.2;
    mat.material.opacity = 0.1 + open * 0.14 + Math.sin(t * 3) * 0.03;
    spill.intensity = 0.8 + open * 1.4;
    for (const c of chevs) c.ch.material.opacity = 0.35 + 0.5 * Math.max(0, Math.sin(t * 3 - c.ph * 2.2));   // marching toward the door
  }
  function tryEnter(playerPos) {
    if (!playerPos || !armed) return false;
    if (Math.hypot(playerPos.x - x, playerPos.z - z) < enterRadius) { go(); return true; }
    return false;
  }
  function near(playerPos, r = 3.2) { return playerPos && Math.hypot(playerPos.x - x, playerPos.z - z) < r; }
  function tap(raycaster) { if (raycaster.intersectObject(proxy, false)[0]) { go(); return true; } return false; }

  return { group: g, proxy, pos: doorPos, label, url, update, tryEnter, near, tap, go };
}
