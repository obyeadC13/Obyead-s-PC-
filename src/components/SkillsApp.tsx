import type { ReactNode } from 'react';
import { skillGroups } from '../data/cv';
import { Globe, FileCode, Palette, Database, Coffee, Braces, Star, Zap, Layers, Cpu, FileJson, Wind } from 'lucide-react';

const icons: Record<string, ReactNode> = {
  React: <Globe size={13} />,
  Remix: <Zap size={13} />,
  Tailwind: <Wind size={13} />,
  Bootstrap: <Layers size={13} />,
  HTML5: <FileCode size={13} />,
  CSS: <Palette size={13} />,
  SASS: <Palette size={13} />,
  Express: <FileJson size={13} />,
  'Node.js': <Coffee size={13} />,
  PHP: <Cpu size={13} />,
  MySQL: <Database size={13} />,
  JavaScript: <Braces size={13} />,
  TypeScript: <Braces size={13} />,
  'C++': <Cpu size={13} />,
};

function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function SkillsApp() {
  return (
    <div className="h-full bg-[#0a0a12]/40">
      <div className="grid grid-cols-2 gap-x-10 gap-y-7 h-full overflow-y-auto px-10 py-7">
        {skillGroups.map((cat, ci) => (
          <section key={cat.key}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <span
                className="w-1.5 h-5 rounded-full shrink-0"
                style={{ background: `linear-gradient(180deg, ${cat.color}, ${withAlpha(cat.color, 0.15)})`, boxShadow: `0 0 8px ${withAlpha(cat.color, 0.5)}` }}
              />
              <h3 className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: cat.color }}>
                {cat.label}
              </h3>
              <span className="text-[10px] font-mono text-gray-500 bg-white/[0.05] border border-white/10 rounded-md px-1.5 py-0.5">
                {cat.items.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {cat.items.map((s, si) => (
                <span
                  key={s}
                  className="group relative inline-flex items-center gap-2 pl-3 pr-3.5 py-2 rounded-lg bg-white/[0.06] text-[13px] text-gray-300 border border-white/10 hover:border-white/25 transition-colors cursor-default overflow-hidden animate-skillChipIn"
                  style={{ animationDelay: `${ci * 90 + si * 45}ms` }}
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[3px] rounded-r transition-opacity duration-200 group-hover:opacity-100"
                    style={{ background: cat.color, opacity: 0.55 }}
                  />
                  {icons[s] && (
                    <span
                      className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
                      style={{ background: withAlpha(cat.color, 0.14), color: cat.color }}
                    >
                      {icons[s]}
                    </span>
                  )}
                  <span className="relative z-10">
                    {s}
                    <span
                      className="absolute -bottom-[7px] left-0 w-full h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }}
                    />
                  </span>
                </span>
              ))}
            </div>
          </section>
        ))}

        <section>
          <div className="flex items-center gap-2.5 mb-3.5">
            <span className="w-1.5 h-5 rounded-full shrink-0 bg-gradient-to-b from-[#eab308] to-[#eab308]/15 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#eab308]">Highlights</h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {highlights.map((h, i) => (
              <div
                key={h}
                className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-lg bg-[#eab308]/[0.05] border border-[#eab308]/15 text-[12px] text-gray-300 animate-skillChipIn"
                style={{ animationDelay: `${360 + i * 45}ms` }}
              >
                <Star size={13} className="text-[#eab308] mt-0.5 shrink-0" />
                {h}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

const highlights = [
  'Shipped Terminal 13 — first solo game, live on Vercel',
  'Built responsive front-ends with React + TypeScript at Lorem Ipsum Dev',
  'Marketing Content Head at AP2T Labs while studying M.S. in IT',
];
