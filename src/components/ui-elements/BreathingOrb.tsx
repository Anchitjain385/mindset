
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface BreathingOrbProps {
  active?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const BreathingOrb = ({ 
  active = true, 
  className,
  size = 'md',
  color
}: BreathingOrbProps) => {
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-56 h-56',
  };

  const colorStyles = {
    background: color || 'linear-gradient(135deg, #EADCF8, #D8F3DC)'
  };

  useEffect(() => {
    if (!active) {
      setBreathing(false);
      return;
    }

    // Start breathing cycle
    let timer: NodeJS.Timeout;
    
    const startCycle = () => {
      setBreathing(true);
      setPhase('inhale');
      
      // Inhale for 4 seconds
      timer = setTimeout(() => {
        setPhase('hold');
        
        // Hold for 4 seconds
        timer = setTimeout(() => {
          setPhase('exhale');
          
          // Exhale for 4 seconds
          timer = setTimeout(() => {
            setPhase('rest');
            
            // Rest for 2 seconds
            timer = setTimeout(() => {
              startCycle();
            }, 2000);
          }, 4000);
        }, 4000);
      }, 4000);
    };
    
    startCycle();
    
    return () => clearTimeout(timer);
  }, [active]);

  const getAnimationClass = () => {
    switch (phase) {
      case 'inhale':
        return 'animate-[breathe_4s_ease-in-out_forwards]';
      case 'hold':
        return 'scale-110';
      case 'exhale':
        return 'animate-[breathe_4s_ease-in-out_reverse_forwards]';
      default:
        return '';
    }
  };

  const getRippleClass = () => {
    if (phase === 'inhale') return 'after:animate-ripple';
    if (phase === 'exhale') return 'before:animate-ripple';
    return '';
  };

  return (
    <div 
      className={cn(
        'rounded-full shadow-xl flex items-center justify-center transition-all duration-500 relative',
        'before:content-[""] before:absolute before:w-full before:h-full before:rounded-full before:opacity-0',
        'after:content-[""] after:absolute after:w-full after:h-full after:rounded-full after:opacity-0',
        sizeClasses[size],
        getAnimationClass(),
        getRippleClass(),
        className
      )} 
      style={{ 
        ...colorStyles,
        boxShadow: '0 0 40px rgba(234, 220, 248, 0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Add subtle pulsating glow */}
      <div className="absolute w-full h-full rounded-full animate-pulse-slow" 
           style={{background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)'}} />
      
      {/* Inner circle with smooth edges */}
      <div className="absolute w-3/4 h-3/4 rounded-full bg-white/10 backdrop-blur-sm" />
      
      {phase !== 'rest' && (
        <div className="text-white text-lg font-poppins font-medium relative z-10 shadow-sm">
          {phase === 'inhale' && 'Breathe In'}
          {phase === 'hold' && 'Hold'}
          {phase === 'exhale' && 'Breathe Out'}
        </div>
      )}
    </div>
  );
};

export default BreathingOrb;
