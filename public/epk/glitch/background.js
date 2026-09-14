let chars = '010101<>{}[]/\\*!@#$%^&_+-=?;:';

export function updateMatrixChars(newChars) {
    chars = newChars;
}

export function initBackground() {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Matrix-like rain / Static effect
    const drops = [];
    const fontSize = 14;
    
    function initDrops() {
        const columns = width / fontSize;
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }
    
    initDrops();

    // Noise buffer
    const noiseData = ctx.createImageData(width, height);
    
    function drawNoise() {
        const w = width;
        const h = height;
        const idata = noiseData;
        const buffer32 = new Uint32Array(idata.data.buffer);
        const len = buffer32.length;
        
        // Only update a random slice to save performance
        const sliceHeight = 50;
        const startY = Math.floor(Math.random() * (h - sliceHeight));
        
        for (let y = startY; y < startY + sliceHeight; y++) {
            for(let x=0; x < w; x++) {
                if(Math.random() > 0.95) {
                    const i = y * w + x;
                    if(i < len) {
                        // Random colored pixel for glitch feel
                         const r = Math.random() > 0.5 ? 255 : 0;
                         const g = Math.random() > 0.5 ? 255 : 0;
                         const b = Math.random() > 0.5 ? 255 : 0;
                         // Alpha low
                         buffer32[i] = (50 << 24) | (b << 16) | (g << 8) | r;
                    }
                }
            }
        }
        ctx.putImageData(idata, 0, 0);
    }
    
    // Glitch line effect
    function drawGlitchLine() {
        if(Math.random() > 0.05) return;
        
        const y = Math.random() * height;
        const h = Math.random() * 50 + 2;
        
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 0, 85, 0.1)';
        ctx.fillRect(0, y, width, h);
    }

    function animate() {
        // Fade effect
        ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
        ctx.fillRect(0, 0, width, height);
        
        // Digital Rain
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Randomly skip updates for jittery feel
            if (Math.random() > 0.8) continue;
            
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Random colors for glitch
            if(Math.random() > 0.98) ctx.fillStyle = '#FFF';
            else if(Math.random() > 0.95) ctx.fillStyle = '#F0F';
            else ctx.fillStyle = '#003300';
            
            ctx.fillText(text, x, y);
            
            if (y > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
        
        drawGlitchLine();
        
        requestAnimationFrame(animate);
    }
    
    animate();
}