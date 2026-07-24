'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tracks } from '@/data/mock';
import { routes } from '@/shared/config';

export function TracksPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="eyebrow">Все саундтреки</div>
        <h1 className="section-title">Треки</h1>
      </div>

      <div className="grid gap-3">
        {tracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Link href={routes.track(track.id)}>
              <Card className="card-glow group cursor-pointer border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all hover:border-white/20">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="text-white/30 font-mono text-xs w-8">{String(i + 1).padStart(2, '0')}</div>
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                    <Music className="h-5 w-5 text-[#a96cff]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-white group-hover:text-[#cf9cff] transition-colors">
                      {track.title}
                    </div>
                    <div className="text-xs text-white/50">{track.game.title}</div>
                  </div>
                  <div className="hidden md:flex items-center gap-2">
                    {track.moods.slice(0, 2).map((mood) => (
                      <span
                        key={mood.id}
                        className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-white/60"
                      >
                        {mood.name}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-white/40 font-mono hidden lg:block">
                    {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                    <Play className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
