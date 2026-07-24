'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Play, Clock, Disc } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { tracks, games } from '@/data/mock';

export default function TrackPage() {
  const params = useParams();
  const track = tracks.find((t) => t.id === params.id);

  if (!track) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Трек не найден</h1>
      </div>
    );
  }

  const game = games.find((g) => g.id === track.gameId);

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="eyebrow">Саундтрек</div>
        <h1 className="section-title">{track.title}</h1>
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
              <div className="flex items-center gap-4">
                <Button className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90">
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
                <div>
                  <div className="font-bold text-white">{track.title}</div>
                  <div className="text-sm text-white/50">{game?.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="card-glow border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Игра</div>
                  <div className="text-sm text-white">{game?.title}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Длительность</div>
                  <div className="text-sm text-white font-mono">
                    {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Настроение</div>
                  <div className="flex flex-wrap gap-2">
                    {track.moods.map((mood) => (
                      <span
                        key={mood.id}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                      >
                        {mood.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
