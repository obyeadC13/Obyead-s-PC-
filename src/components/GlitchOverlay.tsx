import { useEffect, useState, useRef, useCallback } from 'react';

interface GlitchFx {
  active: boolean;
  variant: number;
}

const INTENSITY = {
  triggerChance: 0.32,
  minInterval: 220,
  ambientEvery: [14000, 28000] as [number, number],
  duration: [70, 240] as [number, number],
  pointerEvery: 40,
  pointerChance: 0.35,
};

export default function GlitchOverlay() {
  const [fx, setFx] = useState<GlitchFx>({ active: false, variant: 0 });
  const lastTrigger = useRef(0);
  const pointerCount = useRef(0);

  const trigger = useCallback((force = false) => {
    const now = Date.now();
    if (!force && now - lastTrigger.current < INTENSITY.minInterval) return;
    lastTrigger.current = now;
    const variant = Math.floor(Math.random() * 8);
    setFx({ active: true, variant });
    const [dMin, dMax] = INTENSITY.duration;
    setTimeout(() => setFx({ active: false, variant: 0 }), dMin + Math.random() * (dMax - dMin));
  }, []);

  useEffect(() => {
    const handler = () => {
      if (Math.random() < INTENSITY.triggerChance) trigger();
    };
    const onMove = () => {
      pointerCount.current++;
      if (pointerCount.current % INTENSITY.pointerEvery === 0 && Math.random() < INTENSITY.pointerChance) trigger(true);
    };

    window.addEventListener('click', handler);
    window.addEventListener('dblclick', handler);
    window.addEventListener('keydown', handler);
    window.addEventListener('pointermove', onMove);

    let ambientTimer: ReturnType<typeof setTimeout>;
    const scheduleAmbient = () => {
      const [aMin, aMax] = INTENSITY.ambientEvery;
      ambientTimer = setTimeout(() => {
        trigger(true);
        scheduleAmbient();
      }, aMin + Math.random() * (aMax - aMin));
    };
    scheduleAmbient();

    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('dblclick', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('pointermove', onMove);
      clearTimeout(ambientTimer);
    };
  }, [trigger]);

  if (!fx.active) return null;

  switch (fx.variant) {
    case 0:
      return <RgbSplit />;
    case 1:
      return <ScanLines />;
    case 2:
      return <BlockGlitch />;
    case 3:
      return <ChromaFlicker />;
    case 4:
      return <StaticNoise />;
    case 5:
      return <HorizontalTear />;
    case 6:
      return <VhsWobble />;
    default:
      return <InvertFlash />;
  }
}

function RgbSplit() {
  const x = 2 + Math.random() * 5;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen">
      <div className="absolute inset-0 bg-red-500/10" style={{ transform: `translateX(${x}px)` }} />
      <div className="absolute inset-0 bg-blue-500/10" style={{ transform: `translateX(-${x}px)` }} />
      <div className="absolute top-1/4 left-0 right-0 h-px bg-white/30" />
      <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
    </div>
  );
}

function ScanLines() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i}
          className="absolute left-0 right-0 bg-white/15"
          style={{ top: `${Math.random() * 100}%`, height: `${1 + Math.random() * 3}px` }} />
      ))}
    </div>
  );
}

function BlockGlitch() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute inset-0 bg-blood/15" style={{ clipPath: `inset(${10 + Math.random() * 40}% 0 ${10 + Math.random() * 40}% 0)` }} />
      <div className="absolute inset-0 bg-neon-cyan/10" style={{ clipPath: `inset(${Math.random() * 70}% 0 ${Math.random() * 70}% 0)` }} />
    </div>
  );
}

function ChromaFlicker() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-overlay">
      <div className="absolute inset-0" style={{ background: `linear-gradient(${Math.random() * 360}deg, rgba(255,0,64,0.18), transparent 60%)` }} />
    </div>
  );
}

function StaticNoise() {
  const seed = Math.floor(Math.random() * 100);
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.07]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' seed='${seed}'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E")`,
      }} />
  );
}

function HorizontalTear() {
  const y = 20 + Math.random() * 60;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute left-0 right-0 bg-black/60" style={{ top: `${y}%`, height: '3px' }} />
      <div className="absolute left-0 right-0" style={{ top: `${y}%`, height: '22px', transform: `translateX(${(Math.random() - 0.5) * 30}px)`, background: 'linear-gradient(180deg, rgba(255,0,64,0.12), transparent)' }} />
    </div>
  );
}

function VhsWobble() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute inset-0" style={{
        background: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 3px)',
        transform: `translateX(${(Math.random() - 0.5) * 6}px)`,
      }} />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

function InvertFlash() {
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none bg-white/[0.04]" />
  );
}
