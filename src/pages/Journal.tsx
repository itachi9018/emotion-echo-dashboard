
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, CloudUpload } from "lucide-react";
import { Link } from "react-router-dom";
import MoodSelection from "@/components/journal/MoodSelection";
import MoodIntensitySlider from "@/components/journal/MoodIntensitySlider";
import JournalTextArea from "@/components/journal/JournalTextArea";
import TagsInput from "@/components/journal/TagsInput";
import EmotionsSelection from "@/components/journal/EmotionsSelection";
import ContextSelection from "@/components/journal/ContextSelection";
import RecentEntries from "@/components/journal/RecentEntries";

const Journal = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodIntensity, setMoodIntensity] = useState([3]);
  const [journalText, setJournalText] = useState("");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedContexts, setSelectedContexts] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const { toast } = useToast();

  // Auto-save functionality
  useEffect(() => {
    if (journalText.trim() || selectedMood || selectedEmotions.length > 0) {
      setIsAutoSaving(true);
      const timer = setTimeout(() => {
        setIsAutoSaving(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [journalText, selectedMood, selectedEmotions]);

  const handleTagAdd = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const toggleContext = (context: string) => {
    setSelectedContexts(prev => 
      prev.includes(context) 
        ? prev.filter(c => c !== context)
        : [...prev, context]
    );
  };

  const handleSave = () => {
    if (!selectedMood || !journalText.trim()) {
      toast({
        title: "Incomplete Entry",
        description: "Please select a mood and write something in your journal.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Entry Saved! 🎉",
      description: "Your mood and thoughts have been recorded.",
    });

    // Reset form
    setSelectedMood(null);
    setJournalText("");
    setSelectedEmotions([]);
    setSelectedContexts([]);
    setTags([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Journal Entry</h1>
          <p className="text-gray-600">How are you feeling today?</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Journal Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Mood Selection */}
          <MoodSelection selectedMood={selectedMood} onMoodSelect={setSelectedMood} />

          {/* Step 1.5: Mood Intensity Slider */}
          {selectedMood && (
            <MoodIntensitySlider moodIntensity={moodIntensity} onIntensityChange={setMoodIntensity} />
          )}

          {/* Step 2: Journal Text */}
          <JournalTextArea journalText={journalText} onTextChange={setJournalText} />

          {/* Step 2.5: Tags */}
          <TagsInput 
            tags={tags}
            tagInput={tagInput}
            onTagInputChange={setTagInput}
            onTagAdd={handleTagAdd}
            onTagRemove={handleTagRemove}
          />

          {/* Step 3: Emotions */}
          <EmotionsSelection selectedEmotions={selectedEmotions} onEmotionToggle={toggleEmotion} />

          {/* Step 4: Context */}
          <ContextSelection selectedContexts={selectedContexts} onContextToggle={toggleContext} />

          {/* Step 5: Mood Triggers (Coming Soon) */}
          <Card className="opacity-60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full text-sm flex items-center justify-center font-semibold">5</span>
                Mood Triggers Analysis
                <Badge variant="outline" className="ml-auto">Coming Soon</Badge>
              </CardTitle>
              <CardDescription>AI-powered insights into what triggered your emotions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-500 italic">
                This feature will analyze your journal entries to identify patterns and triggers in your emotional responses.
              </div>
            </CardContent>
          </Card>

          {/* Save Button with Auto-Save Indicator */}
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              size="lg"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Entry
            </Button>
            {isAutoSaving && (
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-2 rounded-full">
                <CloudUpload className="w-4 h-4 animate-pulse" />
                Auto-saving draft...
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Previous Entries */}
        <div className="space-y-4">
          <RecentEntries />
        </div>
      </div>
    </div>
  );
};

export default Journal;
