import { useState, useMemo } from 'react';
import { X, ExternalLink, ArrowLeft, ChevronRight, Search, File } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { useApp } from '../context/AppContext';

type FolderId = 'web' | 'games' | 'experiments';
type View = 'root' | FolderId | string;

const FOLDERS: { id: FolderId; name: string }[] = [
  { id: 'web', name: 'Web Apps' },
  { id: 'games', name: 'Games' },
  { id: 'experiments', name: 'Experiments' },
];

function folderOf(p: Project): FolderId {
  switch (p.id) {
    case 'crm-snowy':
    case 'pos-snowy':
    case 'local-pos-snowy':
    case 'fatink':
      return 'web';
    case 'terminal-13':
    case 'project-13':
    case 'super-swipe':
      return 'games';
    default:
      return 'experiments';
  }
}

const fileName = (p: Project) => p.id + '.project';

export default function ProjectsApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [view, setView] = useState<View>('root');
  const [history, setHistory] = useState<View[]>(['root']);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [liveId, setLiveId] = useState<string | null>(null);

  const liveProject = useMemo(() => projects.find(p => p.id === liveId) ?? null, [liveId]);
  const currentProject = useMemo(() => projects.find(p => p.id === view) ?? null, [view]);

  const back = () => {
    setSelected(null);
    setView(v => {
      const i = history.indexOf(v as never);
      const next = i > 0 ? history[i - 1] : 'root';
      setHistory(h => h.slice(0, i + 1));
      return next as View;
    });
  };

  const open = (target: View, trail: View[]) => {
    setView(target);
    setHistory(trail);
    setSelected(null);
  };

  const navigate = (target: View) => {
    open(target, [...history, view] as View[]);
  };

  const openFolder = (f: FolderId) => navigate(f);
  const openProject = (id: string) => {
    navigate(id);
    showToast(`Opened ${fileName(projects.find(p => p.id === id)!)}`, 'info');
  };

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (view === 'root') {
      return FOLDERS
        .filter(f => !q || f.name.toLowerCase().includes(q))
        .map(f => {
          const count = projects.filter(p => folderOf(p) === f.id).length;
          return { kind: 'folder' as const, id: f.id, name: f.name, sub: `${count} items` };
        });
    }
    if (currentProject) return [];
    return projects
      .filter(p => folderOf(p) === (view as FolderId))
      .filter(p => !q || p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))
      .map(p => ({
        kind: 'file' as const,
        id: p.id,
        name: fileName(p),
        sub: `${p.category === 'game' ? 'Game' : 'Web app'} · ${p.tech.length} technologies`,
        icon: p.category === 'game' ? '🎮' : '🌐',
      }));
  }, [view, query, currentProject]);

  const openExternal = (url?: string) => {
    if (url && url !== '#') { window.open(url, '_blank'); showToast('Opening...', 'info'); }
  };

  if (liveProject) {
    return <LiveView project={liveProject} onBack={() => setLiveId(null)} onClose={onClose} />;
  }

  if (currentProject) {
    return <ProjectDetail project={currentProject} onBack={back} onClose={onClose} openExternal={openExternal} onLive={() => setLiveId(currentProject.id)} />;
  }

  const crumbs: { label: string; target: View }[] = [{ label: 'Projects', target: 'root' }];
  if (view !== 'root') {
    const f = FOLDERS.find(x => x.id === view);
    if (f) crumbs.push({ label: f.name, target: f.id });
  }

  return (
    <div className="flex flex-col h-full bg-[#0b0b16]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
        <button
          onClick={back}
          disabled={view === 'root'}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          title="Back"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          disabled
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-600 opacity-40"
          title="Forward"
        >
          <ArrowLeft size={15} className="rotate-180" />
        </button>
        <div className="flex items-center gap-0.5 flex-1 min-w-0 px-2 h-8 rounded-md bg-white/[0.04] border border-white/5 overflow-hidden">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-0.5 min-w-0">
              {i > 0 && <ChevronRight size={12} className="text-gray-600 flex-shrink-0" />}
              <button
                onClick={() => i === crumbs.length - 1 ? undefined : navigate(c.target)}
                className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors truncate ${
                  i === crumbs.length - 1 ? 'text-gray-200' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {c.label}
              </button>
            </span>
          ))}
        </div>
        <div className="relative w-52">
          <input
            type="text"
            placeholder="Search this folder"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-8 pr-3 h-8 rounded-md bg-white/[0.04] border border-white/5 text-[11px] text-gray-300 placeholder:text-gray-600 focus:border-blood/40 focus:outline-none transition-colors"
          />
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-600" />
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-600" />
            </div>
            <p className="text-xs text-gray-500">No items match "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-2">
            {items.map(item => (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                onDoubleClick={() => item.kind === 'folder' ? openFolder(item.id as FolderId) : openProject(item.id)}
                className={`group flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                  selected === item.id
                    ? 'bg-blood/10 border-blood/30'
                    : 'border-transparent hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                {item.kind === 'folder' ? (
                  <span className="text-4xl drop-shadow-[0_4px_12px_rgba(251,191,36,0.25)]">📁</span>
                ) : (
                  <span className="flex items-center gap-1.5 text-2xl">
                    <span className="text-base">{item.icon}</span>
                    <File size={16} className="text-gray-400 -ml-1 mt-1" />
                  </span>
                )}
                <span
                  className={`text-[11px] text-center leading-tight break-all ${
                    selected === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}
                >
                  {item.name}
                </span>
                <span className="text-[9px] text-gray-600">{item.sub}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 h-7 border-t border-white/5 text-[10px] text-gray-600">
        <span>{items.length} item{items.length === 1 ? '' : 's'}</span>
        <span>Double-click to open</span>
      </div>
    </div>
  );
}

function LiveView({ project, onBack, onClose }: {
  project: Project;
  onBack: () => void;
  onClose: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const url = project.liveUrl || '';

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Browser bar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors"
          title="Back"
        >
          <ArrowLeft size={15} />
        </button>
        <div className="flex-1 flex items-center gap-2 px-3 h-8 rounded-md bg-white/[0.05] border border-white/10">
          <span className="text-gray-500 text-xs">🔒</span>
          <span className="text-[11px] text-gray-300 truncate">{url}</span>
        </div>
        <button
          onClick={() => window.open(url, '_blank')}
          className="flex items-center gap-1.5 px-3 h-8 rounded-md bg-white/[0.05] text-gray-400 text-[11px] hover:bg-white/10 transition-colors border border-white/10"
        >
          <ExternalLink size={11} /> New Tab
        </button>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all"
        >
          <X size={14} />
        </button>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative bg-white">
        {!loaded && !failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1e1e1e]">
            <div className="w-8 h-8 border-2 border-white/20 border-t-[#863bff] rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Loading {new URL(url).hostname}…</span>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#1e1e1e] p-8 text-center">
            <span className="text-3xl mb-2">⚠️</span>
            <h3 className="text-sm font-semibold text-gray-200">This site can't be embedded</h3>
            <p className="text-xs text-gray-500 max-w-sm">
              {new URL(url).hostname} blocks being displayed inside other pages (X-Frame-Options).
            </p>
            <button
              onClick={() => window.open(url, '_blank')}
              className="mt-2 flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#863bff] text-white text-xs font-medium hover:bg-[#954dff] transition-colors"
            >
              <ExternalLink size={12} /> Open in new tab
            </button>
          </div>
        )}
        <iframe
          src={url}
          title={project.name}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </div>

      {/* Status */}
      <div className="flex items-center justify-between px-4 h-6 border-t border-white/5 text-[10px] text-gray-600 shrink-0">
        <span>{loaded ? '✓ Connected' : 'Connecting…'}</span>
        <span>{project.name}</span>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onClose, openExternal, onLive }: {
  project: Project;
  onBack: () => void;
  onClose: () => void;
  openExternal: (url?: string) => void;
  onLive: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#0b0b16]">
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/5">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-md flex items-center justify-center text-gray-300 hover:bg-white/10 transition-colors"
          title="Back"
        >
          <ArrowLeft size={15} />
        </button>
        <span className="text-lg">{project.category === 'game' ? '🎮' : '🌐'}</span>
        <div className="min-w-0">
          <h2 className="text-xs font-semibold text-gray-200 truncate">{fileName(project)}</h2>
          <p className="text-[10px] text-gray-500 truncate">{project.name} — {project.shortDescription}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {project.liveUrl && (
            <button
              onClick={onLive}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#863bff]/15 text-[#c084fc] text-[11px] font-medium hover:bg-[#863bff]/25 transition-colors border border-[#863bff]/30"
            >
              <ExternalLink size={11} /> Open Live Site
            </button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <button
              onClick={() => openExternal(project.githubUrl)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 text-gray-400 text-[11px] hover:bg-white/10 transition-colors border border-white/10"
            >
              GitHub
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-48 bg-gradient-to-br from-[#14142a] via-[#0b0b16] to-[#1a0b10]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b16] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/40 border border-blood/20 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blood/10">
                <span className="text-3xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
              </div>
              <h1 className="text-xl font-bold text-white mb-2">{project.name}</h1>
              <p className="text-sm text-gray-400 max-w-md mx-auto px-6">{project.description}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 space-y-6 -mt-5 relative z-10">
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Overview</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.overview}</p>
          </section>
          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Problem</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.problem}</p>
            </section>
            <section>
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Solution</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.solution}</p>
            </section>
          </div>
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">My Role</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.role}</p>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10">{t}</span>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Key Features</h3>
            <div className="space-y-2">
              {project.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blood mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-400">{f}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Challenges</h3>
            <div className="space-y-2">
              {project.challenges.map((c, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-400">{c}</p>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">What I Learned</h3>
            <div className="space-y-2">
              {project.learnings.map((l, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 mt-2 flex-shrink-0" />
                  <p className="text-sm text-gray-400">{l}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
