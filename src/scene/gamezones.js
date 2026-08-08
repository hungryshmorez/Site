import * as THREE from 'three';

// GAME ZONES — so mini-games (hoop, gallery, dunk tank, beer pong) no longer
// hijack your clicks the moment you wander near them. Instead: walk close and a
// prompt asks "Play X?"; confirm (button or E) and it walks you to the perfect
// spot facing the game and enters play-mode, where clicks throw. Leave with the
// ✕ button or Esc, or just walk away — then clicks go back to normal walking.
//
// The page's tap handler calls onTap() first: it returns true (tap consumed as a
// throw) only while a game is active, so ordinary taps always walk otherwise.

export function createGameZones({ controls, camera }) {
  const games = [];
  let active = null;   // the game currently being played
  let prompt = null;   // the game we're near + offering to start

  // --- prompt card (built in JS so it works on any page without HTML edits) ---
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;left:50%;bottom:104px;transform:translateX(-50%);z-index:30;display:none;pointer-events:none';
  const card = document.createElement('div');
  card.style.cssText = 'display:flex;gap:12px;align-items:center;background:rgba(8,8,16,.92);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:10px 14px;backdrop-filter:blur(8px);box-shadow:0 12px 40px rgba(0,0,0,.6);font:600 15px ui-monospace,monospace;color:#eaeaf5;pointer-events:auto';
  const label = document.createElement('span');
  const btn = document.createElement('button');
  btn.style.cssText = 'font:inherit;cursor:pointer;border-radius:8px;border:1px solid #00f3ff;background:rgba(0,243,255,.14);color:#9ff;padding:6px 14px;white-space:nowrap';
  card.append(label, btn); el.appendChild(card); document.body.appendChild(el);

  const show = (text, btnText, accent) => {
    label.textContent = text; btn.textContent = btnText;
    btn.style.borderColor = accent; btn.style.color = accent;
    el.style.display = 'block';
  };
  const hide = () => { el.style.display = 'none'; };

  function register(g) { games.push(g); } // {id,label,emoji,accent,near(pos),spot:{pos:[x,z],yaw},play(camera)}

  function enter(g) {
    active = g; prompt = null;
    const [sx, sz] = g.spot.pos;
    // walk over, then SNAP to the exact spot — walkTo otherwise stops ~2.4 units
    // short, which left you well back from where the game should place you.
    controls.walkTo(new THREE.Vector3(sx, controls.eye, sz), () => {
      controls.pos.x = sx; controls.pos.z = sz;
      if (g.spot.yaw != null) controls.yaw = g.spot.yaw;
      if (g.spot.pitch != null) controls.pitch = g.spot.pitch;
    });
    show(`${g.emoji} ${g.label} — aim & click to play`, 'leave ✕', g.accent || '#00f3ff');
  }
  function leave() { if (!active) return; active = null; hide(); }

  btn.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
  btn.addEventListener('click', (e) => { e.stopPropagation(); if (active) leave(); else if (prompt) enter(prompt); });

  addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if (e.key === 'Escape') { leave(); }
    else if (k === 'e') { if (!active && prompt) enter(prompt); }
  });

  // page tap handler calls this first; true => consumed (a throw), skip walking
  function onTap() {
    if (active) { active.play(camera); return true; }
    return false;
  }

  function update(pos) {
    if (active) {
      const [sx, sz] = active.spot.pos;
      if (Math.hypot(pos.x - sx, pos.z - sz) > 10) leave(); // wandered off → stop playing
      return;
    }
    let found = null;
    for (const g of games) if (g.near(pos)) { found = g; break; }
    if (found !== prompt) {
      prompt = found;
      if (prompt) show(`${prompt.emoji} Play ${prompt.label}?`, 'play ▸  (E)', prompt.accent || '#00f3ff');
      else hide();
    }
  }

  return { register, onTap, update, leave, isPlaying: () => !!active };
}
