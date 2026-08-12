export interface AppConfig {
  id: string;
  name: string;
  label: string;
  icon: string;
  defaultWidth: number;
  defaultHeight: number;
  desktopIcon: boolean;
  startMenuEntry: boolean;
  taskbarEntry: boolean;
}

export const appRegistry: AppConfig[] = [
  { id: 'projects', name: 'Projects', label: 'My Projects', icon: '📁', defaultWidth: 780, defaultHeight: 560, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'about', name: 'About', label: 'About Me', icon: '👤', defaultWidth: 520, defaultHeight: 480, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'skills', name: 'Skills', label: 'Skills', icon: '⚡', defaultWidth: 520, defaultHeight: 480, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'terminal', name: 'Terminal', label: 'Terminal', icon: '⬛', defaultWidth: 620, defaultHeight: 420, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'resume', name: 'Resume', label: 'Resume.pdf', icon: '📄', defaultWidth: 640, defaultHeight: 520, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'contact', name: 'Contact', label: 'Contact', icon: '✉️', defaultWidth: 480, defaultHeight: 480, desktopIcon: true, startMenuEntry: true, taskbarEntry: true },
  { id: 'trash', name: 'Trash', label: 'Trash', icon: '🗑️', defaultWidth: 0, defaultHeight: 0, desktopIcon: true, startMenuEntry: false, taskbarEntry: false },
];

export const getAppConfig = (id: string): AppConfig | undefined => appRegistry.find(a => a.id === id);

export const desktopApps = appRegistry.filter(a => a.desktopIcon);
export const startMenuApps = appRegistry.filter(a => a.startMenuEntry);
export const taskbarApps = appRegistry.filter(a => a.taskbarEntry);