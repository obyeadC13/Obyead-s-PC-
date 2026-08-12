import { StickyNote } from 'lucide-react';

export default function NotesWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <StickyNote size={12} className="text-yellow-500" style={{ filter: 'drop-shadow(0 0 4px #facc15)' }} />
        <span className="text-[10px] uppercase tracking-widest text-yellow-500/60 font-medium" style={{ textShadow: '0 0 6px rgba(250,204,21,0.3)' }}>Quick Notes</span>
      </div>
      <ul className="space-y-1.5 relative z-10">
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Update portfolio projects</span>
        </li>
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Write new blog post</span>
        </li>
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Review game mechanics</span>
        </li>
      </ul>
    </div>
  );
}