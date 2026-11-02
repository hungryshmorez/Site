import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';

// Planar scene reflection plus a separate, depth-aware refraction capture.
// Only allocated by Ultra; no global screen-space effect or lower-quality changes.
export function createUltraWater({ geometry, waterY, tint, isMobile, maxDepth = 12 }) {
    const resolution = isMobile ? 512 : 1024;
    const refract = new THREE.WebGLRenderTarget(resolution, resolution, { type: THREE.HalfFloatType });
    refract.depthTexture = new THREE.DepthTexture(resolution, resolution, THREE.UnsignedIntType);
    const uniforms = {
        tDiffuse: { value: null }, color: { value: new THREE.Color(0xffffff) }, textureMatrix: { value: new THREE.Matrix4() },
        uRefraction: { value: null }, uDepth: { value: null },
        uInvProjection: { value: new THREE.Matrix4() }, uCameraWorld: { value: new THREE.Matrix4() },
        uTime: { value: 0 }, uTint: { value: tint.clone() }, uEye: { value: new THREE.Vector3() },
        uMaxDepth: { value: maxDepth },
    };
    const shader = {
        uniforms,
        vertexShader: 'uniform mat4 textureMatrix; varying vec4 vReflection, vScreen; varying vec3 vWorld;\n' +
            'void main(){ vec4 p=vec4(position,1.0); vReflection=textureMatrix*p; vWorld=(modelMatrix*p).xyz; vScreen=projectionMatrix*modelViewMatrix*p; gl_Position=vScreen; }',
        fragmentShader: 'uniform sampler2D tDiffuse,uRefraction,uDepth; uniform mat4 uInvProjection,uCameraWorld;\n' +
            'uniform float uTime,uMaxDepth; uniform vec3 uTint,uEye; varying vec4 vReflection,vScreen; varying vec3 vWorld;\n' +
            'vec3 scenePoint(vec2 uv){ float z=texture2D(uDepth,uv).x; vec4 p=uInvProjection*vec4(uv*2.0-1.0,z*2.0-1.0,1.0); return (uCameraWorld*vec4(p.xyz/p.w,1.0)).xyz; }\n' +
            'void main(){\n' +
            'vec2 p=vWorld.xz; float t=uTime;\n' +
            // Analytic height derivatives: broad rolling ripples crossed by fine capillary waves.
            'vec2 slope=vec2(0.0);\n' +
            'slope+=vec2(0.8,0.6)*cos(dot(p,vec2(0.8,0.6))*1.7-t*0.9)*0.035;\n' +
            'slope+=vec2(-0.5,0.866)*cos(dot(p,vec2(-0.5,0.866))*3.1+t*1.15)*0.026;\n' +
            'slope+=vec2(0.95,-0.31)*cos(dot(p,vec2(0.95,-0.31))*7.3-t*1.7+sin(p.y*0.6)*0.4)*0.016;\n' +
            'slope+=vec2(0.3,0.954)*cos(dot(p,vec2(0.3,0.954))*13.0+t*2.3)*0.009;\n' +
            'vec3 n=normalize(vec3(-slope.x,1.0,-slope.y)); vec3 view=normalize(uEye-vWorld);\n' +
            'float fresnel=0.0204+0.9796*pow(1.0-clamp(dot(n,view),0.0,1.0),5.0);\n' +
            'vec2 screenUV=vScreen.xy/vScreen.w*0.5+0.5; vec2 bend=slope*0.045;\n' +
            'vec2 uv=clamp(screenUV+bend,vec2(0.001),vec2(0.999)); vec3 below=scenePoint(uv);\n' +
            // Reject refraction samples on walls/objects in front of the water surface.
            'if(below.y>vWorld.y+0.04){uv=clamp(screenUV,vec2(0.001),vec2(0.999));below=scenePoint(uv); }\n' +
            'float path=clamp(length(below-vWorld),0.0,uMaxDepth);\n' +
            'vec3 transmittance=exp(-vec3(0.16,0.045,0.032)*path);\n' +
            'vec3 transmitted=texture2D(uRefraction,uv).rgb*transmittance + uTint*0.22*(1.0-transmittance);\n' +
            'vec2 ruv=clamp(vReflection.xy/vReflection.w + slope*0.018,vec2(0.001),vec2(0.999));\n' +
            'vec3 reflected=texture2D(tDiffuse,ruv).rgb;\n' +
            'gl_FragColor=vec4(mix(transmitted,reflected,fresnel),1.0);\n' +
            '#include <tonemapping_fragment>\n#include <colorspace_fragment>\n}',
    };
    const localGeo = geometry.clone().translate(0,-waterY,0).rotateX(Math.PI/2);
    const mesh = new Reflector(localGeo, { textureWidth: resolution, textureHeight: resolution, clipBias: 0.003, shader });
    // Reflector clones its shader uniforms; render-target textures must stay live references.
    mesh.material.uniforms.uRefraction.value = refract.texture;
    mesh.material.uniforms.uDepth.value = refract.depthTexture;
    mesh.rotation.x = -Math.PI/2;
    mesh.position.y = waterY;
    mesh.renderOrder = 2;
    const reflect = mesh.onBeforeRender;
    const size = new THREE.Vector2(), viewport = new THREE.Vector4();
    let capturing = false;
    mesh.onBeforeRender = (renderer, scene, camera) => {
        if(capturing || scene.overrideMaterial) return;
        capturing = true;
        const u = mesh.material.uniforms;
        u.uEye.value.setFromMatrixPosition(camera.matrixWorld);
        u.uInvProjection.value.copy(camera.projectionMatrixInverse);
        u.uCameraWorld.value.copy(camera.matrixWorld);
        renderer.getSize(size);
        const h = Math.max(1, Math.round(resolution*size.y/size.x));
        if(refract.height !== h) refract.setSize(resolution,h);
        const target = renderer.getRenderTarget(), auto = renderer.autoClear;
        const xr = renderer.xr.enabled, shadow = renderer.shadowMap.autoUpdate;
        const scissor = renderer.getScissorTest(); renderer.getViewport(viewport);
        try {
            mesh.visible = false;
            renderer.xr.enabled = false; renderer.shadowMap.autoUpdate = false;
            renderer.autoClear = true; renderer.setScissorTest(false);
            renderer.setRenderTarget(refract); renderer.clear(); renderer.render(scene,camera);
        } finally {
            mesh.visible = true; renderer.setRenderTarget(target);
            renderer.setViewport(viewport); renderer.setScissorTest(scissor);
            renderer.xr.enabled = xr; renderer.shadowMap.autoUpdate = shadow; renderer.autoClear = auto;
        }
        try { reflect.call(mesh,renderer,scene,camera); } finally { capturing = false; }
    };
    return { mesh, update(t) { mesh.material.uniforms.uTime.value=t; }, dispose() { refract.dispose(); mesh.dispose(); localGeo.dispose(); } };
}
