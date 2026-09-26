// Tiny IndexedDB wrapper — persists uploaded tracks (audio Blob + metadata) on
// the user's computer so their library is still there when they come back.

const DB = 'saucelab-dj', STORE = 'tracks', VERSION = 1;

function openDB() {
  return new Promise((res, rej) => {
    const r = indexedDB.open(DB, VERSION);
    r.onupgradeneeded = () => { const db = r.result; if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' }); };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
}

export async function saveTrack(track) {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(track);
      tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error);
    });
  } catch (e) { /* storage unavailable — keep going in-memory */ }
}

export async function allTracks() {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const rq = db.transaction(STORE, 'readonly').objectStore(STORE).getAll();
      rq.onsuccess = () => res(rq.result || []); rq.onerror = () => rej(rq.error);
    });
  } catch (e) { return []; }
}

export async function deleteTrack(id) {
  try {
    const db = await openDB();
    return await new Promise((res, rej) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error);
    });
  } catch (e) { /* noop */ }
}

// ── analysis cache ────────────────────────────────────────────────────────────
// BPM/key/Camelot are expensive to compute (fetch + decode + analyse the whole
// file), so once a track is analysed we remember the result KEYED BY ITS URL and
// skip the work next time. Uploaded tracks already carry their analysis in the
// IndexedDB record above; this cache is for the site's remote (stable-URL) tracks.
// A small JSON map in localStorage — analysis is tiny and reads must be sync.
const ACACHE = 'saucelab-analysis';
function readCache() { try { return JSON.parse(localStorage.getItem(ACACHE) || '{}') || {}; } catch (e) { return {}; }
}
export function getAnalysis(src) {
  if (!src) return null;
  const v = readCache()[src];
  return v && typeof v === 'object' ? v : null;
}
export function saveAnalysis(src, data) {
  if (!src || !data) return;
  try {
    const m = readCache();
    m[src] = { bpm: data.bpm ?? null, key: data.key ?? null, camelot: data.camelot ?? null };
    localStorage.setItem(ACACHE, JSON.stringify(m));
  } catch (e) { /* storage full / disabled — recompute next time */ }
}
