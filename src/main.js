import * as THREE from 'three';
import { DESTINATIONS } from './data/destinations.js';
import { buildFestival } from './scene/festival.js';
import { buildCrowd } from './scene/crowd.js';
import { buildCharacters } from './scene/characters.js';
import { buildTrash } from './scene/trash.js';
import { buildDealer } from './scene/dealer.js';
import { buildBoard } from './scene/board.js';
import { NEWS } from './data/news.js';
import { buildLabPortal } from './scene/labPortal.js';
import { buildDJBooth } from './scene/djbooth.js';
import { createTrippyCam } from './scene/trippycam.js';
import { buildCampfire } from './scene/campfire.js';
import { buildTailgate } from './scene/tailgate.js';
import { buildLounge } from './scene/lounge.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { WalkControls } from './player/controls.js';
import { Hud } from './ui/hud.js';
import { createAudioReactor } from './audio/reactor.js';

const canvas = document.getElementById('scene');
const body = document.body;

// ---- live audio → beat ----
const reactor = createAudioReactor(document.getElementById('track'));
const muteBtn = document.getElementById('mutebtn');
if (muteBtn) muteBtn.onclick = () => {
  const m = !reactor.isMuted(); reactor.setMuted(m);
  muteBtn.textContent = m ? '🔇 muted' : '🔊 sound';
};

// ---- reduced motion ----
let reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const setRM = (v) => { reduceMotion = v; body.classList.toggle('rm', v); };
setRM(reduceMotion);
document.getElementById('rmbtn').onclick = () => setRM(!reduceMotion);

// ---- device tier → adaptive quality (keeps phones smooth) ----
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
const maxDPR = isMobile ? 1.5 : 2;

// ---- renderer ----
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, maxDPR));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x05050e, 1);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 320);

// ---- post-processing: bloom makes the neon physically glow (desktop only) ----
const useBloom = !isMobile;
let composer = null, renderPass = null;
if (useBloom) {
  composer = new EffectComposer(renderer);
  renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.72, 0.5, 0.62)); // strength, radius, threshold
  composer.addPass(new OutputPass());
  composer.setPixelRatio(Math.min(devicePixelRatio || 1, maxDPR));
  composer.setSize(innerWidth, innerHeight);
}
function renderActive(s, cam) {
  if (composer) { renderPass.scene = s; renderPass.camera = cam; composer.render(); }
  else renderer.render(s, cam);
}

// ---- world ----
const festival = buildFestival(scene);
const characters = buildCharacters(scene, { stageZ: festival.stageZ });

// hidden trash-hunt → clean the grounds → secret download
const DUMPSTER_POS = [-19, 15];
const trash = buildTrash(scene, {
  dumpsterPos: DUMPSTER_POS,
  onPickup: (label, s) => { flash(`picked up ${label}`); trashHudUpdate(s); },
  onDeposit: (n, s) => { flash(n === 1 ? 'tossed it in the dumpster' : `dumped ${n} pieces`); trashHudUpdate(s); },
  onComplete: (s) => { trashHudUpdate(s); unlockReward(); },
});

// a dealer hidden in the crowd → reach him to score the TRI-PPY (rainbow warp)
const DEALER_POS = [-5, 5];
const dealer = buildDealer(scene, {
  pos: DEALER_POS,
  stageZ: festival.stageZ,
  onToggle: () => toggleTrippy(),
});

// Shmorez's campfire micro-scene (fire + roasting NPCs) next to his spot
const CAMPFIRE_POS = [-10, -8];
const campfire = buildCampfire(scene, { pos: CAMPFIRE_POS, roasters: 3 });

// Tanky's tailgate: lifted truck + beer pong + ping-pong tosses, by his spot
const TAILGATE_POS = [16, -8];
const tailgate = buildTailgate(scene, { pos: TAILGATE_POS, rot: -1.1 });

// Sofa King's elevated lounge (riser + audience couches) at his spot
const LOUNGE_POS = [14, 17];
const lounge = buildLounge(scene, { pos: LOUNGE_POS });

// the 12matt3r hub board → walk up, read news, sign the guest book
const BOARD_POS = [3, 11];
const board = buildBoard(scene, {
  pos: BOARD_POS,
  stageZ: festival.stageZ,
  onOpen: () => openBoard(),
});

