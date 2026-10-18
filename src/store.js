import * as THREE from 'three';
import { WalkControls } from './player/controls.js';
import { attachAdaptiveResolution } from './player/adaptive.js';
import { createReducedMotion, wireMuteButton } from './player/motion.js';
import { PRODUCTS, PRODUCT_TYPES, STORE_URL } from './data/products.js';

// THE MERCH TENT → 12MATT3R STORE. A walk-in 3D boutique that hangs the real
// doesntmatter.store drop (baked from Shopify into src/data/products.js) on
// framed garment panels down a neon hall. Walk up to a piece, tap it to inspect
// front/back, sizes and price, and BUY deep-links to its live product page.
// Site music keeps playing (global player, booted from the HTML).

window.addEventListener('error', (e) => console.error('[fatal]', e.error || e.message));

const canvas = document.getElementById('scene');
const isMobile = matchMedia('(pointer: coarse)').matches || Math.min(innerWidth, innerHeight) < 600;
createReducedMotion();

const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;
attachAdaptiveResolution(renderer, isMobile ? 1.5 : 2);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0713);
scene.fog = new THREE.Fog(0x0a0713, 18, 60);
const camera = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 200);

scene.add(new THREE.HemisphereLight(0xb3a8e0, 0x120c1c, 0.55));
scene.add(new THREE.AmbientLight(0x2a2440, 0.35));

// ---- boutique shell: polished floor + neon runner + walls behind the racks ----
{
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 80),
    new THREE.MeshStandardMaterial({ color: 0x0d0a18, roughness: 0.3, metalness: 0.55 })
  );
  floor.rotation.x = -Math.PI / 2; floor.position.y = -0.01; floor.receiveShadow = true; scene.add(floor);
  const grid = new THREE.GridHelper(80, 80, 0xff4fd8, 0x39264f);
  grid.material.transparent = true; grid.material.opacity = 0.28; scene.add(grid);
  // carpet runner down the aisle
  const runner = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 40), new THREE.MeshStandardMaterial({ color: 0x1b0f2e, roughness: 0.9, emissive: 0x2a0f3a, emissiveIntensity: 0.25 }));
  runner.rotation.x = -Math.PI / 2; runner.position.set(0, 0.005, -12); scene.add(runner);
  // side walls behind the panels
  const wallMat = new THREE.MeshStandardMaterial({ color: 0x160f24, roughness: 0.85, metalness: 0.1 });
  for (const sx of [-6.6, 6.6]) {
    const w = new THREE.Mesh(new THREE.BoxGeometry(0.3, 6, 44), wallMat);
    w.position.set(sx, 3, -13); scene.add(w);
  }
  // back wall + entrance sky glow
  const back = new THREE.Mesh(new THREE.BoxGeometry(13.5, 6, 0.3), wallMat);
  back.position.set(0, 3, -34); scene.add(back);

  // ---- gondola shelving down each wall, so the pieces read as stock on shelves.
  // Dark metal boards with a neon front edge, at the two product-row heights. ----
  const shelfMat = new THREE.MeshStandardMaterial({ color: 0x1a1430, roughness: 0.45, metalness: 0.5 });
  const edgeMat = new THREE.MeshBasicMaterial({ color: 0x57e6ff, toneMapped: false });
  const Z_MID = -13.5, Z_LEN = 31;          // board run spans the product columns
  for (const sx of [-1, 1]) {
    const x = sx * 6.0;
    for (const sy of [0.42, 2.02]) {         // just under each product row
      const board = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.1, Z_LEN), shelfMat);
      board.position.set(x, sy, Z_MID); board.receiveShadow = true; scene.add(board);
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, Z_LEN), edgeMat);
      edge.position.set(x - sx * 0.27, sy + 0.02, Z_MID); scene.add(edge);
    }
    // vertical uprights every few columns for the gondola frame
    for (let z = 1.0; z >= Z_MID - Z_LEN / 2; z -= 6.3) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 4.4, 0.12), shelfMat);
      post.position.set(x + sx * 0.22, 2.2, z); scene.add(post);
    }
  }
}

