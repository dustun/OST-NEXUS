'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Disc, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useComposer, useTracks } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';

export default function ComposerPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: composer, isLoading, error } = useComposer(id);
  const { data: tracks } = useTracks();
  const { play, setQueue } = usePlayerStore();

  const composerTracks = tracks?.filter((t) => t.composers?.some((c) => c.id === id)) || [];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-48 w-full rounded-2xl bg-white/5 mb-6" />
          <div className="h-10 w-3/4 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !composer) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Композитор не найден</h1>
      </div>
    );
  }

  const handlePlayAll = () => {
    if (composerTracks.length > 0) {
      setQueue(composerTracks, 0);
      play(composerTracks[0]);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="section-eyebrow">Композитор</div>
        <h1 className="section-title">{composer.name}</h1>
        <p className="mt-4 max-w-2xl text-white/60">{composer.bio}</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="card-panel border-white/10">
            <div className="flex flex-col items-center p-6">
              <div className="h-24 w-24 rounded-full border-2 border-[#8B5CF6] bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 flex items-center justify-center">
                <Disc className="h-12 w-12 text-[#A78BFA]" />
              </div>
              <h2 className="mt-4 text-xl font-bold text-white">{composer.name}</h2>
              <p className="mt-2 text-sm text-white/50">Композитор</p>
              {composerTracks.length > 0 && (
                <Button onClick={handlePlayAll} className="btn-primary mt-4 w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Воспроизвести все
                </Button>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="card-panel border-white/10">
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
                        <div className="text-xs text-white/50">{track.game?.title || track.title}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40 font-mono">
                        {Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, '0')}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const idx = composerTracks.findIndex((t) => t.id === track.id);
                          setQueue(composerTracks, idx);
                          play(track);
                        }}
                        className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
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
