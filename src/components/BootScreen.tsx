import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BOOT_ART_LINES = [
"uuuuuuuuuuuuuuuuuuuuu.",
"                   .u$$$$$$$$$$$$$$$$$$$$$$$$$$W.",
"                 u$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$Wu.",
"               $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i",
"              $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"         '    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"           .i$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i",
"           $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$W",
"          .$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$W",
"         .$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$i",
"         #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$.",
"         W$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"$u       #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$~",
"$#      '\"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"$i        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"$$        #$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"$$         $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"#$$.        $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$#",
" $$      $iW$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$!",
" $$i      $$$$$$$#\"\" '\"#\"#$$$$$$$$$$$$$$$$$#\"\"\"\"\"\"#$$$$$$$$$$$$$$$W",
" #$$W    '$$$#\"            \"       !$$$$'           '\"#$$$$$$$$$$#",
"  $$$     ''                 ! !iuW$$$$$                 #$$$$$$$#",
"  #$$    $u                  $   $$$$$$$                  $$$$$$$~",
"   \"#    #$$i.               #   $$$$$$$.                 '$$$$$",
"          $$$$$i.                \"\"\"#$$$$i.               .$$$$#",
"          $$$$$$$$!         .   '    $$$$$$$$$i           $$$$$",
"          '$$$$  $iWW   .uW'        #$$$$$$$$$W.       .$$$$$$#",
"            \"#$$$$$$$$$$$$#'          $$$$$$$$$$$iWiuuuW$$$$$$$$W",
"               !#\"\"    \"\"             '$$$$$$##$$$$$$$$$$$$$$$$",
"          i$$$$    .                   !$$$$$$ .$$$$$$$$$$$$$$$#",
"         $$$$$$$$$$'                    $$$$$$$$$Wi$$$$$$#\"#$'$",
"         #$$$$$$$$$W.                   $$$$$$$$$$$#   ''",
"          '$$$$##$$$$!       i$u.  $. .i$$$$$$$$$#\"\"",
"             \"     '#W       $$$$$$$$$$$$$$$$$$$'      u$#",
"                            W$$$$$$$$$$$$$$$$$$      $$$$W",
"                            $$'!$$$##$$$$''$$$$      $$$$!",
"                           i$\" $$$$  $$#'  ''\"\"     W$$$$",
"                                                   W$$$$!",
"                      uW$$  uu  uu.  $$$  $$$Wu#   $$$$$$",
"                     ~$$$$iu$$iu$$$uW$$! $$$$$$i .W$$$$$$",
"             ..  !   \"#$$$$$$$$$$##$$$$$$$$$$$$$$$$$$$$#\"",
"             $$W  $     \"#$$$$$$$iW$$$$$$$$$$$$$$$$$$$$$W",
"             $#'   '       \"\"#$$$$$$$$$$$$$$$$$$$$$$$$$$$",
"                              !$$$$$$$$$$$$$$$$$$$$$#'",
"                              $$$$$$$$$$$$$$$$$$$$$$!",
"                            $$$$$$$$$$$$$$$$$$$$$$$'",
"                             $$$$$$$$$$$$$$$$$$$$\"",];

const BOOT_ASCII = BOOT_ART_LINES.join('\n');

const BOOT_LINES = [
  "[BIOS] Megarooms v3.2.1 ... OK",
  "[CPU]  Neural Core 4x @ 4.2GHz ... OK",
  "[RAM]  32768MB DDR5 ECC ... OK",
  "[STOR] 1TB NVMe SSD ... OK",
  "[NET]  ETH0 LINK UP ... OK",
  "[GPU]  CyberVision RTX ... OK",
  "",
  "  > Booting Obyead's System ...",
];

