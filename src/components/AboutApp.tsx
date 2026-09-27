import { Mail, ExternalLink, Copy, MapPin, Phone, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { profile } from '../data/cv';

export default function AboutApp(_props: { onClose: () => void }) {
  const { showToast } = useApp();

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    showToast('Email copied!', 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">About Me</h2>
            <p className="text-[10px] text-gray-500">Who I am</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center shadow-lg shadow-blood/10">
            <span className="text-xl font-bold text-white">MO</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-200">{profile.name}</h3>
            <p className="text-sm text-blood/70">{profile.title}</p>
          </div>
        </div>

        <div className="mb-5 p-3 rounded-lg bg-white/[0.02] border border-white/5">
          <p className="text-sm text-gray-400 italic leading-relaxed">“{profile.tagline}”</p>
        </div>

        <div className="space-y-4">
          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Current Work</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{profile.currentFocus}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Location & Contact</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5">
                <MapPin size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300">{profile.location}</span>
              </div>
              <button onClick={copyEmail}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <Mail size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{profile.email}</p>
                  <p className="text-[10px] text-gray-500">Email me anytime</p>
                </div>
                <Copy size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </button>
              <a href={`tel:${profile.phone.replace(/[^+\d]/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <Phone size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300">{profile.phone}</span>
              </a>
            </div>
          </section>

          <section>
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Links</h4>
            <div className="space-y-2">
              <a href={profile.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <Globe size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">obyeadsworld.netlify.app</p>
                  <p className="text-[10px] text-gray-500">My website</p>
                </div>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">{profile.githubHandle}</p>
                  <p className="text-[10px] text-gray-500">Check out my code</p>
                </div>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-300">linkedin.com/in/md-obyead-a70749259</p>
                  <p className="text-[10px] text-gray-500">Let's connect</p>
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
