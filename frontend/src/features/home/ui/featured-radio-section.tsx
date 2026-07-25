
'use client';

import { motion } from 'framer-motion';
import { Radio, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';
import type { Collection } from '@/types';

export function FeaturedRadioSection() {
  const { data: collections, isLoading, error } = useCollections();
  const { play, setQueue, setStation } = usePlayerStore();
  const radioStations = collections?.filter((c) => c.type === 'radio').slice(0, 3) || [];

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Эфир</div>
            <h2 className="section-title">Радио</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-panel animate-pulse">
                <div className="h-32 w-full rounded-t-xl bg-white/5" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !radioStations.length) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Эфир</div>
            <h2 className="section-title">Радио</h2>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-white/40">
            Радиостанции не найдены
          </div>
        </div>
      </section>
    );
  }

  const handlePlay = (station: Collection | undefined) => {
    if (!station) return;
    const tracks = station.items?.map((item) => item.track).filter(Boolean) || [];
    const first = tracks[0];
    if (first) {
      setQueue(tracks, 0);
      play(first);
      setStation(station);
    }
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Эфир</div>
          <h2 className="section-title">Радио</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {radioStations.map((station, i) => (
            <motion.div
              key={station.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="card-panel cursor-pointer border-white/10" onClick={() => handlePlay(station)}>
                <div
                  className="h-32 w-full rounded-t-xl relative"
                  style={{ background: `linear-gradient(135deg, ${station.color || '#8B5CF6'}22, transparent 70%)` }}
                >
                  {station.isLive && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#FF4FD8]/30 bg-[#FF4FD8]/10 px-2 py-0.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
                      <span className="text-[10px] font-bold text-[#FFB6E1]">LIVE</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{station.title}</CardTitle>
                    <Radio className="h-4 w-4 text-white/30" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/60 mb-3 line-clamp-2">{station.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-sm font-bold" style={{ color: station.color || '#8B5CF6' }}>
                      {station.frequency}
                    </div>
                    <Button size="sm" className="btn-primary text-xs px-3 py-1.5">
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
