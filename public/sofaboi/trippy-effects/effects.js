document.addEventListener('DOMContentLoaded', function() {
  initHeroBackgroundAnimation();
  initPsychedelicTextEffect();
  initFeatureCardEffects();
  initFloatingDemoButton();
  listenForSpecialKeys();
  // Initialize advanced trippy effects
  trippyEffects.init();
  
  // Initialize shader controller if it doesn't exist yet
  if (!window.trippyShaders) {
    window.trippyShaders = new TrippyShaderController();
  }
});

// Background Animation for the Hero Section
function initHeroBackgroundAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.overflow = 'hidden';
  particlesContainer.style.pointerEvents = 'none';
  particlesContainer.style.zIndex = '1';
  hero.prepend(particlesContainer);

  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer);
  }

  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.position = 'relative';
    heroContent.style.zIndex = '2';

    const glow = document.createElement('div');
    glow.className = 'hero-glow';
    glow.style.position = 'absolute';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.width = '80%';
    glow.style.height = '80%';
    glow.style.borderRadius = '50%';
    glow.style.filter = 'blur(80px)';
    glow.style.background = 'radial-gradient(circle, rgba(148,70,255,0.3) 0%, rgba(255,97,216,0.2) 50%, rgba(0,0,0,0) 100%)';
    glow.style.opacity = '0.7';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '-1';

    heroContent.prepend(glow);
    animateGlow(glow);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  const size = Math.random() * 5 + 2;
  const x = Math.random() * 100;
  const y = Math.random() * 100;
  const duration = Math.random() * 20 + 10;
  const delay = Math.random() * 5;
  const colors = ['#ff61d8', '#7dffa7', '#61d8ff', '#9146FF'];
  const color = colors[Math.floor(Math.random() * colors.length)];

  particle.style.position = 'absolute';
  particle.style.left = `${x}%`;
  particle.style.top = `${y}%`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.borderRadius = '50%';
  particle.style.background = color;
  particle.style.opacity = Math.random() * 0.5 + 0.2;
  particle.style.filter = 'blur(1px)';
  particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
  particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

  container.appendChild(particle);

  if (!document.getElementById('particle-keyframes')) {
    const style = document.createElement('style');
    style.id = 'particle-keyframes';
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0); }
        25% { transform: translate(10px, -20px) rotate(5deg); }
        50% { transform: translate(0, -40px) rotate(0); }
        75% { transform: translate(-10px, -20px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0); }
      }
      @keyframes glow-pulse {
        0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.8); }
      }
    `;
    document.head.appendChild(style);
  }
}

function animateGlow(glow) {
  glow.style.animation = 'glow-pulse 8s ease-in-out infinite';
}

// Psychedelic Text Effect
function initPsychedelicTextEffect() {
  const texts = document.querySelectorAll('.psychedelic-text');
  texts.forEach(text => {
    text.addEventListener('mouseover', function() {
      this.style.animation = 'none';
      this.style.textShadow = '0 0 10px #ff61d8, 0 0 20px #ff61d8, 0 0 30px #ff61d8';
      setTimeout(() => {
        this.style.animation = 'psychedelic 15s infinite alternate';
      }, 300);
    });
    text.addEventListener('mouseout', function() {
      this.style.animation = 'psychedelic 15s infinite alternate';
    });
  });
}

// Feature Card Hover Effects
function initFeatureCardEffects() {
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = Math.floor((x / rect.width) * 100);
      const yPercent = Math.floor((y / rect.height) * 100);
      const tiltX = (yPercent - 50) / 10;
      const tiltY = -(xPercent - 50) / 10;
      this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px) scale(1.02)`;
      this.style.background = `linear-gradient(225deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 25%, rgba(0,0,0,0) 50%), ${window.getComputedStyle(this).getPropertyValue('--bg-gradient') || ''}`;
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      if (this.classList.contains('bg-purple'))
        this.style.background = 'linear-gradient(to bottom right, #2a1a4a, #1a1028)';
      else if (this.classList.contains('bg-blue'))
        this.style.background = 'linear-gradient(to bottom right, #1a3a4a, #0a2028)';
      else if (this.classList.contains('bg-pink'))
        this.style.background = 'linear-gradient(to bottom right, #3a1a2a, #2a1018)';
      else if (this.classList.contains('bg-green'))
        this.style.background = 'linear-gradient(to bottom right, #1a3a2a, #0a2018)';
      else if (this.classList.contains('bg-yellow'))
        this.style.background = 'linear-gradient(to bottom right, #3a3a1a, #2a2a10)';
    });
  });
}

// Floating Demo Button Effects
function initFloatingDemoButton() {
  const demoBtn = document.querySelector('.demo-link a');
  if (demoBtn) {
    demoBtn.style.animation = 'pulse 2s infinite';
  }
}

// Keyboard Listeners for Advanced Features
function listenForSpecialKeys() {
  document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !e.repeat) {
      e.preventDefault();
      toggleCubeOverlay();
    }
    if (e.code === 'KeyV' && !e.repeat) {
      e.preventDefault();
      toggleAudioVisualizer();
    }
    if (e.shiftKey && e.ctrlKey && e.code === 'KeyM' && !e.repeat) {
      e.preventDefault();
      toggleControlPanel();
    }
  });
}

