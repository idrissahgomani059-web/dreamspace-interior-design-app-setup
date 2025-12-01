
import { useState } from 'react';
import { useCanvas } from '@/contexts/CanvasContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Copy, Edit2, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FloorsTab = () => {
  const { state, addFloor, removeFloor, duplicateFloor, renameFloor, setActiveFloor } = useCanvas();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const handleStartEdit = (id: string, currentName: string) => {
    setEditingId(id);
    setEditName(currentName);
  };

  const handleSaveEdit = (id: string) => {
    if (editName.trim()) {
      renameFloor(id, editName.trim());
    }
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-1">Floor Management</h3>
        <p className="text-xs text-muted-foreground">
          Add and manage multiple floors for your building
        </p>
      </div>

      <Button
        className="w-full bg-gradient-gold text-foreground hover:opacity-90 shadow-gold"
        onClick={addFloor}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add New Floor
      </Button>

      <div className="space-y-2">
        {state.floors.map((floor) => (
          <div
            key={floor.id}
            className={cn(
              'p-3 rounded-lg border-2 transition-all',
              floor.id === state.activeFloorId
                ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10'
                : 'border-border hover:border-[hsl(var(--silver))] cursor-pointer'
            )}
            onClick={() => floor.id !== state.activeFloorId && setActiveFloor(floor.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                {editingId === floor.id ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-7 text-sm"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveEdit(floor.id);
                        if (e.key === 'Escape') handleCancelEdit();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveEdit(floor.id);
                      }}
                    >
                      <Check className="w-4 h-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-7 w-7 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelEdit();
                      }}
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="font-medium text-sm">{floor.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Level {floor.level} • {floor.walls.length} walls
                    </div>
                  </div>
                )}
              </div>
              {editingId !== floor.id && state.floors.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFloor(floor.id);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            {floor.id === state.activeFloorId && editingId !== floor.id && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateFloor(floor.id);
                  }}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartEdit(floor.id, floor.name);
                  }}
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Rename
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {state.floors.length >= 5 && (
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> You can design buildings with 5+ floors. Keep adding floors as needed!
          </p>
        </div>
      )}
    </div>
  );
};