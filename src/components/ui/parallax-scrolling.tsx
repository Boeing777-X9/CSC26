"use client";

import * as React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export interface ParallaxScrollingItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ParallaxScrollingProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: ParallaxScrollingItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_ITEMS: ParallaxScrollingItem[] = [
  {
    id: "1",
    title: "Quantum Cryptography Lab",
    category: "Security Research",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Vulnerability Scanning Hub",
    category: "Network Infrastructure",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Ethical Hacking CTF 2026",
    category: "Flag Capture & Penetration",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Neural Threat Intelligence",
    category: "AI Safeguards",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Cyber Forensics & Incident Response",
    category: "Data Integrity",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "Zero Trust Architecture",
    category: "Enterprise Security",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "7",
    title: "Deep Packet Inspection",
    category: "Protocol Analysis",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "8",
    title: "Mainframe Hardware Audit",
    category: "Hardware Hacking",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "9",
    title: "Red Team Ops Command",
    category: "Adversary Simulation",
    image: "https://images.unsplash.com/photo-1526374870839-e155464bb9b2?q=80&w=1000&auto=format&fit=crop",
  },
];

export function ParallaxScrolling({
  items = DEFAULT_ITEMS,
  title = "EXPLORE CYBER SPACE CLUB GALLERY",
  subtitle = "Parallax scroll through our active projects, security labs, and flag competitions.",
  className = "",
  ...rest
}: ParallaxScrollingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Create staggered parallax transforms for 3 columns
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -220]);

  // Split items into 3 columns
  const col1 = items.slice(0, 3);
  const col2 = items.slice(3, 6);
  const col3 = items.slice(6, 9);

  return (
    <section
      ref={containerRef}
      className={`relative min-h-screen w-full bg-[#08090e] px-4 py-24 text-white overflow-hidden ${className}`}
      {...rest}
    >
      {/* Background Subtle Gradient Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#ff7900]/10 blur-[140px]" />

      {/* Header Section */}
      <div className="relative z-10 mx-auto mb-16 max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 px-4 py-1.5 font-mono text-xs text-[#ff7900]">
          <span className="h-2 w-2 rounded-full bg-[#ff7900] animate-pulse" />
          PARALLAX SCROLLING EXHIBIT
        </div>
        <h2 className="mt-4 font-mono text-3xl font-extrabold uppercase tracking-tight sm:text-5xl text-white">
          {title}
        </h2>
        <p className="mt-4 font-mono text-sm text-zinc-400 sm:text-base">
          {subtitle}
        </p>
      </div>

      {/* 3-Column Parallax Grid */}
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {/* Column 1 */}
          <motion.div style={{ y: y1 }} className="flex flex-col gap-6 md:gap-8">
            {col1.map((item) => (
              <ParallaxCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* Column 2 */}
          <motion.div style={{ y: y2 }} className="flex flex-col gap-6 md:gap-8 md:pt-12">
            {col2.map((item) => (
              <ParallaxCard key={item.id} item={item} />
            ))}
          </motion.div>

          {/* Column 3 */}
          <motion.div style={{ y: y3 }} className="flex flex-col gap-6 md:gap-8">
            {col3.map((item) => (
              <ParallaxCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ParallaxCard({ item }: { item: ParallaxScrollingItem }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 transition-all duration-300 hover:border-[#ff7900]/50 hover:shadow-[0_0_30px_rgba(255,121,0,0.2)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />
      </div>
      <div className="relative p-5">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#ff7900]">
          {item.category}
        </span>
        <h3 className="mt-1 font-mono text-lg font-bold text-white transition-colors group-hover:text-[#ff7900]">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default ParallaxScrolling;
