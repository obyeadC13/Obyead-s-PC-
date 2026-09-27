import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { profile, experience } from '../data/cv';
import { projects } from '../data/projects';
import AsteroidGame from './AsteroidGame';
import SpaceBackground from './SpaceBackground';
import GlitchOverlay from './GlitchOverlay';

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
  projects    [▸] View all projects
  web         [▸] View web / freelance work
  client      [▸] View client work
  games       [▸] View game projects
  play        [▸] Play Asteroid Destroyer
  project <n> [▸] Full details for one project (name or #)
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

  const printProjects = (list: typeof projects, header: string) => {
    const out: string[] = [`  ${header}`, '  ' + DIVIDER];
    list.forEach((p: any, i: number) => {
      out.push(`  ▸ ${i + 1}. ${p.name}  [${p.year || '—'}]`);
      out.push(`    ${p.description}`);
      out.push(`    Role:    ${p.role}`);
      out.push(`    Tech:    ${p.tech.join(' │ ')}`);
      if (p.link) out.push(`    Live:    ${p.link}`);
      if (p.githubUrl && p.githubUrl !== 'https://github.com/OO13Sp') out.push(`    Code:    ${p.githubUrl}`);
      out.push('');
    });
    if (list.length === 0) out.push('  (none found)', '');
    return out;
  };

  const isClient = (id: string) => ['stratford-salon', 'fat-ink', 'odyssey'].includes(id);

  switch (trimmed) {
    case 'help':
      output.push(COMMANDS_BLOCK);
      break;
    case 'about':
      output.push('  ' + profile.name.toUpperCase() + ' // ' + profile.title.toUpperCase());
      output.push('  ' + DIVIDER);
      output.push('');
      output.push('  ' + profile.location);
      output.push('  ' + profile.email + '  |  ' + profile.phone);
      output.push('  ' + profile.website);
      output.push('  ' + profile.github + '  |  ' + profile.linkedin);
      output.push('');
      output.push('  CURRENT WORK');
      output.push('  ' + DIVIDER);
      output.push(...experience.slice(0, 2).map(x => `  ▸ ${x.role} — ${x.company} (${x.period})`));
      output.push('');
      break;
    case 'web':
        output.push(...printProjects(projects.filter(p => p.category === 'web' && !isClient(p.id)), '🌐 WEB & FREELANCE PROJECTS'));
        break;
      case 'client':
        output.push(...printProjects(projects.filter(p => isClient(p.id)), '🤝 CLIENT WORK'));
        break;
      case 'games':
        output.push(...printProjects(projects.filter(p => p.category === 'game'), '🎮 GAMES'));
        break;
      case 'projects':
        output.push(...printProjects(projects, '▓▓ ALL PROJECTS // SYSTEM OVERVIEW'));
        output.push('  ▸ Run "project <# or name>" for full details on one.');
        break;
      case 'project': {
        const arg = trimmed.split(/\s+/).slice(1).join(' ');
        if (!arg) {
          output.push('  usage: project <number or name>  (e.g. "project 3" or "project snowy")');
          output.push('');
          break;
        }
        let match = projects.find(p => p.name.toLowerCase().includes(arg.toLowerCase()));
        if (!match && /^\d+$/.test(arg)) match = projects[parseInt(arg, 10) - 1];
        if (!match) {
          output.push(`  ⚠ No project matching "${arg}"`);
          output.push('');
          break;
        }
        output.push('  ' + DIVIDER);
        output.push(`  ▸ ${match.name}  [${match.year || '—'}]`);
        output.push('  ' + DIVIDER);
        output.push(`  ${match.description}`);
        output.push('');
        output.push(`  Role:        ${match.role}`);
        output.push(`  Category:    ${match.category}${match.featured ? '  (featured ★)' : ''}`);
        output.push(`  Tech:        ${match.tech.join(' │ ')}`);
        if (match.link) output.push(`  Live:        ${match.link}`);
        if (match.githubUrl && match.githubUrl !== 'https://github.com/OO13Sp') output.push(`  Code:        ${match.githubUrl}`);
        output.push('');
        output.push('  OVERVIEW');
        output.push('  ' + match.overview);
        output.push('');
        output.push('  PROBLEM');
        output.push('  ' + match.problem);
        output.push('  SOLUTION');
        output.push('  ' + match.solution);
        output.push('');
        output.push('  KEY FEATURES');
        match.keyFeatures.forEach(f => output.push(`    · ${f}`));
        output.push('  CHALLENGES');
        match.challenges.forEach(f => output.push(`    · ${f}`));
        output.push('  LEARNINGS');
        match.learnings.forEach(f => output.push(`    · ${f}`));
        output.push('');
        break;
      }
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
        output.push('  ' + profile.name.toLowerCase() + ' // ' + profile.title.toLowerCase());
        output.push('  clearance: LEVEL-5');
        output.push('  status: ACTIVE');
        output.push('');
        break;
      case 'date':
        output.push('  ' + new Date().toString());
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
          <GlitchOverlay />
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
              {history.map((line: string, i: number) => (
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