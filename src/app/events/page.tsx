"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CscLogo } from "@/components/ui/CscLogo";
import {
  Calendar,
  Award,
  Download,
  Search,
  Filter,
  CheckCircle2,
  X,
  FileCheck,
  Shield,
  QrCode,
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  User,
} from "lucide-react";

interface EventItem {
  id: string;
  year: "2026" | "2025" | "2024";
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  status: "Upcoming" | "Completed" | "Ongoing";
  speaker?: string;
  certificateAvailable: boolean;
}

export default function EventsPage() {
  const [selectedYear, setSelectedYear] = useState<"2026" | "2025" | "2024">("2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventForCertificate, setSelectedEventForCertificate] = useState<EventItem | null>(null);

  // Certificate Form Inputs
  const [certName, setCertName] = useState("Rudra Sharma");
  const [certRegNo, setCertRegNo] = useState("249301045");
  const [certDownloaded, setCertDownloaded] = useState(false);

  const eventsList: EventItem[] = [
    // 2026 Events
    {
      id: "ctf-2026",
      year: "2026",
      title: "Flagship CyberSpace CTF 2026",
      category: "CTF Competition",
      date: "March 15, 2026",
      time: "10:00 AM - 10:00 PM IST",
      venue: "MUJ Tech Center & Online",
      description:
        "12-hour Jeopardy-style Capture The Flag competition featuring challenges in Binary Exploitation, WebSec, Reverse Engineering, Cryptography, and Forensics.",
      status: "Upcoming",
      speaker: "CSC MUJ Core Tech Team",
      certificateAvailable: true,
    },
    {
      id: "hackcyber-4",
      year: "2026",
      title: "HackCyber 4.0 Hackathon",
      category: "Hackathon",
      date: "February 20, 2026",
      time: "09:00 AM - 05:00 PM IST",
      venue: "Lab 304, Academic Block 1",
      description:
        "24-hour offensive and defensive security hackathon building automated threat response bots and secure web architectures.",
      status: "Completed",
      speaker: "Industry Experts & Alumni",
      certificateAvailable: true,
    },
    {
      id: "bugbounty-2026",
      year: "2026",
      title: "Zero-Day Bug Bounty Bootcamp",
      category: "Workshop",
      date: "January 10, 2026",
      time: "02:00 PM - 06:00 PM IST",
      venue: "Auditorium 2, MUJ",
      description:
        "Hands-on workshop on finding business logic flaws, IDORs, and SSRF in real bug bounty programs like HackerOne and Bugcrowd.",
      status: "Completed",
      speaker: "Top Bug Bounty Hunters",
      certificateAvailable: true,
    },
    {
      id: "ai-sec-2026",
      year: "2026",
      title: "AI & LLM Security Summit 2026",
      category: "Conference",
      date: "April 05, 2026",
      time: "11:00 AM - 04:00 PM IST",
      venue: "Main Amphitheatre",
      description:
        "Exploring adversarial prompt injections, model extraction attacks, and securing generative AI deployments.",
      status: "Upcoming",
      speaker: "Security Researchers",
      certificateAvailable: true,
    },

    // 2025 Events
    {
      id: "cybercon-2025",
      year: "2025",
      title: "CyberCon Annual Conference 2025",
      category: "Conference",
      date: "November 12, 2025",
      time: "10:00 AM IST",
      venue: "MUJ Convention Hall",
      description:
        "Annual security conference featuring keynote talks on ransomware mitigation, SOC operations, and threat intelligence.",
      status: "Completed",
      speaker: "Chief Information Security Officers",
      certificateAvailable: true,
    },
    {
      id: "reveng-2025",
      year: "2025",
      title: "Reverse Engineering 101 with Ghidra",
      category: "Workshop",
      date: "September 18, 2025",
      time: "03:00 PM IST",
      venue: "CS Lab 102",
      description:
        "Deep dive into x86/ARM disassembly, decompilation using NSA's Ghidra, and analyzing unpacked malware samples.",
      status: "Completed",
      speaker: "CSC Reverse Eng Division",
      certificateAvailable: true,
    },
    {
      id: "websec-2025",
      year: "2025",
      title: "OWASP Top 10 Hands-on Masterclass",
      category: "Workshop",
      date: "April 22, 2025",
      time: "02:00 PM IST",
      venue: "Online Labs",
      description:
        "Practical exploitation of SQL injections, Cross-Site Scripting (XSS), and Broken Access Controls in vulnerable environments.",
      status: "Completed",
      speaker: "CSC WebSec Lead",
      certificateAvailable: true,
    },
    {
      id: "winter-ctf-2025",
      year: "2025",
      title: "Winter CTF Battle 2025",
      category: "CTF Competition",
      date: "December 05, 2025",
      time: "06:00 PM IST",
      venue: "Online Arena",
      description:
        "Overnight beginner-friendly CTF challenge designed for freshmen to test their cryptography and web exploitation skills.",
      status: "Completed",
      speaker: "CSC CTF Team",
      certificateAvailable: true,
    },

    // 2024 Events
    {
      id: "launchpad-2024",
      year: "2024",
      title: "CSC Launchpad & Orientation 2024",
      category: "Orientation",
      date: "August 28, 2024",
      time: "04:00 PM IST",
      venue: "MUJ Auditorium 1",
      description:
        "Official inaugural ceremony of CyberSpace Club for the 2024 academic session with live hacking demonstrations.",
      status: "Completed",
      speaker: "CSC Executive Board",
      certificateAvailable: true,
    },
    {
      id: "netdef-2024",
      year: "2024",
      title: "Network Defense & Wireshark Bootcamp",
      category: "Workshop",
      date: "October 14, 2024",
      time: "02:30 PM IST",
      venue: "Networking Lab",
      description:
        "Analyzing PCAP traffic files, packet inspection, detecting TCP SYN scans, and configuring Snort IDS rules.",
      status: "Completed",
      speaker: "Network Security Team",
      certificateAvailable: true,
    },
    {
      id: "crypto-2024",
      year: "2024",
      title: "Applied Cryptography Challenge 2024",
      category: "Challenge",
      date: "November 20, 2024",
      time: "05:00 PM IST",
      venue: "Online Sandbox",
      description:
        "Breaking weak RSA key implementations, AES cipher modes, and hash collision algorithms.",
      status: "Completed",
      speaker: "Crypto Core",
      certificateAvailable: true,
    },
  ];

  const filteredEvents = eventsList.filter((event) => {
    const matchesYear = event.year === selectedYear;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const handleDownloadCertificateAction = () => {
    setCertDownloaded(true);

    // Create dynamic SVG export and initiate download
    const svgElement = document.getElementById("certificate-svg-canvas");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const SVGURL = window.URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = SVGURL;
    downloadLink.download = `${certName.replace(/\s+/g, "_")}_CSC_MUJ_Certificate_${selectedEventForCertificate?.year}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/40 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>CSC EVENTS & CERTIFICATE HUB</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            CyberSpace Club Events
          </h1>
          <p className="text-slate-400 text-base">
            Select an event year from the navigation bar below to view workshops, hackathons, and download your official participation certificate.
          </p>
        </div>

        {/* Top Year Selector Navbar (as explicitly requested by user) */}
        <div className="sticky top-20 z-40 bg-[#090a0f]/95 backdrop-blur-md p-2 rounded-2xl border border-[#282d3d] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-[#161922] p-1.5 rounded-xl border border-slate-800 w-full sm:w-auto">
            {(["2026", "2025", "2024"] as const).map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#ff7900] to-[#ff9533] text-black shadow-[0_0_15px_rgba(255,121,0,0.5)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {year} Events
                </button>
              );
            })}
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search event title or track..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900]"
            />
          </div>
        </div>

        {/* Event List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="cyber-card p-6 rounded-2xl border-slate-800 flex flex-col justify-between relative group hover:border-[#ff7900]/50"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ff7900]/15 text-[#ff7900] border border-[#ff7900]/30">
                      {event.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "Upcoming"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#ff7900] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-slate-300 text-sm mt-2 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-xs text-slate-400 font-mono">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#ff7900]" />
                      <span>{event.date} • {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#ff7900]" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400 italic">
                    {event.speaker ? `By ${event.speaker}` : "CSC MUJ Organized"}
                  </span>

                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => {
                      setSelectedEventForCertificate(event);
                      setCertDownloaded(false);
                    }}
                    className="gap-2 shrink-0"
                  >
                    <Download className="w-4 h-4 text-[#ff7900]" />
                    <span>Download Certificate</span>
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16 bg-[#161922] rounded-2xl border border-slate-800">
              <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">No Events Found</h3>
              <p className="text-slate-400 text-sm mt-1">
                No events matched your filter criteria for {selectedYear}.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Certificate Generator Modal Drawer */}
      {selectedEventForCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0d0e15] border border-[#ff7900]/40 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <CscLogo size={36} showText={false} />
                <div>
                  <h3 className="text-xl font-bold text-white">Download Event Certificate</h3>
                  <p className="text-xs text-slate-400">
                    Dynamic Official Verification Certificate for {selectedEventForCertificate.title}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEventForCertificate(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Custom Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#161922] p-4 rounded-xl border border-slate-800">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  PARTICIPANT FULL NAME
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-9 pr-3 py-2 bg-[#090a0f] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#ff7900]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 mb-1">
                  REGISTRATION / MEMBER ID
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={certRegNo}
                    onChange={(e) => setCertRegNo(e.target.value)}
                    placeholder="e.g. 249301045"
                    className="w-full pl-9 pr-3 py-2 bg-[#090a0f] border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#ff7900]"
                  />
                </div>
              </div>
            </div>

            {/* Live Certificate Graphic Preview */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-black p-2 flex justify-center">
              <svg
                id="certificate-svg-canvas"
                width="800"
                height="560"
                viewBox="0 0 800 560"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-full h-auto bg-[#090A0F] rounded-lg border border-[#FF7900]/30 shadow-2xl"
              >
                {/* Border Outer Frame */}
                <rect x="20" y="20" width="760" height="520" rx="12" fill="#0D0E15" stroke="#282D3D" strokeWidth="2" />
                <rect x="30" y="30" width="740" height="500" rx="8" fill="none" stroke="#FF7900" strokeWidth="1.5" strokeDasharray="6 6" />

                {/* CSC MUJ Brand Header */}
                <g transform="translate(60, 55)">
                  {/* Left Silver Shield 'C' */}
                  <path d="M 30 10 H 15 C 12 10 11 17 11 25 V 40 C 11 49 19 55 30 59 V 53 C 22 50 16 44 16 38 V 20 H 30 V 10 Z" fill="#CBD5E1" />
                  {/* Right Orange Shield 'S' */}
                  <path d="M 35 10 H 50 C 50 10 46 19 35 21 V 30 C 46 30 51 35 46 42 C 41 47 35 49 35 49 V 43 C 39 40 41 37 40 34 C 39 32 35 32 35 32 V 10 Z" fill="#FF7900" />
                  {/* Center Eye */}
                  <ellipse cx="32" cy="34" rx="14" ry="8" fill="#090A0F" stroke="#334155" strokeWidth="1" />
                  <ellipse cx="32" cy="34" rx="12" ry="6" fill="#F8FAFC" />
                  <circle cx="32" cy="34" r="4" fill="#0F172A" />
                  <circle cx="31" cy="33" r="1.2" fill="#FF7900" />

                  <text x="65" y="32" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="sans-serif">CYBERSPACE CLUB</text>
                  <text x="65" y="48" fill="#FF7900" fontSize="13" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">MANIPAL UNIVERSITY JAIPUR</text>
                </g>

                {/* Certificate Title */}
                <text x="400" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="800" fontFamily="sans-serif" letterSpacing="2">
                  CERTIFICATE OF PARTICIPATION
                </text>
                <text x="400" y="200" textAnchor="middle" fill="#FF7900" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="4">
                  PROUDLY PRESENTED TO
                </text>

                {/* Dynamic Member Name */}
                <text x="400" y="255" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="bold" fontFamily="sans-serif">
                  {certName || "Participant Name"}
                </text>
                <line x1="220" y1="270" x2="580" y2="270" stroke="#FF7900" strokeWidth="2" />
                <text x="400" y="290" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="monospace">
                  REGISTRATION NO: {certRegNo || "MUJ-MEM-2026"}
                </text>

                {/* Event Description */}
                <text x="400" y="335" textAnchor="middle" fill="#CBD5E1" fontSize="14" fontFamily="sans-serif">
                  For active participation and demonstrated skill in the official event:
                </text>
                <text x="400" y="365" textAnchor="middle" fill="#FF7900" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
                  {selectedEventForCertificate.title} ({selectedEventForCertificate.year})
                </text>

                {/* Footer Meta & Signatures */}
                <g transform="translate(70, 430)">
                  <line x1="0" y1="40" x2="160" y2="40" stroke="#475569" strokeWidth="1" />
                  <text x="80" y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">Event Chair / Lead</text>
                  <text x="80" y="32" textAnchor="middle" fill="#FF7900" fontSize="13" fontWeight="bold" fontFamily="cursive">Rudra Sharma</text>
                </g>

                {/* QR Code Graphic placeholder */}
                <g transform="translate(365, 420)">
                  <rect x="0" y="0" width="70" height="70" fill="#1E293B" rx="6" />
                  <path d="M 10 10 H 30 V 30 H 10 Z M 40 10 H 60 V 30 H 40 Z M 10 40 H 30 V 60 H 10 Z M 45 45 H 55 V 55 H 45 Z" fill="#FF7900" />
                  <text x="35" y="82" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">VERIFIED ID: {selectedEventForCertificate.id.toUpperCase()}</text>
                </g>

                <g transform="translate(570, 430)">
                  <line x1="0" y1="40" x2="160" y2="40" stroke="#475569" strokeWidth="1" />
                  <text x="80" y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">Faculty Coordinator</text>
                  <text x="80" y="32" textAnchor="middle" fill="#CBD5E1" fontSize="13" fontWeight="bold" fontFamily="cursive">CSC MUJ Faculty</text>
                </g>
              </svg>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Certificate render dynamically generated for {certName}</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setSelectedEventForCertificate(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="orange"
                  size="md"
                  onClick={handleDownloadCertificateAction}
                  className="gap-2 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download SVG/PNG Certificate</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
