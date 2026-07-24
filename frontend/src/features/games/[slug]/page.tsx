'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Play, Disc, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { games, tracks } from '@/data/mock';
import { routes } from '@/shared/config';
import { usePlayerStore } from '@/stores/player-store';

export default function GamePage() {
  const params = useParams();
  const game = games.find((g) => g.slug === params.slug);
  const { play, setQueue } = usePlayerStore();

  if (!game) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Игра не найдена</h1>
      </div>
    );
  }

  const gameTracks = tracks.filter((t) => t.gameId === game.id);

  const handlePlayGame = () => {
    if (gameTracks.length > 0) {
      setQueue(gameTracks, 0);
      play(gameTracks[0]);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="section-eyebrow">Игровой мир</div>
        <h1 className="section-title">{game.title}</h1>
        <p className="mt-4 max-w-2xl text-white/60">{game.description}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="card-panel border-white/10">
            <div className="aspect-video w-full rounded-t-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 flex items-center justify-center">
              <Disc className="h-24 w-24 text-white/20" />
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {game.releaseDate}
                  </span>
                  <span>{game.genres.join(' / ')}</span>
                </div>
                <Button onClick={handlePlayGame} className="btn-primary">
                  <Play className="h-4 w-4 mr-2" />
                  Воспроизвести все
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="card-panel border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Треки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {gameTracks.map((track, i) => (
                  <div
                    key={track.id}
                    className="flex items-center justify-between rounded-lg p-3 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/30 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{track.title}</div>
                        <div className="text-xs text-white/50">
                          {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const allTracks = tracks;
                        const idx = allTracks.findIndex((t) => t.id === track.id);
                        setQueue(allTracks, idx);
                        play(track);
                      }}
                      className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
