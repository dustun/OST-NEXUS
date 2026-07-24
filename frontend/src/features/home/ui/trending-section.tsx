'use client';

import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tracks } from '@/data/mock';
import { routes } from '@/shared/config';

export function TrendingSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Популярное</div>
          <div className="flex items-end justify-between">
            <h2 className="section-title">Трендовые саундтреки</h2>
            <Button variant="ghost" className="text-[#A78BFA] hover:text-white">
              Все треки →
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {tracks.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ x: 4 }}
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
                <Clock className="h-3 w-3" />
                {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
