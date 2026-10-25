import { CHROMA, ALL_ENTRIES } from './data/chroma.js';
import { createReducedMotion } from './player/motion.js';

// CHROMA AWARDS — a DreamOS-style desktop for every Chroma Awards entry.
// This year's entries sit on the desktop as icons (and open in an explorer window
// on boot); earlier years live in archive folders. Each entry opens in its own
// draggable window with a taskbar button; the Theater icon walks you into the
// screening room (screening.html?room=chroma). Everything is generated from
// data/chroma.js — add an entry there and it appears here and in the theater.

createReducedMotion();

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const narrow = () => matchMedia('(max-width: 700px)').matches;

const [current, ...past] = CHROMA.years;
const theaterUrl = () => 'screening.html?room=chroma';

// ---- window manager ----
const winsEl = $('wins'), tasksEl = $('tasks');
const wins = new Map();   // id → { el, task }
let zTop = 10, cascade = 0;

function focusWin(id) {
  const w = wins.get(id); if (!w) return;
  for (const [k, v] of wins) { v.el.classList.toggle('focus', k === id); v.task.classList.toggle('on', k === id && !v.el.classList.contains('min')); }
  w.el.style.zIndex = ++zTop;
}
function closeWin(id) {
  const w = wins.get(id); if (!w) return;
  w.el.remove(); w.task.remove(); wins.delete(id);
  const next = [...wins.keys()].pop(); if (next) focusWin(next);
}
function minWin(id) {
  const w = wins.get(id); if (!w) return;
  w.el.classList.add('min'); w.task.classList.remove('on');
}

// Open (or re-focus) a window. `build(body, win)` fills it; `ext` shows an
// "open in tab" button.
function openWin({ id, title, glyph = '◆', w = 760, h = 520, build, ext }) {
  const existing = wins.get(id);
  if (existing) { existing.el.classList.remove('min'); focusWin(id); return existing.el; }

  const el = document.createElement('div');
  el.className = 'win';
  const maxW = innerWidth - 24, maxH = innerHeight - 46 - 24;
  const ww = Math.min(w, maxW), hh = Math.min(h, maxH);
  const off = (cascade++ % 6) * 28;
  el.style.cssText = `width:${ww}px;height:${hh}px;left:${Math.max(8, Math.min((narrow() ? 8 : 130) + off, innerWidth - ww - 8))}px;top:${Math.max(8, Math.min(40 + off, maxH - hh))}px`;
  el.innerHTML = `
    <div class="bar"><span class="g" aria-hidden="true">${esc(glyph)}</span><span class="t">${esc(title)}</span>
      <span class="b">
        <button class="mn" title="Minimize" aria-label="Minimize">─</button>
        <button class="mx" title="Maximize" aria-label="Maximize">☐</button>
        ${ext ? '<button class="ex2" title="Open in a new tab" aria-label="Open in a new tab">↗</button>' : ''}
        <button class="x" title="Close" aria-label="Close">✕</button>
      </span></div>
    <div class="body"></div><div class="rs" aria-hidden="true"></div>`;
  winsEl.appendChild(el);

  const task = document.createElement('button');
  task.className = 'task'; task.textContent = `${glyph} ${title}`; task.title = title;
  tasksEl.appendChild(task);
  wins.set(id, { el, task });

  const body = el.querySelector('.body');
  build(body, el);

  el.addEventListener('pointerdown', () => focusWin(id));
  el.querySelector('.x').onclick = () => closeWin(id);
  el.querySelector('.mn').onclick = () => minWin(id);
  el.querySelector('.mx').onclick = () => el.classList.toggle('max');
  if (ext) el.querySelector('.ex2').onclick = () => window.open(ext, '_blank', 'noopener');
  task.onclick = () => {
    if (el.classList.contains('min')) { el.classList.remove('min'); focusWin(id); }
    else if (task.classList.contains('on')) minWin(id);
    else focusWin(id);
  };

  // drag by the title bar; resize by the corner grip
  const bar = el.querySelector('.bar');
  bar.addEventListener('dblclick', (e) => { if (!e.target.closest('button')) el.classList.toggle('max'); });
  bar.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button') || el.classList.contains('max') || narrow()) return;
    bar.setPointerCapture(e.pointerId); el.classList.add('drag');
    const sx = e.clientX - el.offsetLeft, sy = e.clientY - el.offsetTop;
    const mv = (m) => {
      el.style.left = `${Math.max(-ww + 80, Math.min(m.clientX - sx, innerWidth - 80))}px`;
      el.style.top = `${Math.max(0, Math.min(m.clientY - sy, innerHeight - 46 - 38))}px`;
    };
    const up = () => { el.classList.remove('drag'); bar.removeEventListener('pointermove', mv); bar.removeEventListener('pointerup', up); bar.removeEventListener('pointercancel', up); };
    bar.addEventListener('pointermove', mv); bar.addEventListener('pointerup', up); bar.addEventListener('pointercancel', up);
  });
  const grip = el.querySelector('.rs');
  grip.addEventListener('pointerdown', (e) => {
    e.stopPropagation(); grip.setPointerCapture(e.pointerId); el.classList.add('resizing');
    const sx = e.clientX, sy = e.clientY, sw = el.offsetWidth, sh = el.offsetHeight;
    const mv = (m) => { el.style.width = `${Math.max(280, sw + m.clientX - sx)}px`; el.style.height = `${Math.max(160, sh + m.clientY - sy)}px`; };
    const up = () => { el.classList.remove('resizing'); grip.removeEventListener('pointermove', mv); grip.removeEventListener('pointerup', up); grip.removeEventListener('pointercancel', up); };
    grip.addEventListener('pointermove', mv); grip.addEventListener('pointerup', up); grip.addEventListener('pointercancel', up);
  });

  focusWin(id);
  return el;
}

