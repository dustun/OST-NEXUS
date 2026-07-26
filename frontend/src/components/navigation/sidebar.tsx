'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { routes } from '@/shared/config';

interface SidebarProps {
  onClose?: () => void;
  width?: number;
}

const navItems = [
  { href: routes.home, label: 'Home' },
  { href: routes.library, label: 'Library' },
  { href: routes.games, label: 'Games' },
  { href: routes.tracks, label: 'Tracks' },
  { href: routes.radio, label: 'Radio' },
  { href: routes.collections, label: 'Collections' },
  { href: routes.composers, label: 'Composers' },
];

export function Sidebar({ onClose, width = 256 }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="fixed top-0 left-0 z-40 h-screen flex flex-col border-r-2 border-[var(--color-border)] bg-[var(--color-bg)]"
      style={{ width }}
    >
      <div className="flex h-14 items-center justify-between px-4 border-b-2 border-[var(--color-border)]">
        <Link href={routes.home} className="flex items-center gap-2 no-underline">
          <span className="text-[var(--color-accent)] text-xs tracking-widest font-bold">OST</span>
          <span className="text-[var(--color-fg)] text-xs tracking-widest font-bold hidden sm:inline">NEXUS</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-fg)] transition-colors p-1" aria-label="Close sidebar">
            &#x2715;
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className={`block px-3 py-2 text-xs tracking-wider no-underline transition-colors ${
                  pathname === item.href
                    ? 'text-[var(--color-accent)] border-l-2 border-[var(--color-accent)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-fg)]'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t-2 border-[var(--color-border)] p-3">
        <p className="text-[var(--color-muted)] text-[10px] tracking-wider uppercase">v0.1.0</p>
      </div>
    </aside>
  );
}