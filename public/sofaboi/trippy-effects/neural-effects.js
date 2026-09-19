/**
 * Neural Network-Inspired Visual Effects
 *
 * This module creates advanced visual effects inspired by neural networks
 * like DeepDream, style transfer, and other AI-generated visuals.
 */

class NeuralEffectsController {
  constructor() {
    this.activeEffects = new Map();

    // Initialize on document load
    document.addEventListener('DOMContentLoaded', () => {
      this.setupEffects();
    });
  }

  setupEffects() {
    // Find all elements with neural effect classes
    const dreamElements = document.querySelectorAll('.neural-dream');
    const glitchElements = document.querySelectorAll('.neural-glitch');
    const styleElements = document.querySelectorAll('.neural-style');

    // Setup each effect type
    dreamElements.forEach(el => this.setupDreamEffect(el));
    glitchElements.forEach(el => this.setupGlitchEffect(el));
    styleElements.forEach(el => this.setupStyleEffect(el));
  }

  /**
   * DeepDream-like effect that creates hallucination-like patterns
   */
  setupDreamEffect(element) {
    // Make sure the element is positioned for overlay
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.classList.add('dream-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.mixBlendMode = 'overlay';
    canvas.style.zIndex = '2';

    element.appendChild(canvas);

    // Get the source element (image or video)
    let sourceElement;
    if (element.tagName === 'IMG') {
      sourceElement = element;
    } else {
      sourceElement = element.querySelector('img, video');
    }

    if (!sourceElement) {
      console.warn('No source image or video found for dream effect');
      return;
    }

    // Initialize canvas context
    const ctx = canvas.getContext('2d');

    // Store effect data
    const effectData = {
      element,
      canvas,
      ctx,
      sourceElement,
      startTime: performance.now(),
      patterns: this.generateDreamPatterns()
    };

    this.activeEffects.set(element, effectData);

    // Setup resize handling
    this.resizeCanvas(effectData);
    window.addEventListener('resize', () => this.resizeCanvas(effectData));

    // Start animation
    this.animateDreamEffect(effectData);
  }

  /**
   * Generate dream-like fractal patterns
   */
  generateDreamPatterns() {
    const patterns = [];
    const patternCount = 5;

    for (let i = 0; i < patternCount; i++) {
      // Random pattern properties
      const scale = 0.5 + Math.random() * 2.0;
      const rotation = Math.random() * Math.PI * 2;
      const color = this.getRandomPsychedelicColor();
      const complexity = 3 + Math.floor(Math.random() * 5);
      const animSpeed = 0.2 + Math.random() * 0.5;

      patterns.push({
        scale,
        rotation,
        color,
        complexity,
        animSpeed
      });
    }

    return patterns;
  }

  /**
   * Draw fractal patterns for dream effect
   */
  drawDreamFractal(ctx, pattern, time, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;

    // Save context state
    ctx.save();

    // Move to center and apply rotation
    ctx.translate(centerX, centerY);
    ctx.rotate(pattern.rotation + time * pattern.animSpeed);
    ctx.scale(pattern.scale, pattern.scale);

    // Set drawing style
    ctx.strokeStyle = pattern.color;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.3;

    // Calculate fractal properties based on time
    const timeScale = Math.sin(time * 0.2) * 0.5 + 0.5;
    const iterations = pattern.complexity;
    const size = 100 * (0.5 + timeScale * 0.5);

    // Draw the fractal
    this.drawRecursivePattern(ctx, 0, 0, size, iterations);

    // Restore context
    ctx.restore();
  }

  /**
   * Recursive pattern drawing function
   */
  drawRecursivePattern(ctx, x, y, size, iterations) {
    if (iterations <= 0) return;

    // Draw a simple shape at current position
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.stroke();

    // Calculate positions for sub-patterns
    const newSize = size * 0.5;
    const offset = size * 0.6;

    // Recursively draw sub-patterns
    const angleStep = Math.PI * 2 / 5;
    for (let i = 0; i < 5; i++) {
      const angle = i * angleStep;
      const newX = x + Math.cos(angle) * offset;
      const newY = y + Math.sin(angle) * offset;

      this.drawRecursivePattern(ctx, newX, newY, newSize, iterations - 1);
    }
  }

  /**
   * Neural glitch effect that simulates corrupted neural network output
   */
  setupGlitchEffect(element) {
    // Make sure the element is positioned for overlay
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.classList.add('glitch-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';

    element.appendChild(canvas);

    // Get the source element (image or video)
    let sourceElement;
    if (element.tagName === 'IMG') {
      sourceElement = element;
    } else {
      sourceElement = element.querySelector('img, video');
    }

    if (!sourceElement) {
      console.warn('No source image or video found for glitch effect');
      return;
    }

    // Initialize canvas context
    const ctx = canvas.getContext('2d');

    // Store effect data
    const effectData = {
      element,
      canvas,
      ctx,
      sourceElement,
      startTime: performance.now(),
      glitchParams: {
        sliceCount: 10,
        maxOffset: 20,
        glitchProbability: 0.1,
        colorShiftStrength: 0.1
      }
    };

    this.activeEffects.set(element, effectData);

    // Setup resize handling
    this.resizeCanvas(effectData);
    window.addEventListener('resize', () => this.resizeCanvas(effectData));

    // Start animation
    this.animateGlitchEffect(effectData);
  }

  /**
   * Style transfer effect that simulates artistic style transfer
   */
  setupStyleEffect(element) {
    // Get style type from data attribute (default is 'psychedelic')
    const styleType = element.dataset.styleType || 'psychedelic';

    // Make sure the element is positioned for overlay
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative';
    }

    // Create canvas overlay
    const canvas = document.createElement('canvas');
    canvas.classList.add('style-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '2';

    element.appendChild(canvas);

    // Get the source element (image or video)
    let sourceElement;
    if (element.tagName === 'IMG') {
      sourceElement = element;
    } else {
      sourceElement = element.querySelector('img, video');
    }

    if (!sourceElement) {
      console.warn('No source image or video found for style effect');
      return;
    }

    // Initialize canvas context
    const ctx = canvas.getContext('2d');

    // Store effect data
    const effectData = {
      element,
      canvas,
      ctx,
      sourceElement,
      startTime: performance.now(),
      styleType,
      styleParams: this.getStyleParams(styleType)
    };

    this.activeEffects.set(element, effectData);

    // Setup resize handling
    this.resizeCanvas(effectData);
    window.addEventListener('resize', () => this.resizeCanvas(effectData));

    // Start animation
    this.animateStyleEffect(effectData);
  }

  /**
   * Get style parameters based on style type
   */
  getStyleParams(styleType) {
    switch (styleType) {
      case 'psychedelic':
        return {
          colorShift: 0.2,
          patternScale: 30,
          waveIntensity: 0.1,
          oscillationSpeed: 0.5,
          vividness: 1.5
        };
      case 'glitchArt':
        return {
          colorShift: 0.3,
          glitchStrength: 0.15,
          scanlines: true,
          noiseLevel: 0.1,
          rgbShiftAmount: 2
        };
      case 'vaporwave':
        return {
          colorShift: 0.5,
          gridSize: 20,
          hueRotation: 0.8,
          saturationBoost: 1.5,
          scanlines: true
        };
      default:
        return {
          colorShift: 0.2,
          patternScale: 30,
          waveIntensity: 0.1,
          oscillationSpeed: 0.5,
          vividness: 1.5
        };
    }
  }

  /**
   * Animation loop for dream effect
   */
  animateDreamEffect(effectData) {
    const { ctx, canvas, sourceElement, patterns, startTime } = effectData;
    const currentTime = (performance.now() - startTime) / 1000.0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw source image/video
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 0.2;
    ctx.drawImage(sourceElement, 0, 0, canvas.width, canvas.height);

    // Draw dream patterns
    ctx.globalCompositeOperation = 'screen';
    patterns.forEach(pattern => {
      this.drawDreamFractal(ctx, pattern, currentTime, canvas.width, canvas.height);
    });

    // Continue animation
    requestAnimationFrame(() => this.animateDreamEffect(effectData));
  }

  /**
   * Animation loop for glitch effect
   */
  animateGlitchEffect(effectData) {
    const { ctx, canvas, sourceElement, glitchParams, startTime } = effectData;
    const currentTime = (performance.now() - startTime) / 1000.0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Determine if we should glitch this frame
    const shouldGlitch = Math.random() < glitchParams.glitchProbability;

    if (shouldGlitch) {
      // Draw source to canvas first so we can manipulate it
      ctx.drawImage(sourceElement, 0, 0, canvas.width, canvas.height);

      // Get image data to manipulate
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Apply horizontal slices with random offsets
      const sliceHeight = Math.floor(canvas.height / glitchParams.sliceCount);
      for (let i = 0; i < glitchParams.sliceCount; i++) {
        if (Math.random() < 0.5) {
          const y = i * sliceHeight;
          const offset = Math.floor((Math.random() - 0.5) * glitchParams.maxOffset);

          // Create temporary canvas for the slice
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = canvas.width;
          tempCanvas.height = sliceHeight;
          const tempCtx = tempCanvas.getContext('2d');

          // Copy slice to temp canvas
          tempCtx.drawImage(
            canvas,
            0, y, canvas.width, sliceHeight,
            0, 0, canvas.width, sliceHeight
          );

          // Clear original slice
          ctx.clearRect(0, y, canvas.width, sliceHeight);

          // Draw slice back with offset
          ctx.drawImage(
            tempCanvas,
            offset, y, canvas.width, sliceHeight
          );
        }
      }

      // Apply RGB shift
      if (Math.random() < 0.3) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // Draw original image
        tempCtx.drawImage(canvas, 0, 0);

        // Draw shifted red channel
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = '#FF0000';
        ctx.globalAlpha = 0.4;
        const redOffset = Math.floor((Math.random() - 0.5) * 10);
        ctx.drawImage(tempCanvas, redOffset, 0);

        // Draw shifted blue channel
        ctx.fillStyle = '#0000FF';
        ctx.globalAlpha = 0.4;
        const blueOffset = Math.floor((Math.random() - 0.5) * 10);
        ctx.drawImage(tempCanvas, blueOffset, 0);

        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
      }
    } else {
      // Draw source with slight offset for continuous subtle effect
      const subtleOffset = Math.sin(currentTime * 5) * 2;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(sourceElement, subtleOffset, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.2;
      ctx.drawImage(sourceElement, -subtleOffset, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1.0;
    }

    // Continue animation
    requestAnimationFrame(() => this.animateGlitchEffect(effectData));
  }

  /**
   * Animation loop for style transfer effect
   */
  animateStyleEffect(effectData) {
    const { ctx, canvas, sourceElement, styleType, styleParams, startTime } = effectData;
    const currentTime = (performance.now() - startTime) / 1000.0;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Process based on style type
    switch (styleType) {
      case 'psychedelic':
        this.applyPsychedelicEffect(ctx, canvas, currentTime, styleParams);
        break;
      case 'glitchArt':
        this.applyGlitchArtEffect(ctx, canvas, currentTime, styleParams);
        break;
      case 'vaporwave':
        this.applyVaporwaveEffect(ctx, canvas, currentTime, styleParams);
        break;
      default:
        this.applyPsychedelicEffect(ctx, canvas, currentTime, styleParams);
    }

    // Continue animation
    requestAnimationFrame(() => this.animateStyleEffect(effectData));
  }

  /**
   * Apply psychedelic style effect
   */
  applyPsychedelicEffect(ctx, canvas, time, params) {
    const { colorShift, patternScale, waveIntensity, oscillationSpeed } = params;

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply wave distortion and color shift
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const index = (y * canvas.width + x) * 4;

        // Wave distortion
        const waveX = Math.sin(y / patternScale + time * oscillationSpeed) * waveIntensity * canvas.width;
        const waveY = Math.cos(x / patternScale + time * oscillationSpeed) * waveIntensity * canvas.height;

        const sourceX = Math.floor(x + waveX);
        const sourceY = Math.floor(y + waveY);

        if (sourceX >= 0 && sourceX < canvas.width && sourceY >= 0 && sourceY < canvas.height) {
          const sourceIndex = (sourceY * canvas.width + sourceX) * 4;

          // Color shift effect
          const r = data[sourceIndex];
          const g = data[sourceIndex + 1];
          const b = data[sourceIndex + 2];

          // Apply psychedelic color transform
          data[index] = r + g * colorShift * Math.sin(time);
          data[index + 1] = g + b * colorShift * Math.cos(time);
          data[index + 2] = b + r * colorShift * Math.sin(time * 0.7);
        }
      }
    }

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);

    // Add color overlay
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = 0.2 + Math.sin(time * 0.5) * 0.1;

    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 0,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );

    // Cycling colors
    const hue1 = (time * 20) % 360;
    const hue2 = (hue1 + 60) % 360;
    const hue3 = (hue1 + 180) % 360;

    gradient.addColorStop(0, `hsla(${hue1}, 100%, 50%, 0.4)`);
    gradient.addColorStop(0.5, `hsla(${hue2}, 100%, 60%, 0.2)`);
    gradient.addColorStop(1, `hsla(${hue3}, 100%, 50%, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
  }

  /**
   * Apply glitch art style effect
   */
  applyGlitchArtEffect(ctx, canvas, time, params) {
    const { colorShift, glitchStrength, scanlines, noiseLevel, rgbShiftAmount } = params;

    // RGB shift effect
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');

    // Copy original image
    tempCtx.drawImage(canvas, 0, 0);

    // Draw with RGB channel shift
    ctx.globalCompositeOperation = 'lighten';

    // Red channel
    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.globalAlpha = 0.5;
    const redShift = Math.sin(time * 2) * rgbShiftAmount;
    ctx.drawImage(tempCanvas, redShift, 0);

    // Green channel
    ctx.fillStyle = 'rgba(0,255,0,1)';
    ctx.globalAlpha = 0.5;
    ctx.drawImage(tempCanvas, 0, 0);

    // Blue channel
    ctx.fillStyle = 'rgba(0,0,255,1)';
    ctx.globalAlpha = 0.5;
    const blueShift = Math.cos(time * 2) * rgbShiftAmount;
    ctx.drawImage(tempCanvas, blueShift, 0);

    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';

    // Random glitch blocks
    if (Math.random() < 0.1) {
      const blockCount = Math.floor(Math.random() * 5) + 3;
      for (let i = 0; i < blockCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 100 + 20;
        const height = Math.random() * 50 + 10;

        // Copy from a random position
        const srcX = Math.random() * canvas.width;
        const srcY = Math.random() * canvas.height;

        ctx.drawImage(canvas,
          srcX, srcY, width, height,
          x, y, width, height
        );
      }
    }

    // Add noise
    if (noiseLevel > 0) {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < noiseLevel * 0.1) {
          const noise = Math.random() * 255;
          data[i] = noise;     // r
          data[i + 1] = noise; // g
          data[i + 2] = noise; // b
        }
      }

      ctx.putImageData(imageData, 0, 0);
    }

    // Add scanlines
    if (scanlines) {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#000000';
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.fillRect(0, y, canvas.width, 1);
      }
      ctx.globalAlpha = 1.0;
    }
  }

  /**
   * Apply vaporwave style effect
   */
  applyVaporwaveEffect(ctx, canvas, time, params) {
    const { colorShift, gridSize, hueRotation, saturationBoost, scanlines } = params;

    // Get image data for color processing
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Adjust colors for vaporwave aesthetic
    for (let i = 0; i < data.length; i += 4) {
      // Convert RGB to HSL
      const r = data[i] / 255;
      const g = data[i + 1] / 255;
      const b = data[i + 2] / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0; // achromatic
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
      }

      // Modify HSL
      h = (h + hueRotation) % 1; // Hue shift
      s = Math.min(1, s * saturationBoost); // Boost saturation

      // Convert back to RGB
      let r1, g1, b1;

      if (s === 0) {
        r1 = g1 = b1 = l; // achromatic
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r1 = hue2rgb(p, q, h + 1/3);
        g1 = hue2rgb(p, q, h);
        b1 = hue2rgb(p, q, h - 1/3);
      }

      // Set the new values
      data[i] = Math.round(r1 * 255);
      data[i + 1] = Math.round(g1 * 255);
      data[i + 2] = Math.round(b1 * 255);
    }

    // Put the modified image data back
    ctx.putImageData(imageData, 0, 0);

    // Draw grid overlay
    if (gridSize > 0) {
      ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      ctx.stroke();
    }

    // Add sun/gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, 'rgba(255, 105, 180, 0.3)');
    gradient.addColorStop(1, 'rgba(64, 224, 208, 0.3)');

    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add scanlines
    if (scanlines) {
      ctx.globalAlpha = 0.1;
      ctx.fillStyle = '#000000';
      for (let y = 0; y < canvas.height; y += 2) {
        ctx.fillRect(0, y, canvas.width, 1);
      }
      ctx.globalAlpha = 1.0;
    }

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Resize canvas to match element dimensions
   */
  resizeCanvas(effectData) {
    const { canvas, element } = effectData;

    // Get the device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;

    // Set the canvas size with the device pixel ratio taken into account
    canvas.width = element.offsetWidth * pixelRatio;
    canvas.height = element.offsetHeight * pixelRatio;

    // Scale the context to counter the device pixel ratio
    const ctx = canvas.getContext('2d');
    ctx.scale(pixelRatio, pixelRatio);
  }

  /**
   * Generate a random psychedelic color
   */
  getRandomPsychedelicColor() {
    const hue = Math.random() * 360;
    return `hsl(${hue}, 100%, 50%)`;
  }
}

// Initialize the controller
const neuralEffects = new NeuralEffectsController();

// Export for use in other scripts
window.neuralEffects = neuralEffects;