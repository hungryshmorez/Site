// CONTRIBUTED BY THE ARTIST — reference only, not wired into the build.
// Goomba-like enemy: wander/chase AI, jump attack, damage flash, death particle
// burst, eye-tracking, trippy colour shift. For a future combat / chase feature.

import * as THREE from 'three';

export class Enemy {
    constructor(scene, x, y, z) {
        this.scene = scene;
        this.position = new THREE.Vector3(x, y, z);
        this.velocity = new THREE.Vector3();
        this.speed = 2 + Math.random() * 2;
        this.moveAngle = 0;
        this.moveChangeTimer = 0;
        this.health = 1;
        this.canJump = false;
        this.isJumping = false;
        this.jumpCooldown = 0;
        this.attackRange = 5;
        this.attackCooldown = 0;
        this.lastPlayerPos = new THREE.Vector3();
        this.collisionRadius = 1.5;
        this.createMesh();
    }

    createMesh() {
        this.group = new THREE.Group();
        const bodyGeometry = new THREE.SphereGeometry(0.8, 16, 8);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, roughness: 0.7, metalness: 0.2 });
        this.body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.body.position.y = 0.5; this.body.scale.y = 0.5; this.body.castShadow = true; this.group.add(this.body);

        const footGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.5);
        const footMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.9 });
        this.leftFoot = new THREE.Mesh(footGeometry, footMaterial); this.leftFoot.position.set(0.4, 0, 0); this.leftFoot.castShadow = true; this.group.add(this.leftFoot);
        this.rightFoot = new THREE.Mesh(footGeometry, footMaterial); this.rightFoot.position.set(-0.4, 0, 0); this.rightFoot.castShadow = true; this.group.add(this.rightFoot);

        const eyeGeometry = new THREE.SphereGeometry(0.15, 8, 8);
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3, metalness: 0.2 });
        this.leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial); this.leftEye.position.set(0.3, 0.7, -0.6); this.group.add(this.leftEye);
        this.rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial); this.rightEye.position.set(-0.3, 0.7, -0.6); this.group.add(this.rightEye);

        const pupilGeometry = new THREE.SphereGeometry(0.07, 8, 8);
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.2 });
        this.leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial); this.leftPupil.position.set(0, 0, -0.08); this.leftEye.add(this.leftPupil);
        this.rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial); this.rightPupil.position.set(0, 0, -0.08); this.rightEye.add(this.rightPupil);

        const eyebrowGeometry = new THREE.BoxGeometry(0.2, 0.05, 0.05);
        const eyebrowMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.9 });
        this.leftEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial); this.leftEyebrow.position.set(0.3, 0.85, -0.6); this.leftEyebrow.rotation.z = Math.PI * 0.1; this.group.add(this.leftEyebrow);
        this.rightEyebrow = new THREE.Mesh(eyebrowGeometry, eyebrowMaterial); this.rightEyebrow.position.set(-0.3, 0.85, -0.6); this.rightEyebrow.rotation.z = -Math.PI * 0.1; this.group.add(this.rightEyebrow);

        if (Math.random() < 0.3) {
            for (let i = 0; i < 5; i++) {
                const angle = (i / 5) * Math.PI;
                const spike = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.3, 4), new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.7, roughness: 0.3 }));
                spike.position.set(Math.cos(angle) * 0.8, 0.5 + Math.sin(angle) * 0.4, 0);
                spike.rotation.z = Math.PI * 0.5 - angle; this.group.add(spike);
            }
        }
        this.group.position.copy(this.position); this.scene.add(this.group);
    }

    update(deltaTime, playerPosition) {
        this.lastPlayerPos.copy(playerPosition);
        if (this.position.y > 1 || this.velocity.y > 0) { this.velocity.y -= 30 * deltaTime; this.isJumping = true; }
        else { this.position.y = 1; this.velocity.y = 0; this.isJumping = false; }
        if (this.jumpCooldown > 0) this.jumpCooldown -= deltaTime;
        if (this.attackCooldown > 0) this.attackCooldown -= deltaTime;
        this.moveChangeTimer -= deltaTime;
        this.updateMovement(deltaTime, playerPosition);
        this.position.addScaledVector(this.velocity, deltaTime);
        this.group.position.copy(this.position);
        this.updateRotation(deltaTime);
        this.updateAnimations(deltaTime);
        if (this.position.distanceTo(playerPosition) < 15) this.updateEyeTracking(playerPosition);
        if (Math.random() < 0.1) this.updateColorEffects();
    }

    updateMovement(deltaTime, playerPosition) {
        if (this.moveChangeTimer <= 0) {
            this.moveAngle = Math.random() * Math.PI * 2; this.moveChangeTimer = 1 + Math.random() * 2; this.isChasing = Math.random() < 0.7;
            if (this.canJump && !this.isJumping && this.jumpCooldown <= 0) { this.velocity.y = 10; this.jumpCooldown = 3 + Math.random() * 2; }
        }
        let moveDirection = new THREE.Vector3();
        if (this.isChasing) {
            moveDirection.subVectors(playerPosition, this.position); moveDirection.y = 0;
            const distSq = moveDirection.lengthSq();
            if (this.canJump && !this.isJumping && this.jumpCooldown <= 0 && distSq < this.attackRange * this.attackRange) {
                this.velocity.y = 12; this.jumpCooldown = 2;
                moveDirection.normalize().multiplyScalar(this.speed * 2); this.velocity.x = moveDirection.x; this.velocity.z = moveDirection.z;
            } else moveDirection.normalize();
        } else moveDirection.set(Math.cos(this.moveAngle), 0, Math.sin(this.moveAngle));
        if (!(this.canJump && this.isJumping && this.isChasing)) { this.velocity.x = moveDirection.x * this.speed; this.velocity.z = moveDirection.z * this.speed; }
    }

    updateRotation(deltaTime) {
        if (this.velocity.x === 0 && this.velocity.z === 0) return;
        const angle = Math.atan2(this.velocity.x, this.velocity.z);
        let rotationDiff = angle - this.group.rotation.y;
        while (rotationDiff > Math.PI) rotationDiff -= Math.PI * 2;
        while (rotationDiff < -Math.PI) rotationDiff += Math.PI * 2;
        this.group.rotation.y += rotationDiff * 5 * deltaTime;
    }

    updateAnimations() {
        const walkTime = performance.now() * 0.05;
        if (!this.isJumping) { const w = Math.sin(walkTime) * 0.2; this.leftFoot.position.z = w; this.rightFoot.position.z = -w; }
        else { this.leftFoot.position.z = 0.2; this.rightFoot.position.z = 0.2; }
    }

    updateEyeTracking(playerPosition) {
        const eyeVector = new THREE.Vector3().subVectors(playerPosition, this.position).normalize();
        this.leftPupil.position.x = eyeVector.x * 0.05; this.leftPupil.position.z = -0.08 + eyeVector.z * 0.05;
        this.rightPupil.position.x = eyeVector.x * 0.05; this.rightPupil.position.z = -0.08 + eyeVector.z * 0.05;
        const eyebrowAngle = this.isChasing ? Math.PI * 0.2 : Math.PI * 0.1;
        this.leftEyebrow.rotation.z = eyebrowAngle; this.rightEyebrow.rotation.z = -eyebrowAngle;
    }

    updateColorEffects() {
        const t = performance.now() * 0.001;
        this.body.material.color.setHSL((Math.sin(t + this.position.x * 0.2) + 1) * 0.5, 0.7, 0.5);
    }

    checkCollision(targetPosition, targetRadius) {
        const dx = this.position.x - targetPosition.x, dy = this.position.y - targetPosition.y, dz = this.position.z - targetPosition.z;
        return (dx * dx + dy * dy + dz * dz) < Math.pow(this.collisionRadius + targetRadius, 2);
    }

    takeDamage() {
        this.health--;
        this.body.material.emissive.set(0xff0000);
        setTimeout(() => this.body.material.emissive.set(0x000000), 100);
        return this.health <= 0;
    }

    remove() { this.createDeathEffect(); this.scene.remove(this.group); }

    createDeathEffect() {
        const particleCount = 20;
        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) { particlePositions[i * 3] = this.position.x; particlePositions[i * 3 + 1] = this.position.y; particlePositions[i * 3 + 2] = this.position.z; }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
        const particleMaterial = new THREE.PointsMaterial({ color: this.body.material.color, size: 0.3, transparent: true, opacity: 1 });
        const particles = new THREE.Points(particleGeometry, particleMaterial); this.scene.add(particles);
        const velocities = [];
        for (let i = 0; i < particleCount; i++) velocities.push(new THREE.Vector3((Math.random() - 0.5) * 5, Math.random() * 7, (Math.random() - 0.5) * 5));
        const startTime = performance.now(), duration = 1;
        const animateParticles = () => {
            const elapsed = (performance.now() - startTime) / 1000;
            if (elapsed < duration) {
                const positions = particles.geometry.attributes.position.array;
                for (let i = 0; i < particleCount; i++) { positions[i * 3] += velocities[i].x * 0.016; positions[i * 3 + 1] += velocities[i].y * 0.016; positions[i * 3 + 2] += velocities[i].z * 0.016; velocities[i].y -= 9.8 * 0.016; }
                particles.geometry.attributes.position.needsUpdate = true;
                particleMaterial.opacity = 1 - (elapsed / duration);
                requestAnimationFrame(animateParticles);
            } else this.scene.remove(particles);
        };
        animateParticles();
    }
}
