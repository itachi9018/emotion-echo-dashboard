
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Eye } from "lucide-react";
import { format } from "date-fns";

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];

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

const EntriesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<any>(null);

  const filteredEntries = mockEntries.filter(entry =>
    entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.emotions.some(emotion => emotion.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default EntriesList;
