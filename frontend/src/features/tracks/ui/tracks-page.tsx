'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { tracks, games } from '@/data/mock';
import { usePlayerStore } from '@/stores/player-store';

export function TracksPage() {
  const [search, setSearch] = useState('');
  const { play, setQueue } = usePlayerStore();

  const filtered = useMemo(() => {
    if (!search.trim()) return tracks;
    const q = search.toLowerCase();
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.game.title.toLowerCase().includes(q) ||
        t.moods.some((m) => m.name.toLowerCase().includes(q))
    );
  }, [search]);

  const handlePlay = (track: (typeof tracks)[number]) => {
    const idx = tracks.findIndex((t) => t.id === track.id);
    setQueue(tracks, idx);
    play(track);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="section-eyebrow">Все саундтреки</div>
        <h1 className="section-title">Треки</h1>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск треков..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="md:col-span-2 lg:col-span-3">
          <Card className="card-panel">
            <CardContent className="p-4">
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
                      {track.moods.slice(0, 2).map((mood) => (
                        <span key={mood.id} className="tag-mood badge text-[10px]">
                          {mood.name}
                        </span>
                      ))}
                    </div>
                    <div className="hidden lg:flex items-center gap-1 text-xs text-white/40 font-mono">
                      {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
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
        </div>
      </div>
    </div>
  );
}
