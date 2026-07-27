import * as THREE from 'three';

// ADMIN / LAYOUT EDITOR — enter it and the camera lifts to a top-down overview
// (the map angle). Tap a thing to select it; tap the ground to move it there.
// Rename it and change the link it opens from the panel. Save persists to
// localStorage; Copy exports name/link/position so it can be baked into source.
//
// Toggle with the ✎ button, the `~` key, or ?admin=1 in the URL.
// Items: { id, label, obj, worldPos?, sprite?, dest? }.
//   obj      — the group that gets moved
//   worldPos — (optional) kept in sync for click-to-walk targets
//   sprite   — (optional) floating label; moves + renames with the item
//   dest     — (optional) destination data object, so name + link are editable

export function createAdmin({ scene, camera, renderer, controls, worldId, items }) {
  const canvas = renderer.domElement;
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hit = new THREE.Vector3();
  let active = false, selected = null;

  // ---- overhead camera (the map view) ----
  const cam = new THREE.OrthographicCamera(-40, 40, 30, -30, 0.5, 400);
  cam.position.set(0, 120, -1); cam.up.set(0, 0, -1); cam.lookAt(0, 0, -1);
  function fit() {
    const a = innerWidth / innerHeight, ax = 34, az = 30;
    let hw, hh;
    if (a >= ax / az) { hh = az; hw = az * a; } else { hw = ax; hh = ax / a; }
    cam.left = -hw; cam.right = hw; cam.top = hh; cam.bottom = -hh; cam.updateProjectionMatrix();
  }
  fit();

  // brighten + de-fog while overhead so the layout reads (like the map render)
  let savedFog = null; const lights = [];
  function lightsOn() {
    savedFog = scene.fog; scene.fog = null;
    const a = new THREE.AmbientLight(0xffffff, 1.3);
    const h = new THREE.HemisphereLight(0xffffff, 0x606880, 1.0);
    const d = new THREE.DirectionalLight(0xffffff, 1.6); d.position.set(40, 120, 20);
    scene.add(a, h, d); lights.push(a, h, d);
  }
  function lightsOff() { for (const l of lights) scene.remove(l); lights.length = 0; if (savedFog !== null) scene.fog = savedFog; }

  // ---- persistence ----
  const KEY = 'admin_layout_' + worldId;
  const linkField = (d) => (d && d.url !== undefined ? 'url' : d && d.page !== undefined ? 'page' : null);
  const getLink = (d) => { const f = linkField(d); return f ? d[f] : ''; };
  function setItemPos(it, x, z) {
    it.obj.position.x = x; it.obj.position.z = z;
    if (it.worldPos) { it.worldPos.x = x; it.worldPos.z = z; }
    if (it.sprite) { it.sprite.position.x = x; it.sprite.position.z = z; }
  }
  function setItemName(it, name) {
    it.label = name;
    if (it.sprite && it.sprite.userData.setText) it.sprite.userData.setText(name);
    if (it.dest) it.dest.name = name;
  }
  function setItemLink(it, url) { const f = linkField(it.dest); if (f) it.dest[f] = url; }

  function loadSaved() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (_) {}
    for (const it of items) {
      const s = saved[it.id]; if (!s) continue;
      if (s.pos) setItemPos(it, s.pos[0], s.pos[1]);
      if (s.name) setItemName(it, s.name);
      if (s.link) setItemLink(it, s.link);
    }
  }
  function snapshot() {
    const o = {};
    for (const it of items) {
      const e = { pos: [+it.obj.position.x.toFixed(1), +it.obj.position.z.toFixed(1)], name: it.label };
      const lk = getLink(it.dest); if (lk) e.link = lk;
      o[it.id] = e;
    }
    return o;
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(snapshot())); flash('saved — your layout will persist'); }
  function reset() { localStorage.removeItem(KEY); flash('cleared — reload for defaults'); }
  function exportText() {
    const snap = snapshot();
    const rows = items.map((it) => {
      const e = snap[it.id];
      return `  ${it.id}: { name: ${JSON.stringify(e.name)}, pos: [${e.pos[0]}, ${e.pos[1]}]${e.link ? `, link: ${JSON.stringify(e.link)}` : ''} },`;
    });
    return `// ${worldId} layout\n{\n${rows.join('\n')}\n}`;
  }

  loadSaved();

  // ---- UI panel ----
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:60;width:min(92vw,340px);font-family:ui-monospace,monospace;font-size:12px;color:#e6e6f0;background:rgba(8,8,18,.93);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px 12px;display:none;backdrop-filter:blur(6px)';
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <b style="letter-spacing:.08em;color:#00f3ff">✎ LAYOUT EDITOR</b>
      <span id="ax-sel" style="margin-left:auto;color:#8a8aa0;font-size:11px"></span>
    </div>
    <div id="ax-edit" style="display:none;margin:2px 0 8px">
      <label style="color:#8a8aa0;display:block;margin-bottom:3px">name</label>
      <input id="ax-name" style="width:100%;margin-bottom:6px"/>
      <div id="ax-linkwrap"><label style="color:#8a8aa0;display:block;margin-bottom:3px">link</label>
      <input id="ax-link" placeholder="https:// or page.html"/></div>
    </div>
    <div style="color:#8a8aa0;line-height:1.5;margin-bottom:8px" id="ax-help">Tap a thing to grab it, then tap the ground to move it.</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      <button id="ax-save" style="flex:1">💾 Save</button>
      <button id="ax-copy" style="flex:1">📋 Copy</button>
      <button id="ax-reset">↺ Reset</button>
      <button id="ax-done">✓ Done</button>
    </div>
    <textarea id="ax-out" readonly style="width:100%;height:80px;margin-top:8px;display:none;background:#05060f;color:#39ff14;border:1px solid rgba(255,255,255,.14);border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;padding:6px"></textarea>
    <div id="ax-flash" style="color:#39ff14;margin-top:6px;min-height:15px"></div>`;
  document.body.appendChild(panel);
  for (const b of panel.querySelectorAll('button')) b.style.cssText = 'background:#141426;color:#e6e6f0;border:1px solid rgba(255,255,255,.16);border-radius:8px;padding:7px 10px;cursor:pointer';
  for (const i of panel.querySelectorAll('input')) i.style.cssText = 'width:100%;background:#05060f;color:#e6e6f0;border:1px solid rgba(255,255,255,.16);border-radius:7px;padding:6px 8px;font-family:ui-monospace,monospace;font-size:12px';

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '✎'; toggleBtn.title = 'Layout editor';
  toggleBtn.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:59;width:44px;height:44px;border-radius:12px;background:rgba(8,8,18,.85);color:#00f3ff;border:1px solid rgba(0,243,255,.35);font-size:20px;cursor:pointer';
  document.body.appendChild(toggleBtn);

  const selEl = panel.querySelector('#ax-sel');
  const editEl = panel.querySelector('#ax-edit');
  const nameEl = panel.querySelector('#ax-name');
  const linkEl = panel.querySelector('#ax-link');
  const linkWrap = panel.querySelector('#ax-linkwrap');
  const outEl = panel.querySelector('#ax-out');
  const flashEl = panel.querySelector('#ax-flash');
  let flashT = 0;
  function flash(m) { flashEl.textContent = m; flashT = 3; }

  nameEl.addEventListener('input', () => { if (selected) { setItemName(selected, nameEl.value); updateSel(); } });
  linkEl.addEventListener('input', () => { if (selected) setItemLink(selected, linkEl.value); });
  panel.querySelector('#ax-save').onclick = save;
  panel.querySelector('#ax-reset').onclick = reset;
  panel.querySelector('#ax-copy').onclick = () => {
    const t = exportText(); outEl.style.display = 'block'; outEl.value = t; outEl.select();
    if (navigator.clipboard) navigator.clipboard.writeText(t).then(() => flash('copied to clipboard'), () => flash('select the text + copy'));
    else flash('select the text above + copy');
  };
  panel.querySelector('#ax-done').onclick = () => setActive(false);
  toggleBtn.onclick = () => setActive(!active);

  function setActive(on) {
    if (on === active) return;
    active = on;
    panel.style.display = on ? 'block' : 'none';
    toggleBtn.style.display = on ? 'none' : 'block';
    selected = null; updateSel();
    if (controls) controls.enabled = !on; // freeze first-person; overhead cam takes over
    if (on) { fit(); lightsOn(); } else { lightsOff(); }
  }
  function updateSel() {
    selEl.textContent = selected ? `(${selected.obj.position.x.toFixed(1)}, ${selected.obj.position.z.toFixed(1)})` : '';
    editEl.style.display = selected ? 'block' : 'none';
    if (selected) {
      nameEl.value = selected.label || '';
      const f = linkField(selected.dest);
      linkWrap.style.display = f ? 'block' : 'none';
      if (f) linkEl.value = getLink(selected.dest);
    }
    for (const it of items) if (it.sprite) it.sprite.material.opacity = (selected === it) ? 1 : 0.8;
  }

  addEventListener('keydown', (e) => { const t = e.target.tagName; if ((e.key === '~' || e.key === '`') && t !== 'INPUT' && t !== 'TEXTAREA') setActive(!active); });

  // ---- tap: select a thing, or place the selected one on the ground ----
  function tap(e) {
    if (!active) return false;
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, cam);
    let best = null, bestD = Infinity;
    for (const it of items) {
      const ints = ray.intersectObject(it.obj, true);
      if (ints.length && ints[0].distance < bestD) { bestD = ints[0].distance; best = it; }
    }
    if (best && best !== selected) { selected = best; flash('grabbed ' + best.label + ' — tap the ground to place'); }
    else if (selected && ray.ray.intersectPlane(ground, hit)) { setItemPos(selected, hit.x, hit.z); flash(`${selected.label} → ${hit.x.toFixed(1)}, ${hit.z.toFixed(1)}`); }
    else if (best) selected = best;
    updateSel();
    return true;
  }

  function update(dt) { if (flashT > 0) { flashT -= dt; if (flashT <= 0) flashEl.textContent = ''; } }

  addEventListener('resize', fit);
  if (new URLSearchParams(location.search).has('admin')) setActive(true);

  return { get active() { return active; }, get cam() { return cam; }, setActive, tap, update, fit, items };
}
