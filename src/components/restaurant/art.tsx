import a from './art.module.css';

/**
 * Original SVG illustrations for Juniper Kitchen. Colours come from the
 * Juniper theme's local tokens via CSS classes, so no raw colours live here.
 */

type ArtProps = {label: string; className?: string};

function cx(...names: (string | false | undefined)[]) {
  return names.filter(Boolean).join(' ');
}

function Berry({x, y, r = 7}: {x: number; y: number; r?: number}) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} className={a.deep} />
      <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.28} className={cx(a.cream, a.soft)} />
    </g>
  );
}

function Sprig({x, y, angle, scale = 1}: {x: number; y: number; angle: number; scale?: number}) {
  const needles = [0, 1, 2, 3, 4, 5, 6];
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`}>
      <path d="M0 0 L0 -120" className={a.lineOlive} strokeWidth={3} strokeLinecap="round" />
      {needles.map((n) => (
        <g key={n}>
          <path d={`M0 ${-14 - n * 15} l-18 -12`} className={a.lineOlive} strokeWidth={3} strokeLinecap="round" />
          <path d={`M0 ${-10 - n * 15} l18 -12`} className={a.lineOlive} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Leaf({x, y, angle, len = 46, tone}: {x: number; y: number; angle: number; len?: number; tone: string}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <path d={`M0 0 C ${len * 0.3} ${-len * 0.35}, ${len * 0.75} ${-len * 0.3}, ${len} 0 C ${len * 0.75} ${len * 0.3}, ${len * 0.3} ${len * 0.35}, 0 0 Z`} className={tone} />
      <path d={`M2 0 L${len - 4} 0`} className={cx(a.lineForest, a.soft)} strokeWidth={1.5} />
    </g>
  );
}

export function HeroArt({label, className}: ArtProps) {
  const leaves = [
    {x: 200, y: 300, angle: -150, tone: a.olive},
    {x: 214, y: 340, angle: 160, tone: a.oliveSoft},
    {x: 250, y: 360, angle: 100, tone: a.olive},
    {x: 268, y: 300, angle: -40, tone: a.oliveSoft},
    {x: 236, y: 286, angle: -95, tone: a.olive},
    {x: 282, y: 338, angle: 30, tone: a.olive},
  ];
  return (
    <svg viewBox="0 0 480 560" width={480} height={560} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <path d="M0 560 V240 A240 240 0 0 1 480 240 V560 Z" className={a.forest} />
      <path d="M28 560 V244 A212 212 0 0 1 452 244 V560" className={cx(a.lineCream, a.faint)} strokeWidth={1.5} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${60 + i * 72} 120 v24`} className={cx(a.lineCream, a.faint)} strokeWidth={1.5} />
      ))}
      {/* napkin */}
      <g transform="rotate(-14 120 470)">
        <rect x="18" y="400" width="210" height="150" rx="6" className={a.terracotta} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={`M18 ${428 + i * 10} h210`} className={cx(a.lineCream, a.soft)} strokeWidth={2} />
        ))}
      </g>
      {/* fork */}
      <g transform="translate(418 210) rotate(8)">
        <path d="M0 0 v190" className={a.lineLinen} strokeWidth={7} strokeLinecap="round" />
        <path d="M-12 -70 v50 a12 12 0 0 0 24 0 v-50 M0 -70 v48" className={a.lineLinen} strokeWidth={4} strokeLinecap="round" />
      </g>
      {/* plate */}
      <circle cx="244" cy="324" r="156" className={a.deep} opacity={0.35} />
      <circle cx="240" cy="318" r="152" className={a.paper} />
      <circle cx="240" cy="318" r="124" className={a.lineLinen} strokeWidth={3} />
      <circle cx="240" cy="318" r="104" className={a.cream} />
      {/* romesco swoosh */}
      <path d="M170 360 C 200 300, 280 280, 318 300 C 300 330, 230 370, 170 360 Z" className={cx(a.clay, a.soft)} />
      {leaves.map((leaf, i) => (
        <Leaf key={i} {...leaf} />
      ))}
      {/* charred leek coins */}
      {[
        [212, 318],
        [252, 322],
        [232, 352],
        [270, 352],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={17} className={a.linen} />
          <circle cx={x} cy={y} r={11} className={a.lineOlive} strokeWidth={2} />
          <circle cx={x} cy={y} r={5} className={a.oliveSoft} />
          <path d={`M${x - 15} ${y + 6} q8 -4 14 3`} className={a.lineDeep} strokeWidth={3} strokeLinecap="round" />
        </g>
      ))}
      {/* lemon */}
      <path d="M300 250 a34 34 0 0 1 4 52 l-30 -26 z" className={a.butter} />
      <path d="M300 250 a34 34 0 0 1 4 52" className={a.lineCream} strokeWidth={3} />
      <Berry x={190} y={276} />
      <Berry x={204} y={268} r={6} />
      <Berry x={290} y={384} />
      <Berry x={304} y={376} r={5} />
      <Sprig x={92} y={210} angle={-35} scale={0.8} />
      <Sprig x={404} y={548} angle={-160} scale={0.9} />
    </svg>
  );
}

