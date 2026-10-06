'use client';

import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../data/mockData';
import SectionHeader from './ui/SectionHeader';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import LetterGlitch from './LetterGlitch';
import dynamic from 'next/dynamic';
import TechText from './TechText';
import DomeGallery from './ui/DomeGallery';
import NovusSection from './NovusSection';
import FlowingMenu from './FlowingMenu';
import OptionWheel from './OptionWheel';

const PixelBlast = dynamic(() => import('./PixelBlast'), { ssr: false });

// Placeholder gradient images for gallery
const getPlaceholderStyle = (index) => {
  const gradients = [
    'linear-gradient(135deg, #1a0c00 0%, #4a2000 50%, #1a0c00 100%)',
    'linear-gradient(135deg, #0a0a0a 0%, #2d1500 50%, #0a0a0a 100%)',
    'linear-gradient(225deg, #1a0c00 0%, #3d1c00 50%, #0d0800 100%)',
    'linear-gradient(180deg, #0d0800 0%, #4a2500 50%, #1a0c00 100%)',
    'linear-gradient(135deg, #0a0a0a 0%, #301800 50%, #0a0a0a 100%)',
    'linear-gradient(45deg, #1a0e00 0%, #4a2200 50%, #1a0c00 100%)',
    'linear-gradient(180deg, #0d0a00 0%, #3a1d00 50%, #0a0a0a 100%)',
    'linear-gradient(135deg, #1a0c00 0%, #2d1200 40%, #4a2500 100%)',
    'linear-gradient(225deg, #0a0a0a 0%, #3d1f00 50%, #1a0c00 100%)',
  ];
  return { background: gradients[index % gradients.length] };
};

