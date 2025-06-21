
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MessageSquare } from 'lucide-react';

interface Alert {
  user: string;
  concern: string;
  severity: string;
  time: string;
  department: string;
}

const WellnessAlerts = () => {
  const recentAlerts: Alert[] = [
    { user: "Jane Smith", concern: "Consistent low mood (5 days)", severity: "Medium", time: "2 hours ago", department: "Engineering" },
    { user: "Mike Johnson", concern: "Missed journal entries (7 days)", severity: "Low", time: "1 day ago", department: "Marketing" },
    { user: "Sarah Wilson", concern: "High stress indicators", severity: "High", time: "3 hours ago", department: "Sales" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          Wellness Alerts
        </CardTitle>
        <CardDescription>
          Team members who may need additional support
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentAlerts.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{alert.user}</p>
                  <Badge variant="outline" className="text-xs">{alert.department}</Badge>
                </div>
                <p className="text-sm text-gray-600">{alert.concern}</p>
                <p className="text-xs text-gray-500">{alert.time}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'}
                >
                  {alert.severity}
                </Badge>
                <Button size="sm" variant="ghost">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessAlerts;
