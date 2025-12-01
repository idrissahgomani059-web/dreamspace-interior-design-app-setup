
import { useRef, useEffect, useState } from 'react';
import { useCanvas, Point, Wall } from '@/contexts/CanvasContext';

export const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, setPan, setZoom, addWall } = useCanvas();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null);

  const snapToGrid = (point: Point): Point => {
    const gridSize = state.gridSize;
    return {
      x: Math.round(point.x / gridSize) * gridSize,
      y: Math.round(point.y / gridSize) * gridSize,
    };
  };

  const screenToCanvas = (screenX: number, screenY: number): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const x = (screenX - rect.left - canvas.width / 2 - state.pan.x) / state.zoom;
    const y = (screenY - rect.top - canvas.height / 2 - state.pan.y) / state.zoom;
    
    return snapToGrid({ x, y });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2 + state.pan.x, canvas.height / 2 + state.pan.y);
    ctx.scale(state.zoom, state.zoom);

    drawGrid(ctx, canvas.width, canvas.height);
    
    const activeFloor = state.floors.find((f) => f.id === state.activeFloorId);
    if (activeFloor) {
      drawWalls(ctx, activeFloor.walls);
    }

    // Draw current drawing line
    if (drawingStart && currentPoint && state.tool === 'wall') {
      ctx.strokeStyle = 'hsl(var(--gold))';
      ctx.lineWidth = 8 / state.zoom;
      ctx.lineCap = 'round';
      ctx.setLineDash([10 / state.zoom, 5 / state.zoom]);
      ctx.beginPath();
      ctx.moveTo(drawingStart.x, drawingStart.y);
      ctx.lineTo(currentPoint.x, currentPoint.y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw measurement
      const distance = Math.sqrt(
        Math.pow(currentPoint.x - drawingStart.x, 2) + 
        Math.pow(currentPoint.y - drawingStart.y, 2)
      );
      const distanceInUnits = (distance / state.gridSize).toFixed(1);
      const midX = (drawingStart.x + currentPoint.x) / 2;
      const midY = (drawingStart.y + currentPoint.y) / 2;
      
      ctx.fillStyle = 'hsl(var(--gold))';
      ctx.font = `${14 / state.zoom}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${distanceInUnits} ${state.gridUnit}`, midX, midY - 15 / state.zoom);
    }

    // Draw snap point indicator
    if (currentPoint && state.tool === 'wall') {
      ctx.fillStyle = 'hsl(var(--gold))';
      ctx.beginPath();
      ctx.arc(currentPoint.x, currentPoint.y, 4 / state.zoom, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }, [state, drawingStart, currentPoint]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = state.gridSize;
    const zoom = state.zoom;
    const pan = state.pan;

    const startX = Math.floor((-width / 2 - pan.x) / zoom / gridSize) * gridSize;
    const endX = Math.ceil((width / 2 - pan.x) / zoom / gridSize) * gridSize;
    const startY = Math.floor((-height / 2 - pan.y) / zoom / gridSize) * gridSize;
    const endY = Math.ceil((height / 2 - pan.y) / zoom / gridSize) * gridSize;

    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1 / zoom;

    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    ctx.strokeStyle = 'hsl(var(--gold))';
    ctx.lineWidth = 2 / zoom;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();
  };

  const drawWalls = (ctx: CanvasRenderingContext2D, walls: Wall[]) => {
    ctx.strokeStyle = 'hsl(var(--foreground))';
    ctx.lineWidth = 8 / state.zoom;
    ctx.lineCap = 'round';

    walls.forEach((wall) => {
      ctx.beginPath();
      ctx.moveTo(wall.start.x, wall.start.y);
      ctx.lineTo(wall.end.x, wall.end.y);
      ctx.stroke();

      // Draw wall endpoints
      ctx.fillStyle = 'hsl(var(--foreground))';
      ctx.beginPath();
      ctx.arc(wall.start.x, wall.start.y, 4 / state.zoom, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(wall.end.x, wall.end.y, 4 / state.zoom, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (state.tool === 'wall' && e.button === 0 && !e.shiftKey) {
      const point = screenToCanvas(e.clientX, e.clientY);
      if (!drawingStart) {
        setDrawingStart(point);
        setCurrentPoint(point);
      } else {
        // Complete the wall
        const wall: Wall = {
          id: `wall-${Date.now()}`,
          start: drawingStart,
          end: point,
          thickness: 8,
        };
        addWall(wall);
        setDrawingStart(null);
        setCurrentPoint(null);
      }
    } else if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - state.pan.x, y: e.clientY - state.pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    } else if (state.tool === 'wall') {
      const point = screenToCanvas(e.clientX, e.clientY);
      setCurrentPoint(point);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(state.zoom * delta);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setDrawingStart(null);
      setCurrentPoint(null);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getCursor = () => {
    if (isDragging) return 'cursor-grabbing';
    if (state.tool === 'wall') return 'cursor-crosshair';
    return 'cursor-grab';
  };

  return (
    <div
      ref={containerRef}
      className={`w-full h-full relative ${getCursor()}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};