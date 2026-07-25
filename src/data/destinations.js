// The 12matt3r roster + store + labs, cast as characters and structures at a
// night festival. Each destination is someone (or somewhere) you walk up to.
// `model` selects the procedural build; `accent` drives aura + label colour;
// `url` is the real place the CTA opens; `rot` overrides facing when needed.

export const PALETTE = {
  cyan: '#00F3FF',
  magenta: '#FF0055',
  green: '#39FF14',
  purple: '#b967ff',
  indigo: '#6a6cff',
  orange: '#ff6b35',
  gold: '#e6c04a',
  ink: '#e6e6f0',
  bg: '#05050e',
};

export const DESTINATIONS = [
  {
    id: 'ravecharles', name: 'RAVE CHARLES', model: 'raver',
    role: 'headliner // down in the pit', accent: PALETTE.magenta,
    pos: [-8, 0, -13], tag: 'rapper · DJ · founder',
    url: 'https://express.adobe.com/page/s43NCJty7DfTO/',
    blurb: 'The masked headliner, down in the mosh pit with the crowd instead of above it — glowing LED visor, nearly 400 shows across America, 2014–2020. Reach him and his live-history timeline opens.',
    cta: 'Open the tour timeline',
  },
  {
    id: 'shmorez', name: 'SHMOREZ', model: 'marshmallow',
    role: 'in the pit // front-left', accent: PALETTE.orange,
    pos: [4, 0, -11], tag: 'electronic · marshmallow',
    url: 'https://shmorez-official-epk--sofakingsadboi.on.websim.com/',
    blurb: 'A toasted marshmallow man squishing to the bass in the pit — an animated electronic marshmallow squish of fire. His EPK (custom player, press assets, the drops) opens when you reach him.',
    cta: 'Enter SHMOREZ EPK',
  },
  {
    id: 'sofaboi', name: 'SOFA KING SAD BOI', model: 'sofaboi',
    role: 'the lounge // up on his own stage', accent: PALETTE.indigo,
    pos: [17, 0, -8], lift: 1.0, rot: Math.PI, tag: 'dubstep · weird bass',
    url: 'https://doesntmatter.us/',
    blurb: 'Hood up, slumped on a beat-up couch under his own little rain cloud, watching the whole thing from the back — dubstep and weird bass. Reach him to drop into his world.',
    cta: 'Sit with the sad boi',
  },
  {
    id: 'driftwave', name: 'DRIFTWAVE STATIC', model: 'vaporwave',
    role: 'chill zone // left', accent: PALETTE.purple,
    pos: [-2, 0, -3], tag: 'slushwave · ambient · vaporwave',
    url: 'https://staticcorp--sofakingsadboi.on.websim.com/',
    blurb: 'A chrome vaporwave figure in shades, haloed by a retro striped sun, holding down the slushwave chill zone. The calm counterweight to the main stage.',
    cta: 'Enter DriftWave EPK',
  },
  {
    id: 'tanky', name: 'TANKY JOHNSON', model: 'cowboy',
    role: 'crowd // right', accent: PALETTE.gold,
    pos: [14, 0, 3], tag: 'outlaw country',
    url: 'https://tanky-johnson-epk--sofakingsadboi.on.websim.com/',
    blurb: 'The outlaw of the void — a cowboy in a brown hat, white tee and blue jeans, holding the right flank. Gold-on-black EPK: bio, latest tracks, and a booking desk.',
    cta: 'Enter Tanky EPK',
  },
  {
    id: 'studio', name: '12MATT3R', model: 'glitch',
    role: 'the VJ booth // visuals', accent: PALETTE.cyan,
    pos: [-1, 0, 17], tag: 'glitch art · code · the collective',
    url: 'https://12matt3r.univer.se/',
    blurb: 'A glitching, RGB-splitting figure at the VJ booth driving every screen at the festival — the web-OS and glitch-art engine that houses all of this. The studio itself.',
    cta: 'Open the web-OS',
  },
  {
    id: 'store', name: 'THE MERCH TENT', model: 'stall',
    role: 'the vendor // commissions', accent: PALETTE.green,
    pos: [-19, 0, 3], tag: 'high-ticket commissions',
    url: 'https://www.etsy.com/shop/12matt3r',
    blurb: 'The vendor working the merch tent. Productized packages — visual identity, audio branding, a web-OS build like this one — with pricing, a tip jar, and an intake + NDA flow. Where the experience converts.',
    cta: 'Browse commissions',
  },
  {
    id: 'dreamtv', name: 'DREAMOS TV', model: 'doorway',
    role: 'the side doorway // theater', accent: PALETTE.magenta,
    pos: [14, 0, 16], tag: 'walk-in cinema',
    page: 'tv.html',
    blurb: 'A lit doorway off the side of the grounds, glowing from underneath like a vendor stand. Step through into DreamOS TV — a movie theater with a big screen, a crowd, and popcorn in the air.',
    cta: 'Step through',
  },
  {
    id: 'labs', name: 'THE LAB', model: 'labsstage',
    role: 'the side stage // experiments', accent: PALETTE.green,
    pos: [-19, 0, -7], tag: 'trippy cam · dreamOS · deadnet',
    portal: 'lab', url: 'lab.html',
    blurb: 'The Lab gets its own side stage: live screens running the experiments — Trippy Cam (a browser feedback loop), DreamOS TV (a glitching virtual CRT), Deadnet (alternative web protocols), the Driftwave Vaporizer, 25+ games, Stories & Experiences, and the whole Dream OS ecosystem. The weird tools that prove what you can build.',
    cta: 'Enter the Lab',
  },
];
