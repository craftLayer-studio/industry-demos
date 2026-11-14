import type {ReactNode} from 'react';
import type {FacadeStyle, Property} from './lib/data';
import styles from './ashgrove.module.css';

/*
 * Original architectural elevations for each fictional listing, drawn as
 * simple SVG line work on a 400 x 260 canvas (ground line at y = 230).
 */

const LINE = 'var(--ashgrove-line)';
const GLASS = 'var(--ashgrove-glass)';
const PAPER = 'var(--ashgrove-paper)';
const STONE = 'var(--ashgrove-stone-deep)';
const SAGE = 'var(--ashgrove-sage)';

type Palette = Property['palette'];

/** A glazed window with glazing bars. `bars` = [vertical, horizontal]. */
function Win({x, y, w, h, bars = [1, 1], arch = false}: {x: number; y: number; w: number; h: number; bars?: [number, number]; arch?: boolean}) {
  const v = Array.from({length: bars[0]}, (_, i) => x + ((i + 1) * w) / (bars[0] + 1));
  const hz = Array.from({length: bars[1]}, (_, i) => y + ((i + 1) * h) / (bars[1] + 1));
  const outline = arch
    ? `M${x},${y + h} V${y + w / 2} A${w / 2},${w / 2} 0 0 1 ${x + w},${y + w / 2} V${y + h} Z`
    : `M${x},${y} H${x + w} V${y + h} H${x} Z`;
  return (
    <g>
      <path d={outline} fill={GLASS} stroke={LINE} strokeWidth={1.4} />
      {v.map(vx => (
        <line key={`v${vx}`} x1={vx} x2={vx} y1={arch ? y + w / 4 : y} y2={y + h} stroke={LINE} strokeWidth={0.8} />
      ))}
      {hz.map(hy => (
        <line key={`h${hy}`} x1={x} x2={x + w} y1={hy} y2={hy} stroke={LINE} strokeWidth={0.8} />
      ))}
      <line x1={x - 3} x2={x + w + 3} y1={y + h + 1.5} y2={y + h + 1.5} stroke={LINE} strokeWidth={2} />
    </g>
  );
}

function Door({x, y, w, h, color, fanlight = false}: {x: number; y: number; w: number; h: number; color: string; fanlight?: boolean}) {
  return (
    <g>
      {fanlight ? (
        <path
          d={`M${x},${y} A${w / 2},${w / 2} 0 0 1 ${x + w},${y} Z`}
          fill={GLASS}
          stroke={LINE}
          strokeWidth={1.2}
        />
      ) : null}
      <rect x={x} y={y} width={w} height={h} fill={color} stroke={LINE} strokeWidth={1.4} />
      <rect x={x + w * 0.18} y={y + h * 0.12} width={w * 0.64} height={h * 0.3} fill="none" stroke={PAPER} strokeOpacity={0.45} strokeWidth={0.8} />
      <rect x={x + w * 0.18} y={y + h * 0.52} width={w * 0.64} height={h * 0.34} fill="none" stroke={PAPER} strokeOpacity={0.45} strokeWidth={0.8} />
      <circle cx={x + w * 0.8} cy={y + h * 0.48} r={1.4} fill={PAPER} />
    </g>
  );
}

function Shrub({cx, r = 14}: {cx: number; r?: number}) {
  return (
    <g>
      <circle cx={cx} cy={230 - r * 0.7} r={r} fill={SAGE} opacity={0.75} />
      <circle cx={cx + r * 0.8} cy={230 - r * 0.45} r={r * 0.7} fill={SAGE} opacity={0.9} />
    </g>
  );
}

/** Vertical lines used for timber cladding or brick coursing hints. */
function Hatch({x, y, w, h, step, vertical = true, opacity = 0.28}: {x: number; y: number; w: number; h: number; step: number; vertical?: boolean; opacity?: number}) {
  const n = Math.floor((vertical ? w : h) / step);
  return (
    <g stroke={LINE} strokeOpacity={opacity} strokeWidth={0.7}>
      {Array.from({length: n}, (_, i) => {
        const o = (i + 1) * step;
        return vertical ? (
          <line key={i} x1={x + o} x2={x + o} y1={y} y2={y + h} />
        ) : (
          <line key={i} x1={x} x2={x + w} y1={y + o} y2={y + o} />
        );
      })}
    </g>
  );
}

