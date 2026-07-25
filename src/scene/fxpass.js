import * as THREE from 'three';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

// A single full-screen post pass with switchable "camera modes": NORMAL, CRT,
// VHS, ASCII, GAMEBOY, WIREFRAME (edge-detect). One pass, one `uMode` uniform.

function asciiAtlas() {
  const chars = ' .:-=+*#%@';
  const n = chars.length, cell = 16;
  const c = document.createElement('canvas'); c.width = cell * n; c.height = cell;
  const x = c.getContext('2d');
  x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height);
  x.fillStyle = '#fff'; x.font = `${cell - 2}px monospace`; x.textAlign = 'center'; x.textBaseline = 'middle';
  for (let i = 0; i < n; i++) x.fillText(chars[i], i * cell + cell / 2, cell / 2 + 1);
  const t = new THREE.CanvasTexture(c); t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
  return { tex: t, cols: n };
}

export const FX_MODES = ['normal', 'crt', 'vhs', 'ascii', 'gameboy', 'wireframe'];

export function createFXPass() {
  const { tex, cols } = asciiAtlas();
  const shader = {
    uniforms: {
      tDiffuse: { value: null },
      uMode: { value: 0 },
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(innerWidth, innerHeight) },
      uAscii: { value: tex },
      uCols: { value: cols },
    },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform sampler2D tDiffuse, uAscii; uniform int uMode;
      uniform float uTime, uCols; uniform vec2 uRes;
      float lum(vec3 c){ return dot(c, vec3(0.299,0.587,0.114)); }
      float lumAt(vec2 uv){ return lum(texture2D(tDiffuse, uv).rgb); }
      void main(){
        if(uMode==0){ gl_FragColor = texture2D(tDiffuse, vUv); return; }

        if(uMode==1){ // CRT
          vec2 cc = vUv-0.5; float d=dot(cc,cc); vec2 uv=vUv+cc*d*0.12;
          if(uv.x<0.0||uv.x>1.0||uv.y<0.0||uv.y>1.0){ gl_FragColor=vec4(0.0,0.0,0.0,1.0); return; }
          float sh=0.0018; vec3 col;
          col.r=texture2D(tDiffuse,uv+vec2(sh,0.0)).r; col.g=texture2D(tDiffuse,uv).g; col.b=texture2D(tDiffuse,uv-vec2(sh,0.0)).b;
          col *= 0.82+0.18*sin(uv.y*uRes.y*0.9);
          col *= smoothstep(0.85,0.15,d*1.4)*1.06;
          gl_FragColor=vec4(col,1.0); return;
        }
        if(uMode==2){ // VHS
          vec2 uv=vUv; float ln=floor(uv.y*80.0);
          float shift=0.006*step(0.97, fract(sin(ln+floor(uTime*3.0))*43758.5));
          uv.x+=shift; float ch=0.004; vec3 col;
          col.r=texture2D(tDiffuse,uv+vec2(ch,0.0)).r; col.g=texture2D(tDiffuse,uv).g; col.b=texture2D(tDiffuse,uv-vec2(ch,0.0)).b;
          float noise=fract(sin(dot(gl_FragCoord.xy, vec2(12.9,78.2))+uTime)*43758.5);
          col += (noise-0.5)*0.09; col *= 0.9+0.1*sin(uv.y*uRes.y*0.7);
          gl_FragColor=vec4(col,1.0); return;
        }
        if(uMode==3){ // ASCII
          float cs=8.0; vec2 cell=(floor(gl_FragCoord.xy/cs)*cs+cs*0.5)/uRes;
          vec3 src=texture2D(tDiffuse,cell).rgb; float l=lum(src);
          float col=floor(l*(uCols-1.0));
          vec2 local=fract(gl_FragCoord.xy/cs);
          float g=texture2D(uAscii, vec2((col+local.x)/uCols, local.y)).r;
          gl_FragColor=vec4(src*g*1.5,1.0); return;
        }
        if(uMode==4){ // GAMEBOY
          float cs=4.0; vec2 cell=(floor(gl_FragCoord.xy/cs)*cs+cs*0.5)/uRes;
          float l=lumAt(cell);
          vec3 g0=vec3(0.06,0.22,0.06),g1=vec3(0.19,0.38,0.11),g2=vec3(0.55,0.67,0.06),g3=vec3(0.67,0.79,0.10);
          vec3 col = l<0.25?g0 : (l<0.5?g1 : (l<0.75?g2 : g3));
          gl_FragColor=vec4(col,1.0); return;
        }
        // uMode==5 WIREFRAME (edge detect)
        vec2 px=1.0/uRes;
        float gx = lumAt(vUv+vec2(-px.x,-px.y))+2.0*lumAt(vUv+vec2(-px.x,0.0))+lumAt(vUv+vec2(-px.x,px.y))
                 - lumAt(vUv+vec2(px.x,-px.y))-2.0*lumAt(vUv+vec2(px.x,0.0))-lumAt(vUv+vec2(px.x,px.y));
        float gy = lumAt(vUv+vec2(-px.x,-px.y))+2.0*lumAt(vUv+vec2(0.0,-px.y))+lumAt(vUv+vec2(px.x,-px.y))
                 - lumAt(vUv+vec2(-px.x,px.y))-2.0*lumAt(vUv+vec2(0.0,px.y))-lumAt(vUv+vec2(px.x,px.y));
        float e=clamp(sqrt(gx*gx+gy*gy)*1.6,0.0,1.0);
        gl_FragColor=vec4(mix(vec3(0.01,0.02,0.03), vec3(0.0,1.0,0.9), e),1.0);
      }`,
  };
  const pass = new ShaderPass(shader);
  pass.uniforms = pass.material.uniforms; // convenience
  return {
    pass,
    setMode(id) { const i = Math.max(0, FX_MODES.indexOf(id)); pass.material.uniforms.uMode.value = i; },
    resize(w, h) { pass.material.uniforms.uRes.value.set(w, h); },
    update(dt) { pass.material.uniforms.uTime.value += dt; },
  };
}
