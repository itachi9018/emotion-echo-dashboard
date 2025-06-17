
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];

const previousEntries = [
  {
    date: "Yesterday",
    mood: 4,
    text: "Had a productive day at work. Team meeting went well and I felt heard...",
    emotions: ["motivated", "grateful"]
  },
  {
    date: "2 days ago",
    mood: 3,
    text: "Feeling a bit overwhelmed with deadlines, but managed to get through...",
    emotions: ["anxious", "determined"]
  }
];

const RecentEntries = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-600" />
          Recent Entries
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {previousEntries.map((entry, index) => (
          <div key={index} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
              <span className="text-sm font-medium text-gray-700">{entry.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{entry.text}</p>
            <div className="flex gap-1 flex-wrap">
              {entry.emotions.map((emotion) => (
                <Badge key={emotion} variant="outline" className="text-xs">
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>
        ))}
        <Link to="/history">
          <Button variant="outline" className="w-full">
            View All Entries
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default RecentEntries;
