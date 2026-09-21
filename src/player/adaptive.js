// Dynamic resolution — keeps the frame-rate smooth on weaker GPUs.
//
// Attach once after a world's renderer is created. It runs its own lightweight
// rAF monitor (independent of the world's render loop), samples the real frame
// interval, and scales the renderer's pixel ratio down when the frame-rate sags
// (to as low as 0.6x) and back up when it recovers. The scene, shadows and
// effects stay exactly as they were — only the pixel count flexes — so it's
// invisible on machines that keep up and stops weaker ones from chugging.
//
//   attachAdaptiveResolution(renderer, isMobile ? 1.5 : 2);
//
// `applyExtra(dpr)` is optional — pass it when a world also has an EffectComposer
// or FX pass whose size must track the renderer (see the festival).
export function attachAdaptiveResolution(renderer, maxDPR = 2, applyExtra = null) {
  const baseDPR = Math.min(devicePixelRatio || 1, maxDPR);
  const canvas = renderer.domElement;
  let scale = 1, accum = 0, frames = 0, cooldown = 1000, last = performance.now();

  const width = () => canvas.clientWidth || innerWidth;
  const height = () => canvas.clientHeight || innerHeight;
  function apply() {
    const dpr = baseDPR * scale;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width(), height(), false);   // backing store only; keep CSS size
    if (applyExtra) applyExtra(dpr);
  }

  function tick(now) {
    requestAnimationFrame(tick);
    const dt = now - last; last = now;
    if (document.hidden || dt > 500) return;       // ignore tab-switch / stall gaps
    if (cooldown > 0) { cooldown -= dt; return; }
    accum += dt; frames++;
    if (accum < 750) return;                        // average ~0.75s of frames
    const fps = (frames * 1000) / accum; accum = 0; frames = 0;
    let next = scale;
    if (fps < 45 && scale > 0.6) next = Math.max(0.6, scale - 0.15);
    else if (fps > 58 && scale < 1) next = Math.min(1, scale + 0.1);
    if (next !== scale) { scale = next; apply(); cooldown = 500; }
  }

  // a world's own resize resets the pixel ratio to base — re-apply our scale just
  // after, and hold off sampling briefly so the resize frame isn't counted.
  addEventListener('resize', () => { cooldown = Math.max(cooldown, 300); requestAnimationFrame(apply); });
  requestAnimationFrame(tick);
  return { get scale() { return scale; } };
}
