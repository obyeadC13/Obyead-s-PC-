import { X, Mail, ExternalLink, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AboutApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@obyead.dev');
    showToast('Email copied!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">About Me</h2>
            <p className="text-[10px] text-gray-500">Who I am</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center shadow-lg shadow-blood/10">
            <span className="text-2xl font-bold text-white">OB</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-200">Obyead</h3>
            <p className="text-sm text-blood/70">Full-Stack Developer • Game Creator • Writer</p>
          </div>
        </div>

        <div className="space-y-4">
          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Intro</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              I build things that work, play things I make, and write about both. Currently exploring the intersection of interactive narratives and modern web technologies.
            </p>
          </section>

          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Focus Areas</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Full-Stack Web', icon: '🌐' },
                { label: 'Game Development', icon: '🎮' },
                { label: 'Creative Writing', icon: '✍️' },
                { label: 'UI/UX Design', icon: '🎨' },
              ].map(area => (
                <div key={area.label} className="flex items-center gap-2 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-lg">{area.icon}</span>
                  <span className="text-sm text-gray-300">{area.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Work</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Shipping Terminal 13 — an interactive detective mystery game. Building the next generation of portfolio experiences.
            </p>
          </section>

          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Contact</h4>
            <div className="space-y-2">
              <button onClick={copyEmail}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <Mail size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">hello@obyead.dev</p>
                  <p className="text-[10px] text-gray-500">Email me anytime</p>
                </div>
                <Copy size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </button>
              <a href="https://github.com/obyead" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">github.com/obyead</p>
                  <p className="text-[10px] text-gray-500">Check out my code</p>
                </div>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}