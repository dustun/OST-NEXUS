'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Play,
  Library,
  Radio,
  Gamepad2,
  Music2,
  Disc3,
  FolderOpen,
  X,
} from 'lucide-react';
import { routes } from '@/shared/config';

const navItems = [
  { href: routes.home, label: 'Главная', icon: Play },
  { href: routes.library, label: 'Библиотека', icon: Library },
  { href: routes.games, label: 'Игры', icon: Gamepad2 },
  { href: routes.tracks, label: 'Треки', icon: Music2 },
  { href: routes.radio, label: 'Радио', icon: Radio },
  { href: routes.collections, label: 'Подборки', icon: FolderOpen },
  { href: routes.composers, label: 'Композиторы', icon: Disc3 },
];

interface SidebarProps {
  onClose?: () => void;
  onExpand?: () => void;
  width?: number;
}

export function Sidebar({ onClose, onExpand, width = 256 }: SidebarProps) {
  const pathname = usePathname();
  const isCollapsed = width <= 80;

  return (
    <aside
      role="navigation"
      aria-label="Основная навигация"
      aria-hidden={isCollapsed}
      className="flex flex-col border-r-2"
      style={{ width, borderColor: 'var(--color-border)', background: 'var(--color-bg)' }}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b-2 border-[#333]">
        <Link href={routes.home} className="flex items-center gap-3">
          <div className="h-10 w-10 flex-shrink-0 border-2 border-[#00ff00] bg-[#000] flex items-center justify-center">
            <span className="text-[#00ff00] font-bold text-sm pixel-border">NX</span>
          </div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-wider text-[#00ff00]">OST NEXUS</span>
          )}
        </Link>
        {onClose && !isCollapsed && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center border-2 border-[#333] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#000] transition-all active:translate-x-1 active:translate-y-1"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== routes.home && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 transition-all ${
                  isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
                } ${
                  isActive
                    ? 'border-l-4 border-[var(--color-accent)] bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                    : 'border-l-4 border-transparent text-[var(--color-muted)] hover:bg-[var(--color-accent)]/5 hover:text-[var(--color-accent)]'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className={`h-5 w-5 ${isCollapsed ? 'mx-auto' : ''}`} aria-hidden="true" />
                {!isCollapsed && (
                  <span className="text-[13px] font-medium tracking-wider">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {!isCollapsed && (
        <div className="border-t-2 border-[#333] p-4">
          <div className="border-2 border-[#333] p-4">
            <div className="text-xs font-bold text-[#00ff00] mb-1">NEXUS FM</div>
            <div className="text-[10px] text-[#666] mb-3">Сейчас в эфире</div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 border-2 border-[#00ff00] bg-[#000] flex items-center justify-center">
                <Radio className="h-4 w-4 text-[#00ff00]" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-[#00ff00]">Пробуждение</div>
                <div className="text-[10px] text-[#666]">Nexus Ensemble</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && onExpand && (
        <div className="border-t-2 border-[#333] p-3 flex justify-center">
          <button
            onClick={onExpand}
            className="flex h-9 w-9 items-center justify-center border-2 border-[#333] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#000] transition-all"
          >
            <span className="text-lg leading-none">›</span>
          </button>
        </div>
      )}
    </aside>
  );
}