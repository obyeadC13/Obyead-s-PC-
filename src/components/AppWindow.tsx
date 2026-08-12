import { useRef, useEffect } from 'react';
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
  const resizeRef = useRef<{ sx: number; sy: number; ow: number; oh: number } | null>(null);

  const onTitleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    e.preventDefault();
    ctx.focusWindow(win.id);
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y };
  };

  const onTitleDblClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    win.maximized ? ctx.restoreWindow(win.id) : ctx.maximizeWindow(win.id);
  };

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ctx.focusWindow(win.id);
    resizeRef.current = { sx: e.clientX, sy: e.clientY, ow: win.w, oh: win.h };
  };

  useEffect(() => {
    if (!dragRef.current && !resizeRef.current) return;
    const onMove = (e: MouseEvent) => {
      if (dragRef.current) {
        const dx = e.clientX - dragRef.current.sx;
        const dy = e.clientY - dragRef.current.sy;
        ctx.setWindows((prev: any[]) => prev.map((w: any) =>
          w.id === win.id ? { ...w, x: dragRef.current!.ox + dx, y: dragRef.current!.oy + dy } : w
        ));
      }
      if (resizeRef.current) {
        const dx = e.clientX - resizeRef.current.sx;
        const dy = e.clientY - resizeRef.current.sy;
        ctx.setWindows((prev: any[]) => prev.map((w: any) =>
          w.id === win.id ? { ...w, w: Math.max(320, resizeRef.current!.ow + dx), h: Math.max(240, resizeRef.current!.oh + dy) } : w
        ));
      }
    };
    const onUp = () => { dragRef.current = null; resizeRef.current = null; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
  });

  if (win.minimized) return null;

  return (
    <div
      className="absolute rounded-xl overflow-hidden select-none"
      style={{
        left: win.x, top: win.y, width: win.w, height: win.h,
        zIndex: focused ? 200 : 100,
        background: 'rgba(8, 8, 20, 0.82)',
        backdropFilter: 'blur(30px) saturate(1.8)',
        border: '1px solid rgba(220,38,38,0.2)',
        boxShadow: focused
          ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(220,38,38,0.3), 0 0 40px rgba(220,38,38,0.08)'
          : '0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(220,38,38,0.1)',
      }}
      onMouseDown={() => ctx.focusWindow(win.id)}
    >
      <div
        className="flex items-center h-9 px-3 cursor-default"
        style={{ background: 'rgba(6,6,16,0.7)', borderBottom: '1px solid rgba(220,38,38,0.15)' }}
        onMouseDown={onTitleMouseDown}
        onDoubleClick={onTitleDblClick}
      >
        <div className="flex items-center gap-1.5 mr-2">
          <button onClick={(e) => { e.stopPropagation(); ctx.closeWindow(win.id); }}
            className="w-3 h-3 rounded-full bg-[#f38ba8] hover:brightness-125 transition-colors" />
          <button onClick={(e) => { e.stopPropagation(); ctx.minimizeWindow(win.id); }}
            className="w-3 h-3 rounded-full bg-[#f9e2af] hover:brightness-125 transition-colors" />
          <button onClick={(e) => { e.stopPropagation(); win.maximized ? ctx.restoreWindow(win.id) : ctx.maximizeWindow(win.id); }}
            className="w-3 h-3 rounded-full bg-[#a6e3a1] hover:brightness-125 transition-colors" />
        </div>
        <span className="text-[11px] text-gray-400 font-medium flex-1 text-center tracking-wide">
          {win.icon} {win.title}
        </span>
        <div className="w-14" />
      </div>
      <div className="overflow-hidden relative" style={{ height: 'calc(100% - 36px)' }}>
        {children}
      </div>
      {!win.maximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-20"
          style={{ background: 'linear-gradient(135deg, transparent 50%, rgba(220,38,38,0.4) 50%)' }}
          onMouseDown={onResizeMouseDown}
        />
      )}
    </div>
  );
}