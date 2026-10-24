"use client";

import React, { useEffect, useRef } from "react";

interface MatrixCodeProps {
  /** Speed mode: 'slow', 'medium', 'fast' or base rows/frame (default: 'slow') */
  speed?: "slow" | "medium" | "fast" | number;
  /** Mode: 'binary' ('01') or 'numbers' or 'matrix' (default: 'binary') */
  mode?: "binary" | "numbers" | "katakana" | "matrix";
  /** Stream character color (default: theme orange) */
  color?: string;
  /** Lead character color (defaults to bright theme amber #ffa022) */
  headColor?: string;
  /** Fade opacity for trailing tail (default: 0.038 for balanced 6-8 char trails) */
  fadeOpacity?: number;
  /** Font size in pixels (default: 15) */
  fontSize?: number;
  /** Horizontal gap between columns (default: 10 for balanced columns) */
  colGap?: number;
  /** Vertical gap between rows (default: 4 for clean spacing) */
  rowGap?: number;
  /** Container className */
  className?: string;
}

export default function MatrixCode({
  speed = "slow",
  mode = "binary",
  color = "#ff7900",
  headColor = "#ffa022",
  fadeOpacity = 0.038,
  fontSize = 15,
  colGap = 10,
  rowGap = 4,
  className = "w-full h-full min-h-[300px]",
}: MatrixCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Keep head character in bright amber unless explicitly overridden
  const activeHeadColor = headColor || color;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const charSet =
      mode === "binary"
        ? ["0", "1"]
        : mode === "numbers"
        ? ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        : ["0", "1", "X", "Y", "Z", "<", ">", "#", "$", "0", "1"];
    const charLen = charSet.length;

    // Steady, readable falling speed (rows per frame at 60 FPS)
    const getBaseSpeed = (): number => {
      if (typeof speed === "number") return speed;
      switch (speed) {
        case "slow":
          return 0.08; // ~4.8 rows/sec
        case "medium":
          return 0.14; // ~8.4 rows/sec
        case "fast":
          return 0.22; // ~13.2 rows/sec
        default:
          return 0.08;
      }
    };

    const baseSpeed = getBaseSpeed();
    const cellWidth = fontSize + colGap;
    const cellHeight = fontSize + rowGap;

    let width = 0;
    let height = 0;
    let columns = 0;
    let totalRows = 0;
    let charOffset = 0;

    let drops: number[] = [];
    let speeds: number[] = [];
    let lastRows: number[] = [];
    let animFrameId: number;
    let lastTime = 0;

    const drawCell = (
      char: string,
      colIndex: number,
      row: number,
      textColor: string
    ) => {
      const x = colIndex * cellWidth;
      const y = row * cellHeight;

      // Clear cell bounding box completely to eliminate character overlap
      ctx.fillStyle = "#000000";
      ctx.fillRect(x, y, cellWidth, cellHeight);

      ctx.fillStyle = textColor;
      ctx.fillText(char, x + charOffset, y);
    };

    const initCanvas = () => {
      const parent = canvas.parentElement || canvas;
      const rect = parent.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `bold ${fontSize}px "Courier New", Consolas, monospace`;
      ctx.textBaseline = "top";
      ctx.shadowBlur = 0;

      const charWidth = ctx.measureText("0").width || 9;
      charOffset = Math.max(0, (cellWidth - charWidth) / 2);

      columns = Math.floor(width / cellWidth);
      totalRows = Math.ceil(height / cellHeight);

      drops = new Array(columns);
      speeds = new Array(columns);
      lastRows = new Array(columns);

      // Clean black background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Balanced distribution: some columns active, some paused for natural cadence
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * totalRows * 2.0 - totalRows * 0.7;
        speeds[i] = baseSpeed * (0.8 + Math.random() * 0.4);
        lastRows[i] = Math.floor(drops[i]);

        const headRow = Math.floor(drops[i]);
        if (headRow >= 0 && headRow < totalRows) {
          const startRow = Math.max(0, headRow - 6);
          for (let r = startRow; r < headRow; r++) {
            drawCell(
              charSet[Math.floor(Math.random() * charLen)],
              i,
              r,
              color
            );
          }
          drawCell(
            charSet[Math.floor(Math.random() * charLen)],
            i,
            headRow,
            activeHeadColor
          );
        }
      }
    };

    initCanvas();

    const resizeObserver = new ResizeObserver(() => {
      initCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const draw = (now: number) => {
      animFrameId = requestAnimationFrame(draw);

      if (!lastTime) {
        lastTime = now;
        return;
      }

      const elapsed = now - lastTime;
      lastTime = now;
      const deltaFactor = Math.min(elapsed / 16.667, 3.0);

      if (width === 0 || height === 0 || columns === 0) return;

      // 1. Balanced background trail decay (trails linger ~6-8 rows)
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      ctx.fillRect(0, 0, width, height);

      // 2. Advance falling rain drops
      for (let i = 0; i < columns; i++) {
        const prevRow = lastRows[i];
        drops[i] += speeds[i] * deltaFactor;
        const newRow = Math.floor(drops[i]);

        if (newRow !== prevRow) {
          lastRows[i] = newRow;

          for (let r = prevRow + 1; r <= newRow; r++) {
            // Previous row stays pure theme orange
            const prevYRow = r - 1;
            if (prevYRow >= 0 && prevYRow < totalRows) {
              drawCell(
                charSet[Math.floor(Math.random() * charLen)],
                i,
                prevYRow,
                color
              );
            }

            // Head character stays vibrant amber
            if (r >= 0 && r < totalRows) {
              drawCell(
                charSet[Math.floor(Math.random() * charLen)],
                i,
                r,
                activeHeadColor
              );
            }
          }

          // Natural pause before restart: creates rhythmic streams rather than a solid wall
          if (newRow >= totalRows) {
            if (Math.random() > 0.88) {
              drops[i] = -Math.floor(Math.random() * 10 + 2);
              lastRows[i] = Math.floor(drops[i]);
              speeds[i] = baseSpeed * (0.8 + Math.random() * 0.4);
            }
          }
        }
      }

      // 3. Occasional subtle character shimmer in a stream
      if (Math.random() > 0.65) {
        const col = Math.floor(Math.random() * columns);
        const headRow = lastRows[col];
        const offset = Math.floor(Math.random() * 6 + 1);
        const r = headRow - offset;
        if (r >= 0 && r < totalRows) {
          drawCell(
            charSet[Math.floor(Math.random() * charLen)],
            col,
            r,
            color
          );
        }
      }
    };

    animFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
    };
  }, [speed, mode, color, activeHeadColor, fadeOpacity, fontSize, colGap, rowGap]);

  return (
    <div
      className={`relative overflow-hidden bg-black ${className}`}
      style={{ contain: "paint" }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
