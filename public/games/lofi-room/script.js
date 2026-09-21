// Lo-Fi 3D Room with Procedural Generation
let scene, camera, renderer;
let room = {};
let animationFrameId;
let timeOfDay = 0.5; // 0 (night) to 1 (day)
let isPlaying = false;
let audioContext;
let oscillator;
let youtubePlayer;
let cloudMode = false; // Track if indoor clouds are enabled
let cloudAnimationState = {
  colorTransition: 0,
  baseColors: [0x9090FF, 0xFFB0B0, 0xF0F8FF, 0xFFD0A0],
  colorSpeed: 0.001
};
let lampAmbientMode = false; // Track if lamp is in ambient color mode
let plantLeaves = []; // Store references to plant leaves for animation
let audioAnalyser; // For analyzing audio frequencies
let audioDataArray; // For storing audio data
// Movement controls
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let playerVelocity = new THREE.Vector3();
let speed = 0.05;
let cameraHeight = 1.6;
// Mouse look controls
let isPointerLocked = false;
let mouseX = 0;
let mouseY = 0;
let yawObject = new THREE.Object3D();
let pitchObject = new THREE.Object3D();
let minPolarAngle = 0; // radians
let maxPolarAngle = Math.PI; // radians
let mouseLookActive = false; // Track whether mouse look is active
let pointerLocked = false; // Track if pointer is locked

function init() {
  // Setup scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a2a2a);
  
  // Setup camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
  // Setup mouse look controls
  pitchObject.add(camera);
  yawObject.add(pitchObject);
  yawObject.position.set(0, 1.6, 4);
  scene.add(yawObject);
  
  // Setup renderer
  renderer = new THREE.WebGLRenderer({ 
    canvas: document.getElementById('scene'),
    antialias: true 
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  
  // Create Room
  createRoom();
  
  // Add lighting
  setupLighting();
  
  // Add window and view
  createWindow();
  
  // Add furniture
  createFurniture();
  
  // Add decorations
  createDecorations();
  
  // Add large plant
  createLargePlant();
  
  // Event listeners
  window.addEventListener('resize', onWindowResize);
  document.getElementById('toggleMusic').addEventListener('click', toggleMusic);
  document.getElementById('timeSlider').addEventListener('input', (e) => {
    timeOfDay = e.target.value / 100;
    updateLighting();
  });
  document.getElementById('toggleClouds').addEventListener('click', toggleClouds);
  document.getElementById('toggleLamp').addEventListener('click', toggleLampMode);
  
  // Add movement controls
  setupMovementControls();
  
  // Setup mouse controls
  setupMouseControls();
  
  // Start animation loop
  animate();
}

function createRoom() {
  // Room dimensions
  const width = 8;
  const height = 4;
  const depth = 8;
  
  // Floor
  const floorGeometry = new THREE.PlaneGeometry(width, depth);
  const floorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x8A56AC,  
    roughness: 0.8 
  });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  room.floor = floor;
  
  // Walls
  const wallMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xEAE6E1,
    roughness: 0.7 
  });
  
  // Back wall
  const backWallGeometry = new THREE.PlaneGeometry(width, height);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.z = -depth/2;
  backWall.position.y = height/2;
  backWall.receiveShadow = true;
  scene.add(backWall);
  
  // Left wall
  const leftWallGeometry = new THREE.PlaneGeometry(depth, height);
  const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
  leftWall.position.x = -width/2;
  leftWall.position.y = height/2;
  leftWall.rotation.y = Math.PI / 2;
  leftWall.receiveShadow = true;
  scene.add(leftWall);
  
  // Right wall
  const rightWallGeometry = new THREE.PlaneGeometry(depth, height);
  const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
  rightWall.position.x = width/2;
  rightWall.position.y = height/2;
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.receiveShadow = true;
  scene.add(rightWall);
  
  // Front wall (with door)
  // Create front wall in two parts (left and right of door)
  const doorWidth = 1.5;
  const doorHeight = 2.5;
  
  // Left part of front wall
  const frontWallLeftGeometry = new THREE.PlaneGeometry((width - doorWidth) / 2, height);
  const frontWallLeft = new THREE.Mesh(frontWallLeftGeometry, wallMaterial);
  frontWallLeft.position.z = depth/2;
  frontWallLeft.position.x = -(doorWidth / 2 + (width - doorWidth) / 4);
  frontWallLeft.position.y = height/2;
  frontWallLeft.rotation.y = Math.PI;
  frontWallLeft.receiveShadow = true;
  scene.add(frontWallLeft);
  
  // Right part of front wall
  const frontWallRightGeometry = new THREE.PlaneGeometry((width - doorWidth) / 2, height);
  const frontWallRight = new THREE.Mesh(frontWallRightGeometry, wallMaterial);
  frontWallRight.position.z = depth/2;
  frontWallRight.position.x = (doorWidth / 2 + (width - doorWidth) / 4);
  frontWallRight.position.y = height/2;
  frontWallRight.rotation.y = Math.PI;
  frontWallRight.receiveShadow = true;
  scene.add(frontWallRight);
  
  // Top part of front wall (above door)
  const frontWallTopGeometry = new THREE.PlaneGeometry(doorWidth, height - doorHeight);
  const frontWallTop = new THREE.Mesh(frontWallTopGeometry, wallMaterial);
  frontWallTop.position.z = depth/2;
  frontWallTop.position.y = doorHeight + (height - doorHeight) / 2;
  frontWallTop.rotation.y = Math.PI;
  frontWallTop.receiveShadow = true;
  scene.add(frontWallTop);
  
  // Create door
  const doorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x5D4A3E,
    roughness: 0.6 
  });
  
  const doorGeometry = new THREE.PlaneGeometry(doorWidth, doorHeight);
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.z = depth/2 - 0.05; // Slightly offset to avoid z-fighting
  door.position.y = doorHeight / 2;
  door.rotation.y = Math.PI;
  door.receiveShadow = true;
  scene.add(door);
  
  // Door handle
  const handleMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xB0B0B0,
    metalness: 0.8,
    roughness: 0.2 
  });
  
  const handleGeometry = new THREE.SphereGeometry(0.06, 16, 16);
  const handle = new THREE.Mesh(handleGeometry, handleMaterial);
  handle.position.z = depth/2 - 0.1;
  handle.position.y = doorHeight / 2;
  handle.position.x = doorWidth / 2 - 0.2;
  scene.add(handle);
  
  // Ceiling
  const ceilingGeometry = new THREE.PlaneGeometry(width, depth);
  const ceilingMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xE5E2DF,
    roughness: 0.8 
  });
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.position.y = height;
  ceiling.rotation.x = Math.PI / 2;
  ceiling.receiveShadow = true;
  scene.add(ceiling);
}

