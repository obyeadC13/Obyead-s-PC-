import { Mail, Phone, Globe, MessageCircle, ExternalLink, ArrowUpRight } from 'lucide-react';
import { profile } from '../data/cv';

const phone = profile.phone.replace(/[^+\d]/g, '');
const waNumber = phone.replace('+', '');

const actions = [
  {
    label: 'WhatsApp',
    sub: 'Fastest — I usually reply same day',
    icon: MessageCircle,
    href: `https://wa.me/${waNumber}?text=${encodeURIComponent("Hi Obyead! I found your portfolio and wanted to reach out.")}`,
    accent: 'text-green-400',
    ring: 'border-green-900/40 hover:border-green-500/50',
    bg: 'from-green-950/30 to-emerald-950/20',
  },
  {
    label: 'Email',
    sub: profile.email,
    icon: Mail,
    href: `mailto:${profile.email}?subject=${encodeURIComponent('Contact from your portfolio')}`,
    accent: 'text-blood',
    ring: 'border-blood/30 hover:border-blood/60',
    bg: 'from-blood/10 to-red-950/20',
  },
  {
    label: 'Call',
    sub: profile.phone,
    icon: Phone,
    href: `tel:${phone}`,
    accent: 'text-sky-400',
    ring: 'border-sky-900/40 hover:border-sky-500/50',
    bg: 'from-sky-950/30 to-blue-950/20',
  },
];

export default function ContactApp(_props: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">✉️</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Contact Me</h2>
            <p className="text-[10px] text-gray-500">Tap a card to message, mail or call me</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-xs text-gray-400 mb-4">
          Have a project in mind, a role to fill, or just want to say hi? Pick whichever feels easiest — I answer all of them.
        </p>
        <div className="grid gap-3">
          {actions.map(({ label, sub, icon: Icon, href, accent, ring, bg }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
              className={`group flex items-center gap-4 p-4 rounded-xl border ${ring} bg-gradient-to-br ${bg} transition-all`}>
              <div className="w-10 h-10 rounded-lg bg-black/30 border border-white/5 flex items-center justify-center">
                <Icon size={18} className={accent} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-200">{label}</p>
                <p className="text-[11px] text-gray-500 truncate">{sub}</p>
              </div>
              <ArrowUpRight size={16} className="text-gray-600 group-hover:text-gray-300 transition-colors" />
            </a>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
          <a href={profile.website} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <Globe size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300 flex-1">obyeadsworld.netlify.app</span>
            <ExternalLink size={14} className="text-gray-600 group-hover:text-blood transition-colors" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <ExternalLink size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300 flex-1">github.com/{profile.githubHandle}</span>
            <ExternalLink size={14} className="text-gray-600 transition-colors" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <ExternalLink size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300 flex-1">linkedin.com/in/md-obyead-a70749259</span>
            <ExternalLink size={14} className="text-gray-600 transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
