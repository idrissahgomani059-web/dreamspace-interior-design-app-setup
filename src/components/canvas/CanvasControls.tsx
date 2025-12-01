
import { useCanvas } from '@/contexts/CanvasContext';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export const CanvasControls = () => {
  const { state, setZoom, setPan } = useCanvas();

  const handleZoomIn = () => setZoom(state.zoom * 1.2);
  const handleZoomOut = () => setZoom(state.zoom / 1.2);
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="absolute bottom-4 left-4 flex gap-2 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
      <Button
        size="sm"
        variant="ghost"
        onClick={handleZoomOut}
        title="Zoom Out"
      >
        <ZoomOut className="w-4 h-4" />
      </Button>
      <div className="px-3 py-1 text-sm font-medium flex items-center min-w-[60px] justify-center">
        {Math.round(state.zoom * 100)}%
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={handleZoomIn}
        title="Zoom In"
      >
        <ZoomIn className="w-4 h-4" />
      </Button>
      <div className="w-px bg-border mx-1" />
      <Button
        size="sm"
        variant="ghost"
        onClick={handleResetView}
        title="Reset View"
      >
        <Maximize2 className="w-4 h-4" />
      </Button>
    </div>
  );
};