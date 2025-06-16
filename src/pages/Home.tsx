
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, Plus, Smile } from "lucide-react";

const mockData = [
  { day: "Mon", mood: 4 },
  { day: "Tue", mood: 3 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 5 },
  { day: "Sat", mood: 4 },
  { day: "Sun", mood: 3 },
];

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];

const Home = () => {
  const todayMood = 4;
  const streak = 5;
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
          <p className="text-gray-600 mt-1">How are you feeling today?</p>
        </div>
        <Link to="/journal">
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            <Plus className="w-4 h-4 mr-2" />
            Log Today's Mood
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Today's Mood</CardTitle>
            <div className="text-2xl">{moodEmojis[todayMood - 1]}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">Good</div>
            <p className="text-xs text-yellow-700">Feeling positive today</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Reflection Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{streak} days</div>
            <p className="text-xs text-green-700">Keep it up! 🔥</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Weekly Average</CardTitle>
            <Smile className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">4.1/5</div>
            <p className="text-xs text-blue-700">Above average week</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Total Entries</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">127</div>
            <p className="text-xs text-purple-700">Since you started</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Trend & Quick Entry */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Mood Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              7-Day Mood Trend
            </CardTitle>
            <CardDescription>Your emotional journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <XAxis dataKey="day" />
                  <YAxis domain={[1, 5]} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="url(#gradient)" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quick Journal Preview */}
        <Card>
          <CardHeader>
            <CardTitle>What's on your mind?</CardTitle>
            <CardDescription>Quick thoughts or reflections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {["grateful", "excited", "peaceful", "motivated"].map((emotion) => (
                <Badge key={emotion} variant="secondary" className="bg-purple-100 text-purple-700">
                  {emotion}
                </Badge>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 italic">
                "Had a great meeting with the team today. Feeling really motivated about the new project..."
              </p>
              <p className="text-xs text-gray-500 mt-2">Yesterday, 2:30 PM</p>
            </div>
            <Link to="/journal">
              <Button variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New Entry
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="text-amber-800">💡 Daily Insight</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-amber-700">
            "Emotional awareness is the first step to emotional intelligence. Take a moment today to check in with yourself."
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
