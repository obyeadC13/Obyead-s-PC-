import { X } from 'lucide-react';

export default function AboutApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">About</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blood to-red-950 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.2)]">
            <span className="text-lg font-bold text-white">X+</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200">Obyead</h3>
            <p className="text-[11px] text-red-500/60">System Operator</p>
          </div>
        </div>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-3">
          Full-stack developer, game creator, and writer. I build things that work, play things I make, and write about both.
        </p>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
          Currently exploring the intersection of interactive narratives and modern web technologies. Terminal 13 was my first shipped game.
        </p>
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {['React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind', 'PostgreSQL', 'Redis', 'WebSocket', 'Astro', 'PHP', 'Electron', 'Game Design'].map(t => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded bg-red-950/20 text-red-400/70 border border-red-900/15">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}