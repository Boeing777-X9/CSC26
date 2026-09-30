import { useReveal } from '../hooks/useAnimations';

export default function Card({ children, variant = 'default', hover = true, className = '', onClick }) {
  const { ref, isRevealed } = useReveal();

  const variants = {
    default: 'bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl',
    glass: 'glass-card rounded-2xl',
    glassOrange: 'glass-card-orange rounded-2xl',
    flat: 'bg-[var(--color-bg-dark)] rounded-2xl',
  };

  const hoverClasses = hover
    ? 'hover:border-[var(--color-border-orange)] hover:shadow-[0_0_30px_rgba(255,107,0,0.1)] hover:-translate-y-1 transition-all duration-400'
    : 'transition-all duration-300';

  return (
    <div
      ref={ref}
      className={`reveal ${isRevealed ? 'is-revealed' : ''} ${variants[variant]} ${hoverClasses} overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
