import * as THREE from 'three';
import { DESTINATIONS } from './data/destinations.js';
import { buildFestival } from './scene/festival.js';
import { buildCrowd } from './scene/crowd.js';
import { buildCharacters } from './scene/characters.js';
import { buildTrash } from './scene/trash.js';
import { buildDealer } from './scene/dealer.js';
import { buildBoard } from './scene/board.js';
import { NEWS } from './data/news.js';
import { ALIASES } from './data/catalog.js';
import { buildLabPortal } from './scene/labPortal.js';
import { buildPhotoBooth } from './scene/photobooth.js';
import { createTrippyCam } from './scene/trippycam.js';
import { buildCampfire } from './scene/campfire.js';
import { buildTailgate } from './scene/tailgate.js';
import { createGameZones } from './scene/gamezones.js';
import { buildLounge } from './scene/lounge.js';
import { buildFireworks } from './scene/fireworks.js';
import { buildConfetti } from './scene/confetti.js';
import { buildTent } from './scene/models.js';
import { openWindow } from './ui/popup.js';
import { createFXPass } from './scene/fxpass.js';
import { buildOrbs } from './scene/orbs.js';
import { buildVJ } from './scene/vjscreen.js';
import { buildVJBoard } from './scene/vjboard.js';
import { buildLaserShow } from './scene/laser.js';
import { buildDistortion } from './scene/distortion.js';
import { buildSecret } from './scene/secret.js';
import { createAdmin } from './scene/admin.js';
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
const confetti = buildConfetti(scene);
const CONFETTI_AT = new THREE.Vector3(0, 13, festival.stageZ + 8); // over the pit

// VJ screen — the stage video wall can play a muted, looping YouTube playlist
// you flip through live (⏮ / ⏭). Rides on top of the canvas via CSS3D so it
// tracks the stage screen's position/perspective as you walk.
const VJ_PLAYLIST = 'PLTHYibH4Hb0Y';
// two 16:9 panels flanking the stage (no black bars); the centered DJ booth
// sits in the open gap between them, so the video reads as behind/around it.
// two 16:9 stage panels (these can carry sound via the "listen" toggle) plus a
// row of big BILLBOARDS hung high on each side wall so the whole room can watch;
// each billboard starts at a different playlist index, so many VJ clips play at
// once across the room. Billboards are heavy (one YouTube player each) so we run
// fewer on phones.
// ONE centered stage screen (behind the DJ booth). Two flanking players drift
// apart and one can fail to autoplay — a single screen stays in sync with itself
// and always plays. The side billboards below still carry the rest of the clips.
const VJ_STAGE = [
  { pos: [0, 7.0, -30.7], size: [13, 7.3], audio: true },
];
const BB_Z = isMobile ? [-2] : [-20, -2, 16]; // 1/side on mobile, 3/side on desktop
const vjBillboards = [];
BB_Z.forEach((z, i) => {
  vjBillboards.push({ pos: [-31, 10.5, z], size: [10, 5.6], rotY: Math.PI / 2, index: 1 + i });
  vjBillboards.push({ pos: [31, 10.5, z], size: [10, 5.6], rotY: -Math.PI / 2, index: 1 + BB_Z.length + i });
});
const vj = buildVJ({
  container: document.body,
  playlist: VJ_PLAYLIST,
  panels: [...VJ_STAGE, ...vjBillboards],
});
// the VJ board (by the lab) is where you run the stage screens
const vjboard = buildVJBoard(scene, { pos: [5, 0, 18], onActivate: () => toggleVJ() });

// aimable laser show — emitters across the top of the stage truss; beams track
// where you look while the show is on.
const laserShow = buildLaserShow(scene, {
  emitters: [[-11, 10.4, -30.2], [-6.6, 10.4, -30.2], [-2.2, 10.4, -30.2], [2.2, 10.4, -30.2], [6.6, 10.4, -30.2], [11, 10.4, -30.2]],
});

// (basketball + shooting gallery moved into the arcade tent — arcade.html)

// spatial distortion fields — walk through one and space bends
const distortion = buildDistortion(scene, {
  fields: [
    { id: 'a', pos: [3, 4], r: 3.4, color: '#00f3ff' },
    { id: 'b', pos: [-4, 13], r: 3.2, color: '#b967ff' },
    { id: 'c', pos: [14, 0], r: 3.6, color: '#39ff14' },
  ],
});
const BASE_FOV = camera.fov;
let inWarp = false;

