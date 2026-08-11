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
      r: number; a: number; da: number;
      vx: number; vy: number;
    }

    const stars: Star[] = [];
    for (let i = 0; i < 900; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() < 0.06 ? Math.random() * 2.5 + 1.5 : Math.random() < 0.4 ? Math.random() * 1 + 0.3 : Math.random() * 0.8 + 0.2,
        a: Math.random() * 0.7 + 0.1,
        da: (Math.random() - 0.5) * 0.01,
        vx: 0, vy: 0,
      });
    }

    const RADIUS = 100;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const m = mouseRef.current;
      const p = prevRef.current;

      const isMoving = m.x !== p.x || m.y !== p.y;
      const speed = isMoving
        ? Math.min(Math.sqrt((m.x - p.x) ** 2 + (m.y - p.y) ** 2), 20)
        : 0;

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Twinkle
        s.a += s.da;
        if (s.a > 0.85 || s.a < 0.08) s.da *= -1;

        // Gentle push when cursor moves nearby
        if (isMoving && speed > 0.5) {
          const dx = s.x - m.x;
          const dy = s.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < RADIUS && dist > 1) {
            const force = (1 - dist / RADIUS) * 0.5 * (speed / 10);
            s.vx += (dx / dist) * force;
            s.vy += (dy / dist) * force;
          }
        }

        // Apply velocity with heavy damping
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.9;
        s.vy *= 0.9;

        // Wrap
        if (s.x < 0) s.x += w;
        if (s.x > w) s.x -= w;
        if (s.y < 0) s.y += h;
        if (s.y > h) s.y -= h;

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