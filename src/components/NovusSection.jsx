'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
import TextLoop from './TextLoop';
import DotGrid from './ui/DotGrid';
import ClickSpark from './ui/ClickSpark';
import CircularCarousel from './ui/CircularCarousel';
import Lightfall from './ui/Lightfall';

// NOVUS flagship event data
const novusEvents = [
  // 2026 (8 events)
  { id: 'n1', title: 'Opening Ceremony', desc: 'Kickoff keynote by industry leaders', date: 'Day 1', year: '2026', type: 'Ceremony' },
  { id: 'n2', title: 'Cyber Arena', desc: 'Competitive live hacking', date: 'Day 1', year: '2026', type: 'Competition' },
  { id: 'n3', title: 'Bug Bounty Blitz', desc: 'Vulnerability discovery simulation', date: 'Day 2', year: '2026', type: 'Competition' },
  { id: 'n4', title: 'CryptoQuest', desc: 'Advanced cryptography challenges', date: 'Day 2', year: '2026', type: 'Competition' },
  { id: 'n24', title: 'Malware Reverse Eng', desc: 'Deep dive into binary analysis', date: 'Day 2', year: '2026', type: 'Workshop' },
  { id: 'n5', title: 'Network Wars', desc: 'Network defense and attack', date: 'Day 3', year: '2026', type: 'Competition' },
  { id: 'n25', title: 'CloudSec Seminar', desc: 'Securing AWS and Azure architectures', date: 'Day 3', year: '2026', type: 'Workshop' },
  { id: 'n6', title: 'Closing Ceremony', desc: 'Finals and awards presentation', date: 'Day 3', year: '2026', type: 'Ceremony' },
  
  // 2025 (8 events)
  { id: 'n26', title: 'Welcome Address', desc: 'Inaugural speeches', date: 'Day 1', year: '2025', type: 'Ceremony' },
  { id: 'n7', title: 'Security Summit', desc: 'Panel discussion on AI in security', date: 'Day 1', year: '2025', type: 'Workshop' },
  { id: 'n27', title: 'Red Teaming 101', desc: 'Adversarial simulation tactics', date: 'Day 1', year: '2025', type: 'Workshop' },
  { id: 'n8', title: 'Capture The Flag', desc: 'Global 24hr CTF challenge', date: 'Day 2', year: '2025', type: 'Competition' },
  { id: 'n28', title: 'Social Engineering', desc: 'Psychology of cyber attacks', date: 'Day 2', year: '2025', type: 'Workshop' },
  { id: 'n9', title: 'Hardware Hacking', desc: 'IoT vulnerabilities deep-dive', date: 'Day 3', year: '2025', type: 'Workshop' },
  { id: 'n29', title: 'Zero-Day Hunt', desc: 'Finding unknown vulnerabilities', date: 'Day 3', year: '2025', type: 'Competition' },
  { id: 'n30', title: 'Awards Gala', desc: 'Honoring top performers', date: 'Day 3', year: '2025', type: 'Ceremony' },

  // 2024 (8 events)
  { id: 'n31', title: 'Novus Origins', desc: 'The first inaugural keynote', date: 'Day 1', year: '2024', type: 'Ceremony' },
  { id: 'n10', title: 'WebSec Masterclass', desc: 'OWASP top 10 practical exploitation', date: 'Day 1', year: '2024', type: 'Workshop' },
  { id: 'n32', title: 'Forensics Challenge', desc: 'Digital evidence recovery', date: 'Day 1', year: '2024', type: 'Competition' },
  { id: 'n11', title: 'Defend the Crown', desc: 'Red team vs Blue team simulation', date: 'Day 2', year: '2024', type: 'Competition' },
  { id: 'n33', title: 'Lockpicking Village', desc: 'Physical security bypass methods', date: 'Day 2', year: '2024', type: 'Workshop' },
  { id: 'n34', title: 'Botnet Takedown', desc: 'Tracing and dismantling malware networks', date: 'Day 3', year: '2024', type: 'Competition' },
  { id: 'n35', title: 'Secure Coding', desc: 'Writing bulletproof applications', date: 'Day 3', year: '2024', type: 'Workshop' },
  { id: 'n36', title: 'Closing Keynote', desc: 'Future of Cybersecurity', date: 'Day 3', year: '2024', type: 'Ceremony' },
];

