export type AudioProviderType = 'youtube' | 'soundcloud' | 'direct';

export interface AudioSource {
  provider: AudioProviderType;
  externalId: string;
  sourceUrl: string;
  isPrimary: boolean;
  metadata?: Record<string, unknown>;
}

export interface AudioProvider {
  type: AudioProviderType;
  canPlay: (source: AudioSource) => boolean;
  getEmbedUrl: (source: AudioSource) => string;
  label: string;
}
