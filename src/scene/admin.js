import * as THREE from 'three';

// ADMIN / LAYOUT EDITOR — drag any registered thing to reposition it on the
// ground, then Save (persists to localStorage so it sticks for you) or Copy
// (exports the coordinates so they can be baked into the source permanently).
//
// Toggle with the on-screen ✎ button, the `~` key, or ?admin=1 in the URL.
// Items are { id, label, obj, worldPos?, sprite? }: `obj` is the group moved,
// `worldPos` (optional) is kept in sync for click-to-walk targets, `sprite`
// (optional) is the floating label that moves with it.

export function createAdmin({ scene, camera, renderer, controls, worldId, items }) {
  const canvas = renderer.domElement;
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hit = new THREE.Vector3();
  let active = false, selected = null, dragging = false;

  // ---- persistence ----
  const KEY = 'admin_layout_' + worldId;
  const setItemPos = (it, x, z) => {
    it.obj.position.x = x; it.obj.position.z = z;
    if (it.worldPos) { it.worldPos.x = x; it.worldPos.z = z; }
    if (it.sprite) { it.sprite.position.x = x; it.sprite.position.z = z; }
  };
  function loadSaved() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      for (const it of items) if (saved[it.id]) setItemPos(it, saved[it.id][0], saved[it.id][1]);
    } catch (_) {}
  }
  function snapshot() {
    const o = {};
    for (const it of items) o[it.id] = [+it.obj.position.x.toFixed(1), +it.obj.position.z.toFixed(1)];
    return o;
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(snapshot())); flash('saved — your layout will persist'); }
  function reset() { localStorage.removeItem(KEY); flash('cleared saved layout — reload to see defaults'); }
  function exportText() {
    const snap = snapshot();
    const lines = items.map((it) => `  ${it.id}: [${snap[it.id][0]}, ${snap[it.id][1]}],`);
    return `// ${worldId} layout\n{\n${lines.join('\n')}\n}`;
  }

  loadSaved();

  // ---- UI panel ----
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:60;max-width:min(92vw,360px);font-family:ui-monospace,monospace;font-size:12px;color:#e6e6f0;background:rgba(8,8,18,.92);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px 12px;display:none;backdrop-filter:blur(6px)';
  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
      <b style="letter-spacing:.08em;color:#00f3ff">✎ LAYOUT EDITOR</b>
      <span id="ax-sel" style="margin-left:auto;color:#8a8aa0"></span>
    </div>
    <div style="color:#8a8aa0;line-height:1.5;margin-bottom:8px">Tap a thing to grab it, drag to move it. Positions are world units.</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px">
      <button id="ax-save" style="flex:1">💾 Save</button>
      <button id="ax-copy" style="flex:1">📋 Copy</button>
      <button id="ax-reset">↺ Reset</button>
      <button id="ax-done">✓ Done</button>
    </div>
    <textarea id="ax-out" readonly style="width:100%;height:86px;margin-top:8px;display:none;background:#05060f;color:#39ff14;border:1px solid rgba(255,255,255,.14);border-radius:8px;font-family:ui-monospace,monospace;font-size:11px;padding:6px"></textarea>
    <div id="ax-flash" style="color:#39ff14;margin-top:6px;min-height:15px"></div>`;
  document.body.appendChild(panel);
  for (const b of panel.querySelectorAll('button')) b.style.cssText = 'background:#141426;color:#e6e6f0;border:1px solid rgba(255,255,255,.16);border-radius:8px;padding:7px 10px;cursor:pointer';

  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = '✎';
  toggleBtn.title = 'Layout editor';
  toggleBtn.style.cssText = 'position:fixed;left:10px;bottom:10px;z-index:59;width:44px;height:44px;border-radius:12px;background:rgba(8,8,18,.85);color:#00f3ff;border:1px solid rgba(0,243,255,.35);font-size:20px;cursor:pointer';
  document.body.appendChild(toggleBtn);

  const selEl = panel.querySelector('#ax-sel');
  const outEl = panel.querySelector('#ax-out');
  const flashEl = panel.querySelector('#ax-flash');
  let flashT = 0;
  function flash(m) { flashEl.textContent = m; flashT = 3; }

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
    active = on;
    panel.style.display = on ? 'block' : 'none';
    toggleBtn.style.display = on ? 'none' : 'block';
    selected = null; updateSel();
  }
  function updateSel() {
    selEl.textContent = selected ? `${selected.label}  (${selected.obj.position.x.toFixed(1)}, ${selected.obj.position.z.toFixed(1)})` : 'tap a thing';
    for (const it of items) if (it.sprite) it.sprite.material.opacity = (selected && it === selected) ? 1 : 0.85;
  }

  addEventListener('keydown', (e) => { if (e.key === '~' || e.key === '`') setActive(!active); });

  // ---- tap handling: 1st tap on a thing selects it, next tap on the ground
  // moves it there. Walking + looking stay normal, so you can roam the map.
  // Returns true if it consumed the tap. ----
  function tap(e) {
    if (!active) return false;
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    let best = null, bestD = Infinity;
    for (const it of items) {
      const ints = ray.intersectObject(it.obj, true);
      if (ints.length && ints[0].distance < bestD) { bestD = ints[0].distance; best = it; }
    }
    if (best && best !== selected) { selected = best; flash('grabbed ' + best.label + ' — tap the ground to place it'); }
    else if (selected && ray.ray.intersectPlane(ground, hit)) { setItemPos(selected, hit.x, hit.z); flash(`${selected.label} → ${hit.x.toFixed(1)}, ${hit.z.toFixed(1)}`); }
    else if (best) { selected = best; }
    updateSel();
    return true;
  }

  function update(dt) { if (flashT > 0) { flashT -= dt; if (flashT <= 0) flashEl.textContent = ''; } }

  if (new URLSearchParams(location.search).has('admin')) setActive(true);

  return { get active() { return active; }, setActive, tap, update, items };
}
