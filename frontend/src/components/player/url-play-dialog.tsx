'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/stores/player-store';
import { youtubeProvider, soundcloudProvider, directProvider } from '@/lib/audio';
import type { Track, PlaybackSource } from '@/types';

function detectProvider(url: string): { provider: PlaybackSource['provider']; externalId?: string; sourceUrl?: string } | null {
  const trimmed = url.trim();

  const ytMatch = trimmed.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^?/]+)/);
  if (ytMatch) {
    return { provider: 'youtube', externalId: ytMatch[1], sourceUrl: trimmed };
  }

  if (trimmed.includes('soundcloud.com')) {
    return { provider: 'soundcloud', sourceUrl: trimmed };
  }

  if (/\.(mp3|wav|ogg|m4a|flac)(\?.*)?$/i.test(trimmed)) {
    return { provider: 'direct', sourceUrl: trimmed };
  }

  return null;
}

function buildTemporaryTrack(url: string): Track {
  const detected = detectProvider(url);
  const source: PlaybackSource = {
    id: 'temp-source',
    trackId: 'temp-track',
    provider: detected?.provider || 'direct',
    externalId: detected?.externalId || '',
    sourceUrl: detected?.sourceUrl || url,
    sortOrder: 0,
    isPrimary: true,
    status: 'published',
    lastCheckedAt: null,
    metadata: {},
  };

  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return 'External';
    }
  })();

  const title = `Воспроизведение: ${hostname}`;

  return {
    id: 'temp-track',
    title,
    slug: 'temp-track',
    discNumber: 1,
    trackNumber: 1,
    durationSeconds: 0,
    description: null,
    isSpoiler: false,
    status: 'published',
    publishedAt: new Date().toISOString(),
    game: {
      id: 'temp-game',
      title: hostname,
      originalTitle: hostname,
      slug: 'temp-game',
      coverImage: '',
      releaseDate: '',
      summary: '',
      description: '',
      genres: [],
      status: 'published',
    },
    composers: [],
    moods: [],
    sceneTypes: [],
    playbackSources: [source],
  } as unknown as Track;
}

export function UrlPlayDialog() {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const play = usePlayerStore((s) => s.play);
  const setQueue = usePlayerStore((s) => s.setQueue);

  const handleOpen = () => {
    setOpen(true);
    setUrl('');
    setError(null);
  };

  const handlePlay = async () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError('Вставьте ссылку на аудио или видео.');
      return;
    }

    const detected = detectProvider(trimmed);
    if (!detected) {
      setError('Не поддерживаемый формат. Поддерживаются YouTube, SoundCloud и прямые ссылки на аудио (mp3, wav, ogg, m4a, flac).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const track = buildTemporaryTrack(trimmed);
      setQueue([track], 0);
      play(track);
      setOpen(false);
      setUrl('');
    } catch (e) {
      setError('Не удалось открыть ссылку. Попробуйте другой формат.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpen}
        className="h-9 w-9 text-white/70 hover:text-white"
        aria-label="Play by URL"
      >
        <Link2 className="h-4 w-4" />
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0a0a0f] p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Воспроизвести по ссылке</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="h-8 w-8 text-white/50 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setError(null);
                  }}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-xl border border-white/10 bg-[#151A2E] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handlePlay();
                  }}
                />
                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                    {error}
                  </div>
                )}
                <div className="flex gap-2">
                  <Button
                    onClick={handlePlay}
                    disabled={loading}
                    className="btn-primary flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {loading ? 'Загрузка...' : 'Воспроизвести'}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setOpen(false)}
                    className="text-white/60 hover:text-white"
                  >
                    Отмена
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
