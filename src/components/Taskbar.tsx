import { useState } from 'react';
import { Globe, Gamepad2, BookText, Terminal, Mail, MessageSquare, User, FolderOpen } from 'lucide-react';

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
];

export default function Taskbar({ startOpen, onToggleStart, onLaunch, openWindows, time }: TaskbarProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-0 inset-x-0 z-[400] h-12 flex items-center"
      style={{ background: 'rgba(10,10,26,0.85)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(77,166,255,0.15)' }}>

      {/* Start Button */}
      <button onClick={onToggleStart}
        className={`h-full px-4 flex items-center gap-2 transition-colors ${startOpen ? 'bg-neon-cyan/10' : 'hover:bg-neon-cyan/5'}`}>
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan to-cyan-900 flex items-center justify-center shadow-[0_0_12px_rgba(77,166,255,0.3)]">
          <span className="text-[10px] font-bold text-black">OB</span>
        </div>
        <span className="text-xs font-bold text-gray-300 hidden sm:block">Obyead's PC</span>
      </button>

      {/* Divider */}
      <div className="w-px h-6 mx-2 bg-neon-cyan/20" />

      {/* Dock Items */}
      <div className="flex items-center gap-1 px-2 flex-1 justify-center">
        {dockItems.map(item => {
          const isOpen = openWindows.includes(item.id);
          const isHov = hovered === item.id;
          return (
            <div key={item.id} className="relative flex flex-col items-center">
              {isHov && (
                <div className="absolute -top-8 px-2 py-0.5 rounded text-[10px] text-gray-300 bg-black/90 border border-neon-cyan/30 whitespace-nowrap">
                  {item.label}
                </div>
              )}
              <button onClick={() => onLaunch(item.id)}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-150 ${isHov ? 'bg-neon-cyan/10 scale-110 -translate-y-1' : ''}`}
                style={isOpen ? { boxShadow: '0 0 0 1px rgba(77,166,255,0.4), 0 0 12px rgba(77,166,255,0.15)' } : {}}>
                <span className={isOpen ? 'text-neon-cyan' : 'text-gray-500'}>{item.icon}</span>
              </button>
              {isOpen && <div className="w-1 h-1 rounded-full bg-neon-cyan mt-0.5" />}
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-px h-6 mx-2 bg-neon-cyan/20" />

      {/* System Tray */}
      <div className="flex items-center gap-3 px-4">
        <span className="text-[10px] text-gray-500">🔋</span>
        <span className="text-[10px] text-gray-500">📶</span>
        <span className="text-xs text-gray-400 tabular-nums font-medium">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
      </div>
    </div>
  );
}