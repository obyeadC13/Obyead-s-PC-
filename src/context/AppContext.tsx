import { createContext, useContext, useState, useCallback, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minimized: boolean;
  maximized: boolean;
  preMaxRect: { x: number; y: number; w: number; h: number };
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppCtx {
  windows: WindowState[];
  setWindows: Dispatch<SetStateAction<WindowState[]>>;
  focusedId: string | null;
  startMenuOpen: boolean;
  setStartMenuOpen: Dispatch<SetStateAction<boolean>>;
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  openApp: (appId: string, extra?: { title?: string; icon?: string; w?: number; h?: number }) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  switchMode: () => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedId, setFocused] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const switchMode = useCallback(() => {
    const current = location.pathname;
    navigate(current.includes('/gui') ? '/boot/terminal' : '/boot/gui');
  }, [navigate]);

  const openApp = useCallback((appId: string, extra?: { title?: string; icon?: string; w?: number; h?: number }) => {
    setStartMenuOpen(false);
    setWindows(prev => {
      const existing = prev.find(w => w.appId === appId && !w.minimized);
      if (existing) { setFocused(existing.id); return prev; }
      const restored = prev.find(w => w.appId === appId && w.minimized);
      if (restored) {
        setFocused(restored.id);
        return prev.map(w => w.id === restored.id ? { ...w, minimized: false } : w);
      }
      const openCount = prev.filter(w => !w.minimized).length;
      const off = Math.min(openCount, 4) * 30;
      const w = extra?.w ?? 750;
      const h = extra?.h ?? 520;
      const win: WindowState = {
        id: `${appId}-${Date.now()}`,
        appId,
        title: extra?.title ?? appId.charAt(0).toUpperCase() + appId.slice(1),
        icon: extra?.icon ?? '📄',
        x: Math.max(20, (window.innerWidth - w) / 2) + off,
        y: Math.max(20, (window.innerHeight - h - 48) / 2) + off,
        w, h,
        minimized: false,
        maximized: false,
        preMaxRect: { x: 0, y: 0, w: 0, h: 0 },
      };
      setFocused(win.id);
      return [...prev, win];
    });
  }, []);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setFocused(prev => prev === id ? null : prev);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
    setFocused(prev => prev === id ? null : prev);
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id || w.maximized) return w;
      const pre = { x: w.x, y: w.y, w: w.w, h: w.h };
      return { ...w, maximized: true, preMaxRect: pre, x: 0, y: 0, w: window.innerWidth, h: window.innerHeight - 56 };
    }));
    setFocused(id);
  }, []);

  const restoreWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id !== id || !w.maximized) return w;
      return { ...w, maximized: false, x: w.preMaxRect.x, y: w.preMaxRect.y, w: w.preMaxRect.w, h: w.preMaxRect.h };
    }));
    setFocused(id);
  }, []);

  const focusWindow = useCallback((id: string) => setFocused(id), []);

  return (
    <Ctx.Provider value={{
      windows, setWindows, focusedId,
      startMenuOpen, setStartMenuOpen,
      toasts, showToast, removeToast,
      openApp, closeWindow, minimizeWindow, maximizeWindow, restoreWindow, focusWindow, switchMode,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp(): AppCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useApp must be inside AppProvider');
  return c;
}