// ---- neon sign helper (canvas → plane) ----
function neonSign(text, color, w, h = 0.9) {
  const c = document.createElement('canvas'); c.width = 1024; c.height = Math.round(1024 * h / w);
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(0,0,0,0)'; x.clearRect(0, 0, c.width, c.height);
  x.font = `bold ${Math.round(c.height * 0.5)}px ui-monospace, monospace`;
  x.textAlign = 'center'; x.textBaseline = 'middle';
  x.shadowColor = color; x.shadowBlur = 44; x.fillStyle = color;
  x.fillText(text, c.width / 2, c.height / 2); x.shadowBlur = 0; x.fillText(text, c.width / 2, c.height / 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
  return m;
}
{
  const brand = neonSign('12MATT3R', '#ff4fd8', 7, 1.4); brand.position.set(0, 4.4, -33.7); scene.add(brand);
  const sub = neonSign('doesntmatter.store', '#57e6ff', 6, 0.7); sub.position.set(0, 3.4, -33.7); scene.add(sub);
  const brandLight = new THREE.PointLight(0xff4fd8, 2.2, 24, 1.6); brandLight.position.set(0, 4.4, -31); scene.add(brandLight);
}

// ---- lazy image helper (Shopify CDN honours ?width=) ----
const loader = new THREE.TextureLoader(); loader.setCrossOrigin('anonymous');
const sized = (src, w) => src + (src.includes('?') ? '&' : '?') + 'width=' + w;
function loadTexture(src, w) {
  return new Promise((resolve, reject) => {
    loader.load(sized(src, w), (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; resolve(t); }, undefined, reject);
  });
}

// ---- panel label (title + price) ----
function priceLabel(p) {
  const a = p.priceMin, b = p.priceMax;
  return a === b ? `$${a.toFixed(2)}` : `$${a.toFixed(2)}–$${b.toFixed(2)}`;
}
function labelPlane(p) {
  const c = document.createElement('canvas'); c.width = 512; c.height = 120;
  const x = c.getContext('2d');
  x.fillStyle = 'rgba(10,7,19,0.86)'; x.fillRect(0, 0, 512, 120);
  x.fillStyle = '#ff4fd8'; x.fillRect(0, 0, 512, 5);
  x.fillStyle = '#f4eefb'; x.font = 'bold 30px ui-monospace, monospace'; x.textAlign = 'center'; x.textBaseline = 'middle';
  const title = p.title.length > 30 ? p.title.slice(0, 29) + '…' : p.title;
  x.fillText(title, 256, 44);
  x.fillStyle = '#57e6ff'; x.font = 'bold 34px ui-monospace, monospace'; x.fillText(priceLabel(p), 256, 88);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.PlaneGeometry(1.55, 0.36), new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, fog: false }));
}

// ---- build the panels: two side walls, two rows, sorted tees→hoodies→shorts ----
const PANEL_W = 1.55, PANEL_H = 2.0;
const panels = [];           // { mesh, product, group, loaded }
const clickables = [];       // meshes for raycast
const perWall = Math.ceil(PRODUCTS.length / 2);
const cols = Math.ceil(perWall / 2);
const COL_GAP = 3.15, Z0 = 0.5;

PRODUCTS.forEach((p, i) => {
  const wall = i < perWall ? -1 : 1;          // -1 left, +1 right
  const k = i % perWall;
  const row = Math.floor(k / cols);           // 0 lower, 1 upper
  const col = k % cols;
  const x = wall * 6.2;
  const y = row ? 3.05 : 1.45;
  const z = Z0 - col * COL_GAP;

  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.rotation.y = wall < 0 ? Math.PI / 2 : -Math.PI / 2;   // face the aisle

  // frame
  const frame = new THREE.Mesh(new THREE.PlaneGeometry(PANEL_W + 0.14, PANEL_H + 0.14), new THREE.MeshBasicMaterial({ color: 0x2a1c40 }));
  frame.position.z = -0.02; group.add(frame);
  // image plane (placeholder until texture loads)
  const imgMat = new THREE.MeshBasicMaterial({ color: 0x15101f });
  const img = new THREE.Mesh(new THREE.PlaneGeometry(PANEL_W, PANEL_H), imgMat);
  img.userData.product = p;
  group.add(img);
  clickables.push(img);
  // label under the image
  const label = labelPlane(p); label.position.set(0, -(PANEL_H / 2) - 0.24, 0.01); group.add(label);
  // little spotlight glow above
  const spot = new THREE.PointLight(0x9a7bff, 0.0, 4, 2); spot.position.set(0, PANEL_H / 2 + 0.3, 0.6); group.add(spot);

  scene.add(group);
  panels.push({ mesh: img, imgMat, product: p, group, spot, loaded: false, visible: true });
});

