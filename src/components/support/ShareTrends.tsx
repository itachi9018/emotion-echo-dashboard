
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, BarChart3, Share2, Calendar } from "lucide-react";

const trendOptions = [
  {
    id: "mood-trend",
    title: "Mood Trend Analysis",
    description: "7-day mood pattern with peaks and dips",
    icon: TrendingUp,
    timeframe: "Last 7 days",
    dataPoints: 15
  },
  {
    id: "emotion-frequency",
    title: "Emotion Frequency Chart",
    description: "Most common emotions and their frequency",
    icon: BarChart3,
    timeframe: "Last 30 days",
    dataPoints: 45
  },
  {
    id: "triggers-analysis",
    title: "Triggers & Patterns",
    description: "Identified emotional triggers and patterns",
    icon: Calendar,
    timeframe: "Last 2 weeks",
    dataPoints: 28
  }
];

const ShareTrends = () => {
  const [selectedTrends, setSelectedTrends] = useState<string[]>([]);
  const { toast } = useToast();

  const handleTrendToggle = (trendId: string) => {
    setSelectedTrends(prev => 
      prev.includes(trendId) 
        ? prev.filter(id => id !== trendId)
        : [...prev, trendId]
    );
  };

  const handleShare = () => {
    if (selectedTrends.length === 0) {
      toast({
        title: "No trends selected",
        description: "Please select at least one trend analysis to share.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trends Shared Successfully",
      description: `${selectedTrends.length} trend analyses have been shared with your therapist.`
    });

    setSelectedTrends([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Share Trend Analysis
        </CardTitle>
        <CardDescription>
          Share your emotional patterns and insights with your mental health professional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {trendOptions.map((trend) => (
            <div key={trend.id} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50">
              <Checkbox
                checked={selectedTrends.includes(trend.id)}
                onCheckedChange={() => handleTrendToggle(trend.id)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <trend.icon className="w-5 h-5 text-purple-600" />
                  <h4 className="font-medium">{trend.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">{trend.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <Badge variant="outline" className="text-xs">
                    {trend.timeframe}
                  </Badge>
                  <span>{trend.dataPoints} data points</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            {selectedTrends.length} trends selected
          </span>
          <Button 
            onClick={handleShare}
            disabled={selectedTrends.length === 0}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Selected
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShareTrends;