const BIG = new Set(['stall', 'labsstage', 'bathroom', 'sofaboi', 'doorway']);
const crowd = buildCrowd(scene, {
  count: isMobile ? 170 : 320,
  stageZ: festival.stageZ,
  exclude: [
    // [x, z, clear-radius] — bigger clearing around structures, plus spawn
    ...DESTINATIONS.map((d) => [d.pos[0], d.pos[2], BIG.has(d.model) ? 6.5 : 3.6]),
    [0, 9, 4.5],
    [DUMPSTER_POS[0], DUMPSTER_POS[1], 4],
    [DEALER_POS[0], DEALER_POS[1], 2.4],
    [BOARD_POS[0], BOARD_POS[1], 3],
    [CAMPFIRE_POS[0], CAMPFIRE_POS[1], 4.5],
    [TAILGATE_POS[0], TAILGATE_POS[1], 6.5],
    [LOUNGE_POS[0], LOUNGE_POS[1] - 3, 5],
  ],
});
const controls = new WalkControls(camera, { bounds: 42, eye: 1.6, zMin: -30 });
// let the player walk up the ramp onto the stage deck
controls.groundAt = (x, z) => {
  const d = festival.deck;
  if (x < -d.halfW || x > d.halfW || z >= d.rampFront) return 0;
  if (z <= d.zFront) return d.top;                                  // on the deck
  return ((d.rampFront - z) / (d.rampFront - d.zFront)) * d.top;    // up the ramp
};
const hud = new Hud(document.getElementById('tags'), camera, characters.list, enterDestination);

// DJ booth on the main stage → the TRIPPY CAM (your webcam becomes the sky)
const djbooth = buildDJBooth(scene, {
  pos: [0, festival.deck.top, festival.stageZ + 2],
  onActivate: () => toggleTrippyCam(),
});
const trippycam = createTrippyCam(scene, { onState: (on, err) => onTrippyCamState(on, err) });

// ---- lab portal: a porta-potty interior you step into; click the old CRT to
// boot the Lab (its own page). While inside, the festival stops rendering. ----
const labPortal = buildLabPortal();
let mode = 'festival';              // 'festival' | 'porta' | 'zoom'
let portaYaw = 0, portaPitch = -0.12;

// ---- input: drag to look, click/tap a person to walk over ----
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let down = null, dragged = false;

canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  down = { x: e.clientX, y: e.clientY, id: e.pointerId };
  dragged = false;
  canvas.classList.add('drag');
});
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  const mx = e.movementX || dx * 0.2, my = e.movementY || dy * 0.2;
  if (mode === 'festival') controls.look(mx, my);
  else if (mode === 'porta') portaLook(mx, my);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => {
  canvas.classList.remove('drag');
  if (down && !dragged) {
    if (mode === 'festival') handleTap(e.clientX, e.clientY);
    else if (mode === 'porta') handlePortaTap(e.clientX, e.clientY);
  }
  down = null;
});
canvas.addEventListener('pointercancel', () => { down = null; canvas.classList.remove('drag'); });

function handleTap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1;
  ndc.y = -(sy / innerHeight) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  // trash first — clicking a piece picks it up (don't walk)
  if (trash.tryClick(raycaster)) return;
  // the dealer — clicking him toggles the trip
  if (dealer.tryClick(raycaster)) return;
  // the hub board — clicking it opens news + guest book
  if (board.tryClick(raycaster)) return;
  // the DJ booth on stage — toggles the trippy cam
  if (djbooth.tryClick(raycaster)) return;
  // characters next
  const hitC = raycaster.intersectObjects(characters.proxies, false)[0];
  if (hitC) {
    const c = characters.list.find((x) => x.proxy === hitC.object);
    if (c) { controls.walkTo(c.worldPos); return; }
  }
  // otherwise walk to the point on the ground
  const groundHit = raycaster.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (groundHit) controls.walkTo(groundHit);
}
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

// ---- resize ----
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, maxDPR));
  renderer.setSize(innerWidth, innerHeight);
  if (composer) composer.setSize(innerWidth, innerHeight);
});
renderer.setSize(innerWidth, innerHeight);

// ---- beat clock (128 BPM) → pulse spikes on each beat ----
const BPM = 128;
const DAY_CYCLE = 150;     // seconds for a full midnight→midnight cycle
const DAY_START = 0.70;    // begin at dusk, sliding into night
const clock = new THREE.Clock();
let running = false, dayScrub = 0;
const clockEl = document.getElementById('clock');

window.addEventListener('keydown', (e) => {           // [ and ] scrub time of day
  if (e.key === '[') dayScrub -= 0.06;
  else if (e.key === ']') dayScrub += 0.06;
});

