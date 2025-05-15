
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import GlassCard from '@/components/ui-elements/GlassCard';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FloatingParticle from '@/components/ui-elements/FloatingParticle';

const MentalHealth = () => {
  const [activeCategory, setActiveCategory] = useState<string>('basics');
  
  const categories = [
    { id: 'basics', name: 'Mental Health Basics' },
    { id: 'emotions', name: 'Understanding Emotions' },
    { id: 'techniques', name: 'Coping Techniques' },
    { id: 'resources', name: 'Resources' }
  ];
  
  return (
    <>
      <PageContainer className="flex flex-col h-screen py-0">
        <div className="bg-white/30 backdrop-blur-sm border-b border-white/30 py-4 px-4">
          <h1 className="text-xl font-semibold">Mental Health Education</h1>
        </div>
        
        <div className="relative flex-grow overflow-auto p-4 pb-20">
          {/* Background animations */}
          <FloatingParticle type="orb" count={8} color="rgba(255, 255, 255, 0.15)" />
          
          {/* Category navigation */}
          <div className="flex overflow-x-auto gap-2 pb-2 mb-4 hide-scrollbar">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === category.id 
                    ? 'bg-white/40 font-semibold shadow-sm' 
                    : 'bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Mental Health Basics */}
          {activeCategory === 'basics' && (
            <div className="space-y-4 animate-fade-in">
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">What is Mental Health?</h2>
                <p className="mb-3">Mental health encompasses our emotional, psychological, and social well-being. It affects how we think, feel, act, handle stress, relate to others, and make choices.</p>
                <p>Just like physical health, mental health is an essential component of overall health and requires regular attention and care.</p>
              </GlassCard>
              
              <Card>
                <CardHeader>
                  <CardTitle>Common Mental Health Conditions</CardTitle>
                  <CardDescription>Understanding common conditions can help reduce stigma</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Anxiety Disorders</AccordionTrigger>
                      <AccordionContent>
                        Anxiety disorders involve more than temporary worry or fear. For a person with an anxiety disorder, the anxiety does not go away and can get worse over time. These feelings can interfere with daily activities such as job performance, schoolwork, and relationships.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Depression</AccordionTrigger>
                      <AccordionContent>
                        Depression is a common but serious mood disorder that causes severe symptoms that affect how you feel, think, and handle daily activities. Symptoms must be present for at least two weeks for a diagnosis of depression.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>PTSD</AccordionTrigger>
                      <AccordionContent>
                        Post-traumatic stress disorder (PTSD) is a disorder that develops in some people who have experienced a shocking, scary, or dangerous event. People who have PTSD may feel stressed or frightened even when they are not in danger.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
              
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Mental Health Myths vs Facts</h2>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-red-400">Myth: Mental health problems don't affect me.</p>
                    <p className="pl-3">Fact: Mental health problems are actually very common, affecting 1 in 5 adults each year.</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-400">Myth: People with mental health problems are violent and unpredictable.</p>
                    <p className="pl-3">Fact: The vast majority of people with mental health problems are no more likely to be violent than anyone else.</p>
                  </div>
                  <div>
                    <p className="font-medium text-red-400">Myth: People with mental health problems can't work.</p>
                    <p className="pl-3">Fact: People with mental health problems are just as productive as other employees when receiving effective treatment.</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
          
          {/* Understanding Emotions */}
          {activeCategory === 'emotions' && (
            <div className="space-y-4 animate-fade-in">
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">What Are Emotions?</h2>
                <p className="mb-3">Emotions are complex psychological states involving three distinct components: a subjective experience, physiological response, and behavioral or expressive response.</p>
                <p>They serve as important signals helping us understand our own needs and communicate with others about our internal state.</p>
              </GlassCard>
              
              <Card>
                <CardHeader>
                  <CardTitle>The Science of Emotions</CardTitle>
                  <CardDescription>How our brain processes feelings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Emotions are processed in multiple areas of the brain, including:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="font-medium">Amygdala</span>: Processes fear and threat responses</li>
                    <li><span className="font-medium">Prefrontal Cortex</span>: Regulates emotional responses</li>
                    <li><span className="font-medium">Hippocampus</span>: Stores emotional memories</li>
                    <li><span className="font-medium">Insula</span>: Processes physical sensations related to emotions</li>
                  </ul>
                </CardContent>
              </Card>
              
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Primary Emotions</h2>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-100/50 p-3 rounded-lg">
                    <h3 className="font-medium">Joy</h3>
                    <p className="text-sm">A feeling of great pleasure and happiness. Triggers the release of dopamine.</p>
                  </div>
                  <div className="bg-red-100/50 p-3 rounded-lg">
                    <h3 className="font-medium">Anger</h3>
                    <p className="text-sm">A strong feeling of annoyance, displeasure, or hostility. Increases heart rate and blood pressure.</p>
                  </div>
                  <div className="bg-yellow-100/50 p-3 rounded-lg">
                    <h3 className="font-medium">Fear</h3>
                    <p className="text-sm">An unpleasant emotion caused by threat. Triggers fight-or-flight response.</p>
                  </div>
                  <div className="bg-purple-100/50 p-3 rounded-lg">
                    <h3 className="font-medium">Sadness</h3>
                    <p className="text-sm">Feeling or showing sorrow. May lead to withdrawal and reflection.</p>
                  </div>
                </div>
              </GlassCard>
              
              <Card>
                <CardHeader>
                  <CardTitle>Emotional Intelligence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">Emotional intelligence refers to the ability to recognize, understand and manage our own emotions, as well as recognize, understand and influence the emotions of others.</p>
                  <p>Key components include:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Self-awareness</li>
                    <li>Self-regulation</li>
                    <li>Motivation</li>
                    <li>Empathy</li>
                    <li>Social skills</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Coping Techniques */}
          {activeCategory === 'techniques' && (
            <div className="space-y-4 animate-fade-in">
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Healthy Coping Strategies</h2>
                <p>Coping strategies are the behaviors, thoughts, and emotions that you use to adjust to the changes that occur in your life. Here are some healthy ways to cope with stress and difficult emotions:</p>
              </GlassCard>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Mindfulness & Meditation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Mindfulness involves paying attention to the present moment without judgment. Regular practice has been shown to reduce stress, improve focus, and help manage difficult emotions.</p>
                    <p><strong>Try this:</strong> Take 5 minutes to focus on your breathing. When your mind wanders, gently bring it back to your breath.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Physical Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Exercise releases endorphins, chemicals that act as natural painkillers and mood elevators. Regular physical activity can significantly reduce symptoms of anxiety and depression.</p>
                    <p><strong>Try this:</strong> A 10-minute walk can increase mental alertness, energy, and positive mood.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Social Connection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Spending time with supportive friends and family can provide a buffer against stress and improve resilience. Even brief positive interactions can boost mood.</p>
                    <p><strong>Try this:</strong> Reach out to someone you trust and share how you're feeling.</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Creative Expression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3">Engaging in creative activities like art, music, writing, or dance can help process emotions and reduce stress. No artistic skill is required—it's the process that matters.</p>
                    <p><strong>Try this:</strong> Journal for 10 minutes about your feelings without judging what comes up.</p>
                  </CardContent>
                </Card>
              </div>
              
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Emergency Coping Techniques</h2>
                <div className="space-y-3">
                  <div className="bg-white/30 p-3 rounded-lg">
                    <h3 className="font-medium">5-4-3-2-1 Grounding Technique</h3>
                    <p className="text-sm mt-1">Identify: 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-lg">
                    <h3 className="font-medium">Box Breathing</h3>
                    <p className="text-sm mt-1">Inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds. Repeat until calm.</p>
                  </div>
                  <div className="bg-white/30 p-3 rounded-lg">
                    <h3 className="font-medium">Body Scan</h3>
                    <p className="text-sm mt-1">Starting from your toes and moving up, notice sensations in each part of your body without judgment.</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
          
          {/* Resources */}
          {activeCategory === 'resources' && (
            <div className="space-y-4 animate-fade-in">
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Getting Help</h2>
                <p className="mb-3">If you're struggling with your mental health, remember that seeking help is a sign of strength, not weakness. Here are some resources that may be helpful:</p>
                
                <div className="bg-white/30 p-4 rounded-lg mb-3">
                  <h3 className="font-medium text-lg">Crisis Resources</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>988 Suicide & Crisis Lifeline</strong>: Call or text 988</li>
                    <li><strong>Crisis Text Line</strong>: Text HOME to 741741</li>
                    <li><strong>Emergency Services</strong>: Call 911 if you or someone else is in immediate danger</li>
                  </ul>
                </div>
                
                <div className="bg-white/30 p-4 rounded-lg">
                  <h3 className="font-medium text-lg">Finding a Therapist</h3>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Ask your primary care doctor for a referral</li>
                    <li>Contact your insurance company for in-network providers</li>
                    <li>Use online therapist directories like Psychology Today or TherapyDen</li>
                    <li>Consider telehealth options if in-person therapy isn't accessible</li>
                  </ul>
                </div>
              </GlassCard>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Apps</CardTitle>
                  <CardDescription>Digital tools to support your mental health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <span role="img" aria-label="meditation">🧘</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Calm & Headspace</h4>
                        <p className="text-sm">Guided meditation and mindfulness exercises</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span role="img" aria-label="journal">📓</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Daylio & Reflectly</h4>
                        <p className="text-sm">Mood tracking and journaling</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <span role="img" aria-label="therapy">💬</span>
                      </div>
                      <div>
                        <h4 className="font-medium">BetterHelp & Talkspace</h4>
                        <p className="text-sm">Online therapy platforms</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <GlassCard>
                <h2 className="text-xl font-semibold mb-3">Recommended Reading</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-medium">The Body Keeps the Score</h3>
                    <p className="text-sm">By Bessel van der Kolk - About the effects of trauma and healing approaches</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Feeling Good: The New Mood Therapy</h3>
                    <p className="text-sm">By David D. Burns - CBT techniques for depression and anxiety</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Maybe You Should Talk to Someone</h3>
                    <p className="text-sm">By Lori Gottlieb - A therapist's perspective on the therapeutic process</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          )}
        </div>
      </PageContainer>
      <BottomNavigation />
    </>
  );
};

export default MentalHealth;
