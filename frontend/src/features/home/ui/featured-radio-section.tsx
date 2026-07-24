'use client';

import { motion } from 'framer-motion';
import { Radio, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { collections } from '@/data/mock';
import { usePlayerStore } from '@/stores/player-store';

export function FeaturedRadioSection() {
  const { play, setQueue, setStation } = usePlayerStore();
  const radioCollections = collections.filter((c) => c.type === 'radio');

  const handlePlay = (collection: (typeof collections)[number]) => {
    const collectionTracks = collection.items.map((item) => item.track);
    const firstTrack = collectionTracks[0];
    if (firstTrack) {
      setQueue(collectionTracks, 0);
      play(firstTrack);
      setStation(collection);
    }
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Прямой эфир</div>
          <div className="flex items-end justify-between">
            <h2 className="section-title">Радиостанции</h2>
            <Button variant="ghost" className="text-[#A78BFA] hover:text-white">
              Все станции →
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {radioCollections.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="card-panel group cursor-pointer border-white/10" onClick={() => handlePlay(station)}>
                <div
                  className="h-28 w-full rounded-t-xl relative overflow-hidden"
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
                  <div className="absolute bottom-3 left-3">
                    <div className="text-2xl font-bold font-mono lcd-display" style={{ color: station.color }}>
                      {station.frequency}
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                      {station.title}
                    </CardTitle>
                    <Radio className="h-4 w-4 text-white/30" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/60 mb-3">{station.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-white/50">Synthwave / Ambient</div>
                    <Button size="sm" className="btn-primary text-xs px-3 py-1.5">
                      <Play className="h-3 w-3 mr-1" />
                      Слушать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
