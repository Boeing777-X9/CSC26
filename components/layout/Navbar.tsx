"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { CscLogo } from "@/components/ui/CscLogo";
import LoginTransition from "@/components/auth/LoginTransition";
import { Lock, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/teams", label: "Teams" },
    { href: "/gallery", label: "Gallery" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <CscLogo size={42} showText={true} />
        </Link>

        {/* Desktop Navigation Links — Pill Morph Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/80 p-1.5 shadow-2xl backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-5 py-2 text-sm font-sans font-medium transition-colors rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 rounded-full bg-[#FF8C32] shadow-[0_0_15px_rgba(255,140,50,0.4)]"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 35,
                    }}
                  />
                )}
                <span
                  className={`relative z-10 font-bold ${
                    isActive ? "text-black" : "text-neutral-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Member Login Button with Spiral Animation Transition */}
        <div className="hidden md:flex items-center gap-3">
          <LoginTransition>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/40 bg-[#FF8C32]/10 px-5 py-2.5 font-sans text-xs font-bold text-[#FF8C32] backdrop-blur-md transition-all hover:bg-[#FF8C32] hover:text-black hover:shadow-[0_0_20px_rgba(255,140,50,0.5)]">
              <Lock className="w-3.5 h-3.5" />
              <span>Member Login</span>
            </div>
          </LoginTransition>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF8C32]" /> : <Menu className="w-6 h-6 text-[#FF8C32]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-black/98 px-6 pt-4 pb-6 backdrop-blur-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-sans font-bold rounded-xl transition-all ${
                    isActive
                      ? "bg-[#FF8C32] text-black"
                      : "text-neutral-200 hover:bg-zinc-900 hover:text-[#FF8C32]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-zinc-800">
              <LoginTransition>
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8C32] px-4 py-3 font-sans text-sm font-bold text-black"
                >
                  <Lock className="w-4 h-4" />
                  <span>Member Login</span>
                </div>
              </LoginTransition>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
