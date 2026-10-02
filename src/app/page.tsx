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
import CyberDomains from "@/components/home/CyberDomains";
import LoginTransition from "@/components/auth/LoginTransition";
import ShinyButton from "@/components/ui/shiny-button";
import { Calendar, Lock, ArrowRight } from "lucide-react";

// Dynamic import for WebGL and Canvas heavy components to speed up initial page load

const DriftWall = dynamic(
  () => import("@/components/ui/DriftWall"),
  { ssr: false }
);

const AnimatedShaderBackgroundCanvas = dynamic(
  () => import("@/components/ui/animated-shader-hero").then(m => m.AnimatedShaderBackgroundCanvas),
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

  // Scroll progress for parallax
  const { scrollYProgress } = useScroll();

  // Hero parallax
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 80]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <main className="relative min-h-screen w-full bg-transparent text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative z-10 min-h-[92svh] w-full md:min-h-[720px] flex items-center justify-center px-6 pt-16 sm:px-10 md:pt-0 lg:px-20 text-center"
      >
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="max-w-[48rem] mx-auto space-y-5 pt-6 md:pt-0 flex flex-col items-center text-center"
        >
          {/* Draw Line Text: CYBER SPACE CLUB */}
          <div className="pt-2 w-full flex justify-center">
            <DrawLineText color="#FF8C32" />
          </div>

          {/* Plain Silver Subheading */}
          <h2 className="font-space text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase text-[#DDDDDD] text-center">
            Manipal University Jaipur
          </h2>

          {/* Description */}
          <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-lg mx-auto text-center">
            The flagship student cybersecurity society — advancing offensive and defensive security, CTFs, vulnerability research, and hands-on workshops.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#FF8C32] px-7 py-3.5 font-sans text-sm font-bold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,140,50,0.6)]"
            >
              <Calendar className="h-4 w-4" />
              <span>Explore Events</span>
            </Link>

            <LoginTransition>
              <ShinyButton className="px-7 py-3 text-sm">
                <Lock className="h-4 w-4" />
                <span>Member Login</span>
              </ShinyButton>
            </LoginTransition>
          </div>

          {/* Compact Network / Learn / Build 3-Item Row embedded inside Hero reading space */}
          <div className="w-full max-w-2xl mx-auto pt-2">
            <NetworkLearnBuild />
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <div className="relative z-10">
        <AboutUs />
      </div>

      {/* Cyber Specializations & Stats Section */}
      <CyberDomains />

      {/* What is Cyber Security? Section */}
      <div className="relative z-10">
        <WhatIsCyberSec />
      </div>

      {/* DriftWall Photo Gallery Section */}
      <section className="relative z-10 w-full bg-black/40 backdrop-blur-md py-20 border-t border-zinc-800/40">
        <div className="mx-auto max-w-6xl px-6 mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/40 bg-[#FF8C32]/10 px-4 py-1.5 font-sans text-xs font-bold text-[#FF8C32] mb-3">
            PHOTO GALLERY
          </div>
          <h2 className="font-sans text-3xl font-extrabold uppercase text-white sm:text-5xl tracking-tight">
            Life At CYBER SPACE CLUB
          </h2>
          <p className="mt-3 font-sans text-sm text-zinc-300 sm:text-base">
            Hover over the interactive drifting photo wall to explore our campus events, CTFs, and meetups.
          </p>
          <div className="mt-6">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32] bg-[#FF8C32]/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FF8C32] transition-all hover:bg-[#FF8C32] hover:text-black"
            >
              <span>View Full Interactive Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
