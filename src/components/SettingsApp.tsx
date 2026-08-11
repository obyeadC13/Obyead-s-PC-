import { X, Monitor, Palette, Bell, Volume2, Wifi, Shield } from 'lucide-react';

export default function SettingsApp({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-red-900/20 bg-black/20">
        <span className="text-[11px] text-gray-500">Settings</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-40 border-r border-red-900/10 bg-black/15 p-2">
          {[{ icon: <Monitor size={13} />, label: 'Display' }, { icon: <Palette size={13} />, label: 'Appearance' }, { icon: <Volume2 size={13} />, label: 'Sound' }, { icon: <Wifi size={13} />, label: 'Network' }, { icon: <Bell size={13} />, label: 'Notifications' }, { icon: <Shield size={13} />, label: 'Security' }].map(s => (
            <button key={s.label} className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-left text-gray-500 hover:text-gray-300 hover:bg-red-950/20 transition-colors">
              <span className="text-red-500/50">{s.icon}</span>
              <span className="text-[11px]">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 p-5 overflow-y-auto">
          <h4 className="text-sm font-semibold text-gray-300 mb-4">Display</h4>
          <div className="space-y-4">
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Brightness</label>
              <input type="range" min="30" max="100" defaultValue="80" className="w-full accent-blood h-1" />
            </div>
            <div>
              <label className="text-[11px] text-gray-500 mb-1 block">Resolution</label>
              <div className="text-xs text-gray-300 bg-black/20 rounded-lg px-3 py-2 border border-red-900/15">
                {window.innerWidth} × {window.innerHeight}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-gray-500">Dark Mode</span>
              <div className="w-9 h-5 rounded-full bg-blood/30 border border-blood/40 relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-blood shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
              </div>
            </div>
            <div className="pt-3 border-t border-red-900/10">
              <h5 className="text-[11px] font-medium text-gray-400 mb-2">System Info</h5>
              <div className="space-y-1">
                {[['OS', 'X+ OS v4.0'], ['Kernel', 'Web Desktop'], ['Renderer', navigator.gpu ? 'WebGPU' : 'Canvas 2D'], ['User Agent', navigator.userAgent.slice(0, 40) + '...']].map(([k, v]) => (
                  <div key={k} className="flex justify-between text-[10px]">
                    <span className="text-gray-600">{k}</span>
                    <span className="text-gray-400">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}