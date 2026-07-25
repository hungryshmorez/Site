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
import { buildFireworks } from './scene/fireworks.js';
import { buildTent } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { createFXPass, FX_MODES } from './scene/fxpass.js';
import { buildFxChips } from './scene/fxchips.js';
import { buildHoop } from './scene/hoop.js';
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
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance', preserveDrawingBuffer: true });
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
// composer always exists so the FX camera modes work everywhere; bloom is
// desktop-only. FX pass runs last, on the final image.
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
if (useBloom) composer.addPass(new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.72, 0.5, 0.62)); // strength, radius, threshold
composer.addPass(new OutputPass());
const fx = createFXPass();
composer.addPass(fx.pass);
composer.setPixelRatio(Math.min(devicePixelRatio || 1, maxDPR));
composer.setSize(innerWidth, innerHeight);
function renderActive(s, cam) { renderPass.scene = s; renderPass.camera = cam; composer.render(); }

// ---- world ----
const festival = buildFestival(scene);
const characters = buildCharacters(scene, { stageZ: festival.stageZ });
const fireworks = buildFireworks(scene, { origin: [0, 15, festival.stageZ] });

// hidden trash-hunt → clean the grounds → secret download
const DUMPSTER_POS = [-18, -16];
const trash = buildTrash(scene, {
  dumpsterPos: DUMPSTER_POS,
  onPickup: (label, s) => { flash(`picked up ${label}`); trashHudUpdate(s); },
  onDeposit: (n, s) => { flash(n === 1 ? 'tossed it in the dumpster' : `dumped ${n} pieces`); trashHudUpdate(s); },
  onComplete: (s) => { trashHudUpdate(s); unlockReward(); },
});

// a dealer hidden in the crowd → reach him to score the TRI-PPY (rainbow warp)
const DEALER_POS = [16, -18];
const dealer = buildDealer(scene, {
  pos: DEALER_POS,
  stageZ: festival.stageZ,
  onToggle: () => toggleTrippy(),
});

// Shmorez's campfire micro-scene (fire + roasting NPCs) out back by his spot,
// with a tent pitched behind him.
const CAMPFIRE_POS = [9, 16];
const campfire = buildCampfire(scene, { pos: CAMPFIRE_POS, roasters: 3 });
buildTent(scene, { pos: [5, 20], accent: '#ff6b35' });

// everything faces the center of the grounds (front = +Z toward [0,-4])
const faceCenter = (x, z) => Math.atan2(0 - x, -4 - z);

// Tanky's tailgate: lifted truck + beer pong + ping-pong tosses, by his spot.
// The bed/tailgate (party side, +Z) faces center; the cab backs into the corner.
const TAILGATE_POS = [18, 5];
const pongHudEl = document.getElementById('pongHud');
const tailgate = buildTailgate(scene, {
  pos: TAILGATE_POS, rot: faceCenter(TAILGATE_POS[0], TAILGATE_POS[1]),
  onScore: (n, left) => { flash(left === 0 ? `🍺 RACK CLEARED! (${n})` : `🍺 in the cup! (${n})`); if (pongHudEl) pongHudEl.textContent = `🍺 sunk: ${n} · ${left} cups left`; },
});

// Sofa King's elevated lounge (riser + audience couches) at his spot. The
// audience side (-Z) points at center, so the couches sit between him and it.
const LOUNGE_POS = [18, -8];
const lounge = buildLounge(scene, { pos: LOUNGE_POS, rot: faceCenter(LOUNGE_POS[0], LOUNGE_POS[1]) + Math.PI });

// the 12matt3r hub board → walk up, read news, sign the guest book
const BOARD_POS = [-18, 18];
const board = buildBoard(scene, {
  pos: BOARD_POS,
  stageZ: festival.stageZ,
  onOpen: () => openBoard(),
});