function phaseName(d) {
  if (d < 0.22 || d >= 0.96) return ['\u{1F319}', 'midnight'];
  if (d < 0.30) return ['\u{1F305}', 'sunrise'];
  if (d < 0.46) return ['\u{1F324}', 'morning'];
  if (d < 0.54) return ['☀️', 'noon'];
  if (d < 0.70) return ['\u{1F307}', 'afternoon'];
  if (d < 0.82) return ['\u{1F306}', 'sunset'];
  return ['\u{1F30C}', 'night'];
}

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const time = clock.elapsedTime;
  const beat = time * (BPM / 60);
  const bpmPulse = Math.pow(1 - (beat % 1), 2.2);           // fallback: sharp on-beat, decays
  const audioPulse = reactor.pulse();                       // live bass energy, or null
  const pulse = reduceMotion ? 0.35 : (audioPulse != null ? Math.max(audioPulse, 0.05) : bpmPulse);
  if (mode === 'festival') {
    const dayT = (((DAY_START + time / DAY_CYCLE + dayScrub) % 1) + 1) % 1;
    controls.bobEnabled = !reduceMotion;
    controls.update(dt);
    festival.update(dt, time, pulse, dayT);
    crowd.update(dt, time, pulse);
    characters.update(dt, time, pulse);
    campfire.update(dt, time, pulse);
    tailgate.update(dt, time, pulse);
    lounge.update(dt, time, pulse);
    trash.update(dt, time, pulse, controls.pos);
    dealer.update(dt, time, pulse, controls.pos, trippy);
    board.update(dt, time, pulse);
    djbooth.update(dt, time, pulse, controls.pos);
    hud.update(controls.pos);
    if (boardHintEl) boardHintEl.classList.toggle('on', controls.pos.distanceTo(board.worldPos) < 5.5 && !boardOpen);
    if (clockEl) { const [ic, nm] = phaseName(dayT); clockEl.textContent = `${ic} ${nm}`; }
    renderActive(scene, camera);
  } else {
    // inside the lab portal — festival is parked, we render the tiny stall
    labPortal.update(dt, time);
    if (mode === 'zoom') updateZoom(dt);
    else applyPortaCamera();
    renderActive(labPortal.scene, camera);
  }
}

// ---- start ----
document.getElementById('enterBtn').onclick = () => {
  document.getElementById('start').classList.add('gone');
  reactor.start();                       // user gesture → satisfies autoplay policy
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });

// render one frame behind the start overlay so it isn't black
renderActive(scene, camera);

// ---- trash-hunt UI ----------------------------------------------------------
const REWARD = { url: import.meta.env.BASE_URL + 'secret/cleanup-reward.txt', name: '12matt3r-secret-drop.txt' };
const REWARD_KEY = 'sk_festival_cleaned';

const trashHudEl = document.getElementById('trashHud');
const tCleanEl = document.getElementById('tClean');
const tTotalEl = document.getElementById('tTotal');
const tCarryEl = document.getElementById('tCarry');
const toastEl = document.getElementById('toast');
let toastTimer = null;

function flash(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('on'), 1800);
}

function trashHudUpdate(s) {
  if (!trashHudEl) return;
  trashHudEl.classList.add('on');           // reveal once the hunt is discovered
  if (tCleanEl) tCleanEl.textContent = String(s.dumped);
  if (tTotalEl) tTotalEl.textContent = String(s.total);
  if (tCarryEl) {
    tCarryEl.textContent = s.held > 0 ? `· carrying ${s.held}` : '';
    tCarryEl.classList.toggle('carrying', s.held > 0);
  }
}

function unlockReward() {
  try { localStorage.setItem(REWARD_KEY, '1'); } catch (e) { /* private mode */ }
  showReward();
}

function showReward() {
  const el = document.getElementById('reward');
  if (!el) return;
  const link = document.getElementById('rewardDl');
  if (link) { link.href = REWARD.url; link.setAttribute('download', REWARD.name); }
  el.classList.add('on');
}

const rewardClose = document.getElementById('rewardClose');
if (rewardClose) rewardClose.onclick = () => document.getElementById('reward').classList.remove('on');

// ---- 12matt3r hub board: news + guest book ---------------------------------
const GUEST_KEY = 'sk_guestbook_v1';
const NOTE_CLASSES = ['cyan', 'pink', 'green', 'yellow'];
const boardPanelEl = document.getElementById('boardPanel');
const boardHintEl = document.getElementById('boardHint');
let boardOpen = false;

