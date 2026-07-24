import { AudioProvider, AudioSource } from './providers';

export const directProvider: AudioProvider = {
  type: 'direct',
  label: 'Direct',
  canPlay: (source) => source.provider === 'direct',
  getEmbedUrl: (source) => source.sourceUrl,
};
