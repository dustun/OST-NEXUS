export interface Game {
  id: string;
  title: string;
  originalTitle: string;
  slug: string;
  coverImage: string;
  releaseDate: string;
  summary: string;
  description: string;
  genres: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  tracks: Track[];
  composers: Composer[];
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  gameId: string;
  game: Game;
  durationSeconds: number;
  discNumber: number;
  trackNumber: number;
  description: string;
  isSpoiler: boolean;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  composers: Composer[];
  moods: Mood[];
  sceneTypes: SceneType[];
  playbackSources: PlaybackSource[];
}

export interface Composer {
  id: string;
  name: string;
  slug: string;
  bio: string;
  photoUrl: string;
  status: 'draft' | 'published' | 'archived';
  tracks: Track[];
}

export interface Mood {
  id: string;
  name: string;
  slug: string;
  color: string;
  description: string;
}

export interface SceneType {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface PlaybackSource {
  id: string;
  trackId: string;
  provider: 'youtube' | 'soundcloud' | 'direct';
  externalId: string;
  sourceUrl: string;
  sortOrder: number;
  isPrimary: boolean;
  status: 'draft' | 'published' | 'archived';
  lastCheckedAt: string | null;
  metadata: Record<string, unknown>;
}

export interface RadioStation {
  id: string;
  name: string;
  description: string;
  frequency: string;
  genre: string;
  currentlyPlaying: Track | null;
  isLive: boolean;
  color: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: 'radio' | 'playlist' | 'favorites' | 'mix';
  visibility: 'public' | 'unlisted' | 'private';
  ownerType: string | null;
  ownerId: string | null;
  coverImage: string;
  isLive: boolean;
  frequency: string;
  color: string;
  currentlyPlayingTrackId: string | null;
  status: 'draft' | 'published' | 'archived';
  publishedAt: string | null;
  items: CollectionItem[];
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  trackId: string;
  track: Track;
  sortOrder: number;
  note: string | null;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  station: Collection | null;
}