function Barn({p}: {p: Palette}) {
  return (
    <g>
      <path d="M80,230 V122 L200,52 L320,122 V230 Z" fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <Hatch x={80} y={60} w={240} h={170} step={11} />
      <path d="M66,128 L200,46 L334,128" fill="none" stroke={p.roof} strokeWidth={9} strokeLinejoin="miter" />
      <rect x={150} y={128} width={100} height={102} fill={GLASS} stroke={LINE} strokeWidth={1.6} />
      {[175, 200, 225].map(x => (
        <line key={x} x1={x} x2={x} y1={128} y2={230} stroke={LINE} strokeWidth={1} />
      ))}
      <line x1={150} x2={250} y1={170} y2={170} stroke={LINE} strokeWidth={1} />
      <path d="M150,128 L200,96 L250,128" fill="none" stroke={LINE} strokeWidth={1.2} />
      <line x1={200} x2={200} y1={96} y2={128} stroke={LINE} strokeWidth={1} />
      <Win x={98} y={150} w={34} h={44} bars={[1, 1]} />
      <Win x={268} y={150} w={34} h={44} bars={[1, 1]} />
      <rect x={186} y={78} width={28} height={12} fill={p.door} stroke={LINE} strokeWidth={1.2} />
      {[90, 140, 260, 310].map(x => (
        <path key={x} d={`M${x - 8},230 h16 l-4,6 h-8 z`} fill={STONE} stroke={LINE} strokeWidth={0.8} />
      ))}
      <Shrub cx={58} r={16} />
      <Shrub cx={344} r={12} />
    </g>
  );
}

function Semi({p}: {p: Palette}) {
  return (
    <g>
      <rect x={270} y={102} width={110} height={128} fill={p.wall} opacity={0.35} stroke={LINE} strokeOpacity={0.4} />
      <path d="M262,102 L300,60 L392,60 L392,102 Z" fill={p.roof} opacity={0.35} />
      <rect x={80} y={102} width={190} height={128} fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <Hatch x={80} y={102} w={190} h={128} step={8} vertical={false} opacity={0.16} />
      <path d="M68,104 L112,58 L270,58 L270,104 Z" fill={p.roof} stroke={LINE} strokeWidth={1.4} />
      <rect x={236} y={34} width={20} height={30} fill={p.wall} stroke={LINE} strokeWidth={1.4} />
      <rect x={232} y={30} width={28} height={6} fill={STONE} stroke={LINE} strokeWidth={1} />
      <path d="M92,230 V160 L104,148 H174 L186,160 V230 Z" fill={PAPER} stroke={LINE} strokeWidth={1.4} />
      <path d="M86,160 L104,142 H174 L192,160" fill="none" stroke={LINE} strokeWidth={2} />
      <Win x={100} y={164} w={22} h={50} bars={[0, 1]} />
      <Win x={128} y={164} w={22} h={50} bars={[0, 1]} />
      <Win x={156} y={164} w={22} h={50} bars={[0, 1]} />
      <Win x={104} y={116} w={30} h={20} bars={[1, 0]} />
      <Win x={146} y={116} w={30} h={20} bars={[1, 0]} />
      <Win x={210} y={116} w={26} h={20} bars={[0, 0]} />
      <Door x={212} y={170} w={26} h={60} color={p.door} fanlight />
      <rect x={206} y={226} width={38} height={4} fill={STONE} stroke={LINE} strokeWidth={0.8} />
      <Shrub cx={60} r={14} />
    </g>
  );
}

function Apartment({p}: {p: Palette}) {
  const cols = [128, 182, 236];
  return (
    <g>
      <rect x={100} y={44} width={200} height={186} fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <rect x={94} y={36} width={212} height={10} fill={STONE} stroke={LINE} strokeWidth={1.2} />
      <path d="M150,36 L200,18 L250,36" fill={STONE} stroke={LINE} strokeWidth={1.2} />
      <line x1={100} x2={300} y1={168} y2={168} stroke={LINE} strokeWidth={2} />
      {[60, 112].map(y =>
        cols.map(x => <Win key={`${x}-${y}`} x={x} y={y} w={36} h={42} bars={[1, 2]} />),
      )}
      {cols.map((x, i) => (
        <g key={x}>
          <path
            d={`M${x - 4},230 V${186} A${22},${22} 0 0 1 ${x + 40},${186} V230`}
            fill={i === 1 ? p.door : GLASS}
            stroke={LINE}
            strokeWidth={1.4}
          />
          {i !== 1 ? <line x1={x + 18} x2={x + 18} y1={172} y2={230} stroke={LINE} strokeWidth={0.8} /> : null}
        </g>
      ))}
      <rect x={60} y={120} width={40} height={110} fill={p.wall} opacity={0.35} stroke={LINE} strokeOpacity={0.4} />
      <rect x={300} y={96} width={50} height={134} fill={p.wall} opacity={0.35} stroke={LINE} strokeOpacity={0.4} />
    </g>
  );
}

