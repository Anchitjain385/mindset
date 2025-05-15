
import React from 'react';
import { MessageCircleHeart } from 'lucide-react';

interface ChatHeaderProps {
  title: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ title }) => {
  return (
    <div className="bg-white/40 backdrop-blur-sm border-b border-white/30 py-4 px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-primary to-accent p-1.5 rounded-full shadow-sm">
          <MessageCircleHeart size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-semibold text-mindnest-text">{title}</h1>
      </div>
      <p className="text-xs text-mindnest-text/70 mt-1">Share your thoughts and feelings with an AI that listens</p>
    </div>
  );
};

export default ChatHeader;
