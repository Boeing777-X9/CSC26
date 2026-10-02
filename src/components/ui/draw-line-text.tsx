"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DrawLineTextProps {
  className?: string;
  color?: string;
}

export const DrawLineText: React.FC<DrawLineTextProps> = ({
  className = "",
  color = "#FF8C32",
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-full max-w-full select-none ${className}`}>
      {/* Accessible Title */}
      <h1 className="sr-only">CYBER SPACE CLUB</h1>

      {/* SVG Wordmark with clean stroke draw-line animation */}
      <svg
        viewBox="0 0 960 160"
        className="w-full h-auto max-h-[140px] overflow-visible"
        aria-hidden="true"
      >
        <motion.text
          x="50%"
          y="110"
          textAnchor="middle"
          fill="transparent"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="font-cyber font-black uppercase text-[74px]"
          letterSpacing="4"
          initial={{ strokeDasharray: 1200, strokeDashoffset: 1200, fillOpacity: 0 }}
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
            fontFamily: "'Orbitron', 'Chakra Petch', 'Space Grotesk', sans-serif",
            fontWeight: 900,
          }}
        >
          CYBER SPACE CLUB
        </motion.text>
      </svg>
    </div>
  );
};

export default DrawLineText;
