'use client';

import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { useGames } from '@/lib/hooks/use-catalog';

export const GamesPage = () => {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Каталог</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Игры</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] animate-pulse">
              <div className="aspect-video bg-[var(--color-surface)]" />
              <div className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-[var(--color-surface)]" />
                <div className="h-3 w-1/2 bg-[var(--color-surface)]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <h1 className="text-xl font-bold text-[var(--color-fg)]">Ошибка загрузки игр</h1>
      </div>
    );
  }

  if (!games?.length) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Каталог</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Игры</h1>
        <div className="border-2 border-dashed border-[var(--color-card-border)] p-12 text-center text-[var(--color-muted)]">
          Игры не найдены
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Каталог</p>
      <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Игры</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/games/${game.slug}`}
            className="group block border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] hover:border-[var(--color-accent)] transition-colors no-underline"
          >
            <div className="aspect-video bg-[var(--color-surface)] flex items-center justify-center border-b-2 border-[var(--color-card-border)]">
              <Gamepad2 className="h-12 w-12 text-[var(--color-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
            </div>
            <div className="p-4">
              <h3 className="text-[var(--color-fg)] font-bold text-sm group-hover:text-[var(--color-accent)] transition-colors">
                {game.title}
              </h3>
              <p className="text-[var(--color-muted)] text-xs mt-1">{game.releaseDate}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};