// secret backstage vault — find the hidden keycard, then open the fake wall
const secret = buildSecret(scene, {
  vaultPos: [-15, -20], cardPos: [22, 20],
  onFlash: (m) => flash(m),
  onReward: () => { flash('🎟 BACKSTAGE PASS — welcome to the inner circle'); openWindow('BACKSTAGE PASS', 'https://discord.gg/cxMW3aSmKX'); },
});

// hidden trash-hunt → clean the grounds → secret download
const DUMPSTER_POS = [-22, -20];
const trash = buildTrash(scene, {
  dumpsterPos: DUMPSTER_POS,
  onPickup: (label, s) => { flash(`picked up ${label}`); trashHudUpdate(s); },
  onDeposit: (n, s) => { flash(n === 1 ? 'tossed it in the dumpster' : `dumped ${n} pieces`); trashHudUpdate(s); },
  onComplete: (s) => { trashHudUpdate(s); unlockReward(); },
});
// a wall-mounted work light angled down onto the dumpster so it reads at night
const dumpPole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 8, 8), new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.6, roughness: 0.5 }));
dumpPole.position.set(DUMPSTER_POS[0] - 3, 4, DUMPSTER_POS[1]); scene.add(dumpPole);
const dumpLight = new THREE.SpotLight(0xfff0d0, 60, 22, Math.PI / 7, 0.55, 1.4);
dumpLight.position.set(DUMPSTER_POS[0] - 3, 7.6, DUMPSTER_POS[1]);
dumpLight.target.position.set(DUMPSTER_POS[0], 1, DUMPSTER_POS[1]);
scene.add(dumpLight); scene.add(dumpLight.target);

// a dealer hidden in the crowd → reach him to score the TRI-PPY (rainbow warp)
const DEALER_POS = [-13, -13];
const dealer = buildDealer(scene, {
  pos: DEALER_POS,
  stageZ: festival.stageZ,
  onToggle: () => reachDealer(),
});

// Shmorez's campfire micro-scene (fire + roasting NPCs) out back by his spot,
// with a tent pitched behind him.
const CAMPFIRE_POS = [12, 16];
const campfire = buildCampfire(scene, { pos: CAMPFIRE_POS, roasters: 3 });
const TENT_POS = [16, 21];
const tent = buildTent(scene, { pos: TENT_POS, accent: '#ff6b35' });

// everything faces the center of the grounds (front = +Z toward [0,-4])
const faceCenter = (x, z) => Math.atan2(0 - x, -4 - z);

// Tanky's tailgate: lifted truck + beer pong + ping-pong tosses, by his spot.
// The bed/tailgate (party side, +Z) faces center; the cab backs into the corner.
const TAILGATE_POS = [19, 15];
const BEERPONG_POS = [15, 11];   // its own spot now — separate from the truck
const pongHudEl = document.getElementById('pongHud');
const tailgate = buildTailgate(scene, {
  pos: TAILGATE_POS, rot: faceCenter(TAILGATE_POS[0], TAILGATE_POS[1]),
  pongPos: BEERPONG_POS, pongRot: faceCenter(BEERPONG_POS[0], BEERPONG_POS[1]),
  onState: (msg, turn) => { if (pongHudEl) pongHudEl.textContent = msg; if (turn === 'over') flash(msg); },
});

// Sofa King's elevated lounge (riser + audience couches) at his spot. The
// audience side (-Z) points at center, so the couches sit between him and it.
const LOUNGE_POS = [11, -6];   // on Sofa King's spot so he sits centered on the riser
const lounge = buildLounge(scene, { pos: LOUNGE_POS, rot: faceCenter(LOUNGE_POS[0], LOUNGE_POS[1]) + Math.PI });

// the 12matt3r hub board → walk up, read news, sign the guest book
const BOARD_POS = [-14, 20];
const board = buildBoard(scene, {
  pos: BOARD_POS,
  stageZ: festival.stageZ,
  onOpen: () => openBoard(),
});

