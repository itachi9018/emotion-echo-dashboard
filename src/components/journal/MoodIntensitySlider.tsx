
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface MoodIntensitySliderProps {
  moodIntensity: number[];
  onIntensityChange: (value: number[]) => void;
}

const MoodIntensitySlider = ({ moodIntensity, onIntensityChange }: MoodIntensitySliderProps) => {
  const getMoodIntensityColor = (intensity: number) => {
    if (intensity <= 2) return "from-blue-400 to-blue-600";
    if (intensity <= 4) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  return (
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
            onValueChange={onIntensityChange}
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
  );
};

export default MoodIntensitySlider;
