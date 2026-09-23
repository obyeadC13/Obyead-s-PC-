import { useEffect, useRef } from 'react';

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const prevRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      prevRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    interface Star {
      x: number; y: number;
      homeX: number; homeY: number;
      r: number; a: number; da: number;
      vx: number; vy: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < 700; i++) {
      const hx = Math.random() * canvas.width;
      const hy = Math.random() * canvas.height;
      stars.push({
        x: hx, y: hy,
        homeX: hx, homeY: hy,
        r: Math.random() < 0.06 ? Math.random() * 3 + 2 : Math.random() < 0.4 ? Math.random() * 1.2 + 0.5 : Math.random() * 1 + 0.3,
        a: Math.random() * 0.8 + 0.3,
        da: (Math.random() - 0.5) * 0.01,
        vx: 0, vy: 0,
      });
    }

    const RADIUS = 80;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const m = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle
        s.a += s.da;
        if (s.a > 1 || s.a < 0.25) s.da *= -1;

        // Scatter: strong repulsion while cursor is near
        const dx = s.x - m.x;
        const dy = s.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 1) {
          const force = (1 - dist / RADIUS) * 2.4;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }

        // Spring back to home
        s.vx += (s.homeX - s.x) * 0.02;
        s.vy += (s.homeY - s.y) * 0.02;

        // Integrate with damping
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.88;
        s.vy *= 0.88;

        // Draw
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}