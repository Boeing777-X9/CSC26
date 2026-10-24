"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Zero-allocation piecewise bezier interpolation for Tenbin scroll choreography
function getTargetState(p: number, isDesktop: boolean) {
  const sideX = isDesktop ? 2.35 : 1.2;
  // Positioned comfortably above the club text and well below the navbar to avoid clipping
  const initialY = isDesktop ? 0.65 : 0.52;
  const initialScale = isDesktop ? 0.72 : 0.55;
  const activeScale = isDesktop ? 1.20 : 0.85;

  if (p <= 0.15) {
    // Stage 0: Hero above text -> Surprise swooping detachment
    const t = Math.max(0, Math.min(1, p / 0.15));
    const ease = t * t * (3 - 2 * t);
    return {
      x: 0,
      y: initialY + (0.0 - initialY) * ease,
      z: 0.0 + 0.45 * ease,
      rotX: 0.0 + 0.04 * ease,
      rotY: 0.0 + 0.22 * ease,
      rotZ: 0.0 - 0.03 * ease,
      scale: initialScale + (activeScale - initialScale) * ease,
    };
  } else if (p <= 0.42) {
    // Stage 1: Swooping to LEFT side, dynamic 3D banking (orange wing facing right)
    const t = Math.max(0, Math.min(1, (p - 0.15) / (0.42 - 0.15)));
    const ease = t * t * (3 - 2 * t);
    return {
      x: 0.0 + (-sideX - 0.0) * ease,
      y: 0.0 + (-0.05 - 0.0) * ease,
      z: 0.45 + (0.2 - 0.45) * ease,
      rotX: 0.04 + (-0.06 - 0.04) * ease,
      rotY: 0.22 + (0.65 - 0.22) * ease,
      rotZ: -0.03 + (-0.02 - -0.03) * ease,
      scale: activeScale + (activeScale * 0.95 - activeScale) * ease,
    };
  } else if (p <= 0.68) {
    // Stage 2: Swooping across screen from LEFT to RIGHT, dynamic 3D banking (silver wing facing left)
    const t = Math.max(0, Math.min(1, (p - 0.42) / (0.68 - 0.42)));
    const ease = t * t * (3 - 2 * t);
    return {
      x: -sideX + (sideX - -sideX) * ease,
      y: -0.05 + (0.0 - -0.05) * ease,
      z: 0.2,
      rotX: -0.06 + (0.06 - -0.06) * ease,
      rotY: 0.65 + (-0.65 - 0.65) * ease,
      rotZ: -0.02 + (0.02 - -0.02) * ease,
      scale: activeScale * 0.95 + (activeScale * 0.98 - activeScale * 0.95) * ease,
    };
  } else if (p <= 0.88) {
    // Stage 3: Swooping back from RIGHT into CENTER-TOP above Bento section
    const t = Math.max(0, Math.min(1, (p - 0.68) / (0.88 - 0.68)));
    const ease = t * t * (3 - 2 * t);
    return {
      x: sideX + (0.0 - sideX) * ease,
      y: 0.0 + (1.1 - 0.0) * ease,
      z: 0.2 + (-0.2 - 0.2) * ease,
      rotX: 0.06 + (0.16 - 0.06) * ease,
      rotY: -0.65 + (0.05 - -0.65) * ease,
      rotZ: 0.02 + (0.0 - 0.02) * ease,
      scale: activeScale * 0.98 + (initialScale * 1.15 - activeScale * 0.98) * ease,
    };
  } else {
    // Stage 4: Outro / Bottom of page into upper atmospheric fog
    const t = Math.max(0, Math.min(1, (p - 0.88) / (1.0 - 0.88)));
    const ease = t * t * (3 - 2 * t);
    return {
      x: 0,
      y: 1.1 + (1.9 - 1.1) * ease,
      z: -0.2 + (-1.0 - -0.2) * ease,
      rotX: 0.16 + (0.05 - 0.16) * ease,
      rotY: 0.05 + (0.0 - 0.05) * ease,
      rotZ: 0,
      scale: initialScale * 1.15 + (initialScale * 0.85 - initialScale * 1.15) * ease,
    };
  }
}