function setupLighting() {
  // Ambient light
  room.ambientLight = new THREE.AmbientLight(0xAEB7CA, 0.5);
  scene.add(room.ambientLight);
  
  // Main directional light (sun/moon)
  room.mainLight = new THREE.DirectionalLight(0xFFEAD1, 1);
  room.mainLight.position.set(5, 5, 5);
  room.mainLight.castShadow = true;
  room.mainLight.shadow.mapSize.width = 1024;
  room.mainLight.shadow.mapSize.height = 1024;
  scene.add(room.mainLight);
  
  // Desk lamp light
  room.lampLight = new THREE.PointLight(0xFFD6AA, 0.8, 5);
  room.lampLight.position.set(-2, 1.5, -1);
  room.lampLight.castShadow = true;
  scene.add(room.lampLight);
  
  updateLighting();
}

function updateLighting() {
  // Update ambient light based on time of day
  const ambientIntensity = 0.2 + timeOfDay * 0.4;
  room.ambientLight.intensity = ambientIntensity;
  
  // Update main light color and intensity
  if (timeOfDay < 0.1) {
    // Night - moonlight (blue)
    room.mainLight.color.set(0x8AABFF);
    room.mainLight.intensity = 0.1;
  } else if (timeOfDay < 0.3) {
    // Dawn - soft orange
    room.mainLight.color.set(0xFFB87F);
    room.mainLight.intensity = 0.5;
  } else if (timeOfDay < 0.7) {
    // Day - warm sunlight
    room.mainLight.color.set(0xFFEAD1);
    room.mainLight.intensity = 1;
  } else if (timeOfDay < 0.9) {
    // Dusk - deep orange
    room.mainLight.color.set(0xFF9956);
    room.mainLight.intensity = 0.5;
  } else {
    // Night again
    room.mainLight.color.set(0x8AABFF);
    room.mainLight.intensity = 0.1;
  }
  
  // Lamp is brighter at night
  room.lampLight.intensity = 0.4 + (1 - timeOfDay) * 0.8;
  
  // Update window visualization based on time of day
  updateWindowView();
  updateIndoorClouds();
}

function updateWindowView() {
  if (!room.windowGlass) return;
  
  // Update sky color based on time of day
  if (timeOfDay < 0.2) {
    // Night - dark blue
    room.windowGlass.material.color.set(0x0A1A3F);
  } else if (timeOfDay < 0.3) {
    // Dawn - purple-blue
    room.windowGlass.material.color.set(0x614D7E);
  } else if (timeOfDay < 0.5) {
    // Morning - light blue
    room.windowGlass.material.color.set(0x88A8FF);
  } else if (timeOfDay < 0.7) {
    // Midday - bright blue
    room.windowGlass.material.color.set(0x5D9FFF);
  } else if (timeOfDay < 0.9) {
    // Dusk - orange-purple
    room.windowGlass.material.color.set(0xA05F7F);
  } else {
    // Night - dark blue
    room.windowGlass.material.color.set(0x0A1A3F);
  }
  
  // Update cloud appearance
  if (room.clouds) {
    room.clouds.forEach(cloud => {
      // Cloud visibility and color varies with time of day
      if (timeOfDay < 0.2 || timeOfDay > 0.9) {
        // Night - clouds barely visible
        cloud.mesh.children.forEach(particle => {
          particle.material.opacity = 0.2;
          particle.material.color.set(0x3A3A5C);
        });
      } else if (timeOfDay < 0.3 || timeOfDay > 0.8) {
        // Dawn/Dusk - pink/orange tinted clouds
        cloud.mesh.children.forEach(particle => {
          particle.material.opacity = 0.5;
          particle.material.color.set(timeOfDay < 0.3 ? 0xFFA08F : 0xFFB26B);
        });
      } else {
        // Day - white fluffy clouds
        cloud.mesh.children.forEach(particle => {
          particle.material.opacity = 0.7;
          particle.material.color.set(0xFFFFFF);
        });
      }
    });
  }
}

