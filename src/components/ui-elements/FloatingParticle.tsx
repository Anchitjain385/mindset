
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingParticleProps {
  type?: 'petal' | 'leaf' | 'orb' | 'sparkle';
  count?: number;
  className?: string;
  color?: string;
  intensity?: 'low' | 'medium' | 'high';
}

const FloatingParticle = ({
  type = 'orb',
  count = 10,
  className,
  color = 'rgba(255, 255, 255, 0.3)',
  intensity = 'low'
}: FloatingParticleProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    duration: number;
    rotation: number;
  }>>([]);

  // Configure intensity settings
  const intensitySettings = {
    low: { opacity: 0.2, blurAmount: '5px', speed: 1.5 },
    medium: { opacity: 0.4, blurAmount: '8px', speed: 1 },
    high: { opacity: 0.6, blurAmount: '12px', speed: 0.7 }
  };
  
  const { opacity, blurAmount, speed } = intensitySettings[intensity];

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 3, // Smaller particles
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
      duration: (Math.random() * 15 + 15) * speed, // Slower movement for subtlety
      rotation: Math.random() * 360
    }));
    
    setParticles(newParticles);
  }, [count, speed]);

  const getParticleContent = (type: string) => {
    switch(type) {
      case 'petal':
        return '🌸';
      case 'leaf':
        return '🍃';
      case 'sparkle':
        return '✨';
      case 'orb':
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={cn(
            "absolute rounded-full animate-float-particle",
            type === 'orb' ? 'bg-white/20 backdrop-blur-xs' : 'flex items-center justify-center',
            className
          )}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: type === 'orb' ? color : 'transparent',
            boxShadow: type === 'orb' ? `0 0 ${blurAmount} rgba(255, 255, 255, 0.3)` : 'none',
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            transform: `rotate(${particle.rotation}deg)`,
            fontSize: type !== 'orb' ? `${particle.size}px` : undefined,
            opacity: opacity
          }}
        >
          {type !== 'orb' && getParticleContent(type)}
        </div>
      ))}
    </div>
  );
};

export default FloatingParticle;
