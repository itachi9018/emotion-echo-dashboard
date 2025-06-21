
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Activity, AlertTriangle, TrendingUp } from 'lucide-react';

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
}

const StatsOverview = () => {
  const stats: StatItem[] = [
    {
      title: "Total Users",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Active This Week", 
      value: "189",
      change: "+8%",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Wellness Alerts",
      value: "3",
      change: "-25%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      title: "Avg. Mood Score",
      value: "7.2",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
