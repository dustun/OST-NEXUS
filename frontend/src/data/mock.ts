import { Game, Track, Composer, Mood, SceneType, RadioStation } from '@/types';

export const moods: Mood[] = [
  { id: '1', name: 'Созерцательное', slug: 'contemplative', color: '#28F0FF', description: 'Для исследования мира' },
  { id: '2', name: 'Напряжённое', slug: 'intense', color: '#FF4FD8', description: 'Битвы и опасности' },
  { id: '3', name: 'Эпическое', slug: 'epic', color: '#FF9E45', description: 'Масштабные события' },
  { id: '4', name: 'Таинственное', slug: 'mysterious', color: '#8B5CF6', description: 'Неизведанные территории' },
];

export const sceneTypes: SceneType[] = [
  { id: '1', name: 'Исследование', slug: 'exploration', description: 'Свободное путешествие по миру' },
  { id: '2', name: 'Битва с боссом', slug: 'boss-battle', description: 'Кульминационные сражения' },
  { id: '3', name: 'Диалог', slug: 'dialogue', description: 'Развитие сюжета' },
];

export const composers: Composer[] = [
  {
    id: '1',
    name: 'Nexus Ensemble',
    slug: 'nexus-ensemble',
    bio: 'Демонстрационный автор первого музыкального мира OST NEXUS.',
    photoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=nexus',
    status: 'published',
    tracks: [] as unknown as Track[],
  },
];

export const games: Game[] = [
  {
    id: '1',
    title: 'OST NEXUS: Первый сигнал',
    originalTitle: 'OST NEXUS: First Signal',
    slug: 'ost-nexus-first-signal',
    coverImage: 'https://api.dicebear.com/7.x/cyberpunk/svg?seed=nexus',
    releaseDate: '2026-07-23',
    summary: 'Демонстрационный музыкальный мир для первого вертикального среза.',
    description: 'Технический каталог проверяет связи игры, треков, композитора, настроений, сцен и источников воспроизведения.',
    genres: ['Synthwave', 'Ambient'],
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    tracks: [] as unknown as Track[],
    composers: [],
  },
];

export const tracks: Track[] = [
  {
    id: '1',
    title: 'Пробуждение',
    slug: 'awakening',
    gameId: '1',
    game: games[0],
    durationSeconds: 192,
    discNumber: 1,
    trackNumber: 1,
    description: 'Первые шаги в мире OST NEXUS',
    isSpoiler: false,
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    composers: [composers[0]],
    moods: [moods[0]],
    sceneTypes: [sceneTypes[0]],
    playbackSources: [
      { id: 'ps1', trackId: '1', provider: 'youtube', externalId: 'dQw4w9WgXcQ', sourceUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', sortOrder: 1, isPrimary: true, status: 'published', lastCheckedAt: new Date().toISOString(), metadata: {} },
    ],
  },
  {
    id: '2',
    title: 'Между мирами',
    slug: 'between-worlds',
    gameId: '1',
    game: games[0],
    durationSeconds: 215,
    discNumber: 1,
    trackNumber: 2,
    description: 'Переход между измерениями',
    isSpoiler: false,
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    composers: [composers[0]],
    moods: [moods[0], moods[1]],
    sceneTypes: [sceneTypes[0]],
    playbackSources: [
      { id: 'ps2', trackId: '2', provider: 'soundcloud', externalId: '', sourceUrl: 'https://soundcloud.com/example/track', sortOrder: 1, isPrimary: true, status: 'published', lastCheckedAt: new Date().toISOString(), metadata: {} },
    ],
  },
  {
    id: '3',
    title: 'Сердце Нексуса',
    slug: 'nexus-heart',
    gameId: '1',
    game: games[0],
    durationSeconds: 248,
    discNumber: 1,
    trackNumber: 3,
    description: 'Центральная тема игрового мира',
    isSpoiler: true,
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    composers: [composers[0]],
    moods: [moods[1]],
    sceneTypes: [sceneTypes[1]],
    playbackSources: [
      { id: 'ps3', trackId: '3', provider: 'youtube', externalId: 'dQw4w9WgXcQ', sourceUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ', sortOrder: 1, isPrimary: true, status: 'published', lastCheckedAt: new Date().toISOString(), metadata: {} },
    ],
  },
];

games[0].tracks = tracks;

export const radioStations: RadioStation[] = [
  {
    id: '1',
    name: 'NEXUS FM',
    description: 'Лучшие саундтреки из игровых миров',
    frequency: '87.5 FM',
    genre: 'Synthwave / Ambient',
    currentlyPlaying: tracks[0],
    isLive: true,
    color: '#8B5CF6',
  },
  {
    id: '2',
    name: 'Boss Battle Radio',
    description: 'Эпические саундтреки из битв с боссами',
    frequency: '92.3 FM',
    genre: 'Orchestral / Rock',
    currentlyPlaying: tracks[2],
    isLive: true,
    color: '#FF4FD8',
  },
  {
    id: '3',
    name: 'Exploration Wave',
    description: 'Музыка для исследования игровых миров',
    frequency: '104.7 FM',
    genre: 'Ambient / Electronic',
    currentlyPlaying: tracks[1],
    isLive: false,
    color: '#28F0FF',
  },
];
