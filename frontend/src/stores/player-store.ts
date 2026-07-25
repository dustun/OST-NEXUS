import { create } from 'zustand';
import { Track, Collection, PlaybackSource } from '@/types';

interface PlayerStore {
  currentTrack: Track | null;
  currentSource: PlaybackSource | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  station: Collection | null;
  queue: Track[];
  queueIndex: number;
  isShuffle: boolean;
  repeat: 'none' | 'all' | 'one';
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: Track | null) => void;
  setCurrentSource: (source: PlaybackSource | null) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setStation: (station: Collection | null) => void;
  play: (track: Track) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  close: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentTrack: null,
  currentSource: null,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.7,
  station: null,
  queue: [],
  queueIndex: 0,
  isShuffle: false,
  repeat: 'none',

  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setCurrentSource: (source) => set({ currentSource: source }),
  setProgress: (progress) => set({ progress }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setStation: (station) => set({ station }),

  play: (track) =>
    set({
      currentTrack: track,
      currentSource: track.playbackSources?.find((s) => s.isPrimary) || null,
      isPlaying: true,
      progress: 0,
    }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),

  next: () => {
    const { queue, queueIndex, isShuffle, repeat, play } = get();
    if (queue.length === 0) return;
    let nextIndex: number;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * queue.length);
    } else if (queueIndex < queue.length - 1) {
      nextIndex = queueIndex + 1;
    } else if (repeat === 'all') {
      nextIndex = 0;
    } else {
      set({ isPlaying: false });
      return;
    }
    play(queue[nextIndex]);
  },

  prev: () => {
    const { queue, queueIndex, play } = get();
    if (queue.length === 0) return;
    const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
    play(queue[prevIndex]);
  },

  setQueue: (tracks, startIndex = 0) => set({ queue: tracks, queueIndex: startIndex }),
  toggleShuffle: () => set((s) => ({ isShuffle: !s.isShuffle })),
  toggleRepeat: () => set((s) => ({ repeat: s.repeat === 'none' ? 'all' : s.repeat === 'all' ? 'one' : 'none' })),
  close: () => set({ currentTrack: null, currentSource: null, isPlaying: false, progress: 0, station: null }),
}));

export const usePlayer = () => usePlayerStore();