function openBoard() {
  renderNews();
  renderGuests();
  boardOpen = true;
  if (boardPanelEl) boardPanelEl.classList.add('on');
  if (boardHintEl) boardHintEl.classList.remove('on');
}
function closeBoard() {
  boardOpen = false;
  if (boardPanelEl) boardPanelEl.classList.remove('on');
}

function makeNote(colorClass, dateStr, name, text) {
  const note = document.createElement('div');
  note.className = `note ${colorClass}`;
  note.style.setProperty('--r', `${(Math.random() - 0.5) * 3.5}deg`);
  if (dateStr) { const d = document.createElement('div'); d.className = 'nd'; d.textContent = dateStr; note.appendChild(d); }
  if (name) { const n = document.createElement('div'); n.className = 'nn'; n.textContent = name; note.appendChild(n); }
  const t = document.createElement('div'); t.textContent = text; note.appendChild(t);   // textContent = no HTML injection
  return note;
}

function renderNews() {
  const wrap = document.getElementById('newsNotes');
  if (!wrap) return;
  wrap.textContent = '';
  for (const n of NEWS) wrap.appendChild(makeNote(n.color, n.date, '', n.text));
}

function loadGuests() {
  try { return JSON.parse(localStorage.getItem(GUEST_KEY)) || []; } catch (e) { return []; }
}
function renderGuests() {
  const wrap = document.getElementById('guestNotes');
  if (!wrap) return;
  wrap.textContent = '';
  const guests = loadGuests();
  if (!guests.length) {
    const empty = document.createElement('div'); empty.className = 'gempty';
    empty.textContent = 'no messages yet — be the first to sign the board.';
    wrap.appendChild(empty); return;
  }
  guests.slice().reverse().forEach((g, i) => {
    wrap.appendChild(makeNote(NOTE_CLASSES[(guests.length - 1 - i) % NOTE_CLASSES.length], g.date, g.name, g.msg));
  });
}

const guestForm = document.getElementById('guestForm');
if (guestForm) guestForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nameEl = document.getElementById('guestName');
  const msgEl = document.getElementById('guestMsg');
  const name = (nameEl.value || 'anon').trim().slice(0, 24);
  const msg = (msgEl.value || '').trim().slice(0, 140);
  if (!msg) { msgEl.focus(); return; }
  const guests = loadGuests();
  guests.push({ name, msg, date: new Date().toISOString().slice(0, 10) });
  try { localStorage.setItem(GUEST_KEY, JSON.stringify(guests.slice(-100))); } catch (e) { /* full/private */ }
  nameEl.value = ''; msgEl.value = '';
  renderGuests();
  flash('pinned to the board ✓');
});

const boardClose = document.getElementById('boardClose');
if (boardClose) boardClose.onclick = () => closeBoard();
if (boardPanelEl) boardPanelEl.addEventListener('click', (e) => { if (e.target === boardPanelEl) closeBoard(); });

// ---- portal transition → load a destination on its own page --------------
// Reaching a character and hitting "enter" plays a warp themed to their accent,
// then loads their EPK. Local EPK pages (dest.page, e.g. '/epk/shmorez/') load
// in the same tab as a fresh, lightweight page — each carries a portal back to
// the festival — so we never hold every world in memory at once. External
// links (store, socials) open in a new tab and the festival stays put.
let warping = false;
function enterDestination(dest) {
  if (dest.portal === 'lab') { enterLabPortal(dest); return; }
  const target = dest.page || dest.url;
  if (!target) { flash('// coming soon'); return; }
  const sameTab = !!dest.page || target.startsWith('/');
  playWarp(dest, () => {
    if (sameTab) window.location.href = target;
    else window.open(target, '_blank', 'noopener');
  });
}

// ---- lab porta-potty portal ------------------------------------------------
const _fwd = new THREE.Vector3(), _right = new THREE.Vector3(), _up = new THREE.Vector3(0, 1, 0), _tgt = new THREE.Vector3();
const portaHudEl = document.getElementById('portaHud');
const portaExitEl = document.getElementById('portaExit');
if (portaExitEl) portaExitEl.onclick = () => exitPortal();

function enterLabPortal(dest) {
  playWarp(dest, () => {
    mode = 'porta';
    portaYaw = 0; portaPitch = -0.12;
    if (hud.close) hud.close();
    body.classList.add('inportal');
  });
}

function exitPortal() {
  if (mode === 'festival') return;
  playWarp({ accent: '#39ff14', name: 'THE FESTIVAL' }, () => {
    mode = 'festival';
    body.classList.remove('inportal');
  });
}