const BIG = new Set(['stall', 'labsstage', 'bathroom', 'sofaboi', 'doorway', 'circustent']);
const crowd = buildCrowd(scene, {
  count: isMobile ? 190 : 340,
  rail: isMobile ? 40 : 70,
  stageZ: festival.stageZ,
  exclude: [
    // [x, z, clear-radius] — bigger clearing around structures, plus spawn
    ...DESTINATIONS.map((d) => [d.pos[0], d.pos[2], BIG.has(d.model) ? 6.5 : 3.6]),
    [-18, 18, 4.5],         // spawn (bottom-left corner)
    [-10, 20, 2.8],         // park bench by the board
    [5, 18, 3],             // VJ board by the lab
    [-15, -20, 4],          // secret backstage vault
    [DUMPSTER_POS[0], DUMPSTER_POS[1], 4],
    [DEALER_POS[0], DEALER_POS[1], 2.4],
    [BOARD_POS[0], BOARD_POS[1], 3],
    [CAMPFIRE_POS[0], CAMPFIRE_POS[1], 4.5],
    [TAILGATE_POS[0], TAILGATE_POS[1], 6.5],
    [LOUNGE_POS[0], LOUNGE_POS[1] - 3, 5],
  ],
});
const controls = new WalkControls(camera, { bounds: 24, eye: 1.6, zMin: -30 });
// spawn in the bottom-left corner for a diagonal entry toward the dancefloor
controls.pos.set(-18, 1.6, 18);
if (controls.yaw !== undefined) controls.yaw = -Math.PI * 0.75; // face into the grounds

// beer pong asks before it grabs your clicks, then stands you at the table
const gamezones = createGameZones({ controls, camera });
// stand right at the near end of the table (its length runs toward centre),
// looking down it at the cups — up close, like real beer pong
gamezones.register({ id: 'beerpong', label: 'Beer Pong', emoji: '🍺', accent: '#e6c04a', near: (p) => tailgate.near(p), spotFn: () => tailgate.playSpot(), play: (cam) => tailgate.throwBall(cam) });
// let the player walk up the ramp onto the stage deck
controls.groundAt = (x, z) => {
  const d = festival.deck;
  if (x < -d.halfW || x > d.halfW || z >= d.rampFront) return 0;
  if (z <= d.zFront) return d.top;                                  // on the deck
  return ((d.rampFront - z) / (d.rampFront - d.zFront)) * d.top;    // up the ramp
};
const hud = new Hud(document.getElementById('tags'), camera, characters.list, enterDestination);

// ---- the dealer's drugs: pick up effect ORBS around the map, carry them to
// the dealer to put them "in stock", then buy one to trip on that camera effect
// for a limited time. TRIP is the dealer's signature (always in stock). --------
const BASE_ORBS = ['crt', 'vhs', 'ascii', 'gameboy', 'wireframe'];
const SHADERS = ['crt', 'vhs', 'ascii', 'gameboy', 'wireframe', 'trip'];
const DRUGS = [
  { id: 'trip', name: 'TRIP', mode: 'trip', dur: 30, stock: true },
  { id: 'crt', name: 'CRT', mode: 'crt', dur: 25 },
  { id: 'vhs', name: 'VHS', mode: 'vhs', dur: 25 },
  { id: 'ascii', name: 'ASCII', mode: 'ascii', dur: 25 },
  { id: 'gameboy', name: 'GAMEBOY', mode: 'gameboy', dur: 25 },
  { id: 'wireframe', name: 'WIREFRAME', mode: 'wireframe', dur: 25 },
  { id: 'everything', name: 'EVERYTHING', dur: 90, final: true }, // unlocked once you deliver every orb
];
const DRUG_STORE = 'drugsOwned';
let owned = [];
try { owned = JSON.parse(localStorage.getItem(DRUG_STORE) || '[]'); } catch (e) { owned = []; }
let carrying = null;             // drug id being carried to the dealer
let activeDrug = null, drugTime = 0;  // currently tripping + seconds left
let trippy = false;              // true while a drug is active (drives the dealer's glow)
let lastShader = null, camByDrug = false;
const hasAllOrbs = () => BASE_ORBS.every((id) => owned.includes(id));
const inStock = (id) => id === 'everything' ? hasAllOrbs() : (DRUGS.find((d) => d.id === id)?.stock || owned.includes(id));
// scatter orbs only for the base effects you don't have in stock yet
const orbs = buildOrbs(scene, { need: BASE_ORBS.filter((id) => !owned.includes(id)) });
const randBtnEl = document.getElementById('randBtn');
if (randBtnEl) randBtnEl.onclick = () => { if (activeDrug === 'everything') { randomizeEverything(true); flash('🎲 remix — everything swaps'); } };

