/**
 * 3D Cube Video Environment using Three.js
 *
 * This module creates an immersive 3D environment where videos are displayed
 * on a cube that can be rotated and interacted with in 3D space.
 */

class VideoCubeEnvironment {
  constructor(containerId) {
    this.containerId = containerId;
    this.container = document.getElementById(containerId);

    if (!this.container) {
      console.error(`Container with ID ${containerId} not found`);
      return;
    }

    // Set container for relative positioning
    if (getComputedStyle(this.container).position === 'static') {
      this.container.style.position = 'relative';
    }

    // Initialize scene properties
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.cube = null;
    this.videoTextures = [];
    this.videos = [];
    this.raycaster = null;
    this.mouse = null;
    this.isRotating = true;
    this.rotationSpeed = 0.005;
    this.initialized = false;

    // Pre-load Three.js dependency
    this.loadThreeJS();
  }

  async loadThreeJS() {
    try {
      // Check if Three.js is already available
      if (typeof THREE === 'undefined') {
        // Create script element to load Three.js
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';
        threeScript.async = true;

        // Create script for OrbitControls
        const orbitControlsScript = document.createElement('script');
        orbitControlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js';
        orbitControlsScript.async = true;

        // Wait for scripts to load
        await new Promise((resolve) => {
          threeScript.onload = () => {
            document.head.appendChild(orbitControlsScript);
            orbitControlsScript.onload = resolve;
          };
          document.head.appendChild(threeScript);
        });
      }

      // Initialize the environment
      this.init();
    } catch (error) {
      console.error('Failed to load Three.js dependencies:', error);
    }
  }

  init() {
    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Add the renderer to the container
    this.container.appendChild(this.renderer.domElement);

    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0b10);

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      60, // Field of view
      this.container.clientWidth / this.container.clientHeight, // Aspect ratio
      0.1, // Near clipping plane
      1000 // Far clipping plane
    );
    this.camera.position.z = 5;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    this.scene.add(directionalLight);

    // Add point lights with different colors for psychedelic effect
    const colors = [0xff00ff, 0x00ffff, 0xffff00, 0x98e600];
    colors.forEach((color, index) => {
      const pointLight = new THREE.PointLight(color, 0.5);
      const angle = (index / colors.length) * Math.PI * 2;
      const radius = 5;
      pointLight.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        2
      );
      this.scene.add(pointLight);
    });

    // Setup raycaster for interaction
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Create orbit controls
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;

    // Add event listeners
    this.setupEventListeners();

    // Add resize handler
    window.addEventListener('resize', () => this.onWindowResize());

    this.initialized = true;

    // Start animation loop
    this.animate();
  }

  createCube(videoUrls) {
    // Remove existing cube if any
    if (this.cube) {
      this.scene.remove(this.cube);
    }

    // Clean up existing video elements
    this.videos.forEach(video => {
      video.pause();
      video.remove();
    });

    // Reset arrays
    this.videos = [];
    this.videoTextures = [];

    // Create a cube with video textures
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const materials = [];

    // Create video textures for each face (up to 6)
    const facesToFill = Math.min(6, videoUrls.length);
    for (let i = 0; i < facesToFill; i++) {
      const videoElement = document.createElement('video');
      videoElement.src = videoUrls[i];
      videoElement.crossOrigin = 'anonymous';
      videoElement.loop = true;
      videoElement.muted = true;
      videoElement.playsInline = true;

      // Store video element for later control
      this.videos.push(videoElement);

      // Create texture from video
      const videoTexture = new THREE.VideoTexture(videoElement);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;

      // Store texture
      this.videoTextures.push(videoTexture);

      // Create material with video texture
      const material = new THREE.MeshStandardMaterial({
        map: videoTexture,
        side: THREE.FrontSide,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: videoTexture,
        emissiveIntensity: 0.5
      });

      materials.push(material);
    }

    // Fill remaining faces with trippy materials if needed
    for (let i = facesToFill; i < 6; i++) {
      // Create procedural trippy textures for any missing faces
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');

      // Create a trippy pattern on the canvas
      const gradient = ctx.createRadialGradient(
        256, 256, 0,
        256, 256, 400
      );

      // Use psychedelic colors
      gradient.addColorStop(0, `hsl(${i * 60}, 100%, 50%)`);
      gradient.addColorStop(0.5, `hsl(${(i * 60 + 30) % 360}, 100%, 70%)`);
      gradient.addColorStop(1, `hsl(${(i * 60 + 60) % 360}, 100%, 50%)`);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 512, 512);

      // Draw some trippy patterns
      ctx.strokeStyle = `hsl(${(i * 60 + 180) % 360}, 100%, 50%)`;
      ctx.lineWidth = 2;

      for (let j = 0; j < 20; j++) {
        const radius = j * 20;
        ctx.beginPath();
        ctx.arc(256, 256, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(0xffffff),
        emissiveMap: texture,
        emissiveIntensity: 0.5
      });

      materials.push(material);
    }

    // Create cube with materials
    this.cube = new THREE.Mesh(geometry, materials);
    this.cube.position.set(0, 0, 0);
    this.cube.castShadow = true;
    this.cube.receiveShadow = true;

    // Add cube to scene
    this.scene.add(this.cube);

    // Play all videos
    this.videos.forEach(video => {
      video.play().catch(error => {
        console.warn('Auto-play prevented:', error);
      });
    });
  }

  setupEventListeners() {
    // Mouse move event for interaction
    this.container.addEventListener('mousemove', (event) => {
      // Calculate mouse position in normalized device coordinates (-1 to +1)
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    });

    // Click event for interacting with the cube faces
    this.container.addEventListener('click', () => {
      if (!this.cube) return;

      // Update the raycaster with the camera and mouse position
      this.raycaster.setFromCamera(this.mouse, this.camera);

      // Find intersections with the cube
      const intersects = this.raycaster.intersectObject(this.cube);

      if (intersects.length > 0) {
        // Get the face index that was clicked
        const faceIndex = Math.floor(intersects[0].faceIndex / 2);

        // If we have a video for this face
        if (faceIndex < this.videos.length) {
          const video = this.videos[faceIndex];

          // Toggle play/pause
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        }
      }
    });

    // Toggle rotation on space key
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Space') {
        this.isRotating = !this.isRotating;
        event.preventDefault();
      }
    });
  }

  onWindowResize() {
    if (!this.initialized) return;

    // Update camera aspect ratio
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();

    // Update renderer size
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  animate() {
    if (!this.initialized) return;

    requestAnimationFrame(() => this.animate());

    // Update controls
    this.controls.update();

    // Rotate cube if enabled
    if (this.cube && this.isRotating) {
      this.cube.rotation.x += this.rotationSpeed;
      this.cube.rotation.y += this.rotationSpeed * 1.5;
    }

    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  // Public method to set videos
  setVideos(videoUrls) {
    if (!this.initialized) {
      // If not initialized yet, wait and try again
      setTimeout(() => this.setVideos(videoUrls), 500);
      return;
    }

    this.createCube(videoUrls);
  }

  // Control rotation speed
  setRotationSpeed(speed) {
    this.rotationSpeed = speed;
  }

  // Toggle rotation
  toggleRotation(isRotating) {
    this.isRotating = isRotating;
  }
}

// Create and export the cube environment
window.createVideoCubeEnvironment = (containerId) => {
  return new VideoCubeEnvironment(containerId);
};