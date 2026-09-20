import { media, MEDIA_BASE } from './media.js';

// The jukebox playlist.
//
// The array below is a FALLBACK, not the source of truth. When VITE_MEDIA_CDN
// is set, loadManifest() fetches manifest.json from the media host and replaces
// the contents in place — so adding a song is a push to the media repo (drop the
// file in, add a line to manifest.json) with no code change and no site rebuild.
// If that fetch fails, these stay, and since media() has already pointed them at
// the CDN they keep playing. Order = play order.
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

// Pull the live playlist off the media host. Mutates TRACKS/COVERS in place so
// every module that already imported them sees the update without re-importing.
// Resolves true only if something was actually replaced, so callers can tell a
// real update from a silent no-op.
let manifestPromise = null;
export function loadManifest() {
  // no CDN configured → the bundled files under public/ are the whole library
  if (!MEDIA_BASE) return Promise.resolve(false);
  manifestPromise ??= (async () => {
    try {
      const res = await fetch(media('manifest.json'), { cache: 'no-cache' });
      if (!res.ok) return false;
      const m = await res.json();
      let changed = false;
      if (Array.isArray(m.tracks) && m.tracks.length) {
        const next = m.tracks
          .filter((t) => t && typeof t.src === 'string')
          .map((t) => ({ src: media(t.src), title: String(t.title ?? t.src) }));
        if (next.length) { TRACKS.splice(0, TRACKS.length, ...next); changed = true; }
      }
      if (Array.isArray(m.covers) && m.covers.length) {
        const next = m.covers.filter((c) => typeof c === 'string').map(media);
        if (next.length) { COVERS.splice(0, COVERS.length, ...next); changed = true; }
      }
      return changed;
    } catch (e) {
      return false;   // offline, blocked, malformed JSON — the fallback stands
    }
  })();
  return manifestPromise;
}