// ---- VJ controls: run from the in-world VJ board by the lab ----
const vjBarEl = document.getElementById('vjBar');
const vjHudEl = document.getElementById('vjHud');
function toggleVJ() {
  const on = vj.toggle();
  if (vjBarEl) vjBarEl.classList.toggle('shown', on);
  flash(on ? '🎬 screens live — ⏮ ⏭ to switch clips' : 'VJ screens off');
}
{
  const p = document.getElementById('vjPrev'), n = document.getElementById('vjNext');
  if (p) p.onclick = () => { vj.prev(); flash('⏮ previous clip'); };
  if (n) n.onclick = () => { vj.next(); flash('⏭ next clip'); };
  // submit a link → play any YouTube video across every screen
  const linkBtn = document.getElementById('vjLink');
  if (linkBtn) linkBtn.onclick = () => {
    const url = window.prompt('Paste a YouTube link to play on the screens (blank = back to the VJ playlist):', '');
    if (url === null) return;
    if (url.trim() === '') { vj.clearLink(); flash('🎬 back to the VJ playlist'); return; }
    if (vj.playLink(url)) { if (!vj.isOn()) toggleVJ(); flash('🔗 playing your link'); }
    else flash('couldn’t read that link — paste a YouTube URL');
  };
  // listen → un-mute the stage feed and duck the festival track so you can hear
  // the video that’s on the VJ screens
  const listenBtn = document.getElementById('vjListen');
  const track = document.getElementById('track');
  if (listenBtn) listenBtn.onclick = () => {
    const listening = vj.toggleListen();
    listenBtn.classList.toggle('on', listening);
    listenBtn.textContent = listening ? '🔊 VJ audio' : '🔇 VJ audio';
    // fully stop the festival anthem while you listen to the video, so only ONE
    // thing plays; pausing (not just volume 0) guarantees no bleed-through
    if (track) { track.muted = listening; if (listening) track.pause(); else { track.volume = 0.5; track.play().catch(() => {}); } }
    flash(listening ? '🔊 listening to the VJ feed' : '🔇 VJ muted — festival audio back');
  };
}

// ---- aimable laser show: toggle, then the beams follow your gaze ----
const laserBtnEl = document.getElementById('laserToggle');
function toggleLasers() {
  const on = laserShow.toggle();
  if (laserBtnEl) laserBtnEl.classList.toggle('active', on);
  flash(on ? '🔦 lasers on — look around to aim the beams' : 'lasers off');
}
if (laserBtnEl) laserBtnEl.onclick = toggleLasers;
const LASER_AIM = new THREE.Vector3();
const SCREEN_CENTER = new THREE.Vector2(0, 0);
function aimLasers() {
  raycaster.setFromCamera(SCREEN_CENTER, camera);
  const hit = raycaster.ray.intersectPlane(GROUND, LASER_AIM);
  if (!hit || LASER_AIM.distanceTo(camera.position) > 90) {
    // looking up / past the floor → send the beams far along the gaze into the sky
    LASER_AIM.copy(camera.position).addScaledVector(raycaster.ray.direction, 55);
  }
  laserShow.setAim(LASER_AIM);
}

