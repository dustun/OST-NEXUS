import type { Game, Track, Collection, Composer, Mood, SceneType, PlaybackSource, CollectionItem } from '@/types';

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function mapObject(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    out[toCamel(key)] = value;
  }
  return out;
}

function mapTrack(raw: Record<string, unknown>): Track {
  const mapped = mapObject(raw) as Record<string, unknown>;
  const track = mapped as unknown as Track;
  if (raw.game && typeof raw.game === 'object') track.game = mapGame(raw.game as Record<string, unknown>);
  if (Array.isArray(raw.composers)) track.composers = raw.composers.map(mapComposer) as Composer[];
  if (Array.isArray(raw.moods)) track.moods = raw.moods.map(mapMood) as Mood[];
  if (Array.isArray(raw.scene_types)) track.sceneTypes = raw.scene_types.map(mapSceneType) as SceneType[];
  if (Array.isArray(raw.playback_sources)) track.playbackSources = raw.playback_sources.map(mapPlaybackSource) as PlaybackSource[];
  return track;
}

function mapGame(raw: Record<string, unknown>): Game {
  return mapObject(raw) as unknown as Game;
}

function mapComposer(raw: Record<string, unknown>): Composer {
  return mapObject(raw) as unknown as Composer;
}

function mapMood(raw: Record<string, unknown>): Mood {
  return mapObject(raw) as unknown as Mood;
}

function mapSceneType(raw: Record<string, unknown>): SceneType {
  return mapObject(raw) as unknown as SceneType;
}

function mapPlaybackSource(raw: Record<string, unknown>): PlaybackSource {
  return mapObject(raw) as unknown as PlaybackSource;
}

function mapCollection(raw: Record<string, unknown>): Collection {
  const mapped = mapObject(raw) as Record<string, unknown>;
  const collection = mapped as unknown as Collection;
  if (Array.isArray(raw.items)) {
    collection.items = raw.items.map((item: Record<string, unknown>) => {
      const mappedItem = mapObject(item) as Record<string, unknown>;
      const ci = mappedItem as unknown as CollectionItem;
      if (item.track && typeof item.track === 'object') ci.track = mapTrack(item.track as Record<string, unknown>);
      return ci;
    });
  }
  return collection;
}

export const mappers = {
  game: mapGame,
  track: mapTrack,
  collection: mapCollection,
  composer: mapComposer,
  mood: mapMood,
  sceneType: mapSceneType,
  playbackSource: mapPlaybackSource,
};
