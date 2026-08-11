import { useState, useRef, useCallback } from 'react';
import { X, ExternalLink, ArrowLeft, ArrowRight, RotateCcw, Plus, Search, Lock, AlertTriangle } from 'lucide-react';

interface Tab {
  id: string;
  title: string;
  url: string;
  icon: string;
  loading: boolean;
  history: string[];
  historyIndex: number;
  blocked: boolean;
}

const initialTabs: Tab[] = [
  { id: '1', title: 'Home', url: '', icon: '🏠', loading: false, history: [], historyIndex: -1, blocked: false },
];

export default function BrowserApp({ onClose }: { onClose: () => void }) {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState('1');
  const [urlInput, setUrlInput] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);
  const iframeRefs = useRef<Record<string, HTMLIFrameElement | null>>({});
  const activeTab = tabs.find(t => t.id === activeTabId)!;

  const updateTab = useCallback((id: string, updates: Partial<Tab>) => {
    setTabs(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const navigateTo = (input: string, tabId?: string) => {
    const targetId = tabId || activeTabId;
    let url = input.trim();
    if (!url) return;
    if (!url.startsWith('http')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = url.startsWith('://') ? 'https:' + url : 'https://' + url;
      } else {
        url = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent(url);
      }
    }
    const target = tabs.find(t => t.id === targetId)!;
    const history = [...target.history.slice(0, target.historyIndex + 1), url];
    const hostname = (() => {
      try { return new URL(url).hostname.replace('www.', '').replace('html.duckduckgo.com', 'Search') || 'Page'; }
      catch { return url; }
    })();
    updateTab(targetId, { url, loading: true, blocked: false, title: hostname, history, historyIndex: history.length - 1 });
    setUrlInput(url);
    setSearchFocus(false);
  };

  const goBack = () => {
    if (activeTab.historyIndex > 0) {
      const idx = activeTab.historyIndex - 1;
      const url = activeTab.history[idx];
      try { updateTab(activeTabId, { url, historyIndex: idx, title: new URL(url).hostname.replace('www.', ''), blocked: false }); } catch {}
      setUrlInput(url);
    }
  };

  const goForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const idx = activeTab.historyIndex + 1;
      const url = activeTab.history[idx];
      try { updateTab(activeTabId, { url, historyIndex: idx, title: new URL(url).hostname.replace('www.', ''), blocked: false }); } catch {}
      setUrlInput(url);
    }
  };

  const refresh = () => {
    const el = iframeRefs.current[activeTabId];
    if (el && activeTab.url) { el.src = activeTab.url; }
  };

  const addTab = () => {
    const id = Date.now().toString();
    setTabs(prev => [...prev, { id, title: 'New Tab', url: '', icon: '📄', loading: false, history: [], historyIndex: -1, blocked: false }]);
    setActiveTabId(id);
    setUrlInput('');
  };

  const closeTab = (id: string) => {
    if (tabs.length === 1) return;
    const next = tabs.filter(t => t.id !== id);
    setTabs(next);
    if (activeTabId === id) { setActiveTabId(next[next.length - 1].id); }
  };

  const handleIframeError = () => {
    updateTab(activeTabId, { blocked: true, loading: false });
  };

  return (
    <div className="flex flex-col h-full bg-black/10">
      <div className="flex items-end gap-0.5 px-2 pt-1 bg-black/20 border-b border-red-900/10">
        {tabs.map(tab => (
          <div key={tab.id}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-t-lg text-[11px] cursor-pointer transition-colors group ${tab.id === activeTabId ? 'bg-white/5 text-gray-300 border-t border-x border-red-900/20' : 'text-gray-600 hover:text-gray-400 hover:bg-white/5'}`}
            onClick={() => { setActiveTabId(tab.id); setUrlInput(tab.url); }}>
            <span className="text-xs">{tab.loading ? '⏳' : tab.blocked ? '⚠️' : '📄'}</span>
            <span className="max-w-[100px] truncate">{tab.title}</span>
            {tabs.length > 1 && (
              <button onClick={e => { e.stopPropagation(); closeTab(tab.id); }} className="ml-1 w-4 h-4 rounded flex items-center justify-center hover:bg-red-950/40 opacity-0 group-hover:opacity-100 transition-opacity"><X size={10} /></button>
            )}
          </div>
        ))}
        <button onClick={addTab} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-blood hover:bg-red-950/30 transition-colors mb-0.5"><Plus size={12} /></button>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-colors ml-auto mb-0.5"><X size={14} /></button>
      </div>

      <div className="flex items-center gap-1.5 px-2 py-2 border-b border-red-900/10 bg-black/15">
        <button onClick={goBack} disabled={activeTab.historyIndex <= 0} className="p-1.5 rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/5 disabled:opacity-30 transition-colors"><ArrowLeft size={14} /></button>
        <button onClick={goForward} disabled={activeTab.historyIndex >= activeTab.history.length - 1} className="p-1.5 rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/5 disabled:opacity-30 transition-colors"><ArrowRight size={14} /></button>
        <button onClick={refresh} className="p-1.5 rounded-md text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-colors"><RotateCcw size={14} /></button>
        <form onSubmit={e => { e.preventDefault(); if (urlInput.trim()) navigateTo(urlInput.trim()); }} className="flex-1 flex items-center gap-1.5">
          <div className={`flex-1 flex items-center bg-black/20 rounded-lg px-2.5 py-1.5 border transition-colors ${searchFocus ? 'border-blood/50' : 'border-red-900/15'}`}>
            {activeTab.url ? <Lock size={11} className="text-green-500/50 mr-1.5 shrink-0" /> : <Search size={11} className="text-gray-600 mr-1.5 shrink-0" />}
            <input
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setTimeout(() => setSearchFocus(false), 200)}
              placeholder="Search or enter URL..."
              className="flex-1 bg-transparent text-xs text-gray-300 outline-none placeholder:text-gray-600"
            />
            {urlInput && <button type="button" onClick={() => setUrlInput('')} className="p-0.5 rounded text-gray-600 hover:text-gray-400 transition-colors"><X size={10} /></button>}
          </div>
        </form>
        {activeTab.url && !activeTab.blocked && (
          <a href={activeTab.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-md text-gray-500 hover:text-blood hover:bg-red-950/20 transition-colors" title="Open in new tab"><ExternalLink size={13} /></a>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden bg-transparent">
        {!activeTab.url ? (
          <div className="h-full flex flex-col items-center justify-center p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blood/15 to-red-950/30 border border-red-900/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(220,38,38,0.1)]">
              <Search size={28} className="text-blood/60" />
            </div>
            <h3 className="text-sm font-semibold text-gray-300 mb-1">X+ Browser</h3>
            <p className="text-[11px] text-gray-500 mb-5 text-center max-w-xs">Search the web or enter a URL to browse</p>
            <div className="flex gap-3">
              {[{ name: 'Terminal 13', url: 'https://terminal13.vercel.app', icon: '🎮' }, { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '📚' }, { name: 'Reddit', url: 'https://old.reddit.com', icon: '🤖' }, { name: 'DuckDuckGo', url: 'https://html.duckduckgo.com/html/', icon: '🦆' }].map(site => (
                <button key={site.name} onClick={() => navigateTo(site.url)} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-red-900/15 hover:border-blood/30 hover:bg-red-950/10 transition-all w-16">
                  <span className="text-lg">{site.icon}</span>
                  <span className="text-[9px] text-gray-500">{site.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : activeTab.blocked ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-yellow-950/20 border border-yellow-900/30 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-yellow-500/70" />
            </div>
            <h3 className="text-sm font-semibold text-gray-300 mb-1">Site Blocked</h3>
            <p className="text-[11px] text-gray-500 mb-4 max-w-xs">This website doesn't allow being shown inside the browser. Open it externally instead.</p>
            <a href={activeTab.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-blood/80 text-white hover:bg-crimson transition-colors">
              <ExternalLink size={12} /> Open in New Tab
            </a>
          </div>
        ) : (
          <iframe
            ref={el => { iframeRefs.current[activeTabId] = el; }}
            src={activeTab.url}
            className="w-full h-full border-0"
            onLoad={() => {
              setTimeout(() => { updateTab(activeTabId, { loading: false }); }, 500);
            }}
            onError={handleIframeError}
            title={activeTab.title}
          />
        )}
        {activeTab.loading && (
          <div className="absolute top-0 inset-x-0 h-0.5 bg-red-950/30 overflow-hidden z-10">
            <div className="h-full w-1/3 bg-blood shadow-[0_0_10px_rgba(220,38,38,0.5)] animate-loading" />
          </div>
        )}
      </div>
    </div>
  );
}