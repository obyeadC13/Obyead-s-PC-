import { skillGroups } from '../data/cv';

export default function SkillsApp() {
  return (
    <div className="h-full bg-[#1e1e1e]">
      <div className="grid grid-cols-2 gap-x-10 gap-y-6 h-full overflow-y-auto px-10 py-7">
        {skillGroups.map(cat => (
          <section key={cat.key}>
            <h3 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: cat.color }}>
              {cat.label}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[13px] text-gray-300 border border-white/10 hover:border-white/25 transition-colors">
                  {s}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
