'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Clock, Disc } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tracks, games } from '@/data/mock';
import { routes } from '@/shared/config';

export function LibraryPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="eyebrow">Ваша коллекция</div>
        <h1 className="section-title">Библиотека</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={routes.game(game.slug)}>
              <Card className="card-glow group cursor-pointer border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 hover:border-white/20">
                <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                  <div className="flex h-full items-center justify-center">
                    <Disc className="h-16 w-16 text-white/20" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-[#cf9cff] transition-colors">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{game.genres.join(' / ')}</span>
                    <span>{game.releaseDate}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-white">Недавние треки</h2>
        <div className="space-y-1">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="track-row cursor-pointer rounded-lg hover:bg-white/5"
            >
              <div className="text-white/30 font-mono text-xs">{String(i + 1).padStart(2, '0')}</div>
              <div>
                <div className="font-medium text-white">{track.title}</div>
                <div className="text-xs text-white/50">{track.game.title}</div>
              </div>
              <div className="text-xs text-white/40 hidden md:block">{track.moods[0]?.name}</div>
              <div className="text-xs text-white/40 font-mono hidden lg:block">
                {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                <Play className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
