import { motion, AnimatePresence } from 'framer-motion';
import { Monitor } from 'lucide-react';

const apps = [
  { id: 'projects', icon: '📁', label: 'Projects' },
  { id: 'about', icon: '👤', label: 'About Me' },
  { id: 'skills', icon: '⚡', label: 'Skills' },
  { id: 'terminal', icon: '⬛', label: 'Terminal' },
  { id: 'resume', icon: '📄', label: 'Resume' },
  { id: 'contact', icon: '✉️', label: 'Contact' },
];

export default function StartMenu({ open, onClose, onLaunch, onSwitchTerminal }: {
  open: boolean;
  onClose: () => void;
  onLaunch: (id: string) => void;
  onSwitchTerminal: () => void;
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
            className="fixed inset-0 z-[499]"
          />
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-14 left-2 z-[500] w-56"
          >
            <div
              className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{
                background: 'rgba(10, 10, 26, 0.85)',
                backdropFilter: 'blur(40px) saturate(1.6)',
                border: '1px solid rgba(220,38,38,0.2)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(220,38,38,0.08), inset 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(220,38,38,0.1)' }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.6), rgba(220,38,38,0.2))' }}>
                  <span className="text-xs font-bold text-white">OB</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-200">obyead</p>
                  <p className="text-[9px] text-gray-500">System Operator</p>
                </div>
              </div>

              <div className="p-1.5">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => { onLaunch(app.id); onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all group hover:bg-white/5"
                  >
                    <span className="text-lg">{app.icon}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{app.label}</span>
                  </button>
                ))}
              </div>

              <div className="px-3 py-2 border-t border-red-900/10 flex items-center justify-between">
                <button
                  onClick={onSwitchTerminal}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] text-gray-500 hover:text-blood hover:bg-red-950/20 transition-all"
                >
                  <Monitor size={13} />
                  <span>Terminal Mode</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}