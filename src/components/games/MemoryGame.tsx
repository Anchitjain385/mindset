
import { useState, useEffect } from 'react';

interface MemoryCard {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

const EMOJIS = ['🌟', '🌈', '🐶', '🐱', '🦁', '🐼', '🐘', '🦒', '🐬', '🦋'];

interface MemoryGameProps {
  difficulty?: 'easy' | 'medium' | 'hard';
  onComplete?: (score: number, timeMs?: number) => void;
}

const MemoryGame = ({ difficulty = 'medium', onComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [canFlip, setCanFlip] = useState<boolean>(true);

  // Set up game based on difficulty
  useEffect(() => {
    resetGame();
  }, [difficulty]);

  const resetGame = () => {
    let pairCount = 6; // Default medium
    
    if (difficulty === 'easy') pairCount = 4;
    if (difficulty === 'hard') pairCount = 8;
    
    // Select random emojis based on difficulty
    const selectedEmojis = [...EMOJIS].sort(() => 0.5 - Math.random()).slice(0, pairCount);
    
    // Create pairs of cards
    let cardDeck = selectedEmojis.flatMap((emoji, index) => [
      { id: index * 2, emoji, flipped: false, matched: false },
      { id: index * 2 + 1, emoji, flipped: false, matched: false }
    ]);
    
    // Shuffle the deck
    cardDeck = cardDeck.sort(() => 0.5 - Math.random());
    
    setCards(cardDeck);
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setGameStarted(false);
    setGameCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setCanFlip(true);
  };

  const handleCardClick = (id: number) => {
    // Start timer on first move
    if (!gameStarted) {
      setGameStarted(true);
      setStartTime(Date.now());
    }
    
    // Ignore if card is already flipped, we already have 2 flipped cards, or user can't flip
    if (
      !canFlip ||
      flippedCards.length === 2 || 
      flippedCards.includes(id) ||
      cards.find(card => card.id === id)?.matched
    ) {
      return;
    }

    // Flip the card
    setCards(cards.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));
    
    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);
    
    // If we have 2 cards flipped, check for match
    if (newFlippedCards.length === 2) {
      setMoves(moves => moves + 1);
      setCanFlip(false); // Prevent further flips during animation
      
      const firstCard = cards.find(card => card.id === newFlippedCards[0]);
      const secondCard = cards.find(card => card.id === newFlippedCards[1]);
      
      // Check for match
      if (firstCard?.emoji === secondCard?.emoji) {
        // Mark cards as matched
        setCards(cards => cards.map(card => 
          card.id === firstCard?.id || card.id === secondCard?.id
            ? { ...card, matched: true }
            : card
        ));
        
        // Increment match count and clear flipped cards
        setMatches(matches => {
          const newMatches = matches + 1;
          
          // Check if game is completed
          if (newMatches === cards.length / 2) {
            setGameCompleted(true);
            const timeNow = Date.now();
            setEndTime(timeNow);
            
            if (onComplete && startTime) {
              const score = Math.max(100 - moves * 5, 10); // Simple scoring
              onComplete(score, timeNow - startTime);
            }
          }
          
          return newMatches;
        });
        
        setFlippedCards([]);
        setCanFlip(true); // Allow flipping again after match found
      } else {
        // If no match, flip cards back after a delay
        setTimeout(() => {
          setCards(cards => cards.map(card => 
            card.id === firstCard?.id || card.id === secondCard?.id
              ? { ...card, flipped: false }
              : card
          ));
          setFlippedCards([]);
          setCanFlip(true); // Allow flipping again after delay
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Game stats */}
      <div className="flex justify-between items-center">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 text-sm">
          Moves: {moves}
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 text-sm">
          Matches: {matches}/{cards.length / 2}
        </div>
        <button 
          onClick={resetGame} 
          className="bg-mindnest-accent-purple text-white px-3 py-1 rounded-lg text-sm hover:bg-mindnest-accent-purple/90"
        >
          Reset
        </button>
      </div>
      
      {/* Game board */}
      <div 
        className={`grid gap-2 ${
          difficulty === 'easy' 
            ? 'grid-cols-2 sm:grid-cols-4' 
            : difficulty === 'hard' 
              ? 'grid-cols-3 sm:grid-cols-4' 
              : 'grid-cols-3 sm:grid-cols-4'
        }`}
      >
        {cards.map(card => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square rounded-lg cursor-pointer transition-all transform ${
              card.flipped || card.matched
                ? 'bg-white/60 rotate-0'
                : 'bg-gradient-to-br from-mindnest-accent-blue to-mindnest-accent-purple rotate-y-180'
            } flex items-center justify-center text-2xl hover:scale-105 ${!canFlip ? 'pointer-events-none' : ''}`}
          >
            {(card.flipped || card.matched) && card.emoji}
          </div>
        ))}
      </div>
      
      {/* Game completion message */}
      {gameCompleted && startTime && endTime && (
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-4 text-center animate-fade-in">
          <h3 className="text-lg font-medium">Well done! 🎉</h3>
          <p>You completed the game in {Math.floor((endTime - startTime) / 1000)} seconds with {moves} moves.</p>
          <p className="mt-2">Score: {Math.max(100 - moves * 5, 10)} points</p>
          <button
            onClick={resetGame}
            className="mt-3 bg-mindnest-accent-green text-white px-4 py-2 rounded-lg hover:bg-mindnest-accent-green/90"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
