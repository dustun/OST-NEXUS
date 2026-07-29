'use client';

import Link from 'next/link';
import { Radio } from 'lucide-react';
import { useCollections } from '@/lib/hooks/use-catalog';

export const RadioPage = () => {
  const { data: collections, isLoading } = useCollections();
  const radioStations = collections?.filter((c) => c.type === 'radio') || [];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Эфир</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Радио</h1>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Эфир</p>
      <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Радио</h1>

      {radioStations.length === 0 ? (
        <div className="border-2 border-dashed border-[var(--color-card-border)] p-12 text-center text-[var(--color-muted)]">
          Радиостанции пока не настроены
        </div>
      ) : (
        <div className="space-y-4 max-w-2xl">
          {radioStations.map((station) => (
            <div
              key={station.id}
              className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 hover:border-[var(--color-accent)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                  <Radio className="h-6 w-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[var(--color-fg)] font-bold text-sm">{station.title}</h3>
                  <p className="text-[var(--color-muted)] text-xs mt-0.5">{station.description}</p>
                </div>
                <span className="text-[var(--color-accent)] text-xs font-bold">▶</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};