export default function Gallery() {
  const [menuYear, setMenuYear] = useState('all');
  const [wheelEvent, setWheelEvent] = useState('hackathons');
  const [lightbox, setLightbox] = useState(null);
  const [openNovus, setOpenNovus] = useState(false);
  const years = ['all', '2026', '2025', '2024'];

  const filtered = menuYear === 'all' ? galleryImages : galleryImages.filter((img) => img.year === menuYear && img.category === wheelEvent);

  // Themed FlowingMenu items matching the CyberSpace Club palette
  const menuItems = [
    {
      text: 'All Moments',
      count: galleryImages.length,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
      active: menuYear === 'all',
      onClick: () => setMenuYear('all')
    },
    {
      text: 'NOVUS',
      badge: 'Flagship',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      onClick: () => setOpenNovus(true)
    },
    {
      text: '2026',
      count: galleryImages.filter((img) => img.year === '2026').length,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop',
      active: menuYear === '2026',
      onClick: () => setMenuYear('2026')
    },
    {
      text: '2025',
      count: galleryImages.filter((img) => img.year === '2025').length,
      image: 'https://images.unsplash.com/photo-1515942400420-1b98b584d41a?q=80&w=600&auto=format&fit=crop',
      active: menuYear === '2025',
      onClick: () => setMenuYear('2025')
    },
    {
      text: '2024',
      count: galleryImages.filter((img) => img.year === '2024').length,
      image: 'https://images.unsplash.com/photo-1514361892605-64d80dba26a4?q=80&w=600&auto=format&fit=crop',
      active: menuYear === '2024',
      onClick: () => setMenuYear('2024')
    }
  ];

  return (
    <section id="gallery" className="relative bg-[var(--color-bg-deep)] overflow-hidden min-h-[calc(100vh-80px)] py-10 lg:py-14">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 flex flex-col gap-10">

        {/* ── TOP: GALLERY HEADER (Minimalist PixelBlast strictly in blank space around GALLERY row) ── */}
        <div className="w-full relative flex flex-col items-center text-center py-6 sm:py-8 overflow-hidden rounded-2xl">
          {/* PixelBlast strictly confined to blank space around the gallery row */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
            style={{
              maskImage: 'radial-gradient(ellipse 65% 75% at 50% 50%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 65% 75% at 50% 50%, black 20%, rgba(0,0,0,0.5) 60%, transparent 100%)'
            }}
          >
            <PixelBlast
              variant="circle"
              pixelSize={5}
              color="#FF8C32"
              patternScale={2.5}
              patternDensity={1.05}
              pixelSizeJitter={0.3}
              enableRipples={true}
              rippleSpeed={0.35}
              rippleThickness={0.1}
              rippleIntensityScale={1.2}
              liquid={false}
              speed={0.3}
              edgeFade={0.3}
              transparent={true}
              className=""
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#FF8C32] bg-[#FF8C32]/10 border border-[#FF8C32]/30 mb-2 backdrop-blur-sm">
              Moments Captured
            </span>
            <div className="w-full max-w-xl h-24 sm:h-28 lg:h-32 relative mx-auto">
              <TechText
                text="GALLERY"
                fontWeight={800}
                fontSize={110}
                color="#ffffff"
                accentColor="#FF6A00"
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
              />
            </div>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Explore the spaces, details, and moments that define the Cyberspace experience.
            </p>
          </div>
        </div>

        {/* ── MAIN CONTENT (FlowingMenu + DriftWall Gallery) ── */}
        <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* Left Sidebar: FlowingMenu with Japanese Chrysanthemum Design & Cyber Theme */}
          <div className="w-full lg:w-[330px] xl:w-[360px] shrink-0 h-[380px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden border border-[#FF6A00]/30 bg-[#08050c] shadow-[0_0_35px_rgba(255,106,0,0.15)] relative">
            <FlowingMenu
              items={menuItems}
              speed={14}
              textColor="#F7F5F0"
              bgColor="transparent"
              bgImage=""
              marqueeBgColor="#FF6A00"
              marqueeTextColor="#000000"
              borderColor="rgba(255, 106, 0, 0.22)"
            />
          </div>

          {/* Controller NovusSection for cinematic overlay & preloader */}
          <NovusSection
            isOpen={openNovus}
            onClose={() => setOpenNovus(false)}
            showCard={false}
          />

          {/* Right Content: OptionWheel + DriftWall Gallery */}
          <div className="flex-1 w-full h-[450px] sm:h-[420px] lg:h-[480px] relative flex flex-col sm:flex-row items-center overflow-hidden rounded-2xl bg-[#030105] border border-[#FF6A00]/10 shadow-inner">
            
            {/* The OptionWheel Panel (Slides in when category is selected) */}
            <div 
              className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center shrink-0 bg-gradient-to-b sm:bg-gradient-to-r from-[#FF6A00]/5 to-transparent border-b sm:border-b-0 sm:border-r border-[#FF6A00]/20 ${
                menuYear !== 'all' ? 'h-[120px] w-full sm:h-full sm:w-[170px] lg:w-[220px] opacity-100 translate-y-0 sm:translate-x-0' : 'h-0 sm:h-full sm:w-0 opacity-0 -translate-y-10 sm:-translate-x-10 border-b-0 sm:border-r-0'
              }`}
            >
              {menuYear !== 'all' && (
                <div className="w-full h-full relative" style={{ minWidth: '120px' }}>
                  <OptionWheel 
                    items={['Hackathons', 'Workshops', 'CTF Competitions', 'Fun Events']} 
                    defaultSelected={0} 
                    textColor="rgba(255,255,255,0.25)" 
                    activeColor="#FF6A00" 
                    fontSize={1.2} 
                    spacing={1.4}
                    inset={20}
                    curve={1.2}
                    tilt={8}
                    onChange={(index, item) => {
                      const eventMap = {
                        'Hackathons': 'hackathons',
                        'Workshops': 'workshops',
                        'CTF Competitions': 'ctf',
                        'Fun Events': 'fun_events'
                      };
                      setWheelEvent(eventMap[item]);
                    }}
                  />
                  
                  {/* Subtle fade overlay for top/bottom of the wheel */}
                  <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#030105] to-transparent pointer-events-none z-10" />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#030105] to-transparent pointer-events-none z-10" />
                </div>
              )}
            </div>

            {/* The Content Panel */}
            <div className="flex-1 h-full relative w-full overflow-hidden">
              
              {/* DriftWall (Only for 'all') */}
              <div 
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuYear === 'all' || menuYear === 'novus' ? 'opacity-100 scale-100 z-10 pointer-events-auto' : 'opacity-0 scale-[0.9] z-0 pointer-events-none'
                }`}
              >
                <DomeGallery
                  images={galleryImages.map((img, i) => {
                    const unsplashIds = [
                      '1550751827-4bd374c3f58b',
                      '1504639725590-34d0984388bd',
                      '1526374965328-7f61d4dc18c5',
                      '1514361892605-64d80dba26a4'
                    ];
                    return {
                      id: img.id,
                      src: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=600&auto=format&fit=crop`,
                      alt: img.alt
                    };
                  })}
                  onImageOpen={(src, id) => setLightbox(Number(id))}
                  overlayBlurColor="#030105"
                  grayscale={false}
                />
              </div>

              {/* Grid View (For filtered categories) */}
              <div 
                className={`absolute inset-0 w-full h-full p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuYear !== 'all' && menuYear !== 'novus' ? 'opacity-100 translate-y-0 z-20 pointer-events-auto' : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                }`}
              >
                {filtered.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                    {filtered.map((img, i) => {
                      const unsplashIds = [
                        '1550751827-4bd374c3f58b',
                        '1504639725590-34d0984388bd',
                        '1526374965328-7f61d4dc18c5',
                        '1514361892605-64d80dba26a4'
                      ];
                      const imageUrl = `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=800&auto=format&fit=crop`;
                      return (
                        <div
                          key={img.id}
                          onClick={() => setLightbox(img.id)}
                          className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#FF6A00]/10 hover:border-[#FF6A00]/50 transition-all duration-500 aspect-[16/10] bg-[#08050c]"
                        >
                          <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030105] via-[#030105]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10">
                            <div className="text-[#FF6A00] text-[0.65rem] font-black uppercase tracking-[0.1em] mb-1.5 flex items-center gap-2">
                              {img.year} <span className="w-1 h-1 rounded-full bg-[#FF6A00]"></span> {img.category}
                            </div>
                            <div className="text-white font-medium text-sm sm:text-base drop-shadow-md leading-tight line-clamp-2">{img.alt}</div>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                             <div className="w-12 h-12 rounded-full bg-[#FF6A00]/20 border border-[#FF6A00]/50 backdrop-blur-md flex items-center justify-center text-[#FF6A00] transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_20px_rgba(255,106,0,0.3)]">
                                <ZoomIn size={18} strokeWidth={2.5} />
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full border border-[#FF6A00]/20 bg-[#FF6A00]/5 flex items-center justify-center mb-4 text-[#FF6A00]">
                       <X size={24} />
                    </div>
                    <p className="text-[#F7F5F0] font-medium text-lg">No records found for {wheelEvent}</p>
                    <p className="text-zinc-500 text-sm mt-2">Try selecting a different event from the dial.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          images={filtered}
          currentId={lightbox}
          onClose={() => setLightbox(null)}
          onNav={(id) => setLightbox(id)}
        />
      )}
    </section>
  );
}

function GalleryItem({ image, index, onClick }) {
  const isLarge = index === 0 || index === 5;

  return (
    <div
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-[#FF8C32] transition-all duration-500 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderColor="transparent"
        borderRadius="0"
        glareColor="#FF6A00"
        glareOpacity={0.4}
        className="w-full h-full"
      >
        <div
          className={`w-full h-full ${isLarge ? 'aspect-[16/10]' : 'aspect-square'} transition-transform duration-700 group-hover:scale-105`}
          style={getPlaceholderStyle(index)}
        >
          {/* Overlay icons */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="text-[var(--color-primary)] opacity-20 mb-3">
              {image.category === 'hackathons' && <span className="text-4xl">💻</span>}
              {image.category === 'workshops' && <span className="text-4xl">🏫</span>}
              {image.category === 'ctf' && <span className="text-4xl">🚩</span>}
            </div>
            <span className="text-white/30 text-xs text-center uppercase tracking-wider">{image.alt}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex items-center justify-center z-20 pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-400 transform translate-y-4 group-hover:translate-y-0">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center text-[var(--color-primary)]">
              <ZoomIn size={18} />
            </div>
          </div>
        </div>
      </GlareHover>

      {/* Category badge */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs text-[var(--color-primary)] uppercase tracking-wider font-medium z-30 pointer-events-none">
        {image.category}
      </div>
    </div>
  );
}

function Lightbox({ images, currentId, onClose, onNav }) {
  const currentIndex = images.findIndex((img) => img.id === currentId);

  const unsplashIds = [
    '1550751827-4bd374c3f58b',
    '1504639725590-34d0984388bd',
    '1526374965328-7f61d4dc18c5',
    '1514361892605-64d80dba26a4'
  ];
  const imageUrl = `https://images.unsplash.com/photo-${unsplashIds[currentIndex % unsplashIds.length]}?q=80&w=1200&auto=format&fit=crop`;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNav(images[currentIndex + 1].id);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNav(images[currentIndex - 1].id);
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images, onClose, onNav]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center" onClick={onClose}>
      <button
        className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors cursor-pointer z-10"
        onClick={onClose}
      >
        <X size={20} />
      </button>

      <div className="relative max-w-4xl w-full mx-8" onClick={(e) => e.stopPropagation()}>
        {/* Grayish popout effect added here */}
        <div
          className="w-full aspect-[16/10] rounded-xl overflow-hidden relative shadow-[0_0_40px_rgba(200,200,200,0.15)] ring-1 ring-white/20 transition-all duration-300 bg-[#0a0a0a]"
        >
          <img 
            src={imageUrl} 
            alt={images[currentIndex]?.alt || 'Gallery Image'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <span className="text-white text-base md:text-lg font-medium drop-shadow-md">{images[currentIndex]?.alt}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-30 cursor-pointer"
            onClick={() => currentIndex > 0 && onNav(images[currentIndex - 1].id)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-white/60 text-sm">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>

          <button
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-colors disabled:opacity-30 cursor-pointer"
            onClick={() => currentIndex < images.length - 1 && onNav(images[currentIndex + 1].id)}
            disabled={currentIndex === images.length - 1}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
