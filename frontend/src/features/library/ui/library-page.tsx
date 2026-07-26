'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Play, Gamepad2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Track } from '@/types';
import { useTracks, useGames, useMoods } from '@/lib/hooks/use-catalog';
import { routes } from '@/shared/config';
import { usePlayerStore } from '@/stores/player-store';

type FilterType = 'all' | 'game' | 'mood';

export const LibraryPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const { data: tracks, isLoading: tracksLoading } = useTracks();
  const { data: games, isLoading: gamesLoading } = useGames();
  const { data: moods } = useMoods();
  const { play, setQueue } = usePlayerStore();

  const isLoading = tracksLoading || gamesLoading;

  const filtered = useMemo(() => {
    if (!tracks) return [];
    let result = tracks;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.game?.title || '').toLowerCase().includes(q) ||
          t.moods?.some((m) => m.name.toLowerCase().includes(q))
      );
    }
    if (filter === 'game') {
      result = result.filter((t) => t.gameId);
    }
    if (filter === 'mood' && selectedMood) {
      result = result.filter((t) => t.moods?.some((m) => m.id === selectedMood));
    }
    return result;
  }, [tracks, search, filter, selectedMood]);

  const handlePlay = (track: Track | undefined) => {
    if (!track || !tracks) return;
    const idx = tracks.findIndex((t) => t.id === track.id);
    setQueue(tracks, idx);
    play(track);
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
        <div className="mb-8">
          <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Ваша коллекция</p>
          <h1 className="text-2xl font-bold text-[var(--color-fg)]">Библиотека</h1>
        </div>
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[var(--container-max)] px-4 py-8">
      <div className="mb-8">
        <p className="text-[var(--color-accent)] text-xs tracking-widest mb-2 uppercase">Ваша коллекция</p>
        <h1 className="text-2xl font-bold text-[var(--color-fg)]">Библиотека</h1>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск треков, игр, настроений..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'ghost'}
            onClick={() => setFilter('all')}
          >
            Все
          </Button>
          <Button
            variant={filter === 'game' ? 'default' : 'ghost'}
            onClick={() => setFilter('game')}
          >
            <Gamepad2 className="h-4 w-4 mr-1" />
            Игры
          </Button>
        </div>
      </div>

      {filter === 'mood' && moods && (
        <div className="mb-6 flex flex-wrap gap-2">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              className={`px-3 py-1.5 border-2 text-xs font-bold tracking-wider transition-all ${
                selectedMood === mood.id
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] border-[var(--color-accent)]'
                  : 'bg-[var(--color-card-bg)] text-[var(--color-fg)] border-[var(--color-card-border)] hover:border-[var(--color-accent)]'
              }`}
            >
              {mood.name}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-2 max-w-2xl">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-[var(--color-muted)] border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-8">
            {search ? 'Ничего не найдено по вашему запросу' : 'В библиотеке пока нет треков'}
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

      <div className="mt-8 flex flex-wrap gap-4">
        <Button asChild variant="secondary">
          <Link href={routes.tracks}>View All Tracks →</Link>
        </Button>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games && (
          <div className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4">
            <h3 className="text-[var(--color-fg)] font-bold text-sm mb-3">Игры</h3>
            <div className="space-y-3">
              {games.map((game) => (
                <Link
                  key={game.id}
                  href={routes.game(game.slug)}
                  className="flex items-center gap-3 text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors text-sm no-underline"
                >
                  <div className="h-8 w-8 border-2 border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)]">
                    <Gamepad2 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-bold truncate">{game.title}</div>
                    <div className="text-[var(--color-muted)] text-xs">{game.releaseDate}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {moods && (
          <div className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4">
            <h3 className="text-[var(--color-fg)] font-bold text-sm mb-3">Настроения</h3>
            <div className="space-y-3">
              {moods.map((mood) => (
                <button
                  key={mood.id}
                  onClick={() => {
                    setFilter('mood');
                    setSelectedMood(mood.id);
                  }}
                  className="w-full flex items-center gap-3 text-left hover:text-[var(--color-accent)] transition-colors"
                >
                  <div className="h-3 w-3 border-2 border-[var(--color-border)]" style={{ backgroundColor: mood.color }} />
                  <div>
                    <div className="text-sm font-bold text-[var(--color-fg)]">{mood.name}</div>
                    <div className="text-xs text-[var(--color-muted)]">{mood.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4">
          <h3 className="text-[var(--color-fg)] font-bold text-sm mb-2">OST NEXUS</h3>
          <p className="text-xs text-[var(--color-muted)] leading-relaxed">
            Игровая музыкальная станция. Исследуй саундтреки, слушай радио и открывай новые игровые миры.
          </p>
        </div>
      </div>
    </div>
  );
};