// section signage above the first columns
{
  const seen = new Set();
  PRODUCTS.forEach((p, i) => {
    if (seen.has(p.type)) return; seen.add(p.type);
    // sign hovers over the aisle near where this type begins
    const k = i % perWall; const col = k % cols; const wall = i < perWall ? -1 : 1;
    const z = Z0 - col * COL_GAP;
    const s = neonSign(p.type.toUpperCase() + 'S', '#ffd24a', 3.2, 0.6);
    s.position.set(wall * 3.2, 4.4, z); s.rotation.y = wall < 0 ? Math.PI / 2 : -Math.PI / 2; scene.add(s);
  });
}

// ---- progressive texture loading (nearest-first, small concurrency) ----
let loadQueue = [];
function primeQueue() {
  loadQueue = [...panels].sort((a, b) => a.group.position.z * 0 + 0); // stable; distance handled at pump time
}
let inFlight = 0;
const MAX_INFLIGHT = isMobile ? 3 : 5;
function pump() {
  if (inFlight >= MAX_INFLIGHT) return;
  // pick nearest unloaded visible panel to the camera
  let best = null, bd = Infinity;
  for (const pn of panels) {
    if (pn.loaded || pn.loading || !pn.visible) continue;
    const d = pn.group.position.distanceToSquared(camera.position);
    if (d < bd) { bd = d; best = pn; }
  }
  if (!best) return;
  best.loading = true; inFlight++;
  loadTexture(best.product.images[0], isMobile ? 480 : 640)
    .then((t) => {
      best.imgMat.map = t; best.imgMat.color.set(0xffffff); best.imgMat.needsUpdate = true; best.loaded = true;
      best.spot.intensity = 0.9;
    })
    .catch(() => { best.imgMat.color.set(0x3a2450); best.loaded = true; })
    .finally(() => { best.loading = false; inFlight--; });
}

// ---- controls: aisle only (panels sit outside the walkable x-range) ----
const controls = new WalkControls(camera, { bounds: 5, eye: 1.6, zMin: -31 });
controls.pos.set(0, 1.6, 3.2); controls.yaw = 0;

// ---- pointer look + tap (tap a panel to inspect, tap floor to walk) ----
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
const GROUND = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let down = null, dragged = false;
canvas.addEventListener('pointerdown', (e) => { canvas.setPointerCapture(e.pointerId); down = { x: e.clientX, y: e.clientY, id: e.pointerId }; dragged = false; });
canvas.addEventListener('pointermove', (e) => {
  if (!down || e.pointerId !== down.id) return;
  const dx = e.clientX - down.x, dy = e.clientY - down.y;
  if (Math.abs(dx) > 5 || Math.abs(dy) > 5) dragged = true;
  controls.look(e.movementX || dx * 0.2, e.movementY || dy * 0.2);
  down.x = e.clientX; down.y = e.clientY;
});
canvas.addEventListener('pointerup', (e) => { if (down && !dragged) tap(e.clientX, e.clientY); down = null; });
canvas.addEventListener('pointercancel', () => { down = null; });
function tap(sx, sy) {
  ndc.x = (sx / innerWidth) * 2 - 1; ndc.y = -(sy / innerHeight) * 2 + 1;
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(clickables.filter((m) => m.parent.visible), false)[0];
  if (hit && hit.distance < 16) { openDetail(hit.object.userData.product); return; }
  const g = ray.ray.intersectPlane(GROUND, new THREE.Vector3());
  if (g) { g.x = THREE.MathUtils.clamp(g.x, -controls.bounds, controls.bounds); g.z = THREE.MathUtils.clamp(g.z, controls.zMin, controls.bounds); controls.walkTo(g); }
}

addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setPixelRatio(Math.min(devicePixelRatio || 1, isMobile ? 1.5 : 2)); renderer.setSize(innerWidth, innerHeight); });

