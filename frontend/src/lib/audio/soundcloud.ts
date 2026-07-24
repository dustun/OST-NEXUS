import { AudioProvider, AudioSource } from './providers';

export const soundcloudProvider: AudioProvider = {
  type: 'soundcloud',
  label: 'SoundCloud',
  canPlay: (source) => source.provider === 'soundcloud',
  getEmbedUrl: (source) =>
    `https://w.soundcloud.com/player/?url=${encodeURIComponent(source.sourceUrl)}&origin=${location.origin}`,
};
