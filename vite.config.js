import { defineConfig } from 'vite';
import { resolve } from 'path';

// base: './' keeps asset URLs relative so the build can be hosted from any
// sub-path (e.g. doesntmatter.us/experience/) or dropped into the web-OS.
// Each destination "world" is its own lightweight page so we never hold them
// all in memory at once — add new worlds to `input` as we build them.
export default defineConfig({
  base: './',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        codex: resolve(__dirname, 'codex.html'),
        driftwave: resolve(__dirname, 'driftwave.html'),
        sofaboi: resolve(__dirname, 'sofaboi.html'),
        ravecharles: resolve(__dirname, 'ravecharles.html'),
        studio: resolve(__dirname, 'studio.html'),
        tanky: resolve(__dirname, 'tanky.html'),
        shmorez: resolve(__dirname, 'shmorez.html'),
        arcade: resolve(__dirname, 'arcade.html'),
        bullethell: resolve(__dirname, 'bullethell.html'),
        lab: resolve(__dirname, 'lab.html'),
        tv: resolve(__dirname, 'tv.html'),
        dj: resolve(__dirname, 'dj.html'),
        warehouse: resolve(__dirname, 'warehouse.html'),
        lofi: resolve(__dirname, 'lofi.html'),
        horrorcore: resolve(__dirname, 'horrorcore.html'),
        abstract: resolve(__dirname, 'abstract.html'),
        rooftop: resolve(__dirname, 'rooftop.html'),
        builder: resolve(__dirname, 'builder.html'),
        hidden: resolve(__dirname, 'hidden.html'),
      },
    },
  },
});
