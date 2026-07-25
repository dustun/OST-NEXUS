'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, Library, Gamepad2 } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Главная', icon: Play },
  { href: '/library', label: 'Библиотека', icon: Library },
  { href: '/games', label: 'Игры', icon: Gamepad2 },
  { href: '/radio', label: 'Радио', icon: Radio },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
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
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
        </div>
      </div>
    </header>
  );
}
