import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './Starfield';
import TelemetryWidget from './TelemetryWidget';
import SpotifyWidget from './SpotifyWidget';
import TerminalWidget from './TerminalWidget';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';
import BrowserApp from './BrowserApp';
import GamesApp from './GamesApp';
import ManuscriptsApp from './ManuscriptsApp';
import TerminalApp from './TerminalApp';
import ContactApp from './ContactApp';
import CommentsApp from './CommentsApp';
import AboutApp from './AboutApp';
import FinderApp from './FinderApp';
import SettingsApp from './SettingsApp';
import bgImage from '../assets/phase4.png';

interface WindowState {
  id: string;
  title: string;
  category: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
}

interface DesktopFolder {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  subfolders?: { name: string; icon: string }[];
  isFolder: boolean;
}

const desktopFolders: DesktopFolder[] = [
  {
    id: 'my-work',
    name: 'My Work',
    icon: '📁',
    x: 30,
    y: 30,
    subfolders: [
      { name: 'Games', icon: '🎮' },
      { name: 'Writing', icon: '✍️' },
      { name: 'Dev', icon: '💻' },
    ],
    isFolder: true,
  },
];

const appMeta: Record<string, { title: string; w: number; h: number }> = {
  browser: { title: 'Browser', w: 640, h: 460 },
  games: { title: 'Game Vault', w: 480, h: 420 },
  manuscripts: { title: 'Manuscripts', w: 440, h: 400 },
  terminal: { title: 'Terminal', w: 520, h: 360 },
  contact: { title: 'Contact', w: 400, h: 420 },
  comments: { title: 'Guestbook', w: 420, h: 440 },
  about: { title: 'About', w: 400, h: 400 },
  finder: { title: 'Finder', w: 500, h: 380 },
  settings: { title: 'Settings', w: 440, h: 360 },
};

