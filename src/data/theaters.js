import { CHROMA_VIDEOS, ALL_ENTRIES } from './chroma.js';
import { VIDEOS } from './videos.js';
import { LAB } from './catalog.js';

// ── THE LOBBY'S THEATERS ─────────────────────────────────────────────────────
// lobby.html draws a door for each (left → right on the north wall); screening.html
// screens them. An item is one of:
//   { title, src: 'direct .mp4/.webm URL', note? }   a video file
//   { title, yt: 'YouTube video id', note? }          a YouTube video
//   { title, pl: 'YouTube playlist id', note? }       a whole YouTube playlist
//   { title, url: 'a game / page', note? }            loads on the screen, playable
// Rooms with `terminal` open a DreamOS terminal to pick an item (grouped by `groups`).
// A room with no items shows a "now booking" card until you add some.

const video = (v) => ({ title: v.title, yt: v.yt, note: v.note });
const game = (e) => ({ title: e.title, url: e.url, note: `${e.tag}` });
const gamesOf = (year) => ALL_ENTRIES.filter((e) => e.year === year).map(game);
const videosOf = (year) => CHROMA_VIDEOS.filter((v) => !year || v.year === year).map(video);
const grouped = (groups) => ({ groups, items: groups.flatMap((g) => g.items) });

export const THEATERS = [
  {
    id: 'chroma25', name: 'CHROMA AWARDS 2025', sub: 'last year · play the games, watch the films', page: 'screening.html?room=chroma25',
    aspect: 16 / 9, accent: '#ffd24a', doorX: -18, desktop: true, terminal: true,
    ...grouped([{ name: 'VIDEOS', items: videosOf(2025) }, { name: 'GAMES', items: gamesOf(2025) }]),
  },
  {
    id: 'vertical', name: 'NEW MOBILE THEATER', sub: 'vertical · 9×16 · the portrait IMAX', page: 'screening.html?room=vertical',
    aspect: 9 / 16, accent: '#ff2bd0', doorX: -9,
    items: VIDEOS.filter((v) => v.tall).map((v) => ({ title: v.title, yt: v.yt })),
  },
  {
    id: 'chroma', name: 'CHROMA AWARDS', sub: 'this year · every entry · the big one', page: 'screening.html?room=chroma',
    aspect: 16 / 9, accent: '#ff2a4a', doorX: 0, desktop: true, terminal: true,
    ...grouped([{ name: 'VIDEOS', items: videosOf() }, { name: 'GAMES', items: gamesOf(2026) }]),
  },
  {
    id: 'wide', name: '16×9', sub: 'widescreen · every video on the site', page: 'screening.html?room=wide',
    aspect: 16 / 9, accent: '#00f3ff', doorX: 9,
    items: VIDEOS.filter((v) => !v.tall).map((v) => ({ title: v.title, yt: v.yt })),
  },
  {
    id: 'void', name: 'ENTER THE VOID', sub: 'the trip room · its own thing', page: 'screening.html?room=void',
    aspect: 16 / 9, accent: '#b967ff', doorX: 18,
    items: [{ title: 'ENTER THE VOID — the playlist', pl: 'PLPug0RGgea9qMUz5Evk-4T241kf0z2yal', note: 'plays straight through' }],
  },
];

// The arcade is its own theater: a DreamOS terminal picks a game, it loads on the
// big screen and you step up to play it. Not a door on the lobby wall — the lobby's
// arcade pad leads here.
const seen = new Set();   // de-dupe by link and by name (Chroma entries come first and win)
const arcadeGame = (name, url, note) => {
  const key = name.toLowerCase();
  if (seen.has(url) || seen.has(key)) return null;
  seen.add(url); seen.add(key); return { title: name, url, note };
};
export const ARCADE = {
  id: 'arcade', name: 'THE ARCADE', sub: 'pick a game on the DreamOS terminal', page: 'screening.html?room=arcade',
  aspect: 16 / 9, accent: '#39ff14', terminal: true,
  ...grouped([
    { name: 'CHROMA AWARDS', items: ALL_ENTRIES.map((e) => arcadeGame(e.title, e.url, `Chroma ${e.year}`)).filter(Boolean) },
    { name: 'GAMES', items: LAB['Games'].map((g) => arcadeGame(g.name, g.url)).filter(Boolean) },
    { name: 'WAKE UP', items: LAB['Wake Up Series'].map((g) => arcadeGame(g.name, g.url)).filter(Boolean) },
    { name: 'STORIES', items: LAB['Stories & Experiences'].map((g) => arcadeGame(g.name, g.url)).filter(Boolean) },
  ]),
};
