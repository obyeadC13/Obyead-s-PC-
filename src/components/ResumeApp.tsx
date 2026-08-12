import { X, Download, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ResumeApp({ onClose }: { onClose: () => void }) {
  const { showToast } = useApp();

  const handleDownload = () => {
    showToast('Resume download started', 'success');
  };

  const handleView = () => {
    showToast('Opening resume viewer...', 'info');
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a14]">
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blood/20 to-red-950/30 border border-blood/20 flex items-center justify-center">
            <span className="text-sm">📄</span>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-200">Resume.pdf</h2>
            <p className="text-[10px] text-gray-500">obyead's resume</p>
          </div>
        </div>
        <button onClick={onClose} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/20 transition-all">
          <X size={16} />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blood/10 to-red-950/20 border border-blood/20 flex items-center justify-center mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-200 mb-2">obyead_resume.pdf</h3>
        <p className="text-sm text-gray-500 mb-6 max-w-xs">
          Full-stack developer, game creator, and writer. Last updated Aug 2026.
        </p>
        <div className="flex items-center gap-3">
          <button onClick={handleView}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blood/10 text-blood text-sm font-medium hover:bg-blood/20 transition-colors border border-blood/20">
            <Eye size={14} /> View
          </button>
          <button onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 text-gray-300 text-sm font-medium hover:bg-white/10 transition-colors border border-white/10">
            <Download size={14} /> Download
          </button>
        </div>
      </div>
    </div>
  );
}