import * as THREE from 'three';
import { createReducedMotion } from './player/motion.js';
import { openWindow } from './ui/popup.js';
import { STUDIO, EPISODES } from './data/episodes.js';
import { SHOWS } from './data/shows.js';
import { setScreenMap, onScreenTap, start, scene, player, applyCam } from './scene/theater.js';

// DreamOS TV — a walk-in movie theater (its own lightweight page / Lab
// experiment). The room itself (screen, seats, NPCs, popcorn, walk controls) lives
// in scene/theater.js so the Chroma Awards screening room can reuse it; this page
// adds the channels + the That Time Again episode / shows UI on top.
// Back-portal → the festival.

createReducedMotion();   // wires the #rmbtn toggle; the setting is read globally (player/motion.js)

// The show plays on the BIG SCREEN inside the room (not a full-screen takeover):
// a VideoTexture fed by the single episode <video>. The room — seats, crowd,
// popcorn — stays around you. Tap the screen to pop it full-screen.
const epVideoEl = document.getElementById('epVideo');
epVideoEl.crossOrigin = 'anonymous';
const epTexture = new THREE.VideoTexture(epVideoEl);
epTexture.colorSpace = THREE.SRGBColorSpace;
function setScreenVideo(on) { setScreenMap(on ? epTexture : null); }
let stepEpisode = () => {};

// ---- now-playing readout + episode nav (prev/next step through the show) ----
const chNameEl = document.getElementById('chName'), chNoEl = document.getElementById('chNo');
document.getElementById('nextCh').onclick = () => stepEpisode(1);
document.getElementById('prevCh').onclick = () => stepEpisode(-1);

// quick-launch app buttons (Trippy Cam, DreamOS, SauceLab VJ, Deadnet) — each
// pops the real live app in the in-page window (falls back to a new tab if the
// app refuses to embed).
for (const b of document.querySelectorAll('.tvapp')) {
  b.onclick = () => openWindow(b.dataset.title || 'app', b.dataset.url);
}

// ---- That Time Again episodes (streaming on Showrunner) ----
// The theater's marquee show: a poster grid you open from the HUD; picking an
// episode plays the real cut in a cinema overlay, with a link out to its
// Showrunner page. Background music ducks while an episode plays. On entering the
// theater a RANDOM episode auto-plays (see the enter handler → startRandomEpisode).
let startRandomEpisode = () => {};
let closeEpisodePlayer = () => {};
let openShowEpisodes = () => {};   // shows carousel → episodes filtered to one series
const episodeCount = (slug) => EPISODES.filter((e) => e.show === slug).length;
{
  const panel = document.getElementById('epPanel');
  const grid = document.getElementById('epGrid');
  const playerEl = document.getElementById('epPlayer');
  const video = document.getElementById('epVideo');
  const nowTitle = document.getElementById('epNowTitle');
  const srLink = document.getElementById('epSrLink');
  const allBtn = document.getElementById('epAllBtn');
  const titleEl = document.getElementById('epShowTitle');
  const subEl = document.getElementById('epShowSub');
  const blurbEl = document.getElementById('epShowBlurb');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const showMeta = Object.fromEntries(SHOWS.map((s) => [s.slug, s]));
  const seriesCount = new Set(EPISODES.map((e) => e.show)).size;
  // keep the ORIGINAL index so play(i) resolves against EPISODES even when filtered
  const indexed = EPISODES.map((ep, i) => ({ ep, i }));

  const cardHtml = ({ ep, i }) => `
    <div class="ep-card" data-i="${i}" role="button" tabindex="0" aria-label="Play ${esc(ep.showTitle)} — ${esc(ep.title)}">
      <div class="ep-thumb" style="background-image:url('${esc(ep.still || '')}')">
        <span class="play">▶</span>${ep.duration ? `<span class="dur">${esc(ep.duration)}</span>` : ''}
      </div>
      <div class="ep-meta">
        <div class="t">${esc(ep.title)}</div>
        <div class="m">${esc(ep.showTitle)}${ep.seasonEpisode ? ` · ${esc(ep.seasonEpisode)}` : ''}</div>
      </div>
      <div class="ep-links"><a href="${esc(ep.showrunnerUrl)}" target="_blank" rel="noopener" data-stop>on Showrunner ↗</a></div>
    </div>`;

  function renderGrid(items) {
    grid.innerHTML = items.map(cardHtml).join('');
    grid.querySelectorAll('.ep-card').forEach((card) => {
      const go = (e) => { if (e.target.closest('[data-stop]')) return; playOnScreen(+card.dataset.i); closePanel(); };
      card.addEventListener('click', go);
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(e); } });
    });
  }
  function showAll() {
    titleEl.textContent = STUDIO.title.toUpperCase();
    subEl.textContent = `${EPISODES.length} EPISODES · ${seriesCount} SERIES`;
    blurbEl.textContent = STUDIO.blurb;
    allBtn.style.display = 'none';
    grid.scrollTop = 0;
    renderGrid(indexed);
  }
  function filterShow(slug) {
    const items = indexed.filter((x) => x.ep.show === slug);
    if (!items.length) { showAll(); return; }
    const meta = showMeta[slug];
    titleEl.textContent = (meta ? meta.title : items[0].ep.showTitle).toUpperCase();
    subEl.textContent = `${items.length} EPISODE${items.length === 1 ? '' : 'S'}${meta ? ` · ${meta.genre.toUpperCase()}` : ''}`;
    blurbEl.textContent = meta ? meta.description : '';
    allBtn.style.display = '';
    grid.scrollTop = 0;
    renderGrid(items);
  }
  showAll();

  const openPanel = () => { panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); };
  const closePanel = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); };

  const epHidden = document.getElementById('epHidden');
  const epSlot = document.getElementById('epVideoSlot');
  let onScreenIndex = -1;

  // Play an episode ON THE BIG SCREEN inside the room (the crowd, seats and
  // popcorn stay around you). The show's audio fills the theater; site music ducks.
  function playOnScreen(i) {
    if (!EPISODES.length) return;
    onScreenIndex = ((i % EPISODES.length) + EPISODES.length) % EPISODES.length;
    const ep = EPISODES[onScreenIndex];
    window.__gp?.pause();
    video.src = ep.videoUrl;
    video.play().catch(() => {});
    setScreenVideo(true);
    srLink.href = ep.showrunnerUrl;
    nowTitle.textContent = `${ep.showTitle} — ${ep.title}`;
    if (chNameEl) chNameEl.textContent = ep.showTitle;
    if (chNoEl) chNoEl.textContent = ep.seasonEpisode || 'NOW PLAYING';
  }
  // pop the currently-playing episode into a full-screen view (same <video>, moved)
  function openFullscreen() {
    if (onScreenIndex < 0) { playOnScreen(Math.floor(Math.random() * EPISODES.length)); }
    epSlot.appendChild(video); video.controls = true;
    playerEl.classList.add('open'); playerEl.setAttribute('aria-hidden', 'false');
  }
  // leave full-screen — the episode keeps playing on the 3D screen behind you
  function closeFullscreen() {
    playerEl.classList.remove('open'); playerEl.setAttribute('aria-hidden', 'true');
    video.controls = false; epHidden.appendChild(video);
  }

  startRandomEpisode = () => playOnScreen(Math.floor(Math.random() * EPISODES.length));
  stepEpisode = (d) => playOnScreen((onScreenIndex < 0 ? 0 : onScreenIndex) + d);
  onScreenTap(openFullscreen);                       // tap the big screen → full-screen
  closeEpisodePlayer = closeFullscreen;
  openShowEpisodes = (slug) => { filterShow(slug); openPanel(); };
  document.getElementById('epToEps').onclick = () => { closeFullscreen(); showAll(); openPanel(); };

  allBtn.onclick = showAll;
  document.getElementById('epBtn').onclick = () => { showAll(); openPanel(); };
  document.getElementById('epClose').onclick = closePanel;
  document.getElementById('epBack').onclick = closeFullscreen;
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { if (playerEl.classList.contains('open')) closeFullscreen(); else if (panel.classList.contains('open')) closePanel(); } });
}

