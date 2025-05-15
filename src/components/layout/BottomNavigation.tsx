
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageCircle, Video, Activity, Flower, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { icon: Home, path: '/home', label: 'Home' },
    { icon: MessageCircle, path: '/chat', label: 'Chat' },
    { icon: Video, path: '/video-analysis', label: 'Video' },
    { icon: Activity, path: '/progress', label: 'Progress' },
    { icon: Lightbulb, path: '/mental-health', label: 'Learn' },
    { icon: Flower, path: '/relax', label: 'Relax' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/30 backdrop-blur-lg border-t border-white/30 flex justify-around items-center px-6 z-10 shadow-soft">
      {navigationItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            to={item.path}
            key={item.path}
            className="flex flex-col items-center justify-center relative"
          >
            <div className={cn(
              "p-2 rounded-full transition-all duration-300",
              isActive ? "bg-white/30 shadow-inner-glow" : "hover:bg-white/10"
            )}>
              <item.icon 
                size={20} 
                className={cn(
                  "transition-all duration-300",
                  isActive ? "text-primary" : "text-mindnest-text/50 hover:text-mindnest-text/70"
                )} 
              />
            </div>
            <span className={cn(
              "text-xs mt-1 transition-all duration-300",
              isActive ? "text-primary font-medium" : "text-mindnest-text/50"
            )}>
              {item.label}
            </span>
            {isActive && (
              <span className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
