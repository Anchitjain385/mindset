
import { useState, useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import GlassCard from '@/components/ui-elements/GlassCard';
import BreathingExercise from '@/components/exercises/BreathingExercise';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';
import { audioService } from '@/services/audio';
import { SoundEffect } from '@/types/analysis';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

const SoundItem = ({ sound, onChange, soundsEnabled }: { 
  sound: SoundEffect; 
  onChange: (name: string, value: number) => void;
  soundsEnabled: boolean;
}) => {
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    onChange(sound.name.toLowerCase(), newVolume);
  };

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 text-center">{sound.icon}</div>
      <div className="flex-grow">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium">{sound.name}</span>
          <div>
            {sound.volume === 0 ? (
              <VolumeX size={16} />
            ) : (
              <Volume2 size={16} />
            )}
          </div>
        </div>
        <Slider 
          defaultValue={[sound.volume]} 
          max={100} 
          step={1} 
          value={[sound.volume]}
          onValueChange={handleVolumeChange} 
          disabled={!soundsEnabled}
          className={!soundsEnabled ? "opacity-50" : ""}
        />
      </div>
    </div>
  );
};

const Relax = () => {
  const [sounds, setSounds] = useState<SoundEffect[]>([]);
  const [soundsEnabled, setSoundsEnabled] = useState(false);
  const [activating, setActivating] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Get initial sound list
    setSounds(audioService.getAvailableSounds());
    
    // Cleanup function to stop all sounds when component unmounts
    return () => {
      try {
        audioService.stopAllSounds();
      } catch (error) {
        console.error('Error stopping sounds during cleanup:', error);
      }
    };
  }, []);
  
  const handleSoundVolumeChange = (name: string, volume: number) => {
    try {
      if (!soundsEnabled && volume > 0) {
        // Auto-enable sounds if user tries to adjust volume
        handleEnableSounds();
        return;
      }
      
      audioService.setVolume(name, volume);
      
      // Update state to reflect volume change
      setSounds(prev => 
        prev.map(sound => 
          sound.name.toLowerCase() === name 
            ? { ...sound, volume, isPlaying: volume > 0 } 
            : sound
        )
      );
    } catch (error) {
      console.error('Error changing sound volume:', error);
    }
  };

  const handleEnableSounds = async () => {
    try {
      if (activating) return;
      
      setActivating(true);
      console.log("Attempting to enable sounds...");
      
      // Direct approach - activate sounds immediately
      await audioService.activateSounds();
      setSoundsEnabled(true);
      
    } catch (error) {
      console.error('Error enabling sounds:', error);
      toast({
        title: 'Sound Error',
        description: 'Please try clicking the button again.',
        variant: 'destructive'
      });
    } finally {
      setActivating(false);
    }
  };

  return (
    <>
      <PageContainer>
        <div className="relative">
          {/* Background orbs */}
          <FloatingOrb size={10} color="#F9E7A1" delay={0} />
          <FloatingOrb size={8} color="#FBCBBA" delay={500} />
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">Relaxation Studio</h1>
            <p className="text-mindnest-text/70">Take a moment to unwind and breathe</p>
          </div>
          
          {/* Breathing Exercise */}
          <div className="mb-6">
            <BreathingExercise 
              title="4-4-4 Breathing" 
              description="Breathe in for 4 seconds, hold for 4, and exhale for 4. Follow the orb's rhythm."
            />
          </div>
          
          {/* Sound Mixer */}
          <GlassCard className="mb-6">
            <h3 className="text-xl font-medium mb-4">Ambient Sounds</h3>
            
            <button 
              onClick={handleEnableSounds}
              disabled={activating || soundsEnabled}
              className={`mb-4 px-4 py-2 rounded-lg text-sm flex items-center justify-center w-full md:w-auto ${
                activating ? 'bg-gray-400 cursor-not-allowed' :
                soundsEnabled 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-mindnest-accent-purple hover:bg-mindnest-accent-purple/90 text-white'
              }`}
            >
              {activating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enabling...
                </>
              ) : (
                <>
                  <Volume2 className="mr-2 h-4 w-4" />
                  {soundsEnabled ? 'Sounds Enabled' : 'Enable Sounds'}
                </>
              )}
            </button>
            
            <div className="space-y-1">
              {sounds.map((sound, index) => (
                <SoundItem 
                  key={index} 
                  sound={sound}
                  onChange={handleSoundVolumeChange}
                  soundsEnabled={soundsEnabled}
                />
              ))}
            </div>
          </GlassCard>
          
          {/* Tips */}
          <GlassCard>
            <h3 className="text-lg font-medium mb-2">Mindfulness Tip</h3>
            <p className="text-sm">
              Try the 5-4-3-2-1 technique: Acknowledge 5 things you see, 4 things you can touch, 
              3 things you hear, 2 things you smell, and 1 thing you taste.
            </p>
          </GlassCard>
        </div>
      </PageContainer>
      <BottomNavigation />
    </>
  );
};

export default Relax;
