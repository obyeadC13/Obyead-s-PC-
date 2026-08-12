import { X, Mail, ExternalLink, Send, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ContactApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@obyead.dev');
    showToast('Email copied!', 'success');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
    showToast('Message sent!', 'success');
    setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">✉️</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Contact</h2>
            <p className="text-[10px] text-gray-500">Get in touch</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5">
        {sent ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-green-950/40 border border-green-900/30 flex items-center justify-center">
              <Check size={22} className="text-green-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">Message Sent!</h4>
            <p className="text-xs text-gray-500">I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Name" className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 text-gray-300 outline-none border border-white/10 focus:border-blood/50 transition-colors placeholder:text-gray-600" />
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="Email" className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 text-gray-300 outline-none border border-white/10 focus:border-blood/50 transition-colors placeholder:text-gray-600" />
            <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
              placeholder="Message" className="w-full px-3 py-2.5 rounded-lg text-sm bg-white/5 text-gray-300 outline-none border border-white/10 focus:border-blood/50 transition-colors resize-none placeholder:text-gray-600" />
            <button type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-medium bg-blood/10 text-blood hover:bg-blood/20 disabled:opacity-50 transition-colors border border-blood/20 flex items-center justify-center gap-2">
              {loading ? (
                <div className="w-4 h-4 border-2 border-blood/30 border-t-blood rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={14} /> Send Message
                </>
              )}
            </button>
          </form>
        )}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
          <button onClick={copyEmail}
            className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <Mail size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300 flex-1">hello@obyead.dev</span>
            <Copy size={14} className="text-gray-600 hover:text-blood transition-colors" />
          </button>
          <a href="https://github.com/obyead" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <ExternalLink size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300">github.com/obyead</span>
            <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
          </a>
          <a href="https://linkedin.com/in/obyead" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:border-blood/30 hover:bg-blood/[0.02] transition-all text-left">
            <ExternalLink size={14} className="text-gray-500" />
            <span className="text-sm text-gray-300">linkedin.com/in/obyead</span>
            <ExternalLink size={14} className="text-gray-600 hover:text-blood transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}