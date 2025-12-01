
import { useRef, useEffect, useState } from 'react';
import { useCanvas } from '@/contexts/CanvasContext';

export const Canvas2D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { state, setPan, setZoom } = useCanvas();
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Save context state
    ctx.save();

    // Apply transformations
    ctx.translate(canvas.width / 2 + state.pan.x, canvas.height / 2 + state.pan.y);
    ctx.scale(state.zoom, state.zoom);

    // Draw grid
    drawGrid(ctx, canvas.width, canvas.height);

    // Draw walls
    const activeFloor = state.floors.find((f) => f.id === state.activeFloorId);
    if (activeFloor) {
      drawWalls(ctx, activeFloor.walls);
    }

    // Restore context state
    ctx.restore();
  }, [state]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = state.gridSize;
    const zoom = state.zoom;
    const pan = state.pan;

    // Calculate visible grid bounds
    const startX = Math.floor((-width / 2 - pan.x) / zoom / gridSize) * gridSize;
    const endX = Math.ceil((width / 2 - pan.x) / zoom / gridSize) * gridSize;
    const startY = Math.floor((-height / 2 - pan.y) / zoom / gridSize) * gridSize;
    const endY = Math.ceil((height / 2 - pan.y) / zoom / gridSize) * gridSize;

    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1 / zoom;

    // Draw vertical lines
    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }

    // Draw horizontal lines
    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }

    // Draw origin
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

  const drawWalls = (ctx: CanvasRenderingContext2D, walls: any[]) => {
    ctx.strokeStyle = 'hsl(var(--foreground))';
    ctx.lineWidth = 8 / state.zoom;
    ctx.lineCap = 'round';

    walls.forEach((wall) => {
      ctx.beginPath();
      ctx.moveTo(wall.start.x, wall.start.y);
      ctx.lineTo(wall.end.x, wall.end.y);
      ctx.stroke();
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.shiftKey)) {
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
    </div>
  );
};