import * as THREE from 'three';

// SECRET BACKSTAGE VAULT — a sealed bunker built into the grounds with a fake
// wall for a door. It's locked until you find the hidden KEYCARD dropped in a
// dark corner. Pick up the card (walk into it / click it), then click the vault
// to slide the wall open and claim the backstage pass inside.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildSecret(scene, { vaultPos = [-15, -20], cardPos = [-22, -23], accent = '#e6c04a', onFlash, onReward } = {}) {
  const col = new THREE.Color(accent);

  // ---- the keycard pickup ----
  const card = new THREE.Group();
  card.position.set(cardPos[0], 0.9, cardPos[1]);
  const cardMesh = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.32, 0.03), std({ color: 0x0a0a12, emissive: col, emissiveIntensity: 0.9, metalness: 0.6, roughness: 0.3 }));
  card.add(cardMesh);
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.08, 0.032), new THREE.MeshBasicMaterial({ color: accent })); stripe.position.y = 0.06; card.add(stripe);
  const cardGlow = new THREE.PointLight(col, 2, 5, 2); card.add(cardGlow);
  const cardProxy = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ visible: false })); card.add(cardProxy);
  scene.add(card);

  // ---- the vault ----
  const g = new THREE.Group();
  const [vx, vz] = vaultPos;
  g.position.set(vx, 0, vz);
  g.rotation.y = Math.atan2(0 - vx, -4 - vz); // door faces center
  scene.add(g);

  const metal = std({ color: 0x0e0e16, metalness: 0.7, roughness: 0.5 });
  // shell (back + sides + roof) — the interior alcove
  const back = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, 0.2), metal); back.position.set(0, 1.5, -1.4); g.add(back);
  for (const sx of [-1.7, 1.7]) { const w = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.0, 2.8), metal); w.position.set(sx, 1.5, 0); g.add(w); }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 3.0), metal); roof.position.set(0, 3.0, 0); g.add(roof);
  const floor = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.1, 2.8), std({ color: 0x08080d, roughness: 0.9 })); floor.position.set(0, 0.05, 0); g.add(floor);

  // interior reward: a glowing "backstage pass" on a pedestal
  const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.5, 0.8, 16), metal); ped.position.set(0, 0.4, -0.6); g.add(ped);
  const pass = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.05), std({ color: 0x1a1200, emissive: col, emissiveIntensity: 1.2, metalness: 0.5 }));
  pass.position.set(0, 1.4, -0.6); g.add(pass);
  const passGlow = new THREE.PointLight(col, 0, 6, 2); passGlow.position.set(0, 1.6, -0.4); g.add(passGlow);

  // the fake-wall door (slides up when unlocked)
  const door = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.0, 0.22), std({ color: 0x0b0b12, metalness: 0.6, roughness: 0.6, emissive: col, emissiveIntensity: 0.03 }));
  door.position.set(0, 1.5, 1.3); g.add(door);
  // keypad light on the door (red locked → green open)
  const pad = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.04), new THREE.MeshBasicMaterial({ color: 0xff0033 }));
  pad.position.set(1.1, 1.4, 1.42); g.add(pad);

  const proxy = new THREE.Mesh(new THREE.BoxGeometry(3.4, 3.0, 0.7), new THREE.MeshBasicMaterial({ visible: false }));
  proxy.position.set(0, 1.5, 1.3); g.add(proxy);

  const cardWorld = new THREE.Vector3(cardPos[0], 0.9, cardPos[1]);
  let hasCard = false, cardGone = false;
  let state = 'locked'; // locked → open → claimed
  let doorY = 1.5;

  function grabCard() {
    if (cardGone) return;
    cardGone = true; hasCard = true; scene.remove(card);
    onFlash && onFlash('🔑 found a keycard — now find what it opens');
  }

  function tryClick(ray) {
    if (!cardGone && ray.intersectObject(cardProxy, false)[0]) { grabCard(); return true; }
    if (ray.intersectObject(proxy, false)[0]) { activate(); return true; }
    return false;
  }
  function activate() {
    if (state === 'locked') {
      if (!hasCard) { onFlash && onFlash('🔒 sealed — there\'s a keycard slot. find the card.'); return; }
      state = 'open'; pad.material.color.setHex(0x39ff14);
      onFlash && onFlash('🎟 the wall slides open — backstage.');
    } else if (state === 'open') {
      state = 'claimed';
      onReward && onReward();
    }
  }

  function update(dt, time, pulse, playerPos) {
    if (!cardGone) {
      card.rotation.y += dt * 1.6; card.position.y = 0.9 + Math.sin(time * 2) * 0.12;
      cardGlow.intensity = 1.6 + Math.sin(time * 4) * 0.6;
      if (playerPos && Math.hypot(playerPos.x - cardWorld.x, playerPos.z - cardWorld.z) < 2) grabCard();
    }
    // slide the door up when open
    const target = state === 'locked' ? 1.5 : 4.6;
    doorY += (target - doorY) * Math.min(1, dt * 3);
    door.position.y = doorY;
    door.visible = doorY < 4.4;
    passGlow.intensity = state === 'locked' ? 0.2 : 2 + pulse * 2;
    pass.material.emissiveIntensity = state === 'locked' ? 0.5 : 1.2 + Math.sin(time * 3) * 0.4;
    if (state === 'open') pass.rotation.y += dt * 1.2;
  }

  return { update, tryClick, isClaimed: () => state === 'claimed', hasCard: () => hasCard };
}
