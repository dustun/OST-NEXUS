'use client';

import { motion } from 'framer-motion';
import { Radio, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PixelRadio } from '@/components/player/pixel-radio';
import { TrackSearchBar } from '@/components/search/track-search-bar';
import { collections, tracks } from '@/data/mock';
import { usePlayerStore } from '@/stores/player-store';

export function RadioPage() {
  const { play, setQueue, setStation, isPlaying } = usePlayerStore();

  const handlePlayCollection = (collection: (typeof collections)[number]) => {
    const collectionTracks = collection.items.map((item) => item.track);
    const firstTrack = collectionTracks[0];
    if (firstTrack) {
      setQueue(collectionTracks, 0);
      play(firstTrack);
      setStation(collection);
    }
  };

  const radioCollections = collections.filter((c) => c.type === 'radio');

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
          {radioCollections.map((collection, i) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <Card className="card-panel cursor-pointer border-white/10" onClick={() => handlePlayCollection(collection)}>
                <div
                  className="h-20 w-full rounded-t-xl"
                  style={{
                    background: `linear-gradient(135deg, ${collection.color}22, transparent 70%)`,
                  }}
                />
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white">{collection.title}</CardTitle>
                    {collection.isLive && (
                      <span className="flex items-center gap-1 rounded-full border border-[#FF4FD8]/30 bg-[#FF4FD8]/10 px-2 py-0.5 text-[10px] font-bold text-[#FFB6E1]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/60">{collection.description}</p>
                      <div className="mt-1 font-mono text-base font-bold" style={{ color: collection.color }}>
                        {collection.frequency}
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
}
