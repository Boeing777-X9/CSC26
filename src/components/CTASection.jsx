import { useReveal } from '../hooks/useAnimations';
import Button from './Button';
import JoinButton from './JoinButton';
import { ArrowRight, Terminal } from 'lucide-react';
import LetterGlitch from './LetterGlitch';

export default function CTASection() {
  const { ref, isRevealed } = useReveal();

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-deep)]">
      {/* Background */}
      <div className="absolute inset-0">
        <LetterGlitch 
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
          backgroundColor="#050505"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)] via-[rgba(5,5,5,0.4)] to-[var(--color-bg-deep)] pointer-events-none" />
      </div>

      {/* Animated wave at top */}
      <svg
        className="absolute top-0 left-0 right-0 w-full h-12 md:h-20 text-[var(--color-bg-dark)] rotate-180"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        <path
          d="M0 42 C178 18 318 24 486 50 C676 79 834 78 1022 44 C1194 13 1320 20 1440 38 L1440 96 L0 96 Z"
          fill="currentColor"
        />
      </svg>

      <div ref={ref} className="relative z-10 py-24 md:py-32 px-5 sm:px-8">
        <div className={`max-w-3xl mx-auto text-center reveal ${isRevealed ? 'is-revealed' : ''}`}>
          <div className="inline-flex items-center gap-3 mb-6">
            <Terminal size={20} className="text-[var(--color-primary)]" />
            <span className="kicker">Ready to hack?</span>
            <Terminal size={20} className="text-[var(--color-primary)]" />
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            The terminal is{' '}
            <span className="text-[var(--color-primary)] italic" style={{ fontFamily: 'var(--font-script)' }}>
              waiting
            </span>
          </h2>

          <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            The code, the challenges, the community—the only thing missing is you. 
            Apply now and become part of the cybersecurity vanguard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <JoinButton size="lg" icon={ArrowRight} className="glow-orange">
              Apply Now
            </JoinButton>
            <Button href={`#contact`} variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
