import { useState, useEffect } from 'react';

export default function TelemetryWidget() {
  const [time, setTime] = useState(new Date());
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(41);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    const s = setInterval(() => {
      setCpu(prev => Math.max(12, Math.min(68, prev + (Math.random() - 0.5) * 8)));
      setMem(prev => Math.max(30, Math.min(62, prev + (Math.random() - 0.5) * 4)));
    }, 2000);
    return () => { clearInterval(t); clearInterval(s); };
  }, []);

  return (
    <div className="absolute top-10 right-4 z-[4] w-56 hidden md:block">
      <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-red-900/30 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] uppercase tracking-widest text-red-500/60 font-medium">System</span>
          <span className="text-[11px] text-gray-400 tabular-nums">
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
          </span>
        </div>
        <p className="text-[11px] text-gray-500 mb-3">
          Obyead's PC
        </p>
        <div className="space-y-2">
          {[{ label: 'CPU', val: Math.round(cpu) }, { label: 'RAM', val: Math.round(mem) }].map(b => (
            <div key={b.label}>
              <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
                <span>{b.label}</span><span>{b.val}%</span>
              </div>
              <div className="h-1 rounded-full bg-gray-900/80 overflow-hidden">
                <div className="h-full rounded-full bg-blood transition-all duration-1000" style={{ width: `${b.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}