export function TableArt({label, className}: ArtProps) {
  const lamps = [130, 300, 470];
  return (
    <svg viewBox="0 0 600 400" width={600} height={400} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <rect width="600" height="400" className={a.forest} />
      <rect y="250" width="600" height="150" className={a.deep} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path key={i} d={`M${i * 80 + 20} 0 v250`} className={cx(a.lineCream, a.faint)} strokeWidth={1} />
      ))}
      {lamps.map((x) => (
        <g key={x}>
          <path d={`M${x} 0 v70`} className={a.lineLinen} strokeWidth={2} />
          <circle cx={x} cy={96} r={58} className={cx(a.butter, a.faint)} />
          <path d={`M${x - 34} 100 a34 30 0 0 1 68 0 z`} className={a.oliveSoft} />
          <path d={`M${x - 10} 100 a10 8 0 0 0 20 0 z`} className={a.butter} />
        </g>
      ))}
      {/* long table */}
      <path d="M40 270 L560 270 L600 330 L0 330 Z" className={a.linen} />
      <rect y="330" width="600" height="14" className={a.oliveSoft} />
      {[90, 190, 300, 410, 510].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy={298} rx={34} ry={11} className={a.paper} />
          <ellipse cx={x} cy={297} rx={20} ry={6} className={i % 2 ? a.clay : a.olive} />
          <path d={`M${x + 44} 300 v-26 M${x + 38} 274 h12 l-2 -18 h-8 z`} className={cx(a.lineCream, a.soft)} strokeWidth={2} />
        </g>
      ))}
      {[140, 245, 355, 460].map((x) => (
        <g key={x}>
          <rect x={x - 4} y={250} width={8} height={30} className={a.cream} />
          <path d={`M${x} 236 c5 6 5 11 0 14 c-5 -3 -5 -8 0 -14 z`} className={cx(a.butter, a.flicker)} />
        </g>
      ))}
      {[60, 140, 220, 300, 380, 460, 540].map((x) => (
        <path key={x} d={`M${x - 16} 400 v-50 a16 16 0 0 1 32 0 v50`} className={a.terracotta} />
      ))}
    </svg>
  );
}

export function EmbersArt({label, className}: ArtProps) {
  return (
    <svg viewBox="0 0 400 480" width={400} height={480} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <rect width="400" height="480" className={a.deep} />
      <path d="M40 480 V200 A160 160 0 0 1 360 200 V480 Z" className={a.ink} />
      <path d="M40 480 V200 A160 160 0 0 1 360 200 V480" className={cx(a.lineClay, a.soft)} strokeWidth={4} />
      <circle cx="200" cy="330" r="120" className={cx(a.clay, a.faint)} />
      <g className={a.flicker}>
        <path d="M200 160 C 250 230, 290 270, 270 340 L130 340 C 110 270, 160 240, 200 160 Z" className={a.terracotta} />
        <path d="M200 210 C 235 260, 255 290, 240 340 L160 340 C 150 290, 175 260, 200 210 Z" className={a.clay} />
        <path d="M200 260 C 220 290, 228 310, 220 340 L180 340 C 174 312, 186 290, 200 260 Z" className={a.butter} />
      </g>
      <g transform="rotate(-8 200 360)">
        <rect x="90" y="340" width="220" height="30" rx="15" className={a.olive} />
        <circle cx="300" cy="355" r="13" className={a.oliveSoft} />
      </g>
      <g transform="rotate(10 200 380)">
        <rect x="80" y="368" width="240" height="30" rx="15" className={a.forest} />
        <circle cx="92" cy="383" r="13" className={a.oliveSoft} />
      </g>
      {[110, 150, 190, 230, 270].map((x, i) => (
        <circle key={x} cx={x + 6} cy={418 + (i % 2) * 6} r={5} className={a.butter} opacity={0.7} />
      ))}
      <path d="M60 440 H340" className={a.lineLinen} strokeWidth={4} />
      {[80, 130, 180, 230, 280, 320].map((x) => (
        <path key={x} d={`M${x} 440 v40`} className={cx(a.lineLinen, a.soft)} strokeWidth={4} />
      ))}
    </svg>
  );
}