const BIG = new Set(['stall', 'labsstage', 'bathroom', 'sofaboi', 'doorway']);
const crowd = buildCrowd(scene, {
  count: isMobile ? 190 : 340,
  rail: isMobile ? 40 : 70,
  stageZ: festival.stageZ,
  exclude: [
    // [x, z, clear-radius] — bigger clearing around structures, plus spawn
    ...DESTINATIONS.map((d) => [d.pos[0], d.pos[2], BIG.has(d.model) ? 6.5 : 3.6]),
    [-4, 6, 4.5],
    [DUMPSTER_POS[0], DUMPSTER_POS[1], 4],
    [DEALER_POS[0], DEALER_POS[1], 2.4],
    [BOARD_POS[0], BOARD_POS[1], 3],
    [CAMPFIRE_POS[0], CAMPFIRE_POS[1], 4.5],
    [TAILGATE_POS[0], TAILGATE_POS[1], 6.5],
    [LOUNGE_POS[0], LOUNGE_POS[1] - 3, 5],
  ],
});
const controls = new WalkControls(camera, { bounds: 24, eye: 1.6, zMin: -30 });
// let the player walk up the ramp onto the stage deck
controls.groundAt = (x, z) => {
  const d = festival.deck;
  if (x < -d.halfW || x > d.halfW || z >= d.rampFront) return 0;
  if (z <= d.zFront) return d.top;                                  // on the deck
  return ((d.rampFront - z) / (d.rampFront - d.zFront)) * d.top;    // up the ramp
};
const hud = new Hud(document.getElementById('tags'), camera, characters.list, enterDestination);

// ---- camera FX modes: a console to switch, hidden chips to unlock ----------
const FX_STORE = 'fxUnlocked';
let fxUnlocked = [];
try { fxUnlocked = JSON.parse(localStorage.getItem(FX_STORE) || '[]'); } catch (e) { fxUnlocked = []; }
let fxMode = 'normal';
const fxchips = buildFxChips(scene, { unlocked: fxUnlocked });
const FX_LABELS = { normal: 'NORMAL', crt: 'CRT', vhs: 'VHS', ascii: 'ASCII', gameboy: 'GAMEBOY', wireframe: 'WIREFRAME' };
function applyFx(mode) { fxMode = mode; fx.setMode(mode); buildFxMenu(); }
function unlockFx(mode) {
  if (!fxUnlocked.includes(mode)) {
    fxUnlocked.push(mode);
    try { localStorage.setItem(FX_STORE, JSON.stringify(fxUnlocked)); } catch (e) { /* noop */ }
    flash(`unlocked ${FX_LABELS[mode]} camera — open the FX menu (◉)`);
  }
  applyFx(mode);
  if (fxPanelEl) fxPanelEl.classList.add('open');
}
const fxToggleEl = document.getElementById('fxToggle');
const fxPanelEl = document.getElementById('fxPanel');
if (fxToggleEl) fxToggleEl.onclick = () => { closeConsoles('fxPanel'); buildFxMenu(); fxPanelEl.classList.toggle('open'); };
function buildFxMenu() {
  if (!fxPanelEl) return;
  const found = fxUnlocked.length, total = FX_MODES.length - 1;
  fxPanelEl.innerHTML = `<div class="fxhead">CAMERA FX <span>${found}/${total} unlocked</span></div>`;
  FX_MODES.forEach((m) => {
    const locked = m !== 'normal' && !fxUnlocked.includes(m);
    const b = document.createElement('button');
    b.className = 'fxrow' + (fxMode === m ? ' on' : '') + (locked ? ' locked' : '');
    b.textContent = locked ? `🔒 ${FX_LABELS[m]}` : FX_LABELS[m];
    if (locked) { const s = document.createElement('span'); s.className = 'fxhint'; s.textContent = 'hidden on the grounds'; b.appendChild(s); }
    else b.onclick = () => { applyFx(m); };
    fxPanelEl.appendChild(b);
  });
}
buildFxMenu();