const carryHudEl = document.getElementById('carryHud');
const drugHudEl = document.getElementById('drugHud');
const dealerPanelEl = document.getElementById('dealerPanel');
function updateCarryHud() {
  if (!carryHudEl) return;
  carryHudEl.classList.toggle('on', !!carrying);
  if (carrying) carryHudEl.textContent = `💊 carrying the ${DRUGS.find((d) => d.id === carrying).name} orb — take it to the dealer`;
}
function pickupOrb(id) {
  if (carrying) { flash('hands full — deliver that orb to the dealer first'); return; }
  carrying = id; updateCarryHud();
  flash(`picked up the ${DRUGS.find((d) => d.id === id).name} orb — find the dealer`);
}
function reachDealer() {
  if (carrying) { // deliver → in stock
    if (!owned.includes(carrying)) { owned.push(carrying); try { localStorage.setItem(DRUG_STORE, JSON.stringify(owned)); } catch (e) { /* noop */ } }
    flash(`the dealer pockets the ${DRUGS.find((d) => d.id === carrying).name} orb — it's on the menu now`);
    carrying = null; updateCarryHud();
  }
  openDealerMenu();
}
function openDealerMenu() {
  if (!dealerPanelEl) return;
  closeConsoles('dealerPanel');
  dealerPanelEl.innerHTML = '<div class="fxhead">THE DEALER <span>what you havin\'?</span></div>';
  DRUGS.forEach((d) => {
    if (d.id === 'everything' && !inStock('everything')) { // locked final unlock (teaser)
      const need = BASE_ORBS.filter((id) => !owned.includes(id)).length;
      const b = document.createElement('button'); b.className = 'fxrow locked';
      b.textContent = '🔒 EVERYTHING';
      const s = document.createElement('span'); s.className = 'fxhint'; s.textContent = `deliver all the orbs (${need} left) to unlock`; b.appendChild(s);
      dealerPanelEl.appendChild(b); return;
    }
    if (!inStock(d.id)) return; // base effect still out there as an orb
    const b = document.createElement('button'); b.className = 'fxrow' + (activeDrug === d.id ? ' on' : '');
    b.textContent = `💊 ${d.name}`;
    const s = document.createElement('span'); s.className = 'fxhint'; s.textContent = d.final ? 'trippy cam + random shaders' : `${d.dur}s trip`; b.appendChild(s);
    b.onclick = () => { buyDrug(d.id); };
    dealerPanelEl.appendChild(b);
  });
  const missing = BASE_ORBS.filter((id) => !owned.includes(id)).length;
  if (missing) { const n = document.createElement('div'); n.className = 'fxhint'; n.style.padding = '6px'; n.textContent = `${missing} more orb${missing === 1 ? '' : 's'} hidden on the grounds`; dealerPanelEl.appendChild(n); }
  dealerPanelEl.classList.add('open');
}
function buyDrug(id) {
  const d = DRUGS.find((x) => x.id === id); if (!d) return;
  activeDrug = id; drugTime = d.dur; trippy = true;
  if (id === 'everything') {
    // the final unlock: turn the trippy cam on + a random fullscreen shader; hit
    // RANDOMIZE to swap through all the shaders + re-randomize the cam
    camByDrug = !trippycam.isActive();
    if (camByDrug) trippycam.start();
    randomizeEverything(false);
    if (randBtnEl) randBtnEl.classList.add('shown');
    flash('EVERYTHING — the whole level melts. hit 🎲 to swap');
  } else {
    fx.setMode(d.mode);
    flash(`you take the ${d.name}${d.id === 'trip' ? ' — everything melts' : ''}`);
  }
  if (dealerPanelEl) dealerPanelEl.classList.remove('open');
  if (drugHudEl) drugHudEl.classList.add('on');
}
function randomizeEverything(resetTimer = true) {
  let m = lastShader; while (m === lastShader && SHADERS.length > 1) m = SHADERS[(Math.random() * SHADERS.length) | 0];
  lastShader = m; fx.setMode(m);
  if (trippycam.isActive()) trippycam.randomizeEffect();
  if (resetTimer) drugTime = DRUGS.find((d) => d.id === 'everything').dur;
}
function endDrug() {
  const wasEverything = activeDrug === 'everything';
  activeDrug = null; drugTime = 0; fx.setMode('normal'); trippy = false; lastShader = null;
  if (wasEverything) { if (randBtnEl) randBtnEl.classList.remove('shown'); if (camByDrug) { trippycam.stop(); camByDrug = false; } }
  if (drugHudEl) drugHudEl.classList.remove('on');
  flash('you come back down');
}

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
const FW_COLORS = ['#00F3FF', '#FF0055', '#39FF14', '#e6c04a', '#b967ff', '#ff6b35'];
let fwColor = FW_COLORS[0];
const fwPanelEl = document.getElementById('fwPanel');
const fwToggleEl = document.getElementById('fwToggle');
function closeConsoles(keepId) { ['dealerPanel', 'todPanel', 'fwPanel', 'sizePanel'].forEach((id) => { if (id !== keepId) { const e = document.getElementById(id); if (e) e.classList.remove('open'); } }); }
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

// ---- world resize: scale the player so the whole festival feels tiny or huge --
const SIZES = [
  { id: 'ant', name: '🐜 ANT', s: 0.35 },
  { id: 'small', name: 'SHRUNK', s: 0.62 },
  { id: 'normal', name: 'NORMAL', s: 1 },
  { id: 'tall', name: 'TOWERING', s: 2.4 },
  { id: 'giant', name: '🗼 GIANT', s: 5 },
];
let sizeSel = 'normal';
const BASE_EYE = controls.eye, BASE_SPEED = controls.speed;
const sizePanelEl = document.getElementById('sizePanel');
const sizeToggleEl = document.getElementById('sizeToggle');
if (sizeToggleEl) sizeToggleEl.onclick = () => { closeConsoles('sizePanel'); buildSize(); sizePanelEl.classList.toggle('open'); };
function setSize(s, id) {
  sizeSel = id;
  controls.eye = BASE_EYE * s;
  controls.speed = BASE_SPEED * THREE.MathUtils.clamp(s, 0.55, 3.2); // bigger strides, but capped
  flash(s === 1 ? 'back to normal size' : s < 1 ? 'the festival looms huge around you' : 'you tower over the whole festival');
}
function buildSize() {
  if (!sizePanelEl) return;
  sizePanelEl.innerHTML = '<div class="fxhead">WORLD SIZE <span>resize yourself</span></div>';
  SIZES.forEach((p) => {
    const b = document.createElement('button');
    b.className = 'fxrow' + (sizeSel === p.id ? ' on' : '');
    b.textContent = p.name;
    b.onclick = () => { setSize(p.s, p.id); buildSize(); };
    sizePanelEl.appendChild(b);
  });
}
buildSize();

