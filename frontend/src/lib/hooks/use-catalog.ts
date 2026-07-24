'use client';

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { api } from '@/lib/api/resources';
import type { Game, Track, Collection, Composer, Mood, SceneType, PlaybackSource } from '@/types';

export function useGames(): UseQueryResult<Game[], Error> {
  return useQuery({
    queryKey: ['games'],
    queryFn: api.games.list,
  });
}

export function useGame(slug: string): UseQueryResult<Game | undefined, Error> {
  return useQuery({
    queryKey: ['games', slug],
    enabled: !!slug,
    queryFn: async () => {
      const games = await api.games.list();
      return games.find((g) => g.slug === slug);
    },
  });
}

export function useTracks(params?: { gameId?: string }): UseQueryResult<Track[], Error> {
  return useQuery({
    queryKey: ['tracks', params],
    queryFn: () => api.tracks.list(params),
  });
}

export function useTrack(id: string): UseQueryResult<Track | undefined, Error> {
  return useQuery({
    queryKey: ['tracks', id],
    enabled: !!id,
    queryFn: async () => {
      const tracks = await api.tracks.list();
      return tracks.find((t) => t.id === id);
    },
  });
}

export function useCollections(): UseQueryResult<Collection[], Error> {
  return useQuery({
    queryKey: ['collections'],
    queryFn: api.collections.list,
  });
}

export function useCollection(id: string): UseQueryResult<Collection | undefined, Error> {
  return useQuery({
    queryKey: ['collections', id],
    enabled: !!id,
    queryFn: async () => {
      const collections = await api.collections.list();
      return collections.find((c) => c.id === id);
    },
  });
}

export function useComposers(): UseQueryResult<Composer[], Error> {
  return useQuery({
    queryKey: ['composers'],
    queryFn: api.composers.list,
  });
}

export function useComposer(id: string): UseQueryResult<Composer | undefined, Error> {
  return useQuery({
    queryKey: ['composers', id],
    enabled: !!id,
    queryFn: async () => {
      const composers = await api.composers.list();
      return composers.find((c) => c.id === id);
    },
  });
}

export function useMoods(): UseQueryResult<Mood[], Error> {
  return useQuery({
    queryKey: ['moods'],
    queryFn: api.moods.list,
  });
}

export function useSceneTypes(): UseQueryResult<SceneType[], Error> {
  return useQuery({
    queryKey: ['sceneTypes'],
    queryFn: api.sceneTypes.list,
  });
}

export function usePlaybackSources(trackId: string): UseQueryResult<PlaybackSource[], Error> {
  return useQuery({
    queryKey: ['playbackSources', trackId],
    enabled: !!trackId,
    queryFn: () => api.playbackSources.list(trackId),
  });
}
