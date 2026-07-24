export const routes = {
  health: '/health',
  foundation: '/foundation',
  home: '/',
  library: '/library',
  games: '/games',
  game: (slug: string) => `/games/${slug}`,
  tracks: '/tracks',
  track: (id: string) => `/tracks/${id}`,
  radio: '/radio',
  composers: '/composers',
  composer: (id: string) => `/composers/${id}`,
  admin: '/admin',
} as const;