function createWindow() {
  // Window frame
  const windowWidth = 2.5;
  const windowHeight = 2;
  
  const windowFrameMaterial = new THREE.MeshStandardMaterial({
    color: 0x4E4A46,
    roughness: 0.7
  });
  
  const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.1);
  const windowFrame = new THREE.Mesh(windowGeometry, windowFrameMaterial);
  windowFrame.position.set(0, 2, -3.95);
  scene.add(windowFrame);
  
  // Window glass - create procedural sky
  const glassGeometry = new THREE.PlaneGeometry(windowWidth - 0.1, windowHeight - 0.1);
  const glassMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x88A8FF,
    transparent: true,
    opacity: 0.9
  });
  
  const glass = new THREE.Mesh(glassGeometry, glassMaterial);
  glass.position.set(0, 2, -3.9);
  scene.add(glass);
  room.windowGlass = glass;
  
  // Add procedural clouds
  createClouds(glass);
}

function createClouds(windowPane) {
  const clouds = [];
  
  // Create 5-8 procedural clouds
  const cloudCount = 5 + Math.floor(Math.random() * 4);
  
  // Create a masking plane that exactly fits the window
  const maskGeometry = new THREE.PlaneGeometry(windowPane.geometry.parameters.width, windowPane.geometry.parameters.height);
  const maskMaterial = new THREE.MeshBasicMaterial({ 
    colorWrite: false, // Don't color, just use for depth testing
    depthWrite: true,
    depthTest: true
  });
  const mask = new THREE.Mesh(maskGeometry, maskMaterial);
  mask.position.set(0, 0, 0.001); // Slightly in front of the window
  windowPane.add(mask);
  
  for (let i = 0; i < cloudCount; i++) {
    // Cloud position and size
    const cloudX = (Math.random() - 0.5) * 2;
    const cloudY = (Math.random() - 0.5) * 1.5;
    const cloudSize = 0.1 + Math.random() * 0.15;
    
    // Cloud shape - group of circles
    const cloudGroup = new THREE.Group();
    const cloudParticleCount = 3 + Math.floor(Math.random() * 4);
    const cloudColor = new THREE.Color(0xffffff);
    
    for (let j = 0; j < cloudParticleCount; j++) {
      const particleSize = cloudSize * (0.7 + Math.random() * 0.5);
      const particleX = (Math.random() - 0.5) * cloudSize * 2;
      const particleY = (Math.random() - 0.5) * cloudSize;
      
      const particleGeometry = new THREE.CircleGeometry(particleSize, 12);
      const particleMaterial = new THREE.MeshBasicMaterial({
        color: cloudColor,
        transparent: true,
        opacity: 0.7,
        // Make cloud particles respect the window boundaries
        depthTest: true 
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(particleX, particleY, 0.02); // Slightly in front of the mask
      cloudGroup.add(particle);
    }
    
    cloudGroup.position.set(cloudX, cloudY, 0);
    windowPane.add(cloudGroup);
    
    // Store cloud with a random speed for animation
    clouds.push({
      mesh: cloudGroup,
      speed: 0.0002 + Math.random() * 0.0004,
      direction: Math.random() > 0.5 ? 1 : -1
    });
  }
  
  room.clouds = clouds;
  
  // Initialize cloud appearance based on current time of day
  updateWindowView();
}

function createFurniture() {
  // Create a desk
  const deskWidth = 3;
  const deskDepth = 1.5;
  const deskHeight = 0.8;
  
  const deskMaterial = new THREE.MeshStandardMaterial({
    color: 0x5D4A3E,
    roughness: 0.6
  });
  
  const deskGeometry = new THREE.BoxGeometry(deskWidth, deskHeight, deskDepth);
  const desk = new THREE.Mesh(deskGeometry, deskMaterial);
  desk.position.set(-1.5, deskHeight/2, -2.5);
  desk.castShadow = true;
  desk.receiveShadow = true;
  scene.add(desk);
  
  // Create desk chair
  const chairMaterial = new THREE.MeshStandardMaterial({
    color: 0x363636,
    roughness: 0.8
  });
  
  // Chair seat
  const seatGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.8);
  const seat = new THREE.Mesh(seatGeometry, chairMaterial);
  seat.position.set(-1.5, 0.5, -1.2);
  seat.castShadow = true;
  scene.add(seat);
  
  // Chair back
  const backGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.1);
  const back = new THREE.Mesh(backGeometry, chairMaterial);
  back.position.set(-1.5, 0.9, -0.85); 
  back.castShadow = true;
  scene.add(back);
  
  // Create a bed
  const bedMaterial = new THREE.MeshStandardMaterial({
    color: 0x3D5A80,
    roughness: 0.8
  });
  
  const bedBaseGeometry = new THREE.BoxGeometry(2, 0.4, 3);
  const bedBase = new THREE.Mesh(bedBaseGeometry, bedMaterial);
  bedBase.position.set(3, 0.2, -1.5);  
  bedBase.castShadow = true;
  bedBase.receiveShadow = true;
  scene.add(bedBase);
  
  const mattressGeometry = new THREE.BoxGeometry(1.9, 0.2, 2.9);
  const mattress = new THREE.Mesh(mattressGeometry, bedMaterial);
  mattress.position.set(3, 0.5, -1.5);  
  mattress.castShadow = true;
  scene.add(mattress);
  
  // Create pillow
  const pillowGeometry = new THREE.BoxGeometry(0.8, 0.15, 0.5);
  const pillowMaterial = new THREE.MeshStandardMaterial({
    color: 0xD6E2E0,
    roughness: 0.5
  });
  const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
  pillow.position.set(3, 0.65, -2.7);  
  pillow.castShadow = true;
  scene.add(pillow);
  
  // Create a small bookshelf
  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: 0x625750,
    roughness: 0.7
  });
  
  const shelfUnitGeometry = new THREE.BoxGeometry(1.2, 2, 0.5);
  const shelfUnit = new THREE.Mesh(shelfUnitGeometry, shelfMaterial);
  shelfUnit.position.set(3, 1, -3.5);
  shelfUnit.castShadow = true;
  scene.add(shelfUnit);
  
  // Add a few books on the shelf (simple colored boxes)
  const bookColors = [0xE63946, 0x457B9D, 0xF1FAEE, 0xA8DADC, 0x1D3557];
  for (let i = 0; i < 6; i++) {
    const bookHeight = 0.2 + Math.random() * 0.1;
    const bookWidth = 0.05 + Math.random() * 0.05;
    const bookDepth = 0.2 + Math.random() * 0.1;
    
    const bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
    const bookMaterial = new THREE.MeshStandardMaterial({
      color: bookColors[Math.floor(Math.random() * bookColors.length)],
      roughness: 0.7
    });
    
    const book = new THREE.Mesh(bookGeometry, bookMaterial);
    
    // Position books on different shelves
    let shelfY;
    if (i < 2) shelfY = 0.4;
    else if (i < 4) shelfY = 1.0;
    else shelfY = 1.6;
    
    book.position.set(
      3 - 0.2 + (i % 2) * 0.2,
      shelfY,
      -3.3
    );
    
    book.rotation.y = Math.random() * 0.2 - 0.1;
    book.castShadow = true;
    scene.add(book);
  }
}

