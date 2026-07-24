'use client';

import { HeroSection, FeaturedRadioSection, TrendingSection, FeaturedGamesSection, MoodsSection, ComposersSection, CTASection } from '@/features/home';
import { AppShell } from '@/components/layout/app-shell';

export default function Home() {
  return (
    <AppShell>
      <HeroSection />
      <FeaturedRadioSection />
      <TrendingSection />
      <FeaturedGamesSection />
      <MoodsSection />
      <ComposersSection />
      <CTASection />
    </AppShell>
  );
}
