import { Wifi, ArrowUp, ArrowDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function NetworkWidget() {
  const [download, setDownload] = useState(12.4);
  const [upload, setUpload] = useState(3.2);

  useEffect(() => {
    const s = setInterval(() => {
      setDownload(prev => Math.max(0.5, Math.min(50, prev + (Math.random() - 0.5) * 5)));
      setUpload(prev => Math.max(0.2, Math.min(15, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(s);
  }, []);

  const formatSpeed = (speed: number) => {
    if (speed > 1000) return `${(speed / 1000).toFixed(1)} GB/s`;
    return `${speed.toFixed(1)} MB/s`;
  };

  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <Wifi size={12} className="text-green-400" style={{ filter: 'drop-shadow(0 0 4px #4ade80)' }} />
        <span className="text-[10px] uppercase tracking-widest text-blood/70 font-medium" style={{ textShadow: '0 0 8px rgba(220,38,38,0.5)' }}>Network</span>
        <span className="ml-auto text-[9px] text-green-400/60" style={{ textShadow: '0 0 4px rgba(74,222,128,0.3)' }}>Connected</span>
      </div>
      <div className="space-y-2 relative z-10">
        <div className="flex items-center gap-2">
          <ArrowDown size={12} className="text-blood/60" style={{ filter: 'drop-shadow(0 0 3px rgba(220,38,38,0.4))' }} />
          <span className="text-[10px] text-gray-500 w-12">Down</span>
          <span className="text-xs text-gray-300 font-mono">{formatSpeed(download)}</span>
        </div>
        <div className="flex items-center gap-2">
          <ArrowUp size={12} className="text-green-400/60" style={{ filter: 'drop-shadow(0 0 3px rgba(74,222,128,0.3))' }} />
          <span className="text-[10px] text-gray-500 w-12">Up</span>
          <span className="text-xs text-gray-300 font-mono">{formatSpeed(upload)}</span>
        </div>
      </div>
      <div className="mt-2 flex items-end gap-0.5 relative z-10">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="w-0.5 bg-blood/60 rounded-full"
            style={{
              height: `${3 + Math.sin(i * 0.8) * 6 + Math.random() * 4}px`,
              opacity: 0.3 + (i / 12) * 0.7,
              boxShadow: '0 0 3px rgba(220,38,38,0.3)'
            }} />
        ))}
      </div>
    </div>
  );
}