
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface ChallengeThoughtsModuleProps {
  onComplete: () => void;
  onClose: () => void;
}

const ChallengeThoughtsModule = ({ onComplete, onClose }: ChallengeThoughtsModuleProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [negativeThought, setNegativeThought] = useState("");
  const [intensity, setIntensity] = useState([5]);
  const [evidence, setEvidence] = useState("");
  const [alternativeThought, setAlternativeThought] = useState("");
  const [newIntensity, setNewIntensity] = useState([5]);

  const steps = [
    {
      title: "Identify the Thought",
      description: "What negative thought is bothering you right now?",
      emoji: "🤔"
    },
    {
      title: "Examine the Evidence",
      description: "What evidence supports or challenges this thought?",
      emoji: "🔍"
    },
    {
      title: "Create a Balanced View",
      description: "What's a more balanced way to think about this?",
      emoji: "⚖️"
    }
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getIntensityEmoji = (value: number) => {
    if (value <= 2) return "😌";
    if (value <= 4) return "😐";
    if (value <= 6) return "😟";
    if (value <= 8) return "😰";
    return "😱";
  };

  const getIntensityColor = (value: number) => {
    if (value <= 2) return "text-green-600";
    if (value <= 4) return "text-yellow-600";
    if (value <= 6) return "text-orange-600";
    if (value <= 8) return "text-red-600";
    return "text-red-800";
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return negativeThought.trim().length > 0;
      case 2: return evidence.trim().length > 0;
      case 3: return alternativeThought.trim().length > 0;
      default: return false;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Challenge Negative Thoughts</h1>
            <p className="text-sm text-gray-600">Step {currentStep} of 3</p>
          </div>
        </div>
        <div className="text-3xl">{steps[currentStep - 1].emoji}</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / 3) * 100}%` }}
        />
      </div>

      {/* Step Content */}
      <Card className="border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            {steps[currentStep - 1].title}
          </CardTitle>
          <p className="text-center text-gray-600">
            {steps[currentStep - 1].description}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Write down the negative thought:
                </label>
                <Textarea
                  value={negativeThought}
                  onChange={(e) => setNegativeThought(e.target.value)}
                  placeholder="e.g., 'I always mess things up' or 'Nobody likes me'"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How intense does this thought feel? (1-10)
                </label>
                <div className="space-y-4">
                  <Slider
                    value={intensity}
                    onValueChange={setIntensity}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl ${getIntensityColor(intensity[0])}`}>
                      {getIntensityEmoji(intensity[0])}
                    </span>
                    <span className={`text-2xl font-bold ${getIntensityColor(intensity[0])}`}>
                      {intensity[0]}/10
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Let's examine this thought. Ask yourself:
              </label>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Is this thought based on facts or feelings?</li>
                  <li>• What evidence supports this thought?</li>
                  <li>• What evidence contradicts it?</li>
                  <li>• Would I tell a friend this same thing?</li>
                </ul>
              </div>
              <Textarea
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
                placeholder="Write your analysis here..."
                className="min-h-[120px]"
              />
            </div>
          )}

          {currentStep === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create a more balanced thought:
                </label>
                <Textarea
                  value={alternativeThought}
                  onChange={(e) => setAlternativeThought(e.target.value)}
                  placeholder="e.g., 'Sometimes I make mistakes, but I also do many things well' or 'Some people might not connect with me, but others do'"
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How intense does the original thought feel now? (1-10)
                </label>
                <div className="space-y-4">
                  <Slider
                    value={newIntensity}
                    onValueChange={setNewIntensity}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl ${getIntensityColor(newIntensity[0])}`}>
                      {getIntensityEmoji(newIntensity[0])}
                    </span>
                    <span className={`text-2xl font-bold ${getIntensityColor(newIntensity[0])}`}>
                      {newIntensity[0]}/10
                    </span>
                  </div>
                </div>
              </div>

              {newIntensity[0] < intensity[0] && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Great progress!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    You've reduced the intensity of this negative thought. This shows the power of challenging unhelpful thinking patterns.
                  </p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          {currentStep === 3 ? 'Complete' : 'Next'}
          {currentStep < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
};

export default ChallengeThoughtsModule;
