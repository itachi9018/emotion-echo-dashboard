
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, EyeOff, Clock, Lock } from "lucide-react";

interface AccessControlsProps {
  accessLevel: string;
  onAccessLevelChange: (level: string) => void;
}

const AccessControls = ({ accessLevel, onAccessLevelChange }: AccessControlsProps) => {
  const handleFullAccessToggle = (enabled: boolean) => {
    onAccessLevelChange(enabled ? "full" : "partial");
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Main Access Control */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Data Access Level
          </CardTitle>
          <CardDescription>
            Control how much of your emotional data professionals can access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {accessLevel === "full" ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-orange-600" />
              )}
              <div>
                <h3 className="font-medium">
                  {accessLevel === "full" ? "Full Access" : "Partial Access"}
                </h3>
                <p className="text-sm text-gray-600">
                  {accessLevel === "full" 
                    ? "Therapist can view all your data automatically"
                    : "You control what data is shared"
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={accessLevel === "full"}
              onCheckedChange={handleFullAccessToggle}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={accessLevel === "partial" ? "default" : "outline"}>
                  Partial Access
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manual sharing of journal entries</li>
                <li>• Select specific trend data</li>
                <li>• Review before sharing</li>
                <li>• Full control over privacy</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={accessLevel === "full" ? "default" : "outline"}>
                  Full Access
                </Badge>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Automatic data sharing</li>
                <li>• Real-time mood updates</li>
                <li>• Complete trend analysis</li>
                <li>• Enhanced professional insights</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Granular Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Privacy Settings</CardTitle>
          <CardDescription>Fine-tune what information can be accessed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Journal Entries</h4>
                <p className="text-sm text-gray-600">Allow access to written journal content</p>
              </div>
              <Switch defaultChecked={accessLevel === "full"} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Mood Trends</h4>
                <p className="text-sm text-gray-600">Share mood patterns and analytics</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Emotion Tags</h4>
                <p className="text-sm text-gray-600">Include emotion categories and frequencies</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Context Information</h4>
                <p className="text-sm text-gray-600">Share location and activity context</p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">CBT Tool Progress</h4>
                <p className="text-sm text-gray-600">Include therapy exercise completions</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Session Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Session Controls
          </CardTitle>
          <CardDescription>Manage data sharing during therapy sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Live Session Sharing</h4>
                <p className="text-sm text-gray-600">Allow real-time data access during appointments</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Auto-expire Shared Data</h4>
                <p className="text-sm text-gray-600">Automatically remove access after 30 days</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccessControls;
