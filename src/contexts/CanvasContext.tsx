
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Point {
  x: number;
  y: number;
}

export interface Wall {
  id: string;
  start: Point;
  end: Point;
  thickness: number;
}

export interface Floor {
  id: string;
  name: string;
  level: number;
  walls: Wall[];
}

interface CanvasState {
  zoom: number;
  pan: Point;
  gridSize: number;
  gridUnit: 'ft' | 'm';
  floors: Floor[];
  activeFloorId: string;
  tool: 'select' | 'wall' | 'door' | 'window' | 'room';
}

interface CanvasContextType {
  state: CanvasState;
  setZoom: (zoom: number) => void;
  setPan: (pan: Point) => void;
  setGridSize: (size: number) => void;
  setGridUnit: (unit: 'ft' | 'm') => void;
  addFloor: () => void;
  removeFloor: (id: string) => void;
  setActiveFloor: (id: string) => void;
  setTool: (tool: CanvasState['tool']) => void;
  addWall: (wall: Wall) => void;
  getActiveFloor: () => Floor | undefined;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export const CanvasProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CanvasState>({
    zoom: 1,
    pan: { x: 0, y: 0 },
    gridSize: 40,
    gridUnit: 'ft',
    floors: [
      {
        id: 'floor-1',
        name: 'Ground Floor',
        level: 0,
        walls: [],
      },
    ],
    activeFloorId: 'floor-1',
    tool: 'select',
  });

  const setZoom = (zoom: number) => {
    setState((prev) => ({ ...prev, zoom: Math.max(0.1, Math.min(5, zoom)) }));
  };

  const setPan = (pan: Point) => {
    setState((prev) => ({ ...prev, pan }));
  };

  const setGridSize = (size: number) => {
    setState((prev) => ({ ...prev, gridSize: size }));
  };

  const setGridUnit = (unit: 'ft' | 'm') => {
    setState((prev) => ({ ...prev, gridUnit: unit }));
  };

  const addFloor = () => {
    const newLevel = state.floors.length;
    const newFloor: Floor = {
      id: `floor-${Date.now()}`,
      name: `Floor ${newLevel + 1}`,
      level: newLevel,
      walls: [],
    };
    setState((prev) => ({
      ...prev,
      floors: [...prev.floors, newFloor],
      activeFloorId: newFloor.id,
    }));
  };

  const removeFloor = (id: string) => {
    if (state.floors.length <= 1) return;
    setState((prev) => {
      const newFloors = prev.floors.filter((f) => f.id !== id);
      const newActiveId = prev.activeFloorId === id ? newFloors[0].id : prev.activeFloorId;
      return {
        ...prev,
        floors: newFloors,
        activeFloorId: newActiveId,
      };
    });
  };

  const setActiveFloor = (id: string) => {
    setState((prev) => ({ ...prev, activeFloorId: id }));
  };

  const setTool = (tool: CanvasState['tool']) => {
    setState((prev) => ({ ...prev, tool }));
  };

  const addWall = (wall: Wall) => {
    setState((prev) => ({
      ...prev,
      floors: prev.floors.map((floor) =>
        floor.id === prev.activeFloorId
          ? { ...floor, walls: [...floor.walls, wall] }
          : floor
      ),
    }));
  };

  const getActiveFloor = () => {
    return state.floors.find((f) => f.id === state.activeFloorId);
  };

  return (
    <CanvasContext.Provider
      value={{
        state,
        setZoom,
        setPan,
        setGridSize,
        setGridUnit,
        addFloor,
        removeFloor,
        setActiveFloor,
        setTool,
        addWall,
        getActiveFloor,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const context = useContext(CanvasContext);
  if (!context) {
    throw new Error('useCanvas must be used within CanvasProvider');
  }
  return context;
};