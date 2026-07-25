'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { usePlayerStore } from '@/stores/player-store';
import { Radio, Search } from 'lucide-react';

export function PixelRadio() {
  const { currentTrack, isPlaying, togglePlay, play, pause } = usePlayerStore();
  const spin = useMotionValue(0);
  const displaySpin = useTransform(spin, (v) => `${v % 360}deg`);

  const handleToggle = () => {
    if (!currentTrack) return;
    if (isPlaying) pause();
    else togglePlay();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="group relative h-48 w-48 sm:h-64 sm:w-64"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      aria-label={currentTrack ? (isPlaying ? 'Pause' : 'Play') : 'Play'}
    >
      <div className="relative h-full w-full rounded-2xl border-2 border-white/10 bg-[#151A2E] p-4 shadow-[0_0_30px_rgba(139,92,246,0.15)]">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
            {currentTrack ? (isPlaying ? 'On Air' : 'Standby') : 'No Signal'}
          </div>
          <motion.div
            className="h-2 w-2 rounded-full"
            animate={{
              backgroundColor: isPlaying ? '#8B5CF6' : '#4B5563',
              boxShadow: isPlaying ? '0 0 8px #8B5CF6' : 'none',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex h-28 items-center justify-center sm:h-36">
          <motion.div
            className="grid grid-cols-5 gap-[3px]"
            style={{ rotate: displaySpin }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 4,
                ease: 'linear',
              },
            }}
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-4 w-4 sm:h-5 sm:w-5 rounded-[2px]"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgba(139,92,246,0.8)' : 'rgba(40,240,255,0.6)',
                  boxShadow: isPlaying ? '0 0 4px rgba(139,92,246,0.4)' : 'none',
                }}
                animate={
                  isPlaying
                    ? {
                        scale: [1, 1.15, 1],
                        opacity: [0.8, 1, 0.8],
                      }
                    : { scale: 1, opacity: 0.5 }
                }
                transition={{
                  duration: 0.6 + (i % 5) * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="mt-4 rounded-xl border border-white/5 bg-black/30 p-2">
          <div className="mb-1 flex items-center gap-2">
            <Radio className="h-3 w-3 text-[#8B5CF6]" />
            <div className="text-[10px] font-bold text-white/60">FREQ</div>
          </div>
          <div className="font-mono text-lg font-bold text-[#28F0FF] sm:text-xl">
            {currentTrack ? '87.5 FM' : '--.- FM'}
          </div>
          {currentTrack && (
            <div className="mt-1 truncate text-[10px] text-white/50">
              {currentTrack.game?.title || currentTrack.title}
            </div>
          )}
        </div>
      </div>
    </motion.button>
  );
}
