"use client";

import React from "react";
import { CscLogo } from "@/components/ui/CscLogo";
import { InstagramIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { Phone, Mail, MapPin, Handshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full border-t border-zinc-800/80 bg-black/80 backdrop-blur-md text-[#DDDDDD] pt-16 pb-10">
      {/* Top Subtle Orange Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8C32]/60 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:gap-12 pb-12 border-b border-zinc-800/80">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CscLogo size={56} showText={false} />
            </div>
            <h3 className="font-sans text-lg font-extrabold uppercase tracking-wide text-white">
              CYBER SPACE CLUB
            </h3>
            <p className="font-sans text-xs text-[#DDDDDD] leading-relaxed max-w-xs">
              Uplifting cybersecurity culture and fostering technical innovation at Manipal University Jaipur.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="space-y-5">
            <h4 className="font-sans text-base font-bold text-[#FF8C32]">
              Contact Us
            </h4>
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8C32] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919599415311" className="font-bold text-white hover:text-[#FF8C32] transition-colors">
                    +91 95994 15311
                  </a>
                  <p className="text-zinc-300 font-medium">Abhinav Trikha</p>
                  <p className="text-zinc-400 text-[11px]">Chairperson</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8C32] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919235285754" className="font-bold text-white hover:text-[#FF8C32] transition-colors">
                    +91 92352 85754
                  </a>
                  <p className="text-zinc-300 font-medium">Ambika Seth</p>
                  <p className="text-zinc-400 text-[11px]">Vice Chairperson</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Mail className="w-4 h-4 text-[#FF8C32] shrink-0" />
                <a href="mailto:cyber.space@muj.manipal.edu" className="text-zinc-300 hover:text-[#FF8C32] transition-colors">
                  cyber.space@muj.manipal.edu
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Partnerships */}
          <div className="space-y-5">
            <h4 className="font-sans text-base font-bold text-[#FF8C32] flex items-center gap-2">
              <Handshake className="w-4 h-4 text-[#FF8C32]" />
              <span>Partnerships</span>
            </h4>
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8C32] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919810208341" className="font-bold text-white hover:text-[#FF8C32] transition-colors">
                    +91 98102 08341
                  </a>
                  <p className="text-zinc-300 font-medium">Amritansh Srivastava</p>
                  <p className="text-zinc-400 text-[11px]">General Secretary</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8C32] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919555672750" className="font-bold text-white hover:text-[#FF8C32] transition-colors">
                    +91 95556 72750
                  </a>
                  <p className="text-zinc-300 font-medium">Harshit Raj Singh</p>
                  <p className="text-zinc-400 text-[11px]">Executive Secretary</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Social */}
          <div className="space-y-5">
            <h4 className="font-sans text-base font-bold text-[#FF8C32]">
              Location
            </h4>
            <div className="flex items-start gap-3 font-sans text-xs text-zinc-300">
              <MapPin className="w-5 h-5 text-[#FF8C32] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Manipal University Jaipur, Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Expressway, Jaipur, Rajasthan 303007
              </p>
            </div>

            <div className="pt-2">
              <h5 className="font-sans text-xs font-bold text-white mb-3">
                Connect With Us
              </h5>
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/cscmuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/cscmuj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center font-sans text-xs text-zinc-400">
          <p>© 2026 Cyber Space Club, MUJ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
