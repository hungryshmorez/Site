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
    role: 'headliner // in the pit', accent: PALETTE.magenta,
    pos: [0, 0, -16], tag: 'rapper · DJ · founder',
    page: 'ravecharles.html',
    blurb: 'The masked headliner, down in the mosh pit with the crowd instead of above it — glowing LED visor, nearly 400 shows across America, 2014–2020. Reach him to enter his world: a raging neon pit, a coast-to-coast tour road, and a giant LED-visor mask. The tour timeline is on the stage screen.',
    cta: 'Dive into the pit',
  },
  {
    id: 'shmorez', name: 'SHMOREZ', model: 'marshmallow',
    role: 'the campfire // out back', accent: PALETTE.orange,
    pos: [14, 0, 17], tag: 'electronic · marshmallow',
    page: 'shmorez.html',
    blurb: 'A toasted marshmallow man squishing to the bass — an animated electronic marshmallow squish of fire. Reach him to roast into his world: a cozy-surreal campground with a giant bonfire, a s\'mores land of chocolate walls and marshmallow boulders, and a tent camp under the embers. His EPK is on the visuals screen.',
    cta: 'Roast at the s\'mores fire',
  },
  {
    id: 'sofaboi', name: 'SOFA KING SAD BOI', model: 'sofaboi',
    role: 'the lounge // up on his own stage', accent: PALETTE.indigo,
    pos: [11, 0, -6], lift: 1.0, tag: 'dubstep · weird bass',
    page: 'sofaboi.html',
    blurb: 'Hood up, slumped on a beat-up couch under his own little rain cloud — dubstep and weird bass. Reach him to enter SO FA KING: a rainy kingdom of couches with a giant sofa throne, a sea of couches, and a bass pit where the subs wobble. His EPK is on the throne-room TV.',
    cta: 'Enter the couch kingdom',
  },
  {
    id: 'driftwave', name: 'DRIFTWAVE STATIC', model: 'vaporwave',
    role: 'chill zone // left', accent: PALETTE.purple,
    pos: [0, 0, 3], tag: 'slushwave · ambient · vaporwave',
    page: 'driftwave.html',
    blurb: 'A chrome vaporwave figure in shades, haloed by a retro striped sun. Reach him to step into STATIC CORP — his own vaporwave dreamscape of a marble temple, a dead mallsoft arcade, and a rainy late-night lo-fi nook. His EPK lives on the temple monolith.',
    cta: 'Enter DriftWave’s world',
  },
  {
    id: 'tanky', name: 'TANKY JOHNSON', model: 'cowboy',
    role: 'the tailgate // right', accent: PALETTE.gold,
    pos: [11, 0, 7], tag: 'outlaw country',
    page: 'tanky.html',
    blurb: 'The outlaw of the void — a cowboy in a brown hat, white tee and blue jeans. Reach him to ride into his world: a cosmic western with a neon honky-tonk saloon, a tailgate bonfire and his lifted truck, and a void desert of mesas and neon cacti under a giant moon. His EPK is on the saloon jukebox.',
    cta: 'Ride into the void',
  },
  {
    id: 'studio', name: '12MATT3R', model: 'glitch',
    role: 'somewhere in the crowd', accent: PALETTE.cyan,
    pos: [0, 0, -6], tag: 'glitch art · code · the collective',
    page: 'studio.html',
    blurb: 'A glitching, RGB-splitting figure driving every screen at the festival — the web-OS and glitch-art engine that houses all of this. Reach him to step into the glitch room: a dark studio built around a monument of stacked CRT TVs, datamosh walls, and a code workstation. The big CRT boots the web-OS.',
    cta: 'Enter the glitch room',
  },
  {
    id: 'store', name: 'THE MERCH TENT', model: 'stall',
    role: 'the vendor // commissions', accent: PALETTE.green,
    pos: [-25, 0, 4], tag: 'high-ticket commissions',
    url: 'https://www.etsy.com/shop/12matt3r',
    blurb: 'The vendor working the merch tent. Productized packages — visual identity, audio branding, a web-OS build like this one — with pricing, a tip jar, and an intake + NDA flow. Where the experience converts.',
    cta: 'Browse commissions',
  },
  {
    id: 'dreamtv', name: 'TV', model: 'doorway',
    role: 'the big CRT // theater', accent: PALETTE.magenta,
    pos: [-25, 0, -15], tag: 'walk-in cinema',
    page: 'tv.html',
    blurb: 'A lit doorway off the side of the grounds, glowing from underneath like a vendor stand. Step through into DreamOS TV — a movie theater with a big screen, a crowd, and popcorn in the air.',
    cta: 'Step through',
  },
  {
    id: 'decks', name: 'THE DECKS', model: 'decks',
    role: 'the DJ rig // center stage', accent: PALETTE.cyan,
    pos: [0, 0, -24], lift: 1.6, tag: 'two decks · upload · mix live',
    page: 'dj.html',
    blurb: 'A DJ booth open to anyone. Step up to $AUCELAB — two decks, EQ, filters, crossfader, tempo, cue, sync and loops. Upload your own tracks and mix live.',
    cta: 'Take the decks',
  },
  {
    id: 'arcade', name: 'ARCADE', model: 'circustent',
    role: 'the arcade tent // all the games', accent: PALETTE.magenta,
    pos: [27, 0, -10], tag: 'the carnival arcade · every game',
    page: 'arcade.html',
    blurb: 'A striped carnival tent built into the wall, humming with attract-mode neon — the entrance to THE MIDWAY. Every game lives inside under one big top: cabinets for the flash portal, the Wake Up saga, the games library and the stories, a Monkey\'s Paw machine, a basketball hoop you bank off the backboard, and a shooting gallery. Step right up.',
    cta: 'Step into the midway',
  },
  {
    id: 'labs', name: 'THE LAB', model: 'labsstage',
    role: 'the side stage // experiments', accent: PALETTE.green,
    pos: [0, 0, 22], tag: 'games · wake up · stories · tools',
    page: 'lab.html',
    blurb: 'The Lab is its own side stage: big screens over a deck loaded with the playable side of 12matt3r — the full launcher for every folder. Prefer a single aisle? The lab-market kiosks on the left flank (DreamOS, Wake Up, Stories, Tools) each boot straight to their section. Reach it to boot the whole Lab.',
    cta: 'Enter the Lab',
  },
  {
    id: 'lab_tools', name: 'TOOLS AISLE', model: 'kiosk',
    role: 'lab market // apps + effects', accent: PALETTE.green,
    pos: [-25, 0, -1], tag: 'effects · studios · LoRAs', // beside the merch tent on the left flank
    page: 'lab.html?folder=Tools',
    blurb: 'A lab-market kiosk. Boots straight to the Tools aisle — effects apps, the synth + vapor studios, the flash portal, and the LoRA model packs.',
    cta: 'Open the Tools aisle',
  },
  {
    id: 'portapotty', name: "PORTA JOHN'S", model: 'bathroom',
    role: 'the archive // inside the potty', accent: PALETTE.green,
    pos: [24, 0, 10], rot: -2.526, tag: 'the encyclopedia', hideTag: true, // doors aimed at the main stage / center

    portal: 'lab',
    blurb: 'A row of festival porta-potties, one glowing an unhealthy green. Step inside and boot the old screen to read the Codex — the full encyclopedia of the festival.',
    cta: 'Read the Codex',
  },
  {
    id: 'complex', name: 'THE COMPLEX', model: 'complex',
    role: 'the warehouse // immersive experience', accent: PALETTE.cyan,
    pos: [24, 0, -2], tag: 'entrance hall · hub · themed rooms',
    page: 'warehouse.html',
    blurb: 'A rusty neon warehouse on a foggy street — the 12matt3r immersive experience complex. The door creaks open as you approach, into a projection-lined entrance hall and a vast central hub: a checkerboard gallery of floating golden frames around a levitating heart, its glowing portals radiating out to every themed room.',
    cta: 'Step inside the complex',
  },
];
