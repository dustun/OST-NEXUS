import Link from 'next/link';
import { routes } from '@/shared/config';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] px-4 py-8">
      <div className="mx-auto max-w-[1600px]">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full border border-[#a96cff]" />
            <span className="text-sm font-bold tracking-wider text-white/80">OST NEXUS</span>
          </div>
          <div className="flex gap-6">
            {[
              { label: 'Игры', href: routes.games },
              { label: 'Треки', href: routes.tracks },
              { label: 'Радио', href: routes.radio },
              { label: 'Композиторы', href: routes.composers },
              { label: 'Библиотека', href: routes.library },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-white/40 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="text-xs text-white/30">
            © 2026 OST NEXUS. Игровые миры продолжают звучать.
          </div>
        </div>
      </div>
    </footer>
  );
}
