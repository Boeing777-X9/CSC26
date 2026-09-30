import { useReveal } from '../hooks/useAnimations';

export default function SectionHeader({ kicker, title, subtitle, description, align = 'center', className = '' }) {
  const { ref, isRevealed } = useReveal();

  const alignClasses = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  };

  return (
    <div ref={ref} className={`flex flex-col gap-4 max-w-3xl ${align === 'center' ? 'mx-auto' : ''} ${alignClasses[align]} ${className}`}>
      {kicker && (
        <p className={`kicker reveal ${isRevealed ? 'is-revealed' : ''}`}>
          {kicker}
        </p>
      )}
      {title && (
        <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight reveal reveal-delay-1 ${isRevealed ? 'is-revealed' : ''}`}>
          {title}
        </h2>
      )}
      {subtitle && (
        <p className={`text-lg md:text-xl text-[var(--color-primary)] font-medium italic reveal reveal-delay-2 ${isRevealed ? 'is-revealed' : ''}`}
           style={{ fontFamily: 'var(--font-script)' }}>
          {subtitle}
        </p>
      )}
      {description && (
        <p className={`text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-xl ${align === 'center' ? 'mx-auto' : ''} reveal reveal-delay-3 ${isRevealed ? 'is-revealed' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
