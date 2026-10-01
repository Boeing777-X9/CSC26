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
  AlertCircle,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { eventsList, EventItem } from "@/lib/data/events";
import { lookupCertificate, VerifiedCertificate } from "@/lib/data/certificates";
import ExpandingSearchDock from "@/components/ui/ExpandingSearchDock";

export default function EventsPage() {
  const [selectedYear, setSelectedYear] = useState<"2025" | "2024">("2025");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventForCertificate, setSelectedEventForCertificate] = useState<EventItem | null>(null);

  // Certificate Verification & Search State
  const [searchRegNo, setSearchRegNo] = useState("249301045");
  const [verifiedCert, setVerifiedCert] = useState<VerifiedCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [certDownloaded, setCertDownloaded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const filteredEvents = eventsList.filter((event) => {
    const matchesYear = event.year === selectedYear;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesSearch;
  });

  const handleOpenEventModal = (event: EventItem) => {
    setSelectedEventForCertificate(event);
    setCertDownloaded(false);
    setIsSearchOpen(false);
    setHasSearched(false);
    setVerifiedCert(null);
  };

  const handleSearchRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventForCertificate) return;
    setHasSearched(true);
    setCertDownloaded(false);
    const result = lookupCertificate(selectedEventForCertificate.id, searchRegNo);
    setVerifiedCert(result);
  };

  const handleDownloadCertificateAction = () => {
    if (!verifiedCert || !selectedEventForCertificate) return;
    setCertDownloaded(true);

    const svgElement = document.getElementById("certificate-svg-canvas");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const SVGURL = window.URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = SVGURL;
    downloadLink.download = `${verifiedCert.participantName.replace(/\s+/g, "_")}_CSC_MUJ_Certificate_${selectedEventForCertificate.year}.svg`;
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

        {/* Subtle Events Navigation & Search Bar */}
        <div className="sticky top-20 z-40 bg-black/85 backdrop-blur-xl p-2 rounded-full border border-zinc-800/80 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          {/* Subtle Year Switcher Pill Tabs */}
          <div className="flex items-center gap-1.5 bg-zinc-950/90 p-1.5 rounded-full border border-zinc-800/80 w-full sm:w-auto justify-center">
            {(["2025", "2024"] as const).map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2 text-xs font-sans font-bold rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-[#FF7900] text-black shadow-[0_0_15px_rgba(255,121,0,0.5)]"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {year} Events
                </button>
              );
            })}
          </div>

          {/* Expanding Search Dock inside Events Bar */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end pr-1">
            <ExpandingSearchDock />
          </div>
        </div>

        {/* Event List Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#0d0e15] shadow-2xl transition-all duration-300 hover:border-[#ff7900]/60 hover:shadow-[0_0_30px_rgba(255,121,0,0.25)] flex flex-col justify-between"
              >
                {/* Poster Image Container */}
                <div
                  onClick={() => handleOpenEventModal(event)}
                  className="relative aspect-[3/4] w-full overflow-hidden bg-black/80 cursor-pointer"
                >
                  <img
                    src={event.poster || "/events/posters/decrypta.webp"}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Status & Category Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/70 backdrop-blur-md text-[#ff7900] border border-[#ff7900]/40">
                      {event.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      {event.status}
                    </span>
                  </div>

                  {/* Bottom Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                  {/* Overlay Title & Tags */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2.5 z-10">
                    <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md group-hover:text-[#ff7900] transition-colors">
                      {event.title}
                    </h3>

                    {/* Tags Pills Row */}
                    {event.tags && event.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-zinc-800/90 text-zinc-300 text-xs font-sans font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
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

      {/* Event Details Modal */}
      {selectedEventForCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0e15] border border-[#ff7900]/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {/* Background Event Poster with Blur & Dark Gradient Overlay */}
            <div
              className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-cover bg-center filter blur-2xl transform scale-110"
              style={{
                backgroundImage: `url(${selectedEventForCertificate.poster || "/events/posters/decrypta.webp"})`,
              }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d0e15]/95 via-[#0d0e15]/90 to-[#0d0e15] pointer-events-none" />

            {/* Modal Content Wrapper (Relative Z-10) */}
            <div className="relative z-10 space-y-6">
              {/* Modal Top Header Bar */}
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ff7900]/20 text-[#ff7900] border border-[#ff7900]/40">
                    {selectedEventForCertificate.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {selectedEventForCertificate.status}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedEventForCertificate(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. TOP: Event Poster Preview Container */}
              <div className="w-full flex flex-col items-center justify-center bg-black/60 p-4 sm:p-6 rounded-2xl border border-zinc-800/80 shadow-inner space-y-2">
                <div className="relative max-h-[360px] overflow-hidden rounded-xl border border-[#ff7900]/40 shadow-[0_0_30px_rgba(255,121,0,0.2)]">
                  <img
                    src={selectedEventForCertificate.poster || "/events/posters/decrypta.webp"}
                    alt={selectedEventForCertificate.title}
                    className="h-full max-h-[340px] w-auto object-contain rounded-xl transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <span className="text-[11px] font-mono text-zinc-400 tracking-wider uppercase pt-1">
                  OFFICIAL EVENT POSTER PREVIEW
                </span>
              </div>

              {/* 2. BELOW POSTER: Event Details (Left) + Download Certificate Button / Search Portal (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start border-t border-zinc-800/80 pt-6">
                {/* Left Column: Exact Event Details */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {selectedEventForCertificate.title}{" "}
                      <span className="text-[#ff7900]">({selectedEventForCertificate.year})</span>
                    </h2>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {selectedEventForCertificate.description}
                    </p>
                  </div>

                  {/* Event Meta Info Box */}
                  <div className="space-y-2.5 bg-[#161922]/90 p-4 rounded-2xl border border-zinc-800/80 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#ff7900] shrink-0" />
                      <span className="font-semibold text-white">Date:</span>
                      <span>{selectedEventForCertificate.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#ff7900] shrink-0" />
                      <span className="font-semibold text-white">Time:</span>
                      <span>{selectedEventForCertificate.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#ff7900] shrink-0" />
                      <span className="font-semibold text-white">Venue:</span>
                      <span>{selectedEventForCertificate.venue}</span>
                    </div>
                  </div>

                  {/* Event Tags */}
                  {selectedEventForCertificate.tags && selectedEventForCertificate.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {selectedEventForCertificate.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-slate-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Column: Download Certificate Button & Search Bar Portal */}
                <div className="lg:col-span-5">
                  {!isSearchOpen ? (
                    <div className="bg-[#161922] p-6 rounded-2xl border border-[#ff7900]/40 space-y-4 shadow-xl text-center">
                      <div className="w-12 h-12 rounded-full bg-[#ff7900]/10 border border-[#ff7900]/30 flex items-center justify-center mx-auto text-[#ff7900]">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white font-mono uppercase">
                          OFFICIAL CERTIFICATE
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Participation certificate for {selectedEventForCertificate.title}.
                        </p>
                      </div>

                      <Button
                        variant="orange"
                        size="md"
                        onClick={() => setIsSearchOpen(true)}
                        className="w-full gap-2 py-3.5 rounded-xl font-bold shadow-[0_0_20px_rgba(255,121,0,0.3)] hover:shadow-[0_0_25px_rgba(255,121,0,0.5)] transition-all text-sm"
                      >
                        <Download className="w-4 h-4 text-black" />
                        <span>Download Certificate</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-[#161922] p-5 rounded-2xl border border-[#ff7900]/40 space-y-4 shadow-xl animate-in fade-in duration-200">
                      <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                        <div className="flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#ff7900]" />
                          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                            SEARCH CERTIFICATE
                          </h3>
                        </div>
                        <button
                          onClick={() => setIsSearchOpen(false)}
                          className="text-xs text-zinc-400 hover:text-white p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        Enter your Registration Number below to search and download your official certificate.
                      </p>

                      {/* Search Form */}
                      <form onSubmit={handleSearchRegistration} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-mono font-bold text-slate-400 mb-1">
                            REGISTRATION / MEMBER ID
                          </label>
                          <div className="relative">
                            <Shield className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                            <input
                              type="text"
                              autoFocus
                              value={searchRegNo}
                              onChange={(e) => setSearchRegNo(e.target.value)}
                              placeholder="e.g. 249301045"
                              className="w-full pl-9 pr-24 py-2 bg-[#090a0f] border border-zinc-700 rounded-xl text-xs text-white focus:outline-none focus:border-[#ff7900]"
                            />
                            <button
                              type="submit"
                              className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#ff7900] text-black font-bold text-[11px] rounded-lg hover:bg-[#ff9533] transition-colors flex items-center gap-1"
                            >
                              <Search className="w-3 h-3" />
                              <span>Search</span>
                            </button>
                          </div>
                        </div>
                      </form>

                      {/* Sample Test Registration IDs Pills */}
                      <div className="text-[10px] text-zinc-400 font-mono space-y-1 bg-black/40 p-2.5 rounded-xl border border-zinc-800/80">
                        <span className="text-zinc-500 block">Sample Reg Nos:</span>
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {["249301045", "249301001", "249301012"].map((id) => (
                            <button
                              key={id}
                              onClick={() => {
                                setSearchRegNo(id);
                                if (selectedEventForCertificate) {
                                  setHasSearched(true);
                                  setCertDownloaded(false);
                                  const match = lookupCertificate(selectedEventForCertificate.id, id);
                                  setVerifiedCert(match);
                                }
                              }}
                              className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-[#ff7900] hover:bg-zinc-800 transition-colors"
                            >
                              {id}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Search Result Feedback */}
                      {hasSearched && (
                        <div className="pt-1">
                          {verifiedCert ? (
                            <div className="bg-emerald-950/40 border border-emerald-500/40 p-3.5 rounded-xl space-y-2">
                              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold font-mono">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>VERIFIED RECORD FOUND</span>
                              </div>

                              <div className="text-xs space-y-1 font-mono text-zinc-300">
                                <div>
                                  <span className="text-zinc-500">Name: </span>
                                  <span className="text-white font-bold">{verifiedCert.participantName}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Reg No: </span>
                                  <span>{verifiedCert.registrationNo}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500">Cert ID: </span>
                                  <span className="text-[#ff7900] text-[11px]">{verifiedCert.certificateId}</span>
                                </div>
                              </div>

                              <Button
                                variant="orange"
                                size="md"
                                onClick={handleDownloadCertificateAction}
                                className="w-full gap-2 py-2.5 rounded-xl font-bold shadow-[0_0_20px_rgba(255,121,0,0.3)] hover:shadow-[0_0_25px_rgba(255,121,0,0.5)] transition-all mt-2"
                              >
                                <Download className="w-4 h-4 text-black" />
                                <span>Download Official Certificate</span>
                              </Button>

                              {certDownloaded && (
                                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-mono pt-1">
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                                  <span>Certificate exported successfully!</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="bg-rose-950/40 border border-rose-500/40 p-3.5 rounded-xl space-y-2">
                              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold font-mono">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>CERTIFICATE NOT FOUND</span>
                              </div>
                              <p className="text-[11px] text-zinc-300 leading-relaxed font-sans">
                                No official certificate record found for Registration No:{" "}
                                <span className="font-mono text-rose-300 font-bold">{searchRegNo}</span> in this event.
                              </p>
                              <Button
                                disabled
                                variant="ghost"
                                size="md"
                                className="w-full gap-2 py-2 rounded-xl text-xs text-zinc-500 border border-zinc-800 bg-zinc-900/50 cursor-not-allowed opacity-60"
                              >
                                <Download className="w-4 h-4" />
                                <span>Download Locked</span>
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate SVG Vector (Rendered dynamically for verified user export) */}
              {verifiedCert && (
                <div className="pt-4 border-t border-zinc-800/80">
                  <details className="group">
                    <summary className="cursor-pointer text-xs font-mono text-[#ff7900] hover:underline flex items-center gap-2 py-2">
                      <Award className="w-4 h-4" />
                      <span>Preview Verified Certificate Vector</span>
                    </summary>
                    <div className="mt-3 border border-zinc-800 rounded-2xl overflow-hidden bg-black p-2 flex justify-center shadow-inner">
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
                          <path d="M 30 10 H 15 C 12 10 11 17 11 25 V 40 C 11 49 19 55 30 59 V 53 C 22 50 16 44 16 38 V 20 H 30 V 10 Z" fill="#CBD5E1" />
                          <path d="M 35 10 H 50 C 50 10 46 19 35 21 V 30 C 46 30 51 35 46 42 C 41 47 35 49 35 49 V 43 C 39 40 41 37 40 34 C 39 32 35 32 35 32 V 10 Z" fill="#FF7900" />
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
                          {verifiedCert.participantName}
                        </text>
                        <line x1="220" y1="270" x2="580" y2="270" stroke="#FF7900" strokeWidth="2" />
                        <text x="400" y="290" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="monospace">
                          REGISTRATION NO: {verifiedCert.registrationNo}
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
                          <text x="35" y="82" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">VERIFIED ID: {verifiedCert.certificateId}</text>
                        </g>

                        <g transform="translate(570, 430)">
                          <line x1="0" y1="40" x2="160" y2="40" stroke="#475569" strokeWidth="1" />
                          <text x="80" y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">Faculty Coordinator</text>
                          <text x="80" y="32" textAnchor="middle" fill="#CBD5E1" fontSize="13" fontWeight="bold" fontFamily="cursive">CSC MUJ Faculty</text>
                        </g>
                      </svg>
                    </div>
                  </details>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