function createDecorations() {
  // Create a desk lamp
  const lampBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x2F2F2F,
    roughness: 0.8
  });
  
  // Lamp base
  const lampBaseGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
  const lampBase = new THREE.Mesh(lampBaseGeometry, lampBaseMaterial);
  lampBase.position.set(-2, 0.85, -2);
  lampBase.castShadow = true;
  scene.add(lampBase);
  
  // Lamp neck
  const lampNeckGeometry = new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8);
  const lampNeck = new THREE.Mesh(lampNeckGeometry, lampBaseMaterial);
  lampNeck.position.set(-2, 1.1, -2);
  lampNeck.castShadow = true;
  scene.add(lampNeck);
  
  // Lamp shade
  const lampShadeMaterial = new THREE.MeshStandardMaterial({
    color: 0xF2CC8F,
    roughness: 0.5,
    emissive: 0xF2CC8F,
    emissiveIntensity: 0.5
  });
  
  const lampShadeGeometry = new THREE.ConeGeometry(0.2, 0.25, 16, 1, true);
  const lampShade = new THREE.Mesh(lampShadeGeometry, lampShadeMaterial);
  lampShade.position.set(-2, 1.4, -2);
  lampShade.rotation.x = Math.PI;
  lampShade.castShadow = true;
  scene.add(lampShade);
  
  // Store lampshade reference
  room.lampShade = lampShade;
  
  // Add a small plant
  const potMaterial = new THREE.MeshStandardMaterial({
    color: 0xA85751,
    roughness: 0.8
  });
  
  // Plant pot
  const potGeometry = new THREE.CylinderGeometry(0.15, 0.1, 0.2, 16);
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.set(-0.5, 0.9, -2);
  pot.castShadow = true;
  scene.add(pot);
  
  // Plant soil
  const soilGeometry = new THREE.CylinderGeometry(0.14, 0.14, 0.05, 16);
  const soilMaterial = new THREE.MeshStandardMaterial({
    color: 0x3A2E1D,
    roughness: 1
  });
  const soil = new THREE.Mesh(soilGeometry, soilMaterial);
  soil.position.set(-0.5, 1, -2);
  scene.add(soil);
  
  // Create plant leaves
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x639A67,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  
  for (let i = 0; i < 5; i++) {
    const leafGeometry = new THREE.CircleGeometry(0.1, 5);
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    
    const angle = (i / 5) * Math.PI * 2;
    const radius = 0.1;
    
    leaf.position.set(
      -0.5 + Math.cos(angle) * radius,
      1.05 + Math.random() * 0.15,
      -2 + Math.sin(angle) * radius
    );
    
    leaf.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.5;
    leaf.rotation.y = Math.random() * Math.PI * 2;
    leaf.rotation.z = (Math.random() - 0.5) * 0.5;
    
    leaf.castShadow = true;
    scene.add(leaf);
  }
  
  // Add a laptop on the desk
  const laptopBaseMaterial = new THREE.MeshStandardMaterial({
    color: 0x2C3E50,
    roughness: 0.5
  });
  
  // Laptop base
  const laptopBaseGeometry = new THREE.BoxGeometry(0.6, 0.02, 0.4);
  const laptopBase = new THREE.Mesh(laptopBaseGeometry, laptopBaseMaterial);
  laptopBase.position.set(-1.2, 0.81, -2.2);
  laptopBase.castShadow = true;
  scene.add(laptopBase);
  
  // Laptop screen
  const laptopScreenGeometry = new THREE.BoxGeometry(0.6, 0.4, 0.02);
  const laptopScreenMaterial = new THREE.MeshStandardMaterial({
    color: 0x2C3E50,
    roughness: 0.5
  });
  const laptopScreen = new THREE.Mesh(laptopScreenGeometry, laptopScreenMaterial);
  laptopScreen.position.set(-1.2, 1.01, -2.4);
  laptopScreen.rotation.x = -Math.PI / 6;
  laptopScreen.castShadow = true;
  scene.add(laptopScreen);
  
  // Laptop screen display
  const displayGeometry = new THREE.PlaneGeometry(0.55, 0.35);
  const displayMaterial = new THREE.MeshBasicMaterial({
    color: 0x3498DB,
    emissive: 0x3498DB,
    emissiveIntensity: 0.5
  });
  const display = new THREE.Mesh(displayGeometry, displayMaterial);
  display.position.set(0, 0, 0.011);
  laptopScreen.add(display);
}

