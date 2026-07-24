'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Disc, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { composers, tracks } from '@/data/mock';

export default function ComposerPage() {
  const params = useParams();
  const composer = composers.find((c) => c.id === params.id);
  const composerTracks = tracks.filter((t) => t.composers.some((c) => c.id === params.id));

  if (!composer) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Композитор не найден</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="eyebrow">Композитор</div>
        <h1 className="section-title">{composer.name}</h1>
        <p className="mt-4 max-w-2xl text-white/60">{composer.bio}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="card-glow border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <div className="flex flex-col items-center p-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#a96cff] bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                <Disc className="h-12 w-12 text-[#a96cff]" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{composer.name}</h2>
              <p className="mt-2 text-sm text-white/50">Композитор</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="card-glow border-white/10 bg-gradient-to-br from-white/5 to-transparent">
            <CardContent className="p-6">
              <h3 className="mb-4 text-lg font-bold text-white">Треки</h3>
              <div className="space-y-2">
                {composerTracks.map((track, i) => (
                  <div
                    key={track.id}
                    className="flex items-center justify-between rounded-lg p-3 hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/30 font-mono">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <div className="text-sm font-medium text-white">{track.title}</div>
                        <div className="text-xs text-white/50">{track.game.title}</div>
                      </div>
                    </div>
                    <div className="text-xs text-white/40 font-mono">
                      {Math.floor(track.durationSeconds / 60)}:{(track.durationSeconds % 60).toString().padStart(2, '0')}
                    </div>
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
