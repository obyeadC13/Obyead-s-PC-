import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import GlitchOverlay from './GlitchOverlay';
import Starfield from './Starfield';
import CyberAtmosphere from './CyberAtmosphere';
import AnimatedBackground from './AnimatedBackground';
import StartMenu from './StartMenu';
import Taskbar from './Taskbar';
import AppWindow from './AppWindow';
import ProjectsApp from './ProjectsApp';
import AboutApp from './AboutApp';
import SkillsApp from './SkillsApp';
import ExperienceApp from './ExperienceApp';
import TerminalApp from './TerminalApp';
import ContactApp from './ContactApp';
import ResumeApp from './ResumeApp';
import BrowserApp from './BrowserApp';
import SettingsApp from './SettingsApp';
import bgImage from '../assets/phase4.png';

const desktopIcons = [
  { id: 'projects', name: 'Projects', icon: '📁' },
  { id: 'about', name: 'About', icon: '👤' },
  { id: 'skills', name: 'Skills', icon: '⚡' },
  { id: 'experience', name: 'Experience', icon: '💼' },
  { id: 'terminal', name: 'Terminal', icon: '⬛' },
  { id: 'resume', name: 'Resume.pdf', icon: '📄' },
  { id: 'contact', name: 'Contact', icon: '✉️' },
];

const appMeta: Record<string, { title: string; icon: string; w: number; h: number }> = {
  projects: { title: 'Selected Work', icon: '📁', w: 820, h: 580 },
  about: { title: 'About Me', icon: '👤', w: 560, h: 540 },
  skills: { title: 'Skills', icon: '⚡', w: 560, h: 520 },
  experience: { title: 'Experience', icon: '💼', w: 600, h: 520 },
  terminal: { title: 'Terminal', icon: '⬛', w: 640, h: 440 },
  resume: { title: 'Resume.pdf', icon: '📄', w: 660, h: 540 },
  contact: { title: 'Contact', icon: '✉️', w: 540, h: 560 },
  browser: { title: 'Browser', icon: '🌐', w: 700, h: 480 },
  settings: { title: 'Settings', icon: '⚙️', w: 500, h: 400 },
};

export default function DesktopMode() {
  const ctx = useApp();
  const [time, setTime] = useState(new Date());
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const handleIconDblClick = (id: string) => {
    if (id === 'trash') return;
    const meta = appMeta[id];
    if (meta) ctx.openApp(id, { title: meta.title, icon: meta.icon, w: meta.w, h: meta.h });
  };

  const renderAppContent = (win: (typeof ctx.windows)[0]) => {
    const close = () => ctx.closeWindow(win.id);
    const launch = (appId: string) => {
      const meta = appMeta[appId];
      if (meta) ctx.openApp(appId, { title: meta.title, icon: meta.icon, w: meta.w, h: meta.h });
    };

    switch (win.appId) {
      case 'projects': return <ProjectsApp onClose={close} />;
      case 'about': return <AboutApp onClose={close} />;
      case 'skills': return <SkillsApp onClose={close} />;
      case 'experience': return <ExperienceApp onClose={close} />;
      case 'terminal': return <TerminalApp onClose={close} onLaunch={launch} />;
      case 'resume': return <ResumeApp onClose={close} />;
      case 'contact': return <ContactApp onClose={close} />;
      case 'browser': return <BrowserApp onClose={close} />;
      case 'settings': return <SettingsApp onClose={close} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#050510' }}>
      <GlitchOverlay />

      {/* Background layers */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(220,38,38,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 z-[1]" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(127,29,29,0.05) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 z-[2] pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute inset-0 z-[1]"><AnimatedBackground /></div>
      <div className="absolute inset-0 z-[3]"><Starfield /></div>
      <div className="absolute inset-0 z-[4]"><CyberAtmosphere /></div>
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.015]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(220,38,38,0.5) 2px, rgba(220,38,38,0.5) 4px)' }} />
      <div className="absolute inset-0 z-[6] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)' }} />

      {/* Desktop Icons */}
      <div className="absolute inset-0 z-[10] p-4 pointer-events-none">
        {desktopIcons.map((ic, idx) => (
          <div
            key={ic.id}
            className="absolute flex flex-col items-center pointer-events-auto cursor-pointer"
            style={{ left: 20, top: idx * 96 }}
            onDoubleClick={() => handleIconDblClick(ic.id)}
            onClick={(e) => { e.stopPropagation(); setSelectedIcon(ic.id); }}
            onMouseEnter={() => setSelectedIcon(ic.id)}
            onMouseLeave={() => setSelectedIcon(null)}
          >
            <div className={`w-16 h-16 flex flex-col items-center justify-center rounded-xl transition-all duration-150 ${
              selectedIcon === ic.id ? 'bg-blood/15 border border-blood/30' : 'border border-transparent'
            }`}>
              <span className="text-2xl">{ic.icon}</span>
              <span className={`text-[11px] mt-1 text-center leading-tight transition-colors ${
                selectedIcon === ic.id ? 'text-white' : 'text-gray-300'
              }`} style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                {ic.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {ctx.windows.filter(w => !w.minimized).map(win => (
          <AppWindow key={win.id} win={win}>
            {renderAppContent(win)}
          </AppWindow>
        ))}
      </AnimatePresence>

      {/* Click desktop to deselect */}
      <div className="absolute inset-0 z-[9]" onClick={() => setSelectedIcon(null)} />

      {/* Start Menu */}
      <StartMenu
        open={ctx.startMenuOpen}
        onClose={() => ctx.setStartMenuOpen(false)}
        onLaunch={(id: string) => {
          const meta = appMeta[id];
          if (meta) ctx.openApp(id, { title: meta.title, icon: meta.icon, w: meta.w, h: meta.h });
        }}
        onSwitchTerminal={ctx.switchMode}
      />

      {/* Taskbar */}
      <Taskbar
        startOpen={ctx.startMenuOpen}
        onToggleStart={() => ctx.setStartMenuOpen(o => !o)}
        time={time}
      />

      {/* Toasts */}
      <div className="fixed bottom-20 right-4 z-[999] flex flex-col gap-2">
        <AnimatePresence>
          {ctx.toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg ${
                toast.type === 'success' ? 'bg-green-900/80 text-green-300 border border-green-700/30' :
                toast.type === 'error' ? 'bg-red-900/80 text-red-300 border border-red-700/30' :
                'bg-gray-900/80 text-gray-300 border border-gray-700/30'
              }`}
              style={{ backdropFilter: 'blur(20px)' }}
              onClick={() => ctx.removeToast(toast.id)}
            >
              {toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'} {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}