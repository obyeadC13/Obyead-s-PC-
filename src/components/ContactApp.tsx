import { X, Check } from 'lucide-react';
import { useState } from 'react';

export default function ContactApp({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Contact</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex-1 p-5 overflow-y-auto">
        {sent ? (
          <div className="h-full flex flex-col items-center justify-center text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-950/40 border border-green-900/30 flex items-center justify-center">
              <Check size={18} className="text-green-400" />
            </div>
            <h4 className="text-sm font-semibold text-gray-200">Message Sent!</h4>
            <p className="text-xs text-gray-500">I'll get back to you soon.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); setTimeout(() => { setSent(false); setForm({ name: '', email: '', message: '' }); }, 3000); }} className="space-y-3">
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
placeholder="Name" className="w-full px-3 py-2 rounded-lg text-sm bg-black/20 text-gray-300 outline-none border border-red-900/20 focus:border-blood/50 transition-colors" />
              <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="Email" className="w-full px-3 py-2 rounded-lg text-sm bg-black/20 text-gray-300 outline-none border border-red-900/20 focus:border-blood/50 transition-colors" />
              <textarea required value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                placeholder="Message" className="w-full px-3 py-2 rounded-lg text-sm bg-black/20 text-gray-300 outline-none border border-red-900/20 focus:border-blood/50 transition-colors resize-none" />
            <button type="submit" className="w-full py-2.5 rounded-lg text-xs font-medium bg-blood text-white hover:bg-crimson transition-colors shadow-[0_0_20px_rgba(220,38,38,0.2)]">
              Send Message
            </button>
          </form>
        )}
        <div className="mt-5 pt-4 border-t border-red-900/10 flex flex-wrap gap-2">
          {['GitHub', 'LinkedIn', 'Twitter', 'hello@obyead.dev'].map(s => (
            <span key={s} className="text-[10px] px-2.5 py-1 rounded bg-black/20 text-gray-500 border border-red-900/15">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}