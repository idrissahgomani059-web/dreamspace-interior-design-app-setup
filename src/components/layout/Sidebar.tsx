
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Square,
  Circle,
  Minus,
  Move,
  Layers,
  Sofa,
  Palette,
  Eye,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState('tools');

  const drawingTools = [
    { icon: Square, label: 'Rectangle', id: 'rectangle' },
    { icon: Circle, label: 'Circle', id: 'circle' },
    { icon: Minus, label: 'Wall', id: 'wall' },
    { icon: Move, label: 'Move', id: 'move' },
  ];

  const floors = [
    { id: 1, name: 'Ground Floor', active: true },
    { id: 2, name: 'First Floor', active: false },
    { id: 3, name: 'Second Floor', active: false },
  ];

  return (
    <aside
      className={cn(
        'border-r border-border bg-card transition-all duration-300 flex flex-col',
        isOpen ? 'w-80' : 'w-0 overflow-hidden'
      )}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 rounded-none border-b">
          <TabsTrigger value="tools" className="gap-1">
            <Square className="h-4 w-4" />
            <span className="text-xs">Tools</span>
          </TabsTrigger>
          <TabsTrigger value="floors" className="gap-1">
            <Layers className="h-4 w-4" />
            <span className="text-xs">Floors</span>
          </TabsTrigger>
          <TabsTrigger value="furniture" className="gap-1">
            <Sofa className="h-4 w-4" />
            <span className="text-xs">Items</span>
          </TabsTrigger>
          <TabsTrigger value="styles" className="gap-1">
            <Palette className="h-4 w-4" />
            <span className="text-xs">Styles</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          {/* Drawing Tools Tab */}
          <TabsContent value="tools" className="p-4 space-y-4 mt-0">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Drawing Tools</h3>
              <div className="grid grid-cols-2 gap-2">
                {drawingTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant="outline"
                    className="h-20 flex-col gap-2 hover:bg-accent hover:border-[hsl(var(--gold))]"
                  >
                    <tool.icon className="h-6 w-6" />
                    <span className="text-xs">{tool.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Properties</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Width:</span>
                  <span className="font-medium">0 ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Height:</span>
                  <span className="font-medium">0 ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area:</span>
                  <span className="font-medium">0 sq ft</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Floors Tab */}
          <TabsContent value="floors" className="p-4 space-y-4 mt-0">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Floor Management</h3>
              <Button size="sm" className="bg-gradient-gold text-foreground h-7 text-xs">
                Add Floor
              </Button>
            </div>

            <div className="space-y-2">
              {floors.map((floor) => (
                <div
                  key={floor.id}
                  className={cn(
                    'p-3 rounded-lg border-2 cursor-pointer transition-all',
                    floor.active
                      ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10'
                      : 'border-border hover:border-[hsl(var(--silver))]'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4" />
                      <span className="text-sm font-medium">{floor.name}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Show All Floors
              </Button>
            </div>
          </TabsContent>

          {/* Furniture Tab */}
          <TabsContent value="furniture" className="p-4 space-y-4 mt-0">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Furniture Library</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Browse and add furniture items to your design
              </p>
              
              <div className="space-y-2">
                {['Living Room', 'Bedroom', 'Kitchen', 'Bathroom', 'Office'].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="w-full justify-between"
                    size="sm"
                  >
                    <span>{category}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Styles Tab */}
          <TabsContent value="styles" className="p-4 space-y-4 mt-0">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-foreground">Design Styles</h3>
              <div className="grid grid-cols-2 gap-3">
                {['Modern', 'Minimalist', 'Rustic', 'Luxurious', 'Industrial', 'Scandinavian'].map(
                  (style) => (
                    <div
                      key={style}
                      className="aspect-square rounded-lg border-2 border-border hover:border-[hsl(var(--gold))] cursor-pointer transition-all overflow-hidden group"
                    >
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-foreground group-hover:text-[hsl(var(--gold))] transition-colors">
                          {style}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </aside>
  );
};