
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hammer, Layers, Sofa, Palette } from 'lucide-react';
import { ToolsTab } from '@/components/sidebar/ToolsTab';
import { FloorsTab } from '@/components/sidebar/FloorsTab';
import { FurnitureTab } from '@/components/sidebar/FurnitureTab';
import { StylesTab } from '@/components/sidebar/StylesTab';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <aside
      className={cn(
        'border-r border-border bg-card transition-all duration-300 flex flex-col',
        isOpen ? 'w-80' : 'w-0 overflow-hidden'
      )}
    >
      <Tabs defaultValue="tools" className="flex-1 flex flex-col">
        <TabsList className="w-full grid grid-cols-4 rounded-none border-b border-border h-12">
          <TabsTrigger value="tools" className="gap-2">
            <Hammer className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="floors" className="gap-2">
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Floors</span>
          </TabsTrigger>
          <TabsTrigger value="furniture" className="gap-2">
            <Sofa className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Items</span>
          </TabsTrigger>
          <TabsTrigger value="styles" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Styles</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="tools" className="m-0">
            <ToolsTab />
          </TabsContent>

          <TabsContent value="floors" className="m-0">
            <FloorsTab />
          </TabsContent>

          <TabsContent value="furniture" className="m-0">
            <FurnitureTab />
          </TabsContent>

          <TabsContent value="styles" className="m-0">
            <StylesTab />
          </TabsContent>
        </div>
      </Tabs>
    </aside>
  );
};