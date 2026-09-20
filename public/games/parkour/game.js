// 游戏全局变量
let scene, camera, renderer;
let player, playerBox;
let ground;
let obstacles = [];
let platforms = [];
let gameStarted = false;
let gameOver = false;
let score = 0;
let speed = 0.2;
let jumpForce = 0.15;
let gravity = 0.005;
let playerVelocity = 0;
let isJumping = false;
let isSliding = false;
let clock = new THREE.Clock();
let difficulty = 1;
let lastObstaclePosition = -20;
let lastPlatformPosition = -30;

// 初始化游戏
function init() {
    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // 天空蓝色背景
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);
    camera.lookAt(0, 0, -10);
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('game-container').appendChild(renderer.domElement);
    
    // 添加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    scene.add(directionalLight);
    
    // 创建地面
    createGround();
    
    // 创建玩家
    createPlayer();
    
    // 添加事件监听器
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
    // 设置开始和重新开始按钮
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('restart-button').addEventListener('click', restartGame);
    
    // 开始动画循环
    animate();
}

// 创建地面
function createGround() {
    const groundGeometry = new THREE.BoxGeometry(20, 0.5, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x4CAF50 });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.25;
    ground.position.z = -25;
    ground.receiveShadow = true;
    scene.add(ground);
}

// 创建玩家
function createPlayer() {
    const loader = new THREE.GLTFLoader();
    loader.load('figure.glb', function(gltf) {
        player = gltf.scene;
        player.position.set(0, 0.5, 0);
        player.traverse(function(child) {
            if (child.isMesh) {
                child.castShadow = true;
            }
        });
        scene.add(player);
        // 创建玩家碰撞箱
        playerBox = new THREE.Box3().setFromObject(player);
    }, undefined, function(error) {
        console.error('模型加载失败:', error);
    });
}

