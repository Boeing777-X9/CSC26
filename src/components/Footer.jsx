import { MapPin, Phone, Mail, Handshake } from 'lucide-react';
import { siteConfig } from '../data/mockData';

const Instagram = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const Linkedin = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#0a0a0a] border-t border-[var(--color-border)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Logo & Info */}
          <div className="flex flex-col items-start">
            <img src="/logo.png" alt="CSC Logo" className="w-24 h-24 object-contain mb-6" />
            <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">
              Cyber Space Club
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Uplifting cybersecurity culture and fostering innovation at MUJ.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div className="flex flex-col">
            <h3 className="text-[var(--color-primary)] text-lg font-bold mb-6">
              Contact Us
            </h3>
            
            <div className="mb-6 flex gap-3">
              <Phone size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <p className="text-white text-sm mb-1">+91 95994 15311</p>
                <p className="text-gray-300 text-sm">Abhinav Trikha</p>
                <p className="text-[var(--color-primary)] text-xs">Chairperson</p>
              </div>
            </div>

            <div className="mb-6 flex gap-3">
              <Phone size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <p className="text-white text-sm mb-1">+91 92352 85754</p>
                <p className="text-gray-300 text-sm">Ambika Seth</p>
                <p className="text-[var(--color-primary)] text-xs">Vice Chairperson</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <p className="text-white text-sm break-all">
                cyber.space@muj.manipal.edu
              </p>
            </div>
          </div>

          {/* Column 3: Partnerships */}
          <div className="flex flex-col">
            <h3 className="text-[var(--color-primary)] text-lg font-bold mb-6 flex items-center gap-2">
              <Handshake size={20} />
              Partnerships
            </h3>
            
            <div className="mb-6 flex gap-3">
              <Phone size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <p className="text-white text-sm mb-1">+91 98102 08341</p>
                <p className="text-gray-300 text-sm">Amritansh Srivastava</p>
                <p className="text-[var(--color-primary)] text-xs">General Secretary</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <div>
                <p className="text-white text-sm mb-1">+91 95556 72750</p>
                <p className="text-gray-300 text-sm">Harshit Raj Singh</p>
                <p className="text-[var(--color-primary)] text-xs">Executive Secretary</p>
              </div>
            </div>
          </div>

          {/* Column 4: Location & Socials */}
          <div className="flex flex-col">
            <h3 className="text-[var(--color-primary)] text-lg font-bold mb-6">
              Location
            </h3>
            
            <div className="flex gap-3 mb-10">
              <MapPin size={18} className="text-[var(--color-primary)] shrink-0 mt-1" />
              <p className="text-gray-400 text-sm leading-relaxed">
                Manipal University Jaipur, Dehmi Kalan, Near GVK Toll Plaza, Jaipur-Ajmer Expressway, Jaipur, Rajasthan 303007
              </p>
            </div>

            <h3 className="text-white text-base font-bold mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a 
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--color-border)] text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Cyber Space Club, MUJ. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
