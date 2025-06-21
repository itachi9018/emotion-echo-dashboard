
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, TrendingUp, AlertTriangle, Activity, Calendar, BarChart3, MessageSquare, Heart, Brain, Coffee } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
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

  const weeklyEngagementData = [
    { week: 'Week 1', checkins: 89, mood: 7.1, participation: 76 },
    { week: 'Week 2', checkins: 92, mood: 7.3, participation: 82 },
    { week: 'Week 3', checkins: 87, mood: 6.8, participation: 78 },
    { week: 'Week 4', checkins: 94, mood: 7.5, participation: 85 },
    { week: 'Week 5', checkins: 91, mood: 7.2, participation: 83 },
    { week: 'Week 6', checkins: 88, mood: 6.9, participation: 79 },
    { week: 'Week 7', checkins: 85, mood: 6.7, participation: 74 }
  ];

  const emotionData = [
    { emotion: "Grateful", count: 45, color: "#10b981" },
    { emotion: "Focused", count: 38, color: "#3b82f6" },
    { emotion: "Excited", count: 32, color: "#f59e0b" },
    { emotion: "Calm", count: 28, color: "#8b5cf6" },
    { emotion: "Anxious", count: 22, color: "#ef4444" },
    { emotion: "Overwhelmed", count: 18, color: "#f97316" }
  ];

  const teamMoodTrend = [
    { date: '2024-01-01', mood: 7.2, energy: 6.8 },
    { date: '2024-01-02', mood: 7.0, energy: 6.5 },
    { date: '2024-01-03', mood: 6.8, energy: 6.2 },
    { date: '2024-01-04', mood: 6.9, energy: 6.4 },
    { date: '2024-01-05', mood: 7.1, energy: 6.7 },
    { date: '2024-01-06', mood: 7.3, energy: 7.0 },
    { date: '2024-01-07', mood: 7.5, energy: 7.2 }
  ];

  const recentAlerts = [
    { user: "Jane Smith", concern: "Consistent low mood (5 days)", severity: "Medium", time: "2 hours ago", department: "Engineering" },
    { user: "Mike Johnson", concern: "Missed journal entries (7 days)", severity: "Low", time: "1 day ago", department: "Marketing" },
    { user: "Sarah Wilson", concern: "High stress indicators", severity: "High", time: "3 hours ago", department: "Sales" }
  ];

  const insights = [
    {
      type: "warning",
      title: "Team Energy Dip",
      message: "Team energy has dropped 15% this week – Consider a mindfulness challenge",
      action: "Schedule Wellness Activity",
      icon: Coffee,
      color: "border-orange-200 bg-orange-50"
    },
    {
      type: "success",
      title: "High Engagement",
      message: "94% check-in rate this week – Excellent team participation!",
      action: "Send Recognition",
      icon: Heart,
      color: "border-green-200 bg-green-50"
    },
    {
      type: "info",
      title: "Stress Pattern",
      message: "Monday anxiety levels 20% higher – Consider flexible start times",
      action: "Review Schedules",
      icon: Brain,
      color: "border-blue-200 bg-blue-50"
    }
  ];

  const handleQuickAction = (action: string) => {
    console.log(`Executing action: ${action}`);
    // Handle different actions
    switch(action) {
      case 'View Reports':
        // Navigate to reports
        break;
      case 'Manage Users':
        // Navigate to user management
        break;
      case 'Schedule Check-ins':
        // Open scheduling modal
        break;
      case 'Wellness Trends':
        // Navigate to trends
        break;
      default:
        console.log('Action not implemented yet');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Mental wellness overview for your organization</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Welcome, {user?.name}
          </div>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Insights & Alerts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className={`border-2 ${insight.color}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                  <insight.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{insight.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{insight.message}</p>
                  <Button size="sm" variant="outline" className="mt-2 h-7 text-xs">
                    {insight.action}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Weekly Engagement Trends
            </CardTitle>
            <CardDescription>
              Check-in rates and mood scores over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyEngagementData}>
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Area 
                    type="monotone" 
                    dataKey="checkins" 
                    stroke="#3b82f6" 
                    fill="#dbeafe" 
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Most Frequent Emotions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Most Frequent Emotions
            </CardTitle>
            <CardDescription>
              Team emotional patterns this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={emotionData} layout="horizontal">
                  <XAxis type="number" />
                  <YAxis dataKey="emotion" type="category" width={80} />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {emotionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Mood Trends & Wellness Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Mood Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" />
              Team Mood & Energy Trends
            </CardTitle>
            <CardDescription>
              Daily mood and energy levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={teamMoodTrend}>
                  <XAxis dataKey="date" tickFormatter={(date) => new Date(date).getDate().toString()} />
                  <YAxis domain={[6, 8]} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="Mood"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="energy" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    name="Energy"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Wellness Alerts */}
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
      </div>

      {/* Quick Actions */}
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
              onClick={() => handleQuickAction('View Reports')}
            >
              <BarChart3 className="w-6 h-6" />
              <span className="text-sm">View Reports</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover:bg-green-50"
              onClick={() => handleQuickAction('Manage Users')}
            >
              <Users className="w-6 h-6" />
              <span className="text-sm">Manage Users</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover:bg-purple-50"
              onClick={() => handleQuickAction('Schedule Check-ins')}
            >
              <Calendar className="w-6 h-6" />
              <span className="text-sm">Schedule Check-ins</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover:bg-pink-50"
              onClick={() => handleQuickAction('Wellness Trends')}
            >
              <TrendingUp className="w-6 h-6" />
              <span className="text-sm">Wellness Trends</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
