"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DrawLineTextProps {
  text?: string;
  className?: string;
  color?: string;
  strokeWidth?: number;
  fontSize?: number | string;
  viewBox?: string;
  letterSpacing?: number | string;
  preserveCase?: boolean;
  as?: "h1" | "h2" | "h3" | "div";
}

export const DrawLineText: React.FC<DrawLineTextProps> = ({
  text = "CYBER SPACE CLUB",
  className = "",
  color = "#ff7900",
  strokeWidth = 3.5,
  fontSize,
  viewBox,
  letterSpacing = "4",
  preserveCase = false,
  as: Component = "h1",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute adaptive viewBox width and font size tailored to text length
  const defaultViewBox =
    viewBox ||
    (text.length > 18
      ? `0 0 ${Math.max(1220, Math.round(text.length * 56 + 50))} 160`
      : "0 0 960 160");

  const defaultFontSize = fontSize
    ? typeof fontSize === "number"
      ? `${fontSize}px`
      : fontSize
    : text.length > 20
    ? "62px"
    : text.length > 16
    ? "68px"
    : "74px";

  const strokeDash = Math.max(1600, text.length * 110);

  return (
    <div className={`w-full max-w-full select-none ${className}`}>
      {/* Accessible Title */}
      <Component className="sr-only">{text}</Component>

      {/* SVG Wordmark with clean stroke draw-line animation */}
      <svg
        viewBox={defaultViewBox}
        className="w-full h-auto max-h-[140px] overflow-visible"
        aria-hidden="true"
      >
        <motion.text
          x="50%"
          y="110"
          textAnchor="middle"
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`font-cyber font-black ${preserveCase ? "" : "uppercase"}`}
          letterSpacing={letterSpacing}
          initial={{
            strokeDasharray: strokeDash,
            strokeDashoffset: strokeDash,
            fillOpacity: 0,
          }}
          animate={
            mounted
              ? {
                  strokeDashoffset: 0,
                  fillOpacity: 1,
                }
              : {}
          }
          transition={{
            strokeDashoffset: {
              duration: 1.6,
              ease: [0.25, 1, 0.5, 1],
            },
            fillOpacity: {
              duration: 0.8,
              ease: "easeOut",
              delay: 0.9,
            },
          }}
          style={{
            fill: color,
            fontSize: defaultFontSize,
            fontFamily: "'Orbitron', 'Chakra Petch', 'Space Grotesk', sans-serif",
            fontWeight: 900,
          }}
        >
          {text}
        </motion.text>
      </svg>
    </div>
  );
};

export default DrawLineText;
