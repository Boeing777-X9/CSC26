"use client";

import React from "react";
import Link from "next/link";
import { SpotlightCard } from "@/components/ui/Spotlight";
import {
  Trophy,
  Swords,
  Laptop,
  Mic,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Target,
  Coins,
  ArrowRight,
} from "lucide-react";

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/40 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-[#ff7900]" />
          <span>WHAT WE OFFER</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Real Opportunities. <span className="text-[#ff7900]">Real Impact.</span>
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From ₹1,00,000+ prize pools and high-stakes CTFs to hands-on workshops, keynotes with industry giants, and career-launching internships.
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: 🏆 ₹1,00,000+ Prize Pools (Col span 2) */}
        <SpotlightCard className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="text-[#ff7900] text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#ff7900]" />
                FLAGSHIP INCENTIVES
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#ff7900]/15 text-[#ff7900] border border-[#ff7900]/30">
                ANNUAL REWARDS
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <div className="flex items-baseline gap-2.5">
                <span className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-[#ff7900] to-[#ff9e3b] font-mono">
                  ₹1,00,000+
                </span>
                <span className="text-xs sm:text-sm font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                  Prize Pools
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Cash Prizes, Hackathons & Bounties
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Substantial cash prize pools, bug bounties, and tech rewards distributed across club-hosted hackathons, campus CTF tournaments, and vulnerability hunts throughout the year.
              </p>
            </div>

            {/* Breakdown Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400 text-[11px]">Flagship CTF</span>
                <span className="text-[#ff7900] font-bold text-sm mt-1">₹50,000+</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400 text-[11px]">Hackathons</span>
                <span className="text-white font-bold text-sm mt-1">₹35,000+</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400 text-[11px]">Bounties & Mini-CTF</span>
                <span className="text-amber-300 font-bold text-sm mt-1">₹15,000+</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Coins className="w-3.5 h-3.5 text-[#ff7900]" />
              Open to all MUJ students & participants
            </span>
            <span className="text-[#ff7900] font-semibold">Real Stakes</span>
          </div>
        </SpotlightCard>

        {/* Card 2: ⚔️ CTFs, ethical hacking & competitions (Col span 1) */}
        <SpotlightCard className="md:col-span-1 lg:col-span-1 p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-[#ff7900]/10 border border-[#ff7900]/30 text-[#ff7900]">
                <Swords className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                ARENA
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              CTFs & Ethical Hacking
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              High-intensity Jeopardy and Attack-Defense CTF battles, penetration testing challenges, and ethical hacking tournaments.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
              <span className="px-2 py-1 rounded-md bg-[#ff7900]/10 border border-[#ff7900]/20 text-[#ff7900]">
                PWN / BINARY
              </span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                WEB EXPLOIT
              </span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                REVERSE ENG
              </span>
              <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300">
                CRYPTO
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-[#ff7900]" />
                National Rank
              </span>
              <span className="text-emerald-400 font-bold">Top 10 Tier</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 3: 💻 Hackathons, workshops & hands-on learning (Col span 1) */}
        <SpotlightCard className="md:col-span-1 lg:col-span-1 p-6 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 border border-sky-500/20 text-sky-400">
                PRACTICAL
              </span>
            </div>

            <h3 className="text-xl font-bold text-white tracking-tight">
              Hackathons & Workshops
            </h3>
            <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
              Intensive developer hackathons, zero-fluff live security labs, and hands-on skill development from beginner to advanced.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <div className="p-3 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px] space-y-1.5">
              <div className="text-zinc-500 flex items-center justify-between">
                <span>$ csc lab --init</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="text-zinc-300 text-[10px] leading-tight">
                &gt; Loaded: Burp Suite, Wireshark, Ghidra &amp; Docker
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-sky-400 font-mono font-bold pt-1">
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
              <span>100% Practical &amp; Project-Driven</span>
            </div>
          </div>
        </SpotlightCard>

        {/* Card 4: 🎤 Industry & alumni talks from Cisco, Google, Adobe, DRDO & more (Col span 2) */}
        <SpotlightCard className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="text-[#ff7900] text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <Mic className="w-4 h-4 text-[#ff7900]" />
                KEYNOTES &amp; FIRESIDE CHATS
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 border border-white/10 text-zinc-300">
                ELITE SESSIONS
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Industry &amp; Alumni Talks
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Gain direct insights, defense cyber briefings, and technical mentorship from senior security engineers and accomplished alumni at world-leading organizations.
              </p>
            </div>

            {/* Featured Organizations */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-[#ff7900]/50 transition-colors flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-[#ff7900]" />
                <span className="font-bold text-white">Cisco</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-blue-400/50 transition-colors flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="font-bold text-white">Google</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-red-400/50 transition-colors flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <span className="font-bold text-white">Adobe</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-400/50 transition-colors flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-bold text-white">DRDO</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
            <span className="text-zinc-400">Closed-door AMAs, career roadmaps &amp; live masterclasses</span>
            <span className="text-[#ff7900] font-semibold">&amp; More</span>
          </div>
        </SpotlightCard>

        {/* Card 5: 💼 Internship & interview opportunities (Col span 2) */}
        <SpotlightCard className="md:col-span-2 lg:col-span-2 p-6 sm:p-8 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-emerald-400" />
                CAREER LAUNCHPAD
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-400/10 border border-emerald-400/20 text-emerald-400">
                HIRING PIPELINES
              </span>
            </div>

            <div className="space-y-2 mb-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Internship &amp; Interview Opportunities
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Connect directly with cyber firms and tech companies through alumni referrals, mock technical interview sessions, resume reviews, and verified skill badges.
              </p>
            </div>

            {/* Opportunities Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-200 text-xs">Mock Tech Rounds</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-200 text-xs">Alumni Fast-Track</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-zinc-200 text-xs">CV &amp; Portfolio Roast</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400 font-mono">Accelerate your career in cyber security</span>
            <Link
              href="/events"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff7900] hover:text-white transition-colors"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
};
