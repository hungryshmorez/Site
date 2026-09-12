import * as THREE from 'three';

// A short cinematic intro for the festival: on ENTER the camera sweeps in high
// over the grounds, swoops down through the crowd toward the stage, then rises
// and settles exactly at the player's spawn — where it hands control to the
// walk controls. A glitch title reveals over the top. Skippable; callers skip
// it entirely for returning visitors / reduced motion.

const V = (a) => new THREE.Vector3(a[0], a[1], a[2]);
const smooth = (t) => t * t * (3 - 2 * t);

export function createIntro(camera, { spawn, onDone }) {
  // final keyframe = the spawn pose, so the hand-off to walk controls is seamless
  const sp = V(spawn.pos);
  const dir = new THREE.Vector3(-Math.sin(spawn.yaw), 0, -Math.cos(spawn.yaw));
  const spLook = sp.clone().addScaledVector(dir, 8); spLook.y = 1.4;

  const KF = [
    { t: 0.0, pos: [30, 22, 36], look: [0, 6, -16] },   // high, wide over the grounds
    { t: 3.2, pos: [2, 9, 12], look: [0, 4, -26] },      // swoop over the crowd to the stage
    { t: 5.6, pos: [-7, 3.2, -12], look: [0, 4.6, -26] }, // low among the front crowd
    { t: 7.6, pos: [-15, 4.5, 4], look: [-3, 2, -22] },  // rise + turn back to the grounds
    { t: 9.4, pos: spawn.pos, look: [spLook.x, spLook.y, spLook.z] }, // settle at spawn
  ];
  const DUR = KF[KF.length - 1].t;

  // ---- injected overlay (title + skip) ----
  const style = document.createElement('style');
  style.textContent = `
  #introOv{position:fixed;inset:0;z-index:35;pointer-events:none;display:flex;flex-direction:column;
    align-items:center;justify-content:center;gap:10px;font-family:ui-monospace,"JetBrains Mono",Menlo,monospace;
    opacity:0;transition:opacity .6s}
  #introOv.on{opacity:1}
  #introOv .t{font-size:clamp(44px,11vw,120px);letter-spacing:.06em;color:#eaf6ff;font-weight:800;
    text-shadow:3px 0 #ff0055,-3px 0 #00f3ff;opacity:0;transform:translateY(14px);transition:opacity .5s,transform .5s}
  #introOv .t.show{opacity:1;transform:none;animation:introGlitch 2.2s steps(2) infinite}
  #introOv .sub{font-size:clamp(12px,2.4vw,18px);letter-spacing:.5em;color:#8fd0e0;opacity:0;transition:opacity .6s}
  #introOv .sub.show{opacity:.95}
  #introOv .tag{font-size:12px;letter-spacing:.24em;color:#9fb0d8;opacity:0;transition:opacity .6s;max-width:520px;text-align:center;line-height:1.7}
  #introOv .tag.show{opacity:.8}
  @keyframes introGlitch{0%,100%{text-shadow:3px 0 #ff0055,-3px 0 #00f3ff}50%{text-shadow:-3px 0 #ff0055,3px 0 #00f3ff}}
  #introSkip{position:fixed;right:16px;bottom:16px;z-index:36;font-family:ui-monospace,monospace;font-size:12px;
    letter-spacing:.12em;color:#cfe9ff;background:rgba(4,8,16,.6);border:1px solid rgba(255,255,255,.18);
    border-radius:9px;padding:8px 14px;cursor:pointer;backdrop-filter:blur(6px);opacity:0;transition:opacity .4s}
  #introSkip.on{opacity:1}
  #introSkip:hover{border-color:#00f3ff;color:#fff}
  `;
  document.head.appendChild(style);
  const ov = document.createElement('div'); ov.id = 'introOv';
  ov.innerHTML = `<div class="t" id="introT">12MATT3R</div><div class="sub" id="introSub">THE FESTIVAL</div><div class="tag" id="introTag">walk the crowd · reach anyone to step into their world</div>`;
  document.body.appendChild(ov);
  const skip = document.createElement('button'); skip.id = 'introSkip'; skip.textContent = 'skip intro ⏭';
  document.body.appendChild(skip);
  const elT = ov.querySelector('#introT'), elSub = ov.querySelector('#introSub'), elTag = ov.querySelector('#introTag');

  let t = 0, t0 = 0, active = false, done = false, safety = 0;

  function seg(time) {
    let i = 0; while (i < KF.length - 1 && time >= KF[i + 1].t) i++;
    const a = KF[i], b = KF[Math.min(i + 1, KF.length - 1)];
    const span = Math.max(0.0001, b.t - a.t);
    const k = smooth(THREE.MathUtils.clamp((time - a.t) / span, 0, 1));
    return { pos: V(a.pos).lerp(V(b.pos), k), look: V(a.look).lerp(V(b.look), k) };
  }

  function start() {
    active = true; t = 0; t0 = performance.now();
    ov.classList.add('on'); skip.classList.add('on');
    setTimeout(() => elT.classList.add('show'), 250);
    setTimeout(() => elSub.classList.add('show'), 2200);
    setTimeout(() => elTag.classList.add('show'), 2700);
    // hard safety: guarantee the hand-off even if the render loop pauses
    // (e.g. the tab is backgrounded mid-intro) — a timer, not the rAF loop.
    clearTimeout(safety); safety = setTimeout(finish, DUR * 1000 + 900);
  }

  function finish() {
    if (done) return; done = true; active = false; clearTimeout(safety);
    ov.classList.remove('on'); skip.classList.remove('on');
    setTimeout(() => { ov.remove(); skip.remove(); style.remove(); }, 700);
    if (onDone) onDone();
  }

  function update() {
    if (!active) return;
    t = (performance.now() - t0) / 1000;   // wall-clock, so pacing is framerate-independent
    const s = seg(t);
    camera.position.copy(s.pos);
    camera.lookAt(s.look);
    // begin fading the title out near the end
    if (t > DUR - 1.4) { elT.classList.remove('show'); elSub.classList.remove('show'); elTag.classList.remove('show'); }
    if (t >= DUR) finish();
  }

  skip.onclick = finish;
  return { start, update, finish, isActive: () => active };
}
