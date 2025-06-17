
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface JournalTextAreaProps {
  journalText: string;
  onTextChange: (text: string) => void;
}

const JournalTextArea = ({ journalText, onTextChange }: JournalTextAreaProps) => {
  return (
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
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[120px] resize-none bg-white border-blue-200 focus:border-blue-400 focus:ring-blue-200"
        />
        <p className="text-xs text-blue-600 mt-2">{journalText.length} characters</p>
      </CardContent>
    </Card>
  );
};

export default JournalTextArea;
