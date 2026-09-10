import * as THREE from 'three';

// Tanky's tailgate: a lifted low-poly truck (tailgate down) in one group, and a
// SEPARATE beer-pong table (with NPCs tossing ping-pong balls into the cups) in
// its own group so the two can be placed independently. Each is built in local
// space facing +Z, then positioned by the caller.

const std = (o) => new THREE.MeshStandardMaterial(o);

export function buildTailgate(scene, { pos = [15, -7], rot = -0.9, pongPos = null, pongRot = null, accent = '#e6c04a', onState, truck: withTruck = true } = {}) {
  const col = new THREE.Color(accent);
  const bodyMat = std({ color: 0x7a1424, metalness: 0.6, roughness: 0.28 });   // glossy deep red
  const glass = std({ color: 0x05080f, metalness: 0.4, roughness: 0.15, emissive: col, emissiveIntensity: 0.05 });
  const chrome = std({ color: 0x9aa0aa, metalness: 0.9, roughness: 0.25 });
  const tire = std({ color: 0x0a0a0e, roughness: 0.9 });

  // ---- lifted truck (its own group; rear/tailgate faces +Z) ----
  const group = new THREE.Group();
  group.position.set(pos[0], 0, pos[1]); group.rotation.y = rot; scene.add(group);
  let underglow = null;
  if (withTruck) {
    const truck = new THREE.Group(); truck.position.set(0, 0, 0); group.add(truck);
    const L = 1.15; // lift
    const bed = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 2.6), bodyMat); bed.position.set(0, L + 0.35, 0.8); bed.castShadow = true; truck.add(bed);
    const cooler = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.5, 0.75), std({ color: 0xd6d8dc, roughness: 0.6 })); cooler.position.set(-0.5, L + 0.95, 0.9); cooler.castShadow = true; truck.add(cooler);
    const lid = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.09, 0.78), std({ color: 0xc02f2f, roughness: 0.5 })); lid.position.set(-0.5, L + 1.24, 0.9); truck.add(lid);
    const cab = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 2.0), bodyMat); cab.position.set(0, L + 0.55, -1.1); cab.castShadow = true; truck.add(cab);
    const cabTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 1.7), glass); cabTop.position.set(0, L + 1.4, -1.05); truck.add(cabTop);
    const hood = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.7, 1.2), bodyMat); hood.position.set(0, L + 0.35, -2.6); hood.castShadow = true; truck.add(hood);
    const gate = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.7, 0.1), bodyMat); gate.position.set(0, L + 0.03, 2.15); gate.rotation.x = -Math.PI / 2; truck.add(gate);
    const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.25, 0.2), chrome); bumper.position.set(0, L - 0.1, -3.25); truck.add(bumper);
    for (const sx of [-0.85, 0.85]) { const hl = new THREE.Mesh(new THREE.CircleGeometry(0.17, 16), new THREE.MeshBasicMaterial({ color: 0xfff2c0 })); hl.position.set(sx, L + 0.35, -3.21); hl.rotation.y = Math.PI; truck.add(hl); }
    for (const sx of [-0.9, 0.9]) { const tl = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.18), new THREE.MeshBasicMaterial({ color: 0xff2a2a })); tl.position.set(sx, L + 0.45, 2.11); truck.add(tl); }
    for (const [tx, tz] of [[-1.25, -2.0], [1.25, -2.0], [-1.25, 1.3], [1.25, 1.3]]) {
      const w = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 0.55, 20), tire); w.rotation.z = Math.PI / 2; w.position.set(tx, 0.72, tz); w.castShadow = true; truck.add(w);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.57, 10), chrome); hub.rotation.z = Math.PI / 2; hub.position.set(tx, 0.72, tz); truck.add(hub);
    }
    underglow = new THREE.PointLight(accent, 2, 6, 2); underglow.position.set(0, 0.2, -1); truck.add(underglow);
  }

  // ---- beer-pong table: its OWN group, placed independently ----
  const pong = new THREE.Group();
  const pp = pongPos || [pos[0], pos[1] + 4]; // default: just off the tailgate
  pong.position.set(pp[0], 0, pp[1]); pong.rotation.y = (pongRot != null ? pongRot : rot); scene.add(pong);

  const top = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 3.0), std({ color: 0x203040, roughness: 0.5, metalness: 0.3, emissive: col, emissiveIntensity: 0.06 }));
  top.position.set(0, 0.9, 0); top.castShadow = true; pong.add(top);
  for (const [lx, lz] of [[-0.5, -1.3], [0.5, -1.3], [-0.5, 1.3], [0.5, 1.3]]) { const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.9, 8), std({ color: 0x14141c, metalness: 0.6, roughness: 0.4 })); leg.position.set(lx, 0.45, lz); pong.add(leg); }
  // ---- cups: TWO racks. The FAR rack is the AI's (you throw at it); the NEAR
  // rack is yours (the AI throws at it). Turn-based 1-on-1 beer pong. ----
  const rackRows = [[0], [-0.16, 0.16], [-0.32, 0, 0.32]];
  const CUP_TOP = 1.06, CUP_R = 0.082, BALL_R = 0.06, G = 11, MAKE_R = 0.06; // MAKE_R = catch radius (axis) for a clean drop-in
  function makeRack(zBase, dir, side) {
    const arr = [];
    rackRows.forEach((row, ri) => row.forEach((cx) => {
      const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.16, 14),
        std({ color: 0xd11e2a, roughness: 0.6, emissive: new THREE.Color(0xd11e2a), emissiveIntensity: 0.25 }));
      cup.position.set(cx, 0.98, zBase + dir * ri * 0.16); pong.add(cup);
      arr.push({ mesh: cup, sunk: false, side });
    }));
    return arr;
  }
  const aiCups = makeRack(-1.2, 1, 'ai');          // far end — YOU throw at these
  const playerCups = makeRack(1.2, -1, 'player');  // near end — the AI throws at these
  const allCups = aiCups.concat(playerCups);
  const cupWorld = (c, out) => c.mesh.getWorldPosition(out);

  const marker = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.04, 10, 28), new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false }));
  marker.rotation.x = Math.PI / 2; marker.position.set(0, 2.2, 0); pong.add(marker);
  const markerLight = new THREE.PointLight(accent, 2.5, 7, 2); markerLight.position.set(0, 1.6, 0); pong.add(markerLight);

  // ---- the opponent: one NPC at the far end, facing you ----
  const npcMat = std({ color: 0x0a0a12, roughness: 1, emissive: new THREE.Color(0x1a0a10), emissiveIntensity: 0.2 });
  const npc = new THREE.Group(); npc.position.set(0, 0, -2.1); npc.rotation.y = Math.PI; pong.add(npc);
  { const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.26, 0.7, 4, 8), npcMat); body.position.y = 0.85; body.castShadow = true; npc.add(body);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), npcMat); head.position.y = 1.45; npc.add(head);
    const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.07, 0.4, 4, 6), npcMat); arm.position.set(0.22, 1.15, 0.2); arm.rotation.x = -0.6; npc.add(arm); }

  const _wc = new THREE.Vector3();
  const tableCenter = () => pong.localToWorld(_wc.set(0, 0.98, 0));
  const near = (p) => { const c = tableCenter(); return Math.hypot(p.x - c.x, p.z - c.z) < 8; };

  // ---- one shared ball pool (you + the AI) ----
  const balls = [];
  const pGeo = new THREE.SphereGeometry(BALL_R, 12, 10);
  for (let i = 0; i < 4; i++) {
    const m = new THREE.Mesh(pGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x777777, emissiveIntensity: 0.4, roughness: 0.5 }));
    m.visible = false; scene.add(m);
    balls.push({ mesh: m, v: new THREE.Vector3(), prevY: 0, active: false, thrower: null, resolved: false, life: 0 });
  }
  const _tc = new THREE.Vector3(), _lp = new THREE.Vector3(), _fwd = new THREE.Vector3();

  // ---- game state ----
  let turn = 'player', winner = null, inFlight = false, aiTimer = 0, resetT = 0;

  function say() {
    if (!onState) return;
    const you = aiCups.filter((c) => !c.sunk).length, them = playerCups.filter((c) => !c.sunk).length;
    if (turn === 'over') onState(winner === 'player' ? `🏆 YOU WIN!  ·  ${you}–${them}` : `😈 the AI wins  ·  ${you}–${them}`, turn);
    else onState(`🍺 ${turn === 'player' ? 'YOUR shot — aim & click' : 'AI is shooting…'}  ·  you ${you}–${them} them`, turn);
  }

  function launch(thrower, from, vel) {
    const b = balls.find((x) => !x.active); if (!b) return;
    b.thrower = thrower; b.active = true; b.resolved = false; b.life = 0; b.mesh.visible = true;
    b.mesh.position.copy(from); b.prevY = from.y; b.v.copy(vel); inFlight = true;
  }

  // YOU throw — only on your turn. The ball is LOBBED to wherever you clicked:
  // we intersect the click ray with the cup-lip plane to get the aim point, add a
  // little scatter (so a dead-on click isn't an automatic make), and solve for the
  // arc that lands there in a fixed time. No more hurling it across the map.
  const _aim = new THREE.Vector3(), _from = new THREE.Vector3();
  const AIM_Y = 1.04;        // cup-lip height — where a click resolves on the table
  const THROW_T = 0.9;       // flight time; fixes the arc so throws land, not sail
  const AIM_SPREAD = 0.085;  // ± metres of give-and-take around the click point
  function throwBall(camera, raycaster) {
    if (turn !== 'player' || inFlight) return;
    camera.getWorldDirection(_fwd);
    const dir = raycaster ? raycaster.ray.direction : _fwd;
    const org = raycaster ? raycaster.ray.origin : camera.position;
    // where does the click ray meet the horizontal cup-lip plane?
    const t = dir.y < -1e-3 ? (AIM_Y - org.y) / dir.y : -1;
    if (t > 0 && t < 80) _aim.copy(org).addScaledVector(dir, t);
    else { // looking flat/up — default to the middle of the far rack
      const live = aiCups.filter((c) => !c.sunk);
      if (live.length) cupWorld(live[(live.length / 2) | 0], _aim);
      else pong.localToWorld(_aim.set(0, AIM_Y, -1.35));
      _aim.y = AIM_Y;
    }
    // clamp to the table region so a wild click can't fling it off the map
    pong.worldToLocal(_lp.copy(_aim));
    _lp.x = THREE.MathUtils.clamp(_lp.x, -1.1, 1.1);
    _lp.z = THREE.MathUtils.clamp(_lp.z, -2.0, 2.2);
    pong.localToWorld(_lp); _aim.copy(_lp); _aim.y = AIM_Y;
    // scatter, so clicking dead-centre on a lid still only lands *near* it
    _aim.x += (Math.random() - 0.5) * 2 * AIM_SPREAD;
    _aim.z += (Math.random() - 0.5) * 2 * AIM_SPREAD;
    // launch from just in front of the camera, arced to reach the aim point in T
    _from.copy(camera.position).addScaledVector(_fwd, 0.4);
    const T = THROW_T;
    launch('player', _from.clone(), new THREE.Vector3(
      (_aim.x - _from.x) / T,
      (_aim.y - _from.y + 0.5 * G * T * T) / T,
      (_aim.z - _from.z) / T));
  }

  // AI arcs a shot at a random one of YOUR cups, with a little wobble so it misses sometimes
  const AI_MAKE = 0.46; // the AI sinks roughly half its shots (rim bounces add a few) — beatable
  function aiThrow() {
    const targets = playerCups.filter((c) => !c.sunk); if (!targets.length) return;
    const dest = cupWorld(targets[(Math.random() * targets.length) | 0], new THREE.Vector3());
    dest.y = 1.04;                                                        // aim for the lip so it drops in
    const s = Math.random() < AI_MAKE ? 0.03 : 0.5;                       // precise, or clearly off the rack
    dest.x += (Math.random() - 0.5) * s; dest.z += (Math.random() - 0.5) * s;
    const from = pong.localToWorld(_lp.set(0.2, 1.55, -2.0)).clone();
    const T = 0.82;
    launch('ai', from, new THREE.Vector3((dest.x - from.x) / T, (dest.y - from.y + 0.5 * G * T * T) / T, (dest.z - from.z) / T));
  }

  function endThrow(b) {
    b.active = false; b.mesh.visible = false; inFlight = false;
    if (turn === 'over') return;
    if (aiCups.every((c) => c.sunk)) { winner = 'player'; turn = 'over'; say(); resetT = 3.4; return; }
    if (playerCups.every((c) => c.sunk)) { winner = 'ai'; turn = 'over'; say(); resetT = 3.4; return; }
    turn = (b.thrower === 'player') ? 'ai' : 'player';
    if (turn === 'ai') aiTimer = 1.1;
    say();
  }

  function resetGame() { allCups.forEach((c) => { c.sunk = false; c.mesh.visible = true; }); turn = 'player'; winner = null; inFlight = false; aiTimer = 0; say(); }

  function stepBall(b, dt) {
    b.life += dt; b.prevY = b.mesh.position.y;
    b.v.y -= G * dt; b.mesh.position.addScaledVector(b.v, dt);
    const p = b.mesh.position;
    // cup detection: fires the frame the ball descends through the lip. A single
    // sample at the lip is a poor test — the ball is moving fast and steeply, so it
    // can cross the lip plane offset from the cup yet still be falling INTO it. So we
    // project the descent forward and use the closest approach to each cup's axis to
    // decide: drop it in (make) or clip the rim (bounce).
    if (!b.resolved && b.prevY > CUP_TOP && p.y <= CUP_TOP && b.v.y < 0) {
      const target = b.thrower === 'player' ? 'ai' : 'player';
      const vhx = b.v.x, vhz = b.v.z, vh2 = vhx * vhx + vhz * vhz;
      const tFall = 0.16 / Math.max(0.6, -b.v.y);                     // ~time to reach cup depth
      let best = null, bestMin = 1e9, bestCur = 0, bcx = 0, bcz = 0;
      for (const c of allCups) {
        if (c.sunk) continue;
        cupWorld(c, _tc);
        const rx = p.x - _tc.x, rz = p.z - _tc.z;
        let ts = vh2 > 1e-6 ? -((rx * vhx + rz * vhz) / vh2) : 0;     // time of closest horizontal approach
        if (ts < 0) ts = 0; else if (ts > tFall) ts = tFall;
        const dmin = Math.hypot(rx + vhx * ts, rz + vhz * ts);
        if (dmin < bestMin) { bestMin = dmin; best = c; bestCur = Math.hypot(rx, rz); bcx = _tc.x; bcz = _tc.z; }
      }
      if (best) {
        if (bestMin < MAKE_R && best.side === target) { best.sunk = true; best.mesh.visible = false; b.resolved = true; endThrow(b); return; }
        if (bestCur < CUP_R + BALL_R) {                              // clipped the rim → bounce off the top
          p.y = CUP_TOP; b.v.y = Math.abs(b.v.y) * 0.55;
          const dx = p.x - bcx, dz = p.z - bcz, d = Math.hypot(dx, dz), n = d > 1e-4 ? 1 / d : 0;
          b.v.x = b.v.x * 0.3 + dx * n * 0.9; b.v.z = b.v.z * 0.3 + dz * n * 0.9;
          return;
        }
      }
    }
    // table-top bounce (inside the table footprint)
    pong.worldToLocal(_lp.copy(p));
    if (p.y <= 0.985 + BALL_R && b.v.y < 0 && Math.abs(_lp.x) < 0.62 && Math.abs(_lp.z) < 1.55) {
      p.y = 0.985 + BALL_R; b.v.y = Math.abs(b.v.y) * 0.4; b.v.x *= 0.7; b.v.z *= 0.7;
      if (!b.resolved && Math.hypot(b.v.x, b.v.z) < 0.5 && b.v.y < 1.0) { b.resolved = true; endThrow(b); return; }
    }
    // off the table / to the floor, or timed out
    if (p.y < 0.08 || b.life > 5) { if (!b.resolved) { b.resolved = true; endThrow(b); } else { b.active = false; b.mesh.visible = false; } }
  }

  function update(dt, time, pulse) {
    if (underglow) underglow.intensity = 1.6 + pulse * 1.4;
    marker.material.opacity = 0.55 + Math.sin(time * 3) * 0.25 + pulse * 0.2;
    marker.position.y = 2.2 + Math.sin(time * 1.6) * 0.12;
    if (turn === 'ai' && !inFlight) { aiTimer -= dt; if (aiTimer <= 0) aiThrow(); }
    if (resetT > 0) { resetT -= dt; if (resetT <= 0) resetGame(); }
    for (const b of balls) if (b.active) stepBall(b, dt);
  }
  say();

  // Where to stand to play: the NEAR end (behind YOUR rack, local +z), facing the
  // NPC (local -z). Derived from the pong group transform so it always tracks the
  // table even if it's moved — never leaves you stranded behind the truck.
  const _spp = new THREE.Vector3(), _spf = new THREE.Vector3();
  function playSpot() {
    pong.localToWorld(_spp.set(0, 0, 2.7));
    _spf.set(0, 0, -1).applyQuaternion(pong.quaternion);
    return { pos: [_spp.x, _spp.z], yaw: Math.atan2(-_spf.x, -_spf.z), pitch: -0.3 };
  }

  return { update, near, throwBall, group, pong, marker, playSpot,
    made: () => allCups.filter((c) => c.sunk).length,
    state: () => ({ turn, winner, aiLeft: aiCups.filter((c) => !c.sunk).length, youLeft: playerCups.filter((c) => !c.sunk).length }) };
}
