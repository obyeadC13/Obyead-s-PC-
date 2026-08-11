import { useState, useEffect } from 'react';

export default function TelemetryWidget() {
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(41);

  useEffect(() => {
    const s = setInterval(() => {
      setCpu(prev => Math.max(12, Math.min(68, prev + (Math.random() - 0.5) * 8)));
      setMem(prev => Math.max(30, Math.min(62, prev + (Math.random() - 0.5) * 4)));
    }, 2000);
    return () => clearInterval(s);
  }, []);

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-neon-cyan/20 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-neon-cyan/60 font-medium">System</span>
      </div>
      <div className="space-y-2">
        {[{ label: 'CPU', val: Math.round(cpu) }, { label: 'RAM', val: Math.round(mem) }].map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
              <span>{b.label}</span><span>{b.val}%</span>
            </div>
            <div className="h-1 rounded-full bg-gray-900/80 overflow-hidden">
              <div className="h-full rounded-full bg-neon-cyan transition-all duration-1000" style={{ width: `${b.val}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}