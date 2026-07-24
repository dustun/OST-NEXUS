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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/5 bg-[#0B0F1A]/95 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center border-b border-white/5 px-6">
        <Link href={routes.home} className="flex items-center gap-3">
          <motion.div
            className="h-8 w-8 rounded-full border border-[#8B5CF6] bg-gradient-to-br from-[#8B5CF6] to-[#28F0FF]"
            animate={{ boxShadow: ['0 0 10px #8B5CF6', '0 0 25px #8B5CF6', '0 0 10px #8B5CF6'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-bold tracking-wider text-white">OST NEXUS</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== routes.home && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#8B5CF6]/10 text-[#A78BFA]'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8B5CF6]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-white/5">
          <div className="px-4 mb-3 text-[10px] font-bold text-white/30 uppercase tracking-wider">
            Система
          </div>
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/5 hover:text-white"
          >
            <Settings className="h-5 w-5" />
            Админ-панель
          </Link>
        </div>
      </nav>

      <div className="border-t border-white/5 p-4">
        <div className="rounded-xl border border-white/5 bg-gradient-to-br from-[#8B5CF6]/10 to-[#28F0FF]/5 p-4">
          <div className="text-xs font-bold text-white/80 mb-1">NEXUS FM</div>
          <div className="text-[10px] text-white/50 mb-3">Сейчас в эфире</div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#28F0FF] flex items-center justify-center">
              <Radio className="h-4 w-4 text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-white truncate">Пробуждение</div>
              <div className="text-[10px] text-white/50">Nexus Ensemble</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
