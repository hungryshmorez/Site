import * as THREE from 'three';

// SPATIAL DISTORTION FIELDS — shimmering rippling bubbles scattered on the
// grounds. Walk into one and space bends: the field surface warps and (driven
// from main) the camera FOV breathes + the screen wobbles while you're inside.

export function buildDistortion(scene, { fields = [] } = {}) {
  const list = [];
  for (const f of fields) {
    const col = new THREE.Color(f.color || '#00f3ff');
    const mat = new THREE.ShaderMaterial({
      uniforms: { t: { value: 0 }, col: { value: col } },
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
      vertexShader: `
        uniform float t; varying float vF; varying vec3 vN;
        void main(){
          vN = normal;
          vec3 p = position;
          float w = sin(p.x*3.0 + t*2.0) * cos(p.y*3.0 - t*1.7) * sin(p.z*3.0 + t*1.3);
          p += normal * w * 0.28;                      // ripple the surface
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          vF = 1.0 - abs(normalize(-mv.xyz).z);        // fresnel-ish rim
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `
        uniform vec3 col; varying float vF;
        void main(){ float a = pow(vF, 1.6) * 0.55; gl_FragColor = vec4(col, a); }`,
    });
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(f.r || 3.4, 4), mat);
    mesh.position.set(f.pos[0], (f.r || 3.4) * 0.8, f.pos[1]);
    mesh.frustumCulled = false; scene.add(mesh);
    list.push({ mesh, mat, x: f.pos[0], z: f.pos[1], r: f.r || 3.4, id: f.id });
  }

  // returns the id of the field the player is standing in, or null
  function update(dt, time, pulse, playerPos) {
    let inside = null;
    for (const f of list) {
      f.mat.uniforms.t.value = time;
      f.mesh.rotation.y += dt * 0.3;
      const d = Math.hypot(playerPos.x - f.x, playerPos.z - f.z);
      if (d < f.r) inside = f.id;
      f.mesh.scale.setScalar(1 + pulse * 0.06 + Math.sin(time * 1.5 + f.x) * 0.03);
    }
    return inside;
  }

  return { update };
}
