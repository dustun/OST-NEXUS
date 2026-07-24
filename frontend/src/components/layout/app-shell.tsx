'use client';

import { useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CassetteDeck } from '@/components/player/cassette-deck';
import { Scanlines, Vignette } from '@/components/effects';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const x = useMotionValue(0);
  const sidebarOpacity = useTransform(x, [0, 260], [1, 0]);
  const sidebarTranslate = useTransform(x, [0, 260], [0, -260]);

  const closeSidebar = useCallback(() => {
    animate(x, 260, { type: 'spring', damping: 25, stiffness: 300 });
    setSidebarOpen(false);
  }, [x]);

  const openSidebar = useCallback(() => {
    animate(x, 0, { type: 'spring', damping: 25, stiffness: 300 });
    setSidebarOpen(true);
  }, [x]);

  return (
    <div className="site-shell relative min-h-screen">
      <div className="retro-grid" />
      <div className="scanlines" />
      <div className="vignette" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        style={{ x, opacity: sidebarOpacity, translate: sidebarTranslate }}
        className="fixed left-0 top-0 z-50 h-screen w-64 lg:hidden"
      >
        <Sidebar />
        <Button
          variant="ghost"
          size="icon"
          onClick={closeSidebar}
          className="absolute top-4 right-4 h-8 w-8 text-white/70 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </motion.div>

      {/* Mobile Header with Menu Button */}
      <div className="lg:hidden sticky top-0 z-30 border-b border-white/5 bg-[#0B0F1A]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={openSidebar}
            className="h-9 w-9 text-white/70 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-bold tracking-wider text-white">OST NEXUS</span>
          <div className="w-9" />
        </div>
      </div>

      <main className="lg:ml-64 pb-24 lg:pb-32">
        {children}
      </main>

      <MobileNav />
      <CassetteDeck />
    </div>
  );
}
