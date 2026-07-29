'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, Library, Gamepad2 } from 'lucide-react';
import { routes } from '@/shared/config';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: routes.home, label: 'Главная', icon: Play },
  { href: routes.library, label: 'Библиотека', icon: Library },
  { href: routes.games, label: 'Игры', icon: Gamepad2 },
  { href: routes.radio, label: 'Радио', icon: Radio },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header role="banner" className="sticky top-0 z-40 border-b" style={{ borderColor: 'var(--color-border)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}>
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="sr-only sr-only-focusable">Перейти к контенту</a>

      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-4 py-3">
        <Link href={routes.home} className="flex items-center gap-3" aria-label="OST NEXUS — на главную">
          <motion.div
            className="h-8 w-8 rounded-full border"
            style={{ borderColor: 'var(--color-accent)', background: 'linear-gradient(135deg, rgba(169,108,255,0.25), rgba(86,183,255,0.15))' }}
            animate={{ boxShadow: ['0 0 6px rgba(169,108,255,0.6)', '0 0 12px rgba(169,108,255,0.8)', '0 0 6px rgba(169,108,255,0.6)'] }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
          />
          <span className="font-bold tracking-wider" style={{ color: 'var(--color-accent)' }}>OST NEXUS</span>
        </Link>

        <nav aria-label="Основная навигация">
          <ul className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== routes.home && pathname?.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-none transition-colors ${isActive ? 'text-[var(--color-accent)] border-b-2' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <item.icon className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={routes.admin}
            className="px-3 py-1.5 text-xs font-bold transition-colors"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
          >
            ADMIN
          </Link>
        </div>
      </div>
    </header>
  );
}
