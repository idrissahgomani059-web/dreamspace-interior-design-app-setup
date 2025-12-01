
import { useCanvas } from '@/contexts/CanvasContext';

export const CanvasInfo = () => {
  const { state } = useCanvas();
  const activeFloor = state.floors.find((f) => f.id === state.activeFloorId);

  return (
    <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-xs space-y-1 shadow-lg">
      <div className="flex justify-between gap-6">
        <span className="text-muted-foreground">Floor:</span>
        <span className="font-medium">{activeFloor?.name}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-muted-foreground">Grid:</span>
        <span className="font-medium">1 {state.gridUnit}</span>
      </div>
      <div className="flex justify-between gap-6">
        <span className="text-muted-foreground">Tool:</span>
        <span className="font-medium capitalize">{state.tool}</span>
      </div>
    </div>
  );
};