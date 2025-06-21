
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const SidebarUserProfile = () => {
  const { user, logout } = useAuth();

  return (
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
  );
};

export default SidebarUserProfile;
