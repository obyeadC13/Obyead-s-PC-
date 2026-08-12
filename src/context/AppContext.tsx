import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface WindowState {
  id: string;
  title: string;
  icon: string;
  category: 'web' | 'games' | 'writing' | 'about' | 'contact' | 'comments';
  minimized: boolean;
  position: { x: number; y: number };
}

interface AppContextType {
  mode: 'terminal' | 'gui';
  setMode: (mode: 'terminal' | 'gui') => void;
  windows: WindowState[];
  focusedWindow: string | null;
  openWindow: (category: WindowState['category'], title: string, icon: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
  switchMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [mode, setModeState] = useState<'terminal' | 'gui'>('terminal');
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Sync mode state with URL
  useEffect(() => {
    if (location.pathname.includes('/gui')) setModeState('gui');
    else if (location.pathname.includes('/terminal')) setModeState('terminal');
  }, [location.pathname]);

  const setMode = useCallback((newMode: 'terminal' | 'gui') => {
    setModeState(newMode);
    if (newMode === 'terminal') {
      navigate('/boot/terminal');
    } else {
      navigate('/boot/gui');
    }
  }, [navigate]);

  const switchMode = useCallback(() => {
    if (mode === 'terminal') {
      setMode('gui');
    } else {
      setMode('terminal');
    }
  }, [mode, setMode]);

  const openWindow = useCallback((category: WindowState['category'], title: string, icon: string) => {
    setStartMenuOpen(false);
    setWindows(prev => {
      const existing = prev.find(w => w.category === category && !w.minimized);
      if (existing) {
        setFocusedWindow(existing.id);
        return prev;
      }
      const restored = prev.find(w => w.category === category && w.minimized);
      if (restored) {
        setFocusedWindow(restored.id);
        return prev.map(w => w.id === restored.id ? { ...w, minimized: false } : w);
      }
      const id = `${category}-${Date.now()}`;
      const offsetX = (prev.length % 5) * 30;
      const offsetY = (prev.length % 5) * 30;
      const newWin: WindowState = {
        id,
        title,
        icon,
        category,
        minimized: false,
        position: { x: 80 + offsetX, y: 40 + offsetY },
      };
      setFocusedWindow(id);
      return [...prev, newWin];
    });
  }, [setStartMenuOpen]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    setFocusedWindow(prev => prev === id ? null : prev);
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: true } : w));
    setFocusedWindow(prev => prev === id ? null : prev);
  }, []);

  const focusWindow = useCallback((id: string) => {
    setFocusedWindow(id);
  }, []);

  return (
    <AppContext.Provider value={{
      mode, setMode, windows, focusedWindow,
      openWindow, closeWindow, minimizeWindow, focusWindow,
      startMenuOpen, setStartMenuOpen, switchMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}