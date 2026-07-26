import { chromium } from 'playwright-core';
import { createServer } from 'vite';
import { WORLD_MAPS } from '../src/data/worldmaps.js';
import fs from 'fs';

// Overhead layout renders + blank grid overlays for every world.
//  <id>.png          — lit top-down render of the world (tent roofs etc. that
//                      carry userData.hideForShot are hidden so interiors show)
//  <id>-overlay.png  — transparent coordinate grid, same framing/size, to lay
//                      over the render and mark where things should go.

const PAGES = {
  festival: 'index.html', driftwave: 'driftwave.html', sofaboi: 'sofaboi.html',
  ravecharles: 'ravecharles.html', studio: 'studio.html', tanky: 'tanky.html',
  shmorez: 'shmorez.html', arcade: 'arcade.html',
};

// optionally limit to specific world ids via CLI args (e.g. `node ... arcade`)
const only = process.argv.slice(2);

// some worlds want a wider shot frame than their (tighter) codex-map bounds —
// e.g. the Midway tent floor is radius ~20, so frame it square to fit the ring.
const SHOT_BOUNDS = { arcade: [-22, 22, -22, 22] };
const boundsFor = (w) => SHOT_BOUNDS[w.id] || w.bounds;

const server = await createServer({ server: { port: 5178 }, logLevel: 'silent' });
await server.listen();
const base = 'http://localhost:5178';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

const outDir = new URL('../shots/', import.meta.url).pathname;
fs.mkdirSync(outDir, { recursive: true });

