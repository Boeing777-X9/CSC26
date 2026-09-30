"use client";

import React from "react";
import { menuCategories, statsData } from "@/data/mockData";
import { ShieldAlert, Cpu, KeyRound, Terminal } from "lucide-react";

const domainIcons: Record<string, React.ReactNode> = {
  web: <ShieldAlert className="w-6 h-6 text-[#FF8C32]" />,
  binary: <Cpu className="w-6 h-6 text-[#FF8C32]" />,
  crypto: <KeyRound className="w-6 h-6 text-[#FF8C32]" />,
  re: <Terminal className="w-6 h-6 text-[#FF8C32]" />,
};

export default function CyberDomains() {
  return (
    <section className="relative z-10 w-full bg-zinc-950/90 border-t border-b border-zinc-800/60 py-20 px-6 sm:px-10 lg:px-20 backdrop-blur-md">
      {/* Stats Counter Row from Ojash */}
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md text-center hover:border-[#FF8C32]/50 transition-all duration-300 group"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-[#FF8C32] tracking-tight group-hover:scale-105 transition-transform">
              {stat.value}
            </div>
            <div className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-400">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Domain Focus Cards Header */}
      <div className="mx-auto max-w-6xl text-center mb-14">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#FF8C32] bg-[#FF8C32]/10 border border-[#FF8C32]/30 mb-3">
          Cyber Specializations
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Pillars of CyberSpace
        </h2>
        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-sm sm:text-base">
          From binary exploitation to breaking cryptographic primitives, our members master real-world cybersecurity disciplines.
        </p>
      </div>

      {/* Grid of Domain Cards */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {menuCategories.map((cat) => (
          <div
            key={cat.id}
            className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-7 hover:border-[#FF8C32]/60 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#FF8C32]/10 border border-[#FF8C32]/20">
                  {domainIcons[cat.id] || <Terminal className="w-6 h-6 text-[#FF8C32]" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#FF8C32] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-400">{cat.description}</p>
                </div>
              </div>
            </div>

            {/* List of Module Topics */}
            <div className="mt-6 space-y-3">
              {cat.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/40 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-200">{item.name}</span>
                    <span className="text-xs text-zinc-500">{item.description}</span>
                  </div>
                  <span className="font-mono text-xs text-[#FF8C32] bg-[#FF8C32]/10 px-2.5 py-1 rounded-md">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
