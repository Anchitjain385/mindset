
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingOrbProps {
  size?: number;
  color?: string;
  delay?: number;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const FloatingOrb = ({ 
  size = 6, 
  color = '#FBCBBA',
  delay = 0,
  className,
  intensity = 'medium'
}: FloatingOrbProps) => {
  const [position, setPosition] = useState({ x: Math.random() * 100, y: Math.random() * 100 });
  const [direction, setDirection] = useState({ x: Math.random() > 0.5 ? 1 : -1, y: Math.random() > 0.5 ? 1 : -1 });
  const [isActive, setIsActive] = useState(false);

  const intensityConfig = {
    low: { speed: 0.15, blur: '15px', opacity: 0.4 },
    medium: { speed: 0.3, blur: '20px', opacity: 0.6 },
    high: { speed: 0.45, blur: '25px', opacity: 0.8 }
  };

  const { speed, blur, opacity } = intensityConfig[intensity];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(true);
      
      const moveOrb = setInterval(() => {
        setPosition(prev => {
          // Change direction if approaching edges
          const newDirection = { ...direction };
          
          if (prev.x > 90) newDirection.x = -1;
          if (prev.x < 10) newDirection.x = 1;
          if (prev.y > 90) newDirection.y = -1;
          if (prev.y < 10) newDirection.y = 1;
          
          setDirection(newDirection);
          
          // Move orb
          return {
            x: prev.x + newDirection.x * speed,
            y: prev.y + newDirection.y * speed
          };
        });
      }, 100);
      
      return () => clearInterval(moveOrb);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [delay, direction, speed]);

  return (
    <div
      className={cn(
        "absolute rounded-full animate-pulse-slow z-0 transition-all duration-2000",
        isActive ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        backgroundColor: color,
        left: `${position.x}%`,
        top: `${position.y}%`,
        filter: `blur(${blur})`,
        opacity: opacity,
        transition: 'all 2s ease-in-out, opacity 1s ease-in-out'
      }}
    />
  );
};

export default FloatingOrb;
