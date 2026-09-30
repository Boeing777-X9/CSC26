import { useRef, useState, useEffect } from 'react';
import { useReveal, useCarousel } from '../hooks/useAnimations';
import { eventsData } from '../data/mockData';
import SectionHeader from './SectionHeader';
import { ChevronLeft, ChevronRight, Calendar, Terminal, Zap } from 'lucide-react';

export default function Events() {
  const { currentIndex, next, prev, progress } = useCarousel(eventsData.length, {
    autoPlay: true,
    interval: 5000,
    loop: true,
  });
  const trackRef = useRef(null);
  const { ref: sectionRef, isRevealed } = useReveal();

  useEffect(() => {
    if (trackRef.current) {
      const card = trackRef.current.children[0];
      if (card) {
        const cardWidth = card.offsetWidth + 16; // gap
        trackRef.current.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      }
    }
  }, [currentIndex]);

  return (
    <section id="events" className="relative bg-[var(--color-bg-deep)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,107,0,0.04),transparent_60%)]" />

      <div className="section-padding max-w-7xl mx-auto relative">
        <SectionHeader
          kicker="August by the sea"
          title="Events"
          subtitle="seven nights to remember"
          description="Golden-hour gatherings, wine, live music, and nights with friends. Choose your date."
        />

        {/* Carousel viewport */}
        <div ref={sectionRef} className={`relative mt-12 reveal ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="overflow-hidden rounded-2xl">
            <div
              ref={trackRef}
              className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              {eventsData.map((event, i) => (
                <EventCard key={event.id} event={event} isActive={i === currentIndex} index={i} />
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-12 h-12 rounded-full bg-[var(--color-bg-card)]/90 backdrop-blur-sm border border-[var(--color-border)] flex items-center justify-center text-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer hidden md:flex"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-12 h-12 rounded-full bg-[var(--color-bg-card)]/90 backdrop-blur-sm border border-[var(--color-border)] flex items-center justify-center text-white hover:text-[var(--color-primary)] hover:border-[var(--color-primary)] transition-all duration-300 cursor-pointer hidden md:flex"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Progress and counter */}
        <div className="flex items-center gap-4 mt-8 max-w-md mx-auto">
          <span className="text-sm text-white font-mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(eventsData.length).padStart(2, '0')}
          </span>
          <div className="flex-1 h-px bg-[var(--color-border)] relative overflow-hidden rounded-full">
            <div
              className="absolute inset-y-0 left-0 bg-[var(--color-primary)] rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Mobile dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {eventsData.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === currentIndex ? 'bg-[var(--color-primary)] w-6' : 'bg-[var(--color-border)]'
              }`}
              onClick={() => {
                // Direct set via carousel
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ event, isActive }) {
  const getIcon = () => {
    if (event.tags.includes('InfoSec') || event.tags.includes('Engineering') || event.tags.includes('Development')) return <Terminal size={16} />;
    if (event.tags.includes('CTF') || event.tags.includes('Competition')) return <Zap size={16} />;
    return <Calendar size={16} />;
  };

  return (
    <div
      className={`flex-shrink-0 w-[calc(100%-2rem)] sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] rounded-xl border overflow-hidden transition-all duration-500 ${
        isActive
          ? 'border-[var(--color-primary)] shadow-[0_0_30px_rgba(255,107,0,0.15)] scale-[1.02]'
          : 'border-[var(--color-border)] opacity-70 scale-100'
      }`}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[var(--color-bg-card)] to-[#2a1500] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[var(--color-primary)] opacity-20">
            {getIcon()}
          </div>
        </div>

        {/* Date badge */}
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-[var(--color-border-orange)]">
          <span className="text-[var(--color-primary)] text-xs font-semibold uppercase tracking-wider">
            {event.date}
          </span>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 bg-[var(--color-bg-card)]">
        <h3 className="text-white font-semibold text-lg mb-2">{event.title}</h3>
        <p className="text-[var(--color-text-muted)] text-sm mb-4 line-clamp-2">{event.description}</p>
        <div className="flex items-center gap-2 text-[var(--color-primary)]">
          {getIcon()}
          <span className="text-xs uppercase tracking-wider font-medium">{event.tags}</span>
        </div>
      </div>
    </div>
  );
}
