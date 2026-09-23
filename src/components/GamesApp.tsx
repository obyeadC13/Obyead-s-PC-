import { X } from 'lucide-react';

const games = [
  { name: 'Terminal 13', genre: 'Detective Mystery', engine: 'Astro + React', status: 'Released', desc: 'Interactive detective mystery game with terminal-style UI, evidence investigation, and deduction mechanics.', link: 'https://terminal13.vercel.app' },
  { name: 'Project 13', genre: 'Action / Platformer', engine: 'Canvas API', status: 'In Development', desc: '2D game with custom engine and hand-crafted pixel art levels.', link: '#' },
  { name: 'Super Swipe', genre: 'Card Game', engine: 'React + WebSocket', status: 'Concept', desc: 'Fast-paced digital card game with swipe mechanics, competitive rankings, and deck building.', link: '#' },
];

export default function GamesApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Games_Vault.exe</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {games.map((g, i) => (
          <div key={i} className="rounded-xl border border-red-900/20 bg-black/20 p-4 hover:border-blood/40 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-200">{g.name}</h4>
              <span className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${g.status === 'Released' ? 'bg-green-950/40 text-green-400 border border-green-900/30' : g.status === 'In Development' ? 'bg-yellow-950/40 text-yellow-400 border border-yellow-900/30' : 'bg-gray-900/60 text-gray-500 border border-gray-800/40'}`}>
                {g.status}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed mb-3">{g.desc}</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded bg-red-950/30 text-red-400/80 border border-red-900/20">{g.engine}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/20 text-gray-500 border border-red-900/10">{g.genre}</span>
            </div>
            {g.link !== '#' && (
              <a href={g.link} target="_blank" rel="noopener noreferrer"
                className="text-[11px] text-blood hover:text-crimson transition-colors font-medium">
                Play Now →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}