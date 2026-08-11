import { useRef, useEffect } from 'react';

interface Rocket {
  x: number;
  y: number;
  speed: number;
  angle: number;
}

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotSpeed: number;
  vertices: { x: number; y: number }[];
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let rockets: Rocket[] = [];
    let bullets: Bullet[] = [];
    let asteroids: Asteroid[] = [];
    let particles: Particle[] = [];
    let frame = 0;

    const createAsteroid = () => {
      const size = 12 + Math.random() * 22;
      const side = Math.floor(Math.random() * 4);
      let x = 0, y = 0;
      if (side === 0) { x = Math.random() * canvas.width; y = -size; }
      else if (side === 1) { x = canvas.width + size; y = Math.random() * canvas.height; }
      else if (side === 2) { x = Math.random() * canvas.width; y = canvas.height + size; }
      else { x = -size; y = Math.random() * canvas.height; }

      // Regular hexagon with slight perturbation
      const vertices: { x: number; y: number }[] = [];
      const n = 6;
      for (let i = 0; i < n; i++) {
        const angle = (i / n) * Math.PI * 2;
        const r = size * (0.85 + Math.random() * 0.15);
        vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }

      const targetX = canvas.width * 0.2 + Math.random() * canvas.width * 0.6;
      const targetY = canvas.height * 0.2 + Math.random() * canvas.height * 0.6;
      const angle = Math.atan2(targetY - y, targetX - x);
      const speed = 0.4 + Math.random() * 1;

      return {
        x, y, size,
        speedX: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
        speedY: Math.sin(angle) * speed + (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        vertices,
      };
    };

    const createRocket = () => {
      const side = Math.floor(Math.random() * 2);
      let x: number, y: number, angle: number;
      if (side === 0) {
        x = 50 + Math.random() * (canvas.width - 100);
        y = canvas.height * 0.4 + Math.random() * canvas.height * 0.3;
        angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.8;
      } else {
        x = 50 + Math.random() * (canvas.width - 100);
        y = canvas.height * 0.2 + Math.random() * canvas.height * 0.2;
        angle = Math.PI + (Math.random() - 0.5) * 1.5;
      }
      return { x, y, speed: 0.6 + Math.random() * 1.2, angle };
    };

    const createParticles = (x: number, y: number, count: number) => {
      const ps: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const a = Math.random() * Math.PI * 2;
        const s = 0.5 + Math.random() * 3;
        ps.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 15 + Math.random() * 20, maxLife: 35 });
      }
      return ps;
    };

    for (let i = 0; i < 10; i++) asteroids.push(createAsteroid());
    for (let i = 0; i < 4; i++) rockets.push(createRocket());

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frame % 180 === 0 && asteroids.length < 18) asteroids.push(createAsteroid());
      if (frame % 250 === 0 && rockets.length < 6) rockets.push(createRocket());

      // Rockets
      rockets = rockets.filter(r => {
        r.x += Math.cos(r.angle) * r.speed;
        r.y += Math.sin(r.angle) * r.speed;

        // Check collision with asteroids
        let crashed = false;
        asteroids = asteroids.filter(a => {
          const dx = r.x - a.x;
          const dy = r.y - a.y;
          if (Math.sqrt(dx * dx + dy * dy) < a.size + 8) {
            // Rocket explodes
            particles.push(...createParticles(r.x, r.y, 25));
            // Asteroid also breaks apart
            particles.push(...createParticles(a.x, a.y, 12));
            crashed = true;
            return false;
          }
          return true;
        });
        if (crashed) return false;

        if (frame % 20 === Math.floor(r.x) % 20) {
          const tipX = r.x + Math.cos(r.angle) * 10;
          const tipY = r.y + Math.sin(r.angle) * 10;
          const spd = 5;
          bullets.push({ x: tipX, y: tipY, vx: Math.cos(r.angle) * spd, vy: Math.sin(r.angle) * spd });
        }

        if (frame % 2 === 0) {
          const ex = r.x - Math.cos(r.angle) * 12;
          const ey = r.y - Math.sin(r.angle) * 12;
          particles.push({ x: ex, y: ey, vx: -Math.cos(r.angle) * 0.8, vy: -Math.sin(r.angle) * 0.8, life: 12, maxLife: 12 });
        }

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.angle);
        ctx.strokeStyle = '#4da6ff';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#4da6ff';
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-7, -5);
        ctx.lineTo(-5, 0);
        ctx.lineTo(-7, 5);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();

        return r.x > -60 && r.x < canvas.width + 60 && r.y > -60 && r.y < canvas.height + 60;
      });

      // Bullets
      bullets = bullets.filter(b => {
        b.x += b.vx;
        b.y += b.vy;
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 8;
        ctx.fillRect(b.x - 1, b.y, 2, 7);

        let hit = false;
        asteroids = asteroids.filter(a => {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          if (Math.sqrt(dx * dx + dy * dy) < a.size) {
            particles.push(...createParticles(a.x, a.y, 10));
            hit = true;
            return false;
          }
          return true;
        });

        return (b.y > -10 && b.y < canvas.height + 10 && b.x > -10 && b.x < canvas.width + 10) && !hit;
      });

      // Asteroid-asteroid collisions
      const collided = new Set<Asteroid>();
      for (let i = 0; i < asteroids.length; i++) {
        for (let j = i + 1; j < asteroids.length; j++) {
          const a = asteroids[i], b = asteroids[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          if (Math.sqrt(dx*dx + dy*dy) < a.size + b.size) {
            collided.add(a);
            collided.add(b);
            particles.push(...createParticles(a.x, a.y, 10));
            particles.push(...createParticles(b.x, b.y, 10));
          }
        }
      }

      // Asteroids
      ctx.shadowBlur = 0;
      asteroids = asteroids.filter(a => {
        if (collided.has(a)) return false;
        a.x += a.speedX;
        a.y += a.speedY;
        a.rotation += a.rotSpeed;

        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);
        ctx.strokeStyle = '#4da6ffcc';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#4da6ff';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        a.vertices.forEach((v, i) => {
          if (i === 0) ctx.moveTo(v.x, v.y);
          else ctx.lineTo(v.x, v.y);
        });
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = '#4da6ff11';
        ctx.fill();
        ctx.restore();

        return a.x > -120 && a.x < canvas.width + 120 && a.y > -120 && a.y < canvas.height + 120;
      });

      // Particles
      ctx.shadowBlur = 0;
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.life--;
        const alpha = (p.life / p.maxLife);
        ctx.fillStyle = `rgba(0, 240, 255, ${alpha})`;
        ctx.fillRect(p.x, p.y, 2, 2);
        return p.life > 0;
      });

      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}