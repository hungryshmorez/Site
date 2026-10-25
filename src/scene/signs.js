import * as THREE from 'three';

// A flat sign: text (and an optional second line) drawn to a canvas and put on a
// plane. Shared by the lobby and the theater rooms.
export function textPlane(text, w, h, { color = '#fff', bg = null, glow = null, weight = '700', sub = null } = {}) {
  const px = 110, c = document.createElement('canvas'); c.width = Math.round(w * px); c.height = Math.round(h * px);
  const g = c.getContext('2d');
  if (bg) { g.fillStyle = bg; g.fillRect(0, 0, c.width, c.height); }
  g.textAlign = 'center'; g.textBaseline = 'middle';
  let size = Math.round(c.height * (sub ? 0.5 : 0.6));
  do { g.font = `${weight} ${size}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`; size -= 4; } while (g.measureText(text).width > c.width * 0.92 && size > 12);
  if (glow) { g.shadowColor = glow; g.shadowBlur = size * 0.35; }
  g.fillStyle = color; g.fillText(text, c.width / 2, c.height * (sub ? 0.36 : 0.52));
  if (sub) { g.shadowBlur = 0; g.font = `500 ${Math.round(c.height * 0.17)}px ui-monospace, Menlo, monospace`; g.fillStyle = 'rgba(255,255,255,.75)'; g.fillText(sub, c.width / 2, c.height * 0.78); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  return new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: t, transparent: !bg, toneMapped: false }));
}
