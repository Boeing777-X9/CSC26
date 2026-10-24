"use client";

import React from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AnimatedShaderBackgroundCanvas = dynamic(
  () => import("@/components/ui/animated-shader-hero").then((m) => m.AnimatedShaderBackgroundCanvas),
  { ssr: false }
);

export default function GlobalShaderBackground() {
  const pathname = usePathname();

  // Avoid running duplicate background WebGL shaders on the home page
  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed inset-0 -z-10 h-screen w-screen pointer-events-auto overflow-hidden bg-black">
      {/* Real-time WebGL Animated Shader Canvas */}
      <AnimatedShaderBackgroundCanvas className="absolute inset-0 w-full h-full opacity-70" />
      
      {/* Subtle Vignette & Dark Contrast Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
    </div>
  );
}
