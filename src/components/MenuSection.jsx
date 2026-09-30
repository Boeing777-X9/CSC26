import { useState } from 'react';
import { useReveal } from '../hooks/useAnimations';
import { menuCategories } from '../data/mockData';
import SectionHeader from './SectionHeader';
import { Terminal, Cpu } from 'lucide-react';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('seafood');
  const { ref, isRevealed } = useReveal();

  const currentCategory = menuCategories.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="relative bg-[var(--color-bg-dark)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,107,0,0.04),transparent_60%)]" />

      <div className="section-padding max-w-7xl mx-auto relative">
        <SectionHeader
          kicker="From the kitchen"
          title="The Menu"
          subtitle="every reason to stay"
          description="Fresh catches, handmade pasta, and generous plates arrive at the centre, ready to pass around the table."
        />

        {/* Category tabs */}
        <div ref={ref} className={`flex flex-wrap justify-center gap-2 mt-12 mb-10 reveal ${isRevealed ? 'is-revealed' : ''}`}>
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)]'
                  : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-border-orange)] hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Category description */}
        <p className="text-center text-[var(--color-text-muted)] text-sm mb-8 flex items-center justify-center gap-2">
          <Terminal size={14} className="text-[var(--color-primary)]" />
          {currentCategory?.description}
        </p>

        {/* Menu items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {currentCategory?.items.map((item, i) => (
            <MenuItem key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuItem({ item, index }) {
  const { ref, isRevealed } = useReveal();

  return (
    <div
      ref={ref}
      className={`group relative p-5 md:p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] hover:border-[var(--color-border-orange)] transition-all duration-400 hover:shadow-[0_0_20px_rgba(255,107,0,0.08)] reveal ${isRevealed ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[rgba(255,107,0,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-white font-semibold text-base group-hover:text-[var(--color-primary)] transition-colors duration-300">
              {item.name}
            </h4>
            <Cpu size={12} className="text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <p className="text-[var(--color-text-muted)] text-sm">{item.description}</p>
        </div>
        <div className="text-[var(--color-primary)] font-bold text-lg shrink-0">{item.price}</div>
      </div>
    </div>
  );
}
