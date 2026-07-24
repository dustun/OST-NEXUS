'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PixelRadio } from '@/components/player/pixel-radio';
import { TrackSearchBar } from '@/components/search/track-search-bar';
import { useCollections } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';

export const RadioPage = React.memo(function RadioPage() {
  const { play, setQueue, setStation } = usePlayerStore();
  const { data: collections, isLoading, error } = useCollections();

  const radioCollections = collections?.filter((c) => c.type === 'radio') || [];

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8">
          <div className="section-eyebrow">Прямой эфир</div>
          <h1 className="section-title">Радиостанции</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="card-panel animate-pulse">
              <div className="h-28 w-full rounded-t-xl bg-white/5" />
              <div className="p-6">
                <div className="h-5 w-3/4 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <h1 className="text-2xl text-white">Ошибка загрузки радиостанций</h1>
      </div>
    );
  }

  const handlePlayCollection = (collection: (typeof radioCollections)[number]) => {
    const collectionTracks = collection.items?.map((item) => item.track).filter(Boolean) || [];
    const firstTrack = collectionTracks[0];
    if (firstTrack) {
      setQueue(collectionTracks, 0);
      play(firstTrack);
      setStation(collection);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="section-eyebrow">Прямой эфир</div>
        <h1 className="section-title">Радиостанции</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <PixelRadio />
          <div className="mt-6">
            <TrackSearchBar />
          </div>
        </div>

        <div className="grid gap-4">
          {radioCollections.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="card-panel cursor-pointer border-white/10" onClick={() => handlePlayCollection(station)}>
                <div
                  className="h-20 w-full rounded-t-xl"
                  style={{
                    background: `linear-gradient(135deg, ${station.color}22, transparent 70%)`,
                  }}
                >
                  {station.isLive && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#FF4FD8]/30 bg-[#FF4FD8]/10 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#FFB6E1]">LIVE</span>
                    </div>
                  )}
                </div>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{station.description}</p>
                      <div className="mt-1 font-mono text-base font-bold" style={{ color: station.color || '#8B5CF6' }}>
                        {station.frequency}
                      </div>
                    </div>
                    <Button size="icon" className="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90">
                      <Play className="h-4 w-4 ml-0.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});
