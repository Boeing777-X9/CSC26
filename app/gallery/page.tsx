"use client";

import React from "react";
import Image from "next/image";
import { Image as ImageIcon, Sparkles, Calendar, Camera } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    { title: "Flagship CTF Arena", category: "CTF Competition", year: "2026" },
    { title: "HackCyber 4.0 Keynote", category: "Hackathon", year: "2026" },
    { title: "Zero-Day Bug Bounty Workshop", category: "Workshop", year: "2026" },
    { title: "CyberCon National Summit", category: "Conference", year: "2025" },
    { title: "Reverse Eng Ghidra Lab", category: "Workshop", year: "2025" },
    { title: "CSC Orientation & Launchpad", category: "Orientation", year: "2024" },
  ];

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/40 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
            <Camera className="w-4 h-4" />
            <span>CSC MEMORY VAULT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Event Gallery & Highlights
          </h1>
          <p className="text-slate-400 text-base">
            Snapshots and moments from CyberSpace Club (CSC MUJ) hackathons, workshops, and CTF championships.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="cyber-card rounded-2xl overflow-hidden border-slate-800 group hover:border-[#ff7900]/50"
            >
              <div className="h-52 bg-gradient-to-tr from-[#161922] via-[#1f2330] to-[#ff7900]/20 flex flex-col items-center justify-center p-6 relative">
                <ImageIcon className="w-12 h-12 text-[#ff7900] opacity-80 group-hover:scale-110 transition-transform" />
                <span className="mt-2 text-xs font-mono text-slate-400">SNAP #{idx + 1}</span>
              </div>
              <div className="p-5 bg-[#0d0e15]">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                  <span className="text-[#ff7900] font-semibold">{item.category}</span>
                  <span className="font-mono">{item.year}</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#ff7900] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
