
import { Game } from '@/types/analysis';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: Game;
  className?: string;
  onClick?: () => void; // Add this prop
}

const GameCard = ({ game, className, onClick }: GameCardProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(game.route);
    }
  };
  
  return (
    <div 
      className={`bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02] ${className}`}
      onClick={handleClick}
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={game.thumbnailUrl} 
          alt={game.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-mindnest-text">{game.name}</h3>
        <p className="text-sm text-mindnest-text/70 mt-1 line-clamp-2">{game.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs px-2 py-1 rounded-full bg-white/30 text-mindnest-text/80">{game.category}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-white/30 text-mindnest-text/80">{game.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
