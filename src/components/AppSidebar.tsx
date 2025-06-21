
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
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import WorkspaceSwitcher, { WorkspaceMode } from "./WorkspaceSwitcher";
import SidebarUserProfile from "./sidebar/SidebarUserProfile";
import { 
  personalMenuItems, 
  organizationMenuItemsAdmin, 
  organizationMenuItemsUser 
} from "./sidebar/SidebarMenuItems";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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
        <SidebarUserProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
