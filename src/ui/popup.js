// A Windows-style popup window that opens a destination *inside* the site — a
// draggable window with a title bar (min / max / close), the live page in an
// iframe, and no address bar or URL shown anywhere. Self-contained: injects its
// own styles, so any page can `import { openWindow } from './ui/popup.js'`.

let overlay, win, bar, titleEl, frame, spinner, hint;
let built = false, dragging = false, dx = 0, dy = 0, maximized = false, curX = 0, curY = 0, loadTimer = 0;

const CSS = `
.wp-ov{position:fixed;inset:0;z-index:9999;background:rgba(4,4,12,.62);backdrop-filter:blur(3px);
  display:none;align-items:center;justify-content:center;padding:18px}
.wp-ov.on{display:flex}
.wp-win{position:relative;display:flex;flex-direction:column;width:min(1120px,94vw);height:min(780px,90vh);
  background:#0a0a14;border:1px solid rgba(0,243,255,.5);border-radius:11px;overflow:hidden;
  box-shadow:0 0 0 1px rgba(0,0,0,.6),0 24px 80px -12px rgba(0,243,255,.35),0 10px 40px rgba(0,0,0,.7)}
.wp-win.max{width:100vw;height:100vh;border-radius:0;border-color:rgba(0,243,255,.35)}
.wp-win.min{height:auto}
.wp-win.min .wp-body{display:none}
.wp-bar{flex:0 0 auto;height:40px;display:flex;align-items:center;gap:10px;padding:0 8px 0 14px;cursor:move;
  user-select:none;background:linear-gradient(180deg,#161634,#0d0d1e);border-bottom:1px solid rgba(0,243,255,.25)}
.wp-dot{width:9px;height:9px;border-radius:50%;background:#00f3ff;box-shadow:0 0 10px #00f3ff;flex:0 0 auto}
.wp-title{flex:1;min-width:0;font-family:ui-monospace,"JetBrains Mono",Menlo,Consolas,monospace;font-size:13px;
  letter-spacing:.08em;color:#cfe9ff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-transform:uppercase}
.wp-btns{display:flex;gap:6px;flex:0 0 auto}
.wp-btns button{width:26px;height:24px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);
  color:#cfe9ff;border-radius:6px;font-size:12px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;
  font-family:ui-monospace,monospace;transition:.12s}
.wp-btns button:hover{background:rgba(255,255,255,.14)}
.wp-btns .wp-x:hover{background:#ff0055;border-color:#ff0055;color:#fff}
.wp-body{flex:1;position:relative;background:#05050e;min-height:0}
.wp-body iframe{width:100%;height:100%;border:0;display:block;background:#05050e}
.wp-spin{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;
  color:#8a8aa0;font-family:ui-monospace,monospace;font-size:12px;letter-spacing:.14em;pointer-events:none}
.wp-spin.hide{display:none}
.wp-ring{width:38px;height:38px;border:3px solid rgba(0,243,255,.2);border-top-color:#00f3ff;border-radius:50%;animation:wp-rot .8s linear infinite}
.wp-hint{max-width:34ch;text-align:center;line-height:1.7;pointer-events:auto}
.wp-hint a{color:#00f3ff;cursor:pointer;text-decoration:underline}
@keyframes wp-rot{to{transform:rotate(360deg)}}
@media(max-width:640px){.wp-win{width:100vw;height:100vh;border-radius:0}}
@media(prefers-reduced-motion:reduce){.wp-ring{animation:none}}
`;

function make() {
  const style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
  overlay = document.createElement('div'); overlay.className = 'wp-ov';
  overlay.innerHTML = `
    <div class="wp-win" role="dialog" aria-modal="true">
      <div class="wp-bar">
        <span class="wp-dot"></span>
        <span class="wp-title"></span>
        <span class="wp-btns">
          <button class="wp-min" title="Minimize" aria-label="Minimize">─</button>
          <button class="wp-max" title="Maximize" aria-label="Maximize">☐</button>
          <button class="wp-ext" title="Open elsewhere" aria-label="Open elsewhere">↗</button>
          <button class="wp-x" title="Close" aria-label="Close">✕</button>
        </span>
      </div>
      <div class="wp-body">
        <iframe allow="camera; microphone; autoplay; fullscreen; pointer-lock; gamepad; gyroscope; accelerometer; clipboard-write; xr-spatial-tracking" allowfullscreen referrerpolicy="no-referrer"></iframe>
        <div class="wp-spin"><div class="wp-ring"></div><div class="wp-hint">loading…</div></div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  win = overlay.querySelector('.wp-win');
  bar = overlay.querySelector('.wp-bar');
  titleEl = overlay.querySelector('.wp-title');
  frame = overlay.querySelector('iframe');
  spinner = overlay.querySelector('.wp-spin');
  hint = overlay.querySelector('.wp-hint');

  overlay.querySelector('.wp-x').onclick = close;
  overlay.querySelector('.wp-min').onclick = () => win.classList.toggle('min');
  overlay.querySelector('.wp-max').onclick = () => { win.classList.toggle('max'); if (win.classList.contains('max')) resetPos(); };
  overlay.querySelector('.wp-ext').onclick = () => { if (frame.src) window.open(frame.src, '_blank', 'noopener'); };
  overlay.addEventListener('pointerdown', (e) => { if (e.target === overlay) close(); });
  frame.addEventListener('load', () => { if (frame.src) { spinner.classList.add('hide'); clearTimeout(loadTimer); } });

  // drag by the title bar
  bar.addEventListener('pointerdown', startDrag);
  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', () => { dragging = false; });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('on')) close(); });
  built = true;
}

function startDrag(e) {
  if (e.target.closest('.wp-btns') || win.classList.contains('max')) return;
  dragging = true; dx = e.clientX - curX; dy = e.clientY - curY;
}
function onDrag(e) {
  if (!dragging) return;
  curX = e.clientX - dx; curY = e.clientY - dy;
  win.style.transform = `translate(${curX}px, ${curY}px)`;
}
function resetPos() { curX = 0; curY = 0; win.style.transform = ''; }

export function openWindow(title, url) {
  if (!url) return;
  if (!built) make();
  win.classList.remove('min', 'max'); resetPos();
  titleEl.textContent = title || '12matt3r';
  spinner.classList.remove('hide');
  hint.innerHTML = 'loading…';
  overlay.classList.add('on');
  frame.src = 'about:blank';
  // load after a tick so the spinner paints
  requestAnimationFrame(() => { frame.src = url; });
  // some sites refuse to be framed (no load event) — offer a gentle escape hatch
  clearTimeout(loadTimer);
  loadTimer = setTimeout(() => {
    if (!spinner.classList.contains('hide')) {
      hint.innerHTML = 'this one is taking a while, or it blocks embedding — <a class="wp-open">open it in a tab ↗</a>';
      const a = hint.querySelector('.wp-open'); if (a) a.onclick = () => window.open(url, '_blank', 'noopener');
    }
  }, 5000);
}

export function closeWindow() { if (built) close(); }
function close() {
  overlay.classList.remove('on');
  frame.src = 'about:blank'; // stop audio/video/webgl
  clearTimeout(loadTimer);
}
