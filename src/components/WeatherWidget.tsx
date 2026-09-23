import { CloudRain, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-blood/30 p-4 relative overflow-hidden"
      style={{ boxShadow: '0 0 15px rgba(220,38,38,0.15), inset 0 0 15px rgba(220,38,38,0.05)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(220,38,38,0.05) 0%, transparent 50%, rgba(255,0,51,0.03) 100%)' }} />
      <div className="flex items-center gap-2 mb-3 relative z-10">
        <CloudRain size={14} className="text-blue-400" style={{ filter: 'drop-shadow(0 0 4px #60a5fa)' }} />
        <span className="text-[10px] uppercase tracking-widest text-blue-400/60 font-medium" style={{ textShadow: '0 0 6px rgba(96,165,250,0.3)' }}>Weather</span>
        <span className="ml-auto text-[10px] text-gray-500 font-mono">DEL</span>
      </div>
      <div className="flex items-center justify-between relative z-10">
        <div>
          <p className="text-2xl text-white font-light" style={{ textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>32°C</p>
          <p className="text-[10px] text-gray-400">Thunderstorm</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <Droplets size={10} className="text-blue-400/60" />
            <span className="text-[10px] text-gray-500 font-mono">78%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={10} className="text-blue-400/60" />
            <span className="text-[10px] text-gray-500 font-mono">12 km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}