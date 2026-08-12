import { Activity } from 'lucide-react';

export default function SpotifyWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-1 mb-3 relative z-10">
        <Activity size={12} className="text-green-500" style={{ filter: 'drop-shadow(0 0 4px #22c55e)' }} />
        <span className="text-[10px] uppercase tracking-widest text-green-500/60 font-medium" style={{ textShadow: '0 0 6px rgba(34,197,94,0.3)' }}>Now Playing</span>
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blood/30 to-black border border-blood/20 flex items-center justify-center"
          style={{ boxShadow: '0 0 10px rgba(220,38,38,0.2)' }}>
          <span className="text-sm">🎵</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-300 font-medium truncate">Blood & Crimson Stars OST</p>
          <p className="text-[10px] text-gray-500 truncate">Dark Fantasy Soundscapes</p>
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3 relative z-10">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-0.5 bg-blood rounded-full"
            style={{
              height: '10px',
              animation: `equalizer 0.${3 + i}s ease-in-out infinite alternate`,
              opacity: 0.4 + i * 0.15,
              boxShadow: '0 0 4px rgba(220,38,38,0.6)'
            }} />
        ))}
        <span className="ml-auto text-[9px] text-gray-600 font-mono">3:24 / 4:12</span>
      </div>
    </div>
  );
}