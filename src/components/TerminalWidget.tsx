import { useApp } from '../context/AppContext';
import { Terminal } from 'lucide-react';

export default function TerminalWidget() {
  const { switchMode } = useApp();

  return (
    <button onClick={switchMode}
      className="flex items-center gap-3 rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-3 w-full hover:border-blood/50 transition-all group text-left relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-blood/0 via-blood/5 to-blood/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-9 h-9 rounded-lg bg-[#0a0a1a] border border-blood/20 flex items-center justify-center group-hover:border-blood/40 transition-colors relative z-10">
        <Terminal size={16} className="text-blood" style={{ filter: 'drop-shadow(0 0 6px rgba(220,38,38,0.4))' }} />
      </div>
      <div className="text-left relative z-10">
        <p className="text-[11px] text-gray-300 font-medium group-hover:text-blood transition-colors">Switch to Terminal</p>
        <p className="text-[10px] text-blood/50 font-mono">obyead@obyead-pc:~$</p>
      </div>
    </button>
  );
}