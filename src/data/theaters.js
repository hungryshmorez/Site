import { EPISODES } from './episodes.js';
import { CHROMA_VIDEOS, ALL_ENTRIES } from './chroma.js';
import { LAB } from './catalog.js';

// ── THE LOBBY'S FOUR THEATERS ────────────────────────────────────────────────
// lobby.html draws a door for each; screening.html screens them. To fill a room, add videos to its `items`:
//   { title, src: 'direct .mp4/.webm URL (or a path in this site)', note? }
//   { title, yt: 'YouTube video id', note? }          (plays on the screen)
//   { title, url: 'a game / page', note? }            (loads on the screen, playable)
// Rooms with no items show a "now booking" card until you do.
export const THEATERS = [
  {
    id: 'chroma', name: 'CHROMA AWARDS', sub: 'every entry · the big one', page: 'screening.html?room=chroma',
    aspect: 16 / 9, accent: '#ff2a4a', desktop: true,
    items: CHROMA_VIDEOS.map((v) => ({ title: v.title, yt: v.yt, note: v.note })),
  },
  {
    id: 'vertical', name: '9×16', sub: 'vertical · shorts, reels, portrait', page: 'screening.html?room=vertical',
    aspect: 9 / 16, accent: '#ff2bd0',
    items: [],
  },
  {
    id: 'wide', name: '16×9', sub: 'widescreen · the full-frame stuff', page: 'screening.html?room=wide',
    aspect: 16 / 9, accent: '#00f3ff',
    // seeded with the That Time Again Studios slate — swap/add your own cuts here
    items: EPISODES.map((e) => ({ title: `${e.showTitle} — ${e.title}`, src: e.videoUrl, note: e.seasonEpisode })),
  },
  {
    id: 'void', name: 'ENTER THE VOID', sub: 'the trip room', page: 'screening.html?room=void',
    aspect: 16 / 9, accent: '#b967ff', shader: true,
    items: [],
  },
];

// The arcade is its own theater: a DreamOS terminal picks a game, it loads on the
// big screen and you step up to play it. Not a door on the lobby wall — the lobby's
// arcade pad leads here.
const seen = new Set();   // de-dupe by link and by name (Chroma entries come first and win)
const game = (name, url, note) => {
  const key = name.toLowerCase();
  if (seen.has(url) || seen.has(key)) return null;
  seen.add(url); seen.add(key); return { title: name, url, note };
};
export const ARCADE = {
  id: 'arcade', name: 'THE ARCADE', sub: 'pick a game on the DreamOS terminal', page: 'screening.html?room=arcade',
  aspect: 16 / 9, accent: '#39ff14', terminal: true,
  groups: [
    { name: 'CHROMA AWARDS', items: ALL_ENTRIES.map((e) => game(e.title, e.url, `Chroma ${e.year}`)).filter(Boolean) },
    { name: 'GAMES', items: LAB['Games'].map((g) => game(g.name, g.url)).filter(Boolean) },
    { name: 'WAKE UP', items: LAB['Wake Up Series'].map((g) => game(g.name, g.url)).filter(Boolean) },
    { name: 'STORIES', items: LAB['Stories & Experiences'].map((g) => game(g.name, g.url)).filter(Boolean) },
  ],
};
ARCADE.items = ARCADE.groups.flatMap((g) => g.items);
