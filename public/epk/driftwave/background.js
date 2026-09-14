import * as THREE from 'three';

// --- Configuration ---
const CONFIG = {
    speed: 0.15,
    noiseScale: 2.0,
    color1: new THREE.Color(0x050014), // Deep Purple/Black
    color2: new THREE.Color(0x2a1b3d), // Darker muted purple
    color3: new THREE.Color(0xd63e89), // Muted Pink
    color4: new THREE.Color(0x01cdfe)  // Neon Blue
};

// --- Shader ---
const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform float iTime;
    uniform vec2 iResolution;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    uniform vec3 colorD;
    
    varying vec2 vUv;

    // Simplex noise function
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
        const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        return 105.0 * dot( m*m, vec3( dot(p.x,x0), dot(p.y,x12.xy), dot(p.z,x12.zw) ) );
    }

    void main() {
        vec2 uv = vUv;
        
        // Slow drifting movement
        float time = iTime * 0.2;
        
        // Create multiple layers of noise for the "slush" effect
        float n1 = snoise(uv * 2.0 + vec2(time * 0.1, time * 0.2));
        float n2 = snoise(uv * 4.0 - vec2(time * 0.3, time * 0.1));
        
        // Combine noise
        float finalNoise = (n1 + n2) * 0.5;
        
        // Color mixing based on noise
        vec3 col = mix(colorA, colorB, uv.y + finalNoise * 0.2);
        col = mix(col, colorC, smoothstep(0.3, 0.7, finalNoise + uv.x * 0.5));
        
        // Add "neon fog" highlights
        float fog = smoothstep(0.4, 0.6, snoise(uv * 8.0 + time));
        col = mix(col, colorD, fog * 0.15); // Subtle blue highlights

        // Add scanline-like banding in shader for depth
        float scanline = sin(uv.y * 100.0 + time * 5.0) * 0.02;
        col += scanline;

        gl_FragColor = vec4(col, 1.0);
    }
`;

// --- Scene Setup ---
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

const geometry = new THREE.PlaneGeometry(2, 2);
const uniforms = {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    colorA: { value: CONFIG.color1 },
    colorB: { value: CONFIG.color2 },
    colorC: { value: CONFIG.color3 },
    colorD: { value: CONFIG.color4 }
};

const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    uniforms.iTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();

// --- Resize Handler ---
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
});