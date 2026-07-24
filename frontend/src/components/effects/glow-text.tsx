'use client';

import { motion } from 'framer-motion';

interface GlowTextProps {
  children: React.ReactNode;
  className?: string;
  color?: 'cyan' | 'pink' | 'purple' | 'yellow';
}

const colorMap = {
  cyan: 'text-[#56b7ff]',
  pink: 'text-[#ff5c7a]',
  purple: 'text-[#a96cff]',
  yellow: 'text-[#ffd166]',
};

export function GlowText({ children, className = '', color = 'purple' }: GlowTextProps) {
  return (
    <motion.span
      className={`font-bold ${colorMap[color]} ${className}`}
      style={{
        textShadow: `0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor`,
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.span>
  );
}
