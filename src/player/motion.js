// Shared reduced-motion + mute UI wiring, used by every walkable world so
// this one pattern (matchMedia + #rmbtn/#mutebtn buttons) doesn't get
// hand-copied per world. Originally only main.js had this; see CLAUDE
// audit notes on cross-page consistency.

// Reads prefers-reduced-motion, wires the #rmbtn toggle (if present on the
// page), and keeps body.rm in sync so worlds can key off a CSS class too.
export function createReducedMotion(body = document.body) {
  let value = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const btn = document.getElementById('rmbtn');
  const apply = (v) => {
    value = v;
    body.classList.toggle('rm', v);
    if (btn) btn.classList.toggle('active', v);
  };
  apply(value);
  if (btn) btn.onclick = () => apply(!value);
  return { get value() { return value; } };
}

// Wires the #mutebtn (if present) to one or more controllers exposing
// setMuted(bool) — an <audio> element wrapper, an ambience instance, a
// custom AudioContext master-gain wrapper, etc. Silently no-ops if the page
// has no #mutebtn (worlds with no audio don't add one).
export function wireMuteButton(controllers) {
  const list = Array.isArray(controllers) ? controllers : [controllers];
  const btn = document.getElementById('mutebtn');
  if (!btn) return { get value() { return false; } };
  let muted = false;
  const apply = (v) => {
    muted = v;
    for (const c of list) { if (c) c.setMuted(v); }
    btn.textContent = v ? '🔇 muted' : '🔊 sound';
    btn.classList.toggle('active', v);
  };
  btn.onclick = () => apply(!muted);
  return { get value() { return muted; } };
}

// Adapter: wraps a plain <audio> element so it can sit in the same
// controller list wireMuteButton() expects.
export function audioElMute(el) {
  return { setMuted: (v) => { if (el) el.muted = v; } };
}
