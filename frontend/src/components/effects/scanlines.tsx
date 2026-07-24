'use client';

import { motion } from 'framer-motion';

export function Scanlines() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden opacity-[0.03]"
      aria-hidden="true"
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        }}
      />
    </motion.div>
  );
}
