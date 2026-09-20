/**
 * Trippy Sparkle Effects
 *
 * This module creates interactive sparkle effects that follow
 * mouse movements and can be attached to elements.
 */

class SparkleEffect {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.width = 0;
    this.height = 0;
    this.sparkles = [];
    this.maxSparkles = 100;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseSparklesEnabled = true;
    this.animationId = null;
    this.initialized = false;
    this.lastMouseMoveTime = 0;
    this.sparkleElements = [];

    // Settings
    this.settings = {
      baseSize: 3,
      sizeVariation: 2,
      colors: [
        '#FF00FF', // Magenta
        '#00FFFF', // Cyan
        '#FFFF00', // Yellow
        '#98E600', // Neon green
        '#B14AED', // Purple
        '#FFFFFF'  // White
      ],
      lifetime: { min: 1000, max: 3000 }, // milliseconds
      speed: { min: 1, max: 3 },
      fadeSpeed: 0.02,
      pulsate: true,
      trail: true,
      trailFade: 0.2,
      mouseSparkleRate: 0.3, // Probability of generating sparkle on mouse move
      elementSparkleRate: 0.05 // Probability of generating sparkle on elements
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
      this.initialize();
    });
  }

  initialize() {
    if (this.initialized) return;

    this.createCanvas();
    this.setupEventListeners();
    this.findSparkleElements();

    this.initialized = true;
    this.animate();
  }

  createCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'sparkle-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '10000';

    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Track mouse movement for sparkles
    document.addEventListener('mousemove', (e) => {
      const now = performance.now();
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;

      // Create sparkles on mouse move with rate limiting
      if (this.mouseSparklesEnabled && now - this.lastMouseMoveTime > 50) {
        this.lastMouseMoveTime = now;
        this.createMouseSparkles();
      }
    });

    // Create sparkles on click
    document.addEventListener('click', (e) => {
      // Create a burst of sparkles on click
      this.createSparklesBurst(e.clientX, e.clientY, 20);
    });

    // MutationObserver to watch for new elements with sparkle class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          this.findSparkleElements();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  findSparkleElements() {
    // Find all elements with 'sparkle' class
    const elements = document.querySelectorAll('.sparkle');
    this.sparkleElements = Array.from(elements);
  }

  createMouseSparkles() {
    // Create sparkles along mouse movement
    if (Math.random() < this.settings.mouseSparkleRate) {
      this.createSparkle(
        this.mouseX + (Math.random() - 0.5) * 20,
        this.mouseY + (Math.random() - 0.5) * 20
      );
    }
  }

  createSparklesBurst(x, y, count) {
    // Create a burst of sparkles at a specific position
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        this.createSparkle(
          x + (Math.random() - 0.5) * 40,
          y + (Math.random() - 0.5) * 40,
          {
            // Override with burst-specific properties
            speed: {
              min: 2,
              max: 5
            }
          }
        );
      }, i * 10); // Stagger creation for more natural effect
    }
  }

  createSparkle(x, y, overrideSettings = {}) {
    // Combine default settings with any overrides
    const settings = { ...this.settings, ...overrideSettings };

    // Create new sparkle
    const sparkle = {
      x,
      y,
      size: settings.baseSize + Math.random() * settings.sizeVariation,
      color: settings.colors[Math.floor(Math.random() * settings.colors.length)],
      alpha: 1,
      direction: Math.random() * Math.PI * 2,
      speed: settings.speed.min + Math.random() * (settings.speed.max - settings.speed.min),
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.1,
      lifetime: settings.lifetime.min + Math.random() * (settings.lifetime.max - settings.lifetime.min),
      createdAt: performance.now(),
      trail: []
    };

    this.sparkles.push(sparkle);

    // Remove oldest sparkles if we exceed the maximum
    while (this.sparkles.length > this.maxSparkles) {
      this.sparkles.shift();
    }
  }

  createElementSparkles() {
    // Generate sparkles on elements with 'sparkle' class
    this.sparkleElements.forEach(element => {
      if (Math.random() < this.settings.elementSparkleRate) {
        const rect = element.getBoundingClientRect();

        // Generate sparkle at random position on element
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + Math.random() * rect.height;

        this.createSparkle(x, y);
      }
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Set blend mode for brighter colors
    this.ctx.globalCompositeOperation = 'lighter';

    // Create sparkles on elements
    this.createElementSparkles();

    // Update and draw sparkles
    const currentTime = performance.now();

    this.sparkles = this.sparkles.filter(sparkle => {
      // Check if sparkle has expired
      const age = currentTime - sparkle.createdAt;
      if (age > sparkle.lifetime) {
        return false;
      }

      // Update position
      sparkle.x += Math.cos(sparkle.direction) * sparkle.speed;
      sparkle.y += Math.sin(sparkle.direction) * sparkle.speed;

      // Add slight gravity
      sparkle.direction += 0.01;

      // Update rotation
      sparkle.rotation += sparkle.rotationSpeed;

      // Update alpha based on lifetime
      const lifePercent = age / sparkle.lifetime;
      sparkle.alpha = lifePercent < 0.5 ? 1 : 1 - (lifePercent - 0.5) * 2;

      // Pulsate size
      const pulseFactor = this.settings.pulsate ?
        0.8 + 0.4 * Math.sin(age * 0.01) : 1;

      // Add to trail if enabled
      if (this.settings.trail && age % 5 === 0) {
        sparkle.trail.push({
          x: sparkle.x,
          y: sparkle.y,
          alpha: 0.7
        });

        // Limit trail length
        if (sparkle.trail.length > 5) {
          sparkle.trail.shift();
        }
      }

      // Draw trail
      if (this.settings.trail) {
        this.ctx.strokeStyle = sparkle.color;
        if (sparkle.trail.length > 1) {
          this.ctx.beginPath();
          this.ctx.moveTo(sparkle.trail[0].x, sparkle.trail[0].y);

          for (let i = 1; i < sparkle.trail.length; i++) {
            const point = sparkle.trail[i];
            this.ctx.lineTo(point.x, point.y);
            point.alpha -= this.settings.trailFade;
          }

          this.ctx.globalAlpha = sparkle.alpha * 0.5;
          this.ctx.stroke();
        }
      }

      // Draw sparkle as a little star shape
      this.ctx.globalAlpha = sparkle.alpha;
      this.ctx.fillStyle = sparkle.color;
      this.ctx.strokeStyle = sparkle.color;

      this.ctx.save();
      this.ctx.translate(sparkle.x, sparkle.y);
      this.ctx.rotate(sparkle.rotation);
      this.ctx.scale(pulseFactor, pulseFactor);

      // Draw a star shape
      const size = sparkle.size;
      const spikes = 4;
      const outerRadius = size;
      const innerRadius = size / 2;

      this.ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.fill();

      // Add glow effect
      this.ctx.shadowBlur = size * 2;
      this.ctx.shadowColor = sparkle.color;
      this.ctx.fill();

      this.ctx.restore();
      this.ctx.globalAlpha = 1.0;
      this.ctx.shadowBlur = 0;

      return true; // Keep sparkle in array
    });
  }

  toggleMouseSparkles(enabled) {
    this.mouseSparklesEnabled = enabled;
  }

  setMaxSparkles(count) {
    this.maxSparkles = count;
  }

  burstSparklesAt(x, y, count = 10) {
    this.createSparklesBurst(x, y, count);
  }
}

// Initialize sparkle effect
const sparkleEffect = new SparkleEffect();

// Export for use in other scripts
window.sparkleEffect = sparkleEffect;