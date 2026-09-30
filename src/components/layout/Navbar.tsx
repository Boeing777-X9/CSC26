"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CscLogo } from "@/components/ui/CscLogo";
import { Lock, Menu, X, BookOpen, Shield } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If inside /docs page, Fumadocs renders its own docs header & sidebar
  if (pathname.startsWith("/docs")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/membership", label: "Membership" },
    { href: "/teams", label: "Teams" },
    { href: "/docs", label: "Docs" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-black/85 backdrop-blur-md text-white">
      {/* Top Subtle Orange Glow Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8C32]/60 to-transparent" />

      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-8">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <CscLogo size={44} showText={false} />
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-lg tracking-wider text-white group-hover:text-[#FF8C32] transition-colors">
              CYBER SPACE CLUB
            </span>
            <span className="font-sans text-[10px] font-bold text-[#FF8C32] tracking-widest uppercase">
              MUJ CHAPTER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 bg-zinc-950/80 p-1.5 rounded-full border border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-xs font-sans font-bold rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#FF8C32] text-black shadow-[0_0_15px_rgba(255,140,50,0.5)]"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2 font-sans text-xs font-semibold text-zinc-300 transition-all hover:border-[#FF8C32] hover:text-[#FF8C32]"
          >
            <Shield className="w-3.5 h-3.5 text-[#FF8C32]" />
            <span>Admin</span>
          </Link>

          <Link
            href="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-[#FF8C32] px-5 py-2 font-sans text-xs font-bold text-black transition-all hover:bg-white hover:shadow-[0_0_20px_rgba(255,140,50,0.6)]"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Member Login</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF8C32]" /> : <Menu className="w-6 h-6 text-[#FF8C32]" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-black/95 px-6 pt-4 pb-6 backdrop-blur-2xl">
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
                      : "text-zinc-200 hover:bg-zinc-900 hover:text-[#FF8C32]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 font-sans text-sm font-semibold text-zinc-200"
              >
                <Shield className="w-4 h-4 text-[#FF8C32]" />
                <span>Admin Portal</span>
              </Link>
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF8C32] px-4 py-3 font-sans text-sm font-bold text-black"
              >
                <Lock className="w-4 h-4" />
                <span>Member Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
