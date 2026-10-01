"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Search, Calendar, MapPin, X, ArrowRight, Clock } from "lucide-react";

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  venue: string;
  image_url?: string;
  category?: string;
  is_visible?: boolean;
  registration_live?: boolean;
}

// Legacy events ported from the old CyberSpace static page
const legacyEvents: EventItem[] = [
  {
    id: "ctf-2026",
    title: "Flagship CyberSpace CTF 2026",
    category: "CTF Competition",
    date: "March 15, 2026",
    time: "10:00 AM - 10:00 PM IST",
    venue: "MUJ Tech Center & Online",
    description: "12-hour Jeopardy-style Capture The Flag competition featuring challenges in Binary Exploitation, WebSec, Reverse Engineering, Cryptography, and Forensics.",
    is_visible: true,
    registration_live: true,
  },
  {
    id: "hackcyber-4",
    title: "HackCyber 4.0 Hackathon",
    category: "Hackathon",
    date: "February 20, 2026",
    time: "09:00 AM - 05:00 PM IST",
    venue: "Lab 304, Academic Block 1",
    description: "24-hour offensive and defensive security hackathon building automated threat response bots and secure web architectures.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "bugbounty-2026",
    title: "Zero-Day Bug Bounty Bootcamp",
    category: "Workshop",
    date: "January 10, 2026",
    time: "02:00 PM - 06:00 PM IST",
    venue: "Auditorium 2, MUJ",
    description: "Hands-on workshop on finding business logic flaws, IDORs, and SSRF in real bug bounty programs like HackerOne and Bugcrowd.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "ai-sec-2026",
    title: "AI & LLM Security Summit 2026",
    category: "Conference",
    date: "April 05, 2026",
    time: "11:00 AM - 04:00 PM IST",
    venue: "Main Amphitheatre",
    description: "Exploring adversarial prompt injections, model extraction attacks, and securing generative AI deployments.",
    is_visible: true,
    registration_live: true,
  },
  {
    id: "cybercon-2025",
    title: "CyberCon Annual Conference 2025",
    category: "Conference",
    date: "November 12, 2025",
    time: "10:00 AM IST",
    venue: "MUJ Convention Hall",
    description: "Annual security conference featuring keynote talks on ransomware mitigation, SOC operations, and threat intelligence.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "reveng-2025",
    title: "Reverse Engineering 101 with Ghidra",
    category: "Workshop",
    date: "September 18, 2025",
    time: "03:00 PM IST",
    venue: "CS Lab 102",
    description: "Deep dive into x86/ARM disassembly, decompilation using NSA's Ghidra, and analyzing unpacked malware samples.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "websec-2025",
    title: "OWASP Top 10 Hands-on Masterclass",
    category: "Workshop",
    date: "April 22, 2025",
    time: "02:00 PM IST",
    venue: "Online Labs",
    description: "Practical exploitation of SQL injections, Cross-Site Scripting (XSS), and Broken Access Controls in vulnerable environments.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "winter-ctf-2025",
    title: "Winter CTF Battle 2025",
    category: "CTF Competition",
    date: "December 05, 2025",
    time: "06:00 PM IST",
    venue: "Online Arena",
    description: "Overnight beginner-friendly CTF challenge designed for freshmen to test their cryptography and web exploitation skills.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "launchpad-2024",
    title: "CSC Launchpad & Orientation 2024",
    category: "Orientation",
    date: "August 28, 2024",
    time: "04:00 PM IST",
    venue: "MUJ Auditorium 1",
    description: "Official inaugural ceremony of CyberSpace Club for the 2024 academic session with live hacking demonstrations.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "netdef-2024",
    title: "Network Defense & Wireshark Bootcamp",
    category: "Workshop",
    date: "October 14, 2024",
    time: "02:30 PM IST",
    venue: "Networking Lab",
    description: "Analyzing PCAP traffic files, packet inspection, detecting TCP SYN scans, and configuring Snort IDS rules.",
    is_visible: true,
    registration_live: false,
  },
  {
    id: "crypto-2024",
    title: "Applied Cryptography Challenge 2024",
    category: "Challenge",
    date: "November 20, 2024",
    time: "05:00 PM IST",
    venue: "Online Sandbox",
    description: "Breaking weak RSA key implementations, AES cipher modes, and hash collision algorithms.",
    is_visible: true,
    registration_live: false,
  }
];

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  // Fetch events from Supabase and merge with legacy static events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      let fetchedEvents: EventItem[] = [];

      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("events")
            .select("*");

          if (error) {
            console.error("Supabase Error:", error.message);
          } else if (data && data.length > 0) {
            fetchedEvents = data.filter((e: any) => e.is_visible !== false) as EventItem[];
          }
        }
      } catch (err) {
        console.error("Unexpected error fetching events:", err);
      } finally {
        setEvents([...fetchedEvents, ...legacyEvents]);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedEvent) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedEvent]);

  // Extract unique years from event dates dynamically
  const availableYears = useMemo(() => {
    const ySet = new Set<string>();
    events.forEach((e) => {
      const match = e.date?.match(/\b(20\d{2})\b/);
      if (match) ySet.add(match[0]);
    });
    return ["All", ...Array.from(ySet).sort((a, b) => parseInt(b) - parseInt(a))];
  }, [events]);

  // Filter events based on year and search query
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventYearMatch = event.date?.match(/\b(20\d{2})\b/);
      const eventYear = eventYearMatch ? eventYearMatch[0] : "";
      
      const matchesYear = selectedYear === "All" || eventYear === selectedYear;
      const matchesSearch =
        (event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.description && event.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesYear && matchesSearch;
    });
  }, [events, selectedYear, searchQuery]);

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#ff7900]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161922] border border-[#ff7900]/30 text-[#ff7900] text-xs font-mono font-bold uppercase tracking-widest">
            <Calendar className="w-4 h-4" />
            <span>Official Events Hub</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Discover Our Events
          </h1>
          <p className="text-slate-400 text-lg">
            Explore our timeline of hackathons, workshops, and meetups. Register for upcoming events directly below.
          </p>
        </motion.div>

        {/* Filters Navbar (Sticky) */}
        <div className="sticky top-20 z-40 bg-[#090a0f]/95 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            {availableYears.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 whitespace-nowrap ${
                    isSelected
                      ? "bg-gradient-to-r from-[#ff7900] to-[#ff9533] text-black shadow-[0_0_15px_rgba(255,121,0,0.3)]"
                      : "bg-[#161922] text-slate-400 border border-slate-800 hover:text-white hover:border-slate-600"
                  }`}
                >
                  {year === "All" ? "All Events" : year}
                </button>
              );
            })}
          </div>

          <div className="relative w-full sm:w-80 shrink-0">
            <Search className="w-4 h-4 absolute left-4 top-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search events or tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-[#161922] border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#ff7900] transition-colors"
            />
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20 text-[#ff7900]">
            <span className="animate-pulse font-mono tracking-widest uppercase">Fetching Events...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 9) * 0.05 }}
                  onClick={() => setSelectedEvent(event)}
                  className="group cursor-pointer flex flex-col bg-[#12141c] rounded-2xl border border-slate-800/80 overflow-hidden hover:border-[#ff7900]/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#ff7900]/10"
                >
                  {/* Event Image Banner */}
                  <div className="relative h-48 w-full bg-black overflow-hidden flex items-center justify-center border-b border-slate-800">
                    {event.image_url ? (
                      <img 
                        src={event.image_url} 
                        alt={event.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#161922] to-[#090a0f] group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                        <Calendar className="w-12 h-12 text-slate-800" />
                      </div>
                    )}
                    {/* Tags Layer */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      {event.category && (
                        <span className="bg-[#12141c]/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                          {event.category}
                        </span>
                      )}
                    </div>
                    {/* Live Badge */}
                    {event.registration_live && (
                      <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/50 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Reg Live
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#ff7900] transition-colors line-clamp-2">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-2 mb-4 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>{event.date} {event.time && `• ${event.time}`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-500" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 flex-1">
                      {event.description}
                    </p>

                    <div className="mt-auto border-t border-slate-800 pt-4 flex items-center justify-between">
                      <span className="text-[#ff7900] text-sm font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Details <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-24 bg-[#12141c] rounded-3xl border border-slate-800">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Events Found</h3>
                <p className="text-slate-400">Try adjusting your year filter or search terms.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#0d0e15] border border-slate-700 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-[#ff7900] text-white rounded-full backdrop-blur-md transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-2/5 h-64 md:h-auto bg-[#090a0f] relative flex-shrink-0">
                {selectedEvent.image_url ? (
                  <img 
                    src={selectedEvent.image_url} 
                    alt={selectedEvent.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#161922] to-[#090a0f] flex items-center justify-center">
                    <Calendar className="w-20 h-20 text-slate-800" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0d0e15] to-transparent" />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-3/5 p-6 sm:p-10 flex flex-col overflow-y-auto hide-scrollbar">
                <div className="flex-1">
                  {selectedEvent.category && (
                    <span className="inline-block mb-3 bg-[#ff7900]/10 border border-[#ff7900]/30 text-[#ff7900] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {selectedEvent.category}
                    </span>
                  )}
                  
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                    {selectedEvent.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-4 mb-6 text-sm font-mono text-slate-300 bg-[#161922] p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Calendar className="w-4 h-4 text-[#ff7900]" />
                      <span>{selectedEvent.date}</span>
                    </div>
                    {selectedEvent.time && (
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Clock className="w-4 h-4 text-[#ff7900]" />
                        <span>{selectedEvent.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 w-full">
                      <MapPin className="w-4 h-4 text-[#ff7900]" />
                      <span>{selectedEvent.venue}</span>
                    </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-slate-300 leading-relaxed text-base sm:text-lg whitespace-pre-wrap">
                      {selectedEvent.description}
                    </p>
                  </div>
                </div>

                {/* Registration Action Area */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                  {selectedEvent.registration_live ? (
                    <button
                      onClick={() => router.push(`/events/form?eventId=${selectedEvent.id}`)}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-[#ff7900] to-[#ff9533] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(255,121,0,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Register Now <ArrowRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 py-4 px-6 bg-slate-800/50 text-slate-500 font-semibold rounded-xl border border-slate-700/50 cursor-not-allowed text-center"
                    >
                      Registrations Closed
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}