// ---- detail overlay (DOM) ----
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
let currentProduct = null, selectedVariant = null;
// pick the variant for a chosen size (size can sit in any option slot); prefer an available one
function variantForSize(p, size) {
  const vs = p.variants || [];
  const match = (v) => [v.option1, v.option2, v.option3].some((o) => o === size) || String(v.title).split('/').pop().trim() === size;
  return vs.find((v) => v.available && match(v)) ?? vs.find((v) => match(v)) ?? null;
}
function firstVariant(p) { const vs = p.variants || []; return vs.find((v) => v.available) ?? vs[0] ?? null; }
function openDetail(p) {
  currentProduct = p;
  $('dTitle').textContent = p.title;
  $('dType').textContent = p.type;
  $('dPrice').textContent = priceLabel(p);
  $('dDesc').textContent = p.desc || '';
  $('dTags').innerHTML = (p.tags || []).map((t) => `<span class="chip">${esc(t)}</span>`).join('');
  const availSizes = new Set();
  for (const v of p.variants || []) { if (v.available) { const m = String(v.title).split('/').pop().trim(); availSizes.add(m); } }
  const sizes = p.sizes || [];
  selectedVariant = (sizes.find((s) => availSizes.has(s)) && variantForSize(p, sizes.find((s) => availSizes.has(s)))) || firstVariant(p);
  const selSize = selectedVariant ? [selectedVariant.option1, selectedVariant.option2, selectedVariant.option3].find((o) => sizes.includes(o)) : null;
  $('dSizes').innerHTML = sizes.length
    ? '<span class="lbl">size</span>' + sizes.map((s) => {
        const out = !availSizes.has(s);
        return `<span class="chip pick ${out ? 'out' : ''} ${s === selSize ? 'sel' : ''}" data-size="${esc(s)}">${esc(s)}</span>`;
      }).join('')
    : '';
  // images (front + back if present), sized larger
  $('dImgs').innerHTML = (p.images || []).slice(0, 2).map((src, i) =>
    `<img src="${esc(sized(src, 900))}" alt="${esc(p.title)} ${i === 0 ? 'front' : 'back'}" loading="lazy">`).join('');
  const buy = $('dBuy');
  const buyUrl = () => (selectedVariant ? `${STORE_URL}/cart/${selectedVariant.id}:1` : p.url);
  buy.href = buyUrl();
  buy.onclick = () => { try { window.open(buyUrl(), '_blank', 'noopener'); } catch (e) { /* popup blocked */ } return false; };
  $('detail').classList.add('open');
}
// pick a size → select its variant
$('dSizes').addEventListener('click', (e) => {
  const chip = e.target.closest('.chip.pick'); if (!chip || !currentProduct) return;
  selectedVariant = variantForSize(currentProduct, chip.dataset.size) ?? selectedVariant;
  for (const c of $('dSizes').querySelectorAll('.chip')) c.classList.toggle('sel', c === chip);
});
$('dAdd').onclick = () => { if (currentProduct) { addToCart(currentProduct, selectedVariant); openCart(); } };
function closeDetail() { $('detail').classList.remove('open'); }
$('dClose').onclick = closeDetail;
$('detail').addEventListener('click', (e) => { if (e.target.id === 'detail') closeDetail(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeDetail(); });

// ---- filter bar: All / Tees / Hoodies / Shorts ----
function applyFilter(type) {
  for (const pn of panels) {
    const show = type === 'all' || pn.product.type === type;
    pn.group.visible = show; pn.visible = show;
  }
  for (const b of document.querySelectorAll('.ftab')) b.classList.toggle('on', b.dataset.type === type);
}
document.querySelectorAll('.ftab').forEach((b) => { b.onclick = () => applyFilter(b.dataset.type); });

// ---- cart (localStorage; checkout deep-links straight into Shopify) ----
const CART_KEY = 'fp:store:cart:v2';   // v2: lines carry a Shopify variantId
function loadCart() { try { const v = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); return Array.isArray(v) ? v.filter((l) => l && l.variantId) : []; } catch (e) { return []; } }
function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* private mode */ } updateBadge(); }
let cart = loadCart();

