
'use client';

import { motion } from 'framer-motion';
import { useMoods } from '@/lib/hooks/use-catalog';

export function MoodsSection() {
  const { data: moods, isLoading, error } = useMoods();

  if (isLoading || error || !moods?.length) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Настроения</div>
            <h2 className="section-title">Настроения</h2>
          </div>
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 w-32 animate-pulse rounded-full bg-white/5" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Настроения</div>
          <h2 className="section-title">Настроения</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {moods.map((mood) => (
            <motion.span
              key={mood.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="tag-mood badge"
              style={{ borderColor: mood.color + '44', color: mood.color }}
            >
              {mood.name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
