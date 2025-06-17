
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Lightbulb, Bookmark, BookmarkCheck, CheckCircle, ArrowRight, RotateCcw } from "lucide-react";
import ChallengeThoughtsModule from "@/components/cbt/ChallengeThoughtsModule";
import ReframeBeliefsModule from "@/components/cbt/ReframeBeliefsModule";
import DailyAffirmationModule from "@/components/cbt/DailyAffirmationModule";

interface CBTTool {
  id: string;
  title: string;
  description: string;
  emoji: string;
  icon: React.ComponentType<any>;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const cbtTools: CBTTool[] = [
  {
    id: 'challenge-thoughts',
    title: 'Challenge Negative Thoughts',
    description: 'Identify and question unhelpful thinking patterns',
    emoji: '🤔',
    icon: Brain,
    duration: '5-10 min',
    difficulty: 'beginner'
  },
  {
    id: 'reframe-beliefs',
    title: 'Reframe Beliefs',
    description: 'Transform limiting beliefs into empowering perspectives',
    emoji: '🔄',
    icon: RotateCcw,
    duration: '8-12 min',
    difficulty: 'intermediate'
  },
  {
    id: 'daily-affirmation',
    title: 'Daily Affirmation',
    description: 'Build positive self-talk and confidence',
    emoji: '✨',
    icon: Heart,
    duration: '3-5 min',
    difficulty: 'beginner'
  }
];

const CBTTools = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [bookmarkedTools, setBookmarkedTools] = useState<Set<string>>(new Set());
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set());

  const toggleBookmark = (toolId: string) => {
    const newBookmarks = new Set(bookmarkedTools);
    if (newBookmarks.has(toolId)) {
      newBookmarks.delete(toolId);
    } else {
      newBookmarks.add(toolId);
    }
    setBookmarkedTools(newBookmarks);
  };

  const markAsCompleted = (toolId: string) => {
    setCompletedTools(prev => new Set([...prev, toolId]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'challenge-thoughts':
        return (
          <ChallengeThoughtsModule
            onComplete={() => markAsCompleted('challenge-thoughts')}
            onClose={() => setActiveModule(null)}
          />
        );
      case 'reframe-beliefs':
        return (
          <ReframeBeliefsModule
            onComplete={() => markAsCompleted('reframe-beliefs')}
            onClose={() => setActiveModule(null)}
          />
        );
      case 'daily-affirmation':
        return (
          <DailyAffirmationModule
            onComplete={() => markAsCompleted('daily-affirmation')}
            onClose={() => setActiveModule(null)}
          />
        );
      default:
        return null;
    }
  };

  if (activeModule) {
    return renderActiveModule();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          CBT Tools
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Interactive cognitive behavioral therapy exercises to help you develop healthier thinking patterns and emotional well-being.
        </p>
      </div>

      {/* Progress Summary */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completedTools.size}</div>
              <div className="text-sm text-gray-600">Tools Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{bookmarkedTools.size}</div>
              <div className="text-sm text-gray-600">Bookmarked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.round((completedTools.size / cbtTools.length) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CBT Tools Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cbtTools.map((tool) => {
          const IconComponent = tool.icon;
          const isBookmarked = bookmarkedTools.has(tool.id);
          const isCompleted = completedTools.has(tool.id);

          return (
            <Card 
              key={tool.id} 
              className="relative group hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-purple-300"
            >
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleBookmark(tool.id)}
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                </Button>
                {isCompleted && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{tool.emoji}</span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={getDifficultyColor(tool.difficulty)}>
                        {tool.difficulty}
                      </Badge>
                      <span className="text-xs text-gray-500">{tool.duration}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="mb-4 text-sm leading-relaxed">
                  {tool.description}
                </CardDescription>
                
                <Button
                  onClick={() => setActiveModule(tool.id)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <span>Start Exercise</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tips Section */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <Lightbulb className="w-5 h-5" />
            CBT Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <span className="text-lg">🎯</span>
              <div>
                <h4 className="font-medium text-blue-900">Be Consistent</h4>
                <p className="text-sm text-blue-700">Practice these exercises regularly for best results</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">📝</span>
              <div>
                <h4 className="font-medium text-blue-900">Write It Down</h4>
                <p className="text-sm text-blue-700">Journal your insights and progress</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">⏰</span>
              <div>
                <h4 className="font-medium text-blue-900">Take Your Time</h4>
                <p className="text-sm text-blue-700">Don't rush through the exercises</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-lg">🤝</span>
              <div>
                <h4 className="font-medium text-blue-900">Seek Support</h4>
                <p className="text-sm text-blue-700">Consider professional guidance when needed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CBTTools;
