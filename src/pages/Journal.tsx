import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, Clock, Hash, CloudUpload } from "lucide-react";
import { Link } from "react-router-dom";

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-red-500" },
  { emoji: "😟", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-yellow-500" },
  { emoji: "🙂", label: "Happy", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-emerald-500" },
];

const emotions = [
  "happy", "sad", "excited", "anxious", "grateful", "frustrated", 
  "peaceful", "angry", "hopeful", "overwhelmed", "content", "worried"
];

const contexts = [
  "work", "family", "health", "relationships", "personal", "social",
  "exercise", "sleep", "finances", "hobbies", "travel", "learning"
];

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
        // Simulate auto-save
        setIsAutoSaving(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [journalText, selectedMood, selectedEmotions]);

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^#/, '');
      if (tag && !tags.includes(tag)) {
        setTags([...tags, tag]);
        setTagInput('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const getMoodIntensityColor = (intensity: number) => {
    if (intensity <= 2) return "from-blue-400 to-blue-600";
    if (intensity <= 4) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
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

    // Here would be the save logic
    toast({
      title: "Entry Saved! 🎉",
      description: "Your mood and thoughts have been recorded.",
    });

    // Reset form
    setSelectedMood(null);
    setJournalText("");
    setSelectedEmotions([]);
    setSelectedContexts([]);
  };

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center justify-center font-semibold">1</span>
                How's your overall mood today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                {moodEmojis.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`flex flex-col items-center p-4 rounded-xl transition-all ${
                      selectedMood === mood.value
                        ? "bg-purple-100 border-2 border-purple-300 transform scale-110"
                        : "bg-gray-50 border-2 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-3xl mb-2">{mood.emoji}</span>
                    <span className={`text-sm font-medium ${mood.color}`}>{mood.label}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 1.5: Mood Intensity Slider */}
          {selectedMood && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center justify-center font-semibold">1.5</span>
                  How intense is this feeling?
                </CardTitle>
                <CardDescription>Rate the intensity of your current mood</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Slider
                    value={moodIntensity}
                    onValueChange={setMoodIntensity}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Mild</span>
                    <span>Moderate</span>
                    <span>Intense</span>
                  </div>
                  <div className={`h-2 rounded-full bg-gradient-to-r ${getMoodIntensityColor(moodIntensity[0])}`} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Journal Text */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center justify-center font-semibold">2</span>
                What happened today?
              </CardTitle>
              <CardDescription className="text-blue-700 font-medium">
                Share your thoughts, experiences, and feelings from today
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Today I felt... because..."
                value={journalText}
                onChange={(e) => setJournalText(e.target.value)}
                className="min-h-[120px] resize-none bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200"
              />
              <p className="text-xs text-blue-600 mt-2">{journalText.length} characters</p>
            </CardContent>
          </Card>

          {/* Step 2.5: Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5 text-purple-600" />
                Add Tags
              </CardTitle>
              <CardDescription>Tag your entry with hashtags (e.g., #stress, #family)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <input
                type="text"
                placeholder="Type a tag and press Enter..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-purple-100 text-purple-700 cursor-pointer hover:bg-purple-200"
                      onClick={() => removeTag(tag)}
                    >
                      #{tag} ×
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Step 3: Emotions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center justify-center font-semibold">3</span>
                What emotions did you experience?
              </CardTitle>
              <CardDescription>Select all that apply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {emotions.map((emotion) => (
                  <Badge
                    key={emotion}
                    variant={selectedEmotions.includes(emotion) ? "default" : "secondary"}
                    className={`cursor-pointer transition-all ${
                      selectedEmotions.includes(emotion)
                        ? "bg-purple-500 hover:bg-purple-600"
                        : "hover:bg-gray-200"
                    }`}
                    onClick={() => toggleEmotion(emotion)}
                  >
                    {emotion}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 4: Context */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center justify-center font-semibold">4</span>
                What areas of life influenced your mood?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {contexts.map((context) => (
                  <Badge
                    key={context}
                    variant={selectedContexts.includes(context) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      selectedContexts.includes(context)
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : "hover:bg-blue-50"
                    }`}
                    onClick={() => toggleContext(context)}
                  >
                    {context}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

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
                    <span className="text-lg">{moodEmojis[entry.mood - 1].emoji}</span>
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
        </div>
      </div>
    </div>
  );
};

export default Journal;
