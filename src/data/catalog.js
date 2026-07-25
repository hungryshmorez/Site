// ── 12matt3r CANONICAL CATALOG ───────────────────────────────────────────────
// Single source of truth for every destination, tool, game, story, and link in
// the 12matt3r universe. Transcribed from the master content inventory
// (share/368135266783316). The Lab world (lab.html) is generated from this;
// keep this file authoritative and edit links HERE, not in the UI.

// The five personas + the collective. `epk` is where the name links.
export const ALIASES = [
  { name: 'SOFA KING SAD BOI', kind: 'Dubstep · Weird Bass · Digital Experience', epk: 'https://sofa-king-sad-boi-official-epk--sofakingsadboi.on.websim.com/' },
  { name: 'DRIFTWAVE STATIC', kind: 'Slushwave · Ambient · Vaporwave', epk: 'https://staticcorp--sofakingsadboi.on.websim.com/', extra: { Bandcamp: 'https://driftwavestatic.bandcamp.com/' } },
  { name: 'RAVE CHARLES', kind: 'Rapper · DJ · Historian', epk: 'https://express.adobe.com/page/s43NCJty7DfTO/' },
  { name: 'TANKY JOHNSON', kind: 'Country · The Newcomer', epk: 'https://tanky-johnson-epk--sofakingsadboi.on.websim.com/' },
  { name: 'SHMOREZ', kind: 'AI Artist', epk: 'https://shmorez-official-epk--sofakingsadboi.on.websim.com/' },
  { name: '12MATT3R', kind: 'Glitch Art · Code · The Collective', epk: 'https://glitch-portfolio--sofakingsadboi.on.websim.com/', extra: { Portfolio: 'https://12matt3r.univer.se/' } },
];

const W = (slug) => `https://${slug}.on.websim.com/`;
const WS = (slug) => `https://${slug}--sofakingsadboi.on.websim.com/`;

// The Lab is organized into folders; each becomes a section in lab.html.
export const LAB = {
  'DreamOS Ecosystem': [
    { name: 'Ultimate Main DreamOS', url: 'https://23qvtyf8nwfq.space.minimax.io/' },
    { name: 'DreamOS Wake-Up Node', url: W('dreamos-w-a-k-e-u-p') },
    { name: 'DreamOS Interface', url: W('dream-os-interface') },
    { name: 'DreamOS Wake-Up App', url: W('dreamos-wakeup') },
    { name: 'Minimax Space Game', url: 'https://r1hespvq2jb8.space.minimax.io/' },
    { name: 'DreamOS TV', url: 'tv.html', internal: true },
    { name: 'Deadnet — Digital Afterlife', url: W('deadnet'), special: true },
  ],
  'Wake Up Series': [
    { name: 'Wake Up: Cursed Island', url: W('wakeupandrun') },
    { name: 'Wake Up, Please', url: W('wakeup-please') },
    { name: 'Please Wake Up', url: W('cursor-sharing-with-youtube') },
    { name: 'Wake Up: Dreamworld', url: W('dreams') },
    { name: 'Wake Up: In Between', url: W('wakeup-story') },
    { name: 'Wake Up and Drive', url: W('wakeup-drive') },
    { name: 'Wake Up and Fight (FPS)', url: W('wakeupfps') },
    { name: 'Wake Up Again', url: W('wakeup-again') },
    { name: 'Wake Up: Theme Park', url: W('wakeup-themepark') },
    { name: 'The Liminal Sidewalk', url: W('wakeupordont') },
    { name: 'Where the Sidewalk Ends', url: W('where-the-sidewalk-ends-2') },
    { name: 'Chilling in My Dreams', url: W('lofi-chillin') },
    { name: 'Wake Up and Work', url: W('wakeupwork') },
    { name: 'Never Sleep Wake Up', url: W('multiplayer-office-exploration') },
    { name: 'Wake Up Nightmare', url: W('minimalist-3d-multiplayer') },
    { name: 'Wake Up in the Backrooms', url: W('the-backrooms-found-footage') },
    { name: 'Wake Up Destruction', url: W('bean-city-destruction') },
    { name: 'Wake Up 10', url: W('wake-up-10') },
  ],
  'Games': [
    { name: 'Grand Theft Auto VI (ChromaShift)', url: WS('chromashift-hyper-surreal-dreamscape-8') },
    { name: 'Bikini Bottom Anomaly Hunt', url: W('fright-night') },
    { name: 'Last Call: The Long Walk Home', url: W('last-call') },
    { name: 'Trippy Racing (Cattle Racing)', url: WS('dreamworld-cattle-racing-game') },
    { name: 'WebSim 500 (Racing)', url: W('websim500') },
    { name: 'Liminal (3D Terrain)', url: WS('3d-terrain-explorer') },
    { name: 'Chroma Killer', url: W('chroma-award') },
    { name: 'Cope (3D Survival)', url: 'https://3d-survival-room--datboodiebreadham.on.websim.com/' },
    { name: 'Crime Scene Response', url: WS('crime-scene-response') },
    { name: "Mariah's Rage", url: WS('driver-s-seat-simulator-2') },
    { name: 'NPC Therapy', url: W('npctherapy') },
    { name: 'Beavis & Butthead Commentary', url: WS('beavis-butt-head-music-video-commentary') },
    { name: 'Steal a WebSim', url: WS('steal-a-websim') },
    { name: 'Sauce Lab DJ Battle', url: W('saucelab-dj') },
    { name: 'Spooky Three.js Themepark', url: 'https://dq2j5ppgh2ea.space.minimax.io/' },
    { name: 'Minimax Experiment I', url: 'https://bl3u85uzn9m5.space.minimax.io/' },
    { name: 'Minimax Experiment II', url: 'https://hr0t0ue7epnr.space.minimax.io/' },
    { name: 'Minimax Experiment III', url: 'https://xx6j9saqtatm.space.minimax.io/' },
  ],
  'Stories & Experiences': [
    { name: 'Curse of the Monkey Paw', url: W('wish') },
    { name: 'The Ultimate Guide to Thriving', url: WS('the-ultimate-guide-to-thriving-in-life') },
    { name: 'ChrØmaShift', url: WS('chromashift-hyper-surreal-dreamscape-9') },
    { name: 'The Other ChromaShift', url: WS('chromashift-hyper-surreal-dreamscape') },
    { name: 'The Backrooms', url: W('aibackroomssimulator') },
    { name: 'DreamOS for Him', url: WS('dreamos-the-unwaking') },
    { name: 'DreamOS for Her', url: WS('drea') },
    { name: 'GTA D&D Edition', url: WS('gta-6-d-d-edition-2') },
    { name: 'Discord Horror', url: W('discord-horror') },
  ],
  'Tools': [
    { name: 'Trippy Cam', url: 'https://g5kgb2qtzw2s.space.minimax.io/' },
    { name: 'Trippy Kit', url: W('surreal') },
    { name: 'Trippy Effects Tool', url: W('trippyeffectstool') },
    { name: 'Aesthetic Audio (Synthwave Studio)', url: WS('synthwave-sound-studio') },
    { name: 'Flash Games Portal', url: WS('flash-games-collection') },
  ],
};

