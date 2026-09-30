import { useReveal } from '../hooks/useAnimations';
import { drinksData } from '../data/mockData';
import { Lock, Code } from 'lucide-react';

export default function DrinksExperience() {
  const { ref, isRevealed } = useReveal();

  return (
    <section className="relative bg-[var(--color-bg-dark)] overflow-hidden py-0">
      {/* Background atmosphere */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,107,0,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_60%,rgba(255,159,74,0.04),transparent_50%)]" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left: Decorative drink visual */}
          <div className="relative w-full lg:w-1/2 flex items-center justify-center">
            <div className={`relative reveal ${isRevealed ? 'is-revealed' : ''}`}>
              {/* Background circle */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-[rgba(255,107,0,0.1)] to-[rgba(255,107,0,0.02)] border border-[var(--color-border-orange)] flex items-center justify-center"
                style={{ animation: 'float-slow 8s ease-in-out infinite' }}
              >
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-gradient-to-tl from-[rgba(255,107,0,0.15)] to-[rgba(255,107,0,0.03)] border border-[var(--color-border-orange)] flex items-center justify-center">
                  <Lock size={64} className="text-[var(--color-primary)]" strokeWidth={1} />
                </div>
              </div>

              {/* Floating leaf decorations */}
              <div className="absolute -top-4 -right-6 text-[var(--color-primary)] opacity-40"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <Code size={36} className="rotate-45" />
              </div>
              <div className="absolute -bottom-4 -left-8 text-[var(--color-primary)] opacity-30"
                style={{ animation: 'float 8s ease-in-out infinite reverse' }}
              >
                <Code size={28} className="-rotate-12" />
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className={`kicker mb-4 reveal ${isRevealed ? 'is-revealed' : ''}`}>
              {drinksData.kicker}
            </p>
            <h2 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 reveal reveal-delay-1 ${isRevealed ? 'is-revealed' : ''}`}
              style={{ fontFamily: 'var(--font-script)', fontWeight: 400 }}
            >
              {drinksData.title}
            </h2>
            <p className={`text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-md ${
              typeof window !== 'undefined' && window.innerWidth >= 1024 ? '' : 'mx-auto'
            } reveal reveal-delay-2 ${isRevealed ? 'is-revealed' : ''}`}>
              {drinksData.description}
            </p>

            {/* Decorative divider */}
            <div className={`mt-8 flex items-center gap-4 ${typeof window !== 'undefined' && window.innerWidth >= 1024 ? '' : 'justify-center'} reveal reveal-delay-3 ${isRevealed ? 'is-revealed' : ''}`}>
              <div className="w-12 h-px bg-[var(--color-primary)]" />
              <Lock size={16} className="text-[var(--color-primary)]" />
              <div className="w-12 h-px bg-[var(--color-primary)]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
