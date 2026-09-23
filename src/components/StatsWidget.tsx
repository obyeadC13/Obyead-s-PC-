import { Cpu, HardDrive, Network } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatsWidget() {
  const [disk] = useState(58);
  const [net, setNet] = useState(34);

  useEffect(() => {
    const s = setInterval(() => {
      setNet(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 15)));
    }, 3000);
    return () => clearInterval(s);
  }, []);

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <Cpu size={12} className="text-purple-400" style={{ filter: 'drop-shadow(0 0 4px #c084fc)' }} />
        <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-medium" style={{ textShadow: '0 0 6px rgba(192,132,252,0.3)' }}>Resources</span>
      </div>
      <div className="space-y-2.5 relative z-10">
        <div className="flex items-center gap-2">
          <HardDrive size={12} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 w-10">SSD</span>
          <div className="flex-1 h-1 rounded-full bg-gray-900/80 overflow-hidden border border-purple-500/10">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${disk}%`, background: 'linear-gradient(90deg, #6b21a8, #a855f7)', boxShadow: '0 0 6px rgba(168,85,247,0.4)' }} />
          </div>
          <span className="text-[9px] text-gray-500 font-mono">{disk}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Network size={12} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 w-10">NET</span>
          <div className="flex-1 h-1 rounded-full bg-gray-900/80 overflow-hidden border border-purple-500/10">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.round(net)}%`, background: 'linear-gradient(90deg, #6b21a8, #a855f7)', boxShadow: '0 0 6px rgba(168,85,247,0.4)' }} />
          </div>
          <span className="text-[9px] text-gray-500 font-mono">{Math.round(net)}%</span>
        </div>
      </div>
    </div>
  );
}