// Toggle 3D Cube Overlay
function toggleCubeOverlay() {
  let overlay = document.getElementById('cube-overlay');
  if (overlay) {
    overlay.remove();
  } else {
    overlay = document.createElement('div');
    overlay.id = 'cube-overlay';
    overlay.className = 'overlay';

    const cubeContainer = document.createElement('div');
    cubeContainer.className = 'cube-container';

    const cube = document.createElement('div');
    cube.className = 'cube';

    for (let i = 1; i <= 6; i++) {
      const face = document.createElement('div');
      face.className = 'cube-face';
      face.textContent = `Face ${i}`;
      cube.appendChild(face);
    }

    cubeContainer.appendChild(cube);
    overlay.appendChild(cubeContainer);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => overlay.remove());
  }
}

// Toggle Audio Visualizer Overlay
function toggleAudioVisualizer() {
  let overlay = document.getElementById('audio-overlay');
  if (overlay) {
    overlay.remove();
  } else {
    overlay = document.createElement('div');
    overlay.id = 'audio-overlay';
    overlay.className = 'overlay audio-visualizer';

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 300;
    overlay.appendChild(canvas);
    document.body.appendChild(overlay);

    const ctx = canvas.getContext('2d');
    let mode = 1;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = 20;
      const cols = Math.floor(canvas.width / (barWidth + 5));
      for (let i = 0; i < cols; i++) {
        const barHeight = Math.random() * canvas.height;
        ctx.fillStyle = `hsl(${(i * 15) % 360}, 70%, 50%)`;
        ctx.fillRect(i * (barWidth + 5), canvas.height - barHeight, barWidth, barHeight);
      }
      requestAnimationFrame(draw);
    }
    draw();

    const keyListener = function(e) {
      if (e.key >= '1' && e.key <= '5') {
        mode = parseInt(e.key);
        console.log(`Audio Visualizer mode switched to ${mode}`);
      }
    };
    document.addEventListener('keydown', keyListener);

    overlay.addEventListener('click', function() {
      document.removeEventListener('keydown', keyListener);
      overlay.remove();
    });
  }
}

// Toggle Control Panel Overlay
function toggleControlPanel() {
  let panel = document.getElementById('control-panel');
  if (panel) {
    panel.remove();
  } else {
    panel = document.createElement('div');
    panel.id = 'control-panel';
    panel.className = 'overlay';

    const panelContent = document.createElement('div');
    panelContent.className = 'control-panel';
    panelContent.innerHTML = `
      <h3>Main Control Panel</h3>
      <label>
        Effect Intensity
        <input type="range" min="0" max="100" value="50">
      </label>
      <br>
      <label>
        Toggle Features
        <input type="checkbox" checked>
      </label>
      <br>
      <button id="close-panel">Close Panel</button>
    `;
    panel.appendChild(panelContent);
    document.body.appendChild(panel);

    document.getElementById('close-panel').addEventListener('click', function() {
      panel.remove();
    });
  }
}

