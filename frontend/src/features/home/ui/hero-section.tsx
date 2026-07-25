'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Play, Radio, Zap } from 'lucide-react';
import { routes } from '@/shared/config';
import { Button } from '@/components/ui/button';
import { useGames, useCollections } from '@/lib/hooks/use-catalog';
import { PixelRadio } from '@/components/player/pixel-radio';

export function HeroSection() {
  const { data: games } = useGames();
  const { data: collections } = useCollections();
  const featuredGame = games?.[0];
  const featuredStation = collections?.find((c) => c.type === 'radio') || collections?.[0];

  if (!featuredGame) {
    return (
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="retro-grid opacity-[0.04]" />
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="section-eyebrow text-[#8B5CF6] mb-4">Загрузка...</div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-4">OST <span className="glow-text">NEXUS</span></h1>
              <p className="text-white/60 text-base lg:text-lg max-w-xl mb-8 leading-relaxed">Загружаем игровые миры...</p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="retro-grid opacity-[0.04]" />
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-eyebrow text-[#8B5CF6] mb-4">
              Игровые миры продолжают звучать
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-4">
              OST <span className="glow-text">NEXUS</span>
            </h1>
            <p className="text-white/60 text-base lg:text-lg max-w-xl mb-8 leading-relaxed">
              {featuredGame.summary}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href={routes.radio}>
                <button className="btn-primary flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Слушать радио
                </button>
              </Link>
              <Link href={routes.library}>
                <button className="btn-secondary flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  Открыть библиотеку
                </button>
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-white/40">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-[#FFE45C]" />
                <span>Бесплатно</span>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#FF9E45]" />
                <span>Радио в эфире</span>
              </div>
              {featuredStation && (
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#28F0FF]" />
                  <span>Сейчас в эфире: {featuredStation.title}</span>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="hidden lg:flex justify-center"
          >
            <PixelRadio />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