function createLargePlant() {
  // Create a large potted plant for the left wall
  const potMaterial = new THREE.MeshStandardMaterial({
    color: 0x7D5A4F,
    roughness: 0.8
  });
  
  // Large plant pot
  const potGeometry = new THREE.CylinderGeometry(0.5, 0.4, 0.8, 16);
  const pot = new THREE.Mesh(potGeometry, potMaterial);
  pot.position.set(-3.5, 0.4, 0.8); // Position further from left wall
  pot.castShadow = true;
  scene.add(pot);
  
  // Plant soil
  const soilGeometry = new THREE.CylinderGeometry(0.48, 0.48, 0.1, 16);
  const soilMaterial = new THREE.MeshStandardMaterial({
    color: 0x3A2E1D,
    roughness: 1
  });
  const soil = new THREE.Mesh(soilGeometry, soilMaterial);
  soil.position.set(-3.5, 0.85, 0.8);
  scene.add(soil);
  
  // Plant stem
  const stemGeometry = new THREE.CylinderGeometry(0.08, 0.12, 2.2, 8);
  const stemMaterial = new THREE.MeshStandardMaterial({
    color: 0x556B2F,
    roughness: 0.8
  });
  const stem = new THREE.Mesh(stemGeometry, stemMaterial);
  stem.position.set(-3.5, 2, 0.8);
  stem.castShadow = true;
  scene.add(stem);
  
  // Create large round leaves
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x2E8B57,
    roughness: 0.7,
    side: THREE.DoubleSide
  });
  
  // Add multiple large leaves at different positions and angles
  for (let i = 0; i < 12; i++) { // Increased from 7 to 12 leaves
    const leafSize = 0.4 + Math.random() * 0.3;
    const leafGeometry = new THREE.CircleGeometry(leafSize, 12);
    const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
    
    const angle = (i / 12) * Math.PI * 2;
    const heightOffset = 0.4 + i * 0.15; // Adjusted distribution
    const radius = 0.3 + Math.random() * 0.3; // Increased max radius
    
    // Position leaf around the stem at different heights
    const leafPivot = new THREE.Group();
    leaf.position.set(radius, 0, 0);
    
    // Tilt the leaf for more natural look
    leaf.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.7; // Increased variation
    leaf.rotation.y = Math.random() * Math.PI * 2;
    leaf.rotation.z = (Math.random() - 0.5) * 0.4; // Increased variation
    
    leafPivot.add(leaf);
    leafPivot.position.set(-3.5, 1 + heightOffset, 0.8);
    leafPivot.rotation.y = angle;
    
    // Save initial rotation for animation
    leafPivot.userData = {
      baseRotation: leafPivot.rotation.y,
      baseLeafRotation: leaf.rotation.z,
      animPhase: Math.random() * Math.PI * 2,
      animSpeed: 0.5 + Math.random() * 0.5,
      amplitude: 0.03 + Math.random() * 0.05
    };
    
    leafPivot.castShadow = true;
    scene.add(leafPivot);
    
    // Store reference to leaf for animation
    plantLeaves.push({ 
      pivot: leafPivot, 
      leaf: leaf 
    });
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function toggleMusic() {
  const button = document.getElementById('toggleMusic');
  
  if (!isPlaying) {
    // Setup audio analyzer if not already created
    if (!audioAnalyser && window.YT && youtubePlayer) {
      setupAudioAnalyser();
    }
    
    // Create YouTube player if it doesn't exist yet
    if (!youtubePlayer) {
      // Create a hidden YouTube player
      const playerDiv = document.createElement('div');
      playerDiv.id = 'youtubePlayer';
      playerDiv.style.position = 'absolute';
      playerDiv.style.opacity = '0';
      playerDiv.style.pointerEvents = 'none';
      document.getElementById('container').appendChild(playerDiv);
      
      // Initialize YouTube API
      if (!window.YT) {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        window.onYouTubeIframeAPIReady = function() {
          createYouTubePlayer();
        };
      } else {
        createYouTubePlayer();
      }
    } else {
      // If player exists already, just play it
      youtubePlayer.playVideo();
    }
    
    isPlaying = true;
    button.textContent = 'Stop Music';
  } else {
    // Stop music
    if (youtubePlayer) {
      youtubePlayer.pauseVideo();
    }
    
    isPlaying = false;
    button.textContent = 'Play Music';
  }
}

function createYouTubePlayer() {
  youtubePlayer = new YT.Player('youtubePlayer', {
    height: '1',
    width: '1',
    videoId: 'IuiGQ4w-cHo', 
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'mute': 0,
      'loop': 1
    },
    events: {
      'onReady': function(event) {
        event.target.playVideo();
        setupAudioAnalyser();
      }
    }
  });
}

