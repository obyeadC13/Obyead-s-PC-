import { BookOpen, MapPin, Briefcase, PenLine, Search, LayoutTemplate } from 'lucide-react';
import { profile, experience } from '../data/cv';

const WRITING_KEYS = ['AP2T Labs', 'GameRiv'];

const writingExperience = experience.filter(e => WRITING_KEYS.includes(e.company));

const writingSkills = [
  { icon: <Search size={14} className="text-blood" />, label: 'SEO & WordPress', note: 'Gaming content, on-page optimization, editorial workflow' },
  { icon: <PenLine size={14} className="text-blood" />, label: 'Content Strategy', note: 'Brand UVPs, tone of voice, messaging across channels' },
  { icon: <LayoutTemplate size={14} className="text-blood" />, label: 'Editorial & Quality Control', note: 'Article reviews, section management, publishing' },
];

export default function WriterApp() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">📝</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Writer</h2>
            <p className="text-[10px] text-gray-500">My writing experience</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-6 p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <p className="text-sm text-gray-400 leading-relaxed">
            Writer and content strategist — {profile.title.split('·')[2]?.trim() || 'Writer'}. I research, edit, and publish content for gaming and tech audiences, and lead brand messaging for the teams I work with.
          </p>
        </div>

        <section className="mb-6">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen size={13} className="text-blood" /> Writing Skills
          </h4>
          <div className="space-y-2">
            {writingSkills.map(s => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blood/10 border border-blood/20 flex items-center justify-center shrink-0">{s.icon}</div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-300">{s.label}</p>
                  <p className="text-[11px] text-gray-500 truncate">{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Briefcase size={13} className="text-blood" /> Writing Experience
          </h4>
          <div className="space-y-3">
            {writingExperience.map((e, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/20 transition-all">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-200">{e.role}</p>
                    <p className="text-[11px] text-blood/80">{e.company}</p>
                  </div>
                  <span className="text-[10px] text-gray-500 whitespace-nowrap px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">{e.period}</span>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <MapPin size={11} className="text-gray-600" />
                  <span className="text-[10px] text-gray-500">{e.location}</span>
                </div>
                <ul className="space-y-1.5">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-[12px] text-gray-400 leading-relaxed">
                      <span className="text-blood/60 mt-0.5">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
