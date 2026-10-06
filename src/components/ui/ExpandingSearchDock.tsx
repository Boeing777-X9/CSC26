"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Calendar,
  BookOpen,
  Shield,
  UserCheck,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Command,
} from "lucide-react";
import { eventsList } from "@/lib/data/events";

interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: "Events" | "Pages" | "Docs" | "Admin";
  url: string;
  icon: React.ReactNode;
}

const STATIC_SITE_PAGES: SearchResultItem[] = [
  {
    id: "page-home",
    title: "Home",
    description: "CYBER SPACE CLUB MUJ official landing portal, domains & terminal",
    category: "Pages",
    url: "/",
    icon: <Sparkles className="w-4 h-4 text-[#FF7900]" />,
  },
  {
    id: "page-events",
    title: "Events & Certificates Hub",
    category: "Pages",
    description: "Browse 2025/2024 workshops, CTFs, hackathons & download certificates",
    url: "/events",
    icon: <Calendar className="w-4 h-4 text-[#FF7900]" />,
  },
  {
    id: "page-gallery",
    title: "Interactive Media Gallery",
    category: "Pages",
    description: "Visual showcase of past CSC MUJ events, ASCII effects & photo wall",
    url: "/gallery",
    icon: <ImageIcon className="w-4 h-4 text-[#FF7900]" />,
  },
  {
    id: "page-membership",
    title: "Club Membership Portal",
    category: "Pages",
    description: "Join CYBER SPACE CLUB MUJ, unlock perks, badges & discord access",
    url: "/membership",
    icon: <UserCheck className="w-4 h-4 text-[#FF7900]" />,
  },
  {
    id: "page-docs",
    title: "Fumadocs Documentation",
    category: "Docs",
    description: "Official tech stack guide, project architecture & setup instructions",
    url: "/docs",
    icon: <BookOpen className="w-4 h-4 text-[#FF7900]" />,
  },
  {
    id: "page-admin",
    title: "Admin Dashboard",
    category: "Admin",
    description: "Manage events, member registrations, newsletters & certificates",
    url: "/admin",
    icon: <Shield className="w-4 h-4 text-[#FF7900]" />,
  },
];

export default function ExpandingSearchDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Combine static pages and dynamic events into search index
  const allSearchItems: SearchResultItem[] = [
    ...STATIC_SITE_PAGES,
    ...eventsList.map((event) => ({
      id: `event-${event.id}`,
      title: `${event.title} (${event.year})`,
      description: `${event.category} • ${event.date} • ${event.description}`,
      category: "Events" as const,
      url: "/events",
      icon: <Calendar className="w-4 h-4 text-emerald-400" />,
    })),
  ];

  // Filter items based on query
  const filteredResults = query.trim()
    ? allSearchItems.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : allSearchItems.slice(0, 6); // Show top 6 items when query empty

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  const handleNavigate = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const handleKeyDownInInput = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleNavigate(filteredResults[selectedIndex].url);
    }
  };

  return (
    <>
      {/* Expanding Search Dock Trigger Button (Collapsible Dock) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex items-center gap-2.5 rounded-full border border-zinc-800/90 bg-[#161922]/90 px-3.5 py-1.5 text-xs text-zinc-400 backdrop-blur-xl shadow-lg transition-all hover:border-[#FF7900]/50 hover:text-white hover:shadow-[0_0_20px_rgba(255,121,0,0.2)]"
        aria-label="Expanding Search Dock"
      >
        <Search className="w-3.5 h-3.5 text-[#FF7900]" />
        <span className="hidden sm:inline-block font-sans font-medium">Search site...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-zinc-800 bg-zinc-900 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
          <Command className="w-2.5 h-2.5" />K
        </kbd>
      </motion.button>

      {/* Expanded Search Modal & Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Expanding Dock Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#FF7900]/40 bg-[#0D0E15] p-4 shadow-2xl z-10 space-y-4"
            >
              {/* Top Search Input Bar */}
              <div className="relative flex items-center gap-3 border-b border-zinc-800 pb-3">
                <Search className="w-5 h-5 text-[#FF7900] shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownInInput}
                  placeholder="Search events, pages, documentation, certificates..."
                  className="w-full bg-transparent text-base text-white placeholder-zinc-500 focus:outline-none font-sans"
                />
                {query ? (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 text-zinc-400 hover:text-white rounded-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 py-0.5 font-mono text-xs text-zinc-400">
                    ESC
                  </kbd>
                )}
              </div>

              {/* Search Results List */}
              <div className="max-h-96 overflow-y-auto space-y-1.5 pr-1">
                {filteredResults.length > 0 ? (
                  filteredResults.map((item, index) => {
                    const isSelected = selectedIndex === index;
                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => handleNavigate(item.url)}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#161922] border border-[#FF7900]/50 text-white shadow-md"
                            : "hover:bg-zinc-900/60 text-zinc-300 border border-transparent"
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="p-2 rounded-lg bg-black/60 border border-zinc-800/80 shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-sans font-bold text-sm text-white truncate">
                                {item.title}
                              </h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FF7900]/15 text-[#FF7900] border border-[#FF7900]/30 shrink-0">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-400 truncate mt-0.5 font-sans">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ArrowRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? "text-[#FF7900] translate-x-1" : "text-zinc-600 opacity-0"
                          }`}
                        />
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 space-y-2">
                    <Search className="w-8 h-8 text-zinc-600 mx-auto" />
                    <p className="text-sm text-zinc-300 font-bold">No results found</p>
                    <p className="text-xs text-zinc-500">
                      No matching events, pages, or docs found for "{query}".
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Keyboard Navigation Hints */}
              <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">↑↓</kbd> Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">↵</kbd> Select
                  </span>
                </div>
                <span>CYBER SPACE CLUB MUJ Global Search</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