export default function BootScreen() {
  const navigate = useNavigate();
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [asciiDone, setAsciiDone] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const asciiTimer = setTimeout(() => {
      setLines(BOOT_ART_LINES);
      setAsciiDone(true);
    }, 200);
    timers.push(asciiTimer);

    let delay = 1200;
    BOOT_LINES.forEach((line) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
      timers.push(t);
      delay += line === "" ? 150 : 300 + Math.random() * 200;
    });

    delay += 400;
    const progressTimer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            const showTimer = setTimeout(() => setShowOptions(true), 400);
            timers.push(showTimer);
            return 100;
          }
          return p + 2;
        });
      }, 35);
      timers.push(interval);
    }, delay);
    timers.push(progressTimer);

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const handleBoot = (mode: 'terminal' | 'gui') => {
    navigate(`/${mode}`);
  };

  return (
    <div className="min-h-screen bg-term-bg text-term-green font-mono flex flex-col items-center justify-start pt-12 p-4 relative overflow-hidden">
      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03]"
        style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }} />

      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      {/* ASCII Art - centered and up top */}
      <div className="w-full flex justify-center relative z-20" style={{ marginTop: '40px' }}>
        {asciiDone && (
          <pre className="text-[5px] sm:text-[6px] leading-[5px] sm:leading-[6px] text-neon-cyan select-none whitespace-pre"
            style={{ textShadow: '0 0 8px #00f0ff66, 0 0 20px #00f0ff33', flexShrink: 0, overflow: 'visible' }}>
            {BOOT_ASCII}
          </pre>
        )}
      </div>

      {/* Boot lines below the art */}
      <div className="w-full max-w-2xl mt-6 relative z-20">
        <div className="mb-6 text-sm">
          {lines.slice(asciiDone ? BOOT_ART_LINES.length : 0).map((line, i) => (
            <div key={i} className="animate-boot" style={{ animationDelay: `${i * 0.05}s` }}>
              {line.startsWith('>') ? (
                <span className="text-neon-cyan font-bold" style={{ textShadow: '0 0 10px #00f0ff88' }}>
                  {line}
                </span>
              ) : line === "" ? (
                <br />
              ) : (
                <span className="text-term-dim">
                  {line}
                </span>
              )}
            </div>
          ))}

          {lines.length > 0 && !showOptions && asciiDone && (
            <div className="mt-4 h-3 bg-dark-panel border border-neon-cyan/30 rounded-sm overflow-hidden relative">
              <div
                className="h-full transition-all duration-100 rounded-sm"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #00f0ff, #ff00ff)',
                  boxShadow: '0 0 10px #00f0ff88, 0 0 20px #ff00ff44'
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white/80 font-bold">
                {progress}%
              </div>
            </div>
          )}
        </div>

        {showOptions && (
          <div className="animate-fadeIn text-center space-y-6">
            <div className="text-neon-cyan text-sm tracking-[0.3em] uppercase font-bold"
              style={{ textShadow: '0 0 10px #00f0ff88, 0 0 30px #00f0ff44' }}>
              ═══ Select Boot Mode ═══
            </div>

            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button
                onClick={() => handleBoot('terminal')}
                className="group relative px-10 py-5 bg-transparent border-2 border-term-green text-term-green font-mono text-lg tracking-wider hover:bg-term-green/10 transition-all duration-300"
                style={{
                  boxShadow: '0 0 15px #4da6ff44, inset 0 0 15px #4da6ff22',
                }}
              >
                <div className="text-2xl mb-2" style={{ textShadow: '0 0 10px #4da6ff88' }}>{`> _`}</div>
                <div className="font-bold" style={{ textShadow: '0 0 8px #4da6ff66' }}>TERMINAL BOOT</div>
                <div className="text-xs mt-2 text-term-dim group-hover:text-term-green transition-colors">
                  ─ CLI INTERFACE ─
                </div>
              </button>

              <button
                onClick={() => handleBoot('gui')}
                className="group relative px-10 py-5 bg-transparent border-2 border-neon-cyan text-neon-cyan font-mono text-lg tracking-wider hover:bg-neon-cyan/10 transition-all duration-300"
                style={{
                  boxShadow: '0 0 15px #00f0ff44, inset 0 0 15px #00f0ff22',
                }}
              >
                <div className="text-2xl mb-2" style={{ textShadow: '0 0 10px #00f0ff88' }}>◉ ◈ ◫</div>
                <div className="font-bold" style={{ textShadow: '0 0 8px #00f0ff66' }}>GUI BOOT</div>
                <div className="text-xs mt-2 text-desktop-muted group-hover:text-neon-cyan transition-colors">
                  ─ DESKTOP INTERFACE ─
                </div>
              </button>
            </div>

            <div className="text-term-dim text-xs animate-blink mt-5">
              {'>'} Select to initiate boot sequence ...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}