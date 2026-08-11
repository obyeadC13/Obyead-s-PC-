import { Cpu, HardDrive, Network } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatsWidget() {
  const [disk, setDisk] = useState(58);
  const [net, setNet] = useState(34);

  useEffect(() => {
    const s = setInterval(() => {
      setNet(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 15)));
    }, 3000);
    return () => clearInterval(s);
  }, []);

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-red-900/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Cpu size={12} className="text-purple-400" />
        <span className="text-[10px] uppercase tracking-widest text-purple-400/60 font-medium">Resources</span>
      </div>
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <HardDrive size={12} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 w-10">SSD</span>
          <div className="flex-1 h-1 rounded-full bg-gray-900/80 overflow-hidden">
            <div className="h-full rounded-full bg-purple-500/60 transition-all duration-1000" style={{ width: `${disk}%` }} />
          </div>
          <span className="text-[9px] text-gray-500">{disk}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Network size={12} className="text-gray-500" />
          <span className="text-[10px] text-gray-500 w-10">NET</span>
          <div className="flex-1 h-1 rounded-full bg-gray-900/80 overflow-hidden">
            <div className="h-full rounded-full bg-purple-500/60 transition-all duration-1000" style={{ width: `${Math.round(net)}%` }} />
          </div>
          <span className="text-[9px] text-gray-500">{Math.round(net)}%</span>
        </div>
      </div>
    </div>
  );
}