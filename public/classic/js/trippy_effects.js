// Trippy Visual Effects Engine
// Progressive psychedelic effects for each Dream Level (0-5)

class TrippyEffects {
    constructor() {
        this.currentLevel = 0;
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
        this.particles = [];
        this.waveOffset = 0;
        this.colorShift = 0;
        this.initialized = false;
    }
    
    init() {
        if (this.initialized) return;
        
        // Create canvas for effects overlay
        this.canvas = document.getElementById('trippyCanvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'trippyCanvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.pointerEvents = 'none';
            this.canvas.style.zIndex = '1';
            this.canvas.style.opacity = '0';
            this.canvas.style.transition = 'opacity 1s';
            document.body.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.initialized = true;
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setLevel(level) {
        this.currentLevel = Math.max(0, Math.min(5, level));
        this.updateEffects();
    }
    
    updateEffects() {
        if (!this.initialized) this.init();
        
        // Stop current animation
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Adjust canvas opacity based on level
        const opacity = this.currentLevel * 0.15; // 0 to 0.75
        this.canvas.style.opacity = opacity.toString();
        
        // Initialize particles based on level
        this.initParticles();
        
        // Start animation loop
        if (this.currentLevel > 0) {
            this.animate();
        }
    }
    
    initParticles() {
        this.particles = [];
        const particleCount = this.currentLevel * 20; // 0 to 100 particles
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                hue: Math.random() * 360,
                alpha: Math.random() * 0.5 + 0.3
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply different effects based on level
        if (this.currentLevel >= 1) this.drawWaveEffect();
        if (this.currentLevel >= 2) this.drawParticles();
        if (this.currentLevel >= 3) this.drawDistortion();
        if (this.currentLevel >= 4) this.drawKaleidoscope();
        if (this.currentLevel >= 5) this.drawRealityFracture();
        
        this.waveOffset += 0.02 * this.currentLevel;
        this.colorShift += 1;
        
        this.animationFrame = requestAnimationFrame(() => this.animate());
    }
    
    drawWaveEffect() {
        const intensity = this.currentLevel * 10;
        this.ctx.strokeStyle = `hsla(${this.colorShift % 360}, 70%, 50%, 0.1)`;
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < 5; i++) {
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 10) {
                const y = this.canvas.height / 2 + 
                    Math.sin((x + this.waveOffset * 50) * 0.02 + i) * intensity +
                    Math.sin((x + this.waveOffset * 30) * 0.01) * intensity * 0.5;
                
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx * this.currentLevel * 0.5;
            particle.y += particle.vy * this.currentLevel * 0.5;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Shift hue
            particle.hue = (particle.hue + this.currentLevel * 0.5) % 360;
            
            // Draw particle
            this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.alpha})`;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw trail
            if (this.currentLevel >= 3) {
                this.ctx.strokeStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.alpha * 0.3})`;
                this.ctx.lineWidth = particle.size * 0.5;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(particle.x - particle.vx * 5, particle.y - particle.vy * 5);
                this.ctx.stroke();
            }
        });
    }
    
    drawDistortion() {
        const gridSize = 40;
        const distortionAmount = this.currentLevel * 15;
        
        this.ctx.strokeStyle = `hsla(${this.colorShift % 360}, 60%, 50%, 0.05)`;
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            for (let y = 0; y < this.canvas.height; y += 5) {
                const distortX = x + Math.sin((y + this.waveOffset * 30) * 0.05) * distortionAmount;
                if (y === 0) {
                    this.ctx.moveTo(distortX, y);
                } else {
                    this.ctx.lineTo(distortX, y);
                }
            }
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            for (let x = 0; x < this.canvas.width; x += 5) {
                const distortY = y + Math.cos((x + this.waveOffset * 30) * 0.05) * distortionAmount;
                if (x === 0) {
                    this.ctx.moveTo(x, distortY);
                } else {
                    this.ctx.lineTo(x, distortY);
                }
            }
            this.ctx.stroke();
        }
    }
    
    drawKaleidoscope() {
        const segments = 8;
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        
        for (let i = 0; i < segments; i++) {
            this.ctx.rotate((Math.PI * 2) / segments);
            
            // Draw kaleidoscope segment
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            
            for (let angle = 0; angle < (Math.PI * 2) / segments; angle += 0.1) {
                const r = radius * (0.5 + Math.sin(angle * 3 + this.waveOffset) * 0.3);
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                this.ctx.lineTo(x, y);
            }
            
            this.ctx.closePath();
            this.ctx.strokeStyle = `hsla(${(this.colorShift + i * 45) % 360}, 80%, 50%, 0.1)`;
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Gradient fill
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
            gradient.addColorStop(0, `hsla(${(this.colorShift + i * 45) % 360}, 80%, 50%, 0.05)`);
            gradient.addColorStop(1, `hsla(${(this.colorShift + i * 45 + 180) % 360}, 80%, 50%, 0.01)`);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
    
    drawRealityFracture() {
        // Most intense effect - reality breaking apart
        const numFractures = 12;
        
        for (let i = 0; i < numFractures; i++) {
            const angle = (Math.PI * 2 * i) / numFractures + this.waveOffset;
            const length = Math.random() * this.canvas.width;
            const startX = this.canvas.width / 2;
            const startY = this.canvas.height / 2;
            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;
            
            // Draw fracture line
            const gradient = this.ctx.createLinearGradient(startX, startY, endX, endY);
            gradient.addColorStop(0, `hsla(${(this.colorShift + i * 30) % 360}, 100%, 50%, 0.2)`);
            gradient.addColorStop(1, `hsla(${(this.colorShift + i * 30) % 360}, 100%, 50%, 0)`);
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 2 + Math.sin(this.waveOffset + i) * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
            
            // Draw reality shards
            const numShards = 5;
            for (let j = 0; j < numShards; j++) {
                const progress = j / numShards;
                const shardX = startX + (endX - startX) * progress;
                const shardY = startY + (endY - startY) * progress;
                const shardSize = 10 + Math.sin(this.waveOffset + i + j) * 5;
                
                this.ctx.save();
                this.ctx.translate(shardX, shardY);
                this.ctx.rotate(this.waveOffset + i + j);
                
                this.ctx.fillStyle = `hsla(${(this.colorShift + i * 30 + j * 10) % 360}, 100%, 50%, 0.1)`;
                this.ctx.beginPath();
                this.ctx.moveTo(0, -shardSize);
                this.ctx.lineTo(shardSize * 0.5, 0);
                this.ctx.lineTo(0, shardSize);
                this.ctx.lineTo(-shardSize * 0.5, 0);
                this.ctx.closePath();
                this.ctx.fill();
                
                this.ctx.restore();
            }
        }
        
        // Recursive zoom effect
        this.ctx.save();
        this.ctx.globalAlpha = 0.02;
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        const scale = 1 + Math.sin(this.waveOffset * 0.5) * 0.02;
        this.ctx.scale(scale, scale);
        this.ctx.translate(-this.canvas.width / 2, -this.canvas.height / 2);
        this.ctx.drawImage(this.canvas, 0, 0);
        this.ctx.restore();
    }
    
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
        this.initialized = false;
    }
}

// Background Trippy Effects (applies to desktop background)
class BackgroundEffects {
    static applyLevel(level, element) {
        const backgrounds = [
            '#008080', // Level 0: Base teal
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // Level 1
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // Level 2
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // Level 3
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // Level 4
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%, #a8edea 200%)' // Level 5
        ];
        
        element.style.background = backgrounds[level] || backgrounds[0];
        
        // Add animation for higher levels
        if (level >= 3) {
            element.style.backgroundSize = '200% 200%';
            element.style.animation = `gradient-shift ${10 - level}s ease infinite`;
        }
        
        // Add CSS animation keyframe if not already present
        if (!document.getElementById('gradient-animation')) {
            const style = document.createElement('style');
            style.id = 'gradient-animation';
            style.textContent = `
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Export for use in main Dream OS
if (typeof module!== 'undefined' && module.exports) {
    module.exports = { TrippyEffects, BackgroundEffects };
}