// ---- time-of-day console: snap the sky/lighting to a preset (or auto cycle) --
const TOD = [
  { id: 'auto', name: 'AUTO CYCLE', v: null },
  { id: 'day', name: 'DAY', v: 0.5 },
  { id: 'dusk', name: 'DUSK', v: 0.78 },
  { id: 'night', name: 'CYBER-NIGHT', v: 0.985 },
  { id: 'dawn', name: 'NEON DAWN', v: 0.26 },
];
let dayLock = null, todSel = 'auto';
const todPanelEl = document.getElementById('todPanel');
const todToggleEl = document.getElementById('todToggle');
if (todToggleEl) todToggleEl.onclick = () => { closeConsoles('todPanel'); buildTod(); todPanelEl.classList.toggle('open'); };
function buildTod() {
  if (!todPanelEl) return;
  todPanelEl.innerHTML = '<div class="fxhead">TIME OF DAY</div>';
  TOD.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'fxrow' + (todSel === p.id ? ' on' : '');
    b.textContent = p.name;
    b.onclick = () => { dayLock = p.v; todSel = p.id; buildTod(); };
    todPanelEl.appendChild(b);
  });
}
buildTod();

// ---- fireworks launcher: load a colour canister into the mortar + fire -------
const MORTAR = [-3, -20];
{ // a little mortar rack near the stage front
  const m = new THREE.Group(); m.position.set(MORTAR[0], 0, MORTAR[1]);
  const tubeMat = new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.5, roughness: 0.6 });
  for (let i = 0; i < 5; i++) { const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.2, 0.9, 10), tubeMat); tube.position.set((i - 2) * 0.5, 0.45, 0); tube.castShadow = true; m.add(tube); }
  scene.add(m);
}
// a neon basketball hoop — walk near, click to shoot
const hoopHudEl = document.getElementById('hoopHud');
const hoop = buildHoop(scene, { pos: [11, 8], onScore: (n) => { flash(`🏀 SCORE! (${n})`); if (hoopHudEl) hoopHudEl.textContent = `🏀 made: ${n} · click to shoot`; } });

const FW_COLORS = ['#00F3FF', '#FF0055', '#39FF14', '#e6c04a', '#b967ff', '#ff6b35'];
let fwColor = FW_COLORS[0];
const fwPanelEl = document.getElementById('fwPanel');
const fwToggleEl = document.getElementById('fwToggle');
function closeConsoles(keepId) { ['fxPanel', 'todPanel', 'fwPanel'].forEach((id) => { if (id !== keepId) { const e = document.getElementById(id); if (e) e.classList.remove('open'); } }); }
if (fwToggleEl) fwToggleEl.onclick = () => { closeConsoles('fwPanel'); buildFw(); fwPanelEl.classList.toggle('open'); };
function buildFw() {
  if (!fwPanelEl) return;
  fwPanelEl.innerHTML = '<div class="fxhead">FIREWORKS <span>load + fire</span></div>';
  const chips = document.createElement('div'); chips.className = 'fwchips';
  FW_COLORS.forEach((cHex) => { const b = document.createElement('button'); b.className = 'fwchip' + (fwColor === cHex ? ' on' : ''); b.style.background = cHex; b.title = cHex; b.onclick = () => { fwColor = cHex; buildFw(); }; chips.appendChild(b); });
  fwPanelEl.appendChild(chips);
  const fire = document.createElement('button'); fire.className = 'fxrow'; fire.textContent = '🎆 FIRE';
  fire.onclick = () => { for (let i = 0; i < 3; i++) setTimeout(() => fireworks.launch({ color: fwColor, x: MORTAR[0] + (Math.random() - 0.5) * 6, z: MORTAR[1] }), i * 180); };
  fwPanelEl.appendChild(fire);
}
buildFw();

