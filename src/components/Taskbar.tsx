import { useState } from 'react';
import { Globe, Gamepad2, BookText, Terminal, Mail, MessageSquare, User, FolderOpen, Settings } from 'lucide-react';

interface TaskbarProps {
  startOpen: boolean;
  onToggleStart: () => void;
  onLaunch: (id: string) => void;
  openWindows: string[];
  time: Date;
}

const dockItems = [
  { id: 'mywork', icon: <FolderOpen size={18} />, label: 'My Work' },
  { id: 'browser', icon: <Globe size={18} />, label: 'Browser' },
  { id: 'games', icon: <Gamepad2 size={18} />, label: 'Game Vault' },
  { id: 'manuscripts', icon: <BookText size={18} />, label: 'Manuscripts' },
  { id: 'terminal', icon: <Terminal size={18} />, label: 'Terminal' },
  { id: 'contact', icon: <Mail size={18} />, label: 'Contact' },
  { id: 'comments', icon: <MessageSquare size={18} />, label: 'Guestbook' },
  { id: 'about', icon: <User size={18} />, label: 'About' },
  { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
];

export default function Taskbar({ startOpen, onToggleStart, onLaunch, openWindows, time }: TaskbarProps) {
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
        className={`h-full px-4 flex items-center gap-2 transition-all duration-200 rounded-l-xl ${
          startOpen ? 'bg-blood/15' : 'hover:bg-blood/8'
        }`}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blood to-red-950 flex items-center justify-center"
          style={{ boxShadow: '0 0 12px rgba(220,38,38,0.4), 0 0 24px rgba(220,38,38,0.15)' }}>
          <span className="text-[10px] font-bold text-white" style={{ textShadow: '0 0 4px rgba(255,255,255,0.5)' }}>OB</span>
        </div>
        <span className="text-xs font-bold text-gray-300 hidden sm:block" style={{ textShadow: '0 0 6px rgba(220,38,38,0.3)' }}>Obyead's PC</span>
      </button>

      <div className="w-px h-6 mx-2 bg-blood/20" style={{ boxShadow: '0 0 4px rgba(220,38,38,0.15)' }} />

      <div className="flex items-center gap-0.5 px-2 flex-1 justify-center">
        {dockItems.map((item, idx) => {
          const isOpen = openWindows.includes(item.id);
          const isHov = hovered === item.id;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {isHov && (
                <div className="absolute -top-8 px-2.5 py-1 rounded-md text-[10px] text-gray-300 whitespace-nowrap"
                  style={{
                    background: 'rgba(8, 8, 20, 0.9)',
                    border: '1px solid rgba(220,38,38,0.3)',
                    boxShadow: '0 0 12px rgba(220,38,38,0.15)',
                    animation: 'fadeIn 0.15s ease-out',
                  }}>
                  {item.label}
                </div>
              )}
              <button onClick={() => onLaunch(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isHov ? 'bg-blood/15 scale-125 -translate-y-2' : ''
                } ${isOpen ? '' : ''}`}
                style={{
                  animation: `iconAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.6 + idx * 0.05}s both`,
                  ...(isOpen ? {
                    boxShadow: '0 0 0 1px rgba(220,38,38,0.5), 0 0 16px rgba(220,38,38,0.2)',
                    background: 'rgba(220,38,38,0.1)',
                  } : {}),
                }}>
                <span className={`transition-colors ${
                  isOpen ? 'text-blood' : isHov ? 'text-gray-300' : 'text-gray-600'
                }`} style={isOpen ? { filter: 'drop-shadow(0 0 4px rgba(220,38,38,0.5))' } : {}}>
                  {item.icon}
                </span>
              </button>
              {isOpen && (
                <div className="w-1 h-1 rounded-full bg-blood mt-0.5"
                  style={{ boxShadow: '0 0 6px rgba(220,38,38,0.6)', animation: 'neonPulse 2s ease-in-out infinite' }} />
              )}
            </div>
          );
        })}
      </div>

      <div className="w-px h-6 mx-2 bg-blood/20" style={{ boxShadow: '0 0 4px rgba(220,38,38,0.15)' }} />

      <div className="flex items-center gap-2.5 px-4">
        <span className="text-[10px] text-gray-500 hover:text-blood transition-colors cursor-pointer">🔋</span>
        <span className="text-[10px] text-gray-500 hover:text-blood transition-colors cursor-pointer">📶</span>
        <span className="text-[10px] text-gray-500 hover:text-blood transition-colors cursor-pointer">🔊</span>
        <div className="w-px h-4 bg-blood/15" />
        <span className="text-xs text-gray-400 tabular-nums font-mono"
          style={{ textShadow: '0 0 6px rgba(220,38,38,0.2)' }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    </div>
  );
}