import { X, Mail, ExternalLink, Copy, MapPin, Zap, Code, Gamepad2, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';

const stats = [
  { value: '9', label: 'Projects Shipped', suffix: '+' },
  { value: '3', label: 'Years Experience', suffix: '+' },
  { value: '500', label: 'Commits This Year', suffix: '+' },
];

const socials = [
  { icon: 'github', url: 'https://github.com/obyead', label: 'GitHub' },
  { icon: 'linkedin', url: 'https://linkedin.com/in/obyead', label: 'LinkedIn' },
];

export default function AboutApp({ onClose }: { onClose: () => void }) {
  const { showToast, openApp } = useApp();

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@obyead.dev');
    showToast('Email copied!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">👤</span>
          <h2 className="text-sm font-semibold text-gray-200">About Me</h2>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero Section - Drake/Jayden Style */}
        <div className="relative px-6 py-10 bg-gradient-to-b from-red-950/10 via-transparent to-transparent">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blood/30 to-red-950/40 border border-blood/20 flex items-center justify-center shrink-0 shadow-lg shadow-blood/10">
              <span className="text-4xl font-bold text-white">OB</span>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-950/30 border border-green-800/30 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs text-green-400">Available for projects</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">Obyead</h1>
              <p className="text-sm text-blood/70 font-medium mb-3">Full-Stack Developer • Game Creator • Writer</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={12} />
                <span>Based on the internet</span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <button onClick={() => openApp('contact')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blood text-white text-sm font-medium hover:bg-red-600 transition-all shadow-lg shadow-blood/20 hover:shadow-blood/30">
                  <Mail size={14} /> Contact Me
                </button>
                <button onClick={() => openApp('resume')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/5 hover:border-white/20 transition-all">
                  <ExternalLink size={14} /> Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counters - Drake Style */}
        <div className="px-6 py-6 border-b border-white/5">
          <div className="grid grid-cols-3 gap-4">
            {stats.map(stat => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-2xl font-bold text-white mb-1">{stat.value}<span className="text-blood text-xl">{stat.suffix}</span></div>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio Section */}
        <div className="px-6 py-6 border-b border-white/5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Introduction</h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">
            My passion lies in crafting elegant, functional digital experiences. Full-stack developer, game creator, and writer. I build things that work, play things I make, and write about both.
          </p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Currently exploring the intersection of interactive narratives and modern web technologies. Terminal 13 was my first shipped game. This portfolio is my second experiment.
          </p>
        </div>

        {/* Focus Areas - Drake Style */}
        <div className="px-6 py-6 border-b border-white/5">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">What I Do</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Code size={18} />, title: 'Full-Stack Web', desc: 'React, Node.js, PostgreSQL, Redis', color: '#6366f1' },
              { icon: <Gamepad2 size={18} />, title: 'Game Development', desc: 'Custom engines, pixel art, web games', color: '#10b981' },
              { icon: <BookOpen size={18} />, title: 'Creative Writing', desc: 'Dark fantasy, sci-fi, lore bibles', color: '#f59e0b' },
              { icon: <Zap size={18} />, title: 'Interactive Design', desc: 'UI/UX, animations, portfolios', color: '#ec4899' },
            ].map(area => (
              <div key={area.title} className="group p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${area.color}15`, color: area.color }}>
                  {area.icon}
                </div>
                <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{area.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="px-6 py-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Connect</h3>
          <div className="flex flex-col gap-2">
            <button onClick={copyEmail}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
              <Mail size={16} className="text-gray-500" />
              <span className="text-sm text-gray-300 flex-1">hello@obyead.dev</span>
              <Copy size={14} className="text-gray-600 hover:text-blood transition-colors" />
            </button>
            {socials.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300">{s.label}</span>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}