function Cottage({p}: {p: Palette}) {
  return (
    <g>
      <rect x={70} y={142} width={260} height={88} fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <path d="M56,146 L114,78 L286,78 L344,146 Z" fill={p.roof} stroke={LINE} strokeWidth={1.4} />
      {[92, 104, 116, 128].map(y => (
        <path
          key={y}
          d={`M${56 + ((146 - y) / 68) * 58 + 4},${y} H${344 - ((146 - y) / 68) * 58 - 4}`}
          stroke={PAPER}
          strokeOpacity={0.35}
          strokeWidth={0.8}
        />
      ))}
      <rect x={110} y={50} width={22} height={34} fill={STONE} stroke={LINE} strokeWidth={1.4} />
      <path d="M150,108 L172,90 L194,108 V124 H150 Z" fill={p.wall} stroke={LINE} strokeWidth={1.2} />
      <Win x={160} y={106} w={24} h={16} bars={[1, 0]} />
      <path d="M232,108 L254,90 L276,108 V124 H232 Z" fill={p.wall} stroke={LINE} strokeWidth={1.2} />
      <Win x={242} y={106} w={24} h={16} bars={[1, 0]} />
      <Win x={92} y={168} w={46} h={34} bars={[2, 1]} />
      <Win x={262} y={168} w={46} h={34} bars={[2, 1]} />
      <path d="M180,166 L200,150 L220,166" fill="none" stroke={p.roof} strokeWidth={6} />
      <Door x={186} y={168} w={28} h={62} color={p.door} />
      <Shrub cx={156} r={10} />
      <Shrub cx={244} r={10} />
      <Shrub cx={44} r={18} />
    </g>
  );
}

function Townhouse({p}: {p: Palette}) {
  const floors: [number, number][] = [
    [62, 30],
    [100, 44],
    [156, 34],
  ];
  return (
    <g>
      <rect x={40} y={46} width={90} height={184} fill={p.wall} opacity={0.4} stroke={LINE} strokeOpacity={0.4} />
      <rect x={270} y={46} width={90} height={184} fill={p.wall} opacity={0.4} stroke={LINE} strokeOpacity={0.4} />
      <rect x={130} y={30} width={140} height={200} fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <rect x={126} y={24} width={148} height={8} fill={STONE} stroke={LINE} strokeWidth={1.2} />
      <Hatch x={130} y={196} w={140} h={34} step={7} vertical={false} opacity={0.22} />
      <line x1={130} x2={270} y1={92} y2={92} stroke={LINE} strokeWidth={1.4} />
      <rect x={140} y={146} width={120} height={4} fill={LINE} />
      {[144, 186, 228].map(x =>
        floors.map(([y, h]) => <Win key={`${x}-${y}`} x={x} y={y} w={28} h={h} bars={[1, 2]} />),
      )}
      {[144, 186].map(x => (
        <Win key={x} x={x} y={198} w={28} h={24} bars={[1, 1]} />
      ))}
      <Door x={228} y={196} w={28} h={34} color={p.door} fanlight />
      <g stroke={LINE} strokeWidth={0.9}>
        <line x1={130} x2={222} y1={214} y2={214} />
        {Array.from({length: 12}, (_, i) => (
          <line key={i} x1={134 + i * 8} x2={134 + i * 8} y1={214} y2={230} />
        ))}
      </g>
    </g>
  );
}

