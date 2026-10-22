"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Section3DPageProps
{
  children: React.ReactNode;
  className?: string;
  id?: string;
  intensity?: number;
  isHero?: boolean;
  glowColor?: string;
}

export default function Section3DPage(
{
  children,
  className = "",
  id,
  intensity = 1,
  isHero = false,
  glowColor = "rgba(255, 140, 50, 0.25)",
}: Section3DPageProps)
{
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll(
  {
    target: containerRef,
    offset: isHero ? ["start start", "end start"] : ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, 
  {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  const rotateXRaw = isHero
    ? useTransform(smoothProgress, [0, 1], [0, 18 * intensity])
    : useTransform(smoothProgress, [0, 0.45, 0.55, 1], [16 * intensity, 0, 0, -14 * intensity]);

  const scaleRaw = isHero
    ? useTransform(smoothProgress, [0, 1], [1, 0.92])
    : useTransform(smoothProgress, [0, 0.35, 0.65, 1], [0.93, 1, 1, 0.94]);

  const opacityRaw = isHero
    ? useTransform(smoothProgress, [0, 0.8], [1, 0.2])
    : useTransform(smoothProgress, [0, 0.25, 0.75, 1], [0.5, 1, 1, 0.4]);

  const translateYRaw = isHero
    ? useTransform(smoothProgress, [0, 1], [0, 80])
    : useTransform(smoothProgress, [0, 0.5, 1], [40, 0, -40]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 150, damping: 25 });
  const scale = useSpring(scaleRaw, { stiffness: 150, damping: 25 });
  const opacity = useSpring(opacityRaw, { stiffness: 150, damping: 25 });
  const translateY = useSpring(translateYRaw, { stiffness: 150, damping: 25 });

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full py-8 md:py-16 perspective-[1400px] transform-gpu overflow-visible"
      style={{ perspective: "1400px" }}
    >
      <motion.div
        style={
        {
          rotateX,
          scale,
          opacity,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className={`relative w-full transition-shadow duration-500 rounded-3xl ${className}`}
      >
        <div
          className="absolute -top-[1px] inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF8C32]/50 to-transparent pointer-events-none rounded-full z-20"
          style={
          {
            boxShadow: `0 0 20px ${glowColor}`,
          }}
        />

        <div className="relative z-10 w-full transform-gpu">
          {children}
        </div>

        <div className="absolute -bottom-[1px] inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none rounded-full z-20" />
      </motion.div>
    </div>
  );
}
