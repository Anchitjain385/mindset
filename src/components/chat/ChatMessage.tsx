
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export type MessageType = 'user' | 'ai';

interface ChatMessageProps {
  content: string;
  type: MessageType;
  timestamp: Date;
  sentiment?: number;
}

const ChatMessage = ({ content, type, timestamp, sentiment }: ChatMessageProps) => {
  const isUser = type === 'user';
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // Split content into paragraphs for better readability
  useEffect(() => {
    const split = content.split('\n').filter(Boolean);
    setParagraphs(split.length ? split : [content]);
    
    // Add a slight delay for the animation
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, [content]);

  // Get background color based on sentiment for user messages
  const getUserBgColor = () => {
    if (sentiment === undefined) return "from-mindnest-accent-green/90 to-mindnest-accent-green/70";
    
    if (sentiment < 0.3) return "from-red-200/90 to-red-200/70"; // Negative sentiment
    if (sentiment > 0.7) return "from-mindnest-accent-green to-mindnest-accent-green/80"; // Positive sentiment
    return "from-mindnest-accent-yellow/90 to-mindnest-accent-yellow/70"; // Neutral sentiment
  };

  return (
    <div className={cn(
      "flex mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div 
        className={cn(
          "max-w-[85%] p-3 rounded-2xl shadow-md transition-all duration-300",
          "transform scale-95 opacity-0",
          isVisible && "scale-100 opacity-100",
          isUser 
            ? cn("bg-gradient-to-br rounded-tr-none", getUserBgColor()) 
            : "bg-white/30 backdrop-blur-md border border-white/40 rounded-tl-none relative overflow-hidden"
        )}
      >
        {paragraphs.map((paragraph, index) => (
          <p key={index} className={cn(
            "text-sm", 
            index > 0 ? "mt-2" : "",
            isUser ? "text-white" : "text-mindnest-text"
          )}>
            {paragraph}
          </p>
        ))}
        <div className={cn(
          "text-xs mt-1",
          isUser ? "text-white/70 text-right" : "text-mindnest-text/70 text-left"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
