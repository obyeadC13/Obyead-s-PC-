import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { aboutMe } from '../data/projects';
import { projects } from '../data/projects';
import AsteroidGame from './AsteroidGame';
import SpaceBackground from './SpaceBackground';

const WELCOME_ART = `.                                                                                                                   
                                                                +-                                                                                                                  
                                                             =-*%-                                                                                                                  
                                                             =-*@*::                                               .                                                                
                                                             ++#@#+-                                                -%.                                                             
                                                             +%@@@*-                       .-  :               :  . +. :                                                            
                                                             -%@@@%=                       =+-                    -*-:.+.                                                           
                                                             .%@@@%+                      .#%*+ :              : .**+%%=                                                            
                                                              *@@@%*                      :-###%-+.           ..:*@%#@%=                                                            
                                                              +@@@#*                       :%####++           :.:@@@@%%                                                             
                                                              %@@@@%                        +##@@@*=          + ##@@%%.                                                             
                                                              %@@@@%                        -%##@@#%.        =-#@@@#+:                                                              
                                                              %@@@@%                         -@%#@@@#       .*#@@@@+.                                                               
                                                              %@@@@#                          *%*@@@@#    . +@@##@+                                                                 
                                                             .%@@@##                          =#*#@@@@%  . =#@@###.                                                                 
                                                              #@@@#%                           %#*#@@@@%. +#@@#@@=                                                                  
                                                     .:      -@@@@@*                            +@*@@@@@++#@@@@@*                                                                   
                                                    .---=-:..=@@@@@%*%*+==--=..                  =##@@@@@@@@@@#%:                                                                   
                                                  .--%#@###@@@@@@@@@@@@#%%*%##@#:                .*##@@@@@@@@#*-                                                                    
                                                 .-%#@@@@@@@@@@@@@@@@@@@#@###@@@@                 +#@@@@@@@@#=-.                                                                    
                                                  :+*#@@@@@@@@@@@@@@@@@@@@@#@@@@@%                 %@@@@@@@@%-                                                                      
                                                  -+%%#@@@@@@@@@@@@@@@@@@##@@@@@@@                 +@@@@@@@%@*                                                                      
                                                     -=*#####@@@@@@@@@@%*%####@@@@                =*@@@@@@@@%+:                                                                     
                                                    .-=+*#%%*#@@@@@@%*+%###@##@@@@               :*#@@@@@@@@*%=-                                                                    
                                                             *#@@@@@=. -@@@@@@@@@@:              +%@@@@@@%@@@=+--                                                                   
                                                             -%@@@@%    -@@@@@@@@+              =*#@@@#+%@%@@#=++-                                                                  
                                                             =#@@@#%     *@@@@@@%             .-+##@@@= +%##@@%-#+.                                                                 
                                                             =#@@@@@.     %@@@@*             =@%###@#+  - +@#@@#=#=                                                                 
                                                             :#@@#@@.      #@@#             :@@#@@@@# :.   -@@@#*%#.                                                                
                                                             .%@@@@#.      :@@.            -@@@@@@@#=+-     .##@#%%%                                                                
                                                             .%@@@@%        .             +@@@@@@@@%**        %@#@+%-                                                               
                                                             .%@@@@+                      @@@@@@@@##*          @###-:                                                               
                                                             .#@@@%:                     -@@@@@@@@@%           =##*-.-.                                                             
                                                             :#@@#*.                    :#@@@@@@@@@             :*%- --                                                             
                                                             -%#@%+.                     @@@@@@@@@:              -+. ..                                                             
                                                             -++#==                      #@@@@@@@%                :::                                                               
                                                              ==#*+                      =@@@@@@@:                                                                                  
                                                              . * .       .-:..           %@@@@@%                                                                                   
                                                                =        :+#@#@%:         -@@@@%+                                                                                   
                                                                .        =%@@@@#=          +@@@%`;

const COMMANDS_BLOCK = `
  ▓▓▓ AVAILABLE COMMANDS ▓▓▓
  ─────────────────────────────────────────

  about       [▸] Who am I?
  web         [▸] View web development projects
  games       [▸] View game development projects
  writing     [▸] View writing portfolio
  projects    [▸] List all projects
  play        [▸] Play Asteroid Destroyer
  clear       [▸] Clear terminal
  reboot      [▸] Switch to GUI mode
`;

const WELCOME_TEXT = `
  Welcome to Obyead's Portfolio
  Type "help" to explore or "start" to begin
`;

const DIVIDER = '─'.repeat(55);

