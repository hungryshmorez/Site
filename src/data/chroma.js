// ── CHROMA AWARDS — every entry, by year ─────────────────────────────────────
// Single source of truth for the Chroma Awards section: the DreamOS desktop
// (chroma.html) and the lobby's Chroma theater (screening.html?room=chroma) are both
// generated from this list, so adding an entry here puts it in both.
//
// To add one: append to the right year's `entries`. Fields:
//   id      unique slug
//   title   shown on the desktop icon, the window title and the theater marquee
//   tag     one-line genre/format
//   blurb   a sentence or two for the entry window + theater card
//   url     what the window plays — a path inside this site (games/…) or an
//           external link. External sites may refuse to be embedded; the window
//           has an "open in tab" button for those.
//   accent  the entry's colour (icon, marquee glow)
//   glyph   emoji for the desktop icon
//   vote    (optional) the Chroma Awards page where people vote for THIS entry.
//           The voting booth in the lobby (vote.html) links straight to it.
//   trailer (optional) a direct .mp4/.webm URL — plays on the theater screen
//           instead of the title card

export const CHROMA = {
  name: 'CHROMA AWARDS',
  // The general Chroma Awards voting/landing page, used when an entry has no `vote` link yet.
  // Chroma Awards watch page — used as the vote link for any entry without its own `vote` yet.
  voteHub: 'https://submit.chromaawards.com/watch/d321d4fa-eae1-40ae-bb56-bf8da96d4e94',
  blurb: 'Every entry I have put into the Chroma Awards — this year on the desktop, last year in the archive. Open one to play it, or take a seat in the theater to see them on the big screen.',
  years: [
    {
      year: 2026,
      label: 'THIS YEAR',
      entries: [
        {
          id: 'seven-days',
          vote: '',
          title: 'SEVEN DAYS',
          tag: 'found-footage horror · cinematic + first-person',
          blurb: 'A found-footage horror game: the Prologue plus seven days, each a recorded tape you can only partly steer. The cinematic game and the first-person search game are one app that hands you back and forth between them.',
          url: 'games/seven-days/index.html',
          accent: '#ff2a4a',
          glyph: '📼',
        },
      ],
    },
    {
      year: 2025,
      label: 'LAST YEAR',
      // Seeded from the Lab catalog (data/catalog.js) — the Chroma-tagged links
      // already on the site. Add, remove or re-year entries here.
      entries: [
        {
          id: 'chromashift',
          vote: '',
          title: 'ChromaShift',
          tag: 'hyper-surreal dreamscape · story',
          blurb: 'The Chroma Awards hyper-surreal dreamscape entry. A scarier cut, ChrØmaShift, lives in the Lab.',
          url: 'https://chromashift-hyper-surreal-dreamscape-3--sofakingsadboi.on.websim.com',
          accent: '#b967ff',
          glyph: '🌈',
        },
        {
          id: 'chroma-killer',
          vote: '',
          title: 'Chroma Killer',
          tag: 'game · Urban Life Simulator',
          blurb: 'A Chroma Awards game entry (ULS Chroma Killer).',
          url: 'https://urban-life-simulator-5--sofakingsadboi.on.websim.com/',
          accent: '#39ff14',
          glyph: '🔪',
        },
        {
          id: 'npc-therapy',
          vote: '',
          title: 'NPC Therapy',
          tag: 'game · Chroma winner',
          blurb: 'Chroma Awards winner.',
          url: 'https://npctherapy.on.websim.com/',
          accent: '#00f3ff',
          glyph: '🛋️',
        },
      ],
    },
  ],
};

// The Chroma Awards videos (YouTube ids) — screened in the lobby's Chroma theaters.
// `year` is a guess for now (all 2025); fix any that belong to this year.
export const CHROMA_VIDEOS = [
  { yt: 'EvpLAbOw7E4', title: 'SOFA KING SAD BOI × Chroma Awards — DATAMOSH EDM', note: 'AI music video', year: 2025 },
  { yt: 'FBaN4QWFucg', title: 'The Crawling Mind', note: 'Experimental AI film', year: 2025 },
  { yt: '1lAA395N8FE', title: "Cowboys Don't Cry — Tanky Johnson", note: 'AI/VFX music video', year: 2025 },
  { yt: 'dLWHNiePR8g', title: 'NPC Therapy — game entry', note: 'Experimental AI game', year: 2025 },
  { yt: 'jfSAfMNQCNY', title: 'NPC Therapy — credits', note: 'Game credits', year: 2025 },
];

export const ALL_ENTRIES = CHROMA.years.flatMap((y) => y.entries.map((e) => ({ ...e, year: y.year })));
