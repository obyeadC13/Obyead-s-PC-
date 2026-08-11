import { useRef, useEffect, useState, useCallback } from 'react';

interface Ship {
  x: number;
  y: number;
  w: number;
  h: number;
  speed: number;
}

interface Bullet {
  x: number;
  y: number;
  speed: number;
}

interface Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
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
  color: string;
}

export default function AsteroidGame({ onExit }: { onExit: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [_lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const gameState = useRef({
    ship: { x: 0, y: 0, w: 28, h: 20, speed: 5 } as Ship,
    bullets: [] as Bullet[],
    asteroids: [] as Asteroid[],
    particles: [] as Particle[],
    keys: {} as Record<string, boolean>,
    score: 0,
    lives: 3,
    gameOver: false,
    frame: 0,
    shooting: false,
    shootCooldown: 0,
  });

  const createAsteroid = useCallback((canvasW: number, _canvasH: number) => {
    const size = 15 + Math.random() * 30;
    const vertices: { x: number; y: number }[] = [];
    const numVertices = 7 + Math.floor(Math.random() * 5);
    for (let i = 0; i < numVertices; i++) {
      const angle = (i / numVertices) * Math.PI * 2;
      const r = size * (0.6 + Math.random() * 0.4);
      vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
    }
    return {
      x: Math.random() * (canvasW - size * 2) + size,
      y: -size,
      size,
      speed: 0.5 + Math.random() * 2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
      vertices,
    };
  }, []);

  const createParticles = useCallback((x: number, y: number, count: number) => {
    const particles: Particle[] = [];
    const colors = ['#4da6ff', '#00f0ff', '#ffffff', '#2d6bb8'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 20 + Math.random() * 20,
        maxLife: 40,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return particles;
  }, []);

  const initGame = useCallback(() => {
    const gs = gameState.current;
    gs.ship.x = 0;
    gs.ship.y = 0;
    gs.bullets = [];
    gs.asteroids = [];
    gs.particles = [];
    gs.score = 0;
    gs.lives = 3;
    gs.gameOver = false;
    gs.frame = 0;
    setScore(0);
    setLives(3);
    setGameOver(false);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const gs = gameState.current;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        gs.ship.x = canvas.width / 2;
        gs.ship.y = canvas.height - 50;
      }
    };
    resize();

    const handleKeyDown = (e: KeyboardEvent) => {
      gs.keys[e.key] = true;
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === 'Escape') onExit();
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      gs.keys[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animId: number;
    const loop = () => {
      if (!started || gs.gameOver) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;
      gs.frame++;

      // Ship movement
      if (gs.keys['ArrowLeft'] || gs.keys['a']) gs.ship.x -= gs.ship.speed;
      if (gs.keys['ArrowRight'] || gs.keys['d']) gs.ship.x += gs.ship.speed;
      if (gs.keys['ArrowUp'] || gs.keys['w']) gs.ship.y -= gs.ship.speed;
      if (gs.keys['ArrowDown'] || gs.keys['s']) gs.ship.y += gs.ship.speed;
      gs.ship.x = Math.max(gs.ship.w / 2, Math.min(w - gs.ship.w / 2, gs.ship.x));
      gs.ship.y = Math.max(h / 2, Math.min(h - gs.ship.h, gs.ship.y));

      // Shooting
      if (gs.shootCooldown > 0) gs.shootCooldown--;
      if (gs.keys[' '] && gs.shootCooldown <= 0) {
        gs.bullets.push({ x: gs.ship.x, y: gs.ship.y - gs.ship.h, speed: 8 });
        gs.shootCooldown = 8;
      }

      // Bullets
      gs.bullets = gs.bullets.filter(b => {
        b.y -= b.speed;
        return b.y > -10;
      });

      // Spawn asteroids
      if (gs.frame % Math.max(15, 50 - Math.floor(gs.score / 50)) === 0) {
        gs.asteroids.push(createAsteroid(w, h));
      }

      // Asteroids
      gs.asteroids = gs.asteroids.filter(a => {
        a.y += a.speed;
        a.rotation += a.rotSpeed;
        return a.y < h + a.size * 2;
      });

      // Bullet-asteroid collisions
      gs.bullets = gs.bullets.filter(b => {
        let hit = false;
        gs.asteroids = gs.asteroids.filter(a => {
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < a.size + 2) {
            hit = true;
            gs.particles.push(...createParticles(a.x, a.y, 12));
            gs.score += a.size > 30 ? 20 : a.size > 20 ? 15 : 10;
            setScore(gs.score);

            if (a.size > 18) {
              for (let i = 0; i < 2; i++) {
                const small = createAsteroid(w, h);
                small.x = a.x + (Math.random() - 0.5) * 20;
                small.y = a.y;
                small.size = a.size * 0.5;
                small.vertices = [];
                for (let v = 0; v < 6; v++) {
                  const angle = (v / 6) * Math.PI * 2;
                  const r = small.size * (0.6 + Math.random() * 0.4);
                  small.vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
                }
                gs.asteroids.push(small);
              }
            }
            return false;
          }
          return true;
        });
        return !hit;
      });

      // Ship-asteroid collisions
      for (const a of gs.asteroids) {
        const dx = gs.ship.x - a.x;
        const dy = gs.ship.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < a.size + 8) {
          gs.lives--;
          setLives(gs.lives);
          gs.particles.push(...createParticles(gs.ship.x, gs.ship.y, 20));
          gs.asteroids = gs.asteroids.filter(ast => ast !== a);
          if (gs.lives <= 0) {
            gs.gameOver = true;
            setGameOver(true);
          }
          break;
        }
      }

      // Particles
      gs.particles = gs.particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life--;
        return p.life > 0;
      });

      // Draw
      ctx.clearRect(0, 0, w, h);

      // Stars background
      ctx.fillStyle = '#4da6ff15';
      for (let i = 0; i < 50; i++) {
        const sx = (i * 137.5 + gs.frame * 0.1) % w;
        const sy = (i * 97.3 + gs.frame * 0.3) % h;
        ctx.fillRect(sx, sy, 1, 1);
      }

      // Ship
      ctx.save();
      ctx.translate(gs.ship.x, gs.ship.y);
      ctx.strokeStyle = '#4da6ff';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#4da6ff';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, -gs.ship.h);
      ctx.lineTo(-gs.ship.w / 2, gs.ship.h / 2);
      ctx.lineTo(0, gs.ship.h / 4);
      ctx.lineTo(gs.ship.w / 2, gs.ship.h / 2);
      ctx.closePath();
      ctx.stroke();

      // Engine glow
      ctx.fillStyle = '#4da6ff44';
      ctx.beginPath();
      ctx.moveTo(-5, gs.ship.h / 4);
      ctx.lineTo(0, gs.ship.h / 4 + 5 + Math.random() * 6);
      ctx.lineTo(5, gs.ship.h / 4);
      ctx.fill();
      ctx.restore();

      // Bullets
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 8;
      gs.bullets.forEach(b => {
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(b.x - 1, b.y, 2, 8);
      });

      // Asteroids
      ctx.shadowBlur = 0;
      gs.asteroids.forEach(a => {
        ctx.save();
        ctx.translate(a.x, a.y);
        ctx.rotate(a.rotation);
        ctx.strokeStyle = '#4da6ff';
        ctx.lineWidth = 1.5;
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
      });

      // Particles
      gs.particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      });

      // HUD
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#4da6ff';
      ctx.font = '13px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SCORE ${String(gs.score).padStart(5, '0')}`, 12, 22);
      ctx.textAlign = 'center';
      ctx.fillText(`LIVES ${'◆'.repeat(Math.max(0, gs.lives))}`, w / 2, 22);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#4da6ff88';
      ctx.font = '11px monospace';
      ctx.fillText('ESC to exit', w - 12, 22);

      // Game over
      if (gs.gameOver) {
        ctx.fillStyle = '#000000cc';
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = '#4da6ff';
        ctx.font = '24px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', w / 2, h / 2 - 30);
        ctx.font = '14px monospace';
        ctx.fillText(`FINAL SCORE: ${gs.score}`, w / 2, h / 2 + 5);
        ctx.fillStyle = '#4da6ff88';
        ctx.font = '12px monospace';
        ctx.fillText('Type "play" to play again', w / 2, h / 2 + 40);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [started, createAsteroid, createParticles, onExit]);

  return (
    <div className="flex flex-col h-full" style={{ background: '#0a0a1a' }}>
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10"
        style={{ background: '#0a0a1a' }}>
        <span className="text-[11px] font-mono" style={{ color: '#4da6ff' }}>
          ASTEROID DESTROYER
        </span>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-mono" style={{ color: '#4da6ff' }}>
            SCORE {String(score).padStart(5, '0')}
          </span>
          <button onClick={onExit} className="text-white/40 hover:text-white transition-colors text-xs font-mono">
            [X]
          </button>
        </div>
      </div>

      {/* Game canvas */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {!started && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            onClick={() => { setStarted(true); initGame(); }}
            style={{ cursor: 'pointer' }}>
            <pre className="text-[10px] leading-none mb-8" style={{ color: '#4da6ff' }}>
{`
     ╔═══════════════════════════════════╗
     ║   ASTEROID DESTROYER              ║
     ║   Obyead's PC // ARCADE           ║
     ╚═══════════════════════════════════╝
`}
            </pre>
            <div className="text-center" style={{ color: '#4da6ff' }}>
              <div className="text-lg font-mono mb-3">CLICK TO START</div>
              <div className="text-xs font-mono opacity-60 space-y-1">
                <div>← → ↑ ↓ or WASD — Move</div>
                <div>SPACE — Shoot</div>
                <div>ESC — Exit</div>
              </div>
            </div>
          </div>
        )}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,10,26,0.85)', cursor: 'pointer' }}
            onClick={() => { setStarted(false); setGameOver(false); }}>
            <div className="text-center" style={{ color: '#4da6ff' }}>
              <div className="text-2xl font-mono mb-2">GAME OVER</div>
              <div className="text-lg font-mono mb-4">SCORE: {score}</div>
              <div className="text-xs font-mono opacity-60">Click to play again</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 px-3 py-1.5 flex items-center justify-between"
        style={{ background: '#0a0a1a' }}>
        <span className="text-[10px] font-mono" style={{ color: '#4da6ff88' }}>
          ARCADE MODE
        </span>
        <span className="text-[10px] font-mono" style={{ color: '#4da6ff88' }}>
          WASD/Arrows: Move | Space: Fire
        </span>
      </div>
    </div>
  );
}