import { media } from './media.js';

// DriftWave Static — the slushwave type-beat tape. MP3s live under public/music
// by default; set VITE_MEDIA_CDN (see media.js) to serve them off a CDN instead.
// Played by the in-world jukebox. Order = play order.
export const TRACKS = [
  { src: media('music/slushwave-2025-trailer.mp3'), title: 'SLUSHWAVE 2025 (trailer)' },
  { src: media('music/first-ever-vaporwave.mp3'), title: 'first ever vaporwave song' },
  { src: media('music/mindspring-tranquility.mp3'), title: 'MindSpring Memories — Tranquility Wave' },
  { src: media('music/desert-sand.mp3'), title: 'desert sand feels warm at night' },
  { src: media('music/telepath.mp3'), title: 't e l e p a t h' },
  { src: media('music/telepath-2.mp3'), title: 't e l e p a t h II' },
  { src: media('music/illusionary.mp3'), title: 'Illusionary' },
  { src: media('music/illusionary-dub.mp3'), title: 'Illusionary (dub)' },
  { src: media('music/second-sight-at-dawn.mp3'), title: 'Second Sight — At Dawn' },
  { src: media('music/saturn-1985.mp3'), title: 'Saturn 1985 — In the Air Tonight' },
  { src: media('music/soarer.mp3'), title: 'S O A R E R' },
  { src: media('music/channel71-shine.mp3'), title: 'channel 71 — Shine' },
  { src: media('music/channel71-sentiment-dub.mp3'), title: 'channel 71 — sentiment (dub)' },
  { src: media('music/neckbomb-emerald.mp3'), title: 'neckbomb — Emerald' },
  { src: media('music/neckbomb-emerald-2.mp3'), title: 'neckbomb — Emerald II' },
  { src: media('music/kanata.mp3'), title: '彼方 (kanata)' },
];

// album art shown on the jukebox screen (cycled)
export const COVERS = [
  media('music/art/cover-main.jpg'), media('music/art/cover-cube.jpg'), media('music/art/cover-slushwave.jpg'),
  media('music/art/cover-92.jpg'), media('music/art/logo-waves.jpg'), media('music/art/logo-tv.jpg'), media('music/art/logo-neon.jpg'),
];