// Initialize trippyEffects object for advanced controls
const trippyEffects = window.trippyEffects = {
  intensityLevel: 5,
  activeEffects: [],
  
  init() {
    this.initWebGLShaders();
    this.initNeuralEffects();
    this.initAudioVisualizer();
    this.init3DCube();
    this.initEventListeners();
    
    // Initialize new trippy effects from the user's script
    this.initAdvancedTrippyEffects();
  },
  
  initWebGLShaders() {
    // WebGL shaders are now initialized by the trippyShaders controller
    // We'll just add configuration for existing shader elements
    const shaders = document.querySelectorAll('.webgl-shader');
    shaders.forEach(shader => {
      const type = shader.dataset.shaderType || 'liquidDistortion';
      console.log(`Shader element found with type: ${type}`);
      
      // Add this shader to the active effects list for control via the panel
      this.activeEffects.push({type: 'webgl', element: shader, shaderType: type});
    });
  },
  
  initNeuralEffects() {
    // Neural dream effect
    const dreamEffects = document.querySelectorAll('.neural-dream');
    dreamEffects.forEach(element => {
      this.applyDreamEffect(element);
      this.activeEffects.push({type: 'neural', element, effectType: 'dream'});
    });
    
    // Neural glitch effect
    const glitchEffects = document.querySelectorAll('.neural-glitch');
    glitchEffects.forEach(element => {
      this.applyGlitchEffect(element);
      this.activeEffects.push({type: 'neural', element, effectType: 'glitch'});
    });
    
    // Style transfer effect
    const styleEffects = document.querySelectorAll('.neural-style');
    styleEffects.forEach(element => {
      const styleType = element.dataset.styleType || 'psychedelic';
      this.applyStyleTransfer(element, styleType);
      this.activeEffects.push({type: 'neural', element, effectType: 'style', styleType});
    });
  },
  
  applyDreamEffect(element) {
    const img = element.querySelector('img');
    if (img) {
      // Simulate DeepDream effect with CSS
      img.style.animation = 'dream-pulse 8s infinite alternate';
      
      // Add animation keyframes if not already present
      if (!document.querySelector('#dream-keyframes')) {
        const style = document.createElement('style');
        style.id = 'dream-keyframes';
        style.textContent = `
          @keyframes dream-pulse {
            0% { filter: saturate(1.2) brightness(1.1) contrast(1.1); }
            50% { filter: saturate(1.8) brightness(1.2) contrast(1.3) hue-rotate(15deg); }
            100% { filter: saturate(1.5) brightness(1.15) contrast(1.2) hue-rotate(-15deg); }
          }
        `;
        document.head.appendChild(style);
      }
    }
  },
  
  applyGlitchEffect(element) {
    const img = element.querySelector('img');
    if (img) {
      // Simulate glitch effect with CSS
      img.style.animation = 'glitch-anim 10s infinite';
      
      // Add animation keyframes if not already present
      if (!document.querySelector('#glitch-keyframes')) {
        const style = document.createElement('style');
        style.id = 'glitch-keyframes';
        style.textContent = `
          @keyframes glitch-anim {
            0%, 100% { transform: translate(0); filter: none; }
            92% { transform: translate(0); filter: none; }
            93% { transform: translate(3px, 0); filter: hue-rotate(90deg) saturate(2); }
            94% { transform: translate(-3px, 0); filter: hue-rotate(180deg); }
            95% { transform: translate(0, 3px); filter: hue-rotate(270deg); }
            96% { transform: translate(0, -3px); filter: invert(1); }
            97% { transform: translate(3px, 3px); filter: saturate(2) contrast(1.5); }
            98% { transform: translate(-3px, -3px); filter: hue-rotate(180deg) saturate(0.5); }
            99% { transform: translate(0); filter: none; }
          }
        `;
        document.head.appendChild(style);
      }
    }
  },
  
  applyStyleTransfer(element, styleType) {
    const img = element.querySelector('img');
    if (img) {
      // Simulate style transfer with CSS based on style type
      switch(styleType) {
        case 'psychedelic':
          img.style.filter = 'saturate(1.8) hue-rotate(30deg) brightness(1.2) contrast(1.2)';
          break;
        case 'vaporwave':
          img.style.filter = 'saturate(1.5) hue-rotate(280deg) brightness(1.1) contrast(1.15)';
          break;
        default:
          img.style.filter = 'saturate(1.5) hue-rotate(30deg)';
      }
    }
  },
  
  initAudioVisualizer() {
    const audio = document.getElementById('demo-audio');
    const canvas = document.getElementById('audio-visualizer-canvas');
    
    if (audio && canvas) {
      this.audioVisualizer = {
        audioContext: null,
        analyser: null,
        dataArray: null,
        source: null,
        canvas: canvas,
        canvasContext: canvas.getContext('2d'),
        visualizationType: 'spectrum', // 'spectrum', 'waveform', 'circular', 'particles'
        
        init() {
          this.setupAudioContext();
          this.setupAnalyser();
          this.setupEventListeners();
          this.resizeCanvas();
          this.draw();
        },
        
        setupAudioContext() {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.audioContext = new AudioContext();
        },
        
        setupAnalyser() {
          this.analyser = this.audioContext.createAnalyser();
          this.analyser.fftSize = 256;
          this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
          this.source = this.audioContext.createMediaElementSource(audio);
          this.source.connect(this.analyser);
          this.analyser.connect(this.audioContext.destination);
        },
        
        setupEventListeners() {
          // Click on canvas to change visualization type
          this.canvas.addEventListener('click', () => {
            const types = ['spectrum', 'waveform', 'circular', 'particles'];
            const currentIndex = types.indexOf(this.visualizationType);
            const nextIndex = (currentIndex + 1) % types.length;
            this.visualizationType = types[nextIndex];
          });
          
          // Resume audio context on user interaction
          document.addEventListener('click', () => {
            if (this.audioContext.state === 'suspended') {
              this.audioContext.resume();
            }
          });
          
          // Resize canvas when window size changes
          window.addEventListener('resize', () => this.resizeCanvas());
        },
        
        resizeCanvas() {
          this.canvas.width = this.canvas.parentElement.offsetWidth;
          this.canvas.height = this.canvas.parentElement.offsetHeight;
        },
        
        draw() {
          requestAnimationFrame(() => this.draw());
          
          this.analyser.getByteFrequencyData(this.dataArray);
          
          const width = this.canvas.width;
          const height = this.canvas.height;
          
          this.canvasContext.clearRect(0, 0, width, height);
          
          switch(this.visualizationType) {
            case 'spectrum':
              this.drawSpectrum(width, height);
              break;
            case 'waveform':
              this.drawWaveform(width, height);
              break;
            case 'circular':
              this.drawCircular(width, height);
              break;
            case 'particles':
              this.drawParticles(width, height);
              break;
          }
        },
        
        drawSpectrum(width, height) {
          const barWidth = width / this.analyser.frequencyBinCount;
          let barHeight;
          let x = 0;
          
          for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
            barHeight = this.dataArray[i] / 255 * height;
            
            // Create gradient based on frequency
            const hue = i / this.analyser.frequencyBinCount * 360;
            this.canvasContext.fillStyle = `hsl(${hue}, 90%, 50%)`;
            
            this.canvasContext.fillRect(x, height - barHeight, barWidth - 1, barHeight);
            x += barWidth;
          }
        },
        
        drawWaveform(width, height) {
          this.analyser.getByteTimeDomainData(this.dataArray);
          
          this.canvasContext.lineWidth = 2;
          this.canvasContext.strokeStyle = 'rgb(152, 230, 0)';
          this.canvasContext.beginPath();
          
          const sliceWidth = width / this.analyser.frequencyBinCount;
          let x = 0;
          
          for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
            const v = this.dataArray[i] / 128.0;
            const y = v * height / 2;
            
            if (i === 0) {
              this.canvasContext.moveTo(x, y);
            } else {
              this.canvasContext.lineTo(x, y);
            }
            
            x += sliceWidth;
          }
          
          this.canvasContext.lineTo(width, height / 2);
          this.canvasContext.stroke();
        },
        
        drawCircular(width, height) {
          const centerX = width / 2;
          const centerY = height / 2;
          const radius = Math.min(width, height) / 3;
          
          for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
            const barHeight = this.dataArray[i] / 255 * radius;
            const angle = i * 2 * Math.PI / this.analyser.frequencyBinCount;
            
            const x1 = centerX + radius * Math.cos(angle);
            const y1 = centerY + radius * Math.sin(angle);
            const x2 = centerX + (radius + barHeight) * Math.cos(angle);
            const y2 = centerY + (radius + barHeight) * Math.sin(angle);
            
            const hue = i / this.analyser.frequencyBinCount * 360;
            
            this.canvasContext.strokeStyle = `hsl(${hue}, 90%, 50%)`;
            this.canvasContext.lineWidth = 2;
            this.canvasContext.beginPath();
            this.canvasContext.moveTo(x1, y1);
            this.canvasContext.lineTo(x2, y2);
            this.canvasContext.stroke();
          }
        },
        
        drawParticles(width, height) {
          // Simple particle visualization
          const centerX = width / 2;
          const centerY = height / 2;
          
          this.canvasContext.fillStyle = 'rgba(0, 0, 0, 0.2)';
          this.canvasContext.fillRect(0, 0, width, height);
          
          for (let i = 0; i < this.analyser.frequencyBinCount; i += 3) {
            const amplitude = this.dataArray[i] / 255;
            const hue = i / this.analyser.frequencyBinCount * 360;
            const size = amplitude * 20;
            
            if (amplitude > 0.1) {
              const angle = i * Math.PI * 2 / this.analyser.frequencyBinCount;
              const distance = amplitude * Math.min(width, height) / 2;
              const x = centerX + Math.cos(angle) * distance;
              const y = centerY + Math.sin(angle) * distance;
              
              this.canvasContext.fillStyle = `hsla(${hue}, 90%, 50%, ${amplitude})`;
              this.canvasContext.beginPath();
              this.canvasContext.arc(x, y, size, 0, Math.PI * 2);
              this.canvasContext.fill();
            }
          }
        }
      };
      
      // Initialize audio visualizer
      this.audioVisualizer.init();
    }
  },
  
  init3DCube() {
    const container = document.getElementById('video-cube-container');
    if (!container) return;
    
    // Initialize the 3D cube with Three.js
    if (window.createVideoCubeEnvironment) {
      this.cubeEnvironment = window.createVideoCubeEnvironment('video-cube-container');
      
      // Set up video sources
      const videoUrls = [
        'https://player.vimeo.com/external/343219301.sd.mp4?s=34084f00a8a13d2ad53596da509ab6e55a50f8f6&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/347311306.sd.mp4?s=1cac3862e8f6e086c4e4ca9a18679730a2746a36&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/370232276.sd.mp4?s=87fda3c12b35ae1dee3933c71d4551361259e4b1&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/358355586.sd.mp4?s=2908595c9b20846b6a0a87017cdcffe13ddf5549&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/348721155.sd.mp4?s=6c0995877d0ca634e95ab64f341691033f832159&profile_id=164&oauth2_token_id=57447761',
        'https://player.vimeo.com/external/329298487.sd.mp4?s=33e1326c098098057f7447386f6f94f4f409d16e&profile_id=164&oauth2_token_id=57447761'
      ];
      
      this.cubeEnvironment.setVideos(videoUrls);
    } else {
      console.error('VideoCubeEnvironment not available');
      
      // Fallback to old implementation
      this.createFallbackCube();
    }
  },
  
  createFallbackCube() {
    // Old implementation as fallback
    const container = document.getElementById('video-cube-container');
    if (!container) return;
    
    // Create 3D cube scene
    const scene = document.createElement('div');
    scene.className = 'cube-scene';
    scene.style.width = '100%';
    scene.style.height = '100%';
    scene.style.perspective = '1200px';
    scene.style.position = 'relative';
    
    const cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.width = '300px';
    cube.style.height = '300px';
    cube.style.position = 'absolute';
    cube.style.top = '50%';
    cube.style.left = '50%';
    cube.style.transform = 'translate(-50%, -50%) rotateX(-15deg) rotateY(15deg)';
    cube.style.transformStyle = 'preserve-3d';
    cube.style.transition = 'transform 0.5s ease';
    
    // Create cube faces with thumbnail images as before
    const videos = [
      'a7iHkZFwbrU', // Secret Trippy World of Discarded Dreams
      'C46ATeslaD4', // The Enigmatic Harmony of Kaiber AI
      '82_Ju3i-NZU', // Pooty x 1.9.9.9
      'BkTZWDlbHug', // Sofa King Sad Boi
      'Vc9KMt-9WR0', // Equipoise
      '3t1CXmmsbgM', // Pink Floyd
    ];
    
    const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
    faces.forEach((face, index) => {
      const faceDom = document.createElement('div');
      faceDom.className = `cube-face cube-face-${face}`;
      faceDom.style.position = 'absolute';
      faceDom.style.width = '100%';
      faceDom.style.height = '100%';
      faceDom.style.border = '1px solid rgba(255, 255, 255, 0.2)';
      faceDom.style.display = 'flex';
      faceDom.style.alignItems = 'center';
      faceDom.style.justifyContent = 'center';
      faceDom.style.overflow = 'hidden';
      
      // Position faces
      switch(face) {
        case 'front': 
          faceDom.style.transform = 'translateZ(150px)';
          break;
        case 'back': 
          faceDom.style.transform = 'rotateY(180deg) translateZ(150px)';
          break;
        case 'left': 
          faceDom.style.transform = 'rotateY(-90deg) translateZ(150px)';
          break;
        case 'right': 
          faceDom.style.transform = 'rotateY(90deg) translateZ(150px)';
          break;
        case 'top': 
          faceDom.style.transform = 'rotateX(90deg) translateZ(150px)';
          break;
        case 'bottom': 
          faceDom.style.transform = 'rotateX(-90deg) translateZ(150px)';
          break;
      }
      
      // For demo purposes, add thumbnail images instead of actual videos
      const thumbnail = document.createElement('img');
      thumbnail.src = `https://i.ytimg.com/vi/${videos[index]}/hqdefault.jpg`;
      thumbnail.style.width = '100%';
      thumbnail.style.height = '100%';
      thumbnail.style.objectFit = 'cover';
      faceDom.appendChild(thumbnail);
      
      cube.appendChild(faceDom);
    });
    
    scene.appendChild(cube);
    container.innerHTML = '';
    container.appendChild(scene);
    
    // Interactive cube rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let cubeRotation = { x: -15, y: 15 };
    
    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      
      const dx = e.clientX - previousMousePosition.x;
      const dy = e.clientY - previousMousePosition.y;
      
      cubeRotation.y += dx * 0.5;
      cubeRotation.x -= dy * 0.5;
      
      cube.style.transform = `translate(-50%, -50%) rotateX(${cubeRotation.x}deg) rotateY(${cubeRotation.y}deg)`;
      
      previousMousePosition = { x: e.clientX, y: e.clientY };
    });
    
    // Store reference for controls
    this.cube = { element: cube, rotation: cubeRotation };
  },
  
  initEventListeners() {
    // Randomize button
    const randomizeBtn = document.getElementById('randomize-btn');
    if (randomizeBtn) {
      randomizeBtn.addEventListener('click', () => this.randomizeEffects());
    }
    
    // Intensity button
    const intensityBtn = document.getElementById('intensity-btn');
    const intensityValue = document.getElementById('intensity-value');
    if (intensityBtn && intensityValue) {
      intensityBtn.addEventListener('click', () => {
        this.intensityLevel = this.intensityLevel >= 10 ? 1 : this.intensityLevel + 1;
        intensityValue.textContent = this.intensityLevel;
        this.updateEffects();
      });
    }
    
    // Keyboard controls
    document.addEventListener('keydown', (e) => {
      // Alt+R to randomize
      if (e.altKey && e.key === 'r') {
        this.randomizeEffects();
      }
      
      // Alt+E to toggle effects
      if (e.altKey && e.key === 'e') {
        this.toggleEffects();
      }
    });
  },
  
  randomizeEffects() {
    // Randomize WebGL effects if trippyShaders controller exists
    if (window.trippyShaders && window.trippyShaders.activeShaders) {
      // We can't directly modify the shader, but we can update the source images
      document.querySelectorAll('.webgl-shader').forEach(shader => {
        const img = shader.querySelector('img');
        if (img) {
          const hueRotate = Math.floor(Math.random() * 360);
          const saturate = 1 + Math.random() * 1.5;
          const contrast = 1 + Math.random() * 0.5;
          img.style.filter = `hue-rotate(${hueRotate}deg) saturate(${saturate}) contrast(${contrast})`;
        }
      });
    }
    
    // Randomize neural effects
    document.querySelectorAll('.neural-dream, .neural-glitch, .neural-style').forEach(element => {
      const img = element.querySelector('img');
      if (img) {
        const hueRotate = Math.floor(Math.random() * 360);
        const saturate = 1 + Math.random() * 1.5;
        img.style.filter = `hue-rotate(${hueRotate}deg) saturate(${saturate})`;
      }
    });
    
    // Randomize cube rotation
    if (this.cube) {
      this.cube.rotation.x = Math.random() * 360 - 180;
      this.cube.rotation.y = Math.random() * 360 - 180;
      this.cube.element.style.transform = `translate(-50%, -50%) rotateX(${this.cube.rotation.x}deg) rotateY(${this.cube.rotation.y}deg)`;
    }
    
    console.log('Effects randomized!');
  },
  
  toggleEffects() {
    const body = document.body;
    body.classList.toggle('effects-disabled');
    
    if (body.classList.contains('effects-disabled')) {
      // Disable all effects
      document.querySelectorAll('.webgl-shader img, .neural-dream img, .neural-glitch img, .neural-style img').forEach(img => {
        img.style.filter = 'none';
        img.style.animation = 'none';
      });
    } else {
      // Re-enable effects
      this.updateEffects();
    }
  },
  
  updateEffects() {
    // Adjust effect intensity based on intensityLevel (1-10)
    const intensity = this.intensityLevel / 5; // Convert to a 0.2-2.0 scale
    
    document.querySelectorAll('.webgl-shader, .neural-dream, .neural-glitch, .neural-style').forEach(element => {
      const img = element.querySelector('img');
      if (img) {
        let currentFilter = img.style.filter;
        
        if (currentFilter.includes('saturate')) {
          // Update saturation based on intensity
          currentFilter = currentFilter.replace(/saturate\([^)]+\)/, `saturate(${1 + 0.8 * intensity})`);
          img.style.filter = currentFilter;
        }
        
        if (currentFilter.includes('contrast')) {
          // Update contrast based on intensity
          currentFilter = currentFilter.replace(/contrast\([^)]+\)/, `contrast(${1 + 0.4 * intensity})`);
          img.style.filter = currentFilter;
        }
      }
    });
    
    console.log(`Effect intensity set to: ${this.intensityLevel}/10`);
  },
  
  initAdvancedTrippyEffects() {
    // Create scanlines overlay
    const scanlines = document.createElement('div');
    scanlines.className = 'scanlines';
    scanlines.style.position = 'fixed';
    scanlines.style.top = '0';
    scanlines.style.left = '0';
    scanlines.style.width = '100%';
    scanlines.style.height = '100%';
    scanlines.style.backgroundImage = 'linear-gradient(transparent 50%, rgba(0, 0, 0, 0.05) 50%)';
    scanlines.style.backgroundSize = '100% 4px';
    scanlines.style.pointerEvents = 'none';
    scanlines.style.zIndex = '1000';
    scanlines.style.opacity = '0.3';
    document.body.appendChild(scanlines);
    
    // Setup all advanced effects
    this.setupRecursiveVideos();
    this.setupDatamoshEffect();
    this.setupVideoGlitchEffects();
    this.setupRGBSplitEffect();
    this.setupAudioReactiveEffects();
    this.setupTrippyCursorTrail();
    
    // Add scroll effects
    window.addEventListener('scroll', this.handleScrollEffects);
    
    // Add blob animations to appropriate containers
    document.querySelectorAll('.blob-container').forEach(container => {
      this.createBlobAnimation(container);
    });
  },
  
  setupRecursiveVideos() {
    const videoContainers = document.querySelectorAll('.recursive-video, .recursive-frame');
    videoContainers.forEach(container => {
      const video = container.querySelector('video, iframe, img');
      if (!video) return;
      
      // Only add new layers if they don't already exist
      if (!container.querySelector('.recursive-inner')) {
        // Add recursive layers
        for (let i = 0; i < 3; i++) {
          const recursiveLayer = document.createElement('div');
          recursiveLayer.className = 'recursive-inner';
          recursiveLayer.style.position = 'absolute';
          recursiveLayer.style.top = '50%';
          recursiveLayer.style.left = '50%';
          recursiveLayer.style.width = `${100 - i * 10}%`;
          recursiveLayer.style.height = `${100 - i * 10}%`;
          recursiveLayer.style.transform = `translate(-50%, -50%) perspective(500px) rotateX(${5 * (i+1)}deg) rotateY(${-5 * (i+1)}deg) scale(${0.9 - i * 0.1})`;
          recursiveLayer.style.opacity = `${0.3 - i * 0.1}`;
          recursiveLayer.style.border = '1px solid rgba(255, 255, 255, 0.3)';
          recursiveLayer.style.pointerEvents = 'none';
          container.appendChild(recursiveLayer);
        }
      }
      
      // Make it interactive with mouse movement
      container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        const layers = container.querySelectorAll('.recursive-inner');
        layers.forEach((layer, index) => {
          const factor = (index + 1) * 10;
          layer.style.transform = `translate(-50%, -50%) perspective(500px) rotateX(${y * factor}deg) rotateY(${x * factor}deg) scale(${0.9 - index * 0.1})`;
        });
      });
    });
  },
  
  setupDatamoshEffect() {
    const datamoshElements = document.querySelectorAll('.datamosh');
    datamoshElements.forEach(element => {
      element.style.transition = 'transform 0.1s, box-shadow 0.1s';
      
      element.addEventListener('click', () => {
        // Simulate datamosh glitch effect
        const glitchDuration = 800; // ms
        const glitchStart = performance.now();
        
        const applyDatamoshFrame = (timestamp) => {
          const elapsed = timestamp - glitchStart;
          if (elapsed < glitchDuration) {
            const intensity = Math.sin((elapsed / glitchDuration) * Math.PI);
            
            // Apply glitch transformations
            const xOffset = (Math.random() - 0.5) * 20 * intensity;
            const yOffset = (Math.random() - 0.5) * 10 * intensity;
            const skew = (Math.random() - 0.5) * 5 * intensity;
            
            element.style.transform = `translate(${xOffset}px, ${yOffset}px) skew(${skew}deg)`;
            element.style.boxShadow = `
              ${-xOffset * 0.5}px 0 0 rgba(255,0,0,${0.3 * intensity}),
              ${xOffset * 0.5}px 0 0 rgba(0,255,255,${0.3 * intensity})
            `;
            
            requestAnimationFrame(applyDatamoshFrame);
          } else {
            // Reset after effect
            element.style.transform = '';
            element.style.boxShadow = '';
          }
        };
        
        requestAnimationFrame(applyDatamoshFrame);
      });
    });
  },
  
  setupVideoGlitchEffects() {
    const videos = document.querySelectorAll('.glitch-video');
    videos.forEach(video => {
      const videoContainer = video.parentElement;
      videoContainer.style.position = 'relative';
      
      // Create glitch layers if they don't exist
      if (!videoContainer.querySelector('.video-glitch-layer')) {
        const glitchLayer1 = document.createElement('div');
        const glitchLayer2 = document.createElement('div');
        
        glitchLayer1.className = 'video-glitch-layer';
        glitchLayer2.className = 'video-glitch-layer';
        
        // Style glitch layers
        [glitchLayer1, glitchLayer2].forEach(layer => {
          layer.style.position = 'absolute';
          layer.style.top = '0';
          layer.style.left = '0';
          layer.style.width = '100%';
          layer.style.height = '100%';
          layer.style.backgroundSize = 'cover';
          layer.style.pointerEvents = 'none';
          layer.style.opacity = '0';
          layer.style.transition = 'transform 0.1s, opacity 0.1s';
          layer.style.mixBlendMode = 'exclusion';
          
          if (video.tagName === 'VIDEO' || video.tagName === 'IMG') {
            layer.style.backgroundImage = `url(${video.src || video.currentSrc})`;
          }
        });
        
        videoContainer.appendChild(glitchLayer1);
        videoContainer.appendChild(glitchLayer2);
        
        // Periodic glitch effect
        setInterval(() => {
          if (Math.random() > 0.9) {
            const duration = 100 + Math.random() * 400;
            
            // Apply glitch
            glitchLayer1.style.opacity = '0.2';
            glitchLayer1.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
            
            glitchLayer2.style.opacity = '0.2';
            glitchLayer2.style.transform = `translateX(${(Math.random() - 0.5) * 10}px)`;
            
            // Reset after effect
            setTimeout(() => {
              glitchLayer1.style.opacity = '0';
              glitchLayer1.style.transform = 'translateX(0)';
              
              glitchLayer2.style.opacity = '0';
              glitchLayer2.style.transform = 'translateX(0)';
            }, duration);
          }
        }, 2000);
      }
    });
  },
  
  setupRGBSplitEffect() {
    // Add CSS for RGB split if not already in document
    if (!document.getElementById('rgb-split-styles')) {
      const style = document.createElement('style');
      style.id = 'rgb-split-styles';
      style.textContent = `
        .rgb-split-img {
          position: relative;
          --rgb-offset-x: 0px;
          --rgb-offset-y: 0px;
        }
        .rgb-split-img::before,
        .rgb-split-img::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: inherit;
          background-size: cover;
          background-position: center;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .rgb-split-img::before {
          background-color: #f00;
          transform: translate(var(--rgb-offset-x), var(--rgb-offset-y));
        }
        .rgb-split-img::after {
          background-color: #0ff;
          transform: translate(calc(-1 * var(--rgb-offset-x)), calc(-1 * var(--rgb-offset-y)));
        }
      `;
      document.head.appendChild(style);
    }
    
    const rgbSplitImages = document.querySelectorAll('.rgb-split-img, .neural-style img, .neural-glitch img');
    rgbSplitImages.forEach(image => {
      // Apply background image and add rgb-split-img class
      if (!image.classList.contains('rgb-split-img')) {
        image.classList.add('rgb-split-img');
        image.style.backgroundImage = `url(${image.src})`;
        image.style.backgroundSize = 'cover';
        image.style.backgroundPosition = 'center';
      }
      
      image.addEventListener('mousemove', (e) => {
        const rect = image.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        // Calculate offset based on cursor position
        const offsetX = x * 10;
        const offsetY = y * 5;
        
        image.style.setProperty('--rgb-offset-x', `${offsetX}px`);
        image.style.setProperty('--rgb-offset-y', `${offsetY}px`);
      });
      
      image.addEventListener('mouseleave', () => {
        image.style.setProperty('--rgb-offset-x', '0px');
        image.style.setProperty('--rgb-offset-y', '0px');
      });
    });
  },
  
  setupAudioReactiveEffects() {
    // If we already have an audio visualizer from the existing code, don't add another one
    if (this.audioVisualizer) return;
    
    const audioReactiveElements = document.querySelectorAll('.audio-reactive, #audio-visualizer-canvas');
    audioReactiveElements.forEach(element => {
      const video = element.querySelector('video') || document.getElementById('demo-audio');
      if (!video) return;
      
      // Setup audio analysis if browser supports it
      if (window.AudioContext || window.webkitAudioContext) {
        try {
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const analyser = audioContext.createAnalyser();
          
          // Connect video audio to analyser
          const source = audioContext.createMediaElementSource(video);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          
          // Configure analyser
          analyser.fftSize = 256;
          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          
          // Create visualization element
          const visualizer = document.createElement('div');
          visualizer.className = 'audio-visualizer';
          visualizer.style.position = 'absolute';
          visualizer.style.bottom = '0';
          visualizer.style.left = '0';
          visualizer.style.width = '100%';
          visualizer.style.height = '50px';
          visualizer.style.display = 'flex';
          visualizer.style.alignItems = 'flex-end';
          visualizer.style.justifyContent = 'space-between';
          visualizer.style.zIndex = '5';
          visualizer.style.pointerEvents = 'none';
          element.appendChild(visualizer);
          
          // Create bars for visualization
          for (let i = 0; i < bufferLength; i++) {
            const bar = document.createElement('div');
            bar.className = 'audio-bar';
            bar.style.width = `${100 / bufferLength}%`;
            bar.style.height = '0';
            bar.style.background = 'linear-gradient(to top, rgba(152, 230, 0, 0.5), rgba(255, 97, 216, 0.5))';
            visualizer.appendChild(bar);
          }
          
          // Update visualization on animation frame
          function updateVisualization() {
            analyser.getByteFrequencyData(dataArray);
            const bars = visualizer.querySelectorAll('.audio-bar');
            
            for (let i = 0; i < bars.length; i++) {
              const height = dataArray[i] / 2;
              bars[i].style.height = `${height}px`;
              
              // Color based on frequency
              const hue = i / bars.length * 360;
              bars[i].style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
            }
            
            requestAnimationFrame(updateVisualization);
          }
          
          video.addEventListener('play', () => {
            updateVisualization();
          });
          
        } catch (e) {
          console.error("Audio analysis not supported:", e);
        }
      }
    });
  },
  
  setupTrippyCursorTrail() {
    // Add cursor trail if it doesn't exist
    if (!document.querySelector('.cursor-trail')) {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.position = 'fixed';
      trail.style.top = '0';
      trail.style.left = '0';
      trail.style.width = '100%';
      trail.style.height = '100%';
      trail.style.pointerEvents = 'none';
      trail.style.zIndex = '1000';
      document.body.appendChild(trail);
      
      const trailElements = [];
      const trailLength = 20;
      
      for (let i = 0; i < trailLength; i++) {
        const trailElement = document.createElement('div');
        trailElement.className = 'trail-element';
        trailElement.style.position = 'absolute';
        trailElement.style.borderRadius = '50%';
        trailElement.style.pointerEvents = 'none';
        trail.appendChild(trailElement);
        
        trailElements.push({
          element: trailElement,
          x: 0,
          y: 0
        });
      }
      
      document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update first element position directly
        trailElements[0].x = x;
        trailElements[0].y = y;
        
        // Update trail elements with delay
        for (let i = 1; i < trailElements.length; i++) {
          const current = trailElements[i];
          const previous = trailElements[i - 1];
          
          current.x += (previous.x - current.x) * 0.3;
          current.y += (previous.y - current.y) * 0.3;
        }
        
        // Apply positions and styles
        trailElements.forEach((item, i) => {
          const size = Math.max(5, 20 - i);
          const hue = (360 / trailLength) * i;
          
          item.element.style.width = `${size}px`;
          item.element.style.height = `${size}px`;
          item.element.style.left = `${item.x - size / 2}px`;
          item.element.style.top = `${item.y - size / 2}px`;
          item.element.style.backgroundColor = `hsla(${hue}, 100%, 50%, ${1 - i / trailLength})`;
        });
      });
    }
  },
  
  handleScrollEffects() {
    const scrollY = window.scrollY;
    const elements = document.querySelectorAll('.scroll-effect, .effect-card');
    
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementY = rect.top + scrollY;
      const offset = scrollY - elementY;
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (inView) {
        // Parallax effect
        element.style.transform = `translateY(${offset * 0.1}px)`;
        
        // Opacity and blur based on scroll position
        const scrollPercentage = Math.min(1, Math.max(0, 1 - (rect.top / window.innerHeight)));
        element.style.opacity = 0.5 + scrollPercentage * 0.5;
        element.style.filter = `blur(${(1 - scrollPercentage) * 5}px)`;
      }
    });
  },
  
  generateRandomBlobPath(numPoints, radius, irregularity) {
    const angleStep = (Math.PI * 2) / numPoints;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep;
      const radiusVariation = 1 + (Math.random() - 0.5) * irregularity;
      const x = Math.cos(angle) * radius * radiusVariation;
      const y = Math.sin(angle) * radius * radiusVariation;
      points.push([x, y]);
    }
    
    // Create SVG path string
    let pathData = `M ${points[0][0]},${points[0][1]}`;
    
    for (let i = 0; i < points.length; i++) {
      const nextPointIndex = (i + 1) % points.length;
      const cpDistance = this.distance(points[i], points[nextPointIndex]) / 3;
      
      const cp1x = points[i][0] + cpDistance * Math.cos(i * angleStep + Math.PI / 4);
      const cp1y = points[i][1] + cpDistance * Math.sin(i * angleStep + Math.PI / 4);
      
      const cp2x = points[nextPointIndex][0] - cpDistance * Math.cos((i + 1) * angleStep + Math.PI / 4);
      const cp2y = points[nextPointIndex][1] - cpDistance * Math.sin((i + 1) * angleStep + Math.PI / 4);
      
      pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${points[nextPointIndex][0]},${points[nextPointIndex][1]}`;
    }
    
    return pathData + ' Z';
  },
  
  distance(p1, p2) {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
  },
  
  createBlobAnimation(container, options = {}) {
    const {
      count = 3,
      baseRadius = 100,
      colors = ['#ff00ff', '#00ffff', '#ffff00', '#98e600'],
      animationDuration = 10,
      irregularity = 0.5
    } = options;
    
    // Make container position relative if it's not already
    if (getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }
    
    const blobs = [];
    
    for (let i = 0; i < count; i++) {
      const blobSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      blobSvg.setAttribute('viewBox', '-150 -150 300 300');
      blobSvg.classList.add('blob-svg');
      blobSvg.style.position = 'absolute';
      blobSvg.style.top = '0';
      blobSvg.style.left = '0';
      blobSvg.style.width = '100%';
      blobSvg.style.height = '100%';
      blobSvg.style.pointerEvents = 'none';
      blobSvg.style.zIndex = '0';
      
      const blob = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      blob.setAttribute('fill', colors[i % colors.length]);
      blob.setAttribute('opacity', '0.5');
      
      blobSvg.appendChild(blob);
      container.appendChild(blobSvg);
      
      blobs.push({
        element: blob,
        pathPoints: Math.floor(5 + Math.random() * 5),
        radius: baseRadius * (0.8 + Math.random() * 0.4),
        animationOffset: Math.random() * animationDuration
      });
    }
    
    // Animation loop
    const that = this;
    function animate() {
      const time = performance.now() / 1000;
      
      blobs.forEach(blob => {
        const progress = ((time + blob.animationOffset) % animationDuration) / animationDuration;
        const currentIrregularity = irregularity * (0.5 + Math.sin(progress * Math.PI * 2) * 0.5);
        
        blob.element.setAttribute('d', that.generateRandomBlobPath(
          blob.pathPoints,
          blob.radius,
          currentIrregularity
        ));
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return {
      blobs,
      container
    };
  }
};