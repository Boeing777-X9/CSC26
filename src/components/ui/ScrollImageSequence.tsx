"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

interface ScrollImageSequenceProps {
  frameCount: number;
  framePath: (index: number) => string;
}

export default function ScrollImageSequence({
  frameCount,
  framePath,
}: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  
  // Track scroll specifically within this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Finish the animation at 80% scroll so the final frame is held before it scrolls away
  const currentFrameIndex = useTransform(scrollYProgress, [0, 0.8], [0, frameCount - 1]);

  useEffect(() => {
    // Preload images efficiently
    const loadedImages: HTMLImageElement[] = [];
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = framePath(i);
      img.onload = () => {
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            drawFrame(img, ctx, canvasRef.current);
          }
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, framePath]);

  const drawFrame = (img: HTMLImageElement, ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    if (!img.complete || img.naturalWidth === 0) return;

    const { width, height } = canvas;
    const imgRatio = img.width / img.height;
    const canvasRatio = width / height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawWidth = height * imgRatio;
      drawHeight = height;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Add a dark overlay to blend with #050403 environment
    ctx.fillStyle = "rgba(5, 4, 3, 0.4)";
    ctx.fillRect(0, 0, width, height);
  };

  useMotionValueEvent(currentFrameIndex, "change", (latest) => {
    const frameIndex = Math.min(Math.floor(latest), frameCount - 1);
    if (images[frameIndex] && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawFrame(images[frameIndex], ctx, canvasRef.current);
      }
    }
  });

  useEffect(() => {
    let animationFrameId: number;
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Redraw current frame after resize
        const frameIndex = Math.min(Math.floor(currentFrameIndex.get()), frameCount - 1);
        if (images[frameIndex]) {
          const ctx = canvasRef.current.getContext("2d");
          if (ctx) {
            // Use requestAnimationFrame to ensure it draws correctly
            animationFrameId = requestAnimationFrame(() => {
              drawFrame(images[frameIndex], ctx, canvasRef.current!);
            });
          }
        }
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [images]); // DO NOT include currentFrameIndex here, it will break canvas by resizing on every scroll tick

  // Animate the text overlaid on the sequence (fade out slightly slower now that height is shorter)
  const textOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 0, 0, 1]);
  const textY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] bg-black z-10 border-t border-zinc-800/40">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ display: "block" }}
        />
        
        {/* Overlay content replicating the CyberSpace Club styling */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/40 bg-[#FF8C32]/10 px-4 py-1.5 font-sans text-xs font-bold text-[#FF8C32] mb-3">
            PHOTO GALLERY
          </div>
          <h2 className="font-sans text-3xl font-extrabold uppercase text-white sm:text-5xl tracking-tight text-center px-4 drop-shadow-lg">
            Life At CyberSpace Club
          </h2>
          <p className="mt-3 font-sans text-sm text-zinc-300 sm:text-base max-w-lg text-center px-4 drop-shadow-md">
            Scroll down to explore our cinematic journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
