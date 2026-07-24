import * as THREE from 'three';
import { PALETTE } from '../data/destinations.js';

// Procedural fireworks that burst over the stage on the drop. A shared pool of
// additive points; each burst throws a coloured sphere of sparks that arc,
// drag, and fade. Looks best at night with bloom on.

export function buildFireworks(scene, { origin = [0, 14, -26] } = {}) {
  const MAX = 260, PER = 64;
  const positions = new Float32Array(MAX * 3);
  const colors = new Float32Array(MAX * 3);
  const parts = Array.from({ length: MAX }, () => ({ active: false, p: new THREE.Vector3(), v: new THREE.Vector3(), life: 0, maxLife: 1, c: new THREE.Color() }));
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  const points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.55, map: dot(), vertexColors: true, transparent: true, depthWrite: false,
    blending: THREE.AdditiveBlending, sizeAttenuation: true,
  }));
  points.frustumCulled = false; scene.add(points);
  const COLORS = [PALETTE.cyan, PALETTE.magenta, PALETTE.green, PALETTE.gold, PALETTE.purple].map((h) => new THREE.Color(h));
  const _d = new THREE.Vector3();

  function burst() {
    const c = COLORS[(Math.random() * COLORS.length) | 0];
    const ox = origin[0] + (Math.random() - 0.5) * 22, oy = origin[1] + Math.random() * 7, oz = origin[2] + (Math.random() - 0.5) * 4;
    let n = 0;
    for (const pt of parts) {
      if (pt.active) continue;
      _d.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
      if (_d.lengthSq() < 1e-4) _d.set(0, 1, 0);
      _d.normalize().multiplyScalar(3.5 + Math.random() * 5.5);
      pt.p.set(ox, oy, oz); pt.v.copy(_d); pt.v.y += 1.5;
      pt.life = 0; pt.maxLife = 1.1 + Math.random() * 0.9;
      pt.c.copy(c).offsetHSL((Math.random() - 0.5) * 0.06, 0, (Math.random() - 0.5) * 0.1);
      pt.active = true;
      if (++n >= PER) break;
    }
  }

  function update(dt) {
    const p = geo.attributes.position.array, cc = geo.attributes.color.array;
    for (let i = 0; i < MAX; i++) {
      const pt = parts[i];
      if (!pt.active) { cc[i * 3] = cc[i * 3 + 1] = cc[i * 3 + 2] = 0; continue; }
      pt.life += dt;
      if (pt.life >= pt.maxLife) { pt.active = false; cc[i * 3] = cc[i * 3 + 1] = cc[i * 3 + 2] = 0; continue; }
      pt.v.y -= 7 * dt; pt.v.multiplyScalar(Math.max(0, 1 - dt * 0.7));
      pt.p.addScaledVector(pt.v, dt);
      const t = pt.life / pt.maxLife, fade = (1 - t) * (1 - t);
      p[i * 3] = pt.p.x; p[i * 3 + 1] = pt.p.y; p[i * 3 + 2] = pt.p.z;
      cc[i * 3] = pt.c.r * fade; cc[i * 3 + 1] = pt.c.g * fade; cc[i * 3 + 2] = pt.c.b * fade;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  }

  return { burst, update };
}

function dot() {
  const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  const rad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rad.addColorStop(0, 'rgba(255,255,255,1)'); rad.addColorStop(0.4, 'rgba(255,255,255,.6)'); rad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = rad; g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}
