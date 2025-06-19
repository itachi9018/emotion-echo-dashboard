import React, { useState } from 'react';
import { Building2, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

export type WorkspaceMode = 'personal' | 'organization';

interface WorkspaceSwitcherProps {
  currentMode: WorkspaceMode;
  onModeChange: (mode: WorkspaceMode) => void;
}

const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  currentMode,
  onModeChange,
}) => {
  const { user } = useAuth();

  // Only show workspace switcher for regular users (not admins)
  if (user?.role === 'admin') {
    return null;
  }

  const workspaces = [
    {
      mode: 'personal' as WorkspaceMode,
      label: 'Personal',
      icon: User,
      description: 'Your personal wellness journey',
    },
    {
      mode: 'organization' as WorkspaceMode,
      label: 'Organization',
      icon: Building2,
      description: 'Team wellness overview',
    },
  ];

  const currentWorkspace = workspaces.find(w => w.mode === currentMode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between h-auto p-2 hover:bg-purple-50"
        >
          <div className="flex items-center gap-2 min-w-0">
            {currentWorkspace && (
              <>
                <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0">
                  <currentWorkspace.icon className="w-3 h-3 text-purple-600" />
                </div>
                <div className="text-left min-w-0">
                  <p className="text-sm font-medium text-purple-900 truncate">
                    {currentWorkspace.label}
                  </p>
                  <p className="text-xs text-purple-600 truncate">
                    {currentWorkspace.description}
                  </p>
                </div>
              </>
            )}
          </div>
          <ChevronDown className="w-4 h-4 text-purple-600 flex-shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white" align="start">
        {workspaces.map((workspace) => (
          <DropdownMenuItem
            key={workspace.mode}
            onClick={() => onModeChange(workspace.mode)}
            className={`p-3 cursor-pointer ${
              currentMode === workspace.mode
                ? 'bg-purple-50 text-purple-900'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <workspace.icon className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{workspace.label}</p>
                <p className="text-xs text-gray-600">{workspace.description}</p>
              </div>
              {currentMode === workspace.mode && (
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkspaceSwitcher;
