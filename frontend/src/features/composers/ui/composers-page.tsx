'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Disc } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { composers } from '@/data/mock';
import { routes } from '@/shared/config';

export function ComposersPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <div className="mb-8">
        <div className="eyebrow">Создатели музыки</div>
        <h1 className="section-title">Композиторы</h1>
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
              <Card className="card-glow group cursor-pointer border-white/10 bg-gradient-to-br from-white/5 to-transparent transition-all duration-300 hover:border-white/20">
                <div className="flex items-center gap-4 p-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#a96cff] bg-gradient-to-br from-[#a96cff]/20 to-[#56b7ff]/20">
                    <Disc className="h-8 w-8 text-[#a96cff]" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-white group-hover:text-[#cf9cff] transition-colors">
                      {composer.name}
                    </CardTitle>
                    <p className="mt-1 text-sm text-white/60 line-clamp-2">{composer.bio}</p>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
