'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGames } from '@/lib/hooks/use-catalog';

export function GamesPage() {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8">
          <div className="section-eyebrow">Каталог игровых миров</div>
          <h1 className="section-title">Игры</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card-panel animate-pulse">
              <div className="aspect-video w-full rounded-t-xl bg-white/5" />
              <div className="p-6">
                <div className="h-5 w-3/4 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <h1 className="text-2xl text-white">Ошибка загрузки игр</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="section-eyebrow">Каталог игровых миров</div>
        <h1 className="section-title">Игры</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {games?.map((game, i) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={`/games/${game.slug}`}>
              <Card className="card-panel group cursor-pointer border-white/10">
                <div className="aspect-video w-full rounded-t-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 flex items-center justify-center">
                  <Gamepad2 className="h-16 w-16 text-white/20" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                    {game.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/40">{game.releaseDate}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
