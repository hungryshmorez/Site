// Base URL for heavy media (music, album art, video clips).
//
// These files are NOT in this repo. They live in hungryshmorez/Media and are
// served from that repo's own GitHub Pages site, which keeps ~190MB of audio
// out of this build — Pages refuses to publish a site over 1GB and this one was
// already at 418MB with nowhere to grow.
//
// Note the capital M. GitHub Pages paths are case-sensitive and the repo is
// named `Media`, so the lowercase spelling 404s.
//
// Override for a custom domain or a local mirror:
//   VITE_MEDIA_CDN=https://media.12matt3r.com/ npm run build
//
// Whatever it points at MUST send Access-Control-Allow-Origin, because the
// jukebox's <audio> and the billboard's <video> both set crossOrigin, and the
// video's WebGL texture would taint the canvas without it. That rules out
// GitHub Release assets, which send no CORS header at all (verified) — every
// track would fail, not just the video. Pages and jsDelivr both send it.
const RAW = import.meta.env.VITE_MEDIA_CDN ?? 'https://hungryshmorez.github.io/Media/';

// normalized base: '' or a single-trailing-slash absolute/relative prefix
export const MEDIA_BASE = RAW ? RAW.replace(/\/+$/, '') + '/' : '';

// media('music/foo.mp3') -> MEDIA_BASE + 'music/foo.mp3'
export const media = (path) => MEDIA_BASE + String(path).replace(/^\/+/, '');
