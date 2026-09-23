import { useEffect, useState } from 'react';

export default function GlitchOverlay() {
  const [active, setActive] = useState(false);
  const [variant, setVariant] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (Math.random() < 0.15) {
        setActive(true);
        setVariant(Math.floor(Math.random() * 3));
        setTimeout(() => setActive(false), 60 + Math.random() * 80);
      }
    };
    window.addEventListener('click', handler);
    window.addEventListener('dblclick', handler);
    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('dblclick', handler);
      window.removeEventListener('keydown', handler);
    };
  }, []);

  if (!active) return null;

  if (variant === 0) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none mix-blend-screen">
        <div className="absolute inset-0 bg-red-500/5" style={{ transform: 'translateX(3px)' }} />
        <div className="absolute inset-0 bg-blue-500/5" style={{ transform: 'translateX(-3px)' }} />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-white/20" />
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}
            className="absolute left-0 right-0 h-[1px] bg-white/10"
            style={{ top: `${Math.random() * 100}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <div className="absolute inset-0 bg-blood/5" style={{ clipPath: 'inset(20% 0 60% 0)' }} />
    </div>
  );
}