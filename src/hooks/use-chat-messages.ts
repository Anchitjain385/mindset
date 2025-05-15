
import { useState, useCallback } from 'react';
import { ChatMessage, analyzeSentiment } from '@/services/openai';
import { useChat } from '@/contexts/ChatContext';
import { useToast } from '@/hooks/use-toast';

// Define secure constant for more natural typing speed
const MIN_CHAR_PER_SECOND = 10; // Slower for more thoughtful responses
const MAX_CHAR_PER_SECOND = 20; // Faster for more natural variation
const MIN_THINKING_TIME = 300; // Minimum thinking time
const MAX_THINKING_TIME = 800; // Maximum thinking time

export const useChatMessages = () => {
  const { 
    messages, 
    setMessages, 
    isTyping, 
    setIsTyping, 
    streamingMessage,
    setStreamingMessage, 
    apiKey,
    showApiInput,
    setShowApiInput
  } = useChat();
  
  const { toast } = useToast();

  // Generate therapeutic response with deeper empathy and emotional intelligence
  const generateTherapeuticResponse = useCallback((userMessage: string): string => {
    // First check for exact matches with common greetings
    const lowerMessage = userMessage.toLowerCase().trim();
    
    // Therapeutic responses with validation and emotional reflection
    const therapeuticReplies: Record<string, string> = {
      "hello": "Hi there. I'm really glad you're reaching out today. How are you feeling in this moment?",
      "hi": "Hello. Thank you for sharing your thoughts with me. I'm here to create a safe space for you. What's on your mind right now?",
      "hey": "Hey there. I appreciate you connecting with me today. How are you feeling in your body and mind right now?",
      "how are you": "I'm here and fully present with you. I'm wondering what feelings or thoughts have been showing up for you lately? What would feel most supportive to explore together?",
    };
    
    // Check for exact match in therapeutic replies
    if (therapeuticReplies[lowerMessage]) {
      return therapeuticReplies[lowerMessage];
    }
    
    // Message sentiment analysis for appropriate response
    const message = userMessage.toLowerCase();
    const sentiment = analyzeSentiment(message);
    
    if (sentiment.score < 0.3) {
      // Negative sentiment - validate, reflect, and explore with deep empathy
      const negativeResponses = [
        "That sounds incredibly difficult. I can feel the weight of what you're sharing. When you experience these feelings, where do you notice them in your body?",
        "I'm sitting with you in this painful moment. It takes real courage to share these vulnerable feelings. What do you need most right now?",
        "I hear how much you're hurting, and I want you to know I'm right here with you. These feelings are so valid. Would it help to explore what might be underneath this pain?",
        "Thank you for trusting me with these difficult emotions. Sometimes when we're in pain, our bodies carry wisdom about what we need. Can you take a gentle breath and notice what your body might be telling you?",
        "Your pain is real and valid. I'm holding space for everything you're feeling. When did you first notice these feelings arising?",
        "It makes complete sense that you'd feel this way given what you're experiencing. I'm wondering what small comfort might feel supportive right now, even if it's just taking a breath together?"
      ];
      return negativeResponses[Math.floor(Math.random() * negativeResponses.length)];
    } 
    else if (sentiment.score > 0.7) {
      // Positive sentiment - affirm, deepen, and explore meaning with warmth
      const positiveResponses = [
        "I can feel your positive energy coming through. These moments of light are so important. What do you think is helping create these good feelings for you right now?",
        "That's wonderful to hear. I'm curious - when you experience these positive feelings, what do you notice changing in your body and mind?",
        "I'm genuinely happy you're experiencing that. These moments hold such wisdom. What meaning do these positive feelings carry for you?",
        "It's beautiful to witness this light in you. What might you want to remember about this feeling for times when things feel heavier?",
        "I appreciate you sharing this moment of joy. How might you honor this feeling and create more space for it in your daily life?",
        "Your happiness is as important to explore as any difficult feeling. What values of yours are being honored when you experience this feeling?"
      ];
      return positiveResponses[Math.floor(Math.random() * positiveResponses.length)];
    }
    else {
      // Topic-based responses with therapeutic depth and genuine curiosity
      if (message.includes("anxious") || message.includes("anxiety") || message.includes("worried") || message.includes("panic")) {
        const anxietyResponses = [
          "I hear that anxiety is showing up for you. It can feel so overwhelming when our minds race ahead with worries. If you feel comfortable, could we pause and take a slow breath together first?",
          "Anxiety can feel so uncomfortable in our bodies. If it feels safe, could you place a gentle hand where you feel that anxiety most strongly? Sometimes this small act of self-compassion can help us process these feelings.",
          "When anxiety rises, it's often because something matters deeply to us. I wonder what your anxiety might be trying to protect? What feels most threatening right now?",
          "That sounds really challenging. Anxiety often narrows our focus to what feels unsafe. Could we try gently expanding your awareness to also notice one thing that feels neutral or safe right now?",
          "I'm right here with you as you navigate these anxious feelings. Sometimes anxiety carries important information. What might it be telling you about what you need?"
        ];
        return anxietyResponses[Math.floor(Math.random() * anxietyResponses.length)];
      }
      
      if (message.includes("sleep") || message.includes("tired") || message.includes("insomnia") || message.includes("exhausted")) {
        const sleepResponses = [
          "Sleep challenges can affect us so deeply. I'm curious about what happens when you try to rest - what thoughts or sensations visit you then?",
          "It sounds like your body and mind aren't finding that peaceful transition to sleep. What does your relationship with rest look like right now?",
          "Not being able to sleep can feel so isolating, especially when the world around us is quiet. What feelings arise for you in those wakeful hours?",
          "Being exhausted affects everything, doesn't it? I wonder if there's a conversation happening between your body and mind around what you need right now?",
          "Rest is such a fundamental need, and it can be really distressing when we can't access it. What does your mind tend to focus on when you're trying to sleep?"
        ];
        return sleepResponses[Math.floor(Math.random() * sleepResponses.length)];
      }
      
      if (message.includes("sad") || message.includes("depressed") || message.includes("unhappy") || message.includes("miserable") || message.includes("down")) {
        const sadnessResponses = [
          "I can hear the sadness in your words. These feelings are so important, even though they're painful. Would it help to explore what might be beneath this sadness?",
          "That heaviness of sadness can be so difficult to carry. I'm sitting with you in this feeling. What does this sadness need right now?",
          "I'm holding space for your pain. Sometimes sadness connects us to what matters most to us. What feels lost or missing for you right now?",
          "Sadness can sometimes feel like a quiet room we sit in alone. I want you to know I'm here with you. What words would you give to this feeling if it could speak?",
          "Thank you for sharing these difficult feelings. Sadness often arrives with wisdom if we can listen to it. What might your sadness be trying to tell you?"
        ];
        return sadnessResponses[Math.floor(Math.random() * sadnessResponses.length)];
      }
      
      if (message.includes("lonely") || message.includes("alone") || message.includes("isolated")) {
        const lonelinessResponses = [
          "Feeling alone can be so painful. I'm here with you in this moment. What does your loneliness feel like when you sit with it?",
          "That sense of disconnection can feel so deep. I wonder what meaningful connection would look like for you right now?",
          "Loneliness speaks to our profound need for belonging. What parts of yourself do you feel aren't being seen by others?",
          "I hear how isolated you're feeling. Sometimes we can feel most alone even when surrounded by others. What kind of connection are you longing for?",
          "That sounds really difficult. Loneliness often has layers to it. Would you like to explore what might be beneath this feeling?"
        ];
        return lonelinessResponses[Math.floor(Math.random() * lonelinessResponses.length)];
      }
      
      if (message.includes("angry") || message.includes("mad") || message.includes("frustrated") || message.includes("annoyed")) {
        const angerResponses = [
          "I can feel the intensity in your words. Anger often arises when something important to us is threatened or violated. What boundaries or values might your anger be protecting?",
          "That frustration sounds really valid. Underneath anger, there's often hurt or fear. Would you feel comfortable exploring what might be beneath this feeling?",
          "Your anger makes sense. It's a powerful emotion that deserves to be acknowledged. What does this anger need you to know right now?",
          "I appreciate you sharing these strong feelings. Anger can be such an honest emotion. What triggered these feelings today?",
          "That sounds really frustrating. Sometimes anger is asking for something to change. What might need to shift for you right now?"
        ];
        return angerResponses[Math.floor(Math.random() * angerResponses.length)];
      }
      
      // Therapeutic general responses for other topics - more varied and genuinely curious
      const therapeuticResponses = [
        "I'm struck by what you're sharing. What feelings arise in your body as you talk about this?",
        "Thank you for trusting me with this. I'm wondering what you might need most right now as we explore this together?",
        "That's really insightful. I notice a theme here that connects to what you mentioned earlier. Does that resonance feel true to you?",
        "I appreciate your openness. When you sit with these thoughts, where do you feel them in your body? Our bodies often carry wisdom our minds haven't yet recognized.",
        "You're showing remarkable awareness. What would feel most supportive as you navigate this?",
        "I'm curious how this experience connects to what matters most deeply to you. What values of yours are present in this situation?",
        "Thank you for sharing something so meaningful. Is there a particular aspect of this experience you'd like to explore more deeply?",
        "I hear you, and I'm sitting with the weight of what you're sharing. Sometimes putting words to our experience helps us understand it differently. Is there more you want to express about how this feels?",
        "That makes so much sense given what you've been through. I wonder what might shift if you approached this situation with the same compassion you'd offer a dear friend?",
        "You're navigating something quite complex here. Among everything you've shared, what feels most important or pressing for you to focus on right now?"
      ];
      return therapeuticResponses[Math.floor(Math.random() * therapeuticResponses.length)];
    }
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    console.log("handleSendMessage called with:", content);
    
    if (!content.trim()) {
      console.log("Empty message, not sending");
      return;
    }
    
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
      sentimentScore: analyzeSentiment(content).score
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Start typing with a natural "thinking" delay
    setIsTyping(true);
    setStreamingMessage("");
    
    // Generate therapeutic response 
    const therapeuticResponse = generateTherapeuticResponse(content);
    
    // More human-like thinking time that varies by message content and complexity
    const thinkingTime = Math.min(
      Math.max(content.length * 10, MIN_THINKING_TIME),
      MAX_THINKING_TIME
    );
    
    // Initial thoughtful pause before responding - like a real person would take to think
    setTimeout(() => {
      // Break message into natural chunks for more realistic typing
      const chunks = therapeuticResponse.split(/(?<=[.!?,])\s+/);
      let currentText = "";
      let chunkIndex = 0;
      
      const typeChunk = () => {
        if (chunkIndex >= chunks.length) {
          // All chunks typed, add the complete AI response
          const aiResponse: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: therapeuticResponse,
            role: 'assistant',
            timestamp: new Date(),
            sentimentScore: analyzeSentiment(therapeuticResponse).score
          };
          
          setMessages(prev => [...prev, aiResponse]);
          setStreamingMessage("");
          setIsTyping(false);
          return;
        }
        
        // Type the next chunk with natural human-like timing
        const chunk = chunks[chunkIndex];
        currentText += (chunkIndex > 0 ? " " : "") + chunk;
        setStreamingMessage(currentText);
        chunkIndex++;
        
        // Simulate human typing rhythms - pauses between sentences and thought groups
        const isEndOfSentence = chunk.trim().endsWith('.') || chunk.trim().endsWith('!') || chunk.trim().endsWith('?');
        const pauseTime = isEndOfSentence ? 
          Math.random() * 500 + 400 : // Longer pause between sentences
          Math.random() * 200 + 100; // Short pause between phrases
          
        const charsPerSecond = Math.random() * (MAX_CHAR_PER_SECOND - MIN_CHAR_PER_SECOND) + MIN_CHAR_PER_SECOND;
        const typingDelay = (chunk.length / charsPerSecond) * 1000 + pauseTime;
          
        setTimeout(typeChunk, Math.min(typingDelay, 2000)); // Cap delay at 2 seconds
      };
      
      // Start typing the first chunk
      typeChunk();
    }, thinkingTime);
  }, [setMessages, setIsTyping, setStreamingMessage, generateTherapeuticResponse]);

  return {
    handleSendMessage,
    messages,
    isTyping,
    streamingMessage
  };
};
