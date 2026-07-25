
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTracks } from '@/lib/hooks/use-catalog';
import { routes } from '@/shared/config';

export function TrendingSection() {
  const { data: tracks, isLoading, error } = useTracks();
  const trending = tracks?.slice(0, 5) || [];

  if (isLoading || error || !trending.length) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Популярное</div>
            <h2 className="section-title">Тренды</h2>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-14 w-full animate-pulse rounded-lg bg-white/5" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Популярное</div>
          <h2 className="section-title">Тренды</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-3">
            <Card className="card-panel">
              <CardContent className="p-4">
                <div className="space-y-1">
                  {trending.map((track, i) => (
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
                        <div className="text-xs text-white/50 truncate">{track.game?.title || track.title}</div>
                      </div>
                      <div className="hidden md:flex items-center gap-1">
                        {track.moods?.slice(0, 2).map((mood) => (
                          <span key={mood.id} className="tag-mood badge text-[10px]">{mood.name}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        <Link href={routes.track(track.id)}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]">
                            <Play className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
