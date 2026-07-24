'use client';

import { motion } from 'framer-motion';

interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  index?: number;
}

export function RetroCard({ children, className = '', onClick, href, index = 0 }: RetroCardProps) {
  const Tag = href ? 'a' : 'div';
  const props = href ? { href } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Tag
        className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_30px_rgba(169,108,255,0.15)] ${className}`}
        onClick={onClick}
        {...props}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#a96cff]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="relative z-10">{children}</div>
      </Tag>
    </motion.div>
  );
}
