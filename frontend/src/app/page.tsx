'use client';

import Link from 'next/link';
import { routes } from '@/shared/config';
import { Button } from '@/components/ui/button';

const featuredGames = [
  {
    id: 'zelda',
    title: 'The Legend of Zelda',
    year: 1986,
    composer: 'Koji Kondo',
    slug: 'the-legend-of-zelda',
  },
  {
    id: 'mario',
    title: 'Super Mario Bros.',
    year: 1985,
    composer: 'Koji Kondo',
    slug: 'super-mario-bros',
  },
  {
    id: 'castlevania',
    title: 'Castlevania',
    year: 1986,
    composer: 'Kinuyo Yamashita',
    slug: 'castlevania',
  },
  {
    id: 'mega-man',
    title: 'Mega Man 2',
    year: 1988,
    composer: 'Manami Matsumae',
    slug: 'mega-man-2',
  },
];

const latestTracks = [
  { id: 't1', title: 'Title Theme', game: 'Zelda', composer: 'Kondo', duration: '3:45' },
  { id: 't2', title: 'Underground', game: 'Mario', composer: 'Kondo', duration: '2:30' },
  { id: 't3', title: 'Vampire Killer', game: 'Castlevania', composer: 'Yamashita', duration: '4:12' },
  { id: 't4', title: 'Dr. Wily Stage 1', game: 'Mega Man 2', composer: 'Matsumae', duration: '3:08' },
];

const features = [
  { title: 'AUTHENTIC', desc: 'Original pixel-style UI with retro aesthetic.', icon: '\u25B2' },
  { title: 'COMPLETE', desc: 'Full catalog of games and soundtracks.', icon: '\u25B2' },
  { title: 'RADIO', desc: 'Dedicated retro gaming radio station.', icon: '\u25B2' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="border-b-2 border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
            <div className="flex-1">
              <p className="text-[var(--color-accent)] text-xs tracking-widest mb-4 uppercase">
                Interactive Soundtrack Encyclopedia
              </p>
              <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-fg)] mb-6 leading-tight">
                OST NEXUS
              </h1>
              <p className="text-[var(--color-muted)] text-sm mb-8 max-w-lg">
                Explore the worlds of gaming music through an interactive pixel-art interface. Search tracks, browse games, and listen to curated radio.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="default">
                  <Link href={routes.library}>Browse Library</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href={routes.radio}>Live Radio</Link>
                </Button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="border-2 border-[var(--color-accent)] bg-[var(--color-card-bg)] w-48 h-48 flex items-center justify-center pixel-box">
                <span className="text-[var(--color-accent)] text-xs tracking-widest">OST NEXUS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="border-b-2 border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-fg)] mb-2 tracking-wider">
            Featured Games
          </h2>
          <p className="text-[var(--color-muted)] text-xs mb-8">
            Hand-picked titles with iconic soundtracks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredGames.map((game) => (
              <div key={game.id} className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] pixel-box hover:border-[var(--color-accent)] transition-colors group">
                <div className="bg-[var(--color-surface)] border-b-2 border-[var(--color-card-border)] px-4 py-6 flex items-center justify-center">
                  <span className="text-[var(--color-accent)] text-sm font-bold tracking-widest">
                    {game.title.split(' ').map(w => w[0]).join('')}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-[var(--color-fg)] font-bold text-sm mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-[var(--color-muted)] text-xs mb-3">{game.composer}</p>
                  <Link href={routes.game(game.slug)} className="text-[var(--color-accent)] text-xs hover:underline">View Game {'\u2192'}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Tracks */}
      <section className="border-b-2 border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-fg)] mb-2 tracking-wider">
            Latest Tracks
          </h2>
          <p className="text-[var(--color-muted)] text-xs mb-8">Recently cataloged soundtracks from our collection.</p>
          <div className="space-y-2 max-w-2xl">
            {latestTracks.map((track, i) => (
              <div key={track.id} className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] pixel-box flex items-center gap-4 px-4 py-3 hover:border-[var(--color-accent)] transition-colors">
                <span className="text-[var(--color-accent)] text-xs font-bold w-6 text-center">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[var(--color-fg)] text-sm font-bold truncate">{track.title}</p>
                  <p className="text-[var(--color-muted)] text-xs">{track.game} \u2014 {track.composer}</p>
                </div>
                <span className="text-[var(--color-muted)] text-xs">{track.duration}</span>
                <Button variant="ghost" size="sm" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">
                  {'\u25B6'}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button asChild variant="secondary">
              <Link href={routes.tracks}>View All Tracks {'\u2192'}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b-2 border-[var(--color-border)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-12">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-fg)] mb-8 tracking-wider text-center">
            Why OST NEXUS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <div key={f.title} className="border-2 border-[var(--color-card-border)] bg-[var(--color-card-bg)] pixel-box p-6 text-center">
                <div className="text-3xl text-[var(--color-accent)] mb-4">{f.icon}</div>
                <h3 className="text-[var(--color-fg)] font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-[var(--color-muted)] text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-fg)] mb-2 tracking-wider">Start Exploring</h2>
          <p className="text-[var(--color-muted)] text-xs mb-6">Discover thousands of soundtracks from your favorite games.</p>
          <Button asChild variant="default">
            <Link href={routes.library}>Enter the Nexus</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-[var(--color-border)] bg-[var(--color-card-bg)] mt-auto">
        <div className="mx-auto max-w-[var(--container-max)] px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-accent)] text-xs tracking-widest font-bold">OST NEXUS</p>
          <p className="text-[var(--color-muted)] text-xs">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}