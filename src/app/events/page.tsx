"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { eventsList, EventItem } from "@/lib/data/events";
import { lookupCertificate, VerifiedCertificate } from "@/lib/data/certificates";
import { CanvasText } from "@/components/ui/canvas-text";
import CurvedTextLoop from "@/components/ui/curved-text-loop";
import SpotlightCard from "@/components/ui/spotlight-card";
import { 
  Calendar, Award, Download, Search, CheckCircle2, X, 
  Sparkles, MapPin, Clock, AlertCircle, ExternalLink, ArrowRight,
  Info, ChevronDown, ChevronUp, Trophy, Users, Gift, Mic, Tag, Shield
} from "lucide-react";

export default function EventsPage() {
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventForCertificate, setSelectedEventForCertificate] = useState<EventItem | null>(null);

  // Responsive font size for CanvasText headline
  const [headingFontSize, setHeadingFontSize] = useState(56);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setHeadingFontSize(32);
      } else if (window.innerWidth < 1024) {
        setHeadingFontSize(48);
      } else {
        setHeadingFontSize(60);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Supabase Dynamic Events State
  const [events, setEvents] = useState<EventItem[]>(eventsList);
  const [loading, setLoading] = useState(true);

  // Certificate Verification & Search State
  const [searchRegNo, setSearchRegNo] = useState("249301045");
  const [verifiedCert, setVerifiedCert] = useState<VerifiedCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [certDownloaded, setCertDownloaded] = useState(false);
  const [showCertInput, setShowCertInput] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Fetch events from Supabase and merge with Rudra's eventsList
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      let supabaseEvents: EventItem[] = [];

      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("events")
            .select("*");

          if (!error && data && data.length > 0) {
            supabaseEvents = data.map((item: any) => ({
              id: item.id || `sp-${Date.now()}`,
              year: item.date?.match(/\b(20\d{2})\b/)?.[0] || "2026",
              title: item.title,
              category: item.category || "General",
              date: item.date,
              time: item.time || "TBA",
              venue: item.venue || "MUJ Campus",
              description: item.description,
              status: item.registration_live ? "Ongoing" : "Completed",
              certificateAvailable: true,
              poster: item.image_url || "/events/posters/decrypta.webp",
              tags: item.category ? [item.category] : [],
            }));
          }
        }
      } catch (err) {
        console.error("Error fetching Supabase events:", err);
      } finally {
        const combinedMap = new Map<string, EventItem>();
        eventsList.forEach((e) => combinedMap.set(e.id, e));
        supabaseEvents.forEach((e) => combinedMap.set(e.id, e));
        
        setEvents(Array.from(combinedMap.values()));
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on year and search query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventYearMatch = event.year || event.date?.match(/\b(20\d{2})\b/)?.[0] || "";
      
      const matchesYear = selectedYear === "All" || eventYearMatch === selectedYear;
      const matchesSearch =
        (event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.tags && event.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesYear && matchesSearch;
    });
  }, [events, selectedYear, searchQuery]);

  // Upcoming events for the top section with CurvedTextLoop
  const upcomingEvents = useMemo(() => {
    return events.filter(
      (e) => e.status === "Upcoming" || e.status === "Ongoing" || e.year === "2026"
    );
  }, [events]);

  // Extract unique available years
  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    events.forEach((e) => {
      if (e.year) ySet.add(e.year);
      else {
        const match = e.date?.match(/\b(20\d{2})\b/);
        if (match) ySet.add(match[0]);
      }
    });
    const order = ["2026", "2025", "2024", "All"];
    order.forEach((y) => {
      if (y !== "All") ySet.add(y);
    });
    return order.filter((y) => y === "All" || ySet.has(y));
  }, [events]);

  const handleOpenEventModal = (event: EventItem) => {
    setSelectedEventForCertificate(event);
    setCertDownloaded(false);
    setHasSearched(false);
    setVerifiedCert(null);
    setShowCertInput(false);
    setShowMoreDetails(false);
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
    downloadLink.download = `${verifiedCert.participantName.replace(/\s+/g, "_")}_CSC_MUJ_Certificate_${selectedEventForCertificate.year || "2025"}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-4">
        
        {/* Page Header with CanvasText */}
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-center min-h-[90px] sm:min-h-[120px]">
            <CanvasText 
              text="Events & Certificates"
              fontSize={headingFontSize}
              fontWeight={900}
              color="#ffffff"
              density={2}
              scatter={40}
              loadDuration={0.8}
              morphDuration={1.2}
              magnetic={0.35}
              className="h-[90px] sm:h-[120px] w-full"
            />
          </div>
        </div>

        {/* Upcoming Events Section with CurvedTextLoop */}
        <div className="space-y-4 pt-1 pb-2">
          <div className="w-full flex flex-col items-center justify-center overflow-hidden">
            <CurvedTextLoop 
              marqueeText="UPCOMING EVENTS 2026 • CYBER SPACE CLUB MUJ • "
              speed={1.4}
              direction="left"
              interactive={true}
            />
          </div>

          {upcomingEvents.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <SpotlightCard
                  key={event.id}
                  onClick={() => handleOpenEventModal(event)}
                  spotlightColor="rgba(255, 121, 0, 0.25)"
                  className="group relative cursor-pointer hover:border-[#ff7900]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ff7900]/10"
                >
                  {/* Full Poster Aspect Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                    <img
                      src={event.poster || "/events/posters/decrypta.webp"}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/events/posters/decrypta.webp";
                      }}
                    />

                    {/* Top Status & Category Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/80 backdrop-blur-md text-[#ff7900] border border-[#ff7900]/40 uppercase">
                        {event.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md uppercase">
                        {event.status}
                      </span>
                    </div>

                    {/* Bottom Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                    {/* Overlay Title */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-3 z-10">
                      <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md group-hover:text-[#ff7900] transition-colors">
                        {event.title}
                      </h3>

                      <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-300 border-t border-zinc-800/80">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[#ff7900]" /> {event.date}</span>
                        <span className="text-[#ff7900] font-bold group-hover:underline flex items-center gap-1">Register Now <ArrowRight className="w-3.5 h-3.5" /></span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          )}
        </div>

        {/* Filter Navigation Bar (Rudra's Style) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#161922]/80 p-3 rounded-2xl border border-slate-800 backdrop-blur-md">
          {/* Year Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {availableYears.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer whitespace-nowrap ${
                  selectedYear === year
                    ? "bg-[#ff7900] text-black shadow-[0_0_15px_rgba(255,121,0,0.4)]"
                    : "bg-black/40 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {year === "All" ? "All Events" : `${year} Events`}
              </button>
            ))}
          </div>

          {/* Single Unified Events Search Bar */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#ff7900] pointer-events-none" />
            <input
              type="text"
              placeholder="Search events by title, tag, venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-black/70 border border-slate-800 focus:border-[#ff7900] rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff7900]/40 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 p-0.5 rounded-full text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Events Cards Grid (Rudra's Signature Card Layout) */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#ff7900]">
            <span className="animate-pulse font-mono tracking-widest uppercase flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4" /> Fetching CYBER SPACE CLUB Events...
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event) => (
                <SpotlightCard
                  key={event.id}
                  onClick={() => handleOpenEventModal(event)}
                  spotlightColor="rgba(255, 121, 0, 0.25)"
                  className="group relative cursor-pointer hover:border-[#ff7900]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ff7900]/10"
                >
                  {/* Poster Aspect Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                    <img
                      src={event.poster || "/events/posters/decrypta.webp"}
                      alt={event.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/events/posters/decrypta.webp";
                      }}
                    />

                    {/* Top Status & Category Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/75 backdrop-blur-md text-[#ff7900] border border-[#ff7900]/40">
                        {event.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[11px] font-semibold bg-black/75 backdrop-blur-md border ${
                        event.status === "Ongoing" 
                          ? "text-emerald-400 border-emerald-500/40" 
                          : "text-slate-300 border-zinc-700"
                      }`}>
                        {event.status}
                      </span>
                    </div>

                    {/* Bottom Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                    {/* Overlay Title & Tags */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2 z-10">
                      <h3 className="text-2xl font-black text-white tracking-tight drop-shadow-md group-hover:text-[#ff7900] transition-colors">
                        {event.title}
                      </h3>

                      {/* Tags Pills Row */}
                      {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {event.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-zinc-800 text-zinc-300 text-xs font-sans font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </SpotlightCard>
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
        )}
      </div>

      {/* Single-Screen Side-by-Side Event Details Modal */}
      {selectedEventForCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-5xl h-[90vh] max-h-[640px] bg-[#0d0e15] border border-[#ff7900]/40 rounded-3xl p-5 sm:p-6 shadow-2xl overflow-hidden flex flex-col justify-between">
            
            {/* Background Event Poster Accent Overlay */}
            <div
              className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-cover bg-center filter blur-3xl transform scale-110"
              style={{
                backgroundImage: `url(${selectedEventForCertificate.poster || "/events/posters/decrypta.webp"})`,
              }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0d0e15]/95 via-[#0d0e15]/90 to-[#0d0e15] pointer-events-none" />

            {/* Modal Top Close Button */}
            <button
              onClick={() => setSelectedEventForCertificate(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Content Grid: Left Half Poster, Right Half Info */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 h-full items-stretch overflow-hidden">
              
              {/* LEFT HALF: Official Event Poster */}
              <div className="bg-black/70 rounded-2xl border border-zinc-800/80 p-3 sm:p-4 flex flex-col items-center justify-center relative overflow-hidden h-full">
                <div className="relative w-full h-full max-h-[520px] flex items-center justify-center">
                  <img
                    src={selectedEventForCertificate.poster || "/events/posters/decrypta.webp"}
                    alt={selectedEventForCertificate.title}
                    className="max-h-full max-w-full object-contain rounded-xl border border-[#ff7900]/30 shadow-[0_0_30px_rgba(255,121,0,0.15)]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/events/posters/decrypta.webp";
                    }}
                  />
                </div>
              </div>

              {/* RIGHT HALF: Details, Dates, Venue & Download Certificate Section */}
              <div className="flex flex-col justify-between h-full space-y-4 overflow-y-auto pr-1">
                
                {/* TOP: Badges, Title, Description, Date & Venue */}
                <div className="space-y-3.5">
                  {/* Category & Status Badges */}
                  <div className="flex items-center gap-2 pr-10">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#ff7900]/20 text-[#ff7900] border border-[#ff7900]/40">
                      {selectedEventForCertificate.category}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {selectedEventForCertificate.status}
                    </span>
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      {selectedEventForCertificate.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      {selectedEventForCertificate.description}
                    </p>
                  </div>

                  {/* Date, Time & Venue */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-[#161922]/90 p-3 rounded-xl border border-zinc-800/80 text-xs font-mono text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-[#ff7900] shrink-0" />
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Date</div>
                        <div className="font-semibold text-white">{selectedEventForCertificate.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#ff7900] shrink-0" />
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Venue</div>
                        <div className="font-semibold text-white truncate">{selectedEventForCertificate.venue}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedEventForCertificate.tags && selectedEventForCertificate.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {selectedEventForCertificate.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Conditional Rendering based on Event Status */}
                {selectedEventForCertificate.status === "Upcoming" || selectedEventForCertificate.status === "Ongoing" ? (
                  /* UPCOMING / ONGOING EVENTS: Register Now Button Only */
                  <div className="pt-4 border-t border-zinc-800/80">
                    <button
                      onClick={() => router.push(`/events/forms?eventId=${selectedEventForCertificate.id}`)}
                      className="w-full py-3.5 px-6 bg-gradient-to-r from-[#ff7900] via-[#ffa856] to-[#ff7900] text-black font-extrabold rounded-xl hover:shadow-[0_0_25px_rgba(255,121,0,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer text-sm uppercase tracking-wider group"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  /* COMPLETED EVENTS: More Details & Download Certificate Section */
                  <>
                    {/* More Details Expandable Section */}
                    <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                      <button
                        onClick={() => setShowMoreDetails(!showMoreDetails)}
                        className="w-full py-2.5 px-4 bg-zinc-900/90 border border-zinc-800 hover:border-[#ff7900]/50 text-slate-200 hover:text-white rounded-xl font-mono text-xs font-bold transition-all flex items-center justify-between cursor-pointer group"
                      >
                        <span className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-[#ff7900] group-hover:scale-110 transition-transform" />
                          <span>More Details</span>
                        </span>
                        {showMoreDetails ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {showMoreDetails && (
                        <div className="bg-[#161922]/90 border border-zinc-800 rounded-xl p-4 space-y-3 animate-in fade-in duration-150 text-xs font-mono text-slate-300 max-h-48 overflow-y-auto">
                          {Boolean(
                            selectedEventForCertificate.prizePool ||
                            (selectedEventForCertificate.winners && selectedEventForCertificate.winners.length > 0) ||
                            (selectedEventForCertificate.judges && selectedEventForCertificate.judges.length > 0) ||
                            selectedEventForCertificate.speaker ||
                            selectedEventForCertificate.extraDetails
                          ) ? (
                            <>
                              {/* Prize Pool */}
                              {selectedEventForCertificate.prizePool && (
                                <div className="flex items-center gap-2 text-[#ff7900] bg-[#ff7900]/10 p-2.5 rounded-lg border border-[#ff7900]/20">
                                  <Gift className="w-4 h-4 shrink-0 text-[#ff7900]" />
                                  <span className="font-bold">Prize Pool:</span>
                                  <span className="font-sans font-bold text-white">{selectedEventForCertificate.prizePool}</span>
                                </div>
                              )}

                              {/* Winners Leaderboard */}
                              {selectedEventForCertificate.winners && selectedEventForCertificate.winners.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                  <div className="flex items-center gap-2 font-bold text-amber-400">
                                    <Trophy className="w-4 h-4 shrink-0" />
                                    <span>Winners & Leaderboard</span>
                                  </div>
                                  <div className="space-y-1">
                                    {selectedEventForCertificate.winners.map((w, idx) => (
                                      <div key={idx} className="flex items-center justify-between bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800/60">
                                        <span className="font-bold text-white">{w.position}: <span className="font-normal text-slate-300">{w.name}</span></span>
                                        {w.prize && <span className="text-[#ff7900] text-[11px] font-bold">{w.prize}</span>}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Judges Panel */}
                              {selectedEventForCertificate.judges && selectedEventForCertificate.judges.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                  <div className="flex items-center gap-2 font-bold text-sky-400">
                                    <Users className="w-4 h-4 shrink-0" />
                                    <span>Judges & Evaluation Panel</span>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5">
                                    {selectedEventForCertificate.judges.map((j, idx) => (
                                      <span key={idx} className="px-2.5 py-1 rounded-md bg-sky-950/40 border border-sky-800/40 text-[11px] text-sky-200">
                                        {j}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Speaker / Host */}
                              {selectedEventForCertificate.speaker && (
                                <div className="flex items-center gap-2 pt-1">
                                  <Mic className="w-4 h-4 text-[#ff7900] shrink-0" />
                                  <span className="text-zinc-400">Speaker / Host:</span>
                                  <span className="text-white font-semibold">{selectedEventForCertificate.speaker}</span>
                                </div>
                              )}

                              {/* Extra Details */}
                              {selectedEventForCertificate.extraDetails && (
                                <div className="pt-2 text-slate-400 text-[11px] leading-relaxed border-t border-zinc-800/60 flex items-start gap-1.5 font-sans">
                                  <Sparkles className="w-3.5 h-3.5 text-[#ff7900] shrink-0 mt-0.5" />
                                  <span>{selectedEventForCertificate.extraDetails}</span>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="py-2 text-center text-zinc-500 font-mono text-xs flex items-center justify-center gap-2">
                              <Info className="w-4 h-4 text-zinc-600" />
                              <span>no more info</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* BOTTOM: Download Certificate Section */}
                    <div className="space-y-3 pt-1">
                      {!showCertInput ? (
                        <button
                          onClick={() => setShowCertInput(true)}
                          className="w-full py-3 px-5 bg-gradient-to-r from-zinc-900 via-[#161922] to-zinc-900 border border-[#ff7900]/50 hover:border-[#ff7900] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,121,0,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-mono uppercase tracking-wider group"
                        >
                          <Award className="w-4 h-4 text-[#ff7900] group-hover:scale-110 transition-transform" />
                          <span>Download Certificate</span>
                        </button>
                      ) : (
                        <div className="bg-[#161922]/90 p-4 rounded-xl border border-zinc-800/80 space-y-3 animate-in fade-in duration-150">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-white font-mono">
                              <Award className="w-4 h-4 text-[#ff7900]" />
                              <span>Enter Registration No</span>
                            </div>
                            <button
                              onClick={() => setShowCertInput(false)}
                              className="text-[11px] text-zinc-400 hover:text-white underline"
                            >
                              Cancel
                            </button>
                          </div>

                          <form onSubmit={handleSearchRegistration} className="space-y-2">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="e.g. 249301045"
                                value={searchRegNo}
                                onChange={(e) => setSearchRegNo(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-zinc-700 text-xs text-white font-mono focus:border-[#ff7900] focus:outline-none"
                              />
                              <button
                                type="submit"
                                className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#ff7900] text-black hover:bg-white transition-colors uppercase cursor-pointer flex items-center gap-1 shrink-0"
                              >
                                <Search className="w-3.5 h-3.5" />
                                <span>Verify</span>
                              </button>
                            </div>
                          </form>

                          {/* Verification Status Feedback */}
                          {hasSearched && (
                            <div className="pt-1">
                              {verifiedCert ? (
                                <div className="bg-emerald-950/40 border border-emerald-500/40 p-3 rounded-xl space-y-2">
                                  <div className="flex items-center justify-between text-xs text-emerald-400 font-bold font-mono">
                                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> VERIFIED</span>
                                    <span className="text-[10px] text-zinc-400">{verifiedCert.participantName}</span>
                                  </div>
                                  <button
                                    onClick={handleDownloadCertificateAction}
                                    className="w-full py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500 text-black hover:bg-emerald-400 transition-colors uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                  >
                                    <Download className="w-4 h-4" />
                                    <span>Export Official Certificate</span>
                                  </button>
                                  {certDownloaded && (
                                    <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                                      <CheckCircle2 className="w-3 h-3" /> Certificate exported!
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="bg-rose-950/40 border border-rose-500/40 p-2.5 rounded-xl space-y-1">
                                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold font-mono">
                                    <AlertCircle className="w-3.5 h-3.5" />
                                    <span>NOT FOUND</span>
                                  </div>
                                  <p className="text-[10px] text-zinc-300">
                                    No record for Reg No <span className="font-mono text-rose-300 font-bold">{searchRegNo}</span>. Try <code className="text-[#ff7900] bg-black px-1 rounded">249301045</code>.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Bottom Close Button */}
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => setSelectedEventForCertificate(null)}
                    className="px-4 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-slate-400 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

            {/* Hidden Certificate SVG for export rendering */}
            {verifiedCert && (
              <div style={{ display: "none" }}>
                <svg
                  id="certificate-svg-canvas"
                  width="800"
                  height="560"
                  viewBox="0 0 800 560"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="20" y="20" width="760" height="520" rx="12" fill="#0D0E15" stroke="#282D3D" strokeWidth="2" />
                  <rect x="30" y="30" width="740" height="500" rx="8" fill="none" stroke="#FF7900" strokeWidth="1.5" strokeDasharray="6 6" />

                  <g transform="translate(60, 55)">
                    <path d="M 30 10 H 15 C 12 10 11 17 11 25 V 40 C 11 49 19 55 30 59 V 53 C 22 50 16 44 16 38 V 20 H 30 V 10 Z" fill="#CBD5E1" />
                    <path d="M 35 10 H 50 C 50 10 46 19 35 21 V 30 C 46 30 51 35 46 42 C 41 47 35 49 35 49 V 43 C 39 40 41 37 40 34 C 39 32 35 32 35 32 V 10 Z" fill="#FF7900" />
                    <ellipse cx="32" cy="34" rx="14" ry="8" fill="#090A0F" stroke="#334155" strokeWidth="1" />
                    <ellipse cx="32" cy="34" rx="12" ry="6" fill="#F8FAFC" />
                    <circle cx="32" cy="34" r="4" fill="#0F172A" />
                    <circle cx="31" cy="33" r="1.2" fill="#FF7900" />

                    <text x="65" y="32" fill="#FFFFFF" fontSize="22" fontWeight="800" fontFamily="sans-serif">CYBER SPACE CLUB</text>
                    <text x="65" y="48" fill="#FF7900" fontSize="13" fontWeight="bold" fontFamily="sans-serif" letterSpacing="3">MANIPAL UNIVERSITY JAIPUR</text>
                  </g>

                  <text x="400" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="800" fontFamily="sans-serif" letterSpacing="2">
                    CERTIFICATE OF PARTICIPATION
                  </text>
                  <text x="400" y="200" textAnchor="middle" fill="#FF7900" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="4">
                    PROUDLY PRESENTED TO
                  </text>

                  <text x="400" y="255" textAnchor="middle" fill="#FFFFFF" fontSize="32" fontWeight="bold" fontFamily="sans-serif">
                    {verifiedCert.participantName}
                  </text>
                  <line x1="220" y1="270" x2="580" y2="270" stroke="#FF7900" strokeWidth="2" />
                  <text x="400" y="290" textAnchor="middle" fill="#94A3B8" fontSize="12" fontFamily="monospace">
                    REGISTRATION NO: {verifiedCert.registrationNo}
                  </text>

                  <text x="400" y="335" textAnchor="middle" fill="#CBD5E1" fontSize="14" fontFamily="sans-serif">
                    For active participation and demonstrated skill in the official event:
                  </text>
                  <text x="400" y="365" textAnchor="middle" fill="#FF7900" fontSize="20" fontWeight="bold" fontFamily="sans-serif">
                    {selectedEventForCertificate.title} ({selectedEventForCertificate.year || "2025"})
                  </text>

                  <g transform="translate(70, 430)">
                    <line x1="0" y1="40" x2="160" y2="40" stroke="#475569" strokeWidth="1" />
                    <text x="80" y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">Event Chair / Lead</text>
                    <text x="80" y="32" textAnchor="middle" fill="#FF7900" fontSize="13" fontWeight="bold" fontFamily="sans-serif">Rudra Sharma</text>
                  </g>

                  <g transform="translate(365, 420)">
                    <rect x="0" y="0" width="70" height="70" fill="#1E293B" rx="6" />
                    <path d="M 10 10 H 30 V 30 H 10 Z M 40 10 H 60 V 30 H 40 Z M 10 40 H 30 V 60 H 10 Z M 45 45 H 55 V 55 H 45 Z" fill="#FF7900" />
                    <text x="35" y="82" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="monospace">VERIFIED ID: {verifiedCert.certificateId}</text>
                  </g>

                  <g transform="translate(570, 430)">
                    <line x1="0" y1="40" x2="160" y2="40" stroke="#475569" strokeWidth="1" />
                    <text x="80" y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="sans-serif">Faculty Coordinator</text>
                    <text x="80" y="32" textAnchor="middle" fill="#CBD5E1" fontSize="13" fontWeight="bold" fontFamily="sans-serif">CSC MUJ Faculty</text>
                  </g>
                </svg>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}