
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, Activity } from 'lucide-react';

const TeamWellness = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Team Wellness
        </h1>
        <p className="text-gray-600 mt-1">Overview of your organization's wellness trends</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-green-600">Active this week</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Mood Score</p>
                <p className="text-2xl font-bold">7.2</p>
                <p className="text-sm text-green-600">+0.3 this week</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Check-ins</p>
                <p className="text-2xl font-bold">89%</p>
                <p className="text-sm text-blue-600">Completion rate</p>
              </div>
              <Activity className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Wellness Trends</CardTitle>
          <CardDescription>
            Weekly wellness metrics for your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <TrendingUp className="w-12 h-12 mx-auto mb-4" />
            <p>Wellness trend charts will be displayed here.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamWellness;