// ---- shows carousel (shuffle the whole slate) ----
// A lobby-style browser: flip/shuffle through every show's poster with its
// genre + description. Doesn't touch playback — it's the "what's on" board.
{
  const panel = document.getElementById('showPanel');
  const poster = document.getElementById('showPoster');
  const titleEl = document.getElementById('showTitle');
  const genreEl = document.getElementById('showGenre');
  const descEl = document.getElementById('showDesc');
  const countEl = document.getElementById('showCount');
  const watchBtn = document.getElementById('showWatch');
  let idx = SHOWS.length ? Math.floor(Math.random() * SHOWS.length) : 0;

  function render() {
    const s = SHOWS[idx]; if (!s) return;
    poster.src = s.poster; poster.alt = `${s.title} poster`;
    titleEl.textContent = s.title;
    genreEl.textContent = s.genre;
    descEl.textContent = s.description;
    descEl.scrollTop = 0;
    countEl.textContent = `${idx + 1} / ${SHOWS.length}`;
    const n = episodeCount(s.slug);       // gate the watch button on real episodes
    watchBtn.textContent = n ? `🎬 watch ${n} episode${n === 1 ? '' : 's'}` : 'no episodes yet';
    watchBtn.disabled = !n;
    watchBtn.style.opacity = n ? '1' : '.5';
    watchBtn.style.cursor = n ? 'pointer' : 'default';
  }
  const go = (d) => { idx = ((idx + d) % SHOWS.length + SHOWS.length) % SHOWS.length; render(); };
  const shuffle = () => { if (SHOWS.length < 2) return; let n; do { n = Math.floor(Math.random() * SHOWS.length); } while (n === idx); idx = n; render(); };
  const open = () => { render(); panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false'); };
  const close = () => { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); };

  document.getElementById('showBtn').onclick = open;
  document.getElementById('epToShows').onclick = () => { closeEpisodePlayer(); open(); };  // reach the carousel from a playing episode
  document.getElementById('showClose').onclick = close;
  document.getElementById('showPrev').onclick = () => go(-1);
  document.getElementById('showNext').onclick = () => go(1);
  document.getElementById('showShuffle').onclick = shuffle;
  watchBtn.onclick = () => { const s = SHOWS[idx]; if (s && episodeCount(s.slug)) { close(); openShowEpisodes(s.slug); } };
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('open')) close(); });
  render();
}

// ---- back portal → the Lab ----
document.getElementById('backBtn').onclick = () => {
  const w = document.getElementById('warp'); if (w) w.classList.add('go');
  setTimeout(() => { window.location.href = 'index.html'; }, 480);
};

document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  start();
  startRandomEpisode();   // the show's already on — a random episode plays as you walk in
};

if (import.meta.env.DEV) window.__tv = { player, applyCam, scene };