// PHOTO BOOTH in the back by the message board → the TRIPPY CAM (your webcam
// becomes the sky). Moved off the stage so the DJ decks own the stage.
const djbooth = buildPhotoBooth(scene, {
  pos: [-6, 0, 21],
  onActivate: () => hitDJBooth(),
});
const trippycam = createTrippyCam(scene, { onState: (on, err) => onTrippyCamState(on, err) });

// ---- in-scene labels: a floating billboard name over every station + prop,
// so the whole map reads as an annotated space (not an abstract sandbox). Each
// is a camera-facing sprite; they fade with distance so nearby ones stand out.
const sceneLabels = [];
const labelById = {};
function makeLabel(text, x, z, y = 3.4, color = '#eaeaf5') {
  const c = document.createElement('canvas'); c.width = 512; c.height = 96;
  const g = c.getContext('2d');
  const draw = (t) => {
    g.clearRect(0, 0, 512, 96);
    g.font = '600 46px ui-monospace, "JetBrains Mono", monospace';
    g.textAlign = 'center'; g.textBaseline = 'middle';
    g.lineWidth = 8; g.strokeStyle = 'rgba(0,0,0,.85)'; g.strokeText(t, 256, 52);
    g.shadowColor = color; g.shadowBlur = 12; g.fillStyle = color; g.fillText(t, 256, 52);
  };
  draw(text);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, depthTest: true });
  const s = new THREE.Sprite(mat); s.position.set(x, y, z);
  const w = 6.2; s.scale.set(w, w * 96 / 512, 1); s.renderOrder = 5;
  // let the editor rename it live
  s.userData.setText = (t) => { draw(t || ' '); tex.needsUpdate = true; };
  scene.add(s); sceneLabels.push(s);
  return s;
}
// every destination gets a persistent name label
for (const d of DESTINATIONS) labelById['dest_' + d.id] = makeLabel(d.name, d.pos[0], d.pos[2], 3.6, d.accent || '#eaeaf5');
// props + points of interest
labelById.stage = makeLabel('MAIN STAGE', 0, festival.stageZ + 2, 6.2, '#00f3ff');
labelById.spawn = makeLabel('YOU SPAWN HERE', -18, 18, 2.6, '#ff8a1e');
labelById.bench = makeLabel('PARK BENCH', -10, 20, 2.2, '#39ff14');
labelById.board = makeLabel('MESSAGE BOARD', BOARD_POS[0], BOARD_POS[1], 3.4, '#00f3ff');
labelById.photo = makeLabel('PHOTO BOOTH', -6, 21, 3.2, '#ff0055');
labelById.vjboard = makeLabel('VJ BOARD', 5, 18, 2.8, '#b967ff');
labelById.campfire = makeLabel('CAMPFIRE', CAMPFIRE_POS[0], CAMPFIRE_POS[1], 3.0, '#ff6b35');
labelById.truck = makeLabel('TRUCK', TAILGATE_POS[0], TAILGATE_POS[1], 4.4, '#e6c04a');
labelById.beerpong = makeLabel('BEER PONG', BEERPONG_POS[0], BEERPONG_POS[1], 2.8, '#e6c04a');
labelById.lounge = makeLabel('LOUNGE', LOUNGE_POS[0], LOUNGE_POS[1], 3.0, '#b967ff');
labelById.dumpster = makeLabel('DUMPSTER', DUMPSTER_POS[0], DUMPSTER_POS[1], 3.2, '#39ff14');
labelById.dealer = makeLabel('DEALER', DEALER_POS[0], DEALER_POS[1], 2.8, '#ff0055');
labelById.tent = makeLabel('TENT', TENT_POS[0], TENT_POS[1], 3.8, '#ff6b35');