// ---- apps ----
function playEntry(entry) {
  openWin({
    id: `play:${entry.id}`, title: entry.title, glyph: entry.glyph, w: 1000, h: 640, ext: entry.url,
    build(body) {
      body.innerHTML = `<div class="sp">LOADING ${esc(entry.title)}…</div>
        <iframe title="${esc(entry.title)}" allow="camera; microphone; autoplay; fullscreen; pointer-lock; gamepad; gyroscope; accelerometer; clipboard-write; xr-spatial-tracking" allowfullscreen referrerpolicy="no-referrer"></iframe>`;
      const frame = body.querySelector('iframe');
      frame.addEventListener('load', () => body.querySelector('.sp').classList.add('hide'));
      frame.src = entry.url;
    },
  });
}

function entryCard(e, year) {
  return `<div class="card" style="--a:${esc(e.accent)}">
    <div class="poster"><span class="yr">${year}</span>${esc(e.glyph)}</div>
    <div class="m"><div class="n">${esc(e.title)}</div><div class="tg">${esc(e.tag)}</div><div class="d">${esc(e.blurb)}</div></div>
    <div class="act"><button class="btn go" data-play="${esc(e.id)}">▶ PLAY</button><button class="btn" data-theater="${esc(e.id)}">🎬 THEATER</button></div>
  </div>`;
}

function openYear(y) {
  openWin({
    id: `year:${y.year}`, title: `${CHROMA.name} ${y.year}`, glyph: y === current ? '🏆' : '📁', w: 860, h: 620,
    build(body) {
      body.innerHTML = `<div class="ex"><h2>${esc(CHROMA.name)} ${y.year}</h2>
        <div class="sub">${esc(y.label)} · ${y.entries.length} ${y.entries.length === 1 ? 'ENTRY' : 'ENTRIES'}</div>
        ${y === current ? `<p class="bl">${esc(CHROMA.blurb)}</p>` : ''}
        <div class="cards">${y.entries.map((e) => entryCard(e, y.year)).join('') || '<div class="empty">nothing here yet.</div>'}</div></div>`;
      body.querySelectorAll('[data-play]').forEach((b) => { b.onclick = () => playEntry(ALL_ENTRIES.find((e) => e.id === b.dataset.play)); });
      body.querySelectorAll('[data-theater]').forEach((b) => { b.onclick = () => goTheater(b.dataset.theater); });
    },
  });
}

function openReadme() {
  openWin({
    id: 'readme', title: 'README.txt', glyph: '📄', w: 560, h: 420,
    build(body) {
      body.innerHTML = `<div class="doc"><h3>${esc(CHROMA.name)}</h3>${esc(CHROMA.blurb)}
        <h3>Desktop</h3>Double-click (or tap twice) an icon to open it. Each entry runs in its own window — drag it, resize it, minimise it to the taskbar.
        <h3>Theater</h3>The Theater icon walks you into the screening room, where every entry takes its turn on the big screen. Click the screen to play the one that is showing.
        <h3>Adding an entry</h3>Add it to <code>src/data/chroma.js</code> — it shows up here and in the theater.</div>`;
    },
  });
}

