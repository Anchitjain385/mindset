
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui-elements/GlassCard';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';
import PageContainer from '@/components/layout/PageContainer';

interface OnboardingStep {
  title: string;
  description: string;
  image?: string;
}

const steps: OnboardingStep[] = [
  {
    title: "Welcome to MindNest",
    description: "Your AI-powered companion for emotional wellness and mental health."
  },
  {
    title: "Personalized Support",
    description: "Our AI therapist adapts to your needs, offering insights and guidance based on your emotions."
  },
  {
    title: "Privacy First",
    description: "Your data stays on your device. Use anonymous mode for complete privacy."
  }
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const goToNextStep = () => {
    if (currentStep === steps.length - 1) {
      // Last step, navigate to home
      navigate('/home');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  return (
    <PageContainer className="flex items-center justify-center relative overflow-hidden">
      {/* Background orbs */}
      <FloatingOrb size={12} color="#FBCBBA" delay={0} />
      <FloatingOrb size={8} color="#F9E7A1" delay={500} />
      <FloatingOrb size={10} color="#B3E5C5" delay={1000} />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold mb-2">MindNest</h1>
          <p className="text-sm opacity-80">Emotional Wellness Companion</p>
        </div>
        
        <GlassCard className="text-center py-8">
          <div className="h-40 mb-6 flex items-center justify-center">
            <div className="text-6xl">{currentStep === 0 ? '🪷' : currentStep === 1 ? '🧠' : '🔒'}</div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-3">{steps[currentStep].title}</h2>
          <p className="text-sm mb-8 px-6">{steps[currentStep].description}</p>
          
          {/* Step indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full transition-all ${
                  currentStep === index ? 'bg-primary w-4' : 'bg-gray-300'
                }`} 
              />
            ))}
          </div>
          
          <div className="px-6">
            <Button 
              onClick={goToNextStep} 
              className="w-full bg-mindnest-accent-green hover:bg-mindnest-accent-green/90 text-mindnest-text"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Button>
            
            {currentStep < steps.length - 1 && (
              <button 
                onClick={() => navigate('/home')} 
                className="mt-4 text-sm text-mindnest-text/60 hover:text-mindnest-text"
              >
                Skip
              </button>
            )}
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  );
};

export default Onboarding;
