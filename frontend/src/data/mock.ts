import { Game, Track, Composer, Mood, SceneType, Collection, CollectionItem } from '@/types';

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

export const collections: Collection[] = [
  {
    id: '1',
    slug: 'nexus-fm',
    title: 'NEXUS FM',
    description: 'Лучшие саундтреки из игровых миров',
    type: 'radio',
    visibility: 'public',
    ownerType: null,
    ownerId: null,
    coverImage: '',
    isLive: true,
    frequency: '87.5 FM',
    color: '#8B5CF6',
    currentlyPlayingTrackId: '1',
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    items: [
      { id: 'ci1', collectionId: '1', trackId: '1', track: tracks[0], sortOrder: 1, note: null },
      { id: 'ci2', collectionId: '1', trackId: '2', track: tracks[1], sortOrder: 2, note: null },
    ],
  },
  {
    id: '2',
    slug: 'boss-battle-radio',
    title: 'Boss Battle Radio',
    description: 'Эпические саундтреки из битв с боссами',
    type: 'radio',
    visibility: 'public',
    ownerType: null,
    ownerId: null,
    coverImage: '',
    isLive: true,
    frequency: '92.3 FM',
    color: '#FF4FD8',
    currentlyPlayingTrackId: '3',
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    items: [
      { id: 'ci3', collectionId: '2', trackId: '3', track: tracks[2], sortOrder: 1, note: null },
    ],
  },
  {
    id: '3',
    slug: 'exploration-wave',
    title: 'Exploration Wave',
    description: 'Музыка для исследования игровых миров',
    type: 'radio',
    visibility: 'public',
    ownerType: null,
    ownerId: null,
    coverImage: '',
    isLive: false,
    frequency: '104.7 FM',
    color: '#28F0FF',
    currentlyPlayingTrackId: '2',
    status: 'published',
    publishedAt: '2026-07-23T10:00:00Z',
    items: [
      { id: 'ci4', collectionId: '3', trackId: '2', track: tracks[1], sortOrder: 1, note: null },
    ],
  },
];
