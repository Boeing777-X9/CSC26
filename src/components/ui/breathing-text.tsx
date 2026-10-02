"use client";

import React from "react";
import { motion, Transition, Variants } from "framer-motion";

export interface TextProps {
  label: string;
  fromFontVariationSettings?: string;
  toFontVariationSettings?: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  repeatDelay?: number;
  className?: string;
  onClick?: () => void;
}

const BreathingText = ({
  label,
  fromFontVariationSettings = "'wght' 100, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = {
    duration: 1.5,
    ease: "easeInOut",
  },
  staggerDuration = 0.1,
  staggerFrom = "first",
  repeatDelay = 0.1,
  className = "",
  onClick,
  ...props
}: TextProps) => {
  const letterVariants: Variants = {
    initial: { 
      fontVariationSettings: fromFontVariationSettings,
      scale: 0.95,
      opacity: 0.7,
      filter: "blur(0.5px)"
    },
    animate: (i: number) => ({
      fontVariationSettings: toFontVariationSettings,
      scale: 1.08,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        ...transition,
        repeat: Infinity,
        repeatType: "mirror",
        delay: i * staggerDuration,
        repeatDelay: repeatDelay,
      },
    }),
  };

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") {
      return Math.abs(index - staggerFrom);
    }
    switch (staggerFrom) {
      case "first":
        return index;
      case "last":
        return total - 1 - index;
      case "center":
      default:
        return Math.abs(index - Math.floor(total / 2));
    }
  };

  const letters = label.split("");

  return (
    <span className={`inline-flex items-center ${className}`} onClick={onClick} {...props}>
      {letters.map((letter: string, i: number) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre origin-center transition-transform"
          aria-hidden="true"
          variants={letterVariants}
          initial="initial"
          animate="animate"
          custom={getCustomIndex(i, letters.length)}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
};

export { BreathingText };
export default BreathingText;
