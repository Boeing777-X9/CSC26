"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Shield, CheckCircle2, Terminal, Zap, ArrowRight } from "lucide-react";

export default function MembershipPage() {
  const perks = [
    "Full access to exclusive CTF practice challenges and pwntools sandbox environment.",
    "Priority registration for hands-on bootcamps and limited-seat workshops.",
    "Official verified CSC MUJ participation & achievement certificates.",
    "Mentorship from experienced security leads, alumni, and industry professionals.",
    "Direct eligibility for representation in national inter-college CTF leagues.",
    "Access to internal CSC Discord channels and technical research repos.",
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/40 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-4 h-4" />
            <span>JOIN CYBERSPACE CLUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CSC MUJ Club Membership
          </h1>
          <p className="text-slate-400 text-base">
            Become an active student member of Manipal University Jaipur's leading cybersecurity organization.
          </p>
        </div>

        {/* Membership Tier Card */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#ff7900] via-[#ff9533] to-[#ff7900] opacity-40 blur-xl"></div>
          <div className="relative rounded-2xl bg-[#0d0e15] border border-slate-800 p-8 sm:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-mono text-[#ff7900] font-bold uppercase tracking-wider">
                  OFFICIAL STUDENT TIER
                </span>
                <h2 className="text-2xl font-bold text-white mt-1">
                  Active Cybersecurity Member
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Academic Year 2025–2026 Session
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-3xl font-extrabold text-[#ff7900]">FREE</span>
                <span className="text-slate-400 text-xs block">For MUJ Enrolled Students</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#ff7900]" />
                <span>Membership Privileges & Features</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#161922] border border-slate-800 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#ff7900] shrink-0 mt-0.5" />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">
                Already registered? Sign in to your member portal.
              </p>
              <Link href="/auth" className="w-full sm:w-auto">
                <Button variant="orange" size="lg" className="w-full gap-2">
                  <span>Register / Sign In Now</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
