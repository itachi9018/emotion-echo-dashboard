
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const WeeklyEngagementChart = () => {
  const weeklyEngagementData = [
    { week: 'Week 1', checkins: 89, mood: 7.1, participation: 76 },
    { week: 'Week 2', checkins: 92, mood: 7.3, participation: 82 },
    { week: 'Week 3', checkins: 87, mood: 6.8, participation: 78 },
    { week: 'Week 4', checkins: 94, mood: 7.5, participation: 85 },
    { week: 'Week 5', checkins: 91, mood: 7.2, participation: 83 },
    { week: 'Week 6', checkins: 88, mood: 6.9, participation: 79 },
    { week: 'Week 7', checkins: 85, mood: 6.7, participation: 74 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Weekly Engagement Trends
        </CardTitle>
        <CardDescription>
          Check-in rates and mood scores over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyEngagementData}>
              <XAxis dataKey="week" />
              <YAxis />
              <Area 
                type="monotone" 
                dataKey="checkins" 
                stroke="#3b82f6" 
                fill="#dbeafe" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyEngagementChart;