function NewBuild({p}: {p: Palette}) {
  return (
    <g>
      <path d="M100,230 V96 L200,44 L300,96 V230 Z" fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <path d="M200,44 L300,96 V230 H200 Z" fill={STONE} opacity={0.8} stroke={LINE} strokeWidth={1.2} />
      <Hatch x={200} y={60} w={100} h={170} step={8} opacity={0.3} />
      <path d="M90,100 L200,40 L310,100" fill="none" stroke={p.roof} strokeWidth={6} />
      <path d="M118,86 L170,58 L178,66 L126,94 Z" fill={'var(--ashgrove-slate)'} stroke={LINE} strokeWidth={0.8} />
      <rect x={116} y={112} width={64} height={46} fill={GLASS} stroke={LINE} strokeWidth={1.4} />
      <line x1={148} x2={148} y1={112} y2={158} stroke={LINE} strokeWidth={0.8} />
      <rect x={220} y={112} width={60} height={36} fill={GLASS} stroke={LINE} strokeWidth={1.4} />
      <rect x={116} y={172} width={84} height={58} fill={GLASS} stroke={LINE} strokeWidth={1.4} />
      <line x1={158} x2={158} y1={172} y2={230} stroke={LINE} strokeWidth={0.8} />
      <Door x={242} y={172} w={30} h={58} color={p.door} />
      <rect x={234} y={166} width={46} height={5} fill={LINE} />
      <Shrub cx={74} r={16} />
      <Shrub cx={328} r={12} />
    </g>
  );
}

function Warehouse({p}: {p: Palette}) {
  const cols = [92, 140, 188, 236, 284];
  return (
    <g>
      <path d="M70,230 V64 H170 L200,40 L230,64 H330 V230 Z" fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <Hatch x={70} y={64} w={260} h={166} step={6} vertical={false} opacity={0.15} />
      <line x1={200} x2={200} y1={40} y2={28} stroke={LINE} strokeWidth={3} />
      <line x1={200} x2={222} y1={30} y2={30} stroke={LINE} strokeWidth={3} />
      <line x1={220} x2={220} y1={30} y2={52} stroke={LINE} strokeWidth={0.8} />
      {[78, 130].map(y =>
        cols.map(x =>
          x === 188 ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={24} height={40} fill={p.door} stroke={LINE} strokeWidth={1.2} />
          ) : (
            <Win key={`${x}-${y}`} x={x} y={y} w={24} h={40} bars={[1, 2]} arch />
          ),
        ),
      )}
      {cols.map(x =>
        x === 188 ? (
          <Door key={x} x={x - 2} y={182} w={28} h={48} color={p.door} />
        ) : (
          <Win key={x} x={x} y={182} w={24} h={38} bars={[1, 2]} arch />
        ),
      )}
      <rect x={66} y={172} width={268} height={4} fill={STONE} stroke={LINE} strokeWidth={0.8} />
    </g>
  );
}

function Terrace({p}: {p: Palette}) {
  const houses = [40, 140, 240];
  return (
    <g>
      {houses.map((x, i) => {
        const faded = i !== 1;
        return (
          <g key={x} opacity={faded ? 0.42 : 1}>
            <rect x={x} y={96} width={100} height={134} fill={p.wall} stroke={LINE} strokeWidth={faded ? 1 : 1.6} />
            <Hatch x={x} y={96} w={100} h={134} step={7} vertical={false} opacity={0.15} />
            <rect x={x} y={150} width={100} height={6} fill={STONE} />
            <Win x={x + 14} y={110} w={30} h={30} bars={[1, 1]} />
            <Win x={x + 58} y={110} w={28} h={30} bars={[1, 1]} />
            <Win x={x + 14} y={166} w={34} h={42} bars={[1, 2]} />
            <Door x={x + 60} y={170} w={24} h={60} color={p.door} fanlight />
          </g>
        );
      })}
      <path d="M30,98 L60,64 H340 L370,98 Z" fill={p.roof} stroke={LINE} strokeWidth={1.4} />
      {[90, 190, 290].map(x => (
        <rect key={x} x={x} y={46} width={18} height={22} fill={STONE} stroke={LINE} strokeWidth={1.2} />
      ))}
    </g>
  );
}

function Villa({p}: {p: Palette}) {
  return (
    <g>
      <rect x={60} y={118} width={280} height={112} fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <path d="M48,122 L110,72 L330,72 L352,122 Z" fill={p.roof} stroke={LINE} strokeWidth={1.4} />
      <path d="M70,230 V110 L135,52 L200,110 V230 Z" fill={p.wall} stroke={LINE} strokeWidth={1.6} />
      <path d="M60,116 L135,46 L210,116" fill="none" stroke={p.roof} strokeWidth={8} />
      <g stroke={LINE} strokeWidth={2.2}>
        <line x1={135} x2={135} y1={58} y2={110} />
        <line x1={100} x2={170} y1={110} y2={110} />
        <line x1={110} x2={135} y1={90} y2={70} />
        <line x1={160} x2={135} y1={90} y2={70} />
      </g>
      <Win x={96} y={128} w={78} h={40} bars={[3, 1]} />
      <Win x={96} y={180} w={78} h={34} bars={[3, 0]} />
      <path d="M214,160 L262,128 L310,160 Z" fill={p.roof} stroke={LINE} strokeWidth={1.2} />
      <rect x={218} y={160} width={6} height={70} fill={LINE} />
      <rect x={300} y={160} width={6} height={70} fill={LINE} />
      <Door x={248} y={174} w={28} h={56} color={p.door} />
      <Win x={286} y={92} w={36} h={22} bars={[1, 0]} />
      <rect x={262} y={44} width={20} height={32} fill={STONE} stroke={LINE} strokeWidth={1.4} />
      <Shrub cx={42} r={18} />
      <Shrub cx={356} r={14} />
    </g>
  );
}

