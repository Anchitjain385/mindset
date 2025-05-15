
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '@/components/layout/PageContainer';
import MoodSelector from '@/components/mood/MoodSelector';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { MessageCircle, Video, Activity, Flower, Heart, Volume2, VolumeX } from 'lucide-react';
import GlassCard from '@/components/ui-elements/GlassCard';
import FloatingParticle from '@/components/ui-elements/FloatingParticle';
import { useToast } from '@/hooks/use-toast';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';

type MoodOption = 'great' | 'good' | 'okay' | 'sad' | 'anxious';

const quotes = [
  "This too shall pass.",
  "Breathe in calm, breathe out worry.",
  "You are exactly where you need to be.",
  "Take care of your mind, it's the only place you have to live.",
  "The way you speak to yourself matters.",
  "Every feeling is temporary.",
  "Small steps are still progress."
];

const Home = () => {
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);
  const [quote, setQuote] = useState<string>("");
  const [isSoundOn, setSoundOn] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Set a random daily quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  }, []);
  
  const handleMoodSelection = (mood: MoodOption) => {
    setSelectedMood(mood);
    toast({
      title: "Mood Logged",
      description: `You're feeling ${mood} today. We've updated your mood journal.`,
    });
  };

  const toggleSound = () => {
    setSoundOn(!isSoundOn);
    toast({
      title: isSoundOn ? "Nature Sounds Off" : "Nature Sounds On",
      description: isSoundOn ? "Ambient sounds have been turned off." : "Playing gentle nature sounds.",
    });
  };

  return (
    <PageContainer className="relative overflow-hidden">
      <FloatingParticle type="orb" count={8} color="rgba(234, 220, 248, 0.4)" />
      <FloatingParticle type="sparkle" count={5} />

      {/* Background Orbs */}
      <FloatingOrb 
        size={14} 
        color="#EADCF8" 
        className="opacity-30 z-0 left-10 top-20" 
        delay={0}
      />
      <FloatingOrb 
        size={10} 
        color="#D8F3DC" 
        className="opacity-30 z-0 right-10 top-40" 
        delay={300}
      />
      <FloatingOrb 
        size={12} 
        color="#C7DFFD" 
        className="opacity-30 z-0 left-20 bottom-40" 
        delay={600}
      />
      
      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-semibold text-mindnest-text mb-2">Good morning, Jane</h1>
          <p className="text-mindnest-text/70">How are you feeling today?</p>
        </div>
        
        {/* Daily Quote Card */}
        <GlassCard className="mb-6" animateIn={true} intensity="light">
          <p className="text-sm text-mindnest-text/60 uppercase tracking-wide mb-2 font-medium">Daily Calm Quote</p>
          <p className="text-xl font-medium text-mindnest-accent-purple">{quote}</p>
          <div className="mt-4">
            <MoodSelector onSelect={handleMoodSelection} selectedMood={selectedMood} />
          </div>
        </GlassCard>

        {/* Quick Access Grid */}
        <div className="grid grid-cols-2 gap-4">
          <GlassCard 
            onClick={() => navigate('/video-analysis')}
            hoverEffect={true}
            intensity="medium"
            animateIn={true}
            className="flex flex-col items-center justify-center py-6"
          >
            <div className="rounded-full bg-mindnest-accent-peach/50 w-14 h-14 flex items-center justify-center mb-4 animate-pulse-slow">
              <Video size={24} className="text-mindnest-text" />
            </div>
            <h3 className="font-medium text-base">Emotion Analysis</h3>
            <p className="text-xs text-mindnest-text/70 mt-1 text-center">Analyze your facial expressions</p>
          </GlassCard>

          <GlassCard 
            onClick={() => navigate('/chat')}
            hoverEffect={true}
            intensity="medium"
            animateIn={true}
            className="flex flex-col items-center justify-center py-6"
          >
            <div className="rounded-full bg-mindnest-accent-yellow/50 w-14 h-14 flex items-center justify-center mb-4 animate-pulse-slow">
              <MessageCircle size={24} className="text-mindnest-text" />
            </div>
            <h3 className="font-medium text-base">AI Therapist</h3>
            <p className="text-xs text-mindnest-text/70 mt-1 text-center">Chat about your feelings</p>
          </GlassCard>

          <GlassCard 
            onClick={() => navigate('/progress')}
            hoverEffect={true}
            intensity="medium"
            animateIn={true}
            className="flex flex-col items-center justify-center py-6"
          >
            <div className="rounded-full bg-mindnest-accent-green/50 w-14 h-14 flex items-center justify-center mb-4 animate-pulse-slow">
              <Activity size={24} className="text-mindnest-text" />
            </div>
            <h3 className="font-medium text-base">Progress</h3>
            <p className="text-xs text-mindnest-text/70 mt-1 text-center">Track your journey</p>
          </GlassCard>

          <GlassCard 
            onClick={() => navigate('/relax')}
            hoverEffect={true}
            intensity="medium" 
            animateIn={true}
            className="flex flex-col items-center justify-center py-6"
          >
            <div className="rounded-full bg-mindnest-accent-purple/30 w-14 h-14 flex items-center justify-center mb-4 animate-pulse-slow">
              <Flower size={24} className="text-mindnest-text" />
            </div>
            <h3 className="font-medium text-base">Relax</h3>
            <p className="text-xs text-mindnest-text/70 mt-1 text-center">Breathing & meditation</p>
          </GlassCard>
        </div>
        
        {/* SOS Button */}
        <GlassCard 
          className="mt-8 flex items-center justify-center p-4 bg-white/30" 
          intensity="strong"
          animateIn={true}
          onClick={() => toast({
            title: "SOS Support",
            description: "Connecting you with immediate support resources...",
          })}
        >
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-red-500 animate-pulse" />
            <span className="font-medium text-mindnest-text">SOS Support</span>
          </div>
        </GlassCard>

        {/* Sound Controls */}
        <button 
          onClick={toggleSound} 
          className="flex items-center justify-center gap-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 py-2 px-4 fixed bottom-20 right-6 z-20 shadow-md hover:bg-white/30 transition-all"
        >
          {isSoundOn ? (
            <Volume2 size={18} className="text-mindnest-text" />
          ) : (
            <VolumeX size={18} className="text-mindnest-text" />
          )}
          <span className="text-xs">{isSoundOn ? 'Sounds On' : 'Sounds Off'}</span>
        </button>
      </div>
      
      <BottomNavigation />
    </PageContainer>
  );
};

export default Home;
