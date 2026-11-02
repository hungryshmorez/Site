import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { makeRng } from './seed.js';

// Row-aligned, camera-wrapped crops. One draw per plant type, with matching AO geometry.
export function createFieldDetail({ seed, spacing, cropName, cropColor, soilColor, height, isMobile }) {
    const group = new THREE.Group(), rand = makeRng(seed, 1401);
    const rows = isMobile ? 28 : 48, area = rows * spacing;
    const cam = { value: new THREE.Vector3() }, time = { value: 0 };
    const meshes = [];
    const wheat = cropName === 'wheat', lavender = cropName === 'lavender';
    function instances(base, count, color, plants) {
        const geo = new THREE.InstancedBufferGeometry();
        geo.index = base.index;
        for (const key in base.attributes) geo.setAttribute(key, base.attributes[key]);
        const offsets = new Float32Array(count * 4), variations = new Float32Array(count * 4);
        for (let i = 0; i < count; i++) {
            const row = i % rows;
            offsets.set([(row - rows / 2 + (plants ? 0.5 : 0.0)) * spacing + rand.range(-0.16, 0.16) * spacing,
                rand.range(-area / 2, area / 2), rand.range(0, Math.PI * 2), rand.range(0.7, 1.25)], i * 4);
            variations.set([rand(), rand(), rand(), rand()], i * 4);
        }
        geo.setAttribute('fOffset', new THREE.InstancedBufferAttribute(offsets, 4));
        geo.setAttribute('fVar', new THREE.InstancedBufferAttribute(variations, 4));
        geo.instanceCount = count;
        const uniforms = { fCam: cam, fTime: time };
        const inject = sh => {
            Object.assign(sh.uniforms, uniforms);
            sh.vertexShader =                 'attribute vec4 fOffset, fVar; uniform vec3 fCam; uniform float fTime; varying float fShade;\n' + sh.vertexShader;
            sh.vertexShader = sh.vertexShader.replace('#include <beginnormal_vertex>', 'float a = fOffset.z; mat3 turn = mat3(cos(a),0.,-sin(a), 0.,1.,0., sin(a),0.,cos(a));\n' +
                '#include <beginnormal_vertex>\nobjectNormal = turn * objectNormal;');
            sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', 'vec2 wp = fOffset.xy + floor((fCam.xz - fOffset.xy) / ' + area.toFixed(5) + ' + 0.5) * ' + area.toFixed(5) + ';\n' +
                'float fade = 1.0 - smoothstep(' + (area * 0.3).toFixed(5) + ',' + (area * 0.48).toFixed(5) + ',length(wp-fCam.xz));\n' +
                'vec3 transformed = turn * (position * fOffset.w * fade);\n' +
                (plants ? 'float wind = sin(fTime*1.5 + wp.x*0.32 + wp.y*0.23) + 0.35*sin(fTime*2.8+wp.y*1.7+fVar.x*6.28); transformed.xz += vec2(0.11,0.055)*wind*pow(max(position.y,0.0),2.0)*fade;\n' : '') +
                'transformed += vec3(wp.x,' + (plants ? height * 0.32 : 0.005).toFixed(5) + ',wp.y);\n' +
                'fShade = (0.72 + fVar.z*0.48)' + (plants ? ' * mix(0.48,1.12,clamp(position.y/' + Math.max(height, 0.1).toFixed(5) + ',0.0,1.0))' : '') + ';');
        };
        const mat = new THREE.MeshStandardMaterial({ color, roughness: plants ? 0.75 : 1, side: THREE.DoubleSide });
        mat.onBeforeCompile = sh => {
            inject(sh);
            sh.fragmentShader = 'varying float fShade;\n' + sh.fragmentShader;
            sh.fragmentShader = sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.rgb *= fShade;');
        };
        const ao = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
        ao.onBeforeCompile = inject;
        mat.customProgramCacheKey = ao.customProgramCacheKey = () => 'field-detail-' + cropName + plants + area;
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.aoMaterial = ao;
        mesh.frustumCulled = false;
        mesh.receiveShadow = true;
        group.add(mesh); meshes.push({ geo, mat, ao });
    }
    if (cropName !== 'plowed') {
        const parts = [];
        const h = wheat ? 0.9 : lavender ? 0.58 : cropName === 'sprouts' ? 0.17 : 0.38;
        const stem = new THREE.CylinderGeometry(0.004, 0.009, h, 3); stem.translate(0,h/2,0); parts.push(stem);
        // Curved broad leaves, tapered from root to pointed tip; no texture cards.
        for (let l = 0; l < (wheat ? 3 : 6); l++) {
            const angle = l * 2.39996, length = (wheat ? 0.24 : h * 0.9), width = wheat ? 0.018 : h * 0.25;
            const p = [], idx = [], segments = 4;
            for (let j = 0; j <= segments; j++) {
                const t = j/segments, w = Math.sin(Math.PI*t)*width;
                for (const s of [-1,1]) p.push(Math.cos(angle)*t*length - Math.sin(angle)*s*w,
 h*(wheat ? 0.15+l*0.17 : 0.12) + Math.sin(t*2.1)*length*0.65,
 Math.sin(angle)*t*length + Math.cos(angle)*s*w);
                if(j < segments) { const k=j*2; idx.push(k,k+1,k+2,k+1,k+3,k+2); }
            }
            const leaf = new THREE.BufferGeometry(); leaf.setAttribute('position',new THREE.Float32BufferAttribute(p,3)); leaf.setIndex(idx); leaf.computeVertexNormals(); parts.push(leaf);
        }
        if (wheat || lavender) {
            for(let k=0;k<5;k++) {
                const head = new THREE.OctahedronGeometry(wheat ? 0.035 : 0.028);
                head.scale(1,wheat ? 1.7 : 1.1,1);
                head.translate(Math.sin(k*2.4)*0.018,h+k*0.027,Math.cos(k*2.4)*0.018); parts.push(head);
            }
        }
        // Strip UVs to allow leaf and primitive geometry to merge.
        parts.forEach(g => g.deleteAttribute('uv'));
        const flat = parts.map(g => g.index ? g.toNonIndexed() : g);
        const base = mergeGeometries(flat);
        new Set([...parts, ...flat]).forEach(g=>g.dispose());
        instances(base, rows * (isMobile ? 110 : 230), cropColor, true);
    }
    const clod = new THREE.IcosahedronGeometry(cropName === 'plowed' ? 0.09 : 0.038, 0);
    clod.scale(1.4,0.65,1);
    instances(clod, isMobile ? 1200 : 3500, soilColor.clone().multiplyScalar(1.2), false);
    return { group, update(p,t) { cam.value.copy(p); time.value = t; },
        dispose() { meshes.forEach(({geo,mat,ao}) => { geo.dispose();mat.dispose();ao.dispose(); }); } };
}
