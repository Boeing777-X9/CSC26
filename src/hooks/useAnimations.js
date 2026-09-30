import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook to observe elements entering the viewport and add reveal class
 */
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(element);
        }
      },
      { threshold: options.threshold || 0.15, rootMargin: options.rootMargin || '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  return { ref, isRevealed };
}

/**
 * Hook for scroll-based parallax
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.bottom > 0 && rect.top < windowHeight) {
              const centerOffset = (rect.top + rect.height / 2 - windowHeight / 2) / windowHeight;
              setOffset(centerOffset * speed * 100);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * Hook for carousel/slider functionality
 */
export function useCarousel(totalItems, options = {}) {
  const { autoPlay = false, interval = 4000, loop = true } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= totalItems - 1) return loop ? 0 : prev;
      return prev + 1;
    });
  }, [totalItems, loop]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return loop ? totalItems - 1 : prev;
      return prev - 1;
    });
  }, [totalItems, loop]);

  const goTo = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalItems - 1)));
  }, [totalItems]);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, interval, next]);

  const pause = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const resume = useCallback(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(next, interval);
  }, [autoPlay, interval, next]);

  return { currentIndex, next, prev, goTo, pause, resume, progress: ((currentIndex + 1) / totalItems) * 100 };
}
