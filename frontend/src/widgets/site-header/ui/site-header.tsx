'use client';

import Link from 'next/link';
import { routes } from '@/shared/config';

export function SiteHeader() {
  return (
    <header className="topbar">
      <Link className="brand" href={routes.home} aria-label="OST NEXUS, на главную">
        <span className="brand-mark" aria-hidden="true" />
        <span>OST NEXUS</span>
      </Link>
      <nav className="topbar-links" aria-label="Системные ссылки">
        <Link href={routes.library}>Библиотека</Link>
        <Link href={routes.admin}>Админ-панель</Link>
      </nav>
    </header>
  );
}
