// Register ball-pit meshes here so every level shares Ultra physics and cleanup.
export function registerBallPit(mesh, options, physicsUniform) {
    let enabled = false, disposed = false, simulation = null;
    mesh.userData.ballPit = {
        setUltra(on) {
            enabled = on;
            if (!on) {
                simulation?.dispose();
                simulation = null;
                physicsUniform.value = 0;
                return;
            }
            import('./ballpit_physics.js').then(({ createBallPhysics }) => {
                if (!enabled || disposed || simulation) return;
                simulation = createBallPhysics(mesh, options);
                physicsUniform.value = 1;
            }).catch(error => console.error('Ball physics could not load:', error));
        },
        step(feet, velocity, dt) { simulation?.step(feet, velocity, dt); },
        dispose() { disposed = true; simulation?.dispose(); simulation = null; },
    };
}

export function setBallPitQuality(root, ultra) {
    root.traverse(o => o.userData.ballPit?.setUltra(ultra));
}

export function stepBallPits(root, feet, velocity, dt) {
    root.traverse(o => o.userData.ballPit?.step(feet, velocity, dt));
}
