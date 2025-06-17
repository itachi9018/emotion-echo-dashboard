
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];
const moodColors = ["bg-red-100", "bg-orange-100", "bg-gray-100", "bg-green-100", "bg-yellow-100"];
const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"];

const mockEntries = [
  {
    id: 1,
    date: "2024-01-07",
    mood: 4,
    emotions: ["happy", "grateful", "motivated"],
  },
  {
    id: 2,
    date: "2024-01-06",
    mood: 3,
    emotions: ["anxious", "determined", "tired"],
  },
  {
    id: 3,
    date: "2024-01-05",
    mood: 5,
    emotions: ["joyful", "peaceful", "grateful", "energized"],
  }
];

const CalendarView = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const currentDate = new Date();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

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
    </div>
  );
};

export default CalendarView;
