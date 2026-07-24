'use client';

import { motion } from 'framer-motion';

const bars = [0.4, 0.8, 0.6, 1, 0.7, 0.9, 0.5, 0.85];

export function Equalizer({ isPlaying = false }: { isPlaying?: boolean }) {
  return (
    <div className="flex items-end gap-[3px] h-5">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-[#a96cff] to-[#56b7ff]"
          animate={
            isPlaying
              ? {
                  height: [4, height * 20, 4],
                  transition: {
                    duration: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }
              : { height: 4 }
          }
        />
      ))}
    </div>
  );
}
