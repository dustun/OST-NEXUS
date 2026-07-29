'use client';

import React from 'react';
import Link from 'next/link';
import { Music2 } from 'lucide-react';
import { useGames } from '@/lib/hooks/use-catalog';

export const ComposersPage = () => {
  const { data: games } = useGames();

  // Collect unique composers from games
  const composers = React.useMemo(() => {
    const map = new Map<string, { id: string; name: string; count: number }>();
    games?.forEach((game) => {
      game.composers?.forEach((c) => {
        const name = c.name;
        const existing = map.get(name);
        if (existing) {
          existing.count++;
        } else {
          map.set(name, { id: name, name, count: 1 });
        }
      });
    });
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [games]);

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Каталог</p>
      <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Композиторы</h1>

      {composers.length === 0 ? (
        <div className="border-2 border-dashed border-[var(--color-card-border)] p-12 text-center text-[var(--color-muted)]">
          Данные о композиторах пока не загружены
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {composers.map((composer) => (
            <div
              key={composer.id}
              className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 hover:border-[var(--color-accent)] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                  <Music2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-[var(--color-fg)] font-bold text-sm">{composer.name}</h3>
                  <p className="text-[var(--color-muted)] text-xs">{composer.count} {composer.count === 1 ? 'трек' : 'трека'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};