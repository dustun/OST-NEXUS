const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api/v1';

export type {
  Game,
  Track,
  Composer,
  Mood,
  SceneType,
  Collection,
  CollectionItem,
  PlaybackSource,
  PlayerState,
  TrackPlayResult,
} from '@/types';

export async function fetchJSON<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Accept': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
