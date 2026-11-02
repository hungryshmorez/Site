import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export function createBallPhysics(mesh, { radius, floor, bounds, ceiling, solids = [], playerRadius = 1.6, playerHeight = 7.8 }) {
    const { minX, maxX, minZ, maxZ } = bounds;
    const activeRadius = Math.max(playerRadius + radius * 3, radius * 6.5);
    const outerRadius = activeRadius + radius * 3.3;
    const scales = new Float32Array(mesh.count * 3);
    const initial = mesh.instanceMatrix.array.slice();
    const positions = new Float32Array(mesh.count * 3);
    const matrix = new THREE.Matrix4(), scale = new THREE.Vector3(1, 1, 1);
    const position = new THREE.Vector3(), rotation = new THREE.Quaternion();
    for (let i = 0; i < mesh.count; i++) {
        positions.set(initial.subarray(i * 16 + 12, i * 16 + 15), i * 3);
        matrix.fromArray(initial, i * 16).decompose(position, rotation, scale);
        scales.set([scale.x, scale.y, scale.z], i * 3);
    }
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    // Moving balls must not be culled using the original pile's bounds.
    const wasCulled = mesh.frustumCulled;
    mesh.frustumCulled = false;
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -18, 0), allowSleep: true });
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.broadphase.axisIndex = 2;
    world.solver.iterations = 3;
    const plastic = new CANNON.Material('plastic');
    world.defaultContactMaterial.friction = 0.22;
    world.defaultContactMaterial.restitution = 0.28;
    world.addContactMaterial(new CANNON.ContactMaterial(plastic, plastic, { friction: 0.12, restitution: 0.38 }));
    const addBox = (minX, maxX, minY, maxY, minZ, maxZ) => {
        const body = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3((maxX - minX) / 2, (maxY - minY) / 2, (maxZ - minZ) / 2)) });
        body.position.set((minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2);
        world.addBody(body);
    };
    addBox(minX, maxX, floor - 1, floor, minZ, maxZ);
    addBox(minX - 1, minX, floor, ceiling, minZ - 1, maxZ + 1);
    addBox(maxX, maxX + 1, floor, ceiling, minZ - 1, maxZ + 1);
    addBox(minX, maxX, floor, ceiling, minZ - 1, minZ);
    addBox(minX, maxX, floor, ceiling, maxZ, maxZ + 1);
    addBox(minX, maxX, ceiling, ceiling + 1, minZ, maxZ);
    for (const s of solids) addBox(s.minX, s.maxX, s.minY, s.maxY, s.minZ, s.maxZ);
    const player = new CANNON.Body({ type: CANNON.Body.KINEMATIC });
    const segments = Math.max(1, Math.ceil((playerHeight - playerRadius * 2) / (playerRadius * 1.5)));
    for (let i = 0; i <= segments; i++) {
        const y = playerRadius + (playerHeight - playerRadius * 2) * i / segments;
        player.addShape(new CANNON.Sphere(playerRadius), new CANNON.Vec3(0, y, 0));
    }
    world.addBody(player);
    const active = new Map();
    let refresh = 0;
    const write = (i, body) => {
        position.set(body.position.x, body.position.y, body.position.z);
        rotation.set(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w);
        scale.fromArray(scales, i * 3);
        matrix.compose(position, rotation, scale);
        mesh.setMatrixAt(i, matrix);
        positions.set([position.x, position.y, position.z], i * 3);
    };
    return {
        step(feet, velocity, dt) {
            if (!(dt > 0)) return;
            dt = Math.min(dt, 0.05);
            player.position.set(feet.x, feet.y, feet.z);
            player.velocity.set(velocity.x, velocity.y, velocity.z);
            const speed = player.velocity.length();
            if (speed > 30) player.velocity.scale(30 / speed, player.velocity);
            player.aabbNeedsUpdate = true;
            refresh -= dt;
            if (refresh <= 0) {
                refresh = 0.12;
                // A static outer ring supports the active pile, rather than letting it spill
                // into the frozen balls. Only this local region enters the physics world.
                for (let i = 0; i < mesh.count; i++) {
                    const dx = positions[i * 3] - feet.x, dz = positions[i * 3 + 2] - feet.z;
                    const d2 = dx * dx + dz * dz;
                    let body = active.get(i);
                    // Never freeze an airborne or rolling ball at the activation boundary.
                    // Once disturbed it stays dynamic until it has actually gone to sleep.
                    if (body?.mass && body.sleepState !== CANNON.Body.SLEEPING) continue;
                    if (d2 > outerRadius * outerRadius) {
                        if (body) { write(i, body); world.removeBody(body); active.delete(i); }
                        continue;
                    }
                    const mass = d2 < activeRadius * activeRadius ? 0.05 : 0;
                    if (!body) {
                        const ballRadius = radius * Math.max(scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]);
                        body = new CANNON.Body({ mass, material: plastic, shape: new CANNON.Sphere(ballRadius), linearDamping: 0.16, angularDamping: 0.25,
                            sleepSpeedLimit: 0.15, sleepTimeLimit: 0.6 });
                        body.position.set(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                        matrix.fromArray(mesh.instanceMatrix.array, i * 16);
                        rotation.setFromRotationMatrix(matrix);
                        body.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
                        world.addBody(body);
                        active.set(i, body);
                    } else if (body.mass !== mass) {
                        body.mass = mass;
                        body.type = mass ? CANNON.Body.DYNAMIC : CANNON.Body.STATIC;
                        body.velocity.setZero(); body.angularVelocity.setZero();
                        body.updateMassProperties();
                        body.wakeUp();
                        world.broadphase.dirty = true;
                    }
                }
            }
            world.step(1 / 60, dt, 3);
            for (const [i, body] of active) if (body.mass) write(i, body);
            mesh.instanceMatrix.needsUpdate = true;
        },
        dispose() {
            for (const body of [...world.bodies]) world.removeBody(body);
            active.clear();
            mesh.instanceMatrix.array.set(initial);
            mesh.instanceMatrix.needsUpdate = true;
            mesh.frustumCulled = wasCulled;
        },
    };
}
