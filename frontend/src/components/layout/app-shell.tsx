'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { Sidebar } from '@/components/navigation/sidebar';
import { MobileNav } from '@/components/navigation/mobile-nav';
import { CassetteDeck } from '@/components/player/cassette-deck';
import { Scanlines, Vignette } from '@/components/effects';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIDEBAR_WIDTH = 256;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileMounted, setMobileMounted] = useState(false);

  const openSidebar = useCallback(() => {
    setOpen(true);
    setMobileMounted(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setOpen(false);
    setMobileMounted(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="site-shell relative min-h-screen">
      <div className="retro-grid" />
      <div className="scanlines" />
      <div className="vignette" />

      {/* Desktop sidebar (persistent, toggleable) */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sidebar overlay + drawer */}
      <AnimatePresence>
        {mobileMounted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={closeSidebar}
            />
            <motion.div
              initial={{ x: -SIDEBAR_WIDTH }}
              animate={{ x: open ? 0 : -SIDEBAR_WIDTH }}
              exit={{ x: -SIDEBAR_WIDTH }}
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
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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

      {/* Main content */}
      <main
        className="min-h-screen transition-all duration-300 pb-24 lg:pb-32"
        style={{ marginLeft: open ? SIDEBAR_WIDTH : 0 }}
      >
        {children}
      </main>

      <MobileNav />
      <CassetteDeck />
    </div>
  );
}
