
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Calendar, 
  Share2, 
  Shield, 
  Clock, 
  CheckCircle,
  Eye,
  EyeOff
} from "lucide-react";
import ShareJournalEntries from "@/components/support/ShareJournalEntries";
import ShareTrends from "@/components/support/ShareTrends";
import AccessControls from "@/components/support/AccessControls";
import SharingHistory from "@/components/support/SharingHistory";

const Support = () => {
  const [connectedCoach, setConnectedCoach] = useState(null);
  const [accessLevel, setAccessLevel] = useState("partial");
  const { toast } = useToast();

  const handleConnectCoach = () => {
    toast({
      title: "Connection Request Sent",
      description: "Your therapist will receive a notification to connect with you.",
    });
  };

  const mockCoach = {
    name: "Dr. Sarah Johnson",
    specialty: "Cognitive Behavioral Therapy",
    image: "",
    status: "online"
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Professional Support</h1>
        <p className="text-gray-600 mt-1">Connect with coaches and therapists to enhance your mental health journey</p>
      </div>

      <Tabs defaultValue="connect" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connect" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Connect
          </TabsTrigger>
          <TabsTrigger value="share" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Data
          </TabsTrigger>
          <TabsTrigger value="access" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Connect Tab */}
        <TabsContent value="connect" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Current Connection */}
            <Card>
              <CardHeader>
                <CardTitle>Your Support Team</CardTitle>
                <CardDescription>Mental health professionals you're connected with</CardDescription>
              </CardHeader>
              <CardContent>
                {connectedCoach ? (
                  <div className="flex items-center gap-4 p-4 border rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mockCoach.image} />
                      <AvatarFallback className="bg-purple-100 text-purple-700">SJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{mockCoach.name}</h3>
                      <p className="text-sm text-gray-600">{mockCoach.specialty}</p>
                      <Badge variant="outline" className="mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Online
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-semibold text-gray-900 mb-2">No connections yet</h3>
                    <p className="text-gray-600 mb-4">Connect with a mental health professional to get personalized support</p>
                    <Button onClick={handleConnectCoach} className="bg-purple-600 hover:bg-purple-700">
                      Connect with a Therapist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Find Professionals */}
            <Card>
              <CardHeader>
                <CardTitle>Find Professionals</CardTitle>
                <CardDescription>Browse available coaches and therapists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Dr. Michael Rodriguez</h4>
                      <p className="text-sm text-gray-600">Anxiety & Depression Specialist</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-green-100 text-green-700">AL</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Anna Lee, LCSW</h4>
                      <p className="text-sm text-gray-600">Trauma & EMDR Therapy</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    View Profile
                  </Button>
                </div>

                <Button variant="ghost" className="w-full">
                  Browse All Professionals
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Share Data Tab */}
        <TabsContent value="share" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ShareJournalEntries />
            <ShareTrends />
          </div>
        </TabsContent>

        {/* Access Controls Tab */}
        <TabsContent value="access">
          <AccessControls accessLevel={accessLevel} onAccessLevelChange={setAccessLevel} />
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <SharingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