// ---- admin / layout editor: register every movable thing (destinations +
// props) so it can be dragged and its position exported. ----
const adminItems = [];
for (const c of characters.list) adminItems.push({ id: 'dest_' + c.dest.id, label: c.dest.name, obj: c.group, worldPos: c.worldPos, sprite: labelById['dest_' + c.dest.id], dest: c.dest });
const addProp = (id, obj, sprite) => { if (obj) adminItems.push({ id, label: id.toUpperCase(), obj, sprite }); };
addProp('dumpster', trash.group, labelById.dumpster);
addProp('dealer', dealer.group, labelById.dealer);
addProp('campfire', campfire.group, labelById.campfire);
addProp('truck', tailgate.group, labelById.truck);
addProp('beerpong', tailgate.pong, labelById.beerpong);
addProp('lounge', lounge.group, labelById.lounge);
addProp('board', board.group, labelById.board);
addProp('vjboard', vjboard.group, labelById.vjboard);
addProp('photobooth', djbooth.group, labelById.photo);
addProp('vault', secret.group, null);
addProp('tent', tent.group, labelById.tent);
// name tags are for the editor only — hidden during normal play
for (const s of sceneLabels) s.visible = false;
const admin = createAdmin({ scene, camera, renderer, controls, worldId: 'festival', items: adminItems });

