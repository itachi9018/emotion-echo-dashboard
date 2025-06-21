
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import StatsOverview from '@/components/admin/StatsOverview';
import InsightsCards from '@/components/admin/InsightsCards';
import WeeklyEngagementChart from '@/components/admin/WeeklyEngagementChart';
import EmotionsChart from '@/components/admin/EmotionsChart';
import TeamMoodChart from '@/components/admin/TeamMoodChart';
import WellnessAlerts from '@/components/admin/WellnessAlerts';
import QuickActions from '@/components/admin/QuickActions';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

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
      <StatsOverview />

      {/* Insights & Alerts Row */}
      <InsightsCards />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyEngagementChart />
        <EmotionsChart />
      </div>

      {/* Team Mood Trends & Wellness Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamMoodChart />
        <WellnessAlerts />
      </div>

      {/* Quick Actions */}
      <QuickActions onActionClick={handleQuickAction} />
    </div>
  );
};

export default AdminDashboard;
