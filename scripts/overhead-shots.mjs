import { chromium } from 'playwright-core';
import { createServer } from 'vite';
import { WORLD_MAPS } from './src/data/worldmaps.js';
import fs from 'fs';

const PAGES = {
  festival: 'index.html', driftwave: 'driftwave.html', sofaboi: 'sofaboi.html',
  ravecharles: 'ravecharles.html', studio: 'studio.html', tanky: 'tanky.html',
  shmorez: 'shmorez.html', arcade: 'arcade.html',
};

const server = await createServer({ server: { port: 5178 }, logLevel: 'silent' });
await server.listen();
const base = 'http://localhost:5178';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});

const outDir = '/home/user/Site/shots';
fs.mkdirSync(outDir, { recursive: true });

for (const w of WORLD_MAPS) {
  const page = PAGES[w.id];
  if (!page) continue;
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
    return url;
  }, { b: w.bounds });
  if (dataUrl && dataUrl.length > 5000) {
    fs.writeFileSync(`${outDir}/${w.id}.png`, Buffer.from(dataUrl.split(',')[1], 'base64'));
    console.log(w.id, 'saved', dataUrl.length, 'chars', errs.length ? ('errs:' + errs.length) : '');
  } else {
    console.log(w.id, 'EMPTY IMAGE', (dataUrl || '').length, errs.slice(0, 2));
  }
  await p.close();
}
await browser.close();
await server.close();
console.log('done');
