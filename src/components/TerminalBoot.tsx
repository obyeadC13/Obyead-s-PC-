import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BOOT_LINES = [
  { text: '╔══════════════════════════════════════════════════╗', type: 'header' },
  { text: '║     OBYEAD SYSTEM // TERMINAL ENVIRONMENT       ║', type: 'header' },
  { text: '╚══════════════════════════════════════════════════╝', type: 'header' },
  { text: '', type: 'normal' },
  { text: '[KERNEL] Loading kernel modules...', type: 'system' },
  { text: '  [✓] Core subsystem initialized', type: 'success' },
  { text: '  [✓] Memory manager online (32GB DDR5 ECC)', type: 'success' },
  { text: '  [✓] CPU scheduler: Neural Core 4x @ 4.2GHz', type: 'success' },
  { text: '  [✓] I/O subsystem active', type: 'success' },
  { text: '', type: 'normal' },
  { text: '[NETWORK] Initializing network stack...', type: 'system' },
  { text: '  [✓] ETH0 configured: 10.255.255.254', type: 'success' },
  { text: '  [✓] DNS resolver online', type: 'success' },
  { text: '  [✓] Firewall rules loaded (42 rules)', type: 'success' },
  { text: '', type: 'normal' },
  { text: '[STORAGE] Mounting filesystems...', type: 'system' },
  { text: '  [✓] /dev/nvme0n1p1 → / (ext4, 1TB)', type: 'success' },
  { text: '  [✓] /dev/nvme0n1p2 → /home (ext4, 500GB)', type: 'success' },
  { text: '  [✓] Swap partition active', type: 'success' },
  { text: '', type: 'normal' },
  { text: '[SERVICES] Starting background services...', type: 'system' },
  { text: '  [✓] SSH daemon (port 22)', type: 'success' },
  { text: '  [✓] Web server (port 5173)', type: 'success' },
  { text: '  [✓] Terminal service online', type: 'success' },
  { text: '  [✓] Process monitor active', type: 'success' },
  { text: '', type: 'normal' },
  { text: '[SECURITY] Running integrity checks...', type: 'system' },
  { text: '  [✓] Rootkit scan: clean', type: 'success' },
  { text: '  [✓] Permission audit: passed', type: 'success' },
  { text: '  [✓] Encrypted keychain unlocked', type: 'success' },
  { text: '', type: 'normal' },
  { text: '═══════════════════════════════════════════════════', type: 'divider' },
  { text: '> TERMINAL ENVIRONMENT READY', type: 'prompt' },
  { text: '> Initializing user session...', type: 'prompt' },
  { text: '> Loading interactive shell...', type: 'prompt' },
  { text: '', type: 'normal' },
  { text: '> Launching terminal interface...', type: 'prompt' },
];

export default function TerminalBoot() {
  const navigate = useNavigate();
  const [lines, setLines] = useState<string[]>([]);
  const [phase, setPhase] = useState<'boot' | 'glitch' | 'done'>('boot');
  const [glitchText, setGlitchText] = useState('');

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let delay = 300;

    BOOT_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line.text]);
      }, delay);
      timers.push(t);
      delay += line.type === 'normal' && line.text === '' ? 100 : 80 + Math.random() * 120;
    });

    delay += 300;
    const glitchTimer = setTimeout(() => {
      setPhase('glitch');
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`░▒▓█▄▀■□▪▫◊○●◘◙♠♣♥♦';
      let count = 0;
      const glitchInterval = setInterval(() => {
        let result = '';
        for (let i = 0; i < 50; i++) {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
        setGlitchText(result);
        count++;
        if (count > 15) {
          clearInterval(glitchInterval);
          setPhase('done');
          timers.push(setTimeout(() => navigate('/terminal'), 200));
        }
      }, 50);
    }, delay);
    timers.push(glitchTimer);

    return () => { timers.forEach(t => clearTimeout(t)); };
  }, [navigate]);

  const getLineClass = (line: string) => {
    if (line.startsWith('╔') || line.startsWith('║') || line.startsWith('╚')) return 'text-neon-cyan font-bold';
    if (line.startsWith('[KERNEL]') || line.startsWith('[NETWORK]') || line.startsWith('[STORAGE]') || line.startsWith('[SERVICES]') || line.startsWith('[SECURITY]')) return 'text-yellow-400/70';
    if (line.startsWith('  [✓]')) return 'text-green-400/70';
    if (line.startsWith('>')) return 'text-neon-cyan font-bold';
    if (line.startsWith('═')) return 'text-neon-cyan/30';
    return 'text-gray-600';
  };

  if (phase === 'glitch') {
    return (
      <div className="min-h-screen bg-term-bg text-term-green font-mono flex items-center justify-center overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <pre className="text-[10px] text-neon-cyan leading-tight"
            style={{ textShadow: '0 0 20px #4da6ff88, 0 0 40px #4da6ff44', animation: 'glitch 0.1s infinite' }}>
            {glitchText}
          </pre>
        </div>
        <div className="absolute inset-0 bg-neon-cyan/5 animate-pulse" />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(77,166,255,0.1) 1px, rgba(77,166,255,0.1) 2px)',
            animation: 'scanline 0.3s linear infinite'
          }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-term-bg text-term-green font-mono flex flex-col items-center justify-start pt-8 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(77,166,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(77,166,255,0.3) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }} />

      <div className="w-full max-w-2xl relative z-20">
        <div className="text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className={getLineClass(line)} style={{ animation: 'fadeIn 0.15s ease-out' }}>
              {line || '\u00A0'}
            </div>
          ))}
          {phase === 'boot' && (
            <span className="inline-block w-2 h-4 bg-neon-cyan animate-pulse ml-1" />
          )}
        </div>
      </div>
    </div>
  );
}