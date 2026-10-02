"use client";

import React, { useRef, useEffect, useState } from "react";

interface ParticleTextEffectProps {
  text: string;
  className?: string;
}

export const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isInView, setIsInView] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // 1. IntersectionObserver: Trigger ONCE when section scrolls into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // 2. High-Density Dust Assembly Animation
  useEffect(() => {
    if (!isInView || isCompleted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1400; // 1.4s assembly + hold for crisp readability

    const dpr = Math.max(1, window.devicePixelRatio || 1);
    
    // High-res typography matching the DOM h2 element
    const fontSize = 38;
    const fontSpec = `900 ${fontSize}px Orbitron, "Space Grotesk", sans-serif`;
    
    ctx.font = fontSpec;
    const textMetrics = ctx.measureText(text.toUpperCase());
    const width = Math.ceil(textMetrics.width + 60);
    const height = Math.ceil(fontSize * 1.6);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Offscreen render to extract precise letter pixel coordinates
    const offCanvas = document.createElement("canvas");
    offCanvas.width = width;
    offCanvas.height = height;
    const offCtx = offCanvas.getContext("2d");
    if (!offCtx) return;

    offCtx.font = fontSpec;
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.fillText(text.toUpperCase(), width / 2, height / 2);

    const imgData = offCtx.getImageData(0, 0, width, height).data;

    class DustParticle {
      targetX: number;
      targetY: number;
      startX: number;
      startY: number;
      x: number;
      y: number;
      size: number;
      color: string;

      constructor(targetX: number, targetY: number) {
        this.targetX = targetX;
        this.targetY = targetY;

        // Scattered dust angle and distance
        const angle = Math.random() * Math.PI * 2;
        const dist = 100 + Math.random() * 150;
        this.startX = targetX + Math.cos(angle) * dist;
        this.startY = targetY + Math.sin(angle) * dist;

        this.x = this.startX;
        this.y = this.startY;
        this.size = Math.random() * 1.4 + 1.1;

        const colors = [
          "#FF8C32",
          "#FFA856",
          "#FFC48D",
          "#FF7900",
          "#FFD0A0",
          "#FFFFFF",
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(progress: number) {
        // Smooth Cubic Easing for dust coming together to form the words
        const ease = 1 - Math.pow(1 - progress, 3);
        this.x = this.startX + (this.targetX - this.startX) * ease;
        this.y = this.startY + (this.targetY - this.startY) * ease;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: DustParticle[] = [];
    // Dense step size = 2 for high pixel accuracy & ultra-legible text formation
    const step = 2;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        if (imgData[index + 3] > 128) {
          particles.push(new DustParticle(x, y));
        }
      }
    }

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      ctx.clearRect(0, 0, width, height);

      // Draw dense dust particles forming the word
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(progress);
        particles[i].draw(ctx);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Complete assembly hold & instant switch to static text
        ctx.clearRect(0, 0, width, height);
        setIsCompleted(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, isCompleted, text]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center my-3 min-h-[60px] select-none ${className}`}
    >
      {/* 1. Dust Canvas layer - Active ONLY during scrolling assembly phase */}
      {isInView && !isCompleted && (
        <canvas ref={canvasRef} className="block pointer-events-none" />
      )}

      {/* 2. Static Formed Text - ZERO opacity before assembly; 100% opacity at exact completion moment */}
      <h2
        className={`font-cyber text-3xl sm:text-4xl md:text-5xl font-black uppercase text-center tracking-wider bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,140,50,0.4)] transition-opacity duration-200 ${
          isCompleted
            ? "opacity-100 relative"
            : "opacity-0 absolute inset-0 flex items-center justify-center pointer-events-none"
        }`}
      >
        {text}
      </h2>
    </div>
  );
};

export default ParticleTextEffect;
