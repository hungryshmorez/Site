// Base URL for heavy media (music, album art, video clips).
//
// Empty by default → these files are served from the site's own /public folder
// (local dev and the plain GitHub Pages build). To offload them to a CDN or to
// GitHub Releases so they stop bloating the repo, set VITE_MEDIA_CDN at build
// time — everything below re-points automatically:
//
//   VITE_MEDIA_CDN=https://media.12matt3r.com/ npm run build
//   VITE_MEDIA_CDN=https://github.com/hungryshmorez/Site/releases/download/media-v1/ npm run build
//
// The CDN must send CORS headers (Access-Control-Allow-Origin: *) for the video
// billboard's WebGL texture to load cross-origin. Plain audio playback works
// without them, but the <audio>/<video> elements request with crossOrigin set,
// so a CORS-capable host (Cloudflare R2, Bunny, etc.) is the safe choice.
const RAW = import.meta.env.VITE_MEDIA_CDN ?? '';

// normalized base: '' or a single-trailing-slash absolute/relative prefix
export const MEDIA_BASE = RAW ? RAW.replace(/\/+$/, '') + '/' : '';

// media('music/foo.mp3') -> MEDIA_BASE + 'music/foo.mp3'
export const media = (path) => MEDIA_BASE + String(path).replace(/^\/+/, '');
