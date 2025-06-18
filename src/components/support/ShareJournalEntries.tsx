
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Share2, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

const mockEntries = [
  {
    id: 1,
    date: new Date("2024-01-15"),
    mood: 4,
    preview: "Had a great day at work. Feeling accomplished after completing the project...",
    emotions: ["happy", "proud", "grateful"]
  },
  {
    id: 2,
    date: new Date("2024-01-14"),
    mood: 3,
    preview: "Feeling a bit anxious about tomorrow's presentation. Need to practice more...",
    emotions: ["anxious", "focused"]
  },
  {
    id: 3,
    date: new Date("2024-01-13"),
    mood: 5,
    preview: "Wonderful time with family today. Movie night was exactly what I needed...",
    emotions: ["joyful", "peaceful", "grateful"]
  }
];

const ShareJournalEntries = () => {
  const [selectedEntries, setSelectedEntries] = useState<number[]>([]);
  const { toast } = useToast();

  const handleEntryToggle = (entryId: number) => {
    setSelectedEntries(prev => 
      prev.includes(entryId) 
        ? prev.filter(id => id !== entryId)
        : [...prev, entryId]
    );
  };

  const handleShare = () => {
    if (selectedEntries.length === 0) {
      toast({
        title: "No entries selected",
        description: "Please select at least one journal entry to share.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Entries Shared Successfully",
      description: `${selectedEntries.length} journal entries have been shared with your therapist.`
    });

    setSelectedEntries([]);
  };

  const getMoodEmoji = (mood: number) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"];
    return emojis[mood - 1] || "😐";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Share Journal Entries
        </CardTitle>
        <CardDescription>
          Select specific journal entries to share with your mental health professional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {mockEntries.map((entry) => (
            <div key={entry.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
              <Checkbox
                checked={selectedEntries.includes(entry.id)}
                onCheckedChange={() => handleEntryToggle(entry.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">
                    {format(entry.date, "MMM dd, yyyy")}
                  </span>
                  <span className="text-lg">{getMoodEmoji(entry.mood)}</span>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                  {entry.preview}
                </p>
                <div className="flex flex-wrap gap-1">
                  {entry.emotions.map((emotion) => (
                    <Badge key={emotion} variant="outline" className="text-xs">
                      {emotion}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <span className="text-sm text-gray-600">
            {selectedEntries.length} entries selected
          </span>
          <Button 
            onClick={handleShare}
            disabled={selectedEntries.length === 0}
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

export default ShareJournalEntries;
