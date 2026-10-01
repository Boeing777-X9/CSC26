"use client";

import React, { useEffect, useRef } from "react";

interface MatrixCodeProps {
  /** Speed mode: 'slow', 'medium', 'fast' or step interval in ms (default: 'slow') */
  speed?: "slow" | "medium" | "fast" | number;
  /** Mode: 'binary' ('01') or 'katakana' (default: 'binary') */
  mode?: "binary" | "katakana" | "matrix";
  /** Stream character color (default: matrix green) */
  color?: string;
  /** Lead character color (default: light green) */
  headColor?: string;
  /** Fade opacity for trailing tail (default: 0.1) */
  fadeOpacity?: number;
  /** Font size in pixels (default: 15) */
  fontSize?: number;
  /** Horizontal gap between columns (default: 18) */
  colGap?: number;
  /** Vertical gap between rows (default: 4) */
  rowGap?: number;
  /** Container className */
  className?: string;
}

export default function MatrixCode({
  speed = "slow",
  mode = "binary",
  color = "#00FF41",
  headColor = "#70FF99",
  fadeOpacity = 0.1,
  fontSize = 15,
  colGap = 18,
  rowGap = 4,
  className = "w-full h-full min-h-[300px]",
}: MatrixCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);
  const lastDrawTime = useRef<number>(0);

  // Interval in ms between falling steps
  const getIntervalMs = (): number => {
    if (typeof speed === "number") return speed;
    switch (speed) {
      case "slow":
        return 95;
      case "medium":
        return 65;
      case "fast":
        return 40;
      default:
        return 95;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use alpha: false and desynchronized for fast, GPU-accelerated rendering
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const charSet = mode === "binary" ? ["0", "1"] : ["0", "1", "X", "Y", "Z", "<", ">", "#", "$"];
    const charLen = charSet.length;
    const intervalMs = getIntervalMs();
    const cellWidth = fontSize + colGap;
    const cellHeight = fontSize + rowGap;

    let columns = 0;
    let drops: number[] = [];

    const initCanvas = () => {
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      // Cap DPR to 1.5 to maximize performance and prevent canvas oversizing on 4K displays
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `600 ${fontSize}px "Courier New", Consolas, monospace`;
      ctx.textBaseline = "top";
      ctx.shadowBlur = 0;

      columns = Math.floor(rect.width / cellWidth);
      const totalRows = Math.ceil(rect.height / cellHeight);

      // Pre-populate drops across the screen for instant initial load (0 blank waiting time)
      drops = new Array(columns).fill(0).map(() => Math.floor(Math.random() * totalRows - totalRows / 2));

      // Initial pitch black background fill
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, rect.width, rect.height);
    };

    initCanvas();

    let resizeTimeout: NodeJS.Timeout;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(initCanvas, 100);
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = (timestamp: number) => {
      animFrameId.current = requestAnimationFrame(draw);

      if (timestamp - lastDrawTime.current < intervalMs) {
        return;
      }
      lastDrawTime.current = timestamp;

      const rect = canvas.getBoundingClientRect();

      // Fade canvas slightly to pitch black to create character trails
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < columns; i++) {
        const x = i * cellWidth + colGap / 2;
        const y = drops[i] * cellHeight;

        if (y >= 0 && y <= rect.height) {
          // Draw head character
          const headChar = charSet[Math.floor(Math.random() * charLen)];
          ctx.fillStyle = headColor;
          ctx.fillText(headChar, x, y);

          // Draw trailing green character right behind
          const prevY = (drops[i] - 1) * cellHeight;
          if (prevY >= 0 && prevY <= rect.height) {
            const trailChar = charSet[Math.floor(Math.random() * charLen)];
            ctx.fillStyle = color;
            ctx.fillText(trailChar, x, prevY);
          }
        }

        // Reset column to top randomly when passing bottom
        if (y > rect.height && Math.random() > 0.96) {
          drops[i] = Math.floor(Math.random() * -12);
        }

        // Advance row by 1
        drops[i]++;
      }
    };

    animFrameId.current = requestAnimationFrame(draw);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
    };
  }, [speed, mode, color, headColor, fadeOpacity, fontSize, colGap, rowGap]);

  return (
    <div className={`relative overflow-hidden bg-black transform-gpu ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