function portaLook(mx, my) {
  portaYaw = THREE.MathUtils.clamp(portaYaw - mx * 0.004, -1.1, 1.1);
  portaPitch = THREE.MathUtils.clamp(portaPitch - my * 0.004, -0.7, 0.5);
}

function applyPortaCamera() {
  camera.position.copy(labPortal.eye);
  _fwd.subVectors(labPortal.lookAt, labPortal.eye).normalize();
  _right.crossVectors(_fwd, _up).normalize();
  _tgt.copy(labPortal.lookAt).addScaledVector(_right, portaYaw * 1.2).addScaledVector(_up, portaPitch * 1.2);
  camera.lookAt(_tgt);
}

function handlePortaTap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1;
  ndc.y = -(sy / innerHeight) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  if (raycaster.intersectObject(labPortal.screen, false)[0]) startZoom();
}

let zoomProg = 0;
const _zoomFrom = new THREE.Vector3();
function startZoom() {
  if (mode === 'zoom') return;
  mode = 'zoom';
  zoomProg = 0;
  _zoomFrom.copy(camera.position);
}
function updateZoom(dt) {
  zoomProg = Math.min(1, zoomProg + dt / 1.3);
  const e = zoomProg < 0.5 ? 2 * zoomProg * zoomProg : 1 - Math.pow(-2 * zoomProg + 2, 2) / 2; // easeInOutQuad
  camera.position.lerpVectors(_zoomFrom, labPortal.zoomEye, e);
  camera.lookAt(labPortal.lookAt);
  if (zoomProg >= 1 && !warping) {
    playWarp({ accent: '#39ff14', name: 'THE LAB' }, () => { window.location.href = 'lab.html'; });
  }
}

function playWarp(dest, atPeak) {
  if (warping) return;
  warping = true;
  const el = document.getElementById('warp');
  if (!el) { atPeak(); warping = false; return; }
  el.style.setProperty('--c', dest.accent);
  const label = document.getElementById('warpLabel');
  if (label) label.textContent = `entering ${dest.name}`;
  el.classList.toggle('rm', reduceMotion);
  el.classList.add('go');
  const peak = reduceMotion ? 150 : 700;
  setTimeout(atPeak, peak);
  // if we stayed on this page (external → new tab), clear the warp
  setTimeout(() => { el.classList.remove('go'); warping = false; }, peak + 550);
}

// ---- TRI-PPY (scored from the dealer) --------------------------------------
// Reaching the dealer flips the rainbow warp on; finding him the first time
// also reveals the TRI-PPY toggle in the HUD (mirrors doesntmatter.us).
let trippy = false;
let trippyUnlocked = false;
const trippyEl = document.getElementById('trippy');
const tripToggleEl = document.getElementById('tripToggle');
if (tripToggleEl) tripToggleEl.onclick = () => toggleTrippy();

function toggleTrippy() { setTrippy(!trippy); }
function setTrippy(on) {
  trippy = on;
  if (trippyEl) trippyEl.classList.toggle('on', on);
  if (!trippyUnlocked) { trippyUnlocked = true; if (tripToggleEl) tripToggleEl.classList.add('shown'); }
  if (tripToggleEl) {
    tripToggleEl.textContent = on ? 'TRI-PPY: ON' : 'TRI-PPY: OFF';
    tripToggleEl.classList.toggle('active', on);
  }
  flash(on ? 'the dealer hooks you up — everything melts' : 'you come back down');
}

// ---- TRIPPY CAM (scored at the DJ booth) -----------------------------------
const tripcamToggleEl = document.getElementById('tripcamToggle');
if (tripcamToggleEl) tripcamToggleEl.onclick = () => toggleTrippyCam();
function toggleTrippyCam() { trippycam.toggle(); }
function onTrippyCamState(on, err) {
  if (tripcamToggleEl) {
    tripcamToggleEl.classList.add('shown');
    tripcamToggleEl.textContent = on ? 'TRIPPY CAM: ON' : 'TRIPPY CAM: OFF';
    tripcamToggleEl.classList.toggle('active', on);
  }
  if (err) flash('camera blocked — allow it to look down on the festival');
  else flash(on ? 'look up — that’s you, over the whole festival' : 'trippy cam off');
}

// dev-only debug bridge for automated testing (stripped from production builds)
if (import.meta.env.DEV) window.__dbg = {
  controls, trash, dealer, enterDestination, setTrippy,
  enterLabPortal, startZoom, exitPortal, portalState: () => ({ mode, zoomProg, warping }),
  openBoard, closeBoard, djbooth, trippycam, toggleTrippyCam,
};
