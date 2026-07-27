import * as THREE from 'three';

// A shady dealer lurking in the crowd. Reach him — or click him — and he hooks
// you up: the whole festival goes TRI-PPY (rainbow warp), echoing the toggle on
// doesntmatter.us. Reach him again to come back down. Finding him is what
// unlocks the TRI-PPY toggle in the HUD; the glowing product in his hands is
// the lure that catches your eye in the dark.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildDealer(scene, { pos = [-5, 5], stageZ = -24, onToggle } = {}) {
  const group = new THREE.Group();
  const [x, z] = pos;
  group.position.set(x, 0, z);
  group.rotation.y = Math.atan2(0 - x, -4 - z); // face the center of the grounds
  scene.add(group);

  const hoodie = std({ color: 0x0e0f14, roughness: 0.92 });
  const skin = std({ color: 0xb89a7c, roughness: 0.7 });

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.32, 0.95, 6, 12), hoodie);
  body.position.y = 1.05; body.rotation.x = 0.12; body.castShadow = true; group.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.23, 18, 16), skin);
  head.position.set(0, 1.72, 0.06); group.add(head);
  const hood = new THREE.Mesh(new THREE.SphereGeometry(0.3, 18, 16, 0, Math.PI * 2, 0, Math.PI * 0.62), hoodie);
  hood.position.set(0, 1.78, -0.02); hood.rotation.x = -0.25; hood.castShadow = true; group.add(hood);

  // shades
  const glasses = new THREE.Mesh(
    new THREE.BoxGeometry(0.34, 0.08, 0.05),
    std({ color: 0x050505, emissive: new THREE.Color(0x113311), emissiveIntensity: 0.5, metalness: 0.4, roughness: 0.2 })
  );
  glasses.position.set(0, 1.72, 0.24); group.add(glasses);

  // arms forward, cupped around the product
  for (const sx of [-0.24, 0.24]) {
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.09, 0.5, 4, 8), hoodie);
    arm.rotation.x = 1.2; arm.position.set(sx, 1.15, 0.34); group.add(arm);
  }

  // the product — a glowing baggie. Toxic-green while sober, cycles rainbow
  // once you're tripping (a wink at what it does).
  const bagMat = std({ color: 0x111111, emissive: new THREE.Color('#39ff14'), emissiveIntensity: 1.4, transparent: true, opacity: 0.92 });
  const bag = new THREE.Mesh(new THREE.IcosahedronGeometry(0.12, 0), bagMat);
  bag.position.set(0, 1.06, 0.55); group.add(bag);
  const bagLight = new THREE.PointLight('#39ff14', 2.2, 3.2, 2); bagLight.position.copy(bag.position); group.add(bagLight);

  // legs
  for (const sx of [-0.14, 0.14]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.11, 0.85, 10), hoodie);
    leg.position.set(sx, 0.45, 0); group.add(leg);
  }

  // invisible click proxy
  const proxy = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 2.2, 8), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.y = 1.1; group.add(proxy);

  const worldPos = new THREE.Vector3(x, 1.6, z);
  const _col = new THREE.Color();
  let hue = 0.33;
  let wasClose = false;

  function tryClick(raycaster) {
    if (raycaster.intersectObject(proxy, false)[0]) { onToggle && onToggle(); return true; }
    return false;
  }

  function update(dt, time, pulse, playerPos, trippy) {
    // idle shuffle + a little look-around
    body.position.y = 1.05 + Math.sin(time * 1.6) * 0.012;
    group.rotation.z = Math.sin(time * 0.8) * 0.02;
    // product glow: rainbow-cycles while tripping, steady green when sober
    hue = (hue + dt * (trippy ? 0.28 : 0.015)) % 1;
    _col.setHSL(trippy ? hue : 0.33, 1, 0.55);
    bagMat.emissive.copy(_col); bagLight.color.copy(_col);
    bagMat.emissiveIntensity = 1.0 + pulse * 0.8 + Math.sin(time * 4) * 0.3;
    bagLight.intensity = 1.8 + pulse * 1.5;
    bag.rotation.y += dt * 1.6; bag.rotation.x += dt * 0.8;

    if (!playerPos) return;
    const close = playerPos.distanceTo(worldPos) < 2.6;
    if (close && !wasClose && onToggle) onToggle();  // edge-trigger on arrival
    wasClose = close;
  }

  return { update, tryClick, worldPos, pos, group };
}