// the arcade tent has a real door — walk through it to enter (no clicking).
// The tent sits past the arena bound, and its door faces the grounds, so the
// entry waypoint is the DOORWAY (the tent centre stepped toward the middle of
// the field) — otherwise the invisible bound stops you a couple units short of a
// trigger centred on the tent's hidden middle, and the door feels blocked.
const arcadeDest = DESTINATIONS.find((d) => d.id === 'arcade');
const _arcadeCenter = (characters.list.find((c) => c.dest.id === 'arcade') || {}).worldPos;
const arcadeWP = _arcadeCenter
  ? _arcadeCenter.clone().addScaledVector(new THREE.Vector3(0 - _arcadeCenter.x, 0, -4 - _arcadeCenter.z).normalize(), 5.3)
  : null;

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
  if (admin.active) { /* overhead editor: no first-person look */ }
  else if (mode === 'festival') controls.look(mx, my);
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
  // layout editor intercepts taps to select/place things
  if (admin.active) { admin.tap({ clientX: sx, clientY: sy }); return; }
  ndc.x = (sx / innerWidth) * 2 - 1;
  ndc.y = -(sy / innerHeight) * 2 + 1;
  raycaster.setFromCamera(ndc, camera);
  // trash first — clicking a piece picks it up (don't walk)
  if (trash.tryClick(raycaster)) return;
  // the dealer — clicking him toggles the trip
  if (dealer.tryClick(raycaster)) return;
  // the hub board — clicking it opens news + guest book
  if (board.tryClick(raycaster)) return;
  // the photo booth by the board — toggles the trippy cam
  if (djbooth.tryClick(raycaster)) return;
  // the VJ board by the lab — runs the stage screens
  if (vjboard.tryClick(raycaster)) return;
  // effect orbs — clicking one picks it up to carry to the dealer
  { const got = orbs.tryClick(raycaster); if (got) { pickupOrb(got); return; } }
  // beer pong: only toss while actually playing (entered via its "Play?" prompt)
  // so wandering past the table never hijacks your clicks
  if (gamezones.onTap()) return;
  // the secret keycard / backstage vault
  if (secret.tryClick(raycaster)) return;
  // characters next
  const hitC = raycaster.intersectObjects(characters.proxies, false)[0];
  if (hitC) {
    const c = characters.list.find((x) => x.proxy === hitC.object);
    if (c) { controls.walkTo(c.worldPos); return; }
  }
  // otherwise walk to the point on the ground — clamped to the arena so a click
  // on the sky / outside the grandstands can't send you running off forever
  let groundHit = raycaster.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (!groundHit) {
    // clicked the wall / above the horizon → walk toward that heading to the edge
    const d = raycaster.ray.direction;
    groundHit = new THREE.Vector3(controls.pos.x + d.x * 60, 0, controls.pos.z + d.z * 60);
  }
  groundHit.x = THREE.MathUtils.clamp(groundHit.x, -controls.bounds, controls.bounds);
  groundHit.z = THREE.MathUtils.clamp(groundHit.z, controls.zMin, controls.bounds);
  controls.walkTo(groundHit);
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
  vj.resize();
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
  if (document.hidden) return; // don't render/update while the tab is backgrounded
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
    admin.update(dt);
    // beat-drop fireworks + camera shake on big bass spikes
    if (!reduceMotion && pulse > 0.85 && time - lastBurst > burstGap) {
      fireworks.burst(); confetti.burst(CONFETTI_AT); shake = Math.max(shake, 0.4); lastBurst = time; burstGap = 3.5 + Math.random() * 3.5;
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
    fireworks.update(dt); confetti.update(dt);
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
    vjboard.update(dt, time, pulse);
    if (vjHudEl) vjHudEl.classList.toggle('on', vjboard.near(controls.pos));
    if (laserShow.isActive()) { aimLasers(); laserShow.update(dt, time, pulse); }
    // spatial distortion fields: space bends while you stand inside one
    const warpId = distortion.update(dt, time, pulse, controls.pos);
    if (warpId && !inWarp) { inWarp = true; body.classList.add('bending'); flash('◈ space bends around you'); }
    else if (!warpId && inWarp) { inWarp = false; body.classList.remove('bending'); camera.fov = BASE_FOV; camera.updateProjectionMatrix(); }
    if (inWarp && !reduceMotion) { camera.fov = BASE_FOV + Math.sin(time * 3) * 7; camera.updateProjectionMatrix(); }
    secret.update(dt, time, pulse, controls.pos);
    trippycam.update(dt);
    orbs.update(dt, time, pulse);
    { const grabbed = orbs.pickNear(controls.pos); if (grabbed) pickupOrb(grabbed); } // walk into an orb to grab it
    if (activeDrug) { drugTime -= dt; if (drugHudEl) drugHudEl.textContent = `💊 ${DRUGS.find((d) => d.id === activeDrug).name} · ${Math.ceil(drugTime)}s`; if (drugTime <= 0) endDrug(); }
    gamezones.update(controls.pos);
    if (pongHudEl) pongHudEl.classList.toggle('on', gamezones.isPlaying());
    // walk through the arcade tent's doorway → step right into the arcade
    if (!warping && !admin.active && arcadeWP && controls.pos.distanceTo(arcadeWP) < 4) enterDestination(arcadeDest);
    hud.update(controls.pos);
    if (boardHintEl) boardHintEl.classList.toggle('on', controls.pos.distanceTo(board.worldPos) < 5.5 && !boardOpen);
    if (clockEl) { const [ic, nm] = phaseName(dayT); clockEl.textContent = `${ic} ${nm}`; }
    renderActive(scene, admin.active ? admin.cam : camera);
    vj.setPaused(false);
    vj.render(admin.active ? admin.cam : camera);
  } else {
    // inside the lab portal — festival is parked, the music muffles
    vj.setPaused(true);
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
  renderArtists();
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

// the artist directory — each card opens the artist's EPK + links in the
// in-site Windows-style popup (you never leave the festival)
function renderArtists() {
  const wrap = document.getElementById('artistCards');
  if (!wrap) return;
  wrap.textContent = '';
  for (const a of ALIASES) {
    const card = document.createElement('div'); card.className = 'acard';
    const n = document.createElement('div'); n.className = 'an'; n.textContent = a.name; card.appendChild(n);
    const g = document.createElement('div'); g.className = 'ag'; g.textContent = a.genre || ''; card.appendChild(g);
    const links = document.createElement('div'); links.className = 'alnks';
    if (a.epk) {
      const b = document.createElement('button'); b.className = 'epk'; b.textContent = 'EPK';
      b.onclick = () => openWindow(a.name, a.epk); links.appendChild(b);
    }
    for (const l of (a.links || [])) {
      const b = document.createElement('button'); b.textContent = l.name;
      b.onclick = () => openWindow(`${a.name} · ${l.name}`, l.url); links.appendChild(b);
    }
    card.appendChild(links); wrap.appendChild(card);
  }
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

// ---- TRIPPY CAM (flipped at the photo booth) -------------------------------
const tripcamToggleEl = document.getElementById('tripcamToggle');
if (tripcamToggleEl) tripcamToggleEl.onclick = () => toggleTrippyCam();
function toggleTrippyCam() { trippycam.toggle(); }
// Stepping into the photo booth turns the cam on; once it's live, hitting it
// again randomizes the effect instead of shutting it off (HUD toggle for off).
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
  // the cam sphere IS the sky while it's live — hide the festival sky dome and
  // the stars (some sit inside the cam sphere and would bleed in front of your
  // face) so the webcam feed owns the whole sky cleanly, then restore on off.
  if (festival.sky) festival.sky.visible = !on;
  if (festival.stars) festival.stars.visible = !on;
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
  controls, trash, dealer, enterDestination, buyDrug, reachDealer,
  enterLabPortal, startZoom, exitPortal, portalState: () => ({ mode, zoomProg, warping }),
  openBoard, closeBoard, djbooth, trippycam, toggleTrippyCam, snapshot,
};

// __world hook — overhead-screenshot harness only (activated with ?shot in the
// URL); exposes the scene so an offline top-down render can be captured. No-op
// for normal visitors.
if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('shot')) {
  window.__world = { THREE, scene, camera, renderer };
}
