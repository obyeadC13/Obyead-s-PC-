import { useApp } from '../context/AppContext';
import { Terminal } from 'lucide-react';

export default function TerminalWidget() {
  const { switchMode } = useApp();

  return (
    <button onClick={switchMode}
      className="flex items-center gap-3 rounded-xl backdrop-blur-xl bg-black/60 border border-neon-cyan/20 p-3 w-full hover:border-neon-cyan/40 transition-colors group text-left">
      <div className="w-9 h-9 rounded-lg bg-[#0a0a1a] border border-neon-cyan/20 flex items-center justify-center group-hover:border-neon-cyan/40 transition-colors">
        <Terminal size={16} className="text-neon-cyan" style={{ filter: 'drop-shadow(0 0 6px rgba(77,166,255,0.4))' }} />
      </div>
      <div className="text-left">
        <p className="text-[11px] text-gray-300 font-medium">Switch to Terminal</p>
        <p className="text-[10px] text-neon-cyan/50 font-mono">obyead@obyead-pc:~$</p>
      </div>
    </button>
  );
}