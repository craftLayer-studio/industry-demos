/**
 * Original SVG illustrations for The Saltmarsh concept demo. Every drawing
 * is hand-built from simple shapes and the theme's coastal tokens: no stock
 * photography and no remote images.
 */
import type {Room, RoomView} from './lib/data';
import {places} from './lib/data';
import styles from './saltmarsh.module.css';

const INK = 'var(--saltmarsh-ink)';
const DEEP = 'var(--saltmarsh-deep)';
const SEA = 'var(--saltmarsh-sea)';
const GLASS = 'var(--saltmarsh-glass)';
const GLASS_MID = 'var(--saltmarsh-glass-mid)';
const GLASS_SOFT = 'var(--saltmarsh-glass-soft)';
const TERRACOTTA = 'var(--saltmarsh-terracotta)';
const CLAY = 'var(--saltmarsh-clay)';
const SAND = 'var(--saltmarsh-sand)';
const SAND_DEEP = 'var(--saltmarsh-sand-deep)';
const REED = 'var(--saltmarsh-reed)';
const FOAM = 'var(--saltmarsh-foam)';
const SKY = 'var(--saltmarsh-sky)';

/** The Saltmarsh mark: a sun over three tide lines inside a pebble ring. */
export function SaltmarshMark({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="17" r="5.5" fill={TERRACOTTA} />
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M8,24 q3,-2.4 6,0 t6,0 t6,0 t6,0" />
        <path d="M10,28.5 q2.5,-2 5,0 t5,0 t5,0 t5,0" />
        <path d="M13,33 q1.75,-1.5 3.5,0 t3.5,0 t3.5,0 t3.5,0" />
      </g>
    </svg>
  );
}

function Gull({x, y, s = 1}: {x: number; y: number; s?: number}) {
  return (
    <path
      d={`M${x - 9 * s},${y} q${4.5 * s},${-6 * s} ${9 * s},0 q${4.5 * s},${-6 * s} ${9 * s},0`}
      fill="none"
      stroke={INK}
      strokeWidth={1.3}
      strokeLinecap="round"
    />
  );
}

