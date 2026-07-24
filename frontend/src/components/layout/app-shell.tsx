'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CassetteDeck } from '@/components/player/cassette-deck';
import { Scanlines, Vignette } from '@/components/effects';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIDEBAR_MIN = 200;
const SIDEBAR_MAX = 400;
const SIDEBAR_DEFAULT = 256;
const MOBILE_SIDEBAR_WIDTH = 256;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const [mobileMounted, setMobileMounted] = useState(false);
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
    setMobileMounted(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
    setMobileMounted(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = sidebarWidth;
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const clamped = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, startWidthRef.current + delta));
      if (Number.isFinite(clamped)) {
        setSidebarWidth(clamped);
      }
    };

    const handleMouseUp = () => {
      resizingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="site-shell relative min-h-screen">
      <div className="retro-grid" />
      <div className="scanlines" />
      <div className="vignette" />

      {/* Desktop sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: sidebarWidth }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed left-0 top-0 z-40 h-screen overflow-hidden"
          >
            <Sidebar width={sidebarWidth} onClose={closeSidebar} />

            {/* Resize handle */}
            <div
              onMouseDown={handleResizeStart}
              className="absolute right-0 top-0 h-full z-50 cursor-ew-resize hover:bg-[#8B5CF6]/50 transition-colors"
              style={{ width: 6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sidebar overlay + drawer */}
      <AnimatePresence>
        {mobileMounted && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeSidebar}
            />
            <motion.div
              key="drawer"
              initial={{ x: -MOBILE_SIDEBAR_WIDTH }}
              animate={{ x: sidebarOpen ? 0 : -MOBILE_SIDEBAR_WIDTH }}
              exit={{ x: -MOBILE_SIDEBAR_WIDTH }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-64 lg:hidden"
            >
              <Sidebar onClose={closeSidebar} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop toggle button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="hidden lg:flex fixed top-4 left-4 z-50 h-9 w-9 text-white/70 hover:text-white"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile top bar */}
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

      {/* Main content area */}
      <main
        className="min-h-screen transition-all duration-300 pb-24 lg:pb-32"
        style={{ marginLeft: sidebarOpen ? sidebarWidth : 0 }}
      >
        {children}
      </main>

      <MobileNav />
      <CassetteDeck />
    </div>
  );
}
