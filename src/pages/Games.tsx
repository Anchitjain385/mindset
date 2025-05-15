
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import GlassCard from '@/components/ui-elements/GlassCard';
import GameCard from '@/components/games/GameCard';
import MemoryGame from '@/components/games/MemoryGame';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';
import { Game } from '@/types/analysis';
import { useToast } from '@/hooks/use-toast';

const SAMPLE_GAMES: Game[] = [
  {
    id: 'memory',
    name: 'Memory Match',
    description: 'Test and improve your memory by matching pairs of cards. Great for cognitive stimulation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515041219749-89347f83291a?w=800&auto=format&fit=crop',
    route: '/games/memory',
    category: 'cognitive',
    difficulty: 'medium'
  },
  {
    id: 'breathing',
    name: 'Breathing Rhythms',
    description: 'Follow guided breathing patterns to reduce anxiety and promote relaxation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop',
    route: '/relax',
    category: 'relaxation',
    difficulty: 'easy'
  },
  {
    id: 'journal',
    name: 'Mood Journal',
    description: 'Track your emotions and identify patterns in your mood over time.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=800&auto=format&fit=crop',
    route: '/progress',
    category: 'emotional',
    difficulty: 'easy'
  },
  {
    id: 'facial-expressions',
    name: 'Expression Analysis',
    description: 'Learn to recognize and understand different emotional expressions.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1499651681375-8afc5a4db253?w=800&auto=format&fit=crop',
    route: '/video-analysis',
    category: 'emotional',
    difficulty: 'medium'
  }
];

const Games = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState<number | null>(null);
  const { toast } = useToast();
  
  const handleGameCompletion = (gameId: string, score: number, timeMs?: number) => {
    setGameScore(score);
    if (timeMs) {
      setGameTime(Math.floor(timeMs / 1000));
    }
    
    toast({
      title: "Game Completed",
      description: `You scored ${score} points!`,
    });
  };
  
  const handleStartGame = (gameId: string) => {
    setActiveGame(gameId);
    setGameScore(null);
    setGameTime(null);
  };
  
  const handleBackToGames = () => {
    setActiveGame(null);
  };
  
  return (
    <>
      <PageContainer>
        <div className="relative z-10">
          {/* Background orbs */}
          <FloatingOrb size={10} color="#B3E5C5" delay={0} />
          <FloatingOrb size={8} color="#F9E7A1" delay={500} />
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">Mind Games</h1>
            <p className="text-mindnest-text/70">Interactive games for mental wellness</p>
          </div>
          
          {activeGame === 'memory' ? (
            <GlassCard className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Memory Match</h2>
                <button 
                  onClick={handleBackToGames}
                  className="text-sm bg-mindnest-accent-blue/20 px-3 py-1 rounded-full"
                >
                  Back to Games
                </button>
              </div>
              {gameScore !== null ? (
                <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center mb-4">
                  <h3 className="text-lg font-medium">Game Result 🎮</h3>
                  <p>Your score: {gameScore} points</p>
                  {gameTime !== null && <p>Time: {gameTime} seconds</p>}
                  <button
                    onClick={() => handleStartGame('memory')}
                    className="mt-3 bg-mindnest-accent-green text-white px-4 py-2 rounded-lg hover:bg-mindnest-accent-green/90"
                  >
                    Play Again
                  </button>
                </div>
              ) : (
                <MemoryGame 
                  onComplete={(score, timeMs) => handleGameCompletion('memory', score, timeMs)} 
                />
              )}
            </GlassCard>
          ) : (
            <>
              <p className="text-sm text-mindnest-text/70 mb-4">
                Games and activities can help improve focus, reduce stress, and boost your mood.
                Select an activity to begin.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {SAMPLE_GAMES.map((game) => (
                  <GameCard 
                    key={game.id} 
                    game={game} 
                    onClick={() => game.id === 'memory' ? handleStartGame(game.id) : null}
                  />
                ))}
              </div>
            </>
          )}
          
          <GlassCard>
            <h3 className="text-lg font-medium mb-2">Benefits of Mind Games</h3>
            <ul className="space-y-2 text-sm text-mindnest-text/80">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-mindnest-accent-purple rounded-full mr-2" />
                Improve cognitive functions like memory and attention
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-mindnest-accent-green rounded-full mr-2" />
                Reduce anxiety through mindful focus and distraction
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-mindnest-accent-yellow rounded-full mr-2" />
                Enhance emotional regulation through guided activities
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-mindnest-accent-blue rounded-full mr-2" />
                Build mental resilience through consistent practice
              </li>
            </ul>
          </GlassCard>
        </div>
      </PageContainer>
      <BottomNavigation />
    </>
  );
};

export default Games;
