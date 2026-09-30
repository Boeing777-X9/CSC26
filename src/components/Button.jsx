export default function Button({ children, variant = 'primary', size = 'md', href, onClick, className = '', icon: Icon, ...props }) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer select-none';
  
  const variants = {
    primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] active:scale-[0.97]',
    outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white hover:shadow-[0_0_20px_rgba(255,107,0,0.3)]',
    ghost: 'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] bg-transparent',
    dark: 'bg-[var(--color-bg-card)] text-white border border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[0_0_15px_rgba(255,107,0,0.2)]',
  };

  const sizes = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-8 py-3.5 text-base',
    lg: 'px-10 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
      {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
    </button>
  );
}
