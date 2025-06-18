
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, TrendingUp, AlertTriangle, Activity, Calendar, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    {
      title: "Total Users",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active This Week", 
      value: "189",
      change: "+8%",
      icon: Activity,
      color: "text-green-600"
    },
    {
      title: "Wellness Alerts",
      value: "3",
      change: "-25%",
      icon: AlertTriangle,
      color: "text-orange-600"
    },
    {
      title: "Avg. Mood Score",
      value: "7.2",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-purple-600"
    }
  ];

  const recentAlerts = [
    { user: "Jane Smith", concern: "Consistent low mood (5 days)", severity: "Medium", time: "2 hours ago" },
    { user: "Mike Johnson", concern: "Missed journal entries (7 days)", severity: "Low", time: "1 day ago" },
    { user: "Sarah Wilson", concern: "High stress indicators", severity: "High", time: "3 hours ago" }
  ];

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
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-green-600">{stat.change} from last month</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wellness Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              Wellness Alerts
            </CardTitle>
            <CardDescription>
              Users who may need additional support
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{alert.user}</p>
                    <p className="text-sm text-gray-600">{alert.concern}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Badge 
                    variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'default' : 'secondary'}
                  >
                    {alert.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Users className="w-6 h-6" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Calendar className="w-6 h-6" />
                <span className="text-sm">Schedule Check-ins</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm">Wellness Trends</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Admin Features */}
      <Card>
        <CardHeader>
          <CardTitle>Organization Insights</CardTitle>
          <CardDescription>
            High-level wellness metrics and trends for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <BarChart3 className="w-12 h-12 mx-auto mb-4" />
            <p>Detailed analytics and reporting features will be available here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