// 创建障碍物
function createObstacle() {
    const types = ['box', 'tall', 'wide'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let geometry, height, width;
    
    switch(type) {
        case 'box':
            geometry = new THREE.BoxGeometry(1, 1, 1);
            height = 1;
            width = 1;
            break;
        case 'tall':
            geometry = new THREE.BoxGeometry(1, 1.5, 1);
            height = 1.5;
            width = 1;
            break;
        case 'wide':
            geometry = new THREE.BoxGeometry(2, 0.5, 1);
            height = 0.5;
            width = 2;
            break;
    }
    
    const material = new THREE.MeshStandardMaterial({ color: 0xe74c3c });
    const obstacle = new THREE.Mesh(geometry, material);
    
    // 随机位置，但确保在跑道上
    const lanePosition = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    obstacle.position.set(lanePosition * 2, height / 2, lastObstaclePosition - Math.random() * 10 - 10);
    lastObstaclePosition = obstacle.position.z;
    
    obstacle.castShadow = true;
    obstacle.receiveShadow = true;
    
    // 存储障碍物的尺寸信息
    obstacle.userData = { type, height, width };
    
    scene.add(obstacle);
    obstacles.push(obstacle);
}

// 创建平台
function createPlatform() {
    const platformGeometry = new THREE.BoxGeometry(4, 0.5, 4);
    const platformMaterial = new THREE.MeshStandardMaterial({ color: 0xf39c12 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    
    // 随机位置
    const lanePosition = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    platform.position.set(lanePosition * 2, 1, lastPlatformPosition - Math.random() * 20 - 20);
    lastPlatformPosition = platform.position.z;
    
    platform.castShadow = true;
    platform.receiveShadow = true;
    
    scene.add(platform);
    platforms.push(platform);
}

// 窗口大小调整
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 键盘按下事件
function onKeyDown(event) {
    if (!gameStarted || gameOver) return;
    
    switch(event.code) {
        case 'Space':
        case 'ArrowUp':
            if (!isJumping) {
                jump();
            }
            break;
        case 'ArrowDown':
            if (!isSliding) {
                slide();
            }
            break;
        case 'ArrowLeft':
            if (player.position.x > -2) {
                player.position.x -= 2;
            }
            break;
        case 'ArrowRight':
            if (player.position.x < 2) {
                player.position.x += 2;
            }
            break;
    }
}

// 键盘松开事件
function onKeyUp(event) {
    if (event.code === 'ArrowDown') {
        // 结束滑行
        if (isSliding) {
            player.scale.set(1, 1, 1);
            player.position.y = 0.5;
            isSliding = false;
        }
    }
}

// 跳跃
function jump() {
    isJumping = true;
    playerVelocity = jumpForce;
}

// 滑行
function slide() {
    isSliding = true;
    player.scale.set(1, 0.5, 1);
    player.position.y = 0.25;
}

// 检测碰撞
function checkCollisions() {
    // 更新玩家碰撞箱
    playerBox.setFromObject(player);
    
    // 检查与障碍物的碰撞
    for (let i = 0; i < obstacles.length; i++) {
        const obstacleBox = new THREE.Box3().setFromObject(obstacles[i]);
        
        if (playerBox.intersectsBox(obstacleBox)) {
            endGame();
            return;
        }
    }
    
    // 检查是否掉落
    if (player.position.y < -2) {
        endGame();
    }
}

// 更新游戏状态
function updateGame() {
    if (!gameStarted || gameOver) return;
    
    const delta = clock.getDelta();
    
    // 增加难度
    difficulty += delta * 0.01;
    speed = 0.2 + (difficulty - 1) * 0.05;
    
    // 更新分数
    score += delta * 10 * difficulty;
    document.getElementById('score-value').textContent = Math.floor(score);
    
    // 移动障碍物和平台
    for (let i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].position.z += speed;
        
        // 移除超出视野的障碍物
        if (obstacles[i].position.z > 5) {
            scene.remove(obstacles[i]);
            obstacles.splice(i, 1);
        }
    }
    
    for (let i = platforms.length - 1; i >= 0; i--) {
        platforms[i].position.z += speed;
        
        // 移除超出视野的平台
        if (platforms[i].position.z > 5) {
            scene.remove(platforms[i]);
            platforms.splice(i, 1);
        }
    }
    
    // 随机生成新障碍物和平台
    if (Math.random() < 0.02 * difficulty) {
        createObstacle();
    }
    
    if (Math.random() < 0.01 * difficulty) {
        createPlatform();
    }
    
    // 应用重力和更新玩家位置
    if (isJumping) {
        playerVelocity -= gravity;
        player.position.y += playerVelocity;
        
        // 检查是否落地
        if (player.position.y <= 0.5 && playerVelocity < 0) {
            player.position.y = 0.5;
            isJumping = false;
            playerVelocity = 0;
        }
    }
    
    // 检测碰撞
    checkCollisions();
}

// 开始游戏
function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    gameStarted = true;
    gameOver = false;
    score = 0;
    difficulty = 1;
    document.getElementById('score-value').textContent = 0;
    clock.start();
}

// 结束游戏
function endGame() {
    gameOver = true;
    document.getElementById('final-score').textContent = Math.floor(score);
    document.getElementById('game-over').classList.remove('hidden');
}

// 重新开始游戏
function restartGame() {
    // 清除所有障碍物和平台
    for (let obstacle of obstacles) {
        scene.remove(obstacle);
    }
    obstacles = [];
    
    for (let platform of platforms) {
        scene.remove(platform);
    }
    platforms = [];
    
    // 重置玩家位置和状态
    player.position.set(0, 0.5, 0);
    player.scale.set(1, 1, 1);
    isJumping = false;
    isSliding = false;
    playerVelocity = 0;
    
    // 重置游戏变量
    lastObstaclePosition = -20;
    lastPlatformPosition = -30;
    
    // 隐藏游戏结束界面
    document.getElementById('game-over').classList.add('hidden');
    
    // 开始新游戏
    startGame();
}

// 动画循环
function animate() {
    requestAnimationFrame(animate);
    
    updateGame();
    
    renderer.render(scene, camera);
}

// 初始化游戏
init();