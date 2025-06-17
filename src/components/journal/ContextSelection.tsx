
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const contexts = [
  "work", "family", "health", "relationships", "personal", "social",
  "exercise", "sleep", "finances", "hobbies", "travel", "learning"
];

interface ContextSelectionProps {
  selectedContexts: string[];
  onContextToggle: (context: string) => void;
}

const ContextSelection = ({ selectedContexts, onContextToggle }: ContextSelectionProps) => {
  return (
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
              onClick={() => onContextToggle(context)}
            >
              {context}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextSelection;
