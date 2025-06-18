
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { X, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface ReframeBeliefsModuleProps {
  onComplete: () => void;
  onClose: () => void;
}

const ReframeBeliefsModule = ({ onComplete, onClose }: ReframeBeliefsModuleProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [limitingBelief, setLimitingBelief] = useState("");
  const [beliefStrength, setBeliefStrength] = useState([5]);
  const [evidenceAgainst, setEvidenceAgainst] = useState("");
  const [empoweringBelief, setEmpoweringBelief] = useState("");
  const [newBeliefStrength, setNewBeliefStrength] = useState([5]);

  const steps = [
    {
      title: "Identify Limiting Belief",
      description: "What belief is holding you back?",
      emoji: "🔒"
    },
    {
      title: "Challenge the Belief",
      description: "Find evidence that contradicts this belief",
      emoji: "🔍"
    },
    {
      title: "Create Empowering Belief",
      description: "Replace it with a belief that serves you",
      emoji: "🚀"
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

  const getStrengthEmoji = (value: number) => {
    if (value <= 2) return "💧";
    if (value <= 4) return "🌱";
    if (value <= 6) return "🌊";
    if (value <= 8) return "⚡";
    return "🔥";
  };

  const getStrengthColor = (value: number) => {
    if (value <= 2) return "text-blue-600";
    if (value <= 4) return "text-green-600";
    if (value <= 6) return "text-orange-600";
    if (value <= 8) return "text-red-600";
    return "text-purple-600";
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return limitingBelief.trim().length > 0;
      case 2: return evidenceAgainst.trim().length > 0;
      case 3: return empoweringBelief.trim().length > 0;
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
            <h1 className="text-2xl font-bold text-gray-900">Reframe Beliefs</h1>
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
                  Write down a limiting belief you hold about yourself:
                </label>
                <Textarea
                  value={limitingBelief}
                  onChange={(e) => setLimitingBelief(e.target.value)}
                  placeholder="e.g., 'I'm not good enough' or 'I don't deserve success'"
                  className="min-h-[100px]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How strongly do you believe this? (1-10)
                </label>
                <div className="space-y-4">
                  <Slider
                    value={beliefStrength}
                    onValueChange={setBeliefStrength}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl ${getStrengthColor(beliefStrength[0])}`}>
                      {getStrengthEmoji(beliefStrength[0])}
                    </span>
                    <span className={`text-2xl font-bold ${getStrengthColor(beliefStrength[0])}`}>
                      {beliefStrength[0]}/10
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenge this belief. What evidence contradicts it?
              </label>
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Times when you succeeded or performed well</li>
                  <li>• Compliments or positive feedback you've received</li>
                  <li>• Challenges you've overcome in the past</li>
                  <li>• Your unique strengths and qualities</li>
                </ul>
              </div>
              <Textarea
                value={evidenceAgainst}
                onChange={(e) => setEvidenceAgainst(e.target.value)}
                placeholder="List specific examples that contradict your limiting belief..."
                className="min-h-[120px]"
              />
            </div>
          )}

          {currentStep === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Create an empowering belief to replace the limiting one:
                </label>
                <Textarea
                  value={empoweringBelief}
                  onChange={(e) => setEmpoweringBelief(e.target.value)}
                  placeholder="e.g., 'I am capable of growth and learning' or 'I deserve happiness and success'"
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  How strongly do you believe this new empowering belief? (1-10)
                </label>
                <div className="space-y-4">
                  <Slider
                    value={newBeliefStrength}
                    onValueChange={setNewBeliefStrength}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <span className={`text-4xl ${getStrengthColor(newBeliefStrength[0])}`}>
                      {getStrengthEmoji(newBeliefStrength[0])}
                    </span>
                    <span className={`text-2xl font-bold ${getStrengthColor(newBeliefStrength[0])}`}>
                      {newBeliefStrength[0]}/10
                    </span>
                  </div>
                </div>
              </div>

              {newBeliefStrength[0] >= 6 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Excellent work!</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    You're building a strong foundation with this empowering belief. Practice reinforcing it daily.
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

export default ReframeBeliefsModule;
