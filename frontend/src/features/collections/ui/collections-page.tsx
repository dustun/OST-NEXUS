'use client';

import { motion } from 'framer-motion';
import { FolderOpen, Radio } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/types';
import { useCollections } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';

export function CollectionsPage() {
  const { data: collections, isLoading, error } = useCollections();
  const { play, setQueue, setStation } = usePlayerStore();

  const handlePlayCollection = (collection: Collection | undefined) => {
    if (!collection) return;
    const collectionTracks = collection.items?.map((item) => item.track).filter(Boolean) || [];
    const firstTrack = collectionTracks[0];
    if (firstTrack) {
      setQueue(collectionTracks, 0);
      play(firstTrack);
      setStation(collection);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8">
          <div className="section-eyebrow">Подборки и радио</div>
          <h1 className="section-title">Коллекции</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
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
        <h1 className="text-2xl text-white">Ошибка загрузки коллекций</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="section-eyebrow">Подборки и радио</div>
        <h1 className="section-title">Коллекции</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {collections?.map((collection, i) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="card-panel group cursor-pointer border-white/10" onClick={() => handlePlayCollection(collection)}>
              <div
                className="h-28 w-full rounded-t-xl relative"
                style={{
                  background: `linear-gradient(135deg, ${collection.color || '#8B5CF6'}22, transparent 70%)`,
                }}
              >
                {collection.isLive && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#FF4FD8]/30 bg-[#FF4FD8]/10 px-2 py-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#FFB6E1]">LIVE</span>
                  </div>
                )}
                <div className="absolute bottom-3 left-3">
                  <div className="text-2xl font-bold font-mono lcd-display" style={{ color: collection.color || '#8B5CF6' }}>
                    {collection.frequency || 'PLAYLIST'}
                  </div>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                    {collection.title}
                  </div>
                  {collection.type === 'radio' ? (
                    <Radio className="h-4 w-4 text-white/30" />
                  ) : (
                    <FolderOpen className="h-4 w-4 text-white/30" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-white/60 mb-3 line-clamp-2">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/50">{collection.items?.length || 0} треков</div>
                  <Button size="sm" className="btn-primary text-xs px-3 py-1.5">
                    {collection.isLive ? 'Слушать' : 'Открыть'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
