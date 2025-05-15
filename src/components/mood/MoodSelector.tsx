
import { useState } from 'react';
import { cn } from '@/lib/utils';

type MoodOption = 'great' | 'good' | 'okay' | 'sad' | 'anxious';

interface MoodData {
  emoji: string;
  label: string;
  color: string;
  gradient: string;
}

interface MoodSelectorProps {
  onSelect: (mood: MoodOption) => void;
  selectedMood?: MoodOption | null;
}

const MOOD_OPTIONS: Record<MoodOption, MoodData> = {
  great: {
    emoji: '😀',
    label: 'Great',
    color: '#B3E5C5',
    gradient: 'linear-gradient(135deg, #B3E5C5, #9BDBB2)'
  },
  good: {
    emoji: '🙂',
    label: 'Good',
    color: '#F9E7A1',
    gradient: 'linear-gradient(135deg, #F9E7A1, #F6D977)'
  },
  okay: {
    emoji: '😐',
    label: 'Okay',
    color: '#E9DFF9',
    gradient: 'linear-gradient(135deg, #E9DFF9, #D4C7E7)'
  },
  sad: {
    emoji: '😔',
    label: 'Sad',
    color: '#D6F0FF',
    gradient: 'linear-gradient(135deg, #D6F0FF, #B8E2FF)'
  },
  anxious: {
    emoji: '😰',
    label: 'Anxious',
    color: '#FBCBBA',
    gradient: 'linear-gradient(135deg, #FBCBBA, #F9B199)'
  }
};

const MoodSelector = ({ onSelect, selectedMood: externalSelectedMood }: MoodSelectorProps) => {
  const [internalSelectedMood, setInternalSelectedMood] = useState<MoodOption | null>(externalSelectedMood || null);
  const [hoveredMood, setHoveredMood] = useState<MoodOption | null>(null);
  
  // Use either the external selectedMood (if provided) or the internal state
  const effectiveSelectedMood = externalSelectedMood !== undefined ? externalSelectedMood : internalSelectedMood;

  const handleMoodSelect = (mood: MoodOption) => {
    setInternalSelectedMood(mood);
    onSelect(mood);
  };

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium mb-3 text-center font-playfair">How are you feeling today?</h3>
      <div className="flex justify-between items-center w-full">
        {(Object.keys(MOOD_OPTIONS) as MoodOption[]).map((mood) => (
          <div 
            key={mood} 
            className="flex flex-col items-center"
            onClick={() => handleMoodSelect(mood)}
            onMouseEnter={() => setHoveredMood(mood)}
            onMouseLeave={() => setHoveredMood(null)}
          >
            <div
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all duration-300",
                effectiveSelectedMood === mood 
                  ? "ring-2 ring-primary shadow-lg scale-110" 
                  : hoveredMood === mood
                    ? "scale-105 shadow-md"
                    : ""
              )}
              style={{ 
                background: effectiveSelectedMood === mood || hoveredMood === mood
                  ? MOOD_OPTIONS[mood].gradient
                  : MOOD_OPTIONS[mood].color
              }}
            >
              {MOOD_OPTIONS[mood].emoji}
            </div>
            <span className={cn(
              "text-xs mt-1.5 transition-all",
              effectiveSelectedMood === mood ? "font-medium" : "text-mindnest-text/70"
            )}>
              {MOOD_OPTIONS[mood].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
