
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Hash } from "lucide-react";

interface TagsInputProps {
  tags: string[];
  tagInput: string;
  onTagInputChange: (value: string) => void;
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

const TagsInput = ({ tags, tagInput, onTagInputChange, onTagAdd, onTagRemove }: TagsInputProps) => {
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const tag = tagInput.trim().replace(/^#/, '');
      if (tag && !tags.includes(tag)) {
        onTagAdd(tag);
      }
    }
  };

  return (
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
          onChange={(e) => onTagInputChange(e.target.value)}
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
                onClick={() => onTagRemove(tag)}
              >
                #{tag} ×
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TagsInput;