// PHOTO BOOTH in the back by the message board → the TRIPPY CAM (your webcam
// becomes the sky). Moved off the stage so the DJ decks own the stage.
const djbooth = buildDJBooth(scene, {
  pos: [-13, 0, 17],
  onActivate: () => hitDJBooth(),
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
  // hidden FX chips — clicking one unlocks a camera mode
  { const got = fxchips.tryClick(raycaster); if (got) { unlockFx(got); return; } }
  // near the hoop — a click shoots a ball instead of walking
  if (hoop.near(controls.pos)) { hoop.throwBall(camera); return; }
  // near the beer-pong table — a click tosses a ball at the cups
  if (tailgate.near(controls.pos)) { tailgate.throwBall(camera); return; }
  // characters next
  const hitC = raycaster.intersectObjects(characters.proxies, false)[0];
  if (hitC) {
    const c = characters.list.find((x) => x.proxy === hitC.object);
    if (c) { controls.walkTo(c.worldPos); return; }
  }
  // otherwise walk to the point on the ground — clamped to the arena so a click
  // on the sky / outside the grandstands can't send you running off forever
  const groundHit = raycaster.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (groundHit) {
    groundHit.x = THREE.MathUtils.clamp(groundHit.x, -controls.bounds, controls.bounds);
    groundHit.z = THREE.MathUtils.clamp(groundHit.z, controls.zMin, controls.bounds);
    controls.walkTo(groundHit);
  }
}
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const STAGE_PT = new THREE.Vector3(0, 1.6, -18); // audio swells as you approach this

// ---- resize ----
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, maxDPR));
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  fx.resize(innerWidth, innerHeight);
});
renderer.setSize(innerWidth, innerHeight);

// ---- beat clock (128 BPM) → pulse spikes on each beat ----
const BPM = 128;
const DAY_CYCLE = 150;     // seconds for a full midnight→midnight cycle
const DAY_START = 0.70;    // begin at dusk, sliding into night
const clock = new THREE.Clock();
let running = false, dayScrub = 0;
let shake = 0, lastBurst = -10, burstGap = 4;   // beat-drop fireworks + camera shake
const clockEl = document.getElementById('clock');