// Setup audio analyser to extract beat information
function setupAudioAnalyser() {
  try {
    // Create audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create analyzer for visualizing audio data
    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.fftSize = 32; // Small size for basic beat detection
    
    // Connect an audio source from the YouTube video element
    // This is a hacky way since we can't directly access YouTube's audio stream
    // We'll use audio from video element
    const videoElement = document.querySelector('#youtubePlayer iframe');
    if (videoElement) {
      // Try to create a fake audio element that captures audio
      // This is not perfect and may not work in all browsers
      const tempAudio = document.createElement('audio');
      tempAudio.src = 'about:blank';
      tempAudio.crossOrigin = 'anonymous';
      const source = audioContext.createMediaElementSource(tempAudio);
      source.connect(audioAnalyser);
      audioAnalyser.connect(audioContext.destination);
      
      // Create data array for audio analysis
      audioDataArray = new Uint8Array(audioAnalyser.frequencyBinCount);
    }
  } catch (error) {
    console.log("Audio analyser couldn't be created:", error);
    // Create a fake audio data array for simulated beats
    audioDataArray = new Uint8Array(16);
  }
}

function toggleClouds() {
  const button = document.getElementById('toggleClouds');
  cloudMode = !cloudMode;
  
  if (cloudMode) {
    createIndoorClouds();
    button.classList.add('active');
    button.textContent = 'Remove Clouds';
  } else {
    removeIndoorClouds();
    button.classList.remove('active');
    button.textContent = 'Add Clouds';
  }
}

function createIndoorClouds() {
  // Remove existing indoor clouds if any
  removeIndoorClouds();
  
  // Create indoor clouds group
  room.indoorClouds = new THREE.Group();
  scene.add(room.indoorClouds);
  
  // Create 10-15 dreamy clouds floating below the ceiling
  const cloudCount = 10 + Math.floor(Math.random() * 6);
  const roomWidth = 8;
  const roomDepth = 8;
  const ceilingHeight = 3.7; // Just below the 4 unit ceiling height
  
  for (let i = 0; i < cloudCount; i++) {
    // Cloud position - distributed throughout the room
    const cloudX = (Math.random() - 0.5) * roomWidth * 0.8;
    const cloudY = ceilingHeight - Math.random() * 0.7; // Near ceiling
    const cloudZ = (Math.random() - 0.5) * roomDepth * 0.8;
    
    // Cloud shape - group of fluffy particles
    const cloudGroup = new THREE.Group();
    const cloudParticleCount = 5 + Math.floor(Math.random() * 5);
    
    // Initialize with current time-based color (will be updated in updateIndoorClouds)
    const startingColor = new THREE.Color(cloudAnimationState.baseColors[0]);
    
    for (let j = 0; j < cloudParticleCount; j++) {
      const particleSize = 0.2 + Math.random() * 0.3;
      const particleX = (Math.random() - 0.5) * 0.5;
      const particleY = (Math.random() - 0.5) * 0.2;
      const particleZ = (Math.random() - 0.5) * 0.5;
      
      const particleGeometry = new THREE.SphereGeometry(particleSize, 8, 8);
      const particleMaterial = new THREE.MeshStandardMaterial({
        color: startingColor,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.2,
        roughness: 1,
        emissive: startingColor,
        emissiveIntensity: 0.2
      });
      
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(particleX, particleY, particleZ);
      cloudGroup.add(particle);
    }
    
    cloudGroup.position.set(cloudX, cloudY, cloudZ);
    cloudGroup.userData = {
      initialY: cloudY,
      floatSpeed: 0.0005 + Math.random() * 0.0005,
      floatRange: 0.05 + Math.random() * 0.1,
      floatOffset: Math.random() * Math.PI * 2,
      spinSpeed: (Math.random() - 0.5) * 0.001
    };
    
    room.indoorClouds.add(cloudGroup);
  }
  
  // Initial update for cloud colors
  updateIndoorClouds();
}

function removeIndoorClouds() {
  if (room.indoorClouds) {
    scene.remove(room.indoorClouds);
    room.indoorClouds = null;
  }
}

function updateIndoorClouds() {
  if (!room.indoorClouds) return;
  
  // Update cloud colors with dynamic animation
  const time = Date.now() * 0.001;
  
  // Calculate transitioning colors based on time
  const transitionValue = (Math.sin(time * 0.2) + 1) * 0.5; // Value between 0-1
  
  // Calculate transitioning colors based on time
  const baseIndex = Math.floor(time * cloudAnimationState.colorSpeed) % cloudAnimationState.baseColors.length;
  const nextIndex = (baseIndex + 1) % cloudAnimationState.baseColors.length;
  
  const baseColor = new THREE.Color(cloudAnimationState.baseColors[baseIndex]);
  const nextColor = new THREE.Color(cloudAnimationState.baseColors[nextIndex]);
  const lerpedColor = new THREE.Color().lerpColors(baseColor, nextColor, transitionValue);
  
  // Add time of day influence
  if (timeOfDay < 0.2 || timeOfDay > 0.9) {
    // Night - more blue/purple
    lerpedColor.offsetHSL(0.1, 0, -0.1);
  } else if (timeOfDay < 0.3 || timeOfDay > 0.8) {
    // Dawn/Dusk - more pink/orange
    lerpedColor.offsetHSL(0.05, 0.1, 0.1);
  }
  
  room.indoorClouds.children.forEach((cloud, cloudIndex) => {
    // Individualize colors slightly for each cloud
    const individualColor = lerpedColor.clone().offsetHSL(
      (cloudIndex / room.indoorClouds.children.length) * 0.1, 
      0, 
      Math.sin(time + cloudIndex) * 0.05
    );
    
    cloud.children.forEach((particle, particleIndex) => {
      // Further individualize for particles within clouds
      const particleColor = individualColor.clone();
      // Pulse opacity based on time
      const opacityBase = 0.3 + 0.2 * Math.sin(time * 0.5 + cloudIndex * 0.2 + particleIndex * 0.1);
      particle.material.opacity = opacityBase;
      particle.material.color = particleColor;
      particle.material.emissive = particleColor;
      particle.material.emissiveIntensity = 0.2 + 0.1 * Math.sin(time + particleIndex);
    });
  });
}

