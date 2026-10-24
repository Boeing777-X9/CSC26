"use client";

import React from "react";
import { motion } from "framer-motion";

interface ParticleTextEffectProps {
  text: string;
  className?: string;
}

export const ParticleTextEffect: React.FC<ParticleTextEffectProps> = ({
  text,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`relative flex items-center justify-center my-3 min-h-[60px] select-none ${className}`}
    >
      <h2
        className="font-cyber text-3xl sm:text-4xl md:text-5xl font-black uppercase text-center tracking-wider bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,140,50,0.4)]"
      >
        {text}
      </h2>
    </motion.div>
  );
};

export default ParticleTextEffect;
