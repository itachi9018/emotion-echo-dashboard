
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Activity } from 'lucide-react';

const TeamMoodChart = () => {
  const teamMoodTrend = [
    { date: '2024-01-01', mood: 7.2, energy: 6.8 },
    { date: '2024-01-02', mood: 7.0, energy: 6.5 },
    { date: '2024-01-03', mood: 6.8, energy: 6.2 },
    { date: '2024-01-04', mood: 6.9, energy: 6.4 },
    { date: '2024-01-05', mood: 7.1, energy: 6.7 },
    { date: '2024-01-06', mood: 7.3, energy: 7.0 },
    { date: '2024-01-07', mood: 7.5, energy: 7.2 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-purple-600" />
          Team Mood & Energy Trends
        </CardTitle>
        <CardDescription>
          Daily mood and energy levels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={teamMoodTrend}>
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).getDate().toString()} />
              <YAxis domain={[6, 8]} />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Mood"
              />
              <Line 
                type="monotone" 
                dataKey="energy" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Energy"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMoodChart;
