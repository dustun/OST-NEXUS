import Link from 'next/link';
import { routes } from '@/shared/config';

export function SiteFooter() {
  return (
    <footer role="contentinfo" aria-label="Подвал сайта" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)' }} className="px-4 py-8">
      <div className="mx-auto" style={{ maxWidth: 'var(--container-max)' }}>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full" style={{ border: '2px solid var(--color-accent)' }} aria-hidden="true" />
            <span className="text-sm font-bold tracking-wider" style={{ color: 'var(--color-accent)' }}>OST NEXUS</span>
          </div>

          <nav aria-label="Полезные ссылки">
            <ul className="flex gap-6">
              {[
                { label: 'Игры', href: routes.games },
                { label: 'Треки', href: routes.tracks },
                { label: 'Радио', href: routes.radio },
                { label: 'Композиторы', href: routes.composers },
                { label: 'Библиотека', href: routes.library },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
            © 2026 OST NEXUS. Игровые миры продолжают звучать.
          </div>
        </div>
      </div>
    </footer>
  );
}
