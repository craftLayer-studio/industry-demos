/**
 * Original SVG illustrations for the Brightwater Coffee concept demo: coffee
 * bags with a distinct label per coffee, beans, brew-method drawings and
 * abstract origin landscapes. All decorative (aria-hidden); the surrounding
 * UI always carries the same information as text.
 */
import {useId, type ReactNode} from 'react';
import type {Coffee, Motif} from './lib/catalog';
import styles from './coffee.module.css';

const KRAFT = '#B9875A';
const KRAFT_DARK = '#8E623D';
const KRAFT_LIGHT = '#D2A57A';

/* ---------- label motifs: drawn inside a 104 x 82 window at (48, 92) ---------- */

function MotifArt({motif, ink, hi}: {motif: Motif; ink: string; hi: string}) {
  switch (motif) {
    case 'sunrise':
      return (
        <g>
          {Array.from({length: 9}, (_, i) => {
            const a = Math.PI + (i * Math.PI) / 8;
            return (
              <line
                key={i}
                x1={100 + Math.cos(a) * 26}
                y1={160 + Math.sin(a) * 26}
                x2={100 + Math.cos(a) * 46}
                y2={160 + Math.sin(a) * 46}
                stroke={ink}
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="100" cy="160" r="20" fill={ink} />
          <rect x="48" y="160" width="104" height="14" fill={hi} />
          <path d="M48 166 h104" stroke={ink} strokeWidth="2" />
        </g>
      );
    case 'road':
      return (
        <g>
          <circle cx="128" cy="110" r="11" fill={hi} />
          <path d="M48 140 C70 124 88 128 104 136 S138 132 152 124 V174 H48Z" fill={hi} opacity="0.55" />
          <path d="M48 154 C74 142 96 150 118 146 S144 140 152 142 V174 H48Z" fill={ink} opacity="0.85" />
          <path d="M70 174 C82 162 104 160 108 152 S120 146 132 146" stroke={hi} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M72 172 C84 162 104 160 108 152" stroke={ink} strokeWidth="1.5" strokeDasharray="3 4" fill="none" />
        </g>
      );
    case 'ferry':
      return (
        <g>
          <circle cx="122" cy="110" r="12" fill={hi} />
          <circle cx="128" cy="106" r="11" fill="#24364A" />
          {[[64, 104], [84, 118], [140, 128], [58, 128]].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill={ink} />
          ))}
          <path d="M74 146 h40 l-6 9 h-28z" fill={hi} />
          <rect x="84" y="136" width="18" height="10" rx="1.5" fill={ink} />
          <rect x="90" y="128" width="4" height="8" fill={ink} />
          {[158, 166].map(y => (
            <path
              key={y}
              d={`M48 ${y} q6.5 -5 13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0 t13 0`}
              stroke={ink}
              strokeWidth="2.5"
              fill="none"
              opacity={y === 158 ? 1 : 0.6}
            />
          ))}
        </g>
      );
    case 'tide':
      return (
        <g>
          {[0, 1, 2, 3, 4].map(i => (
            <path
              key={i}
              d={`M48 ${108 + i * 14} q13 -10 26 0 t26 0 t26 0 t26 0 V174 H48Z`}
              fill={i % 2 ? hi : ink}
              opacity={0.35 + i * 0.15}
            />
          ))}
        </g>
      );
    case 'kettle':
      return (
        <g>
          <path d="M90 104 c-4 -6 4 -8 0 -14 M102 104 c-4 -6 4 -8 0 -14" stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
          <path d="M74 128 h44 l6 36 h-56z" fill={ink} />
          <rect x="88" y="120" width="16" height="8" rx="2" fill={ink} />
          <path d="M118 136 c14 -4 18 -18 28 -22" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M76 132 c-14 2 -14 24 -2 26" stroke={ink} strokeWidth="4" fill="none" />
          <rect x="72" y="146" width="48" height="5" fill={hi} />
          <rect x="48" y="166" width="104" height="8" fill={ink} opacity="0.35" />
        </g>
      );
    case 'pines':
      return (
        <g>
          <circle cx="70" cy="108" r="9" fill={hi} />
          {[
            [62, 174, 18, 50],
            [86, 174, 22, 64],
            [112, 174, 20, 56],
            [136, 174, 16, 44],
          ].map(([x, y, w, h], i) => (
            <g key={i}>
              <path d={`M${x} ${y - h} l${w} ${h * 0.55} h-${w * 0.55} l${w * 0.75} ${h * 0.45} h-${w * 2.4} l${w * 0.75} -${h * 0.45} h-${w * 0.55}z`} fill={i % 2 ? hi : ink} opacity={i % 2 ? 0.8 : 1} />
            </g>
          ))}
        </g>
      );
    case 'marsh':
      return (
        <g>
          <circle cx="100" cy="132" r="16" fill={hi} opacity="0.85" />
          <rect x="48" y="138" width="104" height="36" fill={ink} opacity="0.12" />
          <path d="M48 140 h104" stroke={ink} strokeWidth="1.5" />
          {Array.from({length: 15}, (_, i) => {
            const x = 52 + i * 7;
            const h = 14 + ((i * 7) % 11);
            return <path key={i} d={`M${x} 174 q${i % 2 ? 3 : -3} -${h / 2} ${i % 2 ? 1 : -1} -${h}`} stroke={ink} strokeWidth="2" fill="none" strokeLinecap="round" />;
          })}
          <path d="M118 120 l6 -3 l6 3" stroke={ink} strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'firefly':
      return (
        <g>
          {[
            [64, 112, 2.6],
            [92, 102, 1.8],
            [118, 118, 3],
            [140, 104, 2],
            [76, 136, 2.2],
            [130, 142, 1.6],
            [104, 132, 2.4],
          ].map(([x, y, r], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={r * 3} fill={hi} opacity="0.18" />
              <circle cx={x} cy={y} r={r} fill={hi} />
            </g>
          ))}
          {Array.from({length: 12}, (_, i) => (
            <path key={i} d={`M${50 + i * 9} 174 l4 -${12 + (i % 3) * 5} l4 ${12 + (i % 3) * 5}`} fill={ink} opacity="0.8" />
          ))}
        </g>
      );
    default:
      return null;
  }
}

type BagProps = {
  coffee: Pick<Coffee, 'name' | 'origin' | 'motif' | 'palette' | 'roast'>;
  className?: string;
  /** Show the coffee name on the label (off for very small thumbnails). */
  showName?: boolean;
};

/** A stand-up coffee pouch with a label unique to each coffee. */
export function BagArt({coffee, className, showName = true}: BagProps) {
  const uid = useId().replace(/:/g, '');
  const [bg, ink, hi] = coffee.palette;
  const clip = `bw-label-${uid}`;
  const shade = `bw-shade-${uid}`;
  return (
    <svg viewBox="0 0 200 260" className={className} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <rect x="48" y="92" width="104" height="82" rx="4" />
        </clipPath>
        <linearGradient id={shade} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.18" stopColor="#000" stopOpacity="0" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="250" rx="78" ry="7" fill="#000" opacity="0.28" />
      {/* pouch body */}
      <path d="M30 40 L170 40 L178 238 Q100 250 22 238 Z" fill={KRAFT} />
      <path d="M30 40 L170 40 L178 238 Q100 250 22 238 Z" fill={`url(#${shade})`} />
      {/* crimped top seal */}
      <rect x="28" y="22" width="144" height="22" rx="2" fill={KRAFT_DARK} />
      {Array.from({length: 23}, (_, i) => (
        <line key={i} x1={32 + i * 6} y1="25" x2={32 + i * 6} y2="41" stroke={KRAFT_LIGHT} strokeWidth="1" opacity="0.55" />
      ))}
      <circle cx="160" cy="58" r="4.5" fill={KRAFT_DARK} />
      <circle cx="160" cy="58" r="2" fill={KRAFT_LIGHT} />
      {/* label */}
      <rect x="40" y="82" width="120" height="146" rx="8" fill={bg} />
      <rect x="44" y="86" width="112" height="138" rx="6" fill="none" stroke={ink} strokeWidth="1" opacity="0.35" />
      <g clipPath={`url(#${clip})`}>
        <rect x="48" y="92" width="104" height="82" fill={bg} />
        <MotifArt motif={coffee.motif} ink={ink} hi={hi} />
      </g>
      <text x="100" y="70" textAnchor="middle" className={styles.bagBrand} fill="#2A1A12">
        BRIGHTWATER
      </text>
      {showName ? (
        <>
          <text x="100" y="198" textAnchor="middle" className={styles.bagName} fill={ink}>
            {coffee.name}
          </text>
          <text x="100" y="215" textAnchor="middle" className={styles.bagMeta} fill={ink}>
            {`${coffee.origin.toUpperCase()} · ${coffee.roast.toUpperCase()}`}
          </text>
        </>
      ) : null}
    </svg>
  );
}

export function BeanArt({className, tone = '#6B4128'}: {className?: string; tone?: string}) {
  return (
    <svg viewBox="0 0 40 52" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="20" cy="26" rx="16" ry="22" fill={tone} />
      <ellipse cx="15" cy="18" rx="5" ry="9" fill="#fff" opacity="0.08" />
      <path d="M20 6 C12 18 28 32 20 46" stroke="#1A100B" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Hero composition: featured bag, a second bag, a cup with steam and beans. */
export function HeroArt({featured, second}: {featured: BagProps['coffee']; second: BagProps['coffee']}) {
  return (
    <div className={styles.heroArt} aria-hidden="true">
      <svg viewBox="0 0 400 400" className={styles.heroSun}>
        <circle cx="200" cy="200" r="190" fill="var(--bw-caramel)" opacity="0.14" />
        <circle cx="200" cy="200" r="140" fill="var(--bw-caramel)" opacity="0.14" />
        <circle cx="200" cy="200" r="190" fill="none" stroke="var(--bw-caramel)" strokeOpacity="0.4" strokeDasharray="2 8" />
      </svg>
      <BagArt coffee={second} className={styles.heroBagBack} />
      <BagArt coffee={featured} className={styles.heroBag} />
      <svg viewBox="0 0 140 130" className={styles.heroCup}>
        <path className={styles.steam} d="M52 34 c-8 -10 8 -14 0 -26" stroke="var(--bw-cream)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
        <path className={styles.steamAlt} d="M72 36 c-8 -10 8 -14 0 -26" stroke="var(--bw-cream)" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="66" cy="118" rx="56" ry="8" fill="#000" opacity="0.3" />
        <ellipse cx="66" cy="112" rx="52" ry="9" fill="#E9DCC8" />
        <path d="M24 48 h84 l-8 54 q-34 14 -68 0z" fill="#F3E6D3" />
        <path d="M108 58 c22 0 22 30 -4 30" stroke="#F3E6D3" strokeWidth="8" fill="none" />
        <ellipse cx="66" cy="48" rx="42" ry="7" fill="#4A2A18" />
        <ellipse cx="62" cy="47" rx="16" ry="3" fill="#C98B4A" opacity="0.7" />
        <path d="M30 70 h72" stroke="var(--bw-caramel)" strokeWidth="5" opacity="0.85" />
      </svg>
      <BeanArt className={`${styles.heroBean} ${styles.heroBean1}`} />
      <BeanArt className={`${styles.heroBean} ${styles.heroBean2}`} tone="#5A3420" />
      <BeanArt className={`${styles.heroBean} ${styles.heroBean3}`} tone="#7A4A2C" />
      <BeanArt className={`${styles.heroBean} ${styles.heroBean4}`} />
    </div>
  );
}

/** Abstract origin landscape: layered hills tinted by the coffee's label palette. */
export function OriginArt({coffee, className}: {coffee: Pick<Coffee, 'palette' | 'order'>; className?: string}) {
  const [bg, ink, hi] = coffee.palette;
  const s = coffee.order;
  const y1 = 70 + (s % 3) * 6;
  const y2 = 92 + (s % 4) * 4;
  return (
    <svg viewBox="0 0 320 140" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="140" fill={bg} opacity="0.9" />
      <circle cx={60 + s * 26} cy="44" r="18" fill={hi} />
      <path d={`M0 ${y1} C60 ${y1 - 30} 110 ${y1 - 10} 160 ${y1 - 24} S260 ${y1 - 8} 320 ${y1 - 30} V140 H0Z`} fill={ink} opacity="0.25" />
      <path d={`M0 ${y2} C50 ${y2 - 18} 120 ${y2 + 4} 180 ${y2 - 14} S280 ${y2 + 2} 320 ${y2 - 12} V140 H0Z`} fill={ink} opacity="0.5" />
      <path d="M0 120 C80 104 160 126 220 112 S300 116 320 108 V140 H0Z" fill={ink} opacity="0.85" />
      {Array.from({length: 8}, (_, i) => (
        <path key={i} d={`M${20 + i * 38} 128 q10 -8 20 0`} stroke={hi} strokeWidth="2" fill="none" opacity="0.6" />
      ))}
    </svg>
  );
}

function MethodFrame({children}: {children: ReactNode}) {
  return (
    <svg viewBox="0 0 160 160" className={styles.methodArt} aria-hidden="true" focusable="false">
      <circle cx="80" cy="80" r="74" fill="var(--bw-panel-raised)" />
      <circle cx="80" cy="80" r="74" fill="none" stroke="var(--bw-line)" />
      {children}
    </svg>
  );
}

export function PourOverArt() {
  return (
    <MethodFrame>
      <path d="M78 22 c-6 8 6 10 0 18" stroke="var(--bw-cream)" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M46 46 h68 l-22 38 h-24z" fill="var(--bw-caramel)" />
      <path d="M52 52 h56" stroke="#1A100B" strokeWidth="2" opacity="0.3" />
      <rect x="62" y="84" width="36" height="6" rx="2" fill="var(--bw-amber)" />
      <path d="M54 92 h52 l-4 40 q-22 8 -44 0z" fill="var(--bw-cream)" opacity="0.9" />
      <path d="M58 112 h44 l-2 20 q-20 6 -40 0z" fill="#4A2A18" />
    </MethodFrame>
  );
}

export function ImmersionArt() {
  return (
    <MethodFrame>
      <rect x="60" y="24" width="40" height="10" rx="3" fill="var(--bw-amber)" />
      <rect x="66" y="34" width="28" height="30" fill="var(--bw-amber)" opacity="0.7" />
      <rect x="56" y="58" width="48" height="58" rx="4" fill="var(--bw-cream)" opacity="0.92" />
      <rect x="60" y="80" width="40" height="32" rx="2" fill="#4A2A18" />
      <rect x="50" y="114" width="60" height="8" rx="3" fill="var(--bw-caramel)" />
      <path d="M58 122 h44 l-4 18 h-36z" fill="var(--bw-panel)" stroke="var(--bw-cream)" strokeWidth="2" />
    </MethodFrame>
  );
}

export function EspressoArt() {
  return (
    <MethodFrame>
      <rect x="34" y="30" width="92" height="22" rx="5" fill="var(--bw-amber)" />
      <rect x="64" y="52" width="32" height="12" fill="var(--bw-caramel)" />
      <rect x="48" y="58" width="64" height="8" rx="4" fill="#1A100B" opacity="0.6" />
      <path d="M76 66 v28 M84 66 v28" stroke="#6B3A1E" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 96 h44 l-5 28 h-34z" fill="var(--bw-cream)" />
      <path d="M102 102 c12 0 12 16 -2 16" stroke="var(--bw-cream)" strokeWidth="5" fill="none" />
      <ellipse cx="80" cy="128" rx="34" ry="5" fill="var(--bw-cream)" opacity="0.7" />
    </MethodFrame>
  );
}

/** Wholesale illustration: a café counter with a hopper and stacked bags. */
export function CounterArt() {
  return (
    <svg viewBox="0 0 360 220" className={styles.counterArt} aria-hidden="true" focusable="false">
      <rect x="0" y="150" width="360" height="70" rx="10" fill="var(--bw-panel-raised)" />
      <rect x="0" y="146" width="360" height="10" rx="4" fill="var(--bw-caramel)" opacity="0.9" />
      <path d="M58 40 h50 l-10 34 h-30z" fill="var(--bw-cream)" opacity="0.85" />
      <rect x="54" y="74" width="58" height="72" rx="6" fill="var(--bw-amber)" />
      <rect x="66" y="94" width="34" height="20" rx="3" fill="#1A100B" opacity="0.5" />
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${170 + i * 54} ${66 - (i === 1 ? 10 : 0)})`}>
          <path d="M4 8 h40 l3 72 q-23 5 -46 0z" fill="#B9875A" />
          <rect x="2" y="2" width="44" height="8" fill="#8E623D" />
          <rect x="8" y="28" width="32" height="34" rx="3" fill={['#F2BE7C', '#24364A', '#3F5B3A'][i]} />
        </g>
      ))}
      <path d="M0 200 h360" stroke="var(--bw-line)" strokeDasharray="4 6" />
    </svg>
  );
}
