
import { useState } from 'react';
import BreathingOrb from '../ui-elements/BreathingOrb';
import GlassCard from '../ui-elements/GlassCard';

interface BreathingExerciseProps {
  title?: string;
  description?: string;
  gradient?: string;
}

const BreathingExercise = ({ 
  title = "Breathing Exercise", 
  description = "Take a moment to focus on your breath",
  gradient = "linear-gradient(135deg, #EADCF8, #D8F3DC)"
}: BreathingExerciseProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <GlassCard className="flex flex-col items-center py-10" intensity="light">
      <h3 className="text-xl font-medium mb-2 text-mindnest-text">{title}</h3>
      <p className="text-sm text-center mb-8 text-mindnest-text/70 max-w-xs">{description}</p>
      
      <div className="relative flex justify-center items-center my-8">
        <BreathingOrb active={isActive} color={gradient} />
      </div>
      
      <button
        onClick={() => setIsActive(!isActive)}
        className="mt-6 px-8 py-3 bg-white/20 hover:bg-white/30 text-mindnest-text rounded-full transition-all ripple-btn shadow-md border border-white/20"
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
    </GlassCard>
  );
};

export default BreathingExercise;
