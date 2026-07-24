'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Play, Disc, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { games } from '@/data/mock';
import { routes } from '@/shared/config';

export default function GamePage() {
  const params = useParams();
  const game = games.find((g) => g.slug === params.slug);

  if (!game) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Игра не найдена</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="eyebrow">Игровой мир</div>
        <h1 className="section-title">{game.title}</h1>
        <p className="mt-4 max-w-2xl text-white/60">{game.description}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="card-glow border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
              <div className="flex h-full items-center justify-center">
                <Disc className="h-24 w-24 text-white/20" />
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {game.releaseDate}
                </span>
                <span>{game.genres.join(' / ')}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="card-glow border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-white">Треки</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {game.tracks.map((track, i) => (
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
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
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
