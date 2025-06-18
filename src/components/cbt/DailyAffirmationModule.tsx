
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, ArrowLeft, ArrowRight, Heart, RefreshCw, CheckCircle } from "lucide-react";

interface DailyAffirmationModuleProps {
  onComplete: () => void;
  onClose: () => void;
}

const DailyAffirmationModule = ({ onComplete, onClose }: DailyAffirmationModuleProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAffirmation, setSelectedAffirmation] = useState("");
  const [personalAffirmation, setPersonalAffirmation] = useState("");
  const [commitment, setCommitment] = useState("");

  const affirmationCategories = [
    { id: 'confidence', label: 'Confidence', emoji: '💪', color: 'bg-blue-100 text-blue-800' },
    { id: 'love', label: 'Self-Love', emoji: '❤️', color: 'bg-pink-100 text-pink-800' },
    { id: 'success', label: 'Success', emoji: '🎯', color: 'bg-green-100 text-green-800' },
    { id: 'peace', label: 'Inner Peace', emoji: '🧘', color: 'bg-purple-100 text-purple-800' },
    { id: 'growth', label: 'Growth', emoji: '🌱', color: 'bg-emerald-100 text-emerald-800' },
    { id: 'resilience', label: 'Resilience', emoji: '🔥', color: 'bg-orange-100 text-orange-800' }
  ];

  const affirmations = {
    confidence: [
      "I believe in my abilities and trust my decisions",
      "I am worthy of respect and kindness",
      "I have the power to create positive change in my life",
      "I am confident in my unique gifts and talents"
    ],
    love: [
      "I love and accept myself exactly as I am",
      "I treat myself with compassion and understanding",
      "I am deserving of love and happiness",
      "I honor my feelings and needs"
    ],
    success: [
      "I am capable of achieving my goals",
      "Success flows to me naturally and easily",
      "I attract opportunities that align with my purpose",
      "I celebrate my progress and achievements"
    ],
    peace: [
      "I am calm, centered, and at peace",
      "I release what I cannot control",
      "I choose peace over worry",
      "I find serenity in the present moment"
    ],
    growth: [
      "I embrace challenges as opportunities to grow",
      "I am constantly learning and evolving",
      "Every experience teaches me something valuable",
      "I am becoming the best version of myself"
    ],
    resilience: [
      "I bounce back from setbacks stronger than before",
      "I have overcome challenges before and I can do it again",
      "I am resilient, strong, and capable",
      "Difficulties help me discover my inner strength"
    ]
  };

  const steps = [
    {
      title: "Choose Your Focus",
      description: "What area of your life needs positive reinforcement?",
      emoji: "🎯"
    },
    {
      title: "Select an Affirmation",
      description: "Pick one that resonates with you today",
      emoji: "✨"
    },
    {
      title: "Make It Personal",
      description: "Create your daily commitment",
      emoji: "💝"
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

  const randomizeAffirmation = () => {
    if (selectedCategory && affirmations[selectedCategory as keyof typeof affirmations]) {
      const categoryAffirmations = affirmations[selectedCategory as keyof typeof affirmations];
      const randomIndex = Math.floor(Math.random() * categoryAffirmations.length);
      setSelectedAffirmation(categoryAffirmations[randomIndex]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedCategory !== "";
      case 2: return selectedAffirmation !== "";
      case 3: return commitment.trim().length > 0;
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
            <h1 className="text-2xl font-bold text-gray-900">Daily Affirmation</h1>
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
            <div className="grid gap-3 md:grid-cols-2">
              {affirmationCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedCategory === category.id
                      ? 'border-purple-300 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.emoji}</span>
                    <div>
                      <Badge className={category.color}>
                        {category.label}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {currentStep === 2 && selectedCategory && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-700">
                  {affirmationCategories.find(c => c.id === selectedCategory)?.label} Affirmations
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={randomizeAffirmation}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Surprise Me
                </Button>
              </div>
              
              <div className="space-y-3">
                {affirmations[selectedCategory as keyof typeof affirmations].map((affirmation, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAffirmation(affirmation)}
                    className={`p-4 rounded-lg border-2 transition-all text-left w-full ${
                      selectedAffirmation === affirmation
                        ? 'border-purple-300 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Heart className={`w-5 h-5 mt-1 ${
                        selectedAffirmation === affirmation ? 'text-purple-600' : 'text-gray-400'
                      }`} />
                      <p className="text-sm leading-relaxed">{affirmation}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <h3 className="font-medium text-purple-900 mb-2">Your Chosen Affirmation</h3>
                <p className="text-lg text-purple-800 italic">"{selectedAffirmation}"</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How will you practice this affirmation today?
                </label>
                <Textarea
                  value={commitment}
                  onChange={(e) => setCommitment(e.target.value)}
                  placeholder="e.g., 'I'll repeat this 3 times in the mirror each morning' or 'I'll write this in my journal tonight'"
                  className="min-h-[100px]"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-amber-800 mb-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Daily Affirmation Tips</span>
                </div>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Say it with feeling and conviction</li>
                  <li>• Repeat it multiple times throughout the day</li>
                  <li>• Visualize yourself embodying this truth</li>
                  <li>• Write it down to reinforce the message</li>
                </ul>
              </div>
            </div>
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

export default DailyAffirmationModule;
