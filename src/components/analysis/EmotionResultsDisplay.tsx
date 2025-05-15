import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { EmotionAnalysisResult } from "@/types/analysis";

const emotionColorMap: Record<string, string> = {
  happy: '#B3E5C5', // Mint green
  sad: '#C7DFFD',   // Light blue
  angry: '#FF9F9F',
  neutral: '#EADCF8', // Lavender
  surprised: '#F9E7A1', // Soft yellow
  fearful: '#F9E5D9', // Soft peach
  disgusted: '#F9E5D9'
};

const emotionEmojiMap: Record<string, string> = {
  happy: '😊',
  sad: '😔',
  angry: '😠',
  neutral: '😐',
  surprised: '😲',
  fearful: '😨',
  disgusted: '🤢'
};

interface EmotionResultsDisplayProps {
  results: EmotionAnalysisResult;
  className?: string;
  showFacialFeatures?: boolean;
  showTextAnalysis?: boolean;
}

const EmotionResultsDisplay = ({ 
  results, 
  className,
  showFacialFeatures = true,
  showTextAnalysis = false
}: EmotionResultsDisplayProps) => {
  const { 
    primaryEmotion, 
    emotionScores, 
    confidenceScore, 
    recommendations, 
    facialFeatures,
    textAnalysis
  } = results;
  
  const emotionEntries = Object.entries(emotionScores)
    .sort((a, b) => b[1] - a[1]);
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center">
        <div 
          className="inline-flex items-center justify-center w-24 h-24 text-5xl rounded-full mb-4 animate-bounce-slow shadow-lg"
          style={{ backgroundColor: emotionColorMap[primaryEmotion] }}
        >
          {emotionEmojiMap[primaryEmotion]}
        </div>
        <h3 className="text-xl font-semibold capitalize text-mindnest-text">
          {primaryEmotion}
        </h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Progress 
            value={Number(confidenceScore) * 100} 
            className="w-28 h-2.5 bg-white/30"
            indicatorClassName={`bg-mindnest-accent-purple`}
          />
          <span className="text-sm text-mindnest-text/70">
            {Math.round(Number(confidenceScore) * 100)}% confidence
          </span>
        </div>
      </div>
      
      <div className="space-y-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <h4 className="text-sm font-medium text-mindnest-text">Emotion Breakdown</h4>
        <div className="space-y-3">
          {emotionEntries.map(([emotion, score]) => (
            <div key={emotion} className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="capitalize text-mindnest-text flex items-center">
                  <span className="mr-2">{emotionEmojiMap[emotion]}</span>
                  {emotion}
                </span>
                <span className="text-mindnest-text/70">{Math.round(Number(score) * 100)}%</span>
              </div>
              <Progress 
                value={Number(score) * 100} 
                className="h-2.5 bg-white/20"
                indicatorClassName={cn("transition-all", {
                  "bg-mindnest-accent-green": emotion === "happy",
                  "bg-mindnest-accent-blue": emotion === "sad",
                  "bg-red-400": emotion === "angry",
                  "bg-mindnest-accent-purple": emotion === "neutral",
                  "bg-mindnest-accent-yellow": emotion === "surprised",
                  "bg-mindnest-accent-peach": emotion === "fearful" || emotion === "disgusted",
                })}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Facial Feature Analysis */}
      {showFacialFeatures && facialFeatures && (
        <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h4 className="text-sm font-medium text-mindnest-text">Facial Feature Analysis</h4>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-mindnest-text">Eye Openness</span>
                <span className="text-mindnest-text/70">{Math.round(Number(facialFeatures.eyeOpenness) * 100)}%</span>
              </div>
              <Progress 
                value={Number(facialFeatures.eyeOpenness) * 100} 
                className="h-2.5 bg-white/20"
                indicatorClassName="bg-mindnest-accent-blue"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-mindnest-text">
                  Mouth Curvature
                  <span className="ml-2 text-xs opacity-70">
                    {facialFeatures.mouthCurvature > 0.3 ? '(Smiling)' : 
                     facialFeatures.mouthCurvature < -0.3 ? '(Frowning)' : '(Neutral)'}
                  </span>
                </span>
                <span className="text-mindnest-text/70">
                  {facialFeatures.mouthCurvature > 0 ? '+' : ''}
                  {Math.round(facialFeatures.mouthCurvature * 100)}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex h-2.5 overflow-hidden text-xs bg-white/20 rounded">
                  <div 
                    className={cn(
                      "flex flex-col justify-center text-center text-white",
                      facialFeatures.mouthCurvature > 0 ? "bg-mindnest-accent-green" : "bg-red-400"
                    )}
                    style={{ 
                      width: `${Math.abs(facialFeatures.mouthCurvature) * 100}%`,
                      marginLeft: facialFeatures.mouthCurvature > 0 ? "50%" : `${50 - Math.abs(facialFeatures.mouthCurvature) * 100}%`
                    }}
                  />
                </div>
                <div className="absolute w-px h-full bg-white/50 top-0 left-1/2" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-mindnest-text">
                  Brow Position
                  <span className="ml-2 text-xs opacity-70">
                    {facialFeatures.browPosition > 0.3 ? '(Raised)' : 
                     facialFeatures.browPosition < -0.3 ? '(Lowered)' : '(Neutral)'}
                  </span>
                </span>
                <span className="text-mindnest-text/70">
                  {facialFeatures.browPosition > 0 ? '+' : ''}
                  {Math.round(facialFeatures.browPosition * 100)}
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex h-2.5 overflow-hidden text-xs bg-white/20 rounded">
                  <div 
                    className={cn(
                      "flex flex-col justify-center text-center text-white",
                      facialFeatures.browPosition > 0 ? "bg-mindnest-accent-yellow" : "bg-mindnest-accent-purple"
                    )}
                    style={{ 
                      width: `${Math.abs(facialFeatures.browPosition) * 100}%`,
                      marginLeft: facialFeatures.browPosition > 0 ? "50%" : `${50 - Math.abs(facialFeatures.browPosition) * 100}%`
                    }}
                  />
                </div>
                <div className="absolute w-px h-full bg-white/50 top-0 left-1/2" />
              </div>
            </div>
            
            {facialFeatures.eyebrowRaise !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-mindnest-text">Eyebrow Raise</span>
                  <span className="text-mindnest-text/70">{Math.round(facialFeatures.eyebrowRaise * 100)}%</span>
                </div>
                <Progress 
                  value={facialFeatures.eyebrowRaise * 100} 
                  className="h-2.5 bg-white/20"
                  indicatorClassName="bg-amber-400"
                />
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Text Analysis - conditionally shown */}
      {showTextAnalysis && textAnalysis && (
        <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <h4 className="text-sm font-medium text-mindnest-text">Text Analysis</h4>
          
          <div className="space-y-3">
            {textAnalysis.sentimentScore !== undefined && (
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-mindnest-text">Sentiment Score</span>
                  <span className="text-mindnest-text/70">
                    {textAnalysis.sentimentScore > 0 ? '+' : ''}
                    {textAnalysis.sentimentScore.toFixed(2)}
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="flex h-2.5 overflow-hidden text-xs bg-white/20 rounded">
                    <div 
                      className={cn(
                        "flex flex-col justify-center text-center text-white",
                        textAnalysis.sentimentScore > 0 ? "bg-mindnest-accent-green" : "bg-red-400"
                      )}
                      style={{ 
                        width: `${Math.abs(textAnalysis.sentimentScore * 50)}%`,
                        marginLeft: textAnalysis.sentimentScore > 0 ? "50%" : `${50 - Math.abs(textAnalysis.sentimentScore * 50)}%`
                      }}
                    />
                  </div>
                  <div className="absolute w-px h-full bg-white/50 top-0 left-1/2" />
                </div>
              </div>
            )}
            
            {textAnalysis.emotionalWords && textAnalysis.emotionalWords.length > 0 && (
              <div>
                <div className="text-sm mb-2">Emotional Words Used</div>
                <div className="flex flex-wrap gap-1">
                  {textAnalysis.emotionalWords.map((word, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-white/20 rounded-full"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {textAnalysis.cognitiveDistortions && textAnalysis.cognitiveDistortions.length > 0 && (
              <div>
                <div className="text-sm mb-2">Cognitive Patterns</div>
                <ul className="text-xs space-y-1">
                  {textAnalysis.cognitiveDistortions.map((distortion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
                      {distortion.replace('_', ' ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
        <h4 className="text-sm font-medium text-mindnest-text">Personalized Recommendations</h4>
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-sm text-mindnest-text/80 leading-relaxed animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-2 h-2 mt-2 rounded-full" 
                style={{ 
                  backgroundColor: Object.values(emotionColorMap)[index % Object.values(emotionColorMap).length]
                }} 
              />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EmotionResultsDisplay;
