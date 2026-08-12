import { X, Mail, ExternalLink, Copy, Send } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const budgets = ['< $1,000', '$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $20,000', '> $20,000'];

export default function ContactApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', message: '', budget: '', type: 'web' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@obyead.dev');
    showToast('Email copied!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
    showToast('Message sent!', 'success');
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '', budget: '', type: 'web' }); }, 4000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14] overflow-hidden">
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">✉️</span>
          <h2 className="text-sm font-semibold text-gray-200">Contact</h2>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sent ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-4 px-6">
            <div className="w-16 h-16 rounded-full bg-green-950/30 border border-green-800/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="text-sm text-gray-500 max-w-xs">Thanks for reaching out. I'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <div className="px-6 py-6 max-w-lg mx-auto">
            {/* Intro */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Let's Work Together</h3>
              <p className="text-sm text-gray-500">Have a project in mind? Fill out the form and I'll get back to you soon.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Your Name *</label>
                  <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-blood/40 transition-colors placeholder:text-gray-600"
                    placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">Your Email *</label>
                  <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-blood/40 transition-colors placeholder:text-gray-600"
                    placeholder="john@example.com" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Project Type</label>
                <div className="flex gap-2">
                  {['web', 'game', 'writing'].map(t => (
                    <button key={t} type="button"
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium transition-all ${
                        form.type === t
                          ? 'bg-blood/15 text-blood border border-blood/30'
                          : 'text-gray-500 border border-white/5 hover:bg-white/5'
                      }`}>
                      {t === 'web' ? '🌐 Web' : t === 'game' ? '🎮 Game' : '✍️ Writing'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {budgets.map(b => (
                    <button key={b} type="button"
                      onClick={() => setForm({ ...form, budget: b })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        form.budget === b
                          ? 'bg-blood/15 text-blood border border-blood/30'
                          : 'text-gray-500 border border-white/5 hover:bg-white/5'
                      }`}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">Message *</label>
                <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                  className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.03] text-gray-300 outline-none border border-white/10 focus:border-blood/40 transition-colors resize-none placeholder:text-gray-600"
                  placeholder="Tell me about your project..." />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-semibold bg-blood text-white hover:bg-red-600 disabled:opacity-50 transition-all shadow-lg shadow-blood/20 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={14} /> Send Message
                  </>
                )}
              </button>
            </form>

            {/* Quick Contact */}
            <div className="mt-8 pt-6 border-t border-white/5 space-y-2">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Contact</h4>
              <button onClick={copyEmail}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <Mail size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300 flex-1">hello@obyead.dev</span>
                <Copy size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </button>
              <a href="https://github.com/obyead" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300">github.com/obyead</span>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
              <a href="https://linkedin.com/in/obyead" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
                <ExternalLink size={16} className="text-gray-500" />
                <span className="text-sm text-gray-300">linkedin.com/in/obyead</span>
                <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}