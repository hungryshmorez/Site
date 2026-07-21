// The 12matt3r roster + store + labs, cast as characters and structures at a
// night festival. Each destination is someone (or somewhere) you walk up to.
// `model` selects the procedural build; `accent` drives aura + label colour.

export const PALETTE = {
  cyan: '#00F3FF',
  magenta: '#FF0055',
  green: '#39FF14',
  purple: '#b967ff',
  orange: '#ff6b35',
  gold: '#e6c04a',
  ink: '#e6e6f0',
  bg: '#05050e',
};

// Positions are world units on the festival ground. Stage is at -Z (the crowd
// faces it); spawn bench is at +Z. Walking the "flow": stage → pit → chill →
// VJ booth → merch vendor → the bathroom (labs) at the back.
export const DESTINATIONS = [
  {
    id: 'ravecharles', name: 'RAVE CHARLES', model: 'raver',
    role: 'headliner // masked on the main stage', accent: PALETTE.magenta,
    pos: [0, 0, -22], onStage: true, tag: 'rapper · DJ · founder',
    blurb: 'The masked headliner running the decks behind a glowing LED visor — nearly 400 shows across America, 2014–2020. Reach the front and his live-history timeline opens.',
    cta: 'Open the tour timeline',
  },
  {
    id: 'shmorez', name: 'SHMOREZ', model: 'marshmallow',
    role: 'in the pit // front-left', accent: PALETTE.orange,
    pos: [-8, 0, -6], tag: 'dubstep · weird bass',
    blurb: 'A toasted marshmallow man squishing to the bass in the pit — an animated electronic marshmallow squish of fire. His EPK (custom player, press assets, the drops) opens when you reach him.',
    cta: 'Enter SHMOREZ EPK',
  },
  {
    id: 'driftwave', name: 'DRIFTWAVE STATIC', model: 'vaporwave',
    role: 'chill zone // left', accent: PALETTE.purple,
    pos: [-14, 0, 2], tag: 'ambient · vaporwave',
    blurb: 'A chrome vaporwave figure in shades, haloed by a retro striped sun, holding down the slushwave chill zone. The calm counterweight to the main stage.',
    cta: 'Enter DriftWave EPK',
  },
  {
    id: 'tanky', name: 'TANKY JOHNSON', model: 'cowboy',
    role: 'crowd // right', accent: PALETTE.gold,
    pos: [11, 0, -4], tag: 'outlaw country',
    blurb: 'The outlaw of the void — a cowboy in a wide-brim hat with a glowing gold star, holding the right flank. Gold-on-black EPK: bio, latest tracks, and a booking desk.',
    cta: 'Enter Tanky EPK',
  },
  {
    id: 'studio', name: '12MATT3R', model: 'glitch',
    role: 'the VJ booth // visuals', accent: PALETTE.cyan,
    pos: [7, 0, 8], tag: 'glitch art · code · the collective',
    blurb: 'A glitching, RGB-splitting figure at the VJ booth driving every screen at the festival — the web-OS and glitch-art engine that houses all of this. The studio itself.',
    cta: 'Open the web-OS',
  },
  {
    id: 'store', name: 'THE MERCH TENT', model: 'stall',
    role: 'the vendor // commissions', accent: PALETTE.green,
    pos: [-6, 0, 12], tag: 'high-ticket commissions',
    blurb: 'The vendor working the merch tent. Productized packages — visual identity, audio branding, a web-OS build like this one — with pricing, a tip jar, and an intake + NDA flow. Where the experience converts.',
    cta: 'Browse commissions',
  },
  {
    id: 'labs', name: 'THE LAB', model: 'bathroom',
    role: 'the bathroom // experiments', accent: PALETTE.green,
    pos: [15, 0, 14], tag: 'trippy cam · dreamOS tv · deadnet',
    blurb: 'Every festival’s labs are in the bathroom. Duck into the glowing green stall to find the experiments — Trippy Cam, DreamOS TV, and Deadnet — the weird tools that prove what you can build.',
    cta: 'Enter the Lab',
  },
];