function toggleLampMode() {
  const button = document.getElementById('toggleLamp');
  lampAmbientMode = !lampAmbientMode;
  
  if (lampAmbientMode) {
    button.classList.add('active');
    button.textContent = 'Normal Lamp';
  } else {
    button.classList.remove('active');
    button.textContent = 'Ambient Lamp';
    
    // Reset lamp to original color
    if (room.lampShade) {
      room.lampShade.material.color.set(0xF2CC8F);
      room.lampShade.material.emissive.set(0xF2CC8F);
      room.lampShade.material.emissiveIntensity = 0.5;
    }
    
    if (room.lampLight) {
      room.lampLight.color.set(0xFFD6AA);
    }
  }
}

function updateLampAmbientMode() {
  if (!lampAmbientMode || !room.lampShade || !room.lampLight) return;
  
  const time = Date.now() * 0.001;
  
  // Create smooth transitioning color effects
  // Use the specified colors: purple, cyan, green, orange, pink
  const lofiColors = [
    0x9370DB, // purple
    0x00FFFF, // cyan
    0x4BC963, // green
    0xFFA500, // orange
    0xFF69B4  // pink
  ];
  
  // Calculate transitioning between colors
  const colorSpeed = 0.05; // Slower speed for a more gradual fade
  const baseIndex = Math.floor(time * colorSpeed) % lofiColors.length;
  const nextIndex = (baseIndex + 1) % lofiColors.length;
  const t = (time * colorSpeed) % 1;
  
  const baseColor = new THREE.Color(lofiColors[baseIndex]);
  const nextColor = new THREE.Color(lofiColors[nextIndex]);
  
  // Smooth transition between colors
  const lerpedColor = new THREE.Color().lerpColors(baseColor, nextColor, t);
  
  // Apply to lamp shade
  room.lampShade.material.color.copy(lerpedColor);
  room.lampShade.material.emissive.copy(lerpedColor);
  room.lampShade.material.emissiveIntensity = 0.6 + 0.2 * Math.sin(time * 2);
  
  // Apply to lamp light with slightly brighter tone
  const lightColor = lerpedColor.clone().offsetHSL(0, 0, 0.2);
  room.lampLight.color.copy(lightColor);
  room.lampLight.intensity = 0.7 + 0.3 * Math.sin(time * 1.5);
}

function updatePlantAnimation() {
  if (!plantLeaves.length) return;
  
  // If audio analyzer isn't working, simulate beat for visual effect
  const time = Date.now() * 0.001;
  
  // Get audio data if available, or simulate if not
  let beatStrength = 0;
  
  if (audioAnalyser && audioDataArray && isPlaying) {
    try {
      audioAnalyser.getByteFrequencyData(audioDataArray);
      // Use lower frequencies for beat detection
      const bassRange = audioDataArray.slice(0, 4);
      const averageBass = bassRange.reduce((sum, value) => sum + value, 0) / bassRange.length;
      beatStrength = Math.min(1, averageBass / 200); // Normalize 0-1
    } catch (e) {
      // Fallback to simulation if error occurs
      beatStrength = (Math.sin(time * 2) * 0.5 + 0.5) * 0.4;
    }
  } else if (isPlaying) {
    // Simulate beats when playing but no analyzer
    beatStrength = (Math.sin(time * 2) * 0.5 + 0.5) * 0.4;
    // Add occasional stronger beats
    if (Math.sin(time * 0.5) > 0.8) beatStrength *= 1.5;
  }
  
  // Animate each leaf if music is playing, otherwise slowly return to rest position
  plantLeaves.forEach(plantLeaf => {
    const userData = plantLeaf.pivot.userData;
    
    if (isPlaying) {
      // Active animation when music is playing
      const leafPhase = time * userData.animSpeed + userData.animPhase;
      
      // Combine general sway with beat-influenced movement
      const swayAmount = Math.sin(leafPhase) * userData.amplitude;
      const beatAmount = beatStrength * 0.08 * Math.sin(leafPhase * 2);
      
      // Apply rotation to pivot (stem movement)
      plantLeaf.pivot.rotation.y = userData.baseRotation + swayAmount + beatAmount;
      
      // Apply rotation to leaf (leaf tilting)
      plantLeaf.leaf.rotation.z = userData.baseLeafRotation + swayAmount * 2 + beatAmount;
    } else {
      // Slowly return to resting position when not playing
      plantLeaf.pivot.rotation.y += (userData.baseRotation - plantLeaf.pivot.rotation.y) * 0.05;
      plantLeaf.leaf.rotation.z += (userData.baseLeafRotation - plantLeaf.leaf.rotation.z) * 0.05;
    }
  });
}

function setupMovementControls() {
  // Add keyboard event listeners
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  
  // Update instructions to the controls
  const instructions = document.createElement('div');
  instructions.innerHTML = 'Use WASD to move around the room<br>Hold mouse button to look around';
  instructions.classList.add('control-instructions');
  document.querySelector('.controls').prepend(instructions);
}

