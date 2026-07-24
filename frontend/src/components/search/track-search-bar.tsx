'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Play, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/stores/player-store';
import { tracks } from '@/data/mock';

type Provider = 'youtube' | 'soundcloud' | 'all';

export function TrackSearchBar() {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState<Provider>('all');
  const [results, setResults] = useState<typeof tracks>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { play, setQueue } = usePlayerStore();

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      setIsSearching(true);
      await new Promise((r) => setTimeout(r, 600));
      const filtered = tracks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()));
      setResults(filtered);
      setIsSearching(false);
    },
    [query]
  );

  const handlePlay = (track: (typeof tracks)[number]) => {
    const allTracks = tracks;
    const idx = allTracks.findIndex((t) => t.id === track.id);
    setQueue(allTracks, idx);
    play(track);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск саундтреков..."
            className="w-full rounded-xl border border-white/10 bg-[#151A2E] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-[#8B5CF6] focus:outline-none focus:ring-1 focus:ring-[#8B5CF6]"
          />
        </div>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value as Provider)}
          className="rounded-xl border border-white/10 bg-[#151A2E] px-4 py-3 text-sm text-white focus:border-[#8B5CF6] focus:outline-none"
        >
          <option value="all">Все</option>
          <option value="youtube">YouTube</option>
          <option value="soundcloud">SoundCloud</option>
        </select>
        <Button type="submit" disabled={isSearching} className="btn-primary">
          {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Поиск'}
        </Button>
      </form>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-2"
        >
          {results.map((track, i) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-panel flex items-center justify-between p-4"
            >
              <div className="min-w-0">
                <div className="font-medium text-white">{track.title}</div>
                <div className="text-xs text-white/50">{track.game.title}</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handlePlay(track)}
                className="h-9 w-9 text-white/70 hover:text-[#8B5CF6]"
              >
                <Play className="h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
