'use client';

import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../data/mockData';
import SectionHeader from './ui/SectionHeader';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import LetterGlitch from './LetterGlitch';
import dynamic from 'next/dynamic';
import TechText from './TechText';
import DriftWall from './ui/DriftWall';
import NovusSection from './NovusSection';
import FlowingMenu from './FlowingMenu';

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
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [openNovus, setOpenNovus] = useState(false);
  const categories = ['all', 'hackathons', 'workshops', 'ctf'];

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  // Themed FlowingMenu items matching the CyberSpace Club palette
  const menuItems = [
    {
      text: 'All Moments',
      count: galleryImages.length,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
      active: filter === 'all',
      onClick: () => setFilter('all')
    },
    {
      text: 'NOVUS',
      badge: 'Flagship',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop',
      onClick: () => setOpenNovus(true)
    },
    {
      text: 'Hackathons',
      count: galleryImages.filter((img) => img.category === 'hackathons').length,
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=600&auto=format&fit=crop',
      active: filter === 'hackathons',
      onClick: () => setFilter('hackathons')
    },
    {
      text: 'Workshops',
      count: galleryImages.filter((img) => img.category === 'workshops').length,
      image: 'https://images.unsplash.com/photo-1515942400420-1b98b584d41a?q=80&w=600&auto=format&fit=crop',
      active: filter === 'workshops',
      onClick: () => setFilter('workshops')
    },
    {
      text: 'CTF Challenges',
      count: galleryImages.filter((img) => img.category === 'ctf').length,
      image: 'https://images.unsplash.com/photo-1514361892605-64d80dba26a4?q=80&w=600&auto=format&fit=crop',
      active: filter === 'ctf',
      onClick: () => setFilter('ctf')
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
              bgImage="/chrysanthemum-clean.jpg"
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

          {/* Right Content: DriftWall Gallery (increased width, same length) */}
          <div className="flex-1 w-full h-[380px] sm:h-[420px] lg:h-[480px] relative">
            <DriftWall
              items={(filtered.length >= 4 ? filtered.slice(0, 4) : [...filtered, ...galleryImages]).slice(0, 4).map((img, i) => {
                const unsplashIds = [
                  '1550751827-4bd374c3f58b',
                  '1504639725590-34d0984388bd',
                  '1526374965328-7f61d4dc18c5',
                  '1514361892605-64d80dba26a4'
                ];
                return {
                  id: img.id,
                  image: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=600&auto=format&fit=crop`,
                  title: img.alt,
                  category: img.category
                };
              })}
              columns={4}
              tileWidth={270}
              tileHeight={140}
              gap={16}
              tilt={16}
              turn={-14}
              perspective={1800}
              depth={260}
              speed={24}
              direction="up"
              variance={0.4}
              parallax={0.6}
              lift={50}
              fade={0.15}
              dim={0.55}
              overlayColor="#b9672e"
              onItemClick={(id) => setLightbox(Number(id))}
            />
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
        <div
          className="w-full aspect-[16/10] rounded-xl overflow-hidden"
          style={getPlaceholderStyle(currentIndex)}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/40 text-sm">{images[currentIndex]?.alt}</span>
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
