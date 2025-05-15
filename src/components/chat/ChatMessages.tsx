
import { useEffect, useRef } from 'react';
import ChatMessage from '@/components/chat/ChatMessage';
import { useChat } from '@/contexts/ChatContext';
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatMessages = () => {
  const { messages, isTyping, streamingMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Debug messages when they change
  useEffect(() => {
    console.log("ChatMessages - Messages updated:", messages);
    console.log("ChatMessages - Streaming message:", streamingMessage);
    console.log("ChatMessages - Is typing:", isTyping);
  }, [messages, streamingMessage, isTyping]);

  // Debug on component mount
  useEffect(() => {
    console.log("ChatMessages component mounted");
  }, []);

  return (
    <ScrollArea className="h-[calc(100vh-220px)] pt-20">
      <div className="relative z-10 space-y-4 pb-4 px-2">
        {messages.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-mindnest-text/70">Start a conversation by typing a message below.</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.role === 'user' ? 'user' : 'ai'}
              timestamp={message.timestamp}
              sentiment={message.sentimentScore}
            />
          ))
        )}
        
        {/* Streaming message */}
        {streamingMessage && (
          <div className="flex mb-4">
            <div className="bg-white/25 backdrop-blur-md border border-white/40 p-3 rounded-2xl rounded-tl-none">
              <p className="text-sm">{streamingMessage}</p>
            </div>
          </div>
        )}
        
        {/* Typing indicator */}
        {isTyping && !streamingMessage && (
          <div className="flex mb-4">
            <div className="bg-white/25 backdrop-blur-md border border-white/40 p-2 rounded-2xl rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-mindnest-text/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-mindnest-text/70 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-mindnest-text/70 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};

export default ChatMessages;
