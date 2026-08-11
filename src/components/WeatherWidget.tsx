import { CloudRain, Wind, Droplets } from 'lucide-react';

export default function WeatherWidget() {
  return (
    <div className="rounded-xl backdrop-blur-xl bg-black/60 border border-red-900/30 p-4">
      <div className="flex items-center gap-2 mb-3">
        <CloudRain size={14} className="text-blue-400" />
        <span className="text-[10px] uppercase tracking-widest text-blue-400/60 font-medium">Weather</span>
        <span className="ml-auto text-[10px] text-gray-500">DEL</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-2xl text-white font-light">32°C</p>
          <p className="text-[10px] text-gray-400">Thunderstorm</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <Droplets size={10} className="text-blue-400/60" />
            <span className="text-[10px] text-gray-500">78%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={10} className="text-blue-400/60" />
            <span className="text-[10px] text-gray-500">12 km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}