import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import Starfield from './Starfield';
import ProjectsApp from './ProjectsApp';
import AboutApp from './AboutApp';
import SkillsApp from './SkillsApp';
import TerminalApp from './TerminalApp';
import ContactApp from './ContactApp';
import ResumeApp from './ResumeApp';
import BrowserApp from './BrowserApp';
import bgImage from '../assets/phase4.png';

const APPS = [
  { id: 'projects', name: 'Projects', icon: '📁' },
  { id: 'about', name: 'About', icon: '👤' },
  { id: 'skills', name: 'Skills', icon: '⚡' },
  { id: 'contact', name: 'Contact', icon: '✉️' },
  { id: 'resume', name: 'Resume', icon: '📄' },
  { id: 'browser', name: 'Browser', icon: '🌐' },
  { id: 'terminal', name: 'Terminal', icon: '⬛' },
];

function StatusBar({ time }: { time: Date }) {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-7 z-[500] flex items-center justify-between px-4 text-[11px] font-medium"
      style={{
        background: 'rgba(10,10,18,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        color: '#d4d4d8',
      }}
    >
      <span>{time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
      <div className="w-8 h-3.5 rounded-[4px] border border-white/30 flex items-center px-[2px] gap-[1px]">
        <div className="flex-1 h-1.5 rounded-[1px] bg-green-400" />
        <div className="w-[2px] h-1.5 rounded-r-[1px] bg-white/30" />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[10px]">📶</span>
        <span className="text-[10px]">🔋 82%</span>
      </div>
    </div>
  );
}

function HomeScreen({ time, onOpen }: { time: Date; onOpen: (id: string) => void }) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.18 }}
      className="absolute inset-0 flex flex-col pt-14 pb-20 px-6"
    >
      <div className="mt-8 text-center select-none">
        <p className="text-6xl font-thin text-white tracking-tight" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </p>
        <p className="mt-2 text-sm text-white/60 font-light">
          {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-x-4 gap-y-7 content-start">
        {APPS.map(app => (
          <button
            key={app.id}
            onClick={() => onOpen(app.id)}
            className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
          >
            <span className="w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-md flex items-center justify-center text-2xl border border-white/10 group-hover:bg-white/[0.14] transition-colors">
              {app.icon}
            </span>
            <span className="text-[11px] text-white/80">{app.name}</span>
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-white/30 pb-1">obyead · Obyead's PC</p>
    </motion.div>
  );
}

function AppSwitcher({ open, active, onPick, onClose }: {
  open: boolean;
  active: string | null;
  onPick: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-[490] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="absolute inset-x-4 bottom-24 z-[495] rounded-2xl border border-white/10 p-4"
            style={{ background: 'rgba(20,20,30,0.92)', backdropFilter: 'blur(20px)' }}
          >
            <p className="text-[10px] uppercase tracking-widest text-white/40 mb-3 px-1">Recent apps</p>
            <div className="flex gap-4">
              {APPS.map(app => {
                const isActive = app.id === active;
                return (
                  <button
                    key={app.id}
                    onClick={() => { onPick(app.id); onClose(); }}
                    className={`flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors ${isActive ? 'bg-white/10' : 'active:bg-white/5'}`}
                  >
                    <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl border ${isActive ? 'bg-[#863bff]/30 border-[#863bff]/60' : 'bg-white/[0.06] border-white/10'}`}>
                      {app.icon}
                    </span>
                    <span className="text-[9px] text-white/70">{app.name}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function OpenApp({ id, onClose }: { id: string; onClose: () => void }) {
  const { openApp } = useApp();
  const launch = (appId: string) => openApp(appId);
  switch (id) {
    case 'projects': return <ProjectsApp onClose={onClose} />;
    case 'about': return <AboutApp onClose={onClose} />;
    case 'skills': return <SkillsApp />;
    case 'contact': return <ContactApp onClose={onClose} />;
    case 'resume': return <ResumeApp onClose={onClose} />;
    case 'browser': return <BrowserApp onClose={onClose} />;
    case 'terminal': return <TerminalApp onClose={onClose} onLaunch={launch} />;
    default: return null;
  }
}

function NavBar({ onBack, onHome, onSwitcher, appOpen }: {
  onBack: () => void;
  onHome: () => void;
  onSwitcher: () => void;
  appOpen: boolean;
}) {
  const btn = 'w-12 h-12 flex items-center justify-center text-white/70 active:text-white active:bg-white/10 rounded-full transition-colors';
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[500] flex items-center justify-between px-6"
      style={{
        height: 'calc(env(safe-area-inset-bottom, 0px) + 28px)',
        paddingTop: 2,
        background: 'rgba(10,10,18,0.9)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <button className={btn} onClick={onSwitcher} title="Recent apps">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="3" /></svg>
      </button>
      <button className={`${btn} ${appOpen ? 'opacity-100' : 'opacity-30'}`} onClick={onBack} title="Back">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
      </button>
      <button className={btn} onClick={onHome} title="Home">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /></svg>
      </button>
    </div>
  );
}

export default function MobileMode() {
  const [time, setTime] = useState(new Date());
  const [openId, setOpenId] = useState<string | null>(null);
  const [switcher, setSwitcher] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-screen overflow-hidden relative" style={{ background: '#05070d' }}>
      {/* Smaller, dimmer wallpaper on mobile */}
      <div className="absolute inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(0.85)', opacity: 0.55, filter: 'saturate(0.7) brightness(0.6)' }} />
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#05070d]/70 via-transparent to-[#05070d]/90" />
      <div className="absolute inset-0 z-[2]" style={{ opacity: 0.5 }}><Starfield /></div>

      <StatusBar time={time} />

      <AnimatePresence mode="wait">
        {openId
          ? (
            <motion.div
              key={openId}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', opacity: 0.4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute inset-x-0 top-7 bottom-[calc(env(safe-area-inset-bottom,0px)+28px)] z-[100] rounded-t-2xl overflow-hidden border-t border-white/10 shadow-2xl"
            >
              <OpenApp id={openId} onClose={() => setOpenId(null)} />
            </motion.div>
          )
          : (
            <HomeScreen time={time} onOpen={setOpenId} />
          )}
      </AnimatePresence>

      <AppSwitcher open={switcher} active={openId} onPick={setOpenId} onClose={() => setSwitcher(false)} />

      <NavBar
        onBack={() => { if (switcher) setSwitcher(false); else setOpenId(null); }}
        onHome={() => { setSwitcher(false); setOpenId(null); }}
        onSwitcher={() => setSwitcher(s => !s)}
        appOpen={!!openId || switcher}
      />
    </div>
  );
}
