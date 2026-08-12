import { Battery, BatteryMedium, BatteryLow } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BatteryWidget() {
  const [level, setLevel] = useState(87);
  const charging = true;

  useEffect(() => {
    const s = setInterval(() => {
      setLevel(prev => {
        const next = charging ? Math.min(100, prev + Math.random() > 0.7 ? 1 : 0) : Math.max(0, prev + (Math.random() - 0.6) * 2);
        return Math.round(next);
      });
    }, 5000);
    return () => clearInterval(s);
  }, [charging]);

  const getIcon = () => {
    if (level > 60) return <Battery size={12} className="text-green-400" style={{ filter: 'drop-shadow(0 0 4px #4ade80)' }} />;
    if (level > 25) return <BatteryMedium size={12} className="text-yellow-400" style={{ filter: 'drop-shadow(0 0 4px #facc15)' }} />;
    return <BatteryLow size={12} className="text-red-400" style={{ filter: 'drop-shadow(0 0 4px #f87171)' }} />;
  };

  const barColor = level > 60 ? 'linear-gradient(90deg, #16a34a, #22c55e, #4ade80)' : level > 25 ? 'linear-gradient(90deg, #a16207, #eab308, #facc15)' : 'linear-gradient(90deg, #dc2626, #ef4444, #f87171)';
  const barGlow = level > 60 ? '0 0 8px rgba(34,197,94,0.5)' : level > 25 ? '0 0 8px rgba(234,179,8,0.5)' : '0 0 8px rgba(239,68,68,0.5)';

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        {getIcon()}
        <span className="text-[10px] uppercase tracking-widest text-blood/70 font-medium" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5)' }}>Battery</span>
        {charging && <span className="ml-auto text-[9px] text-green-400 animate-pulse" style={{ textShadow: '0 0 6px #4ade80' }}>⚡</span>}
      </div>
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] text-gray-500 mb-1">
            <span className="text-blood/60 font-mono font-bold">{level}%</span>
            <span>{charging ? 'Charging' : 'Discharging'}</span>
          </div>
          <div className="h-2 rounded-full bg-gray-900/80 overflow-hidden border border-blood/10">
            <div className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${level}%`, background: barColor, boxShadow: barGlow }} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-gray-600 font-mono">{charging ? '~2h 15m' : '~4h 30m'}</p>
        </div>
      </div>
    </div>
  );
}