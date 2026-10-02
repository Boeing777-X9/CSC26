import React from "react";
import { Shield, Lock, Server, Database } from "lucide-react";

export default function WhatIsCyberSec() {
  return (
    <section className="relative w-full bg-black/40 backdrop-blur-md py-24 text-white border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          {/* Left Column: Text & Badges */}
          <div className="space-y-8 lg:col-span-7">
            {/* Main Title */}
            <div>
              <h2 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl text-white">
                What is <span className="text-[#FF8C32]">Cyber Security?</span>
              </h2>
            </div>

            {/* Description 1 */}
            <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
              Technologies, processes, and practices designed to protect networks, devices, programs, and data from attack, damage, or unauthorized access. The cyberattacks are usually aimed at accessing, changing, or destroying sensitive information; extorting money from users; or interrupting normal business processes.
            </p>

            {/* 4 Security Badges Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md hover:border-[#FF8C32]/40 transition-colors">
                <Shield className="h-5 w-5 text-[#FF8C32] shrink-0" />
                <span className="font-sans text-sm font-semibold text-zinc-200">
                  Network Protection
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md hover:border-[#FF8C32]/40 transition-colors">
                <Lock className="h-5 w-5 text-[#FF8C32] shrink-0" />
                <span className="font-sans text-sm font-semibold text-zinc-200">
                  Data Security
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md hover:border-[#FF8C32]/40 transition-colors">
                <Server className="h-5 w-5 text-[#FF8C32] shrink-0" />
                <span className="font-sans text-sm font-semibold text-zinc-200">
                  System Defense
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur-md hover:border-[#FF8C32]/40 transition-colors">
                <Database className="h-5 w-5 text-[#FF8C32] shrink-0" />
                <span className="font-sans text-sm font-semibold text-zinc-200">
                  Privacy Guard
                </span>
              </div>
            </div>

            {/* Subtitle & Description 2 */}
            <div className="pt-4 space-y-3">
              <h3 className="font-sans text-xl font-bold text-[#FF8C32]">
                Why is Cyber Security Important?
              </h3>
              <p className="font-sans text-sm sm:text-base leading-relaxed text-zinc-300">
                Cybersecurity is important because it protects all categories of data from theft and damage. This includes sensitive data, personally identifiable information (PII), protected health information (PHI), personal information, intellectual property, data, and governmental and industry information systems.
              </p>
            </div>
          </div>

          {/* Right Column: Hooded Hacker Image with Orange Glow Frame */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#FF8C32] p-1 shadow-[0_0_30px_rgba(255,140,50,0.3)]">
              {/* High Quality Hooded Hacker Image */}
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop"
                alt="Cyber Security Hacker"
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
