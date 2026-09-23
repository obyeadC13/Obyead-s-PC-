import { useState } from 'react';
import { FolderOpen, User, Zap, Terminal, FileText, Mail } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { taskbarApps, getAppConfig } from '../data/apps';

const iconFor: Record<string, any> = {
  projects: FolderOpen,
  about: User,
  skills: Zap,
  terminal: Terminal,
  resume: FileText,
  contact: Mail,
};

export default function Taskbar({ startOpen, onToggleStart, time }: {
  startOpen: boolean;
  onToggleStart: () => void;
  time: Date;
}) {
  const { windows, focusedId, openApp, minimizeWindow, focusWindow } = useApp();
  const [hovered, setHovered] = useState<string | null>(null);

  const running = windows.filter(w => !w.minimized);

  return (
    <div
      className="absolute left-0 right-0 bottom-0 z-[400] h-12 flex items-center px-4"
      style={{
        background: 'rgba(20,20,20,0.72)',
        backdropFilter: 'blur(24px) saturate(1.4)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.35)',
      }}
    >
      <button
        onClick={onToggleStart}
        className={`h-9 px-3 flex items-center gap-2 rounded-lg transition-colors ${startOpen ? 'bg-white/10' : 'hover:bg-white/10'}`}
      >
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#863bff] to-[#5b1fa8] flex items-center justify-center">
          <span className="text-[9px] font-bold text-white">OB</span>
        </div>
        <span className="text-xs font-medium text-gray-300">Obyead</span>
      </button>

      <div className="flex-1 flex items-center justify-center gap-1">
        {running.length > 0
          ? running.map(win => {
              const cfg = getAppConfig(win.appId);
              const Icon = iconFor[win.appId];
              if (!cfg || !Icon) return null;
              const isFocused = focusedId === win.id;
              return (
                <button
                  key={win.id}
                  onClick={() => (isFocused ? minimizeWindow(win.id) : focusWindow(win.id))}
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                >
                  <Icon size={18} className={isFocused ? 'text-gray-100' : 'text-gray-400'} />
                  <span className={`absolute bottom-1 w-1 h-1 rounded-full ${isFocused ? 'bg-[#863bff]' : 'bg-gray-600'}`} />
                </button>
              );
            })
          : taskbarApps.map((item, idx) => {
              const Icon = iconFor[item.id];
              if (!Icon) return null;
              return (
                <button
                  key={item.id}
                  onClick={() => openApp(item.id, { w: item.defaultWidth, h: item.defaultHeight })}
                  onMouseEnter={() => setHovered(item.id)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center transition-all hover:bg-white/10"
                  style={{ animation: `iconAppear 0.3s cubic-bezier(0.34,1.56,0.64,1) ${0.4 + idx * 0.04}s both` }}
                >
                  <Icon size={18} className="text-gray-400" />
                  {hovered === item.id && (
                    <span className="absolute -top-8 px-2.5 py-1 rounded-md text-[11px] text-gray-200 whitespace-nowrap z-50 bg-[#1c1c1c]/95 border border-white/10 shadow-lg">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
      </div>

      <div className="w-14 text-right">
        <span className="text-[11px] text-gray-400 tabular-nums">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}
