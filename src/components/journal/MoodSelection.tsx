
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const moodEmojis = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "text-red-500" },
  { emoji: "😟", label: "Sad", value: 2, color: "text-orange-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "text-yellow-500" },
  { emoji: "🙂", label: "Happy", value: 4, color: "text-green-500" },
  { emoji: "😄", label: "Very Happy", value: 5, color: "text-emerald-500" },
];

interface MoodSelectionProps {
  selectedMood: number | null;
  onMoodSelect: (mood: number) => void;
}

const MoodSelection = ({ selectedMood, onMoodSelect }: MoodSelectionProps) => {
  return (
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
              onClick={() => onMoodSelect(mood.value)}
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
  );
};

export default MoodSelection;
