
import { Home, History, Settings, User, LogOut, Brain, HeartHandshake, Users, TrendingUp, BarChart3 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import WorkspaceSwitcher, { WorkspaceMode } from "./WorkspaceSwitcher";

const personalMenuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Journal",
    url: "/journal",
    icon: Settings,
  },
  {
    title: "CBT Tools",
    url: "/cbt-tools",
    icon: Brain,
  },
  {
    title: "Support",
    url: "/support",
    icon: HeartHandshake,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

const organizationMenuItemsAdmin = [
  {
    title: "Team Overview",
    url: "/admin",
    icon: Users,
  },
  {
    title: "Mood Trends",
    url: "/admin/trends",
    icon: TrendingUp,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: User,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const organizationMenuItemsUser = [
  {
    title: "Team Wellness",
    url: "/team/wellness",
    icon: Users,
  },
  {
    title: "Mood Summary",
    url: "/team/summary",
    icon: TrendingUp,
  },
  {
    title: "Group Check-ins",
    url: "/team/checkins",
    icon: HeartHandshake,
  },
  {
    title: "Peer Insights",
    url: "/team/insights",
    icon: Brain,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  // Initialize workspace mode from localStorage or default to personal
  const [workspaceMode, setWorkspaceMode] = useState<WorkspaceMode>(() => {
    const saved = localStorage.getItem('workspaceMode');
    return (saved as WorkspaceMode) || 'personal';
  });

  // Save workspace mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('workspaceMode', workspaceMode);
  }, [workspaceMode]);

  // Handle workspace mode change and navigation
  const handleWorkspaceModeChange = (mode: WorkspaceMode) => {
    setWorkspaceMode(mode);
    
    // Navigate to appropriate route based on mode
    if (mode === 'organization') {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/team/wellness');
      }
    } else {
      navigate('/');
    }
  };

  // Determine which menu items to show based on workspace mode and user role
  const getMenuItems = () => {
    if (workspaceMode === 'organization') {
      return user?.role === 'admin' ? organizationMenuItemsAdmin : organizationMenuItemsUser;
    }
    return personalMenuItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-purple-100">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <h1 className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Emotiq
            </h1>
            <p className="text-xs text-muted-foreground">Emotional Intelligence Tracker</p>
          </div>
        </div>
        
        <WorkspaceSwitcher 
          currentMode={workspaceMode}
          onModeChange={handleWorkspaceModeChange}
        />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-purple-600 font-semibold">
            {workspaceMode === 'organization' ? 'Organization' : 'Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className={cn(
                      "transition-all duration-200",
                      location.pathname === item.url && "bg-purple-100 text-purple-700 font-medium"
                    )}
                  >
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
          <Avatar className="w-8 h-8">
            <AvatarImage src="" />
            <AvatarFallback className="bg-purple-200 text-purple-700">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-purple-900">{user?.name || 'User'}</p>
            <p className="text-xs text-purple-600 truncate">{user?.email}</p>
          </div>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700" onClick={logout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
