import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVICES = [
  { name: 'Window Manager (Compositor)', icon: '◉' },
  { name: 'Desktop Environment Server', icon: '◈' },
  { name: 'Theme Engine (Blood Crimson)', icon: '◫' },
  { name: 'Icon Renderer', icon: '▣' },
  { name: 'Widget Framework', icon: '▤' },
  { name: 'Taskbar & System Tray', icon: '▥' },
  { name: 'Notification Daemon', icon: '⚡' },
  { name: 'Glass Morphism Engine', icon: '◇' },
  { name: 'Drag & Drop Subsystem', icon: '↕' },
  { name: 'Accessibility Service', icon: '♿' },
];

export default function GuiBoot() {
  const navigate = useNavigate();
  const [servicesDone, setServicesDone] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'glitch' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('');
  const [showHeader, setShowHeader] = useState(false);
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const t1 = setTimeout(() => setShowHeader(true), 300);
    timers.push(t1);

    const t2 = setTimeout(() => setShowServices(true), 800);
    timers.push(t2);

    let delay = 1200;
    SERVICES.forEach((_, i) => {
      const st = setTimeout(() => {
        setServicesDone(i + 1);
        setProgress(Math.round(((i + 1) / SERVICES.length) * 100));
      }, delay + i * 250);
      timers.push(st);
    });

    const doneDelay = delay + SERVICES.length * 250 + 400;
    const glitchTimer = setTimeout(() => {
      setPhase('glitch');
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀■□▪▫◊○●◘◙♠♣♥♦';
      let count = 0;
      const glitchInterval = setInterval(() => {
        let result = '';
        for (let i = 0; i < 60; i++) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
        setGlitchText(result);
        count++;
        if (count > 12) {
          clearInterval(glitchInterval);
          setPhase('done');
          timers.push(setTimeout(() => navigate('/gui'), 200));
        }
      }, 60);
    }, doneDelay);
    timers.push(glitchTimer);

    return () => { timers.forEach(t => clearTimeout(t)); };
  }, [navigate]);

  if (phase === 'glitch') {
    return (
      <div className="min-h-screen bg-[#0a0a1a] text-white font-mono flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <pre className="text-sm text-red-500 leading-tight"
            style={{ textShadow: '0 0 20px #dc262688, 0 0 40px #dc262644', animation: 'glitch 0.1s infinite' }}>
            {glitchText}
          </pre>
        </div>
        <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(220,38,38,0.1) 1px, rgba(220,38,38,0.1) 2px)',
            animation: 'scanline 0.3s linear infinite'
          }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white font-mono flex flex-col items-center justify-start pt-16 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }} />

      <div className="w-full max-w-2xl relative z-20">
        {showHeader && (
          <div className="text-center mb-10" style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div className="text-xs tracking-[0.5em] text-red-500/60 mb-2" style={{ animation: 'fadeIn 0.5s ease-out' }}>
              DESKTOP ENVIRONMENT
            </div>
            <div className="text-lg font-bold text-blood tracking-wider" style={{ textShadow: '0 0 20px #dc262666, 0 0 40px #dc262633' }}>
              OBYEAD'S PC // GUI MODE
            </div>
            <div className="text-xs text-red-900/40 mt-1 tracking-widest">
              ─────────────────────────────
            </div>
          </div>
        )}

        {showServices && (
          <div className="space-y-1.5 mb-8" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-1.5 rounded transition-all duration-300 ${
                  i < servicesDone
                    ? 'text-green-400/70 bg-green-500/5'
                    : i === servicesDone
                    ? 'text-white/80 bg-red-500/10 border border-red-500/20'
                    : 'text-gray-700'
                }`}
              >
                <span className="text-xs w-5 text-center">{i < servicesDone ? '✓' : service.icon}</span>
                <span className="text-xs">{service.name}</span>
                {i === servicesDone && (
                  <span className="ml-auto text-[9px] text-blood animate-pulse">LOADING</span>
                )}
              </div>
            ))}
          </div>
        )}

        {showServices && (
          <div className="space-y-2" style={{ animation: 'fadeIn 0.3s ease-out' }}>
            <div className="flex justify-between text-[10px] text-gray-600">
              <span>BOOT PROGRESS</span>
              <span className="text-blood font-bold">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-900/50 rounded-full overflow-hidden border border-red-900/20">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #7f1d1d, #dc2626, #ff0033)',
                  boxShadow: '0 0 10px #dc262688, 0 0 20px #ff003344'
                }}
              />
            </div>
          </div>
        )}

        {phase === 'loading' && (
          <div className="mt-8 text-center">
            <div className="text-[10px] text-gray-600 animate-pulse">
              {'>'} Initializing desktop environment...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}