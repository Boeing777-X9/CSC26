import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { navLinks, siteConfig } from '../data/mockData';
import Button from './Button';
import SpecularButton from './SpecularButton';
import GooeyNav from './GooeyNav';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleJoinClick = (e, closeMenu = false) => {
    e.preventDefault();
    if (closeMenu) setIsOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/join');
    }, 1500);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--color-bg-deep)]/90 backdrop-blur-xl border-b border-[var(--color-border)]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 z-[101]">
            <img src="/logo.png" alt="CSC Logo" className="w-10 h-10 object-contain" />
            <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
              Cyberspace <span className="text-[var(--color-primary)]">Club</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center mr-6">
            <GooeyNav
              items={navLinks}
              particleCount={4}
              particleDistances={[90, 10]}
              particleR={600}
              animationTime={600}
              timeVariance={200}
              colors={[1, 2, 3, 4, 1, 2, 3, 4]}
            />
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="/join" onClick={(e) => handleJoinClick(e, false)}>
              <SpecularButton
                size="sm"
                radius={18}
                tint="#FF6A00"
                tintOpacity={0.1}
                blur={4}
                textColor="#ffffff"
                lineColor="#FF6A00"
                baseColor="#525252"
                intensity={1.5}
                shineSize={12}
                shineFade={30}
                thickness={2}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
              >
                Join Us
              </SpecularButton>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden z-[101] w-10 h-10 flex items-center justify-center rounded-lg text-white hover:text-[var(--color-primary)] transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-[var(--color-bg-deep)]/95 backdrop-blur-2xl" />

        <div className="relative h-full flex flex-col justify-center items-center px-8">
          <nav className="flex flex-col items-center gap-1 mb-10">
            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-2xl sm:text-3xl font-semibold text-white hover:text-[var(--color-primary)] transition-all duration-300 py-2"
                style={{
                  transitionDelay: isOpen ? `${150 + i * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div
            className="flex flex-col items-center gap-4"
            style={{
              transitionDelay: isOpen ? '500ms' : '0ms',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <a href="/join" onClick={(e) => handleJoinClick(e, true)}>
              <SpecularButton
                size="md"
                radius={18}
                tint="#FF6A00"
                tintOpacity={0.1}
                blur={4}
                textColor="#ffffff"
                lineColor="#FF6A00"
                baseColor="#525252"
                intensity={1.5}
                shineSize={12}
                shineFade={30}
                thickness={2}
                speed={0.35}
                followMouse
                proximity={250}
                autoAnimate={false}
              >
                Join the Club
              </SpecularButton>
            </a>
            <div className="flex items-center gap-6 mt-4 text-[var(--color-text-muted)]">
              <a href={siteConfig.mapLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-primary)] transition-colors">
                <MapPin size={20} />
              </a>
              <a href={`tel:${siteConfig.phone}`} className="hover:text-[var(--color-primary)] transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Preloader */}
      {isLoading && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--color-bg-deep)] transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[var(--color-primary)] font-mono text-lg animate-pulse">Initializing Terminal...</p>
          </div>
        </div>
      )}
    </>
  );
}
