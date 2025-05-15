
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  intensity?: 'light' | 'medium' | 'strong';
  hoverEffect?: boolean;
  animateIn?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  onClick, 
  intensity = 'medium',
  hoverEffect = true,
  animateIn = false
}: GlassCardProps) => {
  const intensityClasses = {
    light: 'bg-white/10 border-white/20',
    medium: 'bg-white/20 border-white/30',
    strong: 'bg-white/30 border-white/40'
  };

  return (
    <div 
      className={cn(
        "backdrop-blur-md border rounded-2xl p-5 w-full transition-all duration-300 relative",
        "before:absolute before:top-0 before:left-0 before:w-full before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        intensityClasses[intensity],
        hoverEffect && "transform hover:shadow-glass hover:bg-white/30 hover:scale-[1.01]",
        animateIn && "animate-fade-in opacity-0",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;
