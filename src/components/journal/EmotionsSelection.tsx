
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const emotions = [
  "happy", "sad", "excited", "anxious", "grateful", "frustrated", 
  "peaceful", "angry", "hopeful", "overwhelmed", "content", "worried"
];

interface EmotionsSelectionProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
}

const EmotionsSelection = ({ selectedEmotions, onEmotionToggle }: EmotionsSelectionProps) => {
  return (
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
              onClick={() => onEmotionToggle(emotion)}
            >
              {emotion}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default EmotionsSelection;
