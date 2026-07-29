'use client';

import { useState, useMemo } from 'react';
import { Play, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTracks } from '@/lib/hooks/use-catalog';
import type { Track } from '@/types';
import { usePlayerStore } from '@/stores/player-store';

export const TracksPage = () => {
  const [search, setSearch] = useState('');
  const { data: tracks, isLoading, error } = useTracks();
  const { play, setQueue } = usePlayerStore();

  const filtered = useMemo(() => {
    if (!tracks) return [];
    if (!search.trim()) return tracks;
    const q = search.toLowerCase();
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.game?.title || '').toLowerCase().includes(q) ||
        t.moods?.some((m) => m.name.toLowerCase().includes(q))
    );
  }, [tracks, search]);

  const handlePlay = (track: Track | undefined) => {
    if (!track || !tracks) return;
    const idx = tracks.findIndex((t) => t.id === track.id);
    setQueue(tracks, idx);
    play(track);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Все саундтреки</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Треки</h1>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <h1 className="text-xl font-bold text-[var(--color-fg)]">Ошибка загрузки треков</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Все саундтреки</p>
      <h1 className="text-2xl font-bold text-[var(--color-fg)] mb-8">Треки</h1>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск треков..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2 max-w-2xl">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[var(--color-muted)] border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-8">
            Ничего не найдено
          </div>
        ) : (
          filtered.map((track, i) => (
            <div
              key={track.id}
              className="flex items-center gap-4 border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-3 hover:border-[var(--color-accent)] transition-colors"
            >
              <span className="text-[var(--color-accent)] text-xs font-bold w-6 text-center">{String(i + 1).padStart(2, '0')}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[var(--color-fg)] text-sm font-bold truncate">{track.title}</p>
                <p className="text-[var(--color-muted)] text-xs">{track.game?.title || track.title}</p>
              </div>
              <div className="hidden md:flex items-center gap-1">
                {track.moods?.slice(0, 2).map((mood) => (
                  <span key={mood.id} className="px-2 py-0.5 border-2 border-[var(--color-accent)] text-[10px] font-bold text-[var(--color-accent)]">
                    {mood.name}
                  </span>
                ))}
              </div>
              <span className="hidden lg:block text-[var(--color-muted)] text-xs font-mono">
                {Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, '0')}
              </span>
              <Button variant="ghost" size="sm" onClick={() => handlePlay(track)} className="text-[var(--color-accent)]">
                ▶
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};