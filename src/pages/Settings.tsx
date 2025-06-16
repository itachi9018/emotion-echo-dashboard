
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Bell, Palette, Link, Download, LogOut, Shield } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-purple-600" />
            Profile
          </CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="" />
              <AvatarFallback className="bg-purple-200 text-purple-700 text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">John Doe</h3>
              <p className="text-gray-600">john@example.com</p>
              <p className="text-sm text-gray-500">Member since January 2024</p>
            </div>
            <Badge variant="outline" className="bg-gray-50">
              Coming Soon: Edit Profile
            </Badge>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <p className="text-gray-900 mt-1">John Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <p className="text-gray-900 mt-1">john@example.com</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" disabled>
              Change Password
            </Button>
            <Button variant="outline" disabled>
              Update Email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-purple-600" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how Emotiq looks and feels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-gray-600">Switch between light and dark themes</p>
            </div>
            <Switch 
              checked={darkMode} 
              onCheckedChange={setDarkMode}
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-600" />
            Notifications
          </CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Daily Reminder</p>
              <p className="text-sm text-gray-600">Get reminded to log your mood each day</p>
            </div>
            <Switch 
              checked={dailyReminder} 
              onCheckedChange={setDailyReminder}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Weekly Report</p>
              <p className="text-sm text-gray-600">Receive a summary of your emotional journey</p>
            </div>
            <Switch 
              checked={weeklyReport} 
              onCheckedChange={setWeeklyReport}
            />
          </div>

          <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
            💡 Reminder time: 8:00 PM daily (Coming soon: Custom time selection)
          </div>
        </CardContent>
      </Card>

      {/* Integrations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link className="w-5 h-5 text-purple-600" />
            Integrations
          </CardTitle>
          <CardDescription>Connect with other apps and services</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-sm">❤️</span>
              </div>
              <div>
                <p className="font-medium">Apple Health</p>
                <p className="text-sm text-gray-600">Sync mood data with Health app</p>
              </div>
            </div>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">📅</span>
              </div>
              <div>
                <p className="font-medium">Google Calendar</p>
                <p className="text-sm text-gray-600">Add mood insights to calendar events</p>
              </div>
            </div>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-sm">🏃</span>
              </div>
              <div>
                <p className="font-medium">Fitness Apps</p>
                <p className="text-sm text-gray-600">Correlate mood with exercise data</p>
              </div>
            </div>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Data & Privacy
          </CardTitle>
          <CardDescription>Manage your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Your Data</p>
              <p className="text-sm text-gray-600">Download all your journal entries and mood data</p>
            </div>
            <Button variant="outline" disabled>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
          
          <Separator />
          
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Data Storage:</strong> Your data is encrypted and stored securely</p>
            <p><strong>Privacy:</strong> We never share your personal information</p>
            <p><strong>Retention:</strong> Data is kept as long as your account is active</p>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Coming Soon:</strong> Advanced privacy controls, data deletion options, and granular export features.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Account Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600">Account Actions</CardTitle>
          <CardDescription>Manage your account status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          
          <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
            Need to delete your account? Contact support at support@emotiq.app
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