export default function DesktopMode() {
  const { switchMode } = useApp();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setWindows(prev => prev.map(w =>
        w.id === dragging.id
          ? { ...w, x: dragging.origX + (e.clientX - dragging.startX), y: dragging.origY + (e.clientY - dragging.startY) }
          : w
      ));
    };
    const onUp = () => setDragging(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging]);

  const bringToFront = (id: string) => {
    const winIndex = windows.findIndex(w => w.id === id);
    if (winIndex === -1 || winIndex === windows.length - 1) return;
    setWindows(prev => {
      const arr = [...prev];
      const [win] = arr.splice(winIndex, 1);
      arr.push(win);
      return arr;
    });
  };

  const launchApp = (id: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.category === id);
      if (existing) {
        if (existing.minimized) return prev.map(w => w.id === existing.id ? { ...w, minimized: false } : w);
        return prev;
      }
      const meta = appMeta[id] || { title: id, w: 480, h: 400 };
      const offset = (prev.length % 6) * 25;
      return [...prev, {
        id: `${id}-${Date.now()}`,
        title: meta.title,
        category: id,
        x: 120 + offset,
        y: 60 + offset,
        w: meta.w,
        h: meta.h,
        minimized: false,
      }];
    });
  };

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id));
  const minimizeWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));

  const onDragStart = (e: React.MouseEvent, win: WindowState) => {
    e.preventDefault();
    bringToFront(win.id);
    setDragging({ id: win.id, startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y });
  };

  const renderApp = (cat: string, winId: string) => {
    const onClose = () => closeWindow(winId);
    const onLaunch = launchApp;
    switch (cat) {
      case 'browser': return <BrowserApp onClose={onClose} />;
      case 'games': return <GamesApp onClose={onClose} />;
      case 'manuscripts': return <ManuscriptsApp onClose={onClose} />;
      case 'terminal': return <TerminalApp onClose={onClose} onLaunch={onLaunch} />;
      case 'contact': return <ContactApp onClose={onClose} />;
      case 'comments': return <CommentsApp onClose={onClose} />;
      case 'about': return <AboutApp onClose={onClose} />;
      case 'finder': return <FinderApp onClose={onClose} onLaunch={launchApp} />;
      case 'settings': return <SettingsApp onClose={onClose} />;
      default: return null;
    }
  };

  const openWindowIds = windows.filter(w => !w.minimized).map(w => w.category);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#0a0a1a' }}>
      {/* Layer 0: Background Image */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

      {/* Layer 0.5: Cyberpunk grid */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(77,166,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(77,166,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />

      {/* Layer 1: Starfield on top */}
      <div className="absolute inset-0 z-[2]">
        <Starfield />
      </div>

      {/* Layer 2: Cyberpunk glow */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: '#4da6ff', top: '30%', left: '30%' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full opacity-5 blur-[80px]" style={{ background: '#4da6ff', bottom: '20%', right: '20%' }} />
      </div>

      {/* Layer 2.5: CRT scanline overlay */}
      <div className="absolute inset-0 z-[4] pointer-events-none opacity-[0.015]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #4da6ff 2px, #4da6ff 4px)' }} />

      {/* Vignette */}
      <div className="absolute inset-0 z-[4] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Layer 3: Desktop Folders */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {desktopFolders.map(folder => (
          <div
            key={folder.id}
            className="absolute flex flex-col items-center pointer-events-auto"
            style={{ left: folder.x, top: folder.y }}
            onMouseEnter={() => setHoveredFolder(folder.id)}
            onMouseLeave={() => setHoveredFolder(null)}
            onDoubleClick={() => {
              setExpandedFolders(prev => {
                const next = new Set(prev);
                next.has(folder.id) ? next.delete(folder.id) : next.add(folder.id);
                return next;
              });
            }}
          >
            {folder.isFolder && folder.subfolders && expandedFolders.has(folder.id) && (
              <div className="absolute top-0 left-0 flex flex-col gap-1 animate-fadeIn" style={{ zIndex: 9999 }}>
                {folder.subfolders.map(sub => (
                  <div
                    key={sub.name}
                    className="w-20 h-20 flex flex-col items-center justify-center rounded-lg bg-[rgba(10,10,26,0.8)] border border-neon-cyan/20 cursor-pointer hover:border-neon-cyan/50 hover:bg-[rgba(10,10,26,0.9)] transition-all"
                    title={sub.name}
                  >
                    <span className="text-2xl">{sub.icon}</span>
                    <span className="text-[10px] text-neon-cyan/80 mt-1 text-center">{sub.name}</span>
                  </div>
                ))}
              </div>
            )}
            <div className={`w-20 h-20 flex flex-col items-center justify-center rounded-lg cursor-pointer transition-all ${hoveredFolder === folder.id ? 'bg-[rgba(77,166,255,0.1)] border border-neon-cyan/40 scale-105' : 'border border-transparent'}`}>
              <span className="text-4xl">{folder.icon}</span>
              <span className="text-[11px] text-white mt-1 text-center drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]">{folder.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 3: Widgets */}
      <TelemetryWidget />
      <SpotifyWidget />
      <TerminalWidget />

      {/* Layer 4: Windows */}
      <AnimatePresence>
        {windows.filter(w => !w.minimized).map(win => (
          <motion.div key={win.id}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.15 }}
            className="absolute rounded-[10px] overflow-hidden"
            style={{
              left: win.x, top: win.y, width: win.w, height: win.h,
              background: 'rgba(10, 10, 26, 0.4)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(77, 166, 255, 0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 1px rgba(77,166,255,0.2), 0 0 30px rgba(77,166,255,0.05)',
              zIndex: windows.indexOf(win) + 5,
            }}
            onMouseDown={() => bringToFront(win.id)}
          >
            {/* Title bar */}
            <div className="flex items-center h-[32px] px-3 select-none cursor-default"
              style={{ background: 'rgba(10, 10, 26, 0.5)', borderBottom: '1px solid rgba(77,166,255,0.1)' }}
              onMouseDown={(e) => onDragStart(e, win)}
            >
              <div className="flex items-center gap-1.5 mr-3">
                <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-[#f38ba8] hover:brightness-110 transition-colors" />
                <button onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-[#f9e2af] hover:brightness-110 transition-colors" />
                <button onClick={(e) => { e.stopPropagation(); }}
                  className="w-3 h-3 rounded-full bg-[#a6e3a1] hover:brightness-110 transition-colors" />
              </div>
              <span className="text-[11px] text-neon-cyan/70 font-medium flex-1 text-center mr-12" style={{ textShadow: '0 0 4px #4da6ff33' }}>
                {win.title}
              </span>
            </div>
            <div className="overflow-hidden" style={{ height: 'calc(100% - 32px)' }}>
              {renderApp(win.category, win.id)}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Layer 4: Start Menu */}
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onLaunch={launchApp} onSwitchTerminal={switchMode} />

      {/* Layer 5: Taskbar */}
      <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen(o => !o)} onLaunch={launchApp} openWindows={openWindowIds} time={time} />
    </div>
  );
}