export default function NovusSection({
  isOpen: externalOpen,
  onClose: externalClose,
  showCard = true
} = {}) {
  // Stages: 'idle' | 'line-overlay' | 'preloader' | 'page'
  const [stage, setStage] = useState('idle');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  
  const [lineFadingOut, setLineFadingOut] = useState(false);
  const [preloaderFadingOut, setPreloaderFadingOut] = useState(false);

  // Filter the events
  const filteredEvents = novusEvents.filter(evt => {
    const matchYear = selectedYear === 'All' || evt.year === selectedYear;
    const matchType = selectedType === 'All' || evt.type === selectedType;
    return matchYear && matchType;
  });

  const handleNovusClick = () => {
    setStage('line-overlay');
    setLineFadingOut(false);
    setPreloaderFadingOut(false);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setStage('idle');
    setLineFadingOut(false);
    setPreloaderFadingOut(false);
    document.body.style.overflow = '';
    if (externalClose) externalClose();
  };

  useEffect(() => {
    if (externalOpen) {
      handleNovusClick();
    }
  }, [externalOpen]);

  // Automated progression:
  // Step 1: line-overlay (fade in -> play -> fade out)
  // Step 2: event page with AeroShards
  useEffect(() => {
    if (stage === 'line-overlay') {
      const fadeOutTimer = setTimeout(() => {
        setLineFadingOut(true);
      }, 700);

      const nextTimer = setTimeout(() => {
        setStage('page');
      }, 1000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(nextTimer);
      };
    }
  }, [stage]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && stage !== 'idle') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [stage]);

  return (
    <>
      {/* NOVUS Clickable Card in Sidebar (on top of Hackathons) */}
      {showCard && (
        <div className="w-full">
          <div
            onClick={handleNovusClick}
            className="group relative cursor-pointer rounded-2xl border border-[#FF6A00]/30 hover:border-[#FF6A00] bg-gradient-to-br from-black via-[#1a0e00] to-[#0d0800] shadow-[0_0_20px_rgba(255,106,0,0.15)] hover:shadow-[0_0_30px_rgba(255,106,0,0.35)] transition-all duration-500 overflow-hidden"
          >
            {/* Animated glow orbs */}
            <div className="absolute inset-0 opacity-25 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-[#FF6A00]/25 blur-[70px] animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-4 p-5">
              {/* Icon badge */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6A00] to-[#FF8C32] flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                <span className="text-xl font-black text-black">N</span>
              </div>

              {/* Text */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    NOVUS
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/80">
                    Flagship
                  </span>
                </div>
                <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                  Our premier 3-day technical event featuring competitions and workshops.
                </p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                  <span className="text-[11px] text-[#FF6A00] font-semibold group-hover:translate-x-1 transition-transform">
                    Explore Details →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 1: TRANSLUCENT OVERLAY WITH THE LINE EFFECT ON WHOLE SCREEN ── */}
      {stage === 'line-overlay' && (
        <div
          className={`fixed inset-0 z-[300] bg-black/65 backdrop-blur-md flex items-center justify-center overflow-hidden transition-opacity duration-300 ${
            lineFadingOut ? 'opacity-0' : 'opacity-100 animate-in fade-in duration-300'
          }`}
        >
          {/* Subtle ambient orange glow */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[#FF6A00]/15 blur-[120px] pointer-events-none" />

          {/* The flowing wavy ribbon Line Effect across the whole page */}
          <div className="w-full max-w-7xl h-[340px] sm:h-[420px] lg:h-[480px] flex items-center justify-center relative pointer-events-none">
            <TextLoop
              text="NOVUS ✦ FLAGSHIP EVENT ✦ CYBERSPACE CLUB"
              shape="wave"
              speed={110}
              direction="forward"
              separator="✦"
              curviness={55}
              fontSize={52}
              fontWeight={900}
              letterSpacing={4}
              uppercase
              color="#FF6A00"
              ribbon
              ribbonColor="rgba(26, 14, 0, 0.85)"
              ribbonWidth={95}
              pauseOnHover={false}
            />
          </div>

          {/* Skip and Close controls */}
          <div className="absolute top-5 right-6 z-[320] flex items-center gap-3">
            <button
              onClick={() => setStage('page')}
              className="px-3.5 py-1.5 rounded-full border border-[#FF6A00]/60 bg-black/60 text-[#FF6A00] hover:bg-[#FF6A00] hover:text-black text-xs font-bold transition-all cursor-pointer backdrop-blur-sm shadow-[0_0_15px_rgba(255,106,0,0.3)]"
            >
              Skip to Event →
            </button>
            <button
              onClick={handleClose}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FF6A00] hover:border-[#FF6A00] transition-colors cursor-pointer bg-black/50 backdrop-blur-sm"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}



      {/* ── STEP 2: THE EVENT PAGE (LEAD-IN FROM LINE EFFECT WITH LIVE DOTGRID BACKGROUND) ── */}
      {stage === 'page' && (
        <div className="fixed inset-0 z-[300] bg-black overflow-hidden novus-content-reveal">
          <ClickSpark
            sparkColor="#FF6A00"
            sparkSize={14}
            sparkRadius={60}
            sparkCount={8}
            duration={600}
            extraScale={1.5}
          >
          {/* Lightfall Interactive Background */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <Lightfall
              colors={['#FF6A00', '#FF8C32', '#FF4500', '#FFA500']}
              backgroundColor="#020100"
              speed={0.8}
              streakCount={3}
              streakWidth={1.0}
              streakLength={1.5}
              glow={0.6}
              density={0.4}
              twinkle={1.2}
              zoom={2.5}
              backgroundGlow={0.4}
              opacity={0.8}
              mouseInteraction={false}
            />
          </div>

          {/* Sticky Top Navigation Bar with Back to Gallery Button */}
          <div className="sticky top-0 z-30 w-full px-5 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md bg-black/70 border-b border-white/10">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#FF6A00]/50 bg-[#FF6A00]/10 text-white hover:bg-[#FF6A00] hover:text-black transition-all duration-300 text-xs sm:text-sm font-bold tracking-wide cursor-pointer shadow-[0_0_20px_rgba(255,106,0,0.25)]"
            >
              <ArrowLeft size={16} />
              <span>Back to Gallery</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setStage('line-overlay');
                  setLineFadingOut(false);
                  setPreloaderFadingOut(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-xs cursor-pointer bg-white/5"
                title="Replay Sequence"
              >
                <RotateCcw size={13} />
                <span>Replay Intro</span>
              </button>

              <button
                onClick={handleClose}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-[#FF6A00] hover:border-[#FF6A00] transition-colors cursor-pointer bg-black/40 backdrop-blur-sm"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Scrollable Content Container */}
          <div className="absolute inset-x-0 bottom-0 top-[73px] overflow-y-auto">
            <div className="relative z-10 px-6 py-12 max-w-5xl mx-auto">
              {/* 3D Double Layered Header */}
              <div className="text-center mb-16 select-none pt-4">
                <div className="relative inline-block">
                  {/* Base/Shadow Layer */}
                  <h2 
                    className="absolute top-[4px] left-[4px] sm:top-[6px] sm:left-[6px] text-6xl sm:text-7xl md:text-8xl font-black text-transparent tracking-tighter -z-10 blur-[1px]"
                    style={{ WebkitTextStroke: '2px #FF6A00', letterSpacing: '-0.02em' }}
                  >
                    NOVUS
                  </h2>
                  {/* Core/Foreground Layer */}
                  <h2 
                    className="text-6xl sm:text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-[#FFB380] to-[#FF6A00] tracking-tighter"
                    style={{ WebkitTextStroke: '1px rgba(255,106,0,0.8)', letterSpacing: '-0.02em' }}
                  >
                    NOVUS
                  </h2>
                </div>
                <div className="mt-4">
                  <span className="px-4 py-1.5 rounded bg-[#FF6A00]/10 border border-[#FF6A00]/30 text-xs sm:text-sm font-bold text-[#FF6A00] tracking-[0.2em] shadow-[0_0_20px_rgba(255,106,0,0.2)]">
                    FLAGSHIP EVENT
                  </span>
                </div>
              </div>
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
                <select 
                  value={selectedYear}
                  onChange={e => setSelectedYear(e.target.value)}
                  className="bg-[#0a0a0a] border border-white/20 hover:border-white/40 text-white text-sm font-medium rounded-lg px-4 py-2.5 outline-none focus:border-[#FF6A00] transition-colors cursor-pointer appearance-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] min-w-[140px]"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto', paddingRight: '2.5rem' }}
                >
                  <option value="All">All Years</option>
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>

                <select 
                  value={selectedType}
                  onChange={e => setSelectedType(e.target.value)}
                  className="bg-[#0a0a0a] border border-white/20 hover:border-white/40 text-white text-sm font-medium rounded-lg px-4 py-2.5 outline-none focus:border-[#FF6A00] transition-colors cursor-pointer appearance-none shadow-[0_4px_12px_rgba(0,0,0,0.5)] min-w-[160px]"
                  style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto', paddingRight: '2.5rem' }}
                >
                  <option value="All">All Event Types</option>
                  <option value="Competition">Competitions</option>
                  <option value="Workshop">Workshops</option>
                  <option value="Ceremony">Ceremonies</option>
                </select>
              </div>

              {/* Events Grid / Carousel */}
              {filteredEvents.length > 0 ? (
                <div style={{ width: '100%', height: '560px', position: 'relative' }}>
                  <CircularCarousel
                    items={filteredEvents.map((evt, idx) => ({
                      src: `https://images.unsplash.com/photo-${[
                        '1550751827-4bd374c3f58b', '1504639725590-34d0984388bd',
                        '1526374965328-7f61d4dc18c5', '1514361892605-64d80dba26a4',
                        '1506744038136-46273834b3fb', '1524504388940-b1c1722653e1',
                        '1486406146926-c627a92ad1ab', '1502680390469-be75c86b636f',
                        '1487958449943-2429e8be8625', '1509631179647-0177331693ae',
                        '1519681393784-d120267933ba', '1485968579580-b6d095142e6e',
                        '1493246507139-91e8fad9978e', '1511818966892-d7d671e672a2',
                        '1498050108023-c5249f4df085', '1503614438599-22a7f5a6b0dc',
                        '1518770660439-4636190af475', '1495360010541-f48722b34f7d'
                      ][idx % 18]}?q=80&w=900&auto=format&fit=crop`,
                      alt: evt.title,
                      title: evt.title,
                      subtitle: `${evt.date} • ${evt.type}`
                    }))}
                    preset="cylinder"
                    intro="spin"
                    cardWidth={260}
                    aspectRatio={1}
                    speed={20}
                    captions
                  />
                </div>
              ) : (
                <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#0a0a0a]/40 rounded-xl border border-white/5">
                  <div className="w-16 h-16 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/5 flex items-center justify-center mb-4 text-[#FF6A00]">
                     <X size={24} />
                  </div>
                  <p className="text-white font-medium text-lg">No events found</p>
                  <p className="text-white/50 text-sm mt-1">Try selecting different filters.</p>
                </div>
              )}

              {/* Bottom CTA with Back to Gallery button */}
              <div className="mt-16 text-center pb-12">
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-sm font-medium"
                >
                  <ArrowLeft size={16} />
                  <span>Return to Gallery</span>
                </button>
              </div>
            </div>
          </div>
          </ClickSpark>
        </div>
      )}

      {/* Preloader Animation Styles */}
      <style jsx global>{`
        @keyframes novusReveal {
          0% { opacity: 0; transform: scale(0.88); filter: blur(8px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); }
        }
        @keyframes novusContentReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes novusCardStagger {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes novusGlitch {
          0%, 100% { text-shadow: none; }
          20% { text-shadow: -3px 0 #FF6A00, 3px 0 #FF8C32; }
          40% { text-shadow: 3px 0 #FF6A00, -3px 0 #FF8C32; }
          60% { text-shadow: -2px 0 #FF8C32, 2px 0 #FF6A00; }
          80% { text-shadow: 2px 0 #FF8C32, -2px 0 #FF6A00; }
        }
        .novus-reveal {
          animation: novusReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .novus-content-reveal {
          animation: novusContentReveal 0.6s ease-out both;
        }
        .novus-card-stagger {
          animation: novusCardStagger 0.4s ease-out both;
        }
        .novus-title-glitch {
          animation: novusGlitch 0.35s ease-in-out 3;
        }
      `}</style>
    </>
  );
}
