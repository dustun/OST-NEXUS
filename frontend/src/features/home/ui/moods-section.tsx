'use client';

import { motion } from 'framer-motion';
import { moods } from '@/data/mock';

export function MoodsSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Настроение</div>
          <h2 className="section-title">Выбери настроение</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {moods.map((mood, i) => (
            <motion.button
              key={mood.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="card-panel p-6 text-left hover:border-white/20 transition-all"
              style={{
                borderLeft: `3px solid ${mood.color}`,
              }}
            >
              <div className="text-2xl font-bold text-white mb-1">{mood.name}</div>
              <div className="text-xs text-white/50">{mood.description}</div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
