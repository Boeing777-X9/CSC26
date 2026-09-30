import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { heroData } from '../data/mockData';
import Button from './Button';
import JoinButton from './JoinButton';
import AsciiImageEffect from './AsciiImageEffect';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 21st.dev Ascii Image Effect Background */}
      <AsciiImageEffect src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop" />

      <div className="absolute inset-0 z-[1]">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[var(--color-bg-deep)] to-transparent" />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-[20%] left-[15%] w-96 h-96 rounded-full bg-[var(--color-primary)] opacity-[0.03] blur-[120px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[10%] w-72 h-72 rounded-full bg-[var(--color-primary-light)] opacity-[0.04] blur-[100px]"
        style={{ animation: 'float 12s ease-in-out infinite' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        {/* Kicker */}
        <div
          className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <span className="kicker inline-flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[var(--color-primary)]" />
            Cyberspace Club
            <span className="w-8 h-px bg-[var(--color-primary)]" />
          </span>
        </div>

        {/* Main headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <span className="block">Securing</span>
          <span className="block mt-1">
            <span className="text-[var(--color-primary)] italic" style={{ fontFamily: 'var(--font-script)' }}>the</span>
          </span>
          <span className="block mt-1">Future</span>
        </h1>

        {/* Subline */}
        <p
          className={`text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl mx-auto mb-10 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {heroData.subline}
        </p>

        {/* CTA */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <JoinButton size="lg" icon={ArrowRight}>
            Join the Club
          </JoinButton>
          <Button href="#about" variant="outline" size="lg">
            Explore
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--color-text-muted)] transition-all duration-1000 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1400ms' }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </div>

      {/* Bottom wave divider */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-16 md:h-24 text-[var(--color-bg-deep)]"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 42 C178 18 318 24 486 50 C676 79 834 78 1022 44 C1194 13 1320 20 1440 38 L1440 96 L0 96 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
