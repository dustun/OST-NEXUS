'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTrack, useTracks, useTrackPlay } from '@/lib/hooks/use-catalog';
import { usePlayerStore } from '@/stores/player-store';
import { youtubeProvider, soundcloudProvider } from '@/lib/audio';
import { Equalizer } from '@/components/ui/equalizer';
import type { PlaybackSource, TrackPlayResult } from '@/types';

interface PlaySource {
  provider: string;
  source_url: string;
  external_id: string;
}

function renderEmbed(source: PlaySource | null) {
  if (!source) return null;
  if (source.provider === 'direct' && source.source_url) {
    return (
      <audio
        controls
        autoPlay
        src={source.source_url}
        className="w-full rounded-lg border border-white/10"
      />
    );
  }
  const src =
    source.provider === 'youtube' && source.external_id
      ? youtubeProvider.getEmbedUrl({
          provider: 'youtube',
          externalId: source.external_id,
          sourceUrl: source.source_url,
          isPrimary: true,
          metadata: {},
        })
      : source.provider === 'soundcloud' && source.source_url
      ? soundcloudProvider.getEmbedUrl({
          provider: 'soundcloud',
          externalId: source.external_id,
          sourceUrl: source.source_url,
          isPrimary: true,
          metadata: {},
        })
      : null;

  if (!src) return null;

  return (
    <iframe
      src={src}
      allow="autoplay; encrypted-media; fullscreen"
      className="w-full rounded-lg border border-white/10"
      allowFullScreen
    />
  );
}

export default function TrackPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: track, isLoading, error } = useTrack(id);
  const { data: playData, isLoading: isPlaying } = useTrackPlay(id);
  const { data: tracks } = useTracks();
  const { play, setQueue } = usePlayerStore();

  if (isLoading || isPlaying) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-10 w-3/4 rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (error || !track) {
    return (
      <div className="mx-auto max-w-[1600px] px-4 py-20 text-center">
        <h1 className="text-4xl font-bold text-white">Трек не найден</h1>
      </div>
    );
  }

  const handlePlay = () => {
    if (!tracks) return;
    const idx = tracks.findIndex((t) => t.id === track.id);
    setQueue(tracks, idx);
    play(track);
  };

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="section-eyebrow">Саундтрек</div>
        <h1 className="section-title">{track.title}</h1>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="card-panel border-white/10">
            <CardContent className="p-6">
              <div className="mb-4">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-2">Прослушивание</div>
                {playData?.source && renderEmbed(playData.source)}
                {!playData?.source && (
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-[#8B5CF6]/10 to-[#28F0FF]/5 p-8 text-center">
                    <Equalizer isPlaying={true} />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <Button onClick={handlePlay} className="h-12 w-12 rounded-full bg-white text-black hover:bg-white/90">
                  <Play className="h-5 w-5 ml-0.5" />
                </Button>
                <div>
                  <div className="font-bold text-white">{track.title}</div>
                  <div className="text-sm text-white/50">{track.game?.title || track.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="card-panel border-white/10">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Игра</div>
                  <div className="text-sm text-white">{track.game?.title || track.title}</div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Длительность</div>
                  <div className="text-sm text-white font-mono">
                    {Math.floor(track.durationSeconds / 60)}:{String(track.durationSeconds % 60).padStart(2, '0')}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Источник</div>
                  <div className="text-sm text-white">
                    {playData?.source.provider || 'Загрузка...'}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-1">Настроение</div>
                  <div className="flex flex-wrap gap-2">
                    {track.moods?.map((mood) => (
                      <span
                        key={mood.id}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
                      >
                        {mood.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
