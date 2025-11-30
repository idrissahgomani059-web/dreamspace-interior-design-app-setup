
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Menu,
  Save,
  FolderOpen,
  Download,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Settings,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ToolbarProps {
  onToggleSidebar: () => void;
}

export const Toolbar = ({ onToggleSidebar }: ToolbarProps) => {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center px-4 gap-2 shadow-sm">
      {/* Left Section - Menu & Logo */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="text-lg font-bold text-gradient-gold">I.B.A</div>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <h1 className="text-sm font-bold text-foreground">DreamSpace</h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5">Interior Design Studio</p>
          </div>
        </div>
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* Center Section - File Operations */}
      <div className="flex items-center gap-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <FolderOpen className="h-4 w-4" />
              File
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <FolderOpen className="h-4 w-4 mr-2" />
              New Project
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FolderOpen className="h-4 w-4 mr-2" />
              Open Project
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Save className="h-4 w-4 mr-2" />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Save className="h-4 w-4 mr-2" />
              Save As...
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="h-4 w-4 mr-2" />
              Export
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon" title="Save">
          <Save className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* Center Section - Edit Operations */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" title="Undo">
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Redo">
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6 mx-2" />

      {/* Center Section - View Controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" title="Fit to Screen">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right Section - User & Settings */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" title="Settings">
          <Settings className="h-4 w-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Projects</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};