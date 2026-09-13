import * as THREE from 'three';

// ENERGY ORB — a pulsing, fresnel-lit energy sphere whose colour shifts with a
// "fulfillment" value. The GLSL is ported from the sibling Simulation-Reality
// project (src/shaders/orb/{vertex,fragment}.glsl) and adapted for three.js
// ShaderMaterial here: three injects `cameraPosition` and the matrix/attribute
// built-ins automatically, so those declarations are dropped.
//
//   const orb = buildEnergyOrb({ radius: 2.4, color: 0x00f3ff });
//   scene.add(orb.mesh);            // in the loop:  orb.update(t);
export function buildEnergyOrb({ radius = 1.5, color = 0x00f3ff, fulfillment = 0.5, detail = 5 } = {}) {
  const uniforms = {
    time: { value: 0 },
    color: { value: new THREE.Color(color) },
    fulfillment: { value: fulfillment },
    radius: { value: radius },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    side: THREE.FrontSide,
    vertexShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        float pulse = 1.0 + sin(time * 2.0) * 0.05 + sin(time * 3.7) * 0.02;
        vec3 pos = position * pulse;
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        vWorldPosition = worldPos.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }`,
    fragmentShader: `
      uniform float time;
      uniform vec3 color;
      uniform float fulfillment;
      uniform float radius;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec3 vWorldPosition;
      void main() {
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);
        float fresnel = pow(1.0 - dot(viewDir, vNormal), 3.0);
        vec3 lowColor = color;
        vec3 highColor = vec3(0.0, 1.0, 0.5);
        vec3 finalColor = mix(lowColor, highColor, fulfillment);
        finalColor += fresnel * vec3(0.3, 0.8, 1.0);
        float pulse = sin(time * 3.0) * 0.1 + 0.9;
        pulse += sin(time * 5.0) * 0.05;
        finalColor *= pulse;
        float noise = fract(sin(dot(vPosition.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        finalColor += noise * 0.05;
        float core = 1.0 - (length(vPosition) / max(radius, 0.001)) * 0.3;
        finalColor *= core;
        gl_FragColor = vec4(finalColor, 0.8 + fresnel * 0.2);
      }`,
  });
  const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, detail), mat);
  mesh.frustumCulled = false;
  return {
    mesh,
    material: mat,
    update(t) { uniforms.time.value = t; },
    setColor(c) { uniforms.color.value.set(c); },
    setFulfillment(v) { uniforms.fulfillment.value = v; },
  };
}