export default function TenbinScrollShield() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let animationFrameId: number;
    let isDestroyed = false;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // 2. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0e111a, 1.2);
    scene.add(ambientLight);

    // Right Key Light: Vibrant Cyber Orange for the orange shield side
    const orangeKeyLight = new THREE.DirectionalLight(0xff7900, 4.2);
    orangeKeyLight.position.set(5, 3, 4);
    scene.add(orangeKeyLight);

    // Left Key Light: Titanium Cool Silver/White for the chrome side
    const silverKeyLight = new THREE.DirectionalLight(0xe2e8f0, 3.2);
    silverKeyLight.position.set(-5, 3, 4);
    scene.add(silverKeyLight);

    // Bottom Rim Light
    const rimLight = new THREE.PointLight(0xff9533, 2.0, 15);
    rimLight.position.set(0, -4, 2);
    scene.add(rimLight);

    // Mouse Tracking Interactive Spotlight
    const mouseSpotLight = new THREE.PointLight(0xffffff, 3.0, 10);
    mouseSpotLight.position.set(0, 0, 4);
    scene.add(mouseSpotLight);

    // 3. Central Shield Group
    const shieldRootGroup = new THREE.Group();
    scene.add(shieldRootGroup);

    const shieldInnerGroup = new THREE.Group();
    shieldRootGroup.add(shieldInnerGroup);

    // Load Club Logo Texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      "/images/csc-3d-shield.png",
      (texture) => {
        if (isDestroyed) return;
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.colorSpace = THREE.SRGBColorSpace;

        const planeWidth = 3.6;
        const planeHeight = planeWidth * (1011 / 1024);
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 16, 16);

        // Front Face Material
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.02,
          roughness: 0.22,
          metalness: 0.75,
          side: THREE.DoubleSide,
        });

        const shieldMesh = new THREE.Mesh(geometry, material);
        shieldInnerGroup.add(shieldMesh);

        // Bevel Silhouette Layer (physical 3D thickness)
        const depthMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          color: 0x111622,
          transparent: true,
          alphaTest: 0.05,
          roughness: 0.5,
          metalness: 0.9,
          side: THREE.DoubleSide,
        });

        for (let i = 1; i <= 2; i++) {
          const depthMesh = new THREE.Mesh(geometry, depthMaterial);
          depthMesh.position.z = -i * 0.04;
          depthMesh.scale.set(1 - i * 0.005, 1 - i * 0.005, 1);
          shieldInnerGroup.add(depthMesh);
        }
      },
      undefined,
      (err) => console.error("Error loading club shield texture:", err)
    );

    // 4. Tenbin-style Cyber HUD Orbiting Rings
    const ringsGroup = new THREE.Group();
    shieldInnerGroup.add(ringsGroup);

    // Ring 1: Glowing Cyber Ring
    const ring1Geo = new THREE.RingGeometry(2.45, 2.47, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0xff7900,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3.2;
    ring1.rotation.y = Math.PI / 8;
    ringsGroup.add(ring1);

    // Ring 2: Outer Segmented Cyan-Silver Ring
    const ring2Geo = new THREE.RingGeometry(3.05, 3.07, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xcbd5e1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = -Math.PI / 6;
    ringsGroup.add(ring2);

    // 5. Floating Cyber Particle Field (Tenbin dust & embers)
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const orangeColor = new THREE.Color(0xff7900);
    const silverColor = new THREE.Color(0xe2e8f0);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 16;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1;

      const c = Math.random() > 0.4 ? orangeColor : silverColor;
      particleColors[i * 3] = c.r;
      particleColors[i * 3 + 1] = c.g;
      particleColors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 6. Interactive Mouse Parallax Tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 7. Dynamic Interpolation State
    const isDesktopInit = window.innerWidth >= 1024;
    const current = {
      x: 0,
      y: isDesktopInit ? 0.65 : 0.52,
      z: 0,
      rotX: 0,
      rotY: 0,
      rotZ: 0,
      scale: isDesktopInit ? 0.72 : 0.55,
    };

    // 8. High-Performance Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const isDesktop = window.innerWidth >= 1024;

      // Mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Update interactive mouse spotlight
      mouseSpotLight.position.x = mouse.x * 4;
      mouseSpotLight.position.y = mouse.y * 3;

      // Calculate instantaneous scroll progress (0.0 to 1.0)
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

      // Retrieve target coordinates from piecewise choreography function
      const target = getTargetState(progress, isDesktop);

      // Smooth direct lerp (responsive in BOTH directions with zero lag)
      const lerpSpeed = 0.12;
      current.x += (target.x - current.x) * lerpSpeed;
      current.y += (target.y - current.y) * lerpSpeed;
      current.z += (target.z - current.z) * lerpSpeed;
      current.rotX += (target.rotX - current.rotX) * lerpSpeed;
      current.rotY += (target.rotY - current.rotY) * lerpSpeed;
      current.rotZ += (target.rotZ - current.rotZ) * lerpSpeed;
      current.scale += (target.scale - current.scale) * lerpSpeed;

      // Subtle hover oscillation
      const hoverY = Math.sin(elapsedTime * 1.5) * 0.035;

      // Apply coordinates
      shieldRootGroup.position.x = current.x;
      shieldRootGroup.position.y = current.y + hoverY;
      shieldRootGroup.position.z = current.z;

      // Combined rotation (scroll choreography + mouse parallax)
      shieldRootGroup.rotation.x = current.rotX + mouse.y * 0.16;
      shieldRootGroup.rotation.y = current.rotY + mouse.x * 0.24;
      shieldRootGroup.rotation.z = current.rotZ;

      shieldRootGroup.scale.set(current.scale, current.scale, current.scale);

      // Rotate Cyber HUD Rings
      ring1.rotation.z += 0.005;
      ring2.rotation.z -= 0.003;

      // Drift cyber particles
      particlePoints.rotation.y = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-20 pointer-events-none h-screen w-screen overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
