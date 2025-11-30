
import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top Toolbar */}
      <Toolbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} />

        {/* Canvas/Content Area */}
        <main className="flex-1 overflow-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
};