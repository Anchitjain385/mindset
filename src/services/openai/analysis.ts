
import { LinguisticFeatures } from './types';

// Enhanced sentiment analysis function with more comprehensive word sets for better accuracy
export function analyzeSentiment(text: string): { score: number, emotion: string } {
  // Expanded word lists for better analysis
  const positiveWords = [
    "happy", "glad", "joy", "wonderful", "amazing", "good", "great", "excellent", "positive",
    "love", "peace", "hope", "excited", "thrilled", "proud", "delighted", "content", "grateful",
    "thankful", "satisfied", "enthusiastic", "optimistic", "cheerful", "calm", "relaxed", 
    "confident", "inspired", "motivated", "encouraged", "blessed", "beautiful", "success",
    "achievement", "accomplished", "empowered", "energetic", "fantastic", "pleasant", "brilliant",
    "celebrate", "comfort", "enjoy", "exciting", "fun", "laugh", "pleasure", "refreshing", "smile"
  ];
  
  const negativeWords = [
    "sad", "upset", "angry", "depressed", "anxious", "worried", "stress", "fear", "hate",
    "hurt", "pain", "disappointed", "frustrated", "irritated", "annoyed", "unhappy", "miserable",
    "lonely", "exhausted", "tired", "troubled", "desperate", "hopeless", "regret", "guilty",
    "ashamed", "embarrassed", "insecure", "jealous", "disgusted", "terrified", "horrified",
    "overwhelmed", "abandoned", "betrayed", "burden", "confused", "defeated", "disappointed",
    "distressed", "disturbed", "drained", "failure", "helpless", "inadequate", "lost", "rejected"
  ];
  
  const anxietyWords = [
    "anxious", "nervous", "worry", "panic", "tense", "stress", "afraid", "fear", "dread",
    "uneasy", "restless", "apprehensive", "concerned", "alarmed", "scared", "frightened",
    "overwhelmed", "jittery", "edgy", "agitated", "uncomfortable", "insecure", "paranoid",
    "phobia", "trembling", "hyperventilate", "racing", "sweaty", "overthinking", "ruminating"
  ];
  
  const angerWords = [
    "angry", "mad", "frustrated", "annoyed", "bitter", "furious", "irritated", "outraged",
    "resentful", "enraged", "hostile", "aggressive", "upset", "irate", "displeased", "offended", 
    "provoked", "exasperated", "indignant", "infuriated", "rage", "temper", "heated", 
    "fuming", "incensed", "livid", "seething", "vengeful", "hatred", "disgusted"
  ];
  
  const sadnessWords = [
    "sad", "depressed", "down", "blue", "unhappy", "miserable", "heartbroken", "somber",
    "gloomy", "melancholy", "sorrowful", "grief", "lost", "disappointed", "hopeless",
    "despondent", "despair", "devastated", "hurt", "pained", "suffering", "lonely", 
    "empty", "broken", "crushed", "desperation", "discouraged", "disheartened", "forlorn", "regret"
  ];
  
  const words = text.toLowerCase().split(/\W+/);
  let score = 0.5; // Neutral starting point
  
  // Advanced sentiment scoring with weighted word counts
  let positiveCount = 0;
  let negativeCount = 0;
  let anxietyCount = 0;
  let angerCount = 0;
  let sadnessCount = 0;
  
  // Analyze each word for emotional content using a weighted system
  words.forEach(word => {
    if (positiveWords.includes(word)) positiveCount += 1.5;
    if (negativeWords.includes(word)) negativeCount += 1.5;
    if (anxietyWords.includes(word)) anxietyCount += 2;
    if (angerWords.includes(word)) angerCount += 2;
    if (sadnessWords.includes(word)) sadnessCount += 2;
  });
  
  // Check for negation patterns that could reverse sentiment
  for (let i = 0; i < words.length - 1; i++) {
    if (['not', 'no', "don't", "doesn't", "didn't", "isn't", "aren't", "wasn't", "weren't", "never", "barely", "hardly"].includes(words[i])) {
      if (positiveWords.includes(words[i + 1])) {
        positiveCount -= 3;
        negativeCount += 1;
      } else if (negativeWords.includes(words[i + 1])) {
        negativeCount -= 3;
        positiveCount += 1;
      }
    }
  }
  
  // Calculate overall sentiment score with improved weighting
  if (positiveCount > 0 || negativeCount > 0) {
    // More nuanced calculation with attention to emotional intensity
    const total = positiveCount + negativeCount;
    score = 0.5 + ((positiveCount - negativeCount) / (2 * Math.max(total, 1)));
    
    // Bound the score between 0 and 1
    score = Math.max(0, Math.min(1, score));
  }
  
  // Determine emotion with more nuance and specificity
  let emotion = "neutral";
  if (score > 0.7) emotion = "positive";
  else if (score < 0.4) {
    // More precise emotional classification
    if (anxietyCount > angerCount && anxietyCount > sadnessCount && anxietyCount > 0) {
      emotion = "anxious";
    } else if (angerCount > anxietyCount && angerCount > sadnessCount && angerCount > 0) {
      emotion = "angry";
    } else if (sadnessCount > anxietyCount && sadnessCount > angerCount && sadnessCount > 0) {
      emotion = "sad";
    } else {
      emotion = "negative";
    }
  }
  
  return { score, emotion };
}

// Simplified linguistic feature analysis
export function analyzeLinguisticFeatures(text: string): LinguisticFeatures {
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 0);
  const uniqueWords = new Set(words);
  
  // Only identify emotive words for essential features
  const emotiveWords = [
    "feel", "happy", "sad", "angry", "anxious", "worried", "scared", "frustrated",
    "excited", "tired", "exhausted", "overwhelmed", "stressed", "lonely", "hopeful",
    "love", "hate", "afraid", "nervous", "calm"
  ];
  
  const foundEmotiveWords = words.filter(word => emotiveWords.includes(word));
  
  return {
    wordCount: words.length,
    uniqueWords: uniqueWords.size,
    emotive_words: [...new Set(foundEmotiveWords)]
  };
}
