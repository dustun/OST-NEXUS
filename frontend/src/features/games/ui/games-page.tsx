'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { games } from '@/data/mock';
import { routes } from '@/shared/config';

export function GamesPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="eyebrow">Каталог игровых миров</div>
        <h1 className="section-title">Игры</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={routes.game(game.slug)}>
              <Card className="card-glow group cursor-pointer border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 hover:border-white/20">
                <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                  <div className="flex h-full items-center justify-center">
                    <Gamepad2 className="h-16 w-16 text-white/20" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-[#cf9cff] transition-colors">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{game.genres.join(' / ')}</span>
                    <span>{game.releaseDate}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">{game.summary}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
