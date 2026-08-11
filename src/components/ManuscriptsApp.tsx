import { X } from 'lucide-react';

const manuscripts = [
  { title: 'Chapter I: The Blood Meridian', words: '12,400 words', excerpt: '"The stars did not blink. They watched. Each one a crimson eye in the velvet throat of the void, peering down on a world that had forgotten how to pray."' },
  { title: 'Chapter II: Echoes in the Wire', words: '8,200 words', excerpt: '"She typed the last line and the terminal answered back—not with text, but with a memory that belonged to someone else."' },
  { title: 'Chapter III: Neon Cathedral', words: '15,600 words', excerpt: '"The city had no churches anymore. The servers were its temples, the firewalls its scripture, and the data streams its hymns."' },
  { title: 'Lore Bible: The Crimson Codex', words: '22,000 words', excerpt: '"In the beginning there was the Signal. And the Signal was wordless, and the Signal was everything."' },
];

export default function ManuscriptsApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Manuscripts.doc</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex-1 overflow-y-auto" style={{ fontFamily: 'Georgia, serif' }}>
        <div className="p-5 space-y-6">
          <div className="text-center pb-4 border-b border-red-900/10">
            <h3 className="text-sm font-semibold text-gray-300 tracking-wide">Writer's Archive</h3>
            <p className="text-[10px] text-gray-600 mt-1">Dark Fantasy & Speculative Fiction</p>
          </div>
          {manuscripts.map((m, i) => (
            <div key={i} className="animate-slideUp" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="text-[13px] font-medium text-gray-300">{m.title}</h4>
                <span className="text-[10px] text-red-500/50">{m.words}</span>
              </div>
              <blockquote className="text-[12px] text-gray-500 italic leading-relaxed pl-4 border-l-2 border-red-900/30">
                {m.excerpt}
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}