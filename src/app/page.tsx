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
import Section3DPage from "@/components/ui/Section3DPage";
import { Calendar, Lock, ArrowRight, ChevronDown } from "lucide-react";

const DriftWall = dynamic(
  () => import("@/components/ui/DriftWall"),
  { ssr: false }
);

function useNarrow(query = "(max-width: 767px)")
{
  const [narrow, setNarrow] = useState(false);
  useEffect(() =>
  {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export default function HomePage()
{
  const narrow = useNarrow();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();

  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 60]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.2]);

  return (
    <main className="relative min-h-screen w-full bg-transparent text-white font-sans overflow-x-hidden selection:bg-[#FF8C32]/30 selection:text-orange-200">
      <Section3DPage id="hero" isHero intensity={narrow ? 0.4 : 1}>
        <section
          ref={heroRef}
          className="relative z-10 min-h-[90svh] w-full md:min-h-[700px] flex items-center justify-center px-6 pt-16 sm:px-10 md:pt-0 lg:px-20 text-center"
        >
          <motion.div
            style={
            {
              y: heroTextY,
              opacity: heroTextOpacity
            }}
            className="max-w-[48rem] mx-auto space-y-5 pt-6 md:pt-0 flex flex-col items-center text-center"
          >
            <div className="pt-2 w-full flex justify-center">
              <DrawLineText color="#FF8C32" />
            </div>

            <h2 className="font-space text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.25em] uppercase text-[#DDDDDD] text-center">
              Manipal University Jaipur
            </h2>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-lg mx-auto text-center">
              The flagship student cybersecurity society — advancing offensive and defensive security, CTFs, vulnerability research, and hands-on workshops.
            </p>

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

            <div className="w-full max-w-2xl mx-auto pt-2">
              <NetworkLearnBuild />
            </div>

            <motion.div
              initial={
              {
                opacity: 0
              }}
              animate={
              {
                opacity: 1,
                y: [0, 6, 0]
              }}
              transition={
              {
                y: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.8 }
              }}
              className="pt-4 flex flex-col items-center gap-1 text-[#FF8C32] text-xs font-mono uppercase tracking-widest cursor-pointer hover:text-white transition-colors"
              onClick={() =>
              {
                const aboutEl = document.getElementById("about");
                if (aboutEl)
                {
                  aboutEl.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span>Scroll To Discover</span>
              <ChevronDown className="w-4 h-4 text-[#FF8C32]" />
            </motion.div>
          </motion.div>
        </section>
      </Section3DPage>

      <Section3DPage id="about" intensity={narrow ? 0.35 : 0.95}>
        <div className="relative z-10">
          <AboutUs />
        </div>
      </Section3DPage>

      <Section3DPage id="domains" intensity={narrow ? 0.35 : 0.9}>
        <div className="relative z-10">
          <CyberDomains />
        </div>
      </Section3DPage>

      <Section3DPage id="security" intensity={narrow ? 0.35 : 0.95}>
        <div className="relative z-10">
          <WhatIsCyberSec />
        </div>
      </Section3DPage>

      <Section3DPage id="gallery" intensity={narrow ? 0.3 : 0.85}>
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
      </Section3DPage>
    </main>
  );
}
