"use client";

import React, { useState } from "react";
import { SpotlightCard } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Terminal,
  Lock,
  Award,
  KeyRound,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  Code2,
  RefreshCw,
} from "lucide-react";

export const BentoGrid: React.FC = () => {
  // Cipher Widget Interactive State
  const [encryptedText, setEncryptedText] = useState("PLOIENCRC CLHO (PFD ZHM)");
  const [decrypted, setDecrypted] = useState(false);

  const handleDecrypt = () => {
    setEncryptedText("CYBER SPACE CLUB (CSC MUJ)");
    setDecrypted(true);
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff8c32]/40 text-[#ff8c32] text-xs font-mono font-bold uppercase tracking-widest">
          <Zap className="w-4 h-4" />
          <span>CYBER ARCHITECTURE & CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Built for Security Engineers
        </h2>
        <p className="text-slate-400 text-base">
          Discover why CYBER SPACE CLUB is the leading technical organization at Manipal University Jaipur.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Large Feature Card 1: Interactive Cipher Decrypter */}
        <SpotlightCard className="md:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
              <span className="text-[#ff8c32] text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                CRYPTOGRAPHY LAB WIDGET
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#ff8c32]/15 text-[#ff8c32]">
                INTERACTIVE
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Cipher Systems & Cryptanalysis
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Learn symmetric/asymmetric encryption, break ciphers, and implement secure hashes. Test our live decryption widget below:
            </p>

            {/* Interactive Decrypter Box */}
            <div className="p-4 rounded-xl bg-[#08090e] border border-slate-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>ENCRYPTED CIPHERTEXT:</span>
                <span className="text-[#ff8c32]">{decrypted ? "STATUS: DECRYPTED" : "ALGORITHM: ROT13"}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#11131c] text-white font-bold text-sm tracking-widest border border-slate-700/60">
                {encryptedText}
              </div>
              <button
                onClick={handleDecrypt}
                disabled={decrypted}
                className="w-full py-2.5 rounded-lg bg-[#ff8c32] text-black font-bold flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${decrypted ? "" : "animate-spin"}`} />
                <span>{decrypted ? "Decryption Complete!" : "Execute Decryption Key"}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
            <span>Module: Crypto & RSA Labs</span>
            <span className="text-[#ff8c32]">CSC MUJ Security</span>
          </div>
        </SpotlightCard>

        {/* Feature Card 2: CTF Scoreboard & Glory */}
        <SpotlightCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-[#ff8c32]/10 text-[#ff8c32] w-fit mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">40+ CTF Trophies</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Consistently ranking in top university leaderboards across national Jeopardy & Attack-Defense CTF tournaments.
            </p>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-[#08090e] border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span>#1 MUJ League</span>
              <span className="text-emerald-400 font-bold">4,850 PTS</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="w-[88%] h-full bg-gradient-to-r from-[#ff8c32] to-emerald-400"></div>
            </div>
          </div>
        </SpotlightCard>

        {/* Feature Card 3: Hands-on Bootcamps */}
        <SpotlightCard className="p-6 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">30+ Bootcamps</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              Hands-on lab sessions in Linux command line, Wireshark packet capture, Burp Suite API testing, and Ghidra disassembly.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-xs text-sky-400 font-mono font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>100% Practical Exercises</span>
          </div>
        </SpotlightCard>

        {/* Feature Card 4: Verified Event Certificate System */}
        <SpotlightCard className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <Shield className="w-4 h-4" />
                VERIFIED CREDENTIALS
              </span>
              <span className="text-xs text-slate-400 font-mono">YEARS: 2026 / 2025 / 2024</span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Official Dynamic Event Certificates
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every CSC MUJ workshop, CTF, and hackathon awards an official verified certificate of completion. Members can access their certificates anytime with custom student credentials.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Select year 2026, 2025 or 2024 on Events page</span>
            <a href="/events">
              <Button variant="cyber" size="sm" className="gap-2">
                <span>Try Certificate Portal</span>
                <ArrowRight className="w-4 h-4 text-[#ff8c32]" />
              </Button>
            </a>
          </div>
        </SpotlightCard>

        {/* Feature Card 5: Student Community */}
        <SpotlightCard className="md:col-span-1 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">500+ Active Members</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              A thriving ecosystem of developers, security researchers, and hackers collaborating on real-world projects and security advisories.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex -space-x-2">
              {["R", "A", "S", "V"].map((initial, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#1e2330] border-2 border-[#0d0e15] text-white text-xs font-bold flex items-center justify-center"
                >
                  {initial}
                </div>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-400">+500 more enrolled</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
