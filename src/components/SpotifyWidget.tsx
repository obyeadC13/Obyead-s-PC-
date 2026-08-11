import { Activity } from 'lucide-react';

export default function SpotifyWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-neon-cyan/20 p-4">
      <div className="flex items-center gap-1 mb-3">
        <Activity size={12} className="text-green-500" />
        <span className="text-[10px] uppercase tracking-widest text-green-500/60 font-medium">Now Playing</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-black border border-neon-cyan/20 flex items-center justify-center">
          <span className="text-sm">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-300 font-medium truncate">Blood & Crimson Stars OST</p>
          <p className="text-[10px] text-gray-500 truncate">Dark Fantasy Soundscapes</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-0.5 bg-neon-cyan rounded-full"
            style={{
              height: '10px',
              animation: `equalizer 0.${3 + i}s ease-in-out infinite alternate`,
              opacity: 0.4 + i * 0.15,
            }} />
        ))}
        <span className="ml-auto text-[9px] text-gray-600">3:24 / 4:12</span>
      </div>
    </div>
  );
}