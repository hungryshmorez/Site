// Base URL for heavy media (music, album art, video clips).
//
// Multi-CDN architecture: Media is split across multiple GitHub Pages repos
// (Media, Media-SofaKing, Media-TankyJohnson, etc.) coordinated by a master
// manifest. This keeps individual repos under 1GB while supporting unlimited
// total content.
//
// Master manifest at VITE_MEDIA_MASTER lists all artist repos and their
// manifest URLs. Jukebox aggregates manifests from each enabled artist.
//
// Fallback to single-CDN mode if master manifest is unavailable (legacy).
//
// Override for custom domain or local mirror:
//   VITE_MEDIA_MASTER=https://media.12matt3r.com/master-manifest.json npm run build
//   VITE_MEDIA_CDN=https://media.12matt3r.com/ npm run build (legacy single-CDN)
//
// All CDN endpoints MUST send Access-Control-Allow-Origin, as the
// jukebox's <audio> and billboard's <video> both set crossOrigin.
// GitHub Pages and jsDelivr both send CORS headers; Release assets do not.

const MASTER_MANIFEST_URL = import.meta.env.VITE_MEDIA_MASTER ??
  'https://hungryshmorez.github.io/Media/master-manifest.json';
const LEGACY_CDN = import.meta.env.VITE_MEDIA_CDN ??
  'https://hungryshmorez.github.io/Media/';

export const MEDIA_BASE = LEGACY_CDN ? LEGACY_CDN.replace(/\/+$/, '') + '/' : '';

// Fetch and aggregate manifests from all enabled artist repos.
// Returns combined track list with proper CDN URLs.
export async function loadAggregatedManifest() {
  try {
    const masterResp = await fetch(MASTER_MANIFEST_URL, { cache: 'no-cache' });
    if (!masterResp.ok) throw new Error(`Master manifest ${masterResp.status}`);

    const master = await masterResp.json();
    const allTracks = [];

    for (const artist of master.artists || []) {
      if (!artist.enabled) continue;
      try {
        const artistResp = await fetch(artist.manifestUrl, { cache: 'no-cache' });
        if (!artistResp.ok) continue;

        const artistManifest = await artistResp.json();
        const baseCdn = artist.cdnUrl.replace(/\/+$/, '') + '/';

        // Prefix all src paths with artist's CDN base
        const tracksWithCdn = (artistManifest.tracks || []).map(track => ({
          ...track,
          src: baseCdn + track.src,
        }));

        allTracks.push(...tracksWithCdn);
      } catch (err) {
        console.warn(`Failed to load ${artist.name} manifest:`, err);
      }
    }

    return {
      version: 1,
      tracks: allTracks,
      source: 'multi-cdn',
    };
  } catch (err) {
    console.warn('Multi-CDN load failed, falling back to legacy:', err);
    return null;
  }
}

// Each path segment is percent-encoded, because tracks arrive with whatever
// name they had on upload — 'Google how to cry 2026.mp3', apostrophes, brackets.
// Encoding per segment keeps '/' separators; already-encoded input passes through.
const encodeSegment = (s) => {
  try {
    if (decodeURIComponent(s) !== s) return s;   // already encoded
  } catch (e) {
    return s;   // malformed escape; safer to pass through
  }
  return encodeURIComponent(s);
};

export const media = (path) =>
  MEDIA_BASE + String(path).replace(/^\/+/, '').split('/').map(encodeSegment).join('/');
