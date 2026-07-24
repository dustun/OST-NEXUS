import { AudioProvider, AudioSource } from './providers';

export const youtubeProvider: AudioProvider = {
  type: 'youtube',
  label: 'YouTube',
  canPlay: (source) => source.provider === 'youtube',
  getEmbedUrl: (source) =>
    `https://www.youtube.com/embed/${source.externalId}?enablejsapi=1&origin=${location.origin}`,
};
