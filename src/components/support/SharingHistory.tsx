
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, FileText, TrendingUp, Trash2, Eye } from "lucide-react";
import { format } from "date-fns";

const mockSharingHistory = [
  {
    id: 1,
    type: "journal",
    title: "3 Journal Entries",
    recipient: "Dr. Sarah Johnson",
    recipientImage: "",
    sharedAt: new Date("2024-01-15T14:30:00"),
    status: "active",
    itemCount: 3
  },
  {
    id: 2,
    type: "trends",
    title: "Mood Trend Analysis",
    recipient: "Dr. Sarah Johnson",
    recipientImage: "",
    sharedAt: new Date("2024-01-14T10:15:00"),
    status: "active",
    itemCount: 1
  },
  {
    id: 3,
    type: "journal",
    title: "Weekly Journal Summary",
    recipient: "Dr. Michael Rodriguez",
    recipientImage: "",
    sharedAt: new Date("2024-01-10T16:45:00"),
    status: "expired",
    itemCount: 7
  },
  {
    id: 4,
    type: "trends",
    title: "Emotion Frequency Chart",
    recipient: "Dr. Sarah Johnson",
    recipientImage: "",
    sharedAt: new Date("2024-01-08T09:20:00"),
    status: "revoked",
    itemCount: 1
  }
];

const SharingHistory = () => {
  const getTypeIcon = (type: string) => {
    return type === "journal" ? FileText : TrendingUp;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "expired": return "bg-gray-100 text-gray-800";
      case "revoked": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Sharing History
          </CardTitle>
          <CardDescription>
            Track what data you've shared and when
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSharingHistory.map((item) => {
              const Icon = getTypeIcon(item.type);
              
              return (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-5 h-5 text-purple-600" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={item.recipientImage} />
                            <AvatarFallback className="text-xs bg-purple-100 text-purple-700">
                              {item.recipient.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{item.recipient}</span>
                        </div>
                        <span>•</span>
                        <span>{format(item.sharedAt, "MMM dd, yyyy 'at' h:mm a")}</span>
                        <span>•</span>
                        <span>{item.itemCount} {item.itemCount === 1 ? 'item' : 'items'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {item.status === "active" && (
                      <>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {item.status === "expired" && (
                      <Button variant="outline" size="sm">
                        Re-share
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">12</div>
              <div className="text-sm text-gray-600">Total Shares</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">8</div>
              <div className="text-sm text-gray-600">Active Shares</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-gray-600">Connected Professionals</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SharingHistory;
