import { useReveal } from '../hooks/useAnimations';
import { aboutData, statsData } from '../data/mockData';
import { Terminal, Shield } from 'lucide-react';

export default function About() {
  const { ref: sectionRef, isRevealed: sectionRevealed } = useReveal();
  const { ref: statsRef, isRevealed: statsRevealed } = useReveal();

  return (
    <section id="about" className="relative bg-[var(--color-bg-deep)] overflow-hidden">
      {/* Subtle orange radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,107,0,0.06),transparent_70%)]" />

      <div className="section-padding max-w-7xl mx-auto">
        {/* Main about content */}
        <div ref={sectionRef} className="flex flex-col items-center text-center mb-20 md:mb-28">
          <p className={`kicker mb-8 reveal ${sectionRevealed ? 'is-revealed' : ''}`}>
            {aboutData.kicker}
          </p>

          <h2 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] reveal reveal-delay-1 ${sectionRevealed ? 'is-revealed' : ''}`}>
            <span className="block">
              Fresh{' '}
              <span className="text-[var(--color-primary)] italic" style={{ fontFamily: 'var(--font-script)' }}>
                seafood
              </span>
            </span>
            <span className="block">Italian Ease Ocean</span>
            <span className="block">
              <span className="text-[var(--color-primary)] italic" style={{ fontFamily: 'var(--font-script)' }}>
                Air
              </span>{' '}
              Sunny Seas
            </span>
          </h2>

          <p
            className={`mt-2 text-[var(--color-primary)] text-2xl md:text-3xl italic reveal reveal-delay-2 ${sectionRevealed ? 'is-revealed' : ''}`}
            style={{ fontFamily: 'var(--font-script)' }}
          >
            {aboutData.signature}
          </p>

          {/* Icon */}
          <div className={`mt-8 reveal reveal-delay-3 ${sectionRevealed ? 'is-revealed' : ''}`}>
            <div className="w-10 h-12 flex items-center justify-center text-[var(--color-primary)]">
              <Shield size={28} />
            </div>
          </div>

          {/* Description */}
          <p className={`mt-8 text-[var(--color-text-secondary)] text-lg leading-relaxed max-w-2xl reveal reveal-delay-4 ${sectionRevealed ? 'is-revealed' : ''}`}>
            {aboutData.description}
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, i) => (
            <div
              key={stat.label}
              className={`relative group text-center p-6 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-orange)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] reveal ${statsRevealed ? 'is-revealed' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[rgba(255,107,0,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] mb-2 text-glow">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-text-secondary)] uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave icon decoration */}
      <div className="absolute bottom-10 right-10 text-[var(--color-primary)] opacity-10">
        <Terminal size={80} />
      </div>
    </section>
  );
}
