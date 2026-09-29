"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import DrawLineText from "@/components/ui/draw-line-text";
import NetworkLearnBuild from "@/components/home/NetworkLearnBuild";
import AboutUs from "@/components/home/AboutUs";
import WhatIsCyberSec from "@/components/home/WhatIsCyberSec";
import LoginTransition from "@/components/auth/LoginTransition";
import { Calendar, Lock } from "lucide-react";

// Dynamic import for WebGL and Canvas heavy components to speed up initial page load
const BlackHoleHeroSection = dynamic(
  () => import("@/components/ui/blackhole-hero-section"),
  { ssr: false }
);

const DriftWall = dynamic(
  () => import("@/components/ui/DriftWall"),
  { ssr: false }
);

/** Responsive media query hook */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export default function HomePage() {
  const narrow = useNarrow();
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll progress for background transparency & parallax
  const { scrollYProgress } = useScroll();

  // Dim black hole canvas subtly while scrolling, keeping it visible throughout
  const blackHoleOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  // Hero parallax
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <main className="relative min-h-screen w-full bg-black text-white font-sans overflow-x-hidden">
      {/* 1. Fixed Persistent Black Hole Background Canvas */}
      <motion.div
        style={{ opacity: blackHoleOpacity }}
        className="fixed inset-0 z-0 h-screen w-screen pointer-events-none"
      >
        <BlackHoleHeroSection
          hotColor="#FFF3DE"
          midColor="#FF8C32"
          coolColor="#C06014"
          focus={narrow ? [0.5, 0.76] : [0.72, 0.46]}
          scrim={narrow ? "top" : "left"}
          scrimStrength={0.85}
          distance={24}
          elevation={narrow ? -7 : -5.5}
          fov={narrow ? 58 : 42}
          glow={narrow ? 0.85 : 1}
          steps={narrow ? 120 : 160}
          resolution={narrow ? 0.45 : 0.55}
        />
      </motion.div>

      {/* 2. Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[92svh] w-full md:min-h-[720px] flex items-start px-6 pt-16 sm:px-10 md:items-center md:pt-0 lg:px-20"
      >
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="max-w-[44rem] space-y-5 pt-6 md:pt-0"
        >
          {/* Draw Line Text: CYBER SPACE CLUB */}
          <div className="pt-2">
            <DrawLineText color="#FF8C32" />
          </div>

          {/* Plain Silver Subheading */}
          <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-[#DDDDDD]">
            Manipal University Jaipur
          </h2>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-lg">
            The flagship student cybersecurity society — advancing offensive and defensive security, CTFs, vulnerability research, and hands-on workshops.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FF8C32] px-7 py-3.5 font-sans text-sm font-bold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,140,50,0.6)]"
            >
              <Calendar className="h-4 w-4" />
              <span>Explore Events</span>
            </Link>

            <LoginTransition>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-950/80 px-7 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:border-[#FF8C32] hover:text-[#FF8C32] backdrop-blur-md">
                <Lock className="h-4 w-4 text-[#FF8C32]" />
                <span>Member Login</span>
              </div>
            </LoginTransition>
          </div>

          {/* Compact Network / Learn / Build 3-Item Row embedded inside Hero reading space */}
          <NetworkLearnBuild />
        </motion.div>
      </section>

      {/* 3. About Us Section (Pic 3) */}
      <div className="relative z-10">
        <AboutUs />
      </div>

      {/* 4. What is Cyber Security? Section (Pic 4) */}
      <div className="relative z-10">
        <WhatIsCyberSec />
      </div>

      {/* 5. DriftWall Photo Gallery Section (ABOVE Footer, BELOW What is Cyber Security) */}
      <section className="relative z-10 w-full bg-black/60 backdrop-blur-sm py-20 border-t border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/40 bg-[#FF8C32]/10 px-4 py-1.5 font-sans text-xs font-bold text-[#FF8C32] mb-3">
            PHOTO GALLERY
          </div>
          <h2 className="font-sans text-3xl font-extrabold uppercase text-white sm:text-5xl tracking-tight">
            Life At CyberSpace Club
          </h2>
          <p className="mt-3 font-sans text-sm text-zinc-300 sm:text-base">
            Hover over the interactive drifting photo wall to explore our campus events, CTFs, and meetups.
          </p>
        </div>

        <div className="w-full h-[580px] relative overflow-hidden">
          <DriftWall
            columns={5}
            tileWidth={210}
            tileHeight={140}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={36}
            direction="up"
            variance={0.4}
            parallax={0.5}
            lift={54}
            fade={0.6}
            dim={0.6}
            overlayColor="#000000"
            pauseOnHover
          />
        </div>
      </section>
    </main>
  );
}
