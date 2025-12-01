
import { useCanvas } from '@/contexts/CanvasContext';
import { Button } from '@/components/ui/button';
import { MousePointer2, Minus, DoorOpen, RectangleHorizontal, Square } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToolsTab = () => {
  const { state, setTool } = useCanvas();

  const tools = [
    { id: 'select', label: 'Select', icon: MousePointer2, description: 'Select and move objects' },
    { id: 'wall', label: 'Wall', icon: Minus, description: 'Draw walls (click to place)' },
    { id: 'door', label: 'Door', icon: DoorOpen, description: 'Place doors' },
    { id: 'window', label: 'Window', icon: RectangleHorizontal, description: 'Place windows' },
    { id: 'room', label: 'Room', icon: Square, description: 'Define room boundaries' },
  ] as const;

  return (
    <div className="p-4 space-y-2">
      <div className="mb-4">
        <h3 className="text-sm font-semibold mb-1">Drawing Tools</h3>
        <p className="text-xs text-muted-foreground">
          Select a tool to start designing your floor plan
        </p>
      </div>

      <div className="space-y-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={state.tool === tool.id ? 'default' : 'outline'}
            className={cn(
              'w-full justify-start gap-3 h-auto py-3',
              state.tool === tool.id && 'bg-gradient-gold text-foreground shadow-gold'
            )}
            onClick={() => setTool(tool.id as any)}
          >
            <tool.icon className="w-5 h-5 flex-shrink-0" />
            <div className="text-left flex-1">
              <div className="font-medium">{tool.label}</div>
              <div className="text-xs opacity-80">{tool.description}</div>
            </div>
          </Button>
        ))}
      </div>

      {state.tool === 'wall' && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-xs font-semibold mb-2">Wall Tool Tips</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Click to place start point</li>
            <li>• Click again to place end point</li>
            <li>• Walls snap to grid automatically</li>
            <li>• Press ESC to cancel</li>
          </ul>
        </div>
      )}
    </div>
  );
};