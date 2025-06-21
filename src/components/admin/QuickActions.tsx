
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, Users, Calendar, TrendingUp } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Common administrative tasks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-blue-50"
            onClick={() => onActionClick('View Reports')}
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-sm">View Reports</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-green-50"
            onClick={() => onActionClick('Manage Users')}
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Manage Users</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-purple-50"
            onClick={() => onActionClick('Schedule Check-ins')}
          >
            <Calendar className="w-6 h-6" />
            <span className="text-sm">Schedule Check-ins</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-20 flex flex-col gap-2 hover:bg-pink-50"
            onClick={() => onActionClick('Wellness Trends')}
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">Wellness Trends</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
