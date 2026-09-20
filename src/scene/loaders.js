import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

// One shared GLTF loader with Draco attached, instead of each model module
// building its own identical pair. Six files used to repeat this setup, so the
// decoder path had to be changed in six places — and a page importing several
// of them could end up with several Draco decoder worker pools.
//
// Decoder files live in public/draco/gltf/. The path is relative (no leading
// slash) so it still resolves when the site is served from a sub-path, which
// it is on GitHub Pages (/Site/).
const draco = new DRACOLoader();
draco.setDecoderPath('draco/gltf/');

export const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(draco);

export { draco as dracoLoader };
