import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export default function JoinButton({ children, className, size, icon, variant, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/join');
    }, 1500);
  };

  return (
    <>
      <Button onClick={handleClick} className={className} size={size} icon={icon} variant={variant} {...props}>
        {children}
      </Button>
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--color-bg-deep)] transition-opacity duration-300">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[var(--color-primary)] font-mono text-lg animate-pulse">Initializing Terminal...</p>
          </div>
        </div>
      )}
    </>
  );
}
