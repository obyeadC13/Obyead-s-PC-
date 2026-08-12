import { useState, useMemo, useCallback } from 'react';
import { X, ExternalLink, ArrowLeft, Code2, ChevronRight, Calendar, FolderOpen, Star } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function ProjectsApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'web' | 'game'>('all');

  const selected = useMemo(() => projects.find(p => p.id === selectedId) || null, [selectedId]);

  const filtered = useMemo(() =>
    filter === 'all' ? projects : projects.filter(p => p.category === filter),
  [filter]);

  const featured = useMemo(() => filtered.filter(p => p.featured), [filtered]);
  const others = useMemo(() => filtered.filter(p => !p.featured), [filtered]);

  const openExternal = useCallback((url: string) => {
    if (url && url !== '#') { window.open(url, '_blank'); showToast('Opening...', 'info'); }
  }, [showToast]);

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} onClose={onClose} />;

  return (
    <div className="flex flex-col h-full bg-[#0a0a14] overflow-hidden">
      {/* Header - Drake/Jayden Style */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm">📁</span>
          <h2 className="text-sm font-semibold text-gray-200">Selected Work</h2>
          <span className="text-xs text-gray-600 ml-1">{filtered.length} projects</span>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="px-6 py-3 border-b border-white/5 flex items-center gap-2 shrink-0">
        {(['all', 'web', 'game'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f
                ? 'bg-blood/15 text-blood border border-blood/30 shadow-sm shadow-blood/10'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5 border border-transparent'
            }`}>
            {f === 'all' ? 'All' : f === 'web' ? 'Web' : 'Games'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Featured - Large Cards (Drake Style) */}
        {featured.length > 0 && (
          <div className="px-6 pt-6 pb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Star size={12} className="text-blood" /> Featured Projects
            </h3>
            <div className="space-y-4">
              {featured.map(p => (
                <FeaturedCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} onOpen={openExternal} />
              ))}
            </div>
          </div>
        )}

        {/* More Projects - Compact Grid */}
        {others.length > 0 && (
          <div className="px-6 pt-6 pb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FolderOpen size={12} className="text-gray-500" /> More Projects
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {others.map(p => (
                <CompactCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} onOpen={openExternal} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ project, onClick }: { project: Project; onClick: () => void; onOpen: (url: string) => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative rounded-2xl border border-white/8 hover:border-blood/20 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blood/5 bg-white/[0.015] hover:bg-white/[0.03]"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image Area */}
        <div className="relative md:w-72 h-44 md:h-auto bg-gradient-to-br from-gray-900 to-gray-800 shrink-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blood/5 to-red-950/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blood/10">
              <span className="text-3xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
            </div>
          </div>
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full bg-blood/20 text-blood text-[10px] font-semibold border border-blood/30 uppercase tracking-wider">
              {project.category === 'game' ? 'Game' : 'Web'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold text-gray-100 group-hover:text-white transition-colors">{project.name}</h3>
            {project.featured && <Star size={14} className="text-blood" />}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-3">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 5).map(t => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-gray-400 border border-white/5">
                {t}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={12} /> 2024
            </span>
            <button onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="flex items-center gap-1.5 text-sm text-blood font-medium hover:opacity-80 transition-opacity">
              View Details <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompactCard({ project, onClick }: { project: Project; onClick: () => void; onOpen: (url: string) => void }) {
  return (
    <div
      onClick={onClick}
      className="group rounded-xl border border-white/8 hover:border-blood/20 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blood/5 bg-white/[0.015] hover:bg-white/[0.03]"
    >
      <div className="h-28 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blood/5 to-red-950/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blood/15 to-red-950/25 border border-blood/15 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors mb-1">{project.name}</h4>
        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 3).map(t => (
            <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-500">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack, onClose }: { project: Project; onBack: () => void; onClose: () => void }) {
  const { showToast } = useApp();
  const openExternal = useCallback((url: string) => {
    if (url && url !== '#') { window.open(url, '_blank'); showToast('Opening...', 'info'); }
  }, [showToast]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a14] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all">
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">{project.name}</h2>
            <p className="text-[10px] text-gray-500">{project.shortDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {project.liveUrl && project.liveUrl !== '#' && (
            <button onClick={() => openExternal(project.liveUrl!)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blood text-white text-xs font-medium hover:bg-red-600 transition-all shadow-sm shadow-blood/20">
              <ExternalLink size={12} /> Live Demo
            </button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <button onClick={() => openExternal(project.githubUrl!)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/10 text-xs font-medium text-gray-300 hover:bg-white/5 transition-all">
              <Code2 size={12} /> GitHub
            </button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="relative h-48 bg-gradient-to-br from-gray-900 via-red-950/10 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blood/25 to-red-950/40 border border-blood/25 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blood/15">
                <span className="text-4xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">{project.name}</h1>
              <p className="text-sm text-gray-400 max-w-sm mx-auto px-6">{project.description}</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-6 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
              {project.category === 'game' ? '🎮 Game Development' : '🌐 Web Development'}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10">
              2024
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Overview</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.overview}</p>
          </section>

          <div className="grid grid-cols-2 gap-6">
            <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xs font-semibold text-blood uppercase tracking-wider mb-2">Problem</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.problem}</p>
            </section>
            <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-xs font-semibold text-green-400/70 uppercase tracking-wider mb-2">Solution</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.solution}</p>
            </section>
          </div>

          <section className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Role</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.role}</p>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10 font-medium">{t}</span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Key Features</h3>
            <div className="grid grid-cols-2 gap-2">
              {project.keyFeatures.map((f, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blood mt-2 shrink-0" />
                  <p className="text-sm text-gray-400">{f}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Challenges & Learnings</h3>
            <div className="space-y-2">
              {project.challenges.map((c, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-yellow-950/10 border border-yellow-900/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 mt-2 shrink-0" />
                  <p className="text-sm text-gray-400">{c}</p>
                </div>
              ))}
              {project.learnings.map((l, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-green-950/10 border border-green-900/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/60 mt-2 shrink-0" />
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