
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Grid3x3, Ruler } from 'lucide-react';

const Editor = () => {
  return (
    <AppLayout>
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 relative">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Canvas Area */}
        <div className="relative z-10 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <Grid3x3 className="w-10 h-10 text-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Start Your Design
            </h2>
            <p className="text-muted-foreground max-w-md">
              Use the tools on the left to start drawing your floor plan, or choose a template to get started quickly.
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Button className="bg-gradient-gold text-foreground hover:opacity-90 shadow-gold">
              <Ruler className="w-4 h-4 mr-2" />
              Start Drawing
            </Button>
            <Button variant="outline" className="border-2 border-[hsl(var(--gold))]">
              Choose Template
            </Button>
          </div>
        </div>

        {/* Canvas Info */}
        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm border border-border rounded-lg px-4 py-2 text-xs space-y-1">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Zoom:</span>
            <span className="font-medium">100%</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Grid:</span>
            <span className="font-medium">1 ft</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Editor;