import * as THREE from 'three';

// A reusable HIDDEN-COLLECTIBLE hunt: scatter a handful of glowing floating
// tokens across a world, tucked among the scenery. Walk near one or click it to
// collect it; collecting the whole set fires onComplete (a reward). Progress
// persists per world in localStorage. Self-contained: it injects its own small
// HUD pill (top-centre) so no per-world HTML is needed.
//
//   const hunt = buildCollectible(scene, { spots:[[x,z]…], store:'12m.vinyl.block', onComplete });
//   // in the loop:  hunt.update(dt, t, controls.pos)
//   // on tap:       hunt.tryClick(raycaster)
export function buildCollectible(scene, {
  spots = [], groundY = null, y = 1.4, store = null,
  label = 'GOLDEN VINYL', emoji = '🪩', color = 0xffd24a,
  reach = 2.2, onComplete, onPickup,
} = {}) {
  const col = new THREE.Color(color);
  const root = new THREE.Group(); scene.add(root);

  let collected = new Set();
  if (store) { try { collected = new Set(JSON.parse(localStorage.getItem(store) || '[]')); } catch (e) {} }
  const persist = () => { if (store) { try { localStorage.setItem(store, JSON.stringify([...collected])); } catch (e) {} } };

  const items = [];
  spots.forEach((p, i) => {
    const gy = (groundY ? (groundY(p[0], p[1], 400) ?? 0) : 0) + y;
    const g = new THREE.Group(); g.position.set(p[0], gy, p[1]); root.add(g);
    // a vinyl record: black disc + coloured label + glossy sheen
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.04, 32), new THREE.MeshStandardMaterial({ color: 0x08080c, roughness: 0.25, metalness: 0.5, emissive: col.clone().multiplyScalar(0.15), emissiveIntensity: 0.6 }));
    disc.rotation.x = Math.PI / 2.3; g.add(disc);
    const lab = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24), new THREE.MeshStandardMaterial({ color, emissive: col, emissiveIntensity: 0.8, roughness: 0.4 }));
    lab.rotation.x = Math.PI / 2.3; g.add(lab);
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(halo);
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.16, 2.2, 8, 1, true), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.14, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); beam.position.y = 1.2; g.add(beam);
    const light = new THREE.PointLight(color, 1.6, 7, 2); g.add(light);
    const proxy = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ visible: false })); g.add(proxy);
    const it = { i, group: g, disc, lab, halo, beam, proxy, baseY: gy, phase: Math.random() * 6.283, taken: collected.has(i) };
    if (it.taken) g.visible = false;
    items.push(it);
  });

  const total = items.length;
  const state = () => ({ total, found: collected.size, done: collected.size >= total });

  // ---- injected HUD pill ----
  const hud = document.createElement('div');
  hud.style.cssText = 'position:fixed;left:50%;top:12px;transform:translateX(-50%);z-index:40;font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.12em;color:#e6e6f0;background:rgba(8,8,18,.6);border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:6px 14px;backdrop-filter:blur(6px);opacity:0;transition:opacity .4s;pointer-events:none';
  document.body.appendChild(hud);
  let hudT = 0;
  function showHud(msg) { hud.textContent = msg; hud.style.opacity = '1'; hudT = 3.5; }
  function hudLine() { const s = state(); return `${emoji} ${label}  ${s.found} / ${s.total}`; }
  if (collected.size > 0 && collected.size < total) showHud(hudLine());

  function pickup(it) {
    if (it.taken) return false;
    it.taken = true; it.group.visible = false; collected.add(it.i); persist();
    const s = state();
    onPickup && onPickup(s);
    showHud(s.done ? `${emoji} all ${total} found!` : hudLine());
    if (s.done) { setTimeout(() => { onComplete && onComplete(s); }, 300); }
    return true;
  }

  function update(dt, t, playerPos) {
    for (const it of items) {
      if (it.taken) continue;
      it.group.rotation.y += dt * 1.1;
      it.group.position.y = it.baseY + Math.sin(t * 1.6 + it.phase) * 0.18;
      const tw = 0.5 + 0.5 * Math.sin(t * 2.4 + it.phase);
      it.halo.scale.setScalar(1 + tw * 0.3); it.beam.material.opacity = 0.08 + tw * 0.12;
      if (playerPos && Math.hypot(playerPos.x - it.group.position.x, playerPos.z - it.group.position.z) < reach) pickup(it);
    }
    if (hudT > 0) { hudT -= dt; if (hudT <= 0) hud.style.opacity = '0'; }
  }
  function tryClick(raycaster) {
    for (const it of items) { if (!it.taken && raycaster.intersectObject(it.proxy, false)[0]) { pickup(it); return true; } }
    return false;
  }
  return { update, tryClick, state, group: root };
}
