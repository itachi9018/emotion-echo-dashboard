
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Filter, Eye, Edit, Trash2, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

const moodEmojis = ["😢", "😟", "😐", "🙂", "😄"];

const mockEntries = [
  {
    id: 1,
    date: "2024-01-07",
    mood: 4,
    summary: "Had a great day at work. Team meeting went really well and I felt heard during the discussion...",
    emotions: ["happy", "grateful", "motivated"],
    contexts: ["work", "personal"],
    tags: ["productivity", "teamwork"],
    fullText: "Had a great day at work. Team meeting went really well and I felt heard during the discussion. The new project looks exciting and I'm looking forward to the challenges ahead."
  },
  {
    id: 2,
    date: "2024-01-06",
    mood: 3,
    summary: "Feeling a bit overwhelmed with deadlines but managed to get through the day...",
    emotions: ["anxious", "determined", "tired"],
    contexts: ["work", "health"],
    tags: ["stress", "deadlines"],
    fullText: "Feeling a bit overwhelmed with deadlines but managed to get through the day. Need to work on better time management. At least I got my workout in, which helped clear my head."
  },
  {
    id: 3,
    date: "2024-01-05",
    mood: 5,
    summary: "Amazing weekend with family! Went hiking and had such a peaceful time in nature...",
    emotions: ["joyful", "peaceful", "grateful", "energized"],
    contexts: ["family", "exercise", "hobbies"],
    tags: ["family", "nature", "hiking"],
    fullText: "Amazing weekend with family! Went hiking and had such a peaceful time in nature. The kids loved exploring the trails and we saw some beautiful wildlife. Feeling so grateful for these moments."
  },
  {
    id: 4,
    date: "2024-01-04",
    mood: 2,
    summary: "Difficult day dealing with personal issues. Feeling quite down and unmotivated...",
    emotions: ["sad", "frustrated", "lonely"],
    contexts: ["personal", "relationships"],
    tags: ["struggle", "personal"],
    fullText: "Difficult day dealing with personal issues. Feeling quite down and unmotivated. Sometimes life feels overwhelming, but I know this will pass."
  }
];

type FilterType = 'all' | 'positive' | 'negative' | string;
type SortOrder = 'newest' | 'oldest';

const EntriesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  // Get unique tags from all entries
  const allTags = [...new Set(mockEntries.flatMap(entry => entry.tags || []))];

  const filteredAndSortedEntries = mockEntries
    .filter(entry => {
      // Text search filter
      const matchesSearch = entry.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.emotions.some(emotion => emotion.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (entry.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchesSearch) return false;

      // Mood filter
      if (activeFilter === 'positive') return entry.mood >= 4;
      if (activeFilter === 'negative') return entry.mood <= 2;
      if (activeFilter !== 'all') {
        return (entry.tags || []).includes(activeFilter);
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const handleEdit = (entry: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit entry:', entry.id);
    // TODO: Implement edit functionality
  };

  const handleDelete = (entry: any, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Delete entry:', entry.id);
    // TODO: Implement delete functionality
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search entries by mood, emotions, tags, or content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Button 
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            >
              <ArrowUpDown className="w-4 h-4 mr-2" />
              {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
            </Button>
          </div>

          {/* Filter Buttons */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button
                variant={activeFilter === 'positive' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('positive')}
                className="text-green-700 border-green-200 hover:bg-green-50"
              >
                😊 Positive
              </Button>
              <Button
                variant={activeFilter === 'negative' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('negative')}
                className="text-red-700 border-red-200 hover:bg-red-50"
              >
                😔 Negative
              </Button>
            </div>
            
            {/* Tag Filters */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-500">Tags:</span>
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={activeFilter === tag ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveFilter(activeFilter === tag ? 'all' : tag)}
                    className="text-xs"
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredAndSortedEntries.map((entry) => (
          <Card key={entry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">
                        {format(new Date(entry.date), 'MMMM d, yyyy')}
                      </p>
                      <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {format(new Date(entry.date), 'h:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => handleEdit(entry, e)}
                    className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => handleDelete(entry, e)}
                    className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{entry.summary}</p>
              
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-gray-500 mr-2">Emotions:</span>
                  {entry.emotions.map((emotion) => (
                    <Badge key={emotion} variant="secondary" className="text-xs">
                      {emotion}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="text-sm font-medium text-gray-500 mr-2">Context:</span>
                  {entry.contexts.map((context) => (
                    <Badge key={context} variant="outline" className="text-xs">
                      {context}
                    </Badge>
                  ))}
                </div>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    <span className="text-sm font-medium text-gray-500 mr-2">Tags:</span>
                    {entry.tags.map((tag) => (
                      <Badge key={tag} className="text-xs bg-purple-100 text-purple-800">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredAndSortedEntries.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center py-8">
              <p className="text-gray-500">No entries found matching your filters.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Entry Detail Modal */}
      {selectedEntry && (
        <Card className="fixed inset-4 z-50 bg-white shadow-xl border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <span className="text-3xl">{moodEmojis[selectedEntry.mood - 1]}</span>
                {format(new Date(selectedEntry.date), 'MMMM d, yyyy')}
              </CardTitle>
              <Button variant="outline" onClick={() => setSelectedEntry(null)}>
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Journal Entry</h4>
              <p className="text-gray-700">{selectedEntry.fullText}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Emotions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.emotions.map((emotion: string) => (
                  <Badge key={emotion} variant="secondary">
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Life Areas</h4>
              <div className="flex flex-wrap gap-2">
                {selectedEntry.contexts.map((context: string) => (
                  <Badge key={context} variant="outline">
                    {context}
                  </Badge>
                ))}
              </div>
            </div>

            {selectedEntry.tags && selectedEntry.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEntry.tags.map((tag: string) => (
                    <Badge key={tag} className="bg-purple-100 text-purple-800">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t">
              <Badge variant="outline">Coming Soon: Edit this entry</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EntriesList;
