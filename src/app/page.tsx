"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import DrawLineText from "@/components/ui/draw-line-text";
import NetworkLearnBuild from "@/components/home/NetworkLearnBuild";
import { BentoGrid } from "@/components/home/BentoGrid";
import LoginTransition from "@/components/auth/LoginTransition";
import WhatIsCyberSec from "@/components/home/WhatIsCyberSec";
import {
  Calendar,
  Lock,
  Sliders,
  Sparkles,
} from "lucide-react";

// Dynamic imports for WebGL components to ensure clean hydration & performance
const TenbinScrollShield = dynamic(
  () => import("@/components/home/TenbinScrollShield"),
  { ssr: false }
);

const VantaFogBackground = dynamic(
  () => import("@/components/ui/VantaFogBackground"),
  { ssr: false }
);

// Color presets for Vanta Fog
const THEME_PRESETS = [
  {
    name: "Cyber Orange",
    highlightColor: 0xff7900,
    midtoneColor: 0x321200,
    lowlightColor: 0x0e0603,
    baseColor: 0x090a0f,
  },
  {
    name: "Warm Amber",
    highlightColor: 0xff8c32,
    midtoneColor: 0x421800,
    lowlightColor: 0x140803,
    baseColor: 0x090a0f,
  },
  {
    name: "Electric Red-Orange",
    highlightColor: 0xe82b00,
    midtoneColor: 0x2e0800,
    lowlightColor: 0x0a0301,
    baseColor: 0x090a0f,
  },
];

export default function HomePage() {
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const activeTheme = THEME_PRESETS[selectedThemeIndex];


  return (
    <SmoothScrollProvider>
      <main className="relative min-h-screen w-full bg-[#090a0f] text-white font-sans selection:bg-[#ff7900] selection:text-black">
        {/* 1. Atmospheric Vanta Fog Background (Warm cyber amber smoke, not pitch black) */}
        <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none overflow-hidden">
          <VantaFogBackground
            highlightColor={activeTheme.highlightColor}
            midtoneColor={activeTheme.midtoneColor}
            lowlightColor={activeTheme.lowlightColor}
            baseColor={activeTheme.baseColor}
            blurFactor={0.6}
            speed={1.0}
            zoom={1.0}
          />
          {/* Subtle cyber grid pattern with gentle vignette */}
          <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />
        </div>

        {/* 2. Pinned 3D Club Shield Centerpiece (Tenbin-style scroll choreography) */}
        <TenbinScrollShield />

        {/* 3. Floating Theme Picker Pill */}
        <aside
          aria-label="Theme Controller"
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        >
          {showThemePicker && (
            <div className="bg-[#090a0f]/95 border border-[#ff7900]/40 rounded-2xl p-3 shadow-2xl backdrop-blur-xl max-w-xs space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 border-b border-zinc-800 pb-1.5">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-[#ff7900]" />
                  FOG THEME PRESETS
                </span>
                <button
                  onClick={() => setShowThemePicker(false)}
                  className="text-zinc-500 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1.5">
                {THEME_PRESETS.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedThemeIndex(idx)}
                    className={`w-full text-left p-2 rounded-xl text-xs font-mono transition-all flex items-center justify-between ${
                      selectedThemeIndex === idx
                        ? "bg-[#ff7900]/20 border border-[#ff7900] text-white shadow-[0_0_12px_rgba(255,121,0,0.3)]"
                        : "bg-black/40 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                    }`}
                  >
                    <span className="font-bold">{preset.name}</span>
                    <div
                      className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 ml-2"
                      style={{
                        backgroundColor: `#${preset.highlightColor.toString(16).padStart(6, "0")}`,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#090a0f]/90 border border-[#ff7900]/50 hover:border-[#ff7900] text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(255,121,0,0.25)] hover:shadow-[0_0_25px_rgba(255,121,0,0.5)] transition-all backdrop-blur-md cursor-pointer"
          >
            <div
              className="w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: `#${activeTheme.highlightColor.toString(16).padStart(6, "0")}`,
              }}
            />
            <span>{activeTheme.name}</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ff7900]" />
          </button>
        </aside>

        {/* ------------------------------------------------------------------------ */}
        {/* HERO SECTION: Centered Layout with 3D Shield positioned ABOVE the club name */}
        {/* ------------------------------------------------------------------------ */}
        <section className="relative z-30 min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 sm:px-10 lg:px-20 pointer-events-none">
          {/* 3D Shield Perch Spacer: The 3D logo sits right here at scroll = 0, below navbar */}
          <div className="w-full h-36 sm:h-44 md:h-48 flex items-center justify-center pointer-events-none select-none" />

          {/* Centered Hero Typography & Information */}
          <div className="w-full max-w-4xl mx-auto space-y-6 pointer-events-auto">
            {/* Draw Line Text: CYBER SPACE CLUB (Centered) */}
            <div className="flex justify-center w-full">
              <DrawLineText color="#ff7900" className="mx-auto" />
            </div>

            {/* Subheading */}
            <h2 className="font-sans text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-[#E2E8F0] text-center">
              Manipal University Jaipur
            </h2>

            {/* Description */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300 max-w-2xl mx-auto text-center">
              The flagship student cybersecurity society — advancing offensive and defensive security,
              CTF warfare, vulnerability research, and hands-on technical workshops.
            </p>

            {/* Centered Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#ff7900] px-8 py-3.5 font-sans text-sm font-bold text-black transition-all duration-300 hover:bg-white hover:shadow-[0_0_25px_rgba(255,121,0,0.6)] cursor-pointer"
              >
                <Calendar className="h-4 w-4" />
                <span>Explore Events</span>
              </Link>

              <LoginTransition>
                <div className="inline-flex items-center gap-2.5 rounded-full border border-zinc-700 bg-zinc-950/80 px-8 py-3.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:border-[#ff7900] hover:text-[#ff7900] backdrop-blur-md cursor-pointer">
                  <Lock className="h-4 w-4 text-[#ff7900]" />
                  <span>Member Login</span>
                </div>
              </LoginTransition>
            </div>

            {/* Compact Network / Learn / Build 3-Item Row (Centered) */}
            <div className="pt-4 max-w-xl mx-auto">
              <NetworkLearnBuild />
            </div>
          </div>
        </section>


        {/* --------------------------------------------------------------------------------- */}
        {/* STAGE 4: WHAT WE OFFER / BENTO ECOSYSTEM (Shield is CENTER-TOP, Bento Beneath)   */}
        {/* --------------------------------------------------------------------------------- */}
        <div className="relative z-30 w-full pointer-events-auto bg-transparent">
          <BentoGrid />
        </div>

        {/* --------------------------------------------------------------------------------- */}
        {/* STAGE 5: WHAT IS CYBER SECURITY? (Transparent wrapper)                           */}
        {/* --------------------------------------------------------------------------------- */}
        <div className="relative z-30 bg-transparent">
          <WhatIsCyberSec />
        </div>
      </main>
    </SmoothScrollProvider>
  );
}
