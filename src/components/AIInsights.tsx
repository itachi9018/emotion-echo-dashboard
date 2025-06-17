
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Brain, Lightbulb, TrendingUp, Calendar, Clock, X } from "lucide-react";

interface MoodInsight {
  id: string;
  type: 'pattern' | 'trend' | 'suggestion';
  title: string;
  description: string;
  emoji: string;
  confidence: 'high' | 'medium' | 'low';
}

interface DailySuggestion {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: 'breathing' | 'movement' | 'mindfulness' | 'social' | 'rest';
}

const AIInsights = () => {
  const [insights, setInsights] = useState<MoodInsight[]>([]);
  const [dailySuggestion, setDailySuggestion] = useState<DailySuggestion | null>(null);
  const [moodTrends, setMoodTrends] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Mock data - in a real app, this would come from analyzing actual journal entries
  useEffect(() => {
    const mockInsights: MoodInsight[] = [
      {
        id: '1',
        type: 'pattern',
        title: 'Monday Blues Pattern',
        description: 'You tend to feel low on Mondays. Your mood typically drops 30% compared to weekends.',
        emoji: '😔',
        confidence: 'high'
      },
      {
        id: '2',
        type: 'trend',
        title: 'Evening Stress Peak',
        description: 'Stress levels rise significantly after 6PM. Consider evening relaxation routines.',
        emoji: '😰',
        confidence: 'high'
      },
      {
        id: '3',
        type: 'pattern',
        title: 'Social Energy Boost',
        description: 'Your mood improves by 40% on days when you mention spending time with friends.',
        emoji: '😊',
        confidence: 'medium'
      },
      {
        id: '4',
        type: 'trend',
        title: 'Morning Optimism',
        description: 'Your journal entries are most positive between 8-10AM. Great time for important decisions!',
        emoji: '🌅',
        confidence: 'high'
      }
    ];

    const mockSuggestion: DailySuggestion = {
      id: 'daily-1',
      title: 'Evening Wind-Down',
      description: 'Try a 5-minute deep breathing exercise tonight to counteract your usual evening stress.',
      emoji: '🧘‍♀️',
      category: 'breathing'
    };

    const mockTrends = ['😊', '😔', '😊', '😐', '😰', '😊', '😴'];

    setInsights(mockInsights);
    setDailySuggestion(mockSuggestion);
    setMoodTrends(mockTrends);
  }, []);

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp className="w-4 h-4" />;
      case 'trend': return <Calendar className="w-4 h-4" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed top-4 right-4 z-40 bg-white/90 backdrop-blur-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 shadow-lg"
        >
          <Brain className="w-4 h-4 mr-2 text-purple-600" />
          AI Insights
        </Button>
      </SheetTrigger>
      
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Brain className="w-6 h-6 text-purple-600" />
            AI Insights
          </SheetTitle>
          <p className="text-sm text-gray-600">
            Personalized insights from your journal entries and mood data
          </p>
        </SheetHeader>

        <div className="space-y-6">
          {/* Daily Suggestion */}
          {dailySuggestion && (
            <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lightbulb className="w-5 h-5 text-amber-500" />
                  Today's Suggestion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{dailySuggestion.emoji}</span>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">{dailySuggestion.title}</h4>
                    <p className="text-sm text-gray-600">{dailySuggestion.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mood Trends */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                7-Day Mood Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500">Last Week</span>
                <span className="text-xs text-gray-500">Today</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                {moodTrends.map((emoji, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs text-gray-500">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Insights List */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              Pattern Analysis
            </h3>
            
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getInsightIcon(insight.type)}
                      <CardTitle className="text-base">{insight.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{insight.emoji}</span>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getConfidenceColor(insight.confidence)}`}
                      >
                        {insight.confidence}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t pt-4 mt-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Insights updated daily based on your journal entries</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              AI analysis is for guidance only. Please consult healthcare professionals for serious concerns.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AIInsights;
