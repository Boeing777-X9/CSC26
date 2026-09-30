import { useState, useEffect, useRef } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { dayNightData } from '../data/mockData';
import { Target, Shield } from 'lucide-react';

export default function DayNight() {
  const [isNight, setIsNight] = useState(false);
  const { ref, isRevealed } = useReveal();
  const sectionRef = useRef(null);

  // Auto toggle for demo effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsNight((prev) => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-deep)]">
      <div ref={sectionRef} className="section-padding max-w-7xl mx-auto">
        <div ref={ref} className="relative">
          {/* Content */}
          <div className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal ${isRevealed ? 'is-revealed' : ''}`}>
            {/* Visual */}
            <div className="w-full lg:w-1/2 relative">
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[var(--color-border)]">
                {/* Day gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: isNight ? 0 : 1,
                    background: 'linear-gradient(135deg, #1a1000 0%, #3d2800 30%, #5a3a00 60%, #2d1800 100%)',
                  }}
                >
                  <div className="absolute top-6 right-8 text-[#FF3333] opacity-30">
                    <Target size={48} />
                  </div>
                </div>

                {/* Night gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-1000"
                  style={{
                    opacity: isNight ? 1 : 0,
                    background: 'linear-gradient(135deg, #050510 0%, #0a0a2e 30%, #141450 60%, #0a0a1a 100%)',
                  }}
                >
                  <div className="absolute top-6 right-8 text-[#3388FF] opacity-30">
                    <Shield size={40} />
                  </div>
                  {/* Stars */}
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white"
                      style={{
                        top: `${15 + Math.random() * 50}%`,
                        left: `${10 + Math.random() * 80}%`,
                        opacity: 0.2 + Math.random() * 0.4,
                        animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Central content on image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3
                      className="text-3xl md:text-4xl font-bold text-white mb-2 transition-all duration-700"
                      key={isNight ? 'night' : 'day'}
                    >
                      {isNight ? dayNightData.night.title : dayNightData.day.title}
                    </h3>
                    <p className="text-[var(--color-primary)] italic text-lg"
                      style={{ fontFamily: 'var(--font-script)' }}
                    >
                      {isNight ? dayNightData.night.subtitle : dayNightData.day.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Toggle indicator */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setIsNight(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    !isNight
                      ? 'bg-[#FF3333] text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  <Target size={14} /> Red Team
                </button>
                <button
                  onClick={() => setIsNight(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isNight
                      ? 'bg-[#3388FF] text-white'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  <Shield size={14} /> Blue Team
                </button>
              </div>
            </div>

            {/* Text content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="kicker mb-4">Red vs Blue</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Security is a{' '}
                <span className="text-[var(--color-primary)]">constant battle</span>
              </h2>
              <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed mb-8">
                The digital landscape shifts as offensive and defensive strategies evolve. 
                Red teams simulate attacks, blue teams defend and monitor. It's a continuous 
                cycle—and every side sharpens the other.
              </p>

              {/* Time cards */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { time: 'Reconnaissance', hours: 'Attack Surface', icon: Target },
                  { time: 'Exploitation', hours: 'Breach Defenses', icon: Target },
                  { time: 'Monitoring', hours: 'Threat Detection', icon: Shield },
                  { time: 'Incident Response', hours: 'Contain & Recover', icon: Shield },
                ].map((slot) => (
                  <div key={slot.time} className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-orange)] transition-all duration-300 group">
                    <slot.icon size={16} className="text-[var(--color-primary)] mb-2" />
                    <div className="text-white font-semibold text-sm">{slot.time}</div>
                    <div className="text-[var(--color-text-muted)] text-xs">{slot.hours}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
