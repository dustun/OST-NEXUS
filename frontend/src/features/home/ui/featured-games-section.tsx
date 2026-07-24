'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGames } from '@/lib/hooks/use-catalog';
import { routes } from '@/shared/config';

export function FeaturedGamesSection() {
  const { data: games, isLoading, error } = useGames();

  if (isLoading) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Каталог</div>
            <h2 className="section-title">Избранные игры</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-panel animate-pulse">
                <div className="aspect-video w-full rounded-t-xl bg-white/5" />
                <div className="p-6">
                  <div className="h-5 w-3/4 rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !games?.length) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Каталог</div>
            <h2 className="section-title">Избранные игры</h2>
          </div>
          <div className="rounded-xl border border-dashed border-white/10 p-12 text-center text-white/40">
            Игры не найдены
          </div>
        </div>
      </section>
    );
  }

  const featuredGames = games.slice(0, 3);

  return (
    <section className="py-10">
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="section-header">
          <div className="section-eyebrow">Каталог</div>
          <div className="flex items-end justify-between">
            <h2 className="section-title">Избранные игры</h2>
            <Button variant="ghost" className="text-[#A78BFA] hover:text-white">
              Все игры →
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredGames.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Link href={routes.game(game.slug)}>
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
                      <div className="flex gap-2">
                        {game.genres.slice(0, 2).map((genre) => (
                          <span key={genre} className="tag-genre badge text-[10px]">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-white/40">{game.releaseDate}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