export default function TerminalMode() {
  const { switchMode } = useApp();
  const [history, setHistory] = useState<string[]>([]);
  const [showWelcome] = useState(true);
  const [playingGame, setPlayingGame] = useState(false);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  const handleClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output: string[] = [`> ${cmd}`, ''];

    if (trimmed === '') {
      setHistory(prev => [...prev, '']);
      return;
    }

    setCmdHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    switch (trimmed) {
      case 'help':
        output.push(COMMANDS_BLOCK);
        break;
      case 'about':
        output.push('  OBYEAD // SYSOP');
        output.push('  ' + DIVIDER);
        output.push('');
        output.push(...aboutMe.split('\n').map(line => `  ${line}`));
        output.push('');
        break;
      case 'web':
      case 'games':
      case 'writing':
        const cat = projects[trimmed as keyof typeof projects];
        if (cat) {
          output.push(`  ${cat.icon} ${cat.title.toUpperCase()}`);
          output.push('  ' + DIVIDER);
          cat.projects.forEach((p, i) => {
            output.push(`  ▸ ${i + 1}. ${p.name}`);
            output.push(`    ${p.description}`);
            output.push(`    └─ [ ${p.tech.join(' │ ')} ]`);
            output.push('');
          });
        }
        break;
      case 'projects':
        output.push('  ALL PROJECTS // SYSTEM OVERVIEW');
        output.push('  ' + DIVIDER);
        Object.entries(projects).forEach(([_key, c]) => {
          output.push(`  ${c.icon} ${c.title} (${c.projects.length})`);
          c.projects.forEach(p => { output.push(`    └─▸ ${p.name}`); });
          output.push('');
        });
        output.push('');
        break;
      case 'play':
        setPlayingGame(true);
        setHistory(['']);
        break;
      case 'clear':
        setHistory(['']);
        return;
      case 'reboot':
        output.push('  > INITIATING BOOT SEQUENCE ...');
        output.push('  > Switching to GUI Mode ...');
        setTimeout(() => switchMode(), 1000);
        break;
      case 'whoami':
        output.push('  ⚠ Use "about" instead.');
        output.push('');
        break;
      case 'date':
        output.push('  ⚠ Date: ' + new Date().toString());
        output.push('');
        break;
      case 'start':
        output.push('  ⚠ Use "help" to explore.');
        output.push('');
        break;
      default:
        output.push(`  ⚠ Command not found: ${cmd}`);
        output.push('  ▸ Type "help" for available commands.');
        output.push('');
    }

    setHistory(prev => [...prev, ...output, '']);
  }, [switchMode]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput('');
  }, [input, processCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
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
  }, [cmdHistory, historyIndex]);

  return (
    <div
      className="h-screen w-screen flex flex-col font-mono"
      style={{ background: '#0a0a1a', color: '#4da6ff' }}
      onClick={handleClick}
    >
      {playingGame ? (
        <AsteroidGame onExit={() => setPlayingGame(false)} />
      ) : (
        <>
          <SpaceBackground />
          <div className="relative z-10 flex flex-col h-screen w-screen">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
              {showWelcome && (
                <div className="flex flex-col min-h-screen justify-between pb-8">
                  <div className="flex-1 flex items-center justify-center">
                    <pre className="text-[10px] md:text-[13px] leading-none">
                      {WELCOME_ART}
                    </pre>
                  </div>
                  <div className="flex justify-center mt-4 mb-4">
                    <pre className="text-sm">{WELCOME_TEXT}</pre>
                  </div>
                  <div className="flex items-start pl-4">
                    <pre className="text-sm">{COMMANDS_BLOCK}</pre>
                  </div>
                </div>
              )}
              {history.map((line, i) => (
                <pre key={i} className="whitespace-pre-wrap leading-relaxed text-sm">
                  {line}
                </pre>
              ))}
              <div className="h-4" />
            </div>

            <div className="border-t border-white/10 p-3" style={{ background: 'rgba(10,10,26,0.9)' }}>
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <span className="shrink-0 text-sm font-medium">obyead@obyead-pc:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white text-sm caret-[#4da6ff]"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>

            <button
              onClick={switchMode}
              className="absolute top-3 right-4 px-3 py-1.5 text-[10px] border border-white/10 hover:border-white/30 transition-all font-mono tracking-wider z-50"
              style={{ background: 'rgba(10,10,26,0.8)', borderRadius: '6px' }}
            >
              ◉ GUI MODE
            </button>
          </div>
        </>
      )}
    </div>
  );
}