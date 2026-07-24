'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Radio,
  X,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Heart,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/stores/player-store';
import { youtubeProvider, soundcloudProvider, directProvider } from '@/lib/audio';
import { Equalizer } from '@/components/ui/equalizer';

function resolveValue(value: number | readonly number[]): number {
  if (typeof value === 'number') return value;
  return (value as unknown as number[])[0];
}

function renderEmbed(source: import('@/types').PlaybackSource | null) {
  if (!source) return null;
  if (source.provider === 'direct' && source.sourceUrl) {
    return (
      <audio
        controls
        autoPlay
        src={source.sourceUrl}
        className="h-8 w-full opacity-90"
      />
    );
  }
  const src =
    source.provider === 'youtube' && source.externalId
      ? youtubeProvider.getEmbedUrl({
          provider: 'youtube',
          externalId: source.externalId,
          sourceUrl: source.sourceUrl,
          isPrimary: source.isPrimary,
          metadata: source.metadata,
        })
      : source.provider === 'soundcloud' && source.sourceUrl
        ? soundcloudProvider.getEmbedUrl({
            provider: 'soundcloud',
            externalId: source.externalId,
            sourceUrl: source.sourceUrl,
            isPrimary: source.isPrimary,
            metadata: source.metadata,
          })
        : null;

  if (!src) return null;

  return (
    <iframe
      src={src}
      allow="autoplay; encrypted-media; fullscreen"
      className="h-20 w-full rounded-lg border border-white/10"
      allowFullScreen
    />
  );
}

export function CassetteDeck() {
  const {
    currentTrack,
    currentSource,
    isPlaying,
    progress,
    duration,
    volume,
    station,
    isShuffle,
    repeat,
    togglePlay,
    next,
    prev,
    setVolume,
    close,
    toggleShuffle,
    toggleRepeat,
  } = usePlayerStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="player-dock"
        >
          <div className="mx-auto max-w-[1600px] px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex flex-1 items-center gap-4">
                <div className="cassette-window relative h-16 w-16 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`flex gap-3 ${isPlaying ? 'animate-cassette' : ''}`}>
                      <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-black/40" />
                      <div className="h-8 w-8 rounded-full border-2 border-white/20 bg-black/40" />
                    </div>
                  </div>
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                    <Equalizer isPlaying={isPlaying} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white">
                    {currentTrack.title}
                  </div>
                  <div className="truncate text-xs text-white/50">
                    {currentTrack.game.title}
                  </div>
                  {station && (
                    <div className="mt-1 flex items-center gap-1">
                      <Radio className="h-3 w-3 text-[#8B5CF6]" />
                      <span className="text-[10px] font-bold text-[#A78BFA]">
                        {station.title} • {station.frequency}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleShuffle}
                    className={`h-8 w-8 ${isShuffle ? 'text-[#8B5CF6]' : 'text-white/50'}`}
                  >
                    <Shuffle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prev}
                    className="h-8 w-8 text-white/70 hover:text-white"
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={togglePlay}
                    className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90"
                    size="icon"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={next}
                    className="h-8 w-8 text-white/70 hover:text-white"
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleRepeat}
                    className={`h-8 w-8 ${repeat !== 'none' ? 'text-[#8B5CF6]' : 'text-white/50'}`}
                  >
                    {repeat === 'one' ? <Repeat1 className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center gap-3 w-full max-w-md">
                  <span className="text-[10px] text-white/40 font-mono w-10 text-right">
                    {formatTime(progress)}
                  </span>
                  <div className="relative flex-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#28F0FF]"
                      style={{ width: `${progressPercent}%` }}
                    />
                    <Slider
                      value={[Number(progressPercent.toFixed(2))]}
                      max={100}
                      step={0.1}
                      className="absolute inset-0 w-full"
                      onValueChange={(value) => {
                        const nextValue = resolveValue(value);
                        const newProgress = (nextValue / 100) * duration;
                        usePlayerStore.setState({ progress: newProgress });
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono w-10">
                    {formatTime(duration)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-[#FF4FD8]">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white">
                  <ListMusic className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-white/50" />
                  <Slider
                    value={[Number((volume * 100).toFixed(2))]}
                    max={100}
                    step={1}
                    className="w-20"
                    onValueChange={(value) => setVolume(resolveValue(value) / 100)}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={close}
                  className="h-8 w-8 text-white/30 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

             {currentSource && (
               <div className="mt-3">
                 {renderEmbed(currentSource)}
               </div>
             )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