// the voting booth, in a window — the Chroma Awards vote page (vote.html) in an iframe
function openVote() {
  openWin({
    id: 'vote', title: 'VOTE // CHROMA AWARDS', glyph: '🗳', w: 980, h: 640,
    build(body) { body.innerHTML = '<iframe title="Chroma Awards voting" referrerpolicy="no-referrer-when-downgrade"></iframe>'; body.querySelector('iframe').src = 'vote.html'; },
  });
}

function goTheater(id) {
  document.body.style.transition = 'opacity .4s'; document.body.style.opacity = '0';
  setTimeout(() => { location.href = theaterUrl(); }, 380);
}
function goFestival() { location.href = 'index.html'; }

// ---- desktop icons ----
const desktop = $('desktop');
function icon({ glyph, label, accent, sys, run }) {
  const b = document.createElement('button');
  b.className = `ico${sys ? ' sys' : ''}`; b.style.setProperty('--a', accent || '#00f3ff');
  b.innerHTML = `<span class="tile" aria-hidden="true">${esc(glyph)}</span><span class="lbl">${esc(label)}</span>`;
  // touch/keyboard: one activation opens. mouse: select on click, open on double-click.
  b.addEventListener('click', (e) => {
    const coarse = matchMedia('(pointer: coarse)').matches;
    if (coarse || e.detail === 0 || e.detail >= 2) { run(); return; }
    desktop.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel')); b.classList.add('sel');
  });
  desktop.insertBefore(b, desktop.querySelector('.wm'));
  return b;
}

icon({ glyph: '🏆', label: `${CHROMA.name} ${current.year}`, accent: '#ffd24a', sys: true, run: () => openYear(current) });
current.entries.forEach((e) => icon({ glyph: e.glyph, label: e.title, accent: e.accent, run: () => playEntry(e) }));
icon({ glyph: '🗳', label: 'VOTE', accent: '#2a5bff', sys: true, run: openVote });
icon({ glyph: '🎬', label: 'THEATER', accent: '#ff8a2a', sys: true, run: () => goTheater() });
past.forEach((y) => icon({ glyph: '📁', label: `${y.year} ARCHIVE`, accent: '#b967ff', sys: true, run: () => openYear(y) }));
icon({ glyph: '📄', label: 'README.txt', sys: true, run: openReadme });
icon({ glyph: '🎪', label: 'FESTIVAL', accent: '#ff0055', sys: true, run: goFestival });

// ---- start menu ----
const menu = $('menu'), startBtn = $('startBtn');
const menuItem = (glyph, label, run) => `<button role="menuitem" data-run="${run}"><span aria-hidden="true">${esc(glyph)}</span>${esc(label)}</button>`;
const actions = [];
const reg = (fn) => actions.push(fn) - 1;
menu.innerHTML = [
  `<div class="hd">${current.year} · ${esc(current.label)}</div>`,
  ...current.entries.map((e) => menuItem(e.glyph, e.title, reg(() => playEntry(e)))),
  menuItem('🏆', `All ${current.year} entries`, reg(() => openYear(current))),
  '<hr>',
  ...past.flatMap((y) => [`<div class="hd">${y.year} · ${esc(y.label)}</div>`, ...y.entries.map((e) => menuItem(e.glyph, e.title, reg(() => playEntry(e)))), menuItem('📁', `${y.year} archive`, reg(() => openYear(y)))]),
  '<hr>',
  menuItem('🗳', 'Vote for my entries', reg(openVote)),
  menuItem('🎬', 'Theater', reg(() => goTheater())),
  menuItem('📄', 'README.txt', reg(openReadme)),
  menuItem('🎪', 'Back to the festival', reg(goFestival)),
].join('');
const setMenu = (on) => { menu.classList.toggle('open', on); startBtn.setAttribute('aria-expanded', String(on)); };
startBtn.onclick = (e) => { e.stopPropagation(); setMenu(!menu.classList.contains('open')); };
menu.addEventListener('click', (e) => { const b = e.target.closest('[data-run]'); if (b) { setMenu(false); actions[+b.dataset.run](); } });
addEventListener('pointerdown', (e) => { if (!e.target.closest('#menu, #startBtn')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// ---- clock ----
const clock = $('clock');
const tick = () => { clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); };
tick(); setInterval(tick, 20000);

// ---- boot → desktop ----
const boot = $('boot');
let booted = false;
function finishBoot() {
  if (booted) return; booted = true;
  boot.classList.add('gone');
  // the main page shows everything from this year: open its explorer straight away
  openYear(current);
}
boot.addEventListener('click', finishBoot);
boot.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') finishBoot(); });
setTimeout(finishBoot, 1300);
