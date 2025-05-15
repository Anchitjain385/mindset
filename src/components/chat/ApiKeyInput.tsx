
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySaved: (apiKey: string) => void;
  isOptional?: boolean;
  onSkip?: () => void;
}

const ApiKeyInput = ({ onApiKeySaved, isOptional = false, onSkip }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      onApiKeySaved(apiKey.trim());
    }
  };

  return (
    <div className="glass-card p-4 mb-6 animate-fade-in">
      <div className="mb-3">
        <h3 className="text-lg font-medium mb-2">
          {isOptional ? "Optional: Enhance with Your OpenAI API Key" : "OpenAI API Key Required"}
        </h3>
        <p className="text-sm text-mindnest-text/70 mb-4">
          {isOptional 
            ? "For enhanced AI responses, you can add your OpenAI API key. Without a key, the AI will still work but with limited capabilities. Your key is stored locally on your device only."
            : "To enable the AI Therapist feature, please enter your OpenAI API key. Your key is stored locally on your device only."}
        </p>
      </div>
      
      <div className="flex gap-2 mb-2">
        <div className="relative flex-grow">
          <Input 
            type={isVisible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="pr-10 bg-white/30 backdrop-blur-sm border-white/30"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-mindnest-text/50 hover:text-mindnest-text"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? '🙈' : '👁️'}
          </button>
        </div>
        <Button onClick={handleSave} className="bg-mindnest-accent-purple hover:bg-mindnest-accent-purple/90">
          <Key className="mr-2 h-4 w-4" />
          Save Key
        </Button>
      </div>
      
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-mindnest-text/60">
          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-mindnest-accent-purple"
          >
            Get your API key from OpenAI
          </a>
        </div>
        
        {isOptional && onSkip && (
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="text-xs text-mindnest-text/60 hover:text-mindnest-text"
          >
            Continue without key
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApiKeyInput;
