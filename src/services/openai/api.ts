
import { ChatMessage, OpenAIResponse } from './types';
import { toast } from "@/hooks/use-toast";

const API_URL = "https://api.openai.com/v1/chat/completions";

// Ultra-optimized streaming version of the OpenAI API call
export const streamChatCompletion = async (
  messages: ChatMessage[],
  apiKey: string,
  onPartialResponse: (text: string) => void,
  onError: (error: Error) => void,
  onComplete: (fullText: string) => void
) => {
  try {
    // Prepare the messages - limit to only system prompt and last message for fastest responses
    const recentMessages = messages.slice(-1); 
    
    const formattedMessages = [
      {
        role: "system",
        content: "You are a very fast-responding AI therapist. Keep answers extremely brief."
      },
      ...recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // Using fastest available model
        messages: formattedMessages,
        temperature: 0.3,     // Even lower temperature for faster responses
        top_p: 1.0,
        max_tokens: 30,       // Shorter response length for speed
        stream: true,
        presence_penalty: 0,
        frequency_penalty: 0.3
      })
    });

    if (!response.ok) {
      throw new Error("API response error");
    }

    const reader = response.body?.getReader();
    if (!reader) throw new Error("Response body cannot be read");
    
    let fullResponse = '';
    const decoder = new TextDecoder("utf-8");
    
    // Enhanced stream processing with immediate feedback
    const processStream = async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") break;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content;
                if (content) {
                  fullResponse += content;
                  // Immediately send even small chunks to the UI
                  onPartialResponse(content);
                }
              } catch (err) {
                // Silent fail on parse errors to keep the stream going
              }
            }
          }
        }
        onComplete(fullResponse);
      } catch (err) {
        onError(err instanceof Error ? err : new Error('Stream processing error'));
      }
    };
    
    // Start processing immediately
    processStream();
    return true;
  } catch (error) {
    console.error("Error in streaming chat completion:", error);
    onError(error instanceof Error ? error : new Error('Unknown error in stream'));
    return false;
  }
};

// Even faster non-streaming version for fallback
export const getChatCompletion = async (
  messages: ChatMessage[],
  apiKey: string
): Promise<string> => {
  try {
    // Limit to only the most recent message
    const recentMessages = messages.slice(-1);
    
    const formattedMessages = [
      {
        role: "system",
        content: "You are a very fast-responding AI therapist. Keep answers extremely brief."
      },
      ...recentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 30
      })
    });

    if (!response.ok) {
      throw new Error("API response error");
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error getting chat completion:", error);
    return "I'm having trouble. Try again?";
  }
};
