import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Minus, Square, X, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface Props {
  win: {
    id: string;
    title: string;
    icon: string;
    x: number;
    y: number;
    w: number;
    h: number;
    minimized: boolean;
    maximized: boolean;
  };
  children: React.ReactNode;
}

export default function AppWindow({ win, children }: Props) {
  const ctx = useApp();
  const focused = ctx.focusedId === win.id;
  const dragRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const resizeRef = useRef<{ sx: number; sy: number; ox: number; oy: number; ow: number; oh: number; dir: string } | null>(null);
  const winRef = useRef(win);
  winRef.current = win;

  const startDrag = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    ctx.focusWindow(win.id);
    if (!win.maximized) {
      dragRef.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
    }
  };

  const onTitleDblClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    win.maximized ? ctx.restoreWindow(win.id) : ctx.maximizeWindow(win.id);
  };

  const startResize = (dir: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ctx.focusWindow(win.id);
    resizeRef.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y, ow: win.w, oh: win.h, dir };
  };

  useEffect(() => {
    if (!dragRef.current && !resizeRef.current) return;
    const onMove = (e: MouseEvent) => {
      const cur = winRef.current;
      if (dragRef.current) {
        const d = dragRef.current;
        const nx = d.ox + (e.clientX - d.sx);
        const ny = d.oy + (e.clientY - d.sy);
        ctx.setWindows((prev: any[]) => prev.map((w: any) =>
          w.id === win.id
            ? {
                ...w,
                x: Math.min(Math.max(nx, -cur.w + 140), window.innerWidth - 140),
                y: Math.min(Math.max(ny, 32), window.innerHeight - 72),
              }
            : w
        ));
      }
      if (resizeRef.current) {
        const d = resizeRef.current;
        const dx = e.clientX - d.sx;
        const dy = e.clientY - d.sy;
        ctx.setWindows((prev: any[]) => prev.map((w: any) => {
          if (w.id !== win.id) return w;
          let { x, y, w: ww, h: hh } = w;
          const MIN_W = 380, MIN_H = 280;
          if (d.dir.includes('e')) ww = Math.max(MIN_W, d.ow + dx);
          if (d.dir.includes('s')) hh = Math.max(MIN_H, d.oh + dy);
          if (d.dir.includes('w')) { ww = Math.max(MIN_W, d.ow - dx); x = Math.min(d.ox + (d.ow - ww), window.innerWidth - 100); }
          if (d.dir.includes('n')) { hh = Math.max(MIN_H, d.oh - dy); y = Math.min(d.oy + (d.oh - hh), window.innerHeight - 60); }
          return { ...w, x, y, w: ww, h: hh };
        }));
      }
    };
    const onUp = () => {
      const cur = winRef.current;
      if (dragRef.current && !cur.maximized) {
        if (cur.y <= 34 && cur.x > window.innerWidth * 0.2 && cur.x < window.innerWidth * 0.8) {
          ctx.maximizeWindow(cur.id);
        } else if (cur.x <= 0) {
          ctx.setWindows((prev: any[]) => prev.map((w: any) =>
            w.id === cur.id ? { ...w, x: 0, y: 32, w: Math.floor((window.innerWidth - 8) / 2), h: window.innerHeight - 32 - 48 } : w
          ));
        } else if (cur.x + cur.w >= window.innerWidth) {
          ctx.setWindows((prev: any[]) => prev.map((w: any) =>
            w.id === cur.id
              ? { ...w, x: Math.floor((window.innerWidth - 8) / 2) + 4, y: 32, w: Math.floor((window.innerWidth - 8) / 2), h: window.innerHeight - 32 - 48 }
              : w
          ));
        }
      }
      dragRef.current = null;
      resizeRef.current = null;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  });

  if (win.minimized) return null;
  const interactive = dragRef.current || resizeRef.current;

  return (
    <motion.div
      layout={!interactive}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
      transition={{ duration: 0.18, ease: [0.2, 0, 0, 1] }}
      className="absolute rounded-xl overflow-hidden"
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: focused ? 200 : 100,
        background: '#242424',
        boxShadow: focused
          ? '0 25px 50px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)'
          : '0 18px 36px -12px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
      onMouseDown={() => ctx.focusWindow(win.id)}
    >
      {/* Title bar */}
      <div
        className="h-10 flex items-center px-3 shrink-0 cursor-default bg-[#303030] relative"
        onMouseDown={startDrag}
        onDoubleClick={onTitleDblClick}
      >
        <div className="flex-1 text-center font-semibold text-gray-300 text-sm truncate px-4 pointer-events-none">
          {win.icon} {win.title}
        </div>
        <div className="flex items-center gap-2 absolute right-3">
          <button
            onClick={(e) => { e.stopPropagation(); ctx.minimizeWindow(win.id); }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            title="Minimize"
          >
            <Minus size={12} strokeWidth={2.2} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); win.maximized ? ctx.restoreWindow(win.id) : ctx.maximizeWindow(win.id); }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            title={win.maximized ? 'Restore' : 'Maximize'}
          >
            {win.maximized ? <Copy size={11} strokeWidth={2.2} /> : <Square size={10} strokeWidth={2.2} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); ctx.closeWindow(win.id); }}
            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
            title="Close"
          >
            <X size={13} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative" style={{ height: 'calc(100% - 40px)' }}>
        {children}
      </div>

      {/* Resize handles */}
      {!win.maximized && (
        <>
          <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize z-30" onMouseDown={startResize('nw')} />
          <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize z-30" onMouseDown={startResize('ne')} />
          <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize z-30" onMouseDown={startResize('sw')} />
          <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-30" onMouseDown={startResize('se')} />
          <div className="absolute top-0 left-4 right-4 h-1.5 cursor-n-resize z-20" onMouseDown={startResize('n')} />
          <div className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize z-20" onMouseDown={startResize('s')} />
          <div className="absolute left-0 top-4 bottom-4 w-1.5 cursor-w-resize z-20" onMouseDown={startResize('w')} />
          <div className="absolute right-0 top-4 bottom-4 w-1.5 cursor-e-resize z-20" onMouseDown={startResize('e')} />
        </>
      )}
    </motion.div>
  );
}
