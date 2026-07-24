'use client';

import React from 'react';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Gamepad2, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Track } from '@/types';
import { useTracks, useGames, useMoods } from '@/lib/hooks/use-catalog';
import { routes } from '@/shared/config';
import { usePlayerStore } from '@/stores/player-store';

type FilterType = 'all' | 'game' | 'mood';

export const LibraryPage = React.memo(function LibraryPage() {
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
          t.game.title.toLowerCase().includes(q) ||
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
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8">
          <div className="section-eyebrow">Ваша коллекция</div>
          <h1 className="section-title">Библиотека</h1>
        </div>
        <Card className="card-panel">
          <CardContent className="p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 w-full animate-pulse rounded bg-white/5 mb-2" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="section-eyebrow">Ваша коллекция</div>
        <h1 className="section-title">Библиотека</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
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
              className={filter === 'all' ? 'btn-primary' : 'text-white/60 hover:text-white'}
            >
              Все
            </Button>
            <Button
              variant={filter === 'game' ? 'default' : 'ghost'}
              onClick={() => setFilter('game')}
              className={filter === 'game' ? 'btn-primary' : 'text-white/60 hover:text-white'}
            >
              <Gamepad2 className="h-4 w-4 mr-1" />
              Игры
            </Button>
          </div>
        </div>
      </div>

      {filter === 'mood' && moods && (
        <div className="mb-6 flex gap-2">
          {moods.map((mood) => (
            <button
              key={mood.id}
              onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedMood === mood.id
                  ? 'bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/30'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20'
              }`}
            >
              {mood.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-panel md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-white">Треки ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {filtered.map((track, i) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="track-row"
                >
                  <div className="text-white/30 font-mono text-xs">{String(i + 1).padStart(2, '0')}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-white truncate">{track.title}</div>
                    <div className="text-xs text-white/50 truncate">{track.game.title}</div>
                  </div>
                  <div className="hidden md:flex items-center gap-1">
                    {track.moods?.slice(0, 2).map((mood) => (
                      <span key={mood.id} className="tag-mood badge text-[10px]">
                        {mood.name}
                      </span>
                    ))}
                  </div>
                  <div className="hidden lg:flex items-center gap-1 text-xs text-white/40 font-mono">
                    {Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, '0')}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handlePlay(track)}
                      className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {games && (
          <Card className="card-panel">
            <CardHeader>
              <CardTitle className="text-white">Игры</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {games.map((game) => (
                  <Link
                    key={game.id}
                    href={routes.game(game.slug)}
                    className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 flex items-center justify-center">
                      <Gamepad2 className="h-5 w-5 text-white/40" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white truncate">{game.title}</div>
                      <div className="text-xs text-white/50">{game.releaseDate}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {moods && (
          <Card className="card-panel">
            <CardHeader>
              <CardTitle className="text-white">Настроения</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {moods.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      setFilter('mood');
                      setSelectedMood(mood.id);
                    }}
                    className="w-full flex items-center gap-3 rounded-lg p-2 hover:bg-white/5 transition-colors text-left"
                  >
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: mood.color }}
                    />
                    <div>
                      <div className="text-sm font-medium text-white">{mood.name}</div>
                      <div className="text-xs text-white/50">{mood.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="card-panel">
          <CardHeader>
            <CardTitle className="text-white">О платформе</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/60 leading-relaxed">
              OST NEXUS — это игровая музыкальная станция будущего. Исследуй саундтреки, слушай радио и открывай новые игровые миры.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});
