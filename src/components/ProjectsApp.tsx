import { useState, useMemo, useCallback } from 'react';
import { X, ExternalLink, ChevronRight, ArrowLeft, Star, Code2 } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { useApp } from '../context/AppContext';

export default function ProjectsApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'web' | 'game'>('all');

  const selected = useMemo(() => projects.find(p => p.id === selectedId) || null, [selectedId]);

  const featured = useMemo(() =>
    projects.filter(p => p.featured && (filter === 'all' || p.category === filter) &&
      (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))),
  [filter, searchQuery]);

  const others = useMemo(() =>
    projects.filter(p => !p.featured && (filter === 'all' || p.category === filter) &&
      (!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       p.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))),
  [filter, searchQuery]);

  const openExternal = useCallback((url: string) => {
    if (url && url !== '#') { window.open(url, '_blank'); showToast('Opening...', 'info'); }
  }, [showToast]);

  if (selected) return <ProjectDetail project={selected} onBack={() => setSelectedId(null)} onClose={onClose} />;

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <Star size={14} className="text-blood" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Projects</h2>
            <p className="text-[10px] text-gray-500">{projects.length} projects</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>

      <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3">
        <div className="flex-1 relative">
          <input type="text" placeholder="Search projects..." value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 placeholder:text-gray-600 focus:border-blood/50 focus:outline-none transition-colors" />
          <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
          {(['all', 'web', 'game'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filter === f ? 'bg-blood/20 text-blood border border-blood/30' : 'text-gray-500 hover:text-gray-300'}`}>
              {f === 'all' ? 'All' : f === 'web' ? 'Web' : 'Games'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {featured.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Featured Projects</h3>
            <div className="grid grid-cols-1 gap-4">
              {featured.map(p => (
                <FeaturedCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} onOpen={openExternal} />
              ))}
            </div>
          </section>
        )}
        {others.length > 0 && (
          <section>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">More Projects</h3>
            <div className="grid grid-cols-2 gap-3">
              {others.map(p => (
                <CompactCard key={p.id} project={p} onClick={() => setSelectedId(p.id)} onOpen={openExternal} />
              ))}
            </div>
          </section>
        )}
        {featured.length === 0 && others.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">No projects found</h3>
            <p className="text-xs text-gray-600">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}

function FeaturedCard({ project, onClick, onOpen }: { project: Project; onClick: () => void; onOpen: (url: string) => void }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.02] hover:border-blood/30 hover:bg-white/[0.04] transition-all cursor-pointer overflow-hidden" onClick={onClick}>
      <div className="relative h-44 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform">
              <span className="text-2xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-200 group-hover:text-white transition-colors">{project.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{project.shortDescription}</p>
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 rounded-full bg-blood/20 text-blood text-[10px] font-medium border border-blood/30">Featured</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-400 leading-relaxed mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map(t => (
            <span key={t} className="px-2 py-1 rounded-md bg-white/5 text-xs text-gray-500 border border-white/10">{t}</span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={(e) => { e.stopPropagation(); onClick(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blood/10 text-blood text-xs font-medium hover:bg-blood/20 transition-colors border border-blood/20">
            View Details <ChevronRight size={12} />
          </button>
          {project.liveUrl && project.liveUrl !== '#' && (
            <button onClick={(e) => { e.stopPropagation(); onOpen(project.liveUrl!); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10 transition-colors border border-white/10">
              <ExternalLink size={12} /> Live Demo
            </button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <button onClick={(e) => { e.stopPropagation(); onOpen(project.githubUrl!); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10 transition-colors border border-white/10">
              <Code2 size={12} /> GitHub
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CompactCard({ project, onClick, onOpen }: { project: Project; onClick: () => void; onOpen: (url: string) => void }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-white/[0.02] hover:border-blood/30 hover:bg-white/[0.04] transition-all cursor-pointer p-4" onClick={onClick}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blood/10 to-red-950/20 border border-blood/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
          <span className="text-lg">{project.category === 'game' ? '🎮' : '🌐'}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors truncate">{project.name}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{project.shortDescription}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tech.slice(0, 3).map(t => (
          <span key={t} className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-500">{t}</span>
        ))}
        {project.tech.length > 3 && <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] text-gray-600">+{project.tech.length - 3}</span>}
      </div>
      <div className="flex items-center gap-2">
        <button onClick={(e) => { e.stopPropagation(); onClick(); }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-blood transition-colors">
          Details <ChevronRight size={12} />
        </button>
        {project.liveUrl && project.liveUrl !== '#' && (
          <button onClick={(e) => { e.stopPropagation(); onOpen(project.liveUrl!); }} className="flex items-center gap-1 text-xs text-gray-500 hover:text-blood transition-colors">
            <ExternalLink size={11} /> Live
          </button>
        )}
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
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blood/10 text-blood text-xs font-medium hover:bg-blood/20 transition-colors border border-blood/20">
              <ExternalLink size={12} /> Live
            </button>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <button onClick={() => openExternal(project.githubUrl!)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:bg-white/10 transition-colors border border-white/10">
              <Code2 size={12} /> GitHub
            </button>
          )}
          <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="relative h-52 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blood/10">
                <span className="text-3xl">{project.category === 'game' ? '🎮' : '🌐'}</span>
              </div>
              <h1 className="text-xl font-bold text-white mb-2">{project.name}</h1>
              <p className="text-sm text-gray-400 max-w-md mx-auto px-6">{project.description}</p>
            </div>
          </div>
        </div>
        <div className="px-6 py-6 space-y-6 -mt-6 relative z-10">
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Overview</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.overview}</p>
          </section>
          <div className="grid grid-cols-2 gap-6">
            <section>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Problem</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.problem}</p>
            </section>
            <section>
              <h3 className="text-sm font-semibold text-gray-300 mb-2">Solution</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{project.solution}</p>
            </section>
          </div>
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">My Role</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{project.role}</p>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-gray-300 border border-white/10">{t}</span>
              ))}
            </div>
          </section>
          <section>
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Key Features</h3>
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
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Challenges</h3>
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
            <h3 className="text-sm font-semibold text-gray-300 mb-2">What I Learned</h3>
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