// Off-site presence. Grouped for a compact link wall.
export const LINKS = {
  'Portfolio & Art': {
    'Main Portfolio': 'https://12matt3r.univer.se/',
    'Project History': 'https://12matt3r.univer.se/history',
    'AI Art Gallery': 'https://12matt3r.univer.se/ai-art',
    'Video Art Gallery': 'https://12matt3r.univer.se/video-art',
    'Glitch Portfolio': 'https://glitch-portfolio--sofakingsadboi.on.websim.com/',
    'guns.lol': 'https://guns.lol/sofakingsadboi',
    'GitHub': 'https://github.com/12Matt3r',
    'Discord': 'https://discord.gg/cxMW3aSmKX',
  },
  'Music': {
    'Spotify': 'https://open.spotify.com/artist/0gI4DEY1dhARmuER7aPSJY',
    'Apple Music': 'https://music.apple.com/us/artist/sofa-king-sad-boi/1629010074',
    'SoundCloud': 'https://soundcloud.com/sofakingsadboi',
    'Tidal': 'https://tidal.com/browse/artist/32847341',
    'Bandcamp': 'https://driftwavestatic.bandcamp.com/',
    'Viberate': 'http://www.viberate.com/artist/sofa-king-sad-boi-1',
    'YouTube': 'https://youtube.com/channel/UC7Xif3cBh0qtZH2SgSq_Guw',
  },
  'Social': {
    'Instagram (sofakingsadboi)': 'https://instagram.com/sofakingsadboi',
    'Instagram (12matt3r)': 'https://instagram.com/12matt3r',
    'X (Twitter)': 'https://x.com/12matt3r',
    'TikTok': 'https://tiktok.com/@sofakingsadboi',
    'Twitch': 'https://twitch.tv/12matt3r',
    'Snapchat': 'https://snapchat.com/add/notravecharles',
    'Roblox': 'https://roblox.com/users/7311598713/profile',
  },
  'Web3 & Support': {
    'OpenSea': 'https://opensea.io/12matt3r',
    'drip.haus': 'https://drip.haus/12matt3r',
    'glif.app': 'https://glif.app/@12matt3r',
    'CashApp': 'https://cash.app/$12matt3r',
    'PayPal': 'https://paypal.me/sofakingsadboi',
  },
};