const facades: Record<FacadeStyle, (props: {p: Palette}) => ReactNode> = {
  barn: Barn,
  semi: Semi,
  apartment: Apartment,
  cottage: Cottage,
  townhouse: Townhouse,
  newbuild: NewBuild,
  warehouse: Warehouse,
  terrace: Terrace,
  villa: Villa,
};

/** Just the building, for compositions such as the hero. */
export function Facade({style, palette}: {style: FacadeStyle; palette: Palette}) {
  const F = facades[style];
  return <F p={palette} />;
}

export function PropertyArt({property, label, className}: {property: Property; label?: string; className?: string}) {
  const Facade = facades[property.facade];
  return (
    <svg
      viewBox="0 0 400 260"
      className={`${styles.propertyArt} ${className ?? ''}`}
      preserveAspectRatio="xMidYMax meet"
      {...(label ? {role: 'img', 'aria-label': label} : {'aria-hidden': true, focusable: false})}>
      <rect x={0} y={0} width={400} height={260} fill="var(--ashgrove-stone)" />
      <circle cx={330} cy={62} r={26} fill="var(--ashgrove-terracotta-soft)" />
      <Facade p={property.palette} />
      <line x1={0} x2={400} y1={230} y2={230} stroke={LINE} strokeWidth={1.6} />
      <rect x={0} y={231} width={400} height={29} fill="var(--ashgrove-stone-deep)" opacity={0.5} />
    </svg>
  );
}

/** Ground-floor plan drawn from the listing's room rectangles. */
export function FloorPlan({property, className}: {property: Property; className?: string}) {
  const pad = 6;
  return (
    <svg
      viewBox={`${-pad} ${-pad} ${100 + pad * 2} ${70 + pad * 2 + 6}`}
      className={`${styles.floorPlan} ${className ?? ''}`}
      role="img"
      aria-label={`Illustrative ground-floor plan of ${property.title}, not to scale. Rooms: ${property.plan
        .map(r => r.name)
        .join(', ')}.`}>
      <rect x={-pad} y={-pad} width={100 + pad * 2} height={70 + pad * 2 + 6} fill="var(--ashgrove-paper)" />
      {property.plan.map(r => (
        <g key={r.name}>
          <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="none" stroke={LINE} strokeWidth={0.6} />
          <text
            x={r.x + r.w / 2}
            y={r.y + r.h / 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={r.w < 20 ? 2.6 : 3.2}
            fill="var(--ashgrove-ink)"
            fontFamily="var(--font-family-body)">
            {r.name}
          </text>
        </g>
      ))}
      <rect x={0} y={0} width={100} height={70} fill="none" stroke={LINE} strokeWidth={1.6} />
      {/* Front door gap and swing on the bottom wall. */}
      <rect x={38} y={68.6} width={8} height={2.8} fill="var(--ashgrove-paper)" />
      <path d="M38,70 A8,8 0 0 1 46,62 V70" fill="none" stroke="var(--ashgrove-terracotta)" strokeWidth={0.5} />
      <text x={0} y={70 + pad + 3.2} fontSize={2.8} fill="var(--ashgrove-ink)" fontFamily="var(--font-family-body)">
        Ground floor · illustrative · not to scale
      </text>
      <g transform="translate(97 78.5)">
        <path d="M0,-3.5 L1.8,1.5 L0,0.6 L-1.8,1.5 Z" fill="var(--ashgrove-terracotta)" />
        <text x={-3.2} y={1.2} textAnchor="end" fontSize={2.6} fill="var(--ashgrove-ink)" fontFamily="var(--font-family-body)">
          N
        </text>
      </g>
    </svg>
  );
}
