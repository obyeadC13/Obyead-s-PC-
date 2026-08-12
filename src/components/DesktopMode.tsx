import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchOverlay from './GlitchOverlay';
import Starfield from './Starfield';
import CyberAtmosphere from './CyberAtmosphere';
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
import MyWorkApp from './MyWorkApp';
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

interface DesktopIcon {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  category: string;
}

const desktopIcons: DesktopIcon[] = [
  { id: 'my-work', name: 'My Work', icon: '📁', x: 24, y: 24, category: 'mywork' },
  { id: 'about', name: 'About Me', icon: '👤', x: 24, y: 112, category: 'about' },
  { id: 'contact', name: 'Contact', icon: '✉️', x: 24, y: 200, category: 'contact' },
  { id: 'games', name: 'Game Vault', icon: '🎮', x: 24, y: 288, category: 'games' },
  { id: 'browser', name: 'Browser', icon: '🌐', x: 24, y: 376, category: 'browser' },
  { id: 'manuscripts', name: 'Manuscripts', icon: '📝', x: 24, y: 464, category: 'manuscripts' },
  { id: 'terminal', name: 'Terminal', icon: '⬛', x: 24, y: 552, category: 'terminal' },
  { id: 'trash', name: 'Trash', icon: '🗑️', x: 24, y: 640, category: 'trash' },
  { id: 'github', name: 'GitHub', icon: '⚡', x: 112, y: 24, category: 'browser' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', x: 112, y: 112, category: 'browser' },
  { id: 'instagram', name: 'Instagram', icon: '📸', x: 112, y: 200, category: 'browser' },
  { id: 'settings', name: 'Settings', icon: '⚙️', x: 112, y: 288, category: 'settings' },
  { id: 'guestbook', name: 'Guestbook', icon: '💬', x: 112, y: 376, category: 'comments' },
  { id: 'finder', name: 'Finder', icon: '🗂️', x: 112, y: 464, category: 'finder' },
  { id: 'portfolio', name: 'Portfolio', icon: '🚀', x: 112, y: 552, category: 'about' },
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
  mywork: { title: 'My Work', w: 540, h: 420 },
};

const SNAP_THRESHOLD = 15;
const MIN_W = 320;
const MIN_H = 240;

export default function DesktopMode() {
  const { switchMode } = useApp();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [dragging, setDragging] = useState<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const [resizing, setResizing] = useState<{ id: string; startX: number; startY: number; origW: number; origH: number } | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

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
    const onUp = (e: MouseEvent) => {
      const win = windows.find(w => w.id === dragging.id);
      if (win) {
        setWindows(prev => prev.map(w => {
          if (w.id !== dragging.id) return w;
          const newX = dragging.origX + (e.clientX - dragging.startX);
          const newY = dragging.origY + (e.clientY - dragging.startY);
          let snappedX = newX;
          let snappedY = newY;
          let snappedW = w.w;
          let snappedH = w.h;
          const screenW = window.innerWidth;
          const screenH = window.innerHeight - 48;
          if (newY < SNAP_THRESHOLD) { snappedY = 0; snappedH = screenH; }
          if (newX < SNAP_THRESHOLD && newY < SNAP_THRESHOLD) { snappedX = 0; snappedW = screenW; snappedH = screenH; }
          else if (newX < SNAP_THRESHOLD) { snappedX = 0; snappedW = Math.round(screenW / 2); }
          else if (newX + w.w > screenW - SNAP_THRESHOLD) { snappedX = screenW - Math.round(screenW / 2); snappedW = Math.round(screenW / 2); }
          return { ...w, x: snappedX, y: snappedY, w: snappedW, h: snappedH };
        }));
      }
      setDragging(null);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [dragging, windows]);

  useEffect(() => {
    if (!resizing) return;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - resizing.startX;
      const dy = e.clientY - resizing.startY;
      const newW = Math.max(MIN_W, resizing.origW + dx);
      const newH = Math.max(MIN_H, resizing.origH + dy);
      setWindows(prev => prev.map(w => w.id === resizing.id ? { ...w, w: newW, h: newH } : w));
    };
    const onUp = () => setResizing(null);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  }, [resizing]);

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
    if (id === 'trash') return;
    setWindows(prev => {
      const existing = prev.find(w => w.category === id);
      if (existing) {
        if (existing.minimized) return prev.map(w => w.id === existing.id ? { ...w, minimized: false } : w);
        bringToFront(existing.id);
        return prev;
      }
      const meta = appMeta[id] || { title: id, w: 480, h: 400 };
      const offset = (prev.length % 6) * 25;
      const winW = meta.w, winH = meta.h;
      const centerX = Math.max(20, (window.innerWidth - winW) / 2) + offset;
      const centerY = Math.max(20, (window.innerHeight - winH - 48) / 2) + offset;
      return [...prev, {
        id: `${id}-${Date.now()}`,
        title: meta.title,
        category: id,
        x: centerX,
        y: centerY,
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
    e.stopPropagation();
    bringToFront(win.id);
    setDragging({ id: win.id, startX: e.clientX, startY: e.clientY, origX: win.x, origY: win.y });
  };

  const onResizeStart = (e: React.MouseEvent, win: WindowState) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(win.id);
    setResizing({ id: win.id, startX: e.clientX, startY: e.clientY, origW: win.w, origH: win.h });
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
      case 'mywork': return <MyWorkApp onClose={onClose} onLaunch={launchApp} />;
      default: return null;
    }
  };

  const openWindowIds = windows.filter(w => !w.minimized).map(w => w.category);

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#050510' }}>
      <GlitchOverlay />

      {/* Layer 0: Background Image with dim overlay */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(127,29,29,0.05) 0%, transparent 50%)' }} />

      {/* Layer 2: Cyberpunk grid */}
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

      {/* Layer 3: Starfield */}
      <div className="absolute inset-0 z-[3]">
        <Starfield />
      </div>

      {/* Layer 4: CyberAtmosphere particles */}
      <div className="absolute inset-0 z-[4]">
        <CyberAtmosphere />
      </div>

      {/* Layer 5: CRT scanlines */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.015]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.5) 2px, rgba(220,38,38,0.5) 4px)' }} />

      {/* Layer 6: Vignette */}
      <div className="absolute inset-0 z-[6] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Layer 10: Desktop Icons with stagger entrance + float */}
      <div className="absolute inset-0 z-[10] pointer-events-none">
        {desktopIcons.map((ic, idx) => (
          <div
            key={ic.id}
            className="absolute flex flex-col items-center pointer-events-auto cursor-pointer"
            style={{
              left: ic.x, top: ic.y,
              animation: `iconAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.06}s both, iconFloat 4s ease-in-out ${idx * 0.3}s infinite`,
            }}
            onMouseEnter={() => setHoveredIcon(ic.id)}
            onMouseLeave={() => setHoveredIcon(null)}
            onDoubleClick={() => launchApp(ic.category)}
          >
            <div className={`w-[68px] h-[68px] flex flex-col items-center justify-center rounded-lg transition-all duration-200 ${
              hoveredIcon === ic.id
                ? 'bg-red-950/40 border border-blood/50 scale-110 shadow-[0_0_20px_rgba(220,38,38,0.3)]'
                : 'border border-transparent'
            }`}>
              <span className="text-3xl" style={{ filter: hoveredIcon === ic.id ? 'drop-shadow(0 0 6px rgba(220,38,38,0.5))' : 'none' }}>{ic.icon}</span>
              <span className={`text-[10px] mt-1 text-center px-1 leading-tight transition-colors ${
                hoveredIcon === ic.id ? 'text-blood' : 'text-white'
              }`} style={{ textShadow: hoveredIcon === ic.id ? '0 0 8px rgba(220,38,38,0.6)' : '0 0 4px rgba(0,0,0,0.9)' }}>{ic.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer 15: Windows with dramatic open/close */}
      <AnimatePresence>
        {windows.filter(w => !w.minimized).map(win => (
          <motion.div key={win.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.15 } }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute rounded-[12px] overflow-hidden"
            style={{
              left: win.x, top: win.y, width: win.w, height: win.h,
              background: 'rgba(8, 8, 20, 0.7)',
              backdropFilter: 'blur(28px) saturate(1.8)',
              border: '1px solid rgba(220,38,38,0.25)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.6), 0 0 1px rgba(220,38,38,0.4), 0 0 60px rgba(220,38,38,0.1), inset 0 1px 0 rgba(255,255,255,0.03)',
              zIndex: windows.indexOf(win) + 5,
            }}
            onMouseDown={() => bringToFront(win.id)}
          >
            {/* Holographic border shimmer */}
            <div className="absolute inset-0 pointer-events-none z-30 rounded-[12px]"
              style={{
                background: 'linear-gradient(135deg, rgba(220,38,38,0.1) 0%, transparent 25%, transparent 75%, rgba(255,0,51,0.05) 100%)',
                backgroundSize: '200% 200%',
                animation: 'holographic 4s linear infinite',
              }} />

            {/* Title bar */}
            <div className="flex items-center h-[32px] px-3 select-none cursor-default relative"
              style={{ background: 'rgba(10, 10, 26, 0.6)', borderBottom: '1px solid rgba(220,38,38,0.15)' }}
              onMouseDown={(e) => onDragStart(e, win)}
            >
              <div className="flex items-center gap-1.5 mr-3">
                <button onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-[#f38ba8] hover:brightness-125 transition-colors" style={{ boxShadow: '0 0 4px rgba(243,139,168,0.3)' }} />
                <button onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
                  className="w-3 h-3 rounded-full bg-[#f9e2af] hover:brightness-125 transition-colors" style={{ boxShadow: '0 0 4px rgba(249,226,175,0.3)' }} />
                <button onClick={(e) => { e.stopPropagation(); }}
                  className="w-3 h-3 rounded-full bg-[#a6e3a1] hover:brightness-125 transition-colors" style={{ boxShadow: '0 0 4px rgba(166,227,161,0.3)' }} />
              </div>
              <span className="text-[11px] text-blood/80 font-medium flex-1 text-center mr-12" style={{ textShadow: '0 0 8px rgba(220,38,38,0.4)' }}>
                {win.title}
              </span>
            </div>
            <div className="overflow-hidden relative" style={{ height: 'calc(100% - 32px)' }}>
              {renderApp(win.category, win.id)}
            </div>

            {/* Resize handle */}
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
              style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(220,38,38,0.4) 50%)' }}
              onMouseDown={(e) => onResizeStart(e, win)}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Layer 20: Start Menu */}
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} onLaunch={launchApp} onSwitchTerminal={switchMode} />

      {/* Layer 25: Taskbar */}
      <Taskbar startOpen={startOpen} onToggleStart={() => setStartOpen(o => !o)} onLaunch={launchApp} openWindows={openWindowIds} time={time} />
    </div>
  );
}