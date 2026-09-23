import { X, Send } from 'lucide-react';
import { useState } from 'react';

interface Comment { id: number; name: string; text: string; date: string; }

export default function CommentsApp({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', text: '' });
  const [posted, setPosted] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, name: 'Alex Chen', text: 'Incredible portfolio! The cyberpunk aesthetic is 🔥', date: 'Aug 5, 2026' },
    { id: 2, name: 'Sarah Kim', text: 'Love the dark fantasy theme. Terminal 13 is a must-play!', date: 'Aug 3, 2026' },
  ]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Guestbook</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        <form onSubmit={e => {
          e.preventDefault();
          if (!form.name.trim() || !form.text.trim()) return;
          setComments(prev => [{ id: Date.now(), name: form.name, text: form.text, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }, ...prev]);
          setForm({ name: '', text: '' });
          setPosted(true);
          setTimeout(() => setPosted(false), 2500);
        }} className="mb-4 space-y-2">
          <div className="flex gap-2">
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your name" className="flex-1 px-3 py-1.5 rounded-lg text-xs bg-black/20 text-gray-300 outline-none border border-red-900/20 focus:border-blood/50 transition-colors" />
          </div>
          <textarea required value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={2}
            placeholder="Leave a comment..." className="w-full px-3 py-1.5 rounded-lg text-xs bg-black/20 text-gray-300 outline-none border border-red-900/20 focus:border-blood/50 transition-colors resize-none" />
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-600">{form.text.length} chars</span>
            <button type="submit" className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-medium bg-blood text-white hover:bg-crimson transition-colors">
              <Send size={11} /> Post
            </button>
          </div>
        </form>
        {posted && <div className="mb-3 text-[11px] text-green-400 animate-fadeIn">✓ Posted!</div>}
        <div className="space-y-3">
          {comments.map(c => (
            <div key={c.id} className="animate-slideUp">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-[12px] font-medium text-gray-300">{c.name}</span>
                <span className="text-[9px] text-gray-600">{c.date}</span>
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}