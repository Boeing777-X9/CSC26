'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, X, RotateCcw } from 'lucide-react';
import TextLoop from './TextLoop';
import AeroShards from './AeroShards';

// NOVUS flagship event data
const novusEvents = [
  { id: 'n1', title: 'NOVUS Kickoff', desc: 'Opening ceremony & keynote', date: 'Day 1', icon: '🚀' },
  { id: 'n2', title: 'Cyber Arena', desc: 'Live hacking championship', date: 'Day 1', icon: '⚔️' },
  { id: 'n3', title: 'Bug Bounty Blitz', desc: 'Find real vulnerabilities', date: 'Day 2', icon: '🐛' },
  { id: 'n4', title: 'CryptoQuest', desc: 'Cryptography challenges', date: 'Day 2', icon: '🔐' },
  { id: 'n5', title: 'Network Wars', desc: 'Network defense & attack sim', date: 'Day 3', icon: '🌐' },
  { id: 'n6', title: 'NOVUS Finals', desc: 'Grand finale & awards', date: 'Day 3', icon: '🏆' },
];

export default function NovusSection({
  isOpen: externalOpen,
  onClose: externalClose,
  showCard = true
} = {}) {
  // Stages: 'idle' | 'line-overlay' | 'preloader' | 'page'
  const [stage, setStage] = useState('idle');
  const [lineFadingOut, setLineFadingOut] = useState(false);
  const [preloaderFadingOut, setPreloaderFadingOut] = useState(false);

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
  // Step 2: preloader title reveal (fade in -> glitch title -> fade out)
  // Step 3: event page with AeroShards
  useEffect(() => {
    if (stage === 'line-overlay') {
      const fadeOutTimer = setTimeout(() => {
        setLineFadingOut(true);
      }, 700);

      const nextTimer = setTimeout(() => {
        setStage('preloader');
        setPreloaderFadingOut(false);
      }, 1000);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(nextTimer);
      };
    }

    if (stage === 'preloader') {
      const fadeOutTimer = setTimeout(() => {
        setPreloaderFadingOut(true);
      }, 2000);

      const nextTimer = setTimeout(() => {
        setStage('page');
      }, 2500);

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
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    NOVUS
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black uppercase tracking-wider">
                    Flagship
                  </span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
                  Our crown jewel event — 3 days of competitions & challenges.
                </p>
                <div className="flex items-center justify-between mt-2 pt-1 border-t border-white/5">
                  <span className="text-[11px] text-[#FF6A00] font-bold group-hover:translate-x-1 transition-transform">
                    Launch Flagship Experience →
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded border border-[#FF6A00]/40 text-white/80 group-hover:bg-[#FF6A00] group-hover:text-black transition-colors">
                    Open
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

      {/* ── STEP 2: THE PRELOADER (NOVUS FLAGSHIP EVENT REVEAL SHOWN IN USER SCREENSHOT) ── */}
      {stage === 'preloader' && (
        <div
          className={`fixed inset-0 z-[300] bg-black flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
            preloaderFadingOut ? 'opacity-0' : 'opacity-100 novus-reveal'
          }`}
        >
          {/* Ambient center pulse */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-[#FF6A00]/10 blur-[130px] pointer-events-none animate-pulse" />

          {/* Subtle spinning circular loop behind title */}
          <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
            <TextLoop
              text="NOVUS ✦ FLAGSHIP ✦ CYBERSPACE"
              shape="circle"
              speed={45}
              direction="forward"
              separator="◆"
              curviness={110}
              fontSize={30}
              fontWeight={900}
              letterSpacing={6}
              uppercase
              color="#FF8C32"
              ribbon={false}
              pauseOnHover={false}
            />
          </div>

          {/* Big NOVUS title as shown in user screenshot */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white tracking-tighter novus-title-glitch select-none">
              NOVUS
            </h1>
            <div className="mt-4 flex items-center gap-3 relative z-10">
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#FF6A00]" />
              <span className="text-xs sm:text-sm font-bold text-[#FF6A00] tracking-[0.5em] uppercase">
                FLAGSHIP EVENT
              </span>
              <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#FF6A00]" />
            </div>
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

      {/* ── STEP 3: THE EVENT PAGE (LEAD-IN FROM PRELOADER WITH LIVE AEROSHARDS BACKGROUND) ── */}
      {stage === 'page' && (
        <div className="fixed inset-0 z-[300] bg-black overflow-hidden novus-content-reveal">
          {/* AeroShards Live Interactive WebGPU Background */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
            <AeroShards
              backgroundColor="#08050c"
              shardColor="#FF6A00"
              accentColor="#FFA500"
              placement="full"
              flow="stream"
              material="pearl"
              detail="balanced"
              effect="none"
              scale={1}
              spread={0.85}
              depth={1}
              speed={0.8}
              spin={1}
              interaction="repel"
              density={1.3}
              shardSize={1.1}
              stretch={1}
              turbulence={1}
              glow={1.2}
              edgeSoftness={2}
              bloom={0.5}
              grain={0.04}
              chromaticAberration={0.0075}
              transitionDuration={1}
              interactionRadius={1.5}
              interactionStrength={0.5}
              rippleIntensity={1}
              holdToGather={true}
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
              {/* Header (Clean NOVUS without star icon) */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
                    NOVUS
                  </h2>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#FF6A00] to-[#FF8C32] text-black">
                    FLAGSHIP
                  </span>
                </div>
                <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
                  The ultimate cybersecurity event — 3 days of intense competitions,
                  workshops, and networking. Our crown jewel that brings together
                  the best minds in security.
                </p>
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/40">
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">📅 3 Days</span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">🏟️ MUJ Campus</span>
                  <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">🎯 6 Events</span>
                </div>
              </div>

              {/* Events Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {novusEvents.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className="group relative p-6 rounded-2xl border border-white/10 hover:border-[#FF6A00]/50 transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-md novus-card-stagger"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(26,14,0,0.75) 0%, rgba(10,8,0,0.85) 100%)',
                      animationDelay: `${idx * 100}ms`,
                    }}
                  >
                    <div className="absolute top-0 right-0 w-[120px] h-[120px] rounded-full bg-[#FF6A00]/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl">{evt.icon}</span>
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-white/60 font-semibold border border-white/5">
                          {evt.date}
                        </span>
                      </div>
                      <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#FF8C32] transition-colors">{evt.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{evt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA with Back to Gallery button */}
              <div className="mt-16 text-center pb-12">
                <button
                  onClick={handleClose}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-[#FF6A00]/50 text-[#FF6A00] text-sm font-semibold hover:bg-[#FF6A00] hover:text-black transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(255,106,0,0.2)]"
                >
                  <ArrowLeft size={16} />
                  <span>Back to Gallery</span>
                </button>
              </div>
            </div>
          </div>
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
