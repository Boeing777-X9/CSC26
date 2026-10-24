"use client";

import React, { useEffect, useRef, useState } from "react";

export interface VantaFogOptions {
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
  blurFactor?: number;
  speed?: number;
  zoom?: number;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
}

export interface VantaFogBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  options?: VantaFogOptions;
  highlightColor?: number;
  midtoneColor?: number;
  lowlightColor?: number;
  baseColor?: number;
  blurFactor?: number;
  speed?: number;
  zoom?: number;
  children?: React.ReactNode;
}

// Helper to sequentially load script tags
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    // Check if script already exists in DOM
    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (existing) {
      if ((existing as any).__loaded) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => {
        (existing as any).__loaded = true;
        resolve();
      });
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => {
      (script as any).__loaded = true;
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function VantaFogBackground({
  className = "",
  style,
  options,
  highlightColor = 0xff7900, // CSC Signature Cyber Orange (#ff7900)
  midtoneColor = 0x000000,   // Pure dark cyber void
  lowlightColor = 0x000000,  // Deep black
  baseColor = 0x050508,      // Deep cyber background (#050508)
  blurFactor = 0.6,
  speed = 1.2,
  zoom = 1.0,
  children,
}: VantaFogBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const vantaEffectRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Effective colors
  const effectiveHighlight = options?.highlightColor ?? highlightColor;
  const effectiveMidtone = options?.midtoneColor ?? midtoneColor;
  const effectiveLowlight = options?.lowlightColor ?? lowlightColor;
  const effectiveBase = options?.baseColor ?? baseColor;
  const effectiveBlur = options?.blurFactor ?? blurFactor;
  const effectiveSpeed = options?.speed ?? speed;
  const effectiveZoom = options?.zoom ?? zoom;

  useEffect(() => {
    let isCancelled = false;

    async function initVanta() {
      try {
        // Load Three.js r134 first, then Vanta Fog (served from local /public/vanta/ with CDN fallback)
        try {
          await loadScript("/vanta/three.r134.min.js");
        } catch {
          await loadScript("https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js");
        }

        try {
          await loadScript("/vanta/vanta.fog.min.js");
        } catch {
          await loadScript("https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js");
        }

        if (isCancelled || !containerRef.current) return;

        const w = window as any;
        if (w.VANTA && w.VANTA.FOG) {
          // Clean up any existing effect instance
          if (vantaEffectRef.current && typeof vantaEffectRef.current.destroy === "function") {
            vantaEffectRef.current.destroy();
            vantaEffectRef.current = null;
          }

          vantaEffectRef.current = w.VANTA.FOG({
            el: containerRef.current,
            THREE: w.THREE,
            mouseControls: options?.mouseControls ?? true,
            touchControls: options?.touchControls ?? true,
            gyroControls: options?.gyroControls ?? false,
            minHeight: options?.minHeight ?? 200.0,
            minWidth: options?.minWidth ?? 200.0,
            highlightColor: effectiveHighlight,
            midtoneColor: effectiveMidtone,
            lowlightColor: effectiveLowlight,
            baseColor: effectiveBase,
            blurFactor: effectiveBlur,
            speed: effectiveSpeed,
            zoom: effectiveZoom,
          });

          setIsLoaded(true);
        }
      } catch (err) {
        console.error("Vanta Fog initialization error:", err);
      }
    }

    initVanta();

    return () => {
      isCancelled = true;
      if (vantaEffectRef.current && typeof vantaEffectRef.current.destroy === "function") {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

  // Update uniforms if colors change dynamically
  useEffect(() => {
    if (vantaEffectRef.current && typeof vantaEffectRef.current.setOptions === "function") {
      vantaEffectRef.current.setOptions({
        highlightColor: effectiveHighlight,
        midtoneColor: effectiveMidtone,
        lowlightColor: effectiveLowlight,
        baseColor: effectiveBase,
        blurFactor: effectiveBlur,
        speed: effectiveSpeed,
        zoom: effectiveZoom,
      });
    }
  }, [
    effectiveHighlight,
    effectiveMidtone,
    effectiveLowlight,
    effectiveBase,
    effectiveBlur,
    effectiveSpeed,
    effectiveZoom,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
