// src/services/gemini.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Get your Gemini API key from .env
const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);

// ✅ This function sends a message to Gemini and returns a response
export async function sendMessageToGemini(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Send the prompt
    const result = await model.generateContent(prompt);

    // Extract text from response
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("❌ Therepist Error:", error);
    return "Sorry, there was a problem getting a response from Therepist.";
  }
}
