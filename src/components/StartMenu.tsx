import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Gamepad2, BookText, Folder, Mail, MessageSquare, User } from 'lucide-react';

interface App {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const apps: App[] = [
  { id: 'browser', icon: <Globe size={16} />, label: 'X+ Browser' },
  { id: 'games', icon: <Gamepad2 size={16} />, label: 'Game Vault' },
  { id: 'manuscripts', icon: <BookText size={16} />, label: 'Manuscripts' },
  { id: 'terminal', icon: <Terminal size={16} />, label: 'Terminal' },
  { id: 'contact', icon: <Mail size={16} />, label: 'Contact' },
  { id: 'comments', icon: <MessageSquare size={16} />, label: 'Guestbook' },
  { id: 'about', icon: <User size={16} />, label: 'About' },
];

const socials = [
  { id: 'linkedin', label: 'LinkedIn', icon: <Folder size={14} /> },
  { id: 'github', label: 'GitHub', icon: <Folder size={14} /> },
  { id: 'instagram', label: 'Instagram', icon: <Folder size={14} /> },
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
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed bottom-12 left-2 z-[500] w-72"
          >
            <div className="rounded-xl backdrop-blur-xl bg-black/85 border border-red-900/40 overflow-hidden shadow-[0_0_60px_rgba(220,38,38,0.1)]">
              {/* Header */}
              <div className="px-4 py-3 border-b border-red-900/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood to-red-950 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">O</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-200">Obyead's PC</p>
                  <p className="text-[10px] text-red-500/60">System Operator</p>
                </div>
              </div>

              {/* Apps */}
              <div className="p-2">
                {apps.map(app => (
                  <button key={app.id} onClick={() => { onLaunch(app.id); onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-red-950/30 transition-colors group">
                    <span className="text-red-500/70 group-hover:text-blood transition-colors">{app.icon}</span>
                    <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{app.label}</span>
                  </button>
                ))}
              </div>

              {/* Socials */}
              <div className="px-2 pb-2 pt-1 border-t border-red-900/20">
                <p className="px-3 pb-1 text-[9px] uppercase tracking-widest text-gray-600">Connect</p>
                {socials.map(s => (
                  <button key={s.id} onClick={() => { onClose(); }}
                    className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg text-left hover:bg-red-950/20 transition-colors group">
                    <span className="text-gray-600 group-hover:text-red-400 transition-colors">{s.icon}</span>
                    <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t border-red-900/20 flex justify-end">
                <button onClick={onSwitchTerminal} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-gray-500 hover:text-gray-300 hover:bg-red-950/20 transition-colors">
                  <Terminal size={12} />
                  <span>Switch to Terminal</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}