import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
  pulse: number;
  pulseSpeed: number;
}

interface EnergyLine {
  x1: number; y1: number;
  x2: number; y2: number;
  progress: number;
  speed: number;
  alpha: number;
  color: string;
}

interface HexShape {
  x: number; y: number;
  size: number;
  rotation: number;
  rotSpeed: number;
  alpha: number;
  vx: number; vy: number;
  sides: number;
}

const REDS = ['#dc2626', '#ff0033', '#991b1b', '#b91c1c', '#7f1d1d', '#f87171', '#fca5a5'];

export default function CyberAtmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let frame = 0;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouseRef.current = { x: e.clientX, y: e.clientY }; });

    const particles: Particle[] = [];
    const lines: EnergyLine[] = [];
    const shapes: HexShape[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: REDS[Math.floor(Math.random() * REDS.length)],
        life: 0,
        maxLife: 300 + Math.random() * 500,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 10 + Math.random() * 25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        alpha: 0.03 + Math.random() * 0.06,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        sides: Math.random() > 0.5 ? 6 : 3,
      });
    }

    const spawnLine = () => {
      const side = Math.floor(Math.random() * 4);
      let x1 = 0, y1 = 0;
      if (side === 0) { x1 = Math.random() * canvas.width; y1 = 0; }
      else if (side === 1) { x1 = canvas.width; y1 = Math.random() * canvas.height; }
      else if (side === 2) { x1 = Math.random() * canvas.width; y1 = canvas.height; }
      else { x1 = 0; y1 = Math.random() * canvas.height; }

      const angle = Math.random() * Math.PI * 2;
      const length = 200 + Math.random() * 400;
      lines.push({
        x1, y1,
        x2: x1 + Math.cos(angle) * length,
        y2: y1 + Math.sin(angle) * length,
        progress: 0,
        speed: 0.005 + Math.random() * 0.01,
        alpha: 0.15 + Math.random() * 0.2,
        color: REDS[Math.floor(Math.random() * 3)],
      });
    };

    const draw = () => {
      frame++;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (frame % 120 === 0) spawnLine();

      // Geometric shapes
      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;
        if (s.x < -50) s.x = w + 50;
        if (s.x > w + 50) s.x = -50;
        if (s.y < -50) s.y = h + 50;
        if (s.y > h + 50) s.y = -50;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.strokeStyle = `rgba(220, 38, 38, ${s.alpha})`;
        ctx.lineWidth = 0.5;
        ctx.shadowColor = '#dc2626';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        for (let i = 0; i <= s.sides; i++) {
          const a = (i / s.sides) * Math.PI * 2;
          const px = Math.cos(a) * s.size;
          const py = Math.sin(a) * s.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }

      // Energy lines
      ctx.shadowBlur = 0;
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        l.progress += l.speed;
        if (l.progress >= 1) { lines.splice(i, 1); continue; }

        const cx = l.x1 + (l.x2 - l.x1) * l.progress;
        const cy = l.y1 + (l.y2 - l.y1) * l.progress;
        const grad = ctx.createLinearGradient(l.x1, l.y1, cx, cy);
        grad.addColorStop(0, `rgba(220, 38, 38, 0)`);
        grad.addColorStop(0.7, `rgba(255, 0, 51, ${l.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(255, 0, 51, ${l.alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.shadowColor = '#ff0033';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }

      // Particles
      ctx.shadowBlur = 0;
      for (const p of particles) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 1) {
          const force = (1 - dist / 120) * 0.8;
          p.vx += (dx / dist) * force * 0.05;
          p.vy += (dy / dist) * force * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.pulse += p.pulseSpeed;
        p.life++;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulseAlpha = p.alpha * (0.5 + 0.5 * Math.sin(p.pulse));
        const lifeFade = p.life > p.maxLife - 60 ? (p.maxLife - p.life) / 60 : 1;
        const a = pulseAlpha * lifeFade;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.8 + 0.2 * Math.sin(p.pulse)), 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(a * 255).toString(16).padStart(2, '0');
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 4;
        ctx.fill();

        if (p.life > p.maxLife) {
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.life = 0;
          p.alpha = Math.random() * 0.6 + 0.1;
        }
      }

      // Connection lines between close particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const ddx = a.x - b.x;
          const ddy = a.y - b.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 100) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.04 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', e => { mouseRef.current = { x: e.clientX, y: e.clientY }; });
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}