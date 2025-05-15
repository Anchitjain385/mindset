
import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import BottomNavigation from '@/components/layout/BottomNavigation';
import GlassCard from '@/components/ui-elements/GlassCard';
import FloatingOrb from '@/components/ui-elements/FloatingOrb';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the chart
const moodData = [
  { day: 'Mon', score: 65, mood: 'okay' },
  { day: 'Tue', score: 45, mood: 'sad' },
  { day: 'Wed', score: 80, mood: 'good' },
  { day: 'Thu', score: 75, mood: 'good' },
  { day: 'Fri', score: 90, mood: 'great' },
  { day: 'Sat', score: 85, mood: 'good' },
  { day: 'Sun', score: 70, mood: 'okay' },
];

// Map mood scores to emoji
const getMoodEmoji = (mood: string) => {
  switch (mood) {
    case 'great': return '😀';
    case 'good': return '🙂';
    case 'okay': return '😐';
    case 'sad': return '😔';
    case 'anxious': return '😰';
    default: return '😐';
  }
};

const Progress = () => {
  return (
    <>
      <PageContainer>
        <div className="relative">
          {/* Background orbs */}
          <FloatingOrb size={8} color="#B3E5C5" delay={0} />
          <FloatingOrb size={6} color="#FBCBBA" delay={500} />
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-semibold">Your Progress</h1>
            <p className="text-mindnest-text/70">Track your emotional wellness journey</p>
          </div>
          
          {/* Mood Graph */}
          <GlassCard className="mb-6 p-4">
            <h3 className="text-xl font-medium mb-4">Weekly Mood Trends</h3>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={moodData}
                  margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="day" stroke="#2E2E3A" />
                  <YAxis stroke="#2E2E3A" domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: '10px' }}
                    formatter={(value, name) => [`${value} - ${getMoodEmoji(moodData[moodData.findIndex(item => item.score === value)].mood)}`, 'Mood Score']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#B3E5C5" 
                    strokeWidth={3} 
                    dot={{ fill: '#B3E5C5', stroke: 'white', strokeWidth: 2, r: 6 }} 
                    activeDot={{ fill: '#B3E5C5', stroke: 'white', strokeWidth: 3, r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
          
          {/* Insights */}
          <GlassCard className="mb-6">
            <h3 className="text-xl font-medium mb-3">AI Insights</h3>
            <div className="space-y-4">
              <p className="text-sm">
                <strong>Weekly Analysis:</strong> Your mood improved significantly midweek. Morning check-ins show higher scores than evenings.
              </p>
              <p className="text-sm">
                <strong>Pattern Detected:</strong> Better mood on days with reported outdoor activities and social interactions.
              </p>
              <p className="text-sm">
                <strong>Recommendation:</strong> Consider scheduling more nature walks and social activities this coming week.
              </p>
            </div>
          </GlassCard>
          
          {/* Achievements */}
          <GlassCard>
            <h3 className="text-xl font-medium mb-3">Achievements</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card p-3 flex flex-col items-center">
                <span className="text-2xl mb-1">🌱</span>
                <span className="text-xs font-medium text-center">7-Day Streak</span>
              </div>
              <div className="glass-card p-3 flex flex-col items-center">
                <span className="text-2xl mb-1">🧘</span>
                <span className="text-xs font-medium text-center">Breathing Master</span>
              </div>
              <div className="glass-card p-3 flex flex-col items-center">
                <span className="text-2xl mb-1">📝</span>
                <span className="text-xs font-medium text-center">Reflection Pro</span>
              </div>
              <div className="glass-card p-3 flex flex-col items-center">
                <span className="text-2xl mb-1">🌟</span>
                <span className="text-xs font-medium text-center">Mood Improver</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </PageContainer>
      <BottomNavigation />
    </>
  );
};

export default Progress;
