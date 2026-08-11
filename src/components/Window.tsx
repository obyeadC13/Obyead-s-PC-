import { useApp } from '../context/AppContext';

interface WindowProps {
  window: {
    id: string;
    title: string;
    icon: string;
    category: string;
    minimized: boolean;
    position: { x: number; y: number };
  };
  projects: Array<{
    name: string;
    description: string;
    tech: string[];
    link: string;
    github: string;
  }> | null;
  aboutText: string | null;
}

export default function Window({ window: win, projects, aboutText }: WindowProps) {
  const { closeWindow, minimizeWindow, focusWindow, focusedWindow } = useApp();
  const isFocused = focusedWindow === win.id;

  if (win.minimized) return null;

  return (
    <div
      className={`absolute animate-scaleIn rounded-2xl overflow-hidden ${
        isFocused ? 'z-50' : 'z-40'
      }`}
      style={{
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        width: '620px',
        maxHeight: '72vh',
        background: 'rgba(16, 16, 28, 0.75)',
        backdropFilter: 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: isFocused
          ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)'
          : '0 8px 24px rgba(0,0,0,0.25)',
      }}
      onClick={() => focusWindow(win.id)}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-5 py-3 cursor-default select-none"
        style={{
          background: 'rgba(10, 10, 18, 0.6)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{win.icon}</span>
          <span className="text-gui-text font-semibold text-sm tracking-tight">{win.title}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gui-text-muted hover:bg-gui-surface-hover hover:text-gui-text transition-all text-sm font-light"
          >
            −
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-gui-danger/90 hover:bg-gui-danger transition-all text-sm"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto" style={{ maxHeight: 'calc(72vh - 50px)' }}>
        {aboutText ? (
          <div className="p-6">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #7c6cf0, #a855f7)' }}>
                O
              </div>
              <div>
                <h2 className="text-gui-text font-bold text-xl">obyead</h2>
                <p className="text-gui-text-secondary text-sm mt-0.5">Developer • Maker • Writer</p>
              </div>
            </div>
            <div className="text-gui-text-secondary text-sm leading-relaxed whitespace-pre-wrap">
              {aboutText.split('\n').slice(2).join('\n')}
            </div>
          </div>
        ) : projects ? (
          <div className="p-5 space-y-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gui-border bg-gui-card transition-all duration-200 hover:bg-gui-card-hover hover:border-gui-accent/30"
              >
                <h3 className="text-gui-text font-semibold text-base mb-1">{project.name}</h3>
                <p className="text-gui-text-secondary text-sm mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg"
                      style={{
                        background: 'rgba(124, 108, 240, 0.12)',
                        color: '#a596fd',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 pt-2 border-t border-gui-border">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gui-link text-sm font-medium hover:text-white transition-colors"
                  >
                    Live Demo →
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gui-text-secondary text-sm hover:text-gui-text transition-colors"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}