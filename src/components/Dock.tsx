import { useState } from 'react';

const apps = [
  { id: 'finder', icon: '🗂', label: 'Finder' },
  { id: 'web', icon: '🌐', label: 'Web Dev', action: 'web' },
  { id: 'games', icon: '🎮', label: 'Games', action: 'games' },
  { id: 'projects', icon: '📁', label: 'Projects', action: 'writing' },
  { id: 'about', icon: '👤', label: 'About', action: 'about' },
  { id: 'contact', icon: '✉', label: 'Contact', action: 'contact' },
  { id: 'comments', icon: '💬', label: 'Comments', action: 'comments' },
  { id: 'divider' },
  { id: 'terminal', icon: '⬡', label: 'Terminal', action: 'terminal' },
];

export default function Dock({ onOpen, hovered, setHovered, openWindows }: {
  onOpen: (action: string) => void;
  hovered: string | null;
  setHovered: (id: string | null) => void;
  openWindows: Array<{ category: string }>;
}) {
  const [bouncing, setBouncing] = useState<string | null>(null);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[200] flex flex-col items-center">
      {/* Tooltip */}
      {hovered && (
        <div className="mb-1 px-3 py-1 rounded-md text-[11px] font-medium text-[#cdd6f4] animate-fadeIn"
          style={{ background: 'rgba(20,20,30,0.9)', border: '1px solid rgba(205,214,244,0.06)' }}>
          {apps.find(a => a.id === hovered)?.label}
        </div>
      )}

      <div className="flex items-end gap-2 px-3 py-2 rounded-[14px]"
        style={{
          background: 'rgba(14,14,24,0.55)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(205,214,244,0.05)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(205,214,244,0.04)',
        }}>
        {apps.map(app => {
          if (app.id === 'divider') {
            return <div key="div" className="w-px h-10 mx-1 bg-[#313244]" />;
          }

          const isHov = hovered === app.id;
          const size = isHov ? 52 : 44;
          const action = (app as any).action;
          const isOpen = action && openWindows.some(w => w.category === action);

          return (
            <button
              key={app.id}
              onClick={() => { if (action) { setBouncing(app.id); setTimeout(() => setBouncing(null), 500); onOpen(action); } }}
              onMouseEnter={() => setHovered(app.id)}
              onMouseLeave={() => setHovered(null)}
              className="relative flex flex-col items-center transition-transform duration-200"
              style={{
                width: size,
                height: size,
                animation: bouncing === app.id ? 'bounce 0.5s cubic-bezier(0.34,1.56,0.64,1)' : 'none',
              }}
            >
              <span className={`text-2xl transition-transform duration-200 ${isHov ? '-translate-y-2' : ''}`}>
                {app.icon}
              </span>
              {isOpen && (
                <div className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-[#89b4fa]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}