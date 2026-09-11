import { buildDoor } from '../scene/door.js';

// The big walk-through LOOP. Each room has a BACK door (to the previous room) and a
// FORWARD door (to the next); the chain runs out of the warehouse and loops back to it.
// Edit ORDER to reshuffle the whole loop — every room reads its neighbours from here.
const ORDER = ['warehouse', 'dj', 'greenroom', 'lofi', 'abstract', 'studio', 'horrorcore', 'utility', 'gameroom', 'rooftop'];
const META = {
  warehouse:  { name: 'THE WAREHOUSE', page: 'warehouse.html', col: 0x8890e0 },
  dj:         { name: 'DJ DECKS',      page: 'dj.html',        col: 0x00f3ff },
  greenroom:  { name: 'GREEN ROOM',    page: 'greenroom.html', col: 0x39ff88 },
  lofi:       { name: 'LO-FI LOUNGE',  page: 'lofi.html',      col: 0xb967ff },
  abstract:   { name: 'ABSTRACT',      page: 'abstract.html',  col: 0x00ffa8 },
  studio:     { name: 'GLITCH ART',    page: 'studio.html',    col: 0x39ff14 },
  horrorcore: { name: 'HORRORCORE',    page: 'horrorcore.html',col: 0xff2b2b },
  utility:    { name: 'CONTROL ROOM',  page: 'utility.html',   col: 0xffb020 },
  gameroom:   { name: 'GAME ROOM',     page: 'gameroom.html',  col: 0xff66cc },
  rooftop:    { name: 'ROOFTOP',       page: 'rooftop.html',   col: 0x4ad0c0 },
};

export function loopNeighbors(id) {
  const i = ORDER.indexOf(id);
  const prev = META[ORDER[(i - 1 + ORDER.length) % ORDER.length]];
  const next = META[ORDER[(i + 1) % ORDER.length]];
  return { prev, next };
}

// Build a room's back + forward doors from its place in the loop.
//   back / next : [x, z, ry, wall?]   (omit one to skip that door)
// Returns an array of door objects — update()/tryEnter()/tap() them in the room's loop.
export function buildLoopDoors(scene, id, { back, next } = {}) {
  const nb = loopNeighbors(id);
  const out = [];
  if (back) out.push(buildDoor(scene, { x: back[0], z: back[1], ry: back[2] || 0, label: '◂ ' + nb.prev.name, url: nb.prev.page, color: nb.prev.col, wall: back[3] !== false }));
  if (next) out.push(buildDoor(scene, { x: next[0], z: next[1], ry: next[2] || 0, label: nb.next.name + ' ▸', url: nb.next.page, color: nb.next.col, wall: next[3] !== false }));
  return out;
}
