import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Calendar, TrendingUp, List, Search, Filter, Eye } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];
const moodColors = ["bg-red-100", "bg-orange-100", "bg-gray-100", "bg-green-100", "bg-yellow-100"];
const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

// Mock data
const trendData = [
  { date: "2024-01-01", mood: 4 },
  { date: "2024-01-02", mood: 3 },
  { date: "2024-01-03", mood: 5 },
  { date: "2024-01-04", mood: 4 },
  { date: "2024-01-05", mood: 5 },
  { date: "2024-01-06", mood: 3 },
  { date: "2024-01-07", mood: 4 },
];

const emotionData = [
  { emotion: "happy", count: 25 },
  { emotion: "grateful", count: 20 },
  { emotion: "excited", count: 15 },
  { emotion: "peaceful", count: 12 },
  { emotion: "anxious", count: 8 },
  { emotion: "frustrated", count: 5 },
];

const mockEntries = [
  {
    id: 1,
    date: "2024-01-07",
    mood: 4,
    summary: "Had a great day at work. Team meeting went really well and I felt heard during the discussion...",
    emotions: ["happy", "grateful", "motivated"],
    contexts: ["work", "personal"],
    fullText: "Had a great day at work. Team meeting went really well and I felt heard during the discussion. The new project looks exciting and I'm looking forward to the challenges ahead."
  },
  {
    id: 2,
    date: "2024-01-06",
    mood: 3,
    summary: "Feeling a bit overwhelmed with deadlines but managed to get through the day...",
    emotions: ["anxious", "determined", "tired"],
    contexts: ["work", "health"],
    fullText: "Feeling a bit overwhelmed with deadlines but managed to get through the day. Need to work on better time management. At least I got my workout in, which helped clear my head."
  },
  {
    id: 3,
    date: "2024-01-05",
    mood: 5,
    summary: "Amazing weekend with family! Went hiking and had such a peaceful time in nature...",
    emotions: ["joyful", "peaceful", "grateful", "energized"],
    contexts: ["family", "exercise", "hobbies"],
    fullText: "Amazing weekend with family! Went hiking and had such a peaceful time in nature. The kids loved exploring the trails and we saw some beautiful wildlife. Feeling so grateful for these moments."
  }
];

