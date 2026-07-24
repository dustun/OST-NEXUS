
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Disc } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { useComposers } from '@/lib/hooks/use-catalog';
import { routes } from '@/shared/config';

export function ComposersSection() {
  const { data: composers, isLoading, error } = useComposers();

  if (isLoading || error || !composers?.length) {
    return (
      <section className="py-10">
        <div className="mx-auto max-w-[1600px] px-4">
          <div className="section-header">
            <div className="section-eyebrow">Композиторы</div>
            <h2 className="section-title">Композиторы</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card-panel animate-pulse">
                <div className="p-6"><div className="h-5 w-3/4 rounded bg-white/10" /></div>
              </div>
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
          <div className="section-eyebrow">Композиторы</div>
          <h2 className="section-title">Композиторы</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {composers.map((composer, i) => (
            <motion.div
              key={composer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={routes.composer(composer.id)}>
                <Card className="card-panel group cursor-pointer border-white/10">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-[#8B5CF6] bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 flex items-center justify-center">
                      <Disc className="h-8 w-8 text-[#A78BFA]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                        {composer.name}
                      </CardTitle>
                      <p className="mt-1 text-sm text-white/60 line-clamp-2">{composer.bio}</p>
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
