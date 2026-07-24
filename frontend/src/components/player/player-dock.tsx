'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Radio, X } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { PlayerState } from '@/types';
import { Equalizer } from '@/components/ui/equalizer';

interface PlayerDockProps {
  state: PlayerState;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onVolumeChange: (volume: number) => void;
  onClose: () => void;
}

export function PlayerDock({
  state,
  onPlayPause,
  onNext,
  onPrev,
  onVolumeChange,
  onClose,
}: PlayerDockProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = state.duration > 0 ? (state.progress / state.duration) * 100 : 0;
  const progressValue = [Number(progress.toFixed(2))];
  const volumeValue = [Number((state.volume * 100).toFixed(2))];

  const handleVolumeChange = (value: number | readonly number[]) => {
    const vol = Array.isArray(value) ? value[0] : value;
    onVolumeChange(vol / 100);
  };

  return (
    <AnimatePresence>
      {state.currentTrack && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0a0a0f]/95 backdrop-blur-xl"
        >
          <div className="mx-auto max-w-[1600px] px-4 py-3">
            <div className="flex items-center gap-4">
              <div className="flex flex-1 items-center gap-4">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Equalizer isPlaying={state.isPlaying} />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-bold text-white">
                    {state.currentTrack.title}
                  </div>
                  <div className="truncate text-xs text-white/50">
                    {state.currentTrack.game.title}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8 text-white/70 hover:text-white">
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button onClick={onPlayPause} className="h-10 w-10 rounded-full bg-white text-black hover:bg-white/90" size="icon">
                    {state.isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8 text-white/70 hover:text-white">
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono">
                  <span>{formatTime(state.progress)}</span>
                  <Slider
                    value={progressValue}
                    max={100}
                    step={1}
                    className="w-32"
                    onValueChange={() => {}}
                  />
                  <span>{formatTime(state.duration)}</span>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-end gap-3">
                {state.station && (
                  <div className="flex items-center gap-2 rounded-full border border-[#a96cff]/30 bg-[#a96cff]/10 px-3 py-1">
                    <Radio className="h-3 w-3 text-[#a96cff]" />
                    <span className="text-xs font-bold text-[#a96cff]">
                      {state.station.frequency}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-white/50" />
                  <Slider
                    value={volumeValue}
                    max={100}
                    step={1}
                    className="w-20"
                    onValueChange={handleVolumeChange}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-white/30 hover:text-white">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
