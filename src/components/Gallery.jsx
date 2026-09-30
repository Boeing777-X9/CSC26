'use client';

import { useState, useRef, useEffect } from 'react';
import { galleryImages } from '../data/mockData';
import SectionHeader from './ui/SectionHeader';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import LetterGlitch from './LetterGlitch';
import DriftWall from './ui/DriftWall';

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
  const categories = ['all', 'hackathons', 'workshops', 'ctf'];

  const filtered = filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter);

  return (
    <section id="gallery" className="relative bg-[var(--color-bg-deep)] overflow-hidden min-h-[calc(100vh-80px)]">
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-5 sm:px-8 py-10 flex flex-col lg:flex-row gap-10 items-center h-full min-h-[calc(100vh-80px)]">
        {/* Left Sidebar: Header and Filters */}
        <div className="w-full lg:w-1/4 flex flex-col justify-center">
          <SectionHeader
            kicker="Scenes by the shore"
            title="Gallery"
            subtitle="moments captured"
            description="Explore the spaces, details, and moments that define the Coast experience."
            align="left"
          />

          {/* Filters (Vertical) */}
          <div className="flex flex-row lg:flex-col flex-wrap justify-start gap-3 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full lg:rounded-xl text-sm font-medium capitalize transition-all duration-300 cursor-pointer text-left ${
                  filter === cat
                    ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(255,106,0,0.4)] border border-[var(--color-primary)]'
                    : 'bg-black/40 backdrop-blur-md text-[var(--color-text-secondary)] border border-white/10 hover:border-[var(--color-border-orange)] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* DriftWall Gallery */}
        <div className="flex-1 w-full h-[600px] lg:h-[800px] relative">
          <DriftWall
            items={filtered.map((img, i) => {
              const unsplashIds = [
                '1550751827-4bd374c3f58b',
                '1504639725590-34d0984388bd',
                '1526374965328-7f61d4dc18c5',
                '1514361892605-64d80dba26a4',
                '1587899897328-98e8bf7b13d2',
                '1515942400420-1b98b584d41a'
              ];
              return {
                id: img.id,
                image: `https://images.unsplash.com/photo-${unsplashIds[i % unsplashIds.length]}?q=80&w=600&auto=format&fit=crop`,
                title: img.alt,
                category: img.category
              };
            })}
            columns={4}
            tileWidth={280}
            tileHeight={166}
            gap={20}
            tilt={16}
            turn={-14}
            perspective={2400}
            depth={400}
            speed={26}
            direction="up"
            variance={0.45}
            parallax={0.7}
            lift={56}
            fade={0.15}
            dim={0.55}
            overlayColor="#b9672e"
            onItemClick={(id) => setLightbox(id)}
          />
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
