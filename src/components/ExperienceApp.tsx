import { X } from 'lucide-react';

const experiences = [
  {
    company: 'Self-Employed',
    role: 'Full-Stack Developer',
    period: '2023 - Present',
    description: 'Building full-stack web applications, CRMs, POS systems, and custom software solutions for clients.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    current: true,
  },
  {
    company: 'Terminal 13',
    role: 'Solo Developer & Designer',
    period: '2024',
    description: 'Designed and shipped an interactive detective mystery game with terminal-style UI and evidence investigation mechanics.',
    tech: ['Astro', 'React', 'Game Design'],
    current: false,
  },
  {
    company: 'CRM Snowy',
    role: 'Full-Stack Lead',
    period: '2024',
    description: 'Led development of a comprehensive CRM system with real-time analytics, automated workflows, and team collaboration.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
    current: false,
  },
  {
    company: 'POS Snowy',
    role: 'Full-Stack Developer',
    period: '2024',
    description: 'Built a cloud-based POS system with real-time inventory tracking and Stripe payment integration.',
    tech: ['React', 'Node.js', 'Stripe', 'WebSocket'],
    current: false,
  },
  {
    company: 'Creative Writing',
    role: 'Author',
    period: 'Ongoing',
    description: 'Writing dark fantasy and sci-fi fiction. Published multiple chapters of original series and lore bibles.',
    tech: ['Dark Fantasy', 'Sci-Fi', 'World Building'],
    current: true,
  },
];

export default function ExperienceApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a14] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">💼</span>
          <h2 className="text-sm font-semibold text-gray-200">Experience</h2>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-2xl mx-auto">
          {/* Intro - Drake Style */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Work History</h3>
            <p className="text-sm text-gray-500">A timeline of my professional journey and key projects.</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-blood/40 via-blood/20 to-transparent" />

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-12 group">
                  {/* Timeline Dot */}
                  <div className={`absolute left-[13px] top-6 w-3 h-3 rounded-full border-2 z-10 ${
                    exp.current
                      ? 'bg-blood border-blood/50 shadow-sm shadow-blood/30'
                      : 'bg-[#0a0a14] border-gray-700 group-hover:border-blood/40'
                  }`} />

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">{exp.role}</h4>
                        <p className="text-xs text-blood/70 font-medium">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                          exp.current
                            ? 'bg-blood/15 text-blood border border-blood/20'
                            : 'bg-white/5 text-gray-500 border border-white/5'
                        }`}>
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed mb-3">{exp.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map(t => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-gray-500 border border-white/5">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}