import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Globe, Gamepad2, BookText, Mail, MessageSquare, User, FolderOpen, Monitor } from 'lucide-react';

const apps = [
  { id: 'mywork', icon: FolderOpen, label: 'My Work' },
  { id: 'about', icon: User, label: 'About Me' },
  { id: 'browser', icon: Globe, label: 'Browser' },
  { id: 'games', icon: Gamepad2, label: 'Game Vault' },
  { id: 'manuscripts', icon: BookText, label: 'Manuscripts' },
  { id: 'terminal', icon: Terminal, label: 'Terminal' },
  { id: 'contact', icon: Mail, label: 'Contact' },
  { id: 'guestbook', icon: MessageSquare, label: 'Guestbook' },
  { id: 'finder', icon: FolderOpen, label: 'Finder' },
];

const socials = [
  { id: 'github', label: 'GitHub', url: 'https://github.com' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com' },
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com' },
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
            transition={{ duration: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
            className="fixed bottom-14 left-2 z-[500] w-64"
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
                {apps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <button
                      key={app.id}
                      onClick={() => { onLaunch(app.id); onClose(); }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all group"
                    >
                      <span className="text-gray-500 group-hover:text-blood transition-colors">
                        <Icon size={16} />
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors">{app.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="px-3 py-1.5 border-t border-red-900/10">
                <p className="text-[9px] uppercase tracking-widest text-gray-600 mb-1.5">Links</p>
{socials.map((s) => {
                    return (
                      <button
                        key={s.id}
                        onClick={() => { onClose(); window.open(s.url, '_blank'); }}
                        className="w-full flex items-center gap-3 px-2 py-1.5 rounded-lg text-left transition-all group"
                      >
                        <span className="text-gray-600 group-hover:text-gray-400 transition-colors">
                          <FolderOpen size={14} />
                        </span>
                        <span className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">{s.label}</span>
                      </button>
                    );
                  })}
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