function addToCart(p, variant) {
  const v = variant || firstVariant(p);
  if (!v) return;
  const key = String(v.id);
  const line = cart.find((l) => l.key === key);
  if (line) line.qty = (line.qty || 1) + 1;
  else {
    const size = [v.option1, v.option2, v.option3].find((o) => (p.sizes || []).includes(o)) || '';
    cart.push({ key, variantId: String(v.id), id: p.id, title: p.title, price: v.price ?? p.priceMin, size, url: p.url, image: (p.images || [])[0] || '', qty: 1 });
  }
  saveCart(); renderCart();
}
function setQty(key, d) {
  const line = cart.find((l) => l.key === key); if (!line) return;
  line.qty = (line.qty || 1) + d;
  if (line.qty <= 0) cart = cart.filter((l) => l.key !== key);
  saveCart(); renderCart();
}
function removeLine(key) { cart = cart.filter((l) => l.key !== key); saveCart(); renderCart(); }
function cartCount() { return cart.reduce((n, l) => n + (l.qty || 1), 0); }
function cartTotal() { return cart.reduce((s, l) => s + (l.price || 0) * (l.qty || 1), 0); }
function updateBadge() { const n = cartCount(); $('cartN').textContent = String(n); }

function renderCart() {
  const items = $('cartItems');
  if (!cart.length) { items.innerHTML = `<div class="cempty">Your cart is empty.<br>Tap a piece, pick a size, add it.</div>`; }
  else {
    items.innerHTML = cart.map((l) => `
      <div class="citem" data-key="${esc(l.key)}">
        <img src="${l.image ? esc(sized(l.image, 120)) : ''}" alt="">
        <div class="ci">
          <div class="ct">${esc(l.title)}</div>
          <div class="cm">${l.size ? esc(l.size) + ' · ' : ''}$${(l.price || 0).toFixed(2)}</div>
          <div class="cq"><button data-act="dec">–</button><span>${l.qty || 1}</span><button data-act="inc">+</button></div>
        </div>
        <button class="cx" data-act="rm" aria-label="Remove">✕</button>
      </div>`).join('');
  }
  $('cartTotal').textContent = '$' + cartTotal().toFixed(2);
  $('cartCheckout').disabled = !cart.length;
  updateBadge();
}
$('cartItems').addEventListener('click', (e) => {
  const btn = e.target.closest('button'); if (!btn) return;
  const row = e.target.closest('.citem'); if (!row) return;
  const key = row.dataset.key, act = btn.dataset.act;
  if (act === 'inc') setQty(key, 1);
  else if (act === 'dec') setQty(key, -1);
  else if (act === 'rm') removeLine(key);
});
function openCart() { renderCart(); $('drawer').classList.add('open'); }
function closeCart() { $('drawer').classList.remove('open'); }
$('cartBtn').onclick = () => { $('drawer').classList.contains('open') ? closeCart() : openCart(); };
$('cartClose').onclick = closeCart;
$('cartCheckout').onclick = () => {
  if (!cart.length) return;
  // Shopify cart permalink → items land in the cart and go straight to checkout.
  const parts = cart.filter((l) => l.variantId).map((l) => `${l.variantId}:${l.qty || 1}`);
  const url = parts.length ? `${STORE_URL}/cart/${parts.join(',')}` : `${STORE_URL}/collections/all`;
  try { window.open(url, '_blank', 'noopener'); } catch (e) { /* noop */ }
};
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

// ---- HUD wiring ----
$('backBtn').onclick = () => { window.location.href = 'index.html'; };
$('shopAll').onclick = () => { try { window.open(STORE_URL, '_blank', 'noopener'); } catch (e) { /* noop */ } };
$('prodCount').textContent = `${PRODUCTS.length} pieces`;
updateBadge();
wireMuteButton([]);

// ---- loop ----
const clock = new THREE.Clock();
let running = false, pumpAcc = 0;
function frame() {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(clock.getDelta(), 0.05);
  controls.update(dt);
  pumpAcc += dt;
  if (pumpAcc > 0.12) { pumpAcc = 0; pump(); pump(); }
  renderer.render(scene, camera);
}

primeQueue();
controls.update(0);
renderer.render(scene, camera);
$('enterBtn').onclick = () => {
  $('start').classList.add('gone');
  if (!running) { running = true; clock.start(); frame(); }
};
document.addEventListener('visibilitychange', () => { if (!document.hidden) clock.getDelta(); });
