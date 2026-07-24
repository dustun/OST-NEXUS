'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CassetteDeck } from '@/components/player/cassette-deck';
import { Scanlines, Vignette } from '@/components/effects';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIDEBAR_MIN = 72;
const SIDEBAR_MAX = 400;
const SIDEBAR_DEFAULT = 256;
const SIDEBAR_COLLAPSED = 72;
const MOBILE_SIDEBAR_WIDTH = 256;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const [mobileMounted, setMobileMounted] = useState(false);
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const effectiveWidth = collapsed ? SIDEBAR_COLLAPSED : sidebarWidth;

  const openSidebar = useCallback(() => {
    setCollapsed(false);
    setMobileMounted(true);
    setSidebarWidth(SIDEBAR_DEFAULT);
  }, []);

  const collapseSidebar = useCallback(() => {
    setCollapsed(true);
    setSidebarWidth(SIDEBAR_COLLAPSED);
  }, []);

  const expandSidebar = useCallback(() => {
    setCollapsed(false);
    setSidebarWidth(SIDEBAR_DEFAULT);
  }, []);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (collapsed) return;
      e.preventDefault();
      resizingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = sidebarWidth;
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    },
    [collapsed, sidebarWidth]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const base = startWidthRef.current;
      const clamped = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, base + delta));
      if (Number.isFinite(clamped)) {
        setSidebarWidth(clamped);
        if (clamped <= SIDEBAR_MIN) {
          setCollapsed(true);
        } else {
          setCollapsed(false);
        }
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
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: effectiveWidth }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed left-0 top-0 z-40 h-screen overflow-hidden"
          >
            <Sidebar width={effectiveWidth} onClose={collapseSidebar} />

            {/* Resize handle */}
            <div
              onMouseDown={handleResizeStart}
              className="absolute right-0 top-0 h-full z-50 cursor-ew-resize hover:bg-[#8B5CF6]/50 transition-colors"
              style={{ width: 6 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop collapsed sidebar (icons only) */}
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: SIDEBAR_COLLAPSED }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3 }}
            className="hidden lg:block fixed left-0 top-0 z-40 h-screen overflow-hidden"
          >
            <Sidebar width={SIDEBAR_COLLAPSED} onClose={expandSidebar} />
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
              onClick={collapseSidebar}
            />
            <motion.div
              key="drawer"
              initial={{ x: -MOBILE_SIDEBAR_WIDTH }}
              animate={{ x: collapsed ? 0 : -MOBILE_SIDEBAR_WIDTH }}
              exit={{ x: -MOBILE_SIDEBAR_WIDTH }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-screen w-64 lg:hidden"
            >
              <Sidebar onClose={collapseSidebar} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop expand button when collapsed */}
      <AnimatePresence>
        {collapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={expandSidebar}
            className="hidden lg:flex fixed top-4 left-4 z-50 h-9 w-9 text-white/70 hover:text-white"
          >
            <span className="text-lg leading-none">›</span>
          </Button>
        )}
      </AnimatePresence>

      {/* Mobile top bar close button */}
      <div className="lg:hidden sticky top-0 z-30 border-b border-white/5 bg-[#0B0F1A]/90 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="w-9" />
          <span className="font-bold tracking-wider text-white">OST NEXUS</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={collapseSidebar}
            className="h-9 w-9 text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main content area */}
      <main
        className="min-h-screen transition-all duration-300 pb-24 lg:pb-32"
        style={{ marginLeft: effectiveWidth }}
      >
        {children}
      </main>

      <MobileNav />
      <CassetteDeck />
    </div>
  );
}
