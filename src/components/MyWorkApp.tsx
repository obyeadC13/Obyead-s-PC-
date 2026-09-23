import { useState } from 'react';
import { X, Gamepad2, BookOpen, Code, ChevronRight, Globe } from 'lucide-react';

interface ProjectItem {
  name: string;
  description: string;
  icon: React.ReactNode;
  tech: string;
  link?: string;
}

interface FolderData {
  name: string;
  icon: React.ReactNode;
  projects: ProjectItem[];
}

const folderData: Record<string, FolderData> = {
  games: {
    name: 'Games',
    icon: <Gamepad2 size={18} className="text-blood" />,
    projects: [
      { name: 'Terminal 13', description: 'Cyberpunk puzzle game', icon: <Gamepad2 size={20} className="text-blood" />, tech: 'Unity / C#' },
      { name: 'Void Runner', description: 'Space survival game', icon: <Gamepad2 size={20} className="text-blood" />, tech: 'Unreal Engine' },
      { name: 'Asteroid Blitz', description: 'Arcade space shooter', icon: <Gamepad2 size={20} className="text-blood" />, tech: 'JavaScript / Canvas' },
    ],
  },
  writing: {
    name: 'Writing',
    icon: <BookOpen size={18} className="text-blood" />,
    projects: [
      { name: 'Dark Horizons', description: 'Sci-fi novel in progress', icon: <BookOpen size={20} className="text-blood" />, tech: 'Creative Writing' },
      { name: 'The Last Signal', description: 'Short story collection', icon: <BookOpen size={20} className="text-blood" />, tech: 'Published' },
      { name: 'Blog Posts', description: 'Tech & gaming articles', icon: <BookOpen size={20} className="text-blood" />, tech: 'Medium / Dev.to' },
    ],
  },
  dev: {
    name: 'Dev',
    icon: <Code size={18} className="text-blood" />,
    projects: [
      { name: 'CRM Snowy', description: 'Custom CRM dashboard', icon: <Code size={20} className="text-blood" />, tech: 'React / Node.js' },
      { name: 'This Portfolio', description: 'OS-style portfolio site', icon: <Globe size={20} className="text-blood" />, tech: 'React / Vite / Tailwind' },
      { name: 'API Gateway', description: 'Microservices gateway', icon: <Code size={20} className="text-blood" />, tech: 'Go / gRPC' },
    ],
  },
};

export default function MyWorkApp({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('games');
  const current = folderData[activeTab] || folderData.games;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-3 py-2 border-b border-blood/10 bg-black/20">
        <span className="text-[11px] text-blood/70">My Work</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"><X size={14} /></button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar tabs */}
        <div className="w-32 border-r border-blood/10 bg-black/20 p-2 flex flex-col gap-1">
          {Object.entries(folderData).map(([key, folder]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left transition-colors ${activeTab === key ? 'bg-blood/10 border border-blood/20' : 'hover:bg-blood/5'}`}
            >
              {folder.icon}
              <span className="text-[11px] text-gray-300">{folder.name}</span>
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-sm text-blood mb-4 font-medium">{current.name}</h3>
          <div className="grid grid-cols-1 gap-3">
            {current.projects.map(project => (
              <div
                key={project.name}
                className="flex items-center gap-3 p-3 rounded-xl border border-blood/10 hover:border-blood/30 hover:bg-blood/5 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-lg bg-blood/10 flex items-center justify-center">
                  {project.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-white font-medium group-hover:text-blood transition-colors">{project.name}</p>
                  <p className="text-[10px] text-gray-500">{project.description}</p>
                  <p className="text-[9px] text-blood/50 mt-0.5">{project.tech}</p>
                </div>
                <ChevronRight size={14} className="text-gray-600 group-hover:text-blood transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}