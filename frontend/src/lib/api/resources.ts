import { fetchJSON } from './client';
import { mappers } from './mappers';
import type { Game, Track, Collection, Composer, Mood, SceneType, PlaybackSource } from '@/types';

export const api = {
  games: {
    list: () => fetchJSON<unknown[]>(`/games`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.game(item as Record<string, unknown>)) : [])),
    show: (id: string) => fetchJSON<unknown>(`/games/${id}`).then((data) => mappers.game(data as Record<string, unknown>)),
  },
  tracks: {
    list: (params?: { gameId?: string }) => {
      const qs = params?.gameId ? `?game_id=${params.gameId}` : '';
      return fetchJSON<unknown[]>(`/tracks${qs}`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.track(item as Record<string, unknown>)) : []));
    },
    show: (id: string) => fetchJSON<unknown>(`/tracks/${id}`).then((data) => mappers.track(data as Record<string, unknown>)),
  },
  collections: {
    list: () => fetchJSON<unknown[]>(`/collections`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.collection(item as Record<string, unknown>)) : [])),
    show: (id: string) => fetchJSON<unknown>(`/collections/${id}`).then((data) => mappers.collection(data as Record<string, unknown>)),
    items: (id: string) => fetchJSON<unknown[]>(`/collections/${id}/items`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.collection(item as Record<string, unknown>)) : [])),
  },
  composers: {
    list: () => fetchJSON<unknown[]>(`/composers`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.composer(item as Record<string, unknown>)) : [])),
    show: (id: string) => fetchJSON<unknown>(`/composers/${id}`).then((data) => mappers.composer(data as Record<string, unknown>)),
  },
  moods: {
    list: () => fetchJSON<unknown[]>(`/moods`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.mood(item as Record<string, unknown>)) : [])),
  },
  sceneTypes: {
    list: () => fetchJSON<unknown[]>(`/scene-types`).then((data) => (Array.isArray(data) ? data.map((item: unknown) => mappers.sceneType(item as Record<string, unknown>)) : [])),
  },
  playbackSources: {
    list: (trackId: string) => fetchJSON<unknown[]>(`/playback-sources?track_id=${trackId}`).then((data) => (data.length === 0 ? [] : data.map((item: unknown) => mappers.playbackSource(item as Record<string, unknown>)))),
  },
};
