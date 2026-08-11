import { useApp } from '../context/AppContext';
import { Terminal } from 'lucide-react';

export default function TerminalWidget() {
  const { switchMode } = useApp();

  return (
    <div className="absolute top-[208px] right-4 z-[4] hidden md:block">
      <button onClick={switchMode}
        className="flex items-center gap-3 rounded-xl backdrop-blur-xl bg-black/60 border border-[#4da6ff]/20 p-3 w-56 hover:border-[#4da6ff]/40 transition-colors group">
        <div className="w-9 h-9 rounded-lg bg-[#0a0a1a] border border-[#4da6ff]/20 flex items-center justify-center group-hover:border-[#4da6ff]/40 transition-colors">
          <Terminal size={16} className="text-[#4da6ff]" style={{ filter: 'drop-shadow(0 0 6px rgba(77,166,255,0.4))' }} />
        </div>
        <div className="text-left">
          <p className="text-[11px] text-gray-300 font-medium">Switch to Terminal</p>
          <p className="text-[10px] text-[#4da6ff]/50 font-mono">obyead@obyead-pc:~$</p>
        </div>
      </button>
    </div>
  );
}