'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, Library, Gamepad2 } from 'lucide-react';
import { routes } from '@/shared/config';

const navItems = [
  { href: routes.home, label: 'Главная', icon: Play },
  { href: routes.library, label: 'Библиотека', icon: Library },
  { href: routes.games, label: 'Игры', icon: Gamepad2 },
  { href: routes.radio, label: 'Радио', icon: Radio },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
        <Link href={routes.home} className="flex items-center gap-3">
          <motion.div
            className="h-8 w-8 rounded-full border border-[#a96cff] bg-gradient-to-br from-[#a96cff] to-[#56b7ff]"
            animate={{ boxShadow: ['0 0 10px #a96cff', '0 0 25px #a96cff', '0 0 10px #a96cff'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="font-bold tracking-wider text-white">OST NEXUS</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={routes.admin}
            className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-bold text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            ADMIN
          </Link>
        </div>
      </div>
    </header>
  );
}
