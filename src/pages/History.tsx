
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Calendar, List } from "lucide-react";
import TrendsView from "@/components/history/TrendsView";
import CalendarView from "@/components/history/CalendarView";
import EntriesList from "@/components/history/EntriesList";

const History = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Emotional Journey</h1>
        <p className="text-gray-600 mt-1">Track patterns and insights in your mood history</p>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Calendar
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <List className="w-4 h-4" />
            Entries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <TrendsView />
        </TabsContent>

        <TabsContent value="calendar">
          <CalendarView />
        </TabsContent>

        <TabsContent value="entries">
          <EntriesList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
