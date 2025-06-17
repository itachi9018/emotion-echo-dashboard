
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts";
import { format } from "date-fns";

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

const TrendsView = () => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default TrendsView;
