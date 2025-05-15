
import ChatInput from '@/components/chat/ChatInput';
import { useChat } from '@/contexts/ChatContext';
import { useChatMessages } from '@/hooks/use-chat-messages';
import { useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

const ChatInputContainer = () => {
  const { showApiInput, isTyping } = useChat();
  const { handleSendMessage } = useChatMessages();

  // Debug when component mounts
  useEffect(() => {
    console.log("ChatInputContainer mounted");
  }, []);

  // Ultra-optimized message sending with zero delay
  const onSendMessage = (message: string) => {
    if (message && message.trim().length > 0) {
      try {
        // Immediate send with no processing delay
        handleSendMessage(message);
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="p-4 bg-white/20 backdrop-blur-sm sticky bottom-0 z-20">
      <ChatInput 
        onSendMessage={onSendMessage} 
        placeholder="Type how you're feeling..." 
        disabled={showApiInput}
        isAiTyping={isTyping}
      />
    </div>
  );
};

export default ChatInputContainer;
