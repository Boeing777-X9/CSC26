"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface CurvedTextLoopProps {
  marqueeText?: string;
  speed?: number;
  direction?: "left" | "right";
  interactive?: boolean;
  className?: string;
}

export function CurvedTextLoop({
  marqueeText = "UPCOMING EVENTS 2026 • CYBER SPACE CLUB 2026 MUJ • ",
  speed = 2,
  direction = "left",
  interactive = true,
  className,
}: CurvedTextLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textPathRef = useRef<SVGTextPathElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const velocityRef = useRef(0);
  const offsetRef = useRef(0);

  // Repeat text to guarantee continuous infinite text fill across the SVG path
  const repeatedText = `${marqueeText.trim()} • `.repeat(8);

  useEffect(() => {
    let animId: number;
    const dirFactor = direction === "left" ? -1 : 1;

    const animate = () => {
      if (!isDraggingRef.current) {
        velocityRef.current *= 0.95;
        offsetRef.current += (speed * dirFactor) + velocityRef.current;
        
        // Loop infinitely across 2000px length
        if (offsetRef.current < -2000) offsetRef.current += 2000;
        if (offsetRef.current > 2000) offsetRef.current -= 2000;

        if (textPathRef.current) {
          textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
        }
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [speed, direction]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!interactive) return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!interactive || !isDraggingRef.current) return;
    const deltaX = e.clientX - dragStartXRef.current;
    dragStartXRef.current = e.clientX;
    velocityRef.current = deltaX * 0.8;
    offsetRef.current += deltaX;

    if (textPathRef.current) {
      textPathRef.current.setAttribute("startOffset", `${offsetRef.current}px`);
    }
  };

  const handlePointerUp = () => {
    if (!interactive) return;
    isDraggingRef.current = false;
  };

  // Compact quadratic curve path fitting tightly inside 70px height
  const pathD = "M 0,22 Q 500,62 1000,22";

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={cn(
        "relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing flex items-center justify-center py-1",
        className
      )}
    >
      <svg
        viewBox="0 0 1000 70"
        className="w-full h-auto max-h-[85px] overflow-visible"
      >
        <defs>
          <path id="curved-loop-path" d={pathD} fill="none" />
        </defs>
        <text
          fontSize="28"
          fontWeight="900"
          letterSpacing="4"
          className="font-cyber uppercase fill-black"
        >
          <textPath
            ref={textPathRef}
            href="#curved-loop-path"
            startOffset="0px"
            spacing="exact"
          >
            {repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  );
}

export default CurvedTextLoop;
