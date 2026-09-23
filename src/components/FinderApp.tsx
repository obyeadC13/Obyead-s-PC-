import { useState } from 'react';
import { X, Folder, FileText, Gamepad2, Globe, Mail, MessageSquare, User, Settings, ChevronRight } from 'lucide-react';

interface FileItem {
  name: string;
  icon: React.ReactNode;
  type: 'folder' | 'app' | 'link';
  action?: string;
  url?: string;
  items?: FileItem[];
}

const fileTree: FileItem[] = [
  { name: 'Projects', icon: <Folder size={14} />, type: 'folder', items: [
    { name: 'Terminal 13', icon: <Gamepad2 size={14} />, type: 'app', action: 'games' },
    { name: 'CRM Snowy', icon: <FileText size={14} />, type: 'app', action: 'browser' },
    { name: 'Portfolio', icon: <Globe size={14} />, type: 'app', action: 'about' },
  ]},
  { name: 'Documents', icon: <Folder size={14} />, type: 'folder', items: [
    { name: 'Manuscripts', icon: <FileText size={14} />, type: 'app', action: 'manuscripts' },
    { name: 'Contact Form', icon: <Mail size={14} />, type: 'app', action: 'contact' },
    { name: 'Guestbook', icon: <MessageSquare size={14} />, type: 'app', action: 'comments' },
  ]},
  { name: 'Social', icon: <Folder size={14} />, type: 'folder', items: [
    { name: 'LinkedIn', icon: <Globe size={14} />, type: 'link', url: 'https://linkedin.com' },
    { name: 'GitHub', icon: <Globe size={14} />, type: 'link', url: 'https://github.com' },
  ]},
  { name: 'About Me', icon: <User size={14} />, type: 'app', action: 'about' },
  { name: 'Settings', icon: <Settings size={14} />, type: 'app', action: 'settings' },
];

export default function FinderApp({ onClose, onLaunch }: { onClose: () => void; onLaunch: (id: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['Projects']));

  const toggle = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const handleClick = (item: FileItem) => {
    if (item.type === 'folder') toggle(item.name);
    else if (item.action) onLaunch(item.action);
    else if (item.url) window.open(item.url, '_blank');
    setSelected(item.name);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Finder</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-40 border-r border-red-900/10 bg-black/15 p-2 overflow-y-auto">
          <p className="text-[9px] uppercase tracking-widest text-gray-600 px-2 mb-1">Favorites</p>
          {fileTree.map(item => (
            <div key={item.name}>
              <button onClick={() => handleClick(item)}
                className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left transition-colors ${selected === item.name ? 'bg-red-950/30' : 'hover:bg-red-950/20'}`}>
                <span className="text-red-500/60">{item.icon}</span>
                <span className="text-[11px] text-gray-400 flex-1 text-left">{item.name}</span>
                {item.type === 'folder' && <ChevronRight size={10} className={`text-gray-600 transition-transform ${expanded.has(item.name) ? 'rotate-90' : ''}`} />}
              </button>
              {item.type === 'folder' && expanded.has(item.name) && item.items && (
                <div className="ml-4 pl-3 border-l border-red-900/10">
                  {item.items.map(child => (
                    <button key={child.name} onClick={() => handleClick(child)}
                      className="w-full flex items-center gap-2 px-2 py-1 rounded-md text-left hover:bg-red-950/20 transition-colors">
                      <span className="text-gray-500">{child.icon}</span>
                      <span className="text-[11px] text-gray-500">{child.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {selected ? (
            <div className="animate-fadeIn">
              <p className="text-[10px] text-gray-600 mb-2">/ Home / {selected}</p>
              {(() => {
                const item = fileTree.find(f => f.name === selected);
                if (!item?.items) return <p className="text-xs text-gray-600">Select an item from the sidebar</p>;
                return (
                  <div className="grid grid-cols-2 gap-2">
                    {item.items.map(child => (
                      <button key={child.name} onClick={() => handleClick(child)}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-red-900/10 hover:border-blood/30 hover:bg-red-950/10 transition-all">
                        <span className="text-xl">{child.icon}</span>
                        <span className="text-[10px] text-gray-400">{child.name}</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-4xl mb-3 opacity-30">📂</span>
              <p className="text-xs text-gray-600">Select a folder from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}