function setupMouseControls() {
  // Add mouse look controls
  const canvas = document.getElementById('scene');
  
  // Change to use pointer lock API for mouse look
  canvas.addEventListener('click', function(event) {
    if (!pointerLocked) {
      canvas.requestPointerLock = canvas.requestPointerLock || 
                                 canvas.mozRequestPointerLock ||
                                 canvas.webkitRequestPointerLock;
      canvas.requestPointerLock();
    }
  });
  
  // Add right-click to toggle fullscreen
  canvas.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    toggleFullscreen();
  });
  
  // Handle pointer lock change events
  document.addEventListener('pointerlockchange', onPointerLockChange, false);
  document.addEventListener('mozpointerlockchange', onPointerLockChange, false);
  document.addEventListener('webkitpointerlockchange', onPointerLockChange, false);
  
  canvas.addEventListener('mousemove', onMouseMove);
}

function onPointerLockChange() {
  // Check if we have pointer lock
  if (document.pointerLockElement === document.getElementById('scene') ||
      document.mozPointerLockElement === document.getElementById('scene') ||
      document.webkitPointerLockElement === document.getElementById('scene')) {
    // Pointer is locked, enable mouse look
    pointerLocked = true;
    mouseLookActive = true;
  } else {
    // Pointer is unlocked, disable mouse look
    pointerLocked = false;
    mouseLookActive = false;
  }
}

function onMouseMove(event) {
  // Only rotate if mouse look is active
  if (!mouseLookActive) return;
  
  const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
  const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
  
  yawObject.rotation.y -= movementX * 0.002;
  pitchObject.rotation.x -= movementY * 0.002;
  
  // Limit vertical rotation
  pitchObject.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitchObject.rotation.x));
}

function onKeyDown(event) {
  switch (event.code) {
    case 'KeyW':
      moveForward = true;
      break;
    case 'KeyS':
      moveBackward = true;
      break;
    case 'KeyA':
      moveRight = true;  
      break;
    case 'KeyD':
      moveLeft = true;   
      break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'KeyW':
      moveForward = false;
      break;
    case 'KeyS':
      moveBackward = false;
      break;
    case 'KeyA':
      moveRight = false;  
      break;
    case 'KeyD':
      moveLeft = false;   
      break;
  }
}

function updatePlayerMovement() {
  // Get camera direction
  const direction = new THREE.Vector3();
  camera.getWorldDirection(direction);
  direction.y = 0; // Keep movement on the horizontal plane
  direction.normalize();
  
  // Calculate right vector
  const right = new THREE.Vector3();
  right.crossVectors(camera.up, direction).normalize();
  
  // Reset velocity
  playerVelocity.set(0, 0, 0);
  
  // Update velocity based on inputs
  if (moveForward) {
    playerVelocity.add(direction.multiplyScalar(speed));
  }
  if (moveBackward) {
    playerVelocity.add(direction.multiplyScalar(-speed));
  }
  if (moveRight) {
    playerVelocity.add(right.multiplyScalar(speed));
  }
  if (moveLeft) {
    playerVelocity.add(right.multiplyScalar(-speed));
  }
  
  // Apply movement to yawObject instead of camera
  if (playerVelocity.length() > 0) {
    yawObject.position.add(playerVelocity);
    
    // Prevent leaving the room bounds (with a small margin)
    const roomWidth = 8;
    const roomDepth = 8;
    yawObject.position.x = Math.max(-roomWidth/2 + 0.5, Math.min(roomWidth/2 - 0.5, yawObject.position.x));
    yawObject.position.z = Math.max(-roomDepth/2 + 0.5, Math.min(roomDepth/2 - 0.5, yawObject.position.z));
    
    // Keep a constant height
    yawObject.position.y = cameraHeight;
  }
}

function animate() {
  animationFrameId = requestAnimationFrame(animate);
  
  // Update player movement
  updatePlayerMovement();
  
  // Update lamp ambient mode if active
  updateLampAmbientMode();
  
  // Update plant animation
  updatePlantAnimation();
  
  // Update cloud positions for the window
  if (room.clouds) {
    room.clouds.forEach(cloud => {
      cloud.mesh.position.x += cloud.speed * cloud.direction;
      
      // Window is about 2.4 units wide, adjust the reset boundaries to match
      const windowWidth = 1.2; // Half of the window width
      // If cloud moves out of view, reset to the other side
      if (cloud.direction > 0 && cloud.mesh.position.x > windowWidth) {
        cloud.mesh.position.x = -windowWidth;
      } else if (cloud.direction < 0 && cloud.mesh.position.x < -windowWidth) {
        cloud.mesh.position.x = windowWidth;
      }
    });
  }
  
  // Animate indoor clouds if they exist
  if (room.indoorClouds) {
    const time = Date.now() * 0.001;
    
    // Update cloud colors in every frame for smooth transitions
    updateIndoorClouds();
    
    room.indoorClouds.children.forEach(cloud => {
      // Gentle floating motion
      cloud.position.y = cloud.userData.initialY + 
        Math.sin(time + cloud.userData.floatOffset) * cloud.userData.floatRange;
      
      // Slow rotation
      cloud.rotation.y += cloud.userData.spinSpeed;
    });
  }
  
  // Render scene
  renderer.render(scene, camera);
}

function toggleFullscreen() {
  if (!document.fullscreenElement && 
      !document.mozFullScreenElement && 
      !document.webkitFullscreenElement && 
      !document.msFullscreenElement) {
    // Enter fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    // Exit fullscreen
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

// Start the application
init();