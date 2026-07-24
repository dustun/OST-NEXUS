'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes } from '@/shared/config';

export function CTASection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1600px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card-panel p-8 lg:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8B5CF6]/10 to-[#28F0FF]/10" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#8B5CF6] bg-gradient-to-br from-[#8B5CF6]/20 to-[#28F0FF]/20 mb-6">
              <Radio className="h-8 w-8 text-[#A78BFA]" />
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Начни слушать <span className="glow-text">сейчас</span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              Присоединяйся к эфиру. Исследуй игровые миры через саундтреки, создавай плейлисты и открывай новых композиторов.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href={routes.radio}>
                <button className="btn-primary flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Открыть радио
                </button>
              </Link>
              <Link href={routes.library}>
                <button className="btn-secondary">Смотреть библиотеку</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
