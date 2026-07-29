'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { SiteFooter } from '@/components/layout/site-footer';
import { MobileNav } from '@/components/navigation/mobile-nav';

const SIDEBAR_DEFAULT = 256;
const SIDEBAR_COLLAPSED = 72;

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const effectiveWidth = collapsed ? SIDEBAR_COLLAPSED : sidebarWidth;

  const toggleCollapsed = useCallback(() => {
    setCollapsed(c => !c);
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      resizingRef.current = true;
      startXRef.current = e.clientX;
      startWidthRef.current = sidebarWidth;
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    },
    [sidebarWidth]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingRef.current) return;
      const delta = e.clientX - startXRef.current;
      const base = startWidthRef.current;
      const clamped = Math.min(400, Math.max(72, base + delta));
      if (Number.isFinite(clamped)) {
        setSidebarWidth(clamped);
        if (clamped <= 72) {
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

    if (resizingRef.current) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [resizingRef.current]);

  return (
    <div className="min-h-screen flex bg-[var(--color-bg)] text-[var(--color-fg)]">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex">
        <Sidebar width={effectiveWidth} onClose={toggleCollapsed} />
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-[256px] min-h-screen overflow-y-auto">
        {children}
      </main>

      {/* Mobile nav overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={closeMobile} />
          <Sidebar onClose={closeMobile} />
        </>
      )}

      <MobileNav isOpen={mobileOpen} onClose={closeMobile} onOpen={openMobile} />
      <SiteFooter />
    </div>
  );
}