import { EPISODES } from './episodes.js';

// ── THE LOBBY'S FOUR THEATERS ────────────────────────────────────────────────
// lobby.html draws a door for each; screening.html (and chroma-theater.html for
// the Chroma room) screen them. To fill a room, add videos to its `items`:
//   { title, src: 'direct .mp4/.webm URL (or a path in this site)', note? }
// Rooms with no items show a "now booking" card until you do.
export const THEATERS = [
  {
    id: 'chroma', name: 'CHROMA AWARDS', sub: 'every entry · the big one', page: 'chroma-theater.html',
    aspect: 16 / 9, accent: '#ff2a4a',
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
