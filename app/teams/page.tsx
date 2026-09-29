"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CscLogo } from "@/components/ui/CscLogo";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import {
  Users,
  Shield,
  Terminal,
  Mail,
  Award,
  Search,
  Code2,
  Cpu,
  Zap,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: "Core Board" | "Technical & CTF" | "Operations & Logistics" | "Design & Media" | "PR & Outreach";
  bio: string;
  rankBadge: string;
  github?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
  avatarBg: string;
}

export default function TeamsPage() {
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const departments = [
    "All",
    "Core Board",
    "Technical & CTF",
    "Operations & Logistics",
    "Design & Media",
    "PR & Outreach",
  ];

  const members: TeamMember[] = [
    {
      id: "rudra",
      name: "Rudra Sharma",
      role: "President & Core Lead",
      department: "Core Board",
      bio: "Offensive security researcher and CTF player specializing in binary exploitation and web application security.",
      rankBadge: "LEVEL 5 // COMMANDER",
      github: "https://github.com/Boeing777-X9",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      email: "rudra@cscmuj.com",
      avatarBg: "from-[#ff7900] to-[#b35400]",
    },
    {
      id: "member-2",
      name: "Aarav Gupta",
      role: "Vice President",
      department: "Core Board",
      bio: "Cloud security enthusiast and DevOps engineer managing CSC MUJ infrastructure and event servers.",
      rankBadge: "LEVEL 5 // VICE COMMANDER",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "aarav@cscmuj.com",
      avatarBg: "from-sky-500 to-blue-700",
    },
    {
      id: "member-3",
      name: "Siddharth Verma",
      role: "Technical Head (CTF Lead)",
      department: "Technical & CTF",
      bio: "Reverse engineer, Ghidra wizard, and active participant in top global Jeopardy CTF tournaments.",
      rankBadge: "LEVEL 4 // CTF MASTER",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBg: "from-purple-500 to-indigo-800",
    },
    {
      id: "member-4",
      name: "Ananya Mehta",
      role: "WebSec & Cryptography Lead",
      department: "Technical & CTF",
      bio: "Penetration tester focusing on OWASP top 10 vulnerabilities, API fuzzing, and cryptographic ciphers.",
      rankBadge: "LEVEL 4 // SEC ARCHITECT",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBg: "from-emerald-500 to-teal-800",
    },
    {
      id: "member-5",
      name: "Rohan Kapoor",
      role: "Head of Operations",
      department: "Operations & Logistics",
      bio: "Orchestrating smooth venue logistics, hackathon sponsorships, and university administrative approvals.",
      rankBadge: "LEVEL 4 // OPS CHIEF",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      avatarBg: "from-amber-500 to-orange-700",
    },
    {
      id: "member-6",
      name: "Diya Sharma",
      role: "Creative & Design Lead",
      department: "Design & Media",
      bio: "UI/UX designer and visual storyteller crafting CSC MUJ brand aesthetic, posters, and web banners.",
      rankBadge: "LEVEL 4 // ART DIRECTOR",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
      avatarBg: "from-pink-500 to-rose-700",
    },
    {
      id: "member-7",
      name: "Kabir Singh",
      role: "PR & Outreach Head",
      department: "PR & Outreach",
      bio: "Building strategic alliances with corporate sponsors, external university clubs, and community outreach.",
      rankBadge: "LEVEL 4 // PR STRATEGIST",
      linkedin: "https://linkedin.com",
      avatarBg: "from-cyan-500 to-blue-600",
    },
    {
      id: "member-8",
      name: "Vikram Malhotra",
      role: "Forensics & Malware Analyst",
      department: "Technical & CTF",
      bio: "Digital forensics expert skilled in memory dump extraction, Volatility analysis, and network packet PCAP forensics.",
      rankBadge: "LEVEL 3 // ANALYST",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      avatarBg: "from-[#ff7900] to-purple-800",
    },
  ];

  const filteredMembers = members.filter((member) => {
    const matchesDept = selectedDept === "All" || member.department === selectedDept;
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/40 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
            <Users className="w-4 h-4" />
            <span>MEET THE CYBERSPACE SQUAD</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Club Teams & Leads
          </h1>
          <p className="text-slate-400 text-base">
            The dedicated security researchers, developers, event strategists, and creative designers driving CyberSpace Club (CSC MUJ).
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-[#161922] p-2 rounded-2xl border border-slate-800">
            {departments.map((dept) => {
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-[#ff7900] text-black font-bold shadow-[0_0_15px_rgba(255,121,0,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search team member by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
            />
          </div>
        </div>

        {/* Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="cyber-card rounded-2xl p-6 border-slate-800 flex flex-col justify-between relative group hover:border-[#ff7900]/50"
            >
              <div>
                {/* Member Avatar Banner */}
                <div className="relative mb-5 flex justify-center">
                  <div className={`w-24 h-24 rounded-2xl bg-gradient-to-tr ${member.avatarBg} flex items-center justify-center text-white text-3xl font-extrabold shadow-lg border-2 border-slate-700/60 group-hover:scale-105 transition-transform`}>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-[#090a0f] border border-[#ff7900]/50 text-[#ff7900] text-[10px] font-mono font-bold">
                    {member.department}
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] font-mono font-bold text-slate-400 tracking-wider">
                    {member.rankBadge}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ff7900] transition-colors mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-[#ff7900] mt-0.5">
                    {member.role}
                  </p>
                  <p className="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-3">
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#090a0f] border border-slate-800 text-slate-400 hover:text-[#ff7900] hover:border-[#ff7900]/50 transition-all"
                    aria-label="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#090a0f] border border-slate-800 text-slate-400 hover:text-[#ff7900] hover:border-[#ff7900]/50 transition-all"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#090a0f] border border-slate-800 text-slate-400 hover:text-[#ff7900] hover:border-[#ff7900]/50 transition-all"
                    aria-label="Instagram Profile"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-lg bg-[#090a0f] border border-slate-800 text-slate-400 hover:text-[#ff7900] hover:border-[#ff7900]/50 transition-all"
                    aria-label="Email Address"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
