'use client';

import React from 'react';
import { FolderOpen, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/types';
import { useCollections } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';

export const CollectionsPage = () => {
  const { data: collections, isLoading, error } = useCollections();
  const { play, setQueue, setStation } = usePlayerStore();

  const handlePlayCollection = (collection: Collection | undefined) => {
    if (!collection) return;
    const collectionTracks = collection.items?.map((item) => item.track).filter(Boolean) || [];
    const firstTrack = collectionTracks[0];
    if (firstTrack) {
      setQueue(collectionTracks, 0);
      play(firstTrack);
      setStation(collection);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Подборки</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Коллекции</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] animate-pulse">
              <div className="h-28 bg-[var(--color-surface)]" />
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
        <h1 className="text-xl font-bold text-[var(--color-fg)]">Ошибка загрузки коллекций</h1>
      </div>
    );
  }

  if (!collections?.length) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Подборки</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Коллекции</h1>
        <div className="border-2 border-dashed border-[var(--color-card-border)] p-12 text-center text-[var(--color-muted)]">
          Коллекции пока не найдены
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Подборки</p>
      <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Коллекции</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
            onClick={() => handlePlayCollection(collection)}
          >
            <div
              className="h-28 bg-[var(--color-surface)] flex items-end p-3 border-b-2 border-[var(--color-card-border)]"
              style={{
                background: `linear-gradient(135deg, ${collection.color || '#c8a050'}22, transparent 70%)`,
              }}
            >
              {collection.isLive && (
                <div className="flex items-center gap-1.5 rounded border-2 border-[var(--color-error)] bg-[var(--color-error)]/10 px-2 py-0.5">
                  <span className="h-1.5 w-1.5 border-2 border-[var(--color-error)]" />
                  <span className="text-[10px] font-bold text-[var(--color-error)]">LIVE</span>
                </div>
              )}
              <div className="mt-auto">
                <div className="text-lg font-bold font-mono text-[var(--color-accent)] tracking-wider">
                  {collection.frequency || 'PLAYLIST'}
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[var(--color-fg)] font-bold text-sm">{collection.title}</h3>
                {collection.type === 'radio' ? (
                  <Radio className="h-4 w-4 text-[var(--color-muted)]" />
                ) : (
                  <FolderOpen className="h-4 w-4 text-[var(--color-muted)]" />
                )}
              </div>
              <p className="text-xs text-[var(--color-muted)] mb-3 line-clamp-2">{collection.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-muted)]">{collection.items?.length || 0} треков</span>
                <Button variant="ghost" size="sm" className="text-[var(--color-accent)]">
                  {collection.isLive ? '▶ Слушать' : 'Открыть →'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};