window.addEventListener('keydown', (e) => {           // [ and ] scrub time of day
  if (e.key === '[') { dayScrub -= 0.06; dayLock = null; todSel = 'auto'; buildTod(); }
  else if (e.key === ']') { dayScrub += 0.06; dayLock = null; todSel = 'auto'; buildTod(); }
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
    const dayT = dayLock != null ? dayLock : (((DAY_START + time / DAY_CYCLE + dayScrub) % 1) + 1) % 1;
    controls.bobEnabled = !reduceMotion;
    controls.update(dt);
    // beat-drop fireworks + camera shake on big bass spikes
    if (!reduceMotion && pulse > 0.85 && time - lastBurst > burstGap) {
      fireworks.burst(); shake = Math.max(shake, 0.4); lastBurst = time; burstGap = 3.5 + Math.random() * 3.5;
    }
    if (shake > 0.002) {
      camera.position.x += (Math.random() - 0.5) * shake;
      camera.position.y += (Math.random() - 0.5) * shake;
      camera.position.z += (Math.random() - 0.5) * shake * 0.5;
      shake = Math.max(0, shake - dt * 1.6);
    }
    festival.update(dt, time, pulse, dayT);
    crowd.update(dt, time, pulse);
    characters.update(dt, time, pulse);
    fireworks.update(dt);
    campfire.update(dt, time, pulse);
    tailgate.update(dt, time, pulse);
    lounge.update(dt, time, pulse);
    // spatial audio: swell as you near the stage/pit; open (not enclosed)
    reactor.setSpatial(THREE.MathUtils.clamp(1 - (controls.pos.distanceTo(STAGE_PT) - 6) / 40, 0.4, 1));
    reactor.setEnclosed(false);
    trash.update(dt, time, pulse, controls.pos);
    dealer.update(dt, time, pulse, controls.pos, trippy);
    board.update(dt, time, pulse);
    djbooth.update(dt, time, pulse, controls.pos);
    trippycam.update(dt);
    fxchips.update(dt, time, pulse);
    hoop.update(dt, time);
    if (hoopHudEl) hoopHudEl.classList.toggle('on', hoop.near(controls.pos));
    if (pongHudEl) pongHudEl.classList.toggle('on', tailgate.near(controls.pos));
    hud.update(controls.pos);
    if (boardHintEl) boardHintEl.classList.toggle('on', controls.pos.distanceTo(board.worldPos) < 5.5 && !boardOpen);
    if (clockEl) { const [ic, nm] = phaseName(dayT); clockEl.textContent = `${ic} ${nm}`; }
    renderActive(scene, camera);
  } else {
    // inside the lab portal — festival is parked, the music muffles
    reactor.setEnclosed(true);
    labPortal.update(dt, time);
    if (mode === 'zoom') updateZoom(dt);
    else applyPortaCamera();
    renderActive(labPortal.scene, camera);
  }
  fx.update(dt);
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
    // local pages load in-tab (each carries a portal home); external worlds
    // pop open in a Windows-style window over the festival — you never leave.
    if (sameTab) window.location.href = target;
    else openWindow(dest.name, target);
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
    gagDone = false;
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

let zoomProg = 0, gagDone = false;
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
  // the porta-potty's old CRT boots the Codex — the festival's encyclopedia.
  if (zoomProg >= 1 && !warping && !gagDone) {
    gagDone = true;
    playWarp({ accent: '#39ff14', name: 'THE CODEX' }, () => { window.location.href = 'codex.html'; });
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
// Hitting the DJ booth turns the cam on; once it's live, hitting it again
// randomizes the effect instead of shutting it off (use the HUD toggle for off).
function hitDJBooth() {
  if (trippycam.isActive()) { trippycam.randomizeEffect(); flash('remix the trippy cam'); }
  else trippycam.toggle();
}
function onTrippyCamState(on, err) {
  if (tripcamToggleEl) {
    tripcamToggleEl.classList.add('shown');
    tripcamToggleEl.textContent = on ? 'TRIPPY CAM: ON' : 'TRIPPY CAM: OFF';
    tripcamToggleEl.classList.toggle('active', on);
  }
  if (err) flash('camera blocked — allow it to look down on the festival');
  else flash(on ? 'look up — that’s you, over the whole festival' : 'trippy cam off');
}

// ---- photo booth: a clean, branded snapshot of the view (great for sharing) --
const photoBtn = document.getElementById('photobtn');
if (photoBtn) photoBtn.onclick = () => snapshot();
function snapshot() {
  // the HUD is DOM overlay, so the WebGL canvas is already UI-free — just render fresh
  renderActive(mode === 'festival' ? scene : labPortal.scene, camera);
  const src = renderer.domElement;
  const cv = document.createElement('canvas'); cv.width = src.width; cv.height = src.height;
  const g = cv.getContext('2d');
  g.drawImage(src, 0, 0);
  // subtle vignette + branding
  const grd = g.createRadialGradient(cv.width / 2, cv.height / 2, cv.height * 0.3, cv.width / 2, cv.height / 2, cv.height * 0.75);
  grd.addColorStop(0, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(0,0,0,0.35)');
  g.fillStyle = grd; g.fillRect(0, 0, cv.width, cv.height);
  g.textBaseline = 'alphabetic';
  g.font = `700 ${Math.round(cv.height * 0.03)}px ui-monospace, "JetBrains Mono", monospace`;
  g.shadowColor = 'rgba(0,243,255,0.7)'; g.shadowBlur = cv.width * 0.008;
  g.fillStyle = '#00F3FF'; g.fillText('12MATT3R // THE FESTIVAL', cv.width * 0.035, cv.height * 0.94);
  g.shadowBlur = 0; g.fillStyle = 'rgba(230,230,240,0.7)';
  g.font = `${Math.round(cv.height * 0.02)}px ui-monospace, "JetBrains Mono", monospace`;
  g.fillText('doesntmatter.us', cv.width * 0.035, cv.height * 0.975);
  const a = document.createElement('a');
  a.href = cv.toDataURL('image/jpeg', 0.92);
  a.download = `12matt3r-festival-${Date.now()}.jpg`;
  a.click();
  flash('snapshot saved 📸');
}

// dev-only debug bridge for automated testing (stripped from production builds)
if (import.meta.env.DEV) window.__dbg = {
  controls, trash, dealer, enterDestination, setTrippy,
  enterLabPortal, startZoom, exitPortal, portalState: () => ({ mode, zoomProg, warping }),
  openBoard, closeBoard, djbooth, trippycam, toggleTrippyCam, snapshot,
};
