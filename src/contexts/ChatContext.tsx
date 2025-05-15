import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useToast } from '@/hooks/use-toast';
import { sendMessageToGemini } from '@/services/gemini'; // ✅ Using Gemini service

// Type for chat message
export type ChatMessage = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
};

type ChatContextType = {
  messages: ChatMessage[];
  isTyping: boolean;
  streamingMessage: string;
  apiKey: string | null;
  showApiInput: boolean;
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setStreamingMessage: React.Dispatch<React.SetStateAction<string>>;
  setApiKey: React.Dispatch<React.SetStateAction<string | null>>;
  setShowApiInput: React.Dispatch<React.SetStateAction<boolean>>;
  handleApiKeySaved: (key: string) => void;
  handleSkipApiKey: () => void;
  sendUserMessage: (message: string) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hi there! How are you feeling today? I'm here to listen whenever you're ready to chat. ☺️",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiInput, setShowApiInput] = useState(false);
  const [apiKeyLS, setApiKeyLS] = useLocalStorage('openai_api_key', '');
  const { toast } = useToast();

  // Load API key from localStorage
  useEffect(() => {
    if (apiKeyLS) {
      setApiKey(apiKeyLS);
    }
  }, [apiKeyLS]);

  const handleApiKeySaved = (key: string) => {
    setApiKey(key);
    setApiKeyLS(key);
    setShowApiInput(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved securely."
    });
  };

  const handleSkipApiKey = () => {
    setShowApiInput(false);
    toast({
      description: "Using offline mode with limited functionality."
    });
  };

  // ✅ Gemini message sending function using service
  const sendUserMessage = async (userInput: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: userInput,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const replyText = await sendMessageToGemini(userInput, apiKey); // ✅ Use helper with API key
      const botMessage: ChatMessage = {
        id: Date.now().toString() + "-bot",
        content: replyText,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Gemini error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + "-error",
          content: "❌ Error: Failed to get response from Gemini.",
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isTyping,
        streamingMessage,
        apiKey,
        showApiInput,
        setMessages,
        setIsTyping,
        setStreamingMessage,
        setApiKey,
        setShowApiInput,
        handleApiKeySaved,
        handleSkipApiKey,
        sendUserMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
