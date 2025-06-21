
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Coffee, Heart, Brain } from 'lucide-react';

interface Insight {
  type: string;
  title: string;
  message: string;
  action: string;
  icon: React.ComponentType<any>;
  color: string;
}

const InsightsCards = () => {
  const insights: Insight[] = [
    {
      type: "warning",
      title: "Team Energy Dip",
      message: "Team energy has dropped 15% this week – Consider a mindfulness challenge",
      action: "Schedule Wellness Activity",
      icon: Coffee,
      color: "border-orange-200 bg-orange-50"
    },
    {
      type: "success",
      title: "High Engagement",
      message: "94% check-in rate this week – Excellent team participation!",
      action: "Send Recognition",
      icon: Heart,
      color: "border-green-200 bg-green-50"
    },
    {
      type: "info",
      title: "Stress Pattern",
      message: "Monday anxiety levels 20% higher – Consider flexible start times",
      action: "Review Schedules",
      icon: Brain,
      color: "border-blue-200 bg-blue-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <Card key={index} className={`border-2 ${insight.color}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <insight.icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm">{insight.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{insight.message}</p>
                <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                  {insight.action}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InsightsCards;