function Reeds({x, y, count = 7, h = 60, color = REED}: {x: number; y: number; count?: number; h?: number; color?: string}) {
  return (
    <g stroke={color} strokeWidth="2" strokeLinecap="round" fill="none">
      {Array.from({length: count}, (_, i) => {
        const dx = x + i * 7;
        const lean = (i % 3) - 1;
        const height = h - (i % 4) * 9;
        return (
          <g key={i}>
            <path d={`M${dx},${y} q${lean * 4},${-height / 2} ${lean * 10},${-height}`} />
            {i % 2 === 0 ? (
              <ellipse cx={dx + lean * 10} cy={y - height - 6} rx="2.6" ry="8" fill={color} stroke="none" transform={`rotate(${lean * 12} ${dx + lean * 10} ${y - height - 6})`} />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Hero scene: the white hotel on the dunes, the sea, the light on the headland. */
export function HeroScene() {
  return (
    <svg viewBox="0 0 640 520" className={styles.heroScene} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SKY} />
          <stop offset="1" stopColor={FOAM} />
        </linearGradient>
        <clipPath id="sm-arch">
          <path d="M40,520 V230 A280,220 0 0 1 600,230 V520 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#sm-arch)">
        <rect width="640" height="520" fill="url(#sm-sky)" />
        {/* Sun */}
        <circle cx="430" cy="196" r="62" fill={CLAY} opacity="0.85" />
        <Gull x={180} y={130} />
        <Gull x={214} y={112} s={0.7} />
        <Gull x={520} y={150} s={0.8} />
        {/* Headland and lighthouse */}
        <path d="M430,300 C470,268 520,250 600,246 V320 H430 Z" fill={SAND_DEEP} />
        <g transform="translate(540 186)">
          <path d="M-8,62 L-5,8 H5 L8,62 Z" fill={FOAM} stroke={INK} strokeWidth="1.2" />
          <rect x="-5" y="22" width="10" height="7" fill={TERRACOTTA} />
          <rect x="-5" y="42" width="10" height="7" fill={TERRACOTTA} />
          <rect x="-6" y="0" width="12" height="8" fill={GLASS} stroke={INK} strokeWidth="1.2" />
          <path d="M-7,0 L0,-8 L7,0 Z" fill={TERRACOTTA} />
        </g>
        {/* Sea bands */}
        <rect y="300" width="640" height="220" fill={GLASS} />
        <path d="M0,330 C90,318 180,338 270,328 S450,316 640,330 V520 H0 Z" fill={GLASS_MID} opacity="0.75" />
        <path d="M0,364 C110,352 210,372 320,360 S520,350 640,362 V520 H0 Z" fill={SEA} opacity="0.55" />
        <g stroke={FOAM} strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M70,316 q10,-5 20,0 t20,0" />
          <path d="M300,312 q10,-5 20,0 t20,0 t20,0" />
          <path d="M480,342 q10,-5 20,0 t20,0" />
          <path d="M150,348 q8,-4 16,0 t16,0" />
        </g>
        {/* Boat */}
        <g transform="translate(330 318)">
          <path d="M-22,0 H22 L15,9 H-15 Z" fill={TERRACOTTA} />
          <path d="M0,-2 V-34 L18,-4 Z" fill={FOAM} stroke={INK} strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="-36" stroke={INK} strokeWidth="1.2" />
        </g>
        {/* Dunes */}
        <path d="M0,404 C80,370 150,372 230,392 S380,420 460,398 S580,380 640,396 V520 H0 Z" fill={SAND} />
        <path d="M0,446 C120,420 230,430 330,446 S520,470 640,440 V520 H0 Z" fill={SAND_DEEP} opacity="0.7" />
        {/* Hotel */}
        <g transform="translate(120 286)">
          <rect x="0" y="40" width="190" height="88" fill={FOAM} stroke={INK} strokeWidth="1.4" />
          <path d="M-8,42 L40,0 H150 L198,42 Z" fill={TERRACOTTA} stroke={INK} strokeWidth="1.4" strokeLinejoin="round" />
          <rect x="84" y="-14" width="14" height="22" fill={FOAM} stroke={INK} strokeWidth="1.2" />
          {/* Windows */}
          {[18, 58, 118, 158].map(x => (
            <g key={x}>
              <rect x={x} y="56" width="18" height="22" fill={GLASS} stroke={INK} strokeWidth="1.1" />
              <line x1={x + 9} x2={x + 9} y1="56" y2="78" stroke={INK} strokeWidth="0.8" />
            </g>
          ))}
          {[18, 158].map(x => (
            <rect key={x} x={x} y="94" width="18" height="22" fill={GLASS} stroke={INK} strokeWidth="1.1" />
          ))}
          {/* Door and porch */}
          <path d="M80,128 V100 a15,15 0 0 1 30,0 V128 Z" fill={DEEP} />
          <path d="M70,96 H120" stroke={INK} strokeWidth="1.4" />
          {/* Boathouse */}
          <g transform="translate(214 64)">
            <rect x="0" y="20" width="62" height="44" fill={SAND} stroke={INK} strokeWidth="1.3" />
            <path d="M-6,22 L31,-4 L68,22 Z" fill={SEA} stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
            <rect x="20" y="34" width="22" height="30" fill={GLASS_SOFT} stroke={INK} strokeWidth="1.1" />
            {[0, 7, 14].map(dy => (
              <line key={dy} x1="0" x2="62" y1={28 + dy} y2={28 + dy} stroke={INK} strokeWidth="0.4" opacity="0.4" />
            ))}
          </g>
        </g>
        {/* Path through the dunes */}
        <path d="M215,414 C230,440 190,470 220,520" stroke={FOAM} strokeWidth="10" fill="none" strokeLinecap="round" opacity="0.9" />
        <Reeds x={60} y={470} count={8} h={70} />
        <Reeds x={470} y={480} count={9} h={80} />
        <Reeds x={330} y={500} count={5} h={52} color={SEA} />
      </g>
      <path d="M40,520 V230 A280,220 0 0 1 600,230 V520" fill="none" stroke={INK} strokeWidth="1.4" />
    </svg>
  );
}

function WindowView({view}: {view: RoomView}) {
  if (view === 'sea') {
    return (
      <g>
        <rect x="0" y="0" width="96" height="92" fill={SKY} />
        <circle cx="66" cy="34" r="12" fill={CLAY} opacity="0.85" />
        <rect y="54" width="96" height="38" fill={GLASS_MID} />
        <path d="M0,66 q12,-4 24,0 t24,0 t24,0 t24,0 V92 H0 Z" fill={SEA} opacity="0.7" />
        <path d="M10,60 q6,-3 12,0 M54,74 q6,-3 12,0" stroke={FOAM} strokeWidth="1.2" fill="none" />
      </g>
    );
  }
  if (view === 'marsh') {
    return (
      <g>
        <rect x="0" y="0" width="96" height="92" fill={SKY} />
        <rect y="58" width="96" height="34" fill={SAND} />
        <path d="M0,74 C20,68 40,80 60,72 S90,70 96,74 V82 C70,78 40,88 0,82 Z" fill={GLASS_MID} />
        <Reeds x={8} y={92} count={5} h={34} />
        <Reeds x={62} y={92} count={4} h={30} />
        <Gull x={40} y={26} s={0.6} />
      </g>
    );
  }
  return (
    <g>
      <rect x="0" y="0" width="96" height="92" fill={SKY} />
      <rect y="60" width="96" height="32" fill={GLASS} />
      <circle cx="22" cy="58" r="16" fill={SEA} />
      <circle cx="74" cy="54" r="20" fill={GLASS_MID} />
      <rect x="0" y="76" width="96" height="16" fill={SAND_DEEP} />
      {[10, 26, 42, 58, 74].map(x => (
        <circle key={x} cx={x + 4} cy={74} r="3" fill={TERRACOTTA} />
      ))}
    </g>
  );
}

function Motif({kind}: {kind: Room['art']['motif']}) {
  switch (kind) {
    case 'waves':
      return <path d="M6,22 q5,-4 10,0 t10,0 M6,30 q5,-4 10,0 t10,0" stroke={DEEP} strokeWidth="1.4" fill="none" />;
    case 'reeds':
      return <Reeds x={8} y={38} count={3} h={26} color={DEEP} />;
    case 'shells':
      return (
        <g fill="none" stroke={DEEP} strokeWidth="1.3">
          <path d="M16,34 a10,10 0 0 1 0,-20 a10,10 0 0 1 0,20 Z" />
          <path d="M16,34 L10,18 M16,34 L16,14 M16,34 L22,18" />
        </g>
      );
    case 'gulls':
      return (
        <g>
          <Gull x={14} y={22} s={0.6} />
          <Gull x={22} y={32} s={0.45} />
        </g>
      );
    case 'boats':
      return (
        <g>
          <path d="M6,32 H26 L22,37 H10 Z" fill={DEEP} />
          <path d="M16,31 V14 L25,30 Z" fill="none" stroke={DEEP} strokeWidth="1.2" />
        </g>
      );
    case 'dunes':
      return <path d="M4,34 C10,24 16,24 20,30 S28,26 30,34" stroke={DEEP} strokeWidth="1.4" fill="none" />;
  }
}

/** A room vignette: wall, window onto the room's view, bed and throw, a framed motif. */
export function RoomArt({room, className}: {room: Room; className?: string}) {
  const isTwin = room.bed.startsWith('Two');
  return (
    <svg viewBox="0 0 320 220" className={className ?? styles.roomArt} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="220" fill={room.art.wall} />
      <rect y="168" width="320" height="52" fill={SAND_DEEP} opacity="0.55" />
      <line x1="0" x2="320" y1="168" y2="168" stroke={INK} strokeWidth="1" opacity="0.5" />
      {/* Window */}
      <g transform="translate(176 34)">
        <path d="M0,92 V30 A48,30 0 0 1 96,30 V92 Z" fill={FOAM} stroke={INK} strokeWidth="1.4" />
        <clipPath id={`win-${room.id}`}>
          <path d="M4,88 V31 A44,27 0 0 1 92,31 V88 Z" />
        </clipPath>
        <g clipPath={`url(#win-${room.id})`}>
          <WindowView view={room.view} />
        </g>
        <line x1="48" x2="48" y1="4" y2="92" stroke={INK} strokeWidth="1.1" />
        <rect x="-6" y="92" width="108" height="6" fill={FOAM} stroke={INK} strokeWidth="1.2" />
      </g>
      {/* Framed motif */}
      <g transform="translate(40 40)">
        <rect width="32" height="44" fill={FOAM} stroke={INK} strokeWidth="1.2" />
        <Motif kind={room.art.motif} />
      </g>
      {/* Lamp */}
      <g transform="translate(118 108)">
        <path d="M-12,0 L-8,-18 H8 L12,0 Z" fill={CLAY} />
        <line x1="0" x2="0" y1="0" y2="34" stroke={INK} strokeWidth="1.3" />
        <rect x="-16" y="34" width="32" height="26" fill={FOAM} stroke={INK} strokeWidth="1.2" />
      </g>
      {/* Bed(s) */}
      {isTwin ? (
        <g>
          {[22, 150].map(x => (
            <g key={x} transform={`translate(${x} 128)`}>
              <rect x="0" y="0" width="8" height="58" fill={INK} opacity="0.75" />
              <rect x="6" y="24" width="96" height="30" rx="4" fill={FOAM} stroke={INK} strokeWidth="1.2" />
              <rect x="40" y="22" width="62" height="32" rx="3" fill={room.art.textile} opacity="0.9" />
              <rect x="12" y="16" width="24" height="12" rx="5" fill={FOAM} stroke={INK} strokeWidth="1" />
            </g>
          ))}
        </g>
      ) : (
        <g transform="translate(14 112)">
          <rect x="0" y="0" width="10" height="76" rx="2" fill={INK} opacity="0.75" />
          <rect x="8" y="36" width="190" height="40" rx="5" fill={FOAM} stroke={INK} strokeWidth="1.2" />
          <path d="M90,34 H198 V76 H90 Z" fill={room.art.textile} opacity="0.9" />
          <path d="M98,48 H190 M98,58 H190" stroke={FOAM} strokeWidth="1" opacity="0.6" />
          <rect x="16" y="24" width="34" height="16" rx="7" fill={FOAM} stroke={INK} strokeWidth="1" />
          <rect x="52" y="24" width="34" height="16" rx="7" fill={FOAM} stroke={INK} strokeWidth="1" />
          <rect x="14" y="76" width="6" height="14" fill={INK} opacity="0.7" />
          <rect x="188" y="76" width="6" height="14" fill={INK} opacity="0.7" />
        </g>
      )}
      {room.type === 'cottage' ? (
        <g transform="translate(286 120)">
          <rect x="-14" y="10" width="28" height="38" fill={INK} opacity="0.8" />
          <path d="M-6,40 q6,-14 0,-22 q10,8 6,22 Z" fill={CLAY} />
          <rect x="-4" y="-40" width="8" height="50" fill={INK} opacity="0.6" />
        </g>
      ) : null}
    </svg>
  );
}

/** Dining: a table by the window with a plate, glass and a jug of reeds. */
export function DiningArt() {
  return (
    <svg viewBox="0 0 320 220" className={styles.featureArt} aria-hidden="true" focusable="false">
      <rect width="320" height="220" fill={GLASS_SOFT} />
      <circle cx="244" cy="70" r="36" fill={CLAY} opacity="0.75" />
      <rect y="120" width="320" height="100" fill={SAND} />
      <ellipse cx="160" cy="150" rx="128" ry="26" fill={FOAM} stroke={INK} strokeWidth="1.3" />
      <ellipse cx="140" cy="148" rx="34" ry="9" fill={FOAM} stroke={INK} strokeWidth="1.1" />
      <ellipse cx="140" cy="147" rx="20" ry="5" fill={TERRACOTTA} opacity="0.85" />
      <path d="M196,148 V122 q8,-12 16,0 V148" fill={GLASS} stroke={INK} strokeWidth="1.1" />
      <g transform="translate(84 152)">
        <path d="M-10,-4 Q-14,-34 0,-38 Q14,-34 10,-4 Z" fill={SEA} stroke={INK} strokeWidth="1.1" />
      </g>
      <Reeds x={72} y={116} count={3} h={40} />
      <path d="M100,152 L60,210 M220,152 L260,210" stroke={INK} strokeWidth="2" />
    </svg>
  );
}

/** Spa: a stone bath, steam and a stack of pebbles. */
export function SpaArt() {
  return (
    <svg viewBox="0 0 320 220" className={styles.featureArt} aria-hidden="true" focusable="false">
      <rect width="320" height="220" fill={SAND} />
      <path d="M0,120 C80,106 240,106 320,120 V220 H0 Z" fill={GLASS} />
      <g fill="none" stroke={SEA} strokeWidth="2" strokeLinecap="round" opacity="0.8">
        <path d="M120,96 q-10,-14 0,-28 t0,-28" />
        <path d="M150,92 q-10,-14 0,-28 t0,-28" />
        <path d="M180,96 q-10,-14 0,-28 t0,-28" />
      </g>
      <path d="M70,110 H250 Q246,170 160,170 Q74,170 70,110 Z" fill={FOAM} stroke={INK} strokeWidth="1.4" />
      <path d="M80,116 H240" stroke={GLASS_MID} strokeWidth="6" strokeLinecap="round" />
      <g transform="translate(270 190)">
        <ellipse cx="0" cy="0" rx="24" ry="9" fill={SAND_DEEP} stroke={INK} strokeWidth="1" />
        <ellipse cx="2" cy="-14" rx="17" ry="7" fill={CLAY} stroke={INK} strokeWidth="1" />
        <ellipse cx="0" cy="-25" rx="10" ry="5" fill={FOAM} stroke={INK} strokeWidth="1" />
      </g>
      <Reeds x={20} y={200} count={4} h={50} />
    </svg>
  );
}

/** Breakfast: a tray with a pot, cup, bun and boiled egg. */
export function BreakfastArt() {
  return (
    <svg viewBox="0 0 320 220" className={styles.featureArt} aria-hidden="true" focusable="false">
      <rect width="320" height="220" fill={SKY} />
      <circle cx="70" cy="64" r="30" fill={CLAY} opacity="0.8" />
      <rect x="40" y="120" width="240" height="70" rx="10" fill={SAND} stroke={INK} strokeWidth="1.3" />
      <g transform="translate(96 100)">
        <path d="M-22,48 V8 Q0,-6 22,8 V48 Z" fill={SEA} stroke={INK} strokeWidth="1.2" />
        <path d="M22,18 q14,4 0,22" fill="none" stroke={INK} strokeWidth="1.2" />
        <path d="M-22,20 l-12,-8" stroke={INK} strokeWidth="1.2" />
      </g>
      <g transform="translate(166 136)">
        <path d="M-16,0 H16 V10 Q0,22 -16,10 Z" fill={FOAM} stroke={INK} strokeWidth="1.1" />
        <ellipse cx="0" cy="22" rx="24" ry="5" fill={FOAM} stroke={INK} strokeWidth="1.1" />
      </g>
      <g transform="translate(230 146)">
        <ellipse cx="0" cy="0" rx="22" ry="14" fill={CLAY} stroke={INK} strokeWidth="1.1" />
        <path d="M-12,-4 q12,-8 24,0" stroke={TERRACOTTA} strokeWidth="1.5" fill="none" />
      </g>
      <g transform="translate(196 116)">
        <ellipse cx="0" cy="0" rx="8" ry="11" fill={FOAM} stroke={INK} strokeWidth="1.1" />
        <path d="M-7,6 H7 V12 H-7 Z" fill={TERRACOTTA} />
      </g>
    </svg>
  );
}

/** Illustrated map of the fictional Wrenmouth estuary with numbered places. */
export function AreaMap({activeId}: {activeId?: string}) {
  return (
    <svg viewBox="0 0 400 260" className={styles.mapArt} role="img" aria-labelledby="sm-map-title" focusable="false">
      <title id="sm-map-title">Illustrated map of the fictional Wrenmouth estuary, with five numbered places near the hotel</title>
      <rect width="400" height="260" fill={GLASS} />
      {/* Land */}
      <path d="M0,0 H400 V30 C360,40 330,70 300,100 C270,130 300,170 340,190 L380,220 C340,230 300,212 270,200 C220,180 180,200 150,230 C120,255 60,250 0,240 Z" fill={SAND} />
      {/* Marsh */}
      <path d="M40,110 C80,90 150,100 180,130 C200,150 170,180 130,182 C90,184 50,160 40,140 Z" fill={GLASS_MID} opacity="0.55" />
      {/* Creek */}
      <path d="M0,150 C40,140 90,160 120,150 C150,140 170,160 200,170 C230,180 260,190 290,206 C310,216 330,226 400,240" stroke={GLASS_SOFT} strokeWidth="8" fill="none" strokeLinecap="round" />
      <path d="M0,150 C40,140 90,160 120,150 C150,140 170,160 200,170 C230,180 260,190 290,206 C310,216 330,226 400,240" stroke={SEA} strokeWidth="1.2" fill="none" strokeDasharray="2 5" />
      {/* Coast path */}
      <path d="M190,118 C220,100 260,90 300,76 C330,66 350,58 360,54" stroke={TERRACOTTA} strokeWidth="1.6" fill="none" strokeDasharray="4 4" />
      <path d="M190,118 C230,140 280,170 312,196" stroke={TERRACOTTA} strokeWidth="1.6" fill="none" strokeDasharray="4 4" />
      {/* Hotel */}
      <g transform="translate(184 112)">
        <rect x="-10" y="-2" width="20" height="14" fill={FOAM} stroke={INK} strokeWidth="1.2" />
        <path d="M-13,-1 L0,-12 L13,-1 Z" fill={TERRACOTTA} stroke={INK} strokeWidth="1.2" />
      </g>
      <text x="184" y="140" textAnchor="middle" className={styles.mapLabel}>
        The Saltmarsh
      </text>
      {places.map((p, i) => {
        const active = p.id === activeId;
        return (
          <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
            <circle r={active ? 12 : 10} fill={active ? TERRACOTTA : DEEP} stroke={FOAM} strokeWidth="2" />
            <text y="4" textAnchor="middle" className={styles.mapNumber}>
              {i + 1}
            </text>
          </g>
        );
      })}
      {/* Compass */}
      <g transform="translate(30 30)" stroke={INK} strokeWidth="1" fill="none">
        <circle r="12" />
        <path d="M0,-10 L3,0 L0,10 L-3,0 Z" fill={INK} />
      </g>
      <text x="30" y="56" textAnchor="middle" className={styles.mapCompass}>
        N
      </text>
    </svg>
  );
}
