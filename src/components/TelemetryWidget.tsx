import { useState, useEffect } from 'react';

export default function TelemetryWidget() {
  const [cpu, setCpu] = useState(23);
  const [mem, setMem] = useState(41);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const s = setInterval(() => {
      setCpu(prev => Math.max(12, Math.min(68, prev + (Math.random() - 0.5) * 8)));
      setMem(prev => Math.max(30, Math.min(62, prev + (Math.random() - 0.5) * 4)));
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
    }, 2000);
    return () => clearInterval(s);
  }, []);

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <div className={`w-2 h-2 rounded-full ${pulse ? 'bg-green-400' : 'bg-green-400 animate-pulse'}`}
          style={{ boxShadow: '0 0 6px #4ade80' }} />
        <span className="text-[10px] uppercase tracking-widest text-blood/70 font-medium" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5)' }}>System</span>
      </div>
      <div className="space-y-2 relative z-10">
        {[{ label: 'CPU', val: Math.round(cpu) }, { label: 'RAM', val: Math.round(mem) }].map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-[10px] text-gray-500 mb-0.5">
              <span>{b.label}</span><span className="text-blood/60 font-mono">{b.val}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-900/80 overflow-hidden border border-blood/10">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${b.val}%`,
                  background: 'linear-gradient(90deg, #7f1d1d, #dc2626)',
                  boxShadow: '0 0 8px rgba(220,38,38,0.5)'
                }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}