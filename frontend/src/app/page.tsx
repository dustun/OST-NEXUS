'use client';

import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/shared/config';

const retroGames = [
  {
    id: 'zelda',
    title: 'The Legend of Zelda',
    year: 1986,
    image: '/images/games/zelda.jpg',
    signature: 'Koji Kondo',
    slug: 'the-legend-of-zelda'
  },
  {
    id: 'mario',
    title: 'Super Mario Bros.',
    year: 1985,
    image: '/images/games/mario.jpg',
    signature: 'Kōichi Hamada',
    slug: 'super-mario-bros'
  },
  {
    id: 'ff7',
    title: 'Final Fantasy VII',
    year: 1997,
    image: '/images/games/ff7.jpg',
    signature: 'Nobuo Uematsu',
    slug: 'final-fantasy-vii'
  },
  {
    id: 'chrono',
    title: 'Chrono Trigger',
    year: 1995,
    image: '/images/games/chrono.jpg',
    signature: 'Yasunori Mitsuda',
    slug: 'chrono-trigger'
  },
];

const retroTracks = [
  {
    id: 'main-theme-zelda',
    number: '01',
    title: 'Main Theme',
    game: 'The Legend of Zelda',
    composer: 'Koji Kondo',
    duration: '3:45'
  },
  {
    id: 'main-theme-mario',
    number: '02',
    title: 'Mario Theme',
    game: 'Super Mario Bros.',
    composer: 'Kōichi Hamada',
    duration: '2:30'
  },
  {
    id: 'zangetsu',
    number: '03',
    title: 'Zangetsu',
    game: 'Demon Sword',
    composer: 'Ricardo \\"Ricky\\" Curtis',
    duration: '4:12'
  },
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#000] text-[#00ff00] crt-vignette">
      <div className="scanlines"></div>
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 border-b-4 border-[#00ff00]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#00ff00] pixel-text">
                OST NEXUS
                <span className="block text-2xl md:text-3xl mt-2 text-[#666]">
                  Игровые миры продолжают звучать
                </span>
              </h1>
              <p className="text-lg mb-8 text-[#888]">
                Интерактивная энциклопедия игровых саундтреков и музыкальных миров в стиле ретро.
              </p>
              <div className="flex gap-4">
                <Link 
                  href={routes.library} 
                  className="btn-main"
                >
                  Перейти в библиотеку
                </Link>
                <Link 
                  href={routes.radio} 
                  className="btn-pixel"
                >
                  Слушать радио
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative z-10 pixel-border">
                <div className="w-full h-[400px] bg-[#000] border-4 border-[#00ff00] flex items-center justify-center">
                  <span className="text-[#00ff00] text-4xl font-bold">RETRÔ CONSOLE</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#00ff00] z-0 bg-transparent"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Games Section */}
      <section className="py-16 px-4 bg-[#000]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#00ff00] pixel-text">
            Популярные игры
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {retroGames.map((game) => (
              <div key={game.id} className="game-card">
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-[#111] border-2 border-[#00ff00] flex items-center justify-center">
                    <span className="text-[#00ff00]">{game.title.split(' ').map(w => w[0]).join('').slice(0, 6)}</span>
                  </div>
                  <div className="absolute top-2 right-2 bg-[#000] text-[#00ff00] px-2 py-1 border border-[#00ff00] text-xs font-bold">
                    {game.year}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-[#fff] hover:text-[#00ff00] transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-sm text-[#666] mb-4">
                    Классическая приключенческая игра с запоминающимся саундтреком.
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-[#666]">КОМПОЗИТОР:</span>
                    <span className="text-xs text-[#00ff00] font-bold">{game.signature}</span>
                  </div>
                  <Link 
                    href={routes.game(game.slug)} 
                    className="btn-pixel w-full text-center text-[13px] py-2 block"
                  >
                    Подробнее
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Tracks Section */}
      <section className="py-16 px-4 border-t-2 border-[#333]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#00ff00] pixel-text">
            Последние треки
          </h2>
          
          <div className="space-y-4 max-w-4xl mx-auto">
            {retroTracks.map((track) => (
              <div key={track.id} className="track-row">
                <div className="w-16 h-16 bg-[#00ff00] text-[#000] flex items-center justify-center font-bold text-xl border-2 border-[#333] shadow-pixel">
                  {track.number}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 text-[#fff] hover:text-[#00ff00] transition-colors">
                    {track.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-[#666]">
                    <span>{track.game}</span>
                    <span>•</span>
                    <span>{track.composer}</span>
                    <span>•</span>
                    <span>{track.duration}</span>
                  </div>
                </div>
                <button className="btn-main ml-4 text-[13px] py-2">
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href={routes.tracks} 
              className="btn-pixel"
            >
              Показать все треки
            </Link>
          </div>
        </div>
      </section>
      
      {/* Retro Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#00ff00] pixel-text">
            Почему OST NEXUS?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card">
              <div className="w-20 h-20 bg-[#111] border-2 border-[#00ff00] mx-auto mb-6 flex items-center justify-center text-[#00ff00]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v12L9 19zm0 0a2 2 0 100 4m0-4a2 2 0 000 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00ff00]">АУТЕНТИЧНОСТЬ</h3>
              <p className="text-[#666]">
                Подлинная ретро-стилистика с пиксельной графикой и классической концепцией.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-20 h-20 bg-[#111] border-2 border-[#00ff00] mx-auto mb-6 flex items-center justify-center text-[#00ff00]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00ff00]">КОЛЛЕКЦИЯ</h3>
              <p className="text-[#666]">
                Широкая коллекция игр и саундтреков в стиле ретро от разных эпох.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="w-20 h-20 bg-[#111] border-2 border-[#00ff00] mx-auto mb-6 flex items-center justify-center text-[#00ff00]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#00ff00]">РЕТРО РАДИО</h3>
              <p className="text-[#666]">
                Онлайн радио с игровыми музыками транслируется 24/7 в стиле ретро-радио.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t-2 border-[#333] py-6 text-center">
        <div className="container mx-auto">
          <p className="text-[#666] text-xs">
            © 2026 OST NEXUS. Все права защищены.
          </p>
          <p className="text-[#00ff00] text-[10px] mt-2">
            СДЕЛАНО С ПИКСЕЛЬНОЙ ЛЮБОВЬЮ
          </p>
        </div>
      </footer>
    </main>
  );
}