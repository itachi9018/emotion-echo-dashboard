
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { Heart } from 'lucide-react';

const EmotionsChart = () => {
  const emotionData = [
    { emotion: "Grateful", count: 45, color: "#10b981" },
    { emotion: "Focused", count: 38, color: "#3b82f6" },
    { emotion: "Excited", count: 32, color: "#f59e0b" },
    { emotion: "Calm", count: 28, color: "#8b5cf6" },
    { emotion: "Anxious", count: 22, color: "#ef4444" },
    { emotion: "Overwhelmed", count: 18, color: "#f97316" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-600" />
          Most Frequent Emotions
        </CardTitle>
        <CardDescription>
          Team emotional patterns this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={emotionData} layout="horizontal">
              <XAxis type="number" />
              <YAxis dataKey="emotion" type="category" width={80} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {emotionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionsChart;