const History = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const filteredEntries = mockEntries.filter(entry =>
    entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.emotions.some(emotion => emotion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getMoodForDate = (date: Date) => {
    const entry = mockEntries.find(entry => 
      isSameDay(new Date(entry.date), date)
    );
    return entry?.mood || null;
  };

  const getEntryForDate = (date: Date) => {
    return mockEntries.find(entry => 
      isSameDay(new Date(entry.date), date)
    );
  };

  // Calculate monthly mood summary
  const getMonthlySummary = () => {
    const positiveDays = mockEntries.filter(entry => entry.mood >= 4).length;
    const negativeDays = mockEntries.filter(entry => entry.mood <= 2).length;
    const neutralDays = mockEntries.filter(entry => entry.mood === 3).length;
    const totalDays = mockEntries.length;
    
    return {
      positive: positiveDays,
      negative: negativeDays,
      neutral: neutralDays,
      total: totalDays,
      positivePercentage: totalDays > 0 ? Math.round((positiveDays / totalDays) * 100) : 0,
      negativePercentage: totalDays > 0 ? Math.round((negativeDays / totalDays) * 100) : 0
    };
  };

  const monthlySummary = getMonthlySummary();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Emotional Journey</h1>
        <p className="text-gray-600 mt-1">Track patterns and insights in your mood history</p>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Entries
          </TabsTrigger>
        </TabsList>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Mood Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Mood Trend</CardTitle>
                <CardDescription>Your emotional journey over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <XAxis dataKey="date" tickFormatter={(date) => format(new Date(date), 'MMM dd')} />
                      <YAxis domain={[1, 5]} />
                      <Line 
                        type="monotone" 
                        dataKey="mood" 
                        stroke="#8b5cf6" 
                        strokeWidth={3}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Emotion Frequency */}
            <Card>
              <CardHeader>
                <CardTitle>Most Common Emotions</CardTitle>
                <CardDescription>Your emotional patterns this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emotionData} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis dataKey="emotion" type="category" width={80} />
                      <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Options */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Options</CardTitle>
              <CardDescription>Customize your trend view</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">All Time</Badge>
                <Badge variant="default">Last Week</Badge>
                <Badge variant="outline">Last Month</Badge>
                <Badge variant="outline">Last 3 Months</Badge>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">All Emotions</Badge>
                <Badge variant="outline">Happy</Badge>
                <Badge variant="outline">Sad</Badge>
                <Badge variant="outline">Anxious</Badge>
                <Badge variant="outline">Grateful</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Calendar Tab */}
        <TabsContent value="calendar" className="space-y-6">
          {/* Monthly Summary Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">This Month's Overview</h3>
                <div className="text-sm text-gray-600">
                  {monthlySummary.total} entries logged
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{monthlySummary.positivePercentage}%</div>
                  <div className="text-sm text-green-700">Positive Days</div>
                  <div className="text-xs text-gray-500">{monthlySummary.positive} days</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">{Math.round((monthlySummary.neutral / monthlySummary.total) * 100) || 0}%</div>
                  <div className="text-sm text-gray-700">Neutral Days</div>
                  <div className="text-xs text-gray-500">{monthlySummary.neutral} days</div>
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{monthlySummary.negativePercentage}%</div>
                  <div className="text-sm text-red-700">Challenging Days</div>
                  <div className="text-xs text-gray-500">{monthlySummary.negative} days</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>January 2024</span>
                {/* Mood Legend */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">Mood Legend:</span>
                  <div className="flex items-center gap-2">
                    {moodEmojis.map((emoji, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <div className={`w-3 h-3 rounded-full ${moodColors[index]} border`}></div>
                        <span className="text-xs text-gray-500">{emoji}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardTitle>
              <CardDescription>Click on any date to view your journal entry • Hover for details</CardDescription>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {daysInMonth.map(date => {
                    const mood = getMoodForDate(date);
                    const entry = getEntryForDate(date);
                    const dayComponent = (
                      <button
                        key={date.toISOString()}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 rounded-lg border transition-all ${
                          selectedDate && isSameDay(date, selectedDate)
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        } ${mood ? moodColors[mood - 1] : ''}`}
                      >
                        <div className="text-sm font-medium">{format(date, 'd')}</div>
                        {mood && (
                          <div className="text-lg mt-1">{moodEmojis[mood - 1]}</div>
                        )}
                      </button>
                    );

                    if (entry) {
                      return (
                        <Tooltip key={date.toISOString()}>
                          <TooltipTrigger asChild>
                            {dayComponent}
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <div className="font-medium">{format(date, 'MMM d')}</div>
                              <div className="text-sm">Mood: {moodLabels[mood! - 1]}</div>
                              <div className="text-sm">Emotions: {entry.emotions.slice(0, 2).join(', ')}</div>
                              <div className="text-xs text-gray-500">1 entry</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return dayComponent;
                  })}
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>

          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>Entry for {format(selectedDate, 'MMMM d, yyyy')}</CardTitle>
                <Badge variant="outline" className="w-fit">Coming Soon: Edit Entry</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Full journal entry details will be displayed here.</p>
                  <p className="text-sm mt-2">Click functionality coming in future update!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Entries Tab */}
        <TabsContent value="entries" className="space-y-6">
          {/* Search & Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search entries by mood, emotions, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Entries List */}
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                      <div>
                        <p className="font-medium text-gray-900">
                          {format(new Date(entry.date), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(entry.date), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedEntry(entry)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{entry.summary}</p>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-medium text-gray-500 mr-2">Emotions:</span>
                      {entry.emotions.map((emotion) => (
                        <Badge key={emotion} variant="secondary" className="text-xs">
                          {emotion}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="text-sm font-medium text-gray-500 mr-2">Context:</span>
                      {entry.contexts.map((context) => (
                        <Badge key={context} variant="outline" className="text-xs">
                          {context}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Entry Detail Modal */}
          {selectedEntry && (
            <Card className="fixed inset-4 z-50 bg-white shadow-xl border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-3xl">{moodEmojis[selectedEntry.mood - 1]}</span>
                    {format(new Date(selectedEntry.date), 'MMMM d, yyyy')}
                  </CardTitle>
                  <Button variant="outline" onClick={() => setSelectedEntry(null)}>
                    Close
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Journal Entry</h4>
                  <p className="text-gray-700">{selectedEntry.fullText}</p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Emotions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.emotions.map((emotion: string) => (
                      <Badge key={emotion} variant="secondary">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Life Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEntry.contexts.map((context: string) => (
                      <Badge key={context} variant="outline">
                        {context}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Badge variant="outline">Coming Soon: Edit this entry</Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
