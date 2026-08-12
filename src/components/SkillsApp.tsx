import { X } from 'lucide-react';
import { skills } from '../data/projects';

const categories: { key: keyof typeof skills; label: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', color: '#6366f1' },
  { key: 'backend', label: 'Backend', color: '#10b981' },
  { key: 'database', label: 'Database', color: '#f59e0b' },
  { key: 'tools', label: 'Tools', color: '#ec4899' },
  { key: 'design', label: 'Design', color: '#8b5cf6' },
  { key: 'exploring', label: 'Currently Exploring', color: '#06b6d4' },
];

export default function SkillsApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">⚡</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Skills</h2>
            <p className="text-[10px] text-gray-500">Technical expertise</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {categories.map(cat => (
          <section key={cat.key}>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3" style={{ color: cat.color }}>
              {cat.label}
            </h3>
            {'tools' === cat.key || 'design' === cat.key || 'exploring' === cat.key ? (
              <div className="flex flex-wrap gap-2">
                {(skills[cat.key] as string[]).map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10 hover:border-white/20 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(skills[cat.key] as Array<{ name: string; level: string; description: string }>).map(sk => (
                  <div key={sk.name} className="flex items-start justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">{sk.name}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">{sk.description}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-white/5 text-gray-400">{sk.level}</span>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}