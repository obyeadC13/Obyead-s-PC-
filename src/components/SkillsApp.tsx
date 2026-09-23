import { skills } from '../data/projects';

const categories: { key: keyof typeof skills; label: string; color: string }[] = [
  { key: 'frontend', label: 'Frontend', color: '#863bff' },
  { key: 'backend', label: 'Backend', color: '#10b981' },
  { key: 'database', label: 'Database', color: '#f59e0b' },
  { key: 'tools', label: 'Tools', color: '#ec4899' },
  { key: 'design', label: 'Design', color: '#8b5cf6' },
  { key: 'exploring', label: 'Currently Exploring', color: '#06b6d4' },
];

export default function SkillsApp() {
  return (
    <div className="h-full bg-[#1e1e1e]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 h-full overflow-y-auto px-10 py-7">
        {categories.map(cat => (
          <section key={cat.key}>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: cat.color }}>
              {cat.label}
            </h3>
            {'tools' === cat.key || 'design' === cat.key || 'exploring' === cat.key ? (
              <div className="flex flex-wrap gap-2">
                {(skills[cat.key] as string[]).map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[13px] text-gray-300 border border-white/10 hover:border-white/25 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            ) : (
              <div className="space-y-1.5">
                {(skills[cat.key] as Array<{ name: string; level: string; description: string }>).map(sk => (
                  <div key={sk.name} className="flex items-start justify-between px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors">
                    <div className="min-w-0 pr-3">
                      <h4 className="text-[13px] font-medium text-gray-200">{sk.name}</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">{sk.description}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-1 rounded-md bg-white/[0.06] text-gray-400 whitespace-nowrap">{sk.level}</span>
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
