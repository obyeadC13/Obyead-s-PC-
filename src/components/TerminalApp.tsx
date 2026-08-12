import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const DIVIDER = '─'.repeat(45);

export default function TerminalApp({ onClose, onLaunch }: { onClose: () => void; onLaunch: (id: string) => void }) {
  const [lines, setLines] = useState<string[]>([
    '',
    '  obyead-pc ~ Terminal v4.0',
    '  Type "help" for commands.',
    ''
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: string[] = [`> ${cmd}`, ''];

    if (trimmed === '') {
      setLines(prev => [...prev, '']);
      return;
    }

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmed === 'projects') { onLaunch('projects'); output.push('  ▸ Opening Projects ...'); setLines(prev => [...prev, ...output]); setInput(''); return; }
    if (trimmed === 'about') { onLaunch('about'); output.push('  ▸ Opening About ...'); setLines(prev => [...prev, ...output]); setInput(''); return; }
    if (trimmed === 'contact') { onLaunch('contact'); output.push('  ▸ Opening Contact ...'); setLines(prev => [...prev, ...output]); setInput(''); return; }
    if (trimmed === 'skills') { onLaunch('skills'); output.push('  ▸ Opening Skills ...'); setLines(prev => [...prev, ...output]); setInput(''); return; }
    if (trimmed === 'resume') { onLaunch('resume'); output.push('  ▸ Opening Resume ...'); setLines(prev => [...prev, ...output]); setInput(''); return; }

    switch (trimmed) {
      case 'help':
        output.push('  ▓▓▓ AVAILABLE COMMANDS ▓▓▓');
        output.push('  ' + DIVIDER);
        output.push('  projects    [▸] Open Projects window');
        output.push('  about       [▸] Open About window');
        output.push('  skills      [▸] Open Skills window');
        output.push('  contact     [▸] Open Contact window');
        output.push('  resume      [▸] Open Resume');
        output.push('  whoami      [▸] Current user info');
        output.push('  date        [▸] System time');
        output.push('  neofetch    [▸] System info');
        output.push('  clear       [▸] Clear terminal');
        output.push('  ' + DIVIDER);
        output.push('');
        break;
      case 'whoami':
        output.push('  obyead // developer, game maker, writer');
        output.push('  clearance: LEVEL-5');
        output.push('  status: ACTIVE');
        output.push('');
        break;
      case 'date':
        output.push(`  ${new Date().toString()}`);
        output.push('  UPTIME: SYSTEM NOMINAL');
        output.push('');
        break;
      case 'neofetch':
        output.push('       ┌───┐            obyead@obyead-pc');
        output.push('       │   │            ──────────────────');
        output.push('       │ ◉ │            OS: X+ OS v4.0');
        output.push('       │   │            Shell: xterm-256color');
        output.push('       │ ◉ │            Resolution: ' + window.innerWidth + 'x' + window.innerHeight);
        output.push('       └───┘            Window Manager: X+ Desktop');
        output.push('                         Terminal: X+ Terminal');
        output.push('                         CPU: Neural Core 4x @ 4.2GHz');
        output.push('                         Memory: 32GB DDR5 ECC');
        output.push('');
        break;
      case 'clear':
        setLines(['']);
        setInput('');
        return;
      default:
        output.push(`  ⚠ Command not found: ${cmd}`);
        output.push('  ▸ Type "help" for available commands.');
        output.push('');
    }

    setLines(prev => [...prev, ...output]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex < cmdHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      className="flex flex-col h-full font-mono cursor-text"
      style={{ background: '#0a0a1a', color: '#4da6ff' }}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10"
        style={{ background: '#0a0a1a' }}>
        <span className="text-[11px]">Terminal v4.0</span>
        <button onClick={onClose} className="w-6 h-6 rounded-md flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 text-xs">
        {lines.map((line: string, i: number) => (
          <pre key={i} className="whitespace-pre-wrap leading-relaxed">
            {line}
          </pre>
        ))}
        <div ref={scrollRef} />
        <div className="h-2" />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-white/10 px-3 py-2 flex items-center gap-2"
        style={{ background: '#0a0a1a' }}>
        <span className="text-[11px] font-medium shrink-0">obyead@obyead-pc:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white text-[12px] caret-[#4da6ff] font-mono"
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}