export function CakeArt({label, className}: ArtProps) {
  return (
    <svg viewBox="0 0 400 400" width={400} height={400} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <rect width="400" height="400" className={a.linen} />
      <path d="M0 300 H400" className={cx(a.lineInk, a.faint)} strokeWidth={1} />
      <ellipse cx="200" cy="270" rx="160" ry="60" className={cx(a.ink, a.faint)} />
      <ellipse cx="200" cy="260" rx="160" ry="58" className={a.paper} />
      <ellipse cx="200" cy="260" rx="128" ry="44" className={a.lineLinen} strokeWidth={3} />
      {/* cake wedge */}
      <path d="M110 250 L250 190 L300 236 L160 296 Z" className={a.butter} />
      <path d="M160 296 L300 236 L300 262 L160 322 Z" className={a.clay} />
      <path d="M110 250 L160 296 L160 322 L110 276 Z" className={a.terracotta} />
      <path d="M118 252 L252 194" className={cx(a.lineCream, a.soft)} strokeWidth={3} />
      {/* poached pear */}
      <path d="M282 190 c-14 0 -22 -16 -16 -32 c4 -12 4 -20 14 -26 c10 6 10 14 14 26 c6 16 -2 32 -12 32 z" className={a.oliveSoft} />
      <path d="M280 132 c0 -10 4 -16 10 -20" className={a.lineOlive} strokeWidth={3} strokeLinecap="round" />
      {/* creme fraiche + honeycomb */}
      <ellipse cx="128" cy="210" rx="30" ry="14" className={a.cream} />
      <path d="M118 202 c6 -8 20 -8 24 0" className={a.lineLinen} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M${300 + i * 13} ${268 - (i % 2) * 7} l6 -4 6 4 v7 l-6 4 -6 -4 z`} className={a.butter} />
      ))}
      <path d="M40 60 h70 M40 74 h46" className={cx(a.lineInk, a.faint)} strokeWidth={3} strokeLinecap="round" />
    </svg>
  );
}

export function SpritzArt({label, className}: ArtProps) {
  return (
    <svg viewBox="0 0 400 480" width={400} height={480} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <rect width="400" height="480" className={a.terracotta} />
      <circle cx="320" cy="90" r="120" className={cx(a.clay, a.soft)} />
      <rect y="380" width="400" height="100" className={a.clay} />
      {/* glass */}
      <path d="M120 120 C 110 230, 140 300, 200 304 C 260 300, 290 230, 280 120 Z" className={cx(a.cream, a.faint)} />
      <path d="M126 178 C 124 250, 152 296, 200 298 C 248 296, 276 250, 274 178 Z" className={a.butter} opacity={0.85} />
      <path d="M120 120 C 110 230, 140 300, 200 304 C 260 300, 290 230, 280 120" className={a.lineCream} strokeWidth={4} />
      <path d="M200 304 V392 M150 396 H250" className={a.lineCream} strokeWidth={5} strokeLinecap="round" />
      {[
        [170, 250],
        [220, 230],
        [190, 210],
        [240, 270],
        [160, 200],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={4 + (i % 3)} className={a.lineCream} strokeWidth={2} />
      ))}
      {/* citrus wheel */}
      <g transform="translate(262 128)">
        <circle r="42" className={a.butter} />
        <circle r="36" className={a.paper} opacity={0.6} />
        {[0, 45, 90, 135].map((deg) => (
          <path key={deg} d="M-34 0 H34" transform={`rotate(${deg})`} className={a.lineButter} strokeWidth={3} />
        ))}
      </g>
      <Sprig x={150} y={170} angle={-14} scale={0.7} />
    </svg>
  );
}

export function GreensArt({label, className}: ArtProps) {
  const ring = Array.from({length: 11}, (_, i) => i);
  return (
    <svg viewBox="0 0 400 400" width={400} height={400} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice" className={cx(a.art, className)}>
      <rect width="400" height="400" className={a.oliveSoft} />
      <circle cx="206" cy="206" r="150" className={cx(a.ink, a.faint)} />
      <circle cx="200" cy="200" r="150" className={a.forest} />
      <circle cx="200" cy="200" r="126" className={a.paper} />
      {ring.map((i) => (
        <Leaf key={i} x={200} y={200} angle={i * 33} len={96} tone={i % 2 ? a.olive : a.oliveSoft} />
      ))}
      {ring.slice(0, 7).map((i) => (
        <Leaf key={`in-${i}`} x={200} y={200} angle={i * 51 + 16} len={58} tone={a.forest} />
      ))}
      {[
        [150, 160],
        [252, 150],
        [240, 256],
        [156, 248],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={13} className={a.terracotta} />
          <circle cx={x} cy={y} r={7} className={a.cream} />
        </g>
      ))}
      <circle cx="200" cy="200" r="10" className={a.butter} />
    </svg>
  );
}