for (const w of WORLD_MAPS) {
  const page = PAGES[w.id];
  if (!page) continue;
  if (only.length && !only.includes(w.id)) continue;
  const p = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
  const errs = [];
  p.on('pageerror', (e) => errs.push('' + e));
  await p.goto(`${base}/${page}?shot=1`, { waitUntil: 'load' });
  const ok = await p.waitForFunction(() => window.__world && window.__world.scene, null, { timeout: 15000 }).then(() => true).catch(() => false);
  if (!ok) { console.log(w.id, 'NO __world', errs.slice(0, 2)); await p.close(); continue; }
  // scene is fully built at import — no need to enter (clicking nav buttons
  // would fire a back-portal navigation). Just let a couple frames settle.
  await p.waitForTimeout(1400);
  const dataUrl = await p.evaluate(({ b }) => {
    const { THREE, scene, renderer } = window.__world;
    const m = 1.08;
    const cx = (b[0] + b[1]) / 2, cz = (b[2] + b[3]) / 2;
    const hw = (b[1] - b[0]) / 2 * m, hh = (b[3] - b[2]) / 2 * m;
    const W = 1500, H = Math.round(W * (hh / hw));
    const oc = new THREE.OrthographicCamera(-hw, hw, hh, -hh, 0.1, 5000);
    oc.position.set(cx, 1200, cz); oc.up.set(0, 0, -1); oc.lookAt(cx, 0, cz);
    oc.updateProjectionMatrix();
    // hide roofs/canopies flagged for the shot so interiors are visible
    const hidden = [];
    scene.traverse((o) => { if (o.userData && o.userData.hideForShot && o.visible) { o.visible = false; hidden.push(o); } });
    // These are night scenes lit by emissive/point lights — flood the scene so
    // the actual geometry (structures, figures, props) reads from overhead.
    const prevFog = scene.fog; scene.fog = null;
    const prevExp = renderer.toneMappingExposure;
    if ('toneMappingExposure' in renderer) renderer.toneMappingExposure = 1.5;
    const amb = new THREE.AmbientLight(0xffffff, 1.5);
    const hemi = new THREE.HemisphereLight(0xffffff, 0x606880, 1.2);
    const dir = new THREE.DirectionalLight(0xffffff, 2.4);
    dir.position.set(cx + 60, 1400, cz + 40); dir.target.position.set(cx, 0, cz);
    scene.add(amb); scene.add(hemi); scene.add(dir); scene.add(dir.target);
    renderer.setSize(W, H, false);
    renderer.render(scene, oc);
    const url = renderer.domElement.toDataURL('image/png');
    scene.remove(amb); scene.remove(hemi); scene.remove(dir); scene.remove(dir.target);
    scene.fog = prevFog; renderer.toneMappingExposure = prevExp;
    for (const o of hidden) o.visible = true;
    return url;
  }, { b: boundsFor(w) });
  if (dataUrl && dataUrl.length > 5000) {
    fs.writeFileSync(`${outDir}${w.id}.png`, Buffer.from(dataUrl.split(',')[1], 'base64'));
    console.log(w.id, 'render saved', errs.length ? ('errs:' + errs.length) : '');
  } else {
    console.log(w.id, 'EMPTY IMAGE', (dataUrl || '').length, errs.slice(0, 2));
  }

  // opaque coordinate-grid "empty map" — same framing as the render, a clean
  // dark slate with bright gridlines + world-coord labels so dots drawn on it
  // translate straight back to world [x,z]. A dashed circle marks the tent/play
  // boundary where one is known.
  const BOUNDARY = { arcade: 20 };
  const overlayUrl = await p.evaluate(({ b, name, boundaryR }) => {
    const m = 1.08;
    const cx = (b[0] + b[1]) / 2, cz = (b[2] + b[3]) / 2;
    const hw = (b[1] - b[0]) / 2 * m, hh = (b[3] - b[2]) / 2 * m;
    const W = 1500, H = Math.round(W * (hh / hw));
    const minX = cx - hw, minZ = cz - hh, maxX = cx + hw, maxZ = cz + hh;
    const sx = (x) => (x - minX) / (2 * hw) * W, sy = (z) => (z - minZ) / (2 * hh) * H;
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const g = c.getContext('2d');
    g.fillStyle = '#0a0b16'; g.fillRect(0, 0, W, H); // opaque dark slate
    g.font = '19px ui-monospace, monospace'; g.textBaseline = 'top';
    const minor = 5, major = 10;
    const line = (x1, y1, x2, y2, s, lw) => { g.strokeStyle = s; g.lineWidth = lw; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
    for (let x = Math.ceil(minX / minor) * minor; x <= maxX; x += minor) {
      const px = sx(x), maj = Math.round(x) % major === 0, zero = Math.round(x) === 0;
      line(px, 0, px, H, zero ? 'rgba(255,90,110,.9)' : maj ? 'rgba(0,243,255,.45)' : 'rgba(0,243,255,.16)', zero ? 2 : 1);
      if (maj) { g.fillStyle = 'rgba(180,240,255,.85)'; g.fillText(String(x), px + 3, 4); g.fillText(String(x), px + 3, H - 24); }
    }
    for (let z = Math.ceil(minZ / minor) * minor; z <= maxZ; z += minor) {
      const py = sy(z), maj = Math.round(z) % major === 0, zero = Math.round(z) === 0;
      line(0, py, W, py, zero ? 'rgba(255,90,110,.9)' : maj ? 'rgba(0,243,255,.45)' : 'rgba(0,243,255,.16)', zero ? 2 : 1);
      if (maj) { g.fillStyle = 'rgba(180,240,255,.85)'; g.fillText(String(z), 4, py + 3); g.fillText(String(z), W - 34, py + 3); }
    }
    if (boundaryR) {
      g.strokeStyle = 'rgba(255,210,74,.7)'; g.lineWidth = 2; g.setLineDash([10, 8]);
      g.beginPath(); g.ellipse(sx(0), sy(0), boundaryR / (2 * hw) * W, boundaryR / (2 * hh) * H, 0, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
    }
    g.strokeStyle = 'rgba(255,255,255,.5)'; g.lineWidth = 2; g.strokeRect(1, 1, W - 2, H - 2);
    g.fillStyle = 'rgba(255,255,255,.9)'; g.font = 'bold 22px ui-monospace, monospace';
    g.fillText('EMPTY MAP · ' + name + '   N ↑   +x → east · +z → south   (grid lines every 5 units)', 10, H - 30);
    return c.toDataURL('image/png');
  }, { b: boundsFor(w), name: w.name, boundaryR: BOUNDARY[w.id] || 0 });
  if (overlayUrl) {
    fs.writeFileSync(`${outDir}${w.id}-overlay.png`, Buffer.from(overlayUrl.split(',')[1], 'base64'));
    console.log(w.id, 'overlay saved');
  }
  await p.close();
}
await browser.close();
await server.close();
console.log('done');
