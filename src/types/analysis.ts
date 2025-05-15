
export interface EmotionAnalysisResult {
  primaryEmotion: 'happy' | 'sad' | 'angry' | 'surprised' | 'fearful' | 'disgusted' | 'neutral';
  emotionScores: Record<string, number>;
  confidenceScore: number;
  recommendations: string[];
  timestamp?: Date;
  facialFeatures?: {
    eyeOpenness: number;  // 0 to 1 scale (closed to fully open)
    mouthCurvature: number;  // -1 to 1 scale (frown to smile)
    browPosition: number;  // -1 to 1 scale (furrowed to raised)
    eyebrowRaise?: number; // 0 to 1 scale (relaxed to raised)
    lipPursing?: number;   // 0 to 1 scale (relaxed to pursed)
    noseFlaringIndex?: number; // 0 to 1 scale
  };
  audioFeatures?: {
    tone: 'neutral' | 'stressed' | 'relaxed' | 'excited' | 'sad' | 'angry' | 'fearful';
    speakingRate: number; // words per minute
    pauseFrequency: number;
    volumeVariation: number;
    pitchVariation?: number; // standard deviation of pitch
  };
  textAnalysis?: {
    emotionalWords: string[];
    cognitiveDistortions?: string[];
    sentimentScore: number; // -1 to 1
    topicAnalysis?: string[];
    wordComplexity?: number; // 0 to 1
  };
  compoundAnalysisScore?: number; // overall multimodal analysis score
}

export interface SoundEffect {
  name: string;
  url: string;
  volume: number;
  isPlaying: boolean;
  icon: string;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  route: string;
  category: 'relaxation' | 'cognitive' | 'emotional' | 'mindfulness';
  difficulty: 'easy' | 'medium' | 'hard';
}
