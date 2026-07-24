'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Play,
  Library,
  Radio,
  Gamepad2,
  Music2,
  Settings,
  Disc3,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
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

  const handleMouseEnter = () => {
    if (isCollapsed && onExpand) {
      onExpand();
    }
  };

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      className="fixed left-0 top-0 z-40 h-screen flex-col border-r border-white/10 bg-[#0B0F1A]/95 backdrop-blur-xl flex"
      style={{ width }}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/5">
        <Link href={routes.home} className="flex items-center gap-3">
          <motion.div
            className="h-10 w-10 flex-shrink-0 rounded-xl border-2 border-[#8B5CF6] bg-gradient-to-br from-[#8B5CF6] to-[#28F0FF] flex items-center justify-center"
            animate={{ boxShadow: ['0 0 12px #8B5CF6', '0 0 30px #8B5CF6', '0 0 12px #8B5CF6'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-white font-bold text-sm">NX</span>
          </motion.div>
          {!isCollapsed && (
            <span className="font-bold text-lg tracking-wider text-white">OST NEXUS</span>
          )}
        </Link>
        {onClose && !isCollapsed && (
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
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
                className={`flex items-center gap-3 rounded-xl transition-all ${
                  isCollapsed ? 'px-3 py-3 justify-center' : 'px-4 py-3'
                } ${
                  isActive
                    ? 'bg-[#8B5CF6]/15 text-[#A78BFA]'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className={`h-6 w-6 ${isCollapsed ? 'mx-auto' : ''}`} />
                {!isCollapsed && (
                  <span className="text-[15px] font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>

        {!isCollapsed && (
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="px-4 mb-3 text-[11px] font-bold text-white/30 uppercase tracking-wider">
              Система
            </div>
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white"
            >
              <Settings className="h-6 w-6" />
              Админ-панель
            </Link>
          </div>
        )}
      </nav>

      {!isCollapsed && (
        <div className="border-t border-white/5 p-4">
          <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#28F0FF]/5 p-4">
            <div className="text-xs font-bold text-white/80 mb-1">NEXUS FM</div>
            <div className="text-[10px] text-white/50 mb-3">Сейчас в эфире</div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#8B5CF6] to-[#28F0FF] flex items-center justify-center">
                <Radio className="h-4 w-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-medium text-white truncate">Пробуждение</div>
                <div className="text-[10px] text-white/50">Nexus Ensemble</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && onExpand && (
        <div className="border-t border-white/5 p-3 flex justify-center">
          <button
            onClick={onExpand}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </aside>
  );
}
