import { StickyNote } from 'lucide-react';

export default function NotesWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-red-900/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <StickyNote size={12} className="text-yellow-500" />
        <span className="text-[10px] uppercase tracking-widest text-yellow-500/60 font-medium">Quick Notes</span>
      </div>
      <ul className="space-y-1.5">
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Update portfolio projects</span>
        </li>
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Write new blog post</span>
        </li>
        <li className="flex items-start gap-2 text-[10px] text-gray-400">
          <span className="text-yellow-500/60 mt-0.5">▸</span>
          <span>Review game mechanics</span>
        </li>
      </ul>
    </div>
  );
}