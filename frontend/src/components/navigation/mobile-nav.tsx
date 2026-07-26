'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/shared/config';

const navItems = [
  { href: routes.home, label: 'Home' },
  { href: routes.library, label: 'Library' },
  { href: routes.games, label: 'Games' },
  { href: routes.tracks, label: 'Tracks' },
  { href: routes.radio, label: 'Radio' },
];

interface MobileNavProps {
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export function MobileNav({ isOpen, onClose, onOpen }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav
      role="navigation"
      aria-label="Мобильная навигация"
      className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-[var(--color-border)] bg-[var(--color-bg)]"
    >
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] tracking-wider no-underline transition-colors ${
                active ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'
              }`}
            >
              <span className="text-sm">{active ? '\u25B6' : '\u25CB'}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={onOpen}
          className="flex flex-col items-center gap-1 px-3 py-1 text-[10px] tracking-wider text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          aria-label="Открыть меню"
        >
          <span className="text-sm">&#9776;</span>
          <span>Menu</span>
        </button>
      </div>
    </nav>
  );
}