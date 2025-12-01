
import { AppLayout } from '@/components/layout/AppLayout';
import { CanvasProvider } from '@/contexts/CanvasContext';
import { DrawingCanvas } from '@/components/canvas/DrawingCanvas';
import { CanvasControls } from '@/components/canvas/CanvasControls';
import { CanvasInfo } from '@/components/canvas/CanvasInfo';

const Editor = () => {
  return (
    <CanvasProvider>
      <AppLayout>
        <div className="h-full bg-gradient-to-br from-slate-50 to-slate-100 relative">
          <DrawingCanvas />
          <CanvasControls />
          <CanvasInfo />
        </div>
      </AppLayout>
    </CanvasProvider>
  );
};

export default Editor;