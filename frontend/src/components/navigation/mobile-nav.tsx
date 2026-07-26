'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Play, Library, Radio, Gamepad2, Music2 } from 'lucide-react';
import { routes } from '@/shared/config';

const navItems = [
  { href: routes.home, label: 'Главная', icon: Play },
  { href: routes.library, label: 'Библиотека', icon: Library },
  { href: routes.games, label: 'Игры', icon: Gamepad2 },
  { href: routes.tracks, label: 'Треки', icon: Music2 },
  { href: routes.radio, label: 'Радио', icon: Radio },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav role="navigation" aria-label="Мобильная навигация" className="fixed bottom-0 left-0 right-0 z-40 border-t" style={{ borderColor: 'var(--color-border)', background: 'rgba(11,15,26,0.95)', backdropFilter: 'blur(6px)' }}>
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-2 px-3 transition-colors ${
                isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <item.icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-active"
                  className="h-0.5 w-4 rounded-full"
                  style={{ background: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
