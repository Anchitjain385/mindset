
import React, { useEffect } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import ApiKeyInput from '@/components/chat/ApiKeyInput';
import { ChatProvider, useChat } from '@/contexts/ChatContext';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatBackground from '@/components/chat/ChatBackground';
import ChatInputContainer from '@/components/chat/ChatInputContainer';

// Main chat component content
const ChatContent = () => {
  const { showApiInput, handleApiKeySaved, handleSkipApiKey, messages } = useChat();
  
  // Enhanced debug logging
  useEffect(() => {
    console.log("Chat component mounted");
    console.log("Initial messages:", messages);
    console.log("Show API input:", showApiInput);
  }, []);

  return (
    <PageContainer className="flex flex-col h-screen py-0">
      <div className="relative flex-grow overflow-hidden p-4">
        <ChatBackground />
        
        {/* API Key Input */}
        {showApiInput && (
          <div className="relative z-20">
            <ApiKeyInput 
              onApiKeySaved={handleApiKeySaved}
              isOptional={true}
              onSkip={handleSkipApiKey}
            />
          </div>
        )}
        
        <ChatMessages />
      </div>
      
      {/* Fixed chat input at the bottom */}
      <ChatInputContainer />
      
      {/* Add padding to prevent content from being hidden behind bottom navigation */}
      <div className="h-16"></div>
    </PageContainer>
  );
};

// Main Chat page with context provider
const Chat = () => {
  return (
    <>
      <ChatProvider>
        <ChatContent />
      </ChatProvider>
      <BottomNavigation />
    </>
  );
};

export default Chat;
