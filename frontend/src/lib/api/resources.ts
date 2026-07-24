import { fetchJSON } from './client';
import type { Game, Track, Collection, Composer, Mood } from '@/types';

export const api = {
  games: {
    list: () => fetchJSON<Game[]>('/games'),
    show: (id: string) => fetchJSON<Game>(`/games/${id}`),
  },
  tracks: {
    list: (params?: { gameId?: string }) => {
      const qs = params?.gameId ? `?game_id=${params.gameId}` : '';
      return fetchJSON<Track[]>(`/tracks${qs}`);
    },
    show: (id: string) => fetchJSON<Track>(`/tracks/${id}`),
  },
  collections: {
    list: () => fetchJSON<Collection[]>('/collections'),
    show: (id: string) => fetchJSON<Collection>(`/collections/${id}`),
    items: (id: string) => fetchJSON<Collection['items']>(`/collections/${id}/items`),
  },
  composers: {
    list: () => fetchJSON<Composer[]>('/composers'),
    show: (id: string) => fetchJSON<Composer>(`/composers/${id}`),
  },
  moods: {
    list: () => fetchJSON<Mood[]>('/moods'),
  },
};
