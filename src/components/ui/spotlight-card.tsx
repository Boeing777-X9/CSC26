"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  (
    {
      children,
      spotlightColor = "rgba(255, 121, 0, 0.25)",
      className = "",
      onMouseMove,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    forwardedRef
  ) => {
    const internalRef = useRef<HTMLDivElement | null>(null);
    const divRef = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;
    
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      if (onMouseMove) onMouseMove(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(true);
      if (onMouseEnter) onMouseEnter(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsHovered(false);
      if (onMouseLeave) onMouseLeave(e);
    };

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-[#12141c] transition-colors duration-300 ${className}`}
        {...props}
      >
        {/* Spotlight Radial Light Layer */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
          }}
        />

        {/* Border Spotlight Glow Effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 z-20 border border-[#ff7900]/60"
          style={{
            opacity: isHovered ? 1 : 0,
            maskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(250px circle at ${position.x}px ${position.y}px, black, transparent)`,
          }}
        />

        {/* Inner Card Content */}
        <div className="relative z-0 h-full w-full">{children}</div>
      </div>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";

export default SpotlightCard;
