import { Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { profile, education, experience, skillGroups, projects, honors } from '../data/cv';

export default function ResumeApp(_props: { onClose: () => void }) {
  const { showToast } = useApp();

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = profile.cvUrl;
    a.download = 'Mohammed-Obyead-CV-2026.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast('Resume download started', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">📄</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Resume.pdf</h2>
            <p className="text-[10px] text-gray-500">{profile.name} — updated 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blood/10 text-blood text-xs font-medium hover:bg-blood/20 transition-colors border border-blood/20">
            <Download size={13} /> Download
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl bg-[#111119] border border-white/5 rounded-lg shadow-2xl my-4 px-8 py-7">

          {/* Header */}
          <div className="text-center border-b border-white/10 pb-5 mb-5">
            <h1 className="text-2xl font-bold text-white tracking-wide">{profile.name}</h1>
            <p className="text-sm text-blood mt-1 font-medium">{profile.title}</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-3 text-[11px] text-gray-400">
              <span>📍 {profile.location}</span>
              <span>📞 {profile.phone}</span>
              <span>✉ {profile.email}</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1 text-[11px]">
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-blood/80 hover:text-blood">{profile.website.replace('https://', '')}</a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blood/80 hover:text-blood">github.com/{profile.githubHandle}</a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blood/80 hover:text-blood">linkedin.com/in/md-obyead-a70749259</a>
            </div>
          </div>

          {/* Education */}
          <Section title="Education">
            {education.map(ed => (
              <div key={ed.school} className="mb-3 last:mb-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-[13px] font-semibold text-gray-200">{ed.degree}</h3>
                  <span className="text-[11px] text-gray-500">{ed.period}</span>
                </div>
                <p className="text-xs text-gray-400">{ed.school} — {ed.location}</p>
                {ed.details && <p className="text-[11px] text-gray-500 mt-0.5">{ed.details}</p>}
              </div>
            ))}
          </Section>

          {/* Skills */}
          <Section title="Skills">
            <div className="space-y-2">
              {skillGroups.map(g => (
                <div key={g.key} className="flex gap-2 text-xs">
                  <span className="w-24 shrink-0 text-gray-500 font-medium">{g.label}:</span>
                  <span className="text-gray-400">{g.items.join(', ')}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section title="Experience">
            {experience.map((xp, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="text-[13px] font-semibold text-gray-200">
                    {xp.role} · <span className="text-blood/90">{xp.company}</span>
                  </h3>
                  <span className="text-[11px] text-gray-500">{xp.period}</span>
                </div>
                <p className="text-[11px] text-gray-500 mb-1.5">{xp.location}</p>
                <ul className="space-y-1">
                  {xp.bullets.map((b, j) => (
                    <li key={j} className="text-xs text-gray-400 leading-relaxed pl-3 relative">
                      <span className="absolute left-0 top-[7px] w-1 h-1 rounded-full bg-blood/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>

          {/* Projects */}
          <Section title="Projects">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((p, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-[13px] font-semibold text-gray-200">{p.name}</h3>
                    {p.year && <span className="text-[11px] text-gray-500">{p.year}</span>}
                  </div>
                  <p className="text-[11px] text-gray-500 mb-1">{p.role}</p>
                  <ul className="space-y-1">
                    {p.bullets.map((b, j) => (
                      <li key={j} className="text-xs text-gray-400 leading-relaxed pl-3 relative">
                        <span className="absolute left-0 top-[7px] w-1 h-1 rounded-full bg-blood/60" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blood/80 hover:text-blood mt-1 inline-block">
                      {p.link.replace('https://', '')}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {/* Honors */}
          <Section title="Honors & Awards">
            <ul className="space-y-1">
              {honors.map((h, i) => (
                <li key={i} className="text-xs text-gray-400 leading-relaxed pl-3 relative">
                  <span className="absolute left-0 top-[7px] w-1 h-1 rounded-full bg-blood/60" />
                  {h}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <h2 className="text-xs font-bold text-blood uppercase tracking-wider mb-3 pb-1 border-b border-white/5">{title}</h2>
      {children}
    </div>
  );
}
