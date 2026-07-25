'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Play, Clock, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';

export default function CollectionPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: collections } = useCollections();
  const { play, setQueue, setStation, toggleShuffle, isShuffle } = usePlayerStore();

  const collection = collections?.find((c) => c.id === id);

  if (!collection) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Коллекция не найдена</h1>
      </div>
    );
  }

  const collectionTracks = collection.items?.map((item) => item.track).filter(Boolean) || [];

  const handlePlayCollection = () => {
    if (collectionTracks.length > 0) {
      setQueue(collectionTracks, 0);
      play(collectionTracks[0]);
      setStation(collection);
    }
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div
          className="h-48 w-full rounded-2xl relative overflow-hidden mb-6"
          style={{
            background: `linear-gradient(135deg, ${collection.color || '#8B5CF6'}33, transparent 70%)`,
          }}
        >
          {collection.isLive && (
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-[#FF4FD8]/30 bg-[#FF4FD8]/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4FD8] animate-pulse" />
              <span className="text-xs font-bold text-[#FFB6E1]">LIVE</span>
            </div>
          )}
          <div className="absolute bottom-6 left-6">
            <div className="text-4xl font-bold font-mono lcd-display mb-2" style={{ color: collection.color || '#8B5CF6' }}>
              {collection.frequency || 'PLAYLIST'}
            </div>
            <h1 className="text-3xl font-bold text-white">{collection.title}</h1>
            <p className="text-white/60 mt-1">{collection.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                handlePlayCollection();
                toggleShuffle();
              }}
              className={`h-8 w-8 ${isShuffle ? 'text-[#8B5CF6]' : 'text-white/50'}`}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
          <Button onClick={handlePlayCollection} className="btn-primary flex items-center gap-2">
            <Play className="h-4 w-4" />
            {collection.isLive ? 'Слушать эфир' : 'Воспроизвести'}
          </Button>
          <div className="text-sm text-white/50">
            {collection.items?.length || 0} треков
          </div>
        </div>
      </motion.div>

      <div className="grid gap-3">
        {collection.items?.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="track-row"
          >
            <div className="text-white/30 font-mono text-xs">{String(i + 1).padStart(2, '0')}</div>
            <div className="min-w-0">
              <div className="font-medium text-white truncate">{item.track.title}</div>
              <div className="text-xs text-white/50 truncate">{item.track.game?.title || item.track.title}</div>
            </div>
            <div className="hidden md:flex items-center gap-1">
              {item.track.moods?.slice(0, 2).map((mood) => (
                <span key={mood.id} className="tag-mood badge text-[10px]">
                  {mood.name}
                </span>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-1 text-xs text-white/40 font-mono">
              <Clock className="h-3 w-3" />
              {Math.floor(item.track.durationSeconds / 60)}:{String(item.track.durationSeconds % 60).padStart(2, '0')}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  const allTracks = collection.items?.map((ci) => ci.track).filter(Boolean) || [];
                  const idx = allTracks.findIndex((t) => t.id === item.track.id);
                  setQueue(allTracks, idx);
                  play(item.track);
                }}
                className="h-8 w-8 text-white/50 hover:text-[#8B5CF6]"
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
