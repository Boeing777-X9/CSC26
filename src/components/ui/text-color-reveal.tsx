"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextColorRevealProps {
  text: string;
  className?: string;
  baseColor?: string; // Default subtle white/silver
  revealColor?: string; // Brand orange #FF8C32
}

export const TextColorReveal: React.FC<TextColorRevealProps> = ({
  text,
  className = "",
  baseColor = "#FFFFFF",
  revealColor = "#FF8C32",
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <h3
      ref={ref}
      className={`relative inline-block overflow-hidden font-sans font-extrabold tracking-tight ${className}`}
      style={{ color: baseColor }}
    >
      {/* Base Text */}
      <span>{text}</span>

      {/* Sweep Mask Overlay */}
      <motion.span
        className="absolute inset-0 block select-none pointer-events-none"
        style={{
          color: revealColor,
        }}
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
        animate={
          isInView
            ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }
            : { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }
        }
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15,
        }}
        aria-hidden="true"
      >
        {text}
      </motion.span>
    </h3>
  );
};

export default TextColorReveal;
