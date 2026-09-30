"use client";

import React from "react";
import { Users, Shield, Code2 } from "lucide-react";
import TextColorReveal from "@/components/ui/text-color-reveal";

export const NetworkLearnBuild: React.FC = () => {
  const items = [
    {
      icon: Users,
      title: "Network",
      subtitle: "Connect with cyber enthusiasts",
    },
    {
      icon: Shield,
      title: "Learn",
      subtitle: "Master cybersecurity concepts",
    },
    {
      icon: Code2,
      title: "Build",
      subtitle: "Create secure solutions",
    },
  ];

  return (
    <div className="w-full pt-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="group relative flex flex-col items-start rounded-xl border border-zinc-800/80 bg-[#0B111B]/85 p-3.5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#FF8C32]/50 hover:bg-[#0B111B] hover:shadow-[0_0_15px_rgba(255,140,50,0.2)]"
            >
              {/* Compact Icon */}
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-[#FF8C32]/30 bg-[#FF8C32]/10 text-[#FF8C32]">
                <Icon className="h-4 w-4" />
              </div>

              {/* Title with Text Color Reveal Sweep */}
              <TextColorReveal
                text={item.title}
                className="text-base font-bold text-white mb-0.5"
                revealColor="#FF8C32"
              />

              {/* Subtitle */}
              <p className="font-sans text-[11px] text-[#DDDDDD] leading-tight">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NetworkLearnBuild;
