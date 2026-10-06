"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { KageLandingPage } from "../shaders/landing-pages/LandingPages";
import "../shaders/threeui.css";

const BlackHoleHeroSection = dynamic(
  () => import("@/components/ui/blackhole-hero-section"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative min-h-screen w-full bg-black overflow-hidden">
      {/* 1. Fixed Persistent Black Hole Background Canvas */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <BlackHoleHeroSection
          hotColor="#FFF3DE"
          midColor="#FF8C32"
          coolColor="#C06014"
          focus={[0.72, 0.46]}
          scrim="left"
          scrimStrength={0.85}
          distance={24}
          elevation={-5.5}
          fov={42}
          glow={1}
          steps={160}
          resolution={0.55}
        />
      </div>

      {/* 2. Kage Text & Scroll Mechanics Overlay */}
      <div className="absolute inset-0 z-10 shader-frame">
        <KageLandingPage
          headingFont="onest"
          bodyFont="onest"
          headingWeight="400"
          bodyWeight="300"
          primaryColor="#FF8C32"
          headingSize={46}
          bodySize={17}
          headingLetterSpacing={-0.012}
        />
      </div>
    </main>
  );
}
