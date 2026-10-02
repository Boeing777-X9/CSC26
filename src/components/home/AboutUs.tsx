import React from "react";
import { CscLogo } from "@/components/ui/CscLogo";
import BreathingText from "@/components/ui/breathing-text";

export default function AboutUs() {
  return (
    <section className="relative w-full bg-black/40 backdrop-blur-md py-24 text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        {/* Section Heading with BreathingText */}
        <div className="mb-16 text-center flex justify-center">
          <BreathingText 
            label="WHO ARE WE"
            staggerDuration={0.08}
            staggerFrom="center"
            fromFontVariationSettings="'wght' 100, 'slnt' 0"
            toFontVariationSettings="'wght' 900, 'slnt' -10"
            className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,140,50,0.5)]"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Shield Logo */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative p-6 filter drop-shadow-[0_0_20px_rgba(255,140,50,0.25)]">
              <CscLogo size={220} showText={false} />
            </div>
          </div>

          {/* Right Column: OG About Info & 4-card Grid */}
          <div className="space-y-6 lg:col-span-7">
            <h3 className="font-cyber text-2xl font-black uppercase text-[#FF8C32] tracking-wider">
              CYBER SPACE CLUB
            </h3>
            <p className="font-sans text-base leading-relaxed text-zinc-300 sm:text-lg">
              We aim to build an active society for students interested in the domain of cyber security and uplift this culture in MUJ.
            </p>

            {/* 2x2 Grid matching Pic 3 */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all hover:border-[#FF8C32]/50 hover:bg-black/45">
                <h4 className="font-sans text-base font-bold text-[#FF8C32]">
                  Learn
                </h4>
                <p className="mt-1 font-sans text-xs text-zinc-400">
                  Expert-led workshops
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all hover:border-[#FF8C32]/50 hover:bg-black/45">
                <h4 className="font-sans text-base font-bold text-[#FF8C32]">
                  Grow
                </h4>
                <p className="mt-1 font-sans text-xs text-zinc-400">
                  Hands-on experience
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all hover:border-[#FF8C32]/50 hover:bg-black/45">
                <h4 className="font-sans text-base font-bold text-[#FF8C32]">
                  Connect
                </h4>
                <p className="mt-1 font-sans text-xs text-zinc-400">
                  Network with peers
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-5 backdrop-blur-md transition-all hover:border-[#FF8C32]/50 hover:bg-black/45">
                <h4 className="font-sans text-base font-bold text-[#FF8C32]">
                  Achieve
                </h4>
                <p className="mt-1 font-sans text-xs text-zinc-400">
                  Build your portfolio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
