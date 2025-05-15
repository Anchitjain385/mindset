
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  isAiTyping?: boolean;
}

const ChatInput = ({ 
  onSendMessage, 
  placeholder = "Type a message...", 
  disabled = false,
  isAiTyping = false
}: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Reset isSending instantly when AI starts typing
  useEffect(() => {
    if (isAiTyping) {
      setIsSending(false);
    }
  }, [isAiTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && !disabled && !isSending) {
      // Capture message before clearing
      const currentMessage = message;
      
      // Clear input immediately for better UX
      setMessage('');
      setIsSending(true);
      
      // Zero delay send
      onSendMessage(currentMessage);
      
      // Ultra short debounce
      setTimeout(() => setIsSending(false), 10);
    }
  };

  // Optimized keyboard handling with no delay
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow Enter to submit, but Shift+Enter for new line
    if (e.key === 'Enter' && !e.shiftKey && !disabled && !isAiTyping && !isSending) {
      e.preventDefault();
      
      if (message.trim()) {
        // Capture message before clearing
        const currentMessage = message;
        
        // Clear input immediately
        setMessage('');
        setIsSending(true);
        
        // Zero delay send
        onSendMessage(currentMessage);
        
        // Ultra short debounce
        setTimeout(() => setIsSending(false), 10);
      }
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center gap-2 backdrop-blur-sm rounded-full p-2 transition-all duration-200",
        "border shadow-soft",
        isFocused ? "bg-white/40 border-white/50" : "bg-white/30 border-white/40"
      )}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={isAiTyping ? "AI is typing..." : placeholder}
        disabled={disabled || isAiTyping || isSending}
        className="flex-grow bg-transparent border-none focus:outline-none focus:ring-0 placeholder:text-mindnest-text/50 text-sm px-3"
        autoFocus
      />
      <button 
        type="submit" 
        disabled={!message.trim() || disabled || isAiTyping || isSending}
        className={cn(
          "ripple-btn w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 active:scale-95",
          "relative overflow-hidden",
          "before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary before:to-accent before:opacity-100",
          "after:content-[''] after:absolute after:inset-0 after:bg-white/20 after:opacity-0 after:transition-opacity hover:after:opacity-100"
        )}
      >
        <Send size={18} className="relative z-10" />
      </button>
    </form>
  );
};

export default ChatInput;
