import { useState } from 'react';
import { FolderOpen, User, Zap, Terminal, FileText, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';

const dockItems = [
  { id: 'projects', icon: FolderOpen, label: 'Projects' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'skills', icon: Zap, label: 'Skills' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
  { id: 'resume', icon: FileText, label: 'Resume' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export default function Taskbar({ startOpen, onToggleStart, time }: {
  startOpen: boolean;
  onToggleStart: () => void;
  time: Date;
}) {
  const { windows, openApp, minimizeWindow, focusWindow } = useApp();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-2 inset-x-4 z-[400] h-12 flex items-center rounded-xl"
      style={{
        background: 'rgba(8, 8, 20, 0.75)',
        backdropFilter: 'blur(30px) saturate(1.8)',
        border: '1px solid rgba(220,38,38,0.2)',
        boxShadow: '0 -2px 40px rgba(220,38,38,0.08), 0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}>
      <button onClick={onToggleStart}
        className={`h-full px-4 flex items-center gap-2 transition-all duration-200 rounded-l-xl ${startOpen ? 'bg-blood/15' : 'hover:bg-blood/8'}`}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blood to-red-950 flex items-center justify-center"
          style={{ boxShadow: '0 0 12px rgba(220,38,38,0.4), 0 0 24px rgba(220,38,38,0.15)' }}>
          <span className="text-[10px] font-bold text-white" style={{ textShadow: '0 0 4px rgba(255,255,255,0.5)' }}>OB</span>
        </div>
        <span className="text-xs font-bold text-gray-300 hidden sm:block" style={{ textShadow: '0 0 6px rgba(220,38,38,0.3)' }}>Obyead's PC</span>
      </button>

      <div className="w-px h-6 mx-2 bg-blood/20" style={{ boxShadow: '0 0 4px rgba(220,38,38,0.15)' }} />

      {/* Running apps */}
      <div className="flex items-center gap-0.5 px-2 flex-1 justify-center">
        {windows.filter(w => !w.minimized).length > 0 ? (
          windows.filter(w => !w.minimized).map(win => {
            const item = dockItems.find(d => d.id === win.appId);
            if (!item) return null;
            const Icon = item.icon;
            return (
              <div key={win.id} className="relative flex flex-col items-center">
                {hovered === win.id && (
                  <div className="absolute -top-8 px-2.5 py-1 rounded-md text-[10px] text-gray-300 whitespace-nowrap z-50"
                    style={{ background: 'rgba(8,8,20,0.9)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 12px rgba(220,38,38,0.15)' }}>
                    {win.title}
                  </div>
                )}
                <button
                  onClick={() => win.minimized ? focusWindow(win.id) : minimizeWindow(win.id)}
                  onMouseEnter={() => setHovered(win.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                  style={{
                    background: 'rgba(220,38,38,0.08)',
                    boxShadow: '0 0 0 1px rgba(220,38,38,0.3), 0 0 12px rgba(220,38,38,0.15)',
                  }}>
                  <Icon size={18} className="text-blood" style={{ filter: 'drop-shadow(0 0 4px rgba(220,38,38,0.4))' }} />
                </button>
                <div className="w-1 h-1 rounded-full bg-blood mt-0.5" style={{ boxShadow: '0 0 6px rgba(220,38,38,0.6)' }} />
              </div>
            );
          })
        ) : (
          dockItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="relative flex flex-col items-center">
                {hovered === item.id && (
                  <div className="absolute -top-8 px-2.5 py-1 rounded-md text-[10px] text-gray-300 whitespace-nowrap z-50"
                    style={{ background: 'rgba(8,8,20,0.9)', border: '1px solid rgba(220,38,38,0.3)', boxShadow: '0 0 12px rgba(220,38,38,0.15)' }}>
                    {item.label}
                  </div>
                )}
                <button onClick={() => openApp(item.id)}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${hovered === item.id ? 'scale-125 -translate-y-2' : ''}`}
                  style={{ animation: `iconAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + idx * 0.05}s both` }}>
                  <Icon size={18} className={hovered === item.id ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="w-px h-6 mx-2 bg-blood/20" style={{ boxShadow: '0 0 4px rgba(220,38,38,0.15)' }} />

      <div className="flex items-center gap-2.5 px-4">
        <span className="text-xs text-gray-400 tabular-nums font-mono" style={{ textShadow: '0 0 6px rgba(220,38,38,0